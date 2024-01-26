let __generate__Id: number = 0;
function generateId(): string {
    return "Observable-spec.test_" + ++__generate__Id;
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
import { describe, expect, beforeEach, afterEach, it, TestType } from '@ohos/hypium';
import { Observer, TeardownLogic } from 'rxjs/internal/types';
import { Observable, config, Subscription, Subscriber, Operator, NEVER, Subject, of, throwError, empty } from 'rxjs';
import { map, multicast, refCount, filter, count, combineLatest, concat, merge, race, zip, publish, publishLast, publishBehavior, share } from 'rxjs';
import { TestScheduler, RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { observableMatcher } from '../spec//helpers/observableMatcher';
import { BindFun, EmptyFun, MyPromise1, observableOperator, observableSource, SourceFun } from './ArkTools';
const BASE_COUNT: number = 2000;
function expectFullObserver(val: any) {
    expect(val instanceof Object).assertTrue();
    expect(val.next instanceof Function).assertTrue();
    expect(val.error instanceof Function).assertTrue();
    expect(val.complete instanceof Function).assertTrue();
    expect(val.closed).assertFalse();
}
export default function observableTest() {
    describe('Observable', () => {
        let rxTestScheduler: TestScheduler;
        beforeEach(() => {
            rxTestScheduler = new TestScheduler(observableMatcher);
        });
        it('should_be_constructed_with_a_subscriber_function', 0, (done: any) => {
            const source = new Observable<number>((observer) => {
                expectFullObserver(observer);
                observer.next(1);
                observer.complete();
            });
            source.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(1);
                }, complete: done
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    next: (x) => { }, complete: done
                });
            }
            endTime(startTime, 'should_be_constructed_with_a_subscriber_function');
        });
        it('should_send_errors_thrown_in_the_constructor_down_the_error_path', 0, (done: any) => {
            new Observable<number>(() => {
                throw new Error('this should be handled');
            }).subscribe({
                error(err: any) {
                    expect(err instanceof Error).assertTrue();
                    expect(err['message']).assertDeepEquals('this should be handled');
                    done();
                },
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Observable<number>(() => {
                }).subscribe({
                    error(err: any) {
                        done();
                    },
                });
            }
            endTime(startTime, 'should_send_errors_thrown_in_the_constructor_down_the_error_path');
        });
        it('should_allow_empty_ctor_which_is_effectively_a_never_observable', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let expectObservable = helpers.expectObservable;
                const result: any = new Observable<any>();
                expectObservable<any>(result).toBe('-');
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rxTestScheduler.run((helpers: RunHelpers) => {
                    let expectObservable = helpers.expectObservable;
                    const result: any = new Observable<any>();
                    expectObservable<any>(result).toBe('-');
                });
            }
            endTime(startTime, 'should_allow_empty_ctor_which_is_effectively_a_never_observable');
        });
        it('forEach_should_iterate_and_return_a_Promise', 0, (done: any) => {
            const expected = [1, 2, 3];
            const result = of(1, 2, 3)
                .forEach((x) => {
                expect(x).assertEqual(expected.shift());
            }, Promise)
                .then(() => {
                done();
            });
            expect(result.then instanceof Function).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of(1, 2, 3)
                    .forEach((x) => { }, Promise)
                    .then(() => {
                    done();
                });
            }
            endTime(startTime, 'forEach_should_iterate_and_return_a_Promise');
        });
        it('should_reject_promise_when_in_error', 0, (done: any) => {
            throwError(() => ('bad'))
                .forEach(() => {
                done(new Error('should not be called'));
            }, Promise)
                .then(() => {
                done(new Error('should not complete'));
            }, (err: any) => {
                expect(err).assertDeepEquals('bad');
                done();
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                throwError(() => ('bad'));
            }
            endTime(startTime, 'should_reject_promise_when_in_error');
        });
        it('should_allow_Promise_to_be_globally_configured', 0, async (done: Function) => {
            try {
                let wasCalled = false;
                config.Promise = MyPromise1(wasCalled) as any;
                await of(42).forEach((x) => {
                    expect(x).assertDeepEquals(42);
                    wasCalled = true;
                });
                expect(wasCalled).assertTrue();
                let startTime = new Date().getTime();
                let configUrlTest: (index: number) => void = async (index) => {
                    of(42).forEach((x) => {
                        expect(x).assertDeepEquals(42);
                        wasCalled = true;
                    }).then(() => {
                        if (index < BASE_COUNT) {
                            configUrlTest(index + 1);
                        }
                        else {
                            let endTime = new Date().getTime();
                            let averageTime = (endTime - startTime) * 1000 / BASE_COUNT;
                            console.info("should_allow_Promise_to_be_globally_configured startTime: " + startTime + ' μs');
                            console.info("should_allow_Promise_to_be_globally_configured endTime: " + endTime + ' μs');
                            console.info("should_allow_Promise_to_be_globally_configured averageTime: " + averageTime + ' μs');
                            done();
                        }
                    });
                };
                configUrlTest(0);
            }
            finally {
                config.Promise = undefined;
            }
        });
        it('should_reject_promise_if_nextHandler_throws', 0, (done: any) => {
            const results: number[] = [];
            of(1, 2, 3)
                .forEach((x) => {
                if (x === 3) {
                    throw new Error('NO THREES!');
                }
                results.push(x);
            }, Promise)
                .then(() => {
                done(new Error('should not be called'));
            }, (err: any) => {
                expect(err['message']).assertDeepEquals('NO THREES!');
                expect(results).assertDeepEquals([1, 2]);
            })
                .then(() => {
                done();
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of(1, 2, 3)
                    .forEach((x) => { }, Promise);
            }
            endTime(startTime, 'should_reject_promise_if_nextHandler_throws');
        });
        it('should_handle_a_synchronous_throw_from_the_next_handler', 0, () => {
            const expected = new Error('I told, you Bobby Boucher, threes are the debil!');
            const syncObservable = new Observable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.next(4);
            });
            const results: Array<number | Error> = [];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Observable<number>((observer) => {
                    observer.next(1);
                    observer.next(2);
                    observer.next(3);
                    observer.next(4);
                });
            }
            endTime(startTime, 'should_handle_a_synchronous_throw_from_the_next_handler');
            return syncObservable
                .forEach((x) => {
                results.push(x);
                if (x === 3) {
                    throw expected;
                }
            })
                .then(() => {
                throw new Error('should not be called');
            }, (err: any) => {
                results.push(err);
                // The error should unsubscribe from the source, meaning we 
                // should not see the number 4.
                expect(results).assertDeepEquals([1, 2, 3, expected]);
            });
        });
        it('should_handle_an_asynchronous_throw_from_the_next_handler_and_tear_down', 0, () => {
            const expected = new Error('I told, you Bobby Boucher, twos are the debil!');
            const asyncObservable = new Observable<number>((observer) => {
                let i = 1;
                const id = setInterval(() => observer.next(i++), 1);
                return () => {
                    clearInterval(id);
                };
            });
            const results: Array<number | Error> = [];
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Observable<number>((observer) => {
                    let i = 1;
                    const id = setInterval(() => observer.next(i++), 1);
                    return () => {
                        clearInterval(id);
                    };
                });
            }
            endTime(startTime, 'should_handle_an_asynchronous_throw_from_the_next_handler_and_tear_down');
            return asyncObservable
                .forEach((x) => {
                results.push(x);
                if (x === 2) {
                    throw expected;
                }
            })
                .then(() => {
                throw new Error('should not be called');
            }, (err: any) => {
                results.push(err);
                expect(results).assertDeepEquals([1, 2, expected]);
            });
        });
        it('subscribe_should_work_with_handlers_with_hacked_bind_methods', 0, () => {
            const source = of('Hi');
            const results: any[] = [];
            const next = (value: string) => {
                results.push(value);
            };
            BindFun(next);
            const complete = () => {
                results.push('done');
            };
            BindFun(complete);
            source.subscribe({
                next, complete
            });
            expect(results).assertDeepEquals(['Hi', 'done']);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    next, complete
                });
            }
            endTime(startTime, 'subscribe_should_work_with_handlers_with_hacked_bind_methods');
        });
        it('should_work_with_handlers_with_hacked_bind_methods_in_the_error_case', 0, () => {
            const source = throwError(() => 'an error');
            const results: any[] = [];
            const error = (value: string) => {
                results.push(value);
            };
            source.subscribe({
                error
            });
            expect(results.length).assertEqual(1);
            expect(results[0]).assertDeepEquals('an error');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    error
                });
            }
            endTime(startTime, 'should_work_with_handlers_with_hacked_bind_methods_in_the_error_case');
        });
        it('should_be_synchronous', 0, () => {
            let subscribed = false;
            let nexted: string;
            let completed: boolean;
            const source = new Observable<string>((observer) => {
                subscribed = true;
                observer.next('wee');
                expect(nexted).assertDeepEquals('wee');
                observer.complete();
                expect(completed).assertTrue();
            });
            expect(subscribed).assertFalse();
            let mutatedByNext = false;
            let mutatedByComplete = false;
            source.subscribe({
                next: (x) => {
                    nexted = x;
                    mutatedByNext = true;
                }, complete: () => {
                    completed = true;
                    mutatedByComplete = true;
                }
            });
            expect(mutatedByNext).assertTrue();
            expect(mutatedByComplete).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    next: (x) => { }, complete: () => { }
                });
            }
            endTime(startTime, 'should_be_synchronous');
        });
        it('should_work_when_subscribe_is_called_with_no_arguments', 0, () => {
            const source = new Observable<string>((subscriber) => {
                subscriber.next('foo');
                subscriber.complete();
            });
            source.subscribe();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe();
            }
            endTime(startTime, 'should_work_when_subscribe_is_called_with_no_arguments');
        });
        it('should_not_be_unsubscribed_when_other_empty_subscription_completes', 0, () => {
            let unsubscribeCalled = false;
            const source = new Observable<number>(() => {
                return () => {
                    unsubscribeCalled = true;
                };
            });
            source.subscribe();
            expect(unsubscribeCalled).assertFalse();
            empty().subscribe();
            expect(unsubscribeCalled).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                empty().subscribe();
            }
            endTime(startTime, 'should_not_be_unsubscribed_when_other_empty_subscription_completes');
        });
        it('should_not_be_unsubscribed_when_other_subscription_with_same_observer_completes', 0, () => {
            let unsubscribeCalled = false;
            const source = new Observable<number>(() => {
                return () => {
                    unsubscribeCalled = true;
                };
            });
            let observer: any = {
                next: () => {
                    /*noop*/
                },
            };
            source.subscribe(observer);
            expect(unsubscribeCalled).assertFalse();
            empty().subscribe(observer);
            expect(unsubscribeCalled).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                empty().subscribe(observer);
            }
            endTime(startTime, 'should_not_be_unsubscribed_when_other_subscription_with_same_observer_completes');
        });
        it('should_run_unsubscription_logic_when_an_error_is_sent_asynchronously_and_subscribe_is_called_with_no_arguments', 0, (done: any) => {
            let unsubscribeCalled = false;
            const source = new Observable<number>((observer) => {
                const id = setInterval(() => {
                    observer.error(0);
                }, 1);
                return () => {
                    clearInterval(id);
                    unsubscribeCalled = true;
                };
            });
            source.subscribe({
                error() {
                    /* noop: expected error */
                },
            });
            setTimeout(() => {
                let err: any;
                let errHappened = false;
                try {
                    expect(unsubscribeCalled).assertTrue();
                }
                catch (e) {
                    err = e;
                    errHappened = true;
                }
                finally {
                    if (!errHappened) {
                        done();
                    }
                    else {
                        done(err);
                    }
                }
            }, 100);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    error() { },
                });
            }
            endTime(startTime, 'should_return_a_Subscription_that_calls_the_unsubscribe_function_returned_by_the_subscriber');
        });
        it('should_return_a_Subscription_that_calls_the_unsubscribe_function_returned_by_the_subscriber', 0, () => {
            let unsubscribeCalled = false;
            const source = new Observable<number>(() => {
                return () => {
                    unsubscribeCalled = true;
                };
            });
            const sub = source.subscribe(() => {
                //noop
            });
            expect(sub instanceof Subscription).assertTrue();
            expect(unsubscribeCalled).assertFalse();
            expect(sub.unsubscribe instanceof Function).assertTrue();
            sub.unsubscribe();
            expect(unsubscribeCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                sub.unsubscribe();
            }
            endTime(startTime, 'should_return_a_Subscription_that_calls_the_unsubscribe_function_returned_by_the_subscriber');
        });
        it('should_ignore_error_messages_after_unsubscription', 0, () => {
            let times = 0;
            let errorCalled = false;
            const source = new Observable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                setTimeout(() => {
                    observer.error(new Error());
                }, 10);
                return () => {
                    expect(times).assertEqual(2);
                    expect(errorCalled).assertFalse();
                };
            });
            const subscription = source.subscribe({
                next: val => {
                    times = val;
                    if (times === 2) {
                        subscription.unsubscribe();
                    }
                }, error: (err: any) => {
                    errorCalled = true;
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.subscribe({
                    next: val => {
                        times = val;
                        if (times === 2) {
                            subscription.unsubscribe();
                        }
                    }, error: (err: any) => {
                        errorCalled = true;
                    }
                });
            }
            endTime(startTime, 'should_ignore_error_messages_after_unsubscription');
        });
        it('should_ignore_complete_messages_after_unsubscription', 0, () => {
            let times = 0;
            let completeCalled = false;
            const subscription = new Observable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                setTimeout(() => {
                    observer.complete();
                }, 10);
                return () => {
                    expect(times).assertEqual(2);
                    expect(completeCalled).assertFalse();
                };
            }).subscribe({
                next: val => {
                    times = val;
                    if (times === 2) {
                        subscription.unsubscribe();
                    }
                }, complete: () => completeCalled = true
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subscription;
            }
            endTime(startTime, 'should_ignore_complete_messages_after_unsubscription');
        });
        it('should_accept_an_anonymous_observe_wit_ust_a_ext_function_and_call_the_next_function_in_the_context_of_the_anonymous_observer', 0, (done: any) => {
            //intentionally not using lambda to avoid typescript's this context capture
            const o: any = {
                myValue: 'foo',
                next(x: any) {
                    expect(o.myValue).assertDeepEquals('foo');
                    expect(x).assertDeepEquals(1);
                    done();
                },
            };
            of(1).subscribe(o);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of(1).subscribe(o);
            }
            endTime(startTime, 'should_accept_an_anonymous_observe_wit_ust_a_ext_function_and_call_the_next_function_in_the_context_of_the_anonymous_observer');
        });
        it('should_accept_an_anonymous_bserver_with_ust_an_error_function_nd_call_the_error_unction_in_the_context_of_the_anonymous_observer', 0, (done: any) => {
            //intentionally not using lambda to avoid typescript's this context capture
            const o: any = {
                myValue: 'foo',
                error(err: any) {
                    expect(o.myValue).assertDeepEquals('foo');
                    expect(err).assertDeepEquals('bad');
                    done();
                },
            };
            throwError(() => ('bad')).subscribe(o);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                throwError(() => ('bad')).subscribe(o);
            }
            endTime(startTime, 'should_accept_an_anonymous_bserver_with_ust_an_error_function_nd_call_the_error_unction_in_the_context_of_the_anonymous_observer');
        });
        it('should_accept_an_anonymou_observer_with_ust_a_complete_function_and_call_the_complete_unction_in_the_context_of_the_anonymous_observer', 0, (done: any) => {
            //intentionally not using lambda to avoid typescript's this context capture
            const o: any = {
                myValue: 'foo',
                complete: () => {
                    expect(o.myValue).assertDeepEquals('foo');
                    done();
                },
            };
            empty().subscribe(o);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                empty().subscribe(o);
            }
            endTime(startTime, 'should_accept_an_anonymou_observer_with_ust_a_complete_function_and_call_the_complete_unction_in_the_context_of_the_anonymous_observer');
        });
        it('should_accept_an_anonymous_observer_with_no_functions_at_all', 0, () => {
            let error: any = null;
            try {
                EmptyFun();
            }
            catch (err) {
                error = err;
            }
            expect(error).assertNull();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                error;
            }
            endTime(startTime, 'should_accept_an_anonymous_observer_with_no_functions_at_all');
        });
        it('should_ignore_next_messages_fter_unsubscription', 0, () => {
            let num = 0;
            const source = new Observable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                return () => {
                    expect(num).assertEqual(2);
                };
            });
            const subscription = source.subscribe({
                next: val => {
                    num = val;
                    if (num === 2) {
                        subscription.unsubscribe();
                    }
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Observable<number>((observer) => {
                    observer.next(1);
                    observer.next(2);
                    observer.next(3);
                    return () => {
                        expect(num).assertEqual(2);
                    };
                });
            }
            endTime(startTime, 'should_ignore_next_messages_fter_unsubscription');
        });
        it('should_finalize_even_with_a_synchronou_thrown_error', 0, () => {
            let called = false;
            const badObservable: any = new Observable<any>((subscriber: any) => {
                subscriber.add(() => {
                    called = true;
                });
                throw new Error('bad');
            });
            badObservable.subscribe({
                error: () => {
                }
            });
            expect(called).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                badObservable.subscribe({
                    error: () => { }
                });
            }
            endTime(startTime, 'should_finalize_even_with_a_synchronou_thrown_error');
        });
        it('should_handle_empty_string_sync_errors', 0, () => {
            const badObservable: any = new Observable<any>(() => {
                throw new Error('');
            });
            let caught = false;
            badObservable.subscribe({
                error: (err: any) => {
                    caught = true;
                    expect(err).assertDeepEquals(new Error(''));
                }
            });
            expect(caught).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Observable<any>(() => {
                    throw new Error('');
                });
            }
            endTime(startTime, 'should_handle_empty_string_sync_errors');
        });
        it('should_xist', 0, () => {
            const source = of('test');
            expect(source.pipe instanceof Function).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of('test');
            }
            endTime(startTime, 'should_xist');
        });
        it('should_pipe_multiple_perations', 0, (done: any) => {
            of('test')
                .pipe(map((x) => x + x), map((x) => x + '!!!'))
                .subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals('testtest!!!');
                }, complete: done
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of('test')
                    .pipe(map((x) => x + x), map((x) => x + '!!!'))
                    .subscribe();
            }
            endTime(startTime, 'should_pipe_multiple_perations');
        });
        it('should_return_the_same_observable_if_there_are_no_arguments', 0, () => {
            const source = of('test');
            const result = source.pipe();
            expect(result).assertDeepEquals(source);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                of('test');
            }
            endTime(startTime, 'should_return_the_same_observable_if_there_are_no_arguments');
        });
    });
    describe('Observable_create', () => {
        it('should_create_an_Observable', 0, () => {
            const result: any = Observable.create(() => {
                //noop
            });
            expect(result instanceof Observable).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Observable.create(() => { });
            }
            endTime(startTime, 'should_create_an_Observable');
        });
        it('should_provide_an_observer_to_the_function', 0, () => {
            let called = false;
            const result: any = Observable.create((observer: Observer<any>) => {
                called = true;
                expectFullObserver(observer);
                observer.complete();
            });
            expect(called).assertFalse();
            result.subscribe(() => {
                //noop
            });
            expect(called).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe(() => { });
            }
            endTime(startTime, 'should_provide_an_observer_to_the_function');
        });
        it('should_send_rrors_thrown_in_the_assed_function_down_the_error_ath', 0, (done: any) => {
            Observable.create(() => {
                throw new Error('this should be handled');
            }).subscribe({
                error(err: Error) {
                    expect(err instanceof Error).assertTrue();
                    expect(err.message).assertDeepEquals('this should be handled');
                    done();
                },
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Observable.create(() => { });
            }
            endTime(startTime, 'should_send_rrors_thrown_in_the_assed_function_down_the_error_ath');
        });
    });
    /** @test {Observable} */
    describe('Observable_lift', () => {
        let rxTestScheduler: TestScheduler;
        beforeEach(() => {
            rxTestScheduler = new TestScheduler(observableMatcher);
        });
        class MyCustomObservable<T> extends Observable<T> {
            static from<T>(source: any) {
                const observable = new MyCustomObservable<T>();
                SourceFun<T>(observable, source);
                return observable;
            }
            lift<R>(operator: Operator<T, R>): Observable<R> {
                const observable = new MyCustomObservable<R>();
                let that = this;
                observableSource(observable, that);
                observableOperator(observable, operator);
                return observable;
            }
        }
        it('should_return_Observable_which_calls_FinalizationLogic_of_operator_on_unsubscription', 0, (done: any) => {
            const myOperator: Operator<any, any> = {
                call: (subscriber: Subscriber<any>, source: any) => {
                    const subscription: any = source.subscribe((x: any) => subscriber.next(x));
                    return () => {
                        subscription.unsubscribe();
                        done();
                    };
                },
            };
            (NEVER as any).lift(myOperator)
                .subscribe()
                .unsubscribe();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                (NEVER as any).lift(myOperator)
                    .subscribe()
                    .unsubscribe();
            }
            endTime(startTime, 'should_return_Observable_which_calls_FinalizationLogic_of_operator_on_unsubscription');
        });
        it('should_be_overrideable_in_a_ustom_Observable_typ_that_composes', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(map((x) => {
                return 10 * x;
            }));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [10, 20, 30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_be_overrideable_in_a_ustom_Observable_typ_that_composes');
        });
        it('should_compose_through_multicas_and_refCount', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(multicast(() => new Subject<number>()), refCount(), map((x) => 10 * x));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [10, 20, 30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_compose_through_multicas_and_refCount');
        });
        it('should_ompose_hrough_publish_and_refCount', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(publish(), refCount(), map((x: any) => 10 * x));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [10, 20, 30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_ompose_hrough_publish_and_refCount');
        });
        it('should_compose_through_publishLast_and_efCount', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(publishLast(), refCount(), map((x: any) => 10 * x));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_compose_through_publishLast_and_efCount');
        });
        it('should_compose_through_publishBehavior_and_refCount', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(publishBehavior(0), refCount(), map((x) => 10 * x));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [0, 10, 20, 30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_compose_through_publishBehavior_and_refCount');
        });
        it('should_composes_Subjects_in_the_simple_case', 0, () => {
            const subject = new Subject<number>();
            const result = subject.pipe(map((x) => 10 * x)) as any as Subject<number>; // Yes, this is correct. (but you're advised not to do this)
            expect(result instanceof Subject).assertTrue();
            const emitted: any[] = [];
            result.subscribe(value => emitted.push(value));
            result.next(10);
            result.next(20);
            result.next(30);
            expect(emitted).assertDeepEquals([100, 200, 300]);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.next(30);
            }
            endTime(startTime, 'should_composes_Subjects_in_the_simple_case');
        });
        /**
         * Seriously, never do this. It's probably bad that we've allowed this. Fortunately, it's not
         * a common practice, so maybe we can remove it?
         */
        it('should_demonstrate_the_horrors_f_haring_an_lifting_he_bject_ough', 0, () => {
            const subject = new Subject<number>();
            const shared = subject.pipe(share());
            const result1 = shared.pipe(map(x => x * 10)) as any as Subject<number>; // Yes, this is correct.
            const result2 = shared.pipe(map(x => x - 10)) as any as Subject<number>; // Yes, this is correct.
            expect(result1 instanceof Subject).assertTrue();
            const emitted1: any[] = [];
            result1.subscribe(value => emitted1.push(value));
            const emitted2: any[] = [];
            result2.subscribe(value => emitted2.push(value));
            // THIS IS HORRIBLE DON'T DO THIS.
            result1.next(10);
            result2.next(20); // Yuck
            result1.next(30);
            expect(emitted1).assertDeepEquals([100, 200, 300]);
            expect(emitted2).assertDeepEquals([0, 10, 20]);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result2.next(20); // Yuck
            }
            endTime(startTime, 'should_demonstrate_the_horrors_f_haring_an_lifting_he_bject_ough');
        });
        /**
         * This section outlines one of the reasons that we need to get rid of operators that return
         * Connectable observable. Likewise it also reveals a slight design flaw in `lift`. It
         * probably should have never tried to compose through the Subject's observer methods.
         * If you're a user and you're reading this... NEVER try to use this feature, it's likely
         * to go away at some point.
         *
         * The problem is that you can have the Subject parts, or you can have the ConnectableObservable parts,
         * but you can't have both.
         *
         * NOTE: We can remove this in version 8 or 9, because we're getting rid of operators that
         * return `ConnectableObservable`. :tada:
         */
        it('should_compose_through_multicast_and_refCount_even_if_it_is_a_Subject', 0, () => {
            const subject = new Subject<number>();
            const result = subject.pipe(multicast(() => new Subject<number>()), refCount(), map((x) => 10 * x)) as any as Subject<number>; // Yes, this is correct.
            expect(result instanceof Subject).assertTrue();
            const emitted: any[] = [];
            result.subscribe(value => {
                emitted.push(value);
                if (value == 300) {
                    expect(emitted).assertDeepEquals([100, 200, 300]);
                }
            });
            result.next(10);
            result.next(20);
            result.next(30);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe(value => { });
            }
            endTime(startTime, 'should_compose_through_multicast_and_refCount_even_if_it_is_a_Subject');
        });
        it('should_compose_through_publish_and_refCount_even_if_it_is_a_Subject', 0, () => {
            const subject = new Subject<number>();
            const result = subject.pipe(publish(), refCount(), map((x: any) => 10 * x)) as any as Subject<number>; // Yes, this is correct.
            expect(result instanceof Subject).assertTrue();
            const emitted: any[] = [];
            result.subscribe(value => {
                emitted.push(value);
                if (value == 300) {
                    expect(emitted).assertDeepEquals([100, 200, 300]);
                }
            });
            result.next(10);
            result.next(20);
            result.next(30);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe(value => { });
            }
            endTime(startTime, 'should_compose_through_publish_and_refCount_even_if_it_is_a_Subject');
        });
        it('should_compos_through_publishLast_and_refCount_even_if_it_is_a_Subject', 0, () => {
            const subject = new Subject<number>();
            const result = subject.pipe(publishLast(), refCount(), map((x: any) => 10 * x)) as any as Subject<number>; // Yes, this is correct.
            expect(result instanceof Subject).assertTrue();
            const emitted: any[] = [];
            result.subscribe(value => {
                emitted.push(value);
                if (value == 300) {
                    expect(emitted).assertDeepEquals([100, 200, 300]);
                }
            });
            result.next(10);
            result.next(20);
            result.next(30);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.next(30);
            }
            endTime(startTime, 'should_compos_through_publishLast_and_refCount_even_if_it_is_a_Subject');
        });
        it('should_compos_through_publishBehavior_nd_refCount_even_if_it_is_a_Subject', 0, () => {
            const subject = new Subject<number>();
            const result = subject.pipe(publishBehavior(0), refCount(), map((x) => 10 * x)) as any as Subject<number>; // Yes, this is correct.
            expect(result instanceof Subject).assertTrue();
            const emitted: any[] = [];
            result.subscribe(value => {
                emitted.push(value);
                if (value == 300) {
                    expect(emitted).assertDeepEquals([0, 100, 200, 300]);
                }
            });
            result.next(10);
            result.next(20);
            result.next(30);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe(value => { });
            }
            endTime(startTime, 'should_compos_through_publishBehavior_nd_refCount_even_if_it_is_a_Subject');
        });
        it('should_compose_through_multicast_with_selector_function', 0, (done: any) => {
            const result = new MyCustomObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(multicast(() => new Subject<number>(), (shared) => shared.pipe(map((x) => 10 * x))));
            expect(result instanceof MyCustomObservable).assertTrue();
            const expected = [10, 20, 30];
            result.subscribe({
                next: (x) => {
                    expect(x).assertDeepEquals(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new MyCustomObservable<number>((observer) => {
                    observer.next(1);
                    observer.next(2);
                    observer.next(3);
                    observer.complete();
                });
            }
            endTime(startTime, 'should_compose_through_multicast_with_selector_function');
        });
        it('should_compose_through_combineLatest', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let cold = helpers.cold;
                let expectObservable = helpers.expectObservable;
                const e1 = cold(' -a--b-----c-d-e-|');
                const e2 = cold(' --1--2-3-4---|   ');
                const expected = '--A-BC-D-EF-G-H-|';
                const result = combineLatest([e1, e2], (a, b) => String(a) + String(b));
                expectObservable<any>(result).toBe(expected, {
                    A: 'a1',
                    B: 'b1',
                    C: 'b2',
                    D: 'b3',
                    E: 'b4',
                    F: 'c4',
                    G: 'd4',
                    H: 'e4',
                });
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    combineLatest([e1, e2], (a, b) => String(a) + String(b));
                }
                endTime(startTime, 'should_compose_through_combineLatest');
            });
        });
        it('should_ompose_through_concat', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let cold = helpers.cold;
                let expectObservable = helpers.expectObservable;
                const e1 = cold(' --a--b-|');
                const e2 = cold(' --x---y--|');
                const expected = '--a--b---x---y--|';
                const result: any = concat(e1, e2);
                expectObservable<any>(result).toBe(expected);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    concat(e1, e2);
                }
                endTime(startTime, 'should_ompose_through_concat');
            });
        });
        it('should_compose_through_merge', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let cold = helpers.cold;
                let expectObservable = helpers.expectObservable;
                const e1 = cold(' -a--b-| ');
                const e2 = cold(' --x--y-|');
                const expected = '-ax-by-|';
                const result: any = merge(e1, e2);
                expectObservable<any>(result).toBe(expected);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    merge(e1, e2);
                }
                endTime(startTime, 'should_compose_through_merge');
            });
        });
        it('should_compose_through_race', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let cold = helpers.cold;
                let expectObservable = helpers.expectObservable;
                let expectSubscriptions = helpers.expectSubscriptions;
                const e1 = cold(' ---a-----b-----c----|');
                const e1subs = '  ^-------------------!';
                const e2 = cold(' ------x-----y-----z----|');
                const e2subs = '  ^--!';
                const expected = '---a-----b-----c----|';
                const result = race(e1, e2);
                expectObservable<any>(result).toBe(expected);
                expectSubscriptions(e1.subscriptions).toBe(e1subs);
                expectSubscriptions(e2.subscriptions).toBe(e2subs);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    e2.subscriptions;
                }
                endTime(startTime, 'should_compose_through_race');
            });
        });
        it('should_compose_through_zip', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let cold = helpers.cold;
                let expectObservable = helpers.expectObservable;
                const e1 = cold(' -a--b-----c-d-e-|');
                const e2 = cold(' --1--2-3-4---|   ');
                const expected = '--A--B----C-D|   ';
                const result: any = zip(e1, e2, (a, b) => String(a) + String(b));
                expectObservable<any>(result).toBe(expected, {
                    A: 'a1',
                    B: 'b2',
                    C: 'c3',
                    D: 'd4',
                });
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    cold(' --1--2-3-4---|   ');
                }
                endTime(startTime, 'should_compose_through_zip');
            });
        });
        it('should_allow_njecting_behaviors_into_all_subscribers_n_an_operator_chain_when_overridden', 0, (done: any) => {
            // The custom Subscriber
            const log: Array<string> = [];
            class LogSubscriber<T> extends Subscriber<T> {
                next(value?: T): void {
                    log.push('next ' + value);
                    if (!this.isStopped) {
                        this._next(value!);
                    }
                }
            }
            // The custom Operator
            class LogOperator<T, R> implements Operator<T, R> {
                private childOperator: Operator<T, R>;
                constructor(childOperator: Operator<T, R>) {
                    this.childOperator = childOperator;
                }
                call(subscriber: Subscriber<R>, source: any): TeardownLogic {
                    return this.childOperator.call(new LogSubscriber<R>(subscriber), source);
                }
            }
            // The custom Observable
            class LogObservable<T> extends Observable<T> {
                lift<R>(operator: Operator<T, R>): Observable<R> {
                    const observable = new LogObservable<R>();
                    observable.source = this;
                    observable.operator = new LogOperator(operator);
                    return observable;
                }
            }
            // Use the LogObservable
            const result = new LogObservable<number>((observer) => {
                observer.next(1);
                observer.next(2);
                observer.next(3);
                observer.complete();
            }).pipe(map((x) => 10 * x), filter((x) => x > 15), count());
            expect(result instanceof LogObservable).assertTrue();
            const expected = [2];
            result.subscribe({
                next: (x) => {
                    expect(x).assertEqual(expected.shift());
                }, error: () => {
                    done(new Error('should not be called'));
                }, complete: () => {
                    expect(log).assertDeepEquals([
                        'next 10',
                        'next 20',
                        'next 20',
                        'next 30',
                        'next 30',
                        'next 2', // count
                    ]);
                    done();
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                result.subscribe();
            }
            endTime(startTime, 'should_allow_njecting_behaviors_into_all_subscribers_n_an_operator_chain_when_overridden');
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
