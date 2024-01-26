let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
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
export { HasProperty } from './src/main/ets/components/beans/HasProperty';
export { ArrayMatching } from './src/main/ets/components/collection/ArrayMatching';
export { HasItemInArray } from './src/main/ets/components/collection/HasItemInArray';
export { IsArray } from './src/main/ets/components/collection/IsArray';
export { IsArrayWithSize } from './src/main/ets/components/collection/IsArrayWithSize';
export { IsIn } from './src/main/ets/components/collection/IsIn';
export { IsMapContaining } from './src/main/ets/components/collection/IsMapContaining';
export { IsMapWithSize } from './src/main/ets/components/collection/IsMapWithSize';
export { AllOf } from './src/main/ets/components/core/AllOf';
export { AnyOf } from './src/main/ets/components/core/AnyOf';
export { CombinableMatcher } from './src/main/ets/components/core/CombinableMatcher';
export { Every } from './src/main/ets/components/core/Every';
export { Is } from './src/main/ets/components/core/Is';
export { IsAnything } from './src/main/ets/components/core/IsAnything';
export { IsEqual } from './src/main/ets/components/core/IsEqual';
export { IsInstanceOf } from './src/main/ets/components/core/IsInstanceOf';
export { IsIterableContaining } from './src/main/ets/components/core/IsIterableContaining';
export { IsNot } from './src/main/ets/components/core/IsNot';
export { IsNull } from './src/main/ets/components/core/IsNull';
export { IsSame } from './src/main/ets/components/core/IsSame';
export { ShortcutCombination } from './src/main/ets/components/core/ShortcutCombination';
export { StringContains } from './src/main/ets/components/core/StringContains';
export { StringEndsWith } from './src/main/ets/components/core/StringEndsWith';
export { StringRegularExpression } from './src/main/ets/components/core/StringRegularExpression';
export { StringStartsWith } from './src/main/ets/components/core/StringStartsWith';
export { SubstringMatcher } from './src/main/ets/components/core/SubstringMatcher';
export { ArrayIterator } from './src/main/ets/components/internal/ArrayIterator';
export { NullSafety } from './src/main/ets/components/internal/NullSafety';
export { SelfDescribingValue } from './src/main/ets/components/internal/SelfDescribingValue';
export { SelfDescribingValueIterator } from './src/main/ets/components/internal/SelfDescribingValueIterator';
export { IsCloseTo } from './src/main/ets/components/number/IsCloseTo';
export { IsNaN } from './src/main/ets/components/number/IsNaN';
export { OrderingComparison } from './src/main/ets/components/number/OrderingComparison';
export { CharSequenceLength } from './src/main/ets/components/text/CharSequenceLength';
export { IsBlankString } from './src/main/ets/components/text/IsBlankString';
export { IsEmptyString } from './src/main/ets/components/text/IsEmptyString';
export { IsEqualCompressingWhiteSpace } from './src/main/ets/components/text/IsEqualCompressingWhiteSpace';
export { IsEqualIgnoringCase } from './src/main/ets/components/text/IsEqualIgnoringCase';
export { MatchesPattern } from './src/main/ets/components/text/MatchesPattern';
export { MatcherAssert } from './src/main/ets/components/MatcherAssert';
export { CustomMatcher } from './src/main/ets/components/CustomMatcher';
export { BaseMatcher } from './src/main/ets/components/BaseMatcher';
export { DiagnosingMatcher } from './src/main/ets/components/DiagnosingMatcher';
export { FeatureMatcher } from './src/main/ets/components/FeatureMatcher';
export { BaseDescription } from './src/main/ets/components/BaseDescription';
