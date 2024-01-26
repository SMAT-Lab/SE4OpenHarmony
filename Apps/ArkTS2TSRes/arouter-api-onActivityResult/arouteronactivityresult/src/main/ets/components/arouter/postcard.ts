let __generate__Id: number = 0;
function generateId(): string {
    return "postcard_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { NavigationCallback } from './navigationCallback';
import { PretreatmentService } from './pretreatmenService';
import { Arouter } from "./arouter";
export class Postcard {
    private uri: string;
    private params?: Object;
    private navigationCallback: NavigationCallback | null = null;
    private pretreatmentService: PretreatmentService | null = null;
    private greenChannel: boolean = false;
    private tag?: Object;
    private flags: boolean = false;
    constructor(uri: string, params: Object) {
        this.uri = uri;
        this.params = params;
    }
    setPretreatmentService(pretreatmentService: PretreatmentService): Postcard {
        this.pretreatmentService = pretreatmentService;
        return this;
    }
    getPretreatmentService(): PretreatmentService | null {
        if (!!this.pretreatmentService)
            return this.pretreatmentService;
        else
            return null;
    }
    setNavigationCallback(callback: NavigationCallback) {
        this.navigationCallback = callback;
    }
    getNavigationCallback(): NavigationCallback | null {
        if (!!this.navigationCallback)
            return this.navigationCallback;
        else
            return null;
    }
    setUri(uri: string): Postcard {
        this.uri = uri;
        return this;
    }
    withParams(params: Object): Postcard {
        this.params = params;
        return this;
    }
    setGreenChannel(greenChannel: boolean): Postcard {
        this.greenChannel = greenChannel;
        return this;
    }
    getGreenChannel(): boolean {
        return this.greenChannel;
    }
    getParams(): Object {
        if (!!this.params) {
            return this.params;
        }
        else {
            return new Object();
        }
    }
    getUri(): string {
        return this.uri;
    }
    // 正常跳转
    navigation() {
        this.routers();
    }
    // 跳转回调
    navigationWithCallback(callback: NavigationCallback) {
        this.setNavigationCallback(callback);
        this.routers();
    }
    getTag(): Object | void {
        if (!!this.tag) {
            return this.tag;
        }
    }
    setTag(tag: Object): Postcard {
        this.tag = tag;
        return this;
    }
    withFlags(flags: boolean): Postcard {
        this.flags = flags;
        return this;
    }
    getFlags(): boolean {
        return this.flags;
    }
    toString(): string {
        return "Postcard{" +
            "uri=" + this.uri +
            ", tag=" + this.tag +
            ", params=" + this.params!.toString() +
            ", flags=" + this.flags +
            ", greenChannel=" + this.greenChannel +
            "}\n";
    }
    private routers() {
        Arouter.getInstance().navigation(this, this.getNavigationCallback() as NavigationCallback);
    }
    private isIntNum(val: string) {
        let regPos: RegExp = new RegExp("/ ^\d+$/"); // 非负整数
        let regNeg: RegExp = new RegExp("/^\-[1-9][0-9]*$/"); // 负整数
        if (regPos.test(val) && regNeg.test(val)) {
            return true;
        }
        else {
            return false;
        }
    }
}
