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
/** @prettier */
import { config } from 'rxjs';
import { expect, describe, it, afterEach } from '@ohos/hypium';
import { Observable } from 'rxjs';
import { timeoutProvider } from 'rxjs/internal/scheduler/timeoutProvider';
const BASE_COUNT: number = 2000;
export default function configTest() {
  describe('config', () => {
    it('should_have_a_Promise_property_that_defaults_to_nothing', 0, () => {
      expect(config.Promise).assertUndefined();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        config.Promise
      }
      endTime(startTime, 'should_have_a_Promise_property_that_defaults_to_nothing');
    });
  });

  describe('onUnhandledError', () => {
    afterEach(() => {
      config.onUnhandledError = null;
    });

    it('should_default_to_null', 0, () => {
      expect(config.onUnhandledError).assertNull();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        config.onUnhandledError
      }
      endTime(startTime, 'should_default_to_null');
    });

    it('should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_observer', 0, () => {
      let called = false;
      const results: ESObject[] = [];

      config.onUnhandledError = (err: ESObject) => {
        called = true;
        expect(err).assertEqual('bad');
      };

      const source = new Observable<number>((subscriber) => {
        subscriber.next(1);
        subscriber.error('bad');
      });

      source.subscribe({
        next: (value) => results.push(value),
      });
      expect(called).assertFalse();
      expect(results.length).assertEqual(1);
      expect(results[0]).assertEqual(1);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Observable<number>((subscriber) => {
          subscriber.next(1);
          subscriber.error('bad');
        });
      }
      endTime(startTime, 'should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_observer');
    });

    it('should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_next_callback', 0, () => {
      let called = false;
      const results: ESObject[] = [];

      config.onUnhandledError = (err: ESObject) => {
        called = true;
        expect(err).assertEqual('bad');

      };

      const source = new Observable<number>((subscriber) => {
        subscriber.next(1);
        subscriber.error('bad');
      });

      source.subscribe((value) => results.push(value));
      expect(called).assertFalse();
      expect(results.length).assertEqual(1);
      expect(results[0]).assertEqual(1);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Observable<number>((subscriber) => {
          subscriber.next(1);
          subscriber.error('bad');
        });
      }
      endTime(startTime, 'should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_next_callback');
    });

    it('should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_in_the_empty_case', 0, () => {
      let called = false;
      config.onUnhandledError = (err: ESObject) => {
        called = true;
        expect(err).assertEqual('bad');

      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.error('bad');
      });

      source.subscribe();
      expect(called).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Observable<ESObject>((subscriber: ESObject) => {
          subscriber.error('bad');
        });
      }
      endTime(startTime, 'should_call_asynchronously_if_an_error_is_emitted_and_not_handled_by_the_consumer_in_the_empty_case');
    });

    /**
     * This test is added so people know this behavior is _intentional_. It's part of the contract of observables
     * and, while I'm not sure I like it, it might start surfacing untold numbers of errors, and break
     * node applications if we suddenly changed this to start throwing errors on other jobs for instances
     * where users accidentally called `subscriber.error` twice. Likewise, would we report an error
     * for two calls of `complete`? This is really something a build-time tool like a linter should
     * capture. Not a run time error reporting event.
     */
    it('should_not_be_called_if_two_errors_are_sent_to_the_subscriber', 0, () => {
      let called = false;
      config.onUnhandledError = () => {
        called = true;
      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.error('handled');
        subscriber.error('swallowed');
      });

      let syncSentError: ESObject;
      source.subscribe({
        error: (err: ESObject) => {
          syncSentError = err;
        },
      });

      expect(syncSentError).assertEqual('handled');
      // When called, onUnhandledError is called on a timeout, so delay the
      // the assertion of the expectation until after the point at which
      // onUnhandledError would have been called.
      timeoutProvider.setTimeout(() => {
        expect(called).assertFalse();
      }, 0);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        source.subscribe({
          error: (err: ESObject) => {
            syncSentError = err;
          },
        });
      }
      endTime(startTime, 'should_not_be_called_if_two_errors_are_sent_to_the_subscriber');
    });
  });

  describe('onStoppedNotification', () => {
    afterEach(() => {
      config.onStoppedNotification = null;
    });

    it('should_default_to_null', 0, () => {
      expect(config.onStoppedNotification).assertNull();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        config.onStoppedNotification
      }
      endTime(startTime, 'should_default_to_null');
    });

    it('should_be_called_asynchronously_if_a_subscription_setup_errors_after_the_subscription_is_closed_by_an_error', 0, () => {
      let called = false;
      config.onStoppedNotification = (notification) => {
        called = true;
        expect(notification.kind).assertEqual('E');
        expect(notification['error']).assertEqual('bad');

      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.error('handled');
        throw new Error('bad');
      });

      let syncSentError: ESObject;
      source.subscribe({
        error: (err: ESObject) => {
          syncSentError = err;
        },
      });

      expect(syncSentError).assertEqual('handled');
      expect(called).assertFalse();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        source.subscribe({
          error: (err: ESObject) => {
            syncSentError = err;
          },
        });
      }
      endTime(startTime, 'should_be_called_asynchronously_if_a_subscription_setup_errors_after_the_subscription_is_closed_by_an_error');
    });

    it('should_be_called_asynchronously_if_a_subscription_setup_errors_after_the_subscription_is_closed_by_a_completion', 0, () => {
      let called = false;
      let completed = false;
      config.onStoppedNotification = (notification) => {
        called = true;
        expect(notification.kind).assertEqual('E');
        expect(notification['error']).assertEqual('bad');

      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.complete();
        throw new Error('bad');
      });

      source.subscribe({
        error: () => {
          throw new Error('should not be called');
        },
        complete: () => {
          completed = true;
        },
      });

      expect(completed).assertTrue();
      expect(called).assertFalse();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        source.subscribe({
          error: () => {
            throw new Error('should not be called');
          },
          complete: () => {
            completed = true;
          },
        });
      }
      endTime(startTime, 'should_be_called_asynchronously_if_a_subscription_setup_errors_after_the_subscription_is_closed_by_a_completion');
    });

    it('should_be_called_if_a_next_is_sent_to_the_stopped_subscriber', 0, () => {
      let called = false;
      config.onStoppedNotification = (notification) => {
        called = true;
        expect(notification.kind).assertEqual('N');
        expect(notification['value']).assertEqual(2);

      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.next(1);
        subscriber.complete();
        subscriber.next(2);
      });

      let syncSentValue: ESObject;
      source.subscribe({
        next: (value: ESObject) => {
          syncSentValue = value;
        },
      });

      expect(syncSentValue).assertEqual(1);
      expect(called).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        source.subscribe({
          next: (value: ESObject) => {
            syncSentValue = value;
          },
        });
      }
      endTime(startTime, 'should_be_called_if_a_next_is_sent_to_the_stopped_subscriber');
    });

    it('should_be_called_if_two_errors_are_sent_to_the_subscriber', 0, () => {
      let called = false;
      config.onStoppedNotification = (notification) => {
        called = true;
        expect(notification.kind).assertEqual('E');
        expect(notification['error']).assertEqual('swallowed');


      };

      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.error('handled');
        subscriber.error('swallowed');
      });

      let syncSentError: ESObject;
      source.subscribe({
        error: (err: ESObject) => {
          syncSentError = err;
        },
      });

      expect(syncSentError).assertEqual('handled');
      expect(called).assertFalse();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Observable<ESObject>((subscriber: ESObject) => {
          subscriber.error('handled');
          subscriber.error('swallowed');
        })
      }
      endTime(startTime, 'should_be_called_if_two_errors_are_sent_to_the_subscriber');
    });

    it('should_be_called_if_two_completes_are_sent_to_the_subscriber', 0, () => {
      let called = false;
      config.onStoppedNotification = (notification) => {
        called = true;
        expect(notification.kind).assertEqual('C');

      };
      const source: ESObject = new Observable<ESObject>((subscriber: ESObject) => {
        subscriber.complete();
        subscriber.complete();
      });
      source.subscribe();
      expect(called).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Observable<ESObject>((subscriber: ESObject) => {
          subscriber.complete();
          subscriber.complete();
        })
      }
      endTime(startTime, 'should_be_called_if_two_completes_are_sent_to_the_subscriber');
    });
  });

}

function endTime(startTime: number, tag: string) {
  console.log(tag + ":startTime:" + startTime)
  let endTime: number = new Date().getTime();
  let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT)
  console.log(tag + ":endTime:" + endTime)
  console.log(tag + ":averageTime:" + averageTime + "μs");
}