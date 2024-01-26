interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the  Eclipse Public License -v 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.eclipse.org/legal/epl-2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
async function routePage(page: string) {
    let options: router.RouterOptions = {
        url: 'pages/' + page,
    };
    try {
        await router.pushUrl(options);
    }
    catch (err) {
        console.error(`fail callback, code: ${err.code}, msg: ${err.msg}`);
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create($r('app.string.entry_MainAbility'));
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithChild();
        Button.margin({
            top: 20
        });
        Button.backgroundColor(0x1677ff);
        Button.onClick(() => {
            routePage('emqxPage');
        });
        Text.create($r('app.string.emqx'));
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(0xffffff);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
