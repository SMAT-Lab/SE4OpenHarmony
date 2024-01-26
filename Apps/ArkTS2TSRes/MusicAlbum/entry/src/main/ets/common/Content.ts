interface Content_Params {
    coverHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Content_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import PlayListCover from '../common/PlayListCover';
import PlayList from '../common/PlayList';
export default class Content extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__coverHeight = new ObservedPropertySimple(0, this, "coverHeight");
        this.addProvidedVar("coverHeight", this.__coverHeight, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Content_Params) {
        if (params.coverHeight !== undefined) {
            this.coverHeight = params.coverHeight;
        }
    }
    aboutToBeDeleted() {
        this.__coverHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __coverHeight: ObservedPropertySimple<number>;
    get coverHeight() {
        return this.__coverHeight.get();
    }
    set coverHeight(newValue: number) {
        this.__coverHeight.set(newValue);
    }
    render() {
        GridRow.create();
        GridRow.height('100%');
        GridCol.create({ span: { sm: 12, md: 6, lg: 4 } });
        GridCol.backgroundColor('#e4ecf7');
        __Common__.create();
        __Common__.onAreaChange((oldArea: Area, newArea: Area) => {
            this.coverHeight = newArea.height as number;
        });
        let earlierCreatedChild_2: PlayListCover = (this && this.findChildById) ? this.findChildById("2") as PlayListCover : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new PlayListCover("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        GridCol.pop();
        GridCol.create({ span: { sm: 12, md: 6, lg: 8 } });
        GridCol.borderRadius(40);
        let earlierCreatedChild_3: PlayList = (this && this.findChildById) ? this.findChildById("3") as PlayList : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new PlayList("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        GridCol.pop();
        GridRow.pop();
    }
}
