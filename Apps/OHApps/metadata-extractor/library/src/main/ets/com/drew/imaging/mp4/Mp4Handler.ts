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
import Mp4Directory from '../../metadata/mp4/Mp4Directory';
import Mp4Context from '../../metadata/mp4/Mp4Context';
import Box from '../../metadata/mp4/boxes/Box';

abstract class Mp4Handler <T extends Mp4Directory> {
  public metadata: Metadata;
  public directory: T;

  public constructor(metadata: Metadata) {
    this.metadata = metadata;
    this.directory = this.getDirectory();
    metadata.addDirectory(this.directory);
  }

  public abstract getDirectory(): T;

  public abstract shouldAcceptBox(box: Box): boolean;

  public abstract shouldAcceptContainer(box: Box): boolean;

  public abstract processBox(box: Box, payload: Int8Array, context: Mp4Context): Mp4Handler<T>;

  public processContainer(box: Box, context: Mp4Context): Mp4Handler<T>
  {
    return this.processBox(box, null, context);
  }

  public addError(message: string): void
  {
    this.directory.addError(message);
  }
}

export default Mp4Handler