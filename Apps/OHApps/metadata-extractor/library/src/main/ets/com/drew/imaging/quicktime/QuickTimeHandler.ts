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

import Atom from '../../metadata/mov/atoms/Atom'
import Metadata from '../../metadata/Metadata'
import QuickTimeContext from '../../metadata/mov/QuickTimeContext'
import QuickTimeDirectory from '../../metadata/mov/QuickTimeDirectory'

abstract class QuickTimeHandler <T extends QuickTimeDirectory> {
  protected metadata: Metadata;
  protected directory: T;

  public constructor(metadata: Metadata) {
    this.metadata = metadata;
    this.directory = this.getDirectory();
    metadata.addDirectory(this.directory);
  }

  protected abstract getDirectory(): T;

  public abstract shouldAcceptAtom(atom: Atom): boolean;

  public abstract shouldAcceptContainer(atom: Atom): boolean;

  public abstract processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeHandler<T>;

  public processContainer(atom: Atom, context: QuickTimeContext): QuickTimeHandler<T> {
    return this.processAtom(atom, null, context);
  }

  public addError(message: string): void {
    this.directory.addError(message);
  }
}

export default QuickTimeHandler
