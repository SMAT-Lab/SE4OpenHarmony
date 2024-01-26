let __generate__Id: number = 0;
function generateId(): string {
    return "UiUtil_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
/**
 * 估算Text组件高度
 * @param fontSize fontSize大小，number类型对应单位vp
 * 返回未设置padding的,FontWeight为Normal或Bolder的 text组件大小，单位vp
 */
export function evaluateTextHeight(fontSize: number): number {
    if (fontSize === undefined || fontSize < 0) {
        return 0;
    }
    if (fontSize == 0) {
        return 1 / 3;
    }
    let modBy13: number = (fontSize - 1) % 13;
    let divBy13: number = Math.floor((fontSize - 1) / 13);
    let threeTimesOfResult: number = 4 * fontSize;
    // 最终结果vp值的三倍,将除以3的操作统一放最后,以减少过程中多次除法操作产生的浮点数精度问题
    threeTimesOfResult += divBy13 * 3;
    if (modBy13 >= 10) {
        threeTimesOfResult += 3;
    }
    else if (modBy13 >= 6) {
        threeTimesOfResult += 2;
    }
    else if (modBy13 >= 2) {
        threeTimesOfResult += 1;
    }
    return threeTimesOfResult / 3;
}
export function length2Vp(context: common.UIAbilityContext | Object, length: Length): number {
    if (typeof length == 'string') {
        let reg: RegExp = new RegExp('0|1|2|3|4|5|6|7|8|9');
        if (!length || !length.charAt(0)
            .match(reg) || (!length.endsWith('vp') && !length.endsWith('px') && !length.endsWith('fp') && !length.charAt(length.length - 1)
            .match(reg))) {
            throw new Error('illegal argument, length string only support vp/px/fp or no unit');
        }
        if (length.endsWith('vp')) {
            return Number.parseFloat(length.substring(0, length.length - 2));
        }
        if (length.endsWith('px')) {
            return px2vp(Number.parseFloat(length.substring(0, length.length - 2)));
        }
        if (length.endsWith('fp')) {
            return px2vp(fp2px(Number.parseFloat(length.substring(0, length.length - 2))));
        }
        else {
            return Number.parseFloat(length);
        }
    }
    else if (typeof length == 'number') {
        return length;
    }
    else {
        let resource: Resource = length as Resource;
        if (context && (context as common.UIAbilityContext).resourceManager && resource) {
            return (context as common.UIAbilityContext).createModuleContext(resource.moduleName).resourceManager.getNumber(resource.id);
        }
        return 0;
    }
}
