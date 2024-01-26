interface Index_Params {
    isPng?: boolean;
    isPng2?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import isPng from 'is-png';
import { GlobalContext } from './globalThis';
let gloContext: Context = GlobalContext.getContext().getObject("context") as Context;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isPng = new ObservedPropertySimple(false, this, "isPng");
        this.__isPng2 = new ObservedPropertySimple(false, this, "isPng2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isPng !== undefined) {
            this.isPng = params.isPng;
        }
        if (params.isPng2 !== undefined) {
            this.isPng2 = params.isPng2;
        }
    }
    aboutToBeDeleted() {
        this.__isPng.aboutToBeDeleted();
        this.__isPng2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isPng: ObservedPropertySimple<boolean>;
    get isPng() {
        return this.__isPng.get();
    }
    set isPng(newValue: boolean) {
        this.__isPng.set(newValue);
    }
    private __isPng2: ObservedPropertySimple<boolean>;
    get isPng2() {
        return this.__isPng2.get();
    }
    set isPng2(newValue: boolean) {
        this.__isPng2.set(newValue);
    }
    async aboutToAppear() {
        gloContext.resourceManager.getMedia($r("app.media.fixture").id).then(value => {
            this.isPng = isPng(value);
            console.info("image png:" + this.isPng);
        });
        gloContext.resourceManager.getMedia($r("app.media.fixtur").id).then(value => {
            this.isPng2 = isPng(value);
            console.info("image png:" + this.isPng2);
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create('fixture.jpg 图片是否是png格式：' + this.isPng);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create($r('app.media.fixture'));
        Image.width('100%');
        Image.height(150);
        Text.create('fixtur.png 图片是否是png格式：' + this.isPng2);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create($r('app.media.fixtur'));
        Image.width('100%');
        Image.height(150);
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
