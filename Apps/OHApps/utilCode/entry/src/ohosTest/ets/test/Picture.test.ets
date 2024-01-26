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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'

import imtype from 'imtype';
import { GlobalContext } from './GlobalContext';

export default function PictureTest() {


  describe('PictureTest', () => {

    it('isJpg', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent( $r("app.media.jpg").id)
        .then(data => {
          expect(imtype.isJPG(new Uint8Array(data))).assertTrue()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })

    it('isPNG', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent($r("app.media.png").id)
        .then(data => {
          expect(imtype.isPNG(new Uint8Array(data))).assertTrue()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })
    it('isGIF', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent($r("app.media.gif").id)
        .then(data => {
          expect(imtype.isGIF(new Uint8Array(data))).assertTrue()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })
    it('isBMP', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent($r("app.media.bmp").id)
        .then(data => {
          expect(imtype.isBMP(new Uint8Array(data))).assertTrue()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })
    it('isTIF', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent($r("app.media.tif").id)
        .then(data => {
          expect(imtype.isTIF(new Uint8Array(data))).assertTrue()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })

    it('textTest', 0, () => {
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.resourceManager.getMediaContent($r("app.media.text").id)
        .then(data => {
          expect(imtype.isJPG(new Uint8Array(data))).assertFalse()
          expect(imtype.isPNG(new Uint8Array(data))).assertFalse()
          expect(imtype.isGIF(new Uint8Array(data))).assertFalse()
          expect(imtype.isBMP(new Uint8Array(data))).assertFalse()
          expect(imtype.isTIF(new Uint8Array(data))).assertFalse()
        })
        .catch((err:Error) => {
          console.log('addFileToDisk err=' + err)
        })
    })
  })
}