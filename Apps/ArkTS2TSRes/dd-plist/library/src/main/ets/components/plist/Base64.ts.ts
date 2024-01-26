/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import TextUtils from '../utils/TextUtils';
import NumUtils from '../utils/NumUtils';
import { FileUtils } from '../utils/FileUtils';
class Base64 {
    /* ********  P U B L I C   F I E L D S  ******** */
    /**
         * No options specified. Value is zero.
         */
    public static readonly NO_OPTIONS: number = 0;
    /**
         * Specify encoding in first bit. Value is one.
         */
    public static readonly ENCODE: number = 1;
    /**
         * Specify decoding in first bit. Value is zero.
         */
    public static readonly DECODE: number = 0;
    /**
         * Specify that data should be gzip-compressed in second bit. Value is two.
         */
    public static readonly GZIP: number = 2;
    /**
         * Specify that gzipped data should <em>not</em> be automatically gunzipped.
         */
    public static readonly DONT_GUNZIP: number = 4;
    /**
         * Do break lines when encoding. Value is 8.
         */
    public static readonly DO_BREAK_LINES: number = 8;
    /**
         * Encode using Base64-like encoding that is URL- and Filename-safe as described
         */
    public static readonly URL_SAFE: number = 16;
    /**
         * Encode using the special "ordered" dialect of Base64 described here:
         */
    public static readonly ORDERED: number = 32;
    /* ********  P R I V A T E   F I E L D S  ******** */
    /**
         * Maximum line length (76) of Base64 output.
         */
    private static readonly MAX_LINE_LENGTH: number = 76;
    /**
         * The equals sign (=) as a byte.
         */
    private static readonly EQUALS_SIGN: number = 61; /*'='.charCodeAt(0)*/
    /**
         * The new line character (\n) as a byte.
         */
    private static readonly NEW_LINE: number = 10; /*\n*/
    /**
         * Preferred encoding.
         */
    private static readonly PREFERRED_ENCODING: string = "US-ASCII";
    private static readonly WHITE_SPACE_ENC: number = -5; // Indicates white space in encoding
    private static readonly EQUALS_SIGN_ENC: number = -1; // Indicates equals sign in encoding
    /**
         * Defeats instantiation.
         */
    private constructor() {
    }
    /* ********  S T A N D A R D   B A S E 6 4   A L P H A B E T  ******** */
    /**
         * The 64 valid Base64 values.
         */
    /* Host platform me be something funny like EBCDIC, so we hardcode these values. */
    private static readonly _STANDARD_ALPHABET: Array<number> = [
        'A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0), 'E'.charCodeAt(0), 'F'.charCodeAt(0), 'G'.charCodeAt(0),
        'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0), 'M'.charCodeAt(0), 'N'.charCodeAt(0),
        'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0), 'U'.charCodeAt(0),
        'V'.charCodeAt(0), 'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0),
        'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0), 'e'.charCodeAt(0), 'f'.charCodeAt(0), 'g'.charCodeAt(0),
        'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0), 'm'.charCodeAt(0), 'n'.charCodeAt(0),
        'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0), 'u'.charCodeAt(0),
        'v'.charCodeAt(0), 'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0),
        '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0), '5'.charCodeAt(0),
        '6'.charCodeAt(0), '7'.charCodeAt(0), '8'.charCodeAt(0), '9'.charCodeAt(0), '+'.charCodeAt(0), '/'.charCodeAt(0)
    ];
    /**
         * Translates a Base64 value to either its 6-bit reconstruction value
         * or a negative number indicating some other meaning.
         */
    private static readonly _STANDARD_DECODABET: Array<number> = [
        -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -5, -5,
        -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        62,
        -9, -9, -9,
        63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
        -9, -9, -9,
        -1,
        -9, -9, -9,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        -9, -9, -9, -9, -9, -9,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
        -9, -9, -9, -9, -9 // Decimal 123 - 127
        ,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9 // Decimal 244 - 255
    ];
    /* ********  U R L   S A F E   B A S E 6 4   A L P H A B E T  ******** */
    /**
         * Used in the URL- and Filename-safe dialect described in Section 4 of RFC3548:
         * <a href="http://www.faqs.org/rfcs/rfc3548.html">http://www.faqs.org/rfcs/rfc3548.html</a>.
         * Notice that the last two bytes become "hyphen" and "underscore" instead of "plus" and "slash."
         */
    private static readonly _URL_SAFE_ALPHABET: Array<number> = [
        'A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0), 'E'.charCodeAt(0), 'F'.charCodeAt(0), 'G'.charCodeAt(0),
        'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0), 'M'.charCodeAt(0), 'N'.charCodeAt(0),
        'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0), 'U'.charCodeAt(0),
        'V'.charCodeAt(0), 'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0),
        'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0), 'e'.charCodeAt(0), 'f'.charCodeAt(0), 'g'.charCodeAt(0),
        'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0), 'm'.charCodeAt(0), 'n'.charCodeAt(0),
        'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0), 'u'.charCodeAt(0),
        'v'.charCodeAt(0), 'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0),
        '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0), '5'.charCodeAt(0),
        '6'.charCodeAt(0), '7'.charCodeAt(0), '8'.charCodeAt(0), '9'.charCodeAt(0), '-'.charCodeAt(0), '_'.charCodeAt(0)
    ];
    /**
         * Used in decoding URL- and Filename-safe dialects of Base64.
         */
    private static readonly _URL_SAFE_DECODABET: Array<number> = [
        -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -5, -5,
        -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9,
        -9,
        62,
        -9,
        -9,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
        -9, -9, -9,
        -1,
        -9, -9, -9,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        -9, -9, -9, -9,
        63,
        -9,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
        -9, -9, -9, -9, -9 // Decimal 123 - 127
        ,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9 // Decimal 244 - 255
    ];
    /* ********  O R D E R E D   B A S E 6 4   A L P H A B E T  ******** */
    /**
         * I don't get the point of this technique, but someone requested it,
         * and it is described here:
         * <a href="http://www.faqs.org/qa/rfcc-1940.html">http://www.faqs.org/qa/rfcc-1940.html</a>.
         */
    private static readonly _ORDERED_ALPHABET: Array<number> = [
        '-'.charCodeAt(0),
        '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0),
        '5'.charCodeAt(0), '6'.charCodeAt(0), '7'.charCodeAt(0), '8'.charCodeAt(0), '9'.charCodeAt(0),
        'A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0), 'E'.charCodeAt(0), 'F'.charCodeAt(0), 'G'.charCodeAt(0),
        'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0), 'M'.charCodeAt(0), 'N'.charCodeAt(0),
        'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0), 'U'.charCodeAt(0),
        'V'.charCodeAt(0), 'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0),
        '_'.charCodeAt(0),
        'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0), 'e'.charCodeAt(0), 'f'.charCodeAt(0), 'g'.charCodeAt(0),
        'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0), 'm'.charCodeAt(0), 'n'.charCodeAt(0),
        'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0), 'u'.charCodeAt(0),
        'v'.charCodeAt(0), 'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0)
    ];
    /**
         * Used in decoding the "ordered" dialect of Base64.
         */
    private static readonly _ORDERED_DECODABET: Array<number> = [
        -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -5, -5,
        -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9,
        -5,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9,
        -9,
        0,
        -9,
        -9,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        -9, -9, -9,
        -1,
        -9, -9, -9,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        -9, -9, -9, -9,
        37,
        -9,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
        -9, -9, -9, -9, -9 // Decimal 123 - 127
        ,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9,
        -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9, -9 // Decimal 244 - 255
    ];
    /* ********  D E T E R M I N E   W H I C H   A L H A B E T  ******** */
    /**
         * Returns one of the _SOMETHING_ALPHABET byte arrays depending on
         * the options specified.
         * It's possible, though silly, to specify ORDERED <b>and</b> URLSAFE
         * in which case one of them will be picked, though there is
         * no guarantee as to which one will be picked.
         */
    private static getAlphabet(options: number): Array<number> {
        if ((options & Base64.URL_SAFE) == Base64.URL_SAFE) {
            return Base64._URL_SAFE_ALPHABET;
        }
        else if ((options & Base64.ORDERED) == Base64.ORDERED) {
            return Base64._ORDERED_ALPHABET;
        }
        else {
            return Base64._STANDARD_ALPHABET;
        }
    } // end getAlphabet
    /**
         * Returns one of the _SOMETHING_DECODABET byte arrays depending on
         * the options specified.
         * It's possible, though silly, to specify ORDERED and URL_SAFE
         * in which case one of them will be picked, though there is
         * no guarantee as to which one will be picked.
         */
    private static getDecodabet(options: number): Array<number> {
        if ((options & Base64.URL_SAFE) == Base64.URL_SAFE) {
            return Base64._URL_SAFE_DECODABET;
        }
        else if ((options & Base64.ORDERED) == Base64.ORDERED) {
            return Base64._ORDERED_DECODABET;
        }
        else {
            return Base64._STANDARD_DECODABET;
        }
    } // end getAlphabet
    /* ********  E N C O D I N G   M E T H O D S  ******** */
    /**
         * Encodes up to the first three bytes of array <var>threeBytes</var>
         * and returns a four-byte array in Base64 notation.
         * The actual number of significant bytes in your array is
         * given by <var>numSigBytes</var>.
         * The array <var>threeBytes</var> needs only be as big as
         * <var>numSigBytes</var>.
         * Code can reuse a byte array by passing a four-byte array as <var>b4</var>.
         *
         * @param b4          A reusable byte array to reduce array instantiation
         * @param threeBytes  the array to convert
         * @param numSigBytes the number of significant bytes in your array
         * @return four byte array in Base64 notation.
         * @since 1.5.1
         */
    //    private static encode3to4(b4: Array<number>, threeBytes: Array<number>, numSigBytes: number, options: number): Array<number> {
    //        encode3to4(threeBytes, 0, numSigBytes, b4, 0, options);
    //        return b4;
    //    }   // end encode3to4
    /**
         * <p>Encodes up to three bytes of the array <var>source</var>
         * and writes the resulting four Base64 bytes to <var>destination</var>.
         * The source and destination arrays can be manipulated
         * anywhere along their length by specifying
         * <var>srcOffset</var> and <var>destOffset</var>.
         * This method does not check to make sure your arrays
         * are large enough to accomodate <var>srcOffset</var> + 3 for
         * the <var>source</var> array or <var>destOffset</var> + 4 for
         * the <var>destination</var> array.
         * The actual number of significant bytes in your array is
         * given by <var>numSigBytes</var>.</p>
         * <p>This is the lowest level of the encoding methods with
         * all possible parameters.</p>
         *
         * @param source      the array to convert
         * @param srcOffset   the index where conversion begins
         * @param numSigBytes the number of significant bytes in your array
         * @param destination the array to hold the conversion
         * @param destOffset  the index where output will be put
         * @return the <var>destination</var> array
         * @since 1.3
         */
    private static encode3to4(source: Int8Array, numSigBytes: number, destination: Int8Array, options: number, srcOffset?: number, destOffset?: number): Int8Array {
        if (srcOffset == undefined || srcOffset == null) {
            srcOffset = 0;
        }
        if (destOffset == undefined || destOffset == null) {
            destOffset = 0;
        }
        let ALPHABET: Array<number> = Base64.getAlphabet(options);
        // Create buffer with zero-padding if there are only one or two
        // significant bytes passed in the array.
        let inBuff: number = (numSigBytes > 0 ? ((source[srcOffset] << 24) >>> 8) : 0)
            | (numSigBytes > 1 ? ((source[srcOffset + 1] << 24) >>> 16) : 0)
            | (numSigBytes > 2 ? ((source[srcOffset + 2] << 24) >>> 24) : 0);
        switch (numSigBytes) {
            case 3:
                destination[destOffset] = ALPHABET[inBuff >>> 18];
                destination[destOffset + 1] = ALPHABET[(inBuff >>> 12) & 0x3f];
                destination[destOffset + 2] = ALPHABET[(inBuff >>> 6) & 0x3f];
                destination[destOffset + 3] = ALPHABET[(inBuff) & 0x3f];
                return destination;
            case 2:
                destination[destOffset] = ALPHABET[inBuff >>> 18];
                destination[destOffset + 1] = ALPHABET[(inBuff >>> 12) & 0x3f];
                destination[destOffset + 2] = ALPHABET[(inBuff >>> 6) & 0x3f];
                destination[destOffset + 3] = Base64.EQUALS_SIGN;
                return destination;
            case 1:
                destination[destOffset] = ALPHABET[inBuff >>> 18];
                destination[destOffset + 1] = ALPHABET[(inBuff >>> 12) & 0x3f];
                destination[destOffset + 2] = Base64.EQUALS_SIGN;
                destination[destOffset + 3] = Base64.EQUALS_SIGN;
                return destination;
            default:
                return destination;
        } // end switch
    } // end encode3to4
    /**
         * Encodes a byte array into Base64 notation.
         * Does not GZip-compress data.
         *
         * @param source The data to convert
         * @return The data in Base64-encoded form
         */
    public static encodeBytes1(source: Int8Array): string {
        // Since we're not going to have the GZIP encoding turned on,
        // we should not force the user to have to catch it.
        let encoded: string = null;
        encoded = Base64.encodeBytes4(source, 0, source.length, Base64.NO_OPTIONS);
        if (encoded == null) {
            throw new Error("encoded is null");
            return;
        }
        return encoded;
    } // end encodeBytes
    /**
         * Encodes a byte array into Base64 notation.
         * <p>
         * Example options:<pre>
         *   GZIP: gzip-compresses object before encoding it.
         *   DO_BREAK_LINES: break lines at 76 characters
         *     <i>Note: Technically, this makes your encoding non-compliant.</i>
         * </pre>
         * <p>
         * Example: <code>encodeBytes( myData, Base64.GZIP )</code> or
         * <p>
         * Example: <code>encodeBytes( myData, Base64.GZIP | Base64.DO_BREAK_LINES )</code>
         *
         *
         * <p>As of v 2.3, if there is an error with the GZIP stream,
         * in retrospect that's a pretty poor way to handle it.</p>
         *
         * @param source  The data to convert
         * @param options Specified options
         * @return The Base64-encoded data as a String
         * @see Base64#GZIP
         * @see Base64#DO_BREAK_LINES
         */
    public static encodeBytes2(source: Int8Array, options: number): string {
        return Base64.encodeBytes4(source, 0, source.length, options);
    } // end encodeBytes
    /**
         * Encodes a byte array into Base64 notation.
         * Does not GZip-compress data.
         *
         * <p>As of v 2.3, if there is an error,
         * In earlier versions, it just returned a null value, but
         * in retrospect that's a pretty poor way to handle it.</p>
         *
         * @param source The data to convert
         * @param off    Offset in array where conversion should begin
         * @param len    Length of data to convert
         * @return The Base64-encoded data as a String
         */
    public static encodeBytes3(source: Int8Array, off: number, len: number): string {
        // Since we're not going to have the GZIP encoding turned on,
        // we should not force the user to have to catch it.
        let encoded: string = null;
        encoded = Base64.encodeBytes4(source, off, len, Base64.NO_OPTIONS);
        if (encoded == null) {
            throw new Error("encoded is null");
            return;
        }
        return encoded;
    } // end encodeBytes
    /**
         * Encodes a byte array into Base64 notation.
         * <p>
         * Example options:<pre>
         *   GZIP: gzip-compresses object before encoding it.
         *   DO_BREAK_LINES: break lines at 76 characters
         *     <i>Note: Technically, this makes your encoding non-compliant.</i>
         * </pre>
         * <p>
         * Example: <code>encodeBytes( myData, Base64.GZIP )</code> or
         * <p>
         * Example: <code>encodeBytes( myData, Base64.GZIP | Base64.DO_BREAK_LINES )</code>
         *
         *
         * <p>As of v 2.3, if there is an error with the GZIP stream,
         * In earlier versions, it just returned a null value, but
         * in retrospect that's a pretty poor way to handle it.</p>
         *
         * @param source  The data to convert
         * @param off     Offset in array where conversion should begin
         * @param len     Length of data to convert
         * @param options Specified options
         * @return The Base64-encoded data as a String
         * @see Base64#GZIP
         * @see Base64#DO_BREAK_LINES
         */
    public static encodeBytes4(source: Int8Array, off: number, len: number, options: number): string {
        let encoded: Int8Array = Base64.encodeBytesToBytes(source, off, len, options);
        // Return value according to relevant encoding.
        let str: string = '';
        for (let n of encoded) {
            str = str + String.fromCharCode(n);
        }
        return str;
    } // end encodeBytes
    /**
         * Similar to {@link #encodeBytes(byte[], int, int, int)} but returns
         * a byte array instead of instantiating a String. This is more efficient
         * if you're working with I/O streams and have large data sets to encode.
         *
         * @param source  The data to convert
         * @param off     Offset in array where conversion should begin
         * @param len     Length of data to convert
         * @param options Specified options
         * @return The Base64-encoded data as a String
         */
    public static encodeBytesToBytes(source: Int8Array, off?: number, len?: number, options?: number): Int8Array {
        if (source == null) {
            throw new Error("Cannot serialize a null array.");
        } // end if: null
        if (off == undefined || off == null) {
            off = 0;
        }
        if (len == undefined || len == null) {
            len = source.length;
        }
        if (options == undefined || options == null) {
            options = Base64.NO_OPTIONS;
        }
        if (off < 0) {
            throw new Error("Cannot have negative offset: " + off);
            return;
        } // end if: off < 0
        if (len < 0) {
            throw new Error("Cannot have length offset: " + len);
            return;
        } // end if: len < 0
        if (off + len > source.length) {
            throw new Error("Cannot have offset and length with array");
            return;
        } // end if: off < 0
        // Compress?
        if ((options & Base64.GZIP) != 0) {
            return source.slice(off, off + len);
        } // end if: compress
        // Else, don't compress. Better not to use streams at all then.
        else {
            let breakLines: boolean = (options & Base64.DO_BREAK_LINES) != 0;
            let encLen: number = (len / 3) * 4 + (len % 3 > 0 ? 4 : 0); // Bytes needed for actual encoding
            if (breakLines) {
                encLen += encLen / Base64.MAX_LINE_LENGTH; // Plus extra newline characters
            }
            let outBuff: Int8Array = new Int8Array(encLen); /*new byte[encLen];*/
            let d: number = 0;
            let e: number = 0;
            let len2: number = len - 2;
            let lineLength: number = 0;
            for (; d < len2; d += 3, e += 4) {
                Base64.encode3to4(source, 3, outBuff, options, d + off, e);
                lineLength += 4;
                if (breakLines && lineLength >= Base64.MAX_LINE_LENGTH) {
                    outBuff[e + 4] = Base64.NEW_LINE;
                    e++;
                    lineLength = 0;
                } // end if: end of line
            } // en dfor: each piece of array
            if (d < len) {
                Base64.encode3to4(source, len - d, outBuff, options, d + off, e);
                e += 4;
            } // end if: some padding needed
            // Only resize array if we didn't guess it right.
            if (e <= outBuff.length - 1) {
                // If breaking lines and the last byte falls right at
                // the line length (76 bytes per line), there will be
                // one extra byte, and the array will need to be resized.
                // Not too bad of an estimate on array size, I'd say.
                let finalOut: Int8Array = new Int8Array(e); /*new byte[e];*/
                finalOut = outBuff.slice(0, e);
                return finalOut;
            }
            else {
                return outBuff;
            }
        } // end else: don't compress
    } // end encodeBytesToBytes
    /* ********  D E C O D I N G   M E T H O D S  ******** */
    /**
         * Decodes four bytes from array <var>source</var>
         * and writes the resulting bytes (up to three of them)
         * to <var>destination</var>.
         * The source and destination arrays can be manipulated
         * anywhere along their length by specifying
         * <var>srcOffset</var> and <var>destOffset</var>.
         * This method does not check to make sure your arrays
         * are large enough to accomodate <var>srcOffset</var> + 4 for
         * the <var>source</var> array or <var>destOffset</var> + 3 for
         * the <var>destination</var> array.
         * This method returns the actual number of bytes that
         * were converted from the Base64 encoding.
         * <p>This is the lowest level of the decoding methods with
         * all possible parameters.</p>
         *
         * @param source      the array to convert
         * @param srcOffset   the index where conversion begins
         * @param destination the array to hold the conversion
         * @param destOffset  the index where output will be put
         * @param options     alphabet type is pulled from this (standard, url-safe, ordered)
         * @return the number of decoded bytes converted
         */
    private static decode4to3(source: Int8Array, srcOffset: number, destination: Int8Array, destOffset: number, options: number): number {
        // Lots of error checking and exception throwing
        if (source == undefined || source == null) {
            throw new Error("Source array was null.");
            return;
        } // end if
        if (destination == undefined || destination == null) {
            throw new Error("Destination array was null.");
            return;
        } // end if
        if (srcOffset < 0 || srcOffset + 3 >= source.length) {
            throw new Error("Source array cannot have offset and still process four bytes.");
        } // end if
        if (destOffset < 0 || destOffset + 2 >= destination.length) {
            throw new Error("Destination array cannot have offset and still store three bytes.");
        } // end if
        let DECODABET: Array<number> = Base64.getDecodabet(options);
        // Example: Dk==
        if (source[srcOffset + 2] == Base64.EQUALS_SIGN) {
            // Two ways to do the same thing. Don't know which way I like best.
            //int outBuff =   ( ( DECODABET[ source[ srcOffset    ] ] << 24 ) >>>  6 )
            //              | ( ( DECODABET[ source[ srcOffset + 1] ] << 24 ) >>> 12 );
            let outBuff: number = ((DECODABET[source[srcOffset]] & 0xFF) << 18)
                | ((DECODABET[source[srcOffset + 1]] & 0xFF) << 12);
            destination[destOffset] = NumUtils.num2Byte(outBuff >>> 16);
            return 1;
        }
        // Example: DkL=
        else if (source[srcOffset + 3] == Base64.EQUALS_SIGN) {
            // Two ways to do the same thing. Don't know which way I like best.
            //int outBuff =   ( ( DECODABET[ source[ srcOffset     ] ] << 24 ) >>>  6 )
            //              | ( ( DECODABET[ source[ srcOffset + 1 ] ] << 24 ) >>> 12 )
            //              | ( ( DECODABET[ source[ srcOffset + 2 ] ] << 24 ) >>> 18 );
            let outBuff: number = ((DECODABET[source[srcOffset]] & 0xFF) << 18)
                | ((DECODABET[source[srcOffset + 1]] & 0xFF) << 12)
                | ((DECODABET[source[srcOffset + 2]] & 0xFF) << 6);
            destination[destOffset] = NumUtils.num2Byte(outBuff >>> 16);
            destination[destOffset + 1] = NumUtils.num2Byte(outBuff >>> 8);
            return 2;
        }
        // Example: DkLE
        else {
            // Two ways to do the same thing. Don't know which way I like best.
            //int outBuff =   ( ( DECODABET[ source[ srcOffset     ] ] << 24 ) >>>  6 )
            //              | ( ( DECODABET[ source[ srcOffset + 1 ] ] << 24 ) >>> 12 )
            //              | ( ( DECODABET[ source[ srcOffset + 2 ] ] << 24 ) >>> 18 )
            //              | ( ( DECODABET[ source[ srcOffset + 3 ] ] << 24 ) >>> 24 );
            let outBuff: number = ((DECODABET[source[srcOffset]] & 0xFF) << 18)
                | ((DECODABET[source[srcOffset + 1]] & 0xFF) << 12)
                | ((DECODABET[source[srcOffset + 2]] & 0xFF) << 6)
                | (DECODABET[source[srcOffset + 3]] & 0xFF);
            destination[destOffset] = NumUtils.num2Byte(outBuff >> 16);
            destination[destOffset + 1] = NumUtils.num2Byte(outBuff >> 8);
            destination[destOffset + 2] = NumUtils.num2Byte(outBuff);
            return 3;
        }
    } // end decodeToBytes
    /**
         * Low-level access to decoding ASCII characters in
         * the form of a byte array. <strong>Ignores GUNZIP option, if
         * it's set.</strong> This is not generally a recommended method,
         * although it is used internally as part of the decoding process.
         * Special case: if len = 0, an empty array is returned. Still,
         * if you need more speed and reduced memory footprint (and aren't
         * gzipping), consider this method.
         *
         * @param source  The Base64 encoded data
         * @param off     The offset of where to begin decoding
         * @param len     The length of characters to decode
         * @param options Can specify options such as alphabet type to use
         * @return decoded data
         */
    public static decode(source: Int8Array, off?: number, len?: number, options?: number): Int8Array {
        // Lots of error checking and exception throwing
        if (source == undefined || source == null) {
            throw new Error("Cannot decode null source array.");
            return;
        } // end if
        if (off < 0 || off + len > source.length) {
            throw new Error("Source array cannot have offset and process bytes.");
            return;
        } // end if
        if (len == 0) {
            return new Int8Array(0);
        }
        else if (len < 4) {
            throw new Error("Base64-encoded string must have at least four characters, but length specified was " + len);
        } // end if
        let DECODABET: Array<number> = Base64.getDecodabet(options);
        let len34: number = len * 3 / 4; // Estimate on array size
        let outBuff: Int8Array = new Int8Array(len34); /*new byte[len34];*/
        // Upper limit on size of output
        let outBuffPosn: number = 0; // Keep track of where we're writing
        let b4: Int8Array = new Int8Array(4); /*new byte[4];*/
        // Four byte buffer from source, eliminating white space
        let b4Posn: number = 0; // Keep track of four byte input buffer
        let i: number; // Source array counter
        let sbiDecode: number; // Special value from DECODABET
        for (i = off; i < off + len; i++) { // Loop through source
            sbiDecode = DECODABET[source[i] & 0xFF];
            // White space, Equals sign, or legit Base64 character
            // Note the values such as -5 and -9 in the
            // DECODABETs at the top of the file.
            if (sbiDecode >= Base64.WHITE_SPACE_ENC) {
                if (sbiDecode >= Base64.EQUALS_SIGN_ENC) {
                    b4[b4Posn++] = source[i]; // Save non-whitespace
                    if (b4Posn > 3) { // Time to decode?
                        outBuffPosn += Base64.decode4to3(b4, 0, outBuff, outBuffPosn, options);
                        b4Posn = 0;
                        // If that was the equals sign, break out of 'for' loop
                        if (source[i] == Base64.EQUALS_SIGN) {
                            break;
                        } // end if: equals sign
                    } // end if: quartet built
                } // end if: equals sign or better
            } // end if: white space, equals sign or better
            else {
                // There's a bad input character in the Base64 stream.
                throw new Error("Bad Base64 input character decimal in array position");
            } // end else:
        } // each input character
        let out: Int8Array = new Int8Array(outBuffPosn); /*new byte[outBuffPosn];*/
        out.set(outBuff.slice(0, outBuffPosn));
        return out;
    } // end decode
    /**
         * Decodes data from Base64 notation, automatically
         * detecting gzip-compressed data and decompressing it.
         *
         * @param s       the string to decode
         * @param options encode options such as URL_SAFE
         * @return the decoded data
         * @since 1.4
         */
    public static decodeByString(s: string, options?: number): Int8Array {
        if (s == null) {
            throw new Error("Input string was null.");
            return;
        } // end if
        if (options == undefined || options == null) {
            options = Base64.NO_OPTIONS;
        }
        let bytes: Int8Array;
        bytes = TextUtils.string2BytesForASCIIEncoding(s);
        // Decode
        bytes = Base64.decode(bytes, 0, bytes.length, options);
        return bytes;
    } // end decode
    /**
         * Convenience method for reading a base64-encoded
         * file and decoding it.
         *
         * <p>As of v 2.3, if there is a error,
         * In earlier versions, it just returned false, but
         * in retrospect that's a pretty poor way to handle it.</p>
         *
         * @param filename Filename for reading encoded data
         * @return decoded byte array
         */
    public static decodeFromFile(filepath: string): Int8Array {
        let ss = FileUtils.openFile(filepath);
        let buf = new ArrayBuffer(8192);
        let readOut = ss.readSync(buf);
        let result: Int8Array = new Int8Array(buf);
        return Base64.decode(result, 0, result.length, Base64.NO_OPTIONS);
    } // end decodeFromFile
} // end class Base64
export default Base64;
