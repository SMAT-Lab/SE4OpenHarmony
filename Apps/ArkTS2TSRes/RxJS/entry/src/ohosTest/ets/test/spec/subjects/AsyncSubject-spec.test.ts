let __generate__Id: number = 0;
function generateId(): string {
    return "AsyncSubject-spec.test_" + ++__generate__Id;
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
import { describe, expect, it } from '@ohos/hypium';
import { AsyncSubject, Observer } from 'rxjs';
class TestObserver implements Observer<number> {
    results: (number | string)[] = [];
    next(value: number): void {
        this.results.push(value);
    }
    error(err: any): void {
        this.results.push(err);
    }
    complete(): void {
        this.results.push('done');
    }
}
export default function asyncSubjectTest() {
    /** @test {AsyncSubject} */
    describe('AsyncSubject', () => {
        it('should_emit_the_last_value_when_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.next(2);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals([2, 'done']);
        });
        it('should_emit_the_last_value_when_subscribing_after_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            subject.next(1);
            subject.next(2);
            subject.complete();
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([2, 'done']);
        });
        it('should_keep_emitting_the_last_value_to_subsequent_subscriptions', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const subscription = subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.next(2);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals([2, 'done']);
            subscription.unsubscribe();
            observer.results = [];
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([2, 'done']);
        });
        it('should_not_emit_values_after_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.next(2);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            subject.next(3);
            expect(observer.results).assertDeepEquals([2, 'done']);
        });
        it('should_not_allow_change_value_after_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const otherObserver = new TestObserver();
            subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals([1, 'done']);
            subject.next(2);
            subject.subscribe(otherObserver);
            expect(otherObserver.results).assertDeepEquals([1, 'done']);
        });
        it('should_not_emit_values_if_unsubscribed_before_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const subscription = subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.next(2);
            expect(observer.results).assertDeepEquals([]);
            subscription.unsubscribe();
            subject.next(3);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals([]);
        });
        it('should_just_complete_if_no_value_has_been_nexted_into_it', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals(['done']);
        });
        it('should_keep_emitting_complete_to_subsequent_subscriptions', 0, () => {
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const subscription = subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([]);
            subject.complete();
            expect(observer.results).assertDeepEquals(['done']);
            subscription.unsubscribe();
            observer.results = [];
            subject.error(new Error(''));
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals(['done']);
        });
        it('should_only_error_if_an_error_is_passed_into_it', 0, () => {
            const expected = new Error('bad');
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.error(expected);
            expect(observer.results).assertDeepEquals([expected]);
        });
        it('should_keep_emitting_error_to_subsequent_subscriptions', 0, () => {
            const expected = new Error('bad');
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const subscription = subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.error(expected);
            expect(observer.results).assertDeepEquals([expected]);
            subscription.unsubscribe();
            observer.results = [];
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([expected]);
        });
        it('should_not_allow_send_complete_after_error', 0, () => {
            const expected = new Error('bad');
            const subject = new AsyncSubject<number>();
            const observer = new TestObserver();
            const subscription = subject.subscribe(observer);
            subject.next(1);
            expect(observer.results).assertDeepEquals([]);
            subject.error(expected);
            expect(observer.results).assertDeepEquals([expected]);
            subscription.unsubscribe();
            observer.results = [];
            subject.complete();
            subject.subscribe(observer);
            expect(observer.results).assertDeepEquals([expected]);
        });
        it('should_not_be_reentrant_via_complete', 0, () => {
            const subject = new AsyncSubject<number>();
            let calls = 0;
            subject.subscribe({
                next: (value) => {
                    calls++;
                    if (calls < 2) {
                        // if this is more than 1, we're reentrant, and that's bad.
                        subject.complete();
                    }
                },
            });
            subject.next(1);
            subject.complete();
            expect(calls).assertDeepEquals(1);
        });
        it('should_not_be_reentrant_via_next', 0, () => {
            const subject = new AsyncSubject<number>();
            let calls = 0;
            subject.subscribe({
                next: (value) => {
                    calls++;
                    if (calls < 2) {
                        // if this is more than 1, we're reentrant, and that's bad.
                        subject.next(value + 1);
                    }
                },
            });
            subject.next(1);
            subject.complete();
            expect(calls).assertDeepEquals(1);
        });
        it('should_allow_reentrant_subscriptions', 0, () => {
            const subject = new AsyncSubject<number>();
            let results: any[] = [];
            subject.subscribe({
                next: (value) => {
                    subject.subscribe({
                        next: (value) => results.push('inner: ' + (value + value)),
                        complete: () => results.push('inner: done'),
                    });
                    results.push('outer: ' + value);
                },
                complete: () => results.push('outer: done'),
            });
            subject.next(1);
            expect(results).assertDeepEquals([]);
            subject.complete();
            expect(results).assertDeepEquals(['inner: 2', 'inner: done', 'outer: 1', 'outer: done']);
        });
    });
}
