let __generate__Id: number = 0;
function generateId(): string {
    return "Utils.test_" + ++__generate__Id;
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
import Utils from 'dayjs/esm/utils';
import { it, expect, describe } from "../utils/utils";
declare class Instance {
    utcOffset: () => string | number;
}
const prettyUnit: (u: string) => string = Utils.p;
const padStart: (string: number, length: number, pad: string) => string | number = Utils.s;
const padZoneStr: (instance: Instance) => string = Utils.z;
export default function utilsTest() {
    describe('utilsTest', () => {
        it('PrettyUnit_abc', () => {
            expect(prettyUnit('Days')).toBe('day');
            expect(prettyUnit('days')).toBe('day');
            expect(prettyUnit('day')).toBe('day');
            expect(prettyUnit('quarter')).toBe('quarter');
            expect(prettyUnit('quarters')).toBe('quarter');
            expect(prettyUnit('D')).toBe('date');
            expect(prettyUnit('d')).toBe('day');
            expect(prettyUnit('M')).toBe('month');
            expect(prettyUnit('y')).toBe('year');
            expect(prettyUnit('h')).toBe('hour');
            expect(prettyUnit('m')).toBe('minute');
            expect(prettyUnit('s')).toBe('second');
            expect(prettyUnit('ms')).toBe('millisecond');
            expect(prettyUnit('Q')).toBe('quarter');
            expect(prettyUnit('')).toBe('');
        });
        it('PadZoneStr', () => {
            const instance: Instance = { utcOffset: () => '' };
            instance.utcOffset = () => 0 * -1;
            expect(padZoneStr(instance)).toBe('+00:00');
            instance.utcOffset = () => 1 * 60 * -1;
            expect(padZoneStr(instance)).toBe('-01:00');
            instance.utcOffset = () => -1 * 60 * -1;
            expect(padZoneStr(instance)).toBe('+01:00');
            instance.utcOffset = () => -10 * 60 * -1;
            expect(padZoneStr(instance)).toBe('+10:00');
            instance.utcOffset = () => 10 * 60 * -1;
            expect(padZoneStr(instance)).toBe('-10:00');
            instance.utcOffset = () => ((-5 * 60) - 30) * -1;
            expect(padZoneStr(instance)).toBe('+05:30');
        });
        it('PadStart', () => {
            expect(padStart(1, 2, '0')).toBe('01');
            expect(padStart(0, 2, '0')).toBe('00');
        });
    });
}
