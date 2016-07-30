/**
 * Created by Alan on 16/7/15.
 */

var TableInfoAdapter = cc.Class.extend({
    observerLite: null,

    ctor: function (){
        var _model = {};
        this.observerLite = new CYObserverLite(_model);  //註冊觀察者
    }
});

//透過觀察者模式去做更新
TableInfoAdapter.prototype.updateCredit = function (value){
    this.observerLite.set("credit", value);
};

TableInfoAdapter.prototype.updateRoundSerial = function (value){
    this.observerLite.set("roundSerial", value);
};

TableInfoAdapter.prototype.updateTotalBet = function (value){
    this.observerLite.set("totalBet", value);
};

TableInfoAdapter.prototype.getModel = function (){
    return this.observerLite.get(""); //???
};