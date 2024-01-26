let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosDownloadTest.test_" + ++__generate__Id;
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
export default function AxiosDownloadTest() {
    describe('AxiosDownloadTest', () => {
        const BASE_COUNT = 200;
        const HTTP_COUNT = 2;
        const BASELINE_REQUEST = 2500;
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        const config = XTS_CONFIG;
        // download
        it('download', 1, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            let filePath = cacheDir + '/download.jpg';
            // 下载。如果文件已存在，则先删除文件。
            try {
                fs.accessSync(filePath);
                fs.unlinkSync(filePath);
            }
            catch (err) {
            }
            let startTime = new Date().getTime();
            axios<string, AxiosResponse<string>, null>({
                url: config.downloadUrl,
                method: 'get',
                context: context,
                filePath: filePath,
            }).then((res: AxiosResponse<string>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " download averageTime: " + averageTime + ' μs');
                expect(res.data === 'download success!')
                    .assertTrue();
                done();
            });
        });
        // download
        it('download_onDownloadProgress', 2, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let cacheDir: string = context.cacheDir;
            let filePath = cacheDir + '/download_onDownloadProgress.jpg';
            // 下载。如果文件已存在，则先删除文件。
            try {
                fs.accessSync(filePath);
                fs.unlinkSync(filePath);
            }
            catch (err) {
            }
            let startTime = new Date().getTime();
            axios<string, AxiosResponse<string>, null>({
                url: config.downloadUrl,
                method: 'get',
                context: context,
                filePath: filePath,
                onDownloadProgress: (progressEvent: AxiosProgressEvent): void => {
                    if (progressEvent.loaded == progressEvent.total) {
                        expect(true).assertTrue();
                    }
                }
            }).then((res: AxiosResponse<string>) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " download_onDownloadProgress averageTime: " + averageTime + ' μs');
                expect(res.data === 'download success!')
                    .assertTrue();
                done();
            });
        });
        //download with exit filepath
        it('download_exitFilepath', 3, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let startTime = new Date().getTime();
            let filePath = 'errorFilePath';
            axios<string, AxiosResponse<string>, null>({
                url: config.downloadUrl,
                method: 'get',
                context: context,
                filePath: filePath
            });
            axios<string, AxiosResponse<string>, null>({
                url: config.downloadUrl,
                method: 'get',
                context: context,
                filePath: filePath
            })
                .catch((err: AxiosError) => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " download_exitFilepath averageTime: " + averageTime + ' μs');
                expect(Boolean(err.code) === true).assertTrue();
                done();
            });
        });
        //download with error filepath
        it('download_errorFilepath', 4, async (done: Function) => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let startTime = new Date().getTime();
            let filePath = '/data/storage/el2/fsf/haps/entry/cache/blue.jpg';
            axios<string, AxiosResponse<string>, null>({
                url: config.downloadUrl,
                method: 'get',
                context: context,
                filePath: filePath
            })
                .catch(err => {
                let endTime = new Date().getTime();
                let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                hilog.info(DOMAIN, TAG, " download_exitFilepath averageTime: " + averageTime + ' μs');
                expect(Boolean(err.code) === true).assertTrue();
                done();
            });
        });
    });
}
