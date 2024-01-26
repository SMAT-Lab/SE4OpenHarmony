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
import resmgr from '@ohos.resourceManager';
import fileio from '@ohos.file.fs';
export class FileUtils {
    base64Str: string = '';
    private static sInstance: FileUtils;
    public static getInstance(): FileUtils {
        if (!this.sInstance) {
            this.sInstance = new FileUtils();
        }
        return this.sInstance;
    }
    private constructor() {
        console.error("FileUtils - FileUtils constructor");
    }
    /**
     * 新建文件
     * @param path 文件绝对路径及文件名
     * @return number 文件句柄id
     */
    createFile(path: string): number {
        let file = fileio.openSync(path, fileio.OpenMode.READ_WRITE | fileio.OpenMode.CREATE);
        return file.fd;
    }
    /**
     * 删除文件
     * @param path 文件绝对路径及文件名
     */
    deleteFile(path: string): void {
        fileio.unlinkSync(path);
    }
    /**
     * 同步删除文件目录 必须保证文件夹里面没有文件
     * @param path 待删除目录的绝对路径
     */
    deleteFolderSync(path: string): void {
        if (this.existFolder(path)) {
            fileio.rmdirSync(path);
        }
    }
    /**
     * 异步删除文件目录  必须保证文件夹里面没有文件
     * @param path 待删除目录的绝对路径
     */
    deleteFolderAsync(path: string, deleteComplete, deleteError) {
        if (this.existFolder(path)) {
            fileio.rmdir(path)
                .then(deleteComplete).catch(deleteError);
        }
    }
    /**
     * 拷贝文件
     * @param path 文件绝对路径及文件名
     */
    copyFile(oriPath: string, newPath: string) {
        fileio.copyFileSync(oriPath, newPath);
    }
    /**
     * 清空已有文件数据
     */
    clearFile(path: string): number {
        let file = fileio.openSync(path, 0o1000);
        return file.fd;
        //return fileio.openSync(path, 0o1000)
    }
    /**
     * 向path写入content数据，覆盖旧数据
     */
    writeFile(path: string, content: ArrayBuffer | string) {
        try {
            let fd = fileio.openSync(path, fileio.OpenMode.READ_WRITE | fileio.OpenMode.CREATE).fd;
            fileio.truncateSync(fd);
            //let fd = fileio.openSync(path, 0o102, 0o666)
            //fileio.ftruncateSync(fd)
            fileio.writeSync(fd, content);
            fileio.fsyncSync(fd);
            fileio.closeSync(fd);
        }
        catch (e) {
            console.log("FileUtils - Failed to writeFile for " + e);
        }
    }
    /**
     * 向path写入数据
     */
    writeData(path: string, content: ArrayBuffer | string) {
        try {
            console.info("FileUtils - writeData size 1= " + path);
            let fd = fileio.openSync(path, fileio.OpenMode.READ_WRITE | fileio.OpenMode.CREATE).fd;
            //let fd = fileio.openSync(path, 0o102, 0o666)
            console.info("FileUtils - writeData size 2= ");
            let stat = fileio.statSync(path);
            console.info("FileUtils - writeData size = " + stat.size);
            fileio.writeSync(fd, content, { offset: stat.size });
            //fileio.writeSync(fd, content, { position: stat.size })
            let length = 0;
            if (content instanceof ArrayBuffer) {
                length = content.byteLength;
            }
            else {
                length = content.length;
            }
            fileio.closeSync(fd);
        }
        catch (e) {
            console.log("FileUtils - Failed to writeData for " + e);
        }
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
            console.debug("FileUtils - fileutils exsit e" + e);
            console.log("path=>" + path);
            return false;
        }
    }
    /**
     * 向path写入数据
     */
    writePic(path: string, picData: ArrayBuffer) {
        console.info("FileUtils - writepic 1");
        this.createFile(path);
        this.writeFile(path, picData);
        console.info("FileUtils - writepic 3");
    }
    /**
     * 获取path的文件大小
     */
    getFileSize(path: string): number {
        try {
            let stat = fileio.statSync(path);
            return stat.size;
        }
        catch (e) {
            console.error("FileUtils - FileUtils getFileSize e " + e);
            return -1;
        }
    }
    /**
     * 读取路径path的文件
     */
    readFilePic(path: string): ArrayBuffer {
        try {
            let stat = fileio.statSync(path);
            console.info("FileUtils - readFilePic 1");
            let fd = fileio.openSync(path, 0o2);
            let length = fileio.statSync(path).size;
            console.info("FileUtils - readFilePic 2 length = " + length);
            let buf = new ArrayBuffer(length);
            console.info("FileUtils - readFilePic 3");
            fileio.readSync(fd.fd, buf);
            return buf;
        }
        catch (e) {
            console.log("FileUtils - readFilePic " + e);
            return new ArrayBuffer(0);
        }
    }
    /**
     * stream式读取
     */
    readStream(path: string): string {
        try {
            let stat = fileio.statSync(path);
            let length = stat.size;
            let buf = new ArrayBuffer(length);
            let ss = fileio.createStreamSync(path, "r+");
            ss.readSync(buf);
            ss.closeSync();
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        }
        catch (e) {
            console.log("FileUtils - readFilePic " + e);
            return "";
        }
    }
    /**
     * stream式写入
     */
    writeStream(path: string, tempArray: ArrayBuffer) {
        try {
            console.error("FileUtils - writeStream =1 ");
            this.createFile(path);
            console.error("FileUtils - writeStream 2 ");
            let ss = fileio.createStreamSync(path, "r+");
            console.error("FileUtils - writeStream 3 " + tempArray.byteLength);
            let num = ss.writeSync(tempArray, {
                encoding: 'utf-8'
            });
            console.error("FileUtils - write num = " + num);
            ss.flushSync();
            ss.closeSync();
        }
        catch (e) {
            console.log("FileUtils - Failed to writeStream for " + e);
        }
    }
    /**
     * 创建文件夹
     * @param 文件夹绝对路径
     */
    createFolder(path: string) {
        //创建文件夹
        if (!this.existFolder(path)) {
            fileio.mkdirSync(path);
        }
    }
    /**
     * 判断文件夹是否存在
     * @param 文件夹绝对路径
     */
    existFolder(path: string): boolean {
        try {
            let stat = fileio.statSync(path);
            return stat.isDirectory();
        }
        catch (e) {
            console.debug("fileutils folder exsit error=" + e);
            return false;
        }
    }
    /**
     * 如果文件夹不存在则创建一个文件夹 然后在其中创建文件 并且将数据写入进文件
     *  @param folder 文件夹绝对路径
     *  @param file 文件绝对路径
     *  @param content 文件内容数据
     */
    createFileProcess(folder: string, file: string, content: ArrayBuffer | string) {
        //创建文件夹
        this.createFolder(folder);
        //创建文件
        this.createFile(file);
        //写入数据
        this.writeFile(file, content);
    }
    /**
     * string 转 Uint8Array
     * @param str 输入String
     */
    stringToUint8Array(str): Uint8Array {
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }
        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array;
    }
    /**
     * int 转 byte[]
     *  @param n 输入int
     */
    intTobytes2(n) {
        var bytes = [];
        for (var i = 0; i < 2; i++) {
            bytes[i] = n >> (8 - i * 8);
        }
        return bytes;
    }
    uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
}
export interface AsyncCallback<T> {
    (err: string, data: T): void;
}
