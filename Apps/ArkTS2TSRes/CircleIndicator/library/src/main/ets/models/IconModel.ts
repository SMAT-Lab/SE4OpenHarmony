let __generate__Id: number = 0;
function generateId(): string {
    return "IconModel_" + ++__generate__Id;
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
import BaseModel from './BaseModel';
import { length2Vp } from '../utils/UiUtil';
import common from '@ohos.app.ability.common';
export class IconItem {
    normal: string | PixelMap | Resource = '';
    selected: string | PixelMap | Resource = '';
}
const DEFAULT_HEIGHT: Length = '70vp';
const DEFAULT_SIZE: Length = '40vp';
const DEFAULT_MARGIN: Length = '5vp';
export class IconModel extends BaseModel<IconModel> {
    private size: number = length2Vp(getContext(), DEFAULT_SIZE);
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    private margin: number = length2Vp(getContext(), DEFAULT_MARGIN);
    constructor(tabsController: TabsController | null) {
        super(tabsController);
    }
    public setSize(size: Length, context?: common.UIAbilityContext): IconModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.size = length2Vp(context, size);
        return this;
    }
    public getSize(): number {
        return this.size;
    }
    public setMargin(margin: Length, context?: common.UIAbilityContext): IconModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.margin = length2Vp(context, margin);
        return this;
    }
    public getMargin(): number {
        return this.margin;
    }
}
