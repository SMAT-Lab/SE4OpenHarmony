let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { LiveEventBus, Lifecycle, MState, Observer, LifecycleOwner } from '@ohos/liveeventbus';
let TAG: string = 'liveEventBusDemo:';
const BASE_COUNT: number = 2000;
export default function abilityTests() {
    describe('abilityTests', () => {
        it('app_info_test_get', 0, () => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.getCore();
            }
            endTime(startTime, TAG + 'app_info_test_get');
            expect(LiveEventBus.getCore() != null).assertEqual(true);
        });
        it('app_info_test_getKey', 0, () => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>('key');
            }
            endTime(startTime, TAG + 'app_info_test_getKey');
            expect(LiveEventBus.get<string>('key') != null).assertEqual(true);
        });
        it('app_info_test_getConfig', 0, () => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.getObservableConfig('key');
            }
            endTime(startTime, TAG + 'app_info_test_getConfig');
            expect(LiveEventBus.getObservableConfig('key') != null).assertEqual(true);
        });
        it('app_info_test_post', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            console.info("app_info_test_post begin");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).post(testStr);
            }
            endTime(startTime, TAG + 'app_info_test_post');
            LiveEventBus.get<string>(key)
                .post(testStr);
        });
        it('app_info_test_postAcrossApp', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).postAcrossApp(testStr);
            }
            endTime(startTime, TAG + 'app_info_test_postAcrossApp');
            LiveEventBus.get<string>(key)
                .postAcrossApp(testStr);
        });
        it('app_info_test_postAcrossProcess', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).postAcrossProcess(testStr);
            }
            endTime(startTime, TAG + 'app_info_test_postAcrossProcess');
            LiveEventBus.get<string>(key)
                .postAcrossProcess(testStr);
        });
        it('app_info_test_broadcast', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).broadcast(testStr);
            }
            endTime(startTime, TAG + 'app_info_test_broadcast');
            LiveEventBus.get<string>(key)
                .broadcast(testStr);
        });
        it('app_info_test_postOrderly', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).postOrderly(testStr);
            }
            endTime(startTime, TAG + 'app_info_test_postOrderly');
            LiveEventBus.get<string>(key)
                .postOrderly(testStr);
        });
        it('app_info_test_post_delay', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).postDelay(testStr, 100);
            }
            endTime(startTime, TAG + 'app_info_test_post_delay');
            LiveEventBus.get<string>(key)
                .postDelay(testStr, 100);
        });
        it('app_info_test_postDemo', 0, () => {
            console.info(`post demo app_info_test_postDemo`);
            let testStr = 'value is ok';
            let key = 'SomeKeyDemo';
            LiveEventBus
                .get<string>(key)
                .observe(lifeOwner, {
                onChanged(demoEvent) {
                    console.info(`post demo :${demoEvent}`);
                    expect(demoEvent != null).assertEqual(true);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key)
                    .post(JSON.stringify(new DemoEvent(testStr)));
            }
            endTime(startTime, TAG + 'app_info_test_postDemo');
            LiveEventBus.get<string>(key)
                .post(JSON.stringify(new DemoEvent(testStr)));
            console.info(`post demo start :${testStr}`);
        });
        it('app_info_test_observer', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus
                    .get<string>(key)
                    .observe(lifeOwner, {
                    onChanged(s) {
                        expect(s).assertEqual(testStr);
                    }
                });
            }
            endTime(startTime, TAG + 'app_info_test_observer');
            LiveEventBus
                .get<string>(key)
                .observe(lifeOwner, {
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            LiveEventBus.get<string>(key)
                .post(testStr);
        });
        it('app_info_test_Forever', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus
                    .get<string>(key)
                    .observeForever({
                    onChanged(s) {
                        expect(s).assertEqual(testStr);
                    }
                });
            }
            endTime(startTime, TAG + 'app_info_test_Forever');
            LiveEventBus
                .get<string>(key)
                .observeForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            LiveEventBus.get<string>(key)
                .post(testStr);
        });
        it('app_info_test_Sticky', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            LiveEventBus.get<string>(key).post(testStr);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key)
                    .observeSticky(lifeOwner, {
                    onChanged(s) {
                        expect(s).assertEqual(testStr);
                    }
                });
            }
            endTime(startTime, TAG + 'app_info_test_Sticky');
            LiveEventBus.get<string>(key)
                .observeSticky(lifeOwner, {
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
        });
        it('app_info_test_Sticky_forever', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus
                    .get<string>(key)
                    .observeStickyForever({
                    onChanged(s) {
                        expect(s).assertEqual(testStr);
                    }
                });
            }
            endTime(startTime, TAG + 'app_info_test_Sticky_forever');
            LiveEventBus
                .get<string>(key)
                .observeStickyForever({
                onChanged(s) {
                    expect(s).assertEqual(testStr);
                }
            });
            LiveEventBus.get<string>(key)
                .post(testStr);
        });
        it('app_info_test_removeObserver', 0, () => {
            let testStr = 'value is ok';
            let key = 'SomeKey';
            let obs: Observer<string> = {
                onChanged(s: string) {
                    expect(s).assertEqual(testStr);
                }
            };
            LiveEventBus
                .get<string>(key)
                .observe(lifeOwner, obs);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LiveEventBus.get<string>(key).removeObserver(obs);
            }
            endTime(startTime, TAG + 'app_info_test_removeObserver');
            LiveEventBus.get<string>(key).removeObserver(obs);
        });
    });
}
const mLifecycle: Lifecycle = new Lifecycle(MState.STARTED);
const lifeOwner: LifecycleOwner = {
    getLifecycle(): Lifecycle {
        return mLifecycle;
    }
};
class DemoEvent {
    content: string;
    constructor(content: string) {
        this.content = content;
    }
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
