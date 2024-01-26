/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
export abstract class IdentifiedTask {
    public abstract getId(): number;
    public abstract getUrl(): string;
    public abstract getFilename(): string;
    public compareIgnoreId(another: IdentifiedTask): boolean {
        if (!(this.getUrl() === another.getUrl()))
            return false;
        if (this.getUrl() === EMPTY_URL)
            return false;
        // cover the case of filename is provided by response.
        const filename: string = this.getFilename();
        const anotherFilename: string = another.getFilename();
        return anotherFilename !== undefined && filename !== undefined && anotherFilename === filename;
    }
}
export const EMPTY_URL: string = "";
