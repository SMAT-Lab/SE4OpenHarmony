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
import Identifier from './Identifier';
class Region {
    private static readonly MAC_REGEXP: RegExp = new RegExp("^[0-9A-Fa-f]{2}\\:[0-9A-Fa-f]{2}\\:[0-9A-Fa-f]{2}\\:[0-9A-Fa-f]{2}\\:[0-9A-Fa-f]{2}\\:[0-9A-Fa-f]{2}$");
    protected readonly mIdentifiers: Array<Identifier>;
    protected readonly mBluetoothAddress: string;
    protected readonly mUniqueId: string;
    constructor(uniqueId: string, id1?: Identifier, id2?: Identifier, id3?: Identifier, identifiers?: Array<Identifier>, bluetoothAddress?: string) {
        if (uniqueId == null || uniqueId == '') {
            throw new Error("uniqueId may not be null");
        }
        else {
            this.mUniqueId = uniqueId;
        }
        if (identifiers == null || identifiers.length <= 0) {
            this.mIdentifiers = new Array<Identifier>();
            this.mIdentifiers.push(id1);
            this.mIdentifiers.push(id2);
            this.mIdentifiers.push(id3);
        }
        else {
            this.mIdentifiers = identifiers;
        }
        if (!!!bluetoothAddress) {
            this.validateMac(bluetoothAddress);
            this.mBluetoothAddress = bluetoothAddress;
        }
    }
    private validateMac(mac: string): void {
        if (mac != null) {
            if (!Region.MAC_REGEXP.test(mac)) {
                throw new Error("Invalid mac address: '" + mac + "' Must be 6 hex bytes separated by colons.");
            }
        }
    }
    /**
         * Convenience method to get the first identifier
         * @return
         */
    public getId1(): Identifier {
        return this.getIdentifier(0);
    }
    /**
       * Convenience method to get the second identifier
       * @return
       */
    public getId2(): Identifier {
        return this.getIdentifier(1);
    }
    /**
         * Convenience method to get the third identifier
         * @return
         */
    public getId3(): Identifier {
        return this.getIdentifier(2);
    }
    /**
         * Returns the 0-indexed identifier
         * Note:  IMPORTANT:  to get id1, you would call getIdentifier(0);
         * @param i
         * @return
         */
    public getIdentifier(i: number): Identifier {
        return this.mIdentifiers.length > i ? this.mIdentifiers[i] : null;
    }
    public getIdentifiers(): Array<Identifier> {
        return this.mIdentifiers;
    }
    /**
         * Returns the identifier used to start or stop ranging/monitoring this region when calling
         * the <code>BeaconManager</code> methods.
         * @return
         */
    public getUniqueId(): string {
        return this.mUniqueId;
    }
    /**
         * Returns the mac address used to filter for beacons
         */
    public getBluetoothAddress(): string {
        return this.mBluetoothAddress;
    }
    /**
         * Checks to see if an Beacon object is included in the matching criteria of this Region
         * @param beacon the beacon to check to see if it is in the Region
         * @return true if is covered
         */
    public matchesBeacon(beacon: Beacon): boolean {
        // All identifiers must match, or the corresponding region identifier must be null.
        for (let i: number = this.mIdentifiers.length; --i >= 0;) {
            const identifier: Identifier = this.mIdentifiers[i];
            let beaconIdentifier: Identifier = null;
            if (i < beacon.getIdentifiers().length) {
                beaconIdentifier = beacon.getIdentifier(i);
            }
            if ((beaconIdentifier == null && identifier != null) ||
                (beaconIdentifier != null && identifier != null && !identifier.equals(beaconIdentifier))) {
                return false;
            }
        }
        if (this.mBluetoothAddress != null && !this.mBluetoothAddress.localeCompare(beacon.getBluetoothAddress())) {
            return false;
        }
        return true;
    }
    public hasSameIdentifiers(region: Region): boolean {
        if (region.mIdentifiers.length == this.mIdentifiers.length) {
            for (let i: number = 0; i < region.mIdentifiers.length; i++) {
                if (region.getIdentifier(i) == null && this.getIdentifier(i) != null) {
                    return false;
                }
                else if (region.getIdentifier(i) != null && this.getIdentifier(i) == null) {
                    return false;
                }
                else if (!(region.getIdentifier(i) == null && this.getIdentifier(i) == null)) {
                    if (!region.getIdentifier(i).equals(this.getIdentifier(i))) {
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
        return true;
    }
    public equals(other: Object): boolean {
        if (other instanceof Region) {
            let otherRegion: Region = other;
            return otherRegion.mUniqueId == this.mUniqueId;
        }
        return false;
    }
}
export default Region;
