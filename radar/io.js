var radar = {};
radar.io = {
    get: function (url, params, onsuccess, onerror) {
        $.ajax({
            url: url,
            type: "GET",
            data: params,
            dataType: "JSON",
            success: onsuccess,
            error: onerror
        });
    },
    post: function (url, params, onsuccess, onerror) {
        $.ajax({
            url: url,
            type: "POST",
            data: params,
            dataType: "JSON",
            success: onsuccess,
            error: onerror
        });
    },
    getProcessHandler: function (onsuccess, onerror) {
        return function (data) {
            switch (data.status) {
                case 0: onsuccess(data);
                case 2: businessError(onerror, data.statusInfo, data);
                    break;
                case 1: systemError(onerror, data.statusInfo || {}, data);
                    break;
                case 126: gotoIndex(onerror, data.statusInfo || {}, data);
                    break;
                case 127: gotoLogin(onerror, data.statusInfo || {}, data);
                    break;
                default: unknowError(callback);
            }
        }
    }
}