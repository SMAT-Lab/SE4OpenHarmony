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
import DataProviderException from './client/DataProviderException';
import BeaconData from './BeaconData';
import Beacon from './Beacon';
interface BeaconDataNotifier {
    /**
       * This method is called after a request to get or sync beacon data
       * If fetching data was successful, the data is returned and the exception is null.
       * If fetching of the data is not successful, an exception is provided.
       * @param beacon
       * @param data
       * @param exception
       */
    beaconDataUpdate(beacon: Beacon, data: BeaconData, exception: DataProviderException): void;
}
export default BeaconDataNotifier;
