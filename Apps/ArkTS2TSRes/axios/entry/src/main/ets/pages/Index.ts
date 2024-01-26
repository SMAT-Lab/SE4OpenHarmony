interface Index_Params {
    scroller?: Scroller;
    status?: string | number;
    message?: string;
    filename?: string;
    progress?: string;
    downloadProgress?: number;
    uploadProgress?: number;
    baseUrl?: string;
    getUrl?: string;
    postUrl?: string;
    downloadUrl?: string;
    uploadUrl?: string;
    clientCert_noPassword?: string;
    clientCert_hasPassword?: string;
    proxyUrl?: string;
    psw?: string;
    host?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import axios, { AxiosError, AxiosResponse, AxiosProgressEvent, InternalAxiosRequestConfig, AxiosRequestConfig } from '@ohos/axios';
import { FormData } from '@ohos/axios';
import fs from '@ohos.file.fs';
import { idModel, infoModel, uploadModel } from '../types/types';
import { DEMO_CONFIG } from '../common/Common';
import { writeFile, readFile } from '../common/fileFs';
axios.defaults.headers['authorization'] = 'customer-auto';
const TAG = 'run error: ';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__filename = new ObservedPropertySimple('blue.jpg', this, "filename");
        this.__progress = new ObservedPropertySimple('', this, "progress");
        this.__downloadProgress = new ObservedPropertySimple(0, this, "downloadProgress");
        this.__uploadProgress = new ObservedPropertySimple(0, this, "uploadProgress");
        this.baseUrl = DEMO_CONFIG.baseUrl;
        this.getUrl = DEMO_CONFIG.getUrl;
        this.postUrl = DEMO_CONFIG.postUrl;
        this.downloadUrl = DEMO_CONFIG.downloadUrl;
        this.uploadUrl = DEMO_CONFIG.uploadUrl;
        this.clientCert_noPassword = DEMO_CONFIG.clientCert_noPassword;
        this.clientCert_hasPassword = DEMO_CONFIG.clientCert_hasPassword;
        this.proxyUrl = DEMO_CONFIG.proxyUrl;
        this.psw = DEMO_CONFIG.psw;
        this.host = DEMO_CONFIG.host;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.filename !== undefined) {
            this.filename = params.filename;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.downloadProgress !== undefined) {
            this.downloadProgress = params.downloadProgress;
        }
        if (params.uploadProgress !== undefined) {
            this.uploadProgress = params.uploadProgress;
        }
        if (params.baseUrl !== undefined) {
            this.baseUrl = params.baseUrl;
        }
        if (params.getUrl !== undefined) {
            this.getUrl = params.getUrl;
        }
        if (params.postUrl !== undefined) {
            this.postUrl = params.postUrl;
        }
        if (params.downloadUrl !== undefined) {
            this.downloadUrl = params.downloadUrl;
        }
        if (params.uploadUrl !== undefined) {
            this.uploadUrl = params.uploadUrl;
        }
        if (params.clientCert_noPassword !== undefined) {
            this.clientCert_noPassword = params.clientCert_noPassword;
        }
        if (params.clientCert_hasPassword !== undefined) {
            this.clientCert_hasPassword = params.clientCert_hasPassword;
        }
        if (params.proxyUrl !== undefined) {
            this.proxyUrl = params.proxyUrl;
        }
        if (params.psw !== undefined) {
            this.psw = params.psw;
        }
        if (params.host !== undefined) {
            this.host = params.host;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__filename.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__downloadProgress.aboutToBeDeleted();
        this.__uploadProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __status: ObservedPropertySimple<string | number>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string | number) {
        this.__status.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __filename: ObservedPropertySimple<string>;
    get filename() {
        return this.__filename.get();
    }
    set filename(newValue: string) {
        this.__filename.set(newValue);
    }
    private __progress: ObservedPropertySimple<string>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: string) {
        this.__progress.set(newValue);
    }
    private __downloadProgress: ObservedPropertySimple<number>;
    get downloadProgress() {
        return this.__downloadProgress.get();
    }
    set downloadProgress(newValue: number) {
        this.__downloadProgress.set(newValue);
    }
    private __uploadProgress: ObservedPropertySimple<number>;
    get uploadProgress() {
        return this.__uploadProgress.get();
    }
    set uploadProgress(newValue: number) {
        this.__uploadProgress.set(newValue);
    }
    private baseUrl: string;
    private getUrl: string;
    private postUrl: string;
    private downloadUrl: string;
    private uploadUrl: string;
    private clientCert_noPassword: string;
    private clientCert_hasPassword: string;
    private proxyUrl: string;
    private psw: string;
    private host: string;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Column.create();
        Text.create('axios');
        Text.fontSize(28);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.margin({ top: 20, bottom: 25 });
        Text.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Row.width('100%');
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Text.create(this.getUrl);
        Text.width('75%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Button.createWithLabel('get');
        Button.width(120);
        Button.onClick((e) => {
            this.get();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 10, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Text.create(this.postUrl);
        Text.width('75%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Button.createWithLabel('post');
        Button.width(120);
        Button.onClick((e) => {
            this.post();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Text.create(this.getUrl);
        Text.width('75%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Button.createWithLabel('拦截器');
        Button.width(120);
        Button.onClick((e) => {
            this.interceptors();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Text.create(this.getUrl);
        Text.width('75%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Button.createWithLabel('默认设置');
        Button.width(120);
        Button.onClick((e) => {
            this.defaultSetting();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.downloadUrl);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Progress.create({ value: this.downloadProgress, type: ProgressType.Linear });
        Progress.color('#009BE8');
        Progress.width('100%');
        Progress.margin({ top: 8, right: 10 });
        Progress.style({ strokeWidth: 10 });
        Column.pop();
        Button.createWithLabel('下载');
        Button.width(120);
        Button.onClick((e) => {
            this.download();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.uploadUrl);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Progress.create({ value: this.uploadProgress, type: ProgressType.Linear });
        Progress.color('#009BE8');
        Progress.width('100%');
        Progress.margin({ top: 8, right: 10 });
        Progress.style({ strokeWidth: 10 });
        Column.pop();
        Button.createWithLabel('上传');
        Button.width(120);
        Button.onClick((e) => {
            this.upload();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.clientCert_noPassword);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel('双向校验-无密码');
        Button.width(120);
        Button.onClick((e) => {
            this.settingClientCert();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.clientCert_hasPassword);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel('双向校验_有密码');
        Button.width(120);
        Button.onClick((e) => {
            this.settingClientCert_password();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.uploadUrl);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel('设置响应类型');
        Button.width(120);
        Button.onClick((e) => {
            this.settingResponseType();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Column.create();
        Column.width('75%');
        Column.borderStyle(BorderStyle.Solid);
        Text.create(this.proxyUrl);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.borderStyle(BorderStyle.Solid);
        Text.borderWidth(1);
        Text.borderColor('#E6E7E8');
        Text.padding({ top: 5, bottom: 5, left: 10, right: 10 });
        Text.margin({ right: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel('设置代理');
        Button.width(120);
        Button.onClick((e) => {
            this.settingProxy();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 20, right: 20, bottom: 20, top: 0 });
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, });
        Flex.width('75%');
        Flex.padding(10);
        Flex.height(200);
        Flex.margin({ right: 10 });
        Flex.borderStyle(BorderStyle.Solid);
        Flex.borderWidth(1);
        Flex.borderColor('#E6E7E8');
        Text.create("status: " + this.status);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.pop();
        Text.create("data: " + this.message);
        Text.width('100%');
        Text.fontSize(14);
        Text.fontWeight(700);
        Text.fontColor('#000000');
        Text.pop();
        Flex.pop();
        Button.createWithLabel('clear');
        Button.width(120);
        Button.onClick((e) => {
            this.clear();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
    }
    // get请求
    get() {
        this.clear();
        axios.get<string, AxiosResponse<string>, null>(this.getUrl).then((res: AxiosResponse) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // post请求
    post() {
        this.clear();
        axios<infoModel, AxiosResponse<infoModel>, idModel>({
            url: this.postUrl,
            method: 'post',
            data: {
                id: 591
            },
        }).then((res: AxiosResponse<infoModel>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 拦截器
    interceptors() {
        this.clear();
        const myInterceptor = axios.interceptors.response.use((response: AxiosResponse) => {
            // 对响应数据做点什么
            response.data = '在拦截器中，内容被更改了';
            return response;
        }, (error: AxiosError) => {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
        axios<infoModel[], AxiosResponse<infoModel[]>, null>({
            url: this.getUrl,
            method: 'get',
        }).then((res: AxiosResponse<infoModel[]>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
            // 移除拦截器
            axios.interceptors.response.eject(myInterceptor);
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
            // 移除拦截器
            axios.interceptors.response.eject(myInterceptor);
        });
    }
    // 默认设置
    defaultSetting() {
        this.clear();
        axios.defaults.baseURL = this.baseUrl;
        axios.defaults.headers['customer-header'] = 'customer-value';
        axios.defaults.method = 'get';
        axios<infoModel, AxiosResponse<infoModel>, null>({
            url: this.getUrl,
        }).then((res: AxiosResponse<infoModel>) => {
            this.status = res.status;
            this.message = JSON.stringify(res.data);
            axios.defaults.baseURL = '';
            axios.defaults.method = '';
            axios.defaults.headers['customer-header'] = null;
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
            axios.defaults.baseURL = '';
            axios.defaults.method = '';
            axios.defaults.headers['customer-header'] = null;
        });
    }
    // 下载
    download() {
        this.clear();
        let filePath = getContext(this).cacheDir + '/blue.jpg';
        // 下载。如果文件已存在，则先删除文件。
        try {
            fs.accessSync(filePath);
            fs.unlinkSync(filePath);
        }
        catch (err) {
        }
        axios<string, AxiosResponse<string>, null>({
            url: this.downloadUrl,
            method: 'get',
            context: getContext(this),
            filePath: filePath,
            onDownloadProgress: (progressEvent: AxiosProgressEvent): void => {
                this.downloadProgress = progressEvent && progressEvent.loaded && progressEvent.total ? Math.ceil(progressEvent.loaded / progressEvent.total * 100) : 0;
            }
        }).then((res: AxiosResponse<string>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 上传
    upload() {
        this.clear();
        let context: Context = getContext(this);
        let ca: Uint8Array = context.resourceManager.getRawFileContentSync("oneWayAuth/ca.pem");
        let cacheDir: string = context.cacheDir;
        let buffer: ArrayBuffer = new ArrayBuffer(1024);
        try {
            writeFile(cacheDir, 'ca.pem', ca.buffer);
            // 读取
            buffer = readFile(cacheDir + '/ca.pem');
        }
        catch (err) {
            console.error(TAG, JSON.stringify(err));
        }
        let formData = new FormData();
        formData.append('file', buffer);
        formData.append('name', 'yyywp');
        axios.post<uploadModel, AxiosResponse<uploadModel>, FormData>(this.uploadUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            context: getContext(this),
            onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
                console.info(TAG, JSON.stringify(progressEvent));
                this.uploadProgress = progressEvent && progressEvent.loaded && progressEvent.total ? Math.ceil(progressEvent.loaded / progressEvent.total * 100) : 0;
            },
        }).then((res: AxiosResponse<uploadModel>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
            console.info(TAG, JSON.stringify(res.headers));
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 设置双向证书校验(无密码）
    settingClientCert() {
        this.clear();
        let path_ca = ''; // 根证书路径
        let path_client = ''; // 客户端证书路径
        let path_key = ''; // 客户端密码路径
        // 获取根证书、客户端证书、客户端密码沙箱路径
        try {
            let context: Context = getContext(this);
            let ca: Uint8Array = context.resourceManager.getRawFileContentSync("oneWayAuth/ca.p12");
            let client: Uint8Array = context.resourceManager.getRawFileContentSync("mutualAuth_noPassword/p12/client.p12");
            let key: Uint8Array = context.resourceManager.getRawFileContentSync("mutualAuth_noPassword/p12/client.key");
            let cacheDir: string = context.cacheDir;
            if (ca != null) {
                path_ca = cacheDir + "/ca.crt";
                writeFile(cacheDir, 'ca.crt', ca.buffer);
            }
            if (client != null) {
                path_client = cacheDir + "/client.p12";
                writeFile(cacheDir, 'client.p12', ca.buffer);
            }
            if (key != null) {
                path_key = cacheDir + "/client.key";
                writeFile(cacheDir, 'client.key', ca.buffer);
            }
        }
        catch (err) {
            console.info(TAG, JSON.stringify(err));
        }
        axios<infoModel, AxiosResponse<infoModel>, null>({
            url: this.clientCert_noPassword,
            method: 'get',
            caPath: path_ca,
            clientCert: {
                certPath: path_client,
                certType: 'p12',
                keyPath: path_key,
            }
        }).then((res: AxiosResponse<infoModel>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 设置双向证书校验(有密码）
    settingClientCert_password() {
        this.clear();
        let path_ca = ''; // 根证书路径
        let path_client = ''; // 客户端证书路径
        let path_key = ''; // 客户端密码路径
        // 获取根证书、客户端证书、客户端密码沙箱路径
        try {
            let context: Context = getContext(this);
            let ca: Uint8Array = context.resourceManager.getRawFileContentSync("mutualAuth_hasPassword/ca.crt");
            let client: Uint8Array = context.resourceManager.getRawFileContentSync("mutualAuth_hasPassword/pem/client.pem");
            let key: Uint8Array = context.resourceManager.getRawFileContentSync("mutualAuth_hasPassword/pem/client.key");
            let cacheDir: string = context.cacheDir;
            if (ca != null) {
                path_ca = cacheDir + "/ca.crt";
                writeFile(cacheDir, 'ca.crt', ca.buffer);
            }
            if (client != null) {
                path_client = cacheDir + "/client.pem";
                writeFile(cacheDir, 'client.pem', ca.buffer);
            }
            if (key != null) {
                path_key = cacheDir + "/client.key";
                writeFile(cacheDir, 'client.key', ca.buffer);
            }
        }
        catch (err) {
            console.info(TAG, JSON.stringify(err));
        }
        axios<infoModel, AxiosResponse<infoModel>, null>({
            url: this.clientCert_hasPassword,
            method: 'get',
            caPath: path_ca,
            clientCert: {
                certPath: path_client,
                certType: 'pem',
                keyPath: path_key,
                keyPasswd: this.psw
            }
        }).then((res: AxiosResponse<infoModel>) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 设置响应类型
    settingResponseType() {
        this.clear();
        axios<string, AxiosResponse<string>, null>({
            url: this.getUrl,
            method: 'get',
            responseType: 'array_buffer'
        }).then((res: AxiosResponse) => {
            this.status = res ? res.status : '';
            if (res.data instanceof ArrayBuffer) {
                this.message = res ? 'responseType设置成功' : '';
            }
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    // 设置代理
    settingProxy() {
        this.clear();
        axios<string, AxiosResponse<string>, null>({
            url: this.proxyUrl,
            method: 'get',
            proxy: {
                host: this.host,
                port: 6443,
                exclusionList: []
            }
        }).then((res: AxiosResponse) => {
            this.status = res ? res.status : '';
            this.message = res ? JSON.stringify(res.data) : '';
        }).catch((err: AxiosError) => {
            this.status = '';
            this.message = err.message;
        });
    }
    clear() {
        this.uploadProgress = 0;
        this.downloadProgress = 0;
        this.message = '';
        this.status = '';
    }
}
loadDocument(new Index("1", undefined, {}));
