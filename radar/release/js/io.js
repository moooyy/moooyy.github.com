var radar = {};
radar.io = {
    get: function (url, params, onsuccess, onerror) {
        radar.loading();
        var This = this;
        $.ajax({
            url: url,
            type: "GET",
            data: params,
            dataType: "JSON",
            success: This.getProcessHandler(onsuccess, onerror),
            error: onerror
        });
    },
    post: function (url, params, onsuccess, onerror) {
        radar.loading();
        var This = this;
        $.ajax({
            url: url,
            type: "POST",
            data: params,
            dataType: "JSON",
            success: This.getProcessHandler(onsuccess, onerror),
            error: onerror
        });
    },
    getProcessHandler: function (onsuccess, onerror) {
        var This = this;
        return function (data) {
            radar.loading(false);
            switch (data.code) {
            case 0:
                onsuccess(data.data);
                break;
            // case 2:
            //     This.businessError(onerror, data.message, data);
            //     break;
            // case 1:
            //     This.systemError(onerror, data.message || {}, data);
            //     break;
            // case 126:
            //     This.gotoIndex(onerror, data.message || {}, data);
            //     break;
            // case 127:
            //     This.gotoLogin(onerror, data.message || {}, data);
            //     break;
            default:
                This.unknowError(data);
            }
        }
    },
    businessError: function (callback, info, obj) {
        alert(info || '系统异常');
        // callback(info, obj);
        return;
    },
    systemError: function (callback, info, obj) {
        alert(info || '系统异常');
        // callback(info, obj);
        return;
    },
    gotoIndex: function (callback, info, obj) {
        alert(info || "无访问权限", function () {
            window.location.href = '#/';
        });
        return;
    },
    gotoLogin: function (callback, info, obj) {
        radar.login();
        callback(info, obj);
    },
    unknowError: function (data){
        radar.alert(data.message);
    }
}
radar.alert = function (msg) {
    $("#alert").html('<p>' + msg + '</p>');
    $("#alert").dialog({
        modal: true
    });
}
radar.peopleshow_current = "normal";
radar.peopleshow = function (option) {
    $("#" + radar.peopleshow_current).fadeOut(1000);
    $("#" + option).fadeIn(1000);
    radar.peopleshow_current = option;
}
radar.direct = function (e) {
    if(e){
        var target = e.newURL.split("#")[1];
    }else{
        var target = location.hash.split("#")[1];
    }
    if(target){
        $.get(target + ".html", function( data ) {
            $("#content").html(data);
            if(target === "delivery"){
                radar.initForm();
            }
        });
    }
    $("#"+target).parent().addClass("selected");
    var other = target == "delivery" ? "home" : "delivery";
    $("#"+other).parent().removeClass("selected");
}
radar.loading = function (s) {
    if(s === false){
        $("#loading").dialog("close")
    }else{
        $("#loading").dialog({
            modal: true,
            dialogClass: "loading",
            width: 80,
            height: 115
        })
    }
}