let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosConfigTest.test_" + ++__generate__Id;
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
import { describe, beforeAll, it, expect } from '@ohos/hypium';
import axios from '@ohos/axios';
import { AxiosRequestConfig, AxiosResponse } from '@ohos/axios';
import { normalResultModel, postDataModel, } from '../../../main/ets/types/types';
import { LOG, XTS_CONFIG } from '../../../main/ets/common/Common';
export default function AxiosConfigTest() {
    let config: AxiosRequestConfig;
    describe('AxiosConfigTest', () => {
        const HTTP_COUNT = 2; //循环测试：测试http接口性能
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        beforeAll(() => {
            config = {
                url: XTS_CONFIG.url,
                method: 'post',
                baseURL: XTS_CONFIG.baseURL,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    newDate: 1,
                    pageNum: 1,
                    pageSize: 9
                },
                timeout: 1000,
            };
        });
        // config url
        it('url', 0, async (done: Function) => {
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " url averageTime: " + averageTime + ' μs');
                        expect(res.config.url === config.url).assertTrue();
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // config method
        it('method', 1, async (done: Function) => {
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " method averageTime: " + averageTime + ' μs');
                        expect(res.config.method === config.method)
                            .assertTrue();
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // config baseURL
        it('baseURL', 2, async (done: Function) => {
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " baseURL averageTime: " + averageTime + ' μs');
                        expect(res.config.baseURL === config.baseURL)
                            .assertTrue();
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // config headers
        it('headers', 3, async (done: Function) => {
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " headers averageTime: " + averageTime + ' μs');
                        expect(res && res.config && res.config.headers && config && config.headers && (res.config.headers['Content-Type'] === config.headers['Content-Type']))
                            .assertTrue();
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // config timeout
        it('timeout', 4, async (done: Function) => {
            let startTime = new Date().getTime();
            axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config).then((res: AxiosResponse<normalResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " timeout averageTime: " + averageTime + ' μs');
                expect(res.config.timeout === config.timeout)
                    .assertTrue();
                done();
            });
        });
    });
}
