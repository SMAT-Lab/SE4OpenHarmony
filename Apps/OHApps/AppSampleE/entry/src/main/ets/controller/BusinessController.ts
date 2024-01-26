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
import LoginResult from '../data/LoginResult';
import { BusinessInfo, CommentInfo } from '../data/Server'
const TAG: string = '[BusinessController]';

export default class BusinessController {
  private networkModel: NetworkModel = new NetworkModel();

  public async getBusinessList(longitude: string, latitude: string): Promise<any> {
    Logger.info(TAG, `getBusinessList longitude->${longitude}，latitude->${latitude}`);
    let extraData = {
      longitude: longitude,
      latitude: latitude
    };
    Logger.info(TAG, `getBusinessList extraData->${JSON.stringify(extraData)}`);
    let userInfo: LoginResult = AppStorage.get('userInfo')!
    let response = await this.networkModel.request(Constant.ACTION_BUSINESS_LIST, http.RequestMethod.GET, extraData, userInfo.token);
    Logger.info(TAG, `getBusinessList response->${JSON.stringify(response)}`);
    // 拿到响应中服务端返回的数据
    Logger.info(TAG, `getBusinessList response.result->${JSON.stringify(response.result)}`);
    let data: string = response.result.toString();
    Logger.info(TAG, `getBusinessList data->${JSON.stringify(data)}`);
    // 将其转成Json数据
    let jsonData = JSON.parse(data);
    Logger.info(TAG, `getBusinessList jsonData->${JSON.stringify(jsonData)}`);
    let result: BusinessInfo[] = []; // 商家数据
    if (jsonData && jsonData.result) {
      result = jsonData.result.records;
    }
    return result;
  }

  public async getCommentList(businessId: string): Promise<any> {
    Logger.info(TAG, `getCommentList businessId->${businessId}`);
    let extraData = {
      businessId: businessId
    };
    Logger.info(TAG, `getCommentList extraData->${JSON.stringify(extraData)}`);
    let userInfo: LoginResult = AppStorage.get('userInfo')!
    let response = await this.networkModel.request(Constant.ACTION_GET_Comment_LIST, http.RequestMethod.GET, extraData, userInfo.token);
    Logger.info(TAG, `getCommentList response->${JSON.stringify(response)}`);
    // 拿到响应中服务端返回的数据
    Logger.info(TAG, `getCommentList response.result->${JSON.stringify(response.result)}`);
    let data: string = response.result.toString();
    Logger.info(TAG, `getCommentList data->${JSON.stringify(data)}`);
    // 将其转成Json数据
    let jsonData = JSON.parse(data);
    Logger.info(TAG, `getCommentList jsonData->${JSON.stringify(jsonData)}`);
    let result: CommentInfo[] = []; // 商家数据
    if (jsonData && jsonData.result) {
      result = jsonData.result.records;
    }
    return result;
  }
}