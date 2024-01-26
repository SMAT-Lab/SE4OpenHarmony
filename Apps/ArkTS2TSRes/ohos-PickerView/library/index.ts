let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
export { DividerType, DateType } from './src/main/ets/components/common/Constant';
export { initializeProvinceOnStartup, Province, CityAndArea } from './src/main/ets/components/common/Province';
export { showToast, setTimeOut } from './src/main/ets/components/common/ShowToast';
export { initializeSolarCalendar, SolarCalendar, MonthAndDay } from './src/main/ets/components/common/SolarCalendar';
export { initializeLunarCalendar, LunarCalendar, LunarMonthAndDay } from './src/main/ets/components/common/LunarCalendar';
export { initializeCardData, CardBean } from './src/main/ets/components/common/CardModel';
export { initializeCustomizePickerDataOnStartup, CustomizePickerBean, SecondAndThirdArray } from './src/main/ets/components/common/CustomizePickerModel';
export { initializeHourAndSecondAndMinute, HourAndSecondAndMinute } from './src/main/ets/components/common/HourSecondMinuteModel';
export { default as AreaDataPickerViewLib } from './src/main/ets/components/common/AreaDataPickerViewLib';
export { default as ShowTimePickerViewLib } from './src/main/ets/components/common/ShowTimePickerViewLib';
export { default as CircleDividerViewLib } from './src/main/ets/components/common/CircleDividerViewLib';
export { default as CardPickerComponent } from './src/main/ets/components/common/CardPickerComponent';
export { default as TimePickerComponent } from './src/main/ets/components/common/TimePickerComponent';
export { default as YearReachSecondComponent } from './src/main/ets/components/common/YearReachSecondComponent';
export { default as HourSecondMinuteComponent } from './src/main/ets/components/common/HourSecondMinuteComponent';
export { CityPickerComponent } from './src/main/ets/components/common/CityPickerComponent';
export { default as CityPickerComponentEntity } from './src/main/ets/components/common/CityPickerComponent';
export { default as CustomizePickerComponent } from './src/main/ets/components/common/CustomizePickerComponent';
