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
#### 問題
- roundSerial指的是回合數嗎？
- 不清楚CYObserverLite中path代表的意義。
在set()中，有`this.observers[path]`，但在removeObserver()中是`this.observers[property]`，可以想成以path來代表property? 
但是在set()中，又有`var pathList = path.split(".");`，以 "." 來分割path字串，path感覺像是個檔名，例如“xxx.png”。
- 在ResourceManager中有定義
    ```js
    LiveDealerGameScene.Module: {
        self: ["Chip", "CountDown"]
    }
    
    Chip: {
        chipImg: template.resPath + "myChip.png"
    },
    CountDown: {
        progress: "#pic_time_circle_green.png",
        color: {
            red: cc.color(),
            yellow: cc.color(),
            green: cc.color()
        }
    }
    ```
    是自訂Module的意思嗎？


