"use strict";
var d3;
(function () {
function drawLineChart(id, data) {

    var config = {
        w : 600,
        h : 250,
        marginTop : 20,
        marginRight : 80,
        marginBottom : 50,
        marginLeft : 30,
        strokeWidth : 3,
        color: d3.scale.category10()
    };
    var width = config.w - config.marginLeft - config.marginRight;
    var height = config.h - config.marginTop - config.marginBottom;
    var marginTop = config.marginTop;
    var marginLeft = config.marginLeft;
    var simData = [
        {
            name: 'NV',
            values:[
                {
                    days: 0,
                    number: 0
                },
                {
                    days: 1,
                    number: 2
                },
                {
                    days: 2,
                    number: 16
                },
                {
                    days: 3,
                    number: 10
                },
                {
                    days: 4,
                    number: 8
                },
                {
                    days: 5,
                    number: 20
                },
                {
                    days: 6,
                    number: 24
                },
                {
                    days: 7,
                    number: 26
                },
                {
                    days: 8,
                    number: 23
                },
                {
                    days: 9,
                    number: 28
                },
                {
                    days: 10,
                    number: 32
                },
                {
                    days: 11,
                    number: 35
                },
                {
                    days: 12,
                    number: 40
                }
            ]
        },
        {
            name: 'PV',
            values:[
                {
                    days: 0,
                    number: 0
                },
                {
                    days: 1,
                    number: 3
                },
                {
                    days: 2,
                    number: 8
                },
                {
                    days: 3,
                    number: 10
                },
                {
                    days: 4,
                    number: 12
                },
                {
                    days: 5,
                    number: 16
                },
                {
                    days: 6,
                    number: 18
                },
                {
                    days: 7,
                    number: 21
                },
                {
                    days: 8,
                    number: 24
                },
                {
                    days: 9,
                    number: 23
                },
                {
                    days: 10,
                    number: 30
                },
                {
                    days: 11,
                    number: 35
                },
                {
                    days: 12,
                    number: 39
                }
            ]
        }
    ];
    simData = data || simData;
    //比例尺 xScale yScale 将数据对应到实际宽度
    var xScale = d3.scale.linear()
        .domain([0, d3.max(simData, function (data) {
            return d3.max(data.values, function (d) {
                return d.days;
            })
        })])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(simData, function (data) {
            return d3.max(data.values, function (d) {
                return d.number;
            })
        })])
        .range([height, 0]);

    d3.select(id).select('svg').remove();
    //图表SVG
    var lineChartSvg = d3.select(id).append('svg')
        .attr('width', config.w)
        .attr('height', config.h)
        .append('g')
            .attr('transform', 'translate(' + marginLeft + ' , ' + marginTop + ')');

    lineChartSvg.append('text')
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number (10e7)");

    d3.select('#lineChartContent').select('svg').append('text')
        .attr('y', config.h - 6)
        .attr('x', width / 2)
        .text('days');

    //坐标轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    lineChartSvg.append('g')
        .attr('class', 'axis')
        .call(xAxis)
        .attr('transform', 'translate(0, ' + height + ')');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    lineChartSvg.append('g')
        .attr('class', 'axis')
        .call(yAxis);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return xScale(d.days); })
        .y(function(d) { return yScale(d.number); });

    var plans = lineChartSvg.selectAll('.plan').data(simData).enter().append('g').attr('class', 'plan');
    function pathTween (d) {
        d = d.values;
        var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, d.length + 1));
        return function(t) {
            return line(d.slice(0, interpolate(t)));
        };
    }
    plans.append('path').attr('class', 'line')
        .attr('d', function (d) {return line(d.values[0]);})
        .attr('fill', 'none')
        .attr('stroke-width', config.strokeWidth + 'px')
        .attr('stroke', function (d) {return config.color(d.name);})
        .transition()
            // .duration(1000)
            .attrTween('d', pathTween);

    d3.select(id).select('svg').selectAll('.colorline').data(simData).enter()
        .append('line')
            .attr('class', 'colorline')
            .attr('x1', config.w - config.marginRight + 10)
            .attr('x2', config.w - config.marginRight + 40)
            .attr('y1', function (d, i) {
                return i * 50 + 20;
            })
            .attr('y2', function (d, i) {
                return i * 50 + 20;
            })
            .attr('stroke', function (d) {
                return config.color(d.name);
            })
            .attr('stroke-width', config.strokeWidth + 'px');

    d3.select(id).select('svg').selectAll('.colortext').data(simData).enter()
        .append('text')
            .attr('class', 'colortext')
            .attr('x', config.w - config.marginRight + 50)
            .attr('y', function (d, i) {
                return i * 50 + 25;
            })
            .text(function (d) {
                return d.name;
            });


    console.debug(plans);
}
var radar = window.radar = window.radar || {};
radar.drawLineChart = radar.drawLineChart || drawLineChart;

})();