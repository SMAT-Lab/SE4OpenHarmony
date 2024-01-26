/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the BSD License, (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://opensource.org/licenses/BSD-3-Clause
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { Matcher } from '../Matcher';
import { Description } from '../Description';
export class OrderingComparison {
    private constructor() {
    }
    public static comparesEqualTo(value: number): Matcher<Number> {
        return {
            matches(actual: number): boolean {
                return value == actual;
            },
            describeMismatch(actual: number, mismatchDescription: Description): void {
                super.describeMismatch(actual, mismatchDescription);
            },
            describeTo(description: Description): void {
                description.appendText('equal to ').appendValue(value);
            }
        };
    }
    public static greaterThan(value: number): Matcher<Number> {
        return {
            matches(actual: number): boolean {
                return actual > value;
            },
            describeMismatch(actual: number, mismatchDescription: Description): void {
                super.describeMismatch(actual, mismatchDescription);
            },
            describeTo(description: Description): void {
                description.appendText('greater than ').appendValue(value);
            }
        };
    }
    public static greaterThanOrEqualTo(value: number): Matcher<Number> {
        return {
            matches(actual: number): boolean {
                return actual >= value;
            },
            describeMismatch(actual: number, mismatchDescription: Description): void {
                super.describeMismatch(actual, mismatchDescription);
            },
            describeTo(description: Description): void {
                description.appendText('greater than or equal to ').appendValue(value);
            }
        };
    }
    public static lessThan(value: number): Matcher<Number> {
        return {
            matches(actual: number): boolean {
                return actual < value;
            },
            describeMismatch(actual: number, mismatchDescription: Description): void {
                super.describeMismatch(actual, mismatchDescription);
            },
            describeTo(description: Description): void {
                description.appendText('less than ').appendValue(value);
            }
        };
    }
    public static lessThanOrEqualTo(value: number): Matcher<Number> {
        return {
            matches(actual: number): boolean {
                return actual <= value;
            },
            describeMismatch(actual: number, mismatchDescription: Description): void {
                super.describeMismatch(actual, mismatchDescription);
            },
            describeTo(description: Description): void {
                description.appendText('less than or equal to ').appendValue(value);
            }
        };
    }
}
