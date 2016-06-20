var noteService = (function() {
  var notes = [];
  notes.push({
    id: 1,
    src: "SELECT id, price FROM item\n\n\n\nhjfhjdhfjhdj;",
    type: "MARKDOWN",
    data: ""
  });

  var data = [];
  data.push({name: '1', value: 28});
  data.push({name: '2', value: 15});
  data.push({name: '3', value: 5});
  data.push({name: '4', value: 35});
  data.push({name: '5', value: 27});
  data.push({name: '6', value: 22});

  notes.push({
    id: 2,
    src: "",
    type: 'GRAPH',
    data: data
  });

  notes.push({
    id: 3,
    src: "## Tableau",
    type: "MARKDOWN",
    data: ""
  });

  notes.push({
    id: 4,
    src: "",
    type: 'TABLE',
    data: data
  });

  var getNotes = function() {
    return notes;
  };

  var getNote = function(id) {
    return notes.find(function(note) {
      return note.id === id;
    });
  };

  return {
    getNotes: getNotes,
    getNote: getNote
  };
} ());

module.exports = noteService;
