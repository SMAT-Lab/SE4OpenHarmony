interface Index_Params {
    message?: string;
    context?;
    kvManager?: distributedKVStore.KVManager;
    kvStore?: distributedKVStore.SingleKVStore;
    count?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import distributedKVStore from '@ohos.data.distributedKVStore';
import distributedData from '@ohos.data.distributedData';
import deviceManager from '@ohos.distributedHardware.deviceManager';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.context = null;
        this.kvManager = undefined;
        this.kvStore = undefined;
        this.count = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.kvManager !== undefined) {
            this.kvManager = params.kvManager;
        }
        if (params.kvStore !== undefined) {
            this.kvStore = params.kvStore;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private context;
    private kvManager: distributedKVStore.KVManager;
    private kvStore: distributedKVStore.SingleKVStore;
    private count;
    onPageShow() {
        this.context = getContext(this);
        let permissions = ['ohos.permission.DISTRIBUTED_DATASYNC', 'ohos.permission.ACCESS_SERVICE_DM'];
        this.context.requestPermissionsFromUser(permissions).then(data => {
            console.log("xxxx----requestPermissionsFromUser success " + data);
        }).catch(error => {
            console.log("xxxx----requestPermissionsFromUser error " + error);
        });
    }
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Blank.create();
        Blank.height(20);
        Blank.pop();
        Button.createWithLabel("创建KvManager");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            try {
                const kvManagerConfig: distributedKVStore.KVManagerConfig = {
                    bundleName: "com.manu.distributedatabase",
                    context: this.context
                };
                this.kvManager = distributedKVStore.createKVManager(kvManagerConfig);
                console.info("xxxx---- createKVManager success");
            }
            catch (e) {
                console.info("xxxx---- createKVManager exception " + e);
            }
        });
        Button.pop();
        Button.createWithLabel("创建KvStore");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            try {
                const options: distributedKVStore.Options = {
                    createIfMissing: true,
                    encrypt: false,
                    backup: false,
                    autoSync: true,
                    kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
                    securityLevel: distributedKVStore.SecurityLevel.S1
                };
                this.kvManager.getKVStore("store1234", options).then(store => {
                    console.info("xxxx----create/get kvStore success");
                    this.kvStore = store as distributedKVStore.SingleKVStore;
                });
            }
            catch (e) {
                console.info("xxxx---- create/get kvStore exception " + e);
            }
        });
        Button.pop();
        Button.createWithLabel("订阅");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            this.kvStore.on("dataChange", distributedKVStore.SubscribeType.SUBSCRIBE_TYPE_ALL, data => {
                console.info("xxxx----dataChange " + JSON.stringify(data));
            });
            console.info("xxxx----subscribe success");
        });
        Button.pop();
        Button.createWithLabel("同步");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            deviceManager.createDeviceManager("com.manu.distributedatabase", (err, manager) => {
                let deviceIDs = manager.getTrustedDeviceListSync().map((value, index, array) => {
                    return value.deviceId;
                });
                this.kvStore.sync(deviceIDs, distributedKVStore.SyncMode.PULL_ONLY, 1);
                console.info("xxxx----sync success " + deviceIDs);
            });
        });
        Button.pop();
        Button.createWithLabel("写入");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            this.kvStore.put("key1", this.count).then(() => {
                this.count++;
                console.info("xxxx----put success");
            });
        });
        Button.pop();
        Button.createWithLabel("读取");
        Button.fontSize(40);
        Button.height(60);
        Button.margin({ bottom: 20 });
        Button.onClick(event => {
            this.kvStore.get("key1").then(data => {
                console.info("xxxx----get success " + JSON.stringify(data));
            }).catch(err => {
                console.info("xxxx----get exception " + JSON.stringify(err));
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    changedEntries(notification: distributedKVStore.ChangeNotification): distributedKVStore.Entry[] {
        return notification.insertEntries.concat(notification.updateEntries);
    }
}
loadDocument(new Index("1", undefined, {}));
