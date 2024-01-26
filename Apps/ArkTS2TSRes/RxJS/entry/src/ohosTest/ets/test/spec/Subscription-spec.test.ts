let __generate__Id: number = 0;
function generateId(): string {
    return "Subscription-spec.test_" + ++__generate__Id;
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
import { Observable, UnsubscriptionError, Subscription, merge } from 'rxjs';
const BASE_COUNT: number = 2000;
/** @test {Subscription} */
export default function subscriptionTest() {
    describe('Subscription', () => {
        it('should_unsubscribe_child_subscriptions', 0, () => {
            const main = new Subscription();
            let isCalled = false;
            const child = new Subscription(() => {
                isCalled = true;
            });
            main.add(child);
            main.unsubscribe();
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subscription();
            }
            endTime(startTime, 'should_unsubscribe_child_subscriptions');
        });
        it('should_unsubscribe_child_subscriptions_if_it_has_already_been_unsubscribed', 0, () => {
            const main = new Subscription();
            main.unsubscribe();
            let isCalled = false;
            const child = new Subscription(() => {
                isCalled = true;
            });
            main.add(child);
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.unsubscribe();
            }
            endTime(startTime, 'should_unsubscribe_child_subscriptions_if_it_has_already_been_unsubscribed');
        });
        it('should_unsubscribe_a_finalizer_function_that_was_passed', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            main.add(() => {
                isCalled = true;
            });
            main.unsubscribe();
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.unsubscribe();
            }
            endTime(startTime, 'should_unsubscribe_a_finalizer_function_that_was_passed');
        });
        it('should_unsubscribe_a_finalizer_function_that_was_passed_immediately_if_it_has_been_unsubscribed', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            main.unsubscribe();
            main.add(() => {
                isCalled = true;
            });
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subscription();
            }
            endTime(startTime, 'should_unsubscribe_a_finalizer_function_that_was_passed_immediately_if_it_has_been_unsubscribed');
        });
        it('should_unsubscribe_an_Unsubscribable_when_unsubscribed', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            main.add({
                unsubscribe() {
                    isCalled = true;
                }
            });
            main.unsubscribe();
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.unsubscribe();
            }
            endTime(startTime, 'should_unsubscribe_an_Unsubscribable_when_unsubscribed');
        });
        it('should_unsubscribe_an_Unsubscribable_if_it_is_already_unsubscribed', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            main.unsubscribe();
            main.add({
                unsubscribe() {
                    isCalled = true;
                }
            });
            expect(isCalled).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.unsubscribe();
            }
            endTime(startTime, 'should_unsubscribe_an_Unsubscribable_if_it_is_already_unsubscribed');
        });
        it('should_remove_added_Subscriptions', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            const child = new Subscription(() => {
                isCalled = true;
            });
            main.add(child);
            main.remove(child);
            main.unsubscribe();
            expect(isCalled).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.remove(child);
            }
            endTime(startTime, 'should_remove_added_Subscriptions');
        });
        it('should_remove_added_functions', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            const finalizer = () => {
                isCalled = true;
            };
            main.add(finalizer);
            main.remove(finalizer);
            main.unsubscribe();
            expect(isCalled).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.remove(finalizer);
            }
            endTime(startTime, 'should_remove_added_functions');
        });
        it('should_remove_added_unsubscribables', 0, () => {
            let isCalled = false;
            const main = new Subscription();
            const unsubscribable: any = {
                unsubscribe() {
                    isCalled = true;
                }
            };
            main.add(unsubscribable);
            main.remove(unsubscribable);
            main.unsubscribe();
            expect(isCalled).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                main.remove(unsubscribable);
            }
            endTime(startTime, 'should_remove_added_functions');
        });
        it('should_unsubscribe_from_all_subscriptions_when_some_of_them_throw', 0, (done: any) => {
            const finalizers: number[] = [];
            const source1: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(1);
                };
            });
            const source2: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(2);
                    throw new Error('oops, I am a bad unsubscribe!');
                };
            });
            const source3: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(3);
                };
            });
            const subscription = merge(source1, source2, source3).subscribe();
            setTimeout(() => {
                let error: any = null;
                try {
                    subscription.unsubscribe();
                }
                catch (err) {
                    error = err;
                }
                expect(error != null && error instanceof UnsubscriptionError).assertTrue();
                expect(finalizers).assertDeepEquals([1, 2, 3]);
                done();
            }, 0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                merge(source1, source2, source3).subscribe();
            }
            endTime(startTime, 'should_unsubscribe_from_all_subscriptions_when_some_of_them_throw');
        });
        it('should_unsubscribe_from_all_subscriptions_when_adding_a_bad_custom_subscription_to_a_subscription', 0, (done: any) => {
            const finalizers: number[] = [];
            const sub = new Subscription();
            const source1: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(1);
                };
            });
            const source2: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(2);
                    sub.add(({
                        unsubscribe: () => {
                            expect(sub.closed).assertTrue();
                            throw new Error('Who is your daddy, and what does he do?');
                        }
                    }));
                };
            });
            const source3: any = new Observable<any>(() => {
                return () => {
                    finalizers.push(3);
                };
            });
            sub.add(merge(source1, source2, source3).subscribe());
            setTimeout(() => {
                let error: any = null;
                try {
                    sub.unsubscribe();
                }
                catch (err) {
                    error = err;
                }
                expect(error != null && error instanceof UnsubscriptionError).assertTrue();
                expect(finalizers).assertDeepEquals([1, 2, 3]);
                done();
            }, 1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Subscription();
            }
            endTime(startTime, 'should_unsubscribe_from_all_subscriptions_when_adding_a_bad_custom_subscription_to_a_subscription');
        });
        it('should_have_idempotent_unsubscription', 0, () => {
            let count = 0;
            const subscription = new Subscription(() => ++count);
            expect(count).assertEqual(0);
            subscription.unsubscribe();
            expect(count).assertEqual(1);
            subscription.unsubscribe();
            expect(count).assertEqual(1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subscription.unsubscribe();
            }
            endTime(startTime, 'should_have_idempotent_unsubscription');
        });
        it('should_unsubscribe_from_all_parents', 0, () => {
            // https://github.com/ReactiveX/rxjs/issues/6351
            const a = new Subscription(() => {
            });
            const b = new Subscription(() => {
            });
            const c = new Subscription(() => {
            });
            const d = new Subscription(() => {
            });
            a.add(d);
            b.add(d);
            c.add(d);
            // When d is added to the subscriptions, it's added as a finalizer. The
            // length is 1 because the finalizers passed to the ctors are stored in a
            // separate property.
            expect((a as any)._finalizers['length']).assertEqual(1);
            expect((b as any)._finalizers['length']).assertEqual(1);
            expect((c as any)._finalizers['length']).assertEqual(1);
            d.unsubscribe();
            // When d is unsubscribed, it should remove itself from each of its
            // parents.
            expect((a as any)._finalizers['length']).assertEqual(0);
            expect((b as any)._finalizers['length']).assertEqual(0);
            expect((c as any)._finalizers['length']).assertEqual(0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                d.unsubscribe();
            }
            endTime(startTime, 'should_unsubscribe_from_all_parents');
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
