interface Index_Params {
    isBackground?: boolean;
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
import notificationManager from '@ohos.notificationManager';
import router from '@ohos.router';
import common from '@ohos.app.ability.common';
function __Text__textStyle(): void {
    Text.fontColor($r('app.color.text_normal'));
    Text.fontWeight(400);
    Text.fontFamily('HarmonyHeiTi');
    Text.fontSize(16);
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isBackground = AppStorage.SetAndLink('isBackground', false, this, "isBackground");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        this.__isBackground.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isBackground: ObservedPropertyAbstract<boolean>;
    get isBackground() {
        return this.__isBackground.get();
    }
    set isBackground(newValue: boolean) {
        this.__isBackground.set(newValue);
    }
    aboutToAppear() {
        notificationManager.requestEnableNotification();
    }
    render() {
        Navigation.create();
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.hideBackButton(true);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.backgroundColor($r('app.color.light_gray'));
        Navigation.title({
            main: this.getResourceString($r('app.string.EntryAbility_label')),
            sub: this.getResourceString($r('app.string.home_tips'))
        });
        Scroll.create();
        Scroll.padding({ left: 12, right: 12 });
        Scroll.height('100%');
        Scroll.align(Alignment.Top);
        Column.create();
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.padding({ top: 17, bottom: 17, left: 12, right: 12 });
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Row.margin({ top: 12 });
        Row.margin({ top: 0 });
        Text.create($r('app.string.background_tips'));
        __Text__textStyle();
        Text.pop();
        Blank.create();
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isBackground });
        Toggle.height(24);
        Toggle.onChange((isOn: boolean) => {
            this.isBackground = isOn;
            AppStorage.SetOrCreate('isBackground', isOn);
        });
        Toggle.pop();
        Row.pop();
        this.CapabilityView($r('app.media.ic_upload'), $r('app.string.upload'), 'btn_upload', () => {
            router.pushUrl({
                url: 'pages/Upload'
            });
        }, this);
        this.CapabilityView($r('app.media.ic_download'), $r('app.string.download'), 'btn_download', () => {
            router.pushUrl({
                url: 'pages/Download'
            });
        }, this);
        Column.pop();
        Scroll.pop();
        Navigation.pop();
    }
    CapabilityView(image: Resource, text: Resource, id: string, onClick: () => void, parent = null) {
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.padding({ top: 17, bottom: 17, left: 12, right: 12 });
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Row.margin({ top: 12 });
        Row.id(id);
        Row.onClick(onClick);
        Image.create(image);
        Image.size({ width: 24, height: 24 });
        Image.objectFit(ImageFit.Cover);
        Text.create(text);
        __Text__textStyle();
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
    }
    getResourceString(resource: Resource) {
        let context = getContext(this) as common.UIAbilityContext;
        return context.resourceManager.getStringSync(resource.id);
    }
}
loadDocument(new Index("1", undefined, {}));
