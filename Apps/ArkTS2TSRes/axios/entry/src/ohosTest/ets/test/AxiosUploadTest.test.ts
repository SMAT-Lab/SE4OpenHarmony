let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosUploadTest.test_" + ++__generate__Id;
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
export default function AxiosUploadTest() {
    describe('AxiosUploadTest', () => {
        const BASE_COUNT = 200;
        const HTTP_COUNT = 2;
        const BASELINE_REQUEST = 2500;
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        const config = XTS_CONFIG;
        // onUploadProgress
        it('upload_onUploadProgress', 1, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            try {
                writeFile(cacheDir, 'upload_onUploadProgress.txt', '上传文件，查看进度事件');
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, " file error: " + JSON.stringify(err));
                expect().assertFail();
            }
            let formData = new FormData();
            formData.append('file', 'internal://cache/upload_onUploadProgress.txt');
            let startTime = new Date().getTime();
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
                onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
                    if (progressEvent.loaded == progressEvent.total) {
                        expect(true).assertTrue();
                    }
                }
            }).then((res: AxiosResponse<uploadResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_onUploadProgress averageTime: " + averageTime + ' μs');
                expect(res.data.msg === 'success').assertTrue();
                done();
            });
        });
        // upload by filepath
        it('upload_filepath_selfCreate', 2, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            try {
                writeFile(cacheDir, 'upload_filepath.txt', '上传通过fs创建的文件');
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, " file error: " + JSON.stringify(err));
                expect().assertFail();
            }
            let formData = new FormData();
            formData.append('file', 'internal://cache/upload_filepath.txt');
            let startTime = new Date().getTime();
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
            }).then((res: AxiosResponse<uploadResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_filepath_selfCreate averageTime: " + averageTime + ' μs');
                expect(res.data.msg === 'success').assertTrue();
                done();
            });
        });
        // upload by arraybuffer
        it('upload_buffer_defaultName', 3, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            let buffer: ArrayBuffer = new ArrayBuffer(1024);
            try {
                // 写入
                writeFile(cacheDir, 'test.txt', '指定上传文件名称');
                // 读取
                let path = cacheDir + '/test.txt';
                buffer = readFile(path);
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, " upload_buffer_defaultName: " + JSON.stringify(err));
                expect().assertFail();
                done();
            }
            let formData = new FormData();
            formData.append('file', buffer, 'upload_buffer_defaultName.txt');
            let startTime = new Date().getTime();
            // 发送请求
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
                onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
                    if (progressEvent.loaded == progressEvent.total) {
                        expect(true).assertTrue();
                    }
                }
            }).then((res: AxiosResponse<uploadResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_buffer_defaultName averageTime: " + averageTime + ' μs');
                expect(res.data.msg === 'success').assertTrue();
                done();
            }).catch((err: AxiosError) => {
                hilog.info(DOMAIN, TAG, " upload_buffer_defaultName error: " + JSON.stringify(err));
                expect().assertFail();
            });
        });
        // uploading filepath without specifying a file name
        it('upload_filepath', 4, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            let ca: Uint8Array = await context.resourceManager.getRawFileContent("oneWayAuth/ca.pem");
            try {
                writeFile(cacheDir, 'ca.pem', ca.buffer);
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, " upload_filepath error: " + JSON.stringify(err));
                expect().assertFail();
            }
            let formData = new FormData();
            formData.append('file', 'internal://cache/ca.pem');
            let startTime = new Date().getTime();
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
            }).then((res: AxiosResponse<uploadResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_filepath averageTime: " + averageTime + ' μs');
                expect(res.data.msg === 'success').assertTrue();
                done();
            });
        });
        // uploading arraybuffer type files without specifying a file name
        it('upload_buffer', 5, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let content: Uint8Array = await context.resourceManager.getRawFileContent("oneWayAuth/ca.pem");
            let filesDir: string = context.filesDir;
            let buffer: ArrayBuffer = new ArrayBuffer(1024);
            try {
                writeFile(context.filesDir, 'ca.pem', content.buffer);
                buffer = readFile(filesDir + "/ca.pem");
            }
            catch (err) {
                hilog.info(DOMAIN, TAG, " file error: " + JSON.stringify(err));
                expect().assertFail();
            }
            // Arraybuffer
            let formData = new FormData();
            formData.append('file', buffer);
            formData.append('name', 'ca.pem');
            let startTime = new Date().getTime();
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
            }).then((res: AxiosResponse<uploadResultModel>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_buffer averageTime: " + averageTime + ' μs');
                expect(res.data.msg === 'success').assertTrue();
                done();
            }).catch((err: AxiosError) => {
                hilog.info(DOMAIN, TAG, " upload_buffer error: " + JSON.stringify(err));
                expect().assertFail();
            });
        });
        // uploading arraybuffer type files without specifying a file name
        it('upload_errorUri', 6, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let formData = new FormData();
            formData.append('file', 'internal://cache/upload_errorUri.txt');
            let startTime = new Date().getTime();
            axios.post<uploadResultModel, AxiosResponse<uploadResultModel>, FormData>(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                context: context,
            }).catch((err: AxiosError) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " upload_errorUri averageTime: " + averageTime + ' μs');
                expect(Boolean(err.code) === true).assertTrue();
                done();
            });
        });
    });
}
