(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

radar.initForm = function () {
    $("#starttime").datepicker({
        dateFormat: "yy-mm-dd"
    });
    var province = {
        name: "provinces",
        en: [{
            key: "311000",
            name: "黑龙江"
        }, {
            key: "315000",
            name: "内蒙古"
        }, {
            key: "334000",
            name: "台湾"
        }, {
            key: "333000",
            name: "澳门"
        }, {
            key: "332000",
            name: "香港"
        }, {
            key: "318000",
            name: "吉林"
        }, {
            key: "319000",
            name: "辽宁"
        }, {
            key: "303000",
            name: "重庆"
        }, {
            key: "328000",
            name: "西藏"
        }, {
            key: "308000",
            name: "贵州"
        }, {
            key: "330000",
            name: "云南"
        }, {
            key: "326000",
            name: "四川"
        }, {
            key: "305000",
            name: "甘肃"
        }, {
            key: "323000",
            name: "陕西"
        }, {
            key: "321000",
            name: "青海"
        }, {
            key: "329000",
            name: "新疆"
        }, {
            key: "320000",
            name: "宁夏"
        }, {
            key: "312000",
            name: "河南"
        }, {
            key: "314000",
            name: "湖南"
        }, {
            key: "313000",
            name: "湖北"
        }, {
            key: "309000",
            name: "海南"
        }, {
            key: "307000",
            name: "广西"
        }, {
            key: "306000",
            name: "广东"
        }, {
            key: "325000",
            name: "上海"
        }, {
            key: "304000",
            name: "福建"
        }, {
            key: "331000",
            name: "浙江"
        }, {
            key: "301000",
            name: "安徽"
        }, {
            key: "316000",
            name: "江苏"
        }, {
            key: "317000",
            name: "江西"
        }, {
            key: "324000",
            name: "山东"
        }, {
            key: "322000",
            name: "山西"
        }, {
            key: "310000",
            name: "河北"
        }, {
            key: "327000",
            name: "天津"
        }, {
            key: "302000",
            name: "北京"
        }]
    },
        town = {
            name: "towns",
            en: [{
                key: "335000",
                name: "其他"
            }, {
                key: "306006",
                name: "珠海"
            }, {
                key: "303000",
                name: "重庆"
            }, {
                key: "306005",
                name: "中山"
            }, {
                key: "312001",
                name: "郑州"
            }, {
                key: "314001",
                name: "长沙"
            }, {
                key: "318001",
                name: "长春"
            }, {
                key: "323001",
                name: "西安"
            }, {
                key: "313001",
                name: "武汉"
            }, {
                key: "316003",
                name: "无锡"
            }, {
                key: "331002",
                name: "温州"
            }, {
                key: "322001",
                name: "太原"
            }, {
                key: "310001",
                name: "石家庄"
            }, {
                key: "316002",
                name: "苏州"
            }, {
                key: "306002",
                name: "深圳"
            }, {
                key: "319001",
                name: "沈阳"
            }, {
                key: "324001",
                name: "青岛"
            }, {
                key: "331003",
                name: "宁波"
            }, {
                key: "307001",
                name: "南宁"
            }, {
                key: "316001",
                name: "南京"
            }, {
                key: "317001",
                name: "南昌"
            }, {
                key: "305001",
                name: "兰州"
            }, {
                key: "330001",
                name: "昆明"
            }, {
                key: "324001",
                name: "济南"
            }, {
                key: "331001",
                name: "哈尔滨"
            }, {
                key: "331001",
                name: "杭州"
            }, {
                key: "309001",
                name: "海口"
            }, {
                key: "301001",
                name: "合肥"
            }, {
                key: "308001",
                name: "贵阳"
            }, {
                key: "306001",
                name: "广州"
            }, {
                key: "304001",
                name: "福州"
            }, {
                key: "306004",
                name: "佛山"
            }, {
                key: "306003",
                name: "东莞"
            }, {
                key: "326001",
                name: "成都"
            }, {
                key: "327000",
                name: "天津"
            }, {
                key: "302000",
                name: "北京"
            }]
        },
        age = {
            name: "age",
            en: [{
                key: "606",
                name: "41以上"
            }, {
                key: "605",
                name: "36-40"
            }, {
                key: "604",
                name: "31-35"
            }, {
                key: "603",
                name: "26-30"
            }, {
                key: "602",
                name: "20-25"
            }, {
                key: "601",
                name: "0-20"
            }]
        },
        intrests = {
            name: "intrests",
            en: [{
                key: "20001",
                name: "男装"
            }, {
                key: "20002",
                name: "女装"
            }, {
                key: "20003",
                name: "鞋子"
            }, {
                key: "20004",
                name: "运动服饰"
            }, {
                key: "20005",
                name: "箱包"
            }, {
                key: "20006",
                name: "配饰"
            }, {
                key: "20107",
                name: "美食美酒"
            }, {
                key: "20108",
                name: "特产"
            }, {
                key: "20109",
                name: "保健食品"
            }, {
                key: "20210",
                name: "新房"
            }, {
                key: "20211",
                name: "租房"
            }, {
                key: "20212",
                name: "二手房"
            }, {
                key: "20213",
                name: "旅游地产"
            }, {
                key: "20214",
                name: "商业地产"
            }, {
                key: "20215",
                name: "海外地产"
            }, {
                key: "20216",
                name: "装修家居"
            }, {
                key: "20317",
                name: "小微型车"
            }, {
                key: "20318",
                name: "紧凑型车"
            }, {
                key: "20319",
                name: "中大型车"
            }, {
                key: "20320",
                name: "豪华"
            }, {
                key: "20321",
                name: "SUV及其他"
            }, {
                key: "20322",
                name: "改装车"
            }, {
                key: "20323",
                name: "配件、车品"
            }, {
                key: "20424",
                name: "美容美发"
            }, {
                key: "20425",
                name: "美体"
            }, {
                key: "20426",
                name: "整形"
            }, {
                key: "20527",
                name: "钟表"
            }, {
                key: "20528",
                name: "珠宝"
            }, {
                key: "20529",
                name: "奢侈品"
            }, {
                key: "20530",
                name: "收藏"
            }, {
                key: "20631",
                name: "家电"
            }, {
                key: "20632",
                name: "笔记本"
            }, {
                key: "20633",
                name: "平板电脑"
            }, {
                key: "20634",
                name: "手机"
            }, {
                key: "20635",
                name: "相机"
            }, {
                key: "20736",
                name: "篮球"
            }, {
                key: "20737",
                name: "足球"
            }, {
                key: "20738",
                name: "高尔夫"
            }, {
                key: "20739",
                name: "赛车"
            }, {
                key: "20740",
                name: "棋牌"
            }, {
                key: "20741",
                name: "网球"
            }, {
                key: "20742",
                name: "健身"
            }, {
                key: "20743",
                name: "户外运动"
            }, {
                key: "20744",
                name: "其他项目"
            }, {
                key: "20745",
                name: "体育彩票"
            }, {
                key: "20846",
                name: "国内"
            }, {
                key: "20847",
                name: "出境"
            }, {
                key: "20848",
                name: "周边自驾"
            }, {
                key: "20849",
                name: "机票"
            }, {
                key: "20850",
                name: "酒店"
            }, {
                key: "20951",
                name: "电影"
            }, {
                key: "20952",
                name: "电视"
            }, {
                key: "20953",
                name: "音乐"
            }, {
                key: "20954",
                name: "演出"
            }, {
                key: "20955",
                name: "读书"
            }, {
                key: "20956",
                name: "游戏"
            }, {
                key: "20957",
                name: "网络视频"
            }, {
                key: "20958",
                name: "星座"
            }, {
                key: "20959",
                name: "追星"
            }, {
                key: "21060",
                name: "中小学辅导"
            }, {
                key: "21061",
                name: "考研"
            }, {
                key: "21062",
                name: "外语"
            }, {
                key: "21063",
                name: "留学移民"
            }, {
                key: "21064",
                name: "公务员考试"
            }, {
                key: "21065",
                name: "工作求职"
            }, {
                key: "21166",
                name: "家政"
            }, {
                key: "21167",
                name: "婚嫁"
            }, {
                key: "21168",
                name: "宠物"
            }, {
                key: "21169",
                name: "搬家"
            }, {
                key: "21270",
                name: "股票"
            }, {
                key: "21271",
                name: "基金"
            }, {
                key: "21272",
                name: "保险"
            }, {
                key: "21273",
                name: "黄金"
            }, {
                key: "21274",
                name: "期货"
            }, {
                key: "21275",
                name: "其他理财服务"
            }, {
                key: "21376",
                name: "备孕"
            }, {
                key: "21377",
                name: "孕期"
            }, {
                key: "21378",
                name: "新生儿"
            }, {
                key: "21379",
                name: "婴儿"
            }, {
                key: "21380",
                name: "幼儿"
            }, {
                key: "21381",
                name: "学龄前教育"
            }]
        }, temp = [];

    function showTips(str) {
        return [
            '<div class="extends-info">',
            '<strong>', str, '</strong>',
            '<span></span>',
            '</div>'
        ].join('');
    }

    $('label[for="provinces"]').html(createChecboxs(province));
    $('label[for="towns"]').html(createChecboxs(town));
    $('label[for="age"]').html(createChecboxs(age));
    $('label[for="intrests"]').html(createChecboxs(intrests));

    function createChecboxs(data) {
        var str = "";
        for (var i = data.en.length - 1; i >= 0; i--) {
            str += '<label class="lscheck"><input type="checkbox" name="orientation" class="' + data.name + '" value="' + data.en[i].key + '"/> ' + data.en[i].name + '</label>';
        }
        return str;
    }


    $('input[name="area"]').change(function (event) {
        if ($('.provinces').is(':checked')) {
            $('.towns').attr("disabled", "disabled");
        } else {
            $('.towns').removeAttr("disabled", "disabled");
        }
        if ($('.towns').is(':checked')) {
            $('.provinces').attr("disabled", "disabled");
        } else {
            $('.provinces').removeAttr("disabled", "disabled");
        }
        return (event.target.value === 'province') ? (function () {
            $('#provinces').css("display", "block");
            $('#towns').css("display", "none");
        })() : (function () {
            $('#towns').css("display", "block");
            $('#provinces').css("display", "none");
        })();
    });
    $('#price , #crash , #period').keyup(function () {
        if ($('#price').val() || $('#crash').val() || $('#period').val()) {
            $('.extends-info').remove();
        }
    });
    $('select').change(function () {
        if (parseInt($('#frequence').val(), 10) < parseInt($('#threshold').val(), 10)) {
            $('.extends-info').remove();
        }
    });

    $("#money").blur(function () {
        radar.defaultMoney = radar.defaultMoney || parseInt(this.value, 10);
        if ($('input[name="sex"]:checked').val() == 500) {
            if (parseInt(this.value, 10) !== radar.lastMoney) {
                if (parseInt(this.value, 10) > radar.defaultMoney) {
                    radar.peopleshow_current !== "more" && radar.peopleshow("more");
                } else if (parseInt(this.value, 10) < radar.defaultMoney) {
                    radar.peopleshow_current !== "less" && radar.peopleshow("less");
                } else {
                    radar.peopleshow_current !== "normal" && radar.peopleshow("normal");
                }
            }
            radar.lastMoney = this.value;
        }
    });
    $("input[name='sex']").each(function (i, el) {
        $(el).click(function () {
            switch (this.id) {
            case "male":
                radar.peopleshow_current !== "male" && radar.peopleshow("male");
                break;
            case "female":
                radar.peopleshow_current !== "female" && radar.peopleshow("female");
                break;
            default:
                radar.peopleshow_current !== "normal" && radar.peopleshow("normal");
            }
        })
    })

    $('#extends-form-wrap').bind("submit", function (event) {
        event.preventDefault();
        if (!$("#starttime").val()) {
            $('#starttime').focus();
            return false;
        }
        if (!$.isNumeric($('#price').val())) {
            $(showTips("请填写数字!")).insertAfter('#price');
            $('#price').focus();
            return false;
        }
        if (!$.isNumeric($('#money').val()) && !$.isNumeric($('#period').val())) {
            $(showTips("请至少填写一项!")).insertAfter('#money');
            $(showTips("请至少填写一项!")).insertAfter('#period');
            return false;
        }
        if (parseInt($('#frequence').val(), 10) > parseInt($('#threshold').val(), 10)) {
            $(showTips("频次阈值大于或等于目标频次")).insertAfter('#frequence').css("top", "-20%");
            return false;
        }
        $('#extends-settings input[type="checkbox"]:checked').each(function () {
            temp.push($(this).val());
        });
        // $.ajax({
        //   url : 'localhost',
        //   type: "post",
        //   data : {
        //     customername : $('#customername').val(), //客户名称
        //     money : $('#crash').val(), //预算金额
        //     starttime : $("#start").val(), //开始时间
        //     period : $('#period').val(), //投放周期
        //     frequence : $('#frequence').val(), //目标频次
        //     threshold : $('#threshold').val(), //频次阀值
        //     price : $('#price').val(), //千次展示价格
        //     orientation : temp.join('') //定向信息
        //   }
        // }).done(function( data ) {
        //   if ( console && console.log ) {
        //     console.log( "Sample of data:", data.slice( 0, 100 ) );
        //   }
        // });
        var params = $("#extends-form-wrap").serializeJson();
        if (params.orientation) {
            params.orientation = params.orientation.join();
        }
        radar.io.post('http://zhouyi.sina.com.cn/longyuan-radar/formula/run', params, function (data) {
            radar.dataSource.add(data.result[0]);
        });
    });
}