/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
class PngChromaticities {
    private readonly _whitePointX: number;
    private readonly _whitePointY: number;
    private readonly _redX: number;
    private readonly _redY: number;
    private readonly _greenX: number;
    private readonly _greenY: number;
    private readonly _blueX: number;
    private readonly _blueY: number;
    public constructor(bytes: Int8Array) {
        if (bytes.length != 8 * 4) {
            throw new Error("Invalid number of bytes");
        }
        let reader: SequentialByteArrayReader = new SequentialByteArrayReader(bytes);
        try {
            this._whitePointX = reader.getInt32();
            this._whitePointY = reader.getInt32();
            this._redX = reader.getInt32();
            this._redY = reader.getInt32();
            this._greenX = reader.getInt32();
            this._greenY = reader.getInt32();
            this._blueX = reader.getInt32();
            this._blueY = reader.getInt32();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    public getWhitePointX(): number {
        return this._whitePointX;
    }
    public getWhitePointY(): number {
        return this._whitePointY;
    }
    public getRedX(): number {
        return this._redX;
    }
    public getRedY(): number {
        return this._redY;
    }
    public getGreenX(): number {
        return this._greenX;
    }
    public getGreenY(): number {
        return this._greenY;
    }
    public getBlueX(): number {
        return this._blueX;
    }
    public getBlueY(): number {
        return this._blueY;
    }
}
export default PngChromaticities;
