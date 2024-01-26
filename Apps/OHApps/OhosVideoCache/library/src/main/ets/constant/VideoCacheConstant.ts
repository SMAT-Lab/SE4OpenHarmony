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

export class VideoCacheConstant {
  public static PING_EVENT_ID: number = 1; // 发出事件---ping代理服务器成功传递响应结果
  public static COUNT_TOTAL_SIZE_ID: number = 2; // 发出事件---子线程解析出文件夹里面的所有文件之后发给LruDiskUsage
  public static COUNT_TOTAL_SIZE_START_ID: number = 3; // 发出事件---文件夹数据发送完毕之前，发出信号调用先清空之前缓存到列表的文件名
  public static COUNT_TOTAL_SIZE_END_ID: number = 4; // 发出事件---文件夹数据发送完毕之后，发出信号调用LruDiskUsage的方法countTotalSize
  public static SEND_TOTAL_SIZE_ID: number = 5; // 发出事件---用于接受主线程处理好的TotalSize
  public static GET_ACCEPT_ID: number = 6; // 发出事件---向主线程询问该缓存文件是否需要删除
  public static SEND_ACCEPT_ID: number = 7; // 发出事件---向子线程返回缓存文件是否需要删除的结论
  public static SHUT_DOWN_TASKPOOL: number = 8; // 发出事件---关闭子线程
  public static HTTP_URL_SOURCE_READY_ID: number = 10; // 发出事件---HttpUrlSource初始化成功，可以发起网络请求(初始化是异步的 所以必须等待初始化结束才可以进行下一步)
  public static SERVER_READY_ID: number = 11; // 发出事件---代理服务器初始化成功，可以发起ping请求和获取处理之后的音视频url(初始化是异步的 所以必须等待初始化结束才可以进行下一步)
  public static RENAME_FINISH_ID: number = 12; // 发出事件---文件重命名结束，可以进行后续的操作了(防止重命名未结束直接关闭文件导致的数据异常)
  public static PING_RESPONSE: string = "ping ok" // 本地构造的用于本地代理服务器返回给播放器发起的ping请求的响应结果
  public static PING_REQUEST: string = "ping" // 发出事件---用于构造播放器发起的ping请求

  constructor() {
  }
}