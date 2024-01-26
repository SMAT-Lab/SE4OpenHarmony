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

import url from '@ohos.url';
import { getString } from '@ohos/common';

let urlObject = url.URL.parseURL('https://gitee.com/openharmony/');
let paramsObject = new url.URLParams(urlObject.search.slice(1));
let nodeValue: string = 'nodeValue';
let nodeKey: string = 'node';
let nodeNum: number = 0;

export function insertNode(): string {
  nodeNum++;
  paramsObject.append(nodeKey, nodeValue + nodeNum);
  return urlObject.toString() + paramsObject.toString();
}

export function deleteNode(): string {
  if (paramsObject.has(nodeKey)) {
    paramsObject.delete(nodeKey);
    nodeNum = 0;
    return urlObject.toString() + paramsObject.toString();
  } else {
    return "It does not exist. Please insert first";
  }
}

export function getFirstNode(): string {
  if (paramsObject.has(nodeKey)) {
    let fod = paramsObject.get(nodeKey);
    return fod !== null ? fod.toString() : '';
  } else {
    return getString($r('app.string.please_insert'));
  }
}

export function changeValue(): string {
  paramsObject.set(nodeKey, 'newValue');
  nodeNum = 0;
  return urlObject.toString() + paramsObject.toString();
}