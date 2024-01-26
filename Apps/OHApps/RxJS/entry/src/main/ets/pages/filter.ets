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

import { of, interval, from, range, throwError, timer } from 'rxjs';
import {
  debounce,
  take,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeWhile,
  throttle,
  first,
  ignoreElements,
  last,
  sample,
  single,
  skip,
  skipUntil,
  skipWhile,
  takeUntil,
  throttleTime
} from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'

@Entry
@Component
struct Create {
  build() {
    Scroll() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
        MyButton({
          content: "debounce:根据一个选择器函数，舍弃掉在两次输出之间小于指定时间的发出值",
          onClickListener: () => {
            this.debounce();
          }
        })

        MyButton({ content: "debounceTime:舍弃掉在两次输出之间小于指定时间的发出值", onClickListener: () => {
          this.debounceTime();
        } })

        MyButton({
          content: "distinctUntilChanged:只有当当前值与之前最后一个值不同时才将其发出",
          onClickListener: () => {
            this.distinctUntilChanged();
          }
        })

        MyButton({ content: "filter:发出符合给定条件的值", onClickListener: () => {
          this.filter();
        } })

        MyButton({ content: "first:发出第一个值或第一个通过给定表达式的值", onClickListener: () => {
          this.first();
        } })

        MyButton({ content: "ignoreElements:忽略所有通知，除了complete和error", onClickListener: () => {
          this.ignoreElements();
        } })

        MyButton({ content: "last:根据提供的表达式，在源 observable 完成时发出它的最后一个值", onClickListener: () => {
          this.last();
        } })

        MyButton({ content: "sample:当提供的observable发出时从源observable中取样", onClickListener: () => {
          this.sample();
        } })

        MyButton({ content: "single:发出通过表达式的单一项", onClickListener: () => {
          this.single();
        } })

        MyButton({ content: "skip:跳过N个(由参数提供)发出值", onClickListener: () => {
          this.skip();
        } })

        MyButton({ content: "skipUntil:跳过源observable发出的值，直到提供的observable发出值", onClickListener: () => {
          this.skipUntil();
        } })

        MyButton({ content: "skipWhile:跳过源observable发出的值，直到提供的表达式结果为 false", onClickListener: () => {
          this.skipWhile();
        } })

        MyButton({ content: "take:在完成前发出N个值(N由参数决定)", onClickListener: () => {
          this.take();
        } })

        MyButton({ content: "takeUntil:发出值，直到提供的observable发出值，它便完成", onClickListener: () => {
          this.takeUntil();
        } })

        MyButton({ content: "takeWhile:发出值，直到提供的表达式结果为 false ", onClickListener: () => {
          this.takeWhile();
        } })

        MyButton({
          content: "throttle:以某个时间间隔为阈值，在durationSelector 完成前将抑制新值的发出",
          onClickListener: () => {
            this.throttle();
          }
        })

        MyButton({ content: "throttleTime:当指定的持续时间经过后发出最新值", onClickListener: () => {
          this.throttleTime();
        } })
      }
    }
    .width('100%')
    .height('100%')

  }

  debounce() {
    const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
    const debouncedExample = example.pipe(debounce(() => timer(1000)));
    const subscribe = debouncedExample.subscribe(val => {
      Log.showLog('debounce--' + val)
    });
  }

  debounceTime() {
    const example = interval(500).pipe(take(7));
    const debouncedInput = example.pipe(debounceTime(1000));
    const subscribe = debouncedInput.subscribe(val => {
      Log.showLog(`debounceTime--${val}`);
    });
  }

  distinctUntilChanged() {
    const myArrayWithDuplicatesInARow = from([1, 1, 2, 2, 3, 1, 2, 3]);

    const distinctSub = myArrayWithDuplicatesInARow
      .pipe(distinctUntilChanged())
      .subscribe(val => {
        Log.showLog('distinctUntilChanged--' + val)
      });

    const nonDistinctSub = myArrayWithDuplicatesInARow
      .subscribe(val => {
        Log.showLog('distinctUntilChanged--' + val)
      });
  }

  filter() {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(filter(num => num % 2 === 0));
    const subscribe = example.subscribe(val => {
      Log.showLog(`filter--${val}`)
    });
  }

  first() {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(first());
    const subscribe = example.subscribe(val => {
      Log.showLog(`first--${val}`)
    });
  }

  ignoreElements() {
    const source = interval(100);
    const example = source.pipe(
      take(5),
      ignoreElements()
    );
    const subscribe = example.subscribe(
      val => Log.showLog(`ignoreElements--NEXT: ${val}`),
      (val: ESObject) => {
        Log.showLog(`ignoreElements--ERROR: ${val}`)
      },
      () => Log.showLog('ignoreElements--COMPLETE!')
    );
  }

  last() {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(last());
    const subscribe = example.subscribe(val => {
      Log.showLog(`last--${val}`)
    });
  }

  sample() {
    const source = interval(1000);
    const example = source.pipe(sample(interval(2000)), take(5));
    const subscribe = example.subscribe(val => {
      Log.showLog('sample--' + val)
    });
  }

  single() {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(single(val => val === 4));
    const subscribe = example.subscribe(val => {
      Log.showLog('single--' + val)
    });
  }

  skip() {
    const source = interval(1000);
    const example = source.pipe(skip(5), take(4));
    const subscribe = example.subscribe(val => {
      Log.showLog('skip--' + val)
    });
  }

  skipUntil() {
    const source = interval(1000);
    const example = source.pipe(skipUntil(timer(6000)), take(4));
    const subscribe = example.subscribe(val => {
      Log.showLog('skipUntil--' + val)
    });
  }

  skipWhile() {
    const source = interval(1000);
    const example = source.pipe(skipWhile(val => val < 5), take(4));
    const subscribe = example.subscribe(val => {
      Log.showLog('skipWhile--' + val)
    });
  }

  take() {
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(take(1));
    const subscribe = example.subscribe(val => {
      Log.showLog('take--' + val)
    });
  }

  takeUntil() {
    const source = interval(1000);
    const timer$ = timer(5000);
    const example = source.pipe(takeUntil(timer$));
    const subscribe = example.subscribe(val => {
      Log.showLog('takeUntil--' + val)
    });
  }

  takeWhile() {
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(takeWhile(val => val <= 4));
    const subscribe = example.subscribe(val => {
      Log.showLog('takeWhile--' + val)
    });
  }

  throttle() {
    const source = interval(1000);
    const example = source.pipe(throttle(val => interval(2000)), take(4));
    const subscribe = example.subscribe(val => {
      Log.showLog('throttle--' + val)
    });
  }

  throttleTime() {
    const source = interval(1000);
    const example = source.pipe(throttleTime(5000), take(3));
    const subscribe = example.subscribe(val => {
      Log.showLog('throttleTime--' + val)
    });
  }
}

