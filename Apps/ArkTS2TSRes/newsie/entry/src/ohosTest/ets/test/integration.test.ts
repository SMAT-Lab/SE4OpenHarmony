let __generate__Id: number = 0;
function generateId(): string {
    return "integration.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect, diff } from '../utils/my_hypium';
import { config } from "../utils/config";
import Client from "ohos_newsie";
export default function integrationTest() {
    let client: Client;
    let greeting: any;
    let wildmat = "test.groups.foo";
    let isoDateTime = "1971-10-12";
    let messageIdOrRange = 1;
    describe('integrationTest', () => {
        beforeAll(async () => {
            client = new Client({
                host: config.host, port: config.port
            });
            greeting = await client.connect();
        });
        afterAll(async () => {
            await client.quit();
        });
        _it('list().code', async (done: Function) => {
            const res: any = await client.list();
            expect(res.code).toEqual(215);
            done();
        });
        _it('list().comment', async (done: Function) => {
            const res: any = await client.list();
            expect(res.comment).toEqual("Information follows");
            done();
        });
        _it('list().description', async (done: Function) => {
            const res: any = await client.list();
            expect(res.description).toEqual("Information follows (multi-line)");
            done();
        });
        _it('list().newsgroups', async (done: Function) => {
            const res: any = await client.list();
            const source: Record<string, string | number>[] = [
                {
                    "name": "test.groups.foo", "high": 6, "low": 1, "status": "n"
                },
                {
                    "name": "test.groups.bar", "high": 3, "low": 1, "status": "n"
                },
                {
                    "name": "test.groups.empty", "high": 0, "low": 0, "status": "n"
                }
            ];
            expect(res.newsgroups.length).toEqual(3);
            expect(diff(res.newsgroups, source)).toEqual(true);
            done();
        });
        _it('group(group).code', async (done: Function) => {
            const res: any = await client.group(wildmat);
            expect(res.code).toEqual(211);
            done();
        });
        _it('group(group).commnet', async (done: Function) => {
            const res: any = await client.group(wildmat);
            expect(res.comment).toEqual("");
            done();
        });
        _it('group(group).description', async (done: Function) => {
            const res: any = await client.group(wildmat);
            expect(res.description).toEqual("Group successfully selected");
            done();
        });
        _it('group(group).group', async (done: Function) => {
            const res: any = await client.group(wildmat);
            expect(res.group.name).toEqual("test.groups.foo");
            expect(res.group.number).toEqual(2);
            expect(res.group.low).toEqual(1);
            expect(res.group.high).toEqual(6);
            done();
        });
        _it('newgroups(isoDateTime).code', async (done: Function) => {
            const res: any = await client.newgroups(isoDateTime);
            expect(res.code).toEqual(231);
            done();
        });
        _it('newgroups(isoDateTime).comment', async (done: Function) => {
            const res: any = await client.newgroups(isoDateTime);
            expect(res.comment).toEqual("List of new newsgroups follows");
            done();
        });
        _it('newgroups(isoDateTime).description', async (done: Function) => {
            const res: any = await client.newgroups(isoDateTime);
            expect(res.description).toEqual("List of new newsgroups follows (multi-line)");
            done();
        });
        _it('newgroups(isoDateTime).newsgroups', async (done: Function) => {
            const res: any = await client.newgroups(isoDateTime);
            const source: Record<string, string | number>[] = [{
                    "name": "test.groups.foo", "high": 6, "low": 1, "status": "n"
                }, {
                    "name": "test.groups.bar", "high": 3, "low": 1, "status": "n"
                }, {
                    "name": "test.groups.empty", "high": 0, "low": 0, "status": "n"
                }];
            expect(diff(res.newsgroups, source)).toEqual(true);
            expect(res.newsgroups.length).toEqual(3);
            done();
        });
        _it('newnews(wildmat,isoDateTime).code', async (done: Function) => {
            const res: any = await client.newnews(wildmat, isoDateTime);
            expect(res.code).toEqual(230);
            done();
        });
        _it('newnews(wildmat,isoDateTime).comment', async (done: Function) => {
            const res: any = await client.newnews(wildmat, isoDateTime);
            expect(res.comment).toEqual("List of new articles follows");
            done();
        });
        _it('newnews(wildmat,isoDateTime).description', async (done: Function) => {
            const res: any = await client.newnews(wildmat, isoDateTime);
            expect(res.description).toEqual("List of new articles follows (multi-line)");
            done();
        });
        _it('newnews(wildmat,isoDateTime).messageIds', async (done: Function) => {
            const res: any = await client.newnews(wildmat, isoDateTime);
            const source = ["<4c51f95eda05@lists.example.org>", "<d417dea0c7a3@lists.example.org>", "<1ce0bf1e35b4@lists.example.org>"];
            expect(diff(res.messageIds, source)).toEqual(true);
            done();
        });
        _it('listActive(wildmat?).code', async (done: Function) => {
            const res: any = await client.listActive(wildmat);
            expect(res.code).toEqual(215);
            done();
        });
        _it('listActive(wildmat?).comment', async (done: Function) => {
            const res: any = await client.listActive(wildmat);
            expect(res.comment).toEqual("Information follows");
            done();
        });
        _it('listActive(wildmat?).description', async (done: Function) => {
            const res: any = await client.listActive(wildmat);
            expect(res.description).toEqual("Information follows (multi-line)");
            done();
        });
        _it('listActive(wildmat?).newsgroups', async (done: Function) => {
            const res: any = await client.listActive(wildmat);
            const source: Record<string, string | number>[] = [{
                    "name": "test.groups.foo", "high": 6, "low": 1, "status": "n"
                }];
            expect(diff(res.newsgroups, source)).toEqual(true);
            done();
        });
        _it('listNewsgroups().code', async (done: Function) => {
            const res: any = await client.listNewsgroups(wildmat);
            expect(res.code).toEqual(215);
            done();
        });
        _it('listNewsgroups().comment', async (done: Function) => {
            const res: any = await client.listNewsgroups(wildmat);
            expect(res.comment).toEqual("Information follows");
            done();
        });
        _it('listNewsgroups().description', async (done: Function) => {
            const res: any = await client.listNewsgroups(wildmat);
            expect(res.description).toEqual("Information follows (multi-line)");
            done();
        });
        _it('listNewsgroups().newsgroups', async (done: Function) => {
            const res: any = await client.listNewsgroups(wildmat);
            const source: Record<string, string | number>[] = [{
                    "name": "test.groups.foo", "description": "Test newsgroup"
                }];
            expect(diff(res.newsgroups, source)).toEqual(true);
            done();
        });
        _it('listOverviewFmt(wildmat?).code', async (done: Function) => {
            const res: any = await client.listOverviewFmt();
            expect(res.code).toEqual(215);
            done();
        });
        _it('listOverviewFmt(wildmat?).comment', async (done: Function) => {
            const res: any = await client.listOverviewFmt();
            expect(res.comment).toEqual("Information follows");
            done();
        });
        _it('listOverviewFmt(wildmat?).description', async (done: Function) => {
            const res: any = await client.listOverviewFmt();
            expect(res.description).toEqual("Information follows (multi-line)");
            done();
        });
        _it('listOverviewFmt(wildmat?).headerFields', async (done: Function) => {
            const res: any = await client.listOverviewFmt();
            const source = ["SUBJECT", "FROM", "DATE", "MESSAGE-ID", "REFERENCES", "XREF"];
            expect(diff(res.headerFields, source)).toEqual(true);
            done();
        });
        _it('listOverviewFmt(wildmat?).metadataFields', async (done: Function) => {
            const res: any = await client.listOverviewFmt();
            const source = [":bytes", ":lines"];
            expect(diff(res.metadataFields, source)).toEqual(true);
            done();
        });
        _it('hdr(field, messageIdOrRange?).code', async (done: Function) => {
            const res: any = await client.hdr("abc", messageIdOrRange);
            expect(res.code).toEqual(225);
            done();
        });
        _it('hdr(field, messageIdOrRange?).comment', async (done: Function) => {
            const res: any = await client.hdr("abc", messageIdOrRange);
            expect(res.comment).toEqual("Headers follow");
            done();
        });
        _it('hdr(field, messageIdOrRange?).description', async (done: Function) => {
            const res: any = await client.hdr("abc", messageIdOrRange);
            expect(res.description).toEqual("Headers follow (multi-line)");
            done();
        });
        _it('hdr(field, messageIdOrRange?).articles', async (done: Function) => {
            const res: any = await client.hdr("abc", messageIdOrRange);
            const source: Record<string, string | number>[] = [{
                    "articleNumber": 1, "fieldContents": ""
                }];
            expect(diff(res.articles, source)).toEqual(true);
            done();
        });
        _it('listGroup(group).code', async (done: Function) => {
            const res: any = await client.listGroup(wildmat);
            expect(res.code).toEqual(211);
            done();
        });
        _it('listGroup(group).comment', async (done: Function) => {
            const res: any = await client.listGroup(wildmat);
            expect(res.comment).toEqual("list follows");
            done();
        });
        _it('listGroup(group).description', async (done: Function) => {
            const res: any = await client.listGroup(wildmat);
            expect(res.description).toEqual("Article numbers follow (multi-line)");
            done();
        });
        _it('listGroup(group).group', async (done: Function) => {
            const res: any = await client.listGroup(wildmat);
            expect(res.group.name).toEqual("test.groups.foo");
            expect(res.group.number).toEqual(2);
            expect(res.group.low).toEqual(1);
            expect(res.group.high).toEqual(6);
            done();
        });
        _it('article(messageId).code', async (done: Function) => {
            const res: any = await client.article(messageIdOrRange);
            expect(res.code).toEqual(220);
            done();
        });
        _it('article(messageId).comment', async (done: Function) => {
            const res: any = await client.article(messageIdOrRange);
            expect(res.comment).toEqual("");
            done();
        });
        _it('article(messageId).description', async (done: Function) => {
            const res: any = await client.article(messageIdOrRange);
            expect(res.description).toEqual("Article follows (multi-line)");
            done();
        });
        _it('article(messageId).article', async (done: Function) => {
            const res: any = await client.article(messageIdOrRange);
            expect(res.article.articleNumber).toEqual(1);
            expect(res.article.messageId).toEqual("<4c51f95eda05@lists.example.org>");
            done();
        });
        _it('head(messageId).code', async (done: Function) => {
            const res: any = await client.head(messageIdOrRange);
            expect(res.code).toEqual(221);
            done();
        });
        _it('head(messageId).comment', async (done: Function) => {
            const res: any = await client.head(messageIdOrRange);
            expect(res.comment).toEqual("");
            done();
        });
        _it('head(messageId).description', async (done: Function) => {
            const res: any = await client.head(messageIdOrRange);
            expect(res.description).toEqual("Headers follow (multi-line)");
            done();
        });
        _it('head(messageId).article', async (done: Function) => {
            const res: any = await client.head(messageIdOrRange);
            let headers: Record<string, string> = {
                "FROM": "John Doe <j.doe@example.org>\nXref: localhost test.groups.foo:1"
            };
            const source: Record<string, string | number | Record<string, string>> = {
                "articleNumber": 1, "messageId": "<4c51f95eda05@lists.example.org>", "headers": headers
            };
            expect(diff(res.article, source)).toEqual(true);
            done();
        });
        _it('body(messageId).code', async (done: Function) => {
            const res: any = await client.body(messageIdOrRange);
            expect(res.code).toEqual(222);
            done();
        });
        _it('body(messageId).comment', async (done: Function) => {
            const res: any = await client.body(messageIdOrRange);
            expect(res.comment).toEqual("");
            done();
        });
        _it('body(messageId).description', async (done: Function) => {
            const res: any = await client.body(messageIdOrRange);
            expect(res.description).toEqual("Body follows (multi-line)");
            done();
        });
        _it('body(messageId).article', async (done: Function) => {
            const res: any = await client.body(messageIdOrRange);
            const source: Record<string, string | number | string[]> = {
                "articleNumber": 1, "messageId": "<4c51f95eda05@lists.example.org>", "body": ["first message in first group"]
            };
            expect(diff(res.article, source)).toEqual(true);
            done();
        });
        _it('stat(messageId).code', async (done: Function) => {
            const res: any = await client.stat(messageIdOrRange);
            expect(res.code).toEqual(223);
            done();
        });
        _it('stat(messageId).comment', async (done: Function) => {
            const res: any = await client.stat(messageIdOrRange);
            expect(res.comment).toEqual("");
            done();
        });
        _it('stat(messageId).description', async (done: Function) => {
            const res: any = await client.stat(messageIdOrRange);
            expect(res.description).toEqual("Article exists");
            done();
        });
        _it('stat(messageId).article', async (done: Function) => {
            const res: any = await client.stat(messageIdOrRange);
            const source: Record<string, string | number> = {
                "articleNumber": 1, "messageId": "<4c51f95eda05@lists.example.org>"
            };
            expect(diff(res.article, source)).toEqual(true);
            done();
        });
        _it('over(messageId?).code', async (done: Function) => {
            const res: any = await client.over(messageIdOrRange);
            expect(res.code).toEqual(224);
            done();
        });
        _it('over(messageId?).comment', async (done: Function) => {
            const res: any = await client.over(messageIdOrRange);
            expect(res.comment).toEqual("Overview information follows");
            done();
        });
        _it('over(messageId?).description', async (done: Function) => {
            const res: any = await client.over(messageIdOrRange);
            expect(res.description).toEqual("Overview information follows (multi-line)");
            done();
        });
        _it('over(messageId?).articles', async (done: Function) => {
            const res: any = await client.over(messageIdOrRange);
            let headers: Record<string, string> = {
                "SUBJECT": "",
                "FROM": "John Doe <j.doe@example.org>",
                "DATE": "",
                "MESSAGE-ID": "<4c51f95eda05@lists.example.org>",
                "REFERENCES": "",
                "XREF": "localhost test.groups.foo:1"
            };
            let metadata: Record<string, number> = {
                ":bytes": 28, ":lines": 1
            };
            const source: Record<string, number | Record<string, string | number>>[] = [{
                    "articleNumber": 1, "headers": headers, "metadata": metadata
                }];
            expect(diff(res.articles, source)).toEqual(true);
            done();
        });
        _it('help().code', async (done: Function) => {
            const res: any = await client.help();
            expect(res.code).toEqual(100);
            done();
        });
        _it('help().comment', async (done: Function) => {
            const res: any = await client.help();
            expect(res.comment).toEqual("Help text follows");
            done();
        });
        _it('help().description', async (done: Function) => {
            const res: any = await client.help();
            expect(res.description).toEqual("Help text follows (multi-line)");
            done();
        });
        _it('help().text', async (done: Function) => {
            const res: any = await client.help();
            const source: string[] = [];
            expect(diff(res.text, source)).toEqual(true);
            done();
        });
        _it('capabilities().code', async (done: Function) => {
            const res: any = await client.capabilities();
            expect(res.code).toEqual(101);
            done();
        });
        _it('capabilities().comment', async (done: Function) => {
            const res: any = await client.capabilities();
            expect(res.comment).toEqual("Capability list:");
            done();
        });
        _it('capabilities().description', async (done: Function) => {
            const res: any = await client.capabilities();
            expect(res.description).toEqual("Capability list follows (multi-line)");
            done();
        });
        _it('capabilities().capabilities', async (done: Function) => {
            const res: any = await client.capabilities();
            const source: Record<string, string[]> = {
                "VERSION": ["2"],
                "HDR": [],
                "LIST": ["ACTIVE", "NEWSGROUPS", "OVERVIEW.FMT"],
                "READER": [],
                "NEWNEWS": [],
                "OVER": []
            };
            expect(diff(res.capabilities, source)).toEqual(true);
            done();
        });
        _it('date()', async (done: Function) => {
            const res: any = await client.date();
            expect(res.code).toEqual(111);
            expect(res.isoDateTime).to.be.ok();
            done();
        });
        _it('modeReader().code', async (done: Function) => {
            const res: any = await client.modeReader();
            expect(res.code).toEqual(201);
            done();
        });
        _it('modeReader().comment', async (done: Function) => {
            const res: any = await client.modeReader();
            expect(res.comment).toEqual("Server ready - No posting allowed");
            done();
        });
        _it('modeReader().description', async (done: Function) => {
            const res: any = await client.modeReader();
            expect(res.description).toEqual("Posting prohibited");
            done();
        });
    });
}
