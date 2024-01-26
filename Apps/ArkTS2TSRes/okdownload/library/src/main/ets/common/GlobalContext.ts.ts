/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
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
export class GlobalContext {
    private constructor() {
    }
    private static instance: GlobalContext;
    private _objects = new Map<string, Object>();
    private _context: ESObject = null;
    setContext(context: ESObject) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    public static getContext(): GlobalContext {
        if (!GlobalContext.instance) {
            GlobalContext.instance = new GlobalContext();
        }
        return GlobalContext.instance;
    }
    getValue(value: string): Object {
        let result = this._objects.get(value);
        if (!result) {
            throw new Error("this value undefined");
        }
        return result;
    }
    setValue(key: string, objectClass: Object): void {
        this._objects.set(key, objectClass);
    }
}
