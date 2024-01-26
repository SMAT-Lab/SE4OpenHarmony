/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

export class ChatContentEntity {
  constructor(author?: string, message?: string, messageType?: number, isTip?: boolean) {
    if (author) {
      this.author = author
    }
    if (message) {
      this.message = message
    }
    if (messageType) {
      this.messageType = messageType
    }
    if (isTip) {
      this.isTip = isTip
    }
  }

  author: string = '' // 用户
  message: string = '' // 消息体
  messageType: number = 1 // 消息类型   1文本  2图片   3语音   4视频
  isTip: boolean = false // 是否是提示文字
}