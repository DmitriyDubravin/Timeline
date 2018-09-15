import React, {Component} from 'react';
import * as d3 from "d3";

console.log(d3);

export default class Donut extends Component {
    componentDidMount() {
        var width = 500;
        var height = 500;
        var radius = Math.min(width, height) / 2;
        var color = d3
            .scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);

        var pie = d3
            .pie()
            .sort(null)
            .value(function(d) { return d.population; });

        var svg = d3
            .select("#donut")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // d3.json("./data/data.json", function(one, two, three, four) {
        //     console.log(0, one, two, three);
        //     console.log(one);
        // });

        d3.csv("./../data/dat.csv").then(function(data) {
            console.log(data); // [{"Hello": "world"}, …]
        });
        // d3.csv("./../data/data.csv", function(data) {
        //     console.log(data[0]);
        // });

        var parsed = d3.csvParse("age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463");
        // console.log(parsed);

        d3
            .csv("./../data/data.csv",
            function(d) {
                // console.log(d);
                d.population = +d.population;
                return d;
            },
            function(data, index) {
                // console.log(data);
                // if (error) throw error;

                var g = svg
                    .selectAll(".arc")
                    .data(pie(parsed))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) {
                        return color(d.data.age);
                    });
            
                g.append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .text(function(d) { return d.data.age; });
        });

    }
    render() {
        return <div id="donut"></div>
    }
}


/**
 * var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

function type(d) {
  d.population = +d.population;
  return d;
}
 */