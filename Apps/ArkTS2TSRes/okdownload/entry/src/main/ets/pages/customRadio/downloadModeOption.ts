interface DownloadModeOption_Params {
    downloadModes?: DownloadMode[];
    downloadModesIndices?: number[];
    isSerial?: number;
    isEnable?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "downloadModeOption_" + ++__generate__Id;
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
class DownloadMode {
    name: string;
    image: Resource;
    constructor(name: string, image: Resource) {
        this.name = name;
        this.image = image;
    }
}
export default class DownloadModeOption extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__downloadModes = new ObservedPropertyObject([
            new DownloadMode("Serial", $r("app.media.radio_checked")),
            new DownloadMode("Parallel", $r("app.media.radio_unchecked"))
        ], this, "downloadModes");
        this.__downloadModesIndices = new ObservedPropertyObject(this.downloadModes.map((item, index) => index), this, "downloadModesIndices");
        this.__isSerial = new SynchedPropertySimpleTwoWay(params.isSerial, this, "isSerial");
        this.__isEnable = new SynchedPropertySimpleOneWay(params.isEnable, this, "isEnable");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DownloadModeOption_Params) {
        if (params.downloadModes !== undefined) {
            this.downloadModes = params.downloadModes;
        }
        if (params.downloadModesIndices !== undefined) {
            this.downloadModesIndices = params.downloadModesIndices;
        }
        this.isEnable = params.isEnable;
    }
    aboutToBeDeleted() {
        this.__downloadModes.aboutToBeDeleted();
        this.__downloadModesIndices.aboutToBeDeleted();
        this.__isSerial.aboutToBeDeleted();
        this.__isEnable.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __downloadModes: ObservedPropertyObject<DownloadMode[]>;
    get downloadModes() {
        return this.__downloadModes.get();
    }
    set downloadModes(newValue: DownloadMode[]) {
        this.__downloadModes.set(newValue);
    }
    private __downloadModesIndices: ObservedPropertyObject<number[]>;
    get downloadModesIndices() {
        return this.__downloadModesIndices.get();
    }
    set downloadModesIndices(newValue: number[]) {
        this.__downloadModesIndices.set(newValue);
    }
    private __isSerial: SynchedPropertySimpleTwoWay<number>;
    get isSerial() {
        return this.__isSerial.get();
    }
    set isSerial(newValue: number) {
        this.__isSerial.set(newValue);
    }
    private __isEnable: SynchedPropertySimpleOneWay<boolean>;
    get isEnable() {
        return this.__isEnable.get();
    }
    set isEnable(newValue: boolean) {
        this.__isEnable.set(newValue);
    }
    render() {
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.width('100%');
        Flex.enabled(this.isEnable);
        Flex.opacity(this.isEnable ? 1 : 0.5);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.downloadModesIndices), (index: number) => {
            Row.create({ space: 15 });
            Row.onClick(() => {
                this.isSerial = index;
            });
            Image.create(this.isSerial == index ? $r("app.media.radio_checked") : $r("app.media.radio_unchecked"));
            Image.width('30vp');
            Image.height('30vp');
            Image.objectFit(ImageFit.Contain);
            Text.create(this.downloadModes[index].name);
            Text.fontSize('20fp');
            Text.pop();
            Row.pop();
        }, (index: string) => index);
        ForEach.pop();
        Flex.pop();
    }
}
