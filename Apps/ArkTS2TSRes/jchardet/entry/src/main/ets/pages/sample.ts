interface Index_Params {
    encoding?: string;
    asciiFile?: string;
    utf8File?: string;
    utf16leFile?: string;
    shiftjisFile?: string;
    iso2022jpFile?: string;
    iso2022cnFile?: string;
    iso2022krFile?: string;
    big5File?: string;
    euctwFile?: string;
    euckrFile?: string;
    eucjpFile?: string;
    gb18030File?: string;
    utf16beFile?: string;
    hzgbFile?: string;
    windows1252File?: string;
    gb2312File?: string;
    BasicEncodingDetectionFile?: string[];
    charsetMessage?: string;
    edit_text_language_hint?: string;
    edit_text_language?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sample_" + ++__generate__Id;
}
/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved. *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * */
import { nsICharsetDetectionObserver, nsDetector, nsPSMDetector } from '@ohos/jchardet/';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__encoding = new ObservedPropertySimple('', this, "encoding");
        this.asciiFile = 'ascii.txt';
        this.utf8File = 'utf8.txt';
        this.utf16leFile = 'utf16le.txt';
        this.shiftjisFile = 'shiftjis.txt';
        this.iso2022jpFile = 'iso2022jp.txt';
        this.iso2022cnFile = 'iso2022cn.txt';
        this.iso2022krFile = 'iso2022kr.txt';
        this.big5File = 'big5.txt';
        this.euctwFile = 'euctw.txt';
        this.euckrFile = 'euckr.txt';
        this.eucjpFile = 'eucjp.txt';
        this.gb18030File = 'GB18030.txt';
        this.utf16beFile = 'utf16be.txt';
        this.hzgbFile = 'hz-gb.txt';
        this.windows1252File = 'windows-1252.txt';
        this.gb2312File = 'gb2312.txt';
        this.__BasicEncodingDetectionFile = new ObservedPropertyObject([this.asciiFile, this.utf8File,
            this.utf16leFile, this.shiftjisFile,
            this.iso2022jpFile, this.iso2022cnFile, this.iso2022krFile,
            this.big5File, this.euctwFile, this.euckrFile, this.eucjpFile, this.gb18030File, this.utf16beFile,
            this.hzgbFile, this.windows1252File, this.gb2312File], this, "BasicEncodingDetectionFile");
        this.__charsetMessage = new ObservedPropertySimple('not found', this, "charsetMessage");
        this.__edit_text_language_hint = new ObservedPropertySimple('请输入语言种类', this, "edit_text_language_hint");
        this.__edit_text_language = new ObservedPropertySimple('', this, "edit_text_language");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.encoding !== undefined) {
            this.encoding = params.encoding;
        }
        if (params.asciiFile !== undefined) {
            this.asciiFile = params.asciiFile;
        }
        if (params.utf8File !== undefined) {
            this.utf8File = params.utf8File;
        }
        if (params.utf16leFile !== undefined) {
            this.utf16leFile = params.utf16leFile;
        }
        if (params.shiftjisFile !== undefined) {
            this.shiftjisFile = params.shiftjisFile;
        }
        if (params.iso2022jpFile !== undefined) {
            this.iso2022jpFile = params.iso2022jpFile;
        }
        if (params.iso2022cnFile !== undefined) {
            this.iso2022cnFile = params.iso2022cnFile;
        }
        if (params.iso2022krFile !== undefined) {
            this.iso2022krFile = params.iso2022krFile;
        }
        if (params.big5File !== undefined) {
            this.big5File = params.big5File;
        }
        if (params.euctwFile !== undefined) {
            this.euctwFile = params.euctwFile;
        }
        if (params.euckrFile !== undefined) {
            this.euckrFile = params.euckrFile;
        }
        if (params.eucjpFile !== undefined) {
            this.eucjpFile = params.eucjpFile;
        }
        if (params.gb18030File !== undefined) {
            this.gb18030File = params.gb18030File;
        }
        if (params.utf16beFile !== undefined) {
            this.utf16beFile = params.utf16beFile;
        }
        if (params.hzgbFile !== undefined) {
            this.hzgbFile = params.hzgbFile;
        }
        if (params.windows1252File !== undefined) {
            this.windows1252File = params.windows1252File;
        }
        if (params.gb2312File !== undefined) {
            this.gb2312File = params.gb2312File;
        }
        if (params.BasicEncodingDetectionFile !== undefined) {
            this.BasicEncodingDetectionFile = params.BasicEncodingDetectionFile;
        }
        if (params.charsetMessage !== undefined) {
            this.charsetMessage = params.charsetMessage;
        }
        if (params.edit_text_language_hint !== undefined) {
            this.edit_text_language_hint = params.edit_text_language_hint;
        }
        if (params.edit_text_language !== undefined) {
            this.edit_text_language = params.edit_text_language;
        }
    }
    aboutToBeDeleted() {
        this.__encoding.aboutToBeDeleted();
        this.__BasicEncodingDetectionFile.aboutToBeDeleted();
        this.__charsetMessage.aboutToBeDeleted();
        this.__edit_text_language_hint.aboutToBeDeleted();
        this.__edit_text_language.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __encoding: ObservedPropertySimple<string>;
    get encoding() {
        return this.__encoding.get();
    }
    set encoding(newValue: string) {
        this.__encoding.set(newValue);
    }
    private asciiFile: string;
    private utf8File: string;
    private utf16leFile: string;
    private shiftjisFile: string;
    private iso2022jpFile: string;
    private iso2022cnFile: string;
    private iso2022krFile: string;
    private big5File: string;
    private euctwFile: string;
    private euckrFile: string;
    private eucjpFile: string;
    private gb18030File: string;
    private utf16beFile: string;
    private hzgbFile: string;
    private windows1252File: string;
    private gb2312File: string;
    private __BasicEncodingDetectionFile: ObservedPropertyObject<string[]>;
    get BasicEncodingDetectionFile() {
        return this.__BasicEncodingDetectionFile.get();
    }
    set BasicEncodingDetectionFile(newValue: string[]) {
        this.__BasicEncodingDetectionFile.set(newValue);
    }
    private __charsetMessage: ObservedPropertySimple<string>;
    get charsetMessage() {
        return this.__charsetMessage.get();
    }
    set charsetMessage(newValue: string) {
        this.__charsetMessage.set(newValue);
    }
    private __edit_text_language_hint: ObservedPropertySimple<string>;
    get edit_text_language_hint() {
        return this.__edit_text_language_hint.get();
    }
    set edit_text_language_hint(newValue: string) {
        this.__edit_text_language_hint.set(newValue);
    }
    private __edit_text_language: ObservedPropertySimple<string>;
    get edit_text_language() {
        return this.__edit_text_language.get();
    }
    set edit_text_language(newValue: string) {
        this.__edit_text_language.set(newValue);
    }
    private async loadFile(fileName: string): Promise<ArrayBuffer> {
        return getContext().resourceManager.getRawFileContent(fileName);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Auto, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.padding(20);
        TextInput.create({ placeholder: this.edit_text_language_hint, text: this.edit_text_language });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 18 });
        TextInput.margin({ bottom: 10 });
        TextInput.onChange((value: string) => {
            this.edit_text_language = value;
        });
        Column.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.BasicEncodingDetectionFile), (file: string) => {
            Button.createWithLabel(file);
            Button.onClick(() => {
                let that = this;
                this.loadFile(file).then((buf: ArrayBuffer) => {
                    that.checkBuffer(buf);
                });
            });
            Button.fontSize(25);
            Button.fontWeight(FontWeight.Bold);
            Button.padding(5);
            Button.pop();
        });
        ForEach.pop();
        Flex.pop();
    }
    private checkBuffer(buf: ArrayBuffer) {
        let charSetResult: string | undefined = '';
        let lang = nsPSMDetector.ALL;
        let languageHint = this.edit_text_language;
        let found: boolean = false;
        let done: boolean = false;
        let isAscii: boolean = true;
        if (languageHint == null) {
            lang = nsPSMDetector.ALL;
        }
        else {
            lang = Number(languageHint);
        }
        let det: nsDetector = new nsDetector(lang);
        class CharsetDetectionObserver implements nsICharsetDetectionObserver {
            Notify(charset: string | undefined): void {
                found = true;
                charSetResult = charset;
            }
        }
        ;
        let charsetDetectionObserver: nsICharsetDetectionObserver = new CharsetDetectionObserver();
        det.Init(charsetDetectionObserver);
        let byteData = new Int8Array(buf);
        if (isAscii) {
            isAscii = det.isAscii(byteData);
        }
        // DoIt if non-ascii and not done yet.
        if (!isAscii && !done) {
            done = det.DoIt(byteData, false);
        }
        det.DataEnd();
        if (isAscii) {
            found = true;
            charSetResult = 'ASCII';
        }
        if (!found) {
            let prob: Array<string> = det.getProbableCharsets();
            for (let i = 0; i < prob.length; i++) {
                charSetResult += prob[i] + '\n';
            }
        }
        AlertDialog.show({
            title: '编码格式',
            message: charSetResult,
            autoCancel: true
        });
    }
}
loadDocument(new Index("1", undefined, {}));
