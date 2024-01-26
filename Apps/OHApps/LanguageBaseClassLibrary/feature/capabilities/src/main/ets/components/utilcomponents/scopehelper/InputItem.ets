/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

@Component
export struct InputItem {
  @Link value: number;
  private textValue: Resource = $r('app.string.short_sleep');
  private placeHolder: Resource = $r('app.string.enter_sleep_time');

  build() {
    Row() {
      Text(this.textValue)
        .layoutWeight(1)
        .fontSize(20)
      TextInput({ placeholder: this.placeHolder })
        .key('shortestSleepTime')
        .layoutWeight(1)
        .type(InputType.Normal)
        .fontSize(20)
        .fontStyle(FontStyle.Italic)
        .maxLength(20)
        .fontWeight(FontWeight.Bold)
        .placeholderFont({ size: 16, weight: FontWeight.Normal })
        .enterKeyType(EnterKeyType.Go)
        .onChange((value: string) => {
          this.value = Number(value);
        })
    }
  }
}