/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

import { of } from 'rxjs';
import { defaultIfEmpty, every } from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'

@Entry
@Component
struct Condition {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      MyButton({ content: "defaultIfEmpty:如果在完成前没有发出任何通知，那么发出给定的值", onClickListener: () => {
        this.defaultIfEmpty();
      } })

      MyButton({ content: "every:如果完成时所有的值都能通过断言，那么发出 true，否则发出false", onClickListener: () => {
        this.every();
      } })
    }
    .width('100%')
    .height('100%')
  }

  defaultIfEmpty() {
    const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
    const subscribe = exampleOne.subscribe((val: ESObject) => {
      Log.showLog('defaultIfEmpty--' + val)
    });
  }

  every() {
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(
      every(val => val % 2 === 0)
    );
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('every--' + val)
    });
  }
}