interface ExitVideo_Params {
    videoName?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ExitVideo_" + ++__generate__Id;
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
import { GlobalContext } from '../utils/GlobalContext';
import common from '@ohos.app.ability.common';
export class ExitVideo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoName = AppStorage.SetAndLink('videoName', $r('app.string.video_res_1'), this, "videoName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ExitVideo_Params) {
    }
    aboutToBeDeleted() {
        this.__videoName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoName: ObservedPropertyAbstract<Resource>;
    get videoName() {
        return this.__videoName.get();
    }
    set videoName(newValue: Resource) {
        this.__videoName.set(newValue);
    }
    render() {
        Row.create();
        Row.margin({ top: $r('app.float.size_20'), left: $r('app.float.size_25') });
        Row.onClick(() => {
            (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext)).terminateSelf();
        });
        // 退出
        Image.create($r("app.media.ic_video_back"));
        // 退出
        Image.id('Exit');
        // 退出
        Image.width($r('app.float.size_35'));
        // 退出
        Image.height($r('app.float.size_35'));
        Text.create(this.videoName);
        Text.fontColor(Color.White);
        Text.fontWeight(FontWeight.Medium);
        Text.fontSize($r('app.float.size_24'));
        Text.margin({ left: $r('app.float.size_16') });
        Text.pop();
        Row.pop();
    }
}
