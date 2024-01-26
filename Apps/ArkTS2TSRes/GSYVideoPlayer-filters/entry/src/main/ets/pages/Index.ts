interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from "@ohos.router";
import { GlobalContext, LogUtils, PlayerType } from '@ohos/gsyvideoplayer';
import promptAction from '@ohos.promptAction';
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
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel("切换内核播放器");
        Button.margin(10);
        Button.onClick(() => {
            if (GlobalContext.getContext().getObject("playType") == PlayerType.IJK_PLAYER) {
                GlobalContext.getContext().setObject("playType", PlayerType.SYSTEM_AVPLAYER);
            }
            else {
                GlobalContext.getContext().setObject("playType", PlayerType.IJK_PLAYER);
            }
            promptAction.showToast({
                message: GlobalContext.getContext()
                    .getObject("playType") == PlayerType.IJK_PLAYER ? "切换到ijkPlayer播放器" : "切换到avplayer播放器"
            });
        });
        Button.pop();
        Button.createWithLabel("简单播放器，全屏功能，截图，gif功能");
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/SimpleDemo" });
        });
        Button.pop();
        Button.createWithLabel("边播放边缓存功能");
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/PlayWithCacheDemo" });
        });
        Button.pop();
        Button.createWithLabel("滤镜功能");
        Button.margin(10);
        Button.onClick(() => {
            if (GlobalContext.getContext().getObject('playType') == PlayerType.IJK_PLAYER) {
                router.pushUrl({ url: "pages/EffectFilterDemo" });
            }
            else {
                promptAction.showToast({
                    message: '滤镜能力只支持ijkPlayer播放器'
                });
            }
        });
        Button.pop();
        Button.createWithLabel("简单列表功能");
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/SimpleList" });
        });
        Button.pop();
        Button.createWithLabel("弹幕播放器功能");
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/DanmakuVideoDemo" });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    async aboutToAppear() {
        LogUtils.getInstance().setLogSwitch(true);
    }
}
loadDocument(new Index("1", undefined, {}));
