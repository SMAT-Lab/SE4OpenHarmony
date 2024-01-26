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
import HeifPictureHandler from './HeifPictureHandler';
import HandlerBox from './boxes/HandlerBox';
import Metadata from '../Metadata';
import HeifHandler from '../../imaging/heif/HeifHandler';
class HeifHandlerFactory {
    private static readonly HANDLER_PICTURE: string = "pict";
    private caller: HeifHandler;
    public constructor(caller: HeifHandler) {
        this.caller = caller;
    }
    public getHandler(box: HandlerBox, metadata: Metadata): HeifHandler {
        let type: string = box.getHandlerType();
        if (type == HeifHandlerFactory.HANDLER_PICTURE) {
            return new HeifPictureHandler(metadata);
        }
        return this.caller;
    }
}
export default HeifHandlerFactory;
