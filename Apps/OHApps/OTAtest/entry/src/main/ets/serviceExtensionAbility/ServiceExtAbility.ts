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

import Extension from '@ohos.app.ability.ServiceExtensionAbility'
import rpc from '@ohos.rpc'
import Logger from '../components/Logger'
import { UpdaterManagement, NewVersionStatus } from '../components/UpdaterManagement'

const REQUEST_VALUE = 1;

class StubTest extends rpc.RemoteObject {
  constructor(des) {
    super(des);
  }

  onRemoteRequest(code, data, reply, option) {
    if (code === REQUEST_VALUE) {
      let optFir = data.readInt();
      let optSec = data.readInt();
      reply.writeInt(optFir + optSec);
      console.log(`onRemoteRequest`);
    }
    return true;
  }

  queryLocalInterface(descriptor) {
    return null;
  }

  getInterfaceDescriptor() {
    return "";
  }

  sendRequest(code, data, reply, options) {
    return null;
  }

  getCallingPid() {
    return REQUEST_VALUE;
  }

  getCallingUid() {
    return REQUEST_VALUE;
  }

  attachLocalInterface(localInterface, descriptor) {
  }
}

export default class ServiceExtAbility extends Extension {
  getDayMinutes(): number {
    let date = new Date();
    return date.getHours() * 60 + date.getMinutes();
  }

  updateCheckTask() {
    Logger.info("newVersionStatus is: " + UpdaterManagement.getInstance().newVersionStatus)
    if (UpdaterManagement.getInstance().newVersionStatus == NewVersionStatus.HAS_NEW_VERSION) {
      UpdaterManagement.getInstance().getUpgradePolicy().then(policy => {
        if (policy.downloadStrategy) {
          console.info("start download");
          UpdaterManagement.getInstance().download();
        }
      }).catch(err => {
        console.log(`getDownloadStrategy error ${JSON.stringify(err)}`);
      });
    }
    else if (UpdaterManagement.getInstance().newVersionStatus == NewVersionStatus.DOWNLOAD_SUCCESS) {
      UpdaterManagement.getInstance().getUpgradePolicy().then(policy => {
        if (policy.autoUpgradeStrategy) {
          let minutes = this.getDayMinutes();
          console.info("getDayMinutes: " + minutes);
          console.info("start: " + policy.autoUpgradePeriods[0].start);
          console.info("end: " + policy.autoUpgradePeriods[0].end);
          if (minutes > 120 && minutes < 240) {
            console.info("start upgrade");
            UpdaterManagement.getInstance().upgrade();
          }
        }
      }).catch(err => {
        console.log(`getAutoUpgradeStrategy error ${JSON.stringify(err)}`);
      });
    }
    else if (UpdaterManagement.getInstance().newVersionStatus == NewVersionStatus.NO_NEW_VERSION) {
      UpdaterManagement.getInstance().checkNewVersion();
    }
    else if (UpdaterManagement.getInstance().newVersionStatus == NewVersionStatus.DOWNLOAD_FAIL) {

    }
    setTimeout(() => {
      this.updateCheckTask()
    }, 5000)
  }

  onCreate(want) {
    UpdaterManagement.getInstance().onInit();
    globalThis.serviceExtensionContext = this.context;
    Logger.log(`onCreate, want: ${want.abilityName}`);
  }

  onRequest(want, startId) {
    this.updateCheckTask();
    Logger.log(`onRequest, want: ${want.abilityName}`);

  }

  onConnect(want) {
    Logger.log(`onConnect , want: ${want.abilityName}`);
    return null;
  }

  onDisconnect(want) {
    Logger.log(`onDisconnect, want: ${want.abilityName}`);
  }

  onDestroy() {
    Logger.log(`onDestroy`);
  }
}