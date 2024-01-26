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
import DeviceAttribute from './DeviceAttritube';
class DeviceModelList {
    public static deviceModelList: Array<DeviceAttribute> = [
        new DeviceAttribute(0.42093, 6.9476, 0.54992, "3.0.0.44", "KOT49H", "LGE", true),
        new DeviceAttribute(0.42093, 6.9476, 0.54992, "3.0.0.44", "LPV79", "LGE", false),
        new DeviceAttribute(0.9401940951, 6.170094565, 0, "3.0.0.44", "LXG22.67-7.1", "XT1115", false),
        new DeviceAttribute(0.1862616782, 8.235367435, -0.45324519, "3.0.0.44", "MPE24.49-18", "Motorola", false)
    ];
    public static getAllModels(): Array<DeviceAttribute> {
        return DeviceModelList.deviceModelList;
    }
    public static addModel(device: DeviceAttribute) {
        DeviceModelList.deviceModelList.push(device);
    }
}
export default DeviceModelList;
