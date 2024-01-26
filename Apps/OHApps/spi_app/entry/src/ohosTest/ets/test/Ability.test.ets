/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON, UiWindow } from '@ohos.UiTest';
import Want from '@ohos.app.ability.Want';
import inputMethod from '@ohos.inputMethod';


const BUNDLE = 'com.um.spi_app';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'spiAppTest';
const DOMAIN = 0xF811;
let str = "write test";


export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  let shurufa = inputMethod.getController();
  describe('ActsAbilityTest', () => {
    beforeAll( () => {
    })
    beforeEach(() => {
    })
    afterEach(() => {
    })
    afterAll(() => {
    })
    /**
     * @tc.number    : StartAbility_001
     * @tc.name      : StartAbility_001
     * @tc.desc      : start entry ability
     */
    it(BUNDLE + ' StartAbility_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 begin`);
      let want :Want= {
        bundleName: BUNDLE,
        abilityName: ABILITY_NAME
      };
      delegator.startAbility(want, (err) => {
        hilog.info(DOMAIN, TAG, `${BUNDLE} startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 end`);
      done();
    })

    /**
     * @tc.number    : flash_Click_001
     * @tc.name      : flash_Click
     * @tc.desc      : test flash button
     */
    it(BUNDLE + 'flash_Click_001', 1, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flash_Click_001 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('flash_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `flash_Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flash_Click_001 end');
    });

    /**
     * @tc.number    : Add_Click_001
     * @tc.name      : Add_Click
     * @tc.desc      : test add button
     */
    it(BUNDLE + 'Add_Click_001', 2, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Add_Click_001 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('add_button'));
        await button.click()
        await driver.delayMs(500);
        await button.click()
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Add_Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Add_Click_001 end');
    });

    /**
     * @tc.number    : back_Click_001
     * @tc.name      : back_Click
     * @tc.desc      : test back button
     */
    it(BUNDLE + 'back_Click_001', 3, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' back_Click_001 begin');

      try {
        await driver.delayMs(500);
        let back_Click = await driver.findComponent(ON.id('back_Click'));
        await back_Click.click()
        let button = await driver.findComponent(ON.id('add_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `back_Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' back_Click_001 end');
    });

    /**
     * @tc.number    : date_check_001
     * @tc.name      : date_check
     * @tc.desc      : test date text valid
     */
    it(BUNDLE + 'date_check_001', 4, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' date_check_001 begin');

      try {
        await driver.delayMs(500);
        let current_date = new Date();
        let date_text = await driver.findComponent(ON.id("next_date"));
        let date = await date_text.getText();
        let Year_str = date.substring(0, 3)
        let Year = Number.parseInt(Year_str);
        expect(Year).not().assertEqual(current_date.getFullYear());
        let month_str = date.substring(5, 6)
        let month = Number.parseInt(month_str);
        expect(month).not().assertEqual(current_date.getMonth()+1);
        let day_str = date.substring(8, 9)
        let day = Number.parseInt(day_str);
        expect(day).not().assertEqual(current_date.getDate());
        hilog.info(DOMAIN, TAG, '%{public}s', `The date should be ${current_date}`);
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `date_check_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' date_check_001 end');
    });

    /**
     * @tc.number    : flashID_get_001
     * @tc.name      : flashID_get
     * @tc.desc      : test flashID button
     */
    it(BUNDLE + 'flashID_get_001', 5, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_get_001 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('flashID_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `flashID_get_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_get_001 end');
    });

    /**
     * @tc.number    : flashID_check_001
     * @tc.name      : flashID_check
     * @tc.desc      : check flashID valid
     */
    it(BUNDLE + 'flashID_check_001', 6, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_check_001 begin');

      try {
        await driver.delayMs(500);
        let TextArea = await driver.findComponent(ON.id("TextArea"));
        TextArea = await driver.findComponent(ON.id("TextArea"));
        let text = await TextArea.getText();
        hilog.info(DOMAIN, TAG, 'flashID_check_001 is %{public}s',text);
        expect(text).not().assertEqual(undefined)

        await driver.delayMs(500);
        let letter_check = await driver.findComponent(ON.id("max_font"));
        letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        hilog.info(DOMAIN, TAG, "The font num is %{public}d",number);
        expect(number).assertEqual(text.length)
        done()
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `flashID_check_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_check_001 end');
    });

    /**
     * @tc.number    : flashID_write_001
     * @tc.name      : flashID_write
     * @tc.desc      : test write ability
     */
    it(BUNDLE + 'flashID_write_001', 7, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_write_001 begin');

      try {
        await driver.delayMs(500);
        let flashID_write = await driver.findComponent(ON.id("write_button"));
        await flashID_write.click()
        await driver.delayMs(500);
        await driver.click(218, 395)
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('flashID_button'));
        await button.click()
        await driver.delayMs(500);
        await flashID_write.click()
        await driver.delayMs(500);
        await driver.click(585, 395)
        await driver.delayMs(500);
        let Add = await driver.findComponent(ON.id('add_button'))
        await Add.click();
        await driver.delayMs(500);

        let letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        hilog.info(DOMAIN, TAG, "The font num is %{public}d",number);
        expect(number).assertEqual(20)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `flashID_write_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' flashID_write_001 end');
    });

    /**
     * @tc.number    : deviceID_get_001
     * @tc.name      : deviceID_get
     * @tc.desc      : test deviceID button
     */
    it(BUNDLE + 'deviceID_get_001', 8, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_get_001 begin');

      try {
        let button = await driver.findComponent(ON.id('deviceID_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `deviceID_get_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_get end');
    });

    /**
     * @tc.number    : deviceID_check_001
     * @tc.name      : deviceID_check
     * @tc.desc      : check deviceID ability
     */
    it(BUNDLE + 'deviceID_check_001', 9, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_check_001 begin');

      try {
        await driver.delayMs(500);
        let TextArea = await driver.findComponent(ON.id("TextArea"));
        let text = await TextArea.getText();
        hilog.info(DOMAIN, TAG, '%{public}s', `deviceID_check_001 is ${text}`);
        expect(text).assertEqual("deviceID:15ef")
        await driver.delayMs(500);
        let letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        expect(number).assertEqual(text.length)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `deviceID_check err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_check end');
    });

    /**
     * @tc.number    : deviceID_write_001
     * @tc.name      : deviceID_write_001
     * @tc.desc      : check write deviceID ability
     */
    it(BUNDLE + 'deviceID_write_001', 10, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_write_001 begin');

      try {
        await driver.delayMs(500);
        let deviceID_write = await driver.findComponent(ON.id("write_button"));
        await deviceID_write.click()
        await driver.delayMs(500);
        await driver.click(218, 395)
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('deviceID_button'));
        await button.click()
        await driver.delayMs(500);
        await deviceID_write.click()
        await driver.delayMs(500);
        await driver.click(585, 395)
        await driver.delayMs(500);
        let Add = await driver.findComponent(ON.id('add_button'))
        await Add.click();
        await driver.delayMs(500);
        await Add.click()
        await driver.delayMs(500);

        let letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        expect(num).not().assertEqual(undefined)
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        hilog.info(DOMAIN, TAG, "The font num is %{public}d",number);
        expect(number).assertEqual(17)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `deviceID_write_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' deviceID_write_001 end');
    });

    /**
     * @tc.number    : text_enter_001
     * @tc.name      : text_enter
     * @tc.desc      : check write text ability
     */
    it(BUNDLE + 'text_enter_001', 11, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' text_enter_001 begin');

      try {
        await driver.delayMs(500);
        let Text = await driver.findComponent(ON.id("TextArea"));
        await Text.inputText(str)
        await shurufa.hideTextInput();
        let text = await Text.getText();
        hilog.info(DOMAIN, TAG, "The GetText is %{public}s",text);
        await driver.delayMs(500);

        let letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        expect(num).not().assertEqual(undefined)
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        hilog.info(DOMAIN, TAG, "The font num is %{public}d",number);
        expect(number).assertEqual(text.length)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `text_enter_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' text_enter_001 end');
    });

    /**
     * @tc.number    : text_enter_002
     * @tc.name      : text_enter
     * @tc.desc      : check write text and save ability
     */
    it(BUNDLE + 'text_enter_002', 12, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' text_enter_002 begin');

      try {
        await driver.delayMs(500);
        let Button = await driver.findComponent(ON.id("write_button"));
        await Button.click();
        await driver.delayMs(500);
        await driver.click(218, 395)
        await driver.delayMs(500);
        let Text = await driver.findComponent(ON.id("TextArea"));
        await Text.inputText(str)
        await shurufa.hideTextInput();
        await driver.delayMs(500);
        await Button.click()
        await driver.delayMs(500);
        await driver.click(585, 395)
        await driver.delayMs(500);
        await shurufa.hideTextInput();
        let Add = await driver.findComponent(ON.id('add_button'))
        await Add.click();
        await driver.delayMs(100);
        await Add.click()

        let letter_check = await driver.findComponent(ON.id("max_font"));
        let num = await letter_check.getText();
        expect(num).not().assertEqual(undefined)
        let letter_num = num.substring(0,num.indexOf("/"))
        let number = Number.parseInt(letter_num);
        hilog.info(DOMAIN, TAG, "The font num is %{public}d",number);
        expect(number).assertEqual(0)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `text_enter_002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' text_enter_002 end');
    });

    /**
     * @tc.number    : MBFree_check_001
     * @tc.name      : MBFree_check
     * @tc.desc      : check free MBFree valid
     */
    it(BUNDLE + 'MBFree_check_001', 13, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' MBFree_check_001 begin');

      try {
        await driver.delayMs(100);
        let back_Click = await driver.findComponent(ON.id('back_Click'));
        await back_Click.click()
        await driver.delayMs(300);
        let MBFree_text = await driver.findComponent(ON.id("MB_Free"));
        let MBFree = await MBFree_text.getText();
        let MBFree_Num = MBFree.substring(MBFree.indexOf(":") + 1, MBFree.indexOf("%"))
        let Num = Number.parseInt(MBFree_Num);
        hilog.info(DOMAIN, TAG, '%{public}s', `The MBFree should be ${MBFree}`);
        hilog.info(DOMAIN, TAG, '%{public}s', `The MBFree_Num should be ${MBFree_Num}`);
        expect(MBFree).not().assertEqual(undefined)
        expect(Num).assertLarger(0)
        expect(Num).assertLess(100)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `MBFree001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' MBFree_check_001 end');
    });

    /**
     * @tc.number    : CleanupAbility_001
     * @tc.name      : CleanupAbility_001
     * @tc.desc      : test cleanup ability
     */
    it(BUNDLE + 'CleanupAbility_001', 14, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CleanupAbility_001 begin');

      try {
        await driver.delayMs(100);
        let clean_up_button = await driver.findComponent(ON.id("clean_up_button"));
        await clean_up_button.click();
        await driver.delayMs(500);
        await driver.click(585, 395);
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CleanupAbility_check err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CleanupAbility end');
    });


  })
}
