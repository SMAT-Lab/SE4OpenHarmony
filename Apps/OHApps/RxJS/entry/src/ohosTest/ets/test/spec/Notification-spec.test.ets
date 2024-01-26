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
import { describe, expect, beforeEach, it } from '@ohos/hypium';
import { Notification, Subscriber } from 'rxjs';
import { TestScheduler, RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { observableMatcher } from '../spec/helpers/observableMatcher';
import { InstanceofNotFun, UndefinedFun } from './ArkTools';
const BASE_COUNT: number = 2000;
export default function NotificationTest() {
  /** @test {Notification} */
  describe('Notification', () => {
    let rxTestScheduler: TestScheduler;
    beforeEach(() => {
      rxTestScheduler = new TestScheduler(observableMatcher);
    });

    it('should_exist', 0, () => {
      let result1 = UndefinedFun()
      let result2 = InstanceofNotFun()
      expect(result1).assertTrue();
      expect(result2).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        InstanceofNotFun()
      }
      endTime(startTime, 'should_not_allow_convert_to_observable_if_given_kind_is_unknown');
    });

    it('should_not_allow_convert_to_observable_if_given_kind_is_unknown', 0, () => {
      let error: ESObject = null;
      const n: ESObject = new Notification<ESObject>('x' as ESObject);
      try {
        n.toObservable()
      } catch (err) {
        error = err;
      }
      expect(error != null).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        new Notification<ESObject>('x' as ESObject);
      }
      endTime(startTime, 'should_not_allow_convert_to_observable_if_given_kind_is_unknown');
    });

    it('createNext_should_return_a_Notification', 0, () => {
      const n = Notification.createNext('test');
      expect(n instanceof Notification).assertTrue();
      expect(n.value).assertEqual('test');
      expect(n.kind).assertEqual('N');
      expect(n.error).assertUndefined();
      expect(n.hasValue).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext('test');
      }
      endTime(startTime, 'createNext_should_return_a_Notification');
    });


    it('createError_should_return_a_Notification', 0, () => {
      const n = Notification.createError('test');
      expect(n instanceof Notification).assertTrue();
      expect(n.value).assertUndefined();
      expect(n.kind).assertEqual('E');
      expect(n.error).assertEqual('test');
      expect(n.hasValue).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError('test');
      }
      endTime(startTime, 'createError_should_return_a_Notification');
    });


    it('createComplete_should_return_a_Notification', 0, () => {
      const n = Notification.createComplete();
      expect(n instanceof Notification).assertTrue();
      expect(n.value).assertUndefined();
      expect(n.kind).assertEqual('C');
      expect(n.error).assertUndefined();
      expect(n.hasValue).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createComplete();
      }
      endTime(startTime, 'createComplete_should_return_a_Notification');
    });


    it('toObservable_should_create_observable_from_a_next_Notification', 0, () => {
      rxTestScheduler.run((helpers: RunHelpers) => {
        let expectObservable = helpers.expectObservable
        const value = 'a';
        const next = Notification.createNext(value);
        expectObservable(next.toObservable()).toBe('(a|)');
        let startTime = new Date().getTime()
        for (let index = 0; index < BASE_COUNT; index++) {
          Notification.createNext(value);
        }
        endTime(startTime, 'toObservable_should_create_observable_from_a_next_Notification');
      });
    });

    it('toObservable_should_create_observable_from_a_complete_Notification', 0, () => {
      rxTestScheduler.run((helpers: RunHelpers) => {
        let expectObservable = helpers.expectObservable
        const complete = Notification.createComplete();
        expectObservable(complete.toObservable()).toBe('|');
        let startTime = new Date().getTime()
        for (let index = 0; index < BASE_COUNT; index++) {
          Notification.createComplete();
        }
        endTime(startTime, 'toObservable_should_create_observable_from_a_complete_Notification');
      });
    });

    it('toObservable_should_create_observable_from_a_error_Notification', 0, () => {
      rxTestScheduler.run((helpers: RunHelpers) => {
        let expectObservable = helpers.expectObservable
        const error = Notification.createError('error');
        expectObservable(error.toObservable()).toBe('#');
        let startTime = new Date().getTime()
        for (let index = 0; index < BASE_COUNT; index++) {
          Notification.createError('error');
        }
        endTime(startTime, 'toObservable_should_create_observable_from_a_error_Notification');
      });
    });

    it('static_reference_should_create_new_next_Notification_with_value', 0, () => {
      const value = 'a';
      const first = Notification.createNext(value);
      const second = Notification.createNext(value);

      expect(first === second).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext(value);
      }
      endTime(startTime, 'static_reference_should_create_new_next_Notification_with_value');
    });

    it('static_reference_should_create_new_error_Notification', 0, () => {
      const first = Notification.createError();
      const second = Notification.createError();

      expect(first === second).assertFalse();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError();
      }
      endTime(startTime, 'static_reference_should_create_new_error_Notification');
    });

    it('static_reference_should_return_static_complete_Notification_reference', 0, () => {
      const first = Notification.createComplete();
      const second = Notification.createComplete();

      expect(first).assertEqual(second);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createComplete();
      }
      endTime(startTime, 'static_reference_should_return_static_complete_Notification_reference');
    });

    it('do_should_invoke_on_next', 0, () => {
      const n = Notification.createNext('a');
      let invoked = false;
      n.do(
        () => {
          invoked = true;
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        }
      );

      expect(invoked).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext('a');
      }
      endTime(startTime, 'do_should_invoke_on_next');
    });

    it('do_should_invoke_on_error', 0, () => {
      const n = Notification.createError();
      let invoked = false;
      n.do(
        () => {
          throw new Error('should not be called');
        },
        () => {
          invoked = true;
        },
        () => {
          throw new Error('should not be called');
        }
      );

      expect(invoked).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError();
      }
      endTime(startTime, 'do_should_invoke_on_error');
    });

    it('do_should_invoke_on_complete', 0, () => {
      const n = Notification.createComplete();
      let invoked = false;
      n.do(
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          invoked = true;
        }
      );

      expect(invoked).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createComplete();
      }
      endTime(startTime, 'do_should_invoke_on_complete');
    });


    it('accept_should_accept_observer_for_next_Notification', 0, () => {
      const value = 'a';
      let observed = false;
      const n = Notification.createNext(value);
      const observer = Subscriber.create(
        (x?: string) => {
          expect(x).assertEqual(value);
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        }
      );

      n.accept(observer);
      expect(observed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext(value);
      }
      endTime(startTime, 'accept_should_accept_observer_for_next_Notification');
    });

    it('accept_should_accept_observer_for_error_Notification', 0, () => {
      let observed = false;
      const n = Notification.createError();
      const observer: ESObject = Subscriber.create(
        () => {
          throw new Error('should not be called');
        },
        () => {
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        }
      );

      n.accept(observer);
      expect(observed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError();
      }
      endTime(startTime, 'accept_should_accept_observer_for_error_Notification');
    });

    it('accept_should_accept_observer_for_complete_Notification', 0, () => {
      let observed = false;
      const n = Notification.createComplete();
      const observer: ESObject = Subscriber.create(
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          observed = true;
        }
      );

      n.accept(observer);
      expect(observed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        n.accept(observer);
      }
      endTime(startTime, 'accept_should_accept_observer_for_complete_Notification');
    });

    it('accept_should_accept_function_for_next_Notification', 0, () => {
      const value = 'a';
      let observed = false;
      const n = Notification.createNext(value);

      n.accept(
        (x: string) => {
          expect(x).assertEqual(value);
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        }
      );
      expect(observed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext(value);
      }
      endTime(startTime, 'accept_should_accept_function_for_next_Notification');
    });

    it('accept_should_accept_function_for_error_Notification', 0, () => {
      let observed = false;
      const error = 'error';
      const n = Notification.createError(error);

      n.accept(
        () => {
          throw new Error('should not be called');
        },
        (err: ESObject) => {
          expect(err).assertEqual(error);
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        }
      );
      expect(observed).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError(error);
      }
      endTime(startTime, 'accept_should_accept_function_for_error_Notification');
    });

    it('accept_should_accept_function_for_complete_Notification', 0, () => {
      let observed = false;
      const n = Notification.createComplete();

      n.accept(
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          observed = true;
        }
      );
      expect(observed).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createComplete();
      }
      endTime(startTime, 'accept_should_accept_function_for_complete_Notification');
    });


    it('observe_should_observe_for_next_Notification', 0, () => {
      const value = 'a';
      let observed = false;
      const n = Notification.createNext(value);
      const observer = Subscriber.create(
        (x?: string) => {
          expect(x).assertEqual(value);
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        }
      );

      n.observe(observer);
      expect(observed).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createNext(value);
      }
      endTime(startTime, 'observe_should_observe_for_next_Notification');
    });

    it('observe_should_observe_for_error_Notification', 0, () => {
      let observed = false;
      const n = Notification.createError();
      const observer: ESObject = Subscriber.create(
        () => {
          throw new Error('should not be called');
        },
        () => {
          observed = true;
        },
        () => {
          throw new Error('should not be called');
        }
      );

      n.observe(observer);
      expect(observed).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Notification.createError();
      }
      endTime(startTime, 'observe_should_observe_for_error_Notification');
    });

    it('observe_should_observe_for_complete_Notification', 0, () => {
      let observed = false;
      const n = Notification.createComplete();
      const observer: ESObject = Subscriber.create(
        () => {
          throw new Error('should not be called');
        },
        () => {
          throw new Error('should not be called');
        },
        () => {
          observed = true;
        }
      );

      n.observe(observer);
      expect(observed).assertTrue();

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Subscriber.create();
      }
      endTime(startTime, 'observe_should_observe_for_complete_Notification');
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