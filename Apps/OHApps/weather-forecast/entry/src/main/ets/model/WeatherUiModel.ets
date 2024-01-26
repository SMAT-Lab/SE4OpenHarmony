/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 
 // 天气首页模型
export class WeatherUiModel {
  nowTemp; //当日气温
  nowWeatherText; //未来两小时   天气状况的文字描述，包括阴晴雨雪等天气状态的描述
  tempMax; //最高气温
  tempMin; //最低气温
  category; //空气质量
  precip; //降雨量，大于0有雨
  hourlyTemp: { temp }[]; //小时温度
  iconDays: { iconDay }[]; //每日天气状况图标
  date; //日期
  day; //星期
  dayArr: string[]; //星期数组
  hoursArr: string[]; //时间数组
}