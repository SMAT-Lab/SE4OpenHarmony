let __generate__Id: number = 0;
function generateId(): string {
    return "MP4Parser.test_" + ++__generate__Id;
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
import { MP4Parser, ICallBack, IFileCallBack, IFileCachePathCallBack, IFrameCallBack } from "@ohos/mp4parser";
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { XtsReadFilesUtil } from './Utils';
export default function MP4ParserTest() {
    let setDataSourceResultCode: number = 1;
    describe('MP4ParserTest', () => {
        beforeAll((done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let path = context.cacheDir + "/";
            context.resourceManager.getRawFileContent("testvideo.mp4", (error, value) => {
                if (error == null) {
                    const obtainVideoBuffer = XtsReadFilesUtil.typedArrayToBuffer(value);
                    XtsReadFilesUtil.writeFile(path + "testvideo.mp4", obtainVideoBuffer);
                    context.resourceManager.getRawFileContent("testsound.wav", (error, value) => {
                        if (error == null) {
                            const obtainSoundBuffer = XtsReadFilesUtil.typedArrayToBuffer(value);
                            XtsReadFilesUtil.writeFile(path + "testsound.wav", obtainSoundBuffer);
                            context.resourceManager.getRawFileContent("mergewavList.txt", (error, value) => {
                                if (error == null) {
                                    const obtainMergeWavListBuffer = XtsReadFilesUtil.typedArrayToBuffer(value);
                                    XtsReadFilesUtil.writeFile(path + "mergewavList.txt", obtainMergeWavListBuffer);
                                    context.resourceManager.getRawFileContent("mergeList.txt", (error, value) => {
                                        const obtainMergeWavListBuffer = XtsReadFilesUtil.typedArrayToBuffer(value);
                                        XtsReadFilesUtil.writeFile(path + "mergeList.txt", obtainMergeWavListBuffer);
                                        done();
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        it('videoClip', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let sTime = "00:00:01";
            let eTime = "00:00:02";
            let sourceMP4 = getLocalDirPath + "testvideo.mp4";
            let outMP4 = getLocalDirPath + "clipout.mp4";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.videoClip(sTime, eTime, sourceMP4, outMP4, callBack);
        });
        it('videoMerge', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let filePathOne = getLocalDirPath + "testvideo.mp4";
            let filePathTwo = getLocalDirPath + "testvideo.mp4";
            let outMP4 = getLocalDirPath + "mergeout.mp4";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.videoMerge(filePathOne, filePathTwo, outMP4, callBack);
        });
        it('audioClip', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let sTime = "00:00:00";
            let eTime = "00:00:03";
            let sourcePath = getLocalDirPath + "testsound.wav";
            let outPath = getLocalDirPath + "clipout.wav";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.audioClip(sTime, eTime, sourcePath, outPath, callBack);
        });
        it('audioMerge', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let filePathOne = getLocalDirPath + "testsound.wav";
            let filePathTwo = getLocalDirPath + "testsound.wav";
            let outPath = getLocalDirPath + "mergeout.wav";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.audioMerge(filePathOne, filePathTwo, outPath, callBack);
        });
        it('getFrameAtTimeRang', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let sourceMP4 = getLocalDirPath + "testvideo.mp4";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    setDataSourceResultCode = code;
                    if (code == 0) {
                        let frameCallBack: IFrameCallBack = {
                            async callBackResult(data: ArrayBuffer, timeUs: number) {
                                expect(0).assertEqual(code);
                                done();
                            }
                        };
                        MP4Parser.getFrameAtTimeRang("1000000", "20000000", MP4Parser.OPTION_CLOSEST, frameCallBack);
                    }
                }
            };
            MP4Parser.setDataSource(sourceMP4, callBack);
        });
        it('ffmpegCmd', 0, (done: Function) => {
            let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = context.cacheDir + "/";
            let sTime = "00:00:01";
            let eTime = "00:00:02";
            let sourceMP4 = getLocalDirPath + "testvideo.mp4";
            let outMP4 = getLocalDirPath + "out.mp4";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.ffmpegCmd("ffmpeg -y -i " + sourceMP4 + " -ss " + sTime + " -c copy -to " + eTime + " " + outMP4, callBack);
        });
        it("mp4parser_videoMultMerge", 0, (done: Function) => {
            let contt = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = contt.cacheDir + "/";
            let filePath = getLocalDirPath + "mergeList.txt";
            let outMP4 = getLocalDirPath + "mergeout3.mp4";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    hilog.info(0x0000, "mp4xts", "videoMultMerge code : " + code);
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.videoMultMerge(filePath, outMP4, callBack);
        });
        it("mp4parser_audioMultMerge", 0, (done: Function) => {
            let contt = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext();
            let getLocalDirPath = contt.cacheDir + "/";
            let filePath = getLocalDirPath + "mergewavList.txt";
            let outPath = getLocalDirPath + "mergeout3.wav";
            let callBack: ICallBack = {
                callBackResult(code: number) {
                    hilog.info(0x0000, "mp4xts", "audioMultMerge code : " + code);
                    expect(0).assertEqual(code);
                    done();
                }
            };
            MP4Parser.audioMultMerge(filePath, outPath, callBack);
        });
        it("mp4parser_setDataSource", 0, () => {
            hilog.info(0x0000, "mp4xts", "setDataSourceResultCode  : " + setDataSourceResultCode);
            expect(0).assertEqual(setDataSourceResultCode);
        });
        it("mp4parser_stopGetFrame", 0, () => {
            let stopFlag: boolean = false;
            if (setDataSourceResultCode == 0) {
                MP4Parser.stopGetFrame();
                stopFlag = true;
            }
            expect(stopFlag).assertTrue();
        });
    });
}
