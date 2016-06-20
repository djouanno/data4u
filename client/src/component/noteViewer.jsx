var React = require('react');
var Graph = require('./graph.jsx');
var Paragraph = require('./paragraph.jsx');
var Table = require('./table.jsx');

var NoteService = require('../note.service.js');

var NoteViewer = React.createClass({
    getInitialState: function() {
        return {
            note: this.getNote(this.props.noteId)
        };
    },
    componentWillReceiveProps: function() {
        this.setState({
            note: this.getNote(this.props.noteId)
        });
    },

    getNote: function(id) {
        var note = NoteService.getNote(id);
        if (note.type === 'MARKDOWN') {
            note.data = note.src;
        }

        return note;
    },

    componentDidMount: function() {},

    render: function() {
        var obj;
        switch (this.state.note.type) {
            case "MARKDOWN":
                obj = <Paragraph note={this.state.note}/>
                break;
            case "GRAPH":
                obj = <Graph note={this.state.note}/>
                break;
            case "TABLE":
                obj = <Table note={this.state.note}/>
                break;
            default:
        }

        return <div>{obj}</div>;
    }
});

module.exports = NoteViewer;
