/**
 * Created by Alan on 16/7/6.
 */

var TableInfoView = cc.Node.extend({
    isLandscape: false, //畫面預設 notLandscape

    _isInitialized: false, //預設 notInitialized

    ctor: function (isLandscape){
        this._super();

        this.isLandscape = isLandscape;
        this._defineChildren(vt.res.LiveDealerGameScene.JSON.TableInfo, vt.resPath, isLandscape); //vt 是一個 template
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
    },
    onEnter: function (){
        this._super();

        if (!this._isInitialized){
            if (this.isLandscape){
                //if landscape, do something
            }
        }
    }
});

/******************** Public ********************/

//TableInfoView 物件以 prototype 性質另外定義四個方法
TableInfoView.prototype.setUserName = function (userName){
    this._view.userName.setString(userName);
};

TableInfoView.prototype.updateRoundSerial = function (serial){
    this._view.roundSerial.setString(serial);
};

TableInfoView.prototype.updateCredit = function (prefix, credit){
    this._view.credit.setCurrencySymbol(prefix);
    this._view.credit.runNumber(credit);
};

TableInfoView.prototype.updateTotalBet = function (prefix, totalBet){
    this._view.totalBet.setCurrencySymbol(prefix);
    this._view.totalBet.runNumber(totalBet);
};

/******************** Private ********************/
TableInfoView.prototype._defineChildren = function (jsonPath, rootPath, isLandscape){
    var _css;
    if (isLandscape) //判斷是否為 landscape
        _css = ccs.load(jsonPath.landscape, rootPath); //ccs.load = function(file, path){}
    else
        _css = ccs.load(jsonPath.portrait, rootPath); //載入 portrait 的 JSON

    //背景畫面，包含背景、userName 及 roundSerial
    this._view = _css.node.getChildByName("bgLayout");
    this._view.userName = this._view.getChildByName("userName");
    this._view.roundSerial = this._view.getChildByName("roundSerial");

    //credit 的畫面配置
    var credit = this._view.getChildByName("credit"); //replace with numberLabel
    this._view.credit = new cy.NumberLabel();
    this._view.credit.showDecimals(true, 2);
    this._view.credit.setTextColor(credit.getTextColor());
    this._view.credit.attr({
        x: credit.x,
        y: credit.y,
        anchorX: credit.anchorX,
        anchorY: credit.anchorY,
        fontSize: credit.fontSize,
        fontName: credit.fontName,
        font: credit.font
    });
    this._view.addChild(this._view.credit);
    credit.removeFromParent();

    //totalBet 的畫面配置
    var totalBet = this._view.getChildByName("totalBet"); //replace with numberLabel
    this._view.totalBet = new cy.NumberLabel();
    this._view.totalBet.showDecimals(true, 2);
    this._view.totalBet.setTextColor(totalBet.getTextColor());
    this._view.totalBet.attr({
        x: totalBet.x,
        y: totalBet.y,
        anchorX: totalBet.anchorX,
        anchorY: totalBet.anchorY,
        fontSize: totalBet.fontSize,
        fontName: totalBet.fontName,
        font: totalBet.font
    });
    this._view.addChild(this._view.totalBet);
    totalBet.removeFromParent();

    this.addChild(_css.node);
};