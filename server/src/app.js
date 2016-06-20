var pg = require('pg');
var Q = require('q');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies


var dataService = (function() {
    var _client;
    var _done;

    var _init = function(configuration) {
        var deferred = Q.defer();
        var conString = 'postgres://' + configuration.user + ':' + configuration.password + '@' + configuration.host + '/' + configuration.base;


        pg.connect(conString, function(err, client, done) {
            if (err) {
                console.error('error fetching client from pool', err);
                deferred.reject(err);
            }
            _client = client;
            _done = done;
            deferred.resolve(client);
        });
        return deferred.promise;
    };

    var _execute = function(sql) {
        return Q.npost(_client, 'query', [sql, []]).then(function(result) {
            _done();
            return result.rows;
        });
    };

    return {
        init: _init,
        execute: _execute
    };
})();


var noteService = (function() {
    var index = 0;
    var notes = [];

    var createNote = function(note) {
        note.id = index;
        notes.push(note);
        index += 1;
        return note;
    };

    var getNote = function(id) {
        return notes.find(function(note) {
            return note.id === id;
        });
    };

    var getNotes = function() {
        return notes;
    };

    return {
        createNotes: createNote,
        getNotes: getNotes,
        getNote: getNote
    };
})();

var configuration = {
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    base: 'HWS'
};

dataService.init(configuration);
//SELECT CONCAT(EXTRACT(MONTH FROM ridecreatedatetime), '-', EXTRACT(YEAR FROM ridecreatedatetime))  AS KEY, COUNT(*) AS VALUE FROM ride GROUP BY EXTRACT(MONTH FROM ridecreatedatetime), EXTRACT(YEAR FROM ridecreatedatetime) ORDER BY KEY

app.get('/notes/:id', function(req, res) {
    var note = noteService.getNote(parseInt(req.params.id));
    switch (note.type) {
        case "GRAPH":
            var sql = note.src;
            dataService.execute(sql).then(function(rows) {
                note.data = rows;
                res.send(JSON.stringify(note));
            });
            break;
        case "TABLE":
            var sql = note.src;
            dataService.execute(sql).then(function(rows) {
                note.data = rows;
                res.send(JSON.stringify(note));
            });
            break;
        case "MARKDOWN":
            res.send(JSON.stringify(note));
            break;
        default:
    }
});

app.get('/notes', function(req, res) {
    res.send(JSON.stringify(noteService.getNotes()));
});

app.post('/notes', function(req, res) {
    var note = noteService.createNotes(req.body);
    res.send(JSON.stringify(note));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
