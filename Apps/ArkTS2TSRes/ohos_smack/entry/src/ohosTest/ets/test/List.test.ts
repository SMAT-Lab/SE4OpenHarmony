let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
import abilityTest from './Ability.test';
export default function testsuite() {
    abilityTest();
}