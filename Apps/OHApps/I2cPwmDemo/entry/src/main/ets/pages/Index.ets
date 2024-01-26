/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
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
import i2c_ctl from "@ohos.i2cnapi"
import pwm_ctl from '@ohos.pwmnapi'

@Entry
@Component
struct Index {
  @State temperatureC: string = '摄氏度:';
  @State temperatureF: string = '华氏度:';
  @State humidity: string = '湿度:';
  selectIndex: number = 0;
  @State selectValue: string = "温度计";
  iw = 205;
  ih = 41;
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D()
  private img: ImageBitmap = new ImageBitmap("/common/point.jpg");

  flushDraw(rad: number): void {
    let width = this.context.width;
    let height = this.context.height;

    this.context.clearRect(0, 0, width, height);
    this.context.translate(width / 2, height - this.ih * 3);
    this.context.rotate(rad);

    this.context.drawImage(this.img, -129, -this.ih / 2);

    this.context.rotate(-rad);
    this.context.translate(-width / 2, -(height - this.ih * 3));
  }

  build() {
    Row() {
      Column() {
        Text(this.temperatureC)
          .width("300vp")
          .height("60vp")
        Text(this.temperatureF)
          .width("300vp")
          .height("60vp")
        Text(this.humidity)
          .width("300vp")
          .height("60vp")
      }
      .width('50%')
      .height('100%')
      .onAppear(() => {
        setInterval(async () => {
          let data = await i2c_ctl.getDataAsync();
          this.temperatureC = '摄氏度: ' + data.temperatureC.toFixed(2) + '°C';
          this.temperatureF = '华氏度:' + data.temperatureF.toFixed(2) + '℉';
          this.humidity = '湿度:' + data.humidity.toFixed(2) + '%';
          let drawData: number;
          switch (this.selectIndex) {
            case 0:
              drawData = data.temperatureC;
              break;
            case 1:
              drawData = data.humidity;
              break;
            default:
              drawData = 0;
              break;
          }
          this.flushDraw(drawData / 100 * Math.PI);
          pwm_ctl.setAngleAsync(180 - (drawData / 100 * 180));
        }, 1000);
      })

      Column() {
        Select([{ value: "温度计" }, { value: "湿度计" }])
          .selected(0)
          .value(this.selectValue)
          .onSelect((index: number, value: string) => {
            this.selectIndex = index;
            this.selectValue = value;
          })
        Canvas(this.context)
          .width("100%")
          .height("100%")
          .onAppear(() => {
            let width = this.context.width;
            let height = this.context.height;
            this.context.translate(width / 2, height - this.ih * 3);
            this.context.drawImage(this.img, -129, -this.ih / 2);
            this.context.translate(-width / 2, -(height - this.ih * 3));
          })
      }
      .width("50%")
      .height('100%')
    }
    .height('100%')
  }
}