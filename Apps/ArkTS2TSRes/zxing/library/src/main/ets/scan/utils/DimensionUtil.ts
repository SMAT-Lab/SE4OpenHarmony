let __generate__Id: number = 0;
function generateId(): string {
    return "DimensionUtil_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import display from '@ohos.display';
import { GlobalContext } from './GlobalContext';
let that = this;
const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 780;
export default class DimensionUtil {
    private static instance: DimensionUtil | null = null;
    private static globalContext = getContext(that) as common.Context;
    public static getInstance() {
        if (DimensionUtil.instance == null) {
            DimensionUtil.instance = new DimensionUtil();
        }
        return DimensionUtil.instance;
    }
    init() {
        let context = getContext(that) as common.Context;
        DimensionUtil.globalContext = context;
    }
    static adaptDimension(value: number): number {
        let deviceDisplay = GlobalContext.getContext().getObject("display") as display.Display;
        let widthScale = deviceDisplay.width / DESIGN_WIDTH;
        let virtualHeight = widthScale * DESIGN_HEIGHT;
        let designDim = Math.sqrt(DESIGN_WIDTH * DESIGN_WIDTH + DESIGN_HEIGHT * DESIGN_HEIGHT);
        let virtualDim = Math.sqrt(deviceDisplay.width * deviceDisplay.width + virtualHeight * virtualHeight);
        return virtualDim * value / designDim;
    }
    static getPx(value: Resource): number {
        let beforeVp = DimensionUtil.globalContext.resourceManager.getNumber(value.id);
        return DimensionUtil.adaptDimension(beforeVp);
    }
    static getVp(value: Resource): number {
        let beforeVp = DimensionUtil.globalContext.resourceManager.getNumber(value.id);
        return px2vp(DimensionUtil.adaptDimension(beforeVp));
    }
    static getFp(value: Resource): number {
        let beforeFp = DimensionUtil.globalContext.resourceManager.getNumber(value.id);
        return px2fp(DimensionUtil.adaptDimension(beforeFp));
    }
}
