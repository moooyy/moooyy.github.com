var drag = window.drag || {};
drag.initExist = function () {
    window.existTops = [];
    $("#frameholder>div").each(function (i, item) {
        window.existTops.push($(item).offset().top + $(item).outerHeight()/2);
    });
};
drag.create = function (type) {
    var item = $(widgetConfig[type]["template"]);
    $("body").append(item);
    window.dragItem = item;
    return item;
}
drag.alignItem = function (item, x, y) {
    item.css({"position":"absolute",
        "opacity":".3",
        "z-index":"10000",
        "left":(x+5) + "px",
        "top": (y+5) + "px"
    })
}
drag.drop = function (item) {
    item.remove();
    window.dragItem = null;
}
drag.occupy = function (x, y, w, h, autofill) {
    drag.initExist();
    if(drag.isIn($("#frameholder"),x,y)){
        if(window.occupy){

        }else{
            window.occupy = $('<div id="occupy"></div>');
        }
        if(autofill){
            window.occupy.css({
                background: "#cef",
                width: "100%",
                height: h
            })
        }else{
            window.occupy.css({
                width: w,
                height: h
            })
        }
        if(!existTops.length){
            $("#frameholder").append(window.occupy);
        }else{
            for(var i = 0, il = existTops.length; i < il; i++){
                if(y < existTops[i]){
                    occupy.insertBefore($("#frameholder>div").eq(i));
                    return false;
                }
            }
            $("#frameholder").append(window.occupy);
        }
    }else{
        if(window.occupy){
            window.occupy.remove();
            window.occupy = null;
        }
    }
}
drag.insert = function (item) {
    item.css("position","static");
    item.addClass("btn-block");
    $("#occupy").replaceWith(item);
    window.occupy = null;
    drag.config(item);
}
drag.config = function (item) {
    var configs = widgetConfig[item.attr("data-type")]["config"];
    var confHtml = "";
    for(var i = 0, il = configs.length; i < il; i++) {
        confHtml += widgets[configs[i]];
    }
    if(window.configPanel){
        $("#editbody").html(confHtml);
    }else{
        window.configPanel = $('<div class="panel panel-default" id="configPanel"><div class="panel-heading">编辑</div><div class="panel-body"><form class="form-horizontal" id="editbody"></form></div></div>');
        $("body").append(window.configPanel);
        $("#editbody").html(confHtml);
    }
}
drag.repick = function (item) {
    item.css("position","absolute");
    item.removeClass("btn-block");
    drag.occupy(event.pageX, event.pageY, 100,30,true);
    $("body").append(item);
}
drag.isIn = function (parentItem, x, y) {
    var areaL = parentItem.offset().left;
    var areaR = areaL + parentItem.innerWidth();
    var areaT = parentItem.offset().top;
    var areaB = areaT + parentItem.innerHeight();
    // console.log(areaL);
    // console.log(areaR);
    // console.log(areaT);
    // console.log(areaB);
    if(areaL <= x && areaR >= x && areaT <= y && areaB >= y){
        return true;
    }else{
        return false;
    }
}