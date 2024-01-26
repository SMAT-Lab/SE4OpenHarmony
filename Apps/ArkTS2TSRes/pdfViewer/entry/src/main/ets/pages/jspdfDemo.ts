interface Index_Params {
    message?: string;
    pdfMessage?: string;
    gloContext?: Context;
    options?: Options;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "jspdfDemo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import fileio from '@ohos.file.fs';
import jsPDF from "@ohos/img2pdf";
import { GlobalContext } from './globalThis';
import { getBuffer, getBuffer2 } from './Pdf';
export interface Options {
    x: number;
    y: number;
    width: number;
    height: number;
    alias: string; // 指定图像别名
    compression: string; // 设置图像压缩格式
    rotation: number; // 设置图像旋转角度（以度为单位）
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('jspdf test', this, "message");
        this.pdfMessage = 'icon.png';
        this.gloContext = GlobalContext.getContext().getObject("context") as Context;
        this.options = {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            alias: 'myImage',
            compression: 'JPEG',
            rotation: 0 // 设置图像旋转角度（以度为单位）
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.pdfMessage !== undefined) {
            this.pdfMessage = params.pdfMessage;
        }
        if (params.gloContext !== undefined) {
            this.gloContext = params.gloContext;
        }
        if (params.options !== undefined) {
            this.options = params.options;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private pdfMessage: string;
    private gloContext: Context;
    private options: Options;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create('现将图片放置rawfile文件夹,然后输入框输入图片名称');
        Text.pop();
        TextInput.create({ placeholder: '请输入图片名称 如 icon.png' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            this.pdfMessage = value;
        });
        Text.create('请配置参数 参数配置类似 50,50,100,100,myImage,JPEG,90');
        Text.pop();
        TextInput.create({ placeholder: '请输入配置参数', text: '50,50,100,100,myImage,JPEG,90' });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.onChange((value: string) => {
            let options: string[] = value.split(',');
            if (options.length == 7) {
                this.options.x = Number(options[0]);
                this.options.y = Number(options[1]);
                this.options.width = Number(options[2]);
                this.options.height = Number(options[3]);
                this.options.alias = options[4];
                this.options.compression = options[5];
                this.options.rotation = Number(options[6]);
            }
            else {
                AlertDialog.show({ title: '请输入正确格式数据',
                    message: '当前输入数据格式不正确',
                    confirm: { value: 'OK', action: () => {
                        } }
                });
            }
        });
        Text.create(this.message);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 32 });
        Text.padding({ left: 10 });
        Text.width('150');
        Text.height('50');
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            this.jspdf(`rawfile/${this.pdfMessage}`);
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
    jspdf(imageFilePath: string) {
        if (imageFilePath.length <= 8) {
            AlertDialog.show({ title: '请输入rawfile文件名称',
                message: '请输入图片名称包含后缀',
                confirm: { value: 'OK', action: () => {
                    } }
            });
        }
        else {
            this.gloContext.resourceManager.getRawFileContent(imageFilePath).then((value: Uint8Array) => {
                this.imageToPDF2(value, this.options);
            }).catch((err: Object) => {
                AlertDialog.show({ title: '请输入rawfile文件名称',
                    message: '请输入图片名称包含后缀',
                    confirm: { value: 'OK', action: () => {
                        } }
                });
            });
        }
    }
    imageToPDF(imageData: Uint8Array) {
        let data: string = this.gloContext.filesDir;
        let buf: ArrayBuffer = getBuffer(imageData, this.pdfMessage);
        const writer = fileio.openSync(data + `/${this.pdfMessage.split('.')[0]}.pdf`, 0o102);
        fileio.writeSync(writer.fd, buf);
        AlertDialog.show({ title: '生成成功',
            message: '请查看手机路径' + data + `/${this.pdfMessage.split('.')[0]}.pdf`,
            confirm: { value: 'OK', action: () => {
                } }
        });
    }
    imageToPDF2(imageData: Uint8Array, options: Options) {
        let data: string = this.gloContext.filesDir;
        let buf: ArrayBuffer = getBuffer2(imageData, this.pdfMessage, options);
        const writer = fileio.openSync(data + `/${this.pdfMessage.split('.')[0]}.pdf`, 0o102);
        fileio.writeSync(writer.fd, buf);
        AlertDialog.show({ title: '生成成功',
            message: '请查看手机路径' + data + `/${this.pdfMessage.split('.')[0]}.pdf`,
            confirm: { value: 'OK', action: () => {
                } }
        });
    }
}
loadDocument(new Index("1", undefined, {}));
