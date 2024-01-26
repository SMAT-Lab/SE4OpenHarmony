let __generate__Id: number = 0;
function generateId(): string {
    return "Logger_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
class LoggerModel {
    private domain: number;
    private prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
        this.domain = 0xFF00;
    }
    debug(message: string): void {
        hilog.debug(this.domain, this.prefix, message);
    }
    info(message: string): void {
        hilog.info(this.domain, this.prefix, message);
    }
    warn(message: string): void {
        hilog.warn(this.domain, this.prefix, message);
    }
    error(message: string): void {
        hilog.error(this.domain, this.prefix, message);
    }
}
export let Logger = new LoggerModel('[Sample_rawfile]');
