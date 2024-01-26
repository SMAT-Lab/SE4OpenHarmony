let __generate__Id: number = 0;
function generateId(): string {
    return "JpegComponent.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { JpegComponent } from '@ohos/metadata-extractor';
export default function JpegComponentTest() {
    describe('JpegComponentTest', () => {
        it('testGetComponentCharacter', 0, () => {
            let component: JpegComponent;
            component = new JpegComponent(1, 2, 3);
            expect("Y").assertEqual(component.getComponentName());
            component = new JpegComponent(2, 2, 3);
            expect("Cb").assertEqual(component.getComponentName());
            component = new JpegComponent(3, 2, 3);
            expect("Cr").assertEqual(component.getComponentName());
            component = new JpegComponent(4, 2, 3);
            expect("I").assertEqual(component.getComponentName());
            component = new JpegComponent(5, 2, 3);
            expect("Q").assertEqual(component.getComponentName());
        });
    });
}