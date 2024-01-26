/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import common from '@ohos.app.ability.common';
import Imap, { inspect } from '@ohos/node-imap';
export default class GlobalObj {
    private CONTEXT_STR: string = 'getContext';
    private CLIENT_STR: string = 'getClient';
    private static instance: GlobalObj;
    private _objects = new Map<string, Object | null>();
    private constructor() {
    }
    public static getInstance(): GlobalObj {
        if (!GlobalObj.instance) {
            GlobalObj.instance = new GlobalObj();
        }
        return GlobalObj.instance;
    }
    getContext(): common.UIAbilityContext | null {
        return this._objects?.get(this.CONTEXT_STR) ? this._objects?.get(this.CONTEXT_STR) as common.UIAbilityContext : null;
    }
    setContext(objectClass: common.UIAbilityContext): void {
        this._objects?.set(this.CONTEXT_STR, objectClass);
    }
    getClient(): Imap | null {
        return this._objects?.get(this.CLIENT_STR) ? this._objects?.get(this.CLIENT_STR) as Imap : null;
    }
    setClient(objectClass: Imap): void {
        this._objects?.set(this.CLIENT_STR, objectClass);
    }
}
