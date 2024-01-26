interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    confirm?: (index: number) => void;
}
interface CustomContainerUser_Params {
    dataList?: string[];
    timestamp?;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { SwipeLayoutLayDownRoot } from '@ohos/swipelayout';
import prompt from '@system.prompt';
import router from '@ohos.router';
const bottomViewRightW: number = 120;
const bottomViewLeftW: number = 120;
const bottomImageBottomH: number = 120;
const mHeight: number = 1080;
class CustomContainerUser extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dataList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
        this.timestamp = Date.now();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, { confirm: this.onAccept });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Top,
            offset: { dx: 170, dy: 5 },
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomContainerUser_Params) {
        if (params.dataList !== undefined) {
            this.dataList = params.dataList;
        }
        if (params.timestamp !== undefined) {
            this.timestamp = params.timestamp;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private dataList: string[];
    private timestamp;
    private dialogController: CustomDialogController;
    onAccept(index: number) {
        if (index == 0) {
            router.push({
                url: 'pages/list',
            });
        }
        else if (index == 1) {
            router.push({
                url: 'pages/grid',
            });
        }
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.backgroundColor('#fdffffff');
        Column.create();
        Column.margin({ top: 66 });
        ColumnSplit.create();
        ColumnSplit.pop();
        Column.pop();
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(66);
        Row.backgroundColor('#666060');
        Blank.create();
        Blank.pop();
        Text.create('SwipeLayout');
        Text.width('55%');
        Text.fontColor('#ffffff');
        Text.fontSize(20);
        Text.margin({ top: 4 });
        Text.pop();
        Image.create($r('app.media.more'));
        Image.width(66);
        Image.height(66);
        Image.margin({ right: 5 });
        Image.onClick((event: ClickEvent) => {
            this.dialogController.open();
        });
        Row.pop();
        Stack.pop();
    }
}
function SurfaceView(label: string, parent = null) {
    Text.create(label);
    Text.fontSize('15');
    Text.width('100%');
    Text.height(mHeight);
    Text.fontColor('#968d8d');
    Text.padding(5);
    Text.maxLines(1);
    Text.onClick(() => {
        prompt.showToast({
            message: "Click on surface",
            duration: 1500,
        });
    });
    Text.pop();
}
function BottomViewRight(parent = null) {
    Row.create();
    Row.height(mHeight);
    Row.width(bottomViewRightW);
    Image.create($r('app.media.magnifier'));
    Image.backgroundColor('#e8eca5');
    Image.width('33.33%');
    Image.height('100%');
    Image.padding(16);
    Image.objectFit(ImageFit.Contain);
    Image.onClick(() => {
        prompt.showToast({
            message: "Magnifier",
            duration: 1500,
        });
    });
    Image.create($r('app.media.star'));
    Image.backgroundColor('#0dd398');
    Image.height('100%');
    Image.width('33.33%');
    Image.padding(16);
    Image.objectFit(ImageFit.Contain);
    Image.onClick(() => {
        prompt.showToast({
            message: "Star",
            duration: 1500,
        });
    });
    Image.create($r('app.media.trash'));
    Image.backgroundColor('#db0f4f');
    Image.width('33.33%');
    Image.height('100%');
    Image.padding(15);
    Image.objectFit(ImageFit.Contain);
    Image.onClick(() => {
        prompt.showToast({
            message: "Trash Bin",
            duration: 1500,
        });
    });
    Row.pop();
}
function BottomViewLeft(parent = null) {
    Row.create();
    Row.height(mHeight);
    Row.width(bottomViewLeftW);
    Text.create('Archive');
    Text.backgroundColor('#e83e5e');
    Text.width('50%');
    Text.height('100%');
    Text.fontColor("#ffffff");
    Text.textAlign(TextAlign.Center);
    Text.fontSize(14);
    Text.onClick(() => {
        prompt.showToast({
            message: "click Archive",
            duration: 500,
        });
    });
    Text.pop();
    Text.create('Delete');
    Text.backgroundColor('#bbbebd');
    Text.width('50%');
    Text.height('100%');
    Text.fontColor("#333333");
    Text.fontSize(14);
    Text.textAlign(TextAlign.Center);
    Text.onClick(() => {
        prompt.showToast({
            message: "click Delete",
            duration: 1500,
        });
    });
    Text.pop();
    Row.pop();
}
function BottomViewVertical(parent = null) {
    Image.create($r('app.media.star'));
    Image.backgroundColor('#595a57');
    Image.padding(12);
    Image.objectFit(ImageFit.Contain);
    Image.onClick(() => {
        prompt.showToast({
            message: "click search",
            duration: 1500,
        });
    });
    Image.height(mHeight);
    Image.width('100%');
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: () => { },
            cancel: () => { },
            autoCancel: true,
            alignment: DialogAlignment.Center
        }, this);
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: (index: number) => void;
    render() {
        Column.create();
        Column.backgroundColor('#b0a6a6');
        Text.create("ListView");
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(18);
        Text.height(60);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.controller.close();
            this.confirm(0);
        });
        Text.pop();
        Text.create("GridView");
        Text.width('100%');
        Text.height(60);
        Text.padding({ left: 20 });
        Text.fontSize(18);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.controller.close();
            this.confirm(1);
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new CustomContainerUser("1", undefined, {}));
