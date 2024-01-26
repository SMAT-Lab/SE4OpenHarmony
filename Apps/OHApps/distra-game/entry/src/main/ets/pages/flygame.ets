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

import { hero, enemy, hullet, cBossenemy, enemya } from "../object/hero"
import promptAction from '@ohos.promptAction'
import { g_object, activeapp, get_device } from "../pages/founction"
import { RankTable, Ranking } from '../common/relationlStore'

let imgName = ['background.png', 'game_pause_nor.png', 'm1.png', 'start.png',
  // 敌机1
  ['enemy1.png', 'enemy1_down1.png', 'enemy1_down2.png', 'enemy1_down3.png', 'enemy1_down4.png'],
  // 敌机2
  ['enemy2.png', 'enemy2_down1.png', 'enemy2_down2.png', 'enemy2_down3.png', 'enemy2_down4.png'],
  // 敌机3
  ['enemy3_n1.png', 'enemy3_n2.png', 'enemy3_hit.png', 'enemy3_down1.png', 'enemy3_down2.png', 'enemy3_down3.png', 'enemy3_down4.png', 'enemy3_down5.png', 'enemy3_down6.png',],
  // 游戏loading图
  ['game_loading1.png', 'game_loading2.png', 'game_loading3.png', 'game_loading4.png'],
  // 玩家飞机图
  ['hero1.png', 'hero2.png', 'hero_blowup_n1.png', 'hero_blowup_n2.png', 'hero_blowup_n3.png', 'hero_blowup_n4.png'],

  ['icon_000.png'], 'm.png', '排行.png'
];

let curPhase = 2;
const TAG = "flygame"
const PHASE_DOWNLOAD = 1;
const PHASE_READY = 2;
const PHASE_LOADING = 3;
const PHASE_PLAY = 4;
const PHASE_PAUSE = 5;
const PHASE_GAMEOVER = 6;
const csreen_width = 800;
const csreen_height = 400;

let generate = 0
let generateBig = 0
let index = 0
let hullet1: Array<hullet> = []
let hullete: Array<hullet> = []
let enemy1: Array<enemy> = []
let enemy2: Array<enemya> = []
let enemyBoss: Array<cBossenemy> = []
let hero1 = new hero
let settings: RenderingContextSettings = new RenderingContextSettings(true)
let context: CanvasRenderingContext2D = new CanvasRenderingContext2D(settings)
let offContext: OffscreenCanvasRenderingContext2D = new OffscreenCanvasRenderingContext2D(csreen_width, csreen_height, settings)
let score = 0
let count: number = 9
let hCout: number = 0
let mCout: number = 0
let qcout: number = 0
let mode: number = 0
let table: Array<Ranking> = []
let stringTable: Array<string> = []
let RankTable1 = new RankTable
// 设置随机数种子
let seed = 123; // 可以用任意数字来作为种子

function seededRandom(seed, min, max) {
  let x = Math.sin(seed) * 10000;
  const result = min + (x - Math.floor(x)) * (max - min);
  return Math.floor(result);
}

function nIgm(scr) {
  let img = new ImageBitmap("/ytracom/" + scr)
  return img
}

function distr_link() {
  offContext.drawImage(nIgm('icon_000.png'), 0, 0)
}

function gameloading() {
  index % 1 == 0 && offContext.drawImage(nIgm(imgName[7][index]), 800 - 400, 80)
  index += 0.25
  if (index > 3) {
    curPhase = PHASE_PLAY;
    index = 0
  }
}

function paintLogo() {
  offContext.drawImage(nIgm(imgName[3]), 0, 0, csreen_width, csreen_height, 0, 0, csreen_width, csreen_height)
}

function drawGameOver() {
  promptAction.showToast({
    message: '游戏结束\n得分：' + score,
    duration: 2000
  });
  curPhase = PHASE_READY
  hero1.x = 676
  hero1.y = 142
  RankTable1.insertData("Handsome", score)
  score = 0
  hero1.index = 0
  hullet1 = []
  enemy1 = []
  enemy2 = []
  if (globalThis.remote == 1) {
    globalThis.remoteObject.hero = hero1
    globalThis.remoteObject.status = PHASE_READY
  } else {
    // g_object.hero = hero1
    g_object.status = PHASE_READY
  }
  seed = 123
}

function drawPause() {
  offContext.drawImage(nIgm(imgName[1]), 0, 0)
}

function drawhero() {
  let i = 0
  if (hero1.life > 0) {
    offContext.drawImage(nIgm(imgName[8][hero1.index]), hero1.x, hero1.y)
    mCout++
    if (mCout % 200 == 0) {
      enemyBoss.push(new cBossenemy(seededRandom(seed++, 20, 340)))
      mCout = 0
    }
    count++
    if (count % 3 == 0) {
      hullet1.push(new hullet(hero1.x, hero1.y, 1))
      hullet1.push(new hullet(hero1.x, hero1.y, 2))
      hullet1.push(new hullet(hero1.x, hero1.y, 3))
      count = 0
    }
    hCout++
    if (globalThis.remote == 1) {
      if (globalThis.remoteObject.mode == 1) {
        if (hCout % 6 == 0) {
          enemy1.push(new enemy(seededRandom(seed++, 20, 340)))
        }
      } else if (globalThis.remoteObject.generate == 1) {
        enemy1.push(new enemy(seededRandom(seed++, 20, 340)))
        globalThis.remoteObject.generate = 0
      }
    } else if (mode == 1) {
      if (hCout % 6 == 0) {
        enemy1.push(new enemy(seededRandom(seed++, 20, 340)))
      }
    } else if (generate == 1) {
      enemy1.push(new enemy(seededRandom(seed++, 20, 340)))
      generate = 0
    }

    if (globalThis.remote == 1) {
      if (globalThis.remoteObject.mode == 1) {
        if (hCout % 6 == 0) {
          enemy2.push(new enemy(seededRandom(seed++, 20, 340)))
        }
      } else if (globalThis.remoteObject.generateBig == 1) {
        enemy2.push(new enemya(seededRandom(seed++, 20, 340)))
        globalThis.remoteObject.generateBig = 0
      }
    } else if (mode == 1) {
      if (hCout % 6 == 0) {
        enemy2.push(new enemy(seededRandom(seed++, 20, 340)))
      }
    } else if (generateBig == 1) {
      enemy2.push(new enemya(seededRandom(seed++, 20, 340)))
      generateBig = 0
    }

  } else {
    curPhase = PHASE_GAMEOVER
    return
  }
  for (i = 0; i < enemy1.length; i++) {
    let e = enemy1[i]
    if (e.x + e.width >= hero1.x && hero1.x + hero1.width >= e.x && e.y + e.height >= hero1.y && hero1.y + hero1.height >= e.y) {

      e.life -= 1
      enemy1[i].index += 1
      hero1.index += 1
      hero1.life -= 1
      if (hero1.life < 0) {
        hero1.life = 0
      }
      if (e.life < 0) {
        e.life = 0
      }
      if (enemy1[i].index == 4) {
        enemy1[i].index == 0
      }
      if (hero1.index == 4) {
        hero1.index = 0
      }
    }
  }
  for (i = 0; i < enemy2.length; i++) {
    let e = enemy2[i]
    if (e.x + e.width >= hero1.x && hero1.x + hero1.width >= e.x && e.y + e.height >= hero1.y && hero1.y + hero1.height >= e.y) {

      e.life -= 1
      enemy2[i].index += 1
      hero1.index += 1
      hero1.life -= 1
      if (hero1.life < 0) {
        hero1.life = 0
      }
      if (e.life < 0) {
        e.life = 0
      }
      if (enemy2[i].index == 4) {
        enemy2[i].index == 0
      }
      if (hero1.index == 4) {
        hero1.index = 0
      }
    }
  }
}

function drawenemy1() {
  let i = 0
  let j = 0
  for (i; i < enemy1.length; i++) {
    enemy1[i].x += 6

    if (enemy1[i].x < 0 || enemy1[i].x > 800 || enemy1[i].y < 0 || enemy1[i].y > 480) {
      enemy1[i].life = 0
    }
    if (enemy1[i].life == 0) {
      score += 1
      enemy1.splice(i, 1)
    }
  }
  for (i = 0; i < enemy1.length; i++) {
    offContext.drawImage(nIgm(imgName[4][enemy1[i].index]), enemy1[i].x, enemy1[i].y)
  }
  for (i = 0; i < enemy1.length; i++) {
    for (j = 0; j < hullet1.length; j++) {
      let h = hullet1[j]
      let e = enemy1[i]
      if (e.x + e.width >= h.x && h.x + h.width >= e.x && e.y + e.height >= h.y && h.y + h.height >= e.y) {
        e.life -= 1
        enemy1[i].index += 1
        if (e.life < 0) {
          e.life = 0
        }
        if (enemy1[i].index == 4) {
          enemy1[i].index == 0
        }
      }
    }
  }
}

function drawenemy2() {
  let i = 0
  let j = 0
  for (i; i < enemy2.length; i++) {
    enemy2[i].x += 8

    if (enemy2[i].x < 0 || enemy2[i].x > 800 || enemy2[i].y < 0 || enemy2[i].y > 480) {
      enemy2[i].life = 0
    }
    if (enemy2[i].life == 0) {
      score += 1
      enemy2.splice(i, 1)
    }
  }
  for (i = 0; i < enemy2.length; i++) {
    offContext.drawImage(nIgm(imgName[5][enemy2[i].index]), enemy2[i].x, enemy2[i].y)
  }
  for (i = 0; i < enemy2.length; i++) {
    for (j = 0; j < hullet1.length; j++) {
      let h = hullet1[j]
      let e = enemy2[i]
      if (e.x + e.width >= h.x && h.x + h.width >= e.x && e.y + e.height >= h.y && h.y + h.height >= e.y) {
        e.life -= 1
        qcout++
        if (qcout % 2 == 0) {
          enemy2[i].index += 1
        }
        if (e.life < 0) {
          e.life = 0
        }
        if (enemy2[i].index == 4) {
          enemy2[i].index == 0
        }
      }
    }
  }
}

function drawenemyBoss() {
  let i = 0
  let j = 0
  for (i; i < enemyBoss.length; i++) {
    qcout++
    if (qcout % 3 == 0) {
      hullete.push(new hullet(enemyBoss[i].x, enemyBoss[i].y, 1))
      hullete.push(new hullet(enemyBoss[i].x, enemyBoss[i].y, 2))
      hullete.push(new hullet(enemyBoss[i].x, enemyBoss[i].y, 3))
      qcout = 0
    }
    if (enemyBoss[i].x < 0 || enemyBoss[i].x > 800 || enemyBoss[i].y < 0 || enemyBoss[i].y > 480) {
      enemyBoss[i].life = 0
    }
    if (enemyBoss[i].life == 0) {
      score += 1
      enemyBoss.splice(i, 1)
    }
  }
  for (i = 0; i < enemyBoss.length; i++) {
    offContext.drawImage(nIgm(imgName[6][enemyBoss[i].index]), enemyBoss[i].x, enemyBoss[i].y)
  }
  for (i = 0; i < enemyBoss.length; i++) {
    for (j = 0; j < hullet1.length; j++) {
      let h = hullet1[j]
      let e = enemyBoss[i]
      if (e.x + e.width >= h.x && h.x + h.width >= e.x && e.y + e.height >= h.y && h.y + h.height >= e.y) {
        e.life -= 1
        console.info(TAG + e.life)
        enemyBoss[i].index += 1
        if (e.life < 0) {
          e.life = 0
        }
        if (enemyBoss[i].index == 8) {
          enemyBoss[i].index = 0
        }
      }
    }
  }
}

function drawhullet1() {
  let i = 0
  for (i; i < hullet1.length; i++) {
    switch (hullet1[i].n) {
      case 1:
        hullet1[i].y -= 1
        hullet1[i].x -= 40
        break
      case 2:
        hullet1[i].y += 1
        hullet1[i].x -= 40
        break
      case 3:
        hullet1[i].x -= 40
        break
      default:
        console.log("invalid n")
        break
    }
    if (hullet1[i].x < 0 || hullet1[i].x >= 800 || hullet1[i].y < 0 || hullet1[i].y >= 480) {
      hullet1[i].removable = 1
    }
    if (hullet1[i].removable == 1) {
      hullet1.splice(i, 1)
    }
  }
  for (i = 0; i < hullet1.length; i++) {
    offContext.drawImage(nIgm(imgName[2]), hullet1[i].x, hullet1[i].y)
  }
}

function drawhullete() {
  let i = 0
  for (i; i < hullete.length; i++) {
    switch (hullete[i].n) {
      case 1:
        hullete[i].y -= 1
        hullete[i].x += 40
        break
      case 2:
        hullete[i].y += 1
        hullete[i].x += 40
        break
      case 3:
        hullete[i].x += 40
        break
      default:
        console.log("invalid n")
        break
    }
    if (hullete[i].x < 0 || hullete[i].x >= 800 || hullete[i].y < 0 || hullete[i].y >= 480) {
      hullete[i].removable = 1
    }
    if (hullete[i].removable == 1) {
      hullet1.splice(i, 1)
    }
  }
  for (i = 0; i < hullete.length; i++) {
    offContext.drawImage(nIgm(imgName[10]), hullete[i].x, hullete[i].y)
  }
}

function drawsocre() {
  if (globalThis.remote == 1) {
    offContext.strokeText('分数：' + score, 350, 20)
  } else {
    if (mode == 1) {
      offContext.strokeText('分数：' + score, 350, 20)
    } else {
      offContext.strokeText('点击派遣飞机=>', 350, 20)
    }
  }

}

function getrank(callback) {
  let i = 0
  RankTable1.queryAll((result) => {
    console.info(TAG + "ranking list" + JSON.stringify(result))
    table = result
    table.sort((a, b) => b.score - a.score)
    console.info(TAG + "sort ranking list" + JSON.stringify(result))
    if (table != undefined) {
      if (table.length < 10) {
        for (i = 0; i < table.length; i++) {
          console.info(TAG + "   " + i + "   " + table.length)
          stringTable.push("第" + (i + 1) + "名" + table[i].name + "    得分" + table[i].score)
        }
      } else {
        console.info(TAG + "大于10" + "  " + table.length)
        for (i = 0; i < 10; i++) {
          stringTable.push("第" + (i + 1) + "名" + table[i].name + "    得分" + table[i].score)
        }
      }
    }
    callback();
  })
}

@Component
export struct PlaneGame {
  @State score: number = 0
  @State select: number = 0
  @State x: number = 676
  @State y: number = 142
  private select1
  private device: string[] = ['本机器']

  build() {
    Column() {
      Stack({ alignContent: Alignment.TopEnd }) {
        Canvas(context)
          .backgroundImage('/ytracom/background.png')
          .onReady(() => {
            RankTable1.getStore()
            console.info(TAG + "refresh the page")
            setInterval(() => {
              // 每次刷新画布数据时同步两边的状态，当一方进入了加载状态时，另一方跟着进入
              if (globalThis.remote == 1 && curPhase == 2 && curPhase != globalThis.remoteObject.status) {
                offContext.clearRect(0, 0, csreen_width - 5, csreen_height - 5)
                curPhase = globalThis.remoteObject.status
              } else if (curPhase == 2 && curPhase != g_object.status) {
                offContext.clearRect(0, 0, csreen_width - 5, csreen_height - 5)
                curPhase = g_object.status
              }
              // 通过变量curPhase来判断当前的游戏转态
              switch (curPhase) {
                case PHASE_READY:
                  offContext.clearRect(0, 0, csreen_width - 5, csreen_height - 5)
                  offContext.drawImage(nIgm(imgName[11]), 5, 290)
                  if (globalThis.remote == 1) {
                    paintLogo()
                  } else {
                    paintLogo()
                    distr_link()
                  }
                  break
                case PHASE_LOADING:
                  gameloading()
                  hero1.life = 6
                  break
                case PHASE_PLAY:
                  if (globalThis.remote == 1) {
                    if (globalThis.remoteObject.mode == 1) {

                      hero1 = globalThis.remoteObject.hero
                    }
                  } else {
                    hero1 = g_object.hero
                  }
                  offContext.clearRect(0, 0, csreen_width - 1, csreen_height - 1)
                  if (globalThis.remote != 1 && mode != 1) {
                    offContext.drawImage(nIgm(imgName[4][0]), 500, 0)
                    offContext.drawImage(nIgm(imgName[5][0]), 600, 0)
                  }
                  drawsocre()
                  drawenemy1()
                  drawenemy2()
                  drawhullet1()
                  drawhero()
                  break
                case PHASE_PAUSE:
                  drawPause()
                  break
                case PHASE_GAMEOVER:
                  if (globalThis.remote != 1) {
                    g_object.mode = 0
                  }
                  mode = 0
                  drawGameOver()
                  break
              }
              let image = offContext.transferToImageBitmap();
              context.transferFromImageBitmap(image);
              this.score = score
            }, 100)
            // 每隔500ms提交一次数据，当我把提交数据写入上面的100ms一次刷新时，会导致分布式对象有数据丢失现象，导致游戏很卡
            setInterval(() => {
              if (globalThis.remote == 1) {
                globalThis.remoteObject.hero = hero1
              } else {
                if (mode == 1) {
                  g_object.hero = hero1
                }

              }
            }, 500)
          })
          .onTouch((event) => {

            if (curPhase == PHASE_PLAY) {
              console.info(TAG + event.touches[0].x + "  " + event.touches[0].y)
              // 判断触摸是否在飞机附近，只有在飞机附件的触摸是有效触摸
              if (event.touches[0].x > hero1.x && event.touches[0].x < hero1.x + 200 && event.touches[0].y > hero1.y - 20 && event.touches[0].y < hero1.y + 150) {
                hero1.x = event.touches[0].x - 124
                hero1.y = event.touches[0].y - 50
              }
              // globalThis.remote表示拉起被控时拉起的对象存在，用于判断当前的触控后通过哪个对象更新hero数据
              if (globalThis.remote == 1) {
                globalThis.remoteObject.hero = hero1
              } else {
                // 只有模式为同步模式，才在控制端更新hero值
                if (mode == 1) {
                  g_object.hero = hero1
                }
              }
            }
          })
          .onClick((event) => {
            // 在对战模式下点击飞机图案生成飞机
            if (curPhase == PHASE_PLAY && event.x > 500 && event.y > 0 && event.x < 550 && event.y < 60 && globalThis.remote != 1) {
              g_object.generate = 1
              generate = 1
            }

            if (curPhase == PHASE_PLAY && event.x > 600 && event.y > 0 && event.x < 700 && event.y < 100 && globalThis.remote != 1) {
              g_object.generateBig = 1
              generateBig = 1
            }
            // 在准备阶段点击非标志区域则弹出游戏模式选择
            if (curPhase == 2 && event.x > 96 && event.y > 96 && globalThis.remote != 1) {
              TextPickerDialog.show({
                range: ["同步模式", "对抗模式"],
                selected: this.select1,
                onAccept: (value: TextPickerResult) => {
                  console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
                  this.select1 = value.index
                  if (this.select1 == 0) {
                    mode = 1
                    g_object.mode = 1
                    offContext.clearRect(0, 0, csreen_width - 1, csreen_height - 1)
                    if (globalThis.remote == 1) {
                      globalThis.remoteObject.status = PHASE_LOADING
                    } else {
                      g_object.status = PHASE_LOADING
                    }
                    curPhase = PHASE_LOADING
                  } else {
                    offContext.clearRect(0, 0, csreen_width - 1, csreen_height - 1)
                    if (globalThis.remote == 1) {
                      globalThis.remoteObject.status = PHASE_LOADING
                    } else {
                      g_object.status = PHASE_LOADING
                    }
                    curPhase = PHASE_LOADING

                  }
                },
                onCancel: () => {
                  console.info("TextPickerDialog:onCancel()")
                },
                onChange: (value: TextPickerResult) => {
                  console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
                }
              })
            }
            // 在准备阶段点击排行榜标志则弹出排行榜
            if (event.x < 70 && event.y > 290 && event.y < 350 && curPhase == 2) {
              getrank(() => {
                TextPickerDialog.show({
                  range: stringTable,
                  selected: this.select,
                  onAccept: (value: TextPickerResult) => {
                    stringTable = []
                    // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                    console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
                  },
                  onCancel: () => {
                    stringTable = []
                    console.info("TextPickerDialog:onCancel()")
                  },
                  onChange: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
                  }
                })
              })
            }
            // 在准备阶段按到连接标志则弹出连接框
            if (event.x < 96 && event.y < 96 && curPhase == 2 && globalThis.remote != 1) {
              let deviceList = get_device()
              if (deviceList != undefined) {
                console.info("deviceList" + JSON.stringify(deviceList))
                if (deviceList[0] != undefined) {
                  this.device.push(deviceList[0].deviceName)
                }
              }
              TextPickerDialog.show({
                range: this.device,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                  if (deviceList != undefined) {
                    let Coordinate
                    if (deviceList[0].deviceId != null) {
                      Coordinate = activeapp(deviceList[0].deviceId)
                      this.x = Coordinate[0]
                      this.y = Coordinate[1]
                    }
                  }
                  this.select = value.index
                  console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
                },
                onCancel: () => {
                  console.info("TextPickerDialog:onCancel()")
                },
                onChange: (value: TextPickerResult) => {
                  console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
                }
              })
              this.device = ["本机器"]
            }
          })
        // 画布使用onKeyEvent时无法得到响应，通过弹性布局加入不占空间的按键实现监测键盘输入
        Button()
          // .borderColor(Color.Black)
          .onKeyEvent((event: KeyEvent) => {
            let space = 20
            if (event.type === KeyType.Down) {
              // 判断键盘输入是否为方向键位，是则进行相应的位移
              if (event.keyCode == 2012) {
                hero1.x -= space
              }
              if (event.keyCode == 2013) {
                hero1.x += space
              }
              if (event.keyCode == 2014) {
                hero1.y += space
              }
              if (event.keyCode == 2015) {
                hero1.y -= space
              }
              //给飞机设置边界不能飞出屏幕
              if (hero1.x > 676) {
                hero1.x = 676
              }
              if (hero1.x < 0) {
                hero1.x = 0
              }
              if (hero1.y < 0) {
                hero1.y = 0
              }
              if (hero1.y > 292) {
                hero1.y = 292
              }
            }
          })
      }
    }
  }
}