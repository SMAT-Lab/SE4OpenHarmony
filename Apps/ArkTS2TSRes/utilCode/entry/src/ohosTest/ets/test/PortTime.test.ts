let __generate__Id: number = 0;
function generateId(): string {
    return "PortTime.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect, TestType } from '@ohos/hypium';
import randomColor from 'randomcolor';
import { CountryUtils, TempUtils } from '@ohos/util_code';
import gcoord from 'gcoord';
import imtype from 'imtype';
import { get12, get24 } from 'time-ampm';
import isLeapYear from 'leap-year';
import cache from 'memory-cache';
import { Position } from 'gcoord';
import { GlobalContext } from './GlobalContext';
export default function PortTimeTest() {
    describe('PortTimeTest', () => {
        const BASE_COUNT = 2000; //循环次数，测试普通接口性能
        const BASELINE_HASSIMECASR = 300; //性能基线
        const TAG = "PortTimeTestTAG_";
        it('randomColorFormat_rgb', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                randomColor.randomColor();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "randomColorFormat_rgb endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "randomColorFormat_rgb averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('getCountryCodeByLanguage', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                CountryUtils.getCountryCodeByLanguage();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "getCountryCodeByLanguage endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "getCountryCodeByLanguage averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('getCountryCode', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                CountryUtils.getCountryCode("AL");
            }
            let endTime = new Date().getTime();
            console.info(TAG + "getCountryCode endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "getCountryCode averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('gcoordTransform', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                gcoord.transform<Position>([116.403988, 39.914266], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.BD09 // 目标坐标系
                );
            }
            let endTime = new Date().getTime();
            console.info(TAG + "gcoordTransform endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "gcoordTransform averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isJpg', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.resourceManager.getMediaContent($r("app.media.jpg").id)
                .then(data => {
                for (let index = 0; index < BASE_COUNT; index++) {
                    imtype.isJPG(new Uint8Array(data));
                }
            })
                .catch((err: Error) => {
                console.log('addFileToDisk err=' + err);
            });
            let endTime = new Date().getTime();
            console.info(TAG + "isJpg endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "isJpg averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isPNG', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.resourceManager.getMediaContent($r("app.media.png").id)
                .then(data => {
                for (let index = 0; index < BASE_COUNT; index++) {
                    imtype.isPNG(new Uint8Array(data));
                }
            })
                .catch((err: Error) => {
                console.log('addFileToDisk err=' + err);
            });
            let endTime = new Date().getTime();
            console.info(TAG + "isPNG endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "isPNG averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isGIF', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.resourceManager.getMediaContent($r("app.media.gif").id)
                .then(data => {
                for (let index = 0; index < BASE_COUNT; index++) {
                    imtype.isGIF(new Uint8Array(data));
                }
            })
                .catch((err: Error) => {
                console.log('addFileToDisk err=' + err);
            });
            let endTime = new Date().getTime();
            console.info(TAG + "isGIF endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "isGIF averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isBMP', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.resourceManager.getMediaContent($r("app.media.bmp").id)
                .then(data => {
                for (let index = 0; index < BASE_COUNT; index++) {
                    imtype.isBMP(new Uint8Array(data));
                }
            })
                .catch((err: Error) => {
                console.log('addFileToDisk err=' + err);
            });
            let endTime = new Date().getTime();
            console.info(TAG + "isBMP endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + +averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isTIF', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.resourceManager.getMediaContent($r("app.media.tif").id)
                .then(data => {
                for (let index = 0; index < BASE_COUNT; index++) {
                    imtype.isTIF(new Uint8Array(data));
                }
            })
                .catch((err: Error) => {
                console.log('addFileToDisk err=' + err);
            });
            let endTime = new Date().getTime();
            console.info(TAG + "isTIF endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "isTIF averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('F2C', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                TempUtils.F2C(89.6);
            }
            let endTime = new Date().getTime();
            console.info(TAG + "F2C endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "F2C averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('C2F', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                TempUtils.C2F(89.6);
            }
            let endTime = new Date().getTime();
            console.info(TAG + "C2F endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "C2F averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('get12', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                get12(0);
            }
            let endTime = new Date().getTime();
            console.info(TAG + "get12 endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "get12 averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('get24', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                get24('10 pm');
            }
            let endTime = new Date().getTime();
            console.info(TAG + "get24 endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info("get24 averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('isLeapYear', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                isLeapYear(2016);
            }
            let endTime = new Date().getTime();
            console.info(TAG + "isLeapYear endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "isLeapYear averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cachePut', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.put('foo', 'bar');
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cachePut endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cachePut averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheGet', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.get('foo');
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheGet endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheGet averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheDet', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.del('foo');
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheDet endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheDet averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheClear', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.clear();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheClear endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheClear averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheSize', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.size();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheSize endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheSize averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheMemsize', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.memsize();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheMemsize endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheMemsize averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheDebug', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.debug(true);
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheDebug endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheDebug averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheHits', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            cache.debug(true);
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.hits();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheHits endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheHits averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheMisses', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            cache.debug(true);
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.misses();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheMisses endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheMisses averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheKeys', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.keys();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheKeys endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheKeys averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheExportJson', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.exportJson();
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheExportJson endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheExportJson averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
        it('cacheImportJson', TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime(); //毫秒值
            for (let index = 0; index < BASE_COUNT; index++) {
                cache.importJson("{\"0\":{\"value\":\"测试数据\",\"expire\":\"NaN\"}}");
            }
            let endTime = new Date().getTime();
            console.info(TAG + "cacheImportJson endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT; //总时长*1000拿到微妙值，再去计算接口平均时长
            console.info(TAG + "cacheImportJson averageTime:" + averageTime + "µs");
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
            done();
        });
    });
}
