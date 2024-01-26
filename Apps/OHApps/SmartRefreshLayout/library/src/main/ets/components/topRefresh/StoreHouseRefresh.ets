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
import SmartRefreshForStoreHouseSample from "./SmartRefreshForStoreHouseSample"

@Component
export struct StoreHouse {
  @Link model: SmartRefreshForStoreHouseSample.Model;
  @State storeHouseModel: StoreHouseClassModel.StoreHouseModel = new StoreHouseClassModel.StoreHouseModel();
  @State refresh: boolean  = false;
  @State whiteIndex: number = -4;
  private status = SmartRefreshForStoreHouseSample.REFRESHSTATE.NONE;
  private beforeDemand:string = "E"
  private beforeColor:string = "#000000";
  @State whiteIndexCommandStr:string = "M24.5 1 L1 1";
  @State whiteIndexCommandStrOne:string = "M24.5 1 L1 1";
  @State whiteIndexCommandStrTwo:string = "M24.5 1 L1 1";
  @State whiteIndexCommandStrThree:string = "M24.5 1 L1 1";

  aboutToAppear() {
    this.storeHouseModel.change();
    this.model.setRefreshHeaderCallback(():void => this.setRefreshInterval());
    if(this.model.initRefreshing) {
      this.model.refreshHeaderCallback()
      this.model.initRefreshing = false
    }
  }

  init() {
    if(this.beforeColor != this.model.getColor()) {
      this.storeHouseModel.setColor(this.model.getColor())
    }
    if(this.beforeDemand != this.model.getDemand()) {
      if (this.model.getDemand() == "显示中文") {
        this.storeHouseModel.setDemand("C")
        this.storeHouseModel.setMargin(25)
        this.storeHouseModel.setScale(4)
        this.storeHouseModel.change()
      } else if (this.model.getDemand() == "显示英文") {
        this.storeHouseModel.setDemand("E")
        this.storeHouseModel.setEnglish("StoreHouse")
        this.storeHouseModel.setMargin(35)
        this.storeHouseModel.setScale(1.5)
        this.storeHouseModel.change()
      } else if (this.model.getDemand() == "显示图标") {
        this.storeHouseModel.setDemand("I")
        this.storeHouseModel.setMargin(15)
        this.storeHouseModel.setScale(7)
        this.storeHouseModel.change()
      } else if (this.model.getDemand() == "显示商标") {
        this.storeHouseModel.setDemand("T")
        this.storeHouseModel.setMargin(33)
        this.storeHouseModel.setScale(4)
        this.storeHouseModel.change()
      } else if (this.model.getDemand() == "显示数字") {
        this.storeHouseModel.setDemand("N")
        this.storeHouseModel.setNumber(3.1415926)
        this.storeHouseModel.setMargin(33)
        this.storeHouseModel.setScale(1.5)
        this.storeHouseModel.change()
      }
    }
  }

  setRefreshInterval() {
    this.model.headerRefreshId = setInterval(() => {
      if (this.status == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH || this.whiteIndex > this.storeHouseModel.Arr.length) {
        this.whiteIndex = -4;
      }
      this.whiteIndex++;
      this.whiteIndexCommandStr = this.storeHouseModel.Arr[this.whiteIndex]
      this.whiteIndexCommandStrOne = this.storeHouseModel.Arr[this.whiteIndex + 1]
      this.whiteIndexCommandStrTwo = this.storeHouseModel.Arr[this.whiteIndex + 2]
      this.whiteIndexCommandStrThree = this.storeHouseModel.Arr[this.whiteIndex + 3]
      console.info("StoreHouse =======" + this.whiteIndex + "===this.whiteIndexCommandStr===" + this.whiteIndexCommandStr)
      this.refresh = !this.refresh;
      this.status = this.model.refreshState;
      this.init()
    }, 50);
  }

  @Builder buildWhitePath(commandStr:string) {
    Path()
      .commands(commandStr)
      .stroke(Color.White)
      .strokeWidth(3)
  }

  build() {
    Flex({ justifyContent: FlexAlign.Center }) {
      if (this.refresh) {
        Text("0").visibility(Visibility.None)
      } else {
        Text("1").visibility(Visibility.None)
      }
      Row() {
        if (this.model.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
          Stack({ alignContent: Alignment.TopStart }) {
            ForEach(this.storeHouseModel.Arr, (item:string) => {
              Path()
                .commands(item)
                .stroke(this.model.textColor)
                .strokeWidth(3)
            }, (item:string) => item)
            Path()
              .commands(this.whiteIndexCommandStr)
              .stroke(Color.White)
              .strokeWidth(3)
            Path()
              .commands(this.whiteIndexCommandStrOne)
              .stroke(Color.White)
              .strokeWidth(3)
            Path()
              .commands(this.whiteIndexCommandStrTwo)
              .stroke(Color.White)
              .strokeWidth(3)
            Path()
              .commands(this.whiteIndexCommandStrThree)
              .stroke(Color.White)
              .strokeWidth(3)
          }
        } else if (this.model.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
          Stack({ alignContent: Alignment.TopStart }) {
            ForEach(this.storeHouseModel.ArrNumber, (item:number) => {
              Path()
                .commands(this.storeHouseModel.Arr[item])
                .stroke(Color.Grey)
                .strokeWidth(3)
                .rotate({
                  x: 0,
                  y: 0,
                  z: 1,
                  angle: -220 + this.model.getOffset() * 200 + (80 - (1.5 * item)) >= 0 ? 0 : -220 + this.model.getOffset() * 200 + (80 - (1.5 * item)),
                  centerX: '10%',
                  centerY: '10%',
                })
                .translate({
                  x: 0,
                  y: -320 + this.model.getOffset() * 400 + (80 - (4 * item)) >= 0 ? 0 : -320 + this.model.getOffset() * 400 + (80 - (4 * item))
                })
            }, (item:number) => item.toString())
          }
        }
      }.margin({ top: this.storeHouseModel.margin })
    }
    .height('100%')
    .width('100%')
    .backgroundColor(this.storeHouseModel.color)
  }
}

namespace StoreHouseClassModel {
  export class StoreHouseModel {
    sourceArrays: Array<Array<number>> = [
      [
        // A
        24, 0, 1, 22,
        1, 22, 1, 72,
        24, 0, 47, 22,
        47, 22, 47, 72,
        1, 48, 47, 48
      ],

      [
        // B
        0, 0, 0, 72,
        0, 0, 37, 0,
        37, 0, 47, 11,
        47, 11, 47, 26,
        47, 26, 38, 36,
        38, 36, 0, 36,
        38, 36, 47, 46,
        47, 46, 47, 61,
        47, 61, 38, 71,
        37, 72, 0, 72,
      ],

      [
        // C
        47, 0, 0, 0,
        0, 0, 0, 72,
        0, 72, 47, 72,
      ],

      [
        // D
        0, 0, 0, 72,
        0, 0, 24, 0,
        24, 0, 47, 22,
        47, 22, 47, 48,
        47, 48, 23, 72,
        23, 72, 0, 72,
      ],

      [
        // E
        0, 0, 0, 72,
        0, 0, 47, 0,
        0, 36, 37, 36,
        0, 72, 47, 72,
      ],

      [
        // F
        0, 0, 0, 72,
        0, 0, 47, 0,
        0, 36, 37, 36,
      ],

      [
        // G
        47, 23, 47, 0,
        47, 0, 0, 0,
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 48,
        47, 48, 24, 48,
      ],

      [
        // H
        0, 0, 0, 72,
        0, 36, 47, 36,
        47, 0, 47, 72,
      ],

      [
        // I
        0, 0, 47, 0,
        24, 0, 24, 72,
        0, 72, 47, 72,

      ],

      [
        // J
        47, 0, 47, 72,
        47, 72, 24, 72,
        24, 72, 0, 48,
      ],

      [
        // K
        0, 0, 0, 72,
        47, 0, 3, 33,
        3, 38, 47, 72,
      ],

      [
        // L
        0, 0, 0, 72,
        0, 72, 47, 72,
      ],

      [
        // M
        0, 0, 0, 72,
        0, 0, 24, 23,
        24, 23, 47, 0,
        47, 0, 47, 72,
      ],

      [
        // N
        0, 0, 0, 72,
        0, 0, 47, 72,
        47, 72, 47, 0,
      ],

      [
        // O
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 0,
        47, 0, 0, 0,
      ],

      [
        // P
        0, 0, 0, 72,
        0, 0, 47, 0,
        47, 0, 47, 36,
        47, 36, 0, 36,
      ],

      [
        // Q
        0, 0, 0, 72,
        0, 72, 23, 72,
        23, 72, 47, 48,
        47, 48, 47, 0,
        47, 0, 0, 0,
        24, 28, 47, 71,
      ],

      [
        // R
        0, 0, 0, 72,
        0, 0, 47, 0,
        47, 0, 47, 36,
        47, 36, 0, 36,
        0, 37, 47, 72,
      ],

      [
        // S
        47, 0, 0, 0,
        0, 0, 0, 36,
        0, 36, 47, 36,
        47, 36, 47, 72,
        47, 72, 0, 72,
      ],

      [
        // T
        0, 0, 47, 0,
        24, 0, 24, 72,
      ],

      [
        // U
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 0,
      ],

      [
        // V
        0, 0, 24, 72,
        24, 72, 47, 0,
      ],

      [
        // W
        0, 0, 0, 72,
        0, 72, 24, 49,
        24, 49, 47, 72,
        47, 72, 47, 0
      ],

      [
        // X
        0, 0, 47, 72,
        47, 0, 0, 72
      ],

      [
        // Y
        0, 0, 24, 23,
        47, 0, 24, 23,
        24, 23, 24, 72
      ],

      [
        // Z
        0, 0, 47, 0,
        47, 0, 0, 72,
        0, 72, 47, 72
      ],

      [
        // 0
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 0,
        47, 0, 0, 0,
      ],

      [
        // 1
        24, 0, 24, 72,
      ],

      [
        // 2
        0, 0, 47, 0,
        47, 0, 47, 36,
        47, 36, 0, 36,
        0, 36, 0, 72,
        0, 72, 47, 72
      ],

      [
        // 3
        0, 0, 47, 0,
        47, 0, 47, 36,
        47, 36, 0, 36,
        47, 36, 47, 72,
        47, 72, 0, 72,
      ],

      [
        // 4
        0, 0, 0, 36,
        0, 36, 47, 36,
        47, 0, 47, 72,
      ],

      [
        // 5
        0, 0, 0, 36,
        0, 36, 47, 36,
        47, 36, 47, 72,
        47, 72, 0, 72,
        0, 0, 47, 0
      ],

      [
        // 6
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 36,
        47, 36, 0, 36
      ],

      [
        // 7
        0, 0, 47, 0,
        47, 0, 47, 72
      ],

      [
        // 8
        0, 0, 0, 72,
        0, 72, 47, 72,
        47, 72, 47, 0,
        47, 0, 0, 0,
        0, 36, 47, 36
      ],

      [
        // 9
        47, 0, 0, 0,
        0, 0, 0, 36,
        0, 36, 47, 36,
        47, 0, 47, 72,
      ],

      [
        //blank
      ],

      [
        //-
        0, 36, 47, 36
      ],

      [
        //.
        24, 60, 24, 72
      ]
    ];
    Trademark: Array<number> = [
      22, 0, 0, 30,
      22, 0, 30, 0,
      30, 0, 52, 30,
      0, 30, 26, 30,
      60, 0, 60, 15,
      60, 15, 60, 30,
      60, 15, 85, 15,
      85, 15, 108, 0,
      85, 15, 108, 30,
      117, 0, 147, 0,
      147, 0, 177, 0,
      147, 0, 147, 32,
      198, 0, 176, 30,
      198, 0, 206, 0,
      206, 0, 228, 30,
      176, 30, 202, 30,
    ]
    Chinese: Array<number> = [
      0, 17, 30, 17,
      30, 17, 30, 47,
      25, 40, 30, 47,
      15, 2, 10, 47,
      35, 17, 35, 44,
      35, 17, 62, 17,
      62, 17, 62, 44,
      35, 44, 62, 44,
      80, 7, 100, 7,
      73, 17, 120, 17,
      90, 0, 90, 17,
      75, 24, 100, 24,
      90, 17, 75, 37,
      75, 37, 105, 35,
      90, 27, 90, 57,
      75, 47, 105, 45,
      105, 2, 120, 57,
      117, 4, 123, 12,
      123, 40, 105, 54,
      135, 17, 140, 32,
      135, 17, 185, 17,
      185, 17, 180, 32,
      140, 32, 180, 32,
      160, 0, 160, 57
    ]
    Icon: Array<number> = [
      0, 35, 12, 42,
      12, 42, 24, 35,
      24, 35, 12, 28,
      0, 35, 12, 28,
      0, 21, 12, 28,
      12, 28, 24, 21,
      24, 35, 24, 21,
      24, 21, 12, 14,
      0, 21, 12, 14,
      0, 21, 0, 7,
      12, 14, 0, 7,
      12, 14, 24, 7,
      24, 7, 12, 0,
      0, 7, 12, 0,
    ]
    map:Map<string, Array<number>> = new Map<string, Array<number>>();
    ArrNumber: Array<number> = [];
    Arr: Array<string> = [];
    interval: number = 66;
    demand: string = "E"; //C:中文 E:英文 I:图标 T:商标 N:数字
    color: string = "#000000";
    English: string = 'StoreHouse';
    margin: number = 35; //顶部间隔
    scale: number = 0.5;
    Number: number = 0;

    change() {
      this.Arr.length = this.ArrNumber.length = 0;
      if (this.demand == "C") {
        this.fillArray(this.Chinese, this.scale);
      } else if (this.demand == "E") {
        this.fillStringArray(this.English, this.scale);
      } else if (this.demand == "I") {
        this.fillArray(this.Icon, this.scale);
      } else if (this.demand == "T") {
        this.fillArray(this.Trademark, this.scale);
      } else if (this.demand == "N") {
        this.fillStringArray(this.Number, this.scale);
      }
    }

    fillStringArray(arg: string | number, scale: number) {
      let s: string = (typeof arg == 'string') ? arg.toUpperCase() : arg.toString();
      this.fillMap();
      let n: number = -1;
      for (let i = 0; i < s.length; i++) {
        let x: string = s.charAt(i);
        let arr: Array<number> = this.map.get(x) as Array<number>;
        for (let j = 0; j < arr.length / 4; j++) {
          let x1: number = arr[j*4] + this.interval * i;
          let y1: number = arr[j * 4 + 1];
          let x2: number = arr[j * 4 + 2] + this.interval * i;
          let y2: number = arr[j * 4 + 3];
          let b: string = "M" + (scale * x1 + 1) + " " + (scale * y1 + 1) + " " + "L" + (scale * x2 + 1) + " " + (scale * y2 + 1) + " ";
          this.Arr.push(b);
          n++;
          this.ArrNumber.push(n);
        }
      }
    }

    fillArray(array: Array<number>, scale: number) {
      let n: number = -1;
      for (let j = 0; j < array.length / 4; j++) {
        let x1: number = array[j*4];
        let y1: number = array[j * 4 + 1];
        let x2: number = array[j * 4 + 2];
        let y2: number = array[j * 4 + 3];
        let b: string = "M" + (scale * x1 + 1) + " " + (scale * y1 + 1) + " " + "L" + (scale * x2 + 1) + " " + (scale * y2 + 1) + " ";
        this.Arr.push(b);
        n++;
        this.ArrNumber.push(n);
      }
    }

    fillMap() {
      this.map.set('A', this.sourceArrays[0]);
      this.map.set('B', this.sourceArrays[1]);
      this.map.set('C', this.sourceArrays[2]);
      this.map.set('D', this.sourceArrays[3]);
      this.map.set('E', this.sourceArrays[4]);
      this.map.set('F', this.sourceArrays[5]);
      this.map.set('G', this.sourceArrays[6]);
      this.map.set('H', this.sourceArrays[7]);
      this.map.set('I', this.sourceArrays[8]);
      this.map.set('J', this.sourceArrays[9]);
      this.map.set('K', this.sourceArrays[10]);
      this.map.set('L', this.sourceArrays[11]);
      this.map.set('M', this.sourceArrays[12]);
      this.map.set('N', this.sourceArrays[13]);
      this.map.set('O', this.sourceArrays[14]);
      this.map.set('P', this.sourceArrays[15]);
      this.map.set('Q', this.sourceArrays[16]);
      this.map.set('R', this.sourceArrays[17]);
      this.map.set('S', this.sourceArrays[18]);
      this.map.set('T', this.sourceArrays[19]);
      this.map.set('U', this.sourceArrays[20]);
      this.map.set('V', this.sourceArrays[21]);
      this.map.set('W', this.sourceArrays[22]);
      this.map.set('X', this.sourceArrays[23]);
      this.map.set('Y', this.sourceArrays[24]);
      this.map.set('Z', this.sourceArrays[25]);
      this.map.set('0', this.sourceArrays[26]);
      this.map.set('1', this.sourceArrays[27]);
      this.map.set('2', this.sourceArrays[28]);
      this.map.set('3', this.sourceArrays[29]);
      this.map.set('4', this.sourceArrays[30]);
      this.map.set('5', this.sourceArrays[31]);
      this.map.set('6', this.sourceArrays[32]);
      this.map.set('7', this.sourceArrays[33]);
      this.map.set('8', this.sourceArrays[34]);
      this.map.set('9', this.sourceArrays[35]);
      this.map.set(' ', this.sourceArrays[36]);
      this.map.set('-', this.sourceArrays[37]);
      this.map.set('.', this.sourceArrays[38]);
    }

    getScale(): number{
      return this.scale
    }

    setScale(scale: number): StoreHouseModel{
      this.scale = scale / 3;
      return this
    }

    getMargin(): number{
      return this.margin
    }

    setMargin(margin: number): StoreHouseModel{
      this.margin = margin;
      return this
    }

    getNumber(): number{
      return this.Number
    }

    setNumber(Number: number): StoreHouseModel{
      this.Number = Number;
      return this
    }

    getEnglish(): string{
      return this.English
    }

    setEnglish(English: string): StoreHouseModel{
      this.English = English;
      return this
    }

    getDemand(): string{
      return this.demand
    }

    setDemand(demand: string): StoreHouseModel{
      this.demand = demand;
      return this
    }

    getColor(): string{
      return this.color
    }

    setColor(color: string): StoreHouseModel{
      this.color = color;
      return this
    }
  }
}

export default StoreHouseClassModel
