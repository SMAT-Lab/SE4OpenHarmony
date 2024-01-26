let __generate__Id: number = 0;
function generateId(): string {
    return "query.test_" + ++__generate__Id;
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
import { it, expect, describe } from "../utils/utils";
import dayjs from 'dayjs';
async function sleep(count: number): Promise<number> {
    return new Promise((res) => {
        let timeId = setTimeout(() => {
            res(count);
            clearTimeout(timeId);
        }, 1000);
    });
}
export default function queryTest() {
    describe('queryTest', () => {
        it('Compare_to_dayjs_object', async () => {
            const dayA = dayjs();
            const dayB = dayA.clone().add(1, 'day');
            const dayC = dayA.clone().subtract(1, 'day');
            await sleep(10);
            expect(dayC.isBefore(dayA)).toBe(true);
            expect(dayB.isAfter(dayA)).toBe(true);
            expect(dayA.isSame(dayjs())).toBe(false);
            expect(dayB.isAfter(dayA)).toBe(true);
            expect(dayC.isBefore(dayA)).toBe(true);
        });
        it('No_value', () => {
            const dayA = dayjs('2022.3.6 12:00:00');
            const dayB = dayA.clone().add(1, 'day');
            const dayC = dayA.clone().subtract(1, 'day');
            expect(dayA.isSame(dayjs('2022.3.6 12:00:00'))).toBe(true);
            expect(dayB.isAfter("")).toBe(false);
            expect(dayC.isBefore(dayA)).toBe(true);
        });
    });
}
