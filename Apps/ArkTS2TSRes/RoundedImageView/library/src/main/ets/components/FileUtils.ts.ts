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
import fileio from '@ohos.fileio';
class FileUtils {
    private static sInstance: FileUtils;
    public static getInstance(): FileUtils {
        if (!this.sInstance) {
            this.sInstance = new FileUtils();
        }
        return this.sInstance;
    }
    private constructor() {
    }
    /**
    * 新建文件
    */
    createFile(path: string): number {
        return fileio.openSync(path, 0o100, 0o666);
    }
    /**
    * 删除文件
    */
    deleteFile(path: string): void {
        fileio.unlinkSync(path);
    }
    /**
     * 判断path文件是否存在
     */
    exist(path: string): boolean {
        try {
            let stat = fileio.statSync(path);
            return stat.isFile();
        }
        catch (e) {
            console.error("FileUtils exist error： " + e);
            return false;
        }
    }
    /**
     * 创建文件夹
     */
    createFolder(path: string): void {
        // 创建文件夹
        if (!this.existFolder(path)) {
            fileio.mkdirSync(path);
        }
    }
    /**
     * 判断文件夹是否存在
     */
    existFolder(path: string): boolean {
        try {
            let stat = fileio.statSync(path);
            return stat.isDirectory();
        }
        catch (e) {
            console.error("FileUtils existFolder error: " + e);
            return false;
        }
    }
    /**
     * 读取路径path的文件
     */
    readFilePic(path: string): ArrayBuffer {
        try {
            let fd = fileio.openSync(path, 0o2);
            let length = fileio.statSync(path).size;
            let buf = new ArrayBuffer(length);
            fileio.readSync(fd, buf);
            return buf;
        }
        catch (e) {
            console.error("FileUtils readFilePic error: " + e);
            return new ArrayBuffer(0);
        }
    }
    /**
     * 向path写入数据
     */
    writePic(path: string, picData: ArrayBuffer) {
        this.createFile(path);
        try {
            let fd = fileio.openSync(path, 0o102, 0o666);
            fileio.writeSync(fd, picData);
            fileio.closeSync(fd);
        }
        catch (e) {
            console.error("FileUtils writePic error: " + e);
        }
    }
}
export default FileUtils;
