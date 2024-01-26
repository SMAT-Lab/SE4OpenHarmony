interface BattleCity_Params {
    model?: SmartRefreshForGame.Model;
    welcomeIsStart?: boolean;
    gameIsStart?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BattleCity_" + ++__generate__Id;
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
import { AirplaneGameCover } from './BattleCityGameCover';
import { AirplaneGameBody } from './BattleCityGameBody';
export class BattleCity extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__welcomeIsStart = new ObservedPropertySimple(false, this, "welcomeIsStart");
        this.__gameIsStart = new ObservedPropertySimple(false, this, "gameIsStart");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BattleCity_Params) {
        if (params.welcomeIsStart !== undefined) {
            this.welcomeIsStart = params.welcomeIsStart;
        }
        if (params.gameIsStart !== undefined) {
            this.gameIsStart = params.gameIsStart;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__welcomeIsStart.aboutToBeDeleted();
        this.__gameIsStart.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForGame.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForGame.Model) {
        this.__model.set(newValue);
    }
    private __welcomeIsStart: ObservedPropertySimple<boolean>;
    get welcomeIsStart() {
        return this.__welcomeIsStart.get();
    }
    set welcomeIsStart(newValue: boolean) {
        this.__welcomeIsStart.set(newValue);
    }
    private __gameIsStart: ObservedPropertySimple<boolean>;
    get gameIsStart() {
        return this.__gameIsStart.get();
    }
    set gameIsStart(newValue: boolean) {
        this.__gameIsStart.set(newValue);
    }
    private changeState(state: any) {
        if (state == SmartRefreshForGame.REFRESHSTATE.TOREFRESH) { // 下拉中
        }
        else if (state == SmartRefreshForGame.REFRESHSTATE.REFRESHING) { // 刷新中
            if (!this.welcomeIsStart) {
                this.welcomeIsStart = true;
                setTimeout(() => {
                    this.gameIsStart = true;
                }, 500);
            }
        }
        else { // 停止状态
            this.welcomeIsStart = false;
            this.gameIsStart = false;
        }
        return '';
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height(this.model.initHeaderHeight);
        Text.create(this.model.downY + this.changeState(this.model.refreshState));
        Text.visibility(Visibility.None);
        Text.pop();
        If.create();
        if (this.gameIsStart) {
            If.branchId(0);
            let earlierCreatedChild_2: AirplaneGameBody = (this && this.findChildById) ? this.findChildById("2") as AirplaneGameBody : undefined;
            if (earlierCreatedChild_2 == undefined) {
                // 游戏主体界面
                View.create(new AirplaneGameBody("2", this, {
                    gameIsStart: this.gameIsStart,
                    downY: this.model.downY,
                    maxHeight: this.model.initHeaderHeight,
                    initBackgroundColor: this.model.backgroundColor,
                    isNotifyFinish: this.model.isNotifyFinish,
                    model: this.model
                }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    gameIsStart: this.gameIsStart,
                    downY: this.model.downY,
                    maxHeight: this.model.initHeaderHeight,
                    initBackgroundColor: this.model.backgroundColor,
                    isNotifyFinish: this.model.isNotifyFinish,
                    model: this.model
                });
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: AirplaneGameCover = (this && this.findChildById) ? this.findChildById("3") as AirplaneGameCover : undefined;
            if (earlierCreatedChild_3 == undefined) {
                // 游戏欢迎界面
                View.create(new AirplaneGameCover("3", this, {
                    gameState: this.welcomeIsStart,
                    maxHeight: this.model.initHeaderHeight,
                    downY: this.model.downY,
                    textColor: this.model.backgroundColor,
                    model: this.__model
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    gameState: this.welcomeIsStart,
                    maxHeight: this.model.initHeaderHeight,
                    downY: this.model.downY,
                    textColor: this.model.backgroundColor
                });
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Stack.pop();
    }
}
