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
import StringCharacterIterator from '../utils/StringCharacterIterator';
import NSData from './NSData';
import NumUtils from '../utils/NumUtils';
import NSNumber from './NSNumber';
import NSDictionary from './NSDictionary';
import NSArray from './NSArray';
import NSString from './NSString';
import NSDate from './NSDate';
import PropertyListParser from './PropertyListParser';
import NSObject from './NSObject';
import ArrayUtils from '../utils/ArrayUtils';
import { FileUtils } from '../utils/FileUtils';
class ASCIIPropertyListParser {
    public static readonly WHITESPACE_SPACE: string = ' ';
    public static readonly WHITESPACE_TAB: string = '\t';
    public static readonly WHITESPACE_NEWLINE: string = '\n';
    public static readonly WHITESPACE_CARRIAGE_RETURN: string = '\r';
    public static readonly ARRAY_BEGIN_TOKEN: string = '(';
    public static readonly ARRAY_END_TOKEN: string = ')';
    public static readonly ARRAY_ITEM_DELIMITER_TOKEN: string = ',';
    public static readonly DICTIONARY_BEGIN_TOKEN: string = '{';
    public static readonly DICTIONARY_END_TOKEN: string = '}';
    public static readonly DICTIONARY_ASSIGN_TOKEN: string = '=';
    public static readonly DICTIONARY_ITEM_DELIMITER_TOKEN: string = ';';
    public static readonly QUOTEDSTRING_BEGIN_TOKEN: string = '"';
    public static readonly QUOTEDSTRING_END_TOKEN: string = '"';
    public static readonly QUOTEDSTRING_ESCAPE_TOKEN: string = '\\';
    public static readonly DATA_BEGIN_TOKEN: string = '<';
    public static readonly DATA_END_TOKEN: string = '>';
    public static readonly DATA_GSOBJECT_BEGIN_TOKEN: string = '*';
    public static readonly DATA_GSDATE_BEGIN_TOKEN: string = 'D';
    public static readonly DATA_GSBOOL_BEGIN_TOKEN: string = 'B';
    public static readonly DATA_GSBOOL_TRUE_TOKEN: string = 'Y';
    public static readonly DATA_GSBOOL_FALSE_TOKEN: string = 'N';
    public static readonly DATA_GSINT_BEGIN_TOKEN: string = 'I';
    public static readonly DATA_GSREAL_BEGIN_TOKEN: string = 'R';
    public static readonly DATE_DATE_FIELD_DELIMITER: string = '-';
    public static readonly DATE_TIME_FIELD_DELIMITER: string = ':';
    public static readonly DATE_GS_DATE_TIME_DELIMITER: string = ' ';
    public static readonly DATE_APPLE_DATE_TIME_DELIMITER: string = 'T';
    public static readonly DATE_APPLE_END_TOKEN: string = 'Z';
    public static readonly COMMENT_BEGIN_TOKEN: string = '/';
    public static readonly MULTILINE_COMMENT_SECOND_TOKEN: string = '*';
    public static readonly SINGLELINE_COMMENT_SECOND_TOKEN: string = '/';
    public static readonly MULTILINE_COMMENT_END_TOKEN: string = '/';
    /**
     * Property list source data
     */
    private readonly data: Array<string>;
    /**
     * Current parsing index
     */
    private index: number;
    /**
     * Creates a new parser for the given property list content.
     *
     * @param propertyListContent The content of the property list that is to be parsed.
     * @param encoding
     */
    public constructor(propertyListContent: Int8Array, encoding: string) {
        this.data = ArrayUtils.string2Array(ArrayUtils.Int8Array2String(propertyListContent, encoding));
    }
    /**
     * Parses an ASCII property list file.
     *
     * @param f The ASCII property list file.
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parse(filePath: string): NSObject {
        let ss = FileUtils.openFile(filePath);
        // InputStream fileInputStream = new FileInputStream(f);
        try {
            return ASCIIPropertyListParser.parseByStream(ss);
        }
        finally {
            try {
                ss.close();
            }
            catch (e) {
                // ignore
            }
        }
    }
    /**
     * Parses an ASCII property list file.
     *
     * @param f The ASCII property list file.
     * @param encoding
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByFileWithEncode(filePath: string, encoding: string): NSObject {
        let ss = FileUtils.openFile(filePath);
        try {
            return ASCIIPropertyListParser.parseByStreamWithEncode(ss, encoding);
        }
        finally {
            ss.close();
        }
    }
    /**
     * Parses an ASCII property list from an input stream.
     * This method does not close the specified input stream.
     *
     * @param in The input stream that points to the property list's data.
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByStream(input: any): NSObject {
        return ASCIIPropertyListParser.parseByBytes(PropertyListParser.readAll(input));
    }
    /**
     * Parses an ASCII property list from an input stream.
     * This method does not close the specified input stream.
     *
     * @param in The input stream that points to the property list's data.
     * @param encoding
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByStreamWithEncode(input: any, encoding: string): NSObject {
        return ASCIIPropertyListParser.parseByBytesWithEncode(PropertyListParser.readAll(input), encoding);
    }
    /**
     * Parses an ASCII property list from a byte array.
     *
     * @param bytes The ASCII property list data.
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByBytes(bytes: Int8Array): NSObject {
        // Check for byte order marks
        if (bytes.length > 2) {
            if (bytes[0] == 0xFE && bytes[1] == 0xFF) {
                return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-16");
            }
            else if (bytes[0] == 0xFF && bytes[1] == 0xFE) {
                if (bytes.length > 4 && bytes[2] == 0x00 && bytes[3] == 0x00) {
                    return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-32");
                }
                return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-16");
            }
            else if (bytes.length > 3) {
                if (bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) {
                    return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-8");
                }
                else if (bytes.length > 4 && bytes[0] == 0x00 && bytes[1] == 0x00 && bytes[2] == 0xFE && bytes[3] == 0xFF) {
                    return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-32");
                }
            }
        }
        return ASCIIPropertyListParser.parseByBytesWithEncode(bytes, "UTF-8");
    }
    /**
     * Parses an ASCII property list from a byte array.
     *
     * @param bytes The ASCII property list data.
     * @param encoding
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByBytesWithEncode(bytes: Int8Array, encoding: string): NSObject {
        let parser: ASCIIPropertyListParser = new ASCIIPropertyListParser(bytes, encoding);
        return parser.parse();
    }
    /**
     * Checks whether the given sequence of symbols can be accepted.
     *
     * @param sequence The sequence of tokens to look for.
     * @return Whether the given tokens occur at the current parsing position.
     */
    private acceptSequence(sequence: string[]): boolean {
        if (this.index + sequence.length > this.data.length) {
            return false;
        }
        for (let i = 0; i < sequence.length; i++) {
            if (this.data[this.index + i] != sequence[i]) {
                return false;
            }
        }
        return true;
    }
    //
    /**
     * Checks whether the given symbols can be accepted, that is, if one
     * of the given symbols is found at the current parsing position.
     *
     * @param acceptableSymbols The symbols to check.
     * @return Whether one of the symbols can be accepted or not.
     */
    private acceptByStrings(acceptableSymbols: string[]): boolean {
        let symbolPresent = false;
        if (this.index < this.data.length) {
            for (let c of acceptableSymbols) {
                if (this.data[this.index] == c) {
                    symbolPresent = true;
                }
            }
        }
        return symbolPresent;
    }
    /**
     * Checks whether the given symbol can be accepted, that is, if
     * the given symbols is found at the current parsing position.
     *
     * @param acceptableSymbol The symbol to check.
     * @return Whether the symbol can be accepted or not.
     */
    private acceptByString(acceptableSymbol: string): boolean {
        return this.index < this.data.length && this.data[this.index] == acceptableSymbol;
    }
    /**
     * Expects the input to have one of the given symbols at the current parsing position.
     *
     * @param expectedSymbols The expected symbols.
     */
    private expectByStrings(expectedSymbols: string[]): void {
        if (!this.acceptByStrings(expectedSymbols)) {
            let excString: string = '';
            excString = excString.concat("Expected '").concat(expectedSymbols[0]).concat("'");
            for (let i = 1; i < expectedSymbols.length; i++) {
                excString = excString.concat(" or '").concat(expectedSymbols[i]).concat("'");
            }
            if (this.index < this.data.length) {
                excString = excString.concat(" but found '").concat(this.data[this.index]).concat("'");
            }
            else {
                excString = excString.concat(" but reached end of input");
            }
            throw new Error(excString.toString());
        }
    }
    /**
     * Expects the input to have the given symbol at the current parsing position.
     *
     * @param expectedSymbol The expected symbol.
     */
    private expectByString(expectedSymbol: string): void {
        if (!this.acceptByString(expectedSymbol)) {
            throw new Error(this.index < this.data.length
                ? "Expected '" + expectedSymbol + "' but found '" + this.data[this.index] + "'"
                : "Expected '" + expectedSymbol + "' but reached end of input");
        }
    }
    /**
     * Reads an expected symbol.
     *
     * @param symbol The symbol to read.
     */
    private read(symbolString: string): void {
        this.expectByString(symbolString);
        this.index++;
    }
    /**
     * Skips the current symbol.
     */
    private skip(numSymbols?: number): void {
        if (numSymbols != undefined && numSymbols != null) {
            this.index += numSymbols;
        }
        else {
            this.index++;
        }
    }
    /**
     * Skips all whitespaces and comments from the current parsing position onward.
     */
    private skipWhitespacesAndComments(): void {
        let commentSkipped: boolean;
        do {
            commentSkipped = false;
            //Skip whitespaces
            while (this.acceptByStrings([ASCIIPropertyListParser.WHITESPACE_CARRIAGE_RETURN,
                ASCIIPropertyListParser.WHITESPACE_NEWLINE, ASCIIPropertyListParser.WHITESPACE_SPACE, ASCIIPropertyListParser.WHITESPACE_TAB])) {
                this.skip();
            }
            //Skip single line comments "//..."
            if (this.acceptSequence([ASCIIPropertyListParser.COMMENT_BEGIN_TOKEN, ASCIIPropertyListParser.SINGLELINE_COMMENT_SECOND_TOKEN])) {
                this.skip(2);
                this.readInputUntilByStrings([ASCIIPropertyListParser.WHITESPACE_CARRIAGE_RETURN, ASCIIPropertyListParser.WHITESPACE_NEWLINE]);
                commentSkipped = true;
            }
            //Skip multi line comments "/* ... */"
            else if (this.acceptSequence([ASCIIPropertyListParser.COMMENT_BEGIN_TOKEN, ASCIIPropertyListParser.MULTILINE_COMMENT_SECOND_TOKEN])) {
                this.skip(2);
                while (true) {
                    if (this.acceptSequence([ASCIIPropertyListParser.MULTILINE_COMMENT_SECOND_TOKEN, ASCIIPropertyListParser.MULTILINE_COMMENT_END_TOKEN])) {
                        this.skip(2);
                        break;
                    }
                    this.skip();
                }
                commentSkipped = true;
            }
        } while (commentSkipped); //if a comment was skipped more whitespace or another comment can follow, so skip again
    }
    /**
     * Reads input until one of the given symbols is found.
     *
     * @param symbols The symbols that can occur after the string to read.
     * @return The input until one the given symbols.
     */
    private readInputUntilByStrings(symbols: string[]): string {
        let strBuf: string = '';
        while (this.index < this.data.length && !this.acceptByStrings(symbols)) {
            strBuf = strBuf.concat(this.data[this.index]);
            this.skip();
        }
        return strBuf;
    }
    /**
     * Reads input until the given symbol is found.
     *
     * @param symbol The symbol that can occur after the string to read.
     * @return The input until the given symbol.
     */
    private readInputUntilByString(symbolString: string): string {
        let strBuf: string = '';
        while (this.index < this.data.length && !this.acceptByStrings([symbolString])) {
            strBuf = strBuf.concat(this.data[this.index]);
            this.skip();
        }
        return strBuf.toString();
    }
    /**
     * Parses the property list from the beginning and returns the root object
     * of the property list.
     *
     * @return The root object of the property list. This can either be a NSDictionary or a NSArray.
     */
    public parse(): NSObject {
        this.index = 0;
        if (this.data.length == 0) {
            throw new Error("The property list is empty.");
        }
        //Skip Unicode byte order mark (BOM)
        if (this.data[0] == '\uFEFF') {
            this.skip(1);
        }
        this.skipWhitespacesAndComments();
        this.acceptByStrings([ASCIIPropertyListParser.DICTIONARY_BEGIN_TOKEN, ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN, ASCIIPropertyListParser.COMMENT_BEGIN_TOKEN]);
        return this.parseObject();
    }
    /**
     * Parses the NSObject found at the current position in the property list
     * data stream.
     *
     * @return The parsed NSObject.
     * @see ASCIIPropertyListParser#index
     */
    private parseObject(): NSObject {
        switch (this.data[this.index]) {
            case ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN: {
                return this.parseArray();
            }
            case ASCIIPropertyListParser.DICTIONARY_BEGIN_TOKEN: {
                return this.parseDictionary();
            }
            case ASCIIPropertyListParser.DATA_BEGIN_TOKEN: {
                return this.parseData();
            }
            case ASCIIPropertyListParser.QUOTEDSTRING_BEGIN_TOKEN: {
                let quotedString: string = this.parseQuotedString();
                //apple dates are quoted strings of length 20 and after the 4 year digits a dash is found
                if (quotedString.length == 20 && quotedString.charAt(4) == ASCIIPropertyListParser.DATE_DATE_FIELD_DELIMITER) {
                    try {
                        return new NSDate(null, null, null, quotedString);
                    }
                    catch (e) {
                        //not a date? --> return string
                        return new NSString(null, null, null, null, quotedString);
                    }
                }
                else {
                    return new NSString(null, null, null, null, quotedString);
                }
            }
            default: {
                //0-9
                if (this.data[this.index] >= '0' && this.data[this.index] <= '9') {
                    //could be a date or just a string
                    return this.parseDateString();
                }
                else {
                    //non-numerical -> string or boolean
                    return new NSString(null, null, null, null, this.parseString());
                }
            }
        }
    }
    /**
     * Parses an array from the current parsing position.
     * The prerequisite for calling this method is, that an array begin token has been read.
     *
     * @return The array found at the parsing position.
     */
    private parseArray(): NSArray {
        //Skip begin token
        this.skip();
        this.skipWhitespacesAndComments();
        let objects: Array<NSObject> = new Array();
        while (!this.acceptByString(ASCIIPropertyListParser.ARRAY_END_TOKEN)) {
            objects.push(this.parseObject());
            this.skipWhitespacesAndComments();
            if (this.acceptByString(ASCIIPropertyListParser.ARRAY_ITEM_DELIMITER_TOKEN)) {
                this.skip();
            }
            else {
                break; //must have reached end of array
            }
            this.skipWhitespacesAndComments();
        }
        //parse end token
        this.read(ASCIIPropertyListParser.ARRAY_END_TOKEN);
        return new NSArray(null, objects);
    }
    /**
     * Parses a dictionary from the current parsing position.
     * The prerequisite for calling this method is, that a dictionary begin token has been read.
     *
     * @return The dictionary found at the parsing position.
     */
    private parseDictionary(): NSDictionary {
        //Skip begin token
        this.skip();
        this.skipWhitespacesAndComments();
        let dict: NSDictionary = new NSDictionary();
        while (!this.acceptByString(ASCIIPropertyListParser.DICTIONARY_END_TOKEN)) {
            //Parse key
            let keyString: string;
            if (this.acceptByString(ASCIIPropertyListParser.QUOTEDSTRING_BEGIN_TOKEN)) {
                keyString = this.parseQuotedString();
            }
            else {
                keyString = this.parseString();
            }
            this.skipWhitespacesAndComments();
            //Parse assign token
            this.read(ASCIIPropertyListParser.DICTIONARY_ASSIGN_TOKEN);
            this.skipWhitespacesAndComments();
            let object: NSObject = this.parseObject();
            dict.put(keyString, object);
            this.skipWhitespacesAndComments();
            this.read(ASCIIPropertyListParser.DICTIONARY_ITEM_DELIMITER_TOKEN);
            this.skipWhitespacesAndComments();
        }
        //skip end token
        this.skip();
        return dict;
    }
    /**
     * Parses a data object from the current parsing position.
     * This can either be a NSData object or a GnuStep NSNumber or NSDate.
     * The prerequisite for calling this method is, that a data begin token has been read.
     *
     * @return The data object found at the parsing position.
     */
    private parseData(): NSObject {
        let obj: NSObject = null;
        //Skip begin token
        this.skip();
        if (this.acceptByString(ASCIIPropertyListParser.DATA_GSOBJECT_BEGIN_TOKEN)) {
            this.skip();
            this.expectByStrings([ASCIIPropertyListParser.DATA_GSBOOL_BEGIN_TOKEN, ASCIIPropertyListParser.DATA_GSDATE_BEGIN_TOKEN,
                ASCIIPropertyListParser.DATA_GSINT_BEGIN_TOKEN, ASCIIPropertyListParser.DATA_GSREAL_BEGIN_TOKEN]);
            if (this.acceptByString(ASCIIPropertyListParser.DATA_GSBOOL_BEGIN_TOKEN)) {
                //Boolean
                this.skip();
                this.expectByStrings([ASCIIPropertyListParser.DATA_GSBOOL_TRUE_TOKEN, ASCIIPropertyListParser.DATA_GSBOOL_FALSE_TOKEN]);
                if (this.acceptByString(ASCIIPropertyListParser.DATA_GSBOOL_TRUE_TOKEN)) {
                    obj = NSNumber.createNSNumberByBoolean(true);
                }
                else {
                    obj = NSNumber.createNSNumberByBoolean(false);
                }
                //Skip the parsed boolean token
                this.skip();
            }
            else if (this.acceptByString(ASCIIPropertyListParser.DATA_GSDATE_BEGIN_TOKEN)) {
                //Date
                this.skip();
                let dateString: string = this.readInputUntilByString(ASCIIPropertyListParser.DATA_END_TOKEN);
                obj = new NSDate(null, null, null, dateString);
            }
            else if (this.acceptByStrings([ASCIIPropertyListParser.DATA_GSINT_BEGIN_TOKEN, ASCIIPropertyListParser.DATA_GSREAL_BEGIN_TOKEN])) {
                //Number
                this.skip();
                let numberString: string = this.readInputUntilByString(ASCIIPropertyListParser.DATA_END_TOKEN);
                obj = NSNumber.ceateNSNumberByText(numberString);
            }
            //parse data end token
            this.read(ASCIIPropertyListParser.DATA_END_TOKEN);
        }
        else {
            let dataString: string = this.readInputUntilByString(ASCIIPropertyListParser.DATA_END_TOKEN);
            dataString = dataString.replace(/\\s+/g, "");
            let numBytes: number = dataString.length / 2;
            let bytes: Int8Array = new Int8Array(numBytes);
            for (let i = 0; i < bytes.length; i++) {
                let byteString: string = dataString.substring(i * 2, i * 2 + 2);
                let byteValue: number = parseInt(byteString, 16);
                bytes[i] = NumUtils.num2Byte(byteValue);
            }
            obj = new NSData(bytes);
            //skip end token
            this.skip();
        }
        return obj;
    }
    /**
     * Attempts to parse a plain string as a date if possible.
     *
     * @return A NSDate if the string represents such an object. Otherwise a NSString is returned.
     */
    private parseDateString(): NSObject {
        let numericalString: string = this.parseString();
        if (numericalString.length > 4 && numericalString.charAt(4) == ASCIIPropertyListParser.DATE_DATE_FIELD_DELIMITER) {
            return new NSDate(null, null, null, numericalString);
        }
        return new NSString(null, null, null, null, numericalString);
    }
    /**
     * Parses a plain string from the current parsing position.
     * The string is made up of all characters to the next whitespace, delimiter token or assignment token.
     *
     * @return The string found at the current parsing position.
     */
    private parseString(): string {
        return this.readInputUntilByStrings([ASCIIPropertyListParser.WHITESPACE_SPACE, ASCIIPropertyListParser.WHITESPACE_TAB,
            ASCIIPropertyListParser.WHITESPACE_NEWLINE, ASCIIPropertyListParser.WHITESPACE_CARRIAGE_RETURN,
            ASCIIPropertyListParser.ARRAY_ITEM_DELIMITER_TOKEN, ASCIIPropertyListParser.DICTIONARY_ITEM_DELIMITER_TOKEN,
            ASCIIPropertyListParser.DICTIONARY_ASSIGN_TOKEN, ASCIIPropertyListParser.ARRAY_END_TOKEN]);
    }
    /**
     * Parses a quoted string from the current parsing position.
     * The prerequisite for calling this method is, that a quoted string begin token has been read.
     *
     * @return The quoted string found at the parsing method with all special characters unescaped.
     */
    private parseQuotedString(): string {
        //Skip begin token
        this.skip();
        let stringBuilder: string = '';
        let unescapedBackslash = true;
        //Read from opening quotation marks to closing quotation marks and skip escaped quotation marks
        while (this.data[this.index] != ASCIIPropertyListParser.QUOTEDSTRING_END_TOKEN
            || (this.data[this.index - 1] == ASCIIPropertyListParser.QUOTEDSTRING_ESCAPE_TOKEN && unescapedBackslash)) {
            stringBuilder = stringBuilder.concat(this.data[this.index]);
            if (this.acceptByString(ASCIIPropertyListParser.QUOTEDSTRING_ESCAPE_TOKEN)) {
                unescapedBackslash = !(this.data[this.index - 1] == ASCIIPropertyListParser.QUOTEDSTRING_ESCAPE_TOKEN && unescapedBackslash);
            }
            this.skip();
        }
        let unescapedString: string;
        unescapedString = ASCIIPropertyListParser.parseQuotedString(stringBuilder);
        //skip end token
        this.skip();
        return unescapedString;
    }
    /**
     * Parses a string according to the format specified for ASCII property lists.
     * Such strings can contain escape sequences which are unescaped in this method.
     *
     * @param s The escaped string according to the ASCII property list format, without leading and trailing quotation marks.
     * @return The unescaped string in UTF-8
     */
    private static parseQuotedString(s: string): string {
        let result: string = '';
        let iterator = new StringCharacterIterator(s);
        let c: string = iterator.current();
        while (iterator.getIndex() < iterator.getEndIndex()) {
            switch (c) {
                case '\\': { //An escaped sequence is following
                    result = result.concat(this.parseEscapedSequence(iterator));
                    break;
                }
                default: { //a normal UTF-8 char
                    result = result.concat(c);
                    break;
                }
            }
            c = iterator.next();
        }
        //Build string
        return result.toString();
    }
    /**
     * Unescapes an escaped character sequence, e.g. \\u00FC.
     *
     * @param iterator The string character iterator pointing to the first character after the backslash
     * @return The unescaped character.
     */
    private static parseEscapedSequence(iterator: StringCharacterIterator): string {
        let c: string = iterator.next();
        let regExp = /,/gi;
        switch (c) {
            case '\\':
            case '"':
            case "\'":
                return c;
            case 'b':
                return '\b';
            case 'n':
                return '\n';
            case 'r':
                return '\r';
            case 't':
                return '\t';
            case 'U':
            case 'u': {
                //4 digit hex Unicode value
                let chars: Array<string> = [iterator.next(), iterator.next(), iterator.next(), iterator.next()];
                let arrayResult = chars.join(",");
                let unicodeValue: string = arrayResult.replace(regExp, '');
                try {
                    return String.fromCharCode(parseInt(unicodeValue, 16));
                }
                catch (ex) {
                    throw new Error("The property list contains a string with an invalid escape sequence");
                }
            }
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': {
                //3 digit octal ASCII value
                let chars: Array<string> = [c, iterator.next(), iterator.next()];
                let arrayResult = chars.join(",");
                let num: string = arrayResult.replace(regExp, '');
                try {
                    return String.fromCharCode(parseInt(num, 8));
                }
                catch (ex) {
                    throw new Error("The property list contains a string with an invalid escape sequence");
                    return;
                }
            }
            default:
                throw new Error("The property list contains a string with an invalid escape sequence");
        }
    }
}
export default ASCIIPropertyListParser;
