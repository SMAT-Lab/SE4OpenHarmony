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
import Directory from '../Directory';
import AdobeJpegDescriptor from './AdobeJpegDescriptor';
export default class AdobeJpegDirectory extends Directory {
    public static readonly TAG_DCT_ENCODE_VERSION: number = 0;
    /**
     * The convention for TAG_APP14_FLAGS0 and TAG_APP14_FLAGS1 is that 0 bits are benign.
     * 1 bits in TAG_APP14_FLAGS0 pass information that is possibly useful but not essential for decoding.
     * <p>
     * 0x8000 bit: Encoder used Blend=1 downsampling
     */
    public static readonly TAG_APP14_FLAGS0: number = 1;
    /**
     * The convention for TAG_APP14_FLAGS0 and TAG_APP14_FLAGS1 is that 0 bits are benign.
     * 1 bits in TAG_APP14_FLAGS1 pass information essential for decoding. DCTDecode could reject a compressed
     * image, if there are 1 bits in TAG_APP14_FLAGS1 or color transform codes that it cannot interpret.
     */
    public static readonly TAG_APP14_FLAGS1: number = 2;
    public static readonly TAG_COLOR_TRANSFORM: number = 3;
    private static readonly _tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        AdobeJpegDirectory._tagNameMap.set(AdobeJpegDirectory.TAG_DCT_ENCODE_VERSION, "DCT Encode Version");
        AdobeJpegDirectory._tagNameMap.set(AdobeJpegDirectory.TAG_APP14_FLAGS0, "Flags 0");
        AdobeJpegDirectory._tagNameMap.set(AdobeJpegDirectory.TAG_APP14_FLAGS1, "Flags 1");
        AdobeJpegDirectory._tagNameMap.set(AdobeJpegDirectory.TAG_COLOR_TRANSFORM, "Color Transform");
        this.setDescriptor(new AdobeJpegDescriptor(this));
    }
    public getName(): string {
        return "Adobe JPEG";
    }
    protected getTagNameMap(): Map<number, string> {
        return AdobeJpegDirectory._tagNameMap;
    }
}
