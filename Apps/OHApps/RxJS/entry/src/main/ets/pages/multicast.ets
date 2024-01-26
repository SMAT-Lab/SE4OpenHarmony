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

import { Subject, timer, interval, zip, of, merge, from, ConnectableObservable } from 'rxjs';
import { tap, mapTo, share, pluck, shareReplay, publish, map, take, multicast } from 'rxjs';
import Log from '../log'
import { MyButton } from '../common/MyButton'

@Entry
@Component
struct Multicast {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      MyButton({ content: "publish:共享源observable并通过调用connect方法使其变成热的", onClickListener: () => {
        this.publish();
      } })

      MyButton({ content: "multicast:使用提供的Subject来共享源observable", onClickListener: () => {
        this.multicast();
      } })

      MyButton({ content: "share:在多个订阅者间共享源observable", onClickListener: () => {
        this.share();
      } })
      MyButton({ content: "shareReplay:共享源observable并重放指定次数的发出", onClickListener: () => {
        this.shareReplay();
      } })
    }
    .width('100%')
    .height('100%')
  }

  share() {
    const source = timer(1000);
    const example = source.pipe(
      tap(() => {
        Log.showLog('***SIDE EFFECT***')
      }),
      mapTo('***RESULT***')
    );

    const subscribe = example.subscribe((val: ESObject) => {
      Log.showLog('share--' + val)
    });
    const subscribeTwo = example.subscribe((val: ESObject) => {
      Log.showLog('share--' + val)
    });

    const sharedExample = example.pipe(share());

    const subscribeThree = sharedExample.subscribe((val: ESObject) => {
      Log.showLog('share--' + val)
    });
    const subscribeFour = sharedExample.subscribe((val: ESObject) => {
      Log.showLog('share--' + val)
    });
  }

  shareReplay() {
    interface data1 {
      data: ESObject,
      url: string
    }

    const routeEnd = new Subject<data1>();
    const lastUrl: ESObject = routeEnd.pipe(
      tap((_: ESObject) => {
        Log.showLog('shareReplay--executed')
      }),
      pluck('url'),
      shareReplay(1)
    );
    const initialSubscriber: ESObject = lastUrl.subscribe(Log.showLog);
    routeEnd.next({ data: {}, url: 'my-path' });
    const lateSubscriber: ESObject = lastUrl.subscribe(Log.showLog);
  }

  publish() {
    const source = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
      map(values => values[1]));
    source.pipe(
      publish(multicasted =>
      merge(
        multicasted.pipe(tap((val: ESObject) => {
          Log.showLog('publish--Stream 1:' + val)
        })),
        multicasted.pipe(tap((val: ESObject) => {
          Log.showLog('publish--Stream 2:' + val)
        })),
        multicasted.pipe(tap((val: ESObject) => {
          Log.showLog('publish--Stream 3:' + val)
        })),
      )
      )
    ).subscribe();
  }

  multicast() {
    // multicast操作符:多播的实现。 需要开启 multicasted.connect();
    const source = from([1, 2, 3]);
    const subject1: ESObject = new Subject<ESObject>();
    const multicasted = source.pipe(multicast(subject1)) as ConnectableObservable<number>;
    multicasted.subscribe({
      next: (v) => Log.showLog(`multicast--A:${v}`)
    })
    multicasted.subscribe({
      next: (v) => Log.showLog(`multicast--B:${v}`)
    })
    multicasted.connect();
  }
}