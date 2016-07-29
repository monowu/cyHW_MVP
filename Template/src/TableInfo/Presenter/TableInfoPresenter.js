/**
 * Created by Alan on 16/7/6.
 */

var TableInfoPresenter = cc.Class.extend({
    //view，有 portrait 以及 landscape 兩種
    _ptView: null,
    _ldView: null,

    //model
    _adapter: null,

    //observer
    _observer: null,

    ctor: function (portraitView, landscapeView, _adapter){
        this._ptView = portraitView;
        this._ldView = landscapeView;
        if (! _adapter instanceof TableInfoAdapter){ //判斷 _adapter 是否為 TableInfoAdapter 物件
            //若不是，則拋出 TableInfoPresenter error
            cc.error("[TableInfoPresenter] _adapter should be TableInfoAdapter");
        }
        this._adapter = _adapter;
        this._observer = this._adapter.observerLite;

        this._ptView.setUserName(cy.userInfo.userName);
        this._ldView.setUserName(cy.userInfo.userName);
        this._initObservers(this._observer);
        //force update the first time
        this._adapter.updateTotalBet(0);
        this._adapter.updateCredit(0);
    }
});

TableInfoPresenter.prototype.removeObserver = function (){
    this._observer.removeAllObserver();
};

TableInfoPresenter.prototype._initObservers = function (obvr){
    var self = this;
    var prefix;

    //分別加入觀察者(訂閱者)，credit、roundSerial、totalBet
    obvr.addObserver("credit", function (path, value, oldValue){
        prefix = cy.locale.localized(cy.locale.MEMBER, "BALANCE");
        //更新 view 的 credit
        self._ldView.updateCredit(prefix + "：", value);
        self._ptView.updateCredit(prefix + "：", value);
        cy.userInfo.credit = value;
    });

    obvr.addObserver("roundSerial", function (path, value, oldValue){
        prefix = cy.locale.localized(cy.locale.OTHER, "ROUND_ID");
        self._ldView.updateRoundSerial(prefix + "：" + value);
        self._ptView.updateRoundSerial(prefix + "：" + value);
    });

    obvr.addObserver("totalBet", function (path, value, oldValue){
        prefix = cy.locale.localized(cy.locale.COMMON, "TOTAL_BET");
        self._ldView.updateTotalBet(prefix + "：", value);
        self._ptView.updateTotalBet(prefix + "：", value);
    });
};