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
import Atom from './Atom';
import FullAtom from './FullAtom';
import QuickTimeContext from '../QuickTimeContext';
import SequentialReader from '../../../lang/SequentialReader';
class MediaHeaderAtom extends FullAtom {
    public constructor(reader: SequentialReader, atom: Atom, context: QuickTimeContext) {
        super(reader, atom);
        context.creationTime = reader.getUInt32();
        context.modificationTime = reader.getUInt32();
        context.timeScale = reader.getUInt32();
        context.duration = reader.getUInt32();
        let language: number = reader.getUInt16();
        let quality: number = reader.getUInt16();
    }
}
export default MediaHeaderAtom;
