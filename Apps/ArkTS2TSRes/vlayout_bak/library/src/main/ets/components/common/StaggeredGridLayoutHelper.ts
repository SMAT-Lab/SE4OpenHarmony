interface STAGGEREDGRID_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: StaggeredGridAttributes;
    staggeredGridInfo?: StaggeredGridAttributes;
    vLayoutId?: string;
    itemHeightArray?: Array<number>;
    itemWidth?: number | undefined;
    itemHeight?: number;
    staggeredWidth?: number;
    count?: number;
    layoutCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StaggeredGridLayoutHelper_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { StaggeredGridAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout STAGGEREDGRID_LAYOUT ';
export class STAGGEREDGRID_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.__vLayoutData = new ObservedPropertyObject([] //数据源
        , this, "vLayoutData");
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__staggeredGridInfo = new ObservedPropertyObject({} //属性
        , this, "staggeredGridInfo");
        this.__vLayoutId = new ObservedPropertySimple('' //组件标识
        , this, "vLayoutId");
        this.__itemHeightArray = new ObservedPropertyObject([] //item高度数组
        , this, "itemHeightArray");
        this.__itemWidth = new ObservedPropertyObject(undefined //每个item的宽度
        , this, "itemWidth");
        this.__itemHeight = new ObservedPropertySimple(0 //每个item的高度
        , this, "itemHeight");
        this.__staggeredWidth = new ObservedPropertySimple(0 //瀑布流的宽度
        , this, "staggeredWidth");
        this.count = 0 //已加载完毕的布局数量
        ;
        this.layoutCount = 0;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: STAGGEREDGRID_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.staggeredGridInfo !== undefined) {
            this.staggeredGridInfo = params.staggeredGridInfo;
        }
        if (params.vLayoutId !== undefined) {
            this.vLayoutId = params.vLayoutId;
        }
        if (params.itemHeightArray !== undefined) {
            this.itemHeightArray = params.itemHeightArray;
        }
        if (params.itemWidth !== undefined) {
            this.itemWidth = params.itemWidth;
        }
        if (params.itemHeight !== undefined) {
            this.itemHeight = params.itemHeight;
        }
        if (params.staggeredWidth !== undefined) {
            this.staggeredWidth = params.staggeredWidth;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.layoutCount !== undefined) {
            this.layoutCount = params.layoutCount;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutData.aboutToBeDeleted();
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__staggeredGridInfo.aboutToBeDeleted();
        this.__vLayoutId.aboutToBeDeleted();
        this.__itemHeightArray.aboutToBeDeleted();
        this.__itemWidth.aboutToBeDeleted();
        this.__itemHeight.aboutToBeDeleted();
        this.__staggeredWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private __vLayoutData: ObservedPropertyObject<layoutDataType[] | number[] | string[]>; //数据源
    get vLayoutData() {
        return this.__vLayoutData.get();
    }
    set vLayoutData(newValue: layoutDataType[] | number[] | string[]) {
        this.__vLayoutData.set(newValue);
    }
    private __vLayoutAttribute?: ObservedPropertyObject<StaggeredGridAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: StaggeredGridAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __staggeredGridInfo: ObservedPropertyObject<StaggeredGridAttributes>; //属性
    get staggeredGridInfo() {
        return this.__staggeredGridInfo.get();
    }
    set staggeredGridInfo(newValue: StaggeredGridAttributes) {
        this.__staggeredGridInfo.set(newValue);
    }
    private __vLayoutId: ObservedPropertySimple<string>; //组件标识
    get vLayoutId() {
        return this.__vLayoutId.get();
    }
    set vLayoutId(newValue: string) {
        this.__vLayoutId.set(newValue);
    }
    private __itemHeightArray: ObservedPropertyObject<Array<number>>; //item高度数组
    get itemHeightArray() {
        return this.__itemHeightArray.get();
    }
    set itemHeightArray(newValue: Array<number>) {
        this.__itemHeightArray.set(newValue);
    }
    private __itemWidth: ObservedPropertyObject<number | undefined>; //每个item的宽度
    get itemWidth() {
        return this.__itemWidth.get();
    }
    set itemWidth(newValue: number | undefined) {
        this.__itemWidth.set(newValue);
    }
    private __itemHeight: ObservedPropertySimple<number>; //每个item的高度
    get itemHeight() {
        return this.__itemHeight.get();
    }
    set itemHeight(newValue: number) {
        this.__itemHeight.set(newValue);
    }
    private __staggeredWidth: ObservedPropertySimple<number>; //瀑布流的宽度
    get staggeredWidth() {
        return this.__staggeredWidth.get();
    }
    set staggeredWidth(newValue: number) {
        this.__staggeredWidth.set(newValue);
    }
    private count: number; //已加载完毕的布局数量
    private layoutCount: number;
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.staggeredGridInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            lanes: this.vLayoutAttribute?.lanes == undefined ? 1 : this.vLayoutAttribute.lanes,
            gap: this.vLayoutAttribute?.gap == undefined ? 0 : this.vLayoutAttribute.gap,
            vGap: this.vLayoutAttribute?.vGap == undefined ? 0 : this.vLayoutAttribute.vGap,
            hGap: this.vLayoutAttribute?.hGap == undefined ? 0 : this.vLayoutAttribute.hGap,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            zIndex: this.vLayoutAttribute?.zIndex == undefined ? 0 : this.vLayoutAttribute.zIndex,
            padding: this.vLayoutAttribute?.padding == undefined ? [] : this.vLayoutAttribute.padding,
            topPadding: this.vLayoutAttribute?.topPadding == undefined ? 0 : this.vLayoutAttribute.topPadding,
            rightPadding: this.vLayoutAttribute?.rightPadding == undefined ? 0 : this.vLayoutAttribute.rightPadding,
            bottomPadding: this.vLayoutAttribute?.bottomPadding == undefined ? 0 : this.vLayoutAttribute.bottomPadding,
            leftPadding: this.vLayoutAttribute?.leftPadding == undefined ? 0 : this.vLayoutAttribute.leftPadding,
            margin: this.vLayoutAttribute?.margin == undefined ? [] : this.vLayoutAttribute.margin,
            topMargin: this.vLayoutAttribute?.topMargin == undefined ? 0 : this.vLayoutAttribute.topMargin,
            rightMargin: this.vLayoutAttribute?.rightMargin == undefined ? 0 : this.vLayoutAttribute.rightMargin,
            bottomMargin: this.vLayoutAttribute?.bottomMargin == undefined ? 0 : this.vLayoutAttribute.bottomMargin,
            leftMargin: this.vLayoutAttribute?.leftMargin == undefined ? 0 : this.vLayoutAttribute.leftMargin
        };
        if (this.staggeredGridInfo.padding?.length == 4) {
            this.staggeredGridInfo.topPadding = this.staggeredGridInfo.padding[0];
            this.staggeredGridInfo.rightPadding = this.staggeredGridInfo.padding[1];
            this.staggeredGridInfo.bottomPadding = this.staggeredGridInfo.padding[2];
            this.staggeredGridInfo.leftPadding = this.staggeredGridInfo.padding[3];
        }
        if (this.staggeredGridInfo.margin?.length == 4) {
            this.staggeredGridInfo.topMargin = this.staggeredGridInfo.margin[0];
            this.staggeredGridInfo.rightMargin = this.staggeredGridInfo.margin[1];
            this.staggeredGridInfo.bottomMargin = this.staggeredGridInfo.margin[2];
            this.staggeredGridInfo.leftMargin = this.staggeredGridInfo.margin[3];
        }
        this.computedRange();
        this.computedPosition();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.staggeredGridInfo.range?.length == 2 && this.staggeredGridInfo.range[0] >= 0 && this.staggeredGridInfo.range[1] > this.staggeredGridInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.staggeredGridInfo.range[0], this.staggeredGridInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'computedRange vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedPosition() {
        if (this.count == this.vLayoutData.length) {
            let colHeightArray: number[] = [];
            console.log(TAG + 'computedPosition itemHeightArray = ' + JSON.stringify(this.itemHeightArray));
            for (let i = 0; i < this.vLayoutData.length; i++) {
                if (this.staggeredGridInfo.lanes && i < this.staggeredGridInfo.lanes && this.itemWidth) { //确定第一行
                    if (this.staggeredGridInfo.gap != 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.gap) { //gap行列间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = this.staggeredGridInfo.gap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth + this.staggeredGridInfo.gap) * i + this.staggeredGridInfo.gap;
                        colHeightArray.push(this.itemHeightArray[i] + this.staggeredGridInfo.gap);
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.vGap) { //vGap行间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = this.staggeredGridInfo.vGap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth) * i;
                        colHeightArray.push(this.itemHeightArray[i] + this.staggeredGridInfo.vGap);
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap != 0 && this.staggeredGridInfo.hGap) { //hGap列间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = 0;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth + this.staggeredGridInfo.hGap) * i + this.staggeredGridInfo.hGap;
                        colHeightArray.push(this.itemHeightArray[i]);
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap != 0 && this.staggeredGridInfo.hGap && this.staggeredGridInfo.vGap) { //vGap行间距、hGap列间距同时定义了
                        (this.vLayoutData[i] as layoutDataType).top = this.staggeredGridInfo.vGap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth + this.staggeredGridInfo.hGap) * i + this.staggeredGridInfo.hGap;
                        colHeightArray.push(this.itemHeightArray[i] + this.staggeredGridInfo.vGap);
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0) { //gap、vGap、hGap同时未定义
                        (this.vLayoutData[i] as layoutDataType).top = 0;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth) * i;
                        colHeightArray.push(this.itemHeightArray[i]);
                    }
                    else if (this.staggeredGridInfo.gap) { //三个都定义，只走gap
                        (this.vLayoutData[i] as layoutDataType).top = this.staggeredGridInfo.gap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.itemWidth + this.staggeredGridInfo.gap) * i + this.staggeredGridInfo.gap;
                        colHeightArray.push(this.itemHeightArray[i] + this.staggeredGridInfo.gap);
                    }
                }
                else if (this.staggeredGridInfo.lanes) {
                    //其它行 先找到数组中的最小高度以及它的索引
                    let minHeight = colHeightArray[0]; //定义最小的高度
                    let index = 0; //定义最小高度的下标
                    for (let j = 0; j < this.staggeredGridInfo.lanes; j++) {
                        if (minHeight > colHeightArray[j]) {
                            minHeight = colHeightArray[j];
                            index = j;
                        }
                    }
                    //设置下一行的第一个盒子的位置
                    //top的值就是最小列的高度 + gap
                    //left的值就是最小距离左边的距离
                    //修改最小列的高度
                    //最小列的高度 = 当前的高度 + 拼接的高度 + 间隙的高度
                    if (this.staggeredGridInfo.gap != 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.gap) { //gap行列间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index] + this.staggeredGridInfo.gap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i] + this.staggeredGridInfo.gap;
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.vGap) { //vGap行间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index] + this.staggeredGridInfo.vGap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i] + this.staggeredGridInfo.vGap;
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap != 0) { //hGap列间距定义了
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index];
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i];
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap != 0 && this.staggeredGridInfo.vGap) { //vGap行间距、hGap列间距同时定义了
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index] + this.staggeredGridInfo.vGap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i] + this.staggeredGridInfo.vGap;
                    }
                    else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0) { //gap、vGap、hGap同时未定义
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index];
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i];
                    }
                    else if (this.staggeredGridInfo.gap) { //三个都定义，只走gap
                        (this.vLayoutData[i] as layoutDataType).top = colHeightArray[index] + this.staggeredGridInfo.gap;
                        (this.vLayoutData[i] as layoutDataType).left = (this.vLayoutData[index] as layoutDataType).left;
                        colHeightArray[index] = colHeightArray[index] + this.itemHeightArray[i] + this.staggeredGridInfo.gap;
                    }
                }
            }
            this.count = 0;
            let str: string = JSON.stringify(this.vLayoutData);
            this.vLayoutData = JSON.parse(str);
            console.log(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
        }
        else {
            console.error(TAG + 'computedPosition else');
        }
    }
    getSize(id: string): Array<number> {
        let info: any = JSON.parse(getInspectorByKey(id));
        let rectStr: string[] = info.$rect
            .replace('][', ',')
            .replace('[', '')
            .replace(']', '')
            .replace(' ', '')
            .split(',');
        return [Number(rectStr[2]) - Number(rectStr[0]), Number(rectStr[3]) - Number(rectStr[1])];
    }
    render() {
        Column.create();
        Column.backgroundColor(this.staggeredGridInfo.bgColor);
        Column.zIndex(this.staggeredGridInfo.zIndex);
        Column.margin({
            top: this.staggeredGridInfo.topMargin,
            right: this.staggeredGridInfo.rightMargin,
            bottom: this.staggeredGridInfo.bottomMargin,
            left: this.staggeredGridInfo.leftMargin
        });
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Stack.padding({
            top: this.staggeredGridInfo.topPadding,
            right: this.staggeredGridInfo.rightPadding,
            bottom: this.staggeredGridInfo.bottomPadding,
            left: this.staggeredGridInfo.leftPadding
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            Stack.create();
            Stack.id(this.vLayoutId + position);
            Stack.onAreaChange(() => {
                this.layoutCount++;
                if (item.a as boolean || this.layoutCount > this.vLayoutData.length) {
                    return;
                }
                let mSize: number[] = this.getSize(this.vLayoutId + position);
                this.staggeredWidth = px2vp(mSize[0]);
                this.itemHeight = px2vp(mSize[1]);
                if (this.staggeredGridInfo.gap != 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.lanes && this.staggeredGridInfo.gap) { //gap行列间距定义了
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.gap) / this.staggeredGridInfo.lanes;
                }
                else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.lanes) { //vGap行间距定义了
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.gap) / this.staggeredGridInfo.lanes;
                }
                else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap != 0 && this.staggeredGridInfo.lanes && this.staggeredGridInfo.hGap) { //hGap列间距定义了
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.hGap) / this.staggeredGridInfo.lanes;
                }
                else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap != 0 && this.staggeredGridInfo.hGap != 0 && this.staggeredGridInfo.lanes && this.staggeredGridInfo.hGap) { //vGap行间距、hGap列间距同时定义了
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.hGap) / this.staggeredGridInfo.lanes;
                }
                else if (this.staggeredGridInfo.gap == 0 && this.staggeredGridInfo.vGap == 0 && this.staggeredGridInfo.hGap == 0 && this.staggeredGridInfo.lanes) { //gap、vGap、hGap同时未定义
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.gap) / this.staggeredGridInfo.lanes;
                }
                else if (this.staggeredGridInfo.lanes && this.staggeredGridInfo.gap) { //三个都定义，只走gap
                    this.itemWidth = (this.staggeredWidth - (this.staggeredGridInfo.lanes + 1) * this.staggeredGridInfo.gap) / this.staggeredGridInfo.lanes;
                }
                this.itemHeightArray.push(this.itemHeight);
                this.count = this.count + 1;
                this.computedPosition();
                item.a = true;
            });
            Stack.width(ObservedObject.GetRawObject(this.itemWidth));
            Stack.position({ x: item.left, y: item.top });
            this.vLayoutContent(item, position, this);
            Stack.pop();
        });
        ForEach.pop();
        Stack.pop();
        Column.pop();
    }
}
