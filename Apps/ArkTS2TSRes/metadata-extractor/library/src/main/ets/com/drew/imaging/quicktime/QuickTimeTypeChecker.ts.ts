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
import FileType from '../FileType';
import StringValue from '../../metadata/StringValue';
import TypeChecker from '../TypeChecker';
class QuickTimeTypeChecker implements TypeChecker {
    private static readonly _ftypMap: Map<string, FileType> = new Map<string, FileType>([
        // http://www.ftyps.com
        // QuickTime Mov
        ["moov", FileType.QuickTime],
        ["wide", FileType.QuickTime],
        ["mdat", FileType.QuickTime],
        ["free", FileType.QuickTime],
        ["qt  ", FileType.QuickTime],
        ["3g2a", FileType.QuickTime],
        // MP4
        ["3gp5", FileType.Mp4],
        ["avc1", FileType.Mp4],
        ["iso2", FileType.Mp4],
        ["isom", FileType.Mp4],
        ["M4A ", FileType.Mp4],
        ["M4B ", FileType.Mp4],
        ["M4P ", FileType.Mp4],
        ["M4V ", FileType.Mp4],
        ["M4VH", FileType.Mp4],
        ["M4VP", FileType.Mp4],
        ["mmp4", FileType.Mp4],
        ["mp41", FileType.Mp4],
        ["mp42", FileType.Mp4],
        ["mp71", FileType.Mp4],
        ["MSNV", FileType.Mp4],
        ["NDAS", FileType.Mp4],
        ["NDSC", FileType.Mp4],
        ["NDSH", FileType.Mp4],
        ["NDSM", FileType.Mp4],
        ["NDSP", FileType.Mp4],
        ["NDSS", FileType.Mp4],
        ["NDXC", FileType.Mp4],
        ["NDXH", FileType.Mp4],
        ["NDXM", FileType.Mp4],
        ["NDXP", FileType.Mp4],
        ["NDXS", FileType.Mp4],
        ["nvr1", FileType.Mp4],
        // HEIF
        ["mif1", FileType.Heif],
        ["msf1", FileType.Heif],
        ["heic", FileType.Heif],
        ["heix", FileType.Heif],
        ["hevc", FileType.Heif],
        ["hevx", FileType.Heif],
        // CRX
        ["crx ", FileType.Crx]
    ]);
    public getByteCount(): number {
        return 12;
    }
    public checkType(bytes: Int8Array): FileType {
        // Test at offset 4 for Base Media Format (i.e. QuickTime, MP4, etc...) identifier "ftyp"
        // plus four identifying characters.
        if (bytes[4] == 102 && // f
            bytes[5] == 116 && // t
            bytes[6] == 121 && // y
            bytes[7] == 112) { // p
            let fourCC: string = StringValue.Int8Array2String(bytes, 'utf-8', 8, 8 + 4);
            let t: FileType = QuickTimeTypeChecker._ftypMap.get(fourCC);
            if (t != null)
                return t;
            return FileType.QuickTime;
        }
        return FileType.Unknown;
    }
}
export default QuickTimeTypeChecker;
