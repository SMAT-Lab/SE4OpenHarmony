interface Second_Params {
    params?: rouTmp;
    flag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Second_" + ++__generate__Id;
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
import { Decrypt } from '../common/Decrypt';
import { Encryption } from '../common/Encryption';
class Second extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.params = router.getParams() as rouTmp;
        this.flag = this.params.flag;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Second_Params) {
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private params: rouTmp;
    private flag: boolean;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F1F1F1');
        Row.create();
        Row.height('6%');
        Row.width('100%');
        Row.padding({ left: 16 });
        Row.backgroundColor('#0D9FFB');
        Row.constraintSize({ minHeight: 50 });
        Row.create();
        Row.layoutWeight(1);
        Row.onClick(() => {
            router.back();
        });
        Row.id('back');
        Image.create($r('app.media.left'));
        Image.objectFit(ImageFit.Contain);
        Image.width('10%');
        Text.create($r('app.string.back'));
        Text.fontSize(20);
        Text.textAlign(TextAlign.End);
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
        Text.create(this.flag ? $r('app.string.encryption') : $r('app.string.decrypt'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Start);
        Text.margin({ right: '5%' });
        Text.id('encryptAndDecrypt');
        Text.pop();
        Row.pop();
        If.create();
        if (this.flag) {
            If.branchId(0);
            let earlierCreatedChild_2: Encryption = (this && this.findChildById) ? this.findChildById("2") as Encryption : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new Encryption("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: Decrypt = (this && this.findChildById) ? this.findChildById("3") as Decrypt : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new Decrypt("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
    }
}
class rouTmp {
    flag: boolean = true;
}
loadDocument(new Second("1", undefined, {}));
