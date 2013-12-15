var pmps = {
    inhouse : {},
    totalnum : 0,
    boynum: 0,
    girlnum: 0,
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
    "id" : 0,
    "sex": 1, // 0 : girl , 1 : boy ;
    "born" : function () {
        var newp = document.createElement("div");
        newp.className = "people";
        newp.id = "pmps" + pmps.totalnum;
        pmps.playground.appendChild(newp);
        pmps.inhouse[newp.id] = {
            "target" : newp
        }
        this.id = newp.id;
        pmps.totalnum++;
    },
    "setPos": function (x,y) {
        pmps.inhouse[this.id].target.style.cssText += "top:"+ y +"px;left:"+ x +"px;z-index:"+y+";display:block;";
    },
    "setSex": function (sex) {
        if(sex){

        }else{
            if(pmps.boynum > pmps.girlnum){
                this.setGirl();
                this.sex = 0;
                pmps.inhouse[this.id]["sex"] = 0;
                pmps.girlnum++;
            }else{
                this.setBoy();
                this.sex = 1;
                pmps.inhouse[this.id]["sex"] = 1;
                pmps.boynum++;
            }
        }
    },
    "setBoy": function () {
        var bglist = ["1.png","3.png","5.png","6.png"];
        pmps.inhouse[this.id].target.style.cssText += "background:url('images/"+ bglist[pmps.rand(0,100)%4] +"') no-repeat;"
    },
    "setGirl": function () {
        var bglist = ["2.png","4.png","6.png","8.png"];
        pmps.inhouse[this.id].target.style.cssText += "background:url('images/"+ bglist[pmps.rand(0,100)%4] +"') no-repeat;"
    }
}
pmps.gather.prototype = {
    "width": 800,
    "height": 250,
    "setSize" : function (w, h) {
        this.width = w || this.width;
        this.height = h || this.height;
    },
    "add": function () {
        var newpeople = new pmps.people();
        newpeople.setPos(pmps.rand(0, this.width), pmps.rand(0, this.height));
        newpeople.setSex();
    },
    "del" : function () {
        var outsex = 0;
        if(pmps.boynum > pmps.girlnum){
            outsex = 1;
            pmps.boynum--;
        }else{
            pmps.girlnum--;
        }
        for(var i in pmps.inhouse){
            if(pmps.inhouse[i].sex == outsex){
                pmps.playground.removeChild(pmps.inhouse[i].target);
                delete pmps.inhouse[i];
                pmps.totalnum--;
                break;
            }
        }
        
    },
    "init" : function () {
        var balance = $("#amount").val() - pmps.totalnum;
        // alert(balance);
        if(balance > 0){
            while(balance--){
                this.add();
            }
        }else if(balance < 0){
            while(balance++){
                this.del();
            }
        }
    }
}
