interface SolidBaseIcon_Params {
    solidBaseIcon?: string[];
    data?: MyDataSource;
}
interface LineFrameIcon_Params {
    lineFrameIcon?: string[];
    data?: MyDataSource;
}
interface BasicIcon_Params {
    basicIcon?: string[];
}
interface TestIcon_Params {
    controller?: TabsController;
    tabLabels?: string[];
    animated?: boolean;
    tabPageWidth?: number | string;
    currentIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestIcon_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Icon } from "easyui";
class TestIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.tabLabels = ["基础图标", "线框风格", "实底风格"] //标签页
        ;
        this.animated = true //是否开启切换动画s
        ;
        this.tabPageWidth = 80;
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestIcon_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.tabLabels !== undefined) {
            this.tabLabels = params.tabLabels;
        }
        if (params.animated !== undefined) {
            this.animated = params.animated;
        }
        if (params.tabPageWidth !== undefined) {
            this.tabPageWidth = params.tabPageWidth;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TabsController;
    private tabLabels: string[]; //标签页
    private animated: boolean; //是否开启切换动画s
    private tabPageWidth: number | string;
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    TabBuilder(index: number, name: string, parent = null) {
        Column.create();
        Column.width(this.tabPageWidth);
        Text.create(name);
        Text.fontColor(this.currentIndex === index ? '#ff000000' : '#ff5d5d5d');
        Text.fontWeight(this.currentIndex === index ? 500 : 400);
        Text.lineHeight(22);
        Text.margin({ top: 17, bottom: 7 });
        Text.pop();
        Divider.create();
        Context.animation({
            duration: 200
        });
        Divider.strokeWidth(2);
        Divider.color('#ff005eff');
        Divider.width("100%");
        Divider.opacity(this.currentIndex === index ? 1 : 0);
        Context.animation(null);
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
        Tabs.scrollable(this.animated);
        Tabs.vertical(false);
        Tabs.barWidth("100%");
        Tabs.animationDuration(this.animated ? 300 : 0);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width("100%");
        Tabs.margin({ top: 0 });
        Tabs.backgroundColor('#ffffffff');
        ForEach.create("5", this, ObservedObject.GetRawObject(this.tabLabels), (item, index) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, index, item);
                } });
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#ffd4d4d4');
            If.create();
            if (index == 0) {
                If.branchId(0);
                let earlierCreatedChild_2: BasicIcon = (this && this.findChildById) ? this.findChildById("2") as BasicIcon : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new BasicIcon("2", this, {}));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({});
                    if (!earlierCreatedChild_2.needsUpdate()) {
                        earlierCreatedChild_2.markStatic();
                    }
                    View.create(earlierCreatedChild_2);
                }
            }
            else if (index == 1) {
                If.branchId(1);
                let earlierCreatedChild_3: LineFrameIcon = (this && this.findChildById) ? this.findChildById("3") as LineFrameIcon : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new LineFrameIcon("3", this, {}));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({});
                    if (!earlierCreatedChild_3.needsUpdate()) {
                        earlierCreatedChild_3.markStatic();
                    }
                    View.create(earlierCreatedChild_3);
                }
            }
            else if (index == 2) {
                If.branchId(2);
                let earlierCreatedChild_4: SolidBaseIcon = (this && this.findChildById) ? this.findChildById("4") as SolidBaseIcon : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new SolidBaseIcon("4", this, {}));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({});
                    if (!earlierCreatedChild_4.needsUpdate()) {
                        earlierCreatedChild_4.markStatic();
                    }
                    View.create(earlierCreatedChild_4);
                }
            }
            If.pop();
            Column.pop();
            TabContent.pop();
        });
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
}
class BasicIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.basicIcon = ["success.png", "plus.png", "cross.png", "fail.png", "arrow-right.png", "arrow-left.png", "arrow-up.png", "arrow-down.png"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BasicIcon_Params) {
        if (params.basicIcon !== undefined) {
            this.basicIcon = params.basicIcon;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private basicIcon: string[];
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Column.width("90%");
        Column.height("25%");
        Column.margin({ top: 20 });
        Grid.create();
        Grid.columnsTemplate("1fr 1fr 1fr 1fr");
        ForEach.create("6", this, ObservedObject.GetRawObject(this.basicIcon), (item: string) => {
            GridItem.create();
            GridItem.margin({ bottom: 10, top: 10 });
            GridItem.pop();
        }, item => item);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
class LineFrameIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.lineFrameIcon = ["location-o.png", "like-o.png", "star-o.png", "phone-o.png", "setting-o.png", "fire-o.png", "coupon-o.png", "cart-o.png",
            "shopping-cart-o.png", "cart-circle-o.png", "friends-o.png", "comment-o.png", "gem-o.png", "gift-o.png", "point-gift-o.png", "send-gift-o.png",
            "service-o.png", "bag-o.png", "todo-list-o.png", "balance-list-o.png", "medel-o.png", "close.png", "clock-o.png", "question-o.png",
            "passed.png", "add-o.png", "gold-coin-o.png", "info-o.png", "manager-o.png", "label-o.png", "hot-o.png", "hot-sale-o.png",
            "new-o.png", "new-arrival-o.png", "goods-collect-o.png", "eye-o.png", "browsing-history-o.png", "bookmark-o.png", "bill-o.png", "video-o.png",
            "shop-o.png", "shop-collect-o.png", "chat-o.png", "smile-comment-o.png", "vip-card-o.png", "award-o.png", "diamond-o.png", "volume-o.png",
            "cluster-o.png", "underway-o.png", "photo-o.png", "gift-card-o.png", "more-o.png", "expand-o.png", "play-circle-o.png", "pause-circle-o.png",
            "stop-circle-o.png", "warning-o.png", "phone-circle-o.png", "smile-o.png", "music-o.png", "balance-o.png", "refund-o.png", "birthday-cake-o.png",
            "user-o.png", "thumb-circle-o.png", "orders-o.png", "tv-o.png", "envelop-o.png", "flag-o.png", "flower-o.png", "filter-o.png",
            "bar-chart-o.png", "chart-trending-o.png", "comment-circle-o.png", "brush-o.png", "bullhorn-o.png", "hotel-o.png", "cashier-o.png", "newspaper-o.png",
            "warn-o.png", "notes-o.png", "calender-o.png", "bulb-o.png", "user-circle-o.png", "desktop-o.png", "apps-o.png", "home-o.png",
            "share.png", "search.png", "points.png", "edit.png", "delete.png", "qr.png", "qr-invalid.png", "closed-eye.png",
            "wap-home.png", "scan.png", "free-postage.png", "certificate.png", "logistics.png", "contact.png", "cash-back-record.png", "after-sale.png",
            "exchange.png", "upgrade.png", "ellipsis.png", "circle.png", "description.png", "records.png", "sign.png", "completed.png",
            "failure.png", "ecard-pay.png", "peer-pay.png", "balance-pay.png", "credit-pay.png", "debit-pay.png", "cash-on-deliver.png", "other-pay.png",
            "tosend.png", "pending-payment.png", "paid.png", "aim.png", "discount.png", "idcard.png", "replay.png", "shrink.png"];
        this.data = new MyDataSource();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LineFrameIcon_Params) {
        if (params.lineFrameIcon !== undefined) {
            this.lineFrameIcon = params.lineFrameIcon;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private lineFrameIcon: string[];
    private data: MyDataSource;
    aboutToAppear() {
        this.data.setDataArray(this.lineFrameIcon);
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Column.width("90%");
        Column.margin({ top: 20 });
        Grid.create();
        Grid.columnsTemplate("1fr 1fr 1fr 1fr");
        LazyForEach.create("7", this, ObservedObject.GetRawObject(this.data), (item: string) => {
            this.isRenderingInProgress = true;
            GridItem.create();
            GridItem.margin({ bottom: 10, top: 10 });
            GridItem.pop();
            this.isRenderingInProgress = false;
        }, item => item);
        LazyForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
class SolidBaseIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.solidBaseIcon = ["location.png", "like.png", "star.png", "phone.png", "setting.png", "fire.png", "coupon.png", "cart.png",
            "shopping-cart.png", "cart-circle.png", "friends.png", "comment.png", "gem.png", "gift.png", "point-gift.png", "send-gift.png",
            "service.png", "bag.png", "todo-list.png", "balance-list.png", "medel.png", "clear.png", "clock.png", "question.png",
            "checked.png", "add.png", "gold-coin.png", "info.png", "manager.png", "label.png", "hot.png", "hot-sale.png",
            "new.png", "new-arrival.png", "goods-collect.png", "eye.png", "browsing-history.png", "bookmark.png", "bill.png", "video.png",
            "shop.png", "shop-collect.png", "chat.png", "smile-comment.png", "vip-card.png", "award.png", "diamond.png", "volume.png",
            "cluster.png", "underway.png", "photo.png", "gift-card.png", "more.png", "expand.png", "play-circle.png", "pause-circle.png",
            "stop-circle.png", "alipay.png", "wechat.png", "photograph.png", "youzan-shield.png", "umbrella-circle.png", "bell.png", "printer.png",
            "map-marked.png", "card.png", "add-square.png", "live.png", "lock.png", "audio.png", "graphic.png", "column.png",
            "invition.png", "play.png", "pause.png", "stop.png", "weapp-nav.png", "ascending.png", "descending.png", "bars.png",
            "wap-nav.png"];
        this.data = new MyDataSource();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SolidBaseIcon_Params) {
        if (params.solidBaseIcon !== undefined) {
            this.solidBaseIcon = params.solidBaseIcon;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private solidBaseIcon: string[];
    private data: MyDataSource;
    aboutToAppear() {
        this.data.setDataArray(this.solidBaseIcon);
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Column.width("90%");
        Column.margin({ top: 20 });
        Grid.create();
        Grid.columnsTemplate("1fr 1fr 1fr 1fr");
        ForEach.create("8", this, ObservedObject.GetRawObject(this.solidBaseIcon), (item: string) => {
            GridItem.create();
            GridItem.margin({ bottom: 10, top: 10 });
            GridItem.pop();
        }, item => item);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
// Basic implementation of IDataSource to handle data listener
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    public totalCount(): number {
        return 0;
    }
    public getData(index: number): any {
        return undefined;
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        if (this.listeners.indexOf(listener) < 0) {
            console.info('add listener');
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener): void {
        const pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            console.info('remove listener');
            this.listeners.splice(pos, 1);
        }
    }
    notifyDataReload(): void {
        this.listeners.forEach(listener => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
    }
    notifyDataMove(from: number, to: number): void {
        this.listeners.forEach(listener => {
            listener.onDataMove(from, to);
        });
    }
}
class MyDataSource extends BasicDataSource {
    private dataArray: string[] = ["success.png", "plus.png", "cross.png", "fail.png", "arrow-right.png", "arrow-left.png", "arrow-up.png", "arrow-down.png"];
    public setDataArray(data) {
        this.dataArray = data;
    }
    public totalCount(): number {
        return this.dataArray.length;
    }
    public getData(index: number): any {
        return this.dataArray[index];
    }
    public addData(index: number, data: string): void {
        this.dataArray.splice(index, 0, data);
        this.notifyDataAdd(index);
    }
    public pushData(data: string): void {
        this.dataArray.push(data);
        this.notifyDataAdd(this.dataArray.length - 1);
    }
}
loadDocument(new TestIcon("1", undefined, {}));
