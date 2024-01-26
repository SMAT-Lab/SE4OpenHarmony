let __generate__Id: number = 0;
function generateId(): string {
    return "Weather_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default class Weather {
    reason = "";
    result: Result = new Result();
    error_code: number = -1;
}
class Result {
    city: string = "";
    realtime: Realtime = new Realtime();
    future: Array<Future> = new Array<Future>();
}
class Realtime {
    temperature: string = "";
    humidity: string = "";
    info: string = "";
    wid: string = "";
    direct: string = "";
    power: string = "";
    aqi: string = "";
}
class Future {
    date: string = "";
    temperature: string = "";
    weather: string = "";
    wid: Wid = new Wid();
    direct: string = '';
}
class Wid {
    day: string = '';
    night: string = '';
}
