interface MimeType_Params {
    path?: string;
    otherFileResult?: string;
    mimetypeResult?: string;
    globLiteralResult?: string;
    globExtensionResult?: string;
    globFilenameResult?: string;
    octetStreamResult?: string;
    magicAndMagicIndentResult?: string;
    textResult?: string;
    respectsMagicFileOrderingAndMPEG4Result?: string;
    emptyFileAndFileResult?: string;
    filesPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "mimeType_" + ++__generate__Id;
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
import { GlobalContext, MailLogger, MimeTypeDetector, } from '@ohos/mail';
class MimeType extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.path = "/data/storage/el2/base/haps/entry/files";
        this.__otherFileResult = new ObservedPropertySimple("", this, "otherFileResult");
        this.__mimetypeResult = new ObservedPropertySimple("", this, "mimetypeResult");
        this.__globLiteralResult = new ObservedPropertySimple("", this, "globLiteralResult");
        this.__globExtensionResult = new ObservedPropertySimple("", this, "globExtensionResult");
        this.__globFilenameResult = new ObservedPropertySimple("", this, "globFilenameResult");
        this.__octetStreamResult = new ObservedPropertySimple("", this, "octetStreamResult");
        this.__magicAndMagicIndentResult = new ObservedPropertySimple("", this, "magicAndMagicIndentResult");
        this.__textResult = new ObservedPropertySimple("", this, "textResult");
        this.__respectsMagicFileOrderingAndMPEG4Result = new ObservedPropertySimple("", this, "respectsMagicFileOrderingAndMPEG4Result");
        this.__emptyFileAndFileResult = new ObservedPropertySimple("", this, "emptyFileAndFileResult");
        this.filesPath = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MimeType_Params) {
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.otherFileResult !== undefined) {
            this.otherFileResult = params.otherFileResult;
        }
        if (params.mimetypeResult !== undefined) {
            this.mimetypeResult = params.mimetypeResult;
        }
        if (params.globLiteralResult !== undefined) {
            this.globLiteralResult = params.globLiteralResult;
        }
        if (params.globExtensionResult !== undefined) {
            this.globExtensionResult = params.globExtensionResult;
        }
        if (params.globFilenameResult !== undefined) {
            this.globFilenameResult = params.globFilenameResult;
        }
        if (params.octetStreamResult !== undefined) {
            this.octetStreamResult = params.octetStreamResult;
        }
        if (params.magicAndMagicIndentResult !== undefined) {
            this.magicAndMagicIndentResult = params.magicAndMagicIndentResult;
        }
        if (params.textResult !== undefined) {
            this.textResult = params.textResult;
        }
        if (params.respectsMagicFileOrderingAndMPEG4Result !== undefined) {
            this.respectsMagicFileOrderingAndMPEG4Result = params.respectsMagicFileOrderingAndMPEG4Result;
        }
        if (params.emptyFileAndFileResult !== undefined) {
            this.emptyFileAndFileResult = params.emptyFileAndFileResult;
        }
        if (params.filesPath !== undefined) {
            this.filesPath = params.filesPath;
        }
    }
    aboutToBeDeleted() {
        this.__otherFileResult.aboutToBeDeleted();
        this.__mimetypeResult.aboutToBeDeleted();
        this.__globLiteralResult.aboutToBeDeleted();
        this.__globExtensionResult.aboutToBeDeleted();
        this.__globFilenameResult.aboutToBeDeleted();
        this.__octetStreamResult.aboutToBeDeleted();
        this.__magicAndMagicIndentResult.aboutToBeDeleted();
        this.__textResult.aboutToBeDeleted();
        this.__respectsMagicFileOrderingAndMPEG4Result.aboutToBeDeleted();
        this.__emptyFileAndFileResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private path: string;
    private __otherFileResult: ObservedPropertySimple<string>;
    get otherFileResult() {
        return this.__otherFileResult.get();
    }
    set otherFileResult(newValue: string) {
        this.__otherFileResult.set(newValue);
    }
    private __mimetypeResult: ObservedPropertySimple<string>;
    get mimetypeResult() {
        return this.__mimetypeResult.get();
    }
    set mimetypeResult(newValue: string) {
        this.__mimetypeResult.set(newValue);
    }
    private __globLiteralResult: ObservedPropertySimple<string>;
    get globLiteralResult() {
        return this.__globLiteralResult.get();
    }
    set globLiteralResult(newValue: string) {
        this.__globLiteralResult.set(newValue);
    }
    private __globExtensionResult: ObservedPropertySimple<string>;
    get globExtensionResult() {
        return this.__globExtensionResult.get();
    }
    set globExtensionResult(newValue: string) {
        this.__globExtensionResult.set(newValue);
    }
    private __globFilenameResult: ObservedPropertySimple<string>;
    get globFilenameResult() {
        return this.__globFilenameResult.get();
    }
    set globFilenameResult(newValue: string) {
        this.__globFilenameResult.set(newValue);
    }
    private __octetStreamResult: ObservedPropertySimple<string>;
    get octetStreamResult() {
        return this.__octetStreamResult.get();
    }
    set octetStreamResult(newValue: string) {
        this.__octetStreamResult.set(newValue);
    }
    private __magicAndMagicIndentResult: ObservedPropertySimple<string>;
    get magicAndMagicIndentResult() {
        return this.__magicAndMagicIndentResult.get();
    }
    set magicAndMagicIndentResult(newValue: string) {
        this.__magicAndMagicIndentResult.set(newValue);
    }
    private __textResult: ObservedPropertySimple<string>;
    get textResult() {
        return this.__textResult.get();
    }
    set textResult(newValue: string) {
        this.__textResult.set(newValue);
    }
    private __respectsMagicFileOrderingAndMPEG4Result: ObservedPropertySimple<string>;
    get respectsMagicFileOrderingAndMPEG4Result() {
        return this.__respectsMagicFileOrderingAndMPEG4Result.get();
    }
    set respectsMagicFileOrderingAndMPEG4Result(newValue: string) {
        this.__respectsMagicFileOrderingAndMPEG4Result.set(newValue);
    }
    private __emptyFileAndFileResult: ObservedPropertySimple<string>;
    get emptyFileAndFileResult() {
        return this.__emptyFileAndFileResult.get();
    }
    set emptyFileAndFileResult(newValue: string) {
        this.__emptyFileAndFileResult.set(newValue);
    }
    private filesPath: string;
    aboutToAppear() {
        this.filesPath = GlobalContext.getContext().getValue('filesPath') as string;
        this.path = this.filesPath;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ListItem.create();
        Text.create('检测文件MIME类型');
        Text.fontColor('#333333');
        Text.fontSize(20);
        Text.fontWeight(800);
        Text.margin({ top: 20 });
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.padding(10);
        Column.width('100%');
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('test otherfile mimetype', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.otherFileResult = '正在解析...';
            try {
                this.otherFileResult = "\r\n" + "mimeType bat :  " + MimeTypeDetector.detectMimeType(this.path + "/logdemo.bat") + "\r\n"
                    + "mimeType properties :  " + MimeTypeDetector.detectMimeType(this.path + "/logdemo.properties") + "\r\n"
                    + "mimeType afp :  " + MimeTypeDetector.detectMimeType(this.path + "/afpfile.afp");
            }
            catch (error) {
                MailLogger.error('sample mimetype test otherfile:' + error);
                this.otherFileResult = error;
            }
        });
        Button.align(Alignment.Start);
        Button.pop();
        Text.create('文件名：\r\nlogdemo.bat\r\nlogdemo.properties\r\nafpfile.afp');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('MimeType : ' + this.otherFileResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('Test mimetype', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.mimetypeResult = '正在解析...';
            try {
                this.mimetypeResult = "\r\n"
                    + "mimeType java :  " + MimeTypeDetector.detectMimeType("logdemo.java") + "\r\n"
                    + "mimeType mp3 :  " + MimeTypeDetector.detectMimeType("logdemo.mp3") + "\r\n"
                    + "mimeType zip :  " + MimeTypeDetector.detectMimeType("logdemo.zip") + "\r\n"
                    + "mimeType jar :  " + MimeTypeDetector.detectMimeType("logdemo.jar") + "\r\n"
                    + "mimeType rar :  " + MimeTypeDetector.detectMimeType("logdemo.rar") + "\r\n"
                    + "mimeType mp4 :  " + MimeTypeDetector.detectMimeType("logdemo.mp4") + "\r\n"
                    + "mimeType tar.gz :  " + MimeTypeDetector.detectMimeType("logdemo.tar.gz") + "\r\n"
                    + "mimeType png :  " + MimeTypeDetector.detectMimeType("logdemo.png") + "\r\n"
                    + "mimeType gif :  " + MimeTypeDetector.detectMimeType("logdemo.gif") + "\r\n"
                    + "mimeType img :  " + MimeTypeDetector.detectMimeType("logdemo.img") + "\r\n"
                    + "mimeType svg :  " + MimeTypeDetector.detectMimeType("logdemo.svg") + "\r\n"
                    + "mimeType xml :  " + MimeTypeDetector.detectMimeType("logdemo.xml");
            }
            catch (error) {
                MailLogger.error('sample mimetype test mimetype:' + error);
                this.mimetypeResult = error;
            }
        });
        Button.pop();
        Text.create('文件名称：\r\nlogdemo.java\r\nlogdemo.mp3\r\nlogdemo.zip\r\nlogdemo.jar\r\nlogdemo.rar\r\nlogdemo.mp4\r\nlogdemo.tar.gz\r\nlogdemo.png\r\nlogdemo.gif\r\nlogdemo.img\r\nlogdemo.svg\r\nlogdemo.xml');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('MimeType : ' + this.mimetypeResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testGlobLiteral', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.globLiteralResult = '正在解析...';
            try {
                this.globLiteralResult = "\r\n"
                    + "mimeType makefile :  " + MimeTypeDetector.detectMimeType("makefile") + "\r\n"
                    + "mimeType Makefile :  " + MimeTypeDetector.detectMimeType("Makefile");
            }
            catch (error) {
                MailLogger.error('sample mimetype testGlobLiteral:' + error);
                this.globLiteralResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：\r\nmakefile\r\nMakefile');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.globLiteralResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testGlobExtension', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.globExtensionResult = '正在解析...';
            try {
                this.globExtensionResult = "\r\n"
                    + "mimeType txt :  " + MimeTypeDetector.detectMimeType("abc.txt") + "\r\n"
                    + "mimeType cur :  " + MimeTypeDetector.detectMimeType("x.cur") + "\r\n"
                    + "mimeType dat :  " + MimeTypeDetector.detectMimeType("winmail.dat") + "\r\n"
                    + "mimeType mm :  " + MimeTypeDetector.detectMimeType("abc.mm") + "\r\n"
                    + "mimeType anim5 :  " + MimeTypeDetector.detectMimeType("abc.anim5") + "\r\n"
                    + "mimeType animj :  " + MimeTypeDetector.detectMimeType("abc.animj") + "\r\n"
                    + "mimeType Z :  " + MimeTypeDetector.detectMimeType("README.Z") + "\r\n"
                    + "mimeType pst :  " + MimeTypeDetector.detectMimeType("t.pst");
            }
            catch (error) {
                MailLogger.error('sample mimetype testGlobExtension:' + error);
                this.globExtensionResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：\r\nabc.txt\r\nx.cur\r\nwinmail.dat\r\nabc.mm\r\nabc.anim5\r\nabc.animj\r\nREADME.Z\r\nt.pst');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.globExtensionResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testGlobFilename', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.globFilenameResult = '正在解析...';
            try {
                this.globFilenameResult = "\r\n"
                    + "mimeType README :  " + MimeTypeDetector.detectMimeType("README") + "\r\n"
                    + "mimeType READMEFILE :  " + MimeTypeDetector.detectMimeType("READMEFILE") + "\r\n"
                    + "mimeType READMEanim3 :  " + MimeTypeDetector.detectMimeType("READMEanim3") + "\r\n"
                    + "mimeType README.log :  " + MimeTypeDetector.detectMimeType("README.log") + "\r\n"
                    + "mimeType README.file :  " + MimeTypeDetector.detectMimeType("README.file");
            }
            catch (error) {
                MailLogger.error('sample mimetype testGlobFilename:' + error);
                this.globFilenameResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：\r\nREADME\r\nREADMEFILE\r\nREADMEanim3\r\nREADME.log\r\nREADME.file');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.globFilenameResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testOctetStream', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.octetStreamResult = '正在解析...';
            try {
                this.octetStreamResult = "\r\n"
                    + "mimeType empty :  " + MimeTypeDetector.detectMimeType(this.path + "/empty") + "\r\n"
                    + "mimeType octet-stream :  " + MimeTypeDetector.detectMimeType(this.path + "/octet-stream");
            }
            catch (error) {
                MailLogger.error('sample mimetype testOctetStream:' + error);
                this.octetStreamResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：\r\nempty\r\noctet-stream');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.octetStreamResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testMagic and testMagicIndent', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.magicAndMagicIndentResult = '正在解析...';
            try {
                this.magicAndMagicIndentResult = "\r\n"
                    + "mimeType a :  " + MimeTypeDetector.detectMimeType(this.path + "/a") + "\r\n"
                    + "mimeType e[xml] :  " + MimeTypeDetector.detectMimeType(this.path + "/e[xml]");
            }
            catch (error) {
                MailLogger.error('sample mimetype testMagic and testMagicIndent:' + error);
                this.magicAndMagicIndentResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：\r\na\r\ne[xml]');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.magicAndMagicIndentResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testText', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.textResult = '正在解析...';
            try {
                this.textResult = "\r\n"
                    + "mimeType plaintext :  " + MimeTypeDetector.detectMimeType(this.path + "/plaintext");
            }
            catch (error) {
                MailLogger.error('sample mimetype testText:' + error);
                this.textResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：plaintext');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.textResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('testRespectsMagicFileOrdering and testMPEG4', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.respectsMagicFileOrderingAndMPEG4Result = '正在解析...';
            try {
                this.respectsMagicFileOrderingAndMPEG4Result = "\r\n"
                    + "mimeType ogv-video-header :  " + MimeTypeDetector.detectMimeType(this.path + "/ogv-video-header") + "\r\n"
                    + "mimeType mp4v1-video-header :  " + MimeTypeDetector.detectMimeType(this.path + "/mp4v1-video-header") + "\r\n"
                    + "mimeType mp4v2-video-header :  " + MimeTypeDetector.detectMimeType(this.path + "/mp4v2-video-header");
            }
            catch (error) {
                MailLogger.error('sample mimetype testRespectsMagicFileOrdering and testMPEG4:' + error);
                this.respectsMagicFileOrderingAndMPEG4Result = error;
            }
        });
        Button.pop();
        Text.create('文件名称：\r\nogv-video-header\r\nmp4v1-video-header\r\nmp4v2-video-header');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.respectsMagicFileOrderingAndMPEG4Result);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(10);
        Column.margin({ top: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor('#cbd0cf');
        Button.createWithLabel('test EmptyFile and file', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.backgroundColor('#12939f');
        Button.onClick((event: ClickEvent) => {
            this.emptyFileAndFileResult = '正在解析...';
            try {
                this.emptyFileAndFileResult = "\r\n"
                    + " mime-type-test.weird file not exist :  " + MimeTypeDetector.detectMimeType("mime-type-test.weird") + "\r\n"
                    + " mime-type-test.weird file exist :  " + MimeTypeDetector.detectMimeType(this.path + "/mime-type-test.weird");
            }
            catch (error) {
                MailLogger.error('sample mimetype testEmptyFile:' + error);
                this.emptyFileAndFileResult = error;
            }
        });
        Button.pop();
        Text.create('文件名：mime-type-test.weird');
        Text.fontColor('#333333');
        Text.fontSize(16);
        Text.pop();
        Text.create('解析结果 : ' + this.emptyFileAndFileResult);
        Text.fontColor('#ff206adf');
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new MimeType("1", undefined, {}));
