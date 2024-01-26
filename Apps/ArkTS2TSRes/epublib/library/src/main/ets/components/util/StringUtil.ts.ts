/*
 * GNU LESSER GENERAL PUBLIC LICENSE
 * Version 3, 29 June 2007
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * The Free Software Foundation may publish revised and/or new versions of the GNU Lesser
 * General Public License from time to time. Such new versions will be similar in spirit to the
 * present version, but may differ in detail to address new problems or concerns.

 * Each version is given a distinguishing version number. If the Library as you received it
 * specifies that a certain numbered version of the GNU Lesser General Public License “or any
 * later version” applies to it, you have the option of following the terms and conditions either
 * of that published version or of any later version published by the Free Software Foundation. If
 * the Library as you received it does not specify a version number of the GNU Lesser General
 * Public License, you may choose any version of the GNU Lesser General Public License ever
 * published by the Free Software Foundation.

 * If the Library as you received it specifies that a proxy can decide whether future versions of
 * the GNU Lesser General Public License shall apply, that proxy's public statement of
 * acceptance of any version is permanent authorization for you to choose that version
 * for the Library.
 */
class StringUtil {
    constructor() {
    }
    public static collapsePathDots(path: string): string {
        let parts: Array<string> = path.split("/");
        for (let i = 0; i < parts.length - 1; i++) {
            let currentDir: string = parts[i];
            if (currentDir.length == 0 || currentDir == ".") {
                parts.splice(i, 1);
                i--;
            }
            else if (currentDir == "..") {
                parts.splice(i, 2);
                i -= 2;
            }
        }
        if (path.startsWith("/")) {
            return [""].concat(parts).join("/");
        }
        return parts.join("/");
    }
    /**
         * Whether the String is not null, not zero-length and does not contain of
         * only whitespace.
         *
         * @param text
         * @return Whether the String is not null, not zero-length and does not contain of
         */
    public static isNotBlank(text: string): boolean {
        return !this.isBlank(text);
    }
    /**
        * Whether the String is null, zero-length and does contain only whitespace.
        *
        * @return Whether the String is null, zero-length and does contain only whitespace.
        */
    public static isBlank(text: string): boolean {
        if (this.isEmpty(text)) {
            return true;
        }
        for (let textKey of text) {
            if ([" ", "\n", "\t"].indexOf(textKey) < 0) {
                return false;
            }
        }
        return true;
    }
    /**
        * Whether the given string is null or zero-length.
        *
        * @param text the input for this method
        * @return Whether the given string is null or zero-length.
        */
    public static isEmpty(text: string): boolean {
        return (text == null) || (text.length == 0);
    }
    /**
        * Whether the given source string ends with the given suffix, ignoring
        * case.
        *
        * @param source
        * @param suffix
        * @return Whether the given source string ends with the given suffix, ignoring case.
        */
    public static endsWithIgnoreCase(source: string, suffix: string): boolean {
        if (this.isEmpty(suffix)) {
            return true;
        }
        if (this.isEmpty(source)) {
            return false;
        }
        if (suffix.length > source.length) {
            return false;
        }
        return source.substring(source.length - suffix.length)
            .toLowerCase().endsWith(suffix.toLowerCase());
    }
    /**
      * If the given text is null return "", the given defaultValue otherwise.
      *
      * @param text
      * @param defaultValue
      * @return If the given text is null "", the given defaultValue otherwise.
      */
    public static defaultIfNull(text: string, defaultValue?: string): string {
        defaultValue = defaultValue || "";
        if (text == null) {
            return defaultValue;
        }
        return text;
    }
    /**
        * Null-safe string comparator
        *
        * @param text1
        * @param text2
        * @return whether the two strings are equal
        */
    public static equals(text1: string, text2: string): boolean {
        if (text1 == null) {
            return (text2 == null);
        }
        return text1 == text2;
    }
    /**
        * Pretty toString printer.
        *
        * @param keyValues
        * @return a string representation of the input values
        */
    // @ts-ignore
    public static toString(keyValues: any): string {
        let result: Array<string> = ["["];
        for (let i = 0; i < keyValues.length; i += 2) {
            if (i > 0) {
                result.push(", ");
            }
            result.push(keyValues[i]);
            result.push(": ");
            let value = null;
            if ((i + 1) < keyValues.length) {
                value = keyValues[i + 1];
            }
            if (value == null) {
                result.push("<null>");
            }
            else {
                result.push('\'');
                result.push(value);
                result.push('\'');
            }
        }
        result.push(']');
        return result.join("").toString();
    }
    public static hashCode(...values: Array<string>): number {
        var result: number = 31;
        for (let value of values) {
            result ^= StringUtil.charToHashCode(value);
        }
        return result;
    }
    private static charToHashCode(str: string): number {
        var hash = 0, i, chr, len;
        if (str.length === 0)
            return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    /**
         * Gives the substring of the given text before the given separator.
         *
         * If the text does not contain the given separator then the given text is
         * returned.
         *
         * @param text
         * @param separator
         * @return  the substring of the given text before the given separator.
         */
    public static substringBefore(text: string, separator: string): string {
        if (this.isEmpty(text)) {
            return text;
        }
        let sepPos: number = text.indexOf(separator);
        if (sepPos < 0) {
            return text;
        }
        return text.substring(0, sepPos);
    }
    /**
         * Gives the substring of the given text before the last occurrence of the
         * given separator.
         *
         * If the text does not contain the given separator then the given text is
         * returned.
         *
         * @param text
         * @param separator
         * @return the substring of the given text before the last occurrence of the given separator.
         */
    public static substringBeforeLast(text: string, separator: string): string {
        if (this.isEmpty(text)) {
            return text;
        }
        let cPos: number = text.lastIndexOf(separator);
        if (cPos < 0) {
            return text;
        }
        return text.substring(0, cPos);
    }
    /**
         * Gives the substring of the given text after the last occurrence of the
         * given separator.
         *
         * If the text does not contain the given separator then "" is returned.
         *
         * @param text
         * @param separator
         * @return the substring of the given text after the last occurrence of the given separator.
         */
    public static substringAfterLast(text: string, separator: string): string {
        if (this.isEmpty(text)) {
            return text;
        }
        let cPos: number = text.lastIndexOf(separator);
        if (cPos < 0) {
            return "";
        }
        return text.substring(cPos + 1);
    }
    /**
         * Gives the substring of the given text after the given separator.
         *
         * If the text does not contain the given separator then "" is returned.
         *
         * @param text the input text
         * @param c the separator char
         * @return the substring of the given text after the given separator.
         */
    public static substringAfter(text: string, c: string): string {
        if (this.isEmpty(text)) {
            return text;
        }
        let cPos: number = text.indexOf(c);
        if (cPos < 0) {
            return "";
        }
        return text.substring(cPos + 1);
    }
    public static equalsIgnoreCase(text1: string, text2: string): boolean {
        if (text1 == null) {
            return (text2 == null);
        }
        return text1.toLowerCase() == text2.toLowerCase();
    }
    public static compareToIgnoreCase(text1: string, text2: string): number {
        return text1.toLowerCase().localeCompare(text2.toLowerCase());
    }
}
export default StringUtil;
