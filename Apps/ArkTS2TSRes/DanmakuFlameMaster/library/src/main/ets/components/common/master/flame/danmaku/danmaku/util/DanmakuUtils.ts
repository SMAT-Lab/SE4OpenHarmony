let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuUtils_" + ++__generate__Id;
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
import { BaseDanmaku } from '../model/BaseDanmaku';
import { IDisplayer } from '../model/IDisplayer';
export class DanmakuUtils {
    /**
       * 检测两个弹幕是否会碰撞
       * 允许不同类型弹幕的碰撞
       * @param d1
       * @param d2
       * @return
       */
    public static willHitInDuration(disp: IDisplayer, d1: BaseDanmaku, d2: BaseDanmaku, duration: number, currTime: number): boolean {
        let type1: number = d1.getType();
        let type2: number = d2.getType();
        // allow hit if different type
        if (type1 != type2)
            return false;
        if (d1.isOutside()) {
            return false;
        }
        let dTime: number = d2.getActualTime() - d1.getActualTime();
        if (dTime <= 0)
            return true;
        if (Math.abs(dTime) >= duration || d1.isTimeOut() || d2.isTimeOut()) {
            return false;
        }
        if (type1 == BaseDanmaku.TYPE_FIX_TOP || type1 == BaseDanmaku.TYPE_FIX_BOTTOM) {
            return true;
        }
        return DanmakuUtils.checkHitAtTime(disp, d1, d2, currTime)
            || DanmakuUtils.checkHitAtTime(disp, d1, d2, d1.getActualTime() + d1.getDuration());
    }
    private static checkHitAtTime(disp: IDisplayer, d1: BaseDanmaku, d2: BaseDanmaku, time: number): boolean {
        let rectArr1: number[] = d1.getRectAtTime(disp, time);
        let rectArr2: number[] = d2.getRectAtTime(disp, time);
        if (rectArr1 == null || rectArr2 == null)
            return false;
        return DanmakuUtils.checkHit(d1.getType(), d2.getType(), rectArr1, rectArr2);
    }
    private static checkHit(type1: number, type2: number, rectArr1: number[], rectArr2: number[]): boolean {
        if (type1 != type2)
            return false;
        if (type1 == BaseDanmaku.TYPE_SCROLL_RL) {
            // hit if left2 < right1
            return rectArr2[0] < rectArr1[2];
        }
        if (type1 == BaseDanmaku.TYPE_SCROLL_LR) {
            // hit if right2 > left1
            return rectArr2[2] > rectArr1[0];
        }
        return false;
    }
    public static isDuplicate(obj1: BaseDanmaku, obj2: BaseDanmaku): boolean {
        if (obj1 == obj2) {
            return false;
        }
        if (obj1.text == obj2.text) {
            return true;
        }
        //if (obj1.text != null && obj1.text == obj2.text) {
        //  return true;
        //}
        return false;
    }
    public static compare(obj1: BaseDanmaku, obj2: BaseDanmaku): number {
        if (obj1 == obj2) {
            return 0;
        }
        if (obj1 == null) {
            return -1;
        }
        if (obj2 == null) {
            return 1;
        }
        let val: number = obj1.getTime() - obj2.getTime();
        if (val > 0) {
            return 1;
        }
        else if (val < 0) {
            return -1;
        }
        let r: number = obj1.index - obj2.index;
        if (r != 0) {
            return r < 0 ? -1 : 1;
        }
        r = obj1.hashCode() - obj1.hashCode();
        return r;
    }
    public static fillText(danmaku: BaseDanmaku, text: string): void {
        danmaku.text = text;
        if (text == null || text.length == 0 || !text.toString().includes(BaseDanmaku.DANMAKU_BR_CHAR)) {
            return;
        }
        let lines: string[] = danmaku.text.valueOf().split(BaseDanmaku.DANMAKU_BR_CHAR, -1);
        if (lines.length > 1) {
            danmaku.lines = lines;
        }
    }
}
