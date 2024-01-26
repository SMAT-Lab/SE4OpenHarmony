interface AvplayerInterruptAvplayer_Params {
    returnMsg?: string;
    onReturnMsgs?: Array<string>;
    arr?;
    surfaceIds?;
    mXComponentControllers?;
    videoSources?;
    fileDescriptors?;
    AVPlayers?;
    modes?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AvplayerInterruptAvplayer_" + ++__generate__Id;
}
/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import media from '@ohos.multimedia.media';
import fs from '@ohos.file.fs';
class AvplayerInterruptAvplayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple("hello", this, "returnMsg");
        this.__onReturnMsgs = new ObservedPropertyObject(['未监听', '未监听'], this, "onReturnMsgs");
        this.arr = [0, 1];
        this.surfaceIds = [];
        this.mXComponentControllers = [new XComponentController(), new XComponentController()];
        this.videoSources = ["test1.mp4", "test2.mp4"];
        this.fileDescriptors = [null, null];
        this.AVPlayers = [null, null];
        this.modes = [0, 0];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AvplayerInterruptAvplayer_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsgs !== undefined) {
            this.onReturnMsgs = params.onReturnMsgs;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.surfaceIds !== undefined) {
            this.surfaceIds = params.surfaceIds;
        }
        if (params.mXComponentControllers !== undefined) {
            this.mXComponentControllers = params.mXComponentControllers;
        }
        if (params.videoSources !== undefined) {
            this.videoSources = params.videoSources;
        }
        if (params.fileDescriptors !== undefined) {
            this.fileDescriptors = params.fileDescriptors;
        }
        if (params.AVPlayers !== undefined) {
            this.AVPlayers = params.AVPlayers;
        }
        if (params.modes !== undefined) {
            this.modes = params.modes;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsgs.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __onReturnMsgs: ObservedPropertyObject<Array<string>>;
    get onReturnMsgs() {
        return this.__onReturnMsgs.get();
    }
    set onReturnMsgs(newValue: Array<string>) {
        this.__onReturnMsgs.set(newValue);
    }
    private arr;
    private surfaceIds;
    private mXComponentControllers;
    private videoSources;
    private fileDescriptors;
    private AVPlayers;
    private modes;
    async aboutToAppear() {
        await this.getStageFileDescriptor(this.videoSources[0]).then((res) => {
            this.fileDescriptors[0] = res;
        });
        await this.getStageFileDescriptor(this.videoSources[1]).then((res) => {
            this.fileDescriptors[1] = res;
        });
        this.returnMsg = `${JSON.stringify(this.fileDescriptors)} \n`;
        this.returnMsg = `${JSON.stringify(this.surfaceIds)}`;
    }
    async onBackPress() {
        if (this.AVPlayers[0] !== null) {
            await this.AVPlayers[0].release();
            this.AVPlayers[0] = null;
        }
        if (this.AVPlayers[1] !== null) {
            await this.AVPlayers[1].release();
            this.AVPlayers[1] = null;
        }
    }
    async getStageFileDescriptor(fileName) {
        let fileDescriptor = undefined;
        let mgr = globalThis.abilityContext.resourceManager;
        await mgr.getRawFileDescriptor(fileName).then(value => {
            fileDescriptor = { fd: value.fd, offset: value.offset, length: value.length };
            console.log('case getRawFileDescriptor success fileName: ' + fileName);
        }).catch(error => {
            console.log('case getRawFileDescriptor err: ' + error);
        });
        return fileDescriptor;
    }
    async createAVPlayer(index) {
        if (this.AVPlayers[index] !== null) {
            this.returnMsg = `AVPlayer object ${index} is here already`;
            return;
        }
        try {
            this.AVPlayers[index] = await media.createAVPlayer();
            this.returnMsg = `createAVPlayer ${index} Success,state=${this.AVPlayers[index].state} \n`;
            this.AVPlayers[index].fdSrc = this.fileDescriptors[index];
            //this.AVPlayers[index].surfaceId = this.surfaceIds[index]
            this.returnMsg += `audioInterruptMode ${index} =${this.AVPlayers[index].audioInterruptMode} \n`;
            this.returnMsg += `audioRendererInfo ${index} =${JSON.stringify(this.AVPlayers[index].audioRendererInfo)} \n`;
        }
        catch (err) {
            this.returnMsg = `createAVPlayer ${index} Fail,err=${JSON.stringify(err)}`;
        }
    }
    onAudioInterrupt(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        this.onReturnMsgs[index] = `已监听`;
        this.AVPlayers[index].on('audioInterrupt', (interruptEvent) => {
            this.onReturnMsgs[index] = `监听返回的数据：${JSON.stringify(interruptEvent)}`;
        });
    }
    offAudioInterrupt(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        this.AVPlayers[index].off('audioInterrupt');
    }
    async prepare(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].prepare();
            this.returnMsg = `AVPlayer ${index} prepare Success,state=${this.AVPlayers[index].state},audioInterruptMode=${this.AVPlayers[index].audioInterruptMode}`;
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} prepare Fail,err=${JSON.stringify(err)}`;
        }
    }
    async play(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].play();
            this.returnMsg = `AVPlayer ${index} play Success,state=${this.AVPlayers[index].state},audioInterruptMode=${this.AVPlayers[index].audioInterruptMode}`;
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} play Fail,err=${JSON.stringify(err)}`;
        }
    }
    async pause(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].pause();
            this.returnMsg = `AVPlayer ${index} pause Success,state=${this.AVPlayers[index].state}`;
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} pause Fail,err=${JSON.stringify(err)}`;
        }
    }
    async stop(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].stop();
            this.returnMsg = `AVPlayer ${index} stop Success,state=${this.AVPlayers[index].state}`;
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} stop Fail,err=${JSON.stringify(err)}`;
        }
    }
    async reset(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].reset();
            this.returnMsg = `AVPlayer ${index} reset Success,state=${this.AVPlayers[index].state}`;
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} reset Fail,err=${JSON.stringify(err)}`;
        }
    }
    async release(index) {
        if (this.AVPlayers[index] == null) {
            this.returnMsg = `AVPlayer object ${index} is not created`;
            return;
        }
        try {
            await this.AVPlayers[index].release();
            this.returnMsg = `AVPlayer ${index} release Success,state=${this.AVPlayers[index].state}`;
            this.AVPlayers[index] = null;
            this.onReturnMsgs = ['未监听', '未监听'];
        }
        catch (err) {
            this.returnMsg = `AVPlayer ${index} release Fail,err=${JSON.stringify(err)}`;
        }
    }
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(80);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频渲染-AVPlayer打断】返回数据：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 80 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            Column.create();
            Column.width('100%');
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.create();
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.margin({ top: 10 });
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.height(40);
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.width('100%');
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.justifyContent(FlexAlign.SpaceAround);
            Button.createWithChild();
            Button.width('65%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.createAVPlayer(item);
            });
            Text.create("createAVPlayer");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('30%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.prepare(item);
            });
            Text.create("prepare");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            //              XComponent({
            //                id: 'xcomponent'+item,
            //                type: 'surface',
            //                libraryname: '',
            //                controller: this.mXComponentControllers[item]
            //              })
            //                .onLoad(() => {
            //                  console.info('CameraModuleTest: OnLoad() is called!')
            //                  this.mXComponentControllers[item].setXComponentSurfaceSize({ surfaceWidth: 1920, surfaceHeight: 200 });
            //                  let surfaceId = this.mXComponentControllers[item].getXComponentSurfaceId()
            //                  this.surfaceIds[item] = surfaceId
            //                  console.info('CameraModuleTest: XComponent onLoad surfaceId: ' + this.surfaceIds[item])
            //
            //                })
            //                .width('50%')
            //                .height(80)
            //                .margin({ top: 10 })
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.height(40);
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            Button.createWithChild();
            Button.width('70%');
            Button.height(40);
            Button.onClick(() => {
                this.onAudioInterrupt(item);
            });
            Text.create("on('audioInterrupt')");
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('25%');
            Button.height(40);
            Button.onClick(() => {
                this.offAudioInterrupt(item);
            });
            Text.create("off");
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Text.create(this.onReturnMsgs[item]);
            Text.fontSize(22);
            Text.pop();
            Row.pop();
            Row.create();
            Text.create("焦点模式");
            Text.fontSize(24);
            Text.pop();
            Radio.create({ value: `mute${item}1`, group: `modeGroup${item}` });
            Radio.onChange((isChecked) => {
                if (isChecked) {
                    this.modes[item] = 0;
                }
                else {
                    this.modes[item] = 1;
                }
                this.AVPlayers[item].audioInterruptMode = this.modes[item];
                this.returnMsg = `焦点模式选择：${this.modes[item]} \n`;
                this.returnMsg += `焦点模式设置为：${this.AVPlayers[item].audioInterruptMode}`;
            });
            Radio.checked(this.modes[item] == 0);
            Text.create("共享焦点");
            Text.fontSize(18);
            Text.pop();
            Radio.create({ value: `mute${item}2`, group: `modeGroup${item}` });
            Radio.onChange((isChecked) => {
                if (isChecked) {
                    this.modes[item] = 1;
                }
                else {
                    this.modes[item] = 0;
                }
                if (this.AVPlayers[item] === null) {
                    this.returnMsg = `AVPlayer object ${item} is not created`;
                    return;
                }
                this.AVPlayers[item].audioInterruptMode = this.modes[item];
                this.returnMsg = `焦点模式选择：${this.modes[item]} \n`;
                this.returnMsg += `焦点模式设置为：${this.AVPlayers[item].audioInterruptMode}`;
            });
            Radio.checked(this.modes[item] == 1);
            Text.create("独立焦点");
            Text.fontSize(18);
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.height(40);
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            Button.createWithChild();
            Button.width('50%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.play(item);
            });
            Text.create("play");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('45%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.pause(item);
            });
            Text.create("pause");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.height(40);
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            Button.createWithChild();
            Button.width('30%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.stop(item);
            });
            Text.create("stop");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('30%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.reset(item);
            });
            Text.create("reset");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('30%');
            Button.backgroundColor(Color.Pink);
            Button.height(40);
            Button.onClick(() => {
                this.release(item);
            });
            Text.create("release");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Divider.create();
            Divider.strokeWidth(10);
            Divider.color(Color.Blue);
            Divider.margin({ top: 10 });
            Column.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new AvplayerInterruptAvplayer("1", undefined, {}));
