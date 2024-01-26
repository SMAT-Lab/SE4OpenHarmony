interface Index_Params {
    text?: string;
    eventType?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { PlaneGame } from "./flygame";
let context;
context = getContext(this) as any;
function requestPermission() {
    context = getContext(this) as any;
    let permissions: Array<string> = ['ohos.permission.DISTRIBUTED_DATASYNC'];
    context.requestPermissionsFromUser(permissions).then((data) => {
        console.info("Succeed to request permission from user with data: " + JSON.stringify(data));
    }).catch((error) => {
        console.info("Failed to request permission from user with error: " + JSON.stringify(error));
    });
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple('', this, "text");
        this.__eventType = new ObservedPropertySimple('', this, "eventType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.eventType !== undefined) {
            this.eventType = params.eventType;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__eventType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __eventType: ObservedPropertySimple<string>;
    get eventType() {
        return this.__eventType.get();
    }
    set eventType(newValue: string) {
        this.__eventType.set(newValue);
    }
    async aboutToAppear() {
        await requestPermission();
    }
    render() {
        Row.create();
        Column.create();
        let earlierCreatedChild_2: PlaneGame = (this && this.findChildById) ? this.findChildById("2") as PlaneGame : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new PlaneGame("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
