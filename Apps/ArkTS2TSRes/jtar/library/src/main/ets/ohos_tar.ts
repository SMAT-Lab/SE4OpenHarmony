let __generate__Id: number = 0;
function generateId(): string {
    return "ohos_tar_" + ++__generate__Id;
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
var ohos_tar = globalThis.requireNapi("tar", true);
;
/**
 * tar 是将 一个/多个 的 目录/文件 打包在一起
 * 因此存储一个输入的目录组， 和一个输出的文件名
 *
 * untar 是将 一个tar打包后的文件，解包到指定的一个目录中
 * 需要打包的tar文件名，以及一个指定的输出路径
 * @param fileName
 * @param path
 */
export class OHOSTar {
    rootPath: string; // 操作的根路径
    tarFileName: string; // 用于存储tar打包后的文件名
    untarFileName: string; // 用于存储untar打包后的文件名
    tarPaths: Array<string> = []; // 用于存储要进行tar打包的路径 的数组
    untarPath: string; // 用于存储要进行untar解包的路径
    /**
     * 用于构建Jtar工具
     * @param fileName  压缩后的文件名
     * @param untarDirName      解压后的文件夹名
     */
    constructor(rootPath: string, fileName: string, untarDirName?: string) {
        this.rootPath = rootPath;
        ohos_tar.setTarRootPath(this.rootPath);
        if (untarDirName != null || untarDirName != undefined) {
            this.tarFileName = fileName + ".tar";
            this.untarFileName = fileName + ".tar";
            this.untarPath = untarDirName;
        }
        else {
            this.tarFileName = fileName + ".tar";
            this.untarFileName = fileName + ".tar";
            this.untarPath = fileName;
        }
    }
    // 修改生成的tar文件名
    public setTarName(name: string) {
        this.tarFileName = name + ".tar";
    }
    // 修改解包目标的Untar文件名
    public setUnTarName(name: string) {
        this.untarFileName = name + ".tar";
    }
    // 修改解包目标的Untar文件夹名
    public setUnTarPath(path: string) {
        this.untarPath = path;
    }
    // 添加一个需要tar的文件或目录
    public addTarPath(path: string) {
        if (this.tarPaths.indexOf(path) == -1) {
            this.tarPaths.push(path);
        }
    }
    // 删除一个需要tar的文件或目录
    public delTarPath(path: string) {
        let index = this.tarPaths.indexOf(path);
        if (index != -1) {
            this.tarPaths.splice(index, 1); // 从index开始删除一个
        }
    }
    // tar打包
    public tar(): number {
        if (this.tarPaths.length != 0) {
            // 将所有需要tar的文件或目录传递下去
            for (let i = 0; i < this.tarPaths.length; i++) {
                ohos_tar.addTarPath(this.tarPaths[i]);
            }
        }
        // 调用底层C代码进行tar (传入最后tar生成的文件的绝对路径名)
        let ret: number = ohos_tar.sitar(this.rootPath + "/" + this.tarFileName);
        return ret;
    }
    // untar解包
    public untar(path?: string): number {
        if (path == null || path == undefined || path == "") {
            return ohos_tar.siuntar(this.rootPath + "/" + this.untarFileName);
        }
        return ohos_tar.siuntar(this.rootPath + "/" + this.untarFileName, this.rootPath + this.untarPath);
    }
}
