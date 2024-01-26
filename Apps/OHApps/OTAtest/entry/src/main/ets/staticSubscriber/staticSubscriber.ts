/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import StaticSubscriberExtensionAbility from '@ohos.application.StaticSubscriberExtensionAbility'
import Logger from '../components/Logger'
import ServiceModel from '../components/ServiceModel'

export class StaticSubscriber extends StaticSubscriberExtensionAbility {
  private serviceModel = new ServiceModel(globalThis.serviceExtensionContext);

  onReceiveEvent(event) {
    Logger.info(`onReceiveEvent, event:  ${event.event}`);
    this.serviceModel.startServiceExtAbility(function (code) {
      if (code === 1) {
        Logger.info('服务启动成功');
      } else {
        Logger.info('服务启动失败');
      }
    })
  }
}