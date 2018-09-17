import React, {Component} from 'react';
import * as d3 from "d3";
import dataFile from './../data/data.csv';

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
            .value(function(d) {
                return d.population;
            });

        var svg = d3
            .select("#donut")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        d3.csv(dataFile).then(function(respArr) {
            respArr.forEach(data => {
                var g = svg
                    .selectAll(".arc")
                    .data(pie(respArr))
                    .enter()
                    .append("g")
                    .attr("class", "arc");
                g
                    .append("path")
                    .attr("d", arc)
                    .style("fill", function(d) {
                        return color(d.data.age);
                    });
                g
                    .append("text")
                    .attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .text(function(d) {
                        return d.data.age;
                    });
            })
        });

    }
    render() {
        return <div id="donut"></div>
    }
}