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
import { expect, describe, beforeEach, afterEach, it } from '@ohos/hypium';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { Subscriber, Observable, config, of, Observer } from 'rxjs';
import { asInteropSubscriber } from './helpers/interop-helper';
import { getRegisteredFinalizers } from './helpers/subscription';
const BASE_COUNT: number = 2000;
export default function subscriberTest() {
  describe('SafeSubscriber', () => {
    it('should_ignore_next_messages_after_unsubscription', 0, () => {
      let times = 0;

      const sub: ESObject = new SafeSubscriber<ESObject>({
        next() {
          times += 1;
        }
      });

      sub.next();
      sub.next();
      sub.unsubscribe();
      sub.next();

      expect(times).assertEqual(2);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub.unsubscribe();
      }
      endTime(startTime, 'should_ignore_next_messages_after_unsubscription');
    });

    it('should_ignore_error_messages_after_unsubscription', 0, () => {
      let times = 0;
      let errorCalled = false;

      const sub: ESObject = new SafeSubscriber<ESObject>({
        next() {
          times += 1;
        },
        error() {
          errorCalled = true;
        }
      });

      sub.next();
      sub.next();
      sub.unsubscribe();
      sub.next();
      sub.error();

      expect(times).assertEqual(2);
      expect(errorCalled).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub.error();
      }
      endTime(startTime, 'should_ignore_next_messages_after_unsubscription');
    });

    it('should_ignore_complete_messages_after_unsubscription', 0, () => {
      let times = 0;
      let completeCalled = false;

      const sub: ESObject = new SafeSubscriber<ESObject>({
        next() {
          times += 1;
        },
        complete() {
          completeCalled = true;
        }
      });

      sub.next();
      sub.next();
      sub.unsubscribe();
      sub.next();
      sub.complete();

      expect(times).assertEqual(2);
      expect(completeCalled).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub.complete();
      }
      endTime(startTime, 'should_ignore_complete_messages_after_unsubscription');
    });

    it('should_not_be_closed_when_other_subscriber_with_same_observer_instance_completes', 0, () => {
      const observer: ESObject = {
        next: () => { /*noop*/
        }
      };

      const sub1: ESObject = new SafeSubscriber<ESObject>(observer);
      const sub2: ESObject = new SafeSubscriber<ESObject>(observer);

      sub2.complete();

      expect(sub1.closed).assertFalse();
      expect(sub2.closed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub2.complete();
      }
      endTime(startTime, 'should_not_be_closed_when_other_subscriber_with_same_observer_instance_completes');
    });

    it('should_call_complete_observer_without_any_arguments', 0, () => {
      let argument: Array<ESObject> | null = null;

      const observer: ESObject = {
        complete: (...args: Array<ESObject>) => {
          argument = args;
        }
      };

      const sub1: ESObject = new SafeSubscriber<ESObject>(observer);
      sub1.complete();

      let a: ESObject = argument!.length
      expect(a).assertEqual(0);

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub1.complete();
      }
      endTime(startTime, 'should_call_complete_observer_without_any_arguments');
    });

    it('should_chain_interop_unsubscriptions', 0, () => {
      let observableUnsubscribed = false;
      let subscriberUnsubscribed = false;
      let subscriptionUnsubscribed = false;

      const subscriber = new SafeSubscriber<void>();
      subscriber.add(() => subscriberUnsubscribed = true);

      const source = new Observable<void>(() => () => observableUnsubscribed = true);
      const subscription = source.subscribe(asInteropSubscriber(subscriber));
      subscription.add(() => subscriptionUnsubscribed = true);
      subscriber.unsubscribe();

      expect(observableUnsubscribed).assertTrue();
      expect(subscriberUnsubscribed).assertTrue();
      expect(subscriptionUnsubscribed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subscriber.unsubscribe();
      }
      endTime(startTime, 'should_chain_interop_unsubscriptions');
    });

    it('should_have_idempotent_unsubscription', 0, () => {
      let count = 0;
      const subscriber: ESObject = new SafeSubscriber<ESObject>();
      subscriber.add(() => ++count);
      expect(count).assertEqual(0);

      subscriber.unsubscribe();
      expect(count).assertEqual(1);

      subscriber.unsubscribe();
      expect(count).assertEqual(1);

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subscriber.unsubscribe();
      }
      endTime(startTime, 'should_have_idempotent_unsubscription');
    });

    it('should_close_unsubscribe_and_unregister_all_finalizers_after_complete', 0, () => {
      let isUnsubscribed = false;
      const subscriber: ESObject = new SafeSubscriber<ESObject>();
      subscriber.add(() => isUnsubscribed = true);
      subscriber.complete();
      expect(isUnsubscribed).assertTrue();
      expect(subscriber.closed).assertTrue();
      expect(getRegisteredFinalizers(subscriber).length).assertEqual(0);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subscriber.complete();
      }
      endTime(startTime, 'should_close_unsubscribe_and_unregister_all_finalizers_after_complete');
    });

    it('should_close_unsubscribe_and_unregister_all_finalizers_after_error', 0, () => {
      let isTornDown = false;
      const subscriber: ESObject = new SafeSubscriber<ESObject>({
        error: () => {
          // Mischief managed!
          // Adding this handler here to prevent the call to error from
          // throwing, since it will have an error handler now.
        }
      });
      subscriber.add(() => isTornDown = true);
      subscriber.error(new Error('test'));
      expect(isTornDown).assertTrue();
      expect(subscriber.closed).assertTrue();
      expect(getRegisteredFinalizers(subscriber).length).assertEqual(0);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subscriber.error(new Error('test'));
      }
      endTime(startTime, 'should_close_unsubscribe_and_unregister_all_finalizers_after_complete');
    });
  });

  it('should_finalize_and_unregister_all_finalizers_after_complete', 0, () => {
    let isTornDown = false;
    const subscriber: ESObject = new Subscriber<ESObject>();
    subscriber.add(() => {
      isTornDown = true
    });
    subscriber.complete();
    expect(isTornDown).assertTrue();
    expect(getRegisteredFinalizers(subscriber).length).assertEqual(0);
    let startTime = new Date().getTime()
    for (let index = 0; index < BASE_COUNT; index++) {
      subscriber.complete();
    }
    endTime(startTime, 'should_close_unsubscribe_and_unregister_all_finalizers_after_complete');
  });

  it('should_NOT_break_this_context_on_next_methods_from_unfortunate_consumers', 0, () => {

    // This is a contrived class to illustrate that we can pass another
    // object that is "observer shaped" and not have it lose its context
    // as it would have in v5 - v6.
    class CustomConsumer {
      valuesProcessed: string[] = [];

      // In here, we access instance state and alter it.
      next(value: string) {
        if (value === 'reset') {
          this.valuesProcessed = [];
        } else {
          this.valuesProcessed.push(value);
        }
      }
    };

    const consumer = new CustomConsumer();

    of('old', 'old', 'reset', 'new', 'new').subscribe(consumer);

    expect(JSON.stringify(consumer.valuesProcessed) === JSON.stringify(['new', 'new'])).assertFalse(); //要改
    let startTime = new Date().getTime()
    for (let index = 0; index < BASE_COUNT; index++) {
      new CustomConsumer();
    }
    endTime(startTime, 'should_close_unsubscribe_and_unregister_all_finalizers_after_complete');
  });
}

function endTime(startTime: number, tag: string) {
  console.log(tag + ":startTime:" + startTime)
  let endTime: number = new Date().getTime();
  let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT)
  console.log(tag + ":endTime:" + endTime)
  console.log(tag + ":averageTime:" + averageTime + "μs");
}