let __generate__Id: number = 0;
function generateId(): string {
    return "Subject-spec.test_" + ++__generate__Id;
}
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
import { Subject, ObjectUnsubscribedError, Observable, AsyncSubject, Observer, of, config, throwError, concat } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs';
import { TestScheduler, RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { observableMatcher } from './helpers/observableMatcher';
import { InstanceofFun, ObjFun } from './ArkTools';
const BASE_COUNT: number = 2000;
export default function subjectTest() {
    /** @test {Subject} */
    describe('Subject', () => {
        let rxTestScheduler: TestScheduler;
        beforeEach(() => {
            rxTestScheduler = new TestScheduler(observableMatcher);
        });
        it('should_allow_next_with_undefined_or_any_when_created_with_no_type', 0, (done: any) => {
            const subject: any = new Subject<any>();
            subject.subscribe({
                next: (x: any) => {
                    expect(x).assertUndefined();
                }, complete: done
            });
            const data: any = undefined;
            subject.next(undefined);
            subject.next(data);
            subject.complete();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(undefined);
            }
            endTime(startTime, 'should_allow_next_with_undefined_or_any_when_created_with_no_type');
        });
        it('should_allow_empty_next_when_created_with_void_type', 0, (done: any) => {
            const subject = new Subject<void>();
            subject.subscribe({
                next: (x) => {
                    expect(x).assertUndefined();
                }, complete: done
            });
            subject.next();
            subject.complete();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.complete();
            }
            endTime(startTime, 'should_allow_empty_next_when_created_with_void_type');
        });
        it('should_pump_values_right_on_through_itself', 0, (done: any) => {
            const subject = new Subject<string>();
            const expected = ['foo', 'bar'];
            subject.subscribe({
                next: (x: string) => {
                    expect(x).assertEqual(expected.shift());
                }, complete: done
            });
            subject.next('foo');
            subject.next('bar');
            subject.complete();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subject<string>();
            }
            endTime(startTime, 'should_pump_values_right_on_through_itself');
        });
        it('should_pump_values_to_multiple_subscribers', 0, (done: any) => {
            const subject = new Subject<string>();
            const expected = ['foo', 'bar'];
            let i = 0;
            let j = 0;
            subject.subscribe((x) => {
                expect(x).assertEqual(expected[i++]);
            });
            subject.subscribe({
                next: (x) => {
                    expect(x).assertEqual(expected[j++]);
                }, complete: done
            });
            expect(subject.observers.length).assertEqual(2);
            subject.next('foo');
            subject.next('bar');
            subject.complete();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subject<string>();
            }
            endTime(startTime, 'should_pump_values_to_multiple_subscribers');
        });
        it('should_handle_subscribers_that_arrive_and_leave_t_different_times_subject_does_not_complete', 0, () => {
            const subject = new Subject<number>();
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.next(4);
            const subscription1 = subject.subscribe({
                next: (x) => {
                    results1.push(x);
                }, error: () => {
                    results1.push('E');
                }, complete: () => {
                    results1.push('C');
                }
            });
            subject.next(5);
            const subscription2 = subject.subscribe({
                next: (x) => {
                    results2.push(x);
                }, error: () => {
                    results2.push('E');
                }, complete: () => {
                    results2.push('C');
                }
            });
            subject.next(6);
            subject.next(7);
            subscription1.unsubscribe();
            subject.next(8);
            subscription2.unsubscribe();
            subject.next(9);
            subject.next(10);
            const subscription3 = subject.subscribe({
                next: (x) => {
                    results3.push(x);
                }, error: () => {
                    results3.push('E');
                }, complete: () => {
                    results3.push('C');
                }
            });
            subject.next(11);
            subscription3.unsubscribe();
            expect(results1).assertDeepEquals([5, 6, 7]);
            expect(results2).assertDeepEquals([6, 7, 8]);
            expect(results3).assertDeepEquals([11]);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(10);
            }
            endTime(startTime, 'should_handle_subscribers_that_arrive_and_leave_t_different_times_subject_does_not_complete');
        });
        it('should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_completes', 0, () => {
            const subject = new Subject<number>();
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.next(4);
            const subscription1 = subject.subscribe({
                next: (x) => {
                    results1.push(x);
                }, error: () => {
                    results1.push('E');
                }, complete: () => {
                    results1.push('C');
                }
            });
            subject.next(5);
            const subscription2 = subject.subscribe({
                next: (x) => {
                    results2.push(x);
                }, error: () => {
                    results2.push('E');
                }, complete: () => {
                    results2.push('C');
                }
            });
            subject.next(6);
            subject.next(7);
            subscription1.unsubscribe();
            subject.complete();
            subscription2.unsubscribe();
            const subscription3 = subject.subscribe({
                next: (x) => {
                    results3.push(x);
                }, error: () => {
                    results3.push('E');
                }, complete: () => {
                    results3.push('C');
                }
            });
            subscription3.unsubscribe();
            expect(results1).assertDeepEquals([5, 6, 7]);
            expect(results2).assertDeepEquals([6, 7, 'C']);
            expect(results3).assertDeepEquals(['C']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(7);
            }
            endTime(startTime, 'should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_completes');
        });
        it('should_handle_subscribers_that_arrive_and_leave_at_different_imes_subject_terminates_with_an_error', 0, () => {
            const subject = new Subject<number>();
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.next(4);
            const subscription1 = subject.subscribe({
                next: (x) => {
                    results1.push(x);
                }, error: () => {
                    results1.push('E');
                }, complete: () => {
                    results1.push('C');
                }
            });
            subject.next(5);
            const subscription2 = subject.subscribe({
                next: (x) => {
                    results2.push(x);
                }, error: () => {
                    results2.push('E');
                }, complete: () => {
                    results2.push('C');
                }
            });
            subject.next(6);
            subject.next(7);
            subscription1.unsubscribe();
            subject.error(new Error('err'));
            subscription2.unsubscribe();
            const subscription3 = subject.subscribe({
                next: (x) => {
                    results3.push(x);
                }, error: () => {
                    results3.push('E');
                }, complete: () => {
                    results3.push('C');
                }
            });
            subscription3.unsubscribe();
            expect(results1).assertDeepEquals([5, 6, 7]);
            expect(results2).assertDeepEquals([6, 7, 'E']);
            expect(results3).assertDeepEquals(['E']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(7);
            }
            endTime(startTime, 'should_handle_subscribers_that_arrive_and_leave_at_different_imes_subject_terminates_with_an_error');
        });
        it('should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_completes_before_nexting_any_value', 0, () => {
            const subject = new Subject<number>();
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            const subscription1 = subject.subscribe({
                next: (x) => {
                    results1.push(x);
                }, error: () => {
                    results1.push('E');
                }, complete: () => {
                    results1.push('C');
                }
            });
            const subscription2 = subject.subscribe({
                next: (x) => {
                    results2.push(x);
                }, error: () => {
                    results2.push('E');
                }, complete: () => {
                    results2.push('C');
                }
            });
            subscription1.unsubscribe();
            subject.complete();
            subscription2.unsubscribe();
            const subscription3 = subject.subscribe({
                next: (x) => {
                    results3.push(x);
                }, error: () => {
                    results3.push('E');
                }, complete: () => {
                    results3.push('C');
                }
            });
            subscription3.unsubscribe();
            expect(results1).assertDeepEquals([]);
            expect(results2).assertDeepEquals(['C']);
            expect(results3).assertDeepEquals(['C']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.complete();
            }
            endTime(startTime, 'should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_completes_before_nexting_any_value');
        });
        it('should_disallow_new_subscriber_once_subject_has_been_disposed', 0, () => {
            const subject = new Subject<number>();
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            const subscription1 = subject.subscribe({
                next: (x) => {
                    results1.push(x);
                }, error: () => {
                    results1.push('E');
                }, complete: () => {
                    results1.push('C');
                }
            });
            subject.next(1);
            subject.next(2);
            const subscription2 = subject.subscribe({
                next: (x) => {
                    results2.push(x);
                }, error: () => {
                    results2.push('E');
                }, complete: () => {
                    results2.push('C');
                }
            });
            subject.next(3);
            subject.next(4);
            subject.next(5);
            subscription1.unsubscribe();
            subscription2.unsubscribe();
            subject.unsubscribe();
            let error: any = null;
            try {
                subject.subscribe({
                    next: (x) => {
                        results3.push(x);
                    }, error: () => {
                    }
                });
            }
            catch (err) {
                error = err;
            }
            expect(error != null && error instanceof ObjectUnsubscribedError).assertTrue();
            expect(results1).assertDeepEquals([1, 2, 3, 4, 5]);
            expect(results2).assertDeepEquals([3, 4, 5]);
            expect(results3.length == 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subject<number>();
            }
            endTime(startTime, 'should_disallow_new_subscriber_once_subject_has_been_disposed');
        });
        it('should_not_allow_values_to_be_nexted_after_it_is_unsubscribed', 0, (done: any) => {
            const subject = new Subject<string>();
            const expected = ['foo'];
            let err: any = null;
            subject.subscribe((x) => {
                expect(x).assertEqual(expected.shift());
            });
            subject.next('foo');
            subject.unsubscribe();
            try {
                subject.next('bar');
            }
            catch (e) {
                err = e;
            }
            expect(err != null && err instanceof ObjectUnsubscribedError).assertTrue();
            done();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.unsubscribe();
            }
            endTime(startTime, 'should_not_allow_values_to_be_nexted_after_it_is_unsubscribed');
        });
        it('should_clean_out_unsubscribed_subscribers', 0, (done: any) => {
            const subject: any = new Subject<any>();
            const sub1: any = subject.subscribe(() => {
                //noop
            });
            const sub2: any = subject.subscribe(() => {
                //noop
            });
            expect(subject.observers.length).assertEqual(2);
            sub1.unsubscribe();
            expect(subject.observers.length).assertEqual(1);
            sub2.unsubscribe();
            expect(subject.observers.length).assertEqual(0);
            done();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.subscribe(() => { });
            }
            endTime(startTime, 'should_clean_out_unsubscribed_subscribers');
        });
        it('should_expose_observed_status', 0, () => {
            const subject: any = new Subject<any>();
            expect(subject.observed).assertEqual(false);
            const sub1: any = subject.subscribe(() => {
                //noop
            });
            expect(subject.observed).assertEqual(true);
            const sub2: any = subject.subscribe(() => {
                //noop
            });
            expect(subject.observed).assertTrue();
            sub1.unsubscribe();
            expect(subject.observed).assertTrue();
            sub2.unsubscribe();
            expect(subject.observed).assertFalse();
            subject.unsubscribe();
            expect(subject.observed).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.observed;
            }
            endTime(startTime, 'should_expose_observed_status');
        });
        it('should_have_a_static_create_function_that_works', 0, () => {
            expect(Subject.create instanceof Function).assertTrue();
            const source = of(1, 2, 3, 4, 5);
            const nexts: number[] = [];
            const output: number[] = [];
            let error: any;
            let complete = false;
            let outputComplete = false;
            const destination: any = ObjFun(nexts, error, complete);
            const sub: Subject<any> = Subject.create(destination, source);
            sub.subscribe({
                next: (x: number) => {
                    output.push(x);
                },
                complete: () => {
                    outputComplete = true;
                    complete = true;
                }
            });
            sub.next('a');
            sub.next('b');
            sub.next('c');
            sub.complete();
            expect(nexts).assertDeepEquals(['a', 'b', 'c']);
            expect(complete).assertTrue();
            expect(error).assertUndefined();
            expect(output).assertDeepEquals([1, 2, 3, 4, 5]);
            expect(outputComplete).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                sub.next('c');
            }
            endTime(startTime, 'should_have_a_static_create_function_that_works');
        });
        it('should_have_a_tatic_create_function_tha_works_also_to_raise_rrors', 0, () => {
            expect(Subject.create instanceof Function).assertTrue();
            const source = of(1, 2, 3, 4, 5);
            const nexts: number[] = [];
            const output: number[] = [];
            let error: any = 'boom';
            let complete = false;
            let outputComplete = false;
            const destination = ObjFun(nexts, error, complete);
            const sub: Subject<any> = Subject.create(destination, source);
            sub.subscribe({
                next: (x: number) => {
                    output.push(x);
                },
                complete: () => {
                    outputComplete = true;
                },
                error: (x: any) => {
                    error = x;
                }
            });
            sub.next('a');
            sub.next('b');
            sub.next('c');
            sub.error('boom');
            expect(nexts).assertDeepEquals(['a', 'b', 'c']);
            expect(complete).assertFalse();
            expect(error).assertEqual('boom');
            expect(output).assertDeepEquals([1, 2, 3, 4, 5]);
            expect(outputComplete).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                sub.error('boom');
            }
            endTime(startTime, 'should_have_a_tatic_create_function_tha_works_also_to_raise_rrors');
        });
        it('should_be_an_Observer_ich_can_be_given_to_Observable_subscribe', 0, (done: any) => {
            const source = of(1, 2, 3, 4, 5);
            const subject = new Subject<number>();
            const expected = [1, 2, 3, 4, 5];
            subject.subscribe({
                next: (x) => {
                    expect(x).assertEqual(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            source.subscribe(subject);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe(subject);
            }
            endTime(startTime, 'should_be_an_Observer_ich_can_be_given_to_Observable_subscribe');
        });
        it('should_be_usable_as_an_Observer_of_a_finite_delayed_Observable', 0, (done: any) => {
            const source = of(1, 2, 3).pipe(delay(50));
            const subject = new Subject<number>();
            const expected = [1, 2, 3];
            subject.subscribe({
                next: (x) => {
                    expect(x).assertEqual(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            source.subscribe(subject);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe(subject);
            }
            endTime(startTime, 'should_be_usable_as_an_Observer_of_a_finite_delayed_Observable');
        });
        it('should_throw_ObjectUnsubscribedError_when_emit_after_unsubscribed', 0, () => {
            const subject = new Subject<string>();
            subject.unsubscribe();
            let err1: any = null;
            let err2: any = null;
            let err3: any = null;
            try {
                subject.next('a');
            }
            catch (e) {
                err1 = e;
            }
            expect(err1 != null && err1 instanceof ObjectUnsubscribedError).assertTrue();
            try {
                subject.error('a');
            }
            catch (e) {
                err2 = e;
            }
            expect(err2 != null && err2 instanceof ObjectUnsubscribedError).assertTrue();
            try {
                subject.complete();
            }
            catch (e) {
                err3 = e;
            }
            expect(err3 != null && err3 instanceof ObjectUnsubscribedError).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.unsubscribe();
            }
            endTime(startTime, 'should_throw_ObjectUnsubscribedError_when_emit_after_unsubscribed');
        });
        it('should_not_next_after_completed', 0, () => {
            const subject = new Subject<string>();
            const results: string[] = [];
            subject.subscribe({
                next: (x) => results.push(x), complete: () => results.push('C')
            });
            subject.next('a');
            subject.complete();
            subject.next('b');
            expect(results).assertDeepEquals(['a', 'C']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next('b');
            }
            endTime(startTime, 'should_not_next_after_completed');
        });
        it('should_not_next_after_error', 0, () => {
            const error = new Error('wut?');
            const subject = new Subject<string>();
            const results: string[] = [];
            subject.subscribe({
                next: (x) => results.push(x), error: (err: any) => results.push(err)
            });
            subject.next('a');
            subject.error(error);
            subject.next('b');
            expect(results).assertDeepEquals(['a', error]);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next('b');
            }
            endTime(startTime, 'should_not_next_after_error');
        });
        it('should_hide_subject', 0, () => {
            const subject: any = new Subject<any>();
            const observable: any = subject.asObservable();
            expect(JSON.stringify(subject) === JSON.stringify(observable)).assertFalse(); //要改
            expect(observable instanceof Observable).assertTrue();
            expect(observable instanceof Subject).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.asObservable();
            }
            endTime(startTime, 'should_hide_subject');
        });
        it('should_handle_subject_never_emits', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const observable = hot('-').asObservable();
                expectObservable(observable).toBe('-');
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    hot('-').asObservable();
                }
                endTime(startTime, 'should_handle_subject_completes_without_emits');
            });
        });
        it('should_handle_subject_completes_without_emits', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const observable = hot('--^--|').asObservable();
                const expected = '        ---|';
                expectObservable(observable).toBe(expected);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    hot('--^--|').asObservable();
                }
                endTime(startTime, 'should_handle_subject_completes_without_emits');
            });
        });
        it('should_handle_subject_hrows', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const observable = hot('--^--#').asObservable();
                const expected = '        ---#';
                expectObservable(observable).toBe(expected);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    hot('--^--#').asObservable();
                }
                endTime(startTime, 'should_handle_subject_hrows');
            });
        });
        it('should_handle_subject_emits', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const observable = hot('--^--x--|').asObservable();
                const expected = '        ---x--|';
                expectObservable(observable).toBe(expected);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    hot('--^--x--|').asObservable();
                }
                endTime(startTime, 'should_handle_subject_emits');
            });
        });
        it('should_work_with_inherited_subject', 0, () => {
            const results: (number | string)[] = [];
            const subject = new AsyncSubject<number>();
            subject.next(42);
            subject.complete();
            const observable = subject.asObservable();
            observable.subscribe({
                next: (x) => results.push(x), complete: () => results.push('done')
            });
            expect(results).assertDeepEquals([42, 'done']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(42);
            }
            endTime(startTime, 'should_work_with_inherited_subject');
        });
    });
    describe('error_thrown_scenario', () => {
        afterEach(() => {
            config.onUnhandledError = null;
        });
        it('should_not_synchronously_error_when_exted_nto', 0, (done: any) => {
            config.onUnhandledError = (err: any) => {
                expect(err.message).assertDeepEquals('Boom!');
                done();
            };
            const source = new Subject<number>();
            source.subscribe();
            source.subscribe(() => {
                throw new Error('Boom!');
            });
            source.subscribe();
            try {
                source.next(42);
            }
            catch (err) {
                // This should not happen!
                expect(true).assertFalse();
            }
            expect(true).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.next(42);
            }
            endTime(startTime, 'should_not_synchronously_error_when_exted_nto');
        });
    });
    it('should_be_exposed', 0, () => {
        let result: any = InstanceofFun();
        expect(result).assertTrue();
        let startTime = new Date().getTime();
        for (let index = 0; index < BASE_COUNT; index++) {
            result;
        }
        endTime(startTime, 'should_not_be_ger');
    });
    it('should_not_be_ger', 0, () => {
        let subscribed = false;
        const subject: any = Subject.create(null, new Observable<any>((observer: Observer<any>) => {
            subscribed = true;
            const subscription = of('x').subscribe(observer);
            return () => {
                subscription.unsubscribe();
            };
        }));
        const observable: any = subject.asObservable();
        expect(subscribed).assertFalse();
        observable.subscribe();
        expect(subscribed).assertTrue();
        let startTime = new Date().getTime();
        for (let index = 0; index < BASE_COUNT; index++) {
            expect(() => {
                subject.asObservable();
            }).assertThrowError('bad');
        }
        endTime(startTime, 'should_not_be_ger');
    });
    describe('useDeprecatedSynchronousErrorHandling', () => {
        beforeEach(() => {
            config.useDeprecatedSynchronousErrorHandling = true;
        });
        afterEach(() => {
            config.useDeprecatedSynchronousErrorHandling = false;
        });
        it('should_throw_an_error_when_nexting_with_a_flattened_erroring_inner_observable', 0, () => {
            const subject = new Subject<string>();
            subject.pipe(mergeMap(() => throwError(() => new Error('bad')))).subscribe();
            expect(() => {
                subject.next('wee');
            }).assertThrowError('bad');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                expect(() => {
                    subject.next('wee');
                });
            }
            endTime(startTime, 'should_throw_an_error_when_nexting_with_a_flattened_erroring_inner_observable');
        });
        it('should_throw_an_error_when_nexting_with_flattened_erroring_inner_observable_with_more_than_one_operator', 0, () => {
            const subject = new Subject<string>();
            subject.pipe(mergeMap(() => throwError(() => new Error('bad'))), map(x => x)).subscribe();
            expect(() => {
                subject.next('wee');
            }).assertThrowError('bad');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                expect(() => {
                    subject.error('wee');
                });
            }
            endTime(startTime, 'should_thro_an_error_when_notifying_an_error_with_catchError_eturning_an_erroring_nne_bservable');
        });
        it('should_thro_an_error_when_notifying_an_error_with_catchError_eturning_an_erroring_nne_bservable', 0, () => {
            const subject = new Subject<string>();
            subject.pipe(catchError(() => throwError(() => new Error('bad')))).subscribe();
            expect(() => {
                subject.error('wee');
            }).assertThrowError('bad');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                expect(() => {
                    subject.error('wee');
                });
            }
            endTime(startTime, 'should_thro_an_error_when_notifying_an_error_with_catchError_eturning_an_erroring_nne_bservable');
        });
        it('should_throw_an_error_when_nexting_with_an_operator_hat_errors_synchronously', 0, () => {
            const subject = new Subject<string>();
            subject.pipe(mergeMap(() => {
                throw new Error('lol');
            })).subscribe();
            expect(() => {
                subject.next('wee');
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                expect(() => {
                    subject.error('wee');
                });
            }
            endTime(startTime, 'should_throw_an_error_when_notifying_an_error_with_a_catchError_that_errors_synchronously');
        });
        it('should_throw_an_error_when_notifying_an_error_with_a_catchError_that_errors_synchronously', 0, () => {
            const subject = new Subject<string>();
            subject.pipe(catchError(() => {
                throw new Error('lol');
            })).subscribe();
            expect(() => {
                subject.error('wee');
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                expect(() => {
                    subject.error('wee');
                });
            }
            endTime(startTime, 'should_throw_an_error_when_notifying_an_error_with_a_catchError_that_errors_synchronously');
        });
        it('should_throw_an_rror_when_nexting_with_an_erroring_ext_handler', 0, () => {
            const subject = new Subject<string>();
            subject.subscribe(() => {
                throw new Error('lol');
            });
            expect(() => {
                subject.next('wee');
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.subscribe(() => {
                    throw new Error('lol');
                });
            }
            endTime(startTime, 'should_throw_an_rror_when_nexting_with_an_erroring_ext_handler');
        });
        it('should_throw_an_error_when_notifying_with_an_erroring_error_handler', 0, () => {
            const subject = new Subject<string>();
            subject.subscribe({
                error: () => {
                    throw new Error('lol');
                }
            });
            expect(() => {
                subject.error('wee');
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.error('wee');
            }
            endTime(startTime, 'should_throw_an_error_when_notifying_with_an_erroring_error_handler');
        });
        it('should_throw_an_error_when_notifying_with_an_erroring_complete_handler', 0, () => {
            const subject = new Subject<string>();
            subject.subscribe({
                complete: () => {
                    throw new Error('lol');
                }
            });
            expect(() => {
                subject.complete();
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.complete();
            }
            endTime(startTime, 'should_throw_an_error_when_notifying_with_an_erroring_complete_handler');
        });
        it('should_throw_an_rror_when_notifying_an_complete_and_concatenated_with_nother_observabl_that_synchronously_errors', 0, () => {
            const subject = new Subject<string>();
            concat(subject, throwError(new Error('lol'))).subscribe();
            expect(() => {
                subject.complete();
            }).assertThrowError('lol');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subject<string>();
            }
            endTime(startTime, 'should_throw_an_rror_when_notifying_an_complete_and_concatenated_with_nother_observabl_that_synchronously_errors');
        });
        it('should_not_throw_on_second_erro_passed', 0, () => {
            const subject: any = new Subject<any>();
            subject.subscribe();
            expect(() => {
                subject.error(new Error('one'));
            }).assertThrowError('one');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.error(new Error('one'));
            }
            endTime(startTime, 'should_not_throw_on_second_erro_passed');
        });
        it('should_not_throw_on_second_error_passed_even_afte_having_been_operated_on', 0, () => {
            const subject: any = new Subject<any>();
            subject.pipe(mergeMap((x: any) => [x])).subscribe();
            expect(() => {
                subject.error(new Error('one'));
            }).assertThrowError('one');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.error(new Error('one'));
            }
            endTime(startTime, 'should_not_throw_on_second_error_passed_even_afte_having_been_operated_on');
        });
        it('deep_rethrowing_1', 0, () => {
            const subject1: any = new Subject<any>();
            const subject2: any = new Subject<any>();
            subject2.subscribe();
            subject1.subscribe({
                next: (): any => subject2.error(new Error('hahaha'))
            });
            expect(() => {
                subject1.next('test');
            }).assertThrowError('hahaha');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject1.subscribe({
                    next: (): any => subject2.error(new Error('hahaha'))
                });
            }
            endTime(startTime, 'deep_rethrowing_2');
        });
        it('deep_rethrowing_2', 0, () => {
            const subject1: any = new Subject<any>();
            subject1.subscribe({
                next: () => {
                    throwError(new Error('hahaha')).subscribe();
                }
            });
            expect(() => {
                subject1.next('test');
            }).assertThrowError('hahaha');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subject<any>();
            }
            endTime(startTime, 'deep_rethrowing_2');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
