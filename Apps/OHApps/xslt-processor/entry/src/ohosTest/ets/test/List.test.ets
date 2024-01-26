/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import xsltTest from './XSLT.test'
import xpathTest from './XPath.test'
import domTest from './Dom.test'
import escapeTest from './Escape.test'
import localNameTest from  './LocalName.test'
import simpleTest from  './Simple.test'
import xmlToJson from './XmlToJson.test';
import xmlToken from './XmlToken.test'
import variablesAsParametersTest from './VariablesAsParameters.test'
import heTest from './he.test'

export default function testsuite() {
  xsltTest();
  xpathTest();
  domTest();
  escapeTest();
  localNameTest();
  simpleTest();
  xmlToJson();
  xmlToken();
  variablesAsParametersTest();
  heTest();
}