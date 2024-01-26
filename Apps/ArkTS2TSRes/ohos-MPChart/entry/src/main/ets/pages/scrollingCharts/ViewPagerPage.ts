interface ViewPager_Params {
    swiperController?: SwiperController;
    data?: MyDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewPagerPage_" + ++__generate__Id;
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
import fragmentSimplePieIndex from './viewPageItems/fragment_simple_pie_index';
import fragSimpleBarIndex from './viewPageItems/frag_simple_bar_index';
import fragSimpleLineCircleIndex from './viewPageItems/frag_simple_line_circle_index';
import fragSimpleLineIndex from './viewPageItems/frag_simple_line_index';
import fragSimpleScatterIndex from './viewPageItems/frag_simple_scatter_index';
class ViewPager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.data = new MyDataSource([]);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ViewPager_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    private data: MyDataSource;
    render() {
        Column.create({ space: 5 });
        Swiper.create(this.swiperController);
        Swiper.index(0);
        Swiper.indicator(false);
        Swiper.loop(false);
        Swiper.vertical(false);
        Swiper.itemSpace(0);
        Swiper.width('100%');
        Swiper.height('100%');
        Swiper.cachedCount(0);
        Swiper.onChange((index: number) => {
            console.info("index:" + index.toString());
        });
        LazyForEach.create("7", this, ObservedObject.GetRawObject(this.data), (item: string) => {
            this.isRenderingInProgress = true;
            Column.create();
            If.create();
            if ('0' == item) {
                If.branchId(0);
                let earlierCreatedChild_2: fragSimpleLineIndex = (this && this.findChildById) ? this.findChildById("2") as fragSimpleLineIndex : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new fragSimpleLineIndex("2", this, {}));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({});
                    View.create(earlierCreatedChild_2);
                }
            }
            else if ('1' == item) {
                If.branchId(1);
                let earlierCreatedChild_3: fragSimpleLineCircleIndex = (this && this.findChildById) ? this.findChildById("3") as fragSimpleLineCircleIndex : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new fragSimpleLineCircleIndex("3", this, {}));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({});
                    View.create(earlierCreatedChild_3);
                }
            }
            else if ('2' == item) {
                If.branchId(2);
                let earlierCreatedChild_4: fragSimpleBarIndex = (this && this.findChildById) ? this.findChildById("4") as fragSimpleBarIndex : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new fragSimpleBarIndex("4", this, {}));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({});
                    View.create(earlierCreatedChild_4);
                }
            }
            else if ('3' == item) {
                If.branchId(3);
                let earlierCreatedChild_5: fragSimpleScatterIndex = (this && this.findChildById) ? this.findChildById("5") as fragSimpleScatterIndex : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new fragSimpleScatterIndex("5", this, {}));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({});
                    View.create(earlierCreatedChild_5);
                }
            }
            else if ('4' == item) {
                If.branchId(4);
                let earlierCreatedChild_6: fragmentSimplePieIndex = (this && this.findChildById) ? this.findChildById("6") as fragmentSimplePieIndex : undefined;
                if (earlierCreatedChild_6 == undefined) {
                    View.create(new fragmentSimplePieIndex("6", this, {}));
                }
                else {
                    earlierCreatedChild_6.updateWithValueParams({});
                    View.create(earlierCreatedChild_6);
                }
            }
            If.pop();
            Column.pop();
            this.isRenderingInProgress = false;
        }, (item: string) => item);
        LazyForEach.pop();
        Swiper.pop();
        Column.pop();
    }
    public aboutToAppear(): void {
        let list: number[] = [];
        for (let i: number = 0; i < 5; i++) {
            list.push(i);
        }
        this.data = new MyDataSource(list);
    }
}
class MyDataSource implements IDataSource {
    private list: number[] = [];
    private listener: DataChangeListener | null = null;
    constructor(list: number[]) {
        this.list = list;
    }
    totalCount(): number {
        return this.list.length;
    }
    getData(index: number): number {
        return this.list[index];
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        this.listener = listener;
    }
    unregisterDataChangeListener() {
    }
}
loadDocument(new ViewPager("1", undefined, {}));
