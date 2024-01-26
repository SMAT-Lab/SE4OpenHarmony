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

import ArrayList from '@ohos.util.ArrayList';
import connection from '@ohos.net.connection';
import Preconditions from './Preconditions';

export default class IgnoreHostProxySelector {
  // private static  NO_PROXY_LIST: ArrayList<Proxy> = Arrays.asList(Proxy.NO_PROXY);
  private defaultProxySelector: connection.HttpProxy;
  private hostToIgnore: string;
  private portToIgnore: number;

  constructor(defaultProxySelector: connection.HttpProxy, hostToIgnore: string, portToIgnore: number) {
    this.defaultProxySelector = Preconditions.checkNotNull(defaultProxySelector);
    this.hostToIgnore = Preconditions.checkNotNull(hostToIgnore);
    this.portToIgnore = portToIgnore;
  }


  static async install(hostToIgnore: string, portToIgnore: number): Promise<void> {
    // TODO connection.setGlobalHttpProxy属于系统接口，无法调用，此方法不予执行
    if (false) {
      let defaultProxySelector = await connection.getDefaultHttpProxy();
      let ignoreHostProxySelector = new IgnoreHostProxySelector(defaultProxySelector, hostToIgnore, portToIgnore);
      // connection.setGlobalHttpProxy(ignoreHostProxySelector)
    }

  }
}