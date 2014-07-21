var widgetConfig = {
    "button": {
        "width": "100%",
        "height": "30",
        "template": '<div class="btn btn-sm btn-info moveable" data-type="button">按钮</div>',
        "config": ["inputName"]
    },
    "button2": {
        "width": "100%",
        "height": "30",
        "template": '<div class="btn btn-sm btn-danger moveable" data-type="button2">按钮</div>',
        "config": ["button2"]
    },
    "topbanner": {
        "width": "100%",
        "height": "30",
        "template": '<div class="btn-group btn-group-justified" data-type="topbanner">\
  <button type="button" class="btn btn-default">首页</button>\
  <button type="button" class="btn btn-default">新闻</button>\
  <button type="button" class="btn btn-default">娱乐</button>\
</div>',
        "config": ["topbanner"]
    }
}

var widgets = {
    "inputName": '<div class="form-group">\
    <label for="inputEmail3" class="col-sm-4 control-label">按钮文字</label>\
    <div class="col-sm-8">\
      <input type="text" class="form-control" placeholder="请输入文字">\
    </div>\
  </div>',
    "button2": '<div class="form-group">\
    <label for="inputEmail3" class="col-sm-4 control-label">按钮颜色</label>\
    <div class="col-sm-8">\
      <button class="btn btn-danger">红</button> <button class="btn btn-info">蓝</button>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="inputEmail3" class="col-sm-4 control-label">按钮文字</label>\
    <div class="col-sm-8">\
      <input type="text" class="form-control" placeholder="请输入文字">\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="inputEmail3" class="col-sm-4 control-label">跳转链接</label>\
    <div class="col-sm-8">\
      <input type="text" class="form-control" placeholder="请输入链接">\
    </div>\
  </div>',
    "topbanner": '<div class="form-group">\
    <label for="inputEmail3" class="col-sm-4 control-label">自定模板</label>\
    <div class="col-sm-8">\
      <button class="btn">尚未配置</button>\
    </div>\
  </div>'
}

var finalData = [
// {
//     type: "button",
//     id: "test0001",
//     data: {
//         name: "测试按钮",
//         link: "http://sina.com.cn",
//         skin: "default"
//     },
//     width: "100%",
//     height: "30",
//     index: 1,
//     children: []
// },{
//     type: "button2",
//     id: "test0001",
//     data: {
//         name: "测试按钮",
//         link: "http://sina.com.cn",
//         skin: "default"
//     },
//     width: "100%",
//     height: "30",
//     index: 1,
//     children: []
// }
];