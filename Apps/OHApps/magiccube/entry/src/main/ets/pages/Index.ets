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

import {Axis,Face,RotateDir,Mode, updateAngle, twist, resetAngle} from 'libmagiccube.so'

@Entry
@Component
struct Index {
  private xcomponentId = 'magiccube';
  private panOption: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.All });
  @State axisSelected: number = 0;
  private axisSelects: Array<SelectOption> = [{ value: 'X轴' }, { value: 'Y轴' }, { value: 'Z轴' }];
  private axisValue: Array<number> = [Axis.X, Axis.Y, Axis.Z];
  @State dirSelected: number = 0;
  private dirSelects: Array<SelectOption> = [{ value: '左面' }, { value: '中间面' }, { value: '右面' }];
  private dirValue: Array<number> = [Face.Left, Face.Middle, Face.Right];
  private mode: Mode = Mode.Free;
  private preMousePosX: number = 0;
  private preMousePosY: number = 0;

  build() {
    Row() {
      XComponent({ id: this.xcomponentId, type: 'surface', libraryname: 'magiccube' })
        .gesture(PanGesture(this.panOption)
          .onActionUpdate((event) => {
            if (this.mode == Mode.Free) {
              updateAngle(event.offsetX, event.offsetY);
            }
          })
          .onActionStart((event) => {
            this.preMousePosX = event.fingerList[0].localX;
            this.preMousePosY = event.fingerList[0].localY;
          })
          .onActionEnd((event) => {
            if (this.mode == Mode.Regular) {
              let axis: Axis;
              let face: Face;
              let dir: RotateDir;
              let px = event.fingerList[0].localX - this.preMousePosX;
              let py = event.fingerList[0].localY - this.preMousePosY;
              let abx: number = Math.abs(px);
              let aby: number = Math.abs(py);
              if (abx > aby && aby < 80) {
                axis = Axis.Y;
                dir = px < 0 ? RotateDir.clockwise : RotateDir.Counterclockwise;
                if (this.preMousePosY < 330 && this.preMousePosY > 250) {
                  face = Face.Left;
                }
                else if (this.preMousePosY < 250 && this.preMousePosY > 170) {
                  face = Face.Middle;
                }
                else if (this.preMousePosY < 170 && this.preMousePosY > 90) {
                  face = Face.Right;
                }
                else {
                  return;
                }
              }
              else if (aby > abx && abx < 80) {
                axis = Axis.X;
                dir = py < 0 ? RotateDir.clockwise : RotateDir.Counterclockwise;
                if (this.preMousePosX > 240 && this.preMousePosX < 320) {
                  face = Face.Right;
                }
                else if (this.preMousePosX > 160 && this.preMousePosX < 240) {
                  face = Face.Middle;
                }
                else if (this.preMousePosX > 80 && this.preMousePosX < 160) {
                  face = Face.Left;
                }
                else {
                  return;
                }
              }
              else {
                return;
              }
              twist(axis, face, dir, this.mode);
            }
          })
        )
        .width('50%')
        .height('100%')
      Tabs() {
        TabContent() {
          Column() {
            Text("Opengl魔方sample")
              .fontSize("20vp")
              .fontWeight(FontWeight.Bold)
              .textAlign(TextAlign.Center)
            Divider()
              .strokeWidth(8)
              .color('#F1F3F5')
            Text("扭动魔方")
            Row() {
              Select(this.dirSelects)
                .selected(this.dirSelected)
                .value(this.dirSelects[this.dirSelected].value.toString())
                .onSelect((index) => {
                  this.dirSelected = index;
                })
              Text("绕")
              Select(this.axisSelects)
                .selected(this.axisSelected)
                .value(this.axisSelects[this.axisSelected].value.toString())
                .onSelect((index) => {
                  this.axisSelected = index;
                })
              Button("旋转")
                .onClick((event) => {
                  twist(this.axisValue[this.axisSelected], this.dirValue[this.dirSelected], RotateDir.Counterclockwise, Mode.Regular);
                })
            }
          }
          .width('50%')
          .height('100%')
        }
        .tabBar("视角自由模式")

        TabContent() {
          Column() {
            Text("Opengl魔方sample")
              .fontSize("20vp")
              .fontWeight(FontWeight.Bold)
              .textAlign(TextAlign.Center)
            Text("左侧滑动扭魔方")
            Text("方向键(调整视角)")

            Divider()
              .strokeWidth(8)
              .color('#F1F3F5')
            Row() {
              Button("↑")
                .onClick(() => updateAngle(0, 90))
            }
            .justifyContent(FlexAlign.Center)
            Row() {
              Button("←")
                .onClick(() => updateAngle(90, 0))
              Button("↓")
                .onClick(() => updateAngle(0, -90))
              Button("→")
                .onClick(() => updateAngle(-90, 0))
            }
            .justifyContent(FlexAlign.Center)
          }
          .justifyContent(FlexAlign.Start)
        }
        .tabBar("视角固定模式")
      }
      .width('50%')
      .height('100%')
      .onChange((index) => {
        if (index == 1) {
          resetAngle();
          this.mode = Mode.Regular;
        }
        else if (index == 0) {
          this.mode = Mode.Free;
        }
      })
    }
    .width('100%')
    .height('100%')
  }
}
