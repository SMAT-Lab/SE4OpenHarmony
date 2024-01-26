/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import http from "@ohos.net.http";
import { MyHttpRequestOptions } from "./types/type";
import { isFormData, isMyHttpRequestOptions, isString } from "./utils/utils";
import { buildUrl, mergeConfig } from "./utils/helpers";
import { logger } from "./utils/log";
export interface ConstructOptions {
    baseUrl?: string;
    readTimeout?: number;
    connectTimeout?: number;
}
export class FileUpload {
    private constructOptions: ConstructOptions;
    constructor(options: ConstructOptions) {
        this.constructOptions = options;
    }
    private request(url: string, options: http.HttpRequestOptions): Promise<http.HttpResponse> {
        if (!url)
            throw new Error("无效的url");
        url = buildUrl(this.constructOptions.baseUrl, url);
        options = mergeConfig(this.constructOptions, options);
        return new Promise((resolve, reject) => {
            let httpRequest = http.createHttp();
            httpRequest.request(url, options, (err, data) => {
                if (!err) {
                    resolve(data);
                }
                else {
                    reject(err);
                    httpRequest.destroy();
                }
            });
        });
    }
    private transformParams(method: http.RequestMethod, configOrUrl: any, extraData?: any, config?: any): {
        url: string;
        options: http.HttpRequestOptions;
    } {
        if (isString(configOrUrl)) {
            config = {
                ...config,
                extraData
            };
        }
        if (isMyHttpRequestOptions(configOrUrl)) {
            config = {
                ...configOrUrl
            };
            Reflect.deleteProperty(config, "url");
            configOrUrl = configOrUrl.url;
        }
        if (method === http.RequestMethod.POST && isFormData(config.extraData)) {
            if (!config.header) {
                config.header = {};
            }
            config.header["Content-Type"] = "multipart/form-data; boundary=" + config.extraData.boundaryKey;
            config.extraData = config.extraData.toArrayBuffer && config.extraData.toArrayBuffer();
        }
        config.method = method;
        return {
            url: configOrUrl,
            options: config
        };
    }
    post(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    post(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    post(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.POST, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    get(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    get(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    get(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.GET, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    head(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    head(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    head(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.HEAD, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    options(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    options(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    options(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.OPTIONS, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    put(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    put(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    put(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.PUT, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    delete(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    delete(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    delete(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.DELETE, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    trace(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    trace(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    trace(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.TRACE, configOrUrl, extraData, config);
        return this.request(url, options);
    }
    connect(configOrUrl: string, extraData: MyHttpRequestOptions["extraData"], config?: Pick<MyHttpRequestOptions, "header" | "readTimeout" | "connectTimeout">): Promise<http.HttpResponse>;
    connect(configOrUrl: Omit<MyHttpRequestOptions, "method">): Promise<http.HttpResponse>;
    connect(configOrUrl: any, extraData?: any, config?: any) {
        const { url, options } = this.transformParams(http.RequestMethod.CONNECT, configOrUrl, extraData, config);
        return this.request(url, options);
    }
}
