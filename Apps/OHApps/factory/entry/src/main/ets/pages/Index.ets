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
import router from '@ohos.router';
import { GRAPHIC_TRANSFORMATION, TestButton } from './testData'
import window from '@ohos.window';
import common from '@ohos.app.ability.common';
@Entry
@Component
struct Index {
  @Builder itemHead(text: Resource | string) {
    Text(text)
      .fontSize(20)
      .height(50)
      .backgroundColor('#ffeae9e9')
      .width("100%")
      .padding(10)
  }
  onPageShow() {
    //获取当前窗口
    var FullScreen  =  true;
    let context = getContext(this) as common.UIAbilityContext
    let windowClass = null;
    try {
      let promise = window.getLastWindow(context);
      promise.then((data)=> {
        windowClass = data;
        console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
        //设置全屏状态
        let promise = windowClass.setFullScreen(FullScreen);
        promise.then(() => {
          console.info('Succeeded in enabling the full-screen mode. ');
        }).catch((err) => {
          console.error('Failed to enable the full-screen mode. Cause: ' + JSON.stringify(err));
        });
        console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
      }).catch((err)=>{
        console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
      });
    } catch (exception) {
      console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(exception));
    }
  }
  build() {
    Column() {
      Text('yarward测试')
        .fontSize(50)
      Scroll() {
        Column() {
          List({ space: 5 }) {
            ForEach(GRAPHIC_TRANSFORMATION, (item: TestButton, index: number) => {
              ListItemGroup({ header: this.itemHead(item.title) }) {
                if (item.childNodes) {
                  ForEach(item.childNodes, (childItem: TestButton) => {
                    ListItem() {
                      Text(childItem.title)
                        .width("100%")
                        .height(50)
                        .fontSize(20)
                        .padding(10)
                        .backgroundColor(Color.White)
                        .onClick(()=>{
                          router.pushUrl({url:childItem.url})
                        })
                    }
                  })
                }
              }
              .divider({ strokeWidth: 1, color: Color.Black }) // 每行之间的分界线
              .onClick(()=>{
                console.error('onclick')
                if(item.childNodes == undefined){
                  console.error('onclick item.childNodes == undefined')
                  router.pushUrl({url:item.url})
                }
              })
            })
          }
          Column()
            .margin({bottom:90})
        }
        .constraintSize({ minHeight: '100%' })
      }
    }
    .justifyContent(FlexAlign.Center)
  }
}
