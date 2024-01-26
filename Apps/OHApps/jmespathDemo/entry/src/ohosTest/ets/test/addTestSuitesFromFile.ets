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
import { expect } from '@ohos/hypium'
import JmesPath from 'jmespath';

interface TestCase {
  expression: string;
  result: Object;
  error: string;
}

interface TestSuite {
  given: Object;
  cases: TestCase[];
}

async function readJsonSync(dirPath: string): Promise<Uint8Array | undefined> {
  let file: Uint8Array | undefined;
  await new Promise<void>((resolve, reject) => {
    getContext().resourceManager.getRawFileContent(dirPath, (error, value) => {
      if (error != null) {
        console.log("error is " + error);
        reject(error);
      } else {
        file = value;
        resolve();
      }
    });
  });
  return file;
}

export default function addTestSuitesFromFile(fileName: string) {
  readJsonSync(fileName).then((result) => {
    let uint8Array: Uint8Array | undefined = result;
    if (uint8Array && uint8Array.length > 0) {
      let stringData: string = '';
      for (let i = 0; i < uint8Array.length; i++) {
        stringData += String.fromCharCode(uint8Array[i]);
      }
      let testSuites: TestSuite[] = JSON.parse(stringData);
      for (let i = 0; i < testSuites.length; i++) {
        const given: Object = testSuites[i].given;
        const cases: TestCase[] = testSuites[i].cases;
        for (let j = 0; j < cases.length; j++) {
          const testcase = cases[j];
          if (testcase.error !== undefined) {
            // For now just verify that an error is thrown
            // for error tests.
            expect(given).assertThrowError(testcase.expression);
          } else {
            expect(JmesPath.search(given, testcase.expression)).assertDeepEquals(testcase.result);
          }
        }
      }
    }
  })
}
