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
import Metadata from '../Metadata';
import QuickTimeContext from './QuickTimeContext';
import QuickTimeDirectory from './QuickTimeDirectory';
import QuickTimeDirectoryHandler from './metadata/QuickTimeDirectoryHandler';
import QuickTimeHandler from '../../imaging/quicktime/QuickTimeHandler';
class QuickTimeHandlerFactory {
    private static readonly HANDLER_METADATA_DIRECTORY: string = "mdir";
    private static readonly HANDLER_METADATA_DATA: string = "mdta";
    private static readonly HANDLER_SOUND_MEDIA: string = "soun";
    private static readonly HANDLER_VIDEO_MEDIA: string = "vide";
    private static readonly HANDLER_TIMECODE_MEDIA: string = "tmcd";
    private static readonly HANDLER_TEXT_MEDIA: string = "text";
    private static readonly HANDLER_SUBTITLE_MEDIA: string = "sbtl";
    private static readonly HANDLER_MUSIC_MEDIA: string = "musi";
    private caller: QuickTimeHandler<QuickTimeDirectory>;
    public constructor(caller: QuickTimeHandler<QuickTimeDirectory>) {
        this.caller = caller;
    }
    public getHandler(type: string, metadata: Metadata, context: QuickTimeContext): QuickTimeHandler<QuickTimeDirectory> {
        if (type == QuickTimeHandlerFactory.HANDLER_METADATA_DIRECTORY) {
            return new QuickTimeDirectoryHandler(metadata);
        }
        return this.caller;
    }
}
export default QuickTimeHandlerFactory;
