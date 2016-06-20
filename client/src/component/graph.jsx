var React = require('react');
var d3 = require('d3');

var Graph = React.createClass({

    build: function(note) {
        var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        };

        var width = 500 - margin.left - margin.right;
        var height = 350 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangeBands([
            0, width
        ], .1);

        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var yAxis = d3.svg.axis().scale(y).orient("left");

        var chart = d3.select("#chart_" + note.id).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = note.data;

        x.domain(data.map(function(d) {
            return d.name;
        }));
        y.domain([
            0,
            d3.max(data, function(d) {
                return d.value;
            })
        ]);

        chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("y", 6).attr("x", width + 20).attr("dy", ".71em").style("text-anchor", "end").text(note.rowName);

        chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(note.columnName);

        chart.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
            return x(d.name);
        }).attr("y", function(d) {
            return y(d.value);
        }).attr("height", function(d) {
            return height - y(d.value);
        }).attr("width", x.rangeBand());

    },
    componentDidMount: function() {
        this.build(this.props.note);
    },

    render: function() {
        return (
            <div className="text-center">
                <svg id={"chart_" + this.props.note.id}></svg>
            </div>
        );
    }
});

module.exports = Graph;
