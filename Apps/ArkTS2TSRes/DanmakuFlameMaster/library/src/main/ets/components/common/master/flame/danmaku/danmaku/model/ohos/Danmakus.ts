let __generate__Id: number = 0;
function generateId(): string {
    return "Danmakus_" + ++__generate__Id;
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
import { BaseDanmaku } from '../BaseDanmaku';
import { Danmaku } from '../Danmaku';
import { IDanmakus, Consumer, DefaultConsumer, BaseComparator, TimeComparator, YPosComparator, YPosDescComparator, ST_BY_TIME, ST_BY_YPOS, ST_BY_YPOS_DESC, ST_BY_LIST } from '../IDanmakus';
import { SortedSet } from '../../../../../../compat/SortedSet';
class Args {
    items?: Array<BaseDanmaku>;
    sortType?: number;
    duplicateMergingEnabled?: boolean;
    baseComparator?: BaseComparator | null;
}
export class Danmakus implements IDanmakus {
    public items: BaseDanmaku[] | any = null;
    private subItems: Danmakus | any;
    private startItem: BaseDanmaku | any;
    ;
    private endItem: BaseDanmaku | any;
    private endSubItem: BaseDanmaku | any;
    ;
    private startSubItem: BaseDanmaku | any;
    ;
    private mSize: number = 0;
    private mSortType: number = ST_BY_TIME;
    private mComparator: BaseComparator | any = null;
    public mDuplicateMergingEnabled: boolean = true;
    constructor(args: Args) {
        if (args.items !== undefined) {
            this.setItems(args.items);
        }
        else {
            if (args.sortType === undefined) {
                args.sortType = ST_BY_TIME;
            }
            if (args.duplicateMergingEnabled == undefined) {
                args.duplicateMergingEnabled = false;
            }
            if (args.baseComparator === undefined) {
                args.baseComparator = null;
            }
            let comparator: BaseComparator | null = null;
            if (args.sortType == ST_BY_TIME) {
                comparator = args.baseComparator == null ? new TimeComparator(args.duplicateMergingEnabled) : args.baseComparator;
            }
            else if (args.sortType == ST_BY_YPOS) {
                comparator = new YPosComparator(args.duplicateMergingEnabled);
            }
            else if (args.sortType == ST_BY_YPOS_DESC) {
                comparator = new YPosDescComparator(args.duplicateMergingEnabled);
            }
            if (args.sortType == ST_BY_LIST) {
                this.items = new Array();
            }
            else {
                this.mDuplicateMergingEnabled = args.duplicateMergingEnabled;
                if (comparator != null) {
                    comparator.setDuplicateMergingEnabled(args.duplicateMergingEnabled);
                    this.items = new SortedSet(comparator);
                    this.mComparator = comparator;
                }
            }
            this.mSortType = args.sortType;
            this.mSize = 0;
        }
    }
    public setItems(items: Array<BaseDanmaku>) {
        if (this.mDuplicateMergingEnabled && this.mSortType != ST_BY_LIST) {
            this.items.splice(0, this.items.length);
            this.items.push.apply(this.items, items);
            items = this.items;
        }
        else {
            this.items = items;
        }
        if (items instanceof List) {
            this.mSortType = ST_BY_LIST;
        }
        this.mSize = (items == null ? 0 : items.length);
    }
    public addItem(item: BaseDanmaku): boolean {
        if (this.items != null) {
            try {
                if (this.items.push(item) > 0) {
                    this.mSize++;
                    return true;
                }
            }
            catch (e) {
                console.info(e);
            }
        }
        return false;
    }
    public removeItem(item: BaseDanmaku): boolean {
        if (item == null) {
            return false;
        }
        if (item.isOutside()) {
            item.setVisibility(false);
        }
        if (this.items.indexOf(item) >= 0) {
            this.items.splice(this.items.indexOf(item), 1);
            this.mSize--;
            return true;
        }
        return false;
    }
    private subset(startTime: number, endTime: number): Array<BaseDanmaku> | any {
        if (this.mSortType == ST_BY_LIST || this.items == null || this.items.length == 0) {
            return null;
        }
        if (this.subItems == null) {
            this.subItems = new Danmakus({ duplicateMergingEnabled: this.mDuplicateMergingEnabled });
            //      this.subItems.mLockObject = this.mLockObject;
        }
        if (this.startSubItem == null) {
            this.startSubItem = this.createItem("start");
        }
        if (this.endSubItem == null) {
            this.endSubItem = this.createItem("end");
        }
        this.startSubItem.setTime(startTime);
        this.endSubItem.setTime(endTime);
        return (this.items as SortedSet<BaseDanmaku>).subSet(this.startSubItem, this.endSubItem);
    }
    public subnew(startTime: number, endTime: number): IDanmakus | any {
        let subset: Array<BaseDanmaku> = this.subset(startTime, endTime);
        if (subset == null || subset.length === 0) {
            return null;
        }
        let newSet: BaseDanmaku[] = Array.from(subset);
        return new Danmakus({ items: newSet });
    }
    public sub(startTime: number, endTime: number): IDanmakus | any {
        if (this.items == null || this.items.length == 0) {
            return null;
        }
        if (this.subItems == null) {
            if (this.mSortType == ST_BY_LIST) {
                let subItems = new Danmakus({ sortType: ST_BY_LIST });
                //        subItems.mLockObject = this.mLockObject;
                subItems.setItems(this.items);
            }
            else {
                this.subItems = new Danmakus({ duplicateMergingEnabled: this.mDuplicateMergingEnabled });
                //        this.subItems.mLockObject = this.mLockObject;
            }
        }
        if (this.mSortType == ST_BY_LIST) {
            return this.subItems;
        }
        if (this.startItem == null) {
            this.startItem = this.createItem("start");
        }
        if (this.endItem == null) {
            this.endItem = this.createItem("end");
        }
        if (this.subItems != null) {
            let dtime: number = startTime - this.startItem.getActualTime();
            if (dtime >= 0 && endTime <= this.endItem.getActualTime()) {
                return this.subItems;
            }
        }
        this.startItem.setTime(startTime);
        this.endItem.setTime(endTime);
        this.subItems.setItems((this.items as SortedSet<BaseDanmaku>).subSet(this.startItem, this.endItem));
        return this.subItems;
    }
    private createItem(text: string): BaseDanmaku {
        return new Danmaku(text);
    }
    public size(): number {
        return this.mSize;
    }
    public clear() {
        if (this.items != null) {
            this.items.splice(0, this.items.length);
            this.mSize = 0;
        }
        if (this.subItems != null) {
            this.subItems = null;
            this.startItem = this.createItem("start");
            this.endItem = this.createItem("end");
        }
    }
    public first(): BaseDanmaku | any {
        if (this.items != null && !(this.items.length == 0)) {
            return this.items[0];
        }
        return null;
    }
    public last(): BaseDanmaku | any {
        if (this.items != null && !(this.items.length == 0)) {
            return this.items[this.items.length - 1];
        }
        return null;
    }
    public contains(item: BaseDanmaku): boolean {
        return this.items != null && (this.items.indexOf(item) >= 0);
    }
    public isEmpty(): boolean {
        return this.items == null || this.items.length == 0;
    }
    private setDuplicateMergingEnabled(enable: boolean) {
        this.mComparator.setDuplicateMergingEnabled(enable);
        this.mDuplicateMergingEnabled = enable;
    }
    public setSubItemsDuplicateMergingEnabled(enable: boolean) {
        this.mDuplicateMergingEnabled = enable;
        this.startItem = this.endItem = null;
        if (this.subItems == null) {
            this.subItems = new Danmakus({ duplicateMergingEnabled: enable });
            //      this.subItems.mLockObject = this.mLockObject;
        }
        this.subItems.setDuplicateMergingEnabled(enable);
    }
    public getCollection(): Array<BaseDanmaku> {
        return this.items;
    }
    public forEachSync(consumer: Consumer<BaseDanmaku, any>): void {
        this.forEach(consumer);
    }
    public forEach(consumer: Consumer<BaseDanmaku, any>): void {
        consumer.before();
        for (let i = 0; i < this.items.length; i++) {
            let next: BaseDanmaku = this.items[i];
            if (next == null) {
                continue;
            }
            let action: number = consumer.accept(next);
            if (action == DefaultConsumer.ACTION_BREAK) {
                break;
            }
            else if (action == Consumer.ACTION_REMOVE) {
                this.items.splice(i, 1);
                this.mSize--;
                i--;
            }
            else if (action == DefaultConsumer.ACTION_REMOVE_AND_BREAK) {
                this.items.splice(i, 1);
                this.mSize--;
                break;
            }
        }
        consumer.after();
    }
}
