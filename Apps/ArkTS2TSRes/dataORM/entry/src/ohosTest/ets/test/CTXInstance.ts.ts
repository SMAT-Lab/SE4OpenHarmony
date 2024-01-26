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
import { Context } from "@ohos.abilityAccessCtrl";
export class CTXInstance {
    private static sInstance: CTXInstance;
    private ctx: Context;
    private constructor() {
    }
    public static getInstance(): CTXInstance {
        if (!this.sInstance) {
            this.sInstance = new CTXInstance();
        }
        return this.sInstance;
    }
    public setContext(ctx: Context) {
        this.ctx = ctx;
    }
    public getContext(): Context {
        return this.ctx;
    }
}
