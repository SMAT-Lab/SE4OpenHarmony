/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import http from '@ohos.net.http';
import Logger from '../utils/Logger';
import Constant from '../utils/Constant';
import NetworkModel from '../model/NetworkModel';
import LoginResult from '../appsampled/data/LoginResult';
import R from '../appsampled/data/R';

const TAG: string = '[LoginController]';

export default class LoginController {
  private networkModel: NetworkModel = new NetworkModel();

  public async login(phoneNumber: string, password: string): Promise<R> {
    Logger.info(TAG, `login phoneNumber->${phoneNumber}，password->${password}`);
    let extraData: ESObject = {
      username: phoneNumber,
      password: password
    };
    Logger.info(TAG, `login extraData->${JSON.stringify(extraData)}`)
    let response = await this.networkModel.request(Constant.ACTION_LOGIN, http.RequestMethod.POST, extraData);
    // 拿到响应中服务端返回的数据
    let data = response.result.toString();
    // 将其转成Json数据
    let jsonData: ESObject = JSON.parse(data);
    Logger.info(TAG, `login jsonData->${JSON.stringify(jsonData)}`)
    // 统一的返回类型
    let result = new R();
    let loginResult: ESObject ;
    // result不为空则赋值其中的数据
    if (jsonData.result) {
      loginResult = new LoginResult();
      loginResult.setToken(jsonData.result.token);
      loginResult.setUsername(jsonData.result.userInfo.username);
      loginResult.setRealName(jsonData.result.userInfo.realname);
      loginResult.setAvatar(jsonData.result.userInfo.avatar);
      loginResult.setId(jsonData.result.userInfo.id);
    }
    result.setSuccess(jsonData.success);
    result.setCode(jsonData.code);
    result.setMessage(jsonData.message);
    // 设置返回的数据
    result.setData(loginResult);
    return result;
  }
}