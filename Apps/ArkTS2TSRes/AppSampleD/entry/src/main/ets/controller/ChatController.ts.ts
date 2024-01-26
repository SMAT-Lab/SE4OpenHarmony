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
import R from '../appsampled/data/R';
import App from '@system.app';
const TAG: string = '[ChatController]';
export default class ChatController {
    private networkModel: NetworkModel = new NetworkModel();
    /**
     * 发送消息
     * @param username
     * @param msg
     * @returns
     */
    public async sendMessage(username: string, msg: string): Promise<R> {
        Logger.info(TAG, `sendMessage username->${username}，msg->${msg}`);
        let extraData = {
            msgType: 'system',
            receiver: username,
            templateCode: 'sampled',
            templateName: 'appsampled',
            testData: `{ \"content\": \"${msg}\" }`
        };
        Logger.info(TAG, `sendMessage extraData->${JSON.stringify(extraData)}`);
        let responseData: ESObject = AppStorage.get("userInfo");
        let response = await this.networkModel.request(Constant.ACTION_SEND_MESSAGE, http.RequestMethod.POST, extraData, responseData.token);
        // 拿到响应中服务端返回的数据
        Logger.info(TAG, `sendMessage response.result->${JSON.stringify(response.result)}`);
        let data = response.result.toString();
        // 将其转成Json数据
        let jsonData = JSON.parse(data);
        Logger.info(TAG, `sendMessage jsonData->${JSON.stringify(jsonData)}`);
        // 统一的返回类型
        let result = new R();
        result.setSuccess(jsonData.success);
        result.setCode(jsonData.code);
        result.setMessage(jsonData.message);
        Logger.info(TAG, `sendMessage result->${JSON.stringify(result)}`);
        return result;
    }
    /**
     * 接收消息
     * @param id
     * @param callback
     */
    public onMessage(id: string, callback) {
        Logger.info(TAG, `onMessage begin id:${id}`);
        let data: ESObject = AppStorage.get("userInfo");
        this.networkModel.onMessage(id, data?.token, (value) => {
            Logger.info(TAG, `onMessage value: ${value}`);
            let result = JSON.parse(value);
            Logger.info(TAG, `onMessage result: ${result}`);
            Logger.info(TAG, `onMessage msgTxt: ${result.msgTxt}`);
            if (result.msgTxt) {
                let message = JSON.parse(result.msgTxt);
                Logger.info(TAG, `onMessage content: ${message.content}`);
                callback(message.content);
            }
        });
        Logger.info(TAG, 'onMessage end');
    }
}
