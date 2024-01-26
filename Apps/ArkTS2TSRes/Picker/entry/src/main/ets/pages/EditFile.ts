interface EditFile_Params {
    myContext?: Context;
    myFileSize?: number;
    myFileName?: string;
    myFileContent?: string;
    myUri?: string;
    opacityValue?: number;
    loadFlag?: Boolean;
    loadFileSize?: number;
    loadFileName?: string;
    loadFileContent?: string;
    loadUri?: string;
    loadFd?: number;
    editable?: Boolean;
    newFileContent?: string;
    fileContentFlag?: boolean;
    scroller?: Scroller;
    controller?: TextAreaController;
    mediaFileUri?: MediaFileUri;
    uriSave?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EditFile_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import promptAction from '@ohos.promptAction';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import router from '@ohos.router';
import picker from '@ohos.file.picker';
import { BusinessError } from '@ohos.base';
import MediaFileUri from '../media/MediaFileUri';
import Logger from '../common/Logger';
import { terminateSelf } from '../utils/utils';
const TAG = 'EditFile: ';
let storage = LocalStorage.GetShared();
const OPACITY_VALUE = 0.6; // 透明度
interface myParams extends Object {
    myUri: string;
    fileName: string;
}
class EditFile extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myContext = new ObservedPropertyObject(getContext(this) as common.UIAbilityContext, this, "myContext");
        this.__myFileSize = AppStorage.SetAndLink('myFileSize', 0, this, "myFileSize");
        this.__myFileName = new ObservedPropertySimple('', this, "myFileName");
        this.__myFileContent = AppStorage.SetAndLink('myFileContent', '', this, "myFileContent");
        this.__myUri = new ObservedPropertySimple('', this, "myUri");
        this.__opacityValue = new ObservedPropertySimple(OPACITY_VALUE, this, "opacityValue");
        this.__editable = AppStorage.SetAndLink('editable', false, this, "editable");
        this.newFileContent = '';
        this.fileContentFlag = false;
        this.scroller = new Scroller();
        this.controller = new TextAreaController();
        this.mediaFileUri = new MediaFileUri();
        this.__uriSave = new ObservedPropertySimple('', this, "uriSave");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EditFile_Params) {
        if (params.myContext !== undefined) {
            this.myContext = params.myContext;
        }
        if (params.myFileName !== undefined) {
            this.myFileName = params.myFileName;
        }
        if (params.myUri !== undefined) {
            this.myUri = params.myUri;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.newFileContent !== undefined) {
            this.newFileContent = params.newFileContent;
        }
        if (params.fileContentFlag !== undefined) {
            this.fileContentFlag = params.fileContentFlag;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.mediaFileUri !== undefined) {
            this.mediaFileUri = params.mediaFileUri;
        }
        if (params.uriSave !== undefined) {
            this.uriSave = params.uriSave;
        }
    }
    aboutToBeDeleted() {
        this.__myContext.aboutToBeDeleted();
        this.__myFileSize.aboutToBeDeleted();
        this.__myFileName.aboutToBeDeleted();
        this.__myFileContent.aboutToBeDeleted();
        this.__myUri.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__loadFlag.aboutToBeDeleted();
        this.__loadFileSize.aboutToBeDeleted();
        this.__loadFileName.aboutToBeDeleted();
        this.__loadFileContent.aboutToBeDeleted();
        this.__loadUri.aboutToBeDeleted();
        this.__loadFd.aboutToBeDeleted();
        this.__editable.aboutToBeDeleted();
        this.__uriSave.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myContext: ObservedPropertyObject<Context>;
    get myContext() {
        return this.__myContext.get();
    }
    set myContext(newValue: Context) {
        this.__myContext.set(newValue);
    }
    private __myFileSize: ObservedPropertyAbstract<number>;
    get myFileSize() {
        return this.__myFileSize.get();
    }
    set myFileSize(newValue: number) {
        this.__myFileSize.set(newValue);
    }
    private __myFileName: ObservedPropertySimple<string>;
    get myFileName() {
        return this.__myFileName.get();
    }
    set myFileName(newValue: string) {
        this.__myFileName.set(newValue);
    }
    private __myFileContent: ObservedPropertyAbstract<string>;
    get myFileContent() {
        return this.__myFileContent.get();
    }
    set myFileContent(newValue: string) {
        this.__myFileContent.set(newValue);
    }
    private __myUri: ObservedPropertySimple<string>;
    get myUri() {
        return this.__myUri.get();
    }
    set myUri(newValue: string) {
        this.__myUri.set(newValue);
    }
    private __opacityValue: ObservedPropertySimple<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __loadFlag: ObservedPropertyAbstract<Boolean> = this.localStorage_.setAndLink<Boolean>('loadFlag', false, this, "loadFlag");
    get loadFlag() {
        return this.__loadFlag.get();
    }
    set loadFlag(newValue: Boolean) {
        this.__loadFlag.set(newValue);
    }
    private __loadFileSize: ObservedPropertyAbstract<number> = this.localStorage_.setAndLink<number>('loadFileSize', 0, this, "loadFileSize");
    get loadFileSize() {
        return this.__loadFileSize.get();
    }
    set loadFileSize(newValue: number) {
        this.__loadFileSize.set(newValue);
    }
    private __loadFileName: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('loadFileName', '', this, "loadFileName");
    get loadFileName() {
        return this.__loadFileName.get();
    }
    set loadFileName(newValue: string) {
        this.__loadFileName.set(newValue);
    }
    private __loadFileContent: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('loadFileContent', '', this, "loadFileContent");
    get loadFileContent() {
        return this.__loadFileContent.get();
    }
    set loadFileContent(newValue: string) {
        this.__loadFileContent.set(newValue);
    }
    private __loadUri: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('loadUri', '', this, "loadUri");
    get loadUri() {
        return this.__loadUri.get();
    }
    set loadUri(newValue: string) {
        this.__loadUri.set(newValue);
    }
    private __loadFd: ObservedPropertyAbstract<number> = this.localStorage_.setAndLink<number>('fd', 0, this, "loadFd");
    get loadFd() {
        return this.__loadFd.get();
    }
    set loadFd(newValue: number) {
        this.__loadFd.set(newValue);
    }
    private __editable: ObservedPropertyAbstract<Boolean>;
    get editable() {
        return this.__editable.get();
    }
    set editable(newValue: Boolean) {
        this.__editable.set(newValue);
    }
    private newFileContent: string;
    public fileContentFlag: boolean;
    private scroller: Scroller;
    private controller: TextAreaController;
    private mediaFileUri: MediaFileUri;
    private __uriSave: ObservedPropertySimple<string>;
    get uriSave() {
        return this.__uriSave.get();
    }
    set uriSave(newValue: string) {
        this.__uriSave.set(newValue);
    }
    getFileInfo(): void {
        if (this.loadFlag) {
            this.myFileName = this.loadFileName;
            this.myFileContent = this.loadFileContent;
            this.myFileSize = this.loadFileSize;
            this.myUri = this.loadUri;
            Logger.info(TAG, 'The count of getFileInfo is myFileContent ' + this.myFileContent);
        }
        else {
            this.myUri = (router.getParams() as myParams).myUri;
            this.myFileName = (router.getParams() as myParams).fileName;
            this.myFileContent = this.mediaFileUri.readFileContent(this.myUri);
            this.myFileSize = this.mediaFileUri.myGetFileSize(this.myUri, fs.OpenMode.READ_ONLY);
            Logger.info(TAG, 'The count of getFileInfo is myFileName is: ' + this.myFileName);
            Logger.info(TAG, 'The count of getFileInfo is myFileContent ' + this.myFileContent);
            Logger.info(TAG, 'The count of getFileInfo is myFileSize ' + this.myFileSize);
        }
        AppStorage.SetOrCreate('myFileContent', this.myFileContent);
        AppStorage.SetOrCreate('myFileSize', this.myFileSize);
    }
    async writeContentForSaveAsFile(myUri: string, wrFlag: Boolean = false): Promise<void> {
        if (wrFlag) {
            Logger.info(TAG, 'fileAsset.displayName wrFlag is true');
            Logger.info(TAG, 'fileAsset.displayName wrFlag myFileContent :' + this.myFileContent);
            this.mediaFileUri.writeFileContent(myUri, this.myFileContent);
        }
    }
    /**
     * 拉起picker保存文件
     */
    async callFilePickerSaveFile(): Promise<void> {
        try {
            let DocumentSaveOptions = new picker.DocumentSaveOptions();
            DocumentSaveOptions.newFileNames = ['MyDocument_01.txt'];
            let documentPicker = new picker.DocumentViewPicker();
            documentPicker.save(DocumentSaveOptions).then((DocumentSaveResult) => {
                Logger.info(TAG, 'DocumentViewPicker.save successfully, DocumentSaveResult uri: ' + JSON.stringify(DocumentSaveResult));
                if (DocumentSaveResult !== null && DocumentSaveResult !== undefined) {
                    this.uriSave = DocumentSaveResult[0];
                    Logger.info(TAG, `save callFilePickerSaveFile file this.uriSave: ${this.uriSave}`);
                }
                Logger.info(TAG, 'fileAsset.displayName wrFlag myFileContent :' + this.myFileContent);
                this.writeContentForSaveAsFile(this.uriSave, true); // 用 medialibrary 重新获取uri，进行写入操作
            }).catch((err: BusinessError) => {
                Logger.error(TAG, 'DocumentViewPicker.save failed with err: ' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'DocumentViewPicker failed with err: ' + err);
        }
    }
    onPageShow(): void {
        this.getFileInfo();
    }
    render() {
        Column.create();
        Column.backgroundColor('#f1f3f5');
        Column.height('100%');
        // 顶部的行容器
        Row.create();
        // 顶部的行容器
        Row.height('7.4%');
        // 顶部的行容器
        Row.width('100%');
        // 后退箭头
        Row.create();
        // 后退箭头
        Row.margin({ left: '5%' });
        Image.create($r('app.media.ic_back'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.id('backIndex');
        Image.width(25);
        Image.height(25);
        Image.align(Alignment.Start);
        Image.onClick(() => {
            if (this.loadFlag) {
                Logger.info(TAG, 'end page');
                let context = getContext(this);
                terminateSelf(context);
            }
            else {
                router.back();
            }
        });
        // 后退箭头
        Row.pop();
        // 文件名及信息
        Column.create();
        // 文件名及信息
        Column.width('45%');
        // 文件名及信息
        Column.margin({ left: '5%' });
        Row.create();
        Row.width('100%');
        Row.align(Alignment.Start);
        Row.margin({ left: '5%', top: '0.4%', bottom: '0.3%' });
        Text.create(this.myFileName);
        Text.focusable(true);
        Text.focusOnTouch(true);
        Text.fontSize(20);
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(700);
        Text.lineHeight(28);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ left: '5%', top: '0.3%', bottom: '0.5%' });
        Row.align(Alignment.Start);
        Text.create('size: ' + JSON.stringify(this.myFileSize) + 'B');
        Text.focusable(true);
        Text.focusOnTouch(true);
        Text.opacity(0.6);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(14);
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.fontWeight(400);
        Text.pop();
        Row.pop();
        // 文件名及信息
        Column.pop();
        // 右边三个图标
        Row.create();
        // 右边三个图标
        Row.height('50%');
        // 右边三个图标
        Row.width('37.2%');
        // 右边三个图标
        Row.padding({ right: '0.5%' });
        // 右边三个图标
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.ic_saveas'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.width(25);
        Image.height(25);
        Image.id('saveAs');
        Image.margin({ right: '12%' });
        Image.onClick(() => {
            this.callFilePickerSaveFile();
        });
        Image.visibility(this.loadFlag ? Visibility.Hidden : Visibility.Visible);
        Image.create($r('app.media.ic_writting'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.width(25);
        Image.height(25);
        Image.id('editable');
        Image.margin({ right: '12%' });
        Image.onClick(() => {
            this.editable = true;
            AppStorage.SetOrCreate('editable', ObservedObject.GetRawObject(this.editable));
            Logger.info(TAG, 'EditFile caretPosition length = ' + this.myFileContent.length);
            this.controller.caretPosition(this.myFileContent.length);
            promptAction.showToast({ message: $r('app.string.editable') });
        });
        Image.create($r('app.media.ic_save'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.width(25);
        Image.height(25);
        Image.id('save');
        Image.margin({ right: '5%' });
        Image.onClick(() => {
            if (this.fileContentFlag) {
                let flage: boolean = true;
                this.myFileContent = this.newFileContent;
                AppStorage.SetOrCreate('myFileContent', this.myFileContent);
                Logger.info(TAG, 'save onClick myFileContent is: ' + this.myFileContent);
                Logger.info(TAG, 'save onClick this.loadUri: ' + this.loadUri);
                if (this.loadFlag) {
                    let file = fs.openSync(this.loadUri, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE | fs.OpenMode.TRUNC);
                    Logger.info(TAG, 'save onClick file.fd is: ' + file.fd);
                    fs.write(file.fd, this.myFileContent).then((writeLen) => {
                        Logger.info(TAG, "write data to file succeed and size is:" + writeLen);
                        this.myFileSize = fs.statSync(file.fd).size;
                        AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                        Logger.info(TAG, 'save onClick this.myFileSize ' + this.myFileSize);
                    }).catch((err: BusinessError) => {
                        Logger.info(TAG, "write data to file failed with error:" + JSON.stringify(err));
                    });
                    fs.closeSync(file);
                }
                else {
                    try {
                        let file = fs.openSync(this.myUri, fs.OpenMode.READ_WRITE | fs.OpenMode.TRUNC);
                        let writeLen = fs.writeSync(file.fd, this.myFileContent);
                        this.myFileSize = fs.statSync(file.fd).size;
                        AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                        Logger.info(TAG, 'write data to file succeed and size is:' + writeLen);
                        fs.closeSync(file);
                    }
                    catch (err) {
                        flage = false;
                        Logger.info(`save data to file failed with error:, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
                        promptAction.showToast({
                            message: `保存失败，文件操作无权限`,
                            duration: 6500,
                        });
                    }
                }
                if (flage) {
                    this.editable = false;
                    AppStorage.SetOrCreate('editable', ObservedObject.GetRawObject(this.editable));
                    promptAction.showToast({ message: $r('app.string.saved') });
                }
            }
        });
        // 右边三个图标
        Row.pop();
        // 顶部的行容器
        Row.pop();
        Scroll.create(this.scroller);
        // TextArea的行容器
        Row.create();
        // TextArea的行容器
        Row.padding({ top: '4%', left: '6.7%', right: '6.7%' });
        TextArea.create({ text: this.myFileContent, placeholder: 'Input text here...', controller: this.controller });
        TextArea.id('textArea');
        TextArea.fontSize(16);
        TextArea.fontColor('#182431');
        TextArea.opacity(this.opacityValue);
        TextArea.fontWeight(400);
        TextArea.align(Alignment.TopStart);
        TextArea.textAlign(TextAlign.Start);
        TextArea.backgroundColor('#f1f3f5');
        TextArea.fontFamily('HarmonyHeiTi');
        TextArea.padding({
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        });
        TextArea.focusable(this.editable ? true : false);
        TextArea.focusOnTouch(true);
        TextArea.defaultFocus(false);
        TextArea.onFocus(() => {
            this.opacityValue = 1;
        });
        TextArea.onBlur(() => {
            this.opacityValue = OPACITY_VALUE;
        });
        TextArea.onChange((value: string) => {
            this.newFileContent = value;
            this.fileContentFlag = true;
        });
        // TextArea的行容器
        Row.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new EditFile("1", undefined, {}, storage));
