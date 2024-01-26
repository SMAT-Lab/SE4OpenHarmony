let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
 * The MIT License (MIT)
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import abilityTest from './Ability.test';
import AxiosTest from './AxiosTest.test';
import AxiosConfigTest from './AxiosConfigTest.test';
import AxiosResponseTest from './AxiosResponseTest.test';
import AxiosCertificate from './AxiosCertificate.test';
import AxiosProxyTest from './AxiosProxyTest.test';
import AxiosUploadTest from './AxiosUploadTest.test';
import AxiosDownloadTest from './AxiosDownloadTest.test';
import AxiosPinning from './AxiosPinning.test';
export default function testsuite() {
    AxiosProxyTest();
    abilityTest();
    AxiosCertificate();
    AxiosTest();
    AxiosConfigTest();
    AxiosResponseTest();
    AxiosUploadTest();
    AxiosDownloadTest();
    //AxiosPinning()
}
