interface Index_Params {
    localIsWhite?: boolean;
    whiteNext?: boolean;
    initialized?: boolean;
    distributeModel?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { Chessboard } from '../components/chessboard';
import { DistributeModel } from '../models/distributeModel';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__localIsWhite = new ObservedPropertySimple(true, this, "localIsWhite");
        this.__whiteNext = new ObservedPropertySimple(true, this, "whiteNext");
        this.__initialized = new ObservedPropertySimple(false, this, "initialized");
        this.distributeModel = DistributeModel.getInstance(getContext(this));
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.localIsWhite !== undefined) {
            this.localIsWhite = params.localIsWhite;
        }
        if (params.whiteNext !== undefined) {
            this.whiteNext = params.whiteNext;
        }
        if (params.initialized !== undefined) {
            this.initialized = params.initialized;
        }
        if (params.distributeModel !== undefined) {
            this.distributeModel = params.distributeModel;
        }
    }
    aboutToBeDeleted() {
        this.__localIsWhite.aboutToBeDeleted();
        this.__whiteNext.aboutToBeDeleted();
        this.__initialized.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __localIsWhite: ObservedPropertySimple<boolean>;
    get localIsWhite() {
        return this.__localIsWhite.get();
    }
    set localIsWhite(newValue: boolean) {
        this.__localIsWhite.set(newValue);
    }
    private __whiteNext: ObservedPropertySimple<boolean>;
    get whiteNext() {
        return this.__whiteNext.get();
    }
    set whiteNext(newValue: boolean) {
        this.__whiteNext.set(newValue);
    }
    private __initialized: ObservedPropertySimple<boolean>;
    get initialized() {
        return this.__initialized.get();
    }
    set initialized(newValue: boolean) {
        this.__initialized.set(newValue);
    }
    private distributeModel;
    onPageShow() {
        let permissions = ['ohos.permission.DISTRIBUTED_DATASYNC', 'ohos.permission.ACCESS_SERVICE_DM'];
        let context: any = getContext(this);
        context.requestPermissionsFromUser(permissions).then(data => {
            console.log("xxxx----requestPermissionsFromUser success " + data);
        }).catch(error => {
            console.log("xxxx----requestPermissionsFromUser error " + error);
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        //        Button("kvManager")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvManager(() => {})
        //          })
        //        Button("kvStore")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvStore(() => {})
        //          })
        Button.createWithLabel("开始游戏");
        //        Button("kvManager")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvManager(() => {})
        //          })
        //        Button("kvStore")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvStore(() => {})
        //          })
        Button.fontSize(40);
        //        Button("kvManager")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvManager(() => {})
        //          })
        //        Button("kvStore")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvStore(() => {})
        //          })
        Button.height(60);
        //        Button("kvManager")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvManager(() => {})
        //          })
        //        Button("kvStore")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvStore(() => {})
        //          })
        Button.onClick((event) => {
            this.distributeModel.getData("whiteKeyRegistered", (data) => {
                console.log("xxx--- whiteKeyRegistered: " + data);
                this.distributeModel.getLocalDeviceInfo(deviceInfo => {
                    console.log("xxx--- local device info: " + JSON.stringify(deviceInfo));
                    if (data == null) {
                        this.distributeModel.writeData("whiteKeyRegistered", deviceInfo.deviceId);
                        this.localIsWhite = true;
                    }
                    else {
                        this.localIsWhite = data == deviceInfo.deviceId;
                    }
                    this.initialized = !this.initialized;
                });
            }, () => {
            });
        });
        //        Button("kvManager")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvManager(() => {})
        //          })
        //        Button("kvStore")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick(event => {
        //            this.distributeModel.getKvStore(() => {})
        //          })
        Button.pop();
        //        Button("同步")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.sync()
        //          })
        //        Button("写入")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.writeData("whiteKeyRegistered", true)
        //          })
        Button.createWithLabel("读取");
        //        Button("同步")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.sync()
        //          })
        //        Button("写入")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.writeData("whiteKeyRegistered", true)
        //          })
        Button.fontSize(40);
        //        Button("同步")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.sync()
        //          })
        //        Button("写入")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.writeData("whiteKeyRegistered", true)
        //          })
        Button.height(60);
        //        Button("同步")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.sync()
        //          })
        //        Button("写入")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.writeData("whiteKeyRegistered", true)
        //          })
        Button.onClick((event) => {
            //            this.distributeModel.getData("whiteKeyRegistered", data => {
            //              console.log("xxx--- whiteKeyRegistered: " + data)
            //            }, () => {
            //
            //            })
            this.distributeModel.getData("data", data => {
                console.log("xxx--- data: " + data);
            }, () => {
            });
        });
        //        Button("同步")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.sync()
        //          })
        //        Button("写入")
        //          .fontSize(40)
        //          .height(60)
        //          .onClick((event) => {
        //            this.distributeModel.writeData("whiteKeyRegistered", true)
        //          })
        Button.pop();
        Button.createWithLabel("重置");
        Button.fontSize(40);
        Button.onClick((event) => {
            this.distributeModel.delete("whiteKeyRegistered");
            this.distributeModel.delete("data");
        });
        Button.height(60);
        Button.pop();
        Text.create(this.localIsWhite ? "本方白子" : "本方黑子");
        Text.fontSize(40);
        Text.visibility(this.initialized ? Visibility.Visible : Visibility.Hidden);
        Text.pop();
        Text.create(this.whiteNext ? "请白棋落子" : "请黑棋落子");
        Text.fontSize(40);
        Text.visibility(this.initialized ? Visibility.Visible : Visibility.Hidden);
        Text.pop();
        let earlierCreatedChild_2: Chessboard = (this && this.findChildById) ? this.findChildById("2") as Chessboard : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Chessboard("2", this, {
                localIsWhite: this.__localIsWhite,
                whiteNext: this.__whiteNext,
                initialized: this.__initialized
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
