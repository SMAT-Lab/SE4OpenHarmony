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

const TAG: string = '[CommodityController]';

export default class CommodityController {
  private networkModel: NetworkModel = new NetworkModel();

  public async getCommodityList(businessId: string): Promise<any> {
    Logger.info(TAG, `getCommodityList businessId->${businessId}`);
    let extraData = {
      businessId: businessId
    };
    Logger.info(TAG, `getCommodityList extraData->${JSON.stringify(extraData)}`);
    let userInfo: LoginResult = AppStorage.get('userInfo')!
    let response = await this.networkModel.request(Constant.ACTION_GET_COMMODITY_LIST, http.RequestMethod.GET, extraData, userInfo.token);
    Logger.info(TAG, `getCommodityList response->${JSON.stringify(response)}`);
    // 拿到响应中服务端返回的数据
    Logger.info(TAG, `getCommodityList response.result->${JSON.stringify(response.result)}`);
    let data = response.result.toString();
    Logger.info(TAG, `getCommodityList data->${JSON.stringify(data)}`);
    // 将其转成Json数据
    let jsonData = JSON.parse(data);
    Logger.info(TAG, `getCommodityList jsonData->${JSON.stringify(jsonData)}`);
    let result = null; // 商家数据
    if (jsonData && jsonData.result) {
      result = jsonData.result.records;
    }
    Logger.info(TAG, `getCommodityList result->${JSON.stringify(result)}`);
    return result;
  }

  public async getCommodityById(commodityId: string): Promise<any> {
    Logger.info(TAG, `getCommodityById commodityId->${commodityId}`);
    let extraData = {
      id: commodityId
    };
    Logger.info(TAG, `getCommodityById extraData->${JSON.stringify(extraData)}`);
    let userInfo: LoginResult = AppStorage.get('userInfo')!
    let response = await this.networkModel.request(Constant.ACTION_GET_COMMODITY_DETAIL, http.RequestMethod.GET, extraData, userInfo.token);
    Logger.info(TAG, `getCommodityById response->${JSON.stringify(response)}`);
    // 拿到响应中服务端返回的数据
    Logger.info(TAG, `getCommodityById response.result->${JSON.stringify(response.result)}`);
    let data = response.result.toString();
    Logger.info(TAG, `getCommodityById data->${JSON.stringify(data)}`);
    // 将其转成Json数据
    let jsonData = JSON.parse(data);
    Logger.info(TAG, `getCommodityById jsonData->${JSON.stringify(jsonData)}`);
    let result = null; // 商家数据
    if (jsonData) {
      result = jsonData.result;
    }
    return result;
  }
}
