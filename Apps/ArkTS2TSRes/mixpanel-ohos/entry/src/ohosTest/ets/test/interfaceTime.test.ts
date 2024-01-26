let __generate__Id: number = 0;
function generateId(): string {
    return "interfaceTime.test_" + ++__generate__Id;
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
import { describe, expect, it, TestType } from '@ohos/hypium';
import mixpanel from '@ohos/mixpanel';
export default function InterfaceTime() {
    describe("InterfaceTime", () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        it("mixpaneltrack", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                mPanel.track('ab', {}, done);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel track:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel track:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpanel.init", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                mixpanel.init(token);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel track:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel track:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpaneltrackBatch", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                mPanel.trackBatch([], [], done);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel trackBatch:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel trackBatch:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpanelimport", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                mPanel.import([], 10, {}, done);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel import:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel import:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpanelimportBatch", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                mPanel.importBatch([], {}, done);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel importBatch:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel importBatch:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpanelalias", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                mPanel.alias('', '', done);
            }
            let endTime = new Date().getTime();
            console.log("mixpanel alias:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel alias:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("mixpanelsetConfig", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let token = '9b164f424c15d9d59b71efa4d9403a97';
                let mPanel = mixpanel.init(token);
                let result: any = mPanel.setConfig({
                    host: '',
                });
            }
            let endTime = new Date().getTime();
            console.log("mixpanel setConfig:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("mixpanel setConfig:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.setOnce", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.setOnce(distinctId, {
                    'place': 'Ahmedabad',
                    'Date': '23 Dec 2021'
                });
            }
            let endTime = new Date().getTime();
            console.log("people.setOnce:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.setOnce:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.set", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.set(distinctId, {
                    'gender': 'male',
                    'age': '28'
                });
            }
            let endTime = new Date().getTime();
            console.log("people.set:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.set:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.increment", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.increment(distinctId, {
                    'id': 1000,
                    'page_views': 500,
                    'count': -200,
                });
            }
            let endTime = new Date().getTime();
            console.log("people.increment:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.increment:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.append", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.append(distinctId, {
                    list1: 'abcd',
                    list2: 123
                });
            }
            let endTime = new Date().getTime();
            console.log("people.append:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.append:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.trackCharge", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.trackCharge(distinctId, { time: 40 }, {}, {}, {});
            }
            let endTime = new Date().getTime();
            console.log("people.trackCharge:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.trackCharge:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.clearCharges", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.clearCharges(distinctId, {}, done);
            }
            let endTime = new Date().getTime();
            console.log("people.clearCharges:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.clearCharges:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.deleteUser", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.deleteUser(distinctId, { time: 12 }, done);
            }
            let endTime = new Date().getTime();
            console.log("people.deleteUser:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.deleteUser:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.remove", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.remove(distinctId, {}, {}, {});
            }
            let endTime = new Date().getTime();
            console.log("people.remove:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.remove:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.union", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.union(distinctId, [4, 5], {}, {});
            }
            let endTime = new Date().getTime();
            console.log("people.union:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.union:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("people.unset", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let people = new mixpanel.MixPanelPeople(mPanel);
            let distinctId = 'mixpanel_distinctId';
            for (let index = 0; index < BASE_COUNT; index++) {
                people.unset(distinctId, [], {}, done);
            }
            let endTime = new Date().getTime();
            console.log("people.unset:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("people.unset:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.unset", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            for (let index = 0; index < BASE_COUNT; index++) {
                group.unset(groupKey, groupId, [2], {}, done);
            }
            let endTime = new Date().getTime();
            console.log("group.unset:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.unset:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.union", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            for (let index = 0; index < BASE_COUNT; index++) {
                group.union(groupKey, groupId, {}, {}, {});
            }
            let endTime = new Date().getTime();
            console.log("group.union:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.union:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.remove", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            for (let index = 0; index < BASE_COUNT; index++) {
                group.remove(groupKey, groupId, [2, 5], {}, {});
            }
            let endTime = new Date().getTime();
            console.log("group.remove:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.remove:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.set", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            for (let index = 0; index < BASE_COUNT; index++) {
                group.set('company', 'Acme Inc.', '$name', 'Acme Inc.');
            }
            let endTime = new Date().getTime();
            console.log("group.set:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.set:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.setOnce", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            for (let index = 0; index < BASE_COUNT; index++) {
                group.setOnce(groupKey, groupId, {
                    'name': 'abcdds',
                    'age': '2122',
                });
            }
            let endTime = new Date().getTime();
            console.log("group.setOnce:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.setOnce:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("group.deleteGroup", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            let token = '9b164f424c15d9d59b71efa4d9403a97';
            let mPanel = mixpanel.init(token);
            let group = new mixpanel.MixPanelGroups(mPanel);
            let groupKey = 'All';
            let groupId = 'test_chris';
            for (let index = 0; index < BASE_COUNT; index++) {
                group.deleteGroup(groupKey, groupId, [5], done);
            }
            let endTime = new Date().getTime();
            console.log("group.deleteGroup:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("group.deleteGroup:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
