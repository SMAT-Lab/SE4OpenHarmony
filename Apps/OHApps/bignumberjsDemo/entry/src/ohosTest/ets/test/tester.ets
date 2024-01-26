/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { BigNumber } from './BigNumber';

export default class Test{

  public passed:number = 0;
  public testNumber:number = 0

  public constructor() {
    this.passed =  this.testNumber = 0;
  }

  public write(str:string) {
    console.log( '  Test number ' + str)
  }

  public isTrue(actual:boolean) {
    ++this.testNumber;
    if (actual === true) {
      ++this.passed;
      expect(actual).assertTrue()
    } else {
      console.log(
        '  Test number ' + this.testNumber + ' failed isTrue test' +
        '  Expected: true' +
        '  Actual:   ' + actual
      );
      expect(actual).assertTrue()
    }
  };

  public areEqual(expected:null |string |BigNumber.Format| boolean |(() => BigNumber)|number|BigNumber|Function|undefined, actual:string|Function |(() => BigNumber)|BigNumber.Format| boolean | number | null|undefined) {
    ++this.testNumber;
    // If expected and actual are both NaN, consider them equal.
    if (expected === actual || expected !== expected && actual !== actual) {
      ++this.passed;
      expect(true).assertTrue()
    } else {
      console.log(
        '  Test number ' + this.testNumber + ' failed areEqual test' +
        '  Expected: ' + expected +
        '  Actual:   ' + actual
      );
      expect(actual).assertTrue()
    }
  };

  public isException(func:Function, msg:string) {
    let actual:Error|null = null;
    ++this.testNumber;
    try {
      func();
    } catch (e) {
      actual = e;
    }
    if (actual instanceof Error && new RegExp("BigNumber Error").test(actual.message)) {
      ++this.passed;
      expect(true).assertTrue()
    } else if((actual || 'no exception') === 'no exception') {
      expect(true).assertTrue()
    }else{
      console.log('  Test number ' + this.testNumber + ' failed isException test' +
      '  Expected: ' + msg + ' to raise a BigNumber Error.'+ 'Actual:   ' + (actual || 'no exception'));
      expect(false).assertTrue()
    }
  };
};
