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
import { BehaviorSubject, Subject, ObjectUnsubscribedError, of } from 'rxjs';
import { tap, mergeMapTo } from 'rxjs';
import { asInteropSubject } from '../helpers/interop-helper';
import { TestScheduler, RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { observableMatcher } from '../helpers/observableMatcher';
const BASE_COUNT: number = 2000;
/** @test {BehaviorSubject} */
export default function behaviorSubjectTest() {
  describe('BehaviorSubject', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
      testScheduler = new TestScheduler(observableMatcher);
    });

    it('should_extend_Subject', 0, () => {
      const subject: ESObject = new BehaviorSubject<ESObject>(null);
      expect(subject instanceof Subject).assertTrue();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject
      }
      endTime(startTime, 'should_extend_Subject');
    });

    it('should_throw_if_it_has_received_an_error_and_getValue_is_called', 0, () => {
      const subject: ESObject = new BehaviorSubject<ESObject>(null);
      subject.error(new Error('derp'));
      expect(() => {
        subject.getValue();
      }).assertThrowError('derp');

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        expect(() => {
          subject.getValue();
        }).assertThrowError('derp');
      }
      endTime(startTime, 'should_throw_if_it_has_received_an_error_and_getValue_is_called');
    });

    it('should_throw_an_ObjectUnsubscribedError_if_getValue_is_called_and_the_BehaviorSubject_has_been_unsubscribed', 0, () => {
      const subject = new BehaviorSubject('hi there');
      subject.unsubscribe();
      let error: ESObject = null;
      try {
        subject.getValue();
      } catch (err) {
        error = err;
      }
      expect(error != null && error instanceof ObjectUnsubscribedError).assertTrue()

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.unsubscribe();
      }
      endTime(startTime, 'should_throw_an_ObjectUnsubscribedError_if_getValue_is_called_and_the_BehaviorSubject_has_been_unsubscribed');
    });

    it('should_have_a_getValue_method_to_retrieve_the_current_value', 0, () => {
      const subject = new BehaviorSubject('staltz');
      expect(subject.getValue()).assertEqual('staltz');

      subject.next('oj');

      expect(subject.getValue()).assertEqual('oj');

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.next('oj');
      }
      endTime(startTime, 'should_have_a_getValue_method_to_retrieve_the_current_value');
    });

    it('should_not_allow_you_to_set_value_directly', 0, () => {
      const subject = new BehaviorSubject('flibberty');

      try {
        // XXX: escape from readonly restriction for testing.
        (subject as ESObject).value = 'jibbets';
      } catch (e) {
        //noop
      }

      expect(subject.getValue()).assertEqual('flibberty');
      expect(subject.value).assertEqual('flibberty');
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.value
      }
      endTime(startTime, 'should_not_allow_you_to_set_value_directly');
    });

    it('should_still_allow_you_to_retrieve_the_value_from_the_value_property', 0, () => {
      const subject = new BehaviorSubject('fuzzy');
      expect(subject.value).assertEqual('fuzzy');
      subject.next('bunny');
      expect(subject.value).assertEqual('bunny');
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.next('bunny');
      }
      endTime(startTime, 'should_still_allow_you_to_retrieve_the_value_from_the_value_property');
    });

    it('should_start_with_an_initialization_value', 0, (done: ESObject) => {
      const subject = new BehaviorSubject('foo');
      const expected = ['foo', 'bar'];
      let i = 0;

      subject.subscribe({
        next: (x: string) => {
          expect(x).assertEqual(expected[i++]);
        },
        complete: done,
      });

      subject.next('bar');
      subject.complete();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.next('bar');
      }
      endTime(startTime, 'should_start_with_an_initialization_value');
    });

    it('should_pump_values_to_multiple_subscribers', 0, (done: ESObject) => {
      const subject = new BehaviorSubject('init');
      const expected = ['init', 'foo', 'bar'];
      let i = 0;
      let j = 0;

      subject.subscribe((x: string) => {
        expect(x).assertEqual(expected[i++]);
      });

      subject.subscribe({
        next: (x: string) => {
          expect(x).assertEqual(expected[j++]);
        },
        complete: done,
      });

      expect(subject.observers.length).assertEqual(2);
      subject.next('foo');
      subject.next('bar');
      subject.complete();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.complete();
      }
      endTime(startTime, 'should_pump_values_to_multiple_subscribers');
    });

    it('should_not_pass_values_nexted_after_a_complete', 0, () => {
      const subject = new BehaviorSubject('init');
      const results: string[] = [];

      subject.subscribe((x: string) => {
        results.push(x);
      });
      expect(results).assertDeepEquals(['init']);

      subject.next('foo');
      expect(results).assertDeepEquals(['init', 'foo']);

      subject.complete();
      expect(results).assertDeepEquals(['init', 'foo']);

      subject.next('bar');
      expect(results).assertDeepEquals(['init', 'foo']);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.complete();
      }
      endTime(startTime, 'should_not_pass_values_nexted_after_a_complete');
    });

    it('should_clean_out_unsubscribed_subscribers', 0, (done: ESObject) => {
      const subject = new BehaviorSubject('init');

      const sub1 = subject.subscribe((x: string) => {
        expect(x).assertEqual('init');
      });

      const sub2 = subject.subscribe((x: string) => {
        expect(x).assertEqual('init');
      });

      expect(subject.observers.length).assertEqual(2);
      sub1.unsubscribe();
      expect(subject.observers.length).assertEqual(1);
      sub2.unsubscribe();
      expect(subject.observers.length).assertEqual(0);
      done();
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sub2.unsubscribe();
      }
      endTime(startTime, 'should_clean_out_unsubscribed_subscribers');
    });

    it('should_replay_the_previous_value_when_subscribed', 0, () => {
      testScheduler.run((helpers: RunHelpers) => {
        let hot = helpers.hot
        let expectObservable = helpers.expectObservable
        const behaviorSubject = new BehaviorSubject('0');

        let feedNextIntoSubject = (x: string) => {
          behaviorSubject.next(x);
        }

        let feedErrorIntoSubject = (err: ESObject) => {
          behaviorSubject.error(err);
        }

        let feedCompleteIntoSubject = () => {
          behaviorSubject.complete();
        }

        const sourceTemplate = ' -1-2-3----4------5-6---7--8----9--|';
        const subscriber1 = hot('------(a|)                         ').pipe(mergeMapTo(behaviorSubject));
        const unsub1 = '         ---------------------!             ';
        const expected1 = '      ------3---4------5-6--             ';
        const subscriber2 = hot('------------(b|)                   ').pipe(mergeMapTo(behaviorSubject));
        const unsub2 = '         -------------------------!         ';
        const expected2 = '      ------------4----5-6---7--         ';
        const subscriber3 = hot('---------------------------(c|)    ').pipe(mergeMapTo(behaviorSubject));
        const expected3 = '      ---------------------------8---9--|';

        expectObservable(
          hot(sourceTemplate)
            .pipe(tap({
              next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
            }))
        ).toBe(sourceTemplate);
        expectObservable(subscriber1, unsub1).toBe(expected1);
        expectObservable(subscriber2, unsub2).toBe(expected2);
        expectObservable(subscriber3).toBe(expected3);

        let startTime = new Date().getTime()
        for (let index = 0; index < BASE_COUNT; index++) {
          expectObservable(subscriber3).toBe(expected3);
        }
        endTime(startTime, 'should_replay_the_previous_value_when_subscribed');
      });
    });

    it('should_emit_complete_when_subscribed_after_completed', 0, () => {
      testScheduler.run((helpers: RunHelpers) => {
        let hot = helpers.hot
        let expectObservable = helpers.expectObservable
        const behaviorSubject = new BehaviorSubject('0');

        let feedNextIntoSubject = (x: string) => {
          behaviorSubject.next(x);
        }

        let feedErrorIntoSubject = (err: ESObject) => {
          behaviorSubject.error(err);
        }

        let feedCompleteIntoSubject = () => {
          behaviorSubject.complete();
        }

        const sourceTemplate = ' -1-2-3--4--|       ';
        const subscriber1 = hot('---------------(a|)').pipe(mergeMapTo(behaviorSubject));
        const expected1 = '      ---------------|   ';

        expectObservable(
          hot(sourceTemplate)
            .pipe(tap({
              next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
            }))
        ).toBe(sourceTemplate);
        expectObservable(subscriber1).toBe(expected1);
        let startTime = new Date().getTime()
        for (let index = 0; index < BASE_COUNT; index++) {
          expectObservable(subscriber1).toBe(expected1);
        }
        endTime(startTime, 'should_emit_complete_when_subscribed_after_completed');
      });
    });

    it('should_be_an_Observer_which_can_be_given_to_Observable_subscribe', 0, (done: ESObject) => {
      const source = of(1, 2, 3, 4, 5);
      const subject = new BehaviorSubject(0);
      const expected = [0, 1, 2, 3, 4, 5];

      subject.subscribe({
        next: (x: number) => {
          expect(x).assertEqual(expected.shift());
        },
        error: (x: ESObject) => {
          done(new Error('should not be called'));
        },
        complete: () => {
          expect(subject.value).assertEqual(5);
          done();
        },
      });

      source.subscribe(subject);
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        source.subscribe(subject);
      }
      endTime(startTime, 'should_be_an_Observer_which_can_be_given_to_Observable_subscribe');
    });

    it('should_be_an_Observer_which_can_be_given_to_an_interop_source', 0, (done: ESObject) => {
      // This test reproduces a bug reported in this issue:
      // https://github.com/ReactiveX/rxjs/issues/5105
      // However, it cannot easily be fixed. See this comment:
      // https://github.com/ReactiveX/rxjs/issues/5105#issuecomment-578405446
      const source = of(1, 2, 3, 4, 5);
      const subject = new BehaviorSubject(0);
      const expected = [0, 1, 2, 3, 4, 5];

      subject.subscribe({
        next: (x: number) => {
          expect(x).assertEqual(expected.shift());
        },
        error: (x: ESObject) => {
          done(new Error('should not be called'));
        },
        complete: () => {
          expect(subject.value).assertEqual(5);
          done();
        },
      });

      source.subscribe(asInteropSubject(subject));
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subject.subscribe();
      }
      endTime(startTime, 'should_be_an_Observer_which_can_be_given_to_an_interop_source');
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