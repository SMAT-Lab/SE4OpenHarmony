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

import router from '@ohos.router';


class routeBean {
  name: string | Resource = ''
  path: string = ''
}

@Entry
@Component
struct Index {
  @State serverIp: string = '10.50.40.18';
  routes: routeBean[] = [
    {
      name: 'HelloWorld(默认交换机)',
      path: 'pages/HelloWorld'
    },
    {
      name: 'WorkQueues(直连交换机)',
      path: 'pages/WorkQueues'
    },
    {
      name: 'PubSub(扇形交换机)',
      path: 'pages/PubSub'
    } ,
    {
      name: 'Routing(多队列匹配)',
      path: 'pages/Routing'
    },
    {
      name: 'Topics(主题交换机)',
      path: 'pages/Topics'
    },
    {
      name: 'Rpc(一对一连接)',
      path: 'pages/Rpc'
    },
    {
      name: 'TimeoutRpc(超时检查)',
      path: 'pages/TimeoutRpc'
    }
  ]

  build() {

    Column({ space: 20 }) {
      Row() {
        Text('serverIp:')
        TextInput({ text: this.serverIp }).onChange((text) => {
          this.serverIp = text;
        }).focusable(false)
      }.width('100%').height('10%')

      ForEach(this.routes, (item: routeBean) => {
        Text(item.name)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({ url: item.path, params: { serverIp: this.serverIp } } as router.RouterOptions);
          })
      })
    }
    .width('100%')
  }
}