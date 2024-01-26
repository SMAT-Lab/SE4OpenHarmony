/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import JfifDirectory from './JfifDirectory';
import TagDescriptor from '../TagDescriptor';
import util from '@ohos.util';

/**
 * Provides human-readable string versions of the tags stored in a JfifDirectory.
 */
class JfifDescriptor extends TagDescriptor<JfifDirectory> {
  public constructor(directory: JfifDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case JfifDirectory.TAG_RESX:
        return this.getImageResXDescription();
      case JfifDirectory.TAG_RESY:
        return this.getImageResYDescription();
      case JfifDirectory.TAG_VERSION:
        return this.getImageVersionDescription();
      case JfifDirectory.TAG_UNITS:
        return this.getImageResUnitsDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getImageVersionDescription(): string
  {
    let value: number = this._directory.getInteger(JfifDirectory.TAG_VERSION);
    if (value == null)
    return null;
    return util.printf("%d.%d", (value & 0xFF00) >> 8, value & 0xFF);
  }

  public getImageResYDescription(): string
  {
    let value: number = this._directory.getInteger(JfifDirectory.TAG_RESY);
    if (value == null)
    return null;
    return util.printf("%d dot%s",
      value,
        value == 1 ? "" : "s");
  }

  public getImageResXDescription(): string
  {
    let value: number = this._directory.getInteger(JfifDirectory.TAG_RESX);
    if (value == null)
    return null;
    return util.printf("%d dot%s",
      value,
        value == 1 ? "" : "s");
  }

  public getImageResUnitsDescription(): string
  {
    let value: number = this._directory.getInteger(JfifDirectory.TAG_UNITS);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "none";
      case 1:
        return "inch";
      case 2:
        return "centimetre";
      default:
        return "unit";
    }
  }
}

export default JfifDescriptor
