import React, {Component} from 'react';
import * as d3 from "d3";
// import dataFile from './../data/data.csv';

export default class Donut extends Component {
    componentDidMount() {

        const s = 400;
        const r = s / 2;

        const arc = d3
            .arc()
            // .startAngle(0)
            // .endAngle(2 * Math.PI)
            .outerRadius(r - 50)
            .innerRadius(r - 150)
            .padAngle(.02)
            .padRadius(100)
            .cornerRadius(4);

        const data = [
            {n: 'A', x: 10},
            {n: 'B', x: 40},
            {n: 'C', x: 30},
            {n: 'D', x: 20},
            {n: 'E', x: 60},
            {n: 'F', x: 80}
        ];

        const pie = d3
            .pie()
            // .padAngle(.02)
            .value(function(d) {return d.x})
            .sort(null);

        const pieData = pie(data);

        const g = d3
            .select('#donut')
            .append('svg')
            .attr('width', s)
            .attr('height', s)
            .append('g')
            .attr('transform', `translate(${r},${r})`);

        // segments
        g
            .selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('fill', '#fc0')
            .attr('d', arc);

        // label
        g
            .selectAll('text')
            .data(pieData)
            .enter()
            .append('text')
            .each(function(d) {
                let centroid = arc.centroid(d);
                d3.select(this)
                    .attr('x', centroid[0])
                    .attr('y', centroid[1])
                    .attr('dy', '0.33em')
                    .text(d.data.n + ': ' + d.data.x)
            });
            // .attr('x', function(d) {return arc.centroid(d)[0]})
            // .attr('y', function(d) {return arc.centroid(d)[1]})
            // .attr('dy', '0.33em')
            // .text(function(d) {return d.data.n + ': ' + d.data.x});






        // var width = 500;
        // var height = 500;
        // var radius = Math.min(width, height) / 2;

        // var color = d3
        //     .scaleOrdinal()
        //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        // var arc = d3
        //     .arc()
        //     .outerRadius(radius - 40)
        //     .innerRadius(radius - 120)
        //     .padAngle(.01)
        //     .padRadius(100)
        //     .cornerRadius(4);

        // var pie = d3
        //     .pie()
        //     .sort(null)
        //     .value(function(d) {
        //         return d.population;
        //     });

        // var svg = d3
        //     .select("#donut")
        //     .append("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .append("g")
        //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // d3.csv(dataFile).then(function(respArr) {
        //     respArr.forEach(data => {
        //         var g = svg
        //             .selectAll(".arc")
        //             .data(pie(respArr))
        //             .enter()
        //             .append("g")
        //             .attr("class", "arc");
        //         g
        //             .append("path")
        //             .attr("d", arc)
        //             .style("fill", function(d) {
        //                 return color(d.data.age);
        //             });
        //         g
        //             .append("text")
        //             // .attr("transform", function(d) {
        //             //     return "translate(" + arc.centroid(d) + ")";
        //             // })
        //             .attr("x", function(d) {
        //                 return arc.centroid(d)[0]
        //             })
        //             .attr("y", function(d) {
        //                 return arc.centroid(d)[1]
        //             })
        //             .attr("dy", ".35em")
        //             .text(function(d) {
        //                 return d.data.age;
        //             });
        //     })
        // });
    }
    render() {
        return <div id="donut"></div>
    }
}