interface SharePage_Params {
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SharePage_" + ++__generate__Id;
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
import TitleBar from '../../common/TitleBar';
import { SHARE_IMAGES } from './ShareItem';
interface Params extends Object {
    index: number;
}
class SharePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = (router.getParams() as Params).index;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SharePage_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private index: number;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { hasBackPress: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                hasBackPress: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Row.layoutWeight(1);
        Image.create(SHARE_IMAGES[this.index]);
        Image.width('100%');
        Image.aspectRatio(1);
        Image.objectFit(ImageFit.Contain);
        Image.sharedTransition(this.index.toString(), { duration: 600, curve: Curve.Smooth, delay: 100 });
        Row.pop();
        Column.pop();
    }
}
loadDocument(new SharePage("1", undefined, {}));
