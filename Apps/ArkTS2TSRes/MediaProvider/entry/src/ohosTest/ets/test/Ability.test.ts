let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import Log from './Log';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { Driver, MatchPattern, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
export default function abilityTest() {
    const BUNDLE = 'MediaProvider_';
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
        /**
         * Start ability
         */
        it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
            Log.info(BUNDLE + `StartAbility_001 begin`);
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: 'com.samples.mediaprovider',
                    abilityName: 'EntryAbility'
                });
                expect(true).assertTrue();
            }
            catch (error) {
                Log.info(`Failed to start ability, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `StartAbility_001 end`);
            done();
        });
        /**
         * [Index]
         * After start the ability, check if text elements exist
         */
        it(BUNDLE + 'CheckPageElement_001', 0, async (done: Function) => {
            let driver = Driver.create();
            Log.info(BUNDLE + `CheckPageElement_001 begin`);
            try {
                driver = await Driver.create();
                await driver.delayMs(1000);
                await driver.assertComponentExist(ON.id('Title'));
                await driver.assertComponentExist(ON.id('Artist'));
                await driver.assertComponentExist(ON.id('Lyric'));
                expect(true).assertTrue();
            }
            catch (error) {
                Log.info(`Failed to get text elements, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `CheckPageElement_001 end`);
            done();
        });
        /**
         * [Index]
         * After start the ability, check if Button elements exist
         */
        it(BUNDLE + 'CheckPageElement_002', 0, async (done: Function) => {
            Log.info(BUNDLE + `CheckPageElement_002 begin`);
            let driver = Driver.create();
            try {
                await driver.delayMs(1000);
                await driver.assertComponentExist(ON.id('Previous'));
                await driver.assertComponentExist(ON.id('PlayOrPause'));
                await driver.assertComponentExist(ON.id('Next'));
                expect(true).assertTrue();
            }
            catch (error) {
                Log.info(`Failed to get button elements, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `CheckPageElement_002 end`);
            done();
        });
        /**
         * [Index]
         * Click PlayOrPause button
         */
        it(BUNDLE + 'PlayThenPause_001', 0, async (done: Function) => {
            Log.info(BUNDLE + `PlayThenPause_001 begin`);
            let driver = Driver.create();
            try {
                await driver.delayMs(1000);
                let pageTitleText = await driver.findComponent(ON.id('PageTitle'));
                let playOrPauseButton = await driver.findComponent(ON.id('PlayOrPause'));
                await playOrPauseButton.click();
                let pageTitle = await pageTitleText.getText();
                Log.info(`After click play button, the page title is ${pageTitle}`);
                expect(pageTitle === '正在播放').assertTrue();
                await playOrPauseButton.click();
                pageTitle = await pageTitleText.getText();
                Log.info(`After click pause button, the page title is ${pageTitle}`);
                expect(pageTitle === '未在播放').assertTrue();
                await driver.delayMs(1000);
            }
            catch (error) {
                Log.info(`Failed to get all page element, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `PlayThenPause_001 end`);
            done();
        });
        /**
         * [Index]
         * Click previous button
         */
        it(BUNDLE + 'PreviousMusic_001', 0, async (done: Function) => {
            Log.info(BUNDLE + `PreviousMusic_001 begin`);
            let driver = Driver.create();
            try {
                await driver.delayMs(1000);
                let titleText = await driver.findComponent(ON.id('Title'));
                let currentTitle = await titleText.getText();
                let previousButton = await driver.findComponent(ON.id('Previous'));
                await previousButton.click();
                await driver.delayMs(1000);
                let playOrPauseButton = await driver.findComponent(ON.id('PlayOrPause'));
                await playOrPauseButton.click();
                let previousTitle = await titleText.getText();
                Log.error(`a: ${currentTitle}    b: ${previousTitle}`);
                expect(currentTitle !== previousTitle).assertTrue();
            }
            catch (error) {
                Log.info(`Failed to play previous music, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `PreviousMusic_001 end`);
            done();
        });
        /**
         * [Index]
         * Click next button
         */
        it(BUNDLE + 'NextMusic_001', 0, async (done: Function) => {
            Log.info(BUNDLE + `NextMusic_001 begin`);
            let driver = Driver.create();
            try {
                await driver.delayMs(1000);
                let titleText = await driver.findComponent(ON.id('Title'));
                let currentTitle = await titleText.getText();
                let nextButton = await driver.findComponent(ON.id('Next'));
                await nextButton.click();
                await driver.delayMs(1000);
                let playOrPauseButton = await driver.findComponent(ON.id('PlayOrPause'));
                await playOrPauseButton.click();
                let nextTitle = await titleText.getText();
                expect(currentTitle !== nextTitle).assertTrue();
            }
            catch (error) {
                Log.info(`Failed to play next music, error info: ${error}`);
                expect().assertFail();
            }
            Log.info(BUNDLE + `NextMusic_001 end`);
            done();
        });
    });
}
