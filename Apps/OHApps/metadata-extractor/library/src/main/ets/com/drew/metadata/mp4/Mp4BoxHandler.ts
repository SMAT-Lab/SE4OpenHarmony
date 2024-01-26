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
import Mp4Directory from './Mp4Directory'
import Box from './boxes/Box'
import UserDataBox from './boxes/UserDataBox'
import FileTypeBox from './boxes/FileTypeBox'
import MediaHeaderBox from './boxes/MediaHeaderBox'
import MovieHeaderBox from './boxes/MovieHeaderBox'
import TrackHeaderBox from './boxes/TrackHeaderBox'
import SequentialReader from '../../lang/SequentialReader'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'
import Metadata from '../Metadata'
import Mp4Context from './Mp4Context'
import Mp4HandlerFactory from './Mp4HandlerFactory'
import Mp4BoxTypes from './Mp4BoxTypes'
import Mp4ContainerTypes from './Mp4ContainerTypes'
import Mp4UuidBoxHandler from './media/Mp4UuidBoxHandler'
import HandlerBox from './boxes/HandlerBox'


export default class Mp4BoxHandler extends Mp4Handler<Mp4Directory> {
  private handlerFactory: Mp4HandlerFactory = new Mp4HandlerFactory(this);
  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public getDirectory(): Mp4Directory
  {
    return new Mp4Directory();
  }

  public shouldAcceptBox(box: Box): boolean
  {
    return box.classtype == Mp4BoxTypes.BOX_FILE_TYPE
    || box.classtype == Mp4BoxTypes.BOX_MOVIE_HEADER
    || box.classtype == Mp4BoxTypes.BOX_HANDLER
    || box.classtype == Mp4BoxTypes.BOX_MEDIA_HEADER
    || box.classtype == Mp4BoxTypes.BOX_TRACK_HEADER
    || box.classtype == Mp4BoxTypes.BOX_USER_DATA
    || box.classtype == Mp4BoxTypes.BOX_USER_DEFINED;
  }

  public shouldAcceptContainer(box: Box): boolean
  {
    return box.classtype == Mp4ContainerTypes.BOX_TRACK
    || box.classtype == Mp4ContainerTypes.BOX_METADATA
    || box.classtype == Mp4ContainerTypes.BOX_MOVIE
    || box.classtype == Mp4ContainerTypes.BOX_MEDIA;
  }

  public processBox(box: Box, payload: Int8Array, context: Mp4Context): Mp4Handler<Mp4Directory>
  {
    if (payload != null) {
      let reader: SequentialReader = new SequentialByteArrayReader(payload);
      if (box.classtype == Mp4BoxTypes.BOX_MOVIE_HEADER) {
        this.processMovieHeader(reader, box);
      } else if (box.classtype == Mp4BoxTypes.BOX_FILE_TYPE) {
        this.processFileType(reader, box);
      } else if (box.classtype == Mp4BoxTypes.BOX_HANDLER) {
        let handlerBox = new HandlerBox(reader, box);
        return this.handlerFactory.getHandler(handlerBox, this.metadata, context);
      } else if (box.classtype == Mp4BoxTypes.BOX_MEDIA_HEADER) {
        this.processMediaHeader(reader, box, context);
      } else if (box.classtype == Mp4BoxTypes.BOX_TRACK_HEADER) {
        this.processTrackHeader(reader, box);
      } else if (box.classtype == Mp4BoxTypes.BOX_USER_DEFINED) {
        let userBoxHandler = new Mp4UuidBoxHandler(this.metadata);
        userBoxHandler.processBox(box, payload, context);
      } else if (box.classtype == Mp4BoxTypes.BOX_USER_DATA) {
        this.processUserData(box, reader, payload.length);
      }
    } else {
      if (box.classtype == Mp4ContainerTypes.BOX_COMPRESSED_MOVIE) {
        this.directory.addError("Compressed MP4 movies not supported");
      }
    }
    return this;
  }

  private processUserData(box: Box, reader: SequentialReader, length: number): void
  {
    new UserDataBox(reader, box, length).addMetadata(this.directory);
  }

  private processFileType(reader: SequentialReader, box: Box): void
  {

    let fileTypeBox = new FileTypeBox(reader, box);
    fileTypeBox.addMetadata(this.directory);
  }

  private processMovieHeader(reader: SequentialReader, box: Box): void
  {
    let movieHeaderBox = new MovieHeaderBox(reader, box);
    movieHeaderBox.addMetadata(this.directory);
  }

  private processMediaHeader(reader: SequentialReader, box: Box, context: Mp4Context): void
  {
    new MediaHeaderBox(reader, box, context);
  }

  private processTrackHeader(reader: SequentialReader, box: Box): void
  {
    let trackHeaderBox = new TrackHeaderBox(reader, box);
    trackHeaderBox.addMetadata(this.directory);
  }
}