let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { describe, expect, it } from '@ohos/hypium';
import { Base64, BinaryPropertyListParser, NSArray, NSData, NSDictionary, NSNumber, NSSet, NSString, PropertyListParser, UID, XMLPropertyListParser, NSObject, ArrayUtils } from '@ohos/dd-plist';
import fs from '@ohos.file.fs';
import util from '@ohos.util';
import resmgr from '@ohos.resourceManager';
import { GlobalContext } from './GlobalContext';
export default function abilityTest() {
    let loadFile: (id: number) => Promise<Uint8Array> = (id: number): Promise<Uint8Array> => {
        return new Promise((resolve, reject) => {
            let resourceManager = GlobalContext.getContext()
                .getValue("resManager") as resmgr.ResourceManager;
            resourceManager.getMediaContent(id)
                .then((value: any) => {
                resolve(value);
            }).catch((error: any) => {
                reject(JSON.stringify(error));
                console.log("getMediaContent promise error is " + error);
            });
        });
    };
    describe('dd_plistTest', () => {
        it("parseXMLPlistByBytes", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                    if (obj instanceof NSDictionary) {
                        let nsd: NSDictionary = obj;
                        let parsePlistKeys = nsd.allKeys();
                        expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseXMLPlistByPath", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.write(fd.fd, value.buffer).then((number) => {
                    PropertyListParser.parse(GlobalContext.getContext()
                        .getValue("filesPath") + '/' + "test.plist", (obj: NSObject) => {
                        if (obj instanceof NSDictionary) {
                            let nsd: NSDictionary = obj;
                            let parsePlistKeys = nsd.allKeys();
                            expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                        }
                        else {
                            expect().assertFail();
                        }
                    });
                }).catch((err: any) => {
                    expect().assertFail();
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseByPath", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.write(fd.fd, value.buffer).then((number) => {
                    PropertyListParser.parseByPath(GlobalContext.getContext()
                        .getValue("filesPath") + '/' + "test.plist", (obj: NSObject) => {
                        if (obj instanceof NSDictionary) {
                            let nsd: NSDictionary = obj;
                            let parsePlistKeys = nsd.allKeys();
                            expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                        }
                        else {
                            expect().assertFail();
                        }
                    });
                }).catch((err: any) => {
                    expect().assertFail();
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseByFile", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.write(fd.fd, value.buffer).then((number) => {
                    PropertyListParser.parseByFile(fd, (obj: NSObject) => {
                        if (obj instanceof NSDictionary) {
                            let nsd: NSDictionary = obj;
                            let parsePlistKeys = nsd.allKeys();
                            expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                        }
                        else {
                            expect().assertFail();
                        }
                    });
                }).catch((err: any) => {
                    expect().assertFail();
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseXMLArrayPlistByBytes", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlArrayForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                    if (obj instanceof NSArray) {
                        let nsa: NSArray = obj;
                        let arr = nsa.getArray();
                        let expectArr = [0, 8];
                        for (let i = 0; i < arr.length; i++) {
                            let value: NSNumber = arr[i] as NSNumber;
                            expect(expectArr[i]).assertEqual(value.getLongValue());
                        }
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseXMLArrayPlistByPath", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlArrayForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.writeSync(fd.fd, value.buffer);
                PropertyListParser.parse(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", (obj: NSObject) => {
                    if (obj instanceof NSArray) {
                        let nsa: NSArray = obj;
                        let arr = nsa.getArray();
                        let expectArr = [0, 8];
                        for (let i = 0; i < arr.length; i++) {
                            let value: NSNumber = arr[i] as NSNumber;
                            expect(expectArr[i]).assertEqual(value.getLongValue());
                        }
                        expect(true).assertTrue();
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseASCIIPlistByBytes", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                PropertyListParser.parseByInt8Array(arr, (obj: NSObject) => {
                    if (obj instanceof NSDictionary) {
                        let root: NSDictionary = obj as NSDictionary;
                        let date = root.get("date") as NSString;
                        expect("2011-11-28T09:21:30Z").assertEqual(date.getContent());
                        let nsA = root.get("array") as NSArray;
                        let num = nsA.objectAtIndex(2) as NSNumber;
                        expect(87).assertEqual(num.getIntValue());
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseASCIIPlistByPath", 0, async () => {
            try {
                let value = await loadFile($r('app.media.asciiForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                let bytes = await loadFile($r('app.media.ASCIIStr').id);
                const decoder = util.TextDecoder.create('utf-8');
                const expectResult = decoder.decodeWithStream(bytes);
                fs.writeSync(fd.fd, value.buffer);
                PropertyListParser.parse(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", (obj: NSObject) => {
                    if (obj instanceof NSDictionary) {
                        let root: NSDictionary = obj as NSDictionary;
                        expect(expectResult).assertEqual(root.toXMLPropertyList());
                    }
                    else {
                        expect().assertFail();
                        expect(true).assertTrue();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseBinaryPlistByBytes", 0, async () => {
            try {
                let value = await loadFile($r('app.media.binaryForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                    if (obj instanceof NSNumber) {
                        let root: NSNumber = obj as NSNumber;
                        let expectResult = 1.5074563126e-36;
                        expect(expectResult).assertEqual(root.getDoubleValue());
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("parseBinaryPlistByPath", 0, async () => {
            try {
                let value = await loadFile($r('app.media.binaryForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.writeSync(fd.fd, value.buffer);
                PropertyListParser.parseByPath(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", (obj: NSObject) => {
                    if (obj instanceof NSNumber) {
                        let root: NSNumber = obj as NSNumber;
                        let expectResult = 1.5074563126e-36;
                        expect(expectResult).assertEqual(root.getDoubleValue());
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("saveAsXMLToFilePath", 0, async () => {
            let nsObj = new NSDictionary();
            let nsArr = new NSArray(2);
            nsArr.setValue(0, "zhangsan");
            nsArr.setValue(1, "lisi");
            nsObj.put("class1", nsArr);
            let path = GlobalContext.getContext().getValue("filesPath") + '/' + "test1.plist";
            let file = fs.openSync(path, 0o100 | 0o2);
            PropertyListParser.saveAsXMLByFile(nsObj, file);
            PropertyListParser.parse(path, (obj: NSObject) => {
                if (obj instanceof NSDictionary) {
                    let nsd: NSDictionary = obj;
                    let nsarr: NSArray = nsd.get("class1") as NSArray;
                    let nsStr1: NSString = nsarr.objectAtIndex(0) as NSString;
                    expect("zhangsan").assertEqual(nsStr1.getContent());
                    let nsStr2: NSString = nsarr.objectAtIndex(1) as NSString;
                    expect("lisi").assertEqual(nsStr2.getContent());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("saveAsXMLByStream", 0, async () => {
            let nsObj = new NSDictionary();
            let nsArr = new NSArray(2);
            nsArr.setValue(0, "zhangsan");
            nsArr.setValue(1, "lisi");
            nsObj.put("class1", nsArr);
            let path = GlobalContext.getContext().getValue("filesPath") + "/test1.plist";
            PropertyListParser.saveAsXMLByStream(nsObj, path);
            PropertyListParser.parse(path, (obj: NSObject) => {
                if (obj instanceof NSDictionary) {
                    let nsd: NSDictionary = obj;
                    let nsarr: NSArray = nsd.get("class1") as NSArray;
                    let nsStr1: NSString = nsarr.objectAtIndex(0) as NSString;
                    expect("zhangsan").assertEqual(nsStr1.getContent());
                    let nsStr2: NSString = nsarr.objectAtIndex(1) as NSString;
                    expect("lisi").assertEqual(nsStr2.getContent());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("saveAsXMLToStream", 0, async () => {
            let nsObj = new NSDictionary();
            let nsArr = new NSArray(2);
            nsArr.setValue(0, "zhangsan");
            nsArr.setValue(1, "lisi");
            nsObj.put("class1", nsArr);
            let path = GlobalContext.getContext().getValue("filesPath") + "/test1.plist";
            let stream = fs.createStreamSync(path, "w+");
            PropertyListParser.saveAsXMLToStream(nsObj, stream);
            let parser: XMLPropertyListParser = new XMLPropertyListParser();
            parser.parseByStream((obj: NSObject) => {
                if (obj instanceof NSDictionary) {
                    let nsd: NSDictionary = obj;
                    let nsarr: NSArray = nsd.get("class1") as NSArray;
                    let nsStr1: NSString = nsarr.objectAtIndex(0) as NSString;
                    expect("zhangsan").assertEqual(nsStr1.getContent());
                    let nsStr2: NSString = nsarr.objectAtIndex(1) as NSString;
                    expect("lisi").assertEqual(nsStr2.getContent());
                }
                else {
                    expect().assertFail();
                }
            }, stream);
        });
        it("convertToXml", 0, async () => {
            let value = await loadFile($r('app.media.binaryForParse').id);
            let pathIn = GlobalContext.getContext().getValue("filesPath") + '/' + "test2.plist";
            let file = fs.openSync(pathIn, 0o100 | 0o2);
            fs.writeSync(file.fd, value.buffer);
            fs.closeSync(file);
            let pathOut = GlobalContext.getContext().getValue("filesPath") + '/' + "testOut.plist";
            let fileOut = fs.openSync(pathOut, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
            let fileIn = fs.openSync(pathIn, fs.OpenMode.READ_WRITE);
            PropertyListParser.convertToXmlByFile(fileIn, fileOut);
            PropertyListParser.parse(pathOut, (obj: NSObject) => {
                if (obj instanceof NSNumber) {
                    let nsd: NSNumber = obj;
                    expect(1).assertEqual(nsd.getDoubleValue());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("parseByBytes", 0, async () => {
            let value = await loadFile($r('app.media.binaryForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            let obj: NSObject = BinaryPropertyListParser.parseByBytes(arr);
            if (obj instanceof NSNumber) {
                let root: NSNumber = obj as NSNumber;
                let expectResult = 1.5074563126e-36;
                expect(expectResult).assertEqual(root.getDoubleValue());
            }
            else {
                expect().assertFail();
            }
        });
        it("parseByBytesError", 0, async () => {
            let value = await loadFile($r('app.media.asciiForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            try {
                BinaryPropertyListParser.parseByBytes(arr);
                expect().assertFail();
            }
            catch (e) {
                expect(true).assertTrue();
            }
        });
        it("copyOfRange", 0, async () => {
            let value = await loadFile($r('app.media.binaryForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            let resultArray = BinaryPropertyListParser.copyOfRange(arr, 5, 10);
            expect(116).assertEqual(resultArray[0]);
            expect(64).assertEqual(resultArray[4]);
        });
        it("copyOfRangeNull", 0, async () => {
            try {
                BinaryPropertyListParser.copyOfRange(null, 5, 10);
                expect().assertFail();
            }
            catch (e) {
                expect(true).assertTrue();
            }
        });
        it("copyOfRangeNullUndefined", 0, async () => {
            try {
                BinaryPropertyListParser.copyOfRange(undefined, 5, 10);
                expect().assertFail();
            }
            catch (e) {
                expect(true).assertTrue();
            }
        });
        it("objectAtIndex", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlArrayForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                    if (obj instanceof NSArray) {
                        let nsa: NSArray = obj;
                        let value: NSNumber = nsa.objectAtIndex(1) as NSNumber;
                        expect(8).assertEqual(value.getLongValue());
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("objectAtIndexOutOfRange", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let value: NSNumber = nsa.objectAtIndex(-1) as NSNumber;
                    expect(value).assertUndefined();
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArrayRemove", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    expect(2).assertEqual(nsa.count());
                    nsa.remove(0);
                    expect(1).assertEqual(nsa.count());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArrayRemoveOutOfRange", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    expect(2).assertEqual(nsa.count());
                    nsa.remove(2);
                    expect().assertFail();
                }
                else {
                    expect(true).assertTrue();
                }
            });
        });
        it("nsArraySetValue", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let arr = nsa.getArray();
                    let value: NSNumber = arr[1] as NSNumber;
                    expect(8).assertEqual(value.getLongValue());
                    nsa.setValue(1, 7);
                    let value1: NSNumber = arr[1] as NSNumber;
                    expect(7).assertEqual(value1.getLongValue());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArraySetValueAdd", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let arr = nsa.getArray();
                    expect(2).assertEqual(nsa.count());
                    nsa.setValue(2, 7);
                    let value1: NSNumber = arr[2] as NSNumber;
                    expect(3).assertEqual(nsa.count());
                    expect(7).assertEqual(value1.getLongValue());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArraySetValueAddStr", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let arr = nsa.getArray();
                    expect(2).assertEqual(nsa.count());
                    nsa.setValue(2, "hello");
                    let value1: NSString = arr[2] as NSString;
                    expect(3).assertEqual(nsa.count());
                    expect("hello").assertEqual(value1.getContent());
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArraySetValueAddUndefined", 0, async () => {
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let arr = nsa.getArray();
                    expect(2).assertEqual(nsa.count());
                    nsa.setValue(2, undefined);
                    let value1: NSString = arr[2] as NSString;
                    expect(3).assertEqual(nsa.count());
                    expect(value1.getContent()).assertUndefined();
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nsArrayContainsObject", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = "hello";
            strArr[1] = "world";
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.containsObject("hello")).assertTrue();
        });
        it("nsArrayContainsObjectNum", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.containsObject(3)).assertTrue();
        });
        it("nsArrayIndexOfObject", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.indexOfObject(3)).assertEqual(1);
        });
        it("nsArrayIndexOfObjectFalse", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.indexOfObject(7)).assertEqual(-1);
        });
        it("nsArrayIndexOfIdenticalObject", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.indexOfIdenticalObject(nsArr.getArray()[1])).assertEqual(1);
        });
        it("nsArrayIndexOfIdenticalObjectFalse", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.indexOfIdenticalObject(7)).assertEqual(-1);
        });
        it("nsArrayObjectsAtIndexesSingle", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let actualNSNumber = nsArr.getArray()[0] as NSNumber;
            let expectNSNumber = nsArr.objectsAtIndexes([0])[0] as NSNumber;
            expect(expectNSNumber.getLongValue()).assertEqual(actualNSNumber.getLongValue());
        });
        it("nsArrayObjectsAtIndexesOutOfRange", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(nsArr.objectsAtIndexes([-1])[0]).assertUndefined();
        });
        it("nsArrayObjectsAtIndexesMore", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let actualNSNumber1 = nsArr.getArray()[0] as NSNumber;
            let ns = nsArr.objectsAtIndexes([0, 1]);
            let expectNSNumber1 = ns[0] as NSNumber;
            expect(expectNSNumber1.getLongValue()).assertEqual(actualNSNumber1.getLongValue());
            let actualNSNumber2 = nsArr.getArray()[1] as NSNumber;
            let expectNSNumber2 = ns[1] as NSNumber;
            expect(expectNSNumber2.getLongValue()).assertEqual(actualNSNumber2.getLongValue());
        });
        it("nsDataGetBytes", 0, async () => {
            let object: Array<number> = new Array(2);
            object[0] = 8;
            object[1] = 6;
            let size: number = object.length;
            let array: Int8Array = new Int8Array(object.length);
            for (let i = 0; i < size; i++) {
                array[i] = object[i];
            }
            let data: NSData = new NSData(array);
            expect(data.getBytes()).assertEqual(array);
        });
        it("nsDataLength", 0, async () => {
            let object: Array<number> = new Array(2);
            object[0] = 8;
            object[1] = 6;
            let size: number = object.length;
            let array: Int8Array = new Int8Array(object.length);
            for (let i = 0; i < size; i++) {
                array[i] = object[i];
            }
            let data: NSData = new NSData(array);
            expect(data.length()).assertEqual(2);
        });
        it("nsDataGetBase64EncodedData", 0, async () => {
            let object: Array<number> = new Array(2);
            object[0] = 8;
            object[1] = 6;
            let size: number = object.length;
            let array: Int8Array = new Int8Array(object.length);
            for (let i = 0; i < size; i++) {
                array[i] = object[i];
            }
            let data: NSData = new NSData(array);
            let encode = data.getBase64EncodedData();
            expect(encode).assertEqual("CAY=");
            expect(JSON.stringify(Base64.decodeByString(encode))).assertEqual(JSON.stringify(array));
        });
        it("nSDictionaryGetHashMap", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.getHashMap().get("name")).assertEqual(nsArr);
        });
        it("nSDictionaryGetHashMapUndefined", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            root.put("name", undefined);
            expect(root.getHashMap().get("name")).assertUndefined();
        });
        it("nSDictionaryPut", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.getHashMap().get("name")).assertEqual(nsArr);
        });
        it("nSDictionaryPutUndefined", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            root.put("name", undefined);
            expect(root.getHashMap().get("name")).assertUndefined();
        });
        it("nSDictionaryObjectForKey", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.objectForKey("name")).assertEqual(nsArr);
        });
        it("nSDictionaryObjectForKeyNot", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.objectForKey("test")).assertUndefined();
        });
        it("nSDictionaryContainsValue", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.containsValue(nsArr)).assertTrue();
        });
        it("nSDictionaryContainsValueFalse", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            let strArr1: Array<any> = new Array(2);
            strArr[0] = 7;
            strArr[1] = 3;
            let nsArr1: NSArray = PropertyListParser.fromJavaObject(strArr1) as NSArray;
            expect(root.containsValue(nsArr1)).assertFalse();
        });
        it("nSDictionaryContainsKey", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.containsKey("name")).assertTrue();
        });
        it("nSDictionaryContainsKeyFalse", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.containsKey("test")).assertFalse();
        });
        it("nSDictionaryGet", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.get("name")).assertEqual(nsArr);
        });
        it("nSDictionaryGetFalse", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.get("test")).assertUndefined();
        });
        it("nSDictionaryGetSize", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.getSize()).assertEqual(1);
        });
        it("nSDictionaryGetSizeEmpty", 0, async () => {
            let root: NSDictionary = new NSDictionary();
            expect(root.getSize()).assertEqual(0);
            let strArr: Array<any> = new Array(2);
            strArr[0] = 8;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            root.put("name", nsArr);
            expect(root.getSize()).assertEqual(1);
        });
        it("nSNumberGetTypeBoolean", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber.getType()).assertEqual(2);
        });
        it("nSNumberGetTypeInt", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber1 = nsArr.getArray()[1] as NSNumber;
            expect(nsNumber1.getType()).assertEqual(0);
        });
        it("nSNumberIsBoolean", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber.isBoolean()).assertTrue();
        });
        it("nSNumberIsBooleanFalse", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber1 = nsArr.getArray()[1] as NSNumber;
            expect(nsNumber1.isBoolean()).assertFalse();
        });
        it("nSNumberIsInteger", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber = nsArr.getArray()[1] as NSNumber;
            expect(nsNumber.isInteger()).assertTrue();
        });
        it("nSNumberIsIntegerFalse", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber1 = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber1.isInteger()).assertFalse();
        });
        it("nSNumberGetBoolValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber.getBoolValue()).assertTrue();
        });
        it("nSNumberGetBoolValueFalse", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = false;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber1 = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber1.getBoolValue()).assertFalse();
        });
        it("nSNumberGetIntValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber = nsArr.getArray()[1] as NSNumber;
            expect(nsNumber.getIntValue()).assertEqual(3);
        });
        it("nSNumberClone", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let nsNumber1 = nsArr.getArray()[0] as NSNumber;
            expect(nsNumber1.clone()).assertDeepEquals(nsNumber1);
        });
        it("nSSetAddObject", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.containsObject(nsArr)).assertTrue();
        });
        it("nSSetAddObjectString", 0, async () => {
            let set: NSSet = new NSSet(true);
            let value = await loadFile($r('app.media.xmlArrayForParse').id);
            let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
            PropertyListParser.parseByBytes(arr, (obj: NSObject) => {
                if (obj instanceof NSArray) {
                    let nsa: NSArray = obj;
                    let arr = nsa.getArray();
                    nsa.setValue(2, "hello");
                    let value1: NSString = arr[2] as NSString;
                    set.addObject(value1);
                    expect(set.containsObject(value1)).assertTrue();
                }
                else {
                    expect().assertFail();
                }
            });
        });
        it("nSSetRemoveObject", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.containsObject(nsArr)).assertTrue();
            set.removeObject(nsArr);
            expect(set.containsObject(nsArr)).assertFalse();
        });
        it("nSSetRemoveObjectNull", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.containsObject(nsArr)).assertTrue();
            set.removeObject(null);
            expect(set.containsObject(nsArr)).assertTrue();
        });
        it("nSSetRemoveObjectNotExist", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.containsObject(nsArr)).assertTrue();
            let nsArr1: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.removeObject(nsArr1);
            expect(set.containsObject(nsArr)).assertTrue();
        });
        it("nSSetContainsObject", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.containsObject(nsArr)).assertTrue();
        });
        it("nSSetContainsObjectFalse", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            let nsArr1: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(set.containsObject(nsArr1)).assertFalse();
        });
        it("nSSetMember", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.member(nsArr)).assertEqual(nsArr);
        });
        it("nSSetMemberNull", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            let nsArr1: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            expect(set.member(nsArr1)).assertNull();
        });
        it("nSSetClone", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.clone()).assertDeepEquals(set);
        });
        it("nSSetCount", 0, async () => {
            let set: NSSet = new NSSet(true);
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            set.addObject(nsArr);
            expect(set.count()).assertEqual(1);
        });
        it("nSSetCountEmpty", 0, async () => {
            let set: NSSet = new NSSet(true);
            expect(set.count()).assertEqual(0);
        });
        it("nSStringIntValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "30");
            let nss: NSString = arr[2] as NSString;
            expect(nss.intValue()).assertEqual(30);
        });
        it("nSStringIntValueNegative", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "-1");
            let nss: NSString = arr[2] as NSString;
            expect(nss.intValue()).assertEqual(5.00E-324);
        });
        it("nSStringFloatValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "30.08");
            let nss: NSString = arr[2] as NSString;
            expect(nss.floatValue()).assertEqual(30.08);
        });
        it("nSStringFloatValueNegative", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "-1.08");
            let nss: NSString = arr[2] as NSString;
            expect(nss.floatValue()).assertEqual(-1.08);
        });
        it("nSStringDoubleValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "30.08");
            let nss: NSString = arr[2] as NSString;
            expect(nss.doubleValue()).assertEqual(30.08);
        });
        it("nSStringDoubleValueNegative", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            nsArr.setValue(2, "-1.08");
            let nss: NSString = arr[2] as NSString;
            expect(nss.doubleValue()).assertEqual(-1.08);
        });
        it("nSStringBooleanValuefALSE", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "false");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.boolValue()).assertFalse();
        });
        it("nSStringBooleanValueYES", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "YES");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.boolValue()).assertTrue();
        });
        it("nSStringBooleanValueNo", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "no");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.boolValue()).assertFalse();
        });
        it("nSStringBooleanValueZero", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "0");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.boolValue()).assertFalse();
        });
        it("nSStringBooleanValue", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "true");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.boolValue()).assertTrue();
        });
        it("nSStringGetContentBool", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "true");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.getContent()).assertEqual("true");
        });
        it("nSStringGetContentNum", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "30");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.getContent()).assertEqual("30");
        });
        it("nSStringGetContentStr", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "hello");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            expect(nss.getContent()).assertEqual("hello");
        });
        it("nSStringAppend", 0, async () => {
            let strArr: Array<any> = new Array(3);
            strArr[0] = true;
            strArr[1] = 3;
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            nsArr.setValue(2, "hello");
            nsArr.setValue(3, " world");
            let arr = nsArr.getArray();
            let nss: NSString = arr[2] as NSString;
            let nss1: NSString = arr[3] as NSString;
            nss.append(nss1);
            expect(nss.getContent()).assertEqual("hello world");
        });
        it("nSStringPrepend", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = "hello";
            strArr[1] = "world";
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            let nss: NSString = arr[0] as NSString;
            let nss1: NSString = arr[1] as NSString;
            nss.prepend(nss1);
            expect(nss.getContent()).assertEqual("worldhello");
        });
        it("nSStringSetContent", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = "hello";
            strArr[1] = "world";
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            let nss: NSString = arr[0] as NSString;
            let nss1: NSString = arr[1] as NSString;
            nss.prepend(nss1);
            nss.setContent("hello china");
            expect(nss.getContent()).assertEqual("hello china");
        });
        it("UIDgetBytes", 0, async () => {
            let string = "12345";
            let int8Array = new Int8Array(string.split('').map(Number));
            let uid: UID = new UID("id", int8Array);
            expect(uid.getBytes()).assertEqual(int8Array);
        });
        it("UIDgetName", 0, async () => {
            let string = "12345";
            let int8Array = new Int8Array(string.split('').map(Number));
            let uid: UID = new UID("id", int8Array);
            expect(uid.getName()).assertEqual("id");
        });
        it("XMLPropertyListParserParse", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let fd = fs.openSync(GlobalContext.getContext()
                    .getValue("filesPath") + '/' + "test.plist", 0o100 | 0o2);
                fs.write(fd.fd, value.buffer).then((number) => {
                    let parser: XMLPropertyListParser = new XMLPropertyListParser();
                    parser.parse((obj: NSObject) => {
                        if (obj instanceof NSDictionary) {
                            let nsd: NSDictionary = obj;
                            let parsePlistKeys = nsd.allKeys();
                            expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                        }
                        else {
                            expect().assertFail();
                        }
                    }, GlobalContext.getContext().getValue("filesPath") + '/' + "test.plist");
                }).catch((err: any) => {
                    expect().assertFail();
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("XMLPropertyListParserParseByBytes", 0, async () => {
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(value);
                let parser: XMLPropertyListParser = new XMLPropertyListParser();
                parser.parseByBytes(arr, (result: NSObject) => {
                    if (result instanceof NSDictionary) {
                        let nsd: NSDictionary = result;
                        let parsePlistKeys = nsd.allKeys();
                        expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                    }
                    else {
                        expect().assertFail();
                    }
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("PropertyListParserParseByStream", 0, async () => {
            let path = GlobalContext.getContext().getValue("filesPath") + '/' + "test3.plist";
            try {
                let value = await loadFile($r('app.media.xmlForParse').id);
                let fd = fs.openSync(path, 0o100 | 0o2);
                fs.write(fd.fd, value.buffer).then((number) => {
                    let stream = fs.createStreamSync(path, "w+");
                    PropertyListParser.parseByStream(stream, (obj: NSObject) => {
                        if (obj instanceof NSDictionary) {
                            let nsd: NSDictionary = obj;
                            let parsePlistKeys = nsd.allKeys();
                            expect((parsePlistKeys.indexOf("files2") != -1)).assertTrue();
                        }
                        else {
                            expect().assertFail();
                        }
                    });
                }).catch((err: any) => {
                    expect().assertFail();
                });
            }
            catch (e) {
                expect().assertFail();
            }
        });
        it("XMLPropertyListParserParseByStream", 0, async () => {
            let nsObj = new NSDictionary();
            let nsArr = new NSArray(2);
            nsArr.setValue(0, "zhangsan");
            nsArr.setValue(1, "lisi");
            nsObj.put("class1", nsArr);
            let path = GlobalContext.getContext().getValue("filesPath") + "/test1.plist";
            let stream = fs.createStreamSync(path, "w");
            if (!!stream) {
                return;
            }
            let parser: XMLPropertyListParser = new XMLPropertyListParser();
            parser.parseByStream((obj: NSObject) => {
                if (obj instanceof NSDictionary) {
                    let nsd: NSDictionary = obj;
                    let nsarr: NSArray = nsd.get("class1") as NSArray;
                    let nsStr1: NSString = nsarr.objectAtIndex(0) as NSString;
                    expect("zhangsan").assertEqual(nsStr1.getContent());
                    let nsStr2: NSString = nsarr.objectAtIndex(1) as NSString;
                    expect("lisi").assertEqual(nsStr2.getContent());
                }
                else {
                    expect().assertFail();
                }
            }, stream);
        });
        it("NSArrayGetArray", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = "hello";
            strArr[1] = "world";
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            expect(arr.length).assertEqual(2);
            let nss: NSString = arr[0] as NSString;
            expect(nss.getContent()).assertEqual("hello");
            let nss1: NSString = arr[1] as NSString;
            expect(nss1.getContent()).assertEqual("world");
        });
        it("NSArrayLastObject", 0, async () => {
            let strArr: Array<any> = new Array(2);
            strArr[0] = "hello";
            strArr[1] = "world";
            let nsArr: NSArray = PropertyListParser.fromJavaObject(strArr) as NSArray;
            let arr = nsArr.getArray();
            let nss1: NSString = arr[1] as NSString;
            expect(nsArr.lastObject()).assertDeepEquals(nss1);
        });
    });
}
