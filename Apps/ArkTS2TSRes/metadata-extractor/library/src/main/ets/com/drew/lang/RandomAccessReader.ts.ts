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
import StringValue from '../metadata/StringValue';
abstract class RandomAccessReader {
    private _isMotorolaByteOrder: boolean = true;
    public abstract toUnshiftedOffset(localOffset: number): number;
    /**
     * Gets the byte value at the specified byte <code>index</code>.
     * <p>
     * Implementations should not perform any bounds checking in this method. That should be performed
     * in <code>validateIndex</code> and <code>isValidIndex</code>.
     *
     * @param index The index from which to read the byte
     * @return The read byte value
     * @throws IllegalArgumentException <code>index</code> is negative
     * @throws BufferBoundsException if the requested byte is beyond the end of the underlying data source
     * @throws IOException if the byte is unable to be read
     */
    public abstract getByte(index: number): number;
    /**
     * Returns the required number of bytes from the specified index from the underlying source.
     *
     * @param index The index from which the bytes begins in the underlying source
     * @param count The number of bytes to be returned
     * @return The requested bytes
     * @throws IllegalArgumentException <code>index</code> or <code>count</code> are negative
     * @throws BufferBoundsException if the requested bytes extend beyond the end of the underlying data source
     * @throws IOException if the byte is unable to be read
     */
    public abstract getBytes(index: number, count: number): Int8Array;
    /**
     * Ensures that the buffered bytes extend to cover the specified index. If not, an attempt is made
     * to read to that point.
     * <p>
     * If the stream ends before the point is reached, a {@link BufferBoundsException} is raised.
     *
     * @param index the index from which the required bytes start
     * @param bytesRequested the number of bytes which are required
     * @throws IOException if the stream ends before the required number of bytes are acquired
     */
    protected abstract validateIndex(index: number, bytesRequested: number): void;
    protected abstract isValidIndex(index: number, bytesRequested: number): boolean;
    /**
     * Returns the length of the data source in bytes.
     * <p>
     * This is a simple operation for implementations (such as {@link RandomAccessFileReader} and
     * {@link ByteArrayReader}) that have the entire data source available.
     * <p>
     * Users of this method must be aware that sequentially accessed implementations such as
     * {@link RandomAccessStreamReader} will have to read and buffer the entire data source in
     * order to determine the length.
     *
     * @return the length of the data source, in bytes.
     */
    public abstract getLength(): number;
    /**
     * Sets the endianness of this reader.
     * <ul>
     * <li><code>true</code> for Motorola (or big) endianness (also known as network byte order), with MSB before LSB.</li>
     * <li><code>false</code> for Intel (or little) endianness, with LSB before MSB.</li>
     * </ul>
     *
     * @param motorolaByteOrder <code>true</code> for Motorola/big endian, <code>false</code> for Intel/little endian
     */
    public setMotorolaByteOrder(motorolaByteOrder: boolean): void {
        this._isMotorolaByteOrder = motorolaByteOrder;
    }
    /**
     * Gets the endianness of this reader.
     * <ul>
     * <li><code>true</code> for Motorola (or big) endianness (also known as network byte order), with MSB before LSB.</li>
     * <li><code>false</code> for Intel (or little) endianness, with LSB before MSB.</li>
     * </ul>
     */
    public isMotorolaByteOrder(): boolean {
        return this._isMotorolaByteOrder;
    }
    /**
     * Gets whether a bit at a specific index is set or not.
     *
     * @param index the number of bits at which to test
     * @return true if the bit is set, otherwise false
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getBit(index: number): boolean {
        let byteIndex: number = index / 8;
        let bitIndex: number = index % 8;
        this.validateIndex(byteIndex, 1);
        let b: number = this.getByte(byteIndex);
        return ((b >> bitIndex) & 1) == 1;
    }
    /**
     * Returns an unsigned 8-bit int calculated from one byte of data at the specified index.
     *
     * @param index position within the data buffer to read byte
     * @return the 8 bit int value, between 0 and 255
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getUInt8(index: number): number {
        this.validateIndex(index, 1);
        return this.getByte(index) & 0xFF;
    }
    /**
     * Returns a signed 8-bit int calculated from one byte of data at the specified index.
     *
     * @param index position within the data buffer to read byte
     * @return the 8 bit int value, between 0x00 and 0xFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getInt8(index: number): number {
        this.validateIndex(index, 1);
        return this.getByte(index);
    }
    /**
     * Returns an unsigned 16-bit int calculated from two bytes of data at the specified index.
     *
     * @param index position within the data buffer to read first byte
     * @return the 16 bit int value, between 0x0000 and 0xFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getUInt16(index: number): number {
        this.validateIndex(index, 2);
        if (this._isMotorolaByteOrder) {
            // Motorola - MSB first
            return (this.getByte(index) << 8 & 0xFF00) |
                (this.getByte(index + 1) & 0xFF);
        }
        else {
            // Intel ordering - LSB first
            return (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Returns a signed 16-bit int calculated from two bytes of data at the specified index (MSB, LSB).
     *
     * @param index position within the data buffer to read first byte
     * @return the 16 bit int value, between 0x0000 and 0xFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getInt16(index: number): number {
        this.validateIndex(index, 2);
        if (this._isMotorolaByteOrder) {
            // Motorola - MSB first
            return (this.getByte(index) << 8 & 0xFF00) |
                (this.getByte(index + 1) & 0xFF);
        }
        else {
            // Intel ordering - LSB first
            return (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Get a 24-bit unsigned integer from the buffer, returning it as an int.
     *
     * @param index position within the data buffer to read first byte
     * @return the unsigned 24-bit int value as a long, between 0x00000000 and 0x00FFFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getInt24(index: number): number {
        this.validateIndex(index, 3);
        if (this._isMotorolaByteOrder) {
            // Motorola - MSB first (big endian)
            return (this.getByte(index) << 16 & 0xFF0000) |
                (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index + 2) & 0xFF);
        }
        else {
            // Intel ordering - LSB first (little endian)
            return (this.getByte(index + 2) << 16 & 0xFF0000) |
                (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Get a 32-bit unsigned integer from the buffer, returning it as a long.
     *
     * @param index position within the data buffer to read first byte
     * @return the unsigned 32-bit int value as a long, between 0x00000000 and 0xFFFFFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getUInt32(index: number): number {
        this.validateIndex(index, 4);
        if (this._isMotorolaByteOrder) {
            let a = (this.getByte(index) << 24 & 0xFF000000) |
                (this.getByte(index + 1) << 16 & 0xFF0000) |
                (this.getByte(index + 2) << 8 & 0xFF00) |
                (this.getByte(index + 3) & 0xFF);
            // Motorola - MSB first (big endian)
            return a;
        }
        else {
            // Intel ordering - LSB first (little endian)
            return (this.getByte(index + 3) << 24 & 0xFF000000) |
                (this.getByte(index + 2) << 16 & 0xFF0000) |
                (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Returns a signed 32-bit integer from four bytes of data at the specified index the buffer.
     *
     * @param index position within the data buffer to read first byte
     * @return the signed 32 bit int value, between 0x00000000 and 0xFFFFFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getInt32(index: number): number {
        this.validateIndex(index, 4);
        if (this._isMotorolaByteOrder) {
            // Motorola - MSB first (big endian)
            let a = (this.getByte(index) << 24 & 0xFF000000) |
                (this.getByte(index + 1) << 16 & 0xFF0000) |
                (this.getByte(index + 2) << 8 & 0xFF00) |
                (this.getByte(index + 3) & 0xFF);
            return a;
        }
        else {
            // Intel ordering - LSB first (little endian)
            return (this.getByte(index + 3) << 24 & 0xFF000000) |
                (this.getByte(index + 2) << 16 & 0xFF0000) |
                (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Get a signed 64-bit integer from the buffer.
     *
     * @param index position within the data buffer to read first byte
     * @return the 64 bit int value, between 0x0000000000000000 and 0xFFFFFFFFFFFFFFFF
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getInt64(index: number): number {
        this.validateIndex(index, 8);
        if (this._isMotorolaByteOrder) {
            // Motorola - MSB first
            return (this.getByte(index) << 56 & 0xFF00000000000000) |
                (this.getByte(index + 1) << 48 & 0xFF000000000000) |
                (this.getByte(index + 2) << 40 & 0xFF0000000000) |
                (this.getByte(index + 3) << 32 & 0xFF00000000) |
                (this.getByte(index + 4) << 24 & 0xFF000000) |
                (this.getByte(index + 5) << 16 & 0xFF0000) |
                (this.getByte(index + 6) << 8 & 0xFF00) |
                (this.getByte(index + 7) & 0xFF);
        }
        else {
            // Intel ordering - LSB first
            return (this.getByte(index + 7) << 56 & 0xFF00000000000000) |
                (this.getByte(index + 6) << 48 & 0xFF000000000000) |
                (this.getByte(index + 5) << 40 & 0xFF0000000000) |
                (this.getByte(index + 4) << 32 & 0xFF00000000) |
                (this.getByte(index + 3) << 24 & 0xFF000000) |
                (this.getByte(index + 2) << 16 & 0xFF0000) |
                (this.getByte(index + 1) << 8 & 0xFF00) |
                (this.getByte(index) & 0xFF);
        }
    }
    /**
     * Gets a s15.16 fixed point float from the buffer.
     * <p>
     * This particular fixed point encoding has one sign bit, 15 numerator bits and 16 denominator bits.
     *
     * @return the floating point value
     * @throws IOException the buffer does not contain enough bytes to service the request, or index is negative
     */
    public getS15Fixed16(index: number): number {
        this.validateIndex(index, 4);
        if (this._isMotorolaByteOrder) {
            let res: number = (this.getByte(index) & 0xFF) << 8 |
                (this.getByte(index + 1) & 0xFF);
            let d: number = (this.getByte(index + 2) & 0xFF) << 8 |
                (this.getByte(index + 3) & 0xFF);
            return res + d / 65536.0;
        }
        else {
            // this particular branch is untested
            let res: number = (this.getByte(index + 3) & 0xFF) << 8 |
                (this.getByte(index + 2) & 0xFF);
            let d: number = (this.getByte(index + 1) & 0xFF) << 8 |
                (this.getByte(index) & 0xFF);
            return res + d / 65536.0;
        }
    }
    public getFloat32(index: number): number {
        let value: number = this.getInt32(index);
        // TODO lpt native method
        return value;
        //    return Float.intBitsToFloat(value);
    }
    public getDouble64(index: number): number {
        let value: number = this.getInt64(index);
        // TODO lpt native method
        return value;
        //    return Double.longBitsToDouble(value);
    }
    public getStringValue(index: number, bytesRequested: number, charset: string): StringValue {
        return new StringValue(this.getBytes(index, bytesRequested), charset);
    }
    public getStringWithCharsetName(index: number, bytesRequested: number, charset: string): string {
        return StringValue.Int8Array2String(this.getBytes(index, bytesRequested), charset);
    }
    public getString(index: number, bytesRequested: number, charset: string): string {
        let bytes: Int8Array = this.getBytes(index, bytesRequested);
        return StringValue.Int8Array2String(bytes, charset);
    }
    /**
     * Creates a String from the _data buffer starting at the specified index,
     * and ending where <code>byte=='\0'</code> or where <code>length==maxLength</code>.
     *
     * @param index          The index within the buffer at which to start reading the string.
     * @param maxLengthBytes The maximum number of bytes to read.  If a zero-byte is not reached within this limit,
     *                       reading will stop and the string will be truncated to this length.
     * @return The read string.
     * @throws IOException The buffer does not contain enough bytes to satisfy this request.
     */
    public getNullTerminatedString(index: number, maxLengthBytes: number, charset: string): string {
        return StringValue.Int8Array2String(this.getNullTerminatedBytes(index, maxLengthBytes), charset);
    }
    public getNullTerminatedStringValue(index: number, maxLengthBytes: number, charset: string): StringValue {
        let bytes: Int8Array = this.getNullTerminatedBytes(index, maxLengthBytes);
        return new StringValue(bytes, charset);
    }
    /**
     * Returns the sequence of bytes punctuated by a <code>\0</code> value.
     *
     * @param index The index within the buffer at which to start reading the string.
     * @param maxLengthBytes The maximum number of bytes to read. If a <code>\0</code> byte is not reached within this limit,
     * the returned array will be <code>maxLengthBytes</code> long.
     * @return The read byte array, excluding the null terminator.
     * @throws IOException The buffer does not contain enough bytes to satisfy this request.
     */
    public getNullTerminatedBytes(index: number, maxLengthBytes: number): Int8Array {
        let buffer: Int8Array = this.getBytes(index, maxLengthBytes);
        // Count the number of non-null bytes
        let length: number = 0;
        while (length < buffer.length && buffer[length] != 0)
            length++;
        if (length == maxLengthBytes)
            return buffer;
        let bytes: Int8Array = new Int8Array(length);
        if (length > 0) {
            bytes = buffer;
        }
        return bytes;
    }
}
export default RandomAccessReader;
