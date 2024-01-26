interface nfcSample_Params {
    nfc?: string[];
    readNfcTimes?: number;
    scroller?: Scroller;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "nfc_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TitleBar } from '../../common/TitleBar';
// @ts-ignore
import nfctest from '@ohos.nfctest';
import Logger from '../../model/Logger';
const TAG = 'nfcSample';
export class nfcSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__nfc = new ObservedPropertyObject([], this, "nfc");
        this.__readNfcTimes = new ObservedPropertySimple(0, this, "readNfcTimes");
        this.scroller = new Scroller();
        this.message = "1、到达此界面时，读卡器已经可以使用;\n2、展示区将展示读卡器发送给本机的数据和分机发送给读卡器的数据;\n3、读卡器读卡成功将发送卡号，本机回复 AA 55 停止读卡;\n4、读卡器读卡失败不会展示任何信息;\n";
        this.updateWithValueParams(params);
        this.declareWatch("readNfcTimes", this.readNfcTimesChange);
    }
    updateWithValueParams(params: nfcSample_Params) {
        if (params.nfc !== undefined) {
            this.nfc = params.nfc;
        }
        if (params.readNfcTimes !== undefined) {
            this.readNfcTimes = params.readNfcTimes;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__nfc.aboutToBeDeleted();
        this.__readNfcTimes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __nfc: ObservedPropertyObject<string[]>;
    get nfc() {
        return this.__nfc.get();
    }
    set nfc(newValue: string[]) {
        this.__nfc.set(newValue);
    }
    private __readNfcTimes: ObservedPropertySimple<number>;
    get readNfcTimes() {
        return this.__readNfcTimes.get();
    }
    set readNfcTimes(newValue: number) {
        this.__readNfcTimes.set(newValue);
    }
    private scroller: Scroller;
    private message: string;
    getNfcValue() {
        nfctest.get_nfc_value()
            .then((ret) => {
            Logger.info(TAG, "get_nfc_value " + ret);
            this.nfc.push(ret);
            this.readNfcTimes++;
        })
            .catch((err) => {
            Logger.error(TAG, `get_nfc_value failed err is ${JSON.stringify(err)}`);
            this.readNfcTimes++;
        });
    }
    readNfcTimesChange() {
        Logger.error(TAG, "messageChange this.readNfcTimes:" + this.readNfcTimes);
        this.getNfcValue();
        this.scroller.scrollEdge(Edge.Bottom);
    }
    aboutToAppear() {
        Logger.info(TAG, "this.message" + this.nfc);
        this.getNfcValue();
    }
    onPageHide() {
        nfctest.nfc_release();
    }
    render() {
        Column.create();
        Column.margin({ bottom: 80 });
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '读卡测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '读卡测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create("读卡次数：" + this.nfc.length);
        Text.margin({ bottom: 25 });
        Text.pop();
        Scroll.create(this.scroller);
        Scroll.width('100%');
        Scroll.padding({ left: 16, right: 16 });
        Column.create();
        Column.margin({ bottom: 200 });
        ForEach.create("3", this, ObservedObject.GetRawObject((this.nfc)), (item, index) => {
            Text.create("第" + (index + 1) + "次数据: " + item);
            Text.width('90%');
            Text.height(50);
            Text.borderWidth({ bottom: 1 });
            Text.textAlign(TextAlign.Center);
            Text.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new nfcSample("1", undefined, {}));
