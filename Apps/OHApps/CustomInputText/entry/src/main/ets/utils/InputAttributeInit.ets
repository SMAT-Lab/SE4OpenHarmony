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

import inputMethod from '@ohos.inputMethod';
import common from '@ohos.app.ability.common';

class InputAttributeInit {
  private textInputType: Array<inputMethod.TextInputType> = [inputMethod.TextInputType.NONE, inputMethod.TextInputType.TEXT, inputMethod.TextInputType.NUMBER, inputMethod.TextInputType.PHONE];
  private enterKeyType: Array<inputMethod.EnterKeyType> = [inputMethod.EnterKeyType.NONE, inputMethod.EnterKeyType.SEARCH, inputMethod.EnterKeyType.SEND, inputMethod.EnterKeyType.GO];
  private inputTypeString: Array<Resource> = [$r('app.string.default_input'), $r('app.string.text_input'), $r('app.string.number_input'), $r('app.string.phone_input')];
  private enterTypeString: Array<Resource> = [$r('app.string.default_enter_key'), $r('app.string.search_enter_key'), $r('app.string.send_enter_key'), $r('app.string.go_enter_key')];

  getInputTypeSource(): Array<Resource> {
    return this.inputTypeString;
  }

  getEnterTypeSource(): Array<Resource> {
    return this.enterTypeString;
  }

  getInputType(index: number): inputMethod.TextInputType {
    if (index >= 0 && index < this.textInputType.length) {
      return this.textInputType[index];
    }
    return inputMethod.TextInputType.NONE;
  }

  getInputTypeValue(index: number): string {
    if (index >= 0 && index < this.inputTypeString.length) {
      return this.getResourceString(this.inputTypeString[index]);
    }
    return this.getResourceString($r('app.string.text_input_type'));
  }

  getEnterType(index: number): inputMethod.EnterKeyType {
    if (index >= 0 && index < this.enterKeyType.length) {
      return this.enterKeyType[index];
    }
    return inputMethod.EnterKeyType.NONE;
  }

  getEnterTypeValue(index: number): string {
    if (index >= 0 && index < this.enterTypeString.length) {
      return this.getResourceString(this.enterTypeString[index]);
    }
    return this.getResourceString($r('app.string.enter_key_type'));
  }

  getResourceString(resource: Resource): string {
    let context = getContext(this) as common.UIAbilityContext;
    return context.resourceManager.getStringSync(resource.id);
  }
}

export const inputAttribute = new InputAttributeInit();