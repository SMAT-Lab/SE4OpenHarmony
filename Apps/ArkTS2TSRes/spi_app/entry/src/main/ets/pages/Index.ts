interface ComponentTest_Params {
    scroller?: Scroller;
    sum_list?: number;
    items?: Array<number>;
    date?: Array<string>;
    value?: Array<string>;
    now_item?: number;
    now_value?: string;
    now_date?: string;
    title_show?: Boolean;
    // 创建一个controller
    write_controller?: CustomDialogController;
    // 创建一个controller
    erase_controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import um_spi from '@ohos.spitest';
import prompt from '@ohos.prompt';
import PromptDialog from './promptDialog';
import hilog from '@ohos.hilog';
class ComponentTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__sum_list = new ObservedPropertySimple(0, this, "sum_list");
        this.__items = new ObservedPropertyObject(new Array<number>(), this, "items");
        this.__date = new ObservedPropertyObject(new Array<string>(), this, "date");
        this.__value = new ObservedPropertyObject(new Array<string>(), this, "value");
        this.__now_item = new ObservedPropertySimple(0, this, "now_item");
        this.__now_value = new ObservedPropertySimple("请输入：", this, "now_value");
        this.__now_date = new ObservedPropertySimple("", this, "now_date");
        this.__title_show = new ObservedPropertyObject(true, this, "title_show");
        this.write_controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new PromptDialog("3", this, { confirm: () => {
                        this.onWrite();
                    }, title: "写入记录", content: this.now_value });
                jsDialog.setController(this.
                // 创建一个controller
                write_controller);
                View.create(jsDialog);
            },
            cancel: () => {
                console.log("取消写入"); // 点击蒙层的回调
            },
            autoCancel: true,
            customStyle: true // 使用自定义样式
        }, this);
        this.erase_controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new PromptDialog("4", this, { confirm: () => {
                        this.onErase();
                    }, title: "清空记录", content: "清空后无法恢复，是否继续?" });
                jsDialog.setController(this.
                // 创建一个controller
                erase_controller);
                View.create(jsDialog);
            },
            cancel: () => {
                console.log("取消清空"); // 点击蒙层的回调
            },
            autoCancel: true,
            customStyle: true // 使用自定义样式
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ComponentTest_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.sum_list !== undefined) {
            this.sum_list = params.sum_list;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.now_item !== undefined) {
            this.now_item = params.now_item;
        }
        if (params.now_value !== undefined) {
            this.now_value = params.now_value;
        }
        if (params.now_date !== undefined) {
            this.now_date = params.now_date;
        }
        if (params.title_show !== undefined) {
            this.title_show = params.title_show;
        }
        if (params.write_controller !== undefined) {
            this.write_controller = params.write_controller;
        }
        if (params.erase_controller !== undefined) {
            this.erase_controller = params.erase_controller;
        }
    }
    aboutToBeDeleted() {
        this.__sum_list.aboutToBeDeleted();
        this.__items.aboutToBeDeleted();
        this.__date.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__now_item.aboutToBeDeleted();
        this.__now_value.aboutToBeDeleted();
        this.__now_date.aboutToBeDeleted();
        this.__title_show.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller; // 创建一个滚动控制器
    private __sum_list: ObservedPropertySimple<number>;
    get sum_list() {
        return this.__sum_list.get();
    }
    set sum_list(newValue: number) {
        this.__sum_list.set(newValue);
    }
    private __items: ObservedPropertyObject<Array<number>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<number>) {
        this.__items.set(newValue);
    }
    private __date: ObservedPropertyObject<Array<string>>;
    get date() {
        return this.__date.get();
    }
    set date(newValue: Array<string>) {
        this.__date.set(newValue);
    }
    private __value: ObservedPropertyObject<Array<string>>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: Array<string>) {
        this.__value.set(newValue);
    }
    private __now_item: ObservedPropertySimple<number>;
    get now_item() {
        return this.__now_item.get();
    }
    set now_item(newValue: number) {
        this.__now_item.set(newValue);
    }
    private __now_value: ObservedPropertySimple<string>;
    get now_value() {
        return this.__now_value.get();
    }
    set now_value(newValue: string) {
        this.__now_value.set(newValue);
    }
    private __now_date: ObservedPropertySimple<string>;
    get now_date() {
        return this.__now_date.get();
    }
    set now_date(newValue: string) {
        this.__now_date.set(newValue);
    }
    private __title_show: ObservedPropertyObject<Boolean>;
    get title_show() {
        return this.__title_show.get();
    }
    set title_show(newValue: Boolean) {
        this.__title_show.set(newValue);
    }
    data_splice() {
        this.items.splice(0, this.items.length);
        this.date.splice(0, this.date.length);
        this.value.splice(0, this.value.length);
    }
    data_add(item: number) {
        this.items.push(item);
        this.date.push(um_spi.sync_read_date(item));
        hilog.info(0xF111, "SPI_APP", "date is %{public}s", this.date[item]);
        this.value.push(um_spi.sync_read_value(item));
        hilog.info(0xF111, "SPI_APP", "value is %{public}s", this.value[item]);
    }
    data_update() {
        let date = new Date();
        this.now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        hilog.info(0xF111, "SPI_APP", "%{public}s", this.now_date);
        let read_sum_list = um_spi.sync_read_sum_list();
        hilog.info(0xF111, "SPI_APP", "%{public}d", read_sum_list);
        if (read_sum_list || read_sum_list == 0) {
            this.sum_list = read_sum_list;
            this.data_splice();
            for (let i = 0; i < this.sum_list; i++) {
                this.data_add(i);
            }
            prompt.showToast({
                message: "读取历史记录成功！\n"
            });
        }
        else {
            prompt.showToast({
                message: "读取历史记录失败！\n没有权限！"
            });
        }
    }
    back_top() {
        this.scroller.scrollEdge(Edge.Top);
    }
    onPageShow() {
        this.data_update();
    }
    // 创建一个controller
    private write_controller: CustomDialogController;
    //write对话框点击yes事件处理
    onWrite() {
        let date = new Date();
        let getHours = date.getHours();
        let getMinutes = date.getMinutes();
        let write_date = this.now_date + " ";
        if (getHours < 10) {
            write_date = write_date + '0';
        }
        write_date = write_date + getHours + ":";
        if (getMinutes < 10) {
            write_date = write_date + '0';
        }
        write_date = write_date + getMinutes;
        let get_value = um_spi.sync_write_buffer_value(this.now_value.length + 1, this.now_value, write_date);
        if (get_value) {
            this.now_value = "写入:\n" + get_value.toString();
            //更新新添加的数据
            this.data_add(this.sum_list);
            //更新sum_list数据
            this.sum_list = um_spi.sync_read_sum_list();
            this.back_top();
            prompt.showToast({
                message: "写入记录成功！"
            });
        }
        else {
            prompt.showToast({
                message: "写入失败！\n 没有权限！"
            });
        }
    }
    // 创建一个controller
    private erase_controller: CustomDialogController;
    //erase对话框点击yes事件处理
    onErase() {
        let ret = um_spi.sync_all_erase();
        if (ret) {
            //更新sum_list数据
            this.sum_list = um_spi.sync_read_sum_list();
            //清空date、value和items数组
            this.data_splice();
            prompt.showToast({
                message: "清空成功！"
            });
        }
        else {
            prompt.showToast({
                message: "清空失败！\n没有权限！"
            });
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Stack.create({ alignContent: Alignment.BottomEnd });
        Stack.width('100%');
        Stack.height('100%');
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width('100%');
        Column.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarWidth(15);
        Scroll.scrollBar(BarState.On);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.padding({ top: 10, bottom: 10 });
        Column.create();
        Column.width("100%");
        Row.create();
        Row.width('100%');
        Row.height(55);
        Row.onDisAppear(() => {
            this.title_show = false;
        });
        Text.create("刷新");
        Text.fontSize(20);
        Text.fontColor('#808080');
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.id('flash_button');
        Text.onClick(() => {
            this.data_update();
        });
        Text.layoutWeight(1);
        Text.pop();
        Text.create("学霸笔记");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.height(50);
        Text.layoutWeight(1);
        Text.pop();
        Text.create('清空');
        Text.fontSize(20);
        Text.fontColor('#808080');
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.id("clean_up_button");
        Text.onClick(() => {
            this.erase_controller.open();
        });
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        Line.create();
        Line.width('100%');
        Line.height(3);
        Line.backgroundColor('#808080');
        If.create();
        if (um_spi.sync_get_MB_Free()) {
            If.branchId(0);
            Text.create("剩余空间:" + um_spi.sync_get_MB_Free() + "%");
            Text.fontSize(15);
            Text.fontColor('#808080');
            Text.height(20);
            Text.id("MB_Free");
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.sum_list == 0) {
            If.branchId(0);
            Text.create('空');
            Text.fontSize(30);
            Text.width('100%');
            Text.fontColor('#808080');
            Text.height(200);
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        If.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.items), (item: number) => {
            Text.create(this.date[item] + ": " + this.value[item]);
            Text.fontSize(26);
            Text.width('90%');
            Text.height(50);
            Text.backgroundColor(Color.White);
            Text.margin({ top: 10 });
            Text.border({
                color: Color.Blue,
                width: 2,
                radius: 0,
                style: BorderStyle.Solid
            });
            Text.onClick(() => {
                AlertDialog.show({
                    title: this.date[item],
                    message: this.value[item],
                    alignment: DialogAlignment.Center,
                    confirm: {
                        value: "返回",
                        fontColor: Color.Black,
                        backgroundColor: "#aabbcc",
                        action: () => {
                            console.log("return");
                        }
                    }
                });
            });
            Text.pop();
        });
        ForEach.pop();
        Stack.create({ alignContent: Alignment.BottomStart });
        Stack.width('100%');
        Stack.height(30);
        Stack.margin({ top: 500 });
        Text.create('返回');
        Text.fontSize(20);
        Text.fontColor('#808080');
        Text.height(30);
        Text.textAlign(TextAlign.Center);
        Text.id('back_Click');
        Text.onClick(() => {
            this.back_top();
        });
        Text.pop();
        Text.create(this.now_date);
        Text.fontSize(16);
        Text.height(30);
        Text.id("next_date");
        Text.offset({
            x: '50%'
        });
        Text.pop();
        Stack.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.width('100%');
        Row.height(300);
        Row.margin({ top: 10 });
        Stack.create({ alignContent: Alignment.BottomEnd });
        Stack.width('100%');
        Stack.height(300);
        TextArea.create({ text: this.now_value });
        TextArea.width("100%");
        TextArea.height(300);
        TextArea.id("TextArea");
        TextArea.fontColor(Color.Black);
        TextArea.fontStyle(FontStyle.Italic);
        TextArea.caretColor(Color.Red);
        TextArea.placeholderColor(Color.Green);
        TextArea.placeholderFont({
            size: 20,
            style: FontStyle.Italic,
            weight: FontWeight.Bold
        });
        TextArea.onFocus(() => {
            this.now_value = "";
        });
        TextArea.onChange((value) => {
            this.now_value = value;
        });
        Text.create(this.now_value.length + "/200");
        Text.fontSize(14);
        Text.margin(10);
        Text.id("max_font");
        Text.pop();
        Stack.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Row.size({ width: "100%", height: 50 });
        Button.createWithLabel('write');
        Button.size({ width: 90, height: 50 });
        Button.backgroundColor('#bbccaa');
        Button.id("write_button");
        Button.onClick(() => {
            this.write_controller.open(); // 打开弹窗
        });
        Button.pop();
        Button.createWithLabel('falshID', { stateEffect: true });
        Button.size({ width: 90, height: 50 });
        Button.backgroundColor('#aabbcc');
        Button.id('flashID_button');
        Button.onClick(() => {
            let falshID = um_spi.sync_get_flashid_value();
            if (falshID) {
                this.now_value = "FlashID:" + falshID.toString(16);
            }
            else {
                prompt.showToast({
                    message: "读取falshID失败!\n没有权限！"
                });
            }
        });
        Button.pop();
        Button.createWithLabel('deviceID');
        Button.size({ width: 90, height: 50 });
        Button.backgroundColor('#ccaabb');
        Button.id('deviceID_button');
        Button.onClick(() => {
            let deviceID = um_spi.sync_get_deviceid_value();
            if (deviceID) {
                this.now_value = "deviceID:" + deviceID.toString(16);
            }
            else {
                prompt.showToast({
                    message: "读取deviceID失败!\n没有权限"
                });
            }
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Button.createWithLabel('+');
        Button.size({ width: 80, height: 80 });
        Button.fontSize(50);
        Button.id('add_button');
        Button.onClick(() => {
            let date = new Date;
            this.now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            this.scroller.scrollEdge(Edge.End); // 滚动到底部
        });
        Button.margin(50);
        Button.defaultFocus(true);
        Button.pop();
        Stack.pop();
        Column.pop();
    }
}
loadDocument(new ComponentTest("1", undefined, {}));
