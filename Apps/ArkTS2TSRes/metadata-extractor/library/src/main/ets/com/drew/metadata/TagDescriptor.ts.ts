/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import DateUtils from '../lang/DateUtils';
import StringUtil from '../lang/StringUtil';
import Directory from './Directory';
/**
 * Base class for all tag descriptor classes.  Implementations are responsible for
 * providing the human-readable string representation of tag values stored in a directory.
 * The directory is provided to the tag descriptor via its constructor.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class TagDescriptor<T extends Directory> {
    public readonly _directory: T;
    constructor(directory: T) {
        this._directory = directory;
    }
    /**
     * Returns a descriptive value of the specified tag for this image.
     * Where possible, known values will be substituted here in place of the raw
     * tokens actually kept in the metadata segment.  If no substitution is
     * available, the value provided by <code>getString(tagType)</code> will be returned.
     *
     * @param tagType the tag to find a description for
     * @return a description of the image's value for the specified tag, or
     *         <code>null</code> if the tag hasn't been defined.
     */
    public getDescription(tagType: number) {
        let object = this._directory.getObject(tagType);
        if (object == null)
            return null;
        // special presentation for long arrays
        if (object instanceof Array) {
            let length = object.length;
            if (length > 16) {
                return "[%d values]".replace(/%d/, length + '');
            }
        }
        if (object instanceof Date) {
            // Produce a date string having a format that includes the offset in form "+00:00"
            return DateUtils.dateFormat(object);
        }
        // no special handling required, so use default conversion to a string
        return this._directory.getString(tagType);
    }
    /**
     * Takes a series of 4 bytes from the specified offset, and converts these to a
     * well-known version number, where possible.
     * <p>
     * Two different formats are processed:
     * <ul>
     * <li>[30 32 31 30] -&gt; 2.10</li>
     * <li>[0 1 0 0] -&gt; 1.00</li>
     * </ul>
     *
     * @param components  the four version values
     * @param majorDigits the number of components to be
     * @return the version as a string of form "2.10" or null if the argument cannot be converted
     */
    public static convertBytesToVersionString(components: Array<number>, majorDigits: number) {
        if (components == null)
            return null;
        let version: string;
        for (let i = 0; i < 4 && i < components.length; i++) {
            if (i == majorDigits)
                version.concat('.');
            let c = String.fromCharCode(components[i]);
            if (c < '0')
                c += '0';
            if (i == 0 && c == '0')
                continue;
            version.concat(c);
        }
        return version;
    }
    public getVersionBytesDescription(tagType: number, majorDigits: number) {
        let values = this._directory.getIntArray(tagType);
        return values == null ? null : TagDescriptor.convertBytesToVersionString(values, majorDigits);
    }
    public getIndexedDescription(tagType: number, baseIndex?: string | number, ...descriptions: string[]) {
        if (typeof baseIndex == "string") {
            baseIndex = 0;
        }
        let index = this._directory.getLongObject(tagType);
        if (index == null)
            return null;
        let arrayIndex = index - baseIndex;
        if (arrayIndex >= 0 && arrayIndex < descriptions.length) {
            let description = descriptions[arrayIndex];
            if (description != null)
                return description;
        }
        return "Unknown (" + index + ")";
    }
    public getByteLengthDescription(tagType: number) {
        let bytes = this._directory.getByteArray(tagType);
        if (bytes == null)
            return null;
        return bytes.length + 'byte' + (bytes.length == 1 ? "" : "s");
    }
    public getSimpleRational(tagType: number): string {
        let value = this._directory.getRational(tagType);
        if (value == null)
            return null;
        return value.toSimpleString(true);
    }
    public getDecimalRational(tagType: number, decimalPlaces: number): string {
        let value = this._directory.getRational(tagType);
        if (value == null)
            return null;
        return decimalPlaces + value.numberValue() + '';
    }
    public getFormattedInt(tagType: number, format: string): string {
        let value = this._directory.getInteger(tagType);
        if (value == null)
            return null;
        let regExp = /%f/g;
        return format.replace(regExp, value);
    }
    public getFormattedFloat(tagType: number, format: string): string {
        let value = this._directory.getFloatObject(tagType);
        if (value == null)
            return null;
        let regExp = /%d/g;
        return format.replace(regExp, value.toString());
        //        return String.format(format, value);
    }
    public getFormattedString(tagType: number, format: string): string {
        let value = this._directory.getString(tagType);
        if (value == null)
            return null;
        return format + value;
    }
    public getEpochTimeDescription(tagType: number) {
        // TODO have observed a byte[8] here which is likely some kind of date (ticks as long?)
        let value = this._directory.getLongObject(tagType);
        if (value == null)
            return null;
        return new Date(value).toString();
    }
    /**
     * LSB first. Labels may be null, a String, or a String[2] with (low label,high label) values.
     */
    public getBitFlagDescription(tagType: number, labels?: Array<Object>): string {
        let value = this._directory.getInteger(tagType);
        if (value == null)
            return null;
        let parts = new Set<String>();
        let bitIndex = 0;
        while (labels.length > bitIndex) {
            let labelObj = labels[bitIndex];
            if (labelObj != null) {
                let isBitSet = (value & 1) == 1;
                //                if (labelObj instanceof String[]) {
                //                    let labelPair = labelObj;
                ////                    assert(labelPair.length == 2);
                //                    parts.add(labelPair[isBitSet ? 1 : 0]);
                //                } else if (isBitSet && labelObj instanceof String) {
                //                    parts.add(labelObj);
                //                }
            }
            value >>= 1;
            bitIndex++;
        }
        //        return StringUtil.join(parts, ", ");
    }
    public get7BitStringFromBytes(tagType: number): string {
        let bytes = this._directory.getByteArray(tagType);
        if (bytes == null)
            return null;
        let length = bytes.length;
        for (let index = 0; index < bytes.length; index++) {
            let i = bytes[index] & 0xFF;
            if (i == 0 || i > 0x7F) {
                length = index;
                break;
            }
        }
        //        return new String(bytes, 0, length);
    }
    public getStringFromBytes(tag: number, cs: string): string {
        let values = this._directory.getByteArray(tag);
        if (values == null)
            return null;
        //        try {
        //            return new String(values, cs.name()).trim();
        //        } catch (UnsupportedEncodingException e) {
        //            return null;
        //        }
    }
    public getRationalOrDoubleString(tagType: number): string {
        let rational = this._directory.getRational(tagType);
        if (rational != null)
            return rational.toSimpleString(true);
        let d = this._directory.getDoubleObject(tagType);
        //        if (d != null) {
        //            DecimalFormat format = new DecimalFormat("0.###");
        //            return format.format(d);
        //        }
        return null;
    }
    public static getFStopDescription(fStop: number): string {
        return "f/" + fStop.toFixed(4);
    }
    public static getFocalLengthDescription(mm: number): string {
        return mm.toFixed(4) + " mm";
    }
    public getLensSpecificationDescription(tag: number): string {
        let values = this._directory.getRationalArray(tag);
        if (values == null || values.length != 4 || (values[0].isZero() && values[2].isZero()))
            return null;
        let sb: string;
        if (values[0].equals(values[1]))
            sb.concat(values[0].toSimpleString(true)).concat("mm");
        else
            sb.concat(values[0].toSimpleString(true)).concat('-').concat(values[1].toSimpleString(true)).concat("mm");
        if (!values[2].isZero()) {
            sb.concat(' ');
            //            DecimalFormat format = new DecimalFormat("0.0");
            //            format.setRoundingMode(RoundingMode.HALF_UP);
            if (values[2].equals(values[3]))
                sb.concat(TagDescriptor.getFStopDescription(values[2].numberValue()));
            else
                sb.concat("f/").concat(values[2].numberValue().toString()).concat('-').concat(values[3].numberValue().toString());
        }
        return sb;
    }
    public getOrientationDescription(tag: number): string {
        return this.getIndexedDescription(tag, 1, "Top, left side (Horizontal / normal)", "Top, right side (Mirror horizontal)", "Bottom, right side (Rotate 180)", "Bottom, left side (Mirror vertical)", "Left side, top (Mirror horizontal and rotate 270 CW)", "Right side, top (Rotate 90 CW)", "Right side, bottom (Mirror horizontal and rotate 90 CW)", "Left side, bottom (Rotate 270 CW)");
    }
    public getShutterSpeedDescription(tag: number): string {
        // I believe this method to now be stable, but am leaving some alternative snippets of
        // code in here, to assist anyone who's looking into this (given that I don't have a public CVS).
        //        float apexValue = _directory.getFloat(ExifSubIFDDirectory.TAG_SHUTTER_SPEED);
        //        int apexPower = (int)Math.pow(2.0, apexValue);
        //        return "1/" + apexPower + " sec";
        // TODO test this method
        // thanks to Mark Edwards for spotting and patching a bug in the calculation of this
        // description (spotted bug using a Canon EOS 300D)
        // thanks also to Gli Blr for spotting this bug
        let apexValue = this._directory.getFloatObject(tag);
        if (apexValue == null)
            return null;
        if (apexValue <= 1) {
            let apexPower = (1 / (Math.exp(apexValue * Math.log(2))));
            let apexPower10 = Math.round(apexPower * 10.0);
            let fApexPower = apexPower10 / 10.0;
            //            DecimalFormat format = new DecimalFormat("0.##");
            //            format.setRoundingMode(RoundingMode.HALF_UP);
            //            return format.format(fApexPower) + " sec";
            return fApexPower.toString();
        }
        else {
            let apexPower = ((Math.exp(apexValue * Math.log(2))));
            return "1/" + apexPower + " sec";
        }
        /*
                // This alternative implementation offered by Bill Richards
                // TODO determine which is the correct / more-correct implementation
                double apexValue = _directory.getDouble(ExifSubIFDDirectory.TAG_SHUTTER_SPEED);
                double apexPower = Math.pow(2.0, apexValue);
    
                StringBuffer sb = new StringBuffer();
                if (apexPower > 1)
                    apexPower = Math.floor(apexPower);
    
                if (apexPower < 1) {
                    sb.append((int)Math.round(1/apexPower));
                } else {
                    sb.append("1/");
                    sb.append((int)apexPower);
                }
                sb.append(" sec");
                return sb.toString();
        */
    }
    // EXIF UserComment, GPSProcessingMethod and GPSAreaInformation
    public getEncodedTextDescription(tagType: number): string {
        let commentBytes = this._directory.getByteArray(tagType);
        if (commentBytes == null)
            return null;
        if (commentBytes.length == 0)
            return "";
        let encodingMap = new Map<string, string>();
        encodingMap.set("ASCII", 'utf-8'); // Someone suggested "ISO-8859-1".
        encodingMap.set("UNICODE", "UTF-16LE");
        encodingMap.set("JIS", "Shift-JIS"); // We assume this charset for now.  Another suggestion is "JIS".
        try {
            if (commentBytes.length >= 10) {
                let firstTenBytesString = commentBytes.slice(0, 10).toString();
                // try each encoding name
                for (let key of encodingMap.keys()) {
                    let encodingName: string = key;
                    let charset = encodingMap.get(key);
                    if (firstTenBytesString.startsWith(encodingName)) {
                        // skip any null or blank characters commonly present after the encoding name, up to a limit of 10 from the start
                        for (let j = encodingName.length; j < 10; j++) {
                            let b = commentBytes[j];
                            if (b.toString() != '\0' && b.toString() != ' ')
                                //                                return new String(commentBytes, j, commentBytes.length - j, charset).trim();
                                return '';
                        }
                        //                        return new String(commentBytes, 10, commentBytes.length - 10, charset).trim();
                        return '';
                    }
                }
            }
            // special handling fell through, return a plain string representation
            //            return new String(commentBytes, System.getProperty("file.encoding")).trim();
            return '';
        }
        catch (e) {
            return null;
        }
    }
}
export default TagDescriptor;
