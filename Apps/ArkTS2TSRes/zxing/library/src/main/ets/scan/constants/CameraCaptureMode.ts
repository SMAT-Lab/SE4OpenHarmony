let __generate__Id: number = 0;
function generateId(): string {
    return "CameraCaptureMode_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
export default class CameraCaptureMode {
    private title: string;
    private mode: number = 0;
    constructor(title: string, mode?: number) {
        this.title = title;
        if (mode != undefined) {
            this.mode = mode;
        }
    }
    public setTitle(title: string) {
        this.title = title;
    }
    public setMode(mode: number) {
        this.mode = mode;
    }
    public getTitle() {
        return this.title;
    }
    public getMode() {
        return this.mode;
    }
}
