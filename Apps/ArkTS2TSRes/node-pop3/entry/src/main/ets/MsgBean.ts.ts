/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
export default class MsgBean {
    private index: number;
    private size: number;
    private subject: string;
    private from: string;
    private to: string;
    private cc: string;
    private bcc: string;
    private content: string;
    private attachment: Array<object>;
    constructor() {
    }
    public setIndex(index: number) {
        this.index = index;
    }
    public setSize(size: number) {
        this.size = size;
    }
    public setSubject(subject: string) {
        this.subject = subject;
    }
    public setFrom(from: string) {
        this.from = from;
    }
    public setTo(to: string) {
        this.to = to;
    }
    public setCc(cc: string) {
        this.cc = cc;
    }
    public setBcc(bcc: string) {
        this.bcc = bcc;
    }
    public setContent(content: string) {
        this.content = content;
    }
    public setAttachment(attachment: Array<object>) {
        this.attachment = attachment;
    }
    public getIndex(): number {
        return this.index;
    }
    public getSize(): number {
        return this.size;
    }
    public getSubject(): string {
        return this.subject;
    }
    public getFrom(): string {
        return this.from;
    }
    public getTo(): string {
        return this.to;
    }
    public getCc(): string {
        return this.cc;
    }
    public getBcc(): string {
        return this.bcc;
    }
    public getContent(): string {
        return this.content;
    }
    public getAttachment(): Array<object> {
        return this.attachment;
    }
}
