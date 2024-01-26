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


import Mp4MediaHandler from '../Mp4MediaHandler'
import Mp4TextDirectory from './Mp4TextDirectory'
import SequentialReader from '../../../lang/SequentialReader'
import Metadata from '../../Metadata'
import Mp4Context from '../Mp4Context'
import Mp4ContainerTypes from '../Mp4ContainerTypes'
import Box from '../boxes/Box'


export default class Mp4TextHandler extends Mp4MediaHandler<Mp4TextDirectory> {
  public constructor(metadata: Metadata, context: Mp4Context) {
    super(metadata, context);
  }

  public getDirectory(): Mp4TextDirectory
  {
    return new Mp4TextDirectory();
  }

  public getMediaInformation(): string
  {
    return Mp4ContainerTypes.BOX_MEDIA_TEXT;
  }

  public processSampleDescription(reader: SequentialReader, box: Box): void
  {
  }

  public processMediaInformation(reader: SequentialReader, box: Box): void
  {
  }

  public processTimeToSample(reader: SequentialReader, box: Box, context: Mp4Context): void
  {
  }
}