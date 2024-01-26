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
import R from '../data/R';
import LoginResult from '../data/LoginResult';
const TAG: string = '[LoginController]';
export default class LoginController {
    private networkModel: NetworkModel = new NetworkModel();
    public async login(phoneNumber: string, password: string): Promise<R> {
        Logger.info(TAG, `login phoneNumber->${phoneNumber}，password->${password}`);
        let extraData = {
            username: phoneNumber,
            password: password
        };
        Logger.info(TAG, `login extraData->${JSON.stringify(extraData)}`);
        let response = await this.networkModel.request(Constant.ACTION_LOGIN, http.RequestMethod.POST, extraData);
        // 拿到响应中服务端返回的数据
        let data = response.result.toString();
        // 将其转成Json数据
        let jsonData = JSON.parse(data);
        Logger.info(TAG, `login jsonData->${JSON.stringify(jsonData)}`);
        // 统一的返回类型
        let result = new R();
        result.success = jsonData.success;
        result.code = jsonData.code;
        result.message = jsonData.message;
        // result不为空则赋值其中的数据
        if (jsonData.result) {
            let loginResult = new LoginResult();
            loginResult.token = jsonData.result.token;
            loginResult.username = jsonData.result.userInfo.username;
            loginResult.realName = jsonData.result.userInfo.realname;
            loginResult.avatar = jsonData.result.userInfo.avatar;
            loginResult.id = jsonData.result.userInfo.id;
            // 设置返回的数据
            result.data = loginResult;
        }
        return result;
    }
}
