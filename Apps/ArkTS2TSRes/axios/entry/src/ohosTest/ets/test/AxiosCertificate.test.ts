let __generate__Id: number = 0;
function generateId(): string {
    return "AxiosCertificate.test_" + ++__generate__Id;
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
import axios from '@ohos/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from '@ohos/axios';
import { infoModel, } from '../../../main/ets/types/types';
import fs from '@ohos.file.fs';
import { GlobalContext } from '../testability/GlobalContext';
import { LOG, XTS_CONFIG } from '../../../main/ets/common/Common';
export default function abilityTest() {
    describe('AxiosCertificate', () => {
        const TAG = LOG.TAG;
        const DOMAIN = LOG.DOMAIN;
        const path_oneWayAuth = XTS_CONFIG.path_oneWayAuth; // 单向校验请求路径
        const path_mutualAuth_noPassword = XTS_CONFIG.path_mutualAuth_noPassword; // 双向校验无密码请求路径
        const path_mutualAuth_hasPassword = XTS_CONFIG.path_mutualAuth_hasPassword; // 双向校验有密码请求路径
        const path_certificate_pin = XTS_CONFIG.path_certificate_pin; //证书锁定的请求路径
        const pwd = XTS_CONFIG.psw;
        //单向认证，p12格式证书
        it('caPath_p12', 0, async (done: Function) => {
            let filePath = '';
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("oneWayAuth/ca.p12");
                if (ca != null) {
                    filePath = filesDir + "/ca.p12";
                    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_oneWayAuth,
                    method: 'get',
                    caPath: filePath,
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " caPath_p12 averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " caPath_p12 averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
        //单向认证，pem格式证书
        it('caPath_pem', 1, async (done: Function) => {
            let filePath = '';
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("oneWayAuth/ca.pem");
                if (ca != null) {
                    filePath = filesDir + "/ca.pem";
                    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_oneWayAuth,
                    method: 'get',
                    caPath: filePath,
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " caPath_pem averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " caPath_pem averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
        //双向验证，无密码，p12格式证书
        it('clientCert_noPassword_p12', 2, async (done: Function) => {
            let path_ca = ''; // 根证书路径
            let path_client = ''; // 客户端证书路径
            let path_key = ''; // 客户端密码路径
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/ca.crt");
                let client: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/p12/client.p12");
                let key: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/p12/client.key");
                if (ca != null) {
                    path_ca = filesDir + "/ca.crt";
                    let file = fs.openSync(path_ca, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (client != null) {
                    path_client = filesDir + "/client.p12";
                    let file = fs.openSync(path_client, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, client.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (key != null) {
                    path_key = filesDir + "/client.key";
                    let file = fs.openSync(path_key, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, key.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_mutualAuth_noPassword,
                    method: 'get',
                    caPath: path_ca,
                    clientCert: {
                        certPath: path_client,
                        certType: 'p12',
                        keyPath: path_key,
                    }
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " clientCert_noPassword_p12 averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " clientCert_noPassword_p12 averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
        //双向验证，无密码，pem格式证书
        it('clientCert_noPassword_pem', 3, async (done: Function) => {
            let path_ca = ''; // 根证书路径
            let path_client = ''; // 客户端证书路径
            let path_key = ''; // 客户端密码路径
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/ca.crt");
                let client: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/pem/client.pem");
                let key: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_noPassword/pem/client.key");
                if (ca != null) {
                    path_ca = filesDir + "/ca.crt";
                    let file = fs.openSync(path_ca, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (client != null) {
                    path_client = filesDir + "/client.pem";
                    let file = fs.openSync(path_client, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, client.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (key != null) {
                    path_key = filesDir + "/client.key";
                    let file = fs.openSync(path_key, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, key.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_mutualAuth_noPassword,
                    method: 'get',
                    caPath: path_ca,
                    clientCert: {
                        certPath: path_client,
                        certType: 'pem',
                        keyPath: path_key,
                    }
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " clientCert_noPassword_pem averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " clientCert_noPassword_pem averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
        //双向验证，有密码，p12格式证书
        it('clientCert_hasPassword_p12', 4, async (done: Function) => {
            let path_ca = ''; // 根证书路径
            let path_client = ''; // 客户端证书路径
            let path_key = ''; // 客户端密码路径
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/ca.crt");
                let client: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/p12/client.p12");
                let key: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/p12/client.key");
                if (ca != null) {
                    path_ca = filesDir + "/ca.crt";
                    let file = fs.openSync(path_ca, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (client != null) {
                    path_client = filesDir + "/client.p12";
                    let file = fs.openSync(path_client, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, client.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (key != null) {
                    path_key = filesDir + "/client.key";
                    let file = fs.openSync(path_key, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, key.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_mutualAuth_hasPassword,
                    method: 'get',
                    caPath: path_ca,
                    clientCert: {
                        certPath: path_client,
                        certType: 'p12',
                        keyPath: '',
                        keyPasswd: pwd
                    }
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " clientCert_hasPassword_p12 averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " clientCert_hasPassword_p12 averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
        //双向验证，有密码，pem格式证书
        it('clientCert_hasPassword_pem', 5, async (done: Function) => {
            let path_ca = ''; // 根证书路径
            let path_client = ''; // 客户端证书路径
            let path_key = ''; // 客户端密码路径
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filesDir: string = context.filesDir;
            //获取根证书路径
            try {
                let ca: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/ca.crt");
                let client: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/pem/client.pem");
                let key: Uint8Array = await context.resourceManager.getRawFileContent("mutualAuth_hasPassword/pem/client.key");
                if (ca != null) {
                    path_ca = filesDir + "/ca.crt";
                    let file = fs.openSync(path_ca, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, ca.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (client != null) {
                    path_client = filesDir + "/client.pem";
                    let file = fs.openSync(path_client, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, client.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                if (key != null) {
                    path_key = filesDir + "/client.key";
                    let file = fs.openSync(path_key, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                    fs.writeSync(file.fd, key.buffer);
                    fs.fsyncSync(file.fd);
                    fs.closeSync(file);
                }
                // 发送请求
                let startTime = new Date().getTime();
                axios<infoModel, AxiosResponse<infoModel>, null>({
                    url: path_mutualAuth_hasPassword,
                    method: 'get',
                    caPath: path_ca,
                    clientCert: {
                        certPath: path_client,
                        certType: 'pem',
                        keyPath: path_key,
                        keyPasswd: pwd
                    }
                }).then((res: AxiosResponse<infoModel>) => {
                    let endTime = new Date().getTime();
                    let averageTime = endTime - startTime;
                    hilog.info(DOMAIN, TAG, " clientCert_hasPassword_pem averageTime: " + averageTime + ' μs');
                    hilog.info(DOMAIN, TAG, " clientCert_hasPassword_pem averageTime: " + JSON.stringify(res.status));
                    expect(res && res.status && res.status === 200)
                        .assertTrue();
                    done();
                });
            }
            catch (err) {
                expect().assertFail();
            }
        });
    });
}
