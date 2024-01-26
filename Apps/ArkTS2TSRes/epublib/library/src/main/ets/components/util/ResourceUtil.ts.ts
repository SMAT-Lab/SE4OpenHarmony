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
import EpubResource from "../domain/EpubResource";
import { DOMParser } from '@xmldom/xmldom';
import util from '@ohos.util';
class ResourceUtil {
    constructor() { }
    public static createResource(href: string, data: Uint8Array) {
        console.debug("createResource-------------" + href);
        var textDecoder = new util.TextDecoder("utf-8", { ignoreBOM: true });
        console.debug("createResource----------textDecoder---" + textDecoder);
        console.debug("createResource----===" + href + "----strData---start====" + data);
        let strData = textDecoder.decode(data);
        console.debug("createResource-----===" + href + "---strData--end====" + strData);
        return new EpubResource(href, null, null, data, strData);
    }
    public static createStrResource(href: string, data: string) {
        return new EpubResource(href, null, null, null, data);
    }
    public static decode(data: Uint8Array): string {
        var textDecoder = new util.TextDecoder("utf-8", { ignoreBOM: true });
        let strData = textDecoder.decode(data);
        return strData;
    }
    /**
     * Reads the given resources inputstream, parses the xml therein and returns the result as a Document
     *
     * @param resource
     * @param documentBuilder
     * @return the document created from the given resource
     * @throws UnsupportedEncodingException
     * @throws SAXException
     * @throws IOException
     * @throws ParserConfigurationException
     */
    public static getAsDocument(resource: EpubResource): ESObject {
        if (resource.getStrData() == null) {
            return null;
        }
        console.debug("---ResourceUtil-----DOMParser----DOMParser----DOMParser--DOMParser--DOMParser--DOMParser---DOMParser----DOMParser------");
        let domParser = new DOMParser();
        let result: ESObject = domParser.parseFromString(resource.getStrData());
        return result;
    }
}
export default ResourceUtil;
