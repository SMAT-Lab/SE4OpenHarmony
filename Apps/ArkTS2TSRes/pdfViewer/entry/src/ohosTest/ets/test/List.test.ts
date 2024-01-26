let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
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
import pngTest from './img2pdf/png.test';
import addimageTest from './img2pdf/addimage.test';
import jpegTest from './img2pdf/jpeg.test';
import addimageUint8ArrayTest from './img2pdf/Uint8Array.test';
import pagesTest from './img2pdf/pages.test';
import btoaTest from './img2pdf/btoa.test';
import fflateTest from './img2pdf/fflate.test';
export default function testsuite() {
    pngTest();
    addimageTest();
    jpegTest();
    addimageUint8ArrayTest();
    pagesTest();
    btoaTest();
    fflateTest();
}
