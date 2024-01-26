let __generate__Id: number = 0;
function generateId(): string {
    return "CAUtil_" + ++__generate__Id;
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
import { GlobalContext, MailLogger } from '@ohos/mail';
export class CAUtil {
    public static async getCA(caName: string[], callback: Function) {
        if (caName == null || caName.length < 2) {
            callback("invalid CA");
            return;
        }
        let ca: Array<string> = new Array<string>();
        await new Promise<string>((resolve, reject) => {
            let ctx: Context = GlobalContext.getContext().getValue('context') as Context;
            ctx.resourceManager.getRawFile(caName[0], (error: Error, value: Uint8Array) => {
                if (error != null) {
                    MailLogger.info("ohos_mail--  getRawFile err " + JSON.stringify(error));
                }
                else {
                    MailLogger.info("ohos_mail-- getRawFileContent success");
                    let rawFile: Uint8Array = value;
                    let data: string = '';
                    for (let i = 0; i < rawFile.length; i++) {
                        let item = String.fromCharCode(rawFile[i]);
                        data += item;
                    }
                    ca[0] = data;
                    resolve('');
                }
            });
        }).then((result) => {
            return new Promise<string>((resolve, reject) => {
                let ctx: Context = GlobalContext.getContext().getValue('context') as Context;
                ctx.resourceManager.getRawFile(caName[1], (error: Error, value: Uint8Array) => {
                    if (error != null) {
                        MailLogger.info("ohos_mail--  getRawFile err " + JSON.stringify(error));
                    }
                    else {
                        MailLogger.info("ohos_mail-- getRawFileContent success");
                        let rawFile: Uint8Array = value;
                        let data: string = '';
                        for (let i = 0; i < rawFile.length; i++) {
                            let todo: number = rawFile[i];
                            let item = String.fromCharCode(todo);
                            data += item;
                        }
                        ca[1] = data;
                        callback(ca);
                        resolve('');
                    }
                });
            });
        });
    }
}
