interface Index_Params {
    localSrc?: Resource;
    ipSrc?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { localVideo } from '../common/localVideo';
import { ipVideo } from '../common/ipVideo';
import { KeyCode } from '@ohos.multimodalInput.keyCode';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__localSrc = new ObservedPropertyObject({ "id": 0, "type": 30000, params: ['EP11.mp4'] }, this, "localSrc");
        this.__ipSrc = new ObservedPropertyObject({ "id": 0, "type": 30000, params: ['EP11.mp4'] }, this, "ipSrc");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.localSrc !== undefined) {
            this.localSrc = params.localSrc;
        }
        if (params.ipSrc !== undefined) {
            this.ipSrc = params.ipSrc;
        }
    }
    aboutToBeDeleted() {
        this.__localSrc.aboutToBeDeleted();
        this.__ipSrc.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __localSrc: ObservedPropertyObject<Resource>;
    get localSrc() {
        return this.__localSrc.get();
    }
    set localSrc(newValue: Resource) {
        this.__localSrc.set(newValue);
    }
    private __ipSrc: ObservedPropertyObject<Resource>;
    get ipSrc() {
        return this.__ipSrc.get();
    }
    set ipSrc(newValue: Resource) {
        this.__ipSrc.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopEnd });
        Stack.width('100%');
        Stack.height('100%');
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('100%');
        let earlierCreatedChild_2: localVideo = (this && this.findChildById) ? this.findChildById("2") as localVideo : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new localVideo("2", this, {
                src: this.localSrc
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                src: this.localSrc
            });
            View.create(earlierCreatedChild_2);
        }
        Stack.pop();
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('40%');
        Stack.height('40%');
        let earlierCreatedChild_3: ipVideo = (this && this.findChildById) ? this.findChildById("3") as ipVideo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ipVideo("3", this, {
                src: this.ipSrc
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                src: this.ipSrc
            });
            View.create(earlierCreatedChild_3);
        }
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
