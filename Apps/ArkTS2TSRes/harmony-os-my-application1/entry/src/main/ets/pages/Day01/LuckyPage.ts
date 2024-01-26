interface LuckyPage_Params {
    prizeIndex?: number;
    luckyCount?: number;
    //创建数组放置奖品
    data?;
    //lucky
    orderIndex?;
    order?;
    loopId?;
    stopCount?;
    //unlucky
    loopCount?;
    unLuckyOrder?;
    unLuckyIndex?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LuckyPage_" + ++__generate__Id;
}
export class LuckyPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__prizeIndex = new ObservedPropertySimple(-1, this, "prizeIndex");
        this.__luckyCount = new ObservedPropertySimple(3
        //创建数组放置奖品
        , this, "luckyCount");
        this.data = [
            { "name": "Mate X3", "imageUrl": "https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487294152/428_428_4F83A80967BB0E75D9643A408A76F0D6mp.png" },
            { "name": "未中奖", "imageUrl": "https://img.ixintu.com/download/jpg/20201117/b7aced354cece1255f1822bae687d99d_512_512.jpg!bg" },
            { "name": "MatePad Pro", "imageUrl": "https://res.vmallres.com/pimages//uomcdn/CN/pms/202209/gbom/6941487276073/78_78_341312408F4F8E65C03684F3E0768416mp_tds.png" },
            { "name": "未中奖", "imageUrl": "https://img.ixintu.com/download/jpg/20201117/b7aced354cece1255f1822bae687d99d_512_512.jpg!bg" },
            { "name": "", "imageUrl": "" },
            { "name": "未中奖", "imageUrl": "https://img.ixintu.com/download/jpg/20201117/b7aced354cece1255f1822bae687d99d_512_512.jpg!bg" },
            { "name": "Watch 4 Pro", "imageUrl": "https://res.vmallres.com/pimages//uomcdn/CN/pms/202305/gbom/6941487291229/78_78_3730C8FC031F05869FD11C50BB89946Emp.png" },
            { "name": "未中奖", "imageUrl": "https://img.ixintu.com/download/jpg/20201117/b7aced354cece1255f1822bae687d99d_512_512.jpg!bg" },
            { "name": "FreeBuds 5", "imageUrl": "https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487277438/78_78_A2FF7BE670479674E440706C92AC76CDmp.png" },
        ];
        this.orderIndex = -1;
        this.order = [0, 3, 6, 7, 8, 5, 2, 1];
        this.loopId = 0;
        this.stopCount = 0;
        this.loopCount = 0;
        this.unLuckyOrder = [1, 3, 5, 7];
        this.unLuckyIndex = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LuckyPage_Params) {
        if (params.prizeIndex !== undefined) {
            this.prizeIndex = params.prizeIndex;
        }
        if (params.luckyCount !== undefined) {
            this.luckyCount = params.luckyCount;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.orderIndex !== undefined) {
            this.orderIndex = params.orderIndex;
        }
        if (params.order !== undefined) {
            this.order = params.order;
        }
        if (params.loopId !== undefined) {
            this.loopId = params.loopId;
        }
        if (params.stopCount !== undefined) {
            this.stopCount = params.stopCount;
        }
        if (params.loopCount !== undefined) {
            this.loopCount = params.loopCount;
        }
        if (params.unLuckyOrder !== undefined) {
            this.unLuckyOrder = params.unLuckyOrder;
        }
        if (params.unLuckyIndex !== undefined) {
            this.unLuckyIndex = params.unLuckyIndex;
        }
    }
    aboutToBeDeleted() {
        this.__prizeIndex.aboutToBeDeleted();
        this.__luckyCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __prizeIndex: ObservedPropertySimple<number>;
    get prizeIndex() {
        return this.__prizeIndex.get();
    }
    set prizeIndex(newValue: number) {
        this.__prizeIndex.set(newValue);
    }
    private __luckyCount: ObservedPropertySimple<number>;
    get luckyCount() {
        return this.__luckyCount.get();
    }
    set luckyCount(newValue: number) {
        this.__luckyCount.set(newValue);
    }
    //创建数组放置奖品
    private data;
    //lucky
    private orderIndex;
    private order;
    private loopId;
    private stopCount;
    //unlucky
    private loopCount;
    private unLuckyOrder;
    private unLuckyIndex;
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.layoutWeight(1);
        Text.create("抽奖页面");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.width("100%");
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.margin({ bottom: 25 });
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center, alignContent: FlexAlign.SpaceBetween });
        Flex.height(450);
        Flex.width("100%");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.data), (item, index) => {
            If.create();
            if (index == 4) {
                If.branchId(0);
                Column.create();
                Column.width("30%");
                Button.createWithLabel("抽奖");
                Button.height(100);
                Button.width(100);
                Button.borderRadius(20);
                Button.fontSize(25);
                Button.onClick(() => {
                    console.info("开始抽奖");
                    if (this.luckyCount > 0) {
                        var type = Math.random();
                        console.info(type.toString());
                        if (Math.abs(type - 0.5) < 0.3) {
                            console.info("unlucky");
                            this.startUnLuckyGame();
                        }
                        else {
                            console.info("lucky");
                            this.startGame();
                        }
                        this.luckyCount--;
                    }
                });
                Button.pop();
                Column.pop();
            }
            else {
                If.branchId(1);
                Column.create();
                Column.width("30%");
                Column.backgroundColor(this.prizeIndex == index && this.orderIndex >= 0 ? Color.Pink : Color.White);
                Column.padding(10);
                Column.borderRadius(10);
                Image.create(item.imageUrl);
                Image.height(100);
                Image.width(100);
                Image.borderRadius(10);
                Image.margin({ bottom: 10 });
                Text.create(item.name);
                Text.fontSize(14);
                Text.pop();
                Column.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Flex.pop();
        Text.create("奖品：" + (this.prizeIndex >= 0 ? this.data[this.prizeIndex].name : "-"));
        Text.margin({ top: 50 });
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.backgroundColor(Color.Pink);
        Text.width("80%");
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.borderRadius(20);
        Text.pop();
        Text.create("还剩" + this.luckyCount.toString() + "次抽奖机会");
        Text.margin({ top: 10 });
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.width("100%");
        Text.height(40);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    startGame() {
        if (this.orderIndex > 0) {
            this.orderIndex = this.orderIndex % 8;
        }
        this.stopCount = Math.floor(Math.random() * (48 - 40) + 40);
        this.loopId = setInterval(() => {
            this.orderIndex++;
            this.prizeIndex = this.order[this.orderIndex % 8];
            if (this.orderIndex > this.stopCount) {
                clearInterval(this.loopId);
                this.loopId = null;
            }
        }, 100);
    }
    startUnLuckyGame() {
        if (this.orderIndex > 0) {
            this.orderIndex = this.orderIndex % 8;
        }
        this.loopCount = Math.floor(Math.random() * (6 - 5) + 5);
        this.unLuckyIndex = this.unLuckyOrder[Math.floor(Math.random() * 4)];
        this.loopId = setInterval(() => {
            this.orderIndex++;
            this.prizeIndex = this.order[this.orderIndex % 8];
            if (this.prizeIndex == 0) {
                this.loopCount--;
            }
            if (this.loopCount <= 0 && this.prizeIndex == this.unLuckyIndex) {
                clearInterval(this.loopId);
                this.loopId = null;
            }
        }, 100);
    }
}
