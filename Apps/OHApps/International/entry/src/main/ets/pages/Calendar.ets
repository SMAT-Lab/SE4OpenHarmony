/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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


import I18n from '@ohos.i18n';
import TitleBar from '../component/TitleBar';

const WEEK_TITLE = [$r('app.string.monday'), $r('app.string.tuesday'), $r('app.string.wednesday'),
$r('app.string.thursday'), $r('app.string.friday'), $r('app.string.saturday'),
$r('app.string.sunday')];

interface Day {
  isCurrentMonth: boolean,
  isToday: boolean,
  date: number
};

@Entry
@Component
struct CalendarView {
  @State currentYear: number = 0;
  @State @Watch('refreshData') currentMonth: number = 0;
  @State daysData: Day[] = [];
  private calendar = I18n.getCalendar('en-US');
  private toDayY: number = this.calendar.get('year');
  private toDayM: number = this.calendar.get('month');
  private toDayD: number = this.calendar.get('date');

  refreshData() {
    this.daysData = [];
    this.calendar.set(this.currentYear, this.currentMonth, 1);
    let currentMonthStartWeek = this.calendar.get('day_of_week');
    let currentMonthJulianDay = this.calendar.get('julian_day');
    let preYear = this.currentMonth - 1 >= 0 ? this.currentYear : this.currentYear - 1;
    let preMonth = this.currentMonth - 1 >= 0 ? this.currentMonth - 1 : 11;
    this.calendar.set(preYear, preMonth, 1);
    let preMonthJulianDay = this.calendar.get('julian_day');
    let nextYear = this.currentMonth + 1 < 12 ? this.currentYear : this.currentYear + 1;
    let nextMonth = this.currentMonth + 1 < 12 ? this.currentMonth + 1 : 0;
    this.calendar.set(nextYear, nextMonth, 1);
    let nextMonthJulianDay = this.calendar.get('julian_day');
    let preMonthDays = currentMonthJulianDay - preMonthJulianDay;
    let currentMonthDays = nextMonthJulianDay - currentMonthJulianDay;
    this.calendar.set(this.currentYear, this.currentMonth, currentMonthDays);
    let currentMonthEndWeek = this.calendar.get('day_of_week');
    for (let index = preMonthDays - ((currentMonthStartWeek + 5) % 7) + 1; index <= preMonthDays; index++) {
      this.daysData.push({
        isCurrentMonth: false,
        isToday: false,
        date: index
      })
    }
    for (let index = 1; index <= currentMonthDays; index++) {
      this.daysData.push({
        isCurrentMonth: true,
        isToday: this.toDayY === this.currentYear && this.toDayM === this.currentMonth && index === this.toDayD,
        date: index
      })
    }
    for (let index = 1; index <= (8 - currentMonthEndWeek) % 7; index++) {
      this.daysData.push({
        isCurrentMonth: false,
        isToday: false,
        date: index
      })
    }
  }

  aboutToAppear() {
    this.currentYear = this.toDayY;
    this.currentMonth = this.toDayM;
  }

  build() {
    Column() {
      TitleBar({ hasBackPress: true, title: $r('app.string.calendar') })
      Title({
        currentYear: $currentYear,
        currentMonth: $currentMonth,
        goToday: () => {
          if (this.currentYear === this.toDayY && this.currentMonth === this.toDayM) {
            return;
          }
          this.currentYear = this.toDayY;
          this.currentMonth = this.toDayM;
        }
      })

      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(WEEK_TITLE, (item: Resource, index) => {
          Flex({ justifyContent: FlexAlign.SpaceBetween }) {
            ForEach(this.daysData.slice(index * WEEK_TITLE.length, (index + 1) * WEEK_TITLE.length), (day: Day) => {
              Text(`${day.date}`)
                .height(24)
                .width(24)
                .textAlign(TextAlign.Center)
                .fontSize(14)
                .fontColor(day.isToday ? Color.White : Color.Black)
                .backgroundColor(day.isToday ? Color.Blue : '')
                .borderRadius(20)
                .opacity(day.isCurrentMonth ? 1.0 : 0.2)
            })
          }
          .width('100%')
          .margin({ top: 16 })
        })
      }
      .padding({ left: 24, right: 24 })
      .width('100%')
    }
    .backgroundColor(Color.White)
  }
}


@Component
struct Title {
  @Link currentYear: number;
  @Link currentMonth: number;
  private goToday: () => void = (): void =>{}

  build() {
    Column() {
      Row() {
        Row() {
          Image($r('app.media.ic_public_small_left'))
            .id('pre_month')
            .height(24)
            .width(12)
        }
        .margin({ left: 5 })
        .height('100%')
        .aspectRatio(1)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          this.currentYear = this.currentMonth - 1 >= 0 ? this.currentYear : this.currentYear - 1;
          this.currentMonth = this.currentMonth - 1 >= 0 ? this.currentMonth - 1 : 11;
        })

        Text(`${this.currentYear}-${this.currentMonth + 1 >= 10 ? '' : '0'}${this.currentMonth + 1}`)
          .fontSize(16)
          .fontColor(Color.Black)
        Row() {
          Image($r('app.media.ic_public_small_right'))
            .id('next_month')
            .height(24)
            .width(12)
        }
        .height('100%')
        .aspectRatio(1)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          this.currentYear = this.currentMonth + 1 < 12 ? this.currentYear : this.currentYear + 1;
          this.currentMonth = this.currentMonth + 1 < 12 ? this.currentMonth + 1 : 0;
        })

        Blank()
        Row() {
          Text($r('app.string.today'))
            .id('today')
            .fontColor(Color.Blue)
            .fontSize(16)
            .padding({ right: 24 })
        }
        .height('100%')
        .aspectRatio(1)
        .onClick(() => {
          this.goToday()
        })
      }
      .width('100%')
      .height(56)

      Flex({ justifyContent: FlexAlign.SpaceBetween }) {
        ForEach(WEEK_TITLE, (str: Resource) => {
          Text(str)
            .fontSize(14)
            .fontColor(Color.Black)
            .opacity(0.5)
            .height(24)
            .width(24)
            .textAlign(TextAlign.Center)
        })
      }
      .width('100%')
      .padding({ left: 24, right: 24 })
    }
  }
}