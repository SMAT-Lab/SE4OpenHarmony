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
import BeaconDataNotifier from './BeaconDataNotifier';
interface BeaconData {
    getLatitude(): number;
    setLatitude(latitude: number): void;
    setLongitude(longitude: number): void;
    getLongitude(): number;
    get(key: string): string;
    set(key: string, value: string): void;
    sync(notifier: BeaconDataNotifier): void;
    isDirty(): boolean;
}
export default BeaconData;
