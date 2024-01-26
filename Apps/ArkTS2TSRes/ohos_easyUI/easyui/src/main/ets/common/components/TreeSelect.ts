interface TreeSelect_Params {
    selectedProvinceNumber?: number;
    selectedCitiesNumber?: number;
    result?: string;
    data?;
    provinces?: string[];
    cities?: string[];
    disable?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TreeSelect_" + ++__generate__Id;
}
export class TreeSelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedProvinceNumber = new ObservedPropertySimple(-1, this, "selectedProvinceNumber");
        this.__selectedCitiesNumber = new ObservedPropertySimple(0, this, "selectedCitiesNumber");
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.data = [{
                "label": "北京",
                "children": [{
                        "label": "北京"
                    }]
            }];
        this.provinces = [];
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.disable = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TreeSelect_Params) {
        if (params.selectedProvinceNumber !== undefined) {
            this.selectedProvinceNumber = params.selectedProvinceNumber;
        }
        if (params.selectedCitiesNumber !== undefined) {
            this.selectedCitiesNumber = params.selectedCitiesNumber;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.disable !== undefined) {
            this.disable = params.disable;
        }
    }
    aboutToBeDeleted() {
        this.__selectedProvinceNumber.aboutToBeDeleted();
        this.__selectedCitiesNumber.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedProvinceNumber: ObservedPropertySimple<number>;
    get selectedProvinceNumber() {
        return this.__selectedProvinceNumber.get();
    }
    set selectedProvinceNumber(newValue: number) {
        this.__selectedProvinceNumber.set(newValue);
    }
    private __selectedCitiesNumber: ObservedPropertySimple<number>;
    get selectedCitiesNumber() {
        return this.__selectedCitiesNumber.get();
    }
    set selectedCitiesNumber(newValue: number) {
        this.__selectedCitiesNumber.set(newValue);
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private data;
    private provinces: string[];
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private disable: string[];
    showAllCities(): string[] {
        this.selectedCitiesNumber = 0;
        let result: string[] = [];
        this.data.forEach(element => {
            element.children.forEach(city => {
                result.push(city.label);
            });
        });
        return result;
    }
    showAllProvinces(): string[] {
        let result: string[] = [];
        this.data.forEach(element => {
            if (element.label) {
                result.push(element.label);
            }
        });
        return result;
    }
    //查询相应省份的城市
    showAllCitiesForProvince(province: string): string[] {
        this.selectedCitiesNumber = 0;
        let result: string[] = [];
        this.data.forEach(element => {
            if (element.label == province) {
                element.children.forEach(city => {
                    result.push(city.label);
                });
            }
        });
        return result;
    }
    aboutToAppear() {
        this.provinces = this.showAllProvinces();
        this.cities = this.showAllCities();
    }
    render() {
        Row.create();
        Row.width("95%");
        Row.shadow({
            radius: 10,
            color: "#ff000000",
            offsetX: 5,
            offsetY: 5
        });
        Row.margin(10);
        //左边的省份
        Column.create();
        //左边的省份
        Column.alignSelf(ItemAlign.Start);
        //左边的省份
        Column.layoutWeight(5);
        //左边的省份
        Column.backgroundColor("#ffdbdbdb");
        //左边的省份
        Column.height("30%");
        If.create();
        if (this.selectedProvinceNumber == -1) {
            If.branchId(0);
            Row.create();
            Row.layoutWeight(1);
            Flex.create();
            Flex.layoutWeight(1);
            Flex.backgroundColor("#ffffffff");
            Text.create();
            Text.height(40);
            Text.width(3);
            Text.backgroundColor("#aaff0000");
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            Flex.pop();
            Flex.create();
            Flex.backgroundColor("#ffffffff");
            Flex.layoutWeight(5);
            Text.create("所有城市");
            Text.fontWeight(FontWeight.Bold);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 0, top: 10, bottom: 10 });
            Text.pop();
            Flex.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.layoutWeight(1);
            Row.onClick(() => {
                this.selectedProvinceNumber = -1;
                this.cities = this.showAllCities();
            });
            Flex.create();
            Flex.layoutWeight(1);
            Text.create();
            Text.height(40);
            Text.width(3);
            Text.backgroundColor("#ffdbdbdb");
            Text.alignSelf(ItemAlign.Start);
            Text.pop();
            Flex.pop();
            Flex.create();
            Flex.layoutWeight(5);
            Text.create("所有城市");
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 0, top: 10, bottom: 10 });
            Text.pop();
            Flex.pop();
            Row.pop();
        }
        If.pop();
        Scroll.create();
        Scroll.scrollBar(BarState.Auto);
        Scroll.layoutWeight(5);
        Scroll.align(Alignment.TopStart);
        Column.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.provinces), (item, index) => {
            If.create();
            if (this.selectedProvinceNumber == index) {
                If.branchId(0);
                Row.create();
                Flex.create();
                Flex.layoutWeight(1);
                Flex.backgroundColor("#ffffffff");
                Text.create();
                Text.height(40);
                Text.width(3);
                Text.backgroundColor("#aaff0000");
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Flex.pop();
                Flex.create();
                Flex.backgroundColor("#ffffffff");
                Flex.layoutWeight(5);
                Text.create(item + "");
                Text.fontWeight(FontWeight.Bold);
                Text.alignSelf(ItemAlign.Start);
                Text.margin({ left: 0, top: 10, bottom: 10 });
                Text.pop();
                Flex.pop();
                Row.pop();
            }
            else {
                If.branchId(1);
                Row.create();
                Row.hitTestBehavior(this.disable.includes(item) ? HitTestMode.None : HitTestMode.Default);
                Row.onClick(() => {
                    this.selectedProvinceNumber = index;
                    //查询相应省份的城市
                    this.cities = this.showAllCitiesForProvince(this.provinces[index]);
                });
                Flex.create();
                Flex.layoutWeight(1);
                Text.create();
                Text.height(40);
                Text.width(3);
                Text.backgroundColor("#ffdbdbdb");
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Flex.pop();
                Flex.create();
                Flex.layoutWeight(5);
                Text.create(item + "");
                Text.fontColor(this.disable.includes(item) ? "#ffa0a0a0" : Color.Black);
                Text.alignSelf(ItemAlign.Start);
                Text.margin({ left: 0, top: 10, bottom: 10 });
                Text.pop();
                Flex.pop();
                Row.pop();
            }
            If.pop();
        }, item => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        //左边的省份
        Column.pop();
        //中间的间隔
        Column.create();
        //中间的间隔
        Column.layoutWeight(1);
        //中间的间隔
        Column.backgroundColor("#ffe9e9e9");
        //中间的间隔
        Column.height("30%");
        //中间的间隔
        Column.pop();
        //右边对应的城市
        Column.create();
        //右边对应的城市
        Column.alignSelf(ItemAlign.Start);
        //右边对应的城市
        Column.height("30%");
        //右边对应的城市
        Column.layoutWeight(10);
        //右边对应的城市
        Column.backgroundColor("#ffffffff");
        Scroll.create();
        Scroll.scrollBar(BarState.Auto);
        Scroll.align(Alignment.TopStart);
        Column.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.cities), (item, index) => {
            Row.create();
            Row.hitTestBehavior(this.disable.includes(item) ? HitTestMode.None : HitTestMode.Default);
            Row.onClick(() => {
                this.selectedCitiesNumber = index;
                this.result = this.cities[index];
            });
            If.create();
            if (this.selectedCitiesNumber == index) {
                If.branchId(0);
                Flex.create();
                Flex.backgroundColor("#ffffffff");
                Flex.layoutWeight(5);
                Text.create(item + "");
                Text.fontWeight(FontWeight.Bold);
                Text.fontColor("#ffff0000");
                Text.alignSelf(ItemAlign.Start);
                Text.margin({ left: 10, top: 10, bottom: 10 });
                Text.pop();
                Flex.pop();
                Flex.create();
                Flex.layoutWeight(1);
                Flex.backgroundColor("#ffffffff");
                Text.create("√");
                Text.fontSize(10);
                Text.fontColor("#ffffffff");
                Text.textAlign(TextAlign.Center);
                Text.height(12);
                Text.width(12);
                Text.borderRadius(10);
                Text.backgroundColor("#ffff0000");
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Flex.pop();
            }
            else {
                If.branchId(1);
                Flex.create();
                Flex.backgroundColor("#ffffffff");
                Flex.layoutWeight(5);
                Text.create(item + "");
                Text.fontColor(this.disable.includes(item) ? "#ffa0a0a0" : Color.Black);
                Text.fontWeight(FontWeight.Bold);
                Text.alignSelf(ItemAlign.Start);
                Text.margin({ left: 10, top: 10, bottom: 10 });
                Text.pop();
                Flex.pop();
            }
            If.pop();
            Row.pop();
        }, item => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        //右边对应的城市
        Column.pop();
        Row.pop();
    }
}
