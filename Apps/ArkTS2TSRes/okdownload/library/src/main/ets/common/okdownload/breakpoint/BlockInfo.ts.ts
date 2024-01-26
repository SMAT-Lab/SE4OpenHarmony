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
export class BlockInfo {
    private startOffset: number;
    private contentLength: number;
    private currentOffset: number;
    public constructor(startOffset: number, contentLength: number, currentOffset: number = 0) {
        this.startOffset = startOffset;
        this.contentLength = contentLength;
        this.currentOffset = currentOffset;
    }
    public getCurrentOffset(): number {
        return this.currentOffset;
    }
    public getStartOffset(): number {
        return this.startOffset;
    }
    public getRangeLeft(): number {
        return this.startOffset + this.currentOffset;
    }
    public getContentLength(): number {
        return this.contentLength;
    }
    public getRangeRight(): number {
        return this.startOffset + this.contentLength - 1;
    }
    public increaseCurrentOffset(increaseLength: number): void {
        this.currentOffset += increaseLength;
    }
    public resetBlock(): void {
        this.currentOffset = 0;
    }
    public copy(): BlockInfo {
        return new BlockInfo(this.startOffset, this.contentLength, this.currentOffset);
    }
}
