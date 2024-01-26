let __generate__Id: number = 0;
function generateId(): string {
    return "WeatherApi_" + ++__generate__Id;
}
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
import http from '@ohos.net.http';
const key = 'a546dd6657824b6882ec461255642293';
// 实时天气
export function getNowWeather(location: number): Promise<http.HttpResponse> {
    // 每一个httpRequest对应一个HTTP请求任务，不可复用
    let httpRequest = http.createHttp();
    return httpRequest.request(
    // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
    "https://devapi.qweather.com/v7/weather/now?location=" + location + "&key=" + key, {
        method: http.RequestMethod.GET,
        expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
    });
}
// 7日天气
export function get7dWeather(location: number): Promise<http.HttpResponse> {
    // 每一个httpRequest对应一个HTTP请求任务，不可复用
    let httpRequest = http.createHttp();
    return httpRequest.request(
    // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
    "https://devapi.qweather.com/v7/weather/7d?location=" + location + "&key=" + key, {
        method: http.RequestMethod.GET,
        expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
    });
}
// 24小时天气预报
export function get24hWeather(location: number): Promise<http.HttpResponse> {
    // 每一个httpRequest对应一个HTTP请求任务，不可复用
    let httpRequest = http.createHttp();
    return httpRequest.request(
    // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
    "https://devapi.qweather.com/v7/weather/24h?location=" + location + "&key=" + key, {
        method: http.RequestMethod.GET,
        expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
    });
}
