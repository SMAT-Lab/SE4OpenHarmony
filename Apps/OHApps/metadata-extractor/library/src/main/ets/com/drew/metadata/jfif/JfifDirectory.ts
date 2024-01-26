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

import JfifDescriptor from './JfifDescriptor';
import Directory from '../Directory';

/**
 * Directory of tags and values for the SOF0 Jfif segment.  This segment holds basic metadata about the image.
 */
class JfifDirectory extends Directory {
  public static readonly TAG_VERSION = 5;
  /** Units for pixel density fields.  One of None, Pixels per Inch, Pixels per Centimetre. */
  public static readonly TAG_UNITS = 7;
  public static readonly TAG_RESX = 8;
  public static readonly TAG_RESY = 10;
  public static readonly TAG_THUMB_WIDTH = 12;
  public static readonly TAG_THUMB_HEIGHT = 13;
  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([

    [JfifDirectory.TAG_VERSION, "Version"],
    [JfifDirectory.TAG_UNITS, "Resolution Units"],
    [JfifDirectory.TAG_RESY, "Y Resolution"],
    [JfifDirectory.TAG_RESX, "X Resolution"],
    [JfifDirectory.TAG_THUMB_WIDTH, "Thumbnail Width Pixels"],
    [JfifDirectory.TAG_THUMB_HEIGHT, "Thumbnail Height Pixels"]
  ]);

  public constructor() {
    super();
    this.setDescriptor(new JfifDescriptor(this));
  }

  public getName(): string
  {
    return "JFIF";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return JfifDirectory._tagNameMap;
  }

  public getVersion(): number
  {
    return this.getInt(JfifDirectory.TAG_VERSION);
  }

  public getResUnits(): number
  {
    return this.getInt(JfifDirectory.TAG_UNITS);
  }

  /**
   * @deprecated use {@link #getResY} instead.
   */
  //    @Deprecated
  public getImageWidth(): number
  {
    return this.getInt(JfifDirectory.TAG_RESY);
  }

  public getResY(): number
  {
    return this.getInt(JfifDirectory.TAG_RESY);
  }

  /**
   * @deprecated use {@link #getResX} instead.
   */
  //    @Deprecated
  public getImageHeight(): number
  {
    return this.getInt(JfifDirectory.TAG_RESX);
  }

  public getResX(): number
  {
    return this.getInt(JfifDirectory.TAG_RESX);
  }
}

export default JfifDirectory
