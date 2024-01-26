interface Inner_Params {
    buttonList?: ButtonList[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InnerComponent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Buttons } from '@ohos/library';
import InnerViewModel from '../viewmodel/InnerViewModel';
import { ButtonList } from '../common/bean/ButtonList';
import { CommonConstants } from '../common/constants/CommonConst';
export class Inner extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__buttonList = new ObservedPropertyObject(InnerViewModel.getButtonListData(), this, "buttonList");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Inner_Params) {
        if (params.buttonList !== undefined) {
            this.buttonList = params.buttonList;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__buttonList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __buttonList: ObservedPropertyObject<ButtonList[]>;
    get buttonList() {
        return this.__buttonList.get();
    }
    set buttonList(newValue: ButtonList[]) {
        this.__buttonList.set(newValue);
    }
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.margin({ bottom: $r('app.float.default_24') });
        Column.create({ space: CommonConstants.SPACE_12 });
        Column.width(CommonConstants.CONTAINER_WIDTH);
        Column.padding({
            left: $r('app.float.default_12'),
            right: $r('app.float.default_12'),
            top: $r('app.float.default_12')
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.buttonList), (item) => {
            Column.create();
            Column.width(CommonConstants.CONTAINER_WIDTH);
            Column.aspectRatio(CommonConstants.ASPECT_RATIO_176);
            Column.padding({
                top: $r('app.float.default_12'),
                left: $r('app.float.default_8')
            });
            Column.backgroundColor($r('app.color.white'));
            Column.borderRadius($r('app.float.default_24'));
            Flex.create({
                direction: FlexDirection.Column,
                justifyContent: FlexAlign.SpaceBetween,
                alignItems: ItemAlign.Start
            });
            Flex.padding({
                bottom: $r('app.float.default_24')
            });
            Flex.width(CommonConstants.CONTAINER_WIDTH);
            Flex.height(CommonConstants.CONTAINER_HEIGHT);
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Text.create(item.title);
            Text.height($r('app.float.default_21'));
            Text.fontSize($r('app.float.fontSize_16'));
            Text.fontColor($r('app.color.common_color'));
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Text.create(item.subtitle);
            Text.height($r('app.float.default_16'));
            Text.fontSize($r('app.float.fontSize_12'));
            Text.fontColor($r('app.color.common_color'));
            Text.fontWeight(CommonConstants.FONT_WEIGHT_400);
            Text.margin({ top: $r('app.float.default_4') });
            Text.opacity(CommonConstants.OPACITY_6);
            Text.pop();
            Column.pop();
            Column.create();
            Column.width($r('app.float.default_260'));
            Column.height($r('app.float.default_90'));
            Column.backgroundImage($r('app.media.mobile'));
            Column.backgroundImageSize(ImageSize.Contain);
            Column.justifyContent(FlexAlign.End);
            Column.alignSelf(ItemAlign.Center);
            Column.align(Alignment.End);
            Column.pop();
            Flex.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
}
