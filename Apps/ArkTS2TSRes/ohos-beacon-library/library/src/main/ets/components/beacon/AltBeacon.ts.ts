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
class AltBeacon extends Beacon {
    /**
         * Copy constructor from base class
         * @param beacon
         */
    constructor(beacon?: Beacon) {
        super(beacon);
        if (beacon != null) {
            return;
        }
    }
    /**
         * Returns a field with a value from 0-255 that can be used for the purposes specified by the
         * manufacturer.  The manufacturer specifications for the beacon should be checked before using
         * this field, and the manufacturer should be checked against the Beacon#mManufacturer
         * field
         * @return mfgReserved
         */
    public getMfgReserved(): number {
        return super.mDataFields[0];
    }
    /**
         * Required for making object Parcelable
         * @return
         */
    public describeContents(): number {
        return 0;
    }
    /**
         * Builder class for AltBeacon objects. Provides a convenient way to set the various fields of a
         * Beacon
         *
         */
    static Builder = class extends Beacon.Builder {
        public build(): Beacon {
            return new AltBeacon(super.build());
        }
        public setMfgReserved(mfgReserved: number): this {
            if (super.mBeacon.mDataFields.length != 0) {
                super.mBeacon.mDataFields = new Array<number>();
            }
            super.mBeacon.mDataFields.push(mfgReserved);
            return this;
        }
    };
}
export default AltBeacon;
