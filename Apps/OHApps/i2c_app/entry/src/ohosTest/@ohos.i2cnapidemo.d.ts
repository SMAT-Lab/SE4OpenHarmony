/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

/**
 * unionman a311d
 * @since 8
 * @devices phone, tablet
 * @import import i2cnapidemo from '@ohos.i2cnapidemo';
 * @permission N/A
 */

declare namespace i2cnapidemo {
    
    // 传感器软重启
    function SoftReset(): number;

    /**
     * 设置传感器测量模式
     * @param mps 取值为[0,3] 对应mps=0.5、1、2、4、10Hz
     * @param repeatability 取值为[0,2] 对应低刷新率、中刷新率、高刷新率
     */
    function ModeSet(mps: number, repeatability: number): number;

    // 读取温湿度数据
    function ReadData(): number;
    // 使用下列三个接口时必须先调用ReadData
    function ReadTemperatureC(): number;
    function ReadHumidity(): number;
    function ReadTemperatureF(): number;
}

export default i2cnapidemo;