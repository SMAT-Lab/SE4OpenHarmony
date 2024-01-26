/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';

const TAG = '[Sample_Picker]';
const DOMAIN = 0xF811;
const BUNDLE = 'JSPicker_';

let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
// 资源本地化
async function getResourceString(resource: Resource): Promise<string> {
  let manage = abilityDelegator.getAppContext().resourceManager;
  let text = await manage.getStringValue(resource);
  return text;
}

export default function abilityTest() {
  describe('abilityTest', () => {

    /**
     * 拉起相机拍三张照片
     */
    it('NewPhotos_001', 0, async (done: Function) => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewPhotos_001 begin');
      let driver = await Driver.create();
      let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
      try {
        await abilityDelegatorRegistry.startAbility({
          bundleName: 'com.ohos.camera',
          abilityName: 'com.ohos.camera.MainAbility'
        });
        await driver.delayMs(4000);
        await driver.click(360, 1090);
        await driver.delayMs(1000);
        await driver.click(360, 1090);
        await driver.delayMs(1000);
        await driver.click(360, 1090);
        await driver.delayMs(1000);
        done();
      } catch (err) {
        expect(0).assertEqual(err?.code);
        done();
      }
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewPhotos_001 end');
    })

    /**
     * 拉起相机拍三段视频
     */
    it('NewVideo_001', 0, async (done: Function) => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewVideo_001 begin');
      let driver = await Driver.create();
      let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
      try {
        await abilityDelegatorRegistry.startAbility({
          bundleName: 'com.ohos.camera',
          abilityName: 'com.ohos.camera.MainAbility'
        });

        let video = await getResourceString($r('app.string.video'));
        await driver.assertComponentExist(ON.text(video));
        let videoComponent = await driver.findComponent(ON.text(video));
        await videoComponent.click();
        await driver.delayMs(1000);

        /* 录制第一段视频 */
        await driver.click(360, 1090);
        await driver.delayMs(3000);

        // 使用text找不到组件，因此采用坐标
        await driver.click(395, 1096); // 暂停视频录制
        await driver.delayMs(500);

        await driver.click(316, 1096); // 停止视频录制，进行保存
        await driver.delayMs(500);

        /* 录制第二、三段视频 */
        await driver.delayMs(500);
        await driver.click(360, 1090);
        await driver.delayMs(3000);
        await driver.click(395, 1096);
        await driver.delayMs(500);
        await driver.click(316, 1096);
        await driver.delayMs(500);

        await driver.delayMs(500);
        await driver.click(360, 1090);
        await driver.delayMs(3000);
        await driver.click(395, 1096);
        await driver.delayMs(500);
        await driver.click(316, 1096); // 停止视频录制，进行保存
        await driver.delayMs(500);

        /* 恢复初始页面 */
        let photo = await getResourceString($r('app.string.photo'));
        await driver.assertComponentExist(ON.text(photo));
        let photoComponent = await driver.findComponent(ON.text(photo));
        await photoComponent.click();
        await driver.delayMs(1000);
        done();
      } catch (err) {
        expect(0).assertEqual(err?.code);
        done();
      }
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewVideo_001 end');
    })

    /* 拉起应用 */
    it('StartAbilityFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 begin');
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
      try {
        await abilityDelegator.startAbility({
          bundleName: "com.samples.picker",
          abilityName: "EntryAbility"
        });
        done();
      } catch (err) {
        expect(err?.code).assertEqual(0);
        done();
      }
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 end');
    })

    /**
     * Picker 赋权限
     */
    // 点击允许
    it('RequestPermissionFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'RequestPermissionFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(2000);
      let permit = await getResourceString($r('app.string.permit'));
      await driver.assertComponentExist(ON.text(permit));
      let permit1 = await driver.findComponent(ON.text(permit));
      await permit1.click();
      await driver.delayMs(1000);
      let permit2 = await driver.findComponent(ON.text(permit));
      await permit2.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'RequestPermissionFunction_001 end');
    })

    /**
     * Picker 增加文件、文件夹
     */
    // 点击增加文件、文件夹图标
    it('NewFileFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewFileFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);

      await driver.assertComponentExist(ON.id('newFile'));
      let newFile = await driver.findComponent(ON.id('newFile'));
      await newFile.click();

      //增加filePicker权限申请
      await driver.delayMs(1000);
      let permit = await getResourceString($r('app.string.permit'));
      hilog.info(DOMAIN, TAG, BUNDLE + 'permit ccc is: ' + permit);

      let permit1 = await driver.findComponent(ON.text(permit));
      hilog.info(DOMAIN, TAG, BUNDLE + 'permit1 is: ' + permit1);
      if (permit1 !== null) {
        await permit1.click();
        await driver.delayMs(1000);

        let permit2 = await driver.findComponent(ON.text(permit));
        hilog.info(DOMAIN, TAG, BUNDLE + 'permit2 is: ' + permit2);
        if (permit2 !== null) {
          await permit2.click();
          await driver.delayMs(1000);
        }
      }

      await driver.delayMs(3000);
      await driver.assertComponentExist(ON.type('Image'))
      let imgs = await driver.findComponents(ON.type('Image'));
      await imgs[9].click(); // 新建文件夹
      await driver.delayMs(1000);
      let newDir = await getResourceString($r('app.string.new_dir'));
      let confirm = await getResourceString($r('app.string.label_confirm'));
      await driver.assertComponentExist(ON.text(newDir));
      await driver.assertComponentExist(ON.text(confirm));
      let createDir = await driver.findComponent(ON.text(confirm));
      await createDir.click(); // 新建文件夹-点击确定图标
      await driver.delayMs(2000);
      await imgs[10].click(); // 新建文件并保存-点击保存图标

      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'NewFileFunction_001 end');
    })

    /**
     * Picker 编辑文件
     */
    // 编辑文件并保存
    it('EditFileFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'EditFileFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(500);
      await driver.assertComponentExist(ON.id('editable'));
      let editable = await driver.findComponent(ON.id('editable'));
      await editable.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('textArea'));
      let textArea = await driver.findComponent(ON.id('textArea'));
      await textArea.inputText('File Content');
      await driver.delayMs(500);
      await driver.assertComponentExist(ON.id('save'));
      let save = await driver.findComponent(ON.id('save'));
      await save.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('backIndex'));
      let backIndex = await driver.findComponent(ON.id('backIndex'));
      await backIndex.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'EditFileFunction_001 end');
    })

    /**
     * Picker 另存为
     */
    // 点击文件另存为
    it('SaveAsFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'SaveAsFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.type('ListItem'));
      let files = await driver.findComponents(ON.type('ListItem'));
      await files[0].click();
      await driver.delayMs(2000);
      await driver.assertComponentExist(ON.id('saveAs'));
      let editable = await driver.findComponent(ON.id('saveAs'));
      await editable.click();
      await driver.delayMs(2000);
      await driver.assertComponentExist(ON.type('Image'))
      let imgs = await driver.findComponents(ON.type('Image'));
      await imgs[9].click(); // 新建文件夹
      await driver.delayMs(1000);
      let newDir = await getResourceString($r('app.string.new_dir'));
      let confirm = await getResourceString($r('app.string.label_confirm'));
      await driver.assertComponentExist(ON.text(newDir));
      await driver.assertComponentExist(ON.text(confirm));
      await driver.delayMs(2000);
      let createDir = await driver.findComponent(ON.text(confirm));
      await createDir.click(); // 新建文件夹-点击确定图标
      await driver.delayMs(2000);
      await imgs[10].click(); // 新建文件并保存-点击保存图标
      await driver.pressBack();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'SaveAsFunction_001 end');
    })

    /**
     * Picker 选择图片
     */
    // 选择图片并查看
    it('SelectPictureFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectPictureFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('picture'));
      let picture = await driver.findComponent(ON.id('picture'));
      await picture.click();
      await driver.delayMs(6000);
      // 系统 picker 拉起的页面无法通过自定义id找到组件，因此采用控件类型
      await driver.assertComponentExist(ON.type('GridItem'));
      let gridItems = await driver.findComponents(ON.type('GridItem'));
      await gridItems[4].click();
      await driver.delayMs(500);
      await gridItems[5].click();
      await driver.delayMs(500);
      await gridItems[6].click();
      await driver.delayMs(500);
      let finishText = await getResourceString($r('app.string.finish'));
      await driver.assertComponentExist(ON.text(finishText));
      let finish = await driver.findComponent(ON.text(finishText));
      await finish.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('back2Index'));
      let back2Index = await driver.findComponent(ON.id('back2Index'));
      await back2Index.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectPictureFunction_001 end');
    })

    /**
     * Picker 选择视频
     */
    // 选择视频并查看
    it('SelectVideoFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectVideoFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('picture'));
      let picture = await driver.findComponent(ON.id('picture'));
      await picture.click();
      await driver.delayMs(6000);
      await driver.assertComponentExist(ON.type('Image'));
      let choseType = await driver.findComponents(ON.type('Image'));
      await choseType[4].click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.type('GridItem'));
      let gridItems = await driver.findComponents(ON.type('GridItem'));
      await gridItems[4].click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.type('GridItem'));
      let videoItems = await driver.findComponents(ON.type('GridItem'));
      await videoItems[4].click();
      await driver.delayMs(500);
      await videoItems[5].click();
      await driver.delayMs(500);
      await videoItems[6].click();
      await driver.delayMs(1000);
      let finishText = await getResourceString($r('app.string.finish'));
      await driver.assertComponentExist(ON.text(finishText));
      let finish = await driver.findComponent(ON.text(finishText));
      await finish.click();
      await driver.delayMs(3000);
      await driver.assertComponentExist(ON.type("Video"));
      let playVideo = await driver.findComponents(ON.type("Video"));
      await playVideo[0].click();
      await driver.delayMs(2000);
      // 获取视频的大小，名称信息，无法通过id,text,type获取，故使用坐标
      await driver.click(458, 610);
      await driver.delayMs(2000);
      await driver.click(450, 914);
      await driver.delayMs(2000);
      await driver.assertComponentExist(ON.id('back2Index'));
      let back2Index = await driver.findComponent(ON.id('back2Index'));
      await back2Index.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectVideoFunction_001 end');
    })

    /**
     * Picker 我的手机
     */
    // 选择我的手机并查看
    it('SelectMyPhoneFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectMyPhoneFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('folder'));
      let folder = await driver.findComponent(ON.id('folder'));
      await folder.click();
      await driver.delayMs(6000);

      // 选择新建文件夹中的文件
      let newFolder = await getResourceString($r('app.string.newFolder'));
      await driver.assertComponentExist(ON.text(newFolder, MatchPattern.EQUALS));
      let choseDir = await driver.findComponent(ON.text(newFolder, MatchPattern.EQUALS));
      await choseDir.click();
      await driver.delayMs(2000);

      // 查看文件
      await driver.assertComponentExist(ON.type('ListItem'));
      let files = await driver.findComponents(ON.type('ListItem'));
      await files[0].click();
      await driver.delayMs(1000);
      await driver.pressBack();
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectMyPhoneFunction_001 end');
    })
  })
}