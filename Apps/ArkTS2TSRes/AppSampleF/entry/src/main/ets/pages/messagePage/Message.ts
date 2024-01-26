interface Message_Params {
    show?: boolean;
    text?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Message_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import Logger from '../../utils/Logger';
const TAG = '[Message]';
class Message extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__show = new ObservedPropertySimple(false, this, "show");
        this.__text = new ObservedPropertySimple('', this, "text");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Message_Params) {
        if (params.show !== undefined) {
            this.show = params.show;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__show.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __show: ObservedPropertySimple<boolean>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: boolean) {
        this.__show.set(newValue);
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private scroller: Scroller;
    async aboutToAppear() {
        this.text = AppStorage.get('text')!;
        Logger.info(TAG, `Message===this.text===${this.text}`);
    }
    async aboutToDisappear() {
        Logger.info(TAG, 'Message===aboutToDisappear===');
    }
    async onPageShow() {
        Logger.info(TAG, 'Message===onPageShow===');
    }
    async onPageHide() {
        Logger.info(TAG, 'Message===onPageHide===');
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.Black);
        Column.width('100%');
        Column.height('100%');
        RelativeContainer.create();
        RelativeContainer.height(30);
        RelativeContainer.width('90%');
        RelativeContainer.margin({ top: 40, bottom: 20 });
        Text.create($r('app.string.message_baby'));
        Text.fontColor(Color.White);
        Text.fontSize(22);
        Text.fontWeight(FontWeight.Regular);
        Text.alignRules({
            middle: { anchor: '__container__', align: HorizontalAlign.Center },
            center: { anchor: '__container__', align: VerticalAlign.Center }
        });
        Text.id("test1");
        Text.pop();
        Image.create($r("app.media.icon"));
        Image.width(30);
        Image.height(30);
        Image.onClick(() => {
            router.back();
        });
        Image.alignRules({
            right: { anchor: '__container__', align: HorizontalAlign.End },
            center: { anchor: '__container__', align: VerticalAlign.Center }
        });
        Image.id("test2");
        RelativeContainer.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ left: 15, bottom: 10 });
        Image.create($r('app.media.icon'));
        Image.width(100);
        Image.height(100);
        Image.objectFit(ImageFit.Contain);
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.margin({ left: 10 });
        Row.create();
        Row.width(400);
        Text.create(this.text);
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 20 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width(400);
        Text.create($r('app.string.message_text'));
        Text.fontColor($r('app.color.message_text'));
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Scroll.create(this.scroller);
        Scroll.width('100%');
        Scroll.height('90%');
        Scroll.padding(8);
        Scroll.margin({ left: 12, right: 12, top: 12, bottom: 150 });
        Scroll.backgroundColor(Color.White);
        Scroll.borderRadius(8);
        Scroll.scrollBar(BarState.Off);
        Scroll.borderRadius(24);
        Scroll.scrollable(ScrollDirection.Vertical);
        Column.create();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Image.create($r('app.media.icon'));
        Image.height(200);
        Image.width('40%');
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Message("1", undefined, {}));
