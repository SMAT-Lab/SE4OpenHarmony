interface Index_Params {
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import router from '@ohos.router';
import { Logger } from '../common/Common';
import fs from '@ohos.file.fs';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Row.create();
        Row.backgroundColor('#f1f3f5');
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel($r('app.string.strSortText'));
        Button.fontSize(16);
        Button.fontColor('#FFFFFF');
        Button.fontWeight(500);
        Button.padding(15);
        Button.margin(10);
        Button.width('300');
        Button.height('60');
        Button.id('strSort');
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/StrSort',
                params: {
                    data: 'message',
                }
            }, router.RouterMode.Standard);
        });
        Button.pop();
        Button.createWithLabel($r('app.string.copyFileText'));
        Button.fontSize(16);
        Button.fontColor('#FFFFFF');
        Button.fontWeight(500);
        Button.padding(15);
        Button.margin(10);
        Button.width('300');
        Button.height('60');
        Button.id('fileCopy');
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/CopyFile',
                params: {
                    data3: 'message',
                }
            }, router.RouterMode.Standard);
        });
        Button.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
