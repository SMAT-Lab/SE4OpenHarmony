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
import { ConstructOptions } from "../index";
export function buildUrl(baseUrl: string, url: string): string {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        return url;
    }
    if (baseUrl.endsWith("/") && url.startsWith("/")) {
        return baseUrl + url.slice(1, url.length);
    }
    if (!baseUrl.endsWith("/") && !url.startsWith("/")) {
        return baseUrl + "/" + url;
    }
    return baseUrl + url;
}
export function mergeConfig(options: ConstructOptions, config: http.HttpRequestOptions): http.HttpRequestOptions {
    !config.connectTimeout && options.readTimeout && (config.connectTimeout = options.connectTimeout);
    !config.readTimeout && options.readTimeout && (config.readTimeout = options.readTimeout);
    return config;
}
