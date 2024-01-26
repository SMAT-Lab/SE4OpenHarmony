interface Queue_Params {
    controller?: QueueController;
    context?: DownloadContext | null;
    action?: string;
    isSerial?: number;
    isEnable?: boolean;
    status1?: string;
    status2?: string;
    status3?: string;
    status4?: string;
    status5?: string;
    status6?: string;
    status7?: string;
    status8?: string;
    status9?: string;
    priority1?: number;
    priority2?: number;
    priority3?: number;
    priority4?: number;
    priority5?: number;
    priority6?: number;
    priority7?: number;
    priority8?: number;
    priority9?: number;
    progress1?: number;
    progress2?: number;
    progress3?: number;
    progress4?: number;
    progress5?: number;
    progress6?: number;
    progress7?: number;
    progress8?: number;
    progress9?: number;
    isStarted?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Queue_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fileio from '@ohos.file.fs';
import prompt from '@system.prompt';
import downloadModeOption from './customRadio/downloadModeOption';
import DownloadStatus from './customRadio/DownloadStatus';
import { QueueController } from '../pages/util/queue/QueueController';
import { DownloadContextListener } from '@ohos/okdownload';
import { DownloadTask } from '@ohos/okdownload';
import { DownloadContext, QueueSet } from '@ohos/okdownload';
import { EndCause } from '@ohos/okdownload';
import { SampleListener } from '@ohos/okdownload';
import { ResumeFailedCause } from '@ohos/okdownload';
import { Log } from '@ohos/okdownload';
import { GlobalContext } from '@ohos/okdownload';
const TAG = 'Queue';
class DownloadContextListenerSample implements DownloadContextListener {
    private that: any;
    constructor(param: any) {
        this.that = param;
    }
    public taskEnd(context: DownloadContext, task: DownloadTask, cause: EndCause, realCause: Error, remainCount: number): void {
        Log.showInfo(TAG, "queue1 ====== taskEnd ======= " + remainCount);
    }
    ;
    public queueEnd(context: DownloadContext): void {
        Log.showInfo(TAG, "queue1 ====== queueEnd =======");
        this.that.action = "START";
        this.that.isStarted = false;
        this.that.isEnable = true;
    }
    ;
}
class SampleListenerSample extends SampleListener {
    private that: any;
    constructor(param: any) {
        super();
        this.that = param;
    }
    public taskBegin(task: DownloadTask): void {
        Log.showInfo(TAG, "queue1 ===== taskBegin ======= " + task.getId());
        let filename: string = task.getFilename();
        this.that.showStatus(filename, "Task Start");
    }
    ;
    public retry(task: DownloadTask, cause: ResumeFailedCause): void {
        Log.showInfo(TAG, "queue1 ===== retry =======");
        let filename: string = task.getFilename();
        this.that.showStatus(filename, "retry");
    }
    ;
    public connected(task: DownloadTask, blockCount: number, totalLength: number): void {
        let filename: string = task.getFilename();
        this.that.showStatus(filename, "connected");
    }
    ;
    public progress(task: DownloadTask, currentOffset: number, totalLength: number): void {
        Log.showInfo(TAG, "queue1 ===== progress id = " + task.getId() + "; currentOffset = " + currentOffset + "; totalLength = " + totalLength);
        let filename: string = task.getFilename();
        this.that.showStatus(filename, "progress");
        let progress = Math.floor(currentOffset / totalLength * 100);
        switch (filename) {
            case 'weixin6516android1120.apk':
                this.that.progress1 = progress;
                break;
            case 'tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk':
                this.that.progress2 = progress;
                break;
            case 'alipay_wap_main.apk':
                this.that.progress3 = progress;
                break;
            case 'QQ_V6.2.0.dmg':
                this.that.progress4 = progress;
                break;
            case 'CloudMusic_official_4.3.2.468990.apk':
                this.that.progress5 = progress;
                break;
            case 'NeteaseMusic_1.5.9_622_officialsite.dmg':
                this.that.progress6 = progress;
                break;
            case 'WeChatSetup.exe':
                this.that.progress7 = progress;
                break;
            case 'wxwork_android_2.4.5.5571_100001.apk':
                this.that.progress8 = progress;
                break;
            case 'WXWork_2.4.5.213.dmg':
                this.that.progress9 = progress;
                break;
        }
    }
    ;
    public taskCompleted(task: DownloadTask, cause: EndCause, realCause: Error): void {
        Log.showInfo(TAG, "queue1 ===== taskCompleted =======");
        let filename: string = task.getFilename();
        this.that.showStatus(filename, EndCause[cause]);
    }
    ;
}
class Queue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new QueueController();
        this.context = null;
        this.__action = new ObservedPropertySimple('START', this, "action");
        this.__isSerial = new ObservedPropertySimple(0, this, "isSerial");
        this.__isEnable = new ObservedPropertySimple(true, this, "isEnable");
        this.__status1 = new ObservedPropertySimple('UNKNOWN', this, "status1");
        this.__status2 = new ObservedPropertySimple('UNKNOWN', this, "status2");
        this.__status3 = new ObservedPropertySimple('UNKNOWN', this, "status3");
        this.__status4 = new ObservedPropertySimple('UNKNOWN', this, "status4");
        this.__status5 = new ObservedPropertySimple('UNKNOWN', this, "status5");
        this.__status6 = new ObservedPropertySimple('UNKNOWN', this, "status6");
        this.__status7 = new ObservedPropertySimple('UNKNOWN', this, "status7");
        this.__status8 = new ObservedPropertySimple('UNKNOWN', this, "status8");
        this.__status9 = new ObservedPropertySimple('UNKNOWN', this, "status9");
        this.__priority1 = new ObservedPropertySimple(0, this, "priority1");
        this.__priority2 = new ObservedPropertySimple(0, this, "priority2");
        this.__priority3 = new ObservedPropertySimple(0, this, "priority3");
        this.__priority4 = new ObservedPropertySimple(0, this, "priority4");
        this.__priority5 = new ObservedPropertySimple(0, this, "priority5");
        this.__priority6 = new ObservedPropertySimple(0, this, "priority6");
        this.__priority7 = new ObservedPropertySimple(0, this, "priority7");
        this.__priority8 = new ObservedPropertySimple(0, this, "priority8");
        this.__priority9 = new ObservedPropertySimple(0, this, "priority9");
        this.__progress1 = new ObservedPropertySimple(0, this, "progress1");
        this.__progress2 = new ObservedPropertySimple(0, this, "progress2");
        this.__progress3 = new ObservedPropertySimple(0, this, "progress3");
        this.__progress4 = new ObservedPropertySimple(0, this, "progress4");
        this.__progress5 = new ObservedPropertySimple(0, this, "progress5");
        this.__progress6 = new ObservedPropertySimple(0, this, "progress6");
        this.__progress7 = new ObservedPropertySimple(0, this, "progress7");
        this.__progress8 = new ObservedPropertySimple(0, this, "progress8");
        this.__progress9 = new ObservedPropertySimple(0, this, "progress9");
        this.__isStarted = new ObservedPropertySimple(false, this, "isStarted");
        this.updateWithValueParams(params);
        this.declareWatch("priority1", this.onPriority1Change);
        this.declareWatch("priority2", this.onPriority2Change);
        this.declareWatch("priority3", this.onPriority3Change);
        this.declareWatch("priority4", this.onPriority4Change);
        this.declareWatch("priority5", this.onPriority5Change);
        this.declareWatch("priority6", this.onPriority6Change);
        this.declareWatch("priority7", this.onPriority7Change);
        this.declareWatch("priority8", this.onPriority8Change);
        this.declareWatch("priority9", this.onPriority9Change);
    }
    updateWithValueParams(params: Queue_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
        if (params.isSerial !== undefined) {
            this.isSerial = params.isSerial;
        }
        if (params.isEnable !== undefined) {
            this.isEnable = params.isEnable;
        }
        if (params.status1 !== undefined) {
            this.status1 = params.status1;
        }
        if (params.status2 !== undefined) {
            this.status2 = params.status2;
        }
        if (params.status3 !== undefined) {
            this.status3 = params.status3;
        }
        if (params.status4 !== undefined) {
            this.status4 = params.status4;
        }
        if (params.status5 !== undefined) {
            this.status5 = params.status5;
        }
        if (params.status6 !== undefined) {
            this.status6 = params.status6;
        }
        if (params.status7 !== undefined) {
            this.status7 = params.status7;
        }
        if (params.status8 !== undefined) {
            this.status8 = params.status8;
        }
        if (params.status9 !== undefined) {
            this.status9 = params.status9;
        }
        if (params.priority1 !== undefined) {
            this.priority1 = params.priority1;
        }
        if (params.priority2 !== undefined) {
            this.priority2 = params.priority2;
        }
        if (params.priority3 !== undefined) {
            this.priority3 = params.priority3;
        }
        if (params.priority4 !== undefined) {
            this.priority4 = params.priority4;
        }
        if (params.priority5 !== undefined) {
            this.priority5 = params.priority5;
        }
        if (params.priority6 !== undefined) {
            this.priority6 = params.priority6;
        }
        if (params.priority7 !== undefined) {
            this.priority7 = params.priority7;
        }
        if (params.priority8 !== undefined) {
            this.priority8 = params.priority8;
        }
        if (params.priority9 !== undefined) {
            this.priority9 = params.priority9;
        }
        if (params.progress1 !== undefined) {
            this.progress1 = params.progress1;
        }
        if (params.progress2 !== undefined) {
            this.progress2 = params.progress2;
        }
        if (params.progress3 !== undefined) {
            this.progress3 = params.progress3;
        }
        if (params.progress4 !== undefined) {
            this.progress4 = params.progress4;
        }
        if (params.progress5 !== undefined) {
            this.progress5 = params.progress5;
        }
        if (params.progress6 !== undefined) {
            this.progress6 = params.progress6;
        }
        if (params.progress7 !== undefined) {
            this.progress7 = params.progress7;
        }
        if (params.progress8 !== undefined) {
            this.progress8 = params.progress8;
        }
        if (params.progress9 !== undefined) {
            this.progress9 = params.progress9;
        }
        if (params.isStarted !== undefined) {
            this.isStarted = params.isStarted;
        }
    }
    aboutToBeDeleted() {
        this.__action.aboutToBeDeleted();
        this.__isSerial.aboutToBeDeleted();
        this.__isEnable.aboutToBeDeleted();
        this.__status1.aboutToBeDeleted();
        this.__status2.aboutToBeDeleted();
        this.__status3.aboutToBeDeleted();
        this.__status4.aboutToBeDeleted();
        this.__status5.aboutToBeDeleted();
        this.__status6.aboutToBeDeleted();
        this.__status7.aboutToBeDeleted();
        this.__status8.aboutToBeDeleted();
        this.__status9.aboutToBeDeleted();
        this.__priority1.aboutToBeDeleted();
        this.__priority2.aboutToBeDeleted();
        this.__priority3.aboutToBeDeleted();
        this.__priority4.aboutToBeDeleted();
        this.__priority5.aboutToBeDeleted();
        this.__priority6.aboutToBeDeleted();
        this.__priority7.aboutToBeDeleted();
        this.__priority8.aboutToBeDeleted();
        this.__priority9.aboutToBeDeleted();
        this.__progress1.aboutToBeDeleted();
        this.__progress2.aboutToBeDeleted();
        this.__progress3.aboutToBeDeleted();
        this.__progress4.aboutToBeDeleted();
        this.__progress5.aboutToBeDeleted();
        this.__progress6.aboutToBeDeleted();
        this.__progress7.aboutToBeDeleted();
        this.__progress8.aboutToBeDeleted();
        this.__progress9.aboutToBeDeleted();
        this.__isStarted.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: QueueController;
    private context: DownloadContext | null;
    private __action: ObservedPropertySimple<string>;
    get action() {
        return this.__action.get();
    }
    set action(newValue: string) {
        this.__action.set(newValue);
    }
    private __isSerial: ObservedPropertySimple<number>;
    get isSerial() {
        return this.__isSerial.get();
    }
    set isSerial(newValue: number) {
        this.__isSerial.set(newValue);
    }
    private __isEnable: ObservedPropertySimple<boolean>;
    get isEnable() {
        return this.__isEnable.get();
    }
    set isEnable(newValue: boolean) {
        this.__isEnable.set(newValue);
    }
    private __status1: ObservedPropertySimple<string>;
    get status1() {
        return this.__status1.get();
    }
    set status1(newValue: string) {
        this.__status1.set(newValue);
    }
    private __status2: ObservedPropertySimple<string>;
    get status2() {
        return this.__status2.get();
    }
    set status2(newValue: string) {
        this.__status2.set(newValue);
    }
    private __status3: ObservedPropertySimple<string>;
    get status3() {
        return this.__status3.get();
    }
    set status3(newValue: string) {
        this.__status3.set(newValue);
    }
    private __status4: ObservedPropertySimple<string>;
    get status4() {
        return this.__status4.get();
    }
    set status4(newValue: string) {
        this.__status4.set(newValue);
    }
    private __status5: ObservedPropertySimple<string>;
    get status5() {
        return this.__status5.get();
    }
    set status5(newValue: string) {
        this.__status5.set(newValue);
    }
    private __status6: ObservedPropertySimple<string>;
    get status6() {
        return this.__status6.get();
    }
    set status6(newValue: string) {
        this.__status6.set(newValue);
    }
    private __status7: ObservedPropertySimple<string>;
    get status7() {
        return this.__status7.get();
    }
    set status7(newValue: string) {
        this.__status7.set(newValue);
    }
    private __status8: ObservedPropertySimple<string>;
    get status8() {
        return this.__status8.get();
    }
    set status8(newValue: string) {
        this.__status8.set(newValue);
    }
    private __status9: ObservedPropertySimple<string>;
    get status9() {
        return this.__status9.get();
    }
    set status9(newValue: string) {
        this.__status9.set(newValue);
    }
    private __priority1: ObservedPropertySimple<number>;
    get priority1() {
        return this.__priority1.get();
    }
    set priority1(newValue: number) {
        this.__priority1.set(newValue);
    }
    private __priority2: ObservedPropertySimple<number>;
    get priority2() {
        return this.__priority2.get();
    }
    set priority2(newValue: number) {
        this.__priority2.set(newValue);
    }
    private __priority3: ObservedPropertySimple<number>;
    get priority3() {
        return this.__priority3.get();
    }
    set priority3(newValue: number) {
        this.__priority3.set(newValue);
    }
    private __priority4: ObservedPropertySimple<number>;
    get priority4() {
        return this.__priority4.get();
    }
    set priority4(newValue: number) {
        this.__priority4.set(newValue);
    }
    private __priority5: ObservedPropertySimple<number>;
    get priority5() {
        return this.__priority5.get();
    }
    set priority5(newValue: number) {
        this.__priority5.set(newValue);
    }
    private __priority6: ObservedPropertySimple<number>;
    get priority6() {
        return this.__priority6.get();
    }
    set priority6(newValue: number) {
        this.__priority6.set(newValue);
    }
    private __priority7: ObservedPropertySimple<number>;
    get priority7() {
        return this.__priority7.get();
    }
    set priority7(newValue: number) {
        this.__priority7.set(newValue);
    }
    private __priority8: ObservedPropertySimple<number>;
    get priority8() {
        return this.__priority8.get();
    }
    set priority8(newValue: number) {
        this.__priority8.set(newValue);
    }
    private __priority9: ObservedPropertySimple<number>;
    get priority9() {
        return this.__priority9.get();
    }
    set priority9(newValue: number) {
        this.__priority9.set(newValue);
    }
    private __progress1: ObservedPropertySimple<number>;
    get progress1() {
        return this.__progress1.get();
    }
    set progress1(newValue: number) {
        this.__progress1.set(newValue);
    }
    private __progress2: ObservedPropertySimple<number>;
    get progress2() {
        return this.__progress2.get();
    }
    set progress2(newValue: number) {
        this.__progress2.set(newValue);
    }
    private __progress3: ObservedPropertySimple<number>;
    get progress3() {
        return this.__progress3.get();
    }
    set progress3(newValue: number) {
        this.__progress3.set(newValue);
    }
    private __progress4: ObservedPropertySimple<number>;
    get progress4() {
        return this.__progress4.get();
    }
    set progress4(newValue: number) {
        this.__progress4.set(newValue);
    }
    private __progress5: ObservedPropertySimple<number>;
    get progress5() {
        return this.__progress5.get();
    }
    set progress5(newValue: number) {
        this.__progress5.set(newValue);
    }
    private __progress6: ObservedPropertySimple<number>;
    get progress6() {
        return this.__progress6.get();
    }
    set progress6(newValue: number) {
        this.__progress6.set(newValue);
    }
    private __progress7: ObservedPropertySimple<number>;
    get progress7() {
        return this.__progress7.get();
    }
    set progress7(newValue: number) {
        this.__progress7.set(newValue);
    }
    private __progress8: ObservedPropertySimple<number>;
    get progress8() {
        return this.__progress8.get();
    }
    set progress8(newValue: number) {
        this.__progress8.set(newValue);
    }
    private __progress9: ObservedPropertySimple<number>;
    get progress9() {
        return this.__progress9.get();
    }
    set progress9(newValue: number) {
        this.__progress9.set(newValue);
    }
    private __isStarted: ObservedPropertySimple<boolean>;
    get isStarted() {
        return this.__isStarted.get();
    }
    set isStarted(newValue: boolean) {
        this.__isStarted.set(newValue);
    }
    render() {
        Column.create({ space: 15 });
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xFAFAFA);
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.backgroundColor(0xFAFAFA);
        Flex.height('140vp');
        /*按钮组*/
        Column.create({ space: 5 });
        /*按钮组*/
        Column.width('50%');
        /*按钮组*/
        Column.padding(10);
        Button.createWithLabel(this.action, { type: ButtonType.Normal, stateEffect: true });
        Button.width('180vp');
        Button.fontSize('20fp');
        Button.fontColor(0x868686);
        Button.backgroundColor(0xFFFFFF);
        Button.border({ width: 1, color: 0xE6E6E6, style: BorderStyle.Solid });
        Button.height('50vp');
        Button.onClick(() => {
            if (this.isStarted) {
                this.action = "START";
                this.isStarted = false;
                this.isEnable = true;
                if (this.context != null) {
                    this.context.stop();
                }
            }
            else {
                this.action = "CANCELED";
                this.isStarted = true;
                this.isEnable = false;
                this.resetDownloadStatus();
                this.startDownload();
            }
        });
        Button.pop();
        Button.createWithLabel('DELETE FILES', { type: ButtonType.Normal, stateEffect: true });
        Button.width('180vp');
        Button.fontSize('20fp');
        Button.fontColor(0x868686);
        Button.enabled(!this.isStarted);
        Button.backgroundColor(!this.isStarted ? 0xFFFFFF : 0x9E9E9E);
        Button.border({ width: 1, color: 0xE6E6E6, style: BorderStyle.Solid });
        Button.height('50vp');
        Button.onClick(() => {
            //CANCEL之后变禁用，若要删除先取消下载才可以删除文件
            //点击之后清空进度条并使状态恢复成UNKNOWN
            console.log('delete files execute');
            let path: string = GlobalContext.getContext().getValue("path").toString(); //globalThis.path;
            fileio.rmdir(path, (err) => {
                //                prompt.showToast({
                //                  message: "删除文件成功",
                //                  duration: 1000
                //                })
            });
            this.resetDownloadStatus();
        });
        Button.pop();
        /*按钮组*/
        Column.pop();
        /*下载模式*/
        Row.create();
        /*下载模式*/
        Row.width('50%');
        let earlierCreatedChild_2: downloadModeOption = (this && this.findChildById) ? this.findChildById("2") as downloadModeOption : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new downloadModeOption("2", this, { isSerial: this.__isSerial, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_2);
        }
        /*下载模式*/
        Row.pop();
        /*分割线*/
        Divider.create();
        /*分割线*/
        Divider.strokeWidth(2);
        /*分割线*/
        Divider.lineCap(LineCapStyle.Round);
        Flex.pop();
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Column.create({ space: 15 });
        let earlierCreatedChild_3: DownloadStatus = (this && this.findChildById) ? this.findChildById("3") as DownloadStatus : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new DownloadStatus("3", this, { title: "1.WeChat", status: this.status1, priority: this.__priority1, progress: this.progress1, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                title: "1.WeChat", status: this.status1, progress: this.progress1, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: DownloadStatus = (this && this.findChildById) ? this.findChildById("4") as DownloadStatus : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new DownloadStatus("4", this, { title: "2.LiuLiShuo", status: this.status2, priority: this.__priority2, progress: this.progress2, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                title: "2.LiuLiShuo", status: this.status2, progress: this.progress2, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: DownloadStatus = (this && this.findChildById) ? this.findChildById("5") as DownloadStatus : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new DownloadStatus("5", this, { title: "3.Alipay", status: this.status3, priority: this.__priority3, progress: this.progress3, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: "3.Alipay", status: this.status3, progress: this.progress3, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: DownloadStatus = (this && this.findChildById) ? this.findChildById("6") as DownloadStatus : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new DownloadStatus("6", this, { title: "4.QQ for Mac", status: this.status4, priority: this.__priority4, progress: this.progress4, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                title: "4.QQ for Mac", status: this.status4, progress: this.progress4, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: DownloadStatus = (this && this.findChildById) ? this.findChildById("7") as DownloadStatus : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new DownloadStatus("7", this, { title: "5.NetEaseMusic", status: this.status5, priority: this.__priority5, progress: this.progress5, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                title: "5.NetEaseMusic", status: this.status5, progress: this.progress5, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: DownloadStatus = (this && this.findChildById) ? this.findChildById("8") as DownloadStatus : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new DownloadStatus("8", this, { title: "6.NetEaseMusic for Mac", status: this.status6, priority: this.__priority6, progress: this.progress6, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                title: "6.NetEaseMusic for Mac", status: this.status6, progress: this.progress6, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: DownloadStatus = (this && this.findChildById) ? this.findChildById("9") as DownloadStatus : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new DownloadStatus("9", this, { title: "7.WeChat for Windows", status: this.status7, priority: this.__priority7, progress: this.progress7, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                title: "7.WeChat for Windows", status: this.status7, progress: this.progress7, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: DownloadStatus = (this && this.findChildById) ? this.findChildById("10") as DownloadStatus : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new DownloadStatus("10", this, { title: "8.WeChat Work", status: this.status8, priority: this.__priority8, progress: this.progress8, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                title: "8.WeChat Work", status: this.status8, progress: this.progress8, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: DownloadStatus = (this && this.findChildById) ? this.findChildById("11") as DownloadStatus : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new DownloadStatus("11", this, { title: "9.WeChat Work for Mac", status: this.status9, priority: this.__priority9, progress: this.progress9, isEnable: this.isEnable }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                title: "9.WeChat Work for Mac", status: this.status9, progress: this.progress9, isEnable: this.isEnable
            });
            View.create(earlierCreatedChild_11);
        }
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    onPageShow() {
        let that = this;
        this.controller = new QueueController();
        this.context = this.controller.initTasks(new DownloadContextListenerSample(this));
    }
    private startDownload() {
        let that = this;
        if (this.context != null) {
            this.context.start(new SampleListenerSample(this), this.isSerial == 0);
        }
    }
    onPriority1Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[0];
            task.setPriority(this.priority1);
        }
    }
    onPriority2Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[1];
            task.setPriority(this.priority2);
        }
    }
    onPriority3Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[2];
            task.setPriority(this.priority3);
        }
    }
    onPriority4Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[3];
            task.setPriority(this.priority4);
        }
    }
    onPriority5Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[4];
            task.setPriority(this.priority5);
        }
    }
    onPriority6Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[5];
            task.setPriority(this.priority6);
        }
    }
    onPriority7Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[6];
            task.setPriority(this.priority7);
        }
    }
    onPriority8Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[7];
            task.setPriority(this.priority8);
        }
    }
    onPriority9Change() {
        if (this.context != null) {
            let task: DownloadTask = this.context.getTasks()[8];
            task.setPriority(this.priority9);
        }
    }
    private resetDownloadStatus() {
        this.status1 = 'UNKNOWN';
        this.status2 = 'UNKNOWN';
        this.status3 = 'UNKNOWN';
        this.status4 = 'UNKNOWN';
        this.status5 = 'UNKNOWN';
        this.status6 = 'UNKNOWN';
        this.status7 = 'UNKNOWN';
        this.status8 = 'UNKNOWN';
        this.status9 = 'UNKNOWN';
        this.progress1 = 0;
        this.progress2 = 0;
        this.progress3 = 0;
        this.progress4 = 0;
        this.progress5 = 0;
        this.progress6 = 0;
        this.progress7 = 0;
        this.progress8 = 0;
        this.progress9 = 0;
    }
    private showStatus(filename: string, status: string) {
        switch (filename) {
            case 'weixin6516android1120.apk':
                this.status1 = status;
                break;
            case 'tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk':
                this.status2 = status;
                break;
            case 'alipay_wap_main.apk':
                this.status3 = status;
                break;
            case 'QQ_V6.2.0.dmg':
                this.status4 = status;
                break;
            case 'CloudMusic_official_4.3.2.468990.apk':
                this.status5 = status;
                break;
            case 'NeteaseMusic_1.5.9_622_officialsite.dmg':
                this.status6 = status;
                break;
            case 'WeChatSetup.exe':
                this.status7 = status;
                break;
            case 'wxwork_android_2.4.5.5571_100001.apk':
                this.status8 = status;
                break;
            case 'WXWork_2.4.5.213.dmg':
                this.status9 = status;
                break;
        }
    }
}
loadDocument(new Queue("1", undefined, {}));
