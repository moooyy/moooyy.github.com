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
            });
        })])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(simData, function (data) {
            return d3.max(data.values, function (d) {
                return d.number;
            });
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
    // function pathTween (d) {
    //     d = d.values;
    //     var interpolate = d3.scale.quantile()
    //         .domain([0,1])
    //         .range(d3.range(1, d.length + 1));
    //     return function(t) {
    //         return line(d.slice(0, interpolate(t)));
    //     };
    // }
    function pathTween (d) {
        //M0,2L3,5C98,34 将每个画线L和弧C 分成一个数组
        var path = line(d.values).replace(/([CL])/g, '<>$1').split('<>');
        var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, path.length + 1));
        return function (t) {
           return path.slice(0, interpolate(t)).join();
        };
    }
    plans.append('path').attr('class', 'line')
        .attr('d', function (d) {return line(d.values[0]);})
        .attr('fill', 'none')
        .attr('stroke-width', config.strokeWidth + 'px')
        .attr('stroke', function (d) {return config.color(d.name);})
        .transition()
            .duration(1000)
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

}
var radar = window.radar = window.radar || {};
radar.drawLineChart = radar.drawLineChart || drawLineChart;

})();
"use strict";
var RadarChart;
var d3;
(function () {
    //
    //原始数据格式
    // var originData = [
    //     {
    //         money : 30,
    //         cycle : 13,
    //         frequency : 24,
    //         threshold : 20,
    //         cpnuv : 6,
    //         cpuv : 8,
    //         nuv : 9,
    //         pv : 4,
    //         uv : 8
    //     },
    //     {
    //         money : 20,
    //         cycle : 3,
    //         frequency : 28,
    //         threshold : 16,
    //         cpnuv : 9,
    //         cpuv : 12,
    //         nuv : 15,
    //         pv : 6,
    //         uv : 10
    //     }
    // ];

    var map = {
        money : '金额',
        period : '周期',
        frequence : '上限',
        threshold : '下限',
        cpnuv : 'CPN+UV',
        nuv : 'NUV',
        pv : 'PV',
        uv : 'UV'
    };
    //
    //
    
    /**
     * [processing 将原始数据originData处理成simData类型]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function processing (data) {
        var result = [];
        var f = function (d) {
            return d[name];
        };
        if (data.length === 0) {
            data.push({
                money : 0,
                period : 0,
                frequence : 0,
                threshold : 0,
                cpnuv : 0,
                cpuv : 0,
                nuv : 0,
                pv : 0,
                uv : 0
            });
        }

        for (var name in map) {
            if (map.hasOwnProperty(name)) {
                // var name = 'money';
                var scale = d3.scale.linear()
                    .domain([0, d3.max(data, f)])
                    .range([0, 10]);
                for (var i = data.length - 1; i >= 0; i--) {
                    if (result[i]) {
                        result[i].push({
                            axis: map[name],
                            value: scale(data[i][name])
                        });
                    } else {
                        result[i] = [{
                            axis: map[name],
                            value: scale(data[i][name])
                        }];
                    }
                }
            }
        }
                
        return result;
    }

    // console.log(processing(originData));

    // var simData = [
    //     [
    //         {axis: '金额', value: 10},
    //         {axis: '周期', value: 15},
    //         {axis: '上限', value: 11},
    //         {axis: '下限', value: 10},
    //         {axis: 'CPN+UV', value: 8},
    //         {axis: 'CPUV', value: 7},
    //         {axis: 'N+UV', value: 10},
    //         {axis: 'PV', value: 6},
    //         {axis: 'UV', value: 12}
    //     ],
    //     [
    //         {axis: '金额', value: 7},
    //         {axis: '周期', value: 13},
    //         {axis: '上限', value: 10},
    //         {axis: '下限', value: 6},
    //         {axis: 'CPN+UV', value: 8},
    //         {axis: 'CPUV', value: 10},
    //         {axis: 'N+UV', value: 5},
    //         {axis: 'PV', value: 10},
    //         {axis: 'UV', value: 10}
    //     ]
    // ];

    // simData = processing(originData);
    // RadarChart.draw("#radarContent", simData, {
    //     w: 300,
    //     h: 300,
    //     radius: 3,
    //     opacityArea: 0.2,
    //     maxValue: 15
    // });
    // 
    function draw (id ,data) {
        var xOffset = 150;
        var marginTop = 60;
        var svg = d3.select(id).append('svg');
        svg.selectAll('circle').data(data).enter().append('circle')
            .attr('cy', function (d, i) {
                return marginTop + i * 50;
            })
            .attr('cx', function () {
                return xOffset;
            })
            .attr('r', '5')
            .attr('fill', function (d) {
                return d.color;
            });
        svg.selectAll('text').data(data).enter().append('text')
            .text(function (d) {
                return d.text;
            })
            .attr('x', function () {
                return xOffset + 10;
            })
            .attr('y', function (d, i) {
                return marginTop + i * 50 + 5;
            });
    }

    function drawRadar (originData, indexList) {
        var i,
            len = originData.length,
            ele,
            color = d3.scale.category10(),
            left = [],
            right = [];
        for (i = -1; ++i < len;) {
            ele = {
                text: '方案' + indexList[i],
                color: color(i)
            };
            if (i % 2 === 0) {
                left.push(ele);
            } else {
                right.push(ele);
            }
        }

        d3.select('#left').select('svg').remove();
        draw('#left', left);
        d3.select('#right').select('svg').remove();
        draw('#right', right);

        var simData = processing(originData);
        RadarChart.draw("#radarContent", simData, {
            w: 300,
            h: 300,
            radius: 3,
            opacityArea: 0.2,
            maxValue: 15
        });
    }

    var radar = window.radar = window.radar || {};
    radar.drawRadar = radar.drawRadar || drawRadar;
})();
'use strict';
var $;
(function () {
                
    var tableData = [
        {
            name : 'cow',
            money : 30022222222,
            exposure : 23,
            price : 6,
            period : 6,
            frequence : 5,
            threshold : 7,
            uv : 8,
            pv : 1234,
            nuv : 12123,
            igrp : 1232,
            reach : 12,
            reachfrequency : 45,
            cprp : 34,
            cpuv : 23,
            cpnuv : 12,
            curve : [
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
                        }
                    ]
                }
            ]
        },
        {
            name : 'cow',
            money : 30022222,
            exposure : 18,
            price : 6,
            period : 7,
            frequence : 5,
            threshold : 7,
            uv : 12,
            pv : 1234,
            nuv : 12123,
            igrp : 1232,
            reach : 12,
            reachfrequency : 45,
            cprp : 34,
            cpuv : 23,
            cpnuv : 12,
            curve : [
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
                        }
                    ]
                },
                {
                    name: 'NUV',
                    values:[
                        {
                            days: 0,
                            number: 0
                        },
                        {
                            days: 1,
                            number: 8
                        },
                        {
                            days: 2,
                            number: 8
                        },
                        {
                            days: 3,
                            number: 16
                        }
                    ]
                }
            ]
        },
        {
            name : 'cow',
            money : 4002222,
            exposure : 28,
            price : 12,
            period : 5,
            frequence : 8,
            threshold : 9,
            uv : 12,
            pv : 1234,
            nuv : 12123,
            igrp : 1232,
            reach : 12,
            reachfrequency : 45,
            cprp : 34,
            cpuv : 23,
            cpnuv : 12,
            curve : [
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
                        }
                    ]
                },
                {
                    name: 'NUV',
                    values:[
                        {
                            days: 0,
                            number: 0
                        },
                        {
                            days: 1,
                            number: 8
                        },
                        {
                            days: 2,
                            number: 8
                        },
                        {
                            days: 3,
                            number: 16
                        }
                    ]
                }
            ]
        }
    ];
    /**
     * [formatNumber comma函数 ]
     * @param  {[Number]} number [这种类型数字876922.4334]
     * @return {[String]}        [876,922.4334]
     */
    function formatNumber (number) {
        var arr = ('' + number).split('.');
        var str = arr[0].split('').reverse().join('');
        str = str.replace(/(\d{3})/g, '$1,').replace(/,$/, '');
        str = str.split('').reverse().join('');
        arr[0] = str;
        return arr.join('.');
    }
    
    var fields = [
        {
            title : '选择',
            width : 40,
            content : function (data, index) {
                return '<input index=' + index + ' type="checkbox" checked>';
            }
        },
        {
            title : '序号',
            width : 30,
            content : function (data, index) {
                return (index+1);
            }
        },
        {
            title : '客户名称',
            content : 'customername'
        },
        {
            title : '金额',
            width : 72,
            content : function (data) {
                return formatNumber(data.money);
            }
        },
        {
            title : '曝光量',
            width : 72,
            content : function (data) {
                return formatNumber(data.exposure);
            }
        },
        {
            title : '千次展示单价(元)',
            width : 72,
            content : function (data) {
                return formatNumber(data.price);
            }
        },
        {
            title : '周期(天)',
            width : 72,
            content : function (data) {
                return formatNumber(data.period);
            }
        },
        {
            title : '目标频次(次)',
            width : 72,
            content : function (data) {
                return formatNumber(data.frequence);
            }
        },
        {
            title : '频次阀值(次)',
            width : 72,
            content : function (data) {
                return formatNumber(data.threshold);
            }
        },
        {
            title : function () {
                return '<th rowspan="10" style="border:none;width:220px;vertical-align:top;"><div style="overflow:scroll;width:220px;">' +
                    '<table id="subTable" style="border:none;width:576px;"></table></div></th>';
            }
        },
        {
            title : '操作',
            width : 150,
            content : function (data, index) {
                return '<a index="' + index + '" class="del" href="javascript:void(0);">删除</a> <a class="opener" index="' +
                    index + '" href="javascript:void(0);">查看curve</a>';
            }
        }
    ];
    var subFileds = [
        {
            title : 'UV',
            width : 72,
            content : function (data) {
                return formatNumber(data.uv);
            }
        },
        {
            title : 'PV',
            width : 72,
            content : function (data) {
                return formatNumber(data.pv);
            }
        },
        {
            title : 'N+UV',
            width : 72,
            content : function (data) {
                return formatNumber(data.nuv);
            }
        },
        {
            title : 'iGRP',
            width : 72,
            content : function (data) {
                return formatNumber(data.igrp);
            }
        },
        {
            title : 'Reach%',
            width : 72,
            content : function (data) {
                return formatNumber(data.reach);
            }
        },
        {
            title : '接触频次',
            width : 72,
            content : function (data) {
                return formatNumber(data.reachfrequency);
            }
        },
        {
            title : 'CPUV',
            width : 72,
            content : function (data) {
                return formatNumber(data.cpuv);
            }
        },
        {
            title : 'CPN+UV',
            width : 72,
            content : function (data) {
                return formatNumber(data.cpnuv);
            }
        }
    ];
    
    function generateHead (fields) {
        var i = 0,
            len,
            attr,
            row = '';

        for (i = 0, len = fields.length; i < len; i++) {
            attr = fields[i].width ? ('style="width:' + fields[i].width + 'px"') : '';
            if (typeof fields[i].title === 'string') {
                row += '<th ' + attr + '>' + fields[i].title + '</th>';
            } else if (typeof fields[i].title === 'function') {
                row += fields[i].title();
            }
        }
        return '<tr>' + row + '</tr>';
    }

    function generateRow (data, fields, index) {
        var i = 0,
            len,
            row = '',
            cell = '',
            attr = '';
        for (i = 0, len = fields.length; i < len; i++) {
            attr = fields[i].width ? ('style="width:' + fields[i].width + 'px"') : '';
            if (typeof fields[i].content === 'string') {
                row += '<td ' + attr + '>' + (data[fields[i].content] || '') + '</td>';
            } else if (typeof fields[i].content === 'function') {
                cell = fields[i].content(data, index);
                if(typeof cell === "undefined" || typeof cell === "null"){
                    cell = "";
                }
                if (!/^<td>(.*?)<\/td>$/.test(cell)) {
                    cell = '<td ' + attr + '>' + cell + '</td>';
                }
                row += cell;
            }
        }
        return '<tr>' + row + '</tr>';
    }

    function generateTable(fields, tableData) {
        var i = 0,
            len,
            tableContent = '',
            tableHead = generateHead(fields);

        for (i = 0, len = tableData.length; i < len; i++) {
            tableContent += generateRow(tableData[i], fields, i);
        }
        return tableHead + tableContent;
    }

    function drawTable (tableData) {
        tableData = tableData || dataSource.get();
        var ft = document.getElementById('finalTable');
        if(ft){
            ft.innerHTML = generateTable(fields, tableData);
        }

        var subTable = document.getElementById('subTable');
        if(subTable){
            subTable.innerHTML = generateTable(subFileds, tableData);
        }
        $("#tablearea").show();
        $('#finalTable input[type=checkbox]').bind('click', checkHandler);
        checkHandler();
        $('a.opener').bind('click', clickHandler);
        $('a.del').bind('click', delHandler);
    }

    function clickHandler () {
        var index = $(this).attr('index');
        var data = radar.dataSource.get(parseInt(index, 10));
        radar.drawLineChart('#lineChartContent', data[0].curve);
        $('#dialog').dialog({
            modal: true,
            width: 620,
            height: 380
        });
    }

    function delHandler () {
            radar.dataSource.remove($(this).attr('index'));
        }

    var timer ;
    function checkHandler () {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            var indexList = [];
            $('#finalTable input[type=checkbox]:checked').each(function () {
                indexList.push($(this).attr('index'));
            });
            var data = radar.dataSource.get(indexList);
            radar.drawRadar(data, indexList);
        }, 500);
    }

    var dataSource = {
        datas : [],
        get : function (indexList) {
            var result = [];
            indexList = (typeof indexList === 'string') ? parseInt(indexList, 10) : indexList;
            if (typeof indexList === 'number') {
                result.push(this.datas[indexList]);
            } else if (indexList instanceof Array) {
                for (var i = indexList.length - 1; i >= 0; i--) {
                    result.push(this.datas[parseInt(indexList[i], 10)]);
                }
            } else {
                result = this.datas;
            }
            return result;
        },
        add : function (d) {
            this.datas.push(d);
            if (this.datas.length > 10) {
                this.datas.splice(0, 1);
            }
            drawTable();
        },
        remove : function (index) {
            this.datas.splice(parseInt(index, 10), 1);
            drawTable();
        }
    };

    // dataSource.datas = tableData;

    var radar = window.radar = window.radar || {};
    radar.dataSource = radar.dataSource || dataSource;

    //drawTable();

    // $('#dialog').dialog({
    //     autoOpen: false,
    //     modal: true,
    //     width: 620,
    //     height: 380
    // });
})();
