/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import protobufFormatTest from './ProtobufFormat.test'
import attributeNameTest from './sax/attribute/attribute-name.test'
import attributeNoSpace from './sax/attribute/attribute-no-space.test'
import attributeUnquoted from './sax/attribute/attribute-unquoted.test'
import bomTest from './sax/bom.test'
import bufferOverrunTest from './sax/buffer-overrun.test'
import caseTest from './sax/case.test'
import cdataTest from './sax/cdata/cdata.test'
import cdataChunkedTest from './sax/cdata/cdata-chunked.test'
import cdataEndSplitTest from './sax/cdata/cdata-end-split.test'
import cdataFakeEndTest from './sax/cdata/cdata-fake-end.test'
import cdataMultipleTest from './sax/cdata/cdata-multiple.test'
import cyrillicTest from './sax/cyrillic.test'
import duplicateAttributeTest from './sax/duplicate-attribute.test'
import emojiTest from './sax/emoji.test'
import entitiesTest from './sax/entity/entities.test'
import entityMegaTest from './sax/entity/entity-mega.test'
import entityNanTest from './sax/entity/entity-nan.test'
import flush from './sax/flush.test'
import issue_23Test from './sax/issue/issue-23.test'
import issue_30Test from './sax/issue/issue-30.test'
import issue_35Test from './sax/issue/issue-35.test'
import issue_47Test from './sax/issue/issue-47.test'
import issue_49Test from './sax/issue/issue-49.test'
import issue_84Test from './sax/issue/issue-84.test'
import issue_86Test from './sax/issue/issue-86.test'
import notStringTest from './sax/not-string.test'
import openTagStartTest from './sax/opentagstart.test'
import parserPositionTest from './sax/parser-position.test'
import scriptTest from './sax/script.test'
import scriptCloseBetterTest from './sax/script-close-better.test'
import selfClosingChildTest from './sax/self_closing/self-closing-child.test'
import selfClosingChildStrictTest from './sax/self_closing/self-closing-child-strict.test'
import selfClosingTagTest from './sax/self_closing/self-closing-tag.test'
import standAloneCommentTest from './sax/stand-alone-comment.test'
import strayEndingTest from './sax/stray-ending.test'
import trailingAttributeNoValueTest from './sax/trailing-attribute-no-value.test'
import trailingNonWhitespaceTest from './sax/trailing-non-whitespace.test'
import unclosedRootTest from './sax/unclosed-root.test'
import unquotedTest from './sax/unquoted.test'
import xmlInternalEntitiesTest from './sax/xml-internal-entities.test'
import xmlEntitiesTest from './sax/xml_entities.test'
import xmlnsAsTagNameTest from './sax/xmlns/xmlns-as-tag-name.test'
import xmlnsIssue41Test from './sax/xmlns/xmlns-issue-41.test'
import xmlnsRebindingTest from './sax/xmlns/xmlns-rebinding.test'
import xmlnsStrictTest from './sax/xmlns/xmlns-strict.test'
import xmlnsUnboundTest from './sax/xmlns/xmlns-unbound.test'
import xmlnsUnboundElementTest from './sax/xmlns/xmlns-unbound-element.test'
import xmlnsXmlDefaultNsTest from './sax/xmlns/xmlns-xml-default-ns.test'
import xmlnsXmlDefaultPrefixTest from './sax/xmlns/xmlns-xml-default-prefix.test'
import xmlnsXmlDefaultPrefixAttributeTest from './sax/xmlns/xmlns-xml-default-prefix-attribute.test'
import xmlnsXmlDefaultRedefineTest from './sax/xmlns/xmlns-xml-default-redefine.test'
import arrayHelperTest from './xml-js/array-helper.test'
import testing_js2xml from './xml-js/js2xml-callbacks.test'
import testing_js2xml_issue from './xml-js/js2xml-issues.test'
import js2xmlOptionsTest from './xml-js/js2xml-options.test'
import optionsHelperTest from './xml-js/options-helper.test'
import testingXml2js from './xml-js/xml2js-callbacks.test'
import testingXml2jsIssue from './xml-js/xml2js-issues.test'
import testingXml2jsKey from './xml-js/xml2js-keys.test'
import testingXml2jsOptions from './xml-js/xml2js-options.test'

export default function testsuite() {
  protobufFormatTest()
  attributeNameTest()
  attributeNoSpace()
  attributeUnquoted()
  bomTest()
  bufferOverrunTest()
  caseTest()
  cdataTest()
  cdataChunkedTest()
  cdataEndSplitTest()
  cdataFakeEndTest()
  cdataMultipleTest()
  cyrillicTest()
  duplicateAttributeTest()
  emojiTest()
  entitiesTest()
  entityMegaTest()
  entityNanTest()
  flush()
  issue_23Test()
  issue_30Test()
  issue_35Test()
  issue_47Test()
  issue_49Test()
  issue_84Test()
  issue_86Test()
  notStringTest()
  openTagStartTest()
  parserPositionTest()
  scriptTest()
  scriptCloseBetterTest()
  selfClosingChildTest()
  selfClosingChildStrictTest()
  selfClosingTagTest()
  standAloneCommentTest()
  strayEndingTest()
  trailingAttributeNoValueTest()
  trailingNonWhitespaceTest()
  unclosedRootTest()
  unquotedTest()
  xmlInternalEntitiesTest()
  xmlEntitiesTest()
  xmlnsAsTagNameTest()
  xmlnsRebindingTest()
  xmlnsIssue41Test()
  xmlnsStrictTest()
  xmlnsUnboundTest()
  xmlnsUnboundElementTest()
  xmlnsXmlDefaultNsTest()
  xmlnsXmlDefaultPrefixTest()
  xmlnsXmlDefaultPrefixAttributeTest()
  xmlnsXmlDefaultRedefineTest()
  arrayHelperTest()
  testing_js2xml()
  testing_js2xml_issue()
  js2xmlOptionsTest()
  optionsHelperTest()
  testingXml2js()
  testingXml2jsIssue()
  testingXml2jsKey()
  testingXml2jsOptions()
}