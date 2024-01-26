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

import Atom from './atoms/Atom'
import CanonThumbnailAtom from './atoms/canon/CanonThumbnailAtom'
import FileTypeCompatibilityAtom from './atoms/FileTypeCompatibilityAtom'
import HandlerReferenceAtom from './atoms/HandlerReferenceAtom'
import MediaHeaderAtom from './atoms/MediaHeaderAtom'
import Metadata from '../Metadata'
import MovieHeaderAtom from './atoms/MovieHeaderAtom'
import QuickTimeAtomTypes from './QuickTimeAtomTypes'
import QuickTimeContainerTypes from './QuickTimeContainerTypes'
import QuickTimeContext from './QuickTimeContext'
import QuickTimeDirectory from './QuickTimeDirectory'
import QuickTimeHandler from '../../imaging/quicktime/QuickTimeHandler'
import QuickTimeHandlerFactory from './QuickTimeHandlerFactory'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'
import SequentialReader from '../../lang/SequentialReader'
import TrackHeaderAtom from './atoms/TrackHeaderAtom'
import XmpReader from '../xmp/XmpReader'

class QuickTimeAtomHandler extends QuickTimeHandler<QuickTimeDirectory> {
  private handlerFactory: QuickTimeHandlerFactory = new QuickTimeHandlerFactory(this);

  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public getDirectory(): QuickTimeDirectory {
    return new QuickTimeDirectory();
  }

  public shouldAcceptAtom(atom: Atom): boolean {
    return atom.type == QuickTimeAtomTypes.ATOM_FILE_TYPE
    || atom.type == QuickTimeAtomTypes.ATOM_MOVIE_HEADER
    || atom.type == QuickTimeAtomTypes.ATOM_HANDLER
    || atom.type == QuickTimeAtomTypes.ATOM_MEDIA_HEADER
    || atom.type == QuickTimeAtomTypes.ATOM_CANON_THUMBNAIL
    || atom.type == QuickTimeAtomTypes.ATOM_ADOBE_XMP
    || atom.type == QuickTimeAtomTypes.ATOM_TRACK_HEADER;
  }

  public shouldAcceptContainer(atom: Atom): boolean {
    return atom.type == QuickTimeContainerTypes.ATOM_TRACK
    || atom.type == QuickTimeContainerTypes.ATOM_USER_DATA
    || atom.type == QuickTimeContainerTypes.ATOM_METADATA
    || atom.type == QuickTimeContainerTypes.ATOM_MOVIE
    || atom.type == QuickTimeContainerTypes.ATOM_MEDIA;
  }

  public processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeHandler<QuickTimeDirectory> {
    if (payload != null) {
      let reader: SequentialReader = new SequentialByteArrayReader(payload);

      if (atom.type == QuickTimeAtomTypes.ATOM_MOVIE_HEADER) {
        let movieHeaderAtom: MovieHeaderAtom = new MovieHeaderAtom(reader, atom);
        movieHeaderAtom.addMetadata(this.directory);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_FILE_TYPE) {
        let fileTypeCompatibilityAtom: FileTypeCompatibilityAtom = new FileTypeCompatibilityAtom(reader, atom);
        fileTypeCompatibilityAtom.addMetadata(this.directory);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_HANDLER) {
        let handlerReferenceAtom: HandlerReferenceAtom = new HandlerReferenceAtom(reader, atom);
        return this.handlerFactory.getHandler(handlerReferenceAtom.getComponentType(), this.metadata, context);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_MEDIA_HEADER) {
        new MediaHeaderAtom(reader, atom, context);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_CANON_THUMBNAIL) {
        let canonThumbnailAtom: CanonThumbnailAtom = new CanonThumbnailAtom(reader);
        canonThumbnailAtom.addMetadata(this.directory);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_ADOBE_XMP) {
        new XmpReader().extract(payload, null, null, this.metadata, this.directory);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_TRACK_HEADER) {
        let trackHeaderAtom: TrackHeaderAtom = new TrackHeaderAtom(reader, atom);
        trackHeaderAtom.addMetadata(this.directory);
      }
    } else {
      if (atom.type == QuickTimeContainerTypes.ATOM_COMPRESSED_MOVIE) {
        this.directory.addError("Compressed QuickTime movies not supported");
      }
    }

    return this;
  }
}

export default QuickTimeAtomHandler