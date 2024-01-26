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

import promptAction from '@ohos.promptAction'
import Imap, { inspect } from '@ohos/node-imap'
import router from '@ohos.router'
import MsgDetailUtil from '../MsgDetailUtil'
import DetailCallback from '../bean/DetailCallback'
import { ImapMessageAttributes } from '../bean/ImapMessage'
import GlobalObj from '../GlobalObj'

@Entry
@Component
struct MsgDetailPage {
  @State message: string = 'Hello World'
  @State clickIndex: number = -1
  private util: MsgDetailUtil = new MsgDetailUtil()

  showToast(text: string, name = '测试') {
    console.log(`zdy---${name}--->${text}`)
    promptAction.showToast({
      message: text,
      duration: 2000,
      bottom: 50
    })
  }

  aboutToAppear() {
    const ctx = this;
    if (!GlobalObj?.getInstance()?.getClient()) {
      this.showToast('账号未登录，请登录后再试', 'MsgDetail-imap')
      router.back()
      return
    }
    let tempParam = router.getParams() as Record<string, number>
    if (tempParam && tempParam['clickIndex']) {
      ctx.clickIndex = tempParam['clickIndex']
    } else {
      this.showToast('未获取到邮箱文件夹参数', 'MsgDetail-imap')
      router.back()
      return
    }
    let prefix: string = ''
    let buffer: string = '';
    let callback: DetailCallback = {
      messageStartCallback: (seqno: number) => {
        console.log('Message #%d', seqno);
        prefix = '(#' + seqno + ') ';
      },
      bodyStartCallback: () => {
      },
      bodyDataCallback: (data: string) => {
        buffer += data;
      },
      bodyEndCallback: () => {
        try {
          ctx.showToast(`获取整个邮件体成功：${'\r\n'}${buffer}`, 'MsgDetail-imap');
          if (buffer.length > 65535) {
            ctx.message = `获取整个邮件体成功,文本长度超过65535，text，取65535长度用于显示：${'\r\n'}${buffer.substring(0, 65535)}`
          } else {
            ctx.message = `获取整个邮件体成功：${'\r\n'}${buffer}`
          }

        } catch (err) {
          throw err as Error
        }
      },
      attributesCallback: (attrs: ImapMessageAttributes) => {
        // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      },
      messageEndCallback: () => {
        console.log(prefix + 'Finished');
      },
      fetchErrorCallback: (err: Error) => {
        console.log('Fetch error: ' + err);
      },
      fetchEndCallback: () => {
        console.log('Done fetching all messages!');
        GlobalObj?.getInstance()?.getClient()?.end();
      }
    }
    this.util?.getDetail(ctx.clickIndex, callback)
  }

  build() {
    Row() {
      Column() {
        Scroll() {
          Text(this.message)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Start)
            .padding(20)
            .width('100%')
            .height(2256)
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}