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


import adc_napi from '@ohos.napi_adc';
import prompt from '@system.prompt';
import { TempInfo, TempInfoTable } from "../common/database/TempInfoTable"
import systemTime from '@ohos.systemTime';
import hilog from '@ohos.hilog';
import radio from '@ohos.telephony.radio';

let context = getContext(this);
let data = context.filesDir;
console.log('getFilesDir success, data:' + JSON.stringify(data));

@Component
export struct showtemp {
  @Link adc_value: number;
  @Link temperature: number;
  @State CONST_TEMP: number = 0.042;
  @State timerId: number = -1;
  @Link mode: boolean;

  //销毁定时器
  aboutToDisappear() {
    if (this.timerId > 0) {
      clearTimeout(this.timerId)
      this.timerId = -1
    }
  }

  private get_adc_value() {
    let value = adc_napi.get_adc_value();
    this.adc_value = value;
  }

  private get_adc_tempature() {
    this.temperature = this.adc_value * this.CONST_TEMP;
  }

  private get_adc_tempatureF() {
    this.temperature = this.adc_value * this.CONST_TEMP * 9 / 5 + 32;
  }

  build() {
    Text()
      .height(1)
      .onAppear(() => {
        console.log("在showtemp组件中mode值为：" + this.mode)
        if (this.mode) {
          this.timerId = setInterval(() => {
            this.get_adc_value();
            this.get_adc_tempature();
          }, 1000)
        }
        else {
          console.log("华氏度模式")
          this.timerId = setInterval(() => {
            this.get_adc_value();
            this.get_adc_tempatureF();
          }, 1000)
        }
      })
  }
}

@Component
export struct onlywirte {
  @Link TempInfoobj: TempInfoTable //link index.ets中的tempinfotable对象
  @State timerId: number = -1;

  //销毁定时器
  aboutToDisappear() {
    if (this.timerId > 0) {
      clearTimeout(this.timerId)
      this.timerId = -1
    }
  }

  writetemptofile() {
    this.timerId = setInterval(() => {
      console.log("这里又如何");
      let adc_value1 = adc_napi.get_adc_value();
      console.log("adc_value1" + adc_value1.toString());
      let temperature = adc_value1 * 0.042;
      if (adc_value1 <= 800 && adc_value1 >= 500) {
        systemTime.getDate((error, date) => {
          if (error) {
            console.error(`Failed to get date. Cause:` + JSON.stringify(error));
            return;
          }
          console.log(`Succeeded in getting Date. Date: ` + JSON.stringify(date));
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let hour = date.getHours();
          let min = date.getMinutes();
          let sec = date.getSeconds();
          console.log("year:" + year);
          console.log("month:" + month);
          console.log("day:" + day);
          console.log("hour:" + hour);
          console.log("min:" + min);
          console.log("sec:" + sec);
          this.TempInfoobj.insertdata(year, month, day, hour, min, sec, temperature, (isdone: Function) => {
            if (isdone) {
              console.log("myTempInfotable success write!");
            }
            else {
              console.log('myTempInfotable Failed to write');
            }
          });
        });

      }
      else {
        prompt.showToast({
          message: "adc值异常，请检查连线", // 显示文本
          duration: 1000, // 显示时长
          bottom: 200 // 距离底部的距离
        })
      }
    }, 1000);
  }

  aboutToAppear() {
    this.writetemptofile();
  }

  build() {
  }
}

@Component
export struct time_text {
  gettime() {
    systemTime.getDate((error, date) => {
      if (error) {
        console.info(`Failed to get date. message: ${error.message}, code: ${error.code}`);
        return;
      }
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      console.log("year:" + year);
      console.log("month:" + month);
      console.log("day:" + day);
      console.log("hour:" + hour);
      console.log("min:" + min);
      console.log("sec:" + sec);
      console.info(`Succeeded in get date : ${date}`);
      ;
    });
  }

  build() {
    Button('获取时间', { type: ButtonType.Capsule }).borderRadius(20).fontSize(30)
      .onClick(() => {
        this.gettime();
      })
  }
}

@Component
export struct value_text {
  @Link adc_value: number;
  @Link temperature: number;
  @Link mode: boolean;

  build() {
    Column() {
      Text("adc数值:" + this.adc_value)
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .id("adcValue")
      if (this.mode) {
        Text("温度:" + this.temperature.toFixed(1) + "°C")// toFixed(1) 浮点数保留一位小数
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .id("C")
      }
      else {
        Text("温度:" + this.temperature.toFixed(1) + "°F")// toFixed(1) 浮点数保留一位小数
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .id("F")
      }
    }
  }
}

@Component
export struct get_value_button {
  //@Link dataarray: Array<Number>;
  @Link adc_value: number;
  @Link temperature: number;
  @State CONST_TEMP: number = 0.042;
  private error: string = "";

  build() {
    Column() {
      Button() {
        Text('获取')
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
          .fontStyle(FontStyle.Italic)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 20
      })
      .backgroundColor('#0D9FFB')
      .width('20%')
      .height('10%')
      .onClick(() => {
        this.get_adc_value();
        this.get_adc_tempature();
        this.writeTemperature();
      })
    }
  }

  private get_adc_value() {
    let value = adc_napi.get_adc_value();
    this.adc_value = value;
  }

  private get_adc_tempature() {
    this.temperature = this.adc_value * this.CONST_TEMP;
  }

  private async writeTemperature() {
    let ret = adc_napi.filewriteCallback();
  }
}


@Component
export struct startrecord_button {
  @Link TempInfoobj: TempInfoTable //link index.ets中的tempinfotable对象

  private async writetemptofile() {
    let intervalID = setInterval(() => {
      let adc_value = adc_napi.get_adc_value();
      console.log("adc_value" + adc_value.toString());
      let temperature = adc_value * 0.042;
      if (adc_value <= 800 && adc_value >= 500) {
        systemTime.getDate((error, date) => {
          if (error) {
            console.error(`Failed to get date. Cause:` + JSON.stringify(error));
            return;
          }
          console.log(`Succeeded in getting Date. Date: ` + JSON.stringify(date));
          let year = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDate();
          let hour = date.getHours();
          let min = date.getMinutes();
          let sec = date.getSeconds();
          console.log("year:" + year);
          console.log("month:" + month);
          console.log("day:" + day);
          console.log("hour:" + hour);
          console.log("min:" + min);
          console.log("sec:" + sec);
          this.TempInfoobj.insertdata(year, month, day, hour, min, sec, temperature, (isdone: Function) => {
            if (isdone) {
              console.log("myTempInfotable success write!");
            }
            else {
              console.log('myTempInfotable Failed to write');
            }
          });
        });

      }
      else {
        prompt.showToast({
          message: "adc值异常，请检查连线", // 显示文本
          duration: 1000, // 显示时长
          bottom: 200 // 距离底部的距离
        })
      }
    }, 1000);
  }

  build() {
    Column() {
      Button('开始记录', { type: ButtonType.Capsule }).borderRadius(20).fontSize(30)
        .onClick(() => {
          this.writetemptofile();
        })
      // Button('读数据',{type: ButtonType.Capsule}).borderRadius(20).fontSize(30)
      //   // .onAppear(()=>{
      //   //
      //   // })
      //   .onClick(()=>{
      //     console.log("开始读数据测试");
      //     this.TempInfoobj.queryAll((tempinfolist)=>{
      //       for(let i=0;i<tempinfolist.length;i++)
      //       {
      //         console.log(tempinfolist[i].temperature+"readtest");
      //       }
      //     })
      //   })
    }
  }
}

@Component
export struct getdata {
  @Link TempInfoobj: TempInfoTable //link index.ets中的tempinfotable对象
  @Link datainfolist: Array<TempInfo>;

  build() {
    Button('查询数据', { type: ButtonType.Capsule }).borderRadius(20).fontSize(30)
      .onClick(() => {
        console.log("开始读数据测试");
        this.TempInfoobj.queryAll((tempinfolist: TempInfo[]) => {
          this.datainfolist = tempinfolist;
          for (let i = 0;i < this.datainfolist.length; i++) {
            console.log("温度数据：" + this.datainfolist[i].temperature);
          }
        })
      })
  }
}

@Component
export struct GridExample {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  @Link datainfolist: Array<TempInfo>;
  @Link TempInfoobj: TempInfoTable //link index.ets中的tempinfotable对象
  @State timerId: number = -1; //实时绘制的定时器id
  @State slidervaluefortext: number = 1;
  slidervalue: number = 1;
  xleft: number = 40
  axisratio: number = 1;
  intervalratio: number = 1;

  build() {
    Column({ space: 5 }) {
      Scroll() {
        Column() {
          Grid() {
            GridItem() {
              Flex({
                direction: FlexDirection.Column,
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.Center
              }) {
                Canvas(this.context)
                  .id("Canvas")
                  .width('100%')
                  .height('100%')
                  .backgroundColor('#ffff00')
                  .onReady(() => {
                    this.drawAxis()
                    this.drawYLables()
                  })
              }
            }
          }
          .columnsTemplate('1fr')
          .rowsTemplate('1fr')
          .columnsGap(10)
          .rowsGap(10)
          .width('95%')
          .backgroundColor(0xFAEEE0)
          .height(300)
        }
        .width(2100).margin({ top: 5 })
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Auto)

      Row() {
        Button('绘制', { type: ButtonType.Capsule }).borderRadius(20).fontSize(30)
          .id("Draw")
          .onClick(async () => {
            console.log("开始读数据测试");
            this.TempInfoobj.queryAll((tempinfolist: TempInfo[]) => {
              this.datainfolist = tempinfolist;
            })
            this.context.clearRect(this.xleft + 2, 0, 2100, 0.89 * this.context.height)
            this.drawhistoricalData();
          })
          .margin({ left: 340 })
        Slider({
          value: this.slidervalue,
          min: 1,
          step: 1,
          max: 8,
          style: SliderStyle.OutSet
        })
          .id('Slider')
          .margin({ left: 100 })
          .width(200)
          .showSteps(true)
          .onChange((value: number, mode: SliderChangeMode) => {
            if (this.timerId > 0) {
              clearTimeout(this.timerId)
              this.timerId = -1
            }
            this.slidervaluefortext = value;
            this.slidervalue = value;
            console.info('value:' + value + 'mode:' + mode.toString());
          })
        Text(this.slidervaluefortext.toFixed(0)).fontSize(12)
      }
      .width('100%')
    }
  }

  //销毁定时器
  aboutToDisappear() {
    if (this.timerId > 0) {
      clearTimeout(this.timerId)
      this.timerId = -1
    }
  }

  //画坐标轴
  private drawAxis() {
    const context = this.context;
    context.save()
    context.lineWidth = 3
    context.strokeStyle = '#353535'
    this.context.lineCap = 'round'
    let h1 = this.context.height
    let w1 = this.context.width
    let xstart = this.xleft, ystart = 0.1 * h1, xend = 2000, yend = 0.9 * h1
    context.beginPath()
    this.context.beginPath()
    this.context.moveTo(xstart, 0)
    this.context.lineTo(xstart, yend)
    this.context.lineTo(xend, yend)
    this.context.stroke()
  }

  drawYLables() {
    let h1 = this.context.height
    let w1 = this.context.width
    let xstart = this.xleft, ystart = 0.1 * h1, xend = 0.9 * w1, yend = 0.9 * h1
    let coordinates = 25, value = 35
    while (coordinates <= yend) {
      // 画文本
      this.context.save()
      // 指定绘制的填充色
      this.context.fillStyle = '#0000ff'
      // 设置文本绘制中的字体样式
      this.context.font = '20px sans-serif'
      // 设置文本绘制中的文本对齐方式：文本右对齐
      this.context.textAlign = 'left'
      // 绘制填充类文本
      this.context.fillText(value.toString(), 0, coordinates + 10)
      //绘制y轴上的小线段。
      this.context.strokeStyle = '#353535';
      if (coordinates < yend) {
        this.context.beginPath();
        this.context.moveTo(xstart - 10, coordinates);
        this.context.lineTo(xstart, coordinates)
        this.context.stroke()
      }
      // 更新y轴坐标：每次加上y轴等分
      coordinates += (yend - ystart) / 2
      value -= 5
    }
    this.context.stroke()
  }

  private drawhistoricalData() {
    const context = this.context;
    let h1 = this.context.height
    let w1 = this.context.width
    let xstart = this.xleft, ystart = 0.1 * h1, xend = 0.9 * w1, yend = 0.9 * h1
    let data = this.datainfolist; //数据点坐标
    let gap = 20 * this.axisratio;
    //缓存从数据值到坐标距离的比例因子
    let yFactor = (yend - ystart) / 10;
    let activeX = 0; //记录绘制过程中当前点的坐标
    let activeY = 0; //记录绘制过程中当前点的y坐标
    context.strokeStyle = '#1abc9c';
    //绘制折线
    context.beginPath();
    context.moveTo(xstart, yend - (data[0].temperature - 25) * yFactor); //先将起点移动至第一个数据点
    for (let i = 0, j = 0; i < data.length; i += this.slidervalue, j++) {
      activeX = xstart + (j) * gap;
      activeY = yend - (data[i].temperature - 25) * yFactor;
      context.lineTo(activeX, activeY);
      context.stroke();
    }
    // context.restore()

    // //绘制数据点辅助虚线
    // context.strokeStyle = '#a29d9d'
    // context.setLineDash([10, 20])
    // context.beginPath()
    // for (let i = 0; i < data.length; i++) {
    //   context.moveTo(xstart, yend-(data[i].temperature-25) * yFactor)
    //   activeX = xstart + (i + 1) * gap;
    //   activeY = yend-(data[i].temperature-25) * yFactor;
    //   context.lineTo(activeX, activeY)
    //   context.lineTo(activeX, yend)
    //   context.lineTo(activeX, yend)
    //   context.stroke()
    // }
    //绘制数据点
    let j = 0 //历史数据横坐标画到了哪里
    for (let i = 0; i < data.length; i += this.slidervalue, j++) {
      activeX = xstart + j * gap;
      activeY = yend - (data[i].temperature - 25) * yFactor;
      context.beginPath()
      context.arc(activeX, activeY, 3, 0, 2 * Math.PI, false)
      context.fill()
      context.closePath()
    }
    context.restore()

    //以上为历史数据绘制
    //实时数据绘制
    if (this.timerId > 0) {
      clearTimeout(this.timerId)
      this.timerId = -1
    }
    let i = 0;
    context.beginPath();
    context.moveTo(activeX, activeY)
    this.timerId = setInterval(() => {
      let adc_value1 = adc_napi.get_adc_value();
      let temperature = adc_value1 * 0.042;
      if (adc_value1 <= 800 && adc_value1 >= 500) {
        context.lineTo(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor)
        context.stroke();
        context.arc(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor, 3, 0, 2 * Math.PI, false)
        context.fill()
        context.closePath()
        context.moveTo(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor)
        i++;
      }
      else {
        prompt.showToast({
          message: "adc值异常，请检查连线", // 显示文本
          duration: 1000, // 显示时长
          bottom: 200 // 距离底部的距离
        })
      }
    }, 1000 * this.slidervalue);
  }
}


