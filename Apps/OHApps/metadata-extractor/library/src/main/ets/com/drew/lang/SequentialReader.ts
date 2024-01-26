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

abstract class SequentialReader {
  private _isMotorolaByteOrder: boolean = true;

  public abstract getPosition(): number;

  /**
       * Gets the next byte in the sequence.
       *
       * @return The read byte value
       */
  public abstract getByte(): number;

  /**
       * Retrieves bytes, writing them into a caller-provided buffer.
       * @param buffer The array to write bytes to.
       * @param offset The starting position within buffer to write to.
       * @param count The number of bytes to be written.
       */
  public abstract getBytes(count: number, buffer?: ArrayBuffer, offset?: number):Int8Array;


  /**
       * Skips forward in the sequence. If the sequence ends, an {@link EOFException} is thrown.
       *
       * @param n the number of byte to skip. Must be zero or greater.
       * @throws EOFException the end of the sequence is reached.
       * @throws IOException an error occurred reading from the underlying source.
       */
  public abstract skip(n: number);

  /**
       * Skips forward in the sequence, returning a boolean indicating whether the skip succeeded, or whether the sequence ended.
       *
       * @param n the number of byte to skip. Must be zero or greater.
       * @return a boolean indicating whether the skip succeeded, or whether the sequence ended.
       * @throws IOException an error occurred reading from the underlying source.
       */
  public abstract trySkip(n: number);

  /**
       * Returns an estimate of the number of bytes that can be read (or skipped
       * over) from this {@link SequentialReader} without blocking by the next
       * invocation of a method for this input stream. A single read or skip of
       * this many bytes will not block, but may read or skip fewer bytes.
       * <p>
       * Note that while some implementations of {@link SequentialReader} like
       * {@link SequentialByteArrayReader} will return the total remaining number
       * of bytes in the stream, others will not. It is never correct to use the
       * return value of this method to allocate a buffer intended to hold all
       * data in this stream.
       *
       * @return an estimate of the number of bytes that can be read (or skipped
       *         over) from this {@link SequentialReader} without blocking or
       *         {@code 0} when it reaches the end of the input stream.
       */
  public abstract available(): number;

  /**
       * Sets the endianness of this reader.
       * <ul>
       * <li><code>true</code> for Motorola (or big) endianness (also known as network byte order), with MSB before LSB.</li>
       * <li><code>false</code> for Intel (or little) endianness, with LSB before MSB.</li>
       * </ul>
       *
       * @param motorolaByteOrder <code>true</code> for Motorola/big endian, <code>false</code> for Intel/little endian
       */
  public setMotorolaByteOrder(motorolaByteOrder: boolean) {
    this._isMotorolaByteOrder = motorolaByteOrder;
  }

  /**
       * Gets the endianness of this reader.
       * <ul>
       * <li><code>true</code> for Motorola (or big) endianness (also known as network byte order), with MSB before LSB.</li>
       * <li><code>false</code> for Intel (or little) endianness, with LSB before MSB.</li>
       * </ul>
       */
  public isMotorolaByteOrder(): boolean
  {
    return this._isMotorolaByteOrder;
  }

  /**
       * Returns an unsigned 8-bit int calculated from the next byte of the sequence.
       *
       * @return the 8 bit int value, between 0 and 255
       */
  public getUInt8(): number
  {
    return this.getByte() & 0xFF;
  }

  /**
       * Returns a signed 8-bit int calculated from the next byte the sequence.
       *
       * @return the 8 bit int value, between 0x00 and 0xFF
       */
  public getInt8(): number
  {
    return this.getByte();
  }

  /**
       * Returns an unsigned 16-bit int calculated from the next two bytes of the sequence.
       *
       * @return the 16 bit int value, between 0x0000 and 0xFFFF
       */
  public getUInt16(): number
  {
    if (this._isMotorolaByteOrder) {
      // Motorola - MSB first
      return (this.getByte() << 8 & 0xFF00) |
      (this.getByte() & 0xFF);
    } else {
      // Intel ordering - LSB first
      return (this.getByte() & 0xFF) |
      (this.getByte() << 8 & 0xFF00);
    }
  }

  /**
       * Returns a signed 16-bit int calculated from two bytes of data (MSB, LSB).
       *
       * @return the 16 bit int value, between 0x0000 and 0xFFFF
       * @throws IOException the buffer does not contain enough bytes to service the request
       */
  public getInt16(): number
  {
    if (this._isMotorolaByteOrder) {
      // Motorola - MSB first
      return ((this.getByte() << 8 & 0xFF00) |
      (this.getByte() & 0xFF));
    } else {
      // Intel ordering - LSB first
      return ((this.getByte() & 0xFF) |
      (this.getByte() << 8 & 0xFF00));
    }
  }

  /**
       * Get a 32-bit unsigned integer from the buffer, returning it as a long.
       *
       * @return the unsigned 32-bit int value as a long, between 0x00000000 and 0xFFFFFFFF
       * @throws IOException the buffer does not contain enough bytes to service the request
       */
  public getUInt32(): number
  {
    if (this._isMotorolaByteOrder) {
      // Motorola - MSB first (big endian)
      return ((this.getByte()) << 24 & 0xFF000000) |
      ((this.getByte()) << 16 & 0xFF0000) |
      ((this.getByte()) << 8 & 0xFF00) |
      ((this.getByte()) & 0xFF);
    } else {
      // Intel ordering - LSB first (little endian)
      return ((this.getByte()) & 0xFF) |
      ((this.getByte()) << 8 & 0xFF00) |
      ((this.getByte()) << 16 & 0xFF0000) |
      ((this.getByte()) << 24 & 0xFF000000);
    }
  }

  /**
       * Returns a signed 32-bit integer from four bytes of data.
       *
       * @return the signed 32 bit int value, between 0x00000000 and 0xFFFFFFFF
       * @throws IOException the buffer does not contain enough bytes to service the request
       */
  public getInt32(): number
  {
    if (this._isMotorolaByteOrder) {
      // Motorola - MSB first (big endian)
      return (this.getByte() << 24 & 0xFF000000) |
      (this.getByte() << 16 & 0xFF0000) |
      (this.getByte() << 8 & 0xFF00) |
      (this.getByte() & 0xFF);
    } else {
      // Intel ordering - LSB first (little endian)
      return (this.getByte() & 0xFF) |
      (this.getByte() << 8 & 0xFF00) |
      (this.getByte() << 16 & 0xFF0000) |
      (this.getByte() << 24 & 0xFF000000);
    }
  }

  /**
       * Get a signed 64-bit integer from the buffer.
       *
       * @return the 64 bit int value, between 0x0000000000000000 and 0xFFFFFFFFFFFFFFFF
       * @throws IOException the buffer does not contain enough bytes to service the request
       */
  public getInt64(): number
  {
    if (this._isMotorolaByteOrder) {
      // Motorola - MSB first
      return (this.getByte() << 56 & 0xFF00000000000000) |
      (this.getByte() << 48 & 0xFF000000000000) |
      (this.getByte() << 40 & 0xFF0000000000) |
      (this.getByte() << 32 & 0xFF00000000) |
      (this.getByte() << 24 & 0xFF000000) |
      (this.getByte() << 16 & 0xFF0000) |
      (this.getByte() << 8 & 0xFF00) |
      (this.getByte() & 0xFF);
    } else {
      // Intel ordering - LSB first
      return (this.getByte() & 0xFF) |
      (this.getByte() << 8 & 0xFF00) |
      (this.getByte() << 16 & 0xFF0000) |
      (this.getByte() << 24 & 0xFF000000) |
      (this.getByte() << 32 & 0xFF00000000) |
      (this.getByte() << 40 & 0xFF0000000000) |
      (this.getByte() << 48 & 0xFF000000000000) |
      (this.getByte() << 56 & 0xFF00000000000000);
    }
  }

  /**
       * Gets a s15.16 fixed point float from the buffer.
       * <p>
       * This particular fixed point encoding has one sign bit, 15 numerator bits and 16 denominator bits.
       *
       * @return the floating point value
       * @throws IOException the buffer does not contain enough bytes to service the request
       */
  public getS15Fixed16(): number
  {
    if (this._isMotorolaByteOrder) {
      let res = (this.getByte() & 0xFF) << 8 |
      (this.getByte() & 0xFF);
      let d = (this.getByte() & 0xFF) << 8 |
      (this.getByte() & 0xFF);
      return (res + d / 65536.0);
    } else {
      // this particular branch is untested
      let d = (this.getByte() & 0xFF) |
      (this.getByte() & 0xFF) << 8;
      let res = (this.getByte() & 0xFF) |
      (this.getByte() & 0xFF) << 8;
      return (res + d / 65536.0);
    }
  }

  public getFloat32(): number
  {
    return this.getInt32();
  }

  public getDouble64(): number
  {
    return this.getInt64();
  }

  public getString(bytesRequested: number, charset?: string): string
  {
    let bytes = this.getBytes(bytesRequested);
    if (charset == null) {
      return StringValue.Int8Array2String(bytes, 'utf-8');
    }

    return StringValue.Int8Array2String(bytes, charset);

  }

  public getStringValue(bytesRequested: number, charset: string): StringValue
  {
    return new StringValue(this.getBytes(bytesRequested), charset);
  }

  /**
       * Creates a String from the stream, ending where <code>byte=='\0'</code> or where <code>length==maxLength</code>.
       *
       * @param maxLengthBytes The maximum number of bytes to read.  If a zero-byte is not reached within this limit,
       *                       reading will stop and the string will be truncated to this length.
       * @return The read string.
       * @throws IOException The buffer does not contain enough bytes to satisfy this request.
       */
  public getNullTerminatedString(maxLengthBytes: number, charset: string): string
  {
    return this.getNullTerminatedStringValue(maxLengthBytes, charset).toString();
  }

  /**
       * Creates a String from the stream, ending where <code>byte=='\0'</code> or where <code>length==maxLength</code>.
       *
       * @param maxLengthBytes The maximum number of bytes to read.  If a <code>\0</code> byte is not reached within this limit,
       *                       reading will stop and the string will be truncated to this length.
       * @param charset The <code>Charset</code> to register with the returned <code>StringValue</code>, or <code>null</code> if the encoding
       *                is unknown
       * @return The read string.
       * @throws IOException The buffer does not contain enough bytes to satisfy this request.
       */
  public getNullTerminatedStringValue(maxLengthBytes: number, charset: string): StringValue
  {
    let bytes: Int8Array = this.getNullTerminatedBytes(maxLengthBytes);

    return new StringValue(bytes, charset);
  }

  /**
       * Returns the sequence of bytes punctuated by a <code>\0</code> value.
       *
       * @param maxLengthBytes The maximum number of bytes to read. If a <code>\0</code> byte is not reached within this limit,
       * the returned array will be <code>maxLengthBytes</code> long.
       * @return The read byte array, excluding the null terminator.
       * @throws IOException The buffer does not contain enough bytes to satisfy this request.
       */
  public getNullTerminatedBytes(maxLengthBytes: number): Int8Array
  {
    let buffer = new Int8Array(maxLengthBytes);

    // Count the number of non-null bytes
    let length = 0;
    while (length < buffer.length && (buffer[length] = this.getByte()) != 0)
    length++;

    if (length == maxLengthBytes)
    return buffer;

    let bytes = new Int8Array(length);
    if (length > 0) {
      bytes = buffer.slice(0, length);
    }
    return bytes;
  }
}

export default SequentialReader
