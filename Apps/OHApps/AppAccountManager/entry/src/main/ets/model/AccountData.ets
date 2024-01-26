/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import Logger from './Logger'
import common from '@ohos.app.ability.common'
import preferences from '@ohos.data.preferences'


const TAG: string = '[AccountData]';
let storage: preferences.Preferences;
let storageTemp: preferences.Preferences;

export class AccountData {

/*  static instance: AccountData = null

  public static getInstance() {
    if (this.instance === null) {
      this.instance = new AccountData()
    }
    return this.instance
  }*/

  async getFromStorage(context: common.Context, url: string) {
    let name = url
    Logger.info(TAG, `Name is ${name}`)
    try {
      storage = await preferences.getPreferences(context, `${name}`)
    } catch (err) {
      Logger.error(`getStorage failed, code is ${err?.code}, message is ${err?.message}`)
    }
    if (storage) {
      Logger.info(TAG, `Create stroage is fail.`)
    }
  }

  async getStorage(context: common.Context, url: string) {
    storage = storageTemp;
    await this.getFromStorage(context, url)
    return storage
  }

  async putStorageValue(context: common.Context, key: string, value: string, url: string) {
    storage = await this.getStorage(context, url)
    try {
      await storage.put(key, value)
      await storage.flush()
      Logger.info(TAG, `put key && value success`)
    } catch (err) {
      Logger.info(TAG, `aaaaaa put failed`)
    }
    return
  }

  async hasStorageValue(context: common.Context, key: string, url: string) {
    storage = await this.getStorage(context, url)
    let result: boolean = false;
    try {
      result = await storage.has(key)
    } catch (err) {
      Logger.error(`hasStorageValue failed, code is ${err?.code}, message is ${err?.message}`)
    }
    Logger.info(TAG, `hasStorageValue success result is ${result}`)
    return result
  }

  async getStorageValue(context: common.Context, key: string, url: string) {
    storage = await this.getStorage(context, url);
    let getValue: preferences.ValueType = 'null';
    try {
      getValue = await storage.get(key, 'null');
    } catch (err) {
      Logger.error(`getStorageValue failed, code is ${err?.code}, message is ${err?.message}`);
    }
    Logger.info(TAG, `getStorageValue success`);
    return getValue;
  }

  async deleteStorageValue(context: common.Context, key: string, url: string) {
    storage = await this.getStorage(context, url)
    try {
      await storage.delete(key)
      await storage.flush()
    } catch (err) {
      Logger.error(`deleteStorageValue failed, code is ${err?.code}, message is ${err?.message}`)
    }
    Logger.info(TAG, `delete success`)
    return
  }
}