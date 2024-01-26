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

import { Observable, asyncScheduler, from, of, combineLatest, asapScheduler, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'

@Entry
@Component
struct Scheduler {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      MyButton({ content: "asyncScheduler", onClickListener: () => {
        this.async();
      } })

      MyButton({ content: "asapScheduler", onClickListener: () => {
        this.asap();
      } })

      MyButton({ content: "queueScheduler", onClickListener: () => {
        this.queue();
      } })
    }
    .width('100%')
    .height('100%')
  }

  async() {
    let observable: ESObject = new Observable<ESObject>((proxyObserver: ESObject) => {
      proxyObserver.next(1);
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.complete();
    }).pipe(
      observeOn(asyncScheduler)
    );
    let finalObserver: ESObject = {
      next(x: ESObject) {
        Log.showLog('async--got value ' + x)
      },
      error(err: ESObject) {
        Log.showError('async--something wrong occurred: ' + err);
      },
      complete() {
        Log.showLog('async--done');
      }
    };
    Log.showLog('async--just before subscribe');
    observable.subscribe(finalObserver);
    Log.showLog('async--just after subscribe');
  }

  asap() {
    const arraySource = from([1, 2], asapScheduler);
    const source = of(10);
    const example = combineLatest(arraySource, source, (a, b) => {
      return a + b
    });
    example.subscribe(val => {
      Log.showLog('asap--' + val)
    });
  }

  queue() {
    queueScheduler.schedule(() => {
      queueScheduler.schedule(() => Log.showLog('queue--second'));
      Log.showLog('queue--first');
    });
  }
}