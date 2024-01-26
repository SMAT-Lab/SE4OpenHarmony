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

// 实时天气数据模型
export class NowWeatherModel {
  code; //API状态码
  updateTime; //当前API的最近更新时间
  fxLink; //当前API的最近更新时间
  now: {
    obsTime; //数据观测时间
    temp; //温度，默认单位：摄氏度
    feelsLike; // 体感温度，默认单位：摄氏度
    icon; //天气状况和图标的代码，图标可通过天气状况和图标下载
    text; //天气状况的文字描述，包括阴晴雨雪等天气状态的描述
    wind360; //风向360角度
    windDir; //风向
    windScale; //风力等级
    windSpeed; // 风速，公里/小时
    humidity; //相对湿度，百分比数值
    precip; //当前小时累计降水量，默认单位：毫米
    pressure; //大气压强，默认单位：百帕
    vis; //能见度，默认单位：公里
    cloud; //云量，百分比数值。可能为空
    dew; //露点温度。可能为空
  };
  refer: {
    sources: []; //原始数据来源，或数据源说明，可能为空
    license: []; //数据许可或版权声明，可能为空
  };
}

//7日天气天气数据模型
export class Weather7dModel {
  code; //API状态码
  updateTime; //当前API的最近更新时间
  fxLink; //当前数据的响应式页面
  daily: [
    {
      fxDate; // 预报日期
      sunrise; // 日出时间，在高纬度地区可能为空
      sunset; // 日落时间，在高纬度地区可能为空
      moonrise; // 当天月升时间，可能为空
      moonset; //当天月落时间，可能为空
      moonPhase; //月相名称
      moonPhaseIcon; //月相图标代码
      tempMax; // 预报当天最高温度
      tempMin; //预报当天最低温度
      iconDay; // 预报白天天气状况的图标代码
      textDay; //预报白天天气状况文字描述
      iconNight; //预报夜间天气状况的图标代码
      textNight; //预报晚间天气状况文字描述
      wind360Day; // 预报白天风向360角度
      windDirDay; //预报白天风向
      windScaleDay; //预报白天风力等级
      windSpeedDay; //预报白天风速，公里/小时
      wind360Night; //预报夜间风向360角度
      windDirNight; //预报夜间当天风向
      windScaleNight; //预报夜间风力等级
      windSpeedNight; //预报夜间风速，公里/小时
      humidity; //相对湿度，百分比数值
      precip; //预报当天总降水量，默认单位：毫米
      pressure; //大气压强，默认单位：百帕
      vis; // 能见度，默认单位：公里
      cloud; // 能见度，默认单位：公里
      uvIndex; //紫外线强度指数
    }
  ];
  refer: {
    sources: []; //原始数据来源，或数据源说明，可能为空
    license: [] // 数据许可或版权声明，可能为空
  }
}

//24小时天气预报
export class Weather24hModel {
  code; //API状态码
  updateTime; //当前当前数据的响应式页面，便于嵌入网站或应用API的最近更新时间
  fxLink ; //
  hourly: [
    {
      fxTime; //预报时间
      temp; //温度，默认单位：摄氏度
      icon; //天气状况和图标的代码
      text; //天气状况的文字描述
      wind360; //风向360角度
      windDir; //风向
      windScale; //风力等级
      windSpeed; //风速，公里/小时
      humidity; //相对湿度，百分比数值
      pop; //逐小时预报降水概率，百分比数值，可能为空
      precip; //当前小时累计降水量，默认单位：毫米
      pressure; //大气压强，默认单位：百帕
      cloud; // 云量，百分比数值。可能为空
      dew //露点温度。可能为空
    }
  ];
  refer: {
    sources: []; //原始数据来源，或数据源说明，可能为空
    license: [] //数据许可或版权声明，可能为空
  }
}