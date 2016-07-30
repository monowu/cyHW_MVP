/**
 * Created by James on 2016/2/26.
 */


//CYObserverLite的建構子，定義observerObj及observers兩個屬性
var CYObserverLite = function (model) {
    this.observerObj = model; //觀察者(訂閱者)，初始為model
    this.observers = {}; //觀察者名單，初始為空陣列

};

//CYObserverLite物件以prototype性質另外定義set()方法
CYObserverLite.prototype.set = function (path, value) {
    var observerInfo = {};
    var pathList = path.split("."); //以 "." 來分割 path 字串

    var oldObj = CYUtility.clone(this.observerObj);
    if (path == "") {
        this.observerObj = CYUtility.clone(value);
    } else {
        setObjByProperty(this.observerObj, path, value);
    }

    for (var key in this.observers) {
        //var obsPathList = key.split(".");
        //_.find
        var keyList = key.split(".");
        if (path == "" || pathList.length <= keyList.length) {
            var checkNotEqualKey = false;
            for (var index in pathList) {
                var pathKey = pathList[index];
                var keyListKey = keyList[index];
                if (pathKey != keyListKey) {
                    checkNotEqualKey = true;
                }
            }
            if (checkNotEqualKey && path != "") {

            } else {
                var oldValue = CYUtility.deepFind(oldObj, key);
                var currentValue = CYUtility.deepFind(this.observerObj, key);
                var isSame = CYUtility.deepCompare(oldValue, currentValue);
                if (isSame == false) {
                    //若oldValue與currentValue不相同，代表observerInfo的資料要更新
                    observerInfo.type = CYObserverLite.Type.UpdateType;
                    observerInfo.path = path;
                    observerInfo.value = CYUtility.deepFind(this.observerObj, key);
                    observerInfo.oldValue = CYUtility.deepFind(oldObj, key);

                    if (typeof observerInfo.value !== "undefined") {
                        for (var i in this.observers[key]) {
                            this.observers[key][i](observerInfo.path,
                                        observerInfo.value, observerInfo.oldValue, this.observerObj);
                        }
                    }

                }
            }

        }
    }
    ////has some one like the path
    //if ( this.observers.hasOwnProperty(path)) {
    //    if (this.observers[path].length > 0) {
    //        var oldValue = CYUtility.deepFind(this.observerObj, path);
    //        setObjByProperty(this.observerObj, path, value);
    //        var isSame = CYUtility.deepCompare(oldValue, value);
    //        if (isSame == false) {
    //            observerInfo.type = CYObserverLite.Type.UpdateType;
    //            observerInfo.path = path;
    //            observerInfo.value = value;
    //            observerInfo.oldValue = oldValue;
    //
    //            for (var i in this.observers[path]) {
    //                this.observers[path][i](observerInfo.path, observerInfo.value, observerInfo.oldValue, this.observerObj);
    //            }
    //        }
    //    }
    //} else {
    //    setObjByProperty(this.observerObj, path, value);
    //}

};

//CYObserverLite以prototype定義get()
CYObserverLite.prototype.get = function (path) {
    return CYUtility.deepFind(this.observerObj, path);
};

//CYObserverLite以prototype定義addObserver()
CYObserverLite.prototype.addObserver = function (path, callBack) { //加入觀察者
    this.observers[path] = this.observers[path] || [];
    if (this.observers[path].indexOf(callBack) == -1) { //判斷this.observers[path]此陣列中是否有callBack
        this.observers[path].push(callBack); //若無，則push
    }
};

//CYObserverLite以prototype定義notify()
CYObserverLite.prototype.notify = function (path) { //通知，更新observerInfo給監聽名單中的觀察者
    var observerInfo = {};
    for (var i in this.observers[path]) {
        observerInfo.path = path;
        observerInfo.value = CYUtility.deepFind(this.observerObj, path);
        observerInfo.oldValue = observerInfo.value;
        this.observers[path][i](observerInfo.path, observerInfo.value, observerInfo.oldValue, this.observerObj);
    }
};

//CYObserverLite 以 prototype 定義 removeObserver()
CYObserverLite.prototype.removeObserver = function(property, observer) { //observer取消訂閱
    if (this.observers[property]) {
        var index = this.observers[property].indexOf(observer);
        if (index >= 0) {
            this.observers[property].splice(index, 1);
        }
    }

};

//CYObserverLite 以 prototype 定義 removeAllObserver()
CYObserverLite.prototype.removeAllObserver = function () { //全部取消訂閱
    for (var key in this.observers) {
        this.observers[key].splice(0, this.observers[key].length);
    }
};

CYObserverLite.Type = { //標籤
    None: 0,
    UpdateType: 1
};