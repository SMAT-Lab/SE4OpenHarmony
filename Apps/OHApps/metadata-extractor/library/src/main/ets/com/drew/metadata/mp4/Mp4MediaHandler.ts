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

import Mp4ContainerTypes from './Mp4ContainerTypes';
import Mp4BoxTypes from './Mp4BoxTypes';
import Mp4MediaDirectory from './media/Mp4MediaDirectory';
import Mp4Context from './Mp4Context';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import Box from './boxes/Box';
import DateUtil from '../../lang/DateUtil';
import Mp4Handler from '../../imaging/mp4/Mp4Handler';
import Metadata from '../Metadata';

abstract class Mp4MediaHandler <T extends Mp4MediaDirectory> extends Mp4Handler<T> {
  public constructor(metadata: Metadata, context: Mp4Context) {
    super(metadata);
    if (context.creationTime != null && context.modificationTime != null) {
      // Get creation/modification times
      this.directory.setDate(
        Mp4MediaDirectory.TAG_CREATION_TIME,
      DateUtil.get1Jan1904EpochDate(context.creationTime)
      );
      this.directory.setDate(
        Mp4MediaDirectory.TAG_MODIFICATION_TIME,
      DateUtil.get1Jan1904EpochDate(context.modificationTime)
      );
      this.directory.setString(Mp4MediaDirectory.TAG_LANGUAGE_CODE, context.language);
    }
  }

  public shouldAcceptBox(box: Box): boolean
  {
    return box.classtype==this.getMediaInformation()
    || box.classtype==Mp4BoxTypes.BOX_SAMPLE_DESCRIPTION
    || box.classtype==Mp4BoxTypes.BOX_TIME_TO_SAMPLE;
  }

  public shouldAcceptContainer(box: Box): boolean
  {
    return box.classtype==Mp4ContainerTypes.BOX_SAMPLE_TABLE
    || box.classtype==Mp4ContainerTypes.BOX_MEDIA_INFORMATION;
  }

  public processBox(box: Box, payload: Int8Array, context: Mp4Context): Mp4Handler<T>
  {
    if (payload != null) {
      let reader = new SequentialByteArrayReader(payload);
      if (box.classtype==this.getMediaInformation()) {
        this.processMediaInformation(reader, box);
      } else if (box.classtype==Mp4BoxTypes.BOX_SAMPLE_DESCRIPTION) {
        this.processSampleDescription(reader, box);
      } else if (box.classtype==Mp4BoxTypes.BOX_TIME_TO_SAMPLE) {
        this.processTimeToSample(reader, box, context);
      }
    }
    return this;
  }

  public abstract getMediaInformation(): string;

  public abstract processSampleDescription(reader: SequentialReader, box: Box);

  public abstract processMediaInformation(reader: SequentialReader, box: Box);

  public abstract processTimeToSample(reader: SequentialReader, box: Box, context: Mp4Context);
}

export default Mp4MediaHandler