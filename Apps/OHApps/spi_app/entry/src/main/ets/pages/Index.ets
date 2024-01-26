/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import um_spi from '@ohos.spitest';
import prompt from '@ohos.prompt';
import PromptDialog from './promptDialog';
import hilog from '@ohos.hilog';

@Entry
@Component
struct ComponentTest {
  private scroller: Scroller = new Scroller(); // 创建一个滚动控制器
  @State sum_list: number = 0;
  @State items: Array<number> = new Array<number>();
  @State date: Array<string> = new Array<string>();
  @State value: Array<string> = new Array<string>();
  @State now_item: number = 0;
  @State now_value: string = "请输入：";
  @State now_date: string = "";
  @State title_show: Boolean = true;
  data_splice() {
    this.items.splice(0, this.items.length);
    this.date.splice(0, this.date.length);
    this.value.splice(0, this.value.length);
  }
  data_add(item: number) {
    this.items.push(item);
    this.date.push(um_spi.sync_read_date(item));
    hilog.info(0xF111,"SPI_APP","date is %{public}s",this.date[item])
    this.value.push(um_spi.sync_read_value(item));
    hilog.info(0xF111,"SPI_APP","value is %{public}s",this.value[item])
  }

  data_update() {
    let date = new Date();
    this.now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    hilog.info(0xF111,"SPI_APP","%{public}s",this.now_date)
    let read_sum_list = um_spi.sync_read_sum_list();
    hilog.info(0xF111,"SPI_APP","%{public}d",read_sum_list)
    if (read_sum_list || read_sum_list == 0) {
      this.sum_list = read_sum_list;
      this.data_splice();
      for (let i = 0; i < this.sum_list; i++) {
        this.data_add(i);
      }
      prompt.showToast({
        message: "读取历史记录成功！\n"
      })
    }
    else {
      prompt.showToast({
        message: "读取历史记录失败！\n没有权限！"
      })
    }
  }
  back_top(){
    this.scroller.scrollEdge(Edge.Top)
  }
  onPageShow() {
    this.data_update();
  }
  // 创建一个controller
  write_controller: CustomDialogController = new CustomDialogController({
    builder: PromptDialog({ confirm: () => {
      this.onWrite()
    }, title: "写入记录", content: this.now_value }), // 弹框的构造器
    cancel: () => {
      console.log("取消写入") // 点击蒙层的回调
    },
    autoCancel: true, // 允许点击蒙层关闭弹窗
    customStyle: true // 使用自定义样式
  });
  //write对话框点击yes事件处理
  onWrite() {
    let date = new Date()
    let getHours = date.getHours()
    let getMinutes = date.getMinutes()
    let write_date = this.now_date + " ";
    if (getHours < 10) {
      write_date = write_date + '0'
    }
    write_date = write_date + getHours + ":";
    if (getMinutes < 10) {
      write_date = write_date + '0'
    }
    write_date = write_date + getMinutes;
    let get_value = um_spi.sync_write_buffer_value(this.now_value.length + 1, this.now_value, write_date);
    if (get_value) {
      this.now_value = "写入:\n" + get_value.toString();
      //更新新添加的数据
      this.data_add(this.sum_list);
      //更新sum_list数据
      this.sum_list = um_spi.sync_read_sum_list();
      this.back_top();
      prompt.showToast({
        message: "写入记录成功！"
      })
    }
    else {
      prompt.showToast({
        message: "写入失败！\n 没有权限！"
      })
    }
  }
  // 创建一个controller
  erase_controller: CustomDialogController = new CustomDialogController({
    builder: PromptDialog({ confirm: () => {
      this.onErase()
    }, title: "清空记录", content: "清空后无法恢复，是否继续?" }), // 弹框的构造器
    cancel: () => {
      console.log("取消清空") // 点击蒙层的回调
    },
    autoCancel: true, // 允许点击蒙层关闭弹窗
    customStyle: true // 使用自定义样式
  });
  //erase对话框点击yes事件处理
  onErase() {
    let ret = um_spi.sync_all_erase();
    if (ret) {
      //更新sum_list数据
      this.sum_list = um_spi.sync_read_sum_list();
      //清空date、value和items数组
      this.data_splice();
      prompt.showToast({
        message: "清空成功！"
      })
    }
    else {
      prompt.showToast({
        message: "清空失败！\n没有权限！"
      })
    }
  }
  build() {
    Column() {
      Stack({ alignContent: Alignment.BottomEnd }) { // 堆叠式布局
        Column() {
            Scroll(this.scroller) { // 绑定滚动控制器
              Column() {
                Row() {
                  Text("刷新")
                    .fontSize(20)
                    .fontColor('#808080')
                    .height(50)
                    .textAlign(TextAlign.Center)
                    .id('flash_button')
                    .onClick(() => {
                      this.data_update();
                    })
                    .layoutWeight(1)
                  Text("学霸笔记")
                    .textAlign(TextAlign.Center)
                    .fontSize(30)
                    .height(50)
                    .layoutWeight(1)
                  Text('清空')
                    .fontSize(20)
                    .fontColor('#808080')
                    .height(50)
                    .textAlign(TextAlign.Center)
                    .id("clean_up_button")
                    .onClick(() => {
                      this.erase_controller.open();
                    })
                    .layoutWeight(1)
                }
                .width('100%')
                .height(55)
                .onDisAppear(() => {
                  this.title_show = false;
                })
                Line()
                  .width('100%')
                  .height(3)
                  .backgroundColor('#808080')

                if(um_spi.sync_get_MB_Free()){
                  Text("剩余空间:" + um_spi.sync_get_MB_Free() + "%")
                    .fontSize(15)
                    .fontColor('#808080')
                    .height(20)
                    .id("MB_Free")
                }

                if(this.sum_list == 0){
                  Text('空')
                  .fontSize(30)
                  .width('100%')
                  .fontColor('#808080')
                  .height(200)
                  .textAlign(TextAlign.Center)
                }

                ForEach(this.items, (item: number) => { // ForEach语法循环创建子组件
                  Text(this.date[item] + ": " + this.value[item])
                    .fontSize(26)
                    .width('90%')
                    .height(50)
                    .backgroundColor(Color.White)
                    .margin({ top: 10 })
                    .border({
                      color: Color.Blue,
                      width: 2,
                      radius: 0,
                      style: BorderStyle.Solid
                    })
                    .onClick(()=>{
                      AlertDialog.show({ // 点击按钮，弹出一个对话框
                        title: this.date[item], // 设置标题
                        message: this.value[item], // 设置内容
                        alignment: DialogAlignment.Center, // 设置弹窗的对齐方式
                        confirm: { // 单个按钮的配置文本
                          value: "返回",
                          fontColor: Color.Black,
                          backgroundColor: "#aabbcc",
                          action: () => {
                            console.log("return")
                          }
                        }
                      })
                    })
                })
                Stack({ alignContent: Alignment.BottomStart }){
                  Text('返回')
                    .fontSize(20)
                    .fontColor('#808080')
                    .height(30)
                    .textAlign(TextAlign.Center)
                    .id('back_Click')
                    .onClick(() => {
                      this.back_top();
                    })
                  Text(this.now_date)
                    .fontSize(16)
                    .height(30)
                    .id("next_date")
                    .offset({
                      x:'50%'
                    })
                }
                .width('100%')
                .height(30)
                .margin({ top: 500 })
                Row() {
                  Stack({ alignContent: Alignment.BottomEnd }) {
                    TextArea({ text: this.now_value })
                      .width("100%")
                      .height(300)
                      .id("TextArea")
                      .fontColor(Color.Black)
                      .fontStyle(FontStyle.Italic)
                      .caretColor(Color.Red)
                      .placeholderColor(Color.Green)
                      .placeholderFont({
                        size: 20,
                        style: FontStyle.Italic,
                        weight: FontWeight.Bold
                      })
                      .onFocus(() => {
                        this.now_value = "";
                      })
                      .onChange((value) => {
                        this.now_value = value;
                      })
                    Text(this.now_value.length + "/200")
                      .fontSize(14)
                      .margin(10)
                      .id("max_font")
                  }
                  .width('100%')
                  .height(300)
                }
                .alignItems(VerticalAlign.Top)
                .width('100%')
                .height(300)
                .margin({ top: 10 })

                Row() {
                  Button('write')
                    .size({ width: 90, height: 50 })
                    .backgroundColor('#bbccaa')
                    .id("write_button")
                    .onClick(() => {
                      this.write_controller.open() // 打开弹窗
                    })
                  Button('falshID', { stateEffect: true })
                    .size({ width: 90, height: 50 })
                    .backgroundColor('#aabbcc')
                    .id('flashID_button')
                    .onClick(() => {
                      let falshID = um_spi.sync_get_flashid_value();
                      if (falshID) {
                        this.now_value = "FlashID:" + falshID.toString(16);
                      }
                      else {
                        prompt.showToast({
                          message: "读取falshID失败!\n没有权限！"
                        })
                      }
                    })
                  Button('deviceID')
                    .size({ width: 90, height: 50 })
                    .backgroundColor('#ccaabb')
                    .id('deviceID_button')
                    .onClick(() => {
                      let deviceID = um_spi.sync_get_deviceid_value();
                      if (deviceID) {
                        this.now_value = "deviceID:" + deviceID.toString(16);
                      }
                      else {
                        prompt.showToast({
                          message: "读取deviceID失败!\n没有权限"
                        })
                      }
                    })
                }
                .justifyContent(FlexAlign.SpaceEvenly)
                .size({ width: "100%", height: 50 })

              }
              .width("100%")
            }
          .scrollable(ScrollDirection.Vertical) // 设置竖直方向滚动
          .scrollBarWidth(15) // 设置滚动条宽度
          .scrollBar(BarState.On) // 设置滚动条永久显示
          .width('100%')
          .height('100%')
          .padding({ top: 10, bottom: 10 })
        }
        .alignItems(HorizontalAlign.Center)
        .width('100%')
        .height('100%')
        Button('+') // 显示一个+按钮
          .size({ width: 80, height: 80 }) // 按钮大小
          .fontSize(50) // 按钮文字大小
          .id('add_button')
          .onClick(() => { // 按钮点击事件
            let date = new Date;
            this.now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            this.scroller.scrollEdge(Edge.End) // 滚动到底部
          })
          .margin(50)
          .defaultFocus(true)
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}



