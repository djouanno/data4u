var React = require('react');
var Remarkable = require('remarkable');

var Paragraph = React.createClass({

    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.note.data);
        return {__html: rawMarkup};
    },

    componentDidMount: function() {},

    render: function() {
        return <div><span dangerouslySetInnerHTML={this.rawMarkup()}/></div >;
    }
});

module.exports = Paragraph;
