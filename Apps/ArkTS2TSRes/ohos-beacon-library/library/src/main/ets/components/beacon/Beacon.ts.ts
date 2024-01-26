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
import NullBeaconDataFactory from './client/NullBeaconDataFactory';
import BeaconDataFactory from './client/BeaconDataFactory';
import DistanceCalculator from './distance/DistanceCalculator';
import Identifier from './Identifier';
class Beacon {
    private static readonly UNMODIFIABLE_LIST_OF_NUMBER: Array<number>;
    private static readonly UNMODIFIABLE_LIST_OF_IDENTIFIER: Array<Identifier>;
    /**
       * Determines whether a the bluetoothAddress (mac address) must be the same for two Beacons
       * to be configured equal.
       */
    public static sHardwareEqualityEnforced: boolean = false;
    public static sDistanceCalculator: DistanceCalculator = null;
    /**
       * The a list of the multi-part identifiers of the beacon.  Together, these identifiers signify
       * a unique beacon.  The identifiers are ordered by significance for the purpose of grouping
       * beacons
       */
    public mIdentifiers: Array<Identifier>;
    /**
       * A list of generic non-identifying data fields included in the beacon advertisement.  Data
       * fields are limited to the size of a Java long, or six bytes.
       */
    public mDataFields: Array<number>;
    /**
       * A list of generic non-identifying data fields included in a secondary beacon advertisement
       * and merged into this beacon.  Data fields are limited to the size of a Java long, or six
       * bytes.
       */
    public mExtraDataFields: Array<number>;
    /**
       * A double that is an estimate of how far the Beacon is away in meters.   Note that this number
       * fluctuates quite a bit with RSSI, so despite the name, it is not super accurate.
       */
    public mDistance: number;
    /**
       * The measured signal strength of the Bluetooth packet that led do this Beacon detection.
       */
    public mRssi: number;
    /**
       * The calibrated measured Tx power of the Beacon in RSSI
       * This value is baked into an Beacon when it is manufactured, and
       * it is transmitted with each packet to aid in the mDistance estimate
       */
    public mTxPower: number;
    /**
       * The Bluetooth mac address
       */
    public mBluetoothAddress: string;
    /**
       * The number of rssi samples available, if known
       */
    private mRssiMeasurementCount: number = 0;
    /**
       * The number of packets detected in the last cycle
       */
    private mPacketCount: number = 0;
    /**
       * If multiple RSSI samples were available, this is the running average
       */
    private mRunningAverageRssi: number = null;
    /**
       * Used to attach data to individual Beacons, either locally or in the cloud
       */
    public static beaconDataFactory: BeaconDataFactory = new NullBeaconDataFactory();
    /**
       * The two byte value indicating the type of beacon that this is, which is used for figuring
       * out the byte layout of the beacon advertisement
       */
    public mBeaconTypeCode: number;
    /**
       * A two byte code indicating the beacon manufacturer.  A list of registered manufacturer codes
       * may be found here:
       * https://www.bluetooth.org/en-us/specification/assigned-numbers/company-identifiers
       *
       * If the beacon is a GATT-based beacon, this field will be set to -1
       */
    public mManufacturer: number;
    /**
       * A 32 bit service uuid for the beacon
       *
       * This is valid only for GATT-based beacons.   If the beacon is a manufacturer data-based
       * beacon, this field will be -1
       */
    public mServiceUuid: number = -1;
    /**
       * A 128 bit service uuid for the beacon
       *
       * This is valid only for GATT-based beacons.   If the beacon is a manufacturer data-based
       * beacon, this field will be -1
       */
    public mServiceUuid128Bit: Array<number> = [];
    /**
       * The Bluetooth device name.  This is a field transmitted by the remote beacon device separate
       * from the advertisement data
       */
    public mBluetoothName: string;
    /**
       * The identifier of the beaconParser used to create this beacon.  Useful for figuring out
       * beacon types.
       */
    public mParserIdentifier: string;
    /**
       * An indicator marking this beacon as a potential multi frame beacon.
       *
       * This will be set to true if the beacon was parsed by a BeaconParser which has extra
       * data parsers defined.
       */
    public mMultiFrameBeacon: boolean = false;
    /**
       * The timestamp of the first packet detected in milliseconds.
       */
    public mFirstCycleDetectionTimestamp: number = 0;
    /**
       * The timestamp of the last packet detected in milliseconds.
       */
    public mLastCycleDetectionTimestamp: number = 0;
    /**
       * Sets the DistanceCalculator to use with this beacon
       * @param dc
       */
    public static setDistanceCalculator(dc: DistanceCalculator): void {
        this.sDistanceCalculator = dc;
    }
    /**
       * Gets the DistanceCalculator to use with this beacon
       */
    public static getDistanceCalculator(): DistanceCalculator {
        return this.sDistanceCalculator;
    }
    /**
       * Configures whether a the bluetoothAddress (mac address) must be the same for two Beacons
       * to be configured equal.  This setting applies to all beacon instances in the same process.
       * Defaults to false for backward compatibility.
       *
       * @param e
       */
    public static setHardwareEqualityEnforced(e: boolean): void {
        this.sHardwareEqualityEnforced = e;
    }
    public static getHardwareEqualityEnforced(): boolean {
        return this.sHardwareEqualityEnforced;
    }
    public constructor(otherBeacon?: Beacon) {
        this.mIdentifiers = new Array<Identifier>(1);
        this.mDataFields = new Array<number>(1);
        this.mExtraDataFields = new Array<number>(1);
        if (otherBeacon != null) {
            this.mIdentifiers = otherBeacon.mIdentifiers;
            this.mDataFields = otherBeacon.mDataFields;
            this.mExtraDataFields = otherBeacon.mExtraDataFields;
            this.mDistance = otherBeacon.mDistance;
            this.mRunningAverageRssi = otherBeacon.mRunningAverageRssi;
            this.mPacketCount = otherBeacon.mPacketCount;
            this.mRssiMeasurementCount = otherBeacon.mRssiMeasurementCount;
            this.mRssi = otherBeacon.mRssi;
            this.mTxPower = otherBeacon.mTxPower;
            this.mBluetoothAddress = otherBeacon.mBluetoothAddress;
            this.mBeaconTypeCode = otherBeacon.getBeaconTypeCode();
            this.mServiceUuid = otherBeacon.getServiceUuid();
            this.mServiceUuid128Bit = otherBeacon.getServiceUuid128Bit();
            this.mBluetoothName = otherBeacon.mBluetoothName;
            this.mParserIdentifier = otherBeacon.mParserIdentifier;
            this.mMultiFrameBeacon = otherBeacon.mMultiFrameBeacon;
            this.mManufacturer = otherBeacon.mManufacturer;
            this.mFirstCycleDetectionTimestamp = otherBeacon.mFirstCycleDetectionTimestamp;
            this.mLastCycleDetectionTimestamp = otherBeacon.mLastCycleDetectionTimestamp;
        }
    }
    /**
       * @see #mBeaconTypeCode
       * @return beaconTypeCode
       */
    public getBeaconTypeCode(): number {
        return this.mBeaconTypeCode;
    }
    /**
       * @see #mServiceUuid
       */
    public getServiceUuid(): number {
        return this.mServiceUuid;
    }
    public getServiceUuid128Bit(): Array<number> {
        return this.mServiceUuid128Bit;
    }
    /**
       * Sets the measurement count that went into the rssi sample
       * @param rssiMeasurementCount
       */
    public setRssiMeasurementCount(rssiMeasurementCount: number): void {
        this.mRssiMeasurementCount = rssiMeasurementCount;
    }
    /**
       * Returns the number of packet detections in the last ranging cycle
       */
    public getPacketCount(): number {
        return this.mPacketCount;
    }
    /**
       * Sets the packet detections in the last ranging cycle
       * @param packetCount
       */
    public setPacketCount(packetCount: number): void {
        this.mPacketCount = packetCount;
    }
    /**
       * Returns the timestamp of the first packet detected
       */
    public getFirstCycleDetectionTimestamp(): number {
        return this.mFirstCycleDetectionTimestamp;
    }
    /**
       * Sets the timestamp of the first packet detected
       *
       * @param firstCycleDetectionTimestamp
       */
    public setFirstCycleDetectionTimestamp(firstCycleDetectionTimestamp: number): void {
        this.mFirstCycleDetectionTimestamp = firstCycleDetectionTimestamp;
    }
    /**
       * Returns the timestamp of the last packet detected
       */
    public getLastCycleDetectionTimestamp(): number {
        return this.mLastCycleDetectionTimestamp;
    }
    /**
       * Sets the timestamp of the last packet detected
       *
       * @param lastCycleDetectionTimestamp
       */
    public setLastCycleDetectionTimestamp(lastCycleDetectionTimestamp: number): void {
        this.mLastCycleDetectionTimestamp = lastCycleDetectionTimestamp;
    }
    /**
       * Returns the number of packet detections that went in to the runningAverageRssi, if known.
       * If not known or inapplicable for the rssi filter used, this is zero.
       */
    public getMeasurementCount(): number {
        return this.mRssiMeasurementCount;
    }
    /**
       * Sets the running average rssi for use in distance calculations
       * @param rssi the running average rssi
       */
    public setRunningAverageRssi(rssi: number): void {
        this.mRunningAverageRssi = rssi;
        this.mDistance = null; // force calculation of accuracy and proximity next time they are requested
    }
    /**
       * @deprecated To be removed in a future release. Use
       * {@link org.altbeacon.beacon.Beacon#getRunningAverageRssi()}
       * instead.
       *
       * @Deprecated
       *
       */
    public getRunningAverageRssiByRssi(rssi: number): number {
        return this.mRunningAverageRssi = rssi;
    }
    /**
       * Returns the running average rssi
       * @return number
       */
    public getRunningAverageRssi(): number {
        if (this.mRunningAverageRssi != null) {
            return this.mRunningAverageRssi;
        }
        return this.mRssi;
    }
    /**
       * Sets the most recently measured rssi for use in distance calculations if a running average is
       * not available
       * @param rssi
       */
    public setRssi(rssi: number): void {
        this.mRssi = rssi;
    }
    /**
       * @see #mManufacturer
       */
    public getManufacturer(): number {
        return this.mManufacturer;
    }
    /**
       * Returns the specified identifier - 0 indexed
       * Note:  to read id1, call getIdentifier(0);
       * @return identifier
       */
    public getIdentifier(i: number): Identifier {
        return this.mIdentifiers[i];
    }
    /**
       * Convenience method to get the first identifier
       * @return
       */
    public getId1(): Identifier {
        return this.mIdentifiers[0];
    }
    /**
       * Convenience method to get the second identifier
       * @return
       */
    public getId2(): Identifier {
        return this.mIdentifiers[1];
    }
    /**
       * Convenience method to get the third identifier
       * @return
       */
    public getId3(): Identifier {
        return this.mIdentifiers[2];
    }
    /**
       * Returns the list of data fields transmitted with the advertisement
       * @return dataFields
       */
    public getDataFields(): Array<number> {
        return this.mDataFields;
    }
    /**
       * Returns the list of data fields transmitted with the advertisement
       * @return dataFields
       */
    public getExtraDataFields(): Array<number> {
        return this.mExtraDataFields;
    }
    /**
       * Sets extra data fields
       * @param fields
       */
    public setExtraDataFields(fields: Array<number>): void {
        this.mExtraDataFields = fields;
    }
    /**
       * Returns the list of identifiers transmitted with the advertisement
       * @return identifier
       */
    public getIdentifiers(): Array<Identifier> {
        return this.mIdentifiers;
    }
    /**
       * Provides a calculated estimate of the distance to the beacon based on a running average of
       * the RSSI and the transmitted power calibration value included in the beacon advertisement.
       * This value is specific to the type of device receiving the transmission.
       *
       * @see #mDistance
       * @return distance
       */
    public getDistance(): number {
        if (this.mDistance == null) {
            let bestRssiAvailable: number = this.mRssi;
            if (this.mRunningAverageRssi != null) {
                bestRssiAvailable = this.mRunningAverageRssi;
            }
            this.mDistance = Beacon.calculateDistance(this.mTxPower, bestRssiAvailable);
        }
        return this.mDistance;
    }
    /**
       * @see #mRssi
       * @return mRssi
       */
    public getRssi(): number {
        return this.mRssi;
    }
    /**
       * @see #mTxPower
       */
    public getTxPower(): number {
        return this.mTxPower;
    }
    /**
       * @see #mBluetoothAddress
       * @return mBluetoothAddress
       */
    public getBluetoothAddress(): string {
        return this.mBluetoothAddress;
    }
    /**
       * This returns the bluetooth name of the device if detected by the OS
       * from the advertisement data.
       * @see #mBluetoothName
       * @return mBluetoothName
       */
    public getBluetoothName(): string {
        return this.mBluetoothName;
    }
    /**
       * @see #mParserIdentifier
       * @return mParserIdentifier
       */
    public getParserIdentifier(): string {
        return this.mParserIdentifier;
    }
    public requestData(notifier: BeaconDataNotifier): void {
        Beacon.beaconDataFactory.requestBeaconData(this, notifier);
    }
    /**
       * @see #mMultiFrameBeacon
       * @return mMultiFrameBeacon
       */
    public isMultiFrameBeacon(): boolean {
        return this.mMultiFrameBeacon;
    }
    /**
       * Indicates whether this beacon is an "Extra data beacon," meaning one that has no identifiers
       * but has data fields.
       * @return
       */
    public isExtraBeaconData(): boolean {
        return this.mIdentifiers.length == 0 && this.mDataFields.length != 0;
    }
    protected static calculateDistance(txPower: number, bestRssiAvailable: number): number {
        if (Beacon.getDistanceCalculator() != null) {
            return Beacon.getDistanceCalculator().calculateDistance(txPower, bestRssiAvailable);
        }
        else {
            return -1.0;
        }
    }
    static Builder = class {
        protected mBeacon: Beacon;
        private mId1: Identifier;
        private mId2: Identifier;
        private mId3: Identifier;
        /**
           * Creates a builder instance
           */
        constructor() {
            this.mBeacon = new Beacon();
        }
        /**
           * Builds an instance of this beacon based on parameters set in the Builder
           * @return beacon
           */
        public build(): Beacon {
            if (this.mId1 != null) {
                this.mBeacon.mIdentifiers.push(this.mId1);
                if (this.mId2 != null) {
                    this.mBeacon.mIdentifiers.push(this.mId2);
                    if (this.mId3 != null) {
                        this.mBeacon.mIdentifiers.push(this.mId3);
                    }
                }
            }
            return this.mBeacon;
        }
        /**
           * @param beacon the beacon whose fields we should copy to this beacon builder
           * @return
           */
        public copyBeaconFields(beacon: Beacon): this {
            this.setIdentifiers(beacon.getIdentifiers());
            this.setBeaconTypeCode(beacon.getBeaconTypeCode());
            this.setDataFields(beacon.getDataFields());
            this.setBluetoothAddress(beacon.getBluetoothAddress());
            this.setBluetoothName(beacon.getBluetoothName());
            this.setExtraDataFields(beacon.getExtraDataFields());
            this.setManufacturer(beacon.getManufacturer());
            this.setTxPower(beacon.getTxPower());
            this.setRssi(beacon.getRssi());
            this.setServiceUuid(beacon.getServiceUuid());
            this.setMultiFrameBeacon(beacon.isMultiFrameBeacon());
            return this;
        }
        /**
           * @see Beacon#mIdentifiers
           * @param identifiers identifiers to set
           * @return builder
           */
        public setIdentifiers(identifiers: Array<Identifier>): this {
            this.mId1 = null;
            this.mId2 = null;
            this.mId3 = null;
            this.mBeacon.mIdentifiers = identifiers;
            return this;
        }
        /**
           * Convenience method allowing the first beacon identifier to be set as a String.  It will
           * be parsed into an Identifier object
           * @param id1String string to parse into an identifier
           * @return builder
           */
        public setId1(id1String: string): this {
            this.mId1 = Identifier.parse(id1String);
            return this;
        }
        /**
           * Convenience method allowing the second beacon identifier to be set as a String.  It will
           * be parsed into an Identifier object
           * @param id2String string to parse into an identifier
           * @return builder
           */
        public setId2(id2String: string): this {
            this.mId2 = Identifier.parse(id2String);
            return this;
        }
        /**
           * Convenience method allowing the third beacon identifier to be set as a String.  It will
           * be parsed into an Identifier object
           * @param id3String string to parse into an identifier
           * @return builder
           */
        public setId3(id3String: string): this {
            this.mId3 = Identifier.parse(id3String);
            return this;
        }
        /**
           * @see Beacon#mRssi
           * @param rssi
           * @return builder
           */
        public setRssi(rssi: number): this {
            this.mBeacon.mRssi = rssi;
            return this;
        }
        /**
           * @see Beacon#mRssi
           * @param rssi
           * @return builder
           */
        public setRunningAverageRssi(rssi: number): this {
            this.mBeacon.mRunningAverageRssi = rssi;
            return this;
        }
        /**
           * @see Beacon#mTxPower
           * @param txPower
           * @return builder
           */
        public setTxPower(txPower: number): this {
            this.mBeacon.mTxPower = txPower;
            return this;
        }
        /**
           * @see Beacon#mBeaconTypeCode
           * @param beaconTypeCode
           * @return builder
           */
        public setBeaconTypeCode(beaconTypeCode: number): this {
            this.mBeacon.mBeaconTypeCode = beaconTypeCode;
            return this;
        }
        /**
           * @see Beacon#mServiceUuid
           * @param serviceUuid
           * @return builder
           */
        public setServiceUuid(serviceUuid: number): this {
            this.mBeacon.mServiceUuid = serviceUuid;
            return this;
        }
        public setServiceUuid128Bit(serviceUuid128Bit: Array<number>): this {
            this.mBeacon.mServiceUuid128Bit = serviceUuid128Bit;
            return this;
        }
        /**
           * @see Beacon#mBluetoothAddress
           * @param bluetoothAddress
           * @return builder
           */
        public setBluetoothAddress(bluetoothAddress: string): this {
            this.mBeacon.mBluetoothAddress = bluetoothAddress;
            return this;
        }
        /**
           * @see Beacon#mDataFields
           * @param dataFields
           * @return builder
           */
        public setDataFields(dataFields: Array<number>): this {
            this.mBeacon.mDataFields = dataFields;
            return this;
        }
        /**
           * @see Beacon#mDataFields
           * @param extraDataFields
           * @return builder
           */
        public setExtraDataFields(extraDataFields: Array<number>): this {
            this.mBeacon.mExtraDataFields = extraDataFields;
            return this;
        }
        /**
           * @see Beacon#mManufacturer
           * @param manufacturer
           * @return builder
           */
        public setManufacturer(manufacturer: number): this {
            this.mBeacon.mManufacturer = manufacturer;
            return this;
        }
        /**
           * @see Beacon#mBluetoothName
           * @param name
           * @return builder
           */
        public setBluetoothName(name: string): this {
            this.mBeacon.mBluetoothName = name;
            return this;
        }
        /**
           * @see Beacon#mParserIdentifier
           * @param id
           * @return builder
           */
        public setParserIdentifier(id: string): this {
            this.mBeacon.mParserIdentifier = id;
            return this;
        }
        /**
           * @see Beacon#mMultiFrameBeacon
           * @param multiFrameBeacon
           * @return builder
           */
        public setMultiFrameBeacon(multiFrameBeacon: boolean): this {
            this.mBeacon.mMultiFrameBeacon = multiFrameBeacon;
            return this;
        }
    };
    public getBeaconCode(beacon: Beacon): number {
        let beaconCode: number;
        beaconCode = beacon.getId1().toInt() + beacon.getId2().toInt() + beacon.getId3().toInt();
        return beaconCode;
    }
}
export default Beacon;
