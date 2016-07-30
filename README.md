# CYHomework_MVP
### ResourceManager
- 定義素材及JSON檔案路徑

### LiveDealerGameScene

- TableInfoView：設定bgLayout、userName、roundSerial、credit及totalBet的外觀
- TableInfoAdapter：控制credit、roundSerial、totalBet的update，以及new一個CYObserverLite的物件“observerLite”
- TableInfoPresenter：控制view、model以及observer的初始化

### CYObserverLite

- 屬性：observerObj、observers、Type.None、Type.UpdateType
- 方法：
    - set(path, value)：更新observerInfo，並執行callBack function
    - get(path)：？
    - addObserver(path, callBack)：加入觀察者
    - notify(path)：通知，更新observerInfo給監聽名單中的觀察者
    - removeObserver(property, observer)：observer取消訂閱
    - removeAllObserver()：全部取消訂閱

========== 
