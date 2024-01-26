let __generate__Id: number = 0;
function generateId(): string {
    return "Duration_" + ++__generate__Id;
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
export class Duration {
    private mInitialDuration: number;
    private factor: number = 1.0;
    public value: number;
    constructor(initialDuration: number) {
        this.mInitialDuration = initialDuration;
        this.value = initialDuration;
    }
    public setValue(initialDuration: number) {
        this.mInitialDuration = initialDuration;
        this.value = (this.mInitialDuration * this.factor);
    }
    public setFactor(f: number) {
        if (this.factor != f) {
            this.factor = f;
            this.value = (this.mInitialDuration * f);
        }
    }
}
