let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosResponseTest.test_" + ++__generate__Id;
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
import { normalResultModel, postDataModel } from '../../../main/ets/types/types';
import { LOG, XTS_CONFIG } from '../../../main/ets/common/Common';
export default function AxiosResponseTest() {
    let config: AxiosRequestConfig;
    describe('AxiosResponseTest', () => {
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
        it('responseType_ARRAY_BUFFER', 1, async (done: Function) => {
            let startTime = new Date().getTime();
            let options: AxiosRequestConfig = JSON.parse(JSON.stringify(config));
            options.responseType = 'ARRAY_BUFFER';
            let res: AxiosResponse = await axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(options);
            let endTime = new Date().getTime();
            let averageTime = (endTime - startTime) / HTTP_COUNT;
            hilog.info(DOMAIN, TAG, " responseType_ARRAY_BUFFER averageTime: " + averageTime + ' μs');
            hilog.info(DOMAIN, TAG, " responseType_ARRAY_BUFFER averageTime: " + JSON.stringify(res.status));
            expect(res && res.data && (res.data instanceof ArrayBuffer))
                .assertTrue();
            expect(res && res.data && (typeof (res.data) === 'object') && !(res.data instanceof ArrayBuffer))
                .assertFalse();
            expect(res && res.data && (typeof (res.data) === 'string'))
                .assertFalse();
            done();
        });
        it('responseType_string', 2, async (done: Function) => {
            let startTime = new Date().getTime();
            let options: AxiosRequestConfig = JSON.parse(JSON.stringify(config));
            options.responseType = 'STRING';
            axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(options).then((res: AxiosResponse<normalResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " responseType_string averageTime: " + averageTime + ' μs');
                hilog.info(DOMAIN, TAG, " responseType_string averageTime: " + JSON.stringify(res.status));
                expect(res && res.data && (res.data instanceof ArrayBuffer))
                    .assertFalse();
                expect(res && res.data && (typeof (res.data) === 'object') && !(res.data instanceof ArrayBuffer))
                    .assertFalse();
                expect(res && res.data && (typeof (res.data) === 'string'))
                    .assertTrue();
                done();
            });
        });
        it('responseType_OBJECT', 3, async (done: Function) => {
            let startTime = new Date().getTime();
            let options: AxiosRequestConfig = JSON.parse(JSON.stringify(config));
            options.responseType = 'OBJECT';
            axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(options).then((res: AxiosResponse<normalResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " responseType_OBJECT averageTime: " + averageTime + ' μs');
                hilog.info(DOMAIN, TAG, " responseType_OBJECT averageTime: " + JSON.stringify(res.status));
                expect(res.data instanceof ArrayBuffer)
                    .assertFalse();
                expect(res && res.data && (typeof (res.data) === 'object') && !(res.data instanceof ArrayBuffer))
                    .assertTrue();
                expect(res && res.data && (typeof (res.data) === 'string'))
                    .assertFalse();
                done();
            });
        });
    });
}
