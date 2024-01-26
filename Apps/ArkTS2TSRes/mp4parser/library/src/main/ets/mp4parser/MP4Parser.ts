let __generate__Id: number = 0;
function generateId(): string {
    return "MP4Parser_" + ++__generate__Id;
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
var mp4parser_napi = globalThis.requireNapi("mp4parser_napi", true);
import { ICallBack } from '../mp4parser/callback/ICallBack';
import { FileUtils } from '../mp4parser/utils/FileUtils';
import { IFileCachePathCallBack } from '../mp4parser/callback/IFileCachePathCallBack';
import { IFrameCallBack } from '../mp4parser/callback/IFrameCallBack';
export class MP4Parser {
    static OPTION_CLOSEST_SYNC: string = "2";
    static OPTION_CLOSEST: string = "3";
    static OPTION_PREVIOUS_SYNC: string = "0";
    /**
     * Video clipping
     * @param startTime
     * @param endTime
     * @param sourcePath
     * @param outPath
     * @param callback
     */
    static videoClip(startTime: string, endTime: string, sourcePath: string, outPath: string, callBack: ICallBack): void {
        mp4parser_napi.exeFFmpegCmd("ffmpeg -y -i " + sourcePath + " -ss " + startTime + " -c copy -to " + endTime + " " + outPath)
            .then((res: number) => {
            callBack.callBackResult(res);
        });
    }
    /**
     * Video synthesis
     * @param sourcePath
     * @param outPath
     * @param callBack
     */
    static videoMerge(filePath_one: string, filePath_two: string, outPath: string, callBack: ICallBack): void {
        let fileCachePathCallBack: IFileCachePathCallBack = {
            callBackResult(path: string) {
                mp4parser_napi.exeFFmpegCmd("ffmpeg -y -f concat -safe 0 -i " + path + " -c copy " + outPath)
                    .then((res: number) => {
                    callBack.callBackResult(res);
                });
            }
        };
        FileUtils.createMergeFileByPath(filePath_one, filePath_two, fileCachePathCallBack);
    }
    /**
     * Batch video synthesis
     * @param sourcePath
     * @param outPath
     * @param callBack
     */
    static videoMultMerge(sourcePath: string, outPath: string, callBack: ICallBack): void {
        mp4parser_napi.exeFFmpegCmd("ffmpeg -y -f concat -safe 0 -i " + sourcePath + " -c copy " + outPath)
            .then((res: number) => {
            callBack.callBackResult(res);
        });
    }
    /**
     * Batch audio synthesis
     * @param sourcePath
     * @param outPath
     * @param callBack
     */
    static audioMultMerge(sourcePath: string, outPath: string, callBack: ICallBack): void {
        mp4parser_napi.exeFFmpegCmd("ffmpeg -y -f concat -safe 0 -i " + sourcePath + " -c copy " + outPath)
            .then((res: number) => {
            callBack.callBackResult(res);
        });
    }
    /**
     * Audio synthesis
     * @param sourcePath
     * @param outPath
     * @param callBack
     */
    static audioMerge(filePath_one: string, filePath_two: string, outPath: string, callBack: ICallBack) {
        let fileCachePathCallBack: IFileCachePathCallBack = {
            callBackResult(path: string) {
                mp4parser_napi.exeFFmpegCmd("ffmpeg -y -f concat -safe 0 -i  " + path + " -c copy " + outPath)
                    .then((res: number) => {
                    callBack.callBackResult(res);
                });
            }
        };
        FileUtils.createMergeFileByPath(filePath_one, filePath_two, fileCachePathCallBack);
    }
    /**
     * Audio clipping
     * @param startTime
     * @param endTime
     * @param sourcePath
     * @param outPath
     * @param callBack
     */
    static audioClip(startTime: string, endTime: string, sourcePath: string, outPath: string, callBack: ICallBack) {
        mp4parser_napi.exeFFmpegCmd("ffmpeg -y -i " + sourcePath + " -vn -acodec copy -ss  " + startTime + " -to " + endTime + " " + outPath)
            .then((res: number) => {
            callBack.callBackResult(res);
        });
    }
    /**
     * open native log
     */
    static openNativeLog() {
        mp4parser_napi.openNativeLog();
    }
    /**
     * set video source
     * @param path
     * @param callBack
     */
    static setDataSource(path: string, callBack: ICallBack) {
        mp4parser_napi.setDataSource(path).then((res: number) => {
            callBack.callBackResult(res);
        });
    }
    /**
     * get video frames
     * @param timeUs
     * @param option
     * @param callBack
     * @returns
     */
    static getFrameAtTimeRang(stimeUs: string, etimeUs: string, option: string, frameCallBack: IFrameCallBack) {
        let messageCallBack = (data: ArrayBuffer, timeUs: number) => {
            frameCallBack.callBackResult(data, timeUs);
        };
        mp4parser_napi.getFrameAtTimeRang(stimeUs, etimeUs, option, messageCallBack);
    }
    /**
     *  stop get frame
     */
    static stopGetFrame() {
        mp4parser_napi.stopGetFrame();
    }
    /**
     * ffmpeg cmd
     * @param cmd
     * @param callBack
     */
    static ffmpegCmd(cmd: string, callBack: ICallBack) {
        mp4parser_napi.exeFFmpegCmd(cmd)
            .then((res: number) => {
            callBack.callBackResult(res);
        });
    }
}
