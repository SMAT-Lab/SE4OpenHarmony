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

import Rational from '../lang/Rational';
import StringValue from './StringValue';
import TagDescriptor from './TagDescriptor';
import Tag from './Tag'

/**
 * Abstract base class for all directory implementations, having methods for getting and setting tag values of various
 * data types.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
abstract class Directory {
  public static readonly _floatFormatPattern: String = "0.###";

  /** Map of values hashed by type identifiers. */
  public readonly _tagMap: Map<number, any> = new Map<number, Object>();

  /**
       * A convenient list holding tag values in the order in which they were stored.
       * This is used for creation of an iterator, and for counting the number of
       * defined tags.
       */
  public readonly _definedTagList: Set<Tag> = new Set<Tag>();
  private readonly _errorList: Set<string> = new Set<string>();

  /** The descriptor used to interpret tag values. */
  public _descriptor: TagDescriptor<any>;
  private _parent: Directory;

  // ABSTRACT METHODS

  /**
       * Provides the name of the directory, for display purposes.  E.g. <code>Exif</code>
       *
       * @return the name of the directory
       */

  public abstract getName();

  /**
       * Provides the map of tag names, hashed by tag type identifier.
       *
       * @return the map of tag names
       */

  protected abstract getTagNameMap(): Map<number, string> ;

  constructor() {
  }

  // VARIOUS METHODS

  /**
       * Gets a value indicating whether the directory is empty, meaning it contains no errors and no tag values.
       */
  public isEmpty(): boolean
  {
    return this.isEmptyObject(this._errorList) && this.isEmptyObject(this._definedTagList);

  }

  public isEmptyObject(list: Set<any>): boolean{
    for (let elem in list)
    return!1
    return!0
  }

  /**
       * Indicates whether the specified tag type has been set.
       *
       * @param tagType the tag type to check for
       * @return true if a value exists for the specified tag type, false if not
       */
  public containsTag(tagType: number) {
    return this._tagMap.has(tagType);
  }

  /**
       * Returns an Iterator of Tag instances that have been set in this Directory.
       *
       * @return an Iterator of Tag instances
       */

  public getTags() {
    return this._definedTagList;
  }

  /**
       * Returns the number of tags set in this Directory.
       *
       * @return the number of tags set in this Directory
       */
  public getTagCount() {
    return this._definedTagList.size;
  }

  /**
       * Sets the descriptor used to interpret tag values.
       *
       * @param descriptor the descriptor used to interpret tag values
       */
  public setDescriptor(descriptor: TagDescriptor<any>) {
    if (descriptor == null)
    throw new Error("cannot set a null descriptor");
    this._descriptor = descriptor;
  }

  /**
       * Registers an error message with this directory.
       *
       * @param message an error message.
       */
  public addError(message: string) {
    this._errorList.add(message);
  }

  /**
       * Gets a value indicating whether this directory has any error messages.
       *
       * @return true if the directory contains errors, otherwise false
       */
  public hasErrors() {
    return this._errorList.size > 0;
  }

  /**
       * Used to iterate over any error messages contained in this directory.
       *
       * @return an iterable collection of error message strings.
       */

  public getErrors(): Set<String>
  {
    return this._errorList;
  }

  /** Returns the count of error messages in this directory. */
  public getErrorCount() {
    return this._errorList.size;
  }

  public getParent(): Directory
  {
    return this._parent;
  }

  public setParent(parent: Directory) {
    this._parent = parent;
  }

  // TAG SETTERS

  /**
       * Sets an <code>int</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as an int
       */
  public setInt(tagType: number, value: number) {
    this.setObject(tagType, value);
  }

  /**
       * Sets an <code>int[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param ints    the int array to store
       */
  public setIntArray(tagType: number, ints: Int32Array) {
    this.setObjectArray(tagType, ints);
  }

  /**
       * Sets a <code>float</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a float
       */
  public setFloat(tagType: number, value: number) {
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>float[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param floats  the float array to store
       */
  public setFloatArray(tagType: number, floats: Int32Array) {
    this.setObjectArray(tagType, floats);
  }

  /**
       * Sets a <code>double</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a double
       */
  public setDouble(tagType: number, value: number) {
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>double[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param doubles the double array to store
       */
  public setDoubleArray(tagType: number, doubles: Int32Array) {
    this.setObjectArray(tagType, doubles);
  }

  /**
       * Sets a <code>StringValue</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a StringValue
       */
  public setStringValue(tagType: number, value: StringValue) {
    if (value == null)
    throw new Error("cannot set a null StringValue");
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>String</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a String
       */
  public setString(tagType: number, value: string) {
    if (value == null)
    throw new Error("cannot set a null String");
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>String[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param strings the String array to store
       */
  public setStringArray(tagType: number, strings: Array<string>) {
    this.setObjectArray(tagType, strings);
  }

  /**
       * Sets a <code>StringValue[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param strings the StringValue array to store
       */
  public setStringValueArray(tagType: number, strings: Array<StringValue>) {
    this.setObjectArray(tagType, strings);
  }

  /**
       * Sets a <code>boolean</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a boolean
       */
  public setBoolean(tagType: number, value: boolean) {
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>long</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a long
       */
  public setLong(tagType: number, value: number) {
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>java.util.Date</code> value for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag as a java.util.Date
       */
  public setDate(tagType: number, value: Date) {
    this.setObject(tagType, value);
  }

  /**
       * Sets a <code>Rational</code> value for the specified tag.
       *
       * @param tagType  the tag's value as an int
       * @param rational rational number
       */
  public setRational(tagType: number, rational: any) {
    this.setObject(tagType, rational);
  }

  /**
       * Sets a <code>Rational[]</code> (array) for the specified tag.
       *
       * @param tagType   the tag identifier
       * @param rationals the Rational array to store
       */
  public setRationalArray(tagType: number, rationals: Array<any>) {
    this.setObjectArray(tagType, rationals);
  }

  /**
       * Sets a <code>byte[]</code> (array) for the specified tag.
       *
       * @param tagType the tag identifier
       * @param bytes   the byte array to store
       */
  public setByteArray(tagType: number, bytes: Int8Array) {
    this.setObjectArray(tagType, bytes);
  }

  /**
       * Sets a <code>Object</code> for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param value   the value for the specified tag
       * @throws NullPointerException if value is <code>null</code>
       */
  public setObject(tagType: number, value: any) {
    if (value == null)
    throw new Error("cannot set a null object");

    if (!this._tagMap.has(tagType)) {
      this._definedTagList.add(new Tag(tagType, this));
    }
    this._tagMap.set(tagType, value);
  }

  /**
       * Sets an array <code>Object</code> for the specified tag.
       *
       * @param tagType the tag's value as an int
       * @param array   the array of values for the specified tag
       */
  public setObjectArray(tagType: number, array: Object) {
    // for now, we don't do anything special -- this method might be a candidate for removal once the dust settles
    this.setObject(tagType, array);
  }

  // TAG GETTERS

  /**
       * Returns the specified tag's value as an int, if possible.  Every attempt to represent the tag's value as an int
       * is taken.  Here is a list of the action taken depending upon the tag's original type:
       * <ul>
       * <li> int - Return unchanged.
       * <li> Number - Return an int value (real numbers are truncated).
       * <li> Rational - Truncate any fractional part and returns remaining int.
       * <li> String - Attempt to parse string as an int.  If this fails, convert the char[] to an int (using shifts and OR).
       * <li> Rational[] - Return int value of first item in array.
       * <li> byte[] - Return int value of first item in array.
       * <li> int[] - Return int value of first item in array.
       * </ul>
       *
       * @throws MetadataException if no value exists for tagType or if it cannot be converted to an int.
       */
  public getInt(tagType: number) {
    let integer = this.getInteger(tagType);
    if (integer != null)
    return integer;

    let o = this.getObject(tagType);
    if (o == null)
    throw new Error("Tag '" + this.getTagName(tagType) + "' has not been set -- check using containsTag() first");
    throw new Error("Tag '" + tagType + "' cannot be converted to int.  It is of type '" + o.getClass() + "'.");
  }

  /**
       * Returns the specified tag's value as an Integer, if possible.  Every attempt to represent the tag's value as an
       * Integer is taken.  Here is a list of the action taken depending upon the tag's original type:
       * <ul>
       * <li> int - Return unchanged
       * <li> Number - Return an int value (real numbers are truncated)
       * <li> Rational - Truncate any fractional part and returns remaining int
       * <li> String - Attempt to parse string as an int.  If this fails, convert the char[] to an int (using shifts and OR)
       * <li> Rational[] - Return int value of first item in array if length &gt; 0
       * <li> byte[] - Return int value of first item in array if length &gt; 0
       * <li> int[] - Return int value of first item in array if length &gt; 0
       * </ul>
       *
       * If the value is not found or cannot be converted to int, <code>null</code> is returned.
       */
  public getInteger(tagType: number) {
    let o = this.getObject(tagType);

    if (o == null)
    return null;

    return o;
  }

  /**
       * Gets the specified tag's value as a String array, if possible.  Only supported
       * where the tag is set as StringValue[], String[], StringValue, String, int[], byte[] or Rational[].
       *
       * @param tagType the tag identifier
       * @return the tag's value as an array of Strings. If the value is unset or cannot be converted, <code>null</code> is returned.
       */
  public getStringArray(tagType: number) {
    let o = this.getObject(tagType);
    if (o == null)
    return null;

    return o;
  }

  /**
       * Gets the specified tag's value as a StringValue array, if possible.
       * Only succeeds if the tag is set as StringValue[], or StringValue.
       *
       * @param tagType the tag identifier
       * @return the tag's value as an array of StringValues. If the value is unset or cannot be converted, <code>null</code> is returned.
       */
  public getStringValueArray(tagType: number) {
    let o = this.getObject(tagType);
    if (o == null)
    return null;

    return o;
  }

  /**
       * Gets the specified tag's value as an int array, if possible.  Only supported
       * where the tag is set as String, Integer, int[], byte[] or Rational[].
       *
       * @param tagType the tag identifier
       * @return the tag's value as an int array
       */
  public getIntArray(tagType: number) {
    let o = this.getObject(tagType);
    if (o == null)
    return null;
    return o;
  }

  /**
       * Gets the specified tag's value as an byte array, if possible.  Only supported
       * where the tag is set as String, Integer, int[], byte[] or Rational[].
       *
       * @param tagType the tag identifier
       * @return the tag's value as a byte array
       */
  public getByteArray(tagType: number): Int8Array
  {
    let o = this.getObject(tagType);
    if (o == null) {
      return null;
    }
    return o;
  }

  /** Returns the specified tag's value as a double, if possible. */
  public getDouble(tagType: number): number
  {
    let value = this.getDoubleObject(tagType);
    if (value != null)
    return value;
    let o = this.getObject(tagType);
    if (o == null)
    throw new Error("Tag '" + this.getTagName(tagType) + "' has not been set -- check using containsTag() first");
    throw new Error("Tag '" + tagType + "' cannot be converted to a double.  It is of type .");
  }

  /** Returns the specified tag's value as a Double.  If the tag is not set or cannot be converted, <code>null</code> is returned. */
  public getDoubleObject(tagType: number): number
  {
    let o = this.getObject(tagType);
    if (o == null) return null;
    return o;
  }

  /** Returns the specified tag's value as a float, if possible. */
  public getFloat(tagType: number): number
  {
    let value = this.getFloatObject(tagType);
    if (value != null)
    return value;
    let o = this.getObject(tagType);
    if (o == null)
    throw new Error("Tag '" + this.getTagName(tagType) + "' has not been set -- check using containsTag() first");
    throw new Error("Tag '" + tagType + "' cannot be converted to a float.  It is of type .");
  }

  /** Returns the specified tag's value as a float.  If the tag is not set or cannot be converted, <code>null</code> is returned. */
  public getFloatObject(tagType: number): number
  {
    let o = this.getObject(tagType);
    if (o == null)
    return null;
    return o;
  }

  /** Returns the specified tag's value as a long, if possible. */
  public getLong(tagType: number): number
  {
    let value = this.getLongObject(tagType);
    if (value != null)
    return value;
    let o = this.getObject(tagType);
    if (o == null)
    throw new Error("Tag '" + this.getTagName(tagType) + "' has not been set -- check using containsTag() first");
    throw new Error("Tag '" + tagType + "' cannot be converted to a long.  It is of type.");
  }

  /** Returns the specified tag's value as a long.  If the tag is not set or cannot be converted, <code>null</code> is returned. */
  public getLongObject(tagType: number): number
  {
    let o = this.getObject(tagType);
    if (o == null)
    return null;
    return o;
  }

  /** Returns the specified tag's value as a boolean, if possible. */
  public getBoolean(tagType: number): boolean
  {
    let value = this.getBooleanObject(tagType);
    if (value != null)
    return value;
    let o = this.getObject(tagType);
    if (o == null)
    throw new Error("Tag '" + this.getTagName(tagType) + "' has not been set -- check using containsTag() first");
    throw new Error("Tag '" + tagType + "' cannot be converted to a boolean.  It is of type.");
  }

  /** Returns the specified tag's value as a boolean.  If the tag is not set or cannot be converted, <code>null</code> is returned. */
  public getBooleanObject(tagType: number): boolean
  {
    let o = this.getObject(tagType);
    if (o == null)
    return null;
    return o;
  }

  /**
   * Returns the specified tag's value as a java.util.Date.  If the value is unset or cannot be converted, <code>null</code> is returned.
   * <p>
   * If the underlying value is a {@link String}, then attempts will be made to parse the string as though it is in
   * the GMT {@link TimeZone}.  If the {@link TimeZone} is known, call the overload that accepts one as an argument.
   */


  /**
   * Returns the specified tag's value as a java.util.Date.  If the value is unset or cannot be converted, <code>null</code> is returned.
   * <p>
   * If the underlying value is a {@link String}, then attempts will be made to parse the string as though it is in
   * the {@link TimeZone} represented by the {@code timeZone} parameter (if it is non-null).  Note that this parameter
   * is only considered if the underlying value is a string and it has no time zone information, otherwise it has no effect.
   */
  //    public java.util.Date getDate(int tagType, @Nullable TimeZone timeZone)
  //    {
  //        return getDate(tagType, null, timeZone);
  //    }

  /**
   * Returns the specified tag's value as a java.util.Date.  If the value is unset or cannot be converted, <code>null</code> is returned.
   * <p>
   * If the underlying value is a {@link String}, then attempts will be made to parse the string as though it is in
   * the {@link TimeZone} represented by the {@code timeZone} parameter (if it is non-null).  Note that this parameter
   * is only considered if the underlying value is a string and it has no time zone information, otherwise it has no effect.
   * In addition, the {@code subsecond} parameter, which specifies the number of digits after the decimal point in the seconds,
   * is set to the returned Date. This parameter is only considered if the underlying value is a string and is has
   * no subsecond information, otherwise it has no effect.
   *
   * @param tagType the tag identifier
   * @param subsecond the subsecond value for the Date
   * @param timeZone the time zone to use
   * @return a Date representing the time value
   */
  public getDate(tagType: number, subsecond?: string, timeZone?: any): Date
  {
    let o = this.getObject(tagType);
    if(o instanceof Date){
      return o;
    }
    return null;
  }

  /** Returns the specified tag's value as a Rational.  If the value is unset or cannot be converted, <code>null</code> is returned. */
  public getRational(tagType: number): Rational
  {
    let o = this.getObject(tagType);

    if (o == null)
    return null;

    return o;
  }

  /** Returns the specified tag's value as an array of Rational.  If the value is unset or cannot be converted, <code>null</code> is returned. */
  public getRationalArray(tagType: number): Array<Rational>
  {
    let o = this.getObject(tagType);
    if (o == null)
    return null;

    return o;
  }
  //
  /**
   * Returns the specified tag's value as a String.  This value is the 'raw' value.  A more presentable decoding
   * of this value may be obtained from the corresponding Descriptor.
   *
   * @return the String representation of the tag's value, or
   *         <code>null</code> if the tag hasn't been defined.
   */
  public getString(tagType: number, charset?: string): string
  {
    if (charset != null) {
      let bytes = this.getByteArray(tagType);
      if (bytes == null) return null;
      return StringValue.Int8Array2String(bytes, charset);
    }
    let o = this.getObject(tagType);
    if (o == null)
    return null;

    return o;
  }

  public getStringValue(tagType: number): StringValue
  {
    let o = this.getObject(tagType);
    if (o instanceof StringValue)
    return o;
    return null;
  }

  /**
       * Returns the object hashed for the particular tag type specified, if available.
       *
       * @param tagType the tag type identifier
       * @return the tag's value as an Object if available, else <code>null</code>
       */
  public getObject(tagType: number): any
  {
    return this._tagMap.get(tagType);
  }

  // OTHER METHODS

  /**
   * Returns the name of a specified tag as a String.
   *
   * @param tagType the tag type identifier
   * @return the tag's name as a String
   */
  public getTagName(tagType: number): string
  {
    let nameMap = this.getTagNameMap();
    return nameMap.get(tagType);
  }

  /**
   * Gets whether the specified tag is known by the directory and has a name.
   *
   * @param tagType the tag type identifier
   * @return whether this directory has a name for the specified tag
   */
  public hasTagName(tagType: number): boolean
  {
    return this.getTagNameMap().has(tagType);
  }

  /**
   * Provides a description of a tag's value using the descriptor set by
   * <code>setDescriptor(Descriptor)</code>.
   *
   * @param tagType the tag type identifier
   * @return the tag value's description as a String
   */
  public getDescription(tagType: number): string
  {
    //        assert(_descriptor != null);
    return this._descriptor.getDescription(tagType);
  }

  public toString(): string
  {
    return this.getName() + this._tagMap.size + this._tagMap.size == 1 ? "tag" : "tags";
  }
}

export default Directory
