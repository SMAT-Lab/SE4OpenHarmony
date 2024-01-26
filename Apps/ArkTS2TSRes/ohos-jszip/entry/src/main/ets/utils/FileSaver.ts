let __generate__Id: number = 0;
function generateId(): string {
    return "FileSaver_" + ++__generate__Id;
}
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
import fs from '@ohos.file.fs';
import promptAction from '@ohos.promptAction';
let context = getContext();
export function writeCacheDirFile(fileName: string, fileData: string | ArrayBuffer): void {
    const path = `${context.cacheDir}/${fileName}`;
    const openInfo = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(openInfo.fd, fileData);
    promptAction.showToast({ message: "保存文件成功，请在设备管理器中查看!" });
    console.log("保存文件成功，请在设备管理器中查看!");
}
export async function loadAsyncFromRawFile(fileName: string): Promise<Uint8Array | void> {
    const resourceManager = context.resourceManager;
    try {
        const data = await resourceManager.getRawFileContent(fileName);
        promptAction.showToast({ message: "加载rawfile目录下面的文件成功!" });
        return data;
    }
    catch (err) {
        promptAction.showToast({ message: "加载rawfile目录下面的文件失败!" });
    }
}
