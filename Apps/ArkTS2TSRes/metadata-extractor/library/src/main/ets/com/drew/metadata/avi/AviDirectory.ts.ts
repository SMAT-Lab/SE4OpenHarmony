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
import AviDescriptor from './AviDescriptor';
import Directory from '../Directory';
class AviDirectory extends Directory {
    public static readonly TAG_FRAMES_PER_SECOND: number = 1;
    public static readonly TAG_SAMPLES_PER_SECOND: number = 2;
    public static readonly TAG_DURATION: number = 3;
    public static readonly TAG_VIDEO_CODEC: number = 4;
    public static readonly TAG_AUDIO_CODEC: number = 5;
    public static readonly TAG_WIDTH: number = 6;
    public static readonly TAG_HEIGHT: number = 7;
    public static readonly TAG_STREAMS: number = 8;
    public static readonly TAG_DATETIME_ORIGINAL: number = 320;
    public static readonly CHUNK_STREAM_HEADER: string = "strh";
    public static readonly CHUNK_MAIN_HEADER: string = "avih";
    public static readonly CHUNK_DATETIME_ORIGINAL: string = "IDIT";
    public static readonly LIST_HEADER: string = "hdrl";
    public static readonly LIST_STREAM_HEADER: string = "strl";
    public static readonly FORMAT: string = "AVI ";
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [AviDirectory.TAG_FRAMES_PER_SECOND, 'Frames Per Second'],
        [AviDirectory.TAG_SAMPLES_PER_SECOND, 'Samples Per Second'],
        [AviDirectory.TAG_DURATION, 'Duration'],
        [AviDirectory.TAG_VIDEO_CODEC, 'Video Codec'],
        [AviDirectory.TAG_AUDIO_CODEC, 'Audio Codec'],
        [AviDirectory.TAG_WIDTH, 'Width'],
        [AviDirectory.TAG_HEIGHT, 'Height'],
        [AviDirectory.TAG_STREAMS, 'Stream Count'],
        [AviDirectory.TAG_DATETIME_ORIGINAL, 'Date/Time Original']
    ]);
    public constructor() {
        super();
        this.setDescriptor(new AviDescriptor(this));
    }
    public getName(): string {
        return AviDirectory.FORMAT;
    }
    protected getTagNameMap(): Map<number, string> {
        return AviDirectory._tagNameMap;
    }
}
export default AviDirectory;
