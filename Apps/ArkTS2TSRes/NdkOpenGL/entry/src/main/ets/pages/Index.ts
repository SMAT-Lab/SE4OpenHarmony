interface Index_Params {
    angleArray?: Array<number>;
    shaftRotation?: string;
    xcomponentId?;
    panOption?: PanGestureOptions;
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
import { Logger } from '../utils/Logger';
var tetrahedron_napi = globalThis.requireNapi("tetrahedron_napi", true);
;
import resmgr from '@ohos.resourceManager';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__angleArray = new ObservedPropertyObject(new Array<number>(), this, "angleArray");
        this.__shaftRotation = new ObservedPropertySimple('', this, "shaftRotation");
        this.xcomponentId = 'tetrahedron';
        this.panOption = new PanGestureOptions({ direction: PanDirection.All });
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.angleArray !== undefined) {
            this.angleArray = params.angleArray;
        }
        if (params.shaftRotation !== undefined) {
            this.shaftRotation = params.shaftRotation;
        }
        if (params.xcomponentId !== undefined) {
            this.xcomponentId = params.xcomponentId;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
    }
    aboutToBeDeleted() {
        this.__angleArray.aboutToBeDeleted();
        this.__shaftRotation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __angleArray: ObservedPropertyObject<Array<number>>;
    get angleArray() {
        return this.__angleArray.get();
    }
    set angleArray(newValue: Array<number>) {
        this.__angleArray.set(newValue);
    }
    private __shaftRotation: ObservedPropertySimple<string>;
    get shaftRotation() {
        return this.__shaftRotation.get();
    }
    set shaftRotation(newValue: string) {
        this.__shaftRotation.set(newValue);
    }
    private xcomponentId;
    private panOption: PanGestureOptions;
    async aboutToAppear() {
        Logger.info('aboutToAppear');
        this.angleArray[0] = 30;
        this.angleArray[1] = 45;
        let resourceManager: resmgr.ResourceManager = getContext(this).resourceManager;
        this.shaftRotation = await resourceManager.getStringValue($r('app.string.shaftRotation').id);
    }
    render() {
        Column.create();
        Gesture.create(GesturePriority.Low);
        PanGesture.create(this.panOption);
        PanGesture.onActionStart((event: GestureEvent) => {
            Logger.info('Gesture onActionStart');
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            this.angleArray = tetrahedron_napi.updateAngle(event.offsetX, event.offsetY);
            Logger.info('Gesture onActionUpdate : offSet ' + event.offsetX + ',' + event.offsetY);
        });
        PanGesture.onActionEnd(() => {
            Logger.info('Gesture onActionEnd');
        });
        PanGesture.pop();
        Gesture.pop();
        Column.padding(12);
        Column.backgroundColor('#f1f3f5');
        Column.height('100%');
        Text.create($r('app.string.EntryAbility_desc'));
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.pop();
        Text.create('X ' + this.shaftRotation + ':' + this.angleArray[0].toString()
            + '°\nY ' + this.shaftRotation + ':' + this.angleArray[1].toString() + '°');
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.pop();
        Column.create();
        Column.justifyContent(FlexAlign.SpaceAround);
        Column.alignItems(HorizontalAlign.Center);
        Column.height('80%');
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.borderRadius(24);
        XComponent.create({ id: this.xcomponentId, type: 'surface', libraryname: 'tetrahedron_napi' });
        XComponent.onLoad(() => {
            Logger.info('onLoad');
        });
        XComponent.width($r('app.float.wh_value_360'));
        XComponent.height($r('app.float.wh_value_360'));
        XComponent.key('tetrahedron');
        XComponent.onDestroy(() => {
            Logger.info('onDestroy');
        });
        XComponent.id('xComponent');
        XComponent.backgroundColor(Color.White);
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
