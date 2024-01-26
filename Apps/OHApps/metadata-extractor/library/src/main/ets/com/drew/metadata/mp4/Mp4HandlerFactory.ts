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

import Mp4Handler from '../../imaging/mp4/Mp4Handler'
import Metadata from '../Metadata'
import HandlerBox from './boxes/HandlerBox'
import Mp4Context from './Mp4Context'
import Mp4SoundHandler from './media/Mp4SoundHandler'
import Mp4VideoHandler from './media/Mp4VideoHandler'
import Mp4TextHandler from './media/Mp4TextHandler'
import Mp4HintHandler from './media/Mp4HintHandler'
import Mp4MetaHandler from './media/Mp4MetaHandler'
import Mp4Directory from './Mp4Directory'

export default class Mp4HandlerFactory {
     private static readonly  HANDLER_SOUND_MEDIA:string             = "soun";
    private static readonly  HANDLER_VIDEO_MEDIA:string             = "vide";
    private static readonly  HANDLER_HINT_MEDIA:string              = "hint";
    private static readonly  HANDLER_TEXT_MEDIA:string              = "text";
    private static readonly  HANDLER_META_MEDIA:string              = "meta";

    private caller: Mp4Handler<Mp4Directory>

    public constructor( caller: Mp4Handler<Mp4Directory>)
    {
        this.caller = caller;
    }

    public getHandler( box:HandlerBox,  metadata:Metadata,context:Mp4Context): Mp4Handler<Mp4Directory>
    {
        let handleType = box.getHandlerType();
        if (handleType==Mp4HandlerFactory.HANDLER_SOUND_MEDIA) {
            return new Mp4SoundHandler(metadata, context);
        }
        else if (handleType==Mp4HandlerFactory.HANDLER_VIDEO_MEDIA) {
            return new Mp4VideoHandler(metadata, context);
        } else if (handleType==Mp4HandlerFactory.HANDLER_HINT_MEDIA) {
            return new Mp4HintHandler(metadata, context);
        } else if (handleType==Mp4HandlerFactory.HANDLER_TEXT_MEDIA) {
            return new Mp4TextHandler(metadata, context);
        } else if (handleType==Mp4HandlerFactory.HANDLER_META_MEDIA) {
            return new Mp4MetaHandler(metadata, context);
        }
        return this.caller;
    }
}