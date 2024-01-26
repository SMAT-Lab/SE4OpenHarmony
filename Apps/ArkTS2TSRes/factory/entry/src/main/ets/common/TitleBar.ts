interface TitleBar_Params {
    title?: Resource | string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
export class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: Resource | string;
    render() {
        Column.create();
        Row.create();
        Row.height(56);
        Row.width('100%');
        Image.create($r('app.media.ic_back'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 26 });
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.back();
        });
        Image.id('backBtn');
        Text.create(this.title);
        Text.fontSize(20);
        Text.layoutWeight(1);
        Text.margin({ left: 16 });
        Text.align(Alignment.Start);
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
        Column.pop();
    }
}
