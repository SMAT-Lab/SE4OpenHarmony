/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@CustomDialog
struct LoadingComponent {
  controller: CustomDialogController;
  @Link componentBackGround: number | string;
  @Link loadTextMessage: string;
  private canvasCtx: CanvasRenderingContext2D = new CanvasRenderingContext2D({ antialias: true })
  private lineCount: number = 10;
  private time: number = 0;
  private intervalTime: number = 0;

  build() {
    Stack() {

      Column() {
        Canvas(this.canvasCtx).width(60).height(60).onReady(() => {

          let canvasWidth = this.canvasCtx.width;
          let canvasHeight = this.canvasCtx.height;

          let radius = canvasWidth / 2;
          let radiusOffset = radius / 2;

          let centerX = canvasWidth / 2;
          let centerY = canvasHeight / 2;
          let stokeWidth = vp2px(2);
          this.canvasCtx.lineWidth = stokeWidth;

          let lineLength = radius / 3;

          let startX = centerX + radiusOffset;
          let endX = startX + lineLength;

          let minCircleR = startX - centerX;
          let maxCircleR = endX - centerX;

          this.intervalTime = setInterval(() => {
            this.time++;
            for (let i = this.lineCount - 1; i >= 0; i--) {

              let firstX = centerX + minCircleR * Math.cos(2 * Math.PI / this.lineCount * i);
              let firstY = centerY + minCircleR * Math.sin(2 * Math.PI / this.lineCount * i);

              let secondX = centerX + maxCircleR * Math.cos(2 * Math.PI / this.lineCount * i);
              let secondY = centerY + maxCircleR * Math.sin(2 * Math.PI / this.lineCount * i);


              let temp = Math.abs(i + this.time) % this.lineCount;
              let fraction = (temp + 1) / this.lineCount;

              let color = this.evaluate(fraction, this.parseColor("#EEEEEE"), this.parseColor("#111111"));

              let r = (color >> 16) & 0xff;
              let g = (color >> 8) & 0xff;
              let b = color & 0xff;
              let a = (color >> 24) & 0xff;

              let paintColor = this.rgbaToHex("rgba(" + r + "," + g + "," + b + "," + a + ")");
              this.canvasCtx.strokeStyle = paintColor;
              this.canvasCtx.beginPath()
              this.canvasCtx.lineCap = 'round'
              this.canvasCtx.moveTo(firstX, firstY)
              this.canvasCtx.lineTo(secondX, secondY)
              this.canvasCtx.stroke()

            }
          }, 80)

        })

        Text(this.loadTextMessage)
          .padding({ top: 20, left: 12, right: 12 })
          .fontColor("#EEEEEE")
          .fontSize(20)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .visibility(this.loadTextMessage ? Visibility.Visible : Visibility.None);

      }.margin({ left: 30, right: 30, top: 30, bottom: 30 })

    }.margin({ left: 30, right: 30 }).borderRadius(10).backgroundColor(this.componentBackGround)
  }

  aboutToDisappear() {
    if (this.intervalTime) {
      clearInterval(this.intervalTime);
    }
  }

  private evaluate(fraction: number, startValue: number, endValue: number): number {

    let startInt = startValue;
    let startA = (startInt >> 24) & 0xff;
    let startR = (startInt >> 16) & 0xff;
    let startG = (startInt >> 8) & 0xff;
    let startB = startInt & 0xff;

    let endInt = endValue;
    let endA = (endInt >> 24) & 0xff;
    let endR = (endInt >> 16) & 0xff;
    let endG = (endInt >> 8) & 0xff;
    let endB = endInt & 0xff;

    return ((startA + (fraction * (endA - startA))) << 24) |
    ((startR + (fraction * (endR - startR))) << 16) |
    ((startG + (fraction * (endG - startG))) << 8) |
    ((startB + (fraction * (endB - startB))));
  }

  private parseColor(colorString: string): number {
    let color:number = 0;
    if (colorString.charAt(0) == '#') {
      color = Number('0x'+ colorString.substring(1))
      if (colorString.length == 7) {
        color |= 0x00000000ff000000;
      } else if (colorString.length != 9) {
        throw new Error("Unknown color");
      }
    }
    return color;
  }

  private rgbaToHex(color: string) {
    let values = color.replace(new RegExp('/rgba?\\(', 'g'),'').replace(new RegExp('\\)', 'g'), '').replace(new RegExp('[\\s+]', 'g'), '').split(',');
    let a = Number.parseFloat(values[3] || 1 +''),
      r = Math.floor(a * Number.parseInt(values[0]) + (1 - a) * 225),
      g = Math.floor(a * Number.parseInt(values[1]) + (1 - a) * 225),
      b = Math.floor(a * Number.parseInt(values[2]) + (1 - a) * 225);

    return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2)
  }
}


@Component
export struct LoadingStyleDialog {
  @Link @Watch("showLoading") showLoadingDialog: boolean;
  @Link @Watch("closeLoading") closeLoadingDialog: boolean;
  @State dialogBackGroundColor: number | string = Color.Black;
  @Prop dialogToastMessage: string = "";
  private mDialogController: CustomDialogController = new CustomDialogController({
    builder: LoadingComponent({
      componentBackGround: $dialogBackGroundColor,
      loadTextMessage: $dialogToastMessage
    }),
    autoCancel: false,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    customStyle: true,
    maskColor: 0x33000000
  });

  showLoading() {
    if (this.mDialogController) {
      this.mDialogController.open();
    }
  }

  closeLoading() {
    if (this.mDialogController) {
      this.mDialogController.close();
    }
  }

  build() {
  }
}