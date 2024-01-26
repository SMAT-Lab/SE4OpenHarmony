let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { ensureTimestamp } from '@ohos/mixpanel/src/main/js/utils';
import mixpanel from '@ohos/mixpanel';
import { mergeModifiers, ProfileHelpers } from '@ohos/mixpanel/src/main/js/profile_helpers.js';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('assertContain', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a = 'abc';
            let b = 'b';
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it('mixpanelTest01', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.track('ab', {}, done)).assertUndefined();
        });
        it('mixpanelTest02', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.track('a', done, done)).assertUndefined();
        });
        it('mixpanelTest45', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.track('123', done, done)).assertUndefined();
        });
        it('mixpanelTest46', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.track('null', done, done)).assertUndefined();
        });
        it('mixpanelTest03', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.trackBatch([], [], done)).assertUndefined();
        });
        it('mixpanelTest04', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.trackBatch([], done, done);
            expect(result.options).assertEqual('{}');
        });
        it('mixpanelTest47', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa';
            let mPanel = mixpanel.init(token);
            expect(mPanel.trackBatch([], [], done)).assertUndefined();
        });
        it('mixpanelTest48', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efaserfge123';
            let mPanel = mixpanel.init(token);
            expect(mPanel.trackBatch([], [], done)).assertUndefined();
        });
        it('mixpanelTest05', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.import([], 10, {}, done)).assertUndefined();
        });
        it('mixpanelTest06', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.import([], 10, done, done);
            let request: any = mPanel.sendEventRequest([], {}, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest49', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.import([], 5, done, done);
            let request: any = mPanel.sendEventRequest([], {}, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest50', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.import([], 100, done, done);
            let request: any = mPanel.sendEventRequest([], {}, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest07', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.importBatch([], {}, done)).assertUndefined();
        });
        it('mixpanelTest08', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.importBatch([], {}, done);
            expect(result.batchOptions.endpoint).assertEqual('/import');
        });
        it('mixpanelTest51', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71e';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.importBatch([], {}, done);
            expect(result.batchOptions.endpoint).assertEqual('/import');
        });
        it('mixpanelTest52', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71e';
            let mPanel = mixpanel.init(token);
            expect(mPanel.importBatch([], {}, done)).assertUndefined();
        });
        it('mixpanelTest09', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            expect(mPanel.alias('', '', done)).assertUndefined();
        });
        it('mixpanelTest10', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.alias('ab', '', done);
            let request: any = mPanel.track('', { distinctId: 'ab', alias: '' }, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest53', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.alias('a', '', done);
            let request: any = mPanel.track('', { distinctId: 'a', alias: '' }, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest54', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.alias('null', '', done);
            let request: any = mPanel.track('', { distinctId: 'null', alias: '' }, done);
            expect(result).assertEqual(request);
        });
        it('mixpanelTest11', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.setConfig({
                host: '',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest12', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let result: any = mPanel.setConfig({
                host: 'abc',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest55', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            // let config = {
            //   host:'a',
            // };
            let result: any = mPanel.setConfig({
                host: 'a',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest56', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            // let config = {
            //   host:'ef',
            // };
            let result: any = mPanel.setConfig({
                host: 'ef',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest13', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.setOnce(distinctId, {
                'place': 'Ahmedabad',
                'Date': '23 Dec 2021'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest14', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.setOnce(distinctId, {
                'place': 'Ahmed',
                'Date': '1 Dec 2023'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest57', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.setOnce(distinctId, {
                'place': 'abc',
                'Date': '13 Dec 2021'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest58', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.setOnce(distinctId, {
                'place': 'aaa',
                'Date': '11 Dec 2020'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest15', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.set(distinctId, {
                'gender': 'male',
                'age': '28'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest16', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.set(distinctId, {
                'gender': 'man',
                'age': '12'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest59', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.set(distinctId, {
                'gender': 'woman',
                'age': '18'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest60', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.set(distinctId, {
                'gender': 'false',
                'age': '20'
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest17', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.increment(distinctId, {
                'id': 1000,
                'page_views': 500,
                'count': -200,
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest18', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.increment(distinctId, {
                'id': 23,
                'page_views': 12,
                'count': -11,
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest61', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.increment(distinctId, {
                'id': 20,
                'page_views': 18,
                'count': -15,
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest62', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.increment(distinctId, {
                'id': 80,
                'page_views': 11,
                'count': -12,
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest19', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.append(distinctId, {
                list1: 'abcd',
                list2: 123
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest20', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.append(distinctId, {
                list1: 'mn',
                list2: 77
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest63', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.append(distinctId, {
                list1: 'ab',
                list2: 12
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest64', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.append(distinctId, {
                list1: 'a',
                list2: 18
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest21', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result: any = people.trackCharge(distinctId, {}, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest22', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.trackCharge(distinctId, { time: 10 }, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest65', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.trackCharge(distinctId, { time: 25 }, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest66', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.trackCharge(distinctId, { time: 40 }, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest23', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.clearCharges(distinctId, {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest24', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.clearCharges(distinctId, { time: 12 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest67', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.clearCharges(distinctId, { time: 20 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest68', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.clearCharges(distinctId, { time: 15 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest25', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.deleteUser(distinctId, { time: 12 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest26', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.deleteUser(distinctId, {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest69', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.deleteUser(distinctId, { time: 88 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest70', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.deleteUser(distinctId, { time: 22 }, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest27', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.remove(distinctId, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest28', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.remove(distinctId, [1, 3], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest71', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.remove(distinctId, [1, 18], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest72', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.remove(distinctId, [1, 22], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest29', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.union(distinctId, [1, 3], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest30', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.union(distinctId, [], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest73', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.union(distinctId, [4, 5], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest74', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.union(distinctId, [2, 5], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest31', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.unset(distinctId, [], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest32', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.unset(distinctId, [2], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest75', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.unset(distinctId, [3], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest76', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            let result = people.unset(distinctId, [2, 3, 4], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest33', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.unset(groupKey, groupId, [2], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest34', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.unset(groupKey, groupId, [2, 3, 1], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest77', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'ab';
            let groupId = 'test_chris';
            let result = group.unset(groupKey, groupId, [2], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest78', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'bbb';
            let groupId = 'test_chris';
            let result = group.unset(groupKey, groupId, [2, 21], {}, done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest35', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.union(groupKey, groupId, {}, {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest36', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.union(groupKey, groupId, [2, 5, 1], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest79', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'abc';
            let groupId = 'test_chris';
            let result = group.union(groupKey, groupId, [2], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest80', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'bbb';
            let groupId = 'test_chris';
            let result = group.union(groupKey, groupId, [23], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest37', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.remove(groupKey, groupId, [2, 5], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest38', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.remove(groupKey, groupId, [5], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest81', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'abc';
            let groupId = 'test_chris';
            let result = group.remove(groupKey, groupId, [20], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest82', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'bbb';
            let groupId = 'test_chris';
            let result = group.remove(groupKey, groupId, [12], {}, {});
            expect(result).assertUndefined();
        });
        it('mixpanelTest39', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.deleteGroup(groupKey, groupId, [5], done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest40', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.deleteGroup(groupKey, groupId, [1, 3], done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest83', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'abc';
            let groupId = 'test_chris';
            let result = group.deleteGroup(groupKey, groupId, [12], done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest84', 0, (done: Function) => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'bbb';
            let groupId = 'test_chris';
            let result = group.deleteGroup(groupKey, groupId, [81], done);
            expect(result).assertUndefined();
        });
        it('mixpanelTest41', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let result = group.set('company', 'Acme Inc.', '$name', 'Acme Inc.');
            expect(result).assertUndefined();
        });
        it('mixpanelTest42', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let result = group.set('company1', 'Acme Inc.', '$name', 'Acme Inc.');
            expect(result).assertUndefined();
        });
        it('mixpanelTest85', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let result = group.set('abc', 'Acme Inc.', '$name', 'Acme Inc.');
            expect(result).assertUndefined();
        });
        it('mixpanelTest86', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let result = group.set('abc', 'Acme Inc.', '$name', 'abc.');
            expect(result).assertUndefined();
        });
        it('mixpanelTest43', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.setOnce(groupKey, groupId, {
                'name': 'abcd',
                'age': '21',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest44', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            let result = group.setOnce(groupKey, groupId, {
                'name': 'abcdds',
                'age': '2122',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest87', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'abc';
            let groupId = 'test_chris';
            let result = group.setOnce(groupKey, groupId, {
                'name': 'aaa',
                'age': '2122',
            });
            expect(result).assertUndefined();
        });
        it('mixpanelTest88', 0, () => {
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'bbb';
            let groupId = 'test_chris';
            let result = group.setOnce(groupKey, groupId, {
                'name': 'bbb',
                'age': '18',
            });
            expect(result).assertUndefined();
        });
    });
}
