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

export default class Constant {

  // URL
  public static readonly URL: string = 'http://192.168.18.16:8080/jeecg-boot';
  public static readonly ACTION_ON_MESSAGE_URL: string = 'ws://192.168.18.16:8080/jeecg-boot/websocket/';
  public static readonly ACTION_SEND_MESSAGE: string = '/sys/message/sysMessageTemplate/sendMsg';
  public static readonly UPLOAD_URL: string = 'sampleE';
  public static readonly ACTION_LOGIN: string = '/sys/login';
  public static readonly ACTION_UPLOAD: string = '/sys/common/upload';
  public static readonly ACTION_ADD_FILE: string = '/harmony/video/add';
  public static readonly ACTION_BUSINESS_LIST: string = '/harmony/mtBusiness/list';
  public static readonly ACTION_GROUP_BUY: string = '/harmony/mtGroupSite/list';
  public static readonly ACTION_GET_COMMODITY_LIST: string = '/harmony/mtBusinessGoods/list';
  public static readonly ACTION_GET_COMMODITY_DETAIL: string = '/harmony/mtBusinessGoods/detail';
  public static readonly ACTION_GET_Comment_LIST: string = '/harmony/mtBusinessComment/list';
}