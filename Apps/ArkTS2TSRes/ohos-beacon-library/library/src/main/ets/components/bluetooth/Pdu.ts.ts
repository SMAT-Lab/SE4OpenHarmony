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
class Pdu {
    private static TAG: string = "Pdu";
    public static MANUFACTURER_DATA_PDU_TYPE: number = -1; //0xff
    public static GATT_SERVICE_UUID_PDU_TYPE: number = 22; //0x16
    public static GATT_SERVICE_UUID_128_BIT_PDU_TYPE: number = 33; //0x21
    private mType: number;
    private mDeclaredLength: number;
    private mStartIndex: number;
    private mEndIndex: number;
    private mBytes: Array<number>;
    public static parse(bytes: Array<number>, startIndex: number): Pdu {
        let pdu: Pdu = null;
        if (bytes.length - startIndex >= 2) {
            let length: number = bytes[startIndex];
            if (length > 0) {
                let typeNumber: number = bytes[startIndex + 1];
                let firstIndex: number = startIndex + 2;
                if (firstIndex < bytes.length) {
                    pdu = new Pdu();
                    // The End index is the startIndex + the length, because the first byte is the
                    // length field and the length field does not include the length field itself in
                    // the count
                    pdu.mEndIndex = startIndex + length;
                    if (pdu.mEndIndex >= bytes.length) {
                        pdu.mEndIndex = bytes.length - 1;
                    }
                    pdu.mType = typeNumber;
                    pdu.mDeclaredLength = length;
                    pdu.mStartIndex = firstIndex;
                    pdu.mBytes = bytes;
                }
            }
        }
        return pdu;
    }
    /**
         * PDU type field
         * @return
         */
    public getType(): number {
        return this.mType;
    }
    /**
         * PDU length from header
         * @return
         */
    public getDeclaredLength(): number {
        return this.mDeclaredLength;
    }
    /**
         * Actual PDU length (may be less than declared length if fewer bytes are actually available.)
         * @return
         */
    public getActualLength(): number {
        return this.mEndIndex - this.mStartIndex + 1;
    }
    /**
         * Start index within byte buffer of PDU
         * This is the start of the payload data that starts after the length and the type, so the PDU
         * actually starts two bytes earlier
         * @return
         */
    public getStartIndex(): number {
        return this.mStartIndex;
    }
    /**
         * End index within byte buffer of PDU
         * @return
         */
    public getEndIndex(): number {
        return this.mEndIndex;
    }
}
export default Pdu;
