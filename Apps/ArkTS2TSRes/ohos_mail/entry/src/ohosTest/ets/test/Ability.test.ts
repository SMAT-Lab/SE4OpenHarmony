let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { AttachmentBody, EmlFormat, Flag, Folder, GlobalContext, MailLogger, MimeBodyPart, MimeMessage, MimeMultipart, Properties, RecipientType, Store, TransPort, Util } from '@ohos/mail';
const BASE_COUNT: number = 2000;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        it('isIp', 0, () => {
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.isIP("34:66:56:90");
            }
            endTime(startTime, 'isIp');
            let result = false;
            let isIp = Util.isIP("34:66:56:90");
            expect(isIp).assertEqual(result);
        });
        it('intToIP', 0, () => {
            // 测试转化ip接口功能，非真实ip
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.intToIP(3232246602);
            }
            endTime(startTime, 'intToIP');
            let result = "192.168.43.74";
            let isIp: string = Util.intToIP(3232246602);
            expect(isIp).assertEqual(result);
        });
        it('encode64gb2312', 0, () => {
            let test = "鸿蒙Harmony";
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.encode64(Util.strUnicode2Ansi(test));
            }
            endTime(startTime, 'encode64gb2312');
            let encStr = Util.encode64(Util.strUnicode2Ansi(test));
            let expectResult = "uujDyUhhcm1vbnk=";
            expect(encStr).assertEqual(expectResult);
        });
        it('decode64gb2312', 0, () => {
            let test = "鸿蒙Harmony";
            let encStr = Util.encode64(Util.strUnicode2Ansi(test));
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.strAnsi2Unicode(Util.decodeBase64(encStr).output);
            }
            endTime(startTime, 'decode64gb2312OutPut');
            let decStr = Util.strAnsi2Unicode(Util.decodeBase64(encStr).output);
            expect(decStr).assertEqual(test);
        });
        it('decode64utf', 0, () => {
            let test = "鸿蒙Harmony";
            let startTime1 = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.encode(test);
            }
            endTime(startTime1, 'decode64utfEncode');
            let encStr = Util.encode(test);
            let startTime2 = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                Util.encode(test);
            }
            endTime(startTime2, 'decode64utfDecode');
            let decStr = Util.decode(encStr);
            expect(decStr).assertEqual(test);
        });
        it('connectSmtp', 0, async () => {
            let properties = new Properties();
            let authorizationCode: string = "xx配置正确的授权码";
            let host: string = "smtp.sina.com";
            let port: number = 25;
            let from: string = "xx@sina.com";
            properties.setFrom(from);
            properties.setHost(host);
            properties.setPort(port);
            properties.setAuthorizationCode(authorizationCode);
            let transport: TransPort = new TransPort();
            transport.setTimeOut(20000);
            transport.connect(properties, (success: boolean, err: Error) => {
                MailLogger.info('ohos_mail-- login smtp fail : ' + success);
                expect(true).assertEqual(success);
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                transport.connect(properties, (success: boolean, err: Error) => { });
            }
            endTime(startTime, 'connectSmtp');
            transport.noop((err: Error) => { });
            MailLogger.info('ohos_mail-- login smtp fail : ---------');
        });
        it('sendMail', 0, async () => {
            let properties = new Properties();
            let authorizationCode: string = "xx配置正确的授权码";
            let host: string = "smtp.sina.com";
            let port: number = 25;
            let from: string = "xx@sina.com";
            let text: string = "3.28号放假一天";
            properties.setFrom(from);
            properties.setHost(host);
            properties.setPort(port);
            properties.setAuthorizationCode(authorizationCode);
            let transport: TransPort = new TransPort();
            transport.connect(properties, (success: boolean, err: Error) => {
                if (success) {
                    MailLogger.info('ohos_mail-- login smtp success:');
                    let mimeMessage = new MimeMessage();
                    let to: string[] = ["xx@qq.com"];
                    let Cc: string[] = ["xx@yeah.net"];
                    let Bc: string[] = ["xx@qq.com"];
                    let subject: string = "清明节放假通知";
                    mimeMessage.setFrom(from);
                    mimeMessage.setRecipients(RecipientType.TO, to);
                    mimeMessage.setRecipients(RecipientType.CC, Cc);
                    mimeMessage.setRecipients(RecipientType.BCC, Bc);
                    mimeMessage.setSubject(subject);
                    mimeMessage.setMIMEVersion("1.0");
                    //设置纯文本格式的正文
                    mimeMessage.setText(text);
                    //设置html格式文件
                    //    mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">" + "<div>" + text + "</div>")
                    //设置html格式文件带图片
                    let contentId = "imag01";
                    mimeMessage.addImgInside(new MimeBodyPart(GlobalContext.getContext().getValue('filesPath') as string, "test.png", contentId));
                    let contentId1 = "imag02";
                    mimeMessage.addImgInside(new MimeBodyPart(GlobalContext.getContext().getValue('filesPath') as string, "test.png", contentId1));
                    mimeMessage.setHtml("<meta http-equiv=\"" + "Content-Type" + "\"" + "content=\"" + "text/html; charset=GB2312" + "\">"
                        + "<div>" + text
                        + "<img src=\"" + "cid:" + contentId + "\""
                        + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                        + "<img src=\"" + "cid:" + contentId1 + "\""
                        + "id=\"" + "img_insert_165510789654906970130739777411" + "\"" + ">"
                        + "</div><br>");
                    //设置附件
                    mimeMessage.addAttachmentBody(new AttachmentBody(GlobalContext.getContext().getValue('filesPath') as string, "test.txt"));
                    mimeMessage.addAttachmentBody(new AttachmentBody(GlobalContext.getContext().getValue('filesPath') as string, "test.docx"));
                    //发送邮件
                    transport.sendMessage(mimeMessage, (err: Error) => {
                        if (!err) {
                            expect().assertTrue();
                        }
                        else {
                            expect().assertFalse();
                        }
                        transport.close((err: Error) => {
                            if (!err) {
                                MailLogger.info('ohos_mail-- smtp socket close success!');
                            }
                            else {
                                MailLogger.info('ohos_mail-- smtp socket close fail:' + err);
                            }
                        });
                    });
                    let startTime = new Date().getTime();
                    for (let index = 0; index < BASE_COUNT; index++) {
                        transport.sendMessage(mimeMessage, (err: Error) => {
                            transport.close((err: Error) => { });
                        });
                    }
                    endTime(startTime, 'sendMail');
                }
                else {
                    MailLogger.error('ohos_mail-- login smtp fail:' + err);
                    expect().assertFalse();
                }
            });
        });
        it('connectImap', 0, async () => {
            let properties = new Properties();
            properties.setHost("imap.sina.com");
            properties.setPort(143);
            properties.setFrom("xx@sina.com");
            properties.setAuthorizationCode("xx配置正确的授权码");
            let store = new Store(properties);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                store.connect(async (success: boolean, err: Error) => {
                    store.close((success: boolean) => { });
                });
            }
            endTime(startTime, 'connectImap');
            store.connect(async (success: boolean, err: Error) => {
                expect(true).assertEqual(success);
                store.close((success: boolean) => {
                    if (success) {
                        MailLogger.info('ohos_mail-- connectImap close imap success');
                    }
                    else {
                        MailLogger.info('ohos_mail-- connectImap close imap fail');
                    }
                });
            });
        });
        it('receiveMail', 0, async () => {
            let readMsgIndex: number = 1;
            let properties = new Properties();
            properties.setHost("imap.sina.com");
            properties.setPort(143);
            properties.setFrom("xx@sina.com");
            properties.setAuthorizationCode("xx配置正确的授权码");
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    folder.open(Folder.READ_WRITE, async () => {
                        let messages = folder.getMessages();
                        if (messages.length > 0 && messages.length >= readMsgIndex) {
                            let msg = messages[readMsgIndex - 1];
                            if (!!msg) {
                                expect().assertTrue();
                            }
                            else {
                                expect().assertFalse();
                            }
                        }
                        store.close((success: Error) => {
                            if (success) {
                                MailLogger.info('ohos_mail-- receiveMail close imap success');
                            }
                            else {
                                MailLogger.info('ohos_mail-- receiveMail close imap fail');
                            }
                        });
                    });
                }
                else {
                    expect().assertFalse();
                }
            });
        });
        it('deleteMail', 0, async () => {
            let deleteMsgIndex: number = 1;
            let properties = new Properties();
            properties.setHost("imap.sina.com");
            properties.setPort(143);
            properties.setFrom("xx@sina.com");
            properties.setAuthorizationCode("xx配置正确的授权码");
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    folder.open(Folder.READ_WRITE, async () => {
                        let messages = folder.getMessages();
                        messages[deleteMsgIndex - 1].setFlags([Flag.DELETED], true, async (err: Error) => {
                            if (!err) {
                                try {
                                    await folder.syncExpunge();
                                    expect().assertTrue();
                                }
                                catch (err) {
                                    expect().assertFalse();
                                }
                            }
                            else {
                                expect().assertFalse();
                            }
                            store.close((success: boolean) => {
                                if (success) {
                                    MailLogger.info('ohos_mail-- deleteMail close imap success');
                                }
                                else {
                                    MailLogger.info('ohos_mail-- deleteMail close imap fail');
                                }
                            });
                        });
                    });
                }
                else {
                    expect().assertFalse();
                }
            });
        });
        it('addRecipient', 0, () => {
            let mimeMessage = new MimeMessage();
            let addTo: string[] = ["xx@qq.com"];
            mimeMessage.setRecipients(RecipientType.TO, ["xxx@163.com"]);
            mimeMessage.addRecipients(RecipientType.TO, addTo);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                mimeMessage.addRecipients(RecipientType.TO, addTo);
            }
            endTime(startTime, 'addRecipient');
            expect(mimeMessage.getAllRecipients()).assertContain("xx@qq.com");
        });
        it('buildEmail', 0, () => {
            let mimeMessage = new MimeMessage();
            mimeMessage.setText("test");
            let emlFormat = new EmlFormat();
            emlFormat.buildEml(mimeMessage, (error: Error, result: string) => {
                if (error === null) {
                    console.log(result);
                    expect(result).assertContain("test");
                }
                else {
                    console.error("Error:", error);
                }
            });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                emlFormat.buildEml(mimeMessage, (error: Error, result: string) => { });
            }
            endTime(startTime, 'buildEmail');
            emlFormat.parse("your_file_path.eml", (success: boolean, result: string) => {
                if (success) {
                    console.log("Parse successful:", result);
                }
                else {
                    console.error("Parse failed:", result);
                }
            });
            EmlFormat.parseString("test", (success: boolean, result: Object) => {
            });
        });
        it('copyMessages', 0, async () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(143);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(false);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    //获取INBOX邮箱对象(收件箱)
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    //打开INBOX邮箱
                    folder.open(Folder.READ_WRITE, async () => {
                        //获取当前邮箱的所有邮件
                        let messages = folder.getMessages();
                        folder.copyMessages(messages, folder, (success: boolean, result: string) => {
                            if (success) {
                                expect().assertTrue();
                            }
                            else {
                                expect().assertTrue();
                            }
                        });
                        let startTime = new Date().getTime();
                        for (let index = 0; index < BASE_COUNT; index++) {
                            folder.copyMessages(messages, folder, (success: boolean, result: string) => { });
                        }
                        endTime(startTime, 'copyMessages');
                    });
                }
            });
        });
        it('createFolder', 0, () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(25);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(true);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    //创建邮箱(文件夹)
                    store.createFolder("Test", (success: boolean, err: string) => {
                        if (success) {
                            console.info('ohos_mail-- create mail success');
                        }
                        else {
                            console.info('ohos_mail-- create mail fail:' + err);
                        }
                    });
                    let startTime = new Date().getTime();
                    for (let index = 0; index < BASE_COUNT; index++) {
                        store.createFolder("Test", (success: boolean, err: string) => { });
                    }
                    endTime(startTime, 'createFolder');
                }
            });
        });
        it('deleteFolder', 0, () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(25);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(true);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    //创建邮箱(文件夹)
                    store.deleteFolder("Test", (success: boolean, err: string) => {
                        if (success) {
                            console.info('ohos_mail-- create mail success');
                        }
                        else {
                            console.info('ohos_mail-- create mail fail:' + err);
                        }
                    });
                    let startTime = new Date().getTime();
                    for (let index = 0; index < BASE_COUNT; index++) {
                        store.deleteFolder("Test", (success: boolean, err: string) => { });
                    }
                    endTime(startTime, 'deleteFolder');
                }
            });
        });
        it('exists', 0, async () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(143);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(false);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    folder.exists((success: boolean, result: string) => {
                        if (success) {
                        }
                        else {
                        }
                    });
                    let startTime = new Date().getTime();
                    for (let index = 0; index < BASE_COUNT; index++) {
                        folder.exists((success: boolean, result: string) => { });
                    }
                    endTime(startTime, 'exists');
                }
            });
        });
        it('expunge', 0, async () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(143);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(false);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.connect(async (success: boolean, err: Error) => {
                if (success) {
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    folder.expunge((err: Error) => {
                    });
                    let startTime = new Date().getTime();
                    for (let index = 0; index < BASE_COUNT; index++) {
                        folder.expunge((err: Error) => { });
                    }
                    endTime(startTime, 'expunge');
                }
            });
        });
        it('getAttachmentFilesDigest', 0, async () => {
            let properties = new Properties("imap");
            properties.setHost("imap.qq.com");
            properties.setPort(143);
            properties.setFrom("xx@qq.com");
            properties.setAuthorizationCode("xx");
            //设置是否使用ssl
            properties.ssl(false);
            //设置ca证书
            properties.ca(["xx"]);
            let store = new Store(properties);
            store.setConnectTimeOut(20000);
            store.connect(async (success: boolean, err: Error) => {
                store.noop();
                if (success) {
                    //获取INBOX邮箱对象(收件箱)
                    let folder: Folder = await store.syncGetFolder("INBOX");
                    //打开INBOX邮箱
                    folder.open(Folder.READ_WRITE, async () => {
                        console.log("getUIDValidity = " + folder.getUIDValidity());
                        folder.list((success: boolean, result: Array<Folder>) => {
                            if (success) {
                                console.log(JSON.stringify(result));
                            }
                            else {
                                console.log("get list fail");
                            }
                        });
                        //获取当前邮箱的所有邮件
                        folder.getMessage(0);
                        folder.syncGetMessageByUID("this is uid");
                        folder.getMessageCount();
                        folder.getMode();
                        folder.getNewMessageCount();
                        folder.getStore();
                        folder.isOpen();
                        await folder.syncList();
                        let messages = folder.getMessages();
                        let msg = messages[0];
                        let moveToFolder: Folder = await store.syncGetFolder("TEST");
                        await folder.syncMoveMessages([msg], moveToFolder);
                        msg.getHeader("MIME-Version", (success: boolean, result: string) => {
                            if (success) {
                            }
                            else {
                            }
                        });
                        await folder.syncGetUID(msg);
                        folder.getUIDNext();
                        folder.getUnreadMessageCount();
                        msg.isIncludeAttachment();
                        msg.getInlineFiles();
                        msg.getLineCount();
                        msg.getMessageNumber();
                        msg.getReplyTo();
                        msg.syncGetLineContent(1);
                        await msg.syncGetSize();
                        await msg.syncGetMIMEVersion();
                        let msgFolder = msg.getFolder();
                        let flags = await msg.syncGetFlags();
                        let html = msg.getHtml();
                        let result = await msg.syncGetContent();
                        let mime = result as MimeMultipart;
                        mime.getAttachmentFilesDigest();
                        mime.getInlineAttachmentFilesDigest();
                        mime.getCalendarSize();
                        mime.getCount();
                        mime.isIncludeInlineAttachment();
                        await mime.syncGetText();
                        mime.getTextSize();
                        await mime.syncGetPartText(10);
                        await mime.syncGetPartHtml(10);
                    });
                    folder.getDeletedMessageCount((success: boolean, result: string) => {
                        if (success) {
                            console.log(result);
                        }
                        else {
                            console.log(result);
                        }
                    });
                }
                await store.syncRenameFolder("INBOX", "newFolder");
                store.quit();
            });
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + " startTime: " + endTime);
    console.info(tag + " endTime: " + endTime);
    console.log(tag + " averageTime: " + averageTime + "μs");
}
