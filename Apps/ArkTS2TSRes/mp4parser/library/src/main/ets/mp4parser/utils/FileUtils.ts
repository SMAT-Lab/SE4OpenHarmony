let __generate__Id: number = 0;
function generateId(): string {
    return "FileUtils_" + ++__generate__Id;
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
import fileio from '@ohos.fileio';
import { IFileCachePathCallBack } from "../callback/IFileCachePathCallBack";
import { IFileCallBack } from "../callback/IFileCallBack";
/**
 * Document management tools
 * @param fileOldPath
 * @param fileNewPath
 * @param callBack
 */
export class FileUtils {
    /**
     * String file path processing
     * @param filePath
     */
    static fileNameClip(filePath: string): string {
        if (filePath == null)
            return "";
        let fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        let removeSuffixName = fileName.substring(0, fileName.lastIndexOf("."));
        let tempPath = filePath.substring(0, filePath.lastIndexOf("/")) + "/" + removeSuffixName + ".mp4";
        return tempPath;
    }
    /**
     * Create a merge file based on the resource path
     * @param filePath_one
     * @param FilePath_two
     */
    static createMergeFileByPath(filePath_one: string, FilePath_two: string, callBack: IFileCachePathCallBack) {
        let filepathDir = filePath_one.substring(0, filePath_one.lastIndexOf("/"));
        let path = filepathDir + "/mergeTemp.txt";
        let fileContent = "file '" + filePath_one + "'\nfile '" + FilePath_two + "'";
        let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
        fileio.write(fd, fileContent, () => {
            callBack.callBackResult(path);
        });
    }
    /**
   * 文件重命名
   * @param fileOldPath
   * @param fileNewPath
   * @param callBack
   */
    static reFileName(fileOldPath: string, fileNewPath: string, callBack: IFileCallBack) {
        fileio.rename(fileOldPath, fileNewPath).then(() => {
            callBack.callBackResult(0);
        }).catch(() => {
            callBack.callBackResult(1);
        });
    }
}
