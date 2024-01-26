/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import ConsoleN from './ConsoleN'



@Component
export struct Console {
  @Link model: ConsoleN.Model;
  @State logInfos: Array<ConsoleN.LogInfo> = [];

  build() {
    Stack() {
      List() {
        ForEach(this.logInfos, (logInfo: ESObject) => {
          ListItem() {
            Text(logInfo.message).fontColor(ConsoleN.parseLogColor(logInfo.level))
          }
        }, (logInfo: ESObject) => {
          return logInfo.id.toString()
        });
      }
      .width('100%')
      .height('100%')
      .alignListItem(ListItemAlign.Start)
      .backgroundColor(Color.White)
      .borderRadius(10)
      .shadow({ radius: 20 })
    }.width('100%')
    .height('100%')
    .padding(5)
  }

  aboutToAppear() {
    this.model?.setOnLogAppendListener((message: string, level: ConsoleN.LOG_LEVEL) => {
      this.onLogAppend(message, level);
    });
  }

  onLogAppend(message: string, level: ConsoleN.LOG_LEVEL) {
    this.logInfos.push({ id: this.logInfos.length, message, level })
  }
}


