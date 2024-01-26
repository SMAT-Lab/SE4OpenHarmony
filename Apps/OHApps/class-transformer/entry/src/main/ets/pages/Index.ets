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
import { plainToClassDemo } from "../methods/plainToClass";
import { plainToClassFromExistDemo } from "../methods/plainToClassFromExist"
import { classToPlainDemo } from "../methods/classToPlain"
import { classToPlainFromExistDemo } from "../methods/classToPlainFromExist"
import { instanceToPlainDemo } from "../methods/instanceToPlain"
import { plainToInstanceDemo } from "../methods/plainToInstance"
import { instanceToInstanceDemo } from "../methods/instanceToInstance"
import { classToClassFromExistDemo } from "../methods/classToClassFromExist"
import { serializeDemo } from "../methods/serialize"
import { deserializeDemo } from "../methods/deserialize"

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  @Builder BuildButton(text:string,callback:() => void,remake?:string){
    Button(text).onClick(callback).width("90%")
    Text(remake).margin({top:4,bottom:10}).width("90%")
  }

  build() {
    Scroll(){
      Column() {
        this.BuildButton("plainToClassDemo",plainToClassDemo,"此方法将普通javascript对象转换为特定类的实例")
        this.BuildButton("plainToInstanceDemo",plainToInstanceDemo,"此方法将普通javascript对象转换为特定类的实例")

        this.BuildButton("classToPlainDemo",classToPlainDemo,"这个方法将类对象转换回普通javascript对象")
        this.BuildButton("instanceToPlainDemo",instanceToPlainDemo,"这个方法将类对象转换回普通javascript对象")

        this.BuildButton("classToPlainFromExistDemo",classToPlainFromExistDemo,"将类实例与普通javascript对象合并")
        this.BuildButton("plainToClassFromExistDemo",plainToClassFromExistDemo,"此方法使用已填充的对象（目标类中的实例）将普通对象转换为实例")
        this.BuildButton("instanceToInstanceDemo",instanceToInstanceDemo,"将类（构造函数）对象转换为新的类（构造器）对象。也适用于数组。")
        this.BuildButton("classToClassFromExistDemo",classToClassFromExistDemo,"将类（构造函数）对象转换为纯（文字）对象。")
        this.BuildButton("serializeDemo",serializeDemo,"将给定对象序列化为JSON字符串。。")
        this.BuildButton("deserializeDemo",deserializeDemo,"将对象字符串转换为一个类的实例")
      }
      .width('100%')
      .padding({top:10})
    }
    .width("100%")
    .height("100%")
  }
}