# CYHomework_MVP
### ResourceManager
- 定義素材、JSON檔案路徑與自訂的Module

### LiveDealerGameScene

- TableInfoView：設定bgLayout、userName、roundSerial、credit及totalBet的外觀
- TableInfoAdapter：控制credit、roundSerial、totalBet的update，以及new一個CYObserverLite的物件“observerLite”
- TableInfoPresenter：控制view、model以及observer的初始化

### CYObserverLite

- 屬性：observerObj、observers、Type.None、Type.UpdateType
- 方法：
    - `set(path, value)`：更新observerInfo，並執行callBack function
    - `get(path)`：？
    - `addObserver(path, callBack)`：加入觀察者
    - `notify(path)`：通知，更新observerInfo給監聽名單中的觀察者
    - `removeObserver(property, observer)`：observer取消訂閱
    - `removeAllObserver()`：全部取消訂閱

========== 
### MVP與觀察者模式之間的關係
以訂閱者(即觀察者)向報社訂報紙的例子來說，
- View是訂閱者
- Presenter是中間人，負責幫View向報社訂報紙
- Model像是報社，負責資料更新(?)
