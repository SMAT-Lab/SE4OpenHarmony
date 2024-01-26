/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
declare namespace i2c_ctl {
  export class TemHum {
    /// @brief 摄氏度
    temperatureC: number;
    /// @brief 湿度
    humidity: number;
    /// @brief 华氏度
    temperatureF: number;
  }
  /// @brief 获取温湿度数据
  function getDataAsync(): Promise<TemHum>;
}

export default i2c_ctl;