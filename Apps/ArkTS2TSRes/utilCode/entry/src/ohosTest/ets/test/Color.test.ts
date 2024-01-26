let __generate__Id: number = 0;
function generateId(): string {
    return "Color.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect, TestType } from '@ohos/hypium';
import randomColor from 'randomcolor';
export default function PictureTest() {
    describe('randomColor', () => {
        const BASE_COUNT = 2000; //循环次数，测试普通接口性能
        const BASELINE_HASSIMECASR = 300; //性能基线
        interface formatType {
            format: string;
        }
        let formatData: formatType = { format: 'hex' };
        it('randomColorFormat_rgb1', 0, () => {
            expect(randomColor.randomColor(formatData)).not().assertNull();
        });
        it('randomColorFormat_rgb2', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                randomColor.randomColor();
            }
            let endTime = new Date().getTime();
            console.info("randomColorFormat_rgb endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info("randomColorFormat_rgb averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
    });
}
