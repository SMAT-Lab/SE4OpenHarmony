interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.backgroundColor($r('app.color.index_bg'));
        Column.height('100%');
        Column.width('100%');
        Row.create();
        Row.margin({ top: 8 });
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('30%');
        Row.height('5%');
        Text.create($r('app.string.text_concern'));
        Text.fontSize(24);
        Text.pop();
        Text.create($r('app.string.text_translation'));
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('95%');
        Row.height('7%');
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Image.create($r('app.media.icon'));
        Image.width(30);
        Image.height(30);
        Image.margin({ left: 20 });
        Image.onClick(() => {
            router.pushUrl({
                url: 'pages/cameraPage/CameraPage'
            }, router.RouterMode.Single);
        });
        Image.id('sweep');
        Divider.create();
        Divider.height('60%');
        Divider.color($r('app.color.index_driver'));
        Divider.strokeWidth(3);
        Divider.vertical(true);
        Divider.margin({ left: 15 });
        Text.create($r('app.string.index_nike'));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ left: 15 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon'));
        Image.width(40);
        Image.height(40);
        Image.margin({ right: 15, top: 5 });
        Button.createWithLabel($r('app.string.index_search'));
        Button.fontSize(24);
        Button.width(100);
        Button.height('90%');
        Button.backgroundColor($r('app.color.index_search'));
        Button.margin({ right: 2 });
        Button.pop();
        Row.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.padding(8);
        Scroll.margin({ left: 12, right: 12, top: 4, bottom: 180 });
        Scroll.backgroundColor(Color.White);
        Scroll.borderRadius(8);
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
        Column.create();
        Column.position({ y: '90%' });
        Column.backgroundColor(Color.White);
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Row.pop();
        Row.create();
        Row.margin({ top: 8, bottom: 8 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.index_index_text'));
        Text.pop();
        Text.create($r('app.string.index_video'));
        Text.pop();
        Text.create($r('app.string.index_message'));
        Text.pop();
        Text.create($r('app.string.index_shopping'));
        Text.pop();
        Text.create($r('app.string.index_me'));
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
