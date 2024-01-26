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

import JpegComponent from './JpegComponent';
import TagDescriptor from '../TagDescriptor';
import Directory from '../Directory'
import JpegDescriptor from './JpegDescriptor'

class JpegDirectory extends Directory {
  public static readonly TAG_COMPRESSION_TYPE: number = -3;
  public static readonly TAG_DATA_PRECISION: number = 0;
  public static readonly TAG_IMAGE_HEIGHT: number = 1;
  public static readonly TAG_IMAGE_WIDTH: number= 3;
  public static readonly TAG_NUMBER_OF_COMPONENTS: number = 5;
  public static readonly TAG_COMPONENT_DATA_1: number = 6;
  public static readonly TAG_COMPONENT_DATA_2: number = 7;
  public static readonly TAG_COMPONENT_DATA_3: number= 8;
  public static readonly TAG_COMPONENT_DATA_4: number= 9;
  public static _tagNameMap: Map<number, string> = new Map([
    [JpegDirectory.TAG_COMPRESSION_TYPE, "Compression Type"]
    , [JpegDirectory.TAG_DATA_PRECISION, "Data Precision"]
    , [JpegDirectory.TAG_IMAGE_WIDTH, "Image Width"]
    , [JpegDirectory.TAG_IMAGE_HEIGHT, "Image Height"]
    , [JpegDirectory.TAG_NUMBER_OF_COMPONENTS, "Number of Components"]
    , [JpegDirectory.TAG_COMPONENT_DATA_1, "Component 1"]
    , [JpegDirectory.TAG_COMPONENT_DATA_2, "Component 2"]
    , [JpegDirectory.TAG_COMPONENT_DATA_3, "Component 3"]
    , [JpegDirectory.TAG_COMPONENT_DATA_4, "Component 4"]]);

  public constructor() {
    super();
    this.setDescriptor(new JpegDescriptor(this))
  }

  public getName(): string {
    return "JPEG";
  }

  public getTagNameMap(): Map<number, string>
  {
    return JpegDirectory._tagNameMap;
  }

  public getComponent(componentNumber: number): JpegComponent{
    let tagType: number = JpegDirectory.TAG_COMPONENT_DATA_1 + componentNumber;
    return this.getObject(tagType);
  }

  public getImageWidth(): number{
    return this.getInt(JpegDirectory.TAG_IMAGE_WIDTH);
  }

  public getImageHeight(): number{
    return this.getInt(JpegDirectory.TAG_IMAGE_HEIGHT);
  }

  public getNumberOfComponents(): number{
    return this.getInt(JpegDirectory.TAG_NUMBER_OF_COMPONENTS);
  }
}

export default JpegDirectory
