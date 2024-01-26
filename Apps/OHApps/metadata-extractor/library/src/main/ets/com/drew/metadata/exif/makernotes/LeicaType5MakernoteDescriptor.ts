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

import LeicaType5MakernoteDirectory from './LeicaType5MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

class LeicaType5MakernoteDescriptor extends TagDescriptor<LeicaType5MakernoteDirectory> {
  constructor(directory: LeicaType5MakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case LeicaType5MakernoteDirectory.TagExposureMode:
        return this.getExposureModeDescription();
      default:
        return super.getDescription(tagType);
        }
    }

  public getExposureModeDescription(): string{
    let values = this._directory.getByteArray(LeicaType5MakernoteDirectory.TagExposureMode);
    if (values == null || values.length < 4) {
      return null;
    }

    let join = values[0].toString() + " " + values[1].toString() + " " + values[2].toString() + " " + values[3].toString();

    if(join == "0 0 0 0") {
      return "Program AE";
    }
    else if(join == "1 0 0 0") {
      return "Aperture-priority AE";
    }
    else if(join == "1 1 0 0") {
      return "Aperture-priority AE (1)";
    }
    else if(join == "2 0 0 0") {
      return "Shutter speed priority AE";  // guess
    }
    else if(join == "3 0 0 0") {
      return "Manual";
    }
    else {
      return "Unknown (" + join + ")";
    }
  }
}

export default LeicaType5MakernoteDescriptor