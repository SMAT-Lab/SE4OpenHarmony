interface AirplaneGameCover_Params {
    model?: SmartRefreshForGame.Model;
    gameState?: boolean;
    maxHeight?: number;
    downY?: number;
    textColor?: Color | string | number;
    topAnimY?: number;
    bottomAnimY?: number;
    tipText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BattleCityGameCover_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import SmartRefreshForGame from './SmartRefreshForGame';
export class AirplaneGameCover extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__gameState = new ObservedPropertySimple(false, this, "gameState");
        this.maxHeight = 0;
        this.__downY = new SynchedPropertySimpleOneWay(params.downY, this, "downY");
        this.textColor = '';
        this.__topAnimY = new ObservedPropertySimple(1, this, "topAnimY");
        this.__bottomAnimY = new ObservedPropertySimple(1, this, "bottomAnimY");
        this.__tipText = new ObservedPropertySimple(this.model.maskTextTopPull, this, "tipText");
        this.updateWithValueParams(params);
        this.declareWatch("gameState", this.onGameChange);
        this.declareWatch("downY", this.onYChange);
    }
    updateWithValueParams(params: AirplaneGameCover_Params) {
        if (params.gameState !== undefined) {
            this.gameState = params.gameState;
        }
        if (params.maxHeight !== undefined) {
            this.maxHeight = params.maxHeight;
        }
        this.downY = params.downY;
        if (params.textColor !== undefined) {
            this.textColor = params.textColor;
        }
        if (params.topAnimY !== undefined) {
            this.topAnimY = params.topAnimY;
        }
        if (params.bottomAnimY !== undefined) {
            this.bottomAnimY = params.bottomAnimY;
        }
        if (params.tipText !== undefined) {
            this.tipText = params.tipText;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__gameState.aboutToBeDeleted();
        this.__downY.aboutToBeDeleted();
        this.__topAnimY.aboutToBeDeleted();
        this.__bottomAnimY.aboutToBeDeleted();
        this.__tipText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForGame.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForGame.Model) {
        this.__model.set(newValue);
    }
    private __gameState: ObservedPropertySimple<boolean>;
    get gameState() {
        return this.__gameState.get();
    }
    set gameState(newValue: boolean) {
        this.__gameState.set(newValue);
    }
    private maxHeight: number;
    private __downY: SynchedPropertySimpleOneWay<number>;
    get downY() {
        return this.__downY.get();
    }
    set downY(newValue: number) {
        this.__downY.set(newValue);
    }
    private textColor: Color | string | number;
    private __topAnimY: ObservedPropertySimple<number>;
    get topAnimY() {
        return this.__topAnimY.get();
    }
    set topAnimY(newValue: number) {
        this.__topAnimY.set(newValue);
    }
    private __bottomAnimY: ObservedPropertySimple<number>;
    get bottomAnimY() {
        return this.__bottomAnimY.get();
    }
    set bottomAnimY(newValue: number) {
        this.__bottomAnimY.set(newValue);
    }
    private __tipText: ObservedPropertySimple<string>;
    get tipText() {
        return this.__tipText.get();
    }
    set tipText(newValue: string) {
        this.__tipText.set(newValue);
    }
    private onGameChange(value: any) {
        if (this.gameState) {
            this.bottomAnimY = 0;
            this.topAnimY = 0;
        }
        else {
            this.bottomAnimY = 1;
            this.topAnimY = 1;
        }
    }
    private onYChange() {
        if (this.downY < this.maxHeight) {
            this.tipText = this.model.maskTextTopPull;
        }
        else {
            this.tipText = this.model.maskTextTopRelease;
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.End });
        Context.animation({
            duration: 500,
            curve: Curve.EaseOut,
            delay: 50,
            iterations: 1,
            playMode: PlayMode.Normal // 动画模式
        });
        Flex.width('100%');
        Flex.height('50%');
        Flex.backgroundColor(this.textColor == '#ffffff' ? '#000000' : '#ffffff');
        Flex.scale({
            y: this.topAnimY,
            centerX: '0%',
            centerY: '0%'
        });
        Context.animation(null);
        Text.create(this.tipText);
        Text.fontSize(px2fp(this.model.maskTextSizeTop));
        Text.fontColor(this.textColor);
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Context.animation({
            duration: 500,
            curve: Curve.EaseOut,
            delay: 10,
            iterations: 1,
            playMode: PlayMode.Normal // 动画模式
        });
        Flex.width('100%');
        Flex.height('50%');
        Flex.backgroundColor(this.textColor == '#ffffff' ? '#000000' : '#ffffff');
        Flex.scale({
            y: this.bottomAnimY,
            centerX: '100%',
            centerY: '100%'
        });
        Context.animation(null);
        Text.create(this.model.maskTextBottom);
        Text.fontSize(px2fp(this.model.maskTextSizeBottom));
        Text.fontColor(this.textColor);
        Text.pop();
        Flex.pop();
        Flex.pop();
    }
}
