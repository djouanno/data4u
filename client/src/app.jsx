var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Note = require('./component/note.jsx')
var NoteService = require('./note.service.js');

var Notebook = React.createClass({
    getInitialState: function() {
        return {notes: NoteService.getNotes(), editable: false};
    },
    onClick: function(e) {
        this.setState({
            editable: !this.state.editable
        });
    },
    render: function() {

        var notes = this.state.notes.map((function(note) {
            return <Note key={'note_' + note.id} note={note} editable={this.state.editable}/>
        }).bind(this));

        if (!this.state.editable) {
            notes = <div className="col-xs-12">
                <div className="bs-example">{notes}</div>
            </div>;
        }

        var btnClass = classNames({'btn': true, 'btn-default': true, 'width_100': true, 'active': this.state.editable});

        return (
            <div className="container main-container">
                <div className="row">
                    <div className="col-md-2">
                        <a className={btnClass} onClick={this.onClick}>Edition</a>
                    </div>
                    <div className="col-md-10">
                        <div className="row">{notes}</div>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Notebook/>, document.getElementById('container'));
