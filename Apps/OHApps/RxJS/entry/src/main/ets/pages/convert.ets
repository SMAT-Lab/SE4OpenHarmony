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

import { of, interval, from, timer, merge } from 'rxjs';
import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  concatMap,
  delay,
  mergeMap,
  concatMapTo,
  take,
  exhaustMap,
  expand,
  groupBy,
  map,
  mapTo,
  pluck,
  reduce,
  scan,
  switchMap,
  window,
  mergeAll,
  windowCount,
  tap,
  windowTime,
  windowToggle,
  windowWhen
} from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'
import { partition } from './ArkTools'

@Entry
@Component
struct Convert {
  build() {
    Scroll() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
        MyButton({
          content: "buffer:收集输出值，直到提供的observable发出才将收集到的值作为数组发出",
          onClickListener: () => {
            this.buffer();
          }
        })

        MyButton({
          content: "bufferCount:收集发出的值，直到收集完提供的数量的值才将其作为数组发出",
          onClickListener: () => {
            this.bufferCount();
          }
        })

        MyButton({ content: "bufferTime:收集发出的值，直到经过了提供的时间才将其作为数组发出", onClickListener: () => {
          this.bufferTime();
        } })

        MyButton({
          content: "bufferToggle:开启开关以捕获源observable所发出的值，关闭开关以将缓冲的值作为数组发出",
          onClickListener: () => {
            this.bufferToggle();
          }
        })

        MyButton({ content: "bufferWhen:收集值，直到关闭选择器发出值才发出缓冲的值", onClickListener: () => {
          this.bufferWhen();
        } })

        MyButton({ content: "concatMap:将值映射成内部observable，并按顺序订阅和发出", onClickListener: () => {
          this.concatMap();
        } })

        MyButton({ content: "concatMapTo:当前一个observable完成时订阅提供的observable并发出值", onClickListener: () => {
          this.concatMapTo();
        } })

        MyButton({ content: "exhaustMap:映射成内部observable，忽略其他值直到该observable完成", onClickListener: () => {
          this.exhaustMap();
        } })

        MyButton({ content: "expand:递归调用提供的函数", onClickListener: () => {
          this.expand();
        } })

        MyButton({ content: "groupBy:基于提供的值分组成多个observables", onClickListener: () => {
          this.groupBy();
        } })

        MyButton({ content: "map:对源observable的每个值应用投射函数", onClickListener: () => {
          this.map();
        } })

        MyButton({ content: "mapTo:将每个发出值映射成常量", onClickListener: () => {
          this.mapTo();
        } })

        MyButton({ content: "mergeMap:映射成observable并发出值", onClickListener: () => {
          this.mergeMap();
        } })

        MyButton({
          content: "partition:Split one observable into two based on provided predicate",
          onClickListener: () => {
            this.partition();
          }
        })

        MyButton({ content: "pluck:选择属性来发出", onClickListener: () => {
          this.pluck();
        } })

        MyButton({
          content: "reduce:将源observalbe的值归并为单个值，当源observable完成时将这个值发出",
          onClickListener: () => {
            this.reduce();
          }
        })

        MyButton({ content: "scan:随着时间的推移进行归并", onClickListener: () => {
          this.scan();
        } })

        MyButton({ content: "switchMap:映射成observable，完成前一个内部observable，发出值", onClickListener: () => {
          this.switchMap();
        } })

        MyButton({ content: "window:时间窗口值的observable", onClickListener: () => {
          this.window();
        } })

        MyButton({ content: "windowCount:源observable中的值的observable，每次发出N个值", onClickListener: () => {
          this.windowCount();
        } })

        MyButton({
          content: "windowTime:在每个提供的时间跨度内，收集源obsercvable中的值的observable",
          onClickListener: () => {
            this.windowTime();
          }
        })

        MyButton({
          content: "windowToggle:以openings发出为起始，以closingSelector发出为结束，收集并发出源observable中的值的observable",
          onClickListener: () => {
            this.windowToggle();
          }
        })

        MyButton({
          content: "windowWhen:在提供的时间帧处关闭窗口，并发出从源observable中收集的值的observable",
          onClickListener: () => {
            this.windowWhen();
          }
        })
      }
    }
    .width('100%')
    .height('100%')
  }

  buffer() {
    const myInterval = interval(1000);
    const bufferBy = timer(5000);
    const myBufferedInterval = myInterval.pipe(buffer(bufferBy));
    const subscribe = myBufferedInterval.subscribe((val: ESObject) => {
      Log.showLog('buffer--' + val);
    });
  }

  bufferCount() {
    const source = interval(1000);
    const bufferThree = source.pipe(bufferCount(3), take(4));
    const subscribe = bufferThree.subscribe((val: ESObject) => {
      Log.showLog('bufferCount--' + val);
    });
  }

  bufferTime() {
    const source = interval(500);
    const example = source.pipe(bufferTime(2000), take(4));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('bufferTime--' + val)
    });
  }

  bufferToggle() {
    const sourceInterval = interval(1000);
    const startInterval = interval(5000);
    const closingInterval = (val: ESObject) => {
      Log.showLog(`Value ${val} emitted, starting buffer! Closing in 3s!`);
      return interval(3000);
    };
    const bufferToggleInterval = sourceInterval.pipe(
      bufferToggle(startInterval, closingInterval),
      take(4)
    );
    const subscribe = bufferToggleInterval.subscribe((val: ESObject) => {
      Log.showLog('bufferToggle--' + val)
    }
    );
  }

  bufferWhen() {
    const oneSecondInterval = interval(1000);
    const fiveSecondInterval = () => interval(5000);
    const bufferWhenExample = oneSecondInterval.pipe(bufferWhen(fiveSecondInterval), take(4));
    const subscribe = bufferWhenExample.subscribe((val: ESObject) => {
      Log.showLog('bufferWhen--' + val)
    });
  }

  concatMap() {
    const source = of(2000, 1000);
    const example = source.pipe(
      concatMap((val: ESObject) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    );
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog(`concatMap--${val}`);
    });
    const mergeMapExample = source
      .pipe(
        delay(5000),
        mergeMap((val: ESObject) => of(`Delayed by: ${val}ms`)
          .pipe(delay(val)))
      )
      .subscribe((val: ESObject) => {
        Log.showLog(`concatMap--${val}`)
      });
  }

  concatMapTo() {
    const sampleInterval = interval(500).pipe(take(5));
    const fakeRequest = of('Network request complete').pipe(delay(3000));
    const example = sampleInterval.pipe(concatMapTo(fakeRequest));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('concatMapTo--' + val)
    });
  }

  exhaustMap() {
    const sourceInterval = interval(1000);
    const delayedInterval = sourceInterval.pipe(delay(1000), take(4));

    const exhaustSub = merge(
      delayedInterval,
      of(true)
    )
      .pipe(exhaustMap(_ => sourceInterval.pipe(take(5))))
      .subscribe((val: ESObject) => {
        Log.showLog('exhaustMap--' + val)
      });
  }

  expand() {
    const source = of(2);
    const example: ESObject = source.pipe(
      expand((val: ESObject) => {
        Log.showLog(`expand--${val}`);
        return of(1 + val);
      }),
      take(5)
    );
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog(`expand--${val}`)
    });
  }

  groupBy() {
    const people: ESObject = [
      {
        name: 'Sue', age: 25
      },
      {
        name: 'Joe', age: 30
      },
      {
        name: 'Frank', age: 25
      },
      {
        name: 'Sarah', age: 35
      }
    ];
    const source: ESObject = from(people);
    const example: ESObject = source.pipe(
      groupBy((person: ESObject) => person.age),
    );
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('groupBy--' + JSON.stringify(val))
    });
  }

  map() {
    const source = from([1, 2, 3, 4, 5]);
    const example: ESObject = source.pipe(map((val: ESObject) => val + 10));
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('map--' + val)
    });
  }

  mapTo() {
    const source = interval(2000);
    const example = source.pipe(mapTo('HELLO WORLD!'));
    let count = 0;
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('mapTo--' + val);
      count++;
      if (count > 2) {
        subscribe.unsubscribe();
      }
    });
  }

  mergeMap() {
    const source = of('Hello');
    const example = source.pipe(mergeMap((val: ESObject) => of(`${val} World!`)));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('mergeMap--' + val)
    });
  }

  pluck() {
    let name1: ESObject = { name: 'Joe', age: 30 }
    let name2: ESObject = { name: 'Sarah', age: 35 }
    const source: ESObject = from([name1, name2]);
    const example: ESObject = source.pipe(pluck('name'));
    const subscribe: ESObject = example.subscribe((val: ESObject) => {
      Log.showLog('pluck--' + val)
    });
  }

  reduce() {
    const source = of(1, 2, 3, 4);
    const example = source.pipe(reduce((acc, val) => acc + val));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('reduce--Sum:' + val)
    });
  }

  scan() {
    const source = of(1, 2, 3);
    const example = source.pipe(scan((acc, curr) => acc + curr, 0));
    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('scan--' + val)
    });
  }

  switchMap() {
    const source = timer(0, 5000);
    const example = source.pipe(switchMap(() => interval(500)));
    const subscribe = example.pipe(take(18)).subscribe((val: ESObject) => {
      Log.showLog('switchMap--' + val)
    });
  }

  window() {
    const source = timer(0, 1000);
    const example = source.pipe(window(interval(3000)));
    const count = example.pipe(scan((acc, curr) => acc + 1, 0), take(2));
    const subscribe = count.subscribe((val: ESObject) => {
      Log.showLog(`Window ${val}:`)
    });
    const subscribeTwo = example.pipe(mergeAll(), take(6)).subscribe((val: ESObject) => {
      Log.showLog('window--' + val)
    });
  }

  windowCount() {
    const source = interval(1000);
    const example = source.pipe(
      windowCount(4),
      tap(_ => {
        Log.showLog('NEW WINDOW!')
      }));
    const subscribeTwo = example.pipe(mergeAll(), take(8)).subscribe((val: ESObject) => {
      Log.showLog('windowCount--' + val)
    });
  }

  windowTime() {
    const source = timer(0, 1000);
    const example = source.pipe(
      windowTime(3000),
      tap(_ => {
        Log.showLog('NEW WINDOW!')
      })
    );
    const subscribeTwo = example
      .pipe(mergeAll(), take(6)).subscribe((val: ESObject) => {
        Log.showLog('windowTime--' + val)
      });
  }

  windowToggle() {
    const source = timer(0, 1000);
    const toggle = interval(5000);
    const example = source.pipe(
      windowToggle(toggle, (val: ESObject) => interval(val * 1000)),
      tap(_ => {
        Log.showLog('NEW WINDOW!')
      })
    );
    const subscribeTwo = example
      .pipe(mergeAll(), take(6)).subscribe((val: ESObject) => {
        Log.showLog('windowToggle--' + val)
      });
  }

  windowWhen() {
    const source = timer(0, 1000);
    const example = source.pipe(
      windowWhen(() => interval(5000)),
      tap(_ => {
        Log.showLog('NEW WINDOW!')
      })
    );
    const subscribeTwo = example
      .pipe(mergeAll(), take(10)).subscribe((val: ESObject) => {
        Log.showLog('windowWhen--' + val)
      });
  }

  partition = partition
}

