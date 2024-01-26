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
import Pdu from '../bluetooth/Pdu';
import Identifier from './Identifier';
import Beacon from './Beacon';
import BleAdvertisement from '../bluetooth/BleAdvertisement';
class BeaconParser {
    private static readonly TAG: string = "BeaconParser";
    public static readonly ALTBEACON_LAYOUT: string = "m:2-3=beac,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25";
    public static readonly EDDYSTONE_TLM_LAYOUT: string = "x,s:0-1=feaa,m:2-2=20,d:3-3,d:4-5,d:6-7,d:8-11,d:12-15";
    public static readonly EDDYSTONE_UID_LAYOUT: string = "s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19";
    public static readonly EDDYSTONE_URL_LAYOUT: string = "s:0-1=feaa,m:2-2=10,p:3-3:-41,i:4-21v";
    public static readonly URI_BEACON_LAYOUT: string = "s:0-1=fed8,m:2-2=00,p:3-3:-41,i:4-21v";
    private readonly I_PATTERN: RegExp = new RegExp("i\\:(\\d+)\\-(\\d+)([blv]*)?");
    private readonly M_PATTERN: RegExp = new RegExp("m\\:(\\d+)-(\\d+)\\=([0-9A-Fa-f]+)");
    private readonly S_PATTERN: RegExp = new RegExp("s\\:(\\d+)-(\\d+)\\=([0-9A-Fa-f\\-]+)");
    private readonly D_PATTERN: RegExp = new RegExp("d\\:(\\d+)\\-(\\d+)([bl]*)?");
    private readonly P_PATTERN: RegExp = new RegExp("p\\:(\\d+)?\\-(\\d+)?\\:?([\\-\\d]+)?");
    private readonly X_PATTERN: RegExp = new RegExp("x");
    private static readonly HEX_ARRAY: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    private readonly LITTLE_ENDIAN_SUFFIX: string = "l";
    private readonly VARIABLE_LENGTH_SUFFIX: string = "v";
    protected mBeaconLayout: string;
    private mMatchingBeaconTypeCode: number;
    protected readonly mIdentifierStartOffsets: Array<number> = new Array<number>();
    protected readonly mIdentifierEndOffsets: Array<number> = new Array<number>();
    protected readonly mIdentifierLittleEndianFlags: Array<boolean> = new Array<boolean>();
    protected readonly mDataStartOffsets: Array<number> = new Array<number>();
    protected readonly mDataEndOffsets: Array<number> = new Array<number>();
    protected readonly mDataLittleEndianFlags: Array<boolean> = new Array<boolean>();
    protected readonly mIdentifierVariableLengthFlags: Array<boolean> = new Array<boolean>();
    protected mMatchingBeaconTypeCodeStartOffset: number;
    protected mMatchingBeaconTypeCodeEndOffset: number;
    protected mServiceUuidStartOffset: number;
    protected mServiceUuidEndOffset: number;
    protected mServiceUuid: number;
    protected mServiceUuid128Bit: Array<number> = new Array<number>();
    protected mExtraFrame: boolean;
    protected mPowerStartOffset: number;
    protected mPowerEndOffset: number;
    protected mDBmCorrection: number;
    protected mLayoutSize: number;
    protected mAllowPduOverflow: boolean = true;
    protected mIdentifier: string;
    protected mHardwareAssistManufacturers: Array<number> = [0x004c];
    protected extraParsers: Array<BeaconParser> = new Array<BeaconParser>();
    constructor(identifier?: string) {
        if (identifier != null) {
            this.mIdentifier = identifier;
        }
    }
    ;
    public setBeaconLayout(beaconLayout: string) {
        this.mBeaconLayout = beaconLayout;
        var terms: Array<string>;
        terms = beaconLayout.split(",");
        this.mExtraFrame = false;
        terms.forEach(term => {
            let found: boolean = false;
            while (term.search(this.I_PATTERN) != -1) {
                found = true;
                try {
                    let startOffset: number = parseInt(term.match(this.I_PATTERN)[1]);
                    let endOffset: number = parseInt(term.match(this.I_PATTERN)[2]);
                    let str: string = term.match(this.I_PATTERN)[3];
                    if (str != null) {
                        let littleEndian: boolean = (str.indexOf(this.LITTLE_ENDIAN_SUFFIX) >= 0) ? true : false;
                        this.mIdentifierLittleEndianFlags.push(littleEndian);
                        let variableLength: boolean = (str.indexOf(this.VARIABLE_LENGTH_SUFFIX) >= 0) ? true : false;
                        this.mIdentifierVariableLengthFlags.push(variableLength);
                    }
                    else {
                        this.mIdentifierLittleEndianFlags.push(false);
                        this.mIdentifierVariableLengthFlags.push(false);
                    }
                    this.mIdentifierStartOffsets.push(startOffset);
                    this.mIdentifierEndOffsets.push(endOffset);
                }
                catch (e) {
                    throw new Error("Cannot parse integer byte offset in term: " + term);
                }
                break;
            }
            while (term.search(this.D_PATTERN) != -1) {
                found = true;
                try {
                    let startOffset: number = parseInt(term.match(this.D_PATTERN)[1]);
                    let endOffset: number = parseInt(term.match(this.D_PATTERN)[2]);
                    let str: string = term.match(this.D_PATTERN)[3];
                    if (str != null) {
                        let littleEndian: boolean = (str.indexOf("l") >= 0) ? true : false;
                        this.mDataLittleEndianFlags.push(littleEndian);
                    }
                    else {
                        this.mDataLittleEndianFlags.push(false);
                    }
                    this.mDataStartOffsets.push(startOffset);
                    this.mDataEndOffsets.push(endOffset);
                }
                catch (e) {
                    throw new Error("Cannot parse integer byte offset in term: " + term);
                }
                break;
            }
            while (term.search(this.P_PATTERN) != -1) {
                found = true;
                let correctionString: string = "none";
                try {
                    if (term.match(this.P_PATTERN)[1] != null && term.match(this.P_PATTERN)[2] != null) {
                        let startOffset: number = parseInt(term.match(this.P_PATTERN)[1]);
                        let endOffset: number = parseInt(term.match(this.P_PATTERN)[2]);
                        this.mPowerStartOffset = startOffset;
                        this.mPowerEndOffset = endOffset;
                    }
                    let dBmCorrection: number = 0;
                    if (term.match(this.P_PATTERN)[3] != null) {
                        correctionString = term.match(this.P_PATTERN)[3];
                        dBmCorrection = parseInt(correctionString);
                    }
                    this.mDBmCorrection = dBmCorrection;
                }
                catch (e) {
                    throw new Error("Cannot parse integer power byte offset (" + correctionString + ") in term: " + term);
                }
                break;
            }
            while (term.search(this.M_PATTERN) != -1) {
                found = true;
                try {
                    let startOffset: number = parseInt(term.match(this.M_PATTERN)[1]);
                    let endOffset: number = parseInt(term.match(this.M_PATTERN)[2]);
                    console.debug("BeaconParser  M_PATTERN startOffset:" + startOffset);
                    console.debug("BeaconParser  M_PATTERN endOffset:" + endOffset);
                    this.mMatchingBeaconTypeCodeStartOffset = startOffset;
                    this.mMatchingBeaconTypeCodeEndOffset = endOffset;
                }
                catch {
                    throw new Error("Cannot parse integer byte offset in term: " + term);
                }
                let hexString: string = term.match(this.M_PATTERN)[3];
                try {
                    this.mMatchingBeaconTypeCode = parseInt("0x" + hexString);
                    console.debug("BeaconParser  M_PATTERN mMatchingBeaconTypeCode:" + this.mMatchingBeaconTypeCode);
                }
                catch (e) {
                    throw new Error("Cannot parse beacon type code: " + hexString + " in term: " + term);
                }
                break;
            }
            while (term.search(this.S_PATTERN) != -1) {
                found = true;
                try {
                    let startOffset: number = parseInt(term.match(this.S_PATTERN)[1]);
                    let endOffset: number = parseInt(term.match(this.S_PATTERN)[2]);
                    this.mServiceUuidStartOffset = startOffset;
                    this.mServiceUuidEndOffset = endOffset;
                }
                catch (e) {
                    throw new Error("Cannot parse integer byte offset in term: " + term);
                }
                let hexString: string = term.match(this.S_PATTERN)[3];
                if (this.mServiceUuidEndOffset - this.mServiceUuidStartOffset + 1 == 2) {
                    try {
                        this.mServiceUuid = parseInt("0x" + hexString);
                    }
                    catch (e) {
                        throw new Error("Cannot parse serviceUuid: " + hexString + " in term: " + term);
                    }
                }
                else if (this.mServiceUuidEndOffset - this.mServiceUuidStartOffset + 1 == 16) {
                    let bytesString: string = hexString.replace("-", "");
                    if (bytesString.length != 32) {
                        throw new Error("128-bit ServiceUuid must be 16 bytes long: " + hexString + " in term: " + term);
                    }
                    this.mServiceUuid128Bit = new Array(16);
                    for (var i = 0; i < 16; i++) {
                        let byteString: string = bytesString.substring(i * 2, i * 2 + 2);
                        try {
                            let value = parseInt(byteString, 16);
                            if (value > 127)
                                value = -(256 - value);
                            this.mServiceUuid128Bit[15 - i] = value;
                        }
                        catch (e) {
                            throw new Error("Cannot parse serviceUuid byte " + byteString + " in term: " + term);
                        }
                    }
                }
                else {
                    throw new Error("Cannot parse serviceUuid -- it must be 2 bytes or 16 bytes long: " + hexString + " in term: " + term);
                }
                break;
            }
            while (term.search(this.X_PATTERN) != -1) {
                found = true;
                this.mExtraFrame = true;
                break;
            }
            if (!found) {
                throw new Error("BeaconParser Cannot parse beacon layout term: " + term);
            }
        });
        this.mLayoutSize = this.calculateLayoutSize();
        return this;
    }
    public addExtraDataParser(extraDataParser: BeaconParser): boolean {
        return (extraDataParser != null) && (extraDataParser.mExtraFrame);
    }
    public getExtraDataParsers(): Array<BeaconParser> {
        return this.extraParsers;
    }
    public getIdentifier(): string {
        return this.mIdentifier;
    }
    public getHardwareAssistManufacturers(): Array<number> {
        return this.mHardwareAssistManufacturers;
    }
    public setHardwareAssistManufacturerCodes(manufacturers: number) {
        this.mHardwareAssistManufacturers.push(manufacturers);
    }
    public setAllowPduOverflow(enabled: boolean) {
        this.mAllowPduOverflow = enabled;
    }
    public getMatchingBeaconTypeCode(): number {
        if (this.mMatchingBeaconTypeCode == undefined) {
            return -1;
        }
        return this.mMatchingBeaconTypeCode;
    }
    public getMatchingBeaconTypeCodeStartOffset(): number {
        if (this.mMatchingBeaconTypeCodeStartOffset == undefined) {
            return -1;
        }
        return this.mMatchingBeaconTypeCodeStartOffset;
    }
    public getMatchingBeaconTypeCodeEndOffset(): number {
        if (this.mMatchingBeaconTypeCodeEndOffset == undefined) {
            return -1;
        }
        return this.mMatchingBeaconTypeCodeEndOffset;
    }
    public getServiceUuid(): number {
        return this.mServiceUuid;
    }
    public getServiceUuid128Bit(): Array<number> {
        return this.mServiceUuid128Bit;
    }
    public getMServiceUuidStartOffset(): number {
        return this.mServiceUuidStartOffset;
    }
    public getServiceUuidEndOffset(): number {
        return this.mServiceUuidEndOffset;
    }
    /**
         * Construct a Beacon from a Bluetooth LE packet collected by Harmony's Bluetooth APIs
         *
         * @param bytesToProcess The actual packet bytes
         * @param rssi The measured signal strength of the packet
         * @param deviceId The Bluetooth device mac that was detected
         * @param timestampMs The timestamp in milliseconds of the scan execution
         * @return An instance of a <code>Beacon</code>
         */
    public fromScanData(bytesToProcess: ArrayBuffer, rssi: number, deviceId: string, timestampMs: number, beacon?: Beacon): Beacon {
        let temp = new Int8Array(bytesToProcess);
        let scanDataContent: Array<number> = [];
        for (let i = 0; i < temp.length; i++) {
            scanDataContent.push(temp[i].valueOf());
        }
        let advert: BleAdvertisement = new BleAdvertisement(scanDataContent);
        let parseSucceeded: boolean = false;
        let pdusToParse: Array<Pdu> = new Array<Pdu>();
        let startByte: number = 0;
        let identifiers: Array<Identifier> = new Array<Identifier>();
        let dataFields: Array<number> = new Array<number>();
        let txPower: number = 0;
        advert.getPdus().forEach(pdu => {
            if ((pdu.getType() == Pdu.GATT_SERVICE_UUID_PDU_TYPE && this.mServiceUuid != null) ||
                (pdu.getType() == Pdu.GATT_SERVICE_UUID_128_BIT_PDU_TYPE && this.mServiceUuid128Bit.length != 0) || pdu.getType() == Pdu.MANUFACTURER_DATA_PDU_TYPE) {
                pdusToParse.push(pdu);
            }
            else {
                console.debug("BeaconParser Ignoring pdu type %02X", pdu.getType());
            }
        });
        if (pdusToParse.length == 0) {
            console.debug("BeaconParser No PDUs to process in this packet.");
        }
        else {
            let parseFailed = false;
            for (let i = 0; i < pdusToParse.length; i++) {
                let pduToParse = pdusToParse[i];
                let serviceUuidBytes: Array<number> = null;
                let typeCodeBytes: Array<number> = []; //beacon Type
                if (this.mMatchingBeaconTypeCodeStartOffset >= 0) {
                    typeCodeBytes = BeaconParser.longToByteArray(this.getMatchingBeaconTypeCode(), this.mMatchingBeaconTypeCodeEndOffset - this.mMatchingBeaconTypeCodeStartOffset + 1, true);
                }
                serviceUuidBytes = this.getServiceUuid128Bit();
                if (this.getServiceUuid() != undefined) {
                    serviceUuidBytes = BeaconParser.longToByteArray(this.getServiceUuid(), this.mServiceUuidEndOffset - this.mServiceUuidStartOffset + 1, false);
                }
                startByte = pduToParse.getStartIndex();
                let patternFound: boolean = false;
                if (serviceUuidBytes.length == 0) {
                    if (this.mMatchingBeaconTypeCodeEndOffset != 0) {
                        if (this.byteArraysMatch(scanDataContent, startByte + this.mMatchingBeaconTypeCodeStartOffset, typeCodeBytes)) {
                            patternFound = true;
                        }
                    }
                }
                else {
                    let lengthIsExpected = false;
                    if (pduToParse.getType() == Pdu.GATT_SERVICE_UUID_128_BIT_PDU_TYPE) {
                        if (serviceUuidBytes.length == 16) {
                            lengthIsExpected = true;
                        }
                    }
                    if (pduToParse.getType() == Pdu.GATT_SERVICE_UUID_PDU_TYPE) {
                        if (serviceUuidBytes.length == 2) {
                            lengthIsExpected = true;
                        }
                    }
                    if (lengthIsExpected) {
                        if (this.byteArraysMatch(scanDataContent, startByte + this.mServiceUuidStartOffset, serviceUuidBytes)) {
                            if (this.mMatchingBeaconTypeCodeEndOffset >= 0) {
                                if (this.byteArraysMatch(scanDataContent, startByte + this.mMatchingBeaconTypeCodeStartOffset, typeCodeBytes)) {
                                    patternFound = true;
                                }
                            }
                            else {
                                if (pduToParse.getType() == Pdu.GATT_SERVICE_UUID_PDU_TYPE || pduToParse.getType() == Pdu.GATT_SERVICE_UUID_128_BIT_PDU_TYPE) {
                                    patternFound = true;
                                }
                            }
                        }
                    }
                }
                console.debug("BeaconParser patternFound:" + patternFound);
                if (!patternFound) {
                    // This is not a beacon
                    if (this.getServiceUuid() != undefined || this.getServiceUuid128Bit().length != 0) {
                        let offset = 0;
                        if (this.mMatchingBeaconTypeCodeStartOffset != undefined) {
                            offset = this.mMatchingBeaconTypeCodeStartOffset;
                        }
                        console.log("BeaconParser This is not a matching Beacon advertisement. Was expecting %s at offset %d and %s at offset %d.  "
                            + "The bytes I see are: %s", this.byteArrayToString(serviceUuidBytes), startByte + this.mServiceUuidStartOffset, this.byteArrayToString(typeCodeBytes), startByte + offset, BeaconParser.bytesToHex(scanDataContent));
                    }
                    else {
                        console.debug("BeaconParser This is not a matching Beacon advertisement. (Was expecting %s.  "
                            + "The bytes I see are: %s", this.byteArrayToString(typeCodeBytes), BeaconParser.bytesToHex(scanDataContent));
                    }
                }
                else {
                    console.debug("BeaconParser This is a recognized beacon advertisement -- %s seen", this.byteArrayToString(typeCodeBytes));
                }
                if (patternFound) {
                    if (scanDataContent.length <= startByte + this.mLayoutSize && this.mAllowPduOverflow) {
                        // If the layout size is bigger than this PDU, and we allow overflow.  Make sure
                        // the byte buffer is big enough by zero padding the end so we don't try to read
                        // outside the byte array of the advertisement
                        console.log("BeaconParser Expanding buffer because it is too short to parse: " + scanDataContent.length + ", needed: " + (startByte + this.mLayoutSize));
                        scanDataContent = this.ensureMaxSize(scanDataContent, startByte + this.mLayoutSize);
                    }
                    for (let i = 0; i < this.mIdentifierEndOffsets.length; i++) {
                        let endIndex = this.mIdentifierEndOffsets[i] + startByte;
                        if (endIndex > pduToParse.getEndIndex() && this.mIdentifierVariableLengthFlags[i]) {
                            console.log("BeaconParser Need to truncate identifier by " + (endIndex - pduToParse.getEndIndex()));
                            // If this is a variable length identifier, we truncate it to the size that
                            // is available in the packet
                            let start = this.mIdentifierStartOffsets[i] + startByte;
                            let end = pduToParse.getEndIndex() + 1;
                            if (end <= start) {
                                console.log("BeaconParser PDU is too short for identifer.  Packet is malformed");
                                return null;
                            }
                            let identifier = Identifier.fromBytes(scanDataContent, start, end, this.mIdentifierLittleEndianFlags[i]);
                            identifiers.push(identifier);
                        }
                        else if (endIndex > pduToParse.getEndIndex() && !this.mAllowPduOverflow) {
                            parseFailed = true;
                            console.log("BeaconParser Cannot parse identifier " + i + " because PDU is too short.  endIndex: " + endIndex + " PDU endIndex: " + pduToParse.getEndIndex());
                        }
                        else {
                            let identifier = Identifier.fromBytes(scanDataContent, this.mIdentifierStartOffsets[i] + startByte, endIndex + 1, this.mIdentifierLittleEndianFlags[i]);
                            identifiers.push(identifier);
                        }
                    }
                    for (let i = 0; i < this.mDataEndOffsets.length; i++) {
                        let endIndex = this.mDataEndOffsets[i] + startByte;
                        if (endIndex > pduToParse.getEndIndex() && !this.mAllowPduOverflow) {
                            console.log("BeaconParser Cannot parse data field " + i + " because PDU is too short.  endIndex: " + endIndex + " PDU endIndex: " + pduToParse.getEndIndex() + ".  Setting value to 0");
                            dataFields.push(0);
                        }
                        else {
                            let dataString = this.byteArrayToFormattedString(scanDataContent, this.mDataStartOffsets[i] + startByte, endIndex, this.mDataLittleEndianFlags[i]);
                            dataFields.push(parseInt(dataString));
                        }
                    }
                    if (this.mPowerStartOffset != undefined) {
                        let endIndex = this.mPowerEndOffset + startByte;
                        try {
                            if (endIndex > pduToParse.getEndIndex() && !this.mAllowPduOverflow) {
                                parseFailed = true;
                                console.log("BeaconParser Cannot parse power field because PDU is too short.  endIndex: " + endIndex + " PDU endIndex: " + pduToParse.getEndIndex());
                            }
                            else {
                                let powerString = this.byteArrayToFormattedString(scanDataContent, this.mPowerStartOffset + startByte, this.mPowerEndOffset + startByte, false);
                                txPower = parseInt(powerString) + this.mDBmCorrection;
                                // make sure it is a signed integer
                                if (txPower > 127) {
                                    txPower -= 256;
                                }
                            }
                        }
                        catch (e) {
                            // keep default value
                        }
                    }
                    else {
                        if (this.mDBmCorrection != undefined) {
                            txPower = this.mDBmCorrection;
                        }
                    }
                    if (!parseFailed) {
                        parseSucceeded = true;
                        // exit processing PDUs on the first beacon we find.  Only one beacon per advertisement!
                        break;
                    }
                }
            }
        }
        if (parseSucceeded) {
            let beaconTypeCode = -1;
            if (this.mMatchingBeaconTypeCodeEndOffset != undefined) {
                let beaconTypeString = this.byteArrayToFormattedString(scanDataContent, this.mMatchingBeaconTypeCodeStartOffset + startByte, this.mMatchingBeaconTypeCodeEndOffset + startByte, false);
                beaconTypeCode = parseInt(beaconTypeString);
            }
            let manufacturer = 0;
            let manufacturerString = this.byteArrayToFormattedString(scanDataContent, startByte, startByte + 1, true);
            manufacturer = parseInt(manufacturerString);
            if (beacon == null) {
                beacon = new Beacon();
            }
            beacon.mIdentifiers = identifiers;
            beacon.mDataFields = dataFields;
            beacon.mRssi = rssi;
            beacon.mBeaconTypeCode = beaconTypeCode;
            if (this.mServiceUuid != undefined) {
                beacon.mServiceUuid = this.mServiceUuid;
            }
            else {
                beacon.mServiceUuid = -1;
            }
            beacon.mBluetoothAddress = deviceId;
            // beacon.mBluetoothName= name;
            beacon.mManufacturer = manufacturer;
            beacon.mParserIdentifier = this.mIdentifier;
            beacon.mMultiFrameBeacon = this.extraParsers.length > 0 || this.mExtraFrame;
            beacon.mFirstCycleDetectionTimestamp = timestampMs;
            beacon.mLastCycleDetectionTimestamp = timestampMs;
            beacon.mTxPower = txPower;
            return beacon;
        }
        else {
            return null;
        }
    }
    /**
         * Get BLE advertisement data for a Beacon
         * @param beacon the beacon containing the data to be transmitted
         * @return the number array of the advertisement
         */
    public getBeaconAdvertisementData(beacon: Beacon): Array<number> {
        let advertisingBytes: Array<number>;
        if (beacon.getIdentifiers().length != this.getIdentifierCount()) {
            throw new Error("Beacon has " +
                beacon.getIdentifiers().length + " identifiers but format requires " + this.getIdentifierCount());
        }
        let lastIndex = -1;
        if (this.mMatchingBeaconTypeCodeEndOffset != null && this.mMatchingBeaconTypeCodeEndOffset > lastIndex) {
            lastIndex = this.mMatchingBeaconTypeCodeEndOffset;
        }
        if (this.mPowerEndOffset != null && this.mPowerEndOffset > lastIndex) {
            lastIndex = this.mPowerEndOffset;
        }
        for (let identifierNum = 0; identifierNum < this.mIdentifierEndOffsets.length; identifierNum++) {
            if (this.mIdentifierEndOffsets[identifierNum] != null && this.mIdentifierEndOffsets[identifierNum] > lastIndex) {
                lastIndex = this.mIdentifierEndOffsets[identifierNum];
            }
        }
        for (let identifierNum = 0; identifierNum < this.mDataEndOffsets.length; identifierNum++) {
            if (this.mDataEndOffsets[identifierNum] != null && this.mDataEndOffsets[identifierNum] > lastIndex) {
                lastIndex = this.mDataEndOffsets[identifierNum];
            }
        }
        // we must adjust the lastIndex to account for variable length identifiers, if there are any.
        let adjustedIdentifiersLength = 0;
        for (let identifierNum = 0; identifierNum < this.mIdentifierStartOffsets.length; identifierNum++) {
            if (this.mIdentifierVariableLengthFlags[identifierNum]) {
                let declaredIdentifierLength = (this.mIdentifierEndOffsets[identifierNum] - this.mIdentifierStartOffsets[identifierNum] + 1);
                let actualIdentifierLength = beacon.getIdentifier(identifierNum).getByteCount();
                adjustedIdentifiersLength += actualIdentifierLength;
                adjustedIdentifiersLength -= declaredIdentifierLength;
            }
        }
        lastIndex = lastIndex + adjustedIdentifiersLength;
        //        advertisingBytes = new number[lastIndex+1-2];
        advertisingBytes = new Array<number>(lastIndex + 1 - 2);
        if (this.mMatchingBeaconTypeCodeEndOffset != null) {
            let beaconTypeCode = this.getMatchingBeaconTypeCode();
            // set type code
            for (let index = this.mMatchingBeaconTypeCodeStartOffset; index <= this.mMatchingBeaconTypeCodeEndOffset; index++) {
                let value = this.getMatchingBeaconTypeCode() >> (8 * (this.mMatchingBeaconTypeCodeEndOffset - index)) & 0xff;
                if (value > 127)
                    value = -(256 - value);
                advertisingBytes[index - 2] = value;
            }
        }
        // set identifiers
        for (let identifierNum: number = 0; identifierNum < this.mIdentifierStartOffsets.length; identifierNum++) {
            let identifierBytes: Array<number> = beacon.getIdentifier(identifierNum)
                .toByteArrayOfSpecifiedEndianness(!this.mIdentifierLittleEndianFlags[identifierNum]);
            // If the identifier we are trying to stuff into the space is different than the space available
            // adjust it
            if (identifierBytes.length < this.getIdentifierByteCount(identifierNum)) {
                if (!this.mIdentifierVariableLengthFlags[identifierNum]) {
                    // Pad it, but only if this is not a variable length identifier
                    if (this.mIdentifierLittleEndianFlags[identifierNum]) {
                        // this is little endian.  Pad at the end of the array
                        //                        identifierBytes = Arrays.copyOf(identifierBytes,this.getIdentifierByteCount(identifierNum));
                        identifierBytes = identifierBytes.slice(0, this.getIdentifierByteCount(identifierNum));
                    }
                    else {
                        // this is big endian.  Pad at the beginning of the array
                        let newIdentifierBytes: Array<number> = new Array(this.getIdentifierByteCount(identifierNum));
                        //                        System.arraycopy(identifierBytes, 0, newIdentifierBytes, this.getIdentifierByteCount(identifierNum)-identifierBytes.length, identifierBytes.length);
                        newIdentifierBytes = identifierBytes.slice(0, identifierBytes.length);
                        newIdentifierBytes = newIdentifierBytes.slice(this.getIdentifierByteCount(identifierNum) - identifierBytes.length, identifierBytes.length);
                        identifierBytes = newIdentifierBytes;
                    }
                }
            }
            else if (identifierBytes.length > this.getIdentifierByteCount(identifierNum)) {
                if (this.mIdentifierLittleEndianFlags[identifierNum]) {
                    // Truncate it at the beginning for big endian
                    //                    identifierBytes = Arrays.copyOfRange(identifierBytes, this.getIdentifierByteCount(identifierNum)-identifierBytes.length, this.getIdentifierByteCount(identifierNum));
                    identifierBytes = identifierBytes.slice(this.getIdentifierByteCount(identifierNum) - identifierBytes.length, this.getIdentifierByteCount(identifierNum));
                }
                else {
                    // Truncate it at the end for little endian
                    //                    identifierBytes = Arrays.copyOf(identifierBytes,this.getIdentifierByteCount(identifierNum));
                    identifierBytes = identifierBytes.slice(0, this.getIdentifierByteCount(identifierNum));
                }
            }
            else {
                console.debug("Identifier size is just right: " + this.byteArrayToString(identifierBytes));
            }
            for (let index = this.mIdentifierStartOffsets[identifierNum]; index <= this.mIdentifierStartOffsets[identifierNum] + identifierBytes.length - 1; index++) {
                let value = identifierBytes[index - this.mIdentifierStartOffsets[identifierNum]];
                if (value > 127)
                    value = -(256 - value);
                advertisingBytes[index - 2] = value;
            }
        }
        // set power
        if (this.mPowerStartOffset != null && this.mPowerEndOffset != null && this.mPowerStartOffset >= 2) {
            for (let index = this.mPowerStartOffset; index <= this.mPowerEndOffset; index++) {
                let value = (beacon.getTxPower() >> (8 * (index - this.mPowerStartOffset)) & 0xff);
                if (value > 127)
                    value = -(256 - value);
                advertisingBytes[index - 2] = value;
            }
        }
        // set data fields
        for (let dataFieldNum = 0; dataFieldNum < this.mDataStartOffsets.length; dataFieldNum++) {
            let dataField = beacon.getDataFields()[dataFieldNum];
            let dataFieldLength = this.mDataEndOffsets[dataFieldNum] - this.mDataStartOffsets[dataFieldNum];
            for (let index = 0; index <= dataFieldLength; index++) {
                let endianCorrectedIndex = index;
                if (!this.mDataLittleEndianFlags[dataFieldNum]) {
                    endianCorrectedIndex = dataFieldLength - index;
                }
                let value = (dataField >> (8 * index) & 0xff);
                if (value > 127)
                    value = -(256 - value);
                advertisingBytes[this.mDataStartOffsets[dataFieldNum] - 2 + endianCorrectedIndex] = value;
            }
        }
        return advertisingBytes;
    }
    /**
         * @return the number of identifiers in this beacon format
         */
    public getIdentifierCount(): number {
        return this.mIdentifierStartOffsets.length;
    }
    /**
         * Caclculates the byte size of the specified identifier in this format
         * @param identifierNum
         * @return bytes
         */
    public getIdentifierByteCount(identifierNum: number): number {
        return this.mIdentifierEndOffsets[identifierNum] - this.mIdentifierStartOffsets[identifierNum] + 1;
    }
    private byteArrayToString(bytes: Array<number>): string {
        let sb = new Array();
        for (let i = 0; i < bytes.length; i++) {
            //            sb.push(String.format("%02x", bytes[i]));
            sb.push(bytes[i]);
            sb.push(" ");
        }
        return sb.join('').trim().toString();
    }
    private byteArrayToFormattedString(byteBuffer: Array<number>, startIndex: number, endIndex: number, littleEndian: boolean): string {
        let bytes: Array<number> = new Array(endIndex - startIndex + 1);
        if (littleEndian) {
            for (let i = 0; i <= endIndex - startIndex; i++) {
                bytes[i] = byteBuffer[startIndex + bytes.length - 1 - i];
            }
        }
        else {
            for (let i = 0; i <= endIndex - startIndex; i++) {
                bytes[i] = byteBuffer[startIndex + i];
            }
        }
        let length = endIndex - startIndex + 1;
        // We treat a 1-4 byte number as decimal string
        if (length < 5) {
            let number = 0;
            for (let i = 0; i < bytes.length; i++) {
                let byteValue = (bytes[bytes.length - i - 1] & 0xff);
                let positionValue = Math.pow(256.0, i * 1.0);
                let calculatedValue = (byteValue * positionValue);
                number += calculatedValue;
            }
            return number.toString();
        }
        // We treat a 7+ byte number as a hex string
        let hexString = BeaconParser.bytesToHex(bytes);
        // And if it is a 12 byte number we add dashes to it to make it look like a standard UUID
        if (bytes.length == 16) {
            return hexString.substring(0, 8) + "-" + hexString.substring(8, 12) + "-" + hexString.substring(12, 16) + "-" + hexString.substring(16, 20) + "-" + hexString.substring(20, 32);
        }
        return "0x" + hexString;
    }
    private ensureMaxSize(array: Array<number>, requiredLength: number): Array<number> {
        if (array.length >= requiredLength) {
            return array;
        }
        for (let i = 0; i < (requiredLength - array.length); i++) {
            array.push(0);
        }
        return array;
    }
    private byteArraysMatch(source: Array<number>, offset: number, expected: Array<number>): boolean {
        let length = expected.length;
        if (source.length - offset < length) {
            return false;
        }
        for (let i = 0; i < length; i++) {
            if (source[offset + i] != expected[i]) {
                return false;
            }
        }
        return true;
    }
    public static longToByteArray(longValue: number, length: number, bol?: boolean): Array<number> {
        let array: Array<number> = new Array(length);
        for (let i = 0; i < length; i++) {
            let adjustedI = bol ? i : length - i - 1;
            let mask = 0xff << (length - adjustedI - 1) * 8;
            let shift = (length - adjustedI - 1) * 8;
            let value: number = ((longValue & mask) >> shift);
            if (value > 127)
                array[i] = -(256 - value);
            else
                array[i] = value;
        }
        return array;
    }
    public static bytesToHex(bytes: Array<number>): String {
        let hexChars = new Array<String>(bytes.length * 2);
        let v: number;
        for (let j = 0; j < bytes.length; j++) {
            v = bytes[j] & 0xFF;
            hexChars[j * 2] = BeaconParser.HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = BeaconParser.HEX_ARRAY[v & 0x0F];
        }
        return hexChars.join('').trim().toString();
    }
    private calculateLayoutSize(): number {
        let lastEndOffset = 0;
        if (this.mIdentifierEndOffsets != null) {
            this.mIdentifierEndOffsets.forEach(endOffset => {
                if (endOffset > lastEndOffset) {
                    lastEndOffset = endOffset;
                }
            });
        }
        if (this.mDataEndOffsets != null) {
            this.mDataEndOffsets.forEach(endOffset => {
                if (endOffset > lastEndOffset) {
                    lastEndOffset = endOffset;
                }
            });
        }
        if (this.mPowerEndOffset != null && this.mPowerEndOffset > lastEndOffset) {
            lastEndOffset = this.mPowerEndOffset;
        }
        if (this.mServiceUuidEndOffset != null && this.mServiceUuidEndOffset > lastEndOffset) {
            lastEndOffset = this.mServiceUuidEndOffset;
        }
        return lastEndOffset + 1;
    }
    public getLayout(): string {
        return this.mBeaconLayout;
    }
    public equals(that: BeaconParser): boolean {
        if (that.mBeaconLayout != null && that.mBeaconLayout == this.mBeaconLayout) {
            if (that.mIdentifier != null && that.mIdentifier == this.mIdentifier) {
                return true;
            }
        }
        return false;
    }
}
export default BeaconParser;
