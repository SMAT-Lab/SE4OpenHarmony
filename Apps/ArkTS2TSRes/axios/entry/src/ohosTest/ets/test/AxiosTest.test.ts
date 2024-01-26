let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosTest.test_" + ++__generate__Id;
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
import { describe, beforeAll, it, expect } from '@ohos/hypium';
import axios, { AxiosError, AxiosHeaders } from '@ohos/axios';
import { FormData, AxiosResponse, AxiosProgressEvent, InternalAxiosRequestConfig } from '@ohos/axios';
import fs from '@ohos.file.fs';
import { ConfigModel, normalResultModel, postDataModel, downLoadResultModel, uploadResultModel } from '../../../main/ets/types/types';
import { GlobalContext } from '../testability/GlobalContext';
import hilog from '@ohos.hilog';
import { LOG, XTS_CONFIG } from '../../../main/ets/common/Common';
import { writeFile, readFile } from '../../../main/ets/common/fileFs';
export default function DiskLruCacheTest() {
    describe('AxiosTest', () => {
        const BASE_COUNT = 200;
        const HTTP_COUNT = 2;
        const BASELINE_REQUEST = 2500;
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        const config = XTS_CONFIG;
        // get method
        it('get', 0, async (done: Function) => {
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                axios.get<normalResultModel, AxiosResponse<normalResultModel>, null>(config.getUrl).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " get method averageTime: " + averageTime + ' μs');
                        expect(res.data.msg).assertEqual('查询成功');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // post method
        it('post', 1, async (done: Function) => {
            let startTime = new Date().getTime();
            let data: postDataModel = {
                pageNum: 1,
                pageSize: 4,
                newDate: 1
            };
            let configUrlTest: (index: number) => void = async (index) => {
                axios.post<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>(config.postUrl, data).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " post method averageTime: " + averageTime + ' μs');
                        expect(res.data.msg).assertEqual('成功');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        // defaultSetting
        it('defaultSetting', 5, async (done: Function) => {
            axios.defaults.baseURL = config.defaultUrl;
            axios.defaults.headers['customer-header'] = 'customer-value';
            axios.defaults.method = 'post';
            let data: postDataModel = {
                pageNum: 1,
                pageSize: 4,
                newDate: 1
            };
            let configUrlTest: (index: number) => void = async (index) => {
                axios<normalResultModel, AxiosResponse<normalResultModel>, postDataModel>({
                    url: config.path,
                    data: data
                }).then((res: AxiosResponse<normalResultModel>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " defaultSetting averageTime: " + averageTime + ' μs');
                        expect(res.data.msg === '成功')
                            .assertTrue();
                        done();
                    }
                });
            };
            let startTime = new Date().getTime();
            configUrlTest(0);
        });
        // interceptors
        it('interceptors', 6, async (done: Function) => {
            let startTime = new Date().getTime();
            const myRequestInterceptor = axios.interceptors.request.use((config: InternalAxiosRequestConfig<null>) => {
                expect(config.baseURL === config.baseURL).assertTrue();
                return config;
            }, (error: AxiosError) => {
                return Promise.reject(error);
            });
            // response interceptors
            const myResponseInterceptor = axios.interceptors.response.use((response: AxiosResponse) => {
                response.data = 'hello world';
                return response;
            }, (error: AxiosError) => {
                return Promise.reject(error);
            });
            let configUrlTest: (index: number) => void = async (index) => {
                axios<string, AxiosResponse<string>, null>({
                    method: 'get',
                    url: config.getUrl,
                }).then((res: AxiosResponse<string>) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        hilog.info(DOMAIN, TAG, " interceptors averageTime: " + averageTime + ' μs');
                        expect(res.data === 'hello world')
                            .assertTrue();
                        done();
                        axios.interceptors.request.eject(myRequestInterceptor);
                        axios.interceptors.response.eject(myResponseInterceptor);
                    }
                });
            };
            configUrlTest(0);
        });
        // create instance
        it('create_100', 7, async (done: Function) => {
            let startTime = new Date().getTime();
            for (let i = 0; i < BASE_COUNT; i++) {
                axios.create({});
            }
            let endTime = new Date().getTime();
            let averageTime = (endTime - startTime) * 1000 / BASE_COUNT;
            hilog.info(DOMAIN, TAG, " create instance averageTime: " + averageTime + ' μs');
            expect(averageTime < BASELINE_REQUEST)
                .assertTrue();
            done();
        });
        // create instance
        it('formData', 8, async (done: Function) => {
            let formData = new Map([
                ['sign', 'tes']
            ]);
            let startTime = new Date().getTime();
            axios.post(config.postUrl, formData, {
                url: config.getUrl,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((res: AxiosResponse<string>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " interceptors averageTime: " + averageTime + ' μs');
                expect(res.status === 200)
                    .assertTrue();
                done();
            });
        });
        // request header with number
        it('header_number', 9, async (done: Function) => {
            let header = new AxiosHeaders();
            let uuid = 'FDHSAJKHFSAJHFDSKAL';
            let val = 'value';
            header.set('X-B3', uuid);
            header.set('hello', val);
            let headerObj = AxiosHeaders.from(header);
            expect(headerObj['X-B3']).assertEqual(uuid);
            expect(headerObj['hello']).assertEqual(val);
            done();
        });
    });
}
