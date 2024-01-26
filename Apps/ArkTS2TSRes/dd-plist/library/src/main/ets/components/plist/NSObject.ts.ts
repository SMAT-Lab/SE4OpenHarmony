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
abstract class NSObject {
    //  public constructor() {}
    /**
         * The newline character used for generating the XML output.
         * This constant will be different depending on the operating system on
         * which you use this library.
         */
    public static readonly NEWLINE: string = "\r\n";
    /**
         * The maximum length of the text lines to be used when generating
         * ASCII property lists. But this number is only a guideline it is not
         * guaranteed that it will not be overstepped.
         */
    public static readonly ASCII_LINE_LENGTH: number = 80;
    /**
         * The indentation character used for generating the XML output. This is the
         * tabulator character.
         */
    private static readonly INDENT: string = "\t";
    /**
         * Creates and returns a deep copy of this instance.
         * @return A clone of this instance.
         */
    public abstract clone(): NSObject;
    /**
         * Generates the XML representation of the object (without XML headers or enclosing plist-tags).
         *
         * @param xml   The {@link StringBuilder} onto which the XML representation is appended.
         * @param level The indentation level of the object.
         */
    public abstract toXML(xml: string, level: number): string;
    /**
         * Generates the binary representation of the object.
         *
         * @param out The output stream to serialize the object to.
         *                             data that cannot be saved.
         */
    public abstract toBinary(out: any): void;
    /**
         * Generates a valid XML property list including headers using this object as root.
         *
         * @return The XML representation of the property list including XML header and doctype information.
         */
    public toXMLPropertyList(): string {
        let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
            .concat(NSObject.NEWLINE)
            .concat("<!DOCTYPE plist PUBLIC \"-//xxxxx//DTD PLIST 1.0//EN\" \"http://www.xxxx.com/xxxxx.dtd\">")
            .concat(NSObject.NEWLINE)
            .concat("<plist version=\"1.0\">")
            .concat(NSObject.NEWLINE);
        xml = this.toXML(xml, 0);
        xml = xml.concat(NSObject.NEWLINE).concat("</plist>");
        return xml;
    }
    /**
         * Generates the ASCII representation of this object.
         * The generated ASCII representation does not end with a newline.
         * Complies with the <a href="https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/PropertyLists/OldStylePlists/OldStylePLists.html" target="_blank">Old-Style ASCII Property Lists definition</a>.
         *
         * @param ascii The {@link StringBuilder} onto which the ASCII representation is appended.
         * @param level The indentation level of the object.
         */
    public abstract toASCII(ascii: string, level: number): void;
    /**
         * Generates the ASCII representation of this object in the GnuStep format.
         * The generated ASCII representation does not end with a newline.
         *
         * @param ascii The {@link StringBuilder} onto which the ASCII representation is appended.
         * @param level The indentation level of the object.
         */
    public abstract toASCIIGnuStep(ascii: string, level: number): void;
    /**
         * Helper method that adds correct indentation to the xml output.
         * Calling this method will add <code>level</code> number of tab characters
         * to the <code>xml</code> string.
         *
         * @param xml   The {@link StringBuilder} onto which the XML representation is appended.
         * @param level The level of indentation.
         */
    indent(xml: string, level: number): string {
        for (let i = 0; i < level; i++)
            xml = xml.concat(NSObject.INDENT);
        return xml;
    }
}
export default NSObject;
