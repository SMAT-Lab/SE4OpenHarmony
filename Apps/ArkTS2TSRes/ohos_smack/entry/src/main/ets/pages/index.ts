interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
import router from '@ohos.router';
import { Smack } from '@ohos/smack';
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
    onPageShow() {
        this.init();
    }
    //todo 初始化
    private init() {
        let isLogin: boolean = Smack.onLogin();
        setTimeout(() => {
            if (isLogin) {
                router.replace({
                    url: 'pages/main'
                });
            }
            else {
                router.replace({
                    url: 'pages/user/login'
                });
            }
        }, 1000);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create("欢迎使用");
        Text.fontSize(30);
        Text.pop();
        Text.create("聊天室");
        Text.fontSize(50);
        Text.fontWeight(600);
        Text.margin({ top: 20 });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
