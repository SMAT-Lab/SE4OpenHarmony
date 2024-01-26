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
import Beacon from './Beacon';
import AltBeacon from './AltBeacon';
import BeaconParser from './BeaconParser';
class AltBeaconParser extends BeaconParser {
    /**
         * Constructs an AltBeacon Parser and sets its layout
         */
    constructor() {
        super();
        super.mHardwareAssistManufacturers = [0x0118];
        super.setBeaconLayout(BeaconParser.ALTBEACON_LAYOUT);
        super.mIdentifier = "altbeacon";
    }
    public fromScanData(scanData: ArrayBuffer, rssi: number, deviceId: string, timestampMs: number): Beacon {
        return super.fromScanData(scanData, rssi, deviceId, timestampMs, new AltBeacon());
    }
}
export default AltBeaconParser;
