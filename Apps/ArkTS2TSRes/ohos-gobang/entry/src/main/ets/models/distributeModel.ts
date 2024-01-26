let __generate__Id: number = 0;
function generateId(): string {
    return "distributeModel_" + ++__generate__Id;
}
import distributedKVStore from '@ohos.data.distributedKVStore';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import device from '@system.device';
export class DistributeModel {
    private static instance: DistributeModel;
    private constructor() { }
    public static getInstance(context: Context) {
        if (this.instance == null) {
            this.instance = new DistributeModel();
        }
        this.instance.context = context;
        return this.instance;
    }
    private context: Context = null;
    private bundleName = 'com.manu.fiveinarow';
    private kvStore: distributedKVStore.SingleKVStore;
    private devManager: deviceManager.DeviceManager;
    private kvManager: distributedKVStore.KVManager;
    private subscribed = false;
    getKvManager(action: (kvManager: distributedKVStore.KVManager) => void) {
        if (this.kvManager == null) {
            const kvManagerConfig: distributedKVStore.KVManagerConfig = {
                bundleName: this.bundleName,
                context: this.context
            };
            try {
                this.kvManager = distributedKVStore.createKVManager(kvManagerConfig);
                action(this.kvManager);
            }
            catch (e) {
                console.log("xxx---An unexpected error occurred. Error:" + e);
            }
        }
        else {
            action(this.kvManager);
        }
    }
    getKvStore(action: (kvStore: distributedKVStore.SingleKVStore) => void) {
        if (this.kvStore == null) {
            // 获取/创建分布式数据库。
            this.getKvManager((kvManager) => {
                try {
                    let options: distributedKVStore.Options = {
                        createIfMissing: true,
                        encrypt: false,
                        backup: false,
                        autoSync: true,
                        kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
                        securityLevel: distributedKVStore.SecurityLevel.S1,
                    };
                    kvManager.getKVStore('storeId1', options).then(store => {
                        console.log("xxx---getKVStore success");
                        this.kvStore = store as distributedKVStore.SingleKVStore;
                        // 创建完store以后同步数据
                        // this.getDeviceManager(deviceManager => {
                        //   let deviceIDs = deviceManager.getTrustedDeviceListSync().map((value, index, array) => {
                        //     return value.deviceId
                        //   })
                        //   this.kvStore.sync(deviceIDs, distributedKVStore.SyncMode.PULL_ONLY, 1)
                        //   console.info("xxx---sync success " + deviceIDs)
                        //   action(this.kvStore)
                        // })
                        action(this.kvStore);
                    }).catch(err => {
                        if (err) {
                            console.log("xxx---getKVStore err: " + JSON.stringify(err));
                        }
                    });
                }
                catch (e) {
                    console.log("xxx---An unexpected error occurred. Error:" + e);
                }
            });
        }
        else {
            action(this.kvStore);
        }
    }
    subscribe(onDataChange: (data: distributedKVStore.ChangeNotification) => void, completion: () => void) {
        // 4. 订阅分布式数据变化。
        this.getKvStore((kvStore) => {
            if (!this.subscribed && onDataChange != null) {
                this.subscribed = true;
                kvStore.on('dataChange', distributedKVStore.SubscribeType.SUBSCRIBE_TYPE_ALL, onDataChange);
            }
            completion();
        });
    }
    getData(key: string, action: (data) => void, completion: () => void) {
        this.getKvStore((kvStore) => {
            kvStore.get(key).then(data => {
                console.log("xxx--- get " + key + " success: " + JSON.stringify(data));
                action(data);
            }).catch(err => {
                console.log("xxx--- get " + key + " err: " + err);
                action(null);
            });
            completion();
        });
    }
    writeData(key: string, value: Uint8Array | string | number | boolean) {
        // 5. 将数据写入分布式数据库。
        try {
            this.getKvStore((kvStore: distributedKVStore.SingleKVStore) => {
                kvStore.put(key, value).then(() => {
                    console.log("xxx---put success key: " + key + " value: " + value);
                }).catch(err => {
                    console.log("xxx---put err: " + JSON.stringify(err));
                });
            });
        }
        catch (e) {
            console.log("xxx---An unexpected error occurred. Error:" + e);
        }
    }
    getDeviceList(action: (deviceInfo: Array<deviceManager.DeviceInfo>) => void) {
        this.getDeviceManager((deviceManager) => {
            let devices = deviceManager.getTrustedDeviceListSync();
            action(devices);
        });
    }
    getLocalDeviceInfo(action: (deviceInfo: deviceManager.DeviceInfo) => void) {
        this.getDeviceManager((deviceManager) => {
            let deviceInfo = deviceManager.getLocalDeviceInfoSync();
            action(deviceInfo);
        });
    }
    private getDeviceManager(action: (deviceManager: deviceManager.DeviceManager) => void) {
        // create deviceManager
        if (this.devManager == null) {
            deviceManager.createDeviceManager(this.bundleName, (err, deviceManager) => {
                console.log("xxx---device manager created");
                if (!err) {
                    this.devManager = deviceManager;
                    action(deviceManager);
                }
            });
        }
        else {
            action(this.devManager);
        }
    }
    getChangedData(notification: distributedKVStore.ChangeNotification): distributedKVStore.Entry[] {
        return notification.insertEntries.concat(notification.updateEntries);
    }
    delete(key: string) {
        this.getKvStore((kvStore: distributedKVStore.SingleKVStore) => {
            kvStore.delete(key).then(() => {
                console.log("xxx---delete success");
            }).catch(error => {
                console.log("xxx---delete error: " + error);
            });
        });
    }
    sync() {
        this.getDeviceManager(deviceManager => {
            let deviceIDs = deviceManager.getTrustedDeviceListSync().map((value, index, array) => {
                return value.deviceId;
            });
            this.kvStore.sync(deviceIDs, distributedKVStore.SyncMode.PULL_ONLY, 1);
            console.info("xxx---sync success " + deviceIDs);
        });
    }
}
