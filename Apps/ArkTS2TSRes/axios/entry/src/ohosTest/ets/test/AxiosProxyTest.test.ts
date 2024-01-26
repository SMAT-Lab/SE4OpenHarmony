let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosProxyTest.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, it, expect } from '@ohos/hypium';
import axios, { AxiosResponse } from '@ohos/axios';
import { LOG, XTS_CONFIG } from '../../../main/ets/common/Common';
export default function AxiosProxyTest() {
    describe('AxiosProxyTest.test', () => {
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        it('proxy', 0, async (done: Function) => {
            let startTime = new Date().getTime();
            axios({
                url: XTS_CONFIG.proxyHttps,
                method: 'get',
                proxy: {
                    host: XTS_CONFIG.host,
                    port: 6443,
                    exclusionList: []
                }
            }).then((res: AxiosResponse) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000;
                hilog.info(DOMAIN, TAG, " proxy averageTime: " + averageTime + ' μs');
                expect(res.status === 200).assertTrue();
                done();
            });
        });
        it('proxy_http', 1, async (done: Function) => {
            let startTime = new Date().getTime();
            axios({
                url: XTS_CONFIG.proxyHttp,
                method: 'get',
                proxy: {
                    host: XTS_CONFIG.host,
                    port: 6443,
                    exclusionList: []
                }
            }).then((res: AxiosResponse) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000;
                hilog.info(DOMAIN, TAG, " proxy_http averageTime: " + averageTime + ' μs');
                expect(res.status === 200).assertTrue();
                done();
            });
        });
    });
}
