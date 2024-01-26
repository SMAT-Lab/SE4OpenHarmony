// @ts-nocheck
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { AbstractID3v2Tag } from './AbstractID3v2Tag';
import { ID3v22Tag } from './ID3v22Tag';
import { ID3v23Tag } from './ID3v23Tag';
import { ID3v24Tag } from './ID3v24Tag';
import { Mp3File } from './Mp3File';
export class ID3v2TagFactory {
    public static createTag(data: Int8Array): AbstractID3v2Tag {
        Mp3File.sanityCheckTag(data);
        let majorVersion = data[AbstractID3v2Tag.MAJOR_VERSION_OFFSET];
        switch (majorVersion) {
            case 2:
                return ID3v2TagFactory.createID3v22Tag(data);
            case 3:
                return new ID3v23Tag(data);
            case 4:
                return new ID3v24Tag(data);
        }
        throw new UnsupportedTagException("Tag version not supported");
    }
    private static createID3v22Tag(bytes: Int8Array): AbstractID3v2Tag {
        let tag: ID3v22Tag = new ID3v22Tag(bytes);
        if (tag.getFrameSets().size == 0) {
            tag = new ID3v22Tag(bytes, true);
        }
        return tag;
    }
}
