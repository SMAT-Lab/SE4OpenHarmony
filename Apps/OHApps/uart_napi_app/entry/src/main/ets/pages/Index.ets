/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-nocheck
import uart_napi from '@ohos.uart_napi';

@Entry
@Component
struct Index {
  @State uart_value: string = "没有数据"
  @State sensor_respond: string = "尚未启动"
  @State control: string = "启动"
  private timeID: number = -1
  ison: Boolean = false;
  Nextread:Boolean =true;// 控制异步的锁，只有上一个read读出数据才会新开一个异步工作项

  private uart_get() {
    this.Nextread=false;
    uart_napi.uartreadCallback((result)=>{
      this.sensor_respond=result;
      this.Nextread=true;
      console.log("result的值为："+result);
    });
  }
  build() {
    Column() {
      Button(this.control)
        .id("button")
        .onClick(() => {
          if(this.ison) {//点击前为正常传输，点击后暂停
            this.control = '启动'
            this.ison = false
            clearInterval(this.timeID)
            uart_napi.uart_close_napi();
            this.sensor_respond="尚未启动";
            console.log('close succeed');
          }
          else
          {//点击前未启动，点击后启动
            this.control = '关闭'
            this.ison=true;
            uart_napi.uart_init_napi();
            console.log('init succeed');
            this.timeID = setInterval(() => {
              if(this.Nextread)
              {
                this.uart_get();
              }
            },0.2)
          }
        })
        .margin({top:60,right:60})
      Column() {
        Text("感应值: " + this.sensor_respond)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .id("text")
      }
      .margin({left:60,top:40})
    }
  }
}