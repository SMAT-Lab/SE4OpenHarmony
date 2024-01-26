let __generate__Id: number = 0;
function generateId(): string {
    return "IDanmakus_" + ++__generate__Id;
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
import { DanmakuUtils } from '../util/DanmakuUtils';
import { BaseDanmaku } from '../model/BaseDanmaku';
import { Comparator } from '../../../../../compat/Comparator';
export const ST_BY_TIME: number = 0;
export const ST_BY_YPOS: number = 1;
export const ST_BY_YPOS_DESC: number = 2;
/**
     * this type is used to iterate/remove/insert elements, not support sub/subnew
     */
export const ST_BY_LIST: number = 4;
export interface IDanmakus {
    addItem(item: BaseDanmaku): boolean;
    removeItem(item: BaseDanmaku): boolean;
    subnew(startTime: number, endTime: number): IDanmakus;
    sub(startTime: number, endTime: number): IDanmakus;
    size(): number;
    clear(): void;
    first(): BaseDanmaku;
    last(): BaseDanmaku;
    contains(item: BaseDanmaku): boolean;
    isEmpty(): boolean;
    setSubItemsDuplicateMergingEnabled(enable: boolean): void;
    getCollection(): Array<BaseDanmaku>;
    forEachSync(consumer: Consumer<BaseDanmaku, any> | any): void;
    forEach(consumer: Consumer<BaseDanmaku, any>): void;
}
export abstract class Consumer<Progress, Result> {
    public static ACTION_CONTINUE: number = 0;
    public static ACTION_BREAK: number = 1;
    public static ACTION_REMOVE: number = 2;
    public static ACTION_REMOVE_AND_BREAK: number = 3;
    /**
             * Performs this operation on the given argument.
             *
             * @param t the input argument
             * @return next action of the loop
             *
             * @see #ACTION_CONTINUE
             * @see #ACTION_BREAK
             * @see #ACTION_REMOVE
             */
    public abstract accept(t: Progress): number;
    public before(): void {
    }
    public after(): void {
    }
    public result(): Result | null {
        return null;
    }
}
export abstract class DefaultConsumer<Progress> extends Consumer<Progress, void> {
}
export class BaseComparator implements Comparator<BaseDanmaku> {
    protected mDuplicateMergingEnable: boolean = true;
    constructor(duplicateMergingEnabled: boolean = true) {
        this.setDuplicateMergingEnabled(duplicateMergingEnabled);
    }
    public setDuplicateMergingEnabled(enable: boolean) {
        this.mDuplicateMergingEnable = enable;
    }
    public compare(obj1: BaseDanmaku, obj2: BaseDanmaku): number {
        if (this.mDuplicateMergingEnable && DanmakuUtils.isDuplicate(obj1, obj2)) {
            return 0;
        }
        return DanmakuUtils.compare(obj1, obj2);
    }
}
export class TimeComparator extends BaseComparator {
    constructor(duplicateMergingEnabled: boolean) {
        super(duplicateMergingEnabled);
    }
    public compare(obj1: BaseDanmaku, obj2: BaseDanmaku): number {
        return super.compare(obj1, obj2);
    }
}
export class YPosComparator extends BaseComparator {
    constructor(duplicateMergingEnabled: boolean) {
        super(duplicateMergingEnabled);
    }
    public compare(obj1: BaseDanmaku, obj2: BaseDanmaku): number {
        if (this.mDuplicateMergingEnable && DanmakuUtils.isDuplicate(obj1, obj2)) {
            return 0;
        }
        return Math.sign(obj1.getTop() - obj2.getTop());
    }
}
export class YPosDescComparator extends BaseComparator {
    constructor(duplicateMergingEnabled: boolean) {
        super(duplicateMergingEnabled);
    }
    public compare(obj1: BaseDanmaku, obj2: BaseDanmaku): number {
        if (this.mDuplicateMergingEnable && DanmakuUtils.isDuplicate(obj1, obj2)) {
            return 0;
        }
        return Math.sign(obj2.getTop() - obj1.getTop());
    }
}
