interface TitleBar_Params {
    title?: string | Resource;
    hasBackPress?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
export default class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = $r('app.string.EntryAbility_label');
        this.hasBackPress = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.hasBackPress !== undefined) {
            this.hasBackPress = params.hasBackPress;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string | Resource;
    private hasBackPress: boolean;
    render() {
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.constraintSize({ minHeight: 70 });
        Row.padding({ left: 10, right: 10 });
        Row.backgroundColor('#0D9FFB');
        If.create();
        if (this.hasBackPress) {
            If.branchId(0);
            Image.create($r('app.media.ic_back'));
            Image.width(50);
            Image.height('100%');
            Image.objectFit(ImageFit.Contain);
            Image.onClick(() => {
                router.back();
            });
        }
        If.pop();
        Text.create(this.title);
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.pop();
        Row.pop();
    }
}
