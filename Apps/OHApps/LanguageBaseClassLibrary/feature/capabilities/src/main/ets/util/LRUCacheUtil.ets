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

import common from '@ohos.app.ability.common';
import util from '@ohos.util';

export let lruBuffer: util.LRUCache<string, string> = new util.LRUCache();

export function initLRUCache(): string {
  lruBuffer = new util.LRUCache();
  return getString($r('app.string.create_lru_cache'));
}

export function getCapacity(): string {
  return `capacity = ${lruBuffer.getCapacity()}`;
}

export function updateCapacity(): string {
  lruBuffer.updateCapacity(100);
  return `update capacity success,capacity=${lruBuffer.getCapacity()}`;
}

export function getCacheString(): string {
  return lruBuffer.toString();
}

export function clear(): string {
  lruBuffer.clear();
  return getString($r('app.string.clear'));
}

export function putKeyValue(): string {
  lruBuffer.put(randomString(3), randomString(5));
  return getString($r('app.string.put_success'));
}

export function operationLog(): string {
  lruBuffer.createDefault('10');
  lruBuffer.get('10');
  return `getCreateCount=${lruBuffer.getCreateCount()}\n`
    + `getMissCount=${lruBuffer.getMissCount()}\n`
    + `getRemovalCount=${lruBuffer.getRemovalCount()}\n`
    + `getMatchCount=${lruBuffer.getMatchCount()}\n`
    + `getPutCount=${lruBuffer.getPutCount()}\n`;
}

export function getString(resource: Resource) {
  let context = getContext() as common.UIAbilityContext;
  let resultStr = context.resourceManager.getStringSync(resource);
  return resultStr;
}

export function randomString(length: number): string {
  length = length || 32;
  let string = 'abcdefhijkmnprstwxyz123456789';
  let maxLength = string.length;
  let resultString = '';
  for (let i = 0; i < length; i++) {
    resultString += string.charAt(Math.floor(Math.random() * maxLength));
  }
  return resultString;
}

export function getAllKeyValues(): string {
  let result = '';
  let keyArr: string[] = lruBuffer.keys();
  let valueArr: string[] = lruBuffer.values();
  keyArr.forEach((key: string, index: number) => {
    result += `key: ${key}, value: ${valueArr[index]}\n`;
  })

  return result;
}