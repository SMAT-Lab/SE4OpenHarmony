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

import {
  take,
  map,
  combineAll,
  concatAll,
  delay,
  pairwise,
  mapTo,
  startWith,
  withLatestFrom,
  concat,
  merge,
  mergeWith
} from 'rxjs';
import { interval, timer, combineLatest, of, race, zip } from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'
import { forkJoin, mergeAll } from './ArkTools';

@Entry
@Component
struct Combine {
  build() {
    Scroll() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
        MyButton({
          content: "combineAll:当源observable完成时，对收集的observables使用combineLatest",
          onClickListener: () => {
            this.combineAll();
          }
        })

        MyButton({
          content: "combineLatest:当任意observable发出值时，发出每个observable的最新值",
          onClickListener: () => {
            this.combineLatest();
          }
        })

        MyButton({
          content: "concat:按照顺序，前一个observable完成了再订阅下一个observable并发出值",
          onClickListener: () => {
            this.concatObservable();
          }
        })

        MyButton({ content: "concatAll:收集observables，当前一个完成时订阅下一个", onClickListener: () => {
          this.concatAll();
        } })

        MyButton({ content: "forkJoin:当所有observables完成时，发出每个observable的最新值", onClickListener: () => {
          this.forkJoin();
        } })

        MyButton({ content: "merge:将多个observables转换成单个observable", onClickListener: () => {
          this.merge();
        } })

        MyButton({ content: "mergeAll:收集并订阅所有的observables", onClickListener: () => {
          this.mergeAll();
        } })

        MyButton({ content: "pairwise:将前一个值和当前值作为数组发出", onClickListener: () => {
          this.pairwise();
        } })

        MyButton({ content: "race:使用首先发出值的observable", onClickListener: () => {
          this.race();
        } })

        MyButton({ content: "startWith:发出给定的第一个值", onClickListener: () => {
          this.startWith();
        } })

        MyButton({ content: "withLatestFrom:还提供另一个observable的最新值", onClickListener: () => {
          this.withLatestFrom();
        } })

        MyButton({ content: "zip:在所有observables发出后将它们的值作为数组发出", onClickListener: () => {
          this.zip();
        } })
      }.padding({ bottom: 10 })
    }
    .width('100%')
    .height('100%')
  }

  combineAll() {
    const source = interval(1000).pipe(take(2));
    const example = source.pipe(
      map(val => interval(1000)
        .pipe(map(i => `Result (${val}): ${i}`), take(5)))
    );
    const combined = example.pipe(combineAll());
    const subscribe = combined.subscribe((val) => {
      Log.showLog('combineAll--' + val)
    });
  }

  combineLatest() {
    const timerOne = timer(1000, 4000).pipe(take(3));
    const timerTwo = timer(2000, 4000).pipe(take(3));
    const timerThree = timer(3000, 4000).pipe(take(3));

    const combinedProject = combineLatest(
      timerOne,
      timerTwo,
      timerThree,
      (one, two, three) => {
        return `Timer One (Proj) Latest: ${one},
              Timer Two (Proj) Latest: ${two},
              Timer Three (Proj) Latest: ${three}`;
      });
    const subscribe = combinedProject.subscribe(latestValuesProject => {
      Log.showLog('combineLatest--' + latestValuesProject);
    });
  }

  concatObservable() {
    const sourceOne = of(1, 2, 3);
    const sourceTwo = of(4, 5, 6);
    const example: ESObject = concat(sourceOne, sourceTwo);
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('concatObservable--' + val);
    });
  }

  concatAll() {
    const obs1 = interval(1000).pipe(take(5));
    const obs2 = interval(500).pipe(take(2));
    const obs3 = interval(2000).pipe(take(1));
    const source = of(obs1, obs2, obs3);
    const example = source.pipe(concatAll());
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('concatAll--' + val)
    });
  }

  forkJoin = forkJoin

  merge() {
    const first = interval(2500);
    const second = interval(1000);
    const example: ESObject = first.pipe(mergeWith(second), take(6));
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('merge--' + val)
    });
  }

  mergeAll = mergeAll

  pairwise() {
    const example = interval(1000).pipe(
      pairwise(),
      take(5)
    );
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('pairwise--' + val)
    });
  }

  race() {
    const example = race(
      interval(1500),
      interval(1000)
        .pipe(mapTo('1s won!')),
      interval(2000),
      interval(2500)
    )
      .pipe(take(2));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('race--' + val)
    });
  }

  startWith() {
    const source = of(1, 2, 3);
    const example = source.pipe(startWith(0));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('startWith--' + val)
    });
  }

  withLatestFrom() {
    const source = interval(5000);
    const secondSource = interval(1000);
    const example = source.pipe(
      withLatestFrom(secondSource),
      map((first, second) => {
        return `First Source (5s): ${first} Second Source (1s): ${second}`;
      }),
      take(5)
    );
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('withLatestFrom--' + val)
    });
  }

  zip() {
    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');
    const example = zip(
      sourceOne,
      sourceTwo.pipe(delay(1000)),
      sourceThree.pipe(delay(2000)),
      sourceFour.pipe(delay(3000))
    );
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('zip--' + val)
    });
  }
}