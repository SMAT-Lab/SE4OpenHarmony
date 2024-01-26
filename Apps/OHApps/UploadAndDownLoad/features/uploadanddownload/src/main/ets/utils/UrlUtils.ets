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
import commonEventManager from '@ohos.commonEventManager';
import preferences from '@ohos.data.preferences';
import { CommonEventData } from './commonEvent/commonEventData';
import { CommonEventSubscriber } from './commonEvent/commonEventSubscriber';
import { logger } from './Logger';

const TAG: string = 'UrlUtils';
const SUBSCRIBER_EVENT: string = 'uploaddownload.event.SET_URL';
const URL_KEY: string = 'url';
const STORE_NAME: string = 'server_url';

class UrlUtil {
  private subscriber: CommonEventSubscriber | undefined = undefined;

  async subscribe(context: common.UIAbilityContext): Promise<void> {
    logger.info(TAG, `subscribe`)
    this.subscriber = await commonEventManager.createSubscriber({ events: [SUBSCRIBER_EVENT] });
    commonEventManager.subscribe(this.subscriber, (err: Error, data: CommonEventData) => {
      if (err) {
        logger.error(TAG, `subscribeCallBack, failed: ${JSON.stringify(err)}`);
        return;
      }
      logger.info(TAG, `subscribeCallBack, ${JSON.stringify(data)}`);
      if (data.event === 'uploaddownload.event.SET_URL' && data.data) {
        urlUtils.saveUrl(context, data.data);
      }
    });
  }

  async getUrl(context: common.UIAbilityContext): Promise<string> {
    let preference = await preferences.getPreferences(context, STORE_NAME);
    let url = await preference.get(URL_KEY, '') as string;
    logger.info(TAG, `getUrl,url= ${url}`);
    return url;
  }

  async saveUrl(context: common.UIAbilityContext, url: string) {
    let preference = await preferences.getPreferences(context, STORE_NAME);
    await preference.put(URL_KEY, url);
    await preference.flush();
  }
}

export const urlUtils = new UrlUtil();
