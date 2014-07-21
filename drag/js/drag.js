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
    drag.setdata(item, parent, {"method": "delete"});
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
                    window.occupyIndex = i;
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
drag.insert = function (item, bySys) {
    var parentNode;
    if(bySys){
        item.addClass("btn-block");
        $("#frameholder").append(item);
    }else{
        item.css("position","static");
        item.addClass("btn-block");
        if($("#occupy").parents(".moveable").attr("data-type")){
            parent = $("#occupy").parents(".moveable").attr("data-type");
        }
        $("#occupy").replaceWith(item);
        drag.config(item);
        if($(item).attr("data-id")){
            drag.setdata(item, parent, {"method": "move"});    
        }else{
            drag.setdata(item, parent, {"method": "add"});
            $(item).attr("data-id", (+new Date()).toString(36));
        }
        window.occupy = null;
        window.occupyIndex = null;
    }
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
drag.setdata = function (item, _this, option) {
    if(!_this){
        _this = finalData;
    }
    // console.log(item.attr("data-type") +":"+ option.method);
    var idstr = $(item).attr("data-id") ? '[id : '+ $(item).attr("data-id") +']' : '';
    $("#selected ul").append($('<li><div class="btn btn-xs btn-info">'+ item.attr("data-type") +'</div> '+ idstr + ' ' + option.method +'</li>'));

    for(var i = 0, il = finalData.length; i < il; i++){
        if($(item).attr("data-id") == finalData[i].id){
            finalData[i].data = ""
        }
    }
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
drag.init = function () {
    for(var i = 0, il = finalData.length; i < il; i++){
        var items = drag.create(finalData[i].type);
        drag.insert(items, true);
    }
}