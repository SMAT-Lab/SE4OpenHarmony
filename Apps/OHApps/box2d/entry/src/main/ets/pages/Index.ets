/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Main } from '../Testbed/Framework/Main'
import * as box2d from '@ohos/box2d'
import { Settings } from '../Testbed/Framework/Test'
import { g_testEntries } from '../Testbed/Tests/TestEntries'

class ArrayItem {
  value: string = '';
}

@Entry
@Component
struct Index {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private commonFontSize = 14;
  private fontColor = Color.Grey;
  private zindexRevers: boolean = false;
  private selectArr: Array<ArrayItem> = [];
  private selectIndex = 0;
  @State title: string = "Box2D Testbed version " + box2d.b2_version + "<br>(branch: " + box2d.b2_branch + " commit: " + box2d.b2_commit + ")";
  @State controlZindex: number = 99;
  @State canvasZindex: number = 1;
  private time = 60
  private app: Main = new Main(this.time, this.context)
  private m_settings = this.app ? this.app.m_settings : (new Settings())
  @State fps: string = this.app ? this.app.m_fps.toFixed(1).toString() : "FPS"
  @State index: number = this.app ? this.app.m_test_index : this.selectIndex
  private isLoad: boolean = false
  @State visibile: Visibility = Visibility.Visible;

  aboutToAppear() {
    for (let i: number = 0; i < g_testEntries.length; ++i) {
      let o: ArrayItem = new ArrayItem();
      o.value = g_testEntries[i].name;
      this.selectArr[i] = o;
    }

    const loop = () => {
      let tt = new Date().getTime()
      this.app.SimulationLoop(tt)
      setTimeout(loop, this.time)
    }
    setTimeout(loop, this.time)
  }

  build() {
    Stack() {
      Scroll() {
        Flex() {
          Column() {
            Text(this.title)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.Grey)

            Text(this.fps)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.Grey)

            Text("Tests")
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.Grey)

            Select(this.selectArr)
              .space(8)
              .selected(this.index)
              .value(this.selectArr[this.index].value)
              .font({ size: 20, weight: 200, family: 'serif', style: FontStyle.Normal })
              .selectedOptionFont({ size: 30, weight: 300, family: 'serif', style: FontStyle.Normal })
              .optionFont({ size: 20, weight: 200, family: 'serif', style: FontStyle.Normal })
              .onSelect((index: number) => {
                this.index = index;
                if (this.app) {
                  this.app.m_test_index = index;
                  this.app.LoadTest();
                }
              })

            this.connect_number_input("Vel Iters", this.m_settings.velocityIterations, (value: number): void => {
              this.m_settings.velocityIterations = value;
            }, 1, 20, 1);
            this.connect_number_input("Pos Iters", this.m_settings.positionIterations, (value: number): void => {
              this.m_settings.positionIterations = value;
            }, 1, 20, 1);
            // #if B2_ENABLE_PARTICLE
            this.connect_number_input("Pcl Iters", this.m_settings.particleIterations, (value: number): void => {
              this.m_settings.particleIterations = value;
            }, 1, 100, 1);
            // #endif
            this.connect_number_input("Hertz", this.m_settings.hz, (value: number): void => {
              this.m_settings.hz = value;
            }, 10, 120, 1);


            this.connect_checkbox_input("Sleep", this.m_settings.enableSleep, (value: boolean): void => {
              this.m_settings.enableSleep = value;
            });
            this.connect_checkbox_input("Warm Starting", this.m_settings.enableWarmStarting, (value: boolean): void => {
              this.m_settings.enableWarmStarting = value;
            });
            this.connect_checkbox_input("Time of Impact", this.m_settings.enableContinuous, (value: boolean): void => {
              this.m_settings.enableContinuous = value;
            });
            this.connect_checkbox_input("Sub-Stepping", this.m_settings.enableSubStepping, (value: boolean): void => {
              this.m_settings.enableSubStepping = value;
            });
            // #if B2_ENABLE_PARTICLE
            this.connect_checkbox_input("Strict Particle/Body Contacts", this.m_settings.strictContacts, (value: boolean): void => {
              this.m_settings.strictContacts = value;
            });
            //    // #endif

            Text("Draw")
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.Grey)

            this.connect_checkbox_input("Shapes", this.m_settings.drawShapes, (value: boolean): void => {
              this.m_settings.drawShapes = value;
            });
            // #if B2_ENABLE_PARTICLE
            this.connect_checkbox_input("Particles", this.m_settings.drawParticles, (value: boolean): void => {
              this.m_settings.drawParticles = value;
            });
            // #endif
            this.connect_checkbox_input("Joints", this.m_settings.drawJoints, (value: boolean): void => {
              this.m_settings.drawJoints = value;
            });
            this.connect_checkbox_input("AABBs", this.m_settings.drawAABBs, (value: boolean): void => {
              this.m_settings.drawAABBs = value;
            });
            this.connect_checkbox_input("Contact Points", this.m_settings.drawContactPoints, (value: boolean): void => {
              this.m_settings.drawContactPoints = value;
            });
            this.connect_checkbox_input("Contact Normals", this.m_settings.drawContactNormals, (value: boolean): void => {
              this.m_settings.drawContactNormals = value;
            });
            this.connect_checkbox_input("Contact Impulses", this.m_settings.drawContactImpulse, (value: boolean): void => {
              this.m_settings.drawContactImpulse = value;
            });
            this.connect_checkbox_input("Friction Impulses", this.m_settings.drawFrictionImpulse, (value: boolean): void => {
              this.m_settings.drawFrictionImpulse = value;
            });
            this.connect_checkbox_input("Center of Masses", this.m_settings.drawCOMs, (value: boolean): void => {
              this.m_settings.drawCOMs = value;
            });
            this.connect_checkbox_input("Statistics", this.m_settings.drawStats, (value: boolean): void => {
              this.m_settings.drawStats = value;
            });
            this.connect_checkbox_input("Profile", this.m_settings.drawProfile, (value: boolean): void => {
              this.m_settings.drawProfile = value;
            });


            this.connect_button_input("Pause (P)", (e: ClickEvent
            ): void => {
              this.app.Pause();
            });
            this.connect_button_input("Single Step (O)", (e: ClickEvent
            ): void => {
              this.app.SingleStep();
            });
            this.connect_button_input("Restart (R)", (e: ClickEvent
            ): void => {
              this.app.LoadTest();
            });
            this.connect_button_input("Demo", (e: ClickEvent
            ): void => {
              this.app.ToggleDemo();
            });
          }
          .width('100%')
        }

      }.zIndex(this.controlZindex)
      .visibility(this.visibile)

      Flex() {
        Canvas(this.context)
          .width('100%')
          .height('100%')
          .backgroundColor('#ffff00')
          .onReady(() => {
            this.isLoad = true
          })
      }
      .width('100%')
      .height('100%')
      .position({ x: 0, y: 0 })
      .zIndex(this.canvasZindex)
      .onClick((event: ClickEvent) => {

      })
      .onHover((isHover: boolean) => {

      })
      .onMouse((e: MouseEvent) => {
        switch (e.action) {
          case MouseAction.Press:
            this.app.HandleMouseDown(e);
            break;
          case MouseAction.Release:
            this.app.HandleMouseUp(e);
            break;
          case MouseAction.Move:
            this.app.HandleMouseMove(e);
            break;
          case MouseAction.Hover:
            this.app.HandleMouseWheel(e)
            break;
        }
      })
      .onTouch((e: TouchEvent) => {
        switch (e.type) {
          case TouchType.Down:
            this.app.HandleTouchStart(e);
            break;
          case TouchType.Up:
            this.app.HandleTouchEnd(e);
            break;
          case TouchType.Move:
            this.app.HandleTouchMove(e);
            break;
          case TouchType.Cancel:
            break;
        }
      })

      Flex() {
        Button('图层切换')
          .fontColor(Color.White)
          .margin({ left: '10', top: '10' })
          .padding({ left: 20, right: 20, bottom: 10, top: 10 })
          .fontSize(this.commonFontSize)
          .onClick((event: ClickEvent) => {
            this.zindexRevers = !this.zindexRevers;
            if (!this.zindexRevers) {
              this.controlZindex = 99;
              this.canvasZindex = 1;
              this.visibile = Visibility.Visible;
            } else {
              this.controlZindex = 1;
              this.canvasZindex = 99;
              this.visibile = Visibility.None;
            }

          });
      }.width("30%")
      .position({ x: -10, y: 70 })
      .zIndex(999)

    }.onKeyEvent((e: KeyEvent) => {
      switch (e.type) {
        case KeyType.Down:
          this.app.HandleKeyDown(e);
          break;
        case KeyType.Up:
          this.app.HandleKeyUp(e);
          break;
      }
    })

  }

  @Builder
  connect_number_input(label: string, init: number, update: (value: number) => void, min: number, max: number, step: number) {
    Flex() {
      Text(label)
        .textAlign(TextAlign.Center)
        .fontColor(this.fontColor)
        .margin({ left: '20' })
        .fontSize(this.commonFontSize);

      TextInput({
        text: init + ''
      })
        .width('30%')
        .margin({ left: '20' })
        .textAlign(TextAlign.Start)
        .fontColor(this.fontColor)
        .fontSize(this.commonFontSize)
        .onChange((value: string) => {
          update(Number.parseInt(value, 10));
        });
    }
  }

  @Builder
  connect_checkbox_input(label: string, init: boolean, update: (value: boolean) => void) {
    Flex() {
      Checkbox({ name: 'checkbox1', group: 'checkboxGroup' })
        .select(init)
        .selectedColor(0xed6f21)
        .onChange((value: boolean) => {
          update(value);
        })
      Text(label)
        .textAlign(TextAlign.Center)
        .fontColor(this.fontColor)
        .margin({ left: '10' })
        .fontSize(this.commonFontSize);
    }
  }

  @Builder
  connect_button_input(label: string, callback: (e: ClickEvent
  ) => void) {
    Flex() {
      Button(label)
        .fontColor(Color.White)
        .margin({ left: '10', top: '10' })
        .padding({ left: 20, right: 20, bottom: 10, top: 10 })
        .fontSize(this.commonFontSize)
        .onClick((event: ClickEvent) => {
          callback(event);
        });
    }
  }
}



