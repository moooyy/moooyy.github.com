var radar = {};
radar.io = {
    get: function (url, params, onsuccess, onerror) {
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
            switch (data.code) {
            case 0:
                onsuccess(data.data);
                break;
            case 2:
                This.businessError(onerror, data.statusInfo, data);
                break;
            case 1:
                This.systemError(onerror, data.statusInfo || {}, data);
                break;
            case 126:
                This.gotoIndex(onerror, data.statusInfo || {}, data);
                break;
            case 127:
                This.gotoLogin(onerror, data.statusInfo || {}, data);
                break;
            default:
                unknowError(callback);
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