var React = require('react');
var NoteViewer = require('./noteViewer.jsx');
var NoteEditor = require('./noteEditor.jsx');
var NoteService = require('../note.service.js');

var classNames = require('classnames');

var Note = React.createClass({
    getInitialState: function() {
        return {
            note: NoteService.getNote(this.props.note.id)
        };
    },
    componentDidMount: function() {
        window.addEventListener('src', (function(e) {
            if (this.state.note.id === e.detail.id) {
                var note = NoteService.getNote(e.detail.id);
                note.src = e.detail.src;
                this.setState({note: note});
            }
        }).bind(this));
    },
    render: function() {
        var editNote = function(note) {
            return (
                <div className="col-xs-12">
                    <div className="bs-example"><NoteViewer noteId={note.id}/></div>
                    <NoteEditor note={note}/>
                </div>
            );
        };

        var readNote = function(note) {
            return <NoteViewer noteId={note.id}/>;
        };

        if (this.props.editable) {
            return editNote(this.state.note);
        } else {
            return readNote(this.state.note);
        }
    }
});

module.exports = Note;
