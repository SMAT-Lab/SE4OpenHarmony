let __generate__Id: number = 0;
function generateId(): string {
    return "ReplaySubject-spec.test_" + ++__generate__Id;
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
import { describe, expect, beforeEach, it } from '@ohos/hypium';
import { ReplaySubject, Subject, of, mergeMapTo, tap } from 'rxjs';
import { TestScheduler, RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { observableMatcher } from '../helpers/observableMatcher';
import { ReplaySubjectFun, ReplaySubjectFun2 } from '../ArkTools';
const BASE_COUNT: number = 2000;
/** @test {ReplaySubject} */
export default function replaySubjectTest() {
    describe('ReplaySubject', () => {
        let rxTestScheduler: TestScheduler;
        beforeEach(() => {
            rxTestScheduler = new TestScheduler(observableMatcher);
        });
        it('should_extend_Subject', 0, () => {
            const subject: any = new ReplaySubject<any>();
            expect(subject instanceof Subject).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject;
            }
            endTime(startTime, 'should_extend_Subject');
        });
        it('should_add_the_observer_before_running_subscription_code', 0, () => {
            const subject = new ReplaySubject<number>();
            subject.next(1);
            const results: number[] = [];
            subject.subscribe((value) => {
                results.push(value);
                if (value < 3) {
                    subject.next(value + 1);
                }
            });
            expect(results).assertDeepEquals([1, 2, 3]);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.next(1);
            }
            endTime(startTime, 'should_add_the_observer_before_running_subscription_code');
        });
        it('should_replay_values_upon_subscription', 0, (done: any) => {
            const subject = new ReplaySubject<number>();
            const expects = [1, 2, 3];
            let i = 0;
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.subscribe({
                next: (x: number) => {
                    expect(x).assertEqual(expects[i++]);
                    if (i === 3) {
                        subject.complete();
                    }
                },
                error: (err: any) => {
                    done(new Error('should not be called'));
                },
                complete: () => {
                    done();
                },
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.complete();
            }
            endTime(startTime, 'should_replay_values_upon_subscription');
        });
        it('should_replay_values_and_complete', 0, (done: any) => {
            const subject = new ReplaySubject<number>();
            const expects = [1, 2, 3];
            let i = 0;
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.complete();
            subject.subscribe({
                next: (x: number) => {
                    expect(x).assertEqual(expects[i++]);
                },
                complete: done,
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.complete();
            }
            endTime(startTime, 'should_replay_values_and_complete');
        });
        it('should_replay_values_and_error', 0, (done: any) => {
            const subject = new ReplaySubject<number>();
            const expects = [1, 2, 3];
            let i = 0;
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.error('fooey');
            subject.subscribe({
                next: (x: number) => {
                    expect(x).assertEqual(expects[i++]);
                },
                error: (err: any) => {
                    expect(err).assertEqual('fooey');
                    done();
                },
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.error('fooey');
            }
            endTime(startTime, 'should_replay_values_and_error');
        });
        it('should_only_replay_values_within_its_buffer_size', 0, (done: any) => {
            const subject = new ReplaySubject<number>(2);
            const expects = [2, 3];
            let i = 0;
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.subscribe({
                next: (x: number) => {
                    expect(x).assertEqual(expects[i++]);
                    if (i === 2) {
                        subject.complete();
                    }
                },
                error: (err: any) => {
                    done(new Error('should not be called'));
                },
                complete: () => {
                    done();
                },
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new ReplaySubject<number>(2);
            }
            endTime(startTime, 'should_only_replay_values_within_its_buffer_size');
        });
        it('should_replay_2_previous_values_when_subscribed', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const replaySubject = new ReplaySubject<string>(2);
                let feedNextIntoSubject = (x: string) => {
                    replaySubject.next(x);
                };
                let feedErrorIntoSubject = (err: string) => {
                    replaySubject.error(err);
                };
                let feedCompleteIntoSubject = () => {
                    replaySubject.complete();
                };
                const sourceTemplate = ' -1-2-3----4------5-6---7--8----9--|';
                const subscriber1 = hot('------(a|)                         ').pipe(mergeMapTo(replaySubject));
                const unsub1 = '         ---------------------!             ';
                const expected1 = '      ------(23)4------5-6--             ';
                const subscriber2 = hot('------------(b|)                   ').pipe(mergeMapTo(replaySubject));
                const unsub2 = '         -------------------------!         ';
                const expected2 = '      ------------(34)-5-6---7--         ';
                const subscriber3 = hot('---------------------------(c|)    ').pipe(mergeMapTo(replaySubject));
                const expected3 = '      ---------------------------(78)9--|';
                expectObservable(hot(sourceTemplate)
                    .pipe(tap({
                    next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
                }))).toBe(sourceTemplate);
                expectObservable(subscriber1, unsub1).toBe(expected1);
                expectObservable(subscriber2, unsub2).toBe(expected2);
                expectObservable(subscriber3).toBe(expected3);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new ReplaySubject<string>(2);
                }
                endTime(startTime, 'should_replay_2_previous_values_when_subscribed');
            });
        });
        it('should_replay_2_last_values_for_when_subscribed_after_completed', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const replaySubject = new ReplaySubject<string>(2);
                let feedNextIntoSubject = (x: string) => {
                    replaySubject.next(x);
                };
                let feedErrorIntoSubject = (err: string) => {
                    replaySubject.error(err);
                };
                let feedCompleteIntoSubject = () => {
                    replaySubject.complete();
                };
                const sourceTemplate = ' -1-2-3--4--|';
                const subscriber1 = hot('---------------(a|) ').pipe(mergeMapTo(replaySubject));
                const expected1 = '      ---------------(34|)';
                expectObservable(hot(sourceTemplate)
                    .pipe(tap({
                    next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
                }))).toBe(sourceTemplate);
                expectObservable(subscriber1).toBe(expected1);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new ReplaySubject<string>(2);
                }
                endTime(startTime, 'should_replay_2_last_values_for_when_subscribed_after_completed');
            });
        });
        it('should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_does_not_complete', 0, () => {
            const subject = new ReplaySubject<number>(2);
            const results1: (number | string)[] = [];
            const results2: (number | string)[] = [];
            const results3: (number | string)[] = [];
            subject.next(1);
            subject.next(2);
            subject.next(3);
            subject.next(4);
            const subscription1 = subject.subscribe({
                next: (x: number) => {
                    results1.push(x);
                },
                error: () => {
                    results1.push('E');
                },
                complete: () => {
                    results1.push('C');
                },
            });
            subject.next(5);
            const subscription2 = subject.subscribe({
                next: (x: number) => {
                    results2.push(x);
                },
                error: () => {
                    results2.push('E');
                },
                complete: () => {
                    results2.push('C');
                },
            });
            subject.next(6);
            subject.next(7);
            subscription1.unsubscribe();
            subject.next(8);
            subscription2.unsubscribe();
            subject.next(9);
            subject.next(10);
            const subscription3 = subject.subscribe({
                next: (x: number) => {
                    results3.push(x);
                },
                error: () => {
                    results3.push('E');
                },
                complete: () => {
                    results3.push('C');
                },
            });
            subject.next(11);
            subscription3.unsubscribe();
            expect(results1).assertDeepEquals([3, 4, 5, 6, 7]);
            expect(results2).assertDeepEquals([4, 5, 6, 7, 8]);
            expect(results3).assertDeepEquals([9, 10, 11]);
            subject.complete();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                subject.subscribe({
                    next: (x: number) => {
                        results3.push(x);
                    },
                    error: () => {
                        results3.push('E');
                    },
                    complete: () => {
                        results3.push('C');
                    },
                });
            }
            endTime(startTime, 'should_handle_subscribers_that_arrive_and_leave_at_different_times_subject_does_not_complete');
        });
        it('should_replay_previous_values_since_4_time_units_ago_when_subscribed', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const replaySubject = ReplaySubjectFun(rxTestScheduler);
                let feedNextIntoSubject = (x: string) => {
                    replaySubject.next(x);
                };
                let feedErrorIntoSubject = (err: any) => {
                    replaySubject.error(err);
                };
                let feedCompleteIntoSubject = () => {
                    replaySubject.complete();
                };
                const sourceTemplate = ' -1-2-3----4------5-6----7-8----9--|';
                const subscriber1 = hot('------(a|)                         ').pipe(mergeMapTo(replaySubject));
                const unsub1 = '         ---------------------!             ';
                const expected1 = '      ------(23)4------5-6--             ';
                const subscriber2 = hot('------------(b|)                   ').pipe(mergeMapTo(replaySubject));
                const unsub2 = '         -------------------------!         ';
                const expected2 = '      ------------4----5-6----7-         ';
                const subscriber3 = hot('---------------------------(c|)    ').pipe(mergeMapTo(replaySubject));
                const expected3 = '      ---------------------------(78)9--|';
                expectObservable(hot(sourceTemplate)
                    .pipe(tap({
                    next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
                }))).toBe(sourceTemplate);
                expectObservable(subscriber1, unsub1).toBe(expected1);
                expectObservable(subscriber2, unsub2).toBe(expected2);
                expectObservable(subscriber3).toBe(expected3);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    ReplaySubjectFun(rxTestScheduler);
                }
                endTime(startTime, 'should_replay_previous_values_since_4_time_units_ago_when_subscribed');
            });
        });
        it('should_replay_last_values_since_4_time_units_ago_when_subscribed', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const replaySubject = ReplaySubjectFun(rxTestScheduler);
                let feedNextIntoSubject = (x: string) => {
                    replaySubject.next(x);
                };
                let feedErrorIntoSubject = (err: any) => {
                    replaySubject.error(err);
                };
                let feedCompleteIntoSubject = () => {
                    replaySubject.complete();
                };
                const sourceTemplate = ' -1-2-3----4|';
                const subscriber1 = hot('-------------(a|)').pipe(mergeMapTo(replaySubject));
                const expected1 = '      -------------(4|)';
                expectObservable(hot(sourceTemplate)
                    .pipe(tap({
                    next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
                }))).toBe(sourceTemplate);
                expectObservable(subscriber1).toBe(expected1);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    ReplaySubjectFun(rxTestScheduler);
                }
                endTime(startTime, 'should_replay_last_values_since_4_time_units_ago_when_subscribed');
            });
        });
        it('should_only_replay_bufferSize_items_when_4_time_units_ago_more_were_emited', 0, () => {
            rxTestScheduler.run((helpers: RunHelpers) => {
                let hot = helpers.hot;
                let expectObservable = helpers.expectObservable;
                const replaySubject = ReplaySubjectFun2(rxTestScheduler);
                let feedNextIntoSubject = (x: string) => {
                    replaySubject.next(x);
                };
                let feedErrorIntoSubject = (err: any) => {
                    replaySubject.error(err);
                };
                let feedCompleteIntoSubject = () => {
                    replaySubject.complete();
                };
                const sourceTemplate = ' 1234-------|';
                const subscriber1 = hot('----(a|)').pipe(mergeMapTo(replaySubject));
                const expected1 = '      ----(34)---|';
                expectObservable(hot(sourceTemplate)
                    .pipe(tap({
                    next: feedNextIntoSubject, error: feedErrorIntoSubject, complete: feedCompleteIntoSubject
                }))).toBe(sourceTemplate);
                expectObservable(subscriber1).toBe(expected1);
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    ReplaySubjectFun2(rxTestScheduler);
                }
                endTime(startTime, 'should_only_replay_bufferSize_items_when_4_time_units_ago_more_were_emited');
            });
        });
    });
    it('should_be_an_Observer_which_can_be_given_to_Observable_subscribe', 0, () => {
        const source = of(1, 2, 3, 4, 5);
        const subject = new ReplaySubject<number>(3);
        let results: (number | string)[] = [];
        subject.subscribe({
            next: (x) => results.push(x), complete: () => results.push('done')
        });
        source.subscribe(subject);
        expect(results).assertDeepEquals([1, 2, 3, 4, 5, 'done']);
        results = [];
        subject.subscribe({
            next: (x) => results.push(x), complete: () => results.push('done')
        });
        expect(results).assertEqual([3, 4, 5, 'done']);
        let startTime = new Date().getTime();
        for (let index = 0; index < BASE_COUNT; index++) {
            subject.subscribe({
                next: (x) => results.push(x), complete: () => results.push('done')
            });
        }
        endTime(startTime, 'should_be_an_Observer_which_can_be_given_to_Observable_subscribe');
    });
    it('should_not_buffer_nexted_values_after_complete', 0, () => {
        const results: (number | string)[] = [];
        const subject = new ReplaySubject<number>();
        subject.next(1);
        subject.next(2);
        subject.complete();
        subject.next(3);
        subject.subscribe({
            next: (value) => results.push(value),
            complete: () => results.push('C'),
        });
        expect(results).assertEqual([1, 2, 'C']);
        let startTime = new Date().getTime();
        for (let index = 0; index < BASE_COUNT; index++) {
            subject.subscribe({
                next: (value) => results.push(value),
                complete: () => results.push('C'),
            });
        }
        endTime(startTime, 'should_not_buffer_nexted_values_after_complete');
    });
    it('should_not_buffer_nexted_values_after_error', 0, () => {
        const results: (number | string)[] = [];
        const subject = new ReplaySubject<number>();
        subject.next(1);
        subject.next(2);
        subject.error(new Error('Boom!'));
        subject.next(3);
        subject.subscribe({
            next: (value) => results.push(value),
            error: () => results.push('E'),
        });
        expect(results).assertEqual([1, 2, 'E']);
        let startTime = new Date().getTime();
        for (let index = 0; index < BASE_COUNT; index++) {
            subject.subscribe({
                next: (value) => results.push(value),
                error: () => results.push('E'),
            });
        }
        endTime(startTime, 'should_not_buffer_nexted_values_after_complete');
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
