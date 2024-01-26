let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Identifier, Region, BeaconParser, BeaconManager, RangeNotifier, Beacon } from '@ohos/beacon-library';
let beaconManager: BeaconManager;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        beforeAll(() => {
            beaconManager = BeaconManager.getInstanceForApplication();
        });
        it('identifier_parse', 0, () => {
            let serviceUuid: string = '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';
            let major: string = '1';
            expect("0,x,2,f,2,3,4,4,5,4,c,f,6,d,4,a,0,f,a,d,f,2,f,4,9,1,1,b,a,9,f,f,a,6").assertEqual(Identifier.parse(serviceUuid).toString());
            expect("1").assertEqual(Identifier.parse(major).toString());
        });
        it('identifier_from_int', 0, () => {
            expect(Identifier.fromInt(1).toString()).assertEqual("1");
        });
        it('identifier_from_long', 0, () => {
            expect(Identifier.fromLong(1, 1).toString()).assertEqual("0,x,0,1");
        });
        it('identifier_from_bytes', 0, () => {
            let byte: Array<number> = [1, 3, 2, 4, 9, 6];
            expect(Identifier.fromBytes(byte, 0, 5, false).toString()).assertEqual("0,x,0,1,0,3,0,2,0,4,0,9");
        });
        it('identifier_from_bytes_reverse', 0, () => {
            let byte: Array<number> = [1, 3, 2, 4, 9, 6];
            expect(Identifier.fromBytes(byte, 0, 5, true).toString()).assertEqual("0,x,0,9,0,4,0,2,0,3,0,1");
        });
        it('region_construct', 0, () => {
            let serviceUuid: string = '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';
            let major: string = '1';
            let minor: string = '2';
            let region: Region = new Region("myRangingUniqueId", Identifier.parse(serviceUuid), Identifier.parse(major), Identifier.parse(minor));
            expect(region).not().assertNull();
            expect("myRangingUniqueId").assertEqual(region.getUniqueId());
        });
        it('region_identifier', 0, () => {
            let serviceUuid: string = '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';
            let major: string = '1';
            let minor: string = '2';
            let region: Region = new Region("myRangingUniqueId", Identifier.parse(serviceUuid), Identifier.parse(major), Identifier.parse(minor));
            expect(region).not().assertNull();
            expect(region.getIdentifiers().length).assertEqual(3);
        });
        it('id', 0, () => {
            let serviceUuid: string = '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';
            let major: string = '1';
            let minor: string = '2';
            let region: Region = new Region("myRangingUniqueId", Identifier.parse(serviceUuid), Identifier.parse(major), Identifier.parse(minor));
            expect(region).not().assertNull();
            expect(region.getId1().toString()).assertEqual("0,x,2,f,2,3,4,4,5,4,c,f,6,d,4,a,0,f,a,d,f,2,f,4,9,1,1,b,a,9,f,f,a,6");
        });
    });
}
