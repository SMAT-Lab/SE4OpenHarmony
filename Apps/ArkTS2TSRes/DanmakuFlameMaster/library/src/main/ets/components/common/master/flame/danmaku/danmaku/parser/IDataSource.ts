let __generate__Id: number = 0;
function generateId(): string {
    return "IDataSource_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const SCHEME_HTTP_TAG: string = "http";
export const SCHEME_HTTPS_TAG: string = "https";
export const SCHEME_FILE_TAG: string = "file";
export interface IDataSource<T> {
    data(): any;
    release(): void;
}
