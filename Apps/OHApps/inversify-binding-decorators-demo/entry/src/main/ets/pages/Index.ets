/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import {Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators/es/index';
import {Warrior, WarriorProvide, TYPE, Ninja, Katana, Shuriken, NinjaProvide, KatanaProvide, ShurikenProvide} from '../interface/Warrior'
let container=new Container();

@Entry
@Component
struct Index {
  @State message: string = ''
  @State message2: string = ''
  @State message3: string = ''
  @State message4: string = ''
  @State message5: string = ''
  @State message6: string = ''

  build() {
    Row() {
      Column() {
        Button("@provide")
          .fontSize(30)
          .height(60)
          .width('100%')
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
              this.provideSample()       
          })
        Button("@fluentprovide")
          .fontSize(30)
          .height(60)
          .width('100%')
          .margin(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
               this.fluentprovideSample()
          })
        Text(this.message6)
            .fontSize(40)
            .fontWeight(FontWeight.Bold)
        Text(this.message)
           .fontSize(40)
           .fontWeight(FontWeight.Bold)
        Text(this.message2)
           .fontSize(40)
           .fontWeight(FontWeight.Bold)
        Text(this.message3)
           .fontSize(40)
           .fontWeight(FontWeight.Bold)       
        Text(this.message4)
           .fontSize(40)
           .fontWeight(FontWeight.Bold)
        Text(this.message5)
           .fontSize(40)
           .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
   
  aboutToAppear(){
    container.load(buildProviderModule());
  } 
  
  fluentprovideSample(){
    this.message6="fluentprovide result:"
    let ninja = container.get<Warrior>(TYPE.Warrior);
    this.message=(ninja instanceof Ninja)+"";
    this.message2=(ninja.primary instanceof Katana)+"";
    this.message3=(ninja.secondary instanceof Shuriken)+"";
    this.message4=(ninja.fight().toString()=="Hit by Katana!")+"";
    this.message5=(ninja.sneak().toString()=="Hit by Shuriken!")+"";
  }
  
  provideSample(){
    this.message6="provide result:"
    let ninja=container.get<WarriorProvide>(TYPE.WarriorProvide);
    this.message=(ninja instanceof NinjaProvide)+"";
    this.message2=(ninja.katana instanceof KatanaProvide)+"";
    this.message3=(ninja.shuriken instanceof ShurikenProvide)+"";
    this.message4=(ninja.fight().toString()=="cut!")+"";
    this.message5=(ninja.sneak().toString()=="hit!")+"";
  }
}
