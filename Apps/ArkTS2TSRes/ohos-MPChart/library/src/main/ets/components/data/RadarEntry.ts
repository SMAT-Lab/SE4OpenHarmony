let __generate__Id: number = 0;
function generateId(): string {
    return "RadarEntry_" + ++__generate__Id;
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
import EntryOhos from './EntryOhos';
export default class RadarEntry extends EntryOhos {
    constructor(value: number, data?: Object) {
        super(0, value, undefined, data);
    }
    public getValue(): number {
        return this.getY();
    }
    public copy(): RadarEntry {
        if (!this.getData()) {
            return new RadarEntry(this.getY(), undefined);
        }
        let e: RadarEntry = new RadarEntry(this.getY(), this.getData()!);
        return e;
    }
    public setX(x: number) {
        super.setX(x);
    }
    public getX(): number {
        return super.getX();
    }
}
