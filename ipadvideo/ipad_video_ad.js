//定义ipad广告初始化方法;
var ipad_video_ad = {
    holderId: "p_player", // 外围id
    originalVideoId: "video", // 视频id
    originalVideoElement: "", // 视频DOM
    originalVideo: "", // 视频原片素材
    headArray: [], // 前插片素材堆栈
    pauseArray: [], // 暂停素材堆栈
    headconnect: 0, // 加载完成前插片数量, 成功/失败 都记
    maxhead: 1, // 最大前插片数量
    headTime: 3, // 前插片播放时长
    overtime: 10, //等待超时时长
    playlist: 0, // 当前播放序列
    countcomplete: 0, //倒计时结束
    domcomplete: 0, //容器加载完成
    headcomplete: 0, //前插片加载完成
    isFirstPlay: true, // 是否首次播放标志位
    event: {
        on : function () {},
        un : function () {}
    },
    waitUntil: function (condition, overtime, succ, fail) { // 等待方法 [条件,超时,成功,失败]
        ipad_video_ad.showLoading(true);
        var wait = setInterval(function () {
            var nowtime = +new Date();
            if (eval(condition)) {
                ipad_video_ad.showLoading(false);
                clearTimeout(wait);
                try {
                    succ();
                } catch (e) {};
            }
        }, 100);
        setTimeout(function () {
            wait && clearInterval(wait);
            try {
                fail();
            } catch (e) {};
        }, overtime * 1000)
    },
    showLoading: function (y) {
        if (y) {
            var loading = document.getElementById("loading") || document.createElement("div");
            loading.id = "loading";
            loading.style.cssText = "position:absolute;top:50%;left:50%;width:100px;height:100px;background:url(loading.gif) no-repeat;margin:-50px;display:block;"
            document.getElementById(ipad_video_ad.holderId).appendChild(loading);
        } else {
            document.getElementById("loading").style.display = "none";
        }
    },
    countdown: function (settime) { // 倒计时
        var count = document.getElementById("countdown"),
            totalTime = settime * (ipad_video_ad.headArray.length - ipad_video_ad.playlist),
            oneTime = settime;

        if (!count) {
            count = document.createElement("div");
            count.id = "countdown";
            count.style.cssText = "position:absolute;top:0;right:0;width:300px;height:25px;font:12px/25px Verdana,'宋体';text-align:center;background:rgba(255,255,255,.4);text-shadow:#333 1px 1px 3px;color:#333;"
            document.getElementById(ipad_video_ad.holderId).appendChild(count);
        }
        count.innerHTML = '点击下方广告 了解更多信息, 广告时间还剩 <span id="countNum">' + totalTime + '</span> 秒';
        document.getElementById("countNum").style.cssText = "color:#ee0;";
        ipad_video_ad.showLoading(true);
        sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, "canplay", startCount);

        function startCount() { //缓冲完成再开始计时
            sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, "canplay", startCount);
            ipad_video_ad.showLoading(false);
            ipad_video_ad.countcomplete = setInterval(function () {
                if (totalTime === 1) {
                    count.parentNode.removeChild(count);
                } else {
                    document.getElementById("countNum").innerHTML = --totalTime;
                }
                if (oneTime === 1) {
                    clearInterval(ipad_video_ad.countcomplete);
                    oneTime = settime;
                    ipad_video_ad.playHead();
                } else {
                    oneTime--;
                }
            }, 1000);
        }
    },
    playHead: function () { // 播放视频前插
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'ended', ipad_video_ad.onEnd);
        if (ipad_video_ad.headArray[ipad_video_ad.playlist]) {
            ipad_video_ad.originalVideoElement.pause();
            ipad_video_ad.originalVideoElement.controls = false;
            ipad_video_ad.countdown(ipad_video_ad.headTime);
            ipad_video_ad.originalVideoElement.src = ipad_video_ad.headArray[ipad_video_ad.playlist].src[0];
            ipad_video_ad.originalVideoElement.play();
        } else if(ipad_video_ad.playlist != "Original"){
            ipad_video_ad.playOriVideo();
        }
        if (typeof ipad_video_ad.playlist == "number") {
            ipad_video_ad.playlist++;
        }
        ipad_video_ad.isFirstPlay = false;

    },
    playOriVideo: function () { //播放视频正片
        ipad_video_ad.playlist = "Original";
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'ended', ipad_video_ad.onEnd);
        ipad_video_ad.originalVideoElement.controls = true;
        ipad_video_ad.originalVideoElement.src = ipad_video_ad.originalVideo;
        sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, "canplay", ipad_video_ad.originalVideoElement.play);
        sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'pause', ipad_video_ad.onPause);
        sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'ended', ipad_video_ad.onEnd);
    },
    showPause: function (data) {
        ipad_video_ad.playlist = "Pause";
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'pause', ipad_video_ad.onPause);
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, "canplay", ipad_video_ad.originalVideoElement.play);
        if (data) {
            var ad = data.content[0],
                w = data.size.split("*")[0],
                h = data.size.split("*")[1];
            if (ad.src[0]) {
                var pause = document.getElementById("pause") || document.createElement("div");
                pause.id = "pause";
                pause.style.cssText = "position:absolute;top:50%;left:50%;width:" + w + "px;height:" + h + "px;margin-left:-" + w / 2 + "px;margin-top:-" + h / 2 + "px;display:block;filter:alopha(opacity=70);opacity:.7;"
                pause.innerHTML = sinaadToolkit.ad.createHTML(ad.type[0], ad.src[0], w, h, ad.link[0], ad.monitor);
                sinaadToolkit.array.each(ad.pv, function (item) {
                    sinaadToolkit.sio.log(ad.pv)
                });
                document.getElementById(ipad_video_ad.holderId).appendChild(pause);
            }
        } else {
            sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'pause', ipad_video_ad.onPause);
            sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
            document.getElementById("pause").style.display = "none";
        }
        sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
    },
    onPlay: function () { // 视频播放事件
        if (ipad_video_ad.isFirstPlay) { // 播放前插
            ipad_video_ad.originalVideoElement.pause();
            ipad_video_ad.waitUntil("ipad_video_ad.headconnect === ipad_video_ad.maxhead", 10, ipad_video_ad.playHead, ipad_video_ad.playHead);
        } else if (ipad_video_ad.playlist === "Pause") { //继续播放
            ipad_video_ad.showPause(false);
            ipad_video_ad.originalVideoElement.play();
            ipad_video_ad.playlist = "Original";
        } else { // 播放正片
            ipad_video_ad.playOriVideo();
        };
    },
    onEnd: function () { // 视频播放结束事件
        sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'pause', ipad_video_ad.onPause);
        ipad_video_ad.playlist = "End";
        ipad_video_ad.showPause(false);
        ipad_video_ad.init();
    },
    onPause: function () { // 视频暂停事件
        ipad_video_ad.showPause(ipad_video_ad.pauseArray[0]);
    },
    preload: function (src) { // 预加载资源
        if (src) {
            var pre = document.createElement("iframe");
            pre.src = src;
            document.body.appendChild(pre);
        }
    },
    initVideoElement: function () { // 初始化视频容器
        if (document.getElementById(ipad_video_ad.originalVideoId)) {
            clearInterval(ipad_video_ad.domcomplete);
            ipad_video_ad.originalVideoElement = document.getElementById(ipad_video_ad.originalVideoId);
            ipad_video_ad.originalVideo = ipad_video_ad.originalVideoElement.src;
            sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'ended', ipad_video_ad.onEnd);
            sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
            sinaadToolkit.event.un(ipad_video_ad.originalVideoElement, 'pause', ipad_video_ad.onPause);
            sinaadToolkit.event.on(ipad_video_ad.originalVideoElement, 'play', ipad_video_ad.onPlay);
        }
    },
    init: function () { //初始化接口
        ipad_video_ad.isFirstPlay = true;
        ipad_video_ad.playlist = 0;
        ipad_video_ad.domcomplete = setInterval(ipad_video_ad.initVideoElement, 50);
    }
};

ipad_video_ad.init();