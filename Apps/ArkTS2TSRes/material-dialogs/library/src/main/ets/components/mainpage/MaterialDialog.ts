interface MaterialDialog_Params {
    customComponent?: () => void;
    model?: MaterialDialog.Model;
    dialogAttribute?: DialogAttributeModel;
    controller?: CustomDialogController;
    selectedItem?: string | undefined;
    selectedItemIndex?: number;
    selectedItems?: string[];
    selectedItemIndices?: number[];
    currentLength?: number;
    isInSub?: boolean;
    selectedColor?: string;
    selectedTopIndex?: number;
    alphaSetValue?: number;
    redSetValue?: number;
    greenSetValue?: number;
    blueSetValue?: number;
    customColorValue?: string;
    pageIndex?: number;
    isColorDark?: boolean;
    isCustomColorDark?: boolean;
    eventType?: string;
    touchItemIndex?: number;
    // 日期时间选择
    scrollerFirst?: Scroller;
    scrollerSecond?: Scroller;
    scrollerThird?: Scroller;
    scrollerYear?: Scroller;
    scrollerMonth?: Scroller;
    scrollerDay?: Scroller;
    lastHourPosition?: number;
    lastSecondPosition?: number;
    lastMinutePosition?: number;
    firstIndex?: number;
    secondIndex?: number;
    thirdIndex?: number;
    hourAndSecondAndMinuteArray?: HourAndSecondAndMinute[];
    hourArray?: Array<number | string>;
    secondArray?: Array<number | string>;
    minuteArray?: Array<number | string>;
    initHourDateArray?;
    initSecondDateArray?;
    initMinuteDateArray?;
    solarLatestYearIndex?: number;
    solarLatestMonthIndex?: number;
    solarLatestDayIndex?: number;
    YearsArray?: Array<SolarCalendar | LunarCalendar>;
    firstYearInsert?: boolean;
    firstMonthInsert?: boolean;
    firstDayInsert?: boolean;
    lastYearPosition?: number;
    lastMonthPosition?: number;
    lastDayPosition?: number;
    caculatorYear?: number;
    caculatorMonth?: number;
    caculatorDay?: number;
    solarYearsArray?: SolarCalendar[];
    lunarYearsArray?: LunarCalendar[];
    calendarType?: boolean;
    halfIndex?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialDialog_" + ++__generate__Id;
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
import { ClickCallback } from './ClickCallback';
import { ToggleCallback } from './ToggleCallback';
import { WhichButton } from './WhichButton';
import { ItemListener } from './ItemListener';
import { MultiChoiceListener } from './MultiChoiceListener';
import { SingleChoiceListener } from './SingleChoiceListener';
import { InputCallback } from './InputCallback';
import { ColorCallback } from './ColorCallback';
import { ColorUtil } from './util/ColorUtil';
import { DateTimeCallback } from './DateTimeCallback';
import { initializeHourAndSecondAndMinute, HourAndSecondAndMinute } from './HourSecondMinuteModel';
import { initializeSolarCalendar, SolarCalendar, MonthAndDay } from './SolarCalendar';
import { initializeLunarCalendar, LunarCalendar, LunarMonthAndDay } from './LunarCalendar';
import { DialogAttributeModel } from './model/DialogAttributeModel';
import { TextAttributeModel } from './model/TextAttributeModel';
import { IconAttributeModel } from './model/IconAttributeModel';
import { ColorPickAttributeModel } from './model/ColorPickAttributeModel';
import { ListItemAttributeModel } from './model/ListItemAttributeModel';
import { InputLayoutAttributeModel } from './model/InputLayoutAttributeModel';
import { ButtonAttributeModel } from './model/ButtonAttributeModel';
import { CheckboxAttributeModel } from './model/CheckboxAttributeModel';
import { DateTimeAttributeModel } from './model/DateTimeAttributeModel';
import { Option1, Option2 } from './util/interface';
class MaterialDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.customComponent = undefined;
        this.__model = new ObservedPropertyObject(new MaterialDialog.Model(), this, "model");
        this.dialogAttribute = new DialogAttributeModel();
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new MaterialDialog("17", this, {});
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            }
        }, this);
        this.selectedItem = undefined;
        this.__selectedItemIndex = new ObservedPropertySimple(-1, this, "selectedItemIndex");
        this.selectedItems = new Array(0);
        this.__selectedItemIndices = new ObservedPropertyObject(new Array(0), this, "selectedItemIndices");
        this.__currentLength = new ObservedPropertySimple(0, this, "currentLength");
        this.__isInSub = new ObservedPropertySimple(false, this, "isInSub");
        this.__selectedColor = new ObservedPropertySimple('', this, "selectedColor");
        this.__selectedTopIndex = new ObservedPropertySimple(-1, this, "selectedTopIndex");
        this.__alphaSetValue = new ObservedPropertySimple(255, this, "alphaSetValue");
        this.__redSetValue = new ObservedPropertySimple(0, this, "redSetValue");
        this.__greenSetValue = new ObservedPropertySimple(0, this, "greenSetValue");
        this.__blueSetValue = new ObservedPropertySimple(0, this, "blueSetValue");
        this.__customColorValue = new ObservedPropertySimple('#000000', this, "customColorValue");
        this.pageIndex = 0;
        this.__isColorDark = new ObservedPropertySimple(false, this, "isColorDark");
        this.__isCustomColorDark = new ObservedPropertySimple(true, this, "isCustomColorDark");
        this.__eventType = new ObservedPropertySimple('', this, "eventType");
        this.__touchItemIndex = new ObservedPropertySimple(-1
        // 日期时间选择
        , this, "touchItemIndex");
        this.scrollerFirst = new Scroller();
        this.scrollerSecond = new Scroller();
        this.scrollerThird = new Scroller();
        this.scrollerYear = new Scroller();
        this.scrollerMonth = new Scroller();
        this.scrollerDay = new Scroller();
        this.lastHourPosition = 0;
        this.lastSecondPosition = 0;
        this.lastMinutePosition = 0;
        this.firstIndex = 0;
        this.secondIndex = 0;
        this.thirdIndex = 0;
        this.hourAndSecondAndMinuteArray = initializeHourAndSecondAndMinute();
        this.__hourArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].hour, this, "hourArray");
        this.__secondArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].second, this, "secondArray");
        this.__minuteArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].minute, this, "minuteArray");
        this.initHourDateArray = this.hourAndSecondAndMinuteArray[0].hour;
        this.initSecondDateArray = this.hourAndSecondAndMinuteArray[0].second;
        this.initMinuteDateArray = this.hourAndSecondAndMinuteArray[0].minute;
        this.__solarLatestYearIndex = new ObservedPropertySimple(0, this, "solarLatestYearIndex");
        this.__solarLatestMonthIndex = new ObservedPropertySimple(0, this, "solarLatestMonthIndex");
        this.__solarLatestDayIndex = new ObservedPropertySimple(0, this, "solarLatestDayIndex");
        this.__YearsArray = new ObservedPropertyObject([], this, "YearsArray");
        this.firstYearInsert = true;
        this.firstMonthInsert = true;
        this.firstDayInsert = true;
        this.lastYearPosition = 0;
        this.lastMonthPosition = 0;
        this.lastDayPosition = 0;
        this.caculatorYear = 1;
        this.caculatorMonth = 1;
        this.caculatorDay = 1;
        this.solarYearsArray = [];
        this.lunarYearsArray = [];
        this.__calendarType = new ObservedPropertySimple(this.model.calendarType, this, "calendarType");
        this.halfIndex = 0.5;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialDialog_Params) {
        if (params.customComponent !== undefined) {
            this.customComponent = params.customComponent;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dialogAttribute !== undefined) {
            this.dialogAttribute = params.dialogAttribute;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectedItem !== undefined) {
            this.selectedItem = params.selectedItem;
        }
        if (params.selectedItemIndex !== undefined) {
            this.selectedItemIndex = params.selectedItemIndex;
        }
        if (params.selectedItems !== undefined) {
            this.selectedItems = params.selectedItems;
        }
        if (params.selectedItemIndices !== undefined) {
            this.selectedItemIndices = params.selectedItemIndices;
        }
        if (params.currentLength !== undefined) {
            this.currentLength = params.currentLength;
        }
        if (params.isInSub !== undefined) {
            this.isInSub = params.isInSub;
        }
        if (params.selectedColor !== undefined) {
            this.selectedColor = params.selectedColor;
        }
        if (params.selectedTopIndex !== undefined) {
            this.selectedTopIndex = params.selectedTopIndex;
        }
        if (params.alphaSetValue !== undefined) {
            this.alphaSetValue = params.alphaSetValue;
        }
        if (params.redSetValue !== undefined) {
            this.redSetValue = params.redSetValue;
        }
        if (params.greenSetValue !== undefined) {
            this.greenSetValue = params.greenSetValue;
        }
        if (params.blueSetValue !== undefined) {
            this.blueSetValue = params.blueSetValue;
        }
        if (params.customColorValue !== undefined) {
            this.customColorValue = params.customColorValue;
        }
        if (params.pageIndex !== undefined) {
            this.pageIndex = params.pageIndex;
        }
        if (params.isColorDark !== undefined) {
            this.isColorDark = params.isColorDark;
        }
        if (params.isCustomColorDark !== undefined) {
            this.isCustomColorDark = params.isCustomColorDark;
        }
        if (params.eventType !== undefined) {
            this.eventType = params.eventType;
        }
        if (params.touchItemIndex !== undefined) {
            this.touchItemIndex = params.touchItemIndex;
        }
        if (params.scrollerFirst !== undefined) {
            this.scrollerFirst = params.scrollerFirst;
        }
        if (params.scrollerSecond !== undefined) {
            this.scrollerSecond = params.scrollerSecond;
        }
        if (params.scrollerThird !== undefined) {
            this.scrollerThird = params.scrollerThird;
        }
        if (params.scrollerYear !== undefined) {
            this.scrollerYear = params.scrollerYear;
        }
        if (params.scrollerMonth !== undefined) {
            this.scrollerMonth = params.scrollerMonth;
        }
        if (params.scrollerDay !== undefined) {
            this.scrollerDay = params.scrollerDay;
        }
        if (params.lastHourPosition !== undefined) {
            this.lastHourPosition = params.lastHourPosition;
        }
        if (params.lastSecondPosition !== undefined) {
            this.lastSecondPosition = params.lastSecondPosition;
        }
        if (params.lastMinutePosition !== undefined) {
            this.lastMinutePosition = params.lastMinutePosition;
        }
        if (params.firstIndex !== undefined) {
            this.firstIndex = params.firstIndex;
        }
        if (params.secondIndex !== undefined) {
            this.secondIndex = params.secondIndex;
        }
        if (params.thirdIndex !== undefined) {
            this.thirdIndex = params.thirdIndex;
        }
        if (params.hourAndSecondAndMinuteArray !== undefined) {
            this.hourAndSecondAndMinuteArray = params.hourAndSecondAndMinuteArray;
        }
        if (params.hourArray !== undefined) {
            this.hourArray = params.hourArray;
        }
        if (params.secondArray !== undefined) {
            this.secondArray = params.secondArray;
        }
        if (params.minuteArray !== undefined) {
            this.minuteArray = params.minuteArray;
        }
        if (params.initHourDateArray !== undefined) {
            this.initHourDateArray = params.initHourDateArray;
        }
        if (params.initSecondDateArray !== undefined) {
            this.initSecondDateArray = params.initSecondDateArray;
        }
        if (params.initMinuteDateArray !== undefined) {
            this.initMinuteDateArray = params.initMinuteDateArray;
        }
        if (params.solarLatestYearIndex !== undefined) {
            this.solarLatestYearIndex = params.solarLatestYearIndex;
        }
        if (params.solarLatestMonthIndex !== undefined) {
            this.solarLatestMonthIndex = params.solarLatestMonthIndex;
        }
        if (params.solarLatestDayIndex !== undefined) {
            this.solarLatestDayIndex = params.solarLatestDayIndex;
        }
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
        }
        if (params.firstYearInsert !== undefined) {
            this.firstYearInsert = params.firstYearInsert;
        }
        if (params.firstMonthInsert !== undefined) {
            this.firstMonthInsert = params.firstMonthInsert;
        }
        if (params.firstDayInsert !== undefined) {
            this.firstDayInsert = params.firstDayInsert;
        }
        if (params.lastYearPosition !== undefined) {
            this.lastYearPosition = params.lastYearPosition;
        }
        if (params.lastMonthPosition !== undefined) {
            this.lastMonthPosition = params.lastMonthPosition;
        }
        if (params.lastDayPosition !== undefined) {
            this.lastDayPosition = params.lastDayPosition;
        }
        if (params.caculatorYear !== undefined) {
            this.caculatorYear = params.caculatorYear;
        }
        if (params.caculatorMonth !== undefined) {
            this.caculatorMonth = params.caculatorMonth;
        }
        if (params.caculatorDay !== undefined) {
            this.caculatorDay = params.caculatorDay;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.lunarYearsArray !== undefined) {
            this.lunarYearsArray = params.lunarYearsArray;
        }
        if (params.calendarType !== undefined) {
            this.calendarType = params.calendarType;
        }
        if (params.halfIndex !== undefined) {
            this.halfIndex = params.halfIndex;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__selectedItemIndex.aboutToBeDeleted();
        this.__selectedItemIndices.aboutToBeDeleted();
        this.__currentLength.aboutToBeDeleted();
        this.__isInSub.aboutToBeDeleted();
        this.__selectedColor.aboutToBeDeleted();
        this.__selectedTopIndex.aboutToBeDeleted();
        this.__alphaSetValue.aboutToBeDeleted();
        this.__redSetValue.aboutToBeDeleted();
        this.__greenSetValue.aboutToBeDeleted();
        this.__blueSetValue.aboutToBeDeleted();
        this.__customColorValue.aboutToBeDeleted();
        this.__isColorDark.aboutToBeDeleted();
        this.__isCustomColorDark.aboutToBeDeleted();
        this.__eventType.aboutToBeDeleted();
        this.__touchItemIndex.aboutToBeDeleted();
        this.__hourArray.aboutToBeDeleted();
        this.__secondArray.aboutToBeDeleted();
        this.__minuteArray.aboutToBeDeleted();
        this.__solarLatestYearIndex.aboutToBeDeleted();
        this.__solarLatestMonthIndex.aboutToBeDeleted();
        this.__solarLatestDayIndex.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        this.__calendarType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 接收自定义组件
    private __customComponent?;
    private __model: ObservedPropertyObject<MaterialDialog.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MaterialDialog.Model) {
        this.__model.set(newValue);
    }
    private dialogAttribute?: DialogAttributeModel;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private selectedItem: string | undefined;
    private __selectedItemIndex: ObservedPropertySimple<number>;
    get selectedItemIndex() {
        return this.__selectedItemIndex.get();
    }
    set selectedItemIndex(newValue: number) {
        this.__selectedItemIndex.set(newValue);
    }
    private selectedItems: string[];
    private __selectedItemIndices: ObservedPropertyObject<number[]>;
    get selectedItemIndices() {
        return this.__selectedItemIndices.get();
    }
    set selectedItemIndices(newValue: number[]) {
        this.__selectedItemIndices.set(newValue);
    }
    private __currentLength: ObservedPropertySimple<number>;
    get currentLength() {
        return this.__currentLength.get();
    }
    set currentLength(newValue: number) {
        this.__currentLength.set(newValue);
    }
    private __isInSub: ObservedPropertySimple<boolean>;
    get isInSub() {
        return this.__isInSub.get();
    }
    set isInSub(newValue: boolean) {
        this.__isInSub.set(newValue);
    }
    private __selectedColor: ObservedPropertySimple<string>;
    get selectedColor() {
        return this.__selectedColor.get();
    }
    set selectedColor(newValue: string) {
        this.__selectedColor.set(newValue);
    }
    private __selectedTopIndex: ObservedPropertySimple<number>;
    get selectedTopIndex() {
        return this.__selectedTopIndex.get();
    }
    set selectedTopIndex(newValue: number) {
        this.__selectedTopIndex.set(newValue);
    }
    private __alphaSetValue: ObservedPropertySimple<number>;
    get alphaSetValue() {
        return this.__alphaSetValue.get();
    }
    set alphaSetValue(newValue: number) {
        this.__alphaSetValue.set(newValue);
    }
    private __redSetValue: ObservedPropertySimple<number>;
    get redSetValue() {
        return this.__redSetValue.get();
    }
    set redSetValue(newValue: number) {
        this.__redSetValue.set(newValue);
    }
    private __greenSetValue: ObservedPropertySimple<number>;
    get greenSetValue() {
        return this.__greenSetValue.get();
    }
    set greenSetValue(newValue: number) {
        this.__greenSetValue.set(newValue);
    }
    private __blueSetValue: ObservedPropertySimple<number>;
    get blueSetValue() {
        return this.__blueSetValue.get();
    }
    set blueSetValue(newValue: number) {
        this.__blueSetValue.set(newValue);
    }
    private __customColorValue: ObservedPropertySimple<string>;
    get customColorValue() {
        return this.__customColorValue.get();
    }
    set customColorValue(newValue: string) {
        this.__customColorValue.set(newValue);
    }
    private pageIndex: number;
    private __isColorDark: ObservedPropertySimple<boolean>;
    get isColorDark() {
        return this.__isColorDark.get();
    }
    set isColorDark(newValue: boolean) {
        this.__isColorDark.set(newValue);
    }
    private __isCustomColorDark: ObservedPropertySimple<boolean>;
    get isCustomColorDark() {
        return this.__isCustomColorDark.get();
    }
    set isCustomColorDark(newValue: boolean) {
        this.__isCustomColorDark.set(newValue);
    }
    private __eventType: ObservedPropertySimple<string>;
    get eventType() {
        return this.__eventType.get();
    }
    set eventType(newValue: string) {
        this.__eventType.set(newValue);
    }
    private __touchItemIndex: ObservedPropertySimple<number>;
    get touchItemIndex() {
        return this.__touchItemIndex.get();
    }
    set touchItemIndex(newValue: number) {
        this.__touchItemIndex.set(newValue);
    }
    // 日期时间选择
    private scrollerFirst: Scroller;
    private scrollerSecond: Scroller;
    private scrollerThird: Scroller;
    private scrollerYear: Scroller;
    private scrollerMonth: Scroller;
    private scrollerDay: Scroller;
    private lastHourPosition: number;
    private lastSecondPosition: number;
    private lastMinutePosition: number;
    private firstIndex: number;
    private secondIndex: number;
    private thirdIndex: number;
    private hourAndSecondAndMinuteArray: HourAndSecondAndMinute[];
    private __hourArray: ObservedPropertyObject<Array<number | string>>;
    get hourArray() {
        return this.__hourArray.get();
    }
    set hourArray(newValue: Array<number | string>) {
        this.__hourArray.set(newValue);
    }
    private __secondArray: ObservedPropertyObject<Array<number | string>>;
    get secondArray() {
        return this.__secondArray.get();
    }
    set secondArray(newValue: Array<number | string>) {
        this.__secondArray.set(newValue);
    }
    private __minuteArray: ObservedPropertyObject<Array<number | string>>;
    get minuteArray() {
        return this.__minuteArray.get();
    }
    set minuteArray(newValue: Array<number | string>) {
        this.__minuteArray.set(newValue);
    }
    private initHourDateArray;
    private initSecondDateArray;
    private initMinuteDateArray;
    private __solarLatestYearIndex: ObservedPropertySimple<number>;
    get solarLatestYearIndex() {
        return this.__solarLatestYearIndex.get();
    }
    set solarLatestYearIndex(newValue: number) {
        this.__solarLatestYearIndex.set(newValue);
    }
    private __solarLatestMonthIndex: ObservedPropertySimple<number>;
    get solarLatestMonthIndex() {
        return this.__solarLatestMonthIndex.get();
    }
    set solarLatestMonthIndex(newValue: number) {
        this.__solarLatestMonthIndex.set(newValue);
    }
    private __solarLatestDayIndex: ObservedPropertySimple<number>;
    get solarLatestDayIndex() {
        return this.__solarLatestDayIndex.get();
    }
    set solarLatestDayIndex(newValue: number) {
        this.__solarLatestDayIndex.set(newValue);
    }
    private __YearsArray: ObservedPropertyObject<Array<SolarCalendar | LunarCalendar>>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: Array<SolarCalendar | LunarCalendar>) {
        this.__YearsArray.set(newValue);
    }
    private firstYearInsert: boolean;
    private firstMonthInsert: boolean;
    private firstDayInsert: boolean;
    private lastYearPosition: number;
    private lastMonthPosition: number;
    private lastDayPosition: number;
    private caculatorYear: number;
    private caculatorMonth: number;
    private caculatorDay: number;
    private solarYearsArray: SolarCalendar[];
    private lunarYearsArray: LunarCalendar[];
    private __calendarType: ObservedPropertySimple<boolean>;
    get calendarType() {
        return this.__calendarType.get();
    }
    set calendarType(newValue: boolean) {
        this.__calendarType.set(newValue);
    }
    private halfIndex;
    public aboutToAppear(): void {
        if (this.model.singleChoiceListType && this.model.items != null
            && this.model.items.length !== 0 && this.model.initialSelection !== -1) {
            this.selectedItem = this.model.items[this.model.initialSelection];
        }
        if (this.model.multiChoiceListType && this.model.initialSelectionIndices != null && this.model.initialSelectionIndices.length !== 0 && this.model.items != null) {
            console.info('MaterialDialog aboutToAppear enter initialSelectionIndices is ' + this.model.initialSelectionIndices);
            this.selectedItemIndices = this.model.initialSelectionIndices;
            for (let i = 0; i < this.selectedItemIndices.length; i++) {
                this.selectedItems.splice(this.selectedItems.length, 0, this.model.items[this.selectedItemIndices[i]]);
            }
            console.info('MaterialDialog aboutToAppear enter selectedItems is ' + this.selectedItems);
        }
        if (this.model.isShowInput && this.model.prefill !== undefined) {
            this.currentLength = this.model.prefill.length;
        }
        if (this.model.isColorChooser && this.model.showAlphaSelector) {
            this.customColorValue = '#FF000000';
        }
        if (this.model.isDateType || this.model.isDateTimeType) {
            this.solarYearsArray = initializeSolarCalendar(this.model.yearRangeStart, this.model.yearRangeEnd);
            this.lunarYearsArray = initializeLunarCalendar(this.model.yearRangeStart, this.model.yearRangeEnd);
            this.calendarType = this.model.calendarType;
            this.YearsArray = this.model.calendarType ? this.lunarYearsArray : this.solarYearsArray;
            if (this.model.defaultSelection[0] != null) {
                let year: number = this.model.defaultSelection[0];
                let month: number = this.model.defaultSelection[1];
                let day: number = this.model.defaultSelection[2];
                for (let index = 0; index < this.YearsArray.length; index++) {
                    if (year == this.YearsArray[index].year) {
                        this.solarLatestYearIndex = index;
                        let monthAndDay: Array<LunarMonthAndDay | MonthAndDay> = this.YearsArray[index].monthAndDay;
                        if (month != null) {
                            for (let monthIndex = 0; monthIndex < monthAndDay.length; monthIndex++) {
                                if (month == Number(monthAndDay[monthIndex].month)) {
                                    this.solarLatestMonthIndex = monthIndex;
                                    let days = monthAndDay[monthIndex].days;
                                    if (day != null) {
                                        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
                                            if (day == Number(days[dayIndex])) {
                                                this.solarLatestDayIndex = dayIndex;
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    onBackPress(): boolean {
        return true;
    }
    private handleSelectedItems() {
        this.selectedItems.splice(0, this.selectedItems.length);
        if (this.model.items != null) {
            for (let index = 0; index < this.selectedItemIndices.length; index++) {
                this.selectedItems.splice(this.selectedItems.length, 0, this.model.items[this.selectedItemIndices[index]]);
            }
        }
    }
    private invalidateFromColorChanged() {
        console.info('MaterialDialog invalidateFromColorChanged enter ');
        this.pageIndex = 1;
        this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
        if (this.model.showAlphaSelector) {
            console.info('MaterialDialog invalidateFromColorChanged showAlphaSelector enter ');
            this.customColorValue = ColorUtil.colorHex('argb(' + this.alphaSetValue + ',' + this.redSetValue + ',' + this.greenSetValue + ',' + this.blueSetValue + ')');
            if (this.customColorValue !== this.selectedColor) {
                this.selectedColor = '';
                this.isInSub = false;
                this.selectedTopIndex = -1;
            }
        }
        else {
            console.info('MaterialDialog invalidateFromColorChanged not showAlphaSelector enter ');
            this.customColorValue = ColorUtil.colorHex('rgb(' + this.redSetValue + ',' + this.greenSetValue + ',' + this.blueSetValue + ')');
            if (this.customColorValue !== this.selectedColor) {
                this.selectedColor = '';
                this.isInSub = false;
                this.selectedTopIndex = -1;
            }
        }
        this.isCustomColorDark = ColorUtil.isColorDark(this.customColorValue, this.model.showAlphaSelector);
    }
    private setColor() {
        if (this.model.showAlphaSelector) {
            console.info('setColor enter. showAlpha');
            let customColorArray = ColorUtil.colorArgb(this.customColorValue);
            if (customColorArray !== null) {
                this.alphaSetValue = customColorArray[0];
                this.redSetValue = customColorArray[1];
                this.greenSetValue = customColorArray[2];
                this.blueSetValue = customColorArray[3];
            }
        }
        else {
            console.info('setColor enter. not showAlpha this.customColorValue is ' + this.customColorValue);
            let customColorArray = ColorUtil.colorRgb(this.customColorValue);
            console.info('setColor enter. not showAlpha customColorArray is ' + customColorArray);
            if (customColorArray !== null) {
                this.redSetValue = customColorArray[0];
                this.greenSetValue = customColorArray[1];
                this.blueSetValue = customColorArray[2];
            }
        }
    }
    render() {
        Column.create();
        Column.padding({
            left: this.dialogAttribute ? this.dialogAttribute.paddingLeft : 24,
            right: this.dialogAttribute ? this.dialogAttribute.paddingRight : 24
        });
        Column.backgroundColor(this.dialogAttribute ? this.dialogAttribute.backgroundColor : Color.White);
        Column.constraintSize({ maxWidth: '100%', maxHeight: this.dialogAttribute ? this.dialogAttribute.maxHeight : "95%" });
        Column.width(this.dialogAttribute ? this.dialogAttribute.width : "95%");
        Column.border({
            width: 0,
            color: this.dialogAttribute ? this.dialogAttribute.backgroundColor : Color.White,
            radius: this.dialogAttribute ? this.dialogAttribute.radius : 10,
            style: BorderStyle.Solid
        });
        If.create();
        if ((this.model.imagePath != undefined || this.model.titleContent != undefined)) {
            If.branchId(0);
            Row.create();
            Row.width("100%");
            Row.margin({ top: 20, bottom: 10 });
            If.create();
            if (this.model.imagePath !== undefined) {
                If.branchId(0);
                Image.create(this.model.imagePath);
                Image.width(this.model.iconAttributeModel.width);
                Image.height(this.model.iconAttributeModel.height);
                Image.margin({ right: this.model.titleContent !== undefined ? this.model.iconAttributeModel.marginToTitle : 0 });
            }
            If.pop();
            If.create();
            if (this.model.titleContent !== undefined) {
                If.branchId(0);
                Text.create(this.model.titleContent);
                Text.textAlign(TextAlign.Start);
                Text.fontSize(this.model.titleAttributeModel.fontSize);
                Text.fontWeight(this.model.titleAttributeModel.fontWeight);
                Text.maxLines(this.model.titleAttributeModel.maxLines);
                Text.backgroundColor(this.model.titleAttributeModel.backgroundColor);
                Text.fontColor(this.model.titleAttributeModel.fontColor);
                Text.pop();
            }
            If.pop();
            Row.pop();
        }
        If.pop();
        Scroll.create();
        Scroll.width("100%");
        Scroll.margin({
            bottom: 10,
            top: 10
        });
        Scroll.height(this.model.height ? this.model.height : "");
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Column.create();
        If.create();
        // 自定义组件
        if (this.customComponent !== undefined) {
            If.branchId(0);
            this.customComponent(this);
        }
        If.pop();
        If.create();
        // message区域
        if (this.model.messageContent !== undefined) {
            If.branchId(0);
            Text.create(this.model.messageContent);
            Text.fontSize(this.model.messageAttributeModel.fontSize);
            Text.textAlign(TextAlign.Start);
            Text.width("100%");
            Text.fontColor(this.model.messageAttributeModel.fontColor);
            Text.fontWeight(this.model.messageAttributeModel.fontWeight);
            Text.maxLines(this.model.messageAttributeModel.maxLines);
            Text.backgroundColor(this.model.messageAttributeModel.backgroundColor);
            Text.lineHeight(this.model.messageLineHeight);
            Text.padding({ bottom: 10 });
            Text.margin({
                top: (this.model.imagePath == undefined && this.model.titleContent == undefined) ? 20 : 10,
                bottom: 15
            });
            Text.pop();
        }
        If.pop();
        If.create();
        // 列表区域
        if (this.model.items != null) {
            If.branchId(0);
            List.create({ space: 20, initialIndex: 0 });
            List.listDirection(Axis.Vertical);
            List.margin({ top: 10, bottom: 10 });
            ForEach.create("2", this, ObservedObject.GetRawObject(this.model.items.map((item1: string, index1: number) => {
                let options: Option1 = { index: index1, data: item1 };
                return options;
            })), (item: Option1) => {
                ListItem.create();
                ListItem.editable(true);
                If.create();
                if (this.model.isListType) {
                    If.branchId(0);
                    // 普通列表区域
                    Text.create(item.data);
                    // 普通列表区域
                    Text.width(this.model.listItemAttributeModel.textWidth);
                    // 普通列表区域
                    Text.height(this.model.listItemAttributeModel.textHeight);
                    // 普通列表区域
                    Text.fontSize(this.model.listItemAttributeModel.textFontSize);
                    // 普通列表区域
                    Text.fontWeight(this.model.listItemAttributeModel.textFontWeight);
                    // 普通列表区域
                    Text.maxLines(this.model.listItemAttributeModel.textMaxLines);
                    // 普通列表区域
                    Text.textAlign(this.model.listItemAttributeModel.textAlign);
                    // 普通列表区域
                    Text.backgroundColor(this.selectedItemIndex == item.index ?
                        this.model.listItemAttributeModel.itemSelectedBackgroundColor :
                        this.model.listItemAttributeModel.itemBackgroundColor);
                    // 普通列表区域
                    Text.enabled((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ? false : true);
                    // 普通列表区域
                    Text.fontColor((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ?
                        this.model.listItemAttributeModel.disableFontColor : this.model.listItemAttributeModel.enableFontColor);
                    // 普通列表区域
                    Text.onClick(() => {
                        if (this.model.waitForPositiveButton && this.model.hasActionButton(WhichButton.POSITIVE)) {
                            this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
                            this.selectedItem = item.data;
                            this.selectedItemIndex = item.index;
                        }
                        else {
                            if (this.model.itemListener !== null) {
                                this.model.itemListener.onSelected(item.data, item.index);
                                if (!this.model.hasActionButtons()) {
                                    this.controller.close();
                                }
                            }
                            else {
                                this.controller.close();
                            }
                        }
                    });
                    // 普通列表区域
                    Text.pop();
                }
                else if (this.model.singleChoiceListType) {
                    If.branchId(1);
                    // 单选列表区域
                    Row.create();
                    // 单选列表区域
                    Row.margin({ top: 10, bottom: 10 });
                    // 单选列表区域
                    Row.width("100%");
                    // 单选列表区域
                    Row.backgroundColor(this.eventType == 'Down' && this.touchItemIndex == item.index ?
                        this.model.listItemAttributeModel.itemSelectedBackgroundColor :
                        this.model.listItemAttributeModel.itemBackgroundColor);
                    // 单选列表区域
                    Row.enabled((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ? false : true);
                    // 单选列表区域
                    Row.onClick(() => {
                        if (this.model.waitForPositiveButton && this.model.hasActionButton(WhichButton.POSITIVE)) {
                            this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
                            this.selectedItem = item.data;
                            this.selectedItemIndex = this.model.initialSelection = item.index;
                        }
                        else {
                            if (this.model.singleChoiceListener !== null) {
                                this.model.singleChoiceListener.onSelected(item.data, item.index);
                                if (!this.model.hasActionButtons()) {
                                    this.controller.close();
                                }
                            }
                            else {
                                this.controller.close();
                            }
                        }
                    });
                    // 单选列表区域
                    Row.onTouch((event?: TouchEvent | undefined) => {
                        if (event !== undefined) {
                            if (event.type === TouchType.Down) {
                                this.touchItemIndex = item.index;
                                this.eventType = 'Down';
                            }
                            if (event.type === TouchType.Up) {
                                this.eventType = 'Up';
                            }
                            if (event.type === TouchType.Move) {
                                this.eventType = 'Move';
                            }
                            console.info('Row TouchType:' + this.eventType + '\nDistance between touch point and touch element:\nx: ' + event.touches[0].x + '\n' + 'y: ' + event.touches[0].y);
                        }
                    });
                    Image.create(this.model.initialSelection == item.index ?
                        (this.model.listItemAttributeModel.checkedImage == undefined ? $r('app.media.radio_button_on') : this.model.listItemAttributeModel.checkedImage) :
                        (this.model.listItemAttributeModel.uncheckedImage == undefined ? $r('app.media.radio_button_off') : this.model.listItemAttributeModel.uncheckedImage));
                    Image.width(this.model.listItemAttributeModel.iconWidth);
                    Image.height(this.model.listItemAttributeModel.iconHeight);
                    Image.margin({ right: 10 });
                    Text.create(item.data);
                    Text.width(this.model.listItemAttributeModel.textWidth);
                    Text.height(this.model.listItemAttributeModel.textHeight);
                    Text.fontSize(this.model.listItemAttributeModel.textFontSize);
                    Text.fontWeight(this.model.listItemAttributeModel.textFontWeight);
                    Text.maxLines(this.model.listItemAttributeModel.textMaxLines);
                    Text.fontColor((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ?
                        this.model.listItemAttributeModel.disableFontColor : this.model.listItemAttributeModel.enableFontColor);
                    Text.textAlign(this.model.listItemAttributeModel.textAlign);
                    Text.pop();
                    // 单选列表区域
                    Row.pop();
                }
                else if (this.model.multiChoiceListType) {
                    If.branchId(2);
                    // 多选列表区域
                    Row.create();
                    // 多选列表区域
                    Row.margin({ top: 10, bottom: 10 });
                    // 多选列表区域
                    Row.width("100%");
                    // 多选列表区域
                    Row.backgroundColor(this.eventType == 'Down' && this.touchItemIndex == item.index ?
                        this.model.listItemAttributeModel.itemSelectedBackgroundColor :
                        this.model.listItemAttributeModel.itemBackgroundColor);
                    // 多选列表区域
                    Row.enabled((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ? false : true);
                    // 多选列表区域
                    Row.onClick(() => {
                        if (this.model.waitForPositiveButton && this.model.hasActionButton(WhichButton.POSITIVE)) {
                            if (this.model.initialSelectionIndices.indexOf(item.index) == -1) {
                                console.info('hasButton initialSelectionIndices push');
                                this.model.initialSelectionIndices.splice(this.model.initialSelectionIndices.length, 0, item.index);
                                this.selectedItemIndices = this.model.initialSelectionIndices;
                                this.handleSelectedItems();
                            }
                            else {
                                console.info('hasButton initialSelectionIndices splice');
                                this.model.initialSelectionIndices.splice(this.model.initialSelectionIndices.indexOf(item.index), 1);
                                this.selectedItemIndices = this.model.initialSelectionIndices;
                                this.handleSelectedItems();
                            }
                            this.model.setActionButtonEnabled(WhichButton.POSITIVE, this.selectedItemIndices.length !== 0 || this.model.allowEmptySelection);
                        }
                        else {
                            if (this.model.multiChoiceListener !== null) {
                                if (this.model.initialSelectionIndices.indexOf(item.index) == -1) {
                                    console.info('noButton initialSelectionIndices push');
                                    this.model.initialSelectionIndices.push(item.index);
                                    this.selectedItemIndices = this.model.initialSelectionIndices;
                                    this.handleSelectedItems();
                                }
                                else {
                                    console.info('noButton initialSelectionIndices splice');
                                    this.model.initialSelectionIndices.splice(this.model.initialSelectionIndices.indexOf(item.index), 1);
                                    this.selectedItemIndices = this.model.initialSelectionIndices;
                                    this.handleSelectedItems();
                                }
                                this.model.multiChoiceListener.onSelected(this.model.initialSelectionIndices, this.selectedItems);
                                if (!this.model.hasActionButtons()) {
                                    this.controller.close();
                                }
                            }
                            else {
                                this.controller.close();
                            }
                        }
                    });
                    // 多选列表区域
                    Row.onTouch((event?: TouchEvent | undefined) => {
                        if (event !== undefined) {
                            if (event.type === TouchType.Down) {
                                this.touchItemIndex = item.index;
                                this.eventType = 'Down';
                            }
                            if (event.type === TouchType.Up) {
                                this.eventType = 'Up';
                            }
                            if (event.type === TouchType.Move) {
                                this.eventType = 'Move';
                            }
                            console.info('Row TouchType:' + this.eventType + '\nDistance between touch point and touch element:\nx: ' + event.touches[0].x + '\n' + 'y: ' + event.touches[0].y);
                        }
                    });
                    Image.create(this.selectedItemIndices.indexOf(item.index) !== -1 ?
                        (this.model.listItemAttributeModel.checkedImage == undefined ? $r('app.media.checkbox_checked') : this.model.listItemAttributeModel.checkedImage) :
                        (this.model.listItemAttributeModel.uncheckedImage == undefined ? $r('app.media.checkbox_unchecked') : this.model.listItemAttributeModel.uncheckedImage));
                    Image.width(this.model.listItemAttributeModel.iconWidth);
                    Image.height(this.model.listItemAttributeModel.iconHeight);
                    Image.margin({ right: 10 });
                    Text.create(item.data);
                    Text.width(this.model.listItemAttributeModel.textWidth);
                    Text.height(this.model.listItemAttributeModel.textHeight);
                    Text.fontSize(this.model.listItemAttributeModel.textFontSize);
                    Text.fontWeight(this.model.listItemAttributeModel.textFontWeight);
                    Text.maxLines(this.model.listItemAttributeModel.textMaxLines);
                    Text.fontColor((this.model.disabledIndices !== null && this.model.disabledIndices.indexOf(item.index) !== -1) ?
                        this.model.listItemAttributeModel.disableFontColor : this.model.listItemAttributeModel.enableFontColor);
                    Text.textAlign(this.model.listItemAttributeModel.textAlign);
                    Text.pop();
                    // 多选列表区域
                    Row.pop();
                }
                If.pop();
                ListItem.pop();
            }, (item: Option1) => item.data);
            ForEach.pop();
            List.pop();
        }
        If.pop();
        If.create();
        // 输入框
        if (this.model.isShowInput) {
            If.branchId(0);
            Column.create();
            Column.backgroundColor(this.model.inputLayoutAttributeModel.layoutBackgroundColor);
            Column.borderRadius(4);
            Text.create(this.model.inputLayoutAttributeModel.labelText);
            Text.fontSize(this.model.inputLayoutAttributeModel.labelFontSize);
            Text.textAlign(TextAlign.Start);
            Text.width("100%");
            Text.fontColor(this.model.maxLength > 0 && this.currentLength > this.model.maxLength ?
                this.model.inputLayoutAttributeModel.labelWarnFontColor :
                this.model.inputLayoutAttributeModel.labelNormalFontColor);
            Text.fontWeight(this.model.inputLayoutAttributeModel.labelFontWeight);
            Text.padding({ left: 10, right: 10 });
            Text.margin({ top: 10 });
            Text.pop();
            TextInput.create({ placeholder: this.model.hint, text: this.model.prefill });
            TextInput.type(this.model.inputLayoutAttributeModel.type);
            TextInput.placeholderColor(this.model.inputLayoutAttributeModel.placeholderColor);
            TextInput.placeholderFont(this.model.inputLayoutAttributeModel.placeholderFont);
            TextInput.height(this.model.inputLayoutAttributeModel.height);
            TextInput.width(this.model.inputLayoutAttributeModel.width);
            TextInput.maxLength(this.model.inputLayoutAttributeModel.maxLength);
            TextInput.backgroundColor(this.model.inputLayoutAttributeModel.backgroundColor);
            TextInput.fontWeight(this.model.inputLayoutAttributeModel.fontWeight);
            TextInput.fontColor(this.model.inputLayoutAttributeModel.fontColor);
            TextInput.fontSize(this.model.inputLayoutAttributeModel.fontSize);
            TextInput.padding({ left: 10, right: 10 });
            TextInput.margin({ top: 5 });
            TextInput.onChange((value: string) => {
                console.log("test111 " + value);
                this.model.prefill = value;
                this.currentLength = value.length;
                if (this.model.inputCallback != null) {
                    this.model.inputCallback.onChange(value);
                }
                if (!this.model.allowEmpty) {
                    this.model.setActionButtonEnabled(WhichButton.POSITIVE, value.length !== 0);
                }
            });
            Text.create('');
            Text.width('100%');
            Text.height(1);
            Text.backgroundColor(this.model.maxLength > 0 && this.currentLength > this.model.maxLength ?
                this.model.inputLayoutAttributeModel.labelWarnFontColor :
                this.model.inputLayoutAttributeModel.labelNormalFontColor);
            Text.pop();
            If.create();
            if (this.model.maxLength > 0) {
                If.branchId(0);
                Text.create(`${this.currentLength} / ${this.model.maxLength}`);
                Text.width('100%');
                Text.textAlign(TextAlign.End);
                Text.fontColor(this.currentLength > this.model.maxLength ?
                    this.model.inputLayoutAttributeModel.labelWarnFontColor :
                    this.model.inputLayoutAttributeModel.labelNormalFontColor);
                Text.fontSize(this.model.inputLayoutAttributeModel.inputNumberFontSize);
                Text.padding({ top: 5, bottom: 5, right: 10 });
                Text.pop();
            }
            If.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        // 颜色选择
        if (this.model.isColorChooser) {
            If.branchId(0);
            Swiper.create();
            Swiper.autoPlay(false);
            Swiper.interval(2000);
            Swiper.height('100%');
            Swiper.indicator(this.model.allowCustomArgb ? true : false);
            Swiper.loop(false);
            Swiper.duration(1000);
            Swiper.vertical(false);
            Swiper.itemSpace(0);
            Swiper.onChange((index: number) => {
                this.pageIndex = index;
                if (index === 1) {
                    if (this.model.showAlphaSelector) {
                        if (this.selectedColor !== '') {
                            this.customColorValue = this.selectedColor.replace('#', '#ff');
                        }
                    }
                    else {
                        if (this.selectedColor !== '') {
                            this.customColorValue = this.selectedColor;
                        }
                    }
                    this.setColor();
                    this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
                }
                else if (index === 0) {
                    if (this.selectedColor !== '') {
                        this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
                    }
                    else {
                        this.model.setActionButtonEnabled(WhichButton.POSITIVE, false);
                    }
                }
                console.info(index.toString());
            });
            Grid.create();
            Grid.columnsTemplate(this.model.colorPickAttributeModel.columnsTemplate);
            Grid.columnsGap(this.model.colorPickAttributeModel.columnsGap);
            Grid.rowsGap(this.model.colorPickAttributeModel.rowsGap);
            Grid.width('100%');
            Grid.backgroundColor(this.model.colorPickAttributeModel.backgroundColor);
            Grid.height('100%');
            If.create();
            if (this.isInSub && this.model.subColors != null) {
                If.branchId(0);
                ForEach.create("3", this, ObservedObject.GetRawObject(this.model.subColors[this.selectedTopIndex] && this.model.subColors[this.selectedTopIndex].map((item2: string, index2: number) => {
                    let options: Option2 = { index: index2, color: item2 };
                    return options;
                })), (item: Option2) => {
                    GridItem.create();
                    GridItem.onClick(() => {
                        if (item.index == 0) {
                            this.isInSub = false;
                        }
                        else {
                            this.selectedColor = item.color;
                        }
                    });
                    If.create();
                    if (item.index == 0) {
                        If.branchId(0);
                        Image.create($r('app.media.icon_back_black'));
                        Image.width(this.model.colorPickAttributeModel.itemWidth);
                        Image.height(this.model.colorPickAttributeModel.itemWidth);
                    }
                    else {
                        If.branchId(1);
                        Stack.create({ alignContent: Alignment.Center });
                        If.create();
                        if ('#00000000' == item.color) {
                            If.branchId(0);
                            Image.create($r('app.media.transparentgrid'));
                            Image.width(this.model.colorPickAttributeModel.itemWidth);
                            Image.height(this.model.colorPickAttributeModel.itemWidth);
                        }
                        else {
                            If.branchId(1);
                            Circle.create({ width: this.model.colorPickAttributeModel.itemWidth, height: this.model.colorPickAttributeModel.itemWidth });
                            Circle.fill(item.color);
                            Circle.stroke(0x000000);
                            Circle.strokeWidth(1);
                            Circle.strokeLineJoin(LineJoinStyle.Round);
                        }
                        If.pop();
                        If.create();
                        if (this.selectedColor == item.color) {
                            If.branchId(0);
                            Image.create(ColorUtil.isColorDark(item.color, false) ? $r('app.media.icon_checkmark_white') : $r('app.media.icon_checkmark_black'));
                            Image.width(this.model.colorPickAttributeModel.itemWidth);
                            Image.height(this.model.colorPickAttributeModel.itemWidth);
                        }
                        If.pop();
                        Stack.pop();
                    }
                    If.pop();
                    GridItem.pop();
                }, (item: Option2) => item.color);
                ForEach.pop();
            }
            else {
                If.branchId(1);
                If.create();
                if (this.model.colors) {
                    If.branchId(0);
                    ForEach.create("4", this, ObservedObject.GetRawObject(this.model.colors.map((item1: string, index1: number) => {
                        let options: Option1 = { index: index1, data: item1 };
                        return options;
                    })), (item: Option1) => {
                        GridItem.create();
                        GridItem.onClick(() => {
                            this.selectedColor = item.data;
                            this.selectedTopIndex = item.index;
                            // 选择了颜色后给子数组首位置添加一个占位的空元素
                            if (this.model.subColors !== null) {
                                if (this.model.subColors[this.selectedTopIndex][0].length !== 0) {
                                    this.model.subColors[this.selectedTopIndex].unshift("");
                                }
                                this.isInSub = true;
                            }
                            this.model.setActionButtonEnabled(WhichButton.POSITIVE, true);
                        });
                        Stack.create({ alignContent: Alignment.Center });
                        If.create();
                        if ('#00000000' == item.data) {
                            If.branchId(0);
                            Image.create($r('app.media.transparentgrid'));
                            Image.width(this.model.colorPickAttributeModel.itemWidth);
                            Image.height(this.model.colorPickAttributeModel.itemWidth);
                        }
                        else {
                            If.branchId(1);
                            Circle.create({
                                width: this.model.colorPickAttributeModel.itemWidth,
                                height: this.model.colorPickAttributeModel.itemWidth
                            });
                            Circle.fill(item.data);
                            Circle.stroke(0x000000);
                            Circle.strokeWidth(1);
                            Circle.strokeLineJoin(LineJoinStyle.Round);
                        }
                        If.pop();
                        If.create();
                        if (this.selectedTopIndex == item.index) {
                            If.branchId(0);
                            Image.create(ColorUtil.isColorDark(item.data, false) ? $r('app.media.icon_checkmark_white') : $r('app.media.icon_checkmark_black'));
                            Image.width(this.model.colorPickAttributeModel.itemWidth);
                            Image.height(this.model.colorPickAttributeModel.itemWidth);
                        }
                        If.pop();
                        Stack.pop();
                        GridItem.pop();
                    }, (item: Option1) => item.data);
                    ForEach.pop();
                }
                If.pop();
            }
            If.pop();
            Grid.pop();
            If.create();
            if (this.model.allowCustomArgb) {
                If.branchId(0);
                Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
                Flex.width("100%");
                Flex.height('100%');
                Flex.backgroundColor(this.model.colorPickAttributeModel.backgroundColor);
                Flex.create({
                    direction: FlexDirection.Row,
                    justifyContent: FlexAlign.Center,
                    alignItems: ItemAlign.Center
                });
                Flex.width("100%");
                Flex.height(50);
                Flex.backgroundImage('../images/transparent_rect.png', ImageRepeat.XY);
                Flex.backgroundColor(this.customColorValue);
                Text.create('#');
                Text.textAlign(TextAlign.Center);
                Text.fontSize(20);
                Text.fontColor(this.isCustomColorDark ? Color.White : Color.Black);
                Text.pop();
                TextInput.create({ placeholder: '000000', text: this.customColorValue.replace('#', '') });
                TextInput.type(InputType.Normal);
                TextInput.placeholderColor(Color.White);
                TextInput.placeholderFont({ size: 25, weight: 2 });
                TextInput.fontSize(20);
                TextInput.width(150);
                TextInput.padding({ left: 10, right: 10 });
                TextInput.onChange((value: string) => {
                    if (value.length === 6 && !this.model.showAlphaSelector) {
                        this.customColorValue = '#' + value;
                        console.info('onChange enter  value.length === 6 .this.customColorValue is ' + this.customColorValue);
                        this.setColor();
                    }
                    else if (value.length === 8 && this.model.showAlphaSelector) {
                        this.customColorValue = '#' + value;
                        console.info('onChange enter  value.length === 8 .this.customColorValue is ' + this.customColorValue);
                        this.setColor();
                    }
                });
                Flex.pop();
                If.create();
                if (this.model.showAlphaSelector) {
                    If.branchId(0);
                    Flex.create({
                        direction: FlexDirection.Row,
                        justifyContent: FlexAlign.Start,
                        alignItems: ItemAlign.Center
                    });
                    Text.create('A');
                    Text.width(40);
                    Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Slider.create({
                        value: this.alphaSetValue,
                        min: 0,
                        max: 255,
                        step: 1,
                        style: SliderStyle.OutSet
                    });
                    Slider.blockColor(Color.Black);
                    Slider.trackColor('#ececec');
                    Slider.selectedColor(Color.Black);
                    Slider.showSteps(true);
                    Slider.showTips(false);
                    Slider.width('80%');
                    Slider.onChange((value: number, mode: SliderChangeMode) => {
                        this.alphaSetValue = Math.round(value);
                        this.invalidateFromColorChanged();
                        console.info('value:' + value + 'mode:' + mode.toString());
                    });
                    Text.create(this.alphaSetValue.toFixed(0));
                    Text.constraintSize({ maxWidth: 100 });
                    Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                    Text.textAlign(TextAlign.End);
                    Text.pop();
                    Flex.pop();
                }
                If.pop();
                Flex.create({
                    direction: FlexDirection.Row,
                    justifyContent: FlexAlign.Start,
                    alignItems: ItemAlign.Center
                });
                Text.create('R');
                Text.width(40);
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Slider.create({
                    value: this.redSetValue,
                    min: 0,
                    max: 255,
                    step: 1,
                    style: SliderStyle.OutSet
                });
                Slider.blockColor(Color.Red);
                Slider.trackColor('#ffdddd');
                Slider.selectedColor(Color.Red);
                Slider.showSteps(true);
                Slider.showTips(false);
                Slider.width('80%');
                Slider.onChange((value: number, mode: SliderChangeMode) => {
                    this.redSetValue = Math.round(value);
                    this.invalidateFromColorChanged();
                    console.info('value:' + value + 'mode:' + mode.toString());
                });
                Text.create(this.redSetValue.toFixed(0));
                Text.constraintSize({ maxWidth: 100 });
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.End);
                Text.pop();
                Flex.pop();
                Flex.create({
                    direction: FlexDirection.Row,
                    justifyContent: FlexAlign.Start,
                    alignItems: ItemAlign.Center
                });
                Text.create('G');
                Text.width(40);
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Slider.create({
                    value: this.greenSetValue,
                    min: 0,
                    max: 255,
                    step: 1,
                    style: SliderStyle.OutSet
                });
                Slider.blockColor(Color.Green);
                Slider.trackColor('#eeffcc');
                Slider.selectedColor(Color.Green);
                Slider.showSteps(true);
                Slider.showTips(false);
                Slider.width('80%');
                Slider.onChange((value: number, mode: SliderChangeMode) => {
                    this.greenSetValue = Math.round(value);
                    this.invalidateFromColorChanged();
                    console.info('value:' + value + 'mode:' + mode.toString());
                });
                Text.create(this.greenSetValue.toFixed(0));
                Text.constraintSize({ maxWidth: 100 });
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.End);
                Text.pop();
                Flex.pop();
                Flex.create({
                    direction: FlexDirection.Row,
                    justifyContent: FlexAlign.Start,
                    alignItems: ItemAlign.Center
                });
                Text.create('B');
                Text.width(40);
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Slider.create({
                    value: this.blueSetValue,
                    min: 0,
                    max: 255,
                    step: 1,
                    style: SliderStyle.OutSet
                });
                Slider.blockColor(Color.Blue);
                Slider.trackColor('#aabbff');
                Slider.selectedColor(Color.Blue);
                Slider.showSteps(true);
                Slider.showTips(false);
                Slider.width('80%');
                Slider.onChange((value: number, mode: SliderChangeMode) => {
                    this.blueSetValue = Math.round(value);
                    this.invalidateFromColorChanged();
                    console.info('value:' + value + 'mode:' + mode.toString());
                });
                Text.create(this.blueSetValue.toFixed(0));
                Text.constraintSize({ maxWidth: 100 });
                Text.fontSize(this.model.colorPickAttributeModel.fontSize);
                Text.textAlign(TextAlign.End);
                Text.pop();
                Flex.pop();
                Flex.pop();
            }
            If.pop();
            Swiper.pop();
        }
        If.pop();
        If.create();
        // 日期时间选择
        if (this.model.isDateTimeType) {
            If.branchId(0);
            Swiper.create();
            Swiper.index(0);
            Swiper.autoPlay(false);
            Swiper.interval(2000);
            Swiper.height('100%');
            Swiper.indicator(true);
            Swiper.loop(false);
            Swiper.duration(1000);
            Swiper.vertical(false);
            Swiper.itemSpace(0);
            Swiper.onChange((index: number) => {
                this.pageIndex = index;
                console.info(index.toString());
            });
            Column.create();
            Row.create();
            Row.margin({ bottom: 10 });
            Text.create($r('app.string.year'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.month'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.day'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
            Stack.create({ alignContent: Alignment.BottomStart });
            Row.create();
            Row.height(this.model.dateTimeAttributeModel.rollerTextHeight * 5);
            Scroll.create(this.scrollerYear);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
                if (this.firstYearInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[0] != null) {
                        this.YearsArray.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[0] == val.year) {
                                this.scrollerYear.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstYearInsert = false;
                }
            });
            Scroll.onScrollEnd(() => {
                this.solarLatestYearIndex = Math.floor(this.scrollerYear.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerYear.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestYearIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width("34%");
            // 年
            Text.create(" ");
            // 年
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 年
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: SolarCalendar) => item.year.toString());
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            // 月
            Scroll.create(this.scrollerMonth);
            // 月
            Scroll.scrollBar(BarState.Off);
            // 月
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastMonthPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstMonthInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[1] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[1] == Number(val.month)) {
                                this.scrollerMonth.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstMonthInsert = false;
                }
            });
            // 月
            Scroll.onScrollEnd(() => {
                this.solarLatestMonthIndex = Math.floor(this.scrollerMonth.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerMonth.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestMonthIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            //  月
            ForEach.create("6", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                Text.create(monthAndDay.month.toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: MonthAndDay) => item.month);
            //  月
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 月
            Scroll.pop();
            // 日
            Scroll.create(this.scrollerDay);
            // 日
            Scroll.scrollBar(BarState.Off);
            // 日
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastDayPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstDayInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[2] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[2] == Number(val)) {
                                this.scrollerDay.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstDayInsert = false;
                }
            });
            // 日
            Scroll.onScrollEnd(() => {
                this.solarLatestDayIndex = Math.floor(this.scrollerDay.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerDay.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestDayIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            // 日
            Scroll.onScrollEdge((side: Edge) => {
                this.solarLatestDayIndex = this.scrollerDay.currentOffset().yOffset / this.model.dateTimeAttributeModel.rollerTextHeight;
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            // 阳历 日
            ForEach.create("7", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days), (day: number) => {
                Text.create(day.toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (day: number) => day.toString());
            // 阳历 日
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 日
            Scroll.pop();
            Row.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.model.dateTimeAttributeModel.rollerTextHeight * 3 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.model.dateTimeAttributeModel.rollerTextHeight * 2 });
            Stack.pop();
            Column.pop();
            Column.create();
            Row.create();
            Row.margin({ bottom: 10 });
            Text.create($r('app.string.hour'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.minute'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.seconds'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
            Stack.create({ alignContent: Alignment.TopStart });
            Row.create();
            Row.height(this.model.dateTimeAttributeModel.rollerTextHeight * 5);
            Scroll.create(this.scrollerFirst);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastHourPosition = yOffset == 0 ? this.lastHourPosition : yOffset;
            });
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initHourDateArray.forEach((val, idx, array) => {
                        this.hourArray.push(val);
                    });
                }
            });
            Scroll.onScrollEnd(() => {
                this.firstIndex = Math.floor(this.scrollerFirst.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerFirst.scrollTo({
                    xOffset: 0,
                    yOffset: this.firstIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("8", this, ObservedObject.GetRawObject(this.hourArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            Scroll.create(this.scrollerSecond);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastSecondPosition = yOffset == 0 ? this.lastSecondPosition : yOffset;
            });
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initSecondDateArray.forEach((val, idx, array) => {
                        this.secondArray.push(val);
                    });
                }
            });
            Scroll.onScrollEnd(() => {
                this.secondIndex = Math.floor(this.scrollerSecond.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerSecond.scrollTo({
                    xOffset: 0,
                    yOffset: this.secondIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            // 分
            Text.create(' ');
            // 分
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 分
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("9", this, ObservedObject.GetRawObject(this.secondArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(20);
                Text.fontColor('#000000');
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            // 是否显示区
            Scroll.create(this.scrollerThird);
            // 是否显示区
            Scroll.scrollBar(BarState.Off);
            // 是否显示区
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastMinutePosition = yOffset == 0 ? this.lastMinutePosition : yOffset;
            });
            // 是否显示区
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initMinuteDateArray.forEach((val, idx, array) => {
                        this.minuteArray.push(val);
                    });
                }
            });
            // 是否显示区
            Scroll.onScrollEnd(() => {
                this.thirdIndex = Math.floor(this.scrollerThird.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerThird.scrollTo({
                    xOffset: 0,
                    yOffset: this.thirdIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            // 秒
            Text.create(' ');
            // 秒
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 秒
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("10", this, ObservedObject.GetRawObject(this.minuteArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(20);
                Text.fontColor('#000000');
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 是否显示区
            Scroll.pop();
            Row.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.model.dateTimeAttributeModel.rollerTextHeight * 2 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.model.dateTimeAttributeModel.rollerTextHeight * 3 });
            Stack.pop();
            Column.pop();
            Swiper.pop();
        }
        If.pop();
        If.create();
        // 日期选择
        if (this.model.isDateType) {
            If.branchId(0);
            Row.create();
            Row.margin({ bottom: 10 });
            Text.create($r('app.string.year'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.month'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.day'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
            Stack.create({ alignContent: Alignment.BottomStart });
            Row.create();
            Row.height(this.model.dateTimeAttributeModel.rollerTextHeight * 5);
            Scroll.create(this.scrollerYear);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
                if (this.firstYearInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[0] != null) {
                        this.YearsArray.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[0] == val.year) {
                                this.scrollerYear.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstYearInsert = false;
                }
            });
            Scroll.onScrollEnd(() => {
                this.solarLatestYearIndex = Math.floor(this.scrollerYear.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerYear.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestYearIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width("34%");
            // 年
            Text.create(" ");
            // 年
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 年
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("11", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: SolarCalendar) => item.year.toString());
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            // 月
            Scroll.create(this.scrollerMonth);
            // 月
            Scroll.scrollBar(BarState.Off);
            // 月
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastMonthPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstMonthInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[1] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[1] == Number(val.month)) {
                                this.scrollerMonth.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstMonthInsert = false;
                }
            });
            // 月
            Scroll.onScrollEnd(() => {
                this.solarLatestMonthIndex = Math.floor(this.scrollerMonth.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerMonth.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestMonthIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
                // 处理 所选月份的天数小于之前INDEX
                let dayLength = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
                if (this.solarLatestDayIndex > dayLength) {
                    this.solarLatestDayIndex = dayLength;
                }
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            //  月
            ForEach.create("12", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                Text.create(monthAndDay.month.toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: MonthAndDay) => item.month);
            //  月
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 月
            Scroll.pop();
            // 日
            Scroll.create(this.scrollerDay);
            // 日
            Scroll.scrollBar(BarState.Off);
            // 日
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastDayPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstDayInsert) { //首次进入，用于初始化位置
                    if (this.model.defaultSelection[2] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.forEach((val, idx, array) => {
                            if (this.model.defaultSelection[2] == Number(val)) {
                                this.scrollerDay.scrollTo({
                                    xOffset: 0,
                                    yOffset: idx * this.model.dateTimeAttributeModel.rollerTextHeight,
                                    animation: { duration: 10, curve: Curve.Ease }
                                });
                            }
                        });
                    }
                    this.firstDayInsert = false;
                }
            });
            // 日
            Scroll.onScrollEnd(() => {
                this.solarLatestDayIndex = Math.floor(this.scrollerDay.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerDay.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestDayIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            // 日
            Scroll.onScrollEdge((side: Edge) => {
                this.solarLatestDayIndex = this.scrollerDay.currentOffset().yOffset / this.model.dateTimeAttributeModel.rollerTextHeight;
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            // 阳历 日
            ForEach.create("13", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days), (day: number) => {
                Text.create(day.toString());
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (day: number) => day.toString());
            // 阳历 日
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 日
            Scroll.pop();
            Row.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.model.dateTimeAttributeModel.rollerTextHeight * 3 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.model.dateTimeAttributeModel.rollerTextHeight * 2 });
            Stack.pop();
        }
        If.pop();
        If.create();
        // 时间选择
        if (this.model.isTimeType) {
            If.branchId(0);
            Row.create();
            Row.margin({ bottom: 10 });
            Text.create($r('app.string.hour'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.minute'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create($r('app.string.seconds'));
            Text.width('33%');
            Text.fontSize(this.model.dateTimeAttributeModel.labelFontSize);
            Text.fontColor(this.model.dateTimeAttributeModel.labelFontColor);
            Text.fontWeight(this.model.dateTimeAttributeModel.labelFontWeight);
            Text.height(this.model.dateTimeAttributeModel.labelHeight);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
            Stack.create({ alignContent: Alignment.TopStart });
            Row.create();
            Row.height(this.model.dateTimeAttributeModel.rollerTextHeight * 5);
            Scroll.create(this.scrollerFirst);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastHourPosition = yOffset == 0 ? this.lastHourPosition : yOffset;
            });
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initHourDateArray.forEach((val, idx, array) => {
                        this.hourArray.push(val);
                    });
                }
            });
            Scroll.onScrollEnd(() => {
                this.firstIndex = Math.floor(this.scrollerFirst.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerFirst.scrollTo({
                    xOffset: 0,
                    yOffset: this.firstIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("14", this, ObservedObject.GetRawObject(this.hourArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(" ");
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            Scroll.create(this.scrollerSecond);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastSecondPosition = yOffset == 0 ? this.lastSecondPosition : yOffset;
            });
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initSecondDateArray.forEach((val, idx, array) => {
                        this.secondArray.push(val);
                    });
                }
            });
            Scroll.onScrollEnd(() => {
                this.secondIndex = Math.floor(this.scrollerSecond.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerSecond.scrollTo({
                    xOffset: 0,
                    yOffset: this.secondIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            // 分
            Text.create(' ');
            // 分
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 分
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("15", this, ObservedObject.GetRawObject(this.secondArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            // 是否显示区
            Scroll.create(this.scrollerThird);
            // 是否显示区
            Scroll.scrollBar(BarState.Off);
            // 是否显示区
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastMinutePosition = yOffset == 0 ? this.lastMinutePosition : yOffset;
            });
            // 是否显示区
            Scroll.onScrollEdge((side: Edge) => {
                if (side.valueOf() == 0) { // 向上滑动
                }
                if (side.valueOf() == 1) {
                    this.initMinuteDateArray.forEach((val, idx, array) => {
                        this.minuteArray.push(val);
                    });
                }
            });
            // 是否显示区
            Scroll.onScrollEnd(() => {
                this.thirdIndex = Math.floor(this.scrollerThird.currentOffset()
                    .yOffset / this.model.dateTimeAttributeModel.rollerTextHeight + this.halfIndex);
                this.scrollerThird.scrollTo({
                    xOffset: 0,
                    yOffset: this.thirdIndex * this.model.dateTimeAttributeModel.rollerTextHeight,
                    animation: { duration: 2000, curve: Curve.Ease }
                });
            });
            Column.create();
            Column.width('33%');
            // 秒
            Text.create(' ');
            // 秒
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            // 秒
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            ForEach.create("16", this, ObservedObject.GetRawObject(this.minuteArray.map((item1: string | number, index1: number) => {
                let options: Option1 = { index: index1 + 1, data: item1.toString() };
                return options;
            })), (item: Option1) => {
                Text.create(`${item.data}`);
                Text.fontSize(this.model.dateTimeAttributeModel.rollerFontSize);
                Text.fontColor(this.model.dateTimeAttributeModel.rollerFontColor);
                Text.fontWeight(this.model.dateTimeAttributeModel.rollerFontWeight);
                Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
                Text.pop();
            }, (item: Option1) => item.index.toString());
            ForEach.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Text.create(' ');
            Text.height(this.model.dateTimeAttributeModel.rollerTextHeight);
            Text.pop();
            Column.pop();
            // 是否显示区
            Scroll.pop();
            Row.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.model.dateTimeAttributeModel.rollerTextHeight * 2 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color(this.model.dividerColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.model.dateTimeAttributeModel.rollerTextHeight * 3 });
            Stack.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        // 复选框
        if (this.model.checkboxText !== undefined) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10, bottom: 10 });
            Row.width("100%");
            Row.onClick(() => {
                this.model.isCheckboxChecked = !this.model.isCheckboxChecked;
                if (this.model.onToggle) {
                    this.model.onToggle.onChanged(this.model.isCheckboxChecked);
                }
            });
            Image.create(this.model.isCheckboxChecked ? this.model.checkboxImageAttribute.checkedImage : this.model.checkboxImageAttribute.uncheckedImage);
            Image.width(this.model.checkboxImageAttribute.width);
            Image.height(this.model.checkboxImageAttribute.height);
            Image.margin({ right: 10 });
            Text.create(this.model.checkboxText);
            Text.textAlign(TextAlign.Start);
            Text.fontSize(this.model.checkboxTextAttribute.fontSize);
            Text.fontColor(this.model.checkboxTextAttribute.fontColor);
            Text.fontWeight(this.model.checkboxTextAttribute.fontWeight);
            Text.maxLines(this.model.checkboxTextAttribute.maxLines);
            Text.backgroundColor(this.model.checkboxTextAttribute.backgroundColor);
            Text.pop();
            Row.pop();
        }
        If.pop();
        If.create();
        // 按钮
        if (this.model.isStacked) {
            If.branchId(0);
            Column.create();
            Column.margin({ bottom: 20 });
            Column.width("100%");
            Column.alignItems(HorizontalAlign.End);
            If.create();
            if (this.model.positiveButtonText !== undefined) {
                If.branchId(0);
                Button.createWithLabel(this.model.positiveButtonText, {
                    type: this.model.positiveButtonAttribute.buttonType,
                    stateEffect: this.model.positiveButtonAttribute.stateEffect
                });
                Button.onClick(() => {
                    if (this.model.isListType && this.model.itemListener !== null && this.selectedItem !== undefined) {
                        this.model.itemListener.onSelected(this.selectedItem, this.selectedItemIndex);
                    }
                    else if (this.model.singleChoiceListType && this.model.singleChoiceListener !== null && this.selectedItem !== undefined) {
                        this.model.singleChoiceListener.onSelected(this.selectedItem, this.selectedItemIndex);
                    }
                    else if (this.model.multiChoiceListType && this.model.multiChoiceListener !== null) {
                        this.model.multiChoiceListener.onSelected(ObservedObject.GetRawObject(this.selectedItemIndices), this.selectedItems);
                    }
                    else if (this.model.isColorChooser) {
                        if (this.model.colorCallback !== null) {
                            this.model.colorCallback.onSelected(this.pageIndex == 1 ? this.customColorValue : this.selectedColor);
                        }
                    }
                    else if (this.model.isTimeType) {
                        let selectHour = this.hourArray[this.firstIndex];
                        let selectMinute = this.secondArray[this.secondIndex];
                        let selectSecond = this.minuteArray[this.thirdIndex];
                        let result = selectHour + ':' + selectMinute + ':' + selectSecond;
                        if (this.model.dateTimeCallback !== null) {
                            this.model.dateTimeCallback.onSelected(result);
                        }
                    }
                    else if (this.model.isDateType) {
                        let selectYear = this.YearsArray[this.solarLatestYearIndex].year;
                        let selectMonth = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
                        let daysArray = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
                        if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                            this.solarLatestDayIndex = daysArray.length - 1;
                        }
                        let selectDay = daysArray[this.solarLatestDayIndex];
                        let result = selectYear + '/' + selectMonth + '/' + selectDay;
                        if (this.model.dateTimeCallback !== null) {
                            this.model.dateTimeCallback.onSelected(result);
                        }
                    }
                    else if (this.model.isDateTimeType) {
                        let selectYear = this.YearsArray[this.solarLatestYearIndex].year;
                        let selectMonth = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
                        let daysArray = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
                        if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                            this.solarLatestDayIndex = daysArray.length - 1;
                        }
                        let selectDay = daysArray[this.solarLatestDayIndex];
                        let selectHour = this.hourArray[this.firstIndex];
                        let selectSecond = this.secondArray[this.secondIndex];
                        let selectMinute = this.minuteArray[this.thirdIndex];
                        let result = selectYear + '/' + selectMonth + '/' + selectDay + ' ' + selectHour + ':' + selectSecond + ':' + selectMinute;
                        if (this.model.dateTimeCallback !== null) {
                            this.model.dateTimeCallback.onSelected(result);
                        }
                    }
                    this.controller.close();
                    if (this.model.positiveClickCallback !== null) {
                        if (this.model.isShowInput) {
                            this.model.positiveClickCallback.onClick(this.model.prefill);
                        }
                        else {
                            this.model.positiveClickCallback.onClick();
                        }
                    }
                });
                Button.backgroundColor(this.model.positiveButtonAttribute.backgroundColor);
                Button.margin({ bottom: 10 });
                Button.fontColor(this.model.positiveButtonAttribute.fontColor);
                Button.fontWeight(this.model.positiveButtonAttribute.fontWeight);
                Button.fontSize(this.model.positiveButtonAttribute.fontSize);
                Button.pop();
            }
            If.pop();
            If.create();
            if (this.model.negativeButtonText !== undefined) {
                If.branchId(0);
                Button.createWithLabel(this.model.negativeButtonText, {
                    type: this.model.negativeButtonAttribute.buttonType,
                    stateEffect: this.model.negativeButtonAttribute.stateEffect
                });
                Button.onClick(() => {
                    this.controller.close();
                    if (this.model.negativeClickCallback !== null) {
                        this.model.negativeClickCallback.onClick();
                    }
                });
                Button.backgroundColor(this.model.negativeButtonAttribute.backgroundColor);
                Button.fontColor(this.model.negativeButtonAttribute.fontColor);
                Button.fontWeight(this.model.negativeButtonAttribute.fontWeight);
                Button.margin({ bottom: 10 });
                Button.fontSize(this.model.negativeButtonAttribute.fontSize);
                Button.pop();
            }
            If.pop();
            If.create();
            if (this.model.neutralButtonText !== undefined) {
                If.branchId(0);
                Button.createWithLabel(this.model.neutralButtonText, {
                    type: this.model.neutralButtonAttribute.buttonType,
                    stateEffect: this.model.neutralButtonAttribute.stateEffect
                });
                Button.onClick(() => {
                    this.controller.close();
                    if (this.model.neutralClickCallback !== null) {
                        this.model.neutralClickCallback.onClick();
                    }
                });
                Button.backgroundColor(this.model.neutralButtonAttribute.backgroundColor);
                Button.fontColor(this.model.neutralButtonAttribute.fontColor);
                Button.fontWeight(this.model.neutralButtonAttribute.fontWeight);
                Button.fontSize(this.model.neutralButtonAttribute.fontSize);
                Button.pop();
            }
            If.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            If.create();
            if (this.model.positiveButtonText !== undefined || this.model.negativeButtonText !== undefined || this.model.neutralButtonText !== undefined) {
                If.branchId(0);
                Flex.create({ justifyContent: FlexAlign.End });
                Flex.margin({ bottom: 20 });
                Flex.width("100%");
                If.create();
                if (this.model.neutralButtonText !== undefined) {
                    If.branchId(0);
                    Button.createWithLabel(this.model.neutralButtonText, {
                        type: this.model.neutralButtonAttribute.buttonType,
                        stateEffect: this.model.neutralButtonAttribute.stateEffect
                    });
                    Button.onClick(() => {
                        this.controller.close();
                        if (this.model.neutralClickCallback !== null) {
                            this.model.neutralClickCallback.onClick();
                        }
                    });
                    Button.backgroundColor(this.model.neutralButtonAttribute.backgroundColor);
                    Button.fontColor(this.model.neutralButtonAttribute.fontColor);
                    Button.fontSize(this.model.neutralButtonAttribute.fontSize);
                    Button.fontWeight(this.model.neutralButtonAttribute.fontWeight);
                    Button.enabled(this.model.isNeutralButtonEnabled);
                    Button.constraintSize({ minWidth: 64 });
                    Button.pop();
                }
                If.pop();
                If.create();
                if (this.model.negativeButtonText !== undefined) {
                    If.branchId(0);
                    Button.createWithLabel(this.model.negativeButtonText, {
                        type: this.model.negativeButtonAttribute.buttonType,
                        stateEffect: this.model.negativeButtonAttribute.stateEffect
                    });
                    Button.onClick(() => {
                        this.controller.close();
                        if (this.model.negativeClickCallback !== null) {
                            this.model.negativeClickCallback.onClick();
                        }
                    });
                    Button.backgroundColor(this.model.negativeButtonAttribute.backgroundColor);
                    Button.fontColor(this.model.negativeButtonAttribute.fontColor);
                    Button.fontSize(this.model.negativeButtonAttribute.fontSize);
                    Button.fontWeight(this.model.negativeButtonAttribute.fontWeight);
                    Button.margin({ left: 10 });
                    Button.enabled(this.model.isNegativeButtonEnabled);
                    Button.constraintSize({ minWidth: 64 });
                    Button.pop();
                }
                If.pop();
                If.create();
                if (this.model.positiveButtonText !== undefined) {
                    If.branchId(0);
                    Button.createWithLabel(this.model.positiveButtonText, {
                        type: this.model.positiveButtonAttribute.buttonType,
                        stateEffect: this.model.positiveButtonAttribute.stateEffect
                    });
                    Button.onClick(() => {
                        if (this.model.isListType && this.model.itemListener !== null && this.selectedItem !== undefined) {
                            this.model.itemListener.onSelected(this.selectedItem, this.selectedItemIndex);
                        }
                        else if (this.model.singleChoiceListType && this.model.singleChoiceListener !== null && this.selectedItem !== undefined) {
                            this.model.singleChoiceListener.onSelected(this.selectedItem, this.selectedItemIndex);
                        }
                        else if (this.model.multiChoiceListType && this.model.multiChoiceListener !== null) {
                            this.model.multiChoiceListener.onSelected(ObservedObject.GetRawObject(this.selectedItemIndices), this.selectedItems);
                        }
                        else if (this.model.isColorChooser) {
                            if (this.model.colorCallback !== null) {
                                this.model.colorCallback.onSelected(this.pageIndex == 1 ? this.customColorValue : this.selectedColor);
                            }
                        }
                        else if (this.model.isTimeType) {
                            let selectHour = this.hourArray[this.firstIndex];
                            let selectMinute = this.secondArray[this.secondIndex];
                            let selectSecond = this.minuteArray[this.thirdIndex];
                            let result = selectHour + ':' + selectMinute + ':' + selectSecond;
                            if (this.model.dateTimeCallback !== null) {
                                this.model.dateTimeCallback.onSelected(result);
                            }
                        }
                        else if (this.model.isDateType) {
                            let selectYear = this.YearsArray[this.solarLatestYearIndex].year;
                            let selectMonth = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
                            let daysArray = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
                            if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                                console.info('isDateType daysArray.length is ' + daysArray.length + ', solarLatestDayIndex is ' + this.solarLatestDayIndex);
                                this.solarLatestDayIndex = daysArray.length - 1;
                            }
                            let selectDay = daysArray[this.solarLatestDayIndex];
                            console.info('isDateType solarLatestYearIndex is ' + this.solarLatestYearIndex + ', solarLatestMonthIndex is ' + this.solarLatestMonthIndex + ', solarLatestDayIndex is ' + this.solarLatestDayIndex);
                            let result = selectYear + '/' + selectMonth + '/' + selectDay;
                            if (this.model.dateTimeCallback !== null) {
                                this.model.dateTimeCallback.onSelected(result);
                            }
                        }
                        else if (this.model.isDateTimeType) {
                            let selectYear = this.YearsArray[this.solarLatestYearIndex].year;
                            let selectMonth = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
                            let daysArray = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
                            if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                                this.solarLatestDayIndex = daysArray.length - 1;
                            }
                            let selectDay = daysArray[this.solarLatestDayIndex];
                            let selectHour = this.hourArray[this.firstIndex];
                            let selectSecond = this.secondArray[this.secondIndex];
                            let selectMinute = this.minuteArray[this.thirdIndex];
                            let result = selectYear + '/' + selectMonth + '/' + selectDay + ' ' + selectHour + ':' + selectSecond + ':' + selectMinute;
                            if (this.model.dateTimeCallback !== null) {
                                this.model.dateTimeCallback.onSelected(result);
                            }
                        }
                        this.controller.close();
                        if (this.model.positiveClickCallback !== null) {
                            if (this.model.isShowInput) {
                                this.model.positiveClickCallback.onClick(this.model.prefill);
                            }
                            else {
                                this.model.positiveClickCallback.onClick();
                            }
                        }
                    });
                    Button.backgroundColor(this.model.positiveButtonAttribute.backgroundColor);
                    Button.fontColor(this.model.isPositiveButtonEnabled ? this.model.positiveButtonAttribute.fontColor : this.model.positiveButtonAttribute.disableFontColor);
                    Button.fontSize(this.model.positiveButtonAttribute.fontSize);
                    Button.fontWeight(this.model.positiveButtonAttribute.fontWeight);
                    Button.margin({ left: 10 });
                    Button.enabled(this.model.isPositiveButtonEnabled);
                    Button.constraintSize({ minWidth: 64 });
                    Button.pop();
                }
                If.pop();
                Flex.pop();
            }
            If.pop();
        }
        If.pop();
        Column.pop();
    }
}
namespace MaterialDialog {
    export class Model {
        titleAttributeModel: TextAttributeModel = new TextAttributeModel();
        messageAttributeModel: TextAttributeModel = new TextAttributeModel();
        iconAttributeModel: IconAttributeModel = new IconAttributeModel();
        checkboxTextAttribute: TextAttributeModel = new TextAttributeModel();
        checkboxImageAttribute: CheckboxAttributeModel = new CheckboxAttributeModel();
        positiveButtonAttribute: ButtonAttributeModel = new ButtonAttributeModel();
        negativeButtonAttribute: ButtonAttributeModel = new ButtonAttributeModel();
        neutralButtonAttribute: ButtonAttributeModel = new ButtonAttributeModel();
        inputLayoutAttributeModel: InputLayoutAttributeModel = new InputLayoutAttributeModel();
        listItemAttributeModel: ListItemAttributeModel = new ListItemAttributeModel();
        colorPickAttributeModel: ColorPickAttributeModel = new ColorPickAttributeModel();
        dateTimeAttributeModel: DateTimeAttributeModel = new DateTimeAttributeModel();
        imagePath: string | PixelMap | Resource | undefined = undefined;
        titleContent: string | Resource | undefined = undefined;
        messageContent: string | Resource | undefined = undefined;
        messageLineHeight: number = -1;
        positiveButtonText: string | Resource | undefined = undefined;
        negativeButtonText: string | Resource | undefined = undefined;
        neutralButtonText: string | Resource | undefined = undefined;
        positiveClickCallback: ClickCallback | null = null;
        negativeClickCallback: ClickCallback | null = null;
        neutralClickCallback: ClickCallback | null = null;
        isStacked: boolean = false;
        isCheckboxChecked: boolean = false;
        showTop: boolean = false;
        showBottom: boolean = false;
        height: number | undefined = undefined;
        checkboxText: string | Resource | undefined = undefined;
        onToggle: ToggleCallback | undefined = undefined;
        isDebugMode: boolean = false;
        singleChoiceListType: boolean = false;
        isListType: boolean = false;
        items: string[] | null = null;
        disabledIndices: number[] | null = null;
        allowEmptySelection: boolean = false;
        waitForPositiveButton: boolean = true;
        initialSelectionIndices: number[] = [];
        multiChoiceListener: MultiChoiceListener | null = null;
        multiChoiceListType: boolean = false;
        itemListener: ItemListener | null = null;
        initialSelection: number = -1;
        singleChoiceListener: SingleChoiceListener | null = null;
        checkedColor: number = -1;
        uncheckedColor: number = -1;
        isNeutralButtonEnabled: boolean = true;
        isNegativeButtonEnabled: boolean = true;
        isPositiveButtonEnabled: boolean = true;
        // 输入框
        allowEmpty: boolean = false;
        isShowInput: boolean = false;
        hint: string | undefined = undefined;
        prefill: string | undefined = undefined;
        maxLength: number = 0;
        inputCallback: InputCallback | null = null;
        // 颜色选择
        isColorChooser: boolean = false;
        colors: string[] | null = null;
        subColors: string[][] | null = null;
        allowCustomArgb: boolean = false;
        showAlphaSelector: boolean = false;
        changeActionButtonsColor: boolean = false;
        colorCallback: ColorCallback | null = null;
        // 日期时间选择
        isTimeType: boolean = false;
        isDateType: boolean = false;
        isDateTimeType: boolean = false;
        dividerColor: Color | number | string | Resource = Color.Red;
        dateTimeCallback: DateTimeCallback | null = null;
        defaultSelection: number[] = [];
        yearRangeStart: number = 2010;
        yearRangeEnd: number = 2030;
        calendarType: boolean = false;
        icon(src: string | PixelMap | Resource, iconAttributeModel?: IconAttributeModel): Model {
            this.imagePath = src;
            if (iconAttributeModel) {
                this.iconAttributeModel = iconAttributeModel;
            }
            else {
                this.iconAttributeModel = new IconAttributeModel();
            }
            return this;
        }
        title(text: string | Resource, titleAttributeModel?: TextAttributeModel): Model {
            this.titleContent = text;
            if (titleAttributeModel) {
                this.titleAttributeModel = titleAttributeModel;
            }
            else {
                this.titleAttributeModel = new TextAttributeModel();
            }
            return this;
        }
        message(text: string | Resource, messageAttributeModel?: TextAttributeModel): Model {
            this.messageContent = text;
            if (messageAttributeModel) {
                this.messageAttributeModel = messageAttributeModel;
            }
            else {
                this.messageAttributeModel = new TextAttributeModel();
            }
            return this;
        }
        lineHeight(lineHeight: number): Model {
            this.messageLineHeight = lineHeight;
            return this;
        }
        positiveButton(text: string | Resource, clickCallback?: ClickCallback, positiveButtonAttribute?: ButtonAttributeModel): Model {
            this.positiveButtonText = text;
            if (clickCallback) {
                this.positiveClickCallback = clickCallback;
                if (positiveButtonAttribute) {
                    this.positiveButtonAttribute = positiveButtonAttribute;
                }
                else {
                    this.positiveButtonAttribute = new ButtonAttributeModel();
                }
            }
            return this;
        }
        clearPositiveListeners(): Model {
            this.positiveClickCallback = null;
            return this;
        }
        negativeButton(text: string | Resource, clickCallback?: ClickCallback, negativeButtonAttribute?: ButtonAttributeModel): Model {
            this.negativeButtonText = text;
            if (clickCallback) {
                this.negativeClickCallback = clickCallback;
                if (negativeButtonAttribute) {
                    this.negativeButtonAttribute = negativeButtonAttribute;
                }
                else {
                    this.negativeButtonAttribute = new ButtonAttributeModel();
                }
            }
            return this;
        }
        clearNegativeListeners(): Model {
            this.negativeClickCallback = null;
            return this;
        }
        neutralButton(text: string | Resource, clickCallback?: ClickCallback, neutralButtonAttribute?: ButtonAttributeModel): Model {
            this.neutralButtonText = text;
            if (clickCallback) {
                this.neutralClickCallback = clickCallback;
                if (neutralButtonAttribute) {
                    this.neutralButtonAttribute = neutralButtonAttribute;
                }
                else {
                    this.neutralButtonAttribute = new ButtonAttributeModel();
                }
            }
            return this;
        }
        clearNeutralListeners(): Model {
            this.neutralClickCallback = null;
            return this;
        }
        setStacked(isStacked: boolean): Model {
            this.isStacked = isStacked;
            return this;
        }
        checkBoxPrompt(text: string | Resource, isCheckedDefault: boolean = false, onToggle: ToggleCallback, checkboxTextAttribute?: TextAttributeModel, checkboxImageAttribute?: CheckboxAttributeModel): Model {
            this.isCheckboxChecked = isCheckedDefault;
            this.checkboxText = text;
            this.onToggle = onToggle;
            if (checkboxTextAttribute) {
                this.checkboxTextAttribute = checkboxTextAttribute;
            }
            else {
                this.checkboxTextAttribute = new TextAttributeModel();
            }
            if (checkboxImageAttribute) {
                this.checkboxImageAttribute = checkboxImageAttribute;
            }
            else {
                this.checkboxImageAttribute = new CheckboxAttributeModel();
            }
            return this;
        }
        setScrollHeight(height: number): Model {
            this.height = height;
            return this;
        }
        debugMode(debugMode: boolean): Model {
            this.isDebugMode = debugMode;
            return this;
        }
        hasActionButtons(): boolean {
            if ((this.positiveButtonText == undefined && this.negativeButtonText == undefined && this.neutralButtonText == undefined)) {
                return false;
            }
            else {
                return true;
            }
        }
        hasActionButton(which: WhichButton): boolean {
            let hasButton = false;
            switch (which) {
                case WhichButton.POSITIVE:
                    if (this.positiveButtonText !== undefined) {
                        hasButton = true;
                    }
                    break;
                case WhichButton.NEGATIVE:
                    if (this.negativeButtonText !== undefined) {
                        hasButton = true;
                    }
                    break;
                case WhichButton.NEUTRAL:
                    if (this.neutralButtonText !== undefined) {
                        hasButton = true;
                    }
                    break;
                default:
                    break;
            }
            return hasButton;
        }
        invalidateDividers(showTop: boolean, showBottom: boolean): Model {
            this.showTop = showTop;
            this.showBottom = showBottom;
            return this;
        }
        setActionButtonEnabled(which: WhichButton, enabled: boolean): Model {
            switch (which) {
                case WhichButton.POSITIVE:
                    this.isPositiveButtonEnabled = enabled;
                    break;
                case WhichButton.NEGATIVE:
                    this.isNegativeButtonEnabled = enabled;
                    break;
                case WhichButton.NEUTRAL:
                    this.isNeutralButtonEnabled = enabled;
                    break;
            }
            return this;
        }
        listItems(items: string[], selection: ItemListener | null = null, disabledIndices?: number[] | null, waitForPositiveButton?: boolean, listItemAttributeModel?: ListItemAttributeModel): Model {
            this.isListType = true;
            this.items = items;
            if (disabledIndices) {
                this.disabledIndices = disabledIndices;
            }
            if (waitForPositiveButton) {
                this.waitForPositiveButton = waitForPositiveButton;
            }
            this.itemListener = selection;
            if (listItemAttributeModel) {
                this.listItemAttributeModel = listItemAttributeModel;
            }
            else {
                this.listItemAttributeModel = new ListItemAttributeModel();
            }
            return this;
        }
        updateListItems(items: string[], disabledIndices: number[], selection: ItemListener): Model {
            this.items = items;
            this.disabledIndices = disabledIndices;
            this.itemListener = selection;
            return this;
        }
        listItemsMultiChoice(items: string[], disabledIndices: number[] | null, initialSelection: number[] = [], waitForPositiveButton: true, allowEmptySelection: boolean = false, selection: MultiChoiceListener, listItemAttributeModel?: ListItemAttributeModel): Model {
            this.multiChoiceListType = true;
            this.items = items;
            this.disabledIndices = disabledIndices;
            this.initialSelectionIndices = initialSelection;
            this.waitForPositiveButton = waitForPositiveButton;
            this.allowEmptySelection = allowEmptySelection;
            this.multiChoiceListener = selection;
            this.setActionButtonEnabled(WhichButton.POSITIVE, allowEmptySelection || initialSelection.length != 0);
            if (listItemAttributeModel) {
                this.listItemAttributeModel = listItemAttributeModel;
            }
            else {
                this.listItemAttributeModel = new ListItemAttributeModel();
            }
            return this;
        }
        updateListItemsMultiChoice(items: string[], disabledIndices: number[], selection: MultiChoiceListener): Model {
            this.items = items;
            this.disabledIndices = disabledIndices;
            this.multiChoiceListener = selection;
            return this;
        }
        toggleItemsChecked(indices: number[]): Model {
            if (indices == null || indices.length === 0) {
                return this;
            }
            // 删除共有的，合并其他的
            for (let index = 0; index < this.initialSelectionIndices.length; index++) {
                let initialSelectionIndex = this.initialSelectionIndices[index];
                for (let i = 0; i < indices.length; i++) {
                    let value = indices[i];
                    if (value === initialSelectionIndex) {
                        this.initialSelectionIndices.splice(this.initialSelectionIndices.indexOf(initialSelectionIndex), 1);
                        indices.splice(indices.indexOf(value), 1);
                    }
                }
            }
            this.initialSelectionIndices = this.initialSelectionIndices.concat(indices);
            return this;
        }
        checkAllItems(): Model {
            if (this.items !== null && this.items.length > 0) {
                this.initialSelectionIndices.splice(0, this.initialSelectionIndices.length);
                for (let index = 0; index < this.items.length; index++) {
                    this.initialSelectionIndices.push(index);
                }
            }
            return this;
        }
        uncheckAllItems(): Model {
            this.initialSelectionIndices.splice(0, this.initialSelectionIndices.length);
            return this;
        }
        toggleAllItemsChecked(): Model {
            if (this.items == null || this.items.length === 0) {
                return this;
            }
            let indices: number[] = [];
            for (let index = 0; index < this.items.length; index++) {
                indices.push(index);
            }
            // 删除共有的，合并其他的
            for (let index = 0; index < this.initialSelectionIndices.length; index++) {
                let initialSelectionIndex = this.initialSelectionIndices[index];
                for (let i = 0; i < indices.length; i++) {
                    let value = indices[i];
                    if (value === initialSelectionIndex) {
                        this.initialSelectionIndices.splice(this.initialSelectionIndices.indexOf(initialSelectionIndex), 1);
                        indices.splice(indices.indexOf(value), 1);
                    }
                }
            }
            this.initialSelectionIndices = this.initialSelectionIndices.concat(indices);
            return this;
        }
        checkItems(indices: number[]) {
            if (indices == null || indices.length === 0) {
                return this;
            }
            for (let index = 0; index < this.initialSelectionIndices.length; index++) {
                let initialSelectionIndex = this.initialSelectionIndices[index];
                for (let i = 0; i < indices.length; i++) {
                    let value = indices[i];
                    if (value === initialSelectionIndex) {
                        this.initialSelectionIndices.splice(this.initialSelectionIndices.indexOf(initialSelectionIndex), 1);
                    }
                }
            }
            this.initialSelectionIndices = this.initialSelectionIndices.concat(indices);
            return this;
        }
        uncheckItems(indices: number[]) {
            if (indices == null || indices.length === 0) {
                return this;
            }
            for (let index = 0; index < this.initialSelectionIndices.length; index++) {
                let initialSelectionIndex = this.initialSelectionIndices[index];
                for (let i = 0; i < indices.length; i++) {
                    let value = indices[i];
                    if (value === initialSelectionIndex) {
                        this.initialSelectionIndices.splice(this.initialSelectionIndices.indexOf(initialSelectionIndex), 1);
                    }
                }
            }
            return this;
        }
        listItemsSingleChoice(items: string[], initialSelection: number = -1, waitForPositiveButton: true, disabledIndices?: number[] | null, checkedColor: number = -1, uncheckedColor: number = -1, selection?: SingleChoiceListener, listItemAttributeModel?: ListItemAttributeModel): Model {
            this.singleChoiceListType = true;
            this.items = items;
            if (disabledIndices) {
                this.disabledIndices = disabledIndices;
            }
            this.initialSelection = initialSelection;
            this.waitForPositiveButton = waitForPositiveButton;
            this.checkedColor = checkedColor;
            this.uncheckedColor = uncheckedColor;
            if (selection) {
                this.singleChoiceListener = selection;
            }
            this.setActionButtonEnabled(WhichButton.POSITIVE, initialSelection > -1);
            if (listItemAttributeModel) {
                this.listItemAttributeModel = listItemAttributeModel;
            }
            else {
                this.listItemAttributeModel = new ListItemAttributeModel();
            }
            return this;
        }
        updateListItemsSingleChoice(items: string[], disabledIndices: number[], selection: SingleChoiceListener): Model {
            this.items = items;
            this.disabledIndices = disabledIndices;
            this.singleChoiceListener = selection;
            return this;
        }
        checkItem(index: number): Model {
            this.initialSelection = index;
            return this;
        }
        uncheckItem(index: number): Model {
            this.initialSelection = -1;
            return this;
        }
        toggleItemChecked(index: number): Model {
            if (this.initialSelection === index) {
                this.initialSelection = -1;
            }
            else {
                this.initialSelection = index;
            }
            return this;
        }
        isItemChecked(index: number): boolean {
            return this.initialSelection === index;
        }
        input(waitForPositiveButton: boolean = true, allowEmpty: boolean = false, callback: InputCallback | null, hint?: string, prefill?: string, maxLength: number = 0, inputLayoutAttributeModel?: InputLayoutAttributeModel): Model {
            this.waitForPositiveButton = waitForPositiveButton;
            this.allowEmpty = allowEmpty;
            this.isShowInput = true;
            if (hint) {
                this.hint = hint;
            }
            if (prefill) {
                this.prefill = prefill;
            }
            this.maxLength = maxLength;
            this.inputCallback = callback;
            if (!allowEmpty) {
                if (prefill == undefined) {
                    this.setActionButtonEnabled(WhichButton.POSITIVE, false);
                }
                else {
                    this.setActionButtonEnabled(WhichButton.POSITIVE, prefill.length !== 0);
                }
            }
            if (inputLayoutAttributeModel) {
                this.inputLayoutAttributeModel = inputLayoutAttributeModel;
            }
            else {
                this.inputLayoutAttributeModel = new InputLayoutAttributeModel();
            }
            return this;
        }
        colorChooser(colors: string[], subColors: string[][] | null, initialSelection: number, waitForPositiveButton: boolean = true, allowCustomArgb: boolean = false, showAlphaSelector: boolean = false, changeActionButtonsColor: boolean = false, selection?: ColorCallback, colorPickAttributeModel?: ColorPickAttributeModel): Model {
            this.isColorChooser = true;
            this.colors = colors;
            this.subColors = subColors;
            this.initialSelection = initialSelection;
            this.waitForPositiveButton = waitForPositiveButton;
            this.allowCustomArgb = allowCustomArgb;
            this.showAlphaSelector = showAlphaSelector;
            this.changeActionButtonsColor = changeActionButtonsColor;
            if (selection) {
                this.colorCallback = selection;
            }
            this.setActionButtonEnabled(WhichButton.POSITIVE, initialSelection > -1);
            if (colorPickAttributeModel) {
                this.colorPickAttributeModel = colorPickAttributeModel;
            }
            else {
                this.colorPickAttributeModel = new ColorPickAttributeModel();
            }
            return this;
        }
        timePicker(dividerColor: Color | number | string | Resource, callback: DateTimeCallback, dateTimeAttributeModel?: DateTimeAttributeModel): Model {
            this.isTimeType = true;
            this.dividerColor = dividerColor;
            this.dateTimeCallback = callback;
            if (dateTimeAttributeModel) {
                this.dateTimeAttributeModel = dateTimeAttributeModel;
            }
            else {
                this.dateTimeAttributeModel = new DateTimeAttributeModel();
            }
            return this;
        }
        datePicker(yearRangeStart: number, yearRangeEnd: number, defaultSelection: number[], dividerColor: Color | number | string | Resource, callback: DateTimeCallback, dateTimeAttributeModel?: DateTimeAttributeModel): Model {
            this.isDateType = true;
            this.yearRangeStart = yearRangeStart;
            this.yearRangeEnd = yearRangeEnd;
            this.defaultSelection = defaultSelection;
            this.dividerColor = dividerColor;
            this.dateTimeCallback = callback;
            if (dateTimeAttributeModel) {
                this.dateTimeAttributeModel = dateTimeAttributeModel;
            }
            else {
                this.dateTimeAttributeModel = new DateTimeAttributeModel();
            }
            return this;
        }
        dateTimePicker(yearRangeStart: number, yearRangeEnd: number, defaultSelection: number[], dividerColor: Color | number | string | Resource, callback: DateTimeCallback, dateTimeAttributeModel?: DateTimeAttributeModel): Model {
            this.isDateTimeType = true;
            this.yearRangeStart = yearRangeStart;
            this.yearRangeEnd = yearRangeEnd;
            this.defaultSelection = defaultSelection;
            this.dividerColor = dividerColor;
            this.dateTimeCallback = callback;
            if (dateTimeAttributeModel) {
                this.dateTimeAttributeModel = dateTimeAttributeModel;
            }
            else {
                this.dateTimeAttributeModel = new DateTimeAttributeModel();
            }
            return this;
        }
        reset(): Model {
            this.imagePath = undefined;
            this.titleContent = undefined;
            this.messageContent = undefined;
            this.messageLineHeight = -1;
            this.positiveButtonText = undefined;
            this.negativeButtonText = undefined;
            this.neutralButtonText = undefined;
            this.positiveClickCallback = null;
            this.negativeClickCallback = null;
            this.neutralClickCallback = null;
            this.isStacked = false;
            this.isCheckboxChecked = false;
            this.showTop = false;
            this.showBottom = false;
            this.height = undefined;
            this.checkboxText = undefined;
            this.onToggle = undefined;
            this.isDebugMode = false;
            this.singleChoiceListType = false;
            this.isListType = false;
            this.items = null;
            this.disabledIndices = null;
            this.allowEmptySelection = false;
            this.waitForPositiveButton = true;
            this.initialSelectionIndices = [];
            this.multiChoiceListener = null;
            this.multiChoiceListType = false;
            this.itemListener = null;
            this.initialSelection = -1;
            this.singleChoiceListener = null;
            this.checkedColor = -1;
            this.uncheckedColor = -1;
            this.isNeutralButtonEnabled = true;
            this.isNegativeButtonEnabled = true;
            this.isPositiveButtonEnabled = true;
            this.allowEmpty = false;
            this.isShowInput = false;
            this.hint = undefined;
            this.prefill = undefined;
            this.maxLength = 0;
            this.inputCallback = null;
            this.isColorChooser = false;
            this.colors = null;
            this.subColors = null;
            this.allowCustomArgb = false;
            this.showAlphaSelector = false;
            this.changeActionButtonsColor = false;
            this.colorCallback = null;
            this.isTimeType = false;
            this.isDateType = false;
            this.isDateTimeType = false;
            this.dividerColor = Color.Red;
            this.dateTimeCallback = null;
            this.defaultSelection = [];
            this.yearRangeStart = 2010;
            this.yearRangeEnd = 2030;
            this.calendarType = false;
            return this;
        }
    }
}
export default MaterialDialog;
