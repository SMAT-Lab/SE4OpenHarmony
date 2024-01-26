/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import http from '@ohos.net.http';
import request from '@ohos.request';
import webSocket from '@ohos.net.webSocket';
import Logger from '../utils/Logger';
import Constant from '../utils/Constant';

const TAG: string = '[NetworkModel]';

export default class NetworkModel {
  private httpRequest: http.HttpRequest = http.createHttp();
  private mWebSocket: webSocket.WebSocket = webSocket.createWebSocket();

  public async request(action: string, method: http.RequestMethod, extraData: Object, token?: string): Promise<http.HttpResponse> {
    Logger.info(TAG, `request action->${JSON.stringify(action)}, method->${JSON.stringify(method)}, extraData->${JSON.stringify(extraData)},token->${JSON.stringify(token)}`)
    let header = {
      'Content-Type': 'application/json',
      'X-Access-Token': token
    }
    let response = await this.httpRequest.request(
      Constant.URL + action,
      {
        method: method,
        header: header,
        extraData: extraData,
        expectDataType: http.HttpDataType.STRING,
        usingCache: true,
        priority: 1,
        connectTimeout: 60000,
        readTimeout: 60000,
        usingProtocol: http.HttpProtocol.HTTP1_1,
        usingProxy: false,
      });
    Logger.info(TAG, `request response->${JSON.stringify(response)}`)
    return response;

  }

  public uploadFile(action: string, fileName: string, callback): void {
    Logger.info(TAG, `upload file create action = ${action}, fileName = ${fileName}`)
    Logger.info(TAG, `upload url = ${Constant.URL + action}`)
    let uploadTask: request.UploadTask;
    let data: ESObject = AppStorage.get("userInfo");
    let uploadConfig = {
      url: Constant.URL + action,
      header: {
        'X-Access-Token': data?.token, 'Content-Type': 'multipart/form-data'
      },
      method: "POST",
      files: [{
        filename: fileName, name: "file", uri: `internal://cache/${fileName}`, type: "mp4"
      }],
      data: [{
        name: 'biz', value: Constant.UPLOAD_URL
      }],
    };
    Logger.info(TAG, 'upload uploadConfig,' + JSON.stringify(uploadConfig))
    try {
      Logger.info(TAG, 'upload start')
      request.uploadFile(globalThis.abilityContext, uploadConfig).then((data) => {
        uploadTask = data;
        Logger.info(TAG, 'upload end 1')
        uploadTask.on('complete', (taskState: Array<request.TaskState>) => {
          Logger.info(TAG, 'upload complete ' + JSON.stringify(taskState))
          callback(true)
        });
        Logger.info(TAG, 'upload end 2')
      }).catch((err) => {
        Logger.error(TAG, `Failed to request the upload. ${err}`);
      });
    } catch (err) {
      Logger.error(TAG, `Failed to request the upload. Code: ${err.code}, message: ${err.message}`);
    }
  }

  public async onMessage(id: string, token: string, callback): Promise<void> {
    Logger.info(TAG, `onMessage on connect begin: URL= ${Constant.ACTION_ON_MESSAGE_URL + id}`);

    // 连接websocket
    this.mWebSocket.connect(Constant.ACTION_ON_MESSAGE_URL + id, (err, value) => {
      if (!err) {
        Logger.info(TAG, 'onMessage Connected successfully');

        // 连接成功订阅消息
        this.mWebSocket.on('message', (err, value) => {
          Logger.info(TAG, `onMessage on message, message:${value}`);
          if (!err) {
            Logger.info(TAG, 'onMessage receive successfully');
            callback(value);
          } else {
            Logger.info(TAG, `onMessage receive failed. Err: ${JSON.stringify(err)}`);
          }
        });

        // 连接成功订阅错误信息，出现错误则关闭webSocket
        this.mWebSocket.on('error', (err) => {
          Logger.info(TAG, `onMessage on error, error: ${JSON.stringify(err)}`);
          this.mWebSocket.close((err, value) => {
            if (!err) {
              Logger.info(TAG, 'onMessage Connection closed successfully');
            } else {
              Logger.info(TAG, `onMessage Failed to close the connection. Err: ${JSON.stringify(err)}`);
            }
          });
        });

      } else {
        Logger.info(TAG, `onMessage Connection failed. Err: ${JSON.stringify(err)}`);
      }
    });

    Logger.info(TAG, `onMessage on connect end`);

  }
}