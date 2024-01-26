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
import Mp4MediaHandler from '../Mp4MediaHandler';
import Mp4HintDirectory from './Mp4HintDirectory';
import SequentialReader from '../../../lang/SequentialReader';
import Metadata from '../../Metadata';
import Mp4Context from '../Mp4Context';
import Mp4BoxTypes from '../Mp4BoxTypes';
import Box from '../boxes/Box';
import HintMediaHeaderBox from '../boxes/HintMediaHeaderBox';
export default class Mp4HintHandler extends Mp4MediaHandler<Mp4HintDirectory> {
    public constructor(metadata: Metadata, context: Mp4Context) {
        super(metadata, context);
    }
    public getDirectory(): Mp4HintDirectory {
        return new Mp4HintDirectory();
    }
    public getMediaInformation(): string {
        return Mp4BoxTypes.BOX_HINT_MEDIA_INFO;
    }
    public processSampleDescription(reader: SequentialReader, box: Box): void {
    }
    public processMediaInformation(reader: SequentialReader, box: Box): void {
        let hintMediaHeaderBox = new HintMediaHeaderBox(reader, box);
        hintMediaHeaderBox.addMetadata(this.directory);
    }
    public processTimeToSample(reader: SequentialReader, box: Box, context: Mp4Context): void {
    }
}
