let __generate__Id: number = 0;
function generateId(): string {
    return "Common_" + ++__generate__Id;
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
interface log {
    TAG: string;
    DOMAIN: number;
}
interface xts_config {
    path_oneWayAuth: string;
    path_mutualAuth_noPassword: string;
    path_mutualAuth_hasPassword: string;
    path_certificate_pin: string;
    defaultUrl: string;
    path: string;
    getUrl: string;
    postUrl: string;
    downloadUrl: string;
    uploadUrl: string;
    url: string;
    baseURL: string;
    host: string;
    proxyHttps: string;
    proxyHttp: string;
    psw: string;
}
interface demo_config {
    baseUrl: string;
    getUrl: string;
    postUrl: string;
    downloadUrl: string;
    uploadUrl: string;
    clientCert_noPassword: string;
    clientCert_hasPassword: string;
    proxyUrl: string;
    host: string;
    psw: string;
}
const LOG: log = {
    TAG: 'response time: ',
    DOMAIN: 0x0001
};
// xts请求服务器url
const XTS_CONFIG: xts_config = {
    path_oneWayAuth: '',
    path_mutualAuth_noPassword: '',
    path_mutualAuth_hasPassword: '',
    path_certificate_pin: '',
    defaultUrl: '',
    path: '',
    getUrl: '',
    postUrl: '',
    downloadUrl: '',
    uploadUrl: '',
    url: '',
    baseURL: '',
    host: '',
    proxyHttps: '',
    proxyHttp: '',
    psw: '', //证书校验密码
};
// demo请求服务器url
const DEMO_CONFIG: demo_config = {
    baseUrl: '',
    getUrl: '',
    postUrl: '',
    downloadUrl: '',
    uploadUrl: '',
    clientCert_noPassword: '',
    clientCert_hasPassword: '',
    proxyUrl: '',
    host: '',
    psw: '', //证书校验密码
};
export { LOG, XTS_CONFIG, DEMO_CONFIG };
