let __generate__Id: number = 0;
function generateId(): string {
    return "Danmaku_" + ++__generate__Id;
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
import { DanmakuUtils } from '../util/DanmakuUtils';
import { BaseDanmaku } from '../model/BaseDanmaku';
import { IDisplayer } from '../model/IDisplayer';
export class Danmaku extends BaseDanmaku {
    constructor(text: string) {
        super();
        DanmakuUtils.fillText(this, text);
    }
    public isShown(): boolean {
        return false;
    }
    public layout(displayer: IDisplayer, x: number, y: number) {
    }
    public getRectAtTime(displayer: IDisplayer, time: number): number[] | any {
        return null;
    }
    public getLeft(): number {
        return 0;
    }
    public getTop(): number {
        return 0;
    }
    public getRight(): number {
        return 0;
    }
    public getBottom(): number {
        return 0;
    }
    public getType(): number {
        return 0;
    }
}
