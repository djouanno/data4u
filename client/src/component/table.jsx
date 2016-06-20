var React = require('react');

var Table = React.createClass({

    componentDidMount: function() {},

    render: function() {
        var createRow = function(obj) {
            var tds = [];
            for (var prop in obj) {
                tds.push(
                    <td>{obj[prop]}</td>
                );
            }
            return <tr>{tds}</tr>;
        };

        var createHeader = function(data) {
            var tds = [];
            if (data && data.length > 0) {
                var obj = data[0];
                for (var prop in obj) {
                    tds.push(
                        <th>{prop}</th>
                    );
                }

            }
            return <tr>{tds}</tr>;
        };

        return (
            <div>
                <table className="table">
                    <thead>{createHeader(this.props.note.data)}</thead>
                    <tbody>{this.props.note.data.map(createRow)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = Table;
