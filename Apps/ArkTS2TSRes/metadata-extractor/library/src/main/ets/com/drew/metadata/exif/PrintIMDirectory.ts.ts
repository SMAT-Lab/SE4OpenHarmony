/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Directory from '../Directory';
import PrintIMDescriptor from './PrintIMDescriptor';
export default class PrintIMDirectory extends Directory {
    public static readonly TagPrintImVersion: number = 0x0000;
    private static readonly _tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        PrintIMDirectory._tagNameMap.set(PrintIMDirectory.TagPrintImVersion, "PrintIM Version");
        this.setDescriptor(new PrintIMDescriptor(this));
    }
    public getName(): string {
        return "PrintIM";
    }
    protected getTagNameMap(): Map<number, string> {
        return PrintIMDirectory._tagNameMap;
    }
}
