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
import FullBox from './FullBox';
import Box from './Box';
import SequentialReader from '../../../lang/SequentialReader';
class HandlerBox extends FullBox {
    public handlerType: string;
    public name: string;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box, null);
        reader.skip(4); // Pre-defined
        this.handlerType = reader.getString(4);
        reader.skip(12); // Reserved
        this.name = reader.getNullTerminatedString(box.size - 32, "UTF_8");
    }
    public getHandlerType(): string {
        return this.handlerType;
    }
}
export default HandlerBox;
