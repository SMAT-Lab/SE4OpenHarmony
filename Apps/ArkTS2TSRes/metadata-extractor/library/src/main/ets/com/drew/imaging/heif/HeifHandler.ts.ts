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
import Metadata from '../../metadata/Metadata';
import HeifDirectory from '../../metadata/heif/HeifDirectory';
import Box from '../../metadata/heif/boxes/Box';
import SequentialReader from '../../lang/SequentialReader';
abstract class HeifHandler {
    public metadata: Metadata;
    protected directory: HeifDirectory;
    public constructor(metadata: Metadata) {
        this.metadata = metadata;
        this.directory = this.getDirectory();
        metadata.addDirectory(this.directory);
    }
    public abstract getDirectory(): HeifDirectory;
    public abstract shouldAcceptBox(box: Box): boolean;
    public abstract shouldAcceptContainer(box: Box): boolean;
    public abstract processBox(box: Box, payload: Int8Array): HeifHandler;
    /**
      * There is potential for a box to both contain other boxes and contain information, so this method will
      * handle those occurrences.
      */
    public abstract processContainer(box: Box, reader: SequentialReader): void;
}
export default HeifHandler;
