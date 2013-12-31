$(document).ready(function () {
    var
    province = {
        name: "provinces",
        en: [
            "311000", "315000", "334000", "333000", "332000", "318000", "319000", "303000", "328000", "308000", "330000", "326000",
            "305000", "323000", "321000", "329000", "320000", "312000", "314000", "313000", "309000", "307000", "306000", "325000", "304000",
            "331000", "301000", "316000", "317000", "324000", "322000", "310000", "327000", "302000"
        ],
        zh: [
            "黑龙江", "内蒙古", "台湾", "澳门", "香港", "吉林", "辽宁", "重庆", "西藏", "贵州", "云南", "四川",
            "甘肃", "陕西", "青海", "新疆", "宁夏", "河南", "湖南", "湖北", "海南", "广西", "广东", "上海", "福建",
            "浙江", "安徽", "江苏", "江西", "山东", "山西", "河北", "天津", "北京"
        ]
    },
        town = {
            name: "towns",
            en: [
                "335000", "306006", "303000", "306005", "312001", "314001", "318001", "323001", "313001", "316003", "331002", "322001", "310001",
                "316002", "306002", "319001", "324001", "331003", "307001", "316001", "317001", "305001", "330001", "324001", "301001", "331001",
                "309001", "331001", "308001", "306001", "304001", "306004", "306003", "326001", "327000", "302000"
            ],
            zh: [
                "其他", "珠海", "重庆", "中山", "郑州", "长沙", "长春", "西安", "武汉", "无锡", "温州", "太原", "石家庄", "苏州", "深圳", "沈阳", "青岛", "宁波", "南宁", "南京",
                "南昌", "兰州", "昆明", "济南", "合肥", "杭州", "海口", "哈尔滨", "贵阳", "广州", "福州", "佛山", "东莞", "成都", "天津", "北京"
            ]
        },
        age = {
            name: "ages",
            en: [
                "606", "605", "604", "603", "602", "601"
            ],
            zh: [
                "41以上", "36-40", "31-35", "26-30", "20-25", "0-20"
            ]
        },
        intrests = {
            name: "intrests",
            en: [
                "20001", "20002", "20003", "20004", "20005", "20006", "20107", "20108", "20109", "20210", "20211", "20212", "20213", "20214", "20215", "20216", "20317",
                "20318", "20319", "20320", "20321", "20322", "20323", "20424", "20425", "20426", "20527", "20528", "20529", "20530", "20631", "20632", "20633", "20634",
                "20635", "20736", "20737", "20738", "20739", "20740", "20741", "20742", "20743", "20744", "20745", "20846", "20847", "20848", "20849", "20850", "20951",
                "20952", "20953", "20954", "20955", "20956", "20957", "20958", "20959", "21060", "21061", "21062", "21063", "21064", "21065", "21166", "21167", "21168",
                "21169", "21270", "21271", "21272", "21273", "21274", "21275", "21376", "21377", "21378", "21379", "21380", "21381"
            ],
            zh: [
                "男装", "女装", "鞋子", "运动服饰", "箱包", "配饰", "美食美酒", "特产", "保健食品", "新房", "租房", "二手房", "旅游地产", "商业地产", "海外地产", "装修家居", "小微型车",
                "紧凑型车", "中大型车", "豪华", "SUV及其他", "改装车", "配件、车品", "美容美发", "美体", "整形", "钟表", "珠宝", "奢侈品", "收藏", "家电", "笔记本", "平板电脑", "手机",
                "相机", "篮球", "足球", "高尔夫", "赛车", "棋牌", "网球", "健身", "户外运动", "其他项目", "体育彩票", "国内", "出境", "周边自驾", "机票", "酒店", "电影",
                "电视", "音乐", "演出", "读书", "游戏", "网络视频", "星座", "追星", "中小学辅导", "考研", "外语", "留学移民", "公务员考试", "工作求职", "家政", "婚嫁", "宠物",
                "搬家", "股票", "基金", "保险", "黄金", "期货", "其他理财服务", "备孕", "孕期", "新生儿", "婴儿", "幼儿", "学龄前教育"
            ]
        }, temp = [];
    $('label[for="provinces"]').html(createChecboxs(province));
    $('label[for="towns"]').html(createChecboxs(town));
    $('label[for="age"]').html(createChecboxs(age));
    $('label[for="intrests"]').html(createChecboxs(intrests));

    function createChecboxs(data) {
        var str = "";
        for (var i = data.en.length - 1; i >= 0; i--) {
            str += '<input type="checkbox" class="' + data.name + '" value="' + data.en[i] + '"/>' + data.zh[i];
        }
        return str;
    }

    $("#starttime").datepicker();

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

    $('#extends-form-wrap').submit(function (event) {
        event.preventDefault();
        if (!$('input[name="startDate"]').val()) {
            $('#start').focus().attr('placeholder', '请选择投放时间');
            return false;
        }
        if (!$.isNumeric($('#price').val())) {
            $('#price').focus().attr('placeholder', '请填写单价，且请填写数字！');
            return false;
        }
        if (!$.isNumeric($('#crash').val()) && !$.isNumeric($('input[name="period"]').val())) {
            $("<span class='warning'>请至少填写一项!</span>").appendTo('.info');
            return false;
        }
        if (parseInt($('#frequence').val(), 10) > parseInt($('#threshold').val(), 10)) {
            $('<span class="warning">频次阈值大于或等于目标频次</span>').css("margin-left", "2em").appendTo('#frequences-title');
            return false;
        }
        $('#extends-settings input[type="checkbox"]:checked').each(function () {
            temp.push($(this).val());
        });

        $.ajax({
            url: 'localhost',
            type: "post",
            data: {
                customername: $('#customername').val(), //客户名称
                money: $('#crash').val(), //预算金额
                starttime: $('input[name=startDate]').val(), //开始时间
                period: $('#period').val(), //投放周期
                frequence: $('#frequence').val(), //目标频次
                threshold: $('#threshold').val(), //频次阀值
                price: $('#price').val(), //千次展示价格
                orientation: temp.join(',') //定向信息
            },
            jsonp: true,
            jsopCallback: "catchdata"
        }).done(function (data) {
            if (console && console.log) {
                console.log("Sample of data:", data.slice(0, 100));
            }
        });

    });
});
var pmps = {
    inhouse: {},
    totalnum: 0,
    boynum: 0,
    girlnum: 0,
    focusednum: 0,
    timeout: 0,
    playground: document.getElementById("playground"),
    "people": function () {
        return this.born();
    },
    "gather": function () {
        return this.init();
    },
    "rand": function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
};
pmps.people.prototype = {
    "id": 0,
    "sex": 1, // 0 : girl , 1 : boy ;
    "born": function () {
        var newp = document.createElement("div");
        var This = this;
        newp.className = "people";
        newp.id = "pmps" + pmps.totalnum;
        newp.onclick = function () {
            //alert(this.id);
            This.setFocus();
        }
        pmps.playground.appendChild(newp);
        pmps.inhouse[newp.id] = {
            "target": newp,
            "self": this
        }
        this.id = newp.id;
        pmps.totalnum++;
    },
    "setPos": function (x, y) {
        var z = y / 300;
        pmps.inhouse[this.id].target.style.cssText += "top:" + y + "px;left:" + x + "px;z-index:" + y + ";opacity:" + z + ";display:block;";
    },
    "setFocus": function () {
        if (!this.focus) {
            var newf = document.createElement("div");
            newf.className = "focus";
            newf.id = "focus" + this.id;
            newf.innerHTML = "<div class='rotate'></div>";
            pmps.playground.appendChild(newf);
            pmps.inhouse[this.id]["focus"] = newf;
            var left = pmps.inhouse[this.id].target.style.left.split("px")[0];
            var top = pmps.inhouse[this.id].target.style.top.split("px")[0];
            newf.style.cssText = "top:" + top + "px;left:" + left + "px;z-index:" + (top - 1);
            this.focus = 1;
            pmps.focusednum++;
        } else {
            pmps.playground.removeChild(pmps.inhouse[this.id]["focus"]);
            delete pmps.inhouse[this.id]["focus"];
            pmps.focusednum--;
            this.focus = 0;
        }
    },
    "setSex": function (sex) {
        if (sex) {

        } else {
            if (pmps.boynum > pmps.girlnum) {
                this.setGirl();
                this.sex = 0;
                pmps.inhouse[this.id]["sex"] = 0;
                pmps.girlnum++;
            } else {
                this.setBoy();
                this.sex = 1;
                pmps.inhouse[this.id]["sex"] = 1;
                pmps.boynum++;
            }
        }
    },
    "setBoy": function () {
        var bglist = ["./release/css/images/man_1.png", "./release/css/images/man_1.png", "./release/css/images/child_1.png"];
        pmps.inhouse[this.id].target.style.cssText += "background:url('" + bglist[pmps.rand(0, 100) % 3] + "') no-repeat;"
    },
    "setGirl": function () {
        var bglist = ["./release/css/images/woman_1.png", "./release/css/images/woman_1.png", "./release/css/images/child_1.png"];
        pmps.inhouse[this.id].target.style.cssText += "background:url('" + bglist[pmps.rand(0, 100) % 3] + "') no-repeat;"
    }
}
pmps.gather.prototype = {
    "width": 500,
    "height": 450,
    "setSize": function (w, h) {
        this.width = w || this.width;
        this.height = h || this.height;
    },
    "add": function (x, y) {
        var newpeople = new pmps.people();
        var x = x || pmps.rand(0, this.width);
        var y = y || pmps.rand(30, this.height);
        newpeople.setPos(x, y);
        newpeople.setSex();
    },
    "del": function () {
        var outsex = 0;
        if (pmps.boynum > pmps.girlnum) {
            outsex = 1;
            pmps.boynum--;
        } else {
            pmps.girlnum--;
        }
        for (var i in pmps.inhouse) {
            if (pmps.inhouse[i].sex == outsex) {
                pmps.playground.removeChild(pmps.inhouse[i].target);
                if (pmps.inhouse[i].focus) {
                    pmps.inhouse[i].self.setFocus();
                }
                pmps.totalnum--;
                delete pmps.inhouse[i];
                break;
            }
        }

    },
    "init": function () {
        var balance = 5;
        var average = Math.ceil(Math.sqrt(balance));
        var coord = [];
        for (var j = 1; j <= average; j++) {
            for (var i = average; i > 0; i--) {
                if(j%2){
                    coord.push({
                        x: (this.width / average) * i - 30,
                        y: (this.height / average) * j
                    });
                }else{
                    coord.push({
                        x: (this.width / average) * i + 30,
                        y: (this.height / average) * j
                    });
                }
            }
        }
        console.log(coord.reverse());
        // alert(balance);
        if (balance > 0) {
            while (balance--) {
                this.add(coord[balance].x, coord[balance].y);
            }
        } else if (balance < 0) {
            while (balance++) {
                this.del();
            }
        }
    }
}