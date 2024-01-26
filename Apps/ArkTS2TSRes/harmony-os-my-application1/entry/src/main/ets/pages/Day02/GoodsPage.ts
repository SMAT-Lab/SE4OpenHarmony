interface GoodsPage_Params {
    tabController1?: TabsController;
    tabController2?: TabsController;
    swiperController?: SwiperController;
    scroller?: Scroller;
    goodsList?;
    channelList?;
    tabsList?;
    shoppingList?: Array<number>;
    tabsSelect?: number;
    account?: number;
    totalPrice?: number;
    orderList?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GoodsPage_" + ++__generate__Id;
}
import router from '@ohos.router';
export class GoodsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.tabController1 = new TabsController();
        this.tabController2 = new TabsController();
        this.swiperController = new SwiperController();
        this.scroller = new Scroller();
        this.goodsList = [
            { name: "Mate X3", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487294152/428_428_4F83A80967BB0E75D9643A408A76F0D6mp.png", price: 12999, url: "https://m.vmall.com/product/10086929863349.html?sbomCode=2601010424512&cid=150901&wi=01#2601010424512" },
            { name: "Mate Xs 2 ", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202209/gbom/6941487261352/142_142_058DF8465878ABAFC566B8F7C1DB8851mp_tds.png", price: 8999, url: "https://m.vmall.com/product/10086488402232.html?sbomCode=2601010359701&cid=150901&wi=01#2601010359701" },
            { name: "MatePad Pro 11", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202209/gbom/6941487276073/78_78_341312408F4F8E65C03684F3E0768416mp_tds.png", price: 2999, url: "https://m.vmall.com/product/10086304972824.html?sbomCode=2701010073510&cid=150901&wi=01#2701010073510" },
            { name: "MateBook X", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202305/gbom/6941487298976/78_78_793834E1893A86332F14D5CEB6CF6A91mp.png", price: 6499, url: "https://m.vmall.com/product/10086715572678.html?sbomCode=2801010083813&cid=150901&wi=01#2801010083813" },
            { name: "P60 Art", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/78_78_F6083CCDA64E43AF09DAD021C5F4595Dmp.png", price: 7988, url: "https://m.vmall.com/product/10086596403621.html?sbomCode=2601010425001&cid=150901&wi=01#2601010425001" },
            { name: "Watch 4 Pro", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202305/gbom/6941487291229/78_78_3730C8FC031F05869FD11C50BB89946Emp.png", price: 3349, url: "https://m.vmall.com/product/10086707901849.html?sbomCode=2901010090404&cid=150901&wi=01#2901010090404" },
            { name: "FreeBuds 5", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487277438/78_78_A2FF7BE670479674E440706C92AC76CDmp.png", price: 749, url: "https://m.vmall.com/product/10086073246881.html?sbomCode=3102050060201&cid=150901&wi=01#3102050060201" },
            { name: "Mate 50 RS", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202209/gbom/6941487276523/78_78_AC05C93CFCD993DCFDEA7499D93BBD4Bmp_tds.png", price: 12999, url: "https://m.vmall.com/product/10086190662664.html?sbomCode=2601010388303&cid=150901&wi=01#2601010388303" },
            { name: "MatePad Air", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202305/gbom/6941487298655/78_78_D72A5DE46770D55A3C514115F568EB43mp.png", price: 2799, url: "https://m.vmall.com/product/10086802977706.html?sbomCode=2701010087701&cid=150901&wi=01#2701010087701" },
            { name: "FreeBuds Pro 2", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202208/gbom/6941487256020/group//78_78_93F71C7DC617BFFD3A7FBD4537D1D089_tds.png", price: 999, url: "https://m.vmall.com/product/10086279196237.html?sbomCode=3102050052403&cid=150901&wi=01#3102050052403" },
            { name: "智慧屏 V65", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487217007/142_142_8BD0A5A1BEA7E2C90B92724240BFD351mp_tds2.png", price: 5299, url: "https://m.vmall.com/product/10086187358987.html?sbomCode=3301010014901&cid=150901&wi=01#3301010014901" },
            { name: "华为手环 8", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202305/gbom/6941487291557/group/142_142_2CA899C329BB2CE3A70D60A4D14D9DD9.png", price: 229, url: "https://m.vmall.com/product/10086994799056.html?sbomCode=2901020049802&cid=150901&wi=01#2901020049802" },
            { name: "Sound X NEW", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202209/gbom/6941487256846/142_142_C9FAC2DAEFB7D611E15AB7207842ACEDmp_tds.png", price: 1799, url: "https://m.vmall.com/product/10086187342516.html?sbomCode=3001080007003&cid=150901&wi=01#3001080007003" },
            { name: "MateBook E", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202305/gbom/6941487293766/group//78_78_B5EA7358228FB398C7980598AC928265.png", price: 7399, url: "https://m.vmall.com/product/10086930994386.html?sbomCode=2801010155801&cid=150901&wi=01#2801010155801" },
            { name: "空调", imageUrl: "https://res.vmallres.com/pimages//FssCdnProxy/vmall_bop_server/BopMaterialCenter/78_78_7A55ED7313317D576E66BDEB82031338.png", price: 3149, url: "https://m.vmall.com/product/10086766129238.html?sbomCode=3602010009401&cid=150901&wi=01#3602010009401" },
            { name: "冰箱", imageUrl: "https://res2.vmallres.com/pimages/FssCdnProxy/vmall_bop_server/BopMaterialCenter/142_142_1747B085F7CB329528508678B2D2F8DB.png", price: 3300, url: "https://m.vmall.com/product/10086048932637.html?sbomCode=3602020000206&cid=150901&wi=01#3602020000206" },
            { name: "AI音箱 2e", imageUrl: "https://res.vmallres.com/pimages//product/6941487238477/group//428_428_FA14CD9F3E6F2B5EADCC751AA936D60ADF5989F2A467F73B_tds.png", price: 149, url: "https://m.vmall.com/product/10086563310298.html?sbomCode=3001060005001&cid=150901&wi=01#3001060005001" },
            { name: "Pocket S", imageUrl: "https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/78_78_C6CB7EAD9AE111244B2F046EFBDCFA11mp_tds.png", price: 4988, url: "https://m.vmall.com/product/10086416259022.html?sbomCode=2601010409204&cid=150901&wi=01#2601010409204" },
            { name: "问界 M5", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202304/gbom/GB57010243/800_800_7FF08227487A44E1E160A6EC6F2AAA64mp.png", price: 259800, url: "https://m.vmall.com/portal/activity/index.html?pageId=401065592" },
            { name: "问界 M7", imageUrl: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202303/gbom/GB57021087/800_800_54C331725D7AF583BFF24C836EED0C81mp.png", price: 289800, url: "https://m.vmall.com/portal/activity/index.html?pageId=401065586" },
        ];
        this.channelList = [
            { name: "限时抢购", iconUrl: $r("app.media.miaosha"), includingGoods: this.createSales() },
            { name: "手机", iconUrl: $r("app.media.shouji"), includingGoods: [0, 1, 4, 7, 17] },
            { name: "平板电脑", iconUrl: $r("app.media.pingban"), includingGoods: [2, 8, 13] },
            { name: "笔记本", iconUrl: $r("app.media.bijibendiannao"), includingGoods: [3, 13] },
            { name: "智慧屏", iconUrl: $r("app.media.dianshi"), includingGoods: [10] },
            { name: "智能穿戴", iconUrl: $r("app.media.shoubiao"), includingGoods: [5, 11] },
            { name: "智能家居", iconUrl: $r("app.media.kongtiao"), includingGoods: [14, 15] },
            { name: "耳机", iconUrl: $r("app.media.erji"), includingGoods: [6, 9] },
            { name: "音箱", iconUrl: $r("app.media.yinxiang"), includingGoods: [12, 16] },
            { name: "AITO汽车", iconUrl: $r("app.media.qiche"), includingGoods: [18, 19] }
        ];
        this.tabsList = [
            { name: "首页", iconUrl: $r("app.media.home"), selectUrl: $r("app.media.home_selected") },
            { name: "分类", iconUrl: $r("app.media.classify"), selectUrl: $r("app.media.classify_selected") },
            { name: "购物车", iconUrl: $r("app.media.shopping_cat"), selectUrl: $r("app.media.shopping_cat_selected") },
            { name: "我的", iconUrl: $r("app.media.my"), selectUrl: $r("app.media.my_selected") },
        ];
        this.__shoppingList = new ObservedPropertyObject([], this, "shoppingList");
        this.__tabsSelect = new ObservedPropertySimple(0, this, "tabsSelect");
        this.__account = new ObservedPropertySimple(100000, this, "account");
        this.__totalPrice = new ObservedPropertySimple(0, this, "totalPrice");
        this.__orderList = new ObservedPropertyObject([], this, "orderList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GoodsPage_Params) {
        if (params.tabController1 !== undefined) {
            this.tabController1 = params.tabController1;
        }
        if (params.tabController2 !== undefined) {
            this.tabController2 = params.tabController2;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.goodsList !== undefined) {
            this.goodsList = params.goodsList;
        }
        if (params.channelList !== undefined) {
            this.channelList = params.channelList;
        }
        if (params.tabsList !== undefined) {
            this.tabsList = params.tabsList;
        }
        if (params.shoppingList !== undefined) {
            this.shoppingList = params.shoppingList;
        }
        if (params.tabsSelect !== undefined) {
            this.tabsSelect = params.tabsSelect;
        }
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.totalPrice !== undefined) {
            this.totalPrice = params.totalPrice;
        }
        if (params.orderList !== undefined) {
            this.orderList = params.orderList;
        }
    }
    aboutToBeDeleted() {
        this.__shoppingList.aboutToBeDeleted();
        this.__tabsSelect.aboutToBeDeleted();
        this.__account.aboutToBeDeleted();
        this.__totalPrice.aboutToBeDeleted();
        this.__orderList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private tabController1: TabsController;
    private tabController2: TabsController;
    private swiperController: SwiperController;
    private scroller: Scroller;
    private goodsList;
    private channelList;
    private tabsList;
    private __shoppingList: ObservedPropertyObject<Array<number>>;
    get shoppingList() {
        return this.__shoppingList.get();
    }
    set shoppingList(newValue: Array<number>) {
        this.__shoppingList.set(newValue);
    }
    private __tabsSelect: ObservedPropertySimple<number>;
    get tabsSelect() {
        return this.__tabsSelect.get();
    }
    set tabsSelect(newValue: number) {
        this.__tabsSelect.set(newValue);
    }
    private __account: ObservedPropertySimple<number>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: number) {
        this.__account.set(newValue);
    }
    private __totalPrice: ObservedPropertySimple<number>;
    get totalPrice() {
        return this.__totalPrice.get();
    }
    set totalPrice(newValue: number) {
        this.__totalPrice.set(newValue);
    }
    private __orderList: ObservedPropertyObject<Array<number>>;
    get orderList() {
        return this.__orderList.get();
    }
    set orderList(newValue: Array<number>) {
        this.__orderList.set(newValue);
    }
    render() {
        Column.create();
        Column.layoutWeight(1);
        this.content(this);
        this.bottomNavi(this);
        Column.pop();
    }
    content(parent = null) {
        Tabs.create({ controller: this.tabController1 });
        Tabs.height("92%");
        Tabs.barHeight(0);
        Tabs.onChange((index: number) => {
            this.tabsSelect = index;
        });
        TabContent.create();
        TabContent.tabBar("首页");
        Scroll.create(this.scroller);
        Column.create();
        Column.width("100%");
        Row.create();
        Row.height(240);
        Swiper.create(this.swiperController);
        Swiper.index(0);
        Swiper.autoPlay(true);
        Swiper.interval(3000);
        Swiper.indicator(true);
        Swiper.loop(true);
        Swiper.duration(1000);
        Swiper.itemSpace(0);
        Swiper.curve(Curve.Linear);
        Swiper.height("100%");
        Swiper.width("100%");
        Swiper.onChange((index: number) => {
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.channelList[0].includingGoods), (item, index) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center, alignContent: FlexAlign.SpaceBetween });
            Flex.height("100%");
            Flex.width("100%");
            Image.create(this.goodsList[item].imageUrl);
            Image.height(200);
            Image.width(200);
            Flex.pop();
        });
        ForEach.pop();
        Swiper.pop();
        Row.pop();
        Row.create();
        Row.height(140);
        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center, alignContent: FlexAlign.SpaceBetween });
        Flex.height("100%");
        Flex.width("100%");
        ForEach.create("3", this, ObservedObject.GetRawObject(this.channelList), (item, index) => {
            Column.create();
            Column.height("50%");
            Column.width("20%");
            Column.onClick(() => {
                console.info("点击了" + item.name);
                this.tabController1.changeIndex(1);
                this.tabsSelect = 1;
                this.tabController2.changeIndex(index);
            });
            Image.create(item.iconUrl);
            Image.height("70%");
            Text.create(item.name);
            Text.fontSize(12);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center, alignContent: FlexAlign.SpaceBetween });
        Flex.width("100%");
        ForEach.create("4", this, ObservedObject.GetRawObject(this.channelList[0].includingGoods), (item, index) => {
            Column.create();
            Column.width("50%");
            Column.padding(10);
            Column.create();
            Column.backgroundColor("#E6E6E6");
            Column.borderRadius(15);
            Image.create(this.goodsList[item].imageUrl);
            Image.onClick(() => {
                console.info("点击了" + this.goodsList[item].name);
                router.push({
                    url: "pages/Day02/WebPage",
                    params: {
                        url: this.goodsList[item].url
                    }
                });
            });
            Text.create(this.goodsList[item].name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Text.create("价格：￥" + this.goodsList[item].price);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Column.pop();
            Column.pop();
        });
        ForEach.pop();
        Flex.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("分类");
        Tabs.create({ controller: this.tabController2 });
        Tabs.vertical(true);
        Tabs.barWidth(90);
        ForEach.create("6", this, ObservedObject.GetRawObject(this.channelList), (item, index) => {
            TabContent.create();
            TabContent.tabBar(item.name);
            Flex.create({ direction: FlexDirection.Column });
            List.create();
            ForEach.create("5", this, ObservedObject.GetRawObject(item.includingGoods), (item1, index1) => {
                ListItem.create();
                Row.create();
                Image.create(this.goodsList[item1].imageUrl);
                Image.layoutWeight(3);
                Image.onClick(() => {
                    router.push({
                        url: "pages/Day02/WebPage",
                        params: {
                            url: this.goodsList[item1].url
                        }
                    });
                });
                Column.create();
                Column.layoutWeight(3);
                Column.onClick(() => {
                    router.push({
                        url: "pages/Day02/WebPage",
                        params: {
                            url: this.goodsList[item1].url
                        }
                    });
                });
                Text.create(this.goodsList[item1].name);
                Text.margin(10);
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Text.create("￥" + this.goodsList[item1].price);
                Text.margin(10);
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Column.pop();
                Button.createWithLabel("+");
                Button.layoutWeight(1);
                Button.fontSize(16);
                Button.onClick(() => {
                    this.addToShoppingList(item1);
                    AlertDialog.show({
                        title: '提示',
                        message: "已将" + this.goodsList[item1].name + "加入到购物车",
                        autoCancel: true,
                        alignment: DialogAlignment.Center,
                        confirm: {
                            value: '确认',
                            action: () => {
                            }
                        }
                    });
                });
                Button.pop();
                Row.pop();
                ListItem.pop();
            });
            ForEach.pop();
            List.pop();
            Flex.pop();
            TabContent.pop();
        });
        ForEach.pop();
        Tabs.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("购物车");
        Flex.create({ direction: FlexDirection.Column });
        List.create();
        List.layoutWeight(1);
        ForEach.create("7", this, ObservedObject.GetRawObject(this.shoppingList), (item, index) => {
            ListItem.create();
            Row.create();
            Image.create(this.goodsList[item].imageUrl);
            Image.layoutWeight(2);
            Column.create();
            Column.layoutWeight(2);
            Text.create(this.goodsList[item].name);
            Text.margin(10);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create("￥" + this.goodsList[item].price);
            Text.margin(10);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Column.pop();
            Button.createWithLabel("删除");
            Button.fontSize(16);
            Button.layoutWeight(1);
            Button.onClick(() => {
                AlertDialog.show({
                    title: '提示',
                    message: "确认将" + this.goodsList[item].name + "从购物车中移除？",
                    autoCancel: false,
                    alignment: DialogAlignment.Center,
                    primaryButton: {
                        value: '取消',
                        action: () => {
                        }
                    },
                    secondaryButton: {
                        value: '确认',
                        action: () => {
                            this.removeFromShoppingList(index);
                        }
                    },
                });
            });
            Button.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Row.create();
        Row.height(50);
        Text.create("总金额：￥" + this.totalPrice);
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(2);
        Text.pop();
        Column.create();
        Column.layoutWeight(1);
        Button.createWithLabel("支付");
        Button.fontSize(16);
        Button.onClick(() => {
            this.pay();
        });
        Button.pop();
        Column.pop();
        Row.pop();
        Flex.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("我的");
        Flex.create({ direction: FlexDirection.Column });
        Row.create();
        Row.height("15%");
        Text.create("账户余额：" + this.account + "元");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.width("100%");
        Text.pop();
        Row.pop();
        Row.create();
        Row.height("10%");
        Text.create("已购商品列表");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(25);
        Text.width("100%");
        Text.pop();
        Row.pop();
        List.create();
        List.layoutWeight(1);
        ForEach.create("8", this, ObservedObject.GetRawObject(this.orderList), (item, index) => {
            ListItem.create();
            Row.create();
            Image.create(this.goodsList[item].imageUrl);
            Image.layoutWeight(1);
            Column.create();
            Column.layoutWeight(1);
            Text.create(this.goodsList[item].name);
            Text.margin(10);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create("￥" + this.goodsList[item].price);
            Text.margin(10);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Column.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
        TabContent.pop();
        Tabs.pop();
    }
    bottomNavi(parent = null) {
        Row.create();
        Row.height("8%");
        ForEach.create("9", this, ObservedObject.GetRawObject(this.tabsList), (item, index) => {
            Column.create();
            Column.layoutWeight(1);
            Column.onClick(() => {
                this.tabController1.changeIndex(index);
                this.tabsSelect = index;
            });
            Image.create(this.tabsSelect == index ? item.selectUrl : item.iconUrl);
            Image.height(40);
            Image.width(40);
            Text.create(item.name);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
    }
    //限时抢购
    createSales() {
        var count = Math.floor(Math.random() * 2 + 3) * 2;
        let salesList: Array<number> = new Array();
        while (count > 0) {
            var num = Math.floor(Math.random() * this.goodsList.length);
            if (salesList.includes(num) == false) {
                salesList.push(num);
                count--;
            }
        }
        return salesList;
    }
    //购物车支付
    pay() {
        if (this.shoppingList.length > 0) {
            if (this.account >= this.totalPrice) {
                this.account -= this.totalPrice;
                this.totalPrice = 0;
                for (let i = 0; i < this.shoppingList.length; i++) {
                    this.orderList.push(this.shoppingList[i]);
                }
                this.shoppingList = new Array<number>();
                AlertDialog.show({
                    title: '提示',
                    message: "支付成功",
                    autoCancel: true,
                    alignment: DialogAlignment.Center,
                    confirm: {
                        value: '确认',
                        action: () => {
                        }
                    }
                });
            }
            else {
                AlertDialog.show({
                    title: '提示',
                    message: "您的账户余额不足",
                    autoCancel: true,
                    alignment: DialogAlignment.Center,
                    confirm: {
                        value: '确认',
                        action: () => {
                        }
                    }
                });
            }
        }
        else {
            AlertDialog.show({
                title: '提示',
                message: "暂无商品可支付，快去添加商品吧",
                autoCancel: true,
                alignment: DialogAlignment.Center,
                confirm: {
                    value: '确认',
                    action: () => {
                    }
                }
            });
        }
    }
    //添加到购物车
    addToShoppingList(index: number) {
        this.shoppingList.push(index);
        this.totalPrice += this.goodsList[index].price;
    }
    //从购物车中移除商品
    removeFromShoppingList(index: number) {
        this.totalPrice -= this.goodsList[this.shoppingList[index]].price;
        for (let i = index; i < this.shoppingList.length - 1; i++) {
            this.shoppingList[i] = this.shoppingList[i + 1];
        }
        this.shoppingList.pop();
    }
}
