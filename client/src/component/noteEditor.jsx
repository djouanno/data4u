var React = require('react');

var NoteEditor = React.createClass({
    autoResize: function() {
        var o = document.querySelector('#textarea_' + this.props.note.id);
        o.style.height = "1px";
        o.style.height = (25 + o.scrollHeight) + "px";
    },
    restoreSize: function() {
        var o = document.querySelector('#textarea_' + this.props.note.id);
        o.style.height = "50px";
    },
    handleChange: function(e) {
        var value = e.target.value;
        window.dispatchEvent(new CustomEvent('src', {
            detail: {
                id: this.props.note.id,
                src: value
            }
        }));
    },
    render: function() {
        return (<textarea className="highlight" onBlur={this.restoreSize} onFocus={this.autoResize} id={'textarea_' + this.props.note.id} onKeyUp={this.autoResize} onChange={this.handleChange} defaultValue={this.props.note.src}/>);
    }
});

module.exports = NoteEditor;
