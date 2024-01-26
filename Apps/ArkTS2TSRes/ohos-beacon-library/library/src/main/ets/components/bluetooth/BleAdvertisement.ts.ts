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
import Pdu from './Pdu';
/**
 * Parses a byte array representing a BLE advertisement into
 * a number of "Payload Data Units" (PDUs).
 *
 */
export default class BleAdvertisement {
    private mPdus: Array<Pdu>;
    private mBytes: Array<number>;
    public constructor(bytes: Array<number>) {
        this.mBytes = bytes;
        let pdus: Array<Pdu> = new Array<Pdu>();
        // Get PDUs from the main advert
        this.parsePdus(0, bytes.length < 31 ? bytes.length : 31, pdus);
        // Get PDUs from the scan response
        if (bytes.length > 31) {
            this.parsePdus(31, bytes.length, pdus);
        }
        this.mPdus = pdus;
    }
    private parsePdus(startIndex: number, endIndex: number, pdus: Array<Pdu>): void {
        let index: number = startIndex;
        let pdu: Pdu = null;
        do {
            pdu = Pdu.parse(this.mBytes, index);
            if (pdu != null) {
                index = index + pdu.getDeclaredLength() + 1;
                pdus.push(pdu);
            }
        } while (pdu != null && index < endIndex);
    }
    /**
       * The list of PDUs inside the advertisement
       * @return
       */
    public getPdus(): Array<Pdu> {
        return this.mPdus;
    }
}
