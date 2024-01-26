let __generate__Id: number = 0;
function generateId(): string {
    return "XMLConstants_" + ++__generate__Id;
}
/**
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
export default class XMLConstants {
    // XML文件的声明关键字
    public static XML_START_TAB: string = '<?xml';
    public static XML_END_TAB: string = '?>';
    public static XML_ENCODING: string = 'encoding';
    public static XML_ENCODING_DEFAULT: string = 'UTF-8';
    public static XML_STANDALONE: string = 'standalone';
    public static XML_STANDALONE_YES: string = 'yes';
    public static XML_STANDALONE_NO: string = 'no';
    public static XML_DOCTYPE: string = '<!DOCTYPE';
    public static XML_DOCTYPE_SVG: string = 'svg PUBLIC ';
    // XML文件命名空间URIs
    public static XML_NAMESPACE_URI: string = 'http://www.w3.org/XML/1998/namespace';
    public static XMLNS_NAMESPACE_URI_XMLNS: string = 'http://www.w3.org/2000/xmlns/';
    public static XMLNS_NAMESPACE_URI_SVG: string = 'http://www.w3.org/2000/svg';
    public static XLINK_NAMESPACE_URI: string = 'http://www.w3.org/1999/xlink';
    public static XML_EVENTS_NAMESPACE_URI: string = 'http://www.w3.org/2001/xml-events';
    // XML文件命名空间前缀
    public static XML_PREFIX: string = 'xml';
    public static XMLNS_PREFIX: string = 'xmlns';
    public static XLINK_PREFIX: string = 'xlink';
    // XML文件 xml:{base,id,lang,space} 和 XML事件属性
    public static XML_BASE_ATTRIBUTE: string = 'base';
    public static XML_ID_ATTRIBUTE: string = 'id';
    public static XML_LANG_ATTRIBUTE: string = 'lang';
    public static XML_SPACE_ATTRIBUTE: string = 'space';
    public static XML_BASE_QNAME: string = XMLConstants.XML_PREFIX + ':' + XMLConstants.XML_BASE_ATTRIBUTE;
    public static XML_ID_QNAME: string = XMLConstants.XML_PREFIX + ':' + XMLConstants.XML_ID_ATTRIBUTE;
    public static XML_LANG_QNAME: string = XMLConstants.XML_PREFIX + ':' + XMLConstants.XML_LANG_ATTRIBUTE;
    public static XML_SPACE_QNAME: string = XMLConstants.XML_PREFIX + ':' + XMLConstants.XML_SPACE_ATTRIBUTE;
    public static XML_DEFAULT_VALUE: string = 'default';
    public static XML_PRESERVE_VALUE: string = 'preserve';
    public static XML_EVENTS_EVENT_ATTRIBUTE: string = 'event';
    // XML文件XLink属性
    public static XLINK_HREF_ATTRIBUTE: string = 'href';
    public static XLINK_QNAME: string = XMLConstants.XMLNS_PREFIX + ':' + XMLConstants.XLINK_PREFIX;
    public static XLINK_HREF_QNAME: string = XMLConstants.XLINK_PREFIX + ':' + XMLConstants.XLINK_HREF_ATTRIBUTE;
    // XML文件中的常量
    public static XML_TAB: string = '    ';
    public static XML_EQ: string = '=';
    public static XML_START_COMMENT: string = '<!--';
    public static XML_END_COMMENT: string = '-->';
    public static XML_START_PROCESSING_INSTRUCTION: string = '<?';
    public static XML_END_PROCESSING_INSTRUCTION: string = '?>';
    public static XML_SINGLE_QUOTATION_MARK: string = "'";
    public static XML_DOUBLE_QUOTATION_MARK: string = '"';
    public static XML_LINE_FEED: string = '\n';
    public static XML_OPEN_TAG_END_CHILDREN: string = ' >';
    public static XML_OPEN_TAG_END_NO_CHILDREN: string = '/>';
    public static XML_OPEN_TAG_START: string = '<';
    public static XML_CLOSE_TAG_START: string = '</';
    public static XML_CLOSE_TAG_END: string = '>';
    public static XML_SPACE: string = ' ';
    public static XML_EQUAL_SIGN: string = ':string =';
    public static XML_EQUAL_QUOT: string = ':string =\'';
    public static XML_DOUBLE_QUOTE: string = '\'';
    public static XML_CHAR_QUOT: string = '\'';
    public static XML_CHAR_LT: string = '<';
    public static XML_CHAR_GT: string = '>';
    public static XML_CHAR_APOS: string = '\'';
    public static XML_CHAR_AMP: string = '&';
    public static XML_ENTITY_QUOT: string = '&quot;';
    public static XML_ENTITY_LT: string = '&lt;';
    public static XML_ENTITY_GT: string = '&gt;';
    public static XML_ENTITY_APOS: string = '&apos;';
    public static XML_ENTITY_AMP: string = '&amp;';
    public static XML_CHAR_REF_PREFIX: string = '&#x';
    public static XML_CHAR_REF_SUFFIX: string = ';';
    public static XML_SINGLE_SQUARE_BRACKETS: string = ']';
    public static XML_CDATA_END: string = ']]>';
    public static XML_DOUBLE_DASH: string = '--';
    // XML版本相关
    public static XML_VERSION_KEY: string = 'version';
    public static XML_VERSION_10: string = '1.0';
    public static XML_VERSION_11: string = '1.1';
}
