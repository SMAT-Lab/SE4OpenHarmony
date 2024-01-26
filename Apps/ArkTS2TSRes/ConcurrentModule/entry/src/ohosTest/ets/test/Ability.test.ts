let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
const TAG = '[Sample_JSConcurrent]';
const DOMAIN = 0xF811;
const BUNDLE = 'JSConcurrent_';
let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
// 资源本地化
async function getResourceString(resource: Resource): Promise<string> {
    let manage = abilityDelegator.getAppContext().resourceManager;
    let text = await manage.getStringValue(resource);
    return text;
}
export default function abilityTest() {
    describe('abilityTest', () => {
        it('StartAbilityFunction_001', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 begin');
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: "com.samples.concurrentmodule",
                    abilityName: "EntryAbility"
                });
                done();
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, `StartAbility_001 exception = ${JSON.stringify(err)}`);
                expect().assertFail();
            }
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 end');
        });
        /**
         * Worker 批量拷贝文件
         */
        // 点击拷贝文件按钮
        it('WorkerCopyFileFunction_001', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_001 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('fileCopy'));
            let fileCopy = await driver.findComponent(ON.id('fileCopy'));
            await fileCopy.click();
            await driver.delayMs(200);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_001 end');
        });
        /**
         * Worker 批量拷贝文件
         */
        // 进入页面直接点击拷贝文件按钮
        it('WorkerCopyFileButtonFunction_001', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileButtonFunction_001 begin');
            let driver = await Driver.create();
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('copyFile'));
            let copyFile = await driver.findComponent(ON.id('copyFile'));
            await copyFile.click();
            await driver.delayMs(1000);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileButtonFunction_001 end');
        });
        /**
         * Worker 批量拷贝文件
         */
        // 选择文件拷贝
        it('WorkerCopyFileFunction_002', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_002 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            // 使用id寻找组件并点击，时间超过3min，因此采用坐标点击
            await driver.click(630, 272);
            await driver.click(630, 372);
            await driver.click(630, 472);
            await driver.delayMs(200);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_002 end');
        });
        /**
         * Worker 批量拷贝文件
         */
        // 拷贝文件
        it('WorkerCopyFileFunction_003', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_003 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('copyFile'));
            let copyFile = await driver.findComponent(ON.id('copyFile'));
            await copyFile.click();
            let copyFileLog1 = await getResourceString($r('app.string.copyFileLog1'));
            let copyFileLog2 = await getResourceString($r('app.string.copyFileLog2'));
            await driver.assertComponentExist(ON.text(copyFileLog1));
            await driver.assertComponentExist(ON.text(copyFileLog2));
            await driver.assertComponentExist(ON.id('backIndex2'));
            let backIndex = await driver.findComponent(ON.id('backIndex2'));
            await backIndex.click();
            await driver.delayMs(500);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerCopyFileFunction_003 end');
        });
        /**
         * Worker 字符串排序
         */
        // 点击字符串排序按钮
        it('WorkerFunction_000', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_000 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('strSort'));
            let strSortBt = await driver.findComponent(ON.id('strSort'));
            await strSortBt.click();
            await driver.delayMs(500);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_000 end');
        });
        /**
         * Worker 字符串排序
         */
        // 输入待排序字符串
        it('WorkerFunction_002', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_002 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('jsWorkerInPutTextArea'));
            let strInput = await driver.findComponent(ON.id('jsWorkerInPutTextArea'));
            await strInput.inputText('dses,ssdf,add');
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_002 end');
        });
        // 点击“字符串排序按钮”
        it('WorkerFunction_003', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_003 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('workerStrSort'));
            let workerStrBtn = await driver.findComponent(ON.id('workerStrSort'));
            await workerStrBtn.click();
            await driver.delayMs(500);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_003 end');
        });
        // 获取排序结果并检查
        it('WorkerFunction_004', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_004 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('jsWorkerOutPutScroll'));
            let outPutScroll = await driver.findComponent(ON.id('jsWorkerOutPutScroll'));
            let strOutput = await outPutScroll.scrollSearch(ON.id('jsWorkerOutPutText'));
            let strValue = await strOutput.getText();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_004 readValue：' + strValue);
            expect(strValue).assertEqual('add,dses,ssdf');
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_004 end');
        });
        // 点击清空按钮
        it('WorkerFunction_005', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_005 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('workerClearButton'));
            let workerClearBtn = await driver.findComponent(ON.id('workerClearButton'));
            await workerClearBtn.click();
            await driver.delayMs(500);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'WorkerFunction_005 end');
        });
        /**
         * TaskPool 字符串排序
         */
        // 点击TaskPool页签
        it('TaskPoolFunction_001', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_001 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('tabTaskPool'));
            let tabTaskPool = await driver.findComponent(ON.id('tabTaskPool'));
            await tabTaskPool.click();
            await driver.delayMs(500);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_001 end');
        });
        // 输入待排序字符串
        it('TaskPoolFunction_002', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_002 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('taskPoolInPutTextArea'));
            let strInput = await driver.findComponent(ON.id('taskPoolInPutTextArea'));
            await strInput.inputText('dses,ssdf,add');
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_002 end');
        });
        // 点击“立即执行”
        it('TaskPoolFunction_003', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_003 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('exeImmButton'));
            let exeImmBtn = await driver.findComponent(ON.id('exeImmButton'));
            await exeImmBtn.click();
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_003 end');
        });
        // 检查结果
        it('TaskPoolFunction_004', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_004 begin');
            let driver = Driver.create();
            await driver.delayMs(500);
            await driver.assertComponentExist(ON.id('taskPoolOutPutScroll'));
            let outPutScroll = await driver.findComponent(ON.id('taskPoolOutPutScroll'));
            let strOutput = await outPutScroll.scrollSearch(ON.id('taskPoolOutPutText'));
            let strValue = await strOutput.getText();
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_002 readValue：' + strValue);
            expect(strValue).assertEqual("Task executed successfully: add,dses,ssdf\n");
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'TaskPoolFunction_004 end');
        });
    });
}
