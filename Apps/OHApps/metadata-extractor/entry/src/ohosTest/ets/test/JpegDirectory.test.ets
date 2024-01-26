

/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { Directory, JpegDirectory } from '@ohos/metadata-extractor';

let _directory: JpegDirectory;

export default function JpegDirectoryTest() {
  describe('JpegDirectoryTest',  () =>{
    beforeAll(() => {
      _directory = new JpegDirectory();
    })
    it('testSetAndGetValue',0, ()=>  {
      _directory.setInt(123, 8);
      expect(8).assertEqual(_directory.getInt(123));
    })

    it('testGetImageWidth',0, ()=>  {
      _directory.setInt(JpegDirectory.TAG_IMAGE_WIDTH, 123);
      expect(123).assertEqual(_directory.getImageWidth());
    })
    it('testGetImageHeight',0, ()=>  {
      _directory.setInt(JpegDirectory.TAG_IMAGE_HEIGHT, 123);
      expect(123).assertEqual(_directory.getImageHeight());
    })
    it('testGetNumberOfComponents',0, ()=>  {
      _directory.setInt(JpegDirectory.TAG_NUMBER_OF_COMPONENTS, 3);
      expect(3).assertEqual(_directory.getNumberOfComponents());
    })

  })
}