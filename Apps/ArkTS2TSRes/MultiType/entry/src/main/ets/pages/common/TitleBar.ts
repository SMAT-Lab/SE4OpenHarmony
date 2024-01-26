interface MyDialog_Params {
    controller?: CustomDialogController;
}
interface TitleBar_Params {
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import router from '@system.router';
export class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new MyDialog("2", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Top,
            customStyle: true,
            offset: {
                dx: 50,
                dy: 100
            }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(50);
        Row.backgroundColor('#FF4081');
        Text.create($r("app.string.app_name"));
        Text.fontSize(18);
        Text.padding({ left: 15, right: 15 });
        Text.fontColor('white');
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create('MORE ->');
        Text.fontSize(18);
        Text.fontColor(0xffffff);
        Text.margin({ left: 5, right: 12 });
        Text.pop();
        Image.create($r('app.media.icon_more'));
        Image.width(40);
        Image.height('100%');
        Image.objectFit(ImageFit.Contain);
        Image.padding({ right: 15 });
        Image.onClick(event => {
            this.dialogController.open();
        });
        Row.pop();
    }
}
class MyDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.width('70%');
        Column.backgroundColor('white');
        Column.borderRadius(4);
        Column.alignItems(HorizontalAlign.Start);
        Text.create('NormalPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/normal/NormalPage'
            });
        });
        Text.pop();
        Text.create('MultiSelectablePage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/selectable/MultiSelectablePage'
            });
        });
        Text.pop();
        Text.create('CommunicateWithPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/communication/CommunicateWithBinderPage'
            });
        });
        Text.pop();
        Text.create('BilibiliPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/bilibili/BilibiliPage'
            });
        });
        Text.pop();
        Text.create('WeiboPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/weibo/WeiboPage'
            });
        });
        Text.pop();
        Text.create('OneDataToManyPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/one2many/OneDataToManPage'
            });
        });
        Text.pop();
        Text.create('TestPayloadPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/payload/TestPayloadPage'
            });
        });
        Text.pop();
        Text.create('MoreApisPlaygroundPage');
        Text.fontSize(18);
        Text.padding(15);
        Text.onClick(event => {
            router.replace({
                uri: 'pages/more/MoreApisPlaygroundPage'
            });
        });
        Text.pop();
        Column.pop();
    }
}
