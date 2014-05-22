var longyuan = window.longyuan || {};
longyuan.loading = function (s) {
    if (!this.loadcover) {
        var fragment = [
        "<div id='loadcover' class='loadcover'>",
            "<div id='load_up' class='loadcover_up'>",
                "<div id='load_logo' class='loadcover_logo'>",
                    "<div id='load_gear' class='loadcover_gear'>",
                        "<div class='loadcover_gear_shadow'></div>",
                        "<div class='loadgear1'></div>",
                        "<div class='loadgear2'></div>",
                        "<div class='loadgear3'></div>",
                        "<div class='loadgear4'></div>",
                    "</div>",
                "</div>",
            "</div>",
            "<div id='load_down' class='loadcover_down'></div>",
        "</div>"].join("");
        this.loadcover = $(fragment);
        $("body").append(this.loadcover);
    }
    $("#loadcover").css({
        width: $(window).width(),
        height: $(window).height()
    });
    if (s === false) {
        $("#load_up").animate({
            "top": "-550px"
        }, 300, function () {
            $(this).hide();
            $("#loadcover").hide();
        });
        $("#load_down").animate({
            "top": $(window).height()
        }, 300, function () {
            $(this).hide();
        });
    } else {
        $("#loadcover").show();
        $("#load_up").css({
            "display": "block",
            "top": "-550px"
        }).animate({
            "top": "0"
        }, 300, function () {});
        $("#load_down").css({
            "display": "block",
            "top": $(window).height()
        }).animate({
            "top": "551px"
        }, 300, function () {});
        $("#load_gear").fadeIn(1000);
    }
};