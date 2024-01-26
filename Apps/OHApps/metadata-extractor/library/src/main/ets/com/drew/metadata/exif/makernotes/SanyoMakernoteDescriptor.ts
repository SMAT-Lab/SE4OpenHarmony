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

import { SanyoMakernoteDirectory } from './SanyoMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

export class SanyoMakernoteDescriptor extends TagDescriptor<SanyoMakernoteDirectory> {
  constructor(directory: SanyoMakernoteDirectory) {
    super(directory);
  }

  getDescription(tagType: number): string{
    switch (tagType) {
      case SanyoMakernoteDirectory.TAG_SANYO_QUALITY:
        return this.getSanyoQualityDescription();
      case SanyoMakernoteDirectory.TAG_MACRO:
        return this.getMacroDescription();
      case SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM:
        return this.getDigitalZoomDescription();
      case SanyoMakernoteDirectory.TAG_SEQUENTIAL_SHOT:
        return this.getSequentialShotDescription();
      case SanyoMakernoteDirectory.TAG_WIDE_RANGE:
        return this.getWideRangeDescription();
      case SanyoMakernoteDirectory.TAG_COLOR_ADJUSTMENT_MODE:
        return this.getColorAdjustmentModeDescription();
      case SanyoMakernoteDirectory.TAG_QUICK_SHOT:
        return this.getQuickShotDescription();
      case SanyoMakernoteDirectory.TAG_SELF_TIMER:
        return this.getSelfTimerDescription();
      case SanyoMakernoteDirectory.TAG_VOICE_MEMO:
        return this.getVoiceMemoDescription();
      case SanyoMakernoteDirectory.TAG_RECORD_SHUTTER_RELEASE:
        return this.getRecordShutterDescription();
      case SanyoMakernoteDirectory.TAG_FLICKER_REDUCE:
        return this.getFlickerReduceDescription();
      case SanyoMakernoteDirectory.TAG_OPTICAL_ZOOM_ON:
        return this.getOptimalZoomOnDescription();
      case SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM_ON:
        return this.getDigitalZoomOnDescription();
      case SanyoMakernoteDirectory.TAG_LIGHT_SOURCE_SPECIAL:
        return this.getLightSourceSpecialDescription();
      case SanyoMakernoteDirectory.TAG_RESAVED:
        return this.getResavedDescription();
      case SanyoMakernoteDirectory.TAG_SCENE_SELECT:
        return this.getSceneSelectDescription();
      case SanyoMakernoteDirectory.TAG_SEQUENCE_SHOT_INTERVAL:
        return this.getSequenceShotIntervalDescription();
      case SanyoMakernoteDirectory.TAG_FLASH_MODE:
        return this.getFlashModeDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  getSanyoQualityDescription(): string{
    let value = this._directory.getInteger(SanyoMakernoteDirectory.TAG_SANYO_QUALITY);
    if (value == null)
    return null;
    switch (value) {
      case 0x0:
        return "Normal/Very Low";
      case 0x1:
        return "Normal/Low";
      case 0x2:
        return "Normal/Medium Low";
      case 0x3:
        return "Normal/Medium";
      case 0x4:
        return "Normal/Medium High";
      case 0x5:
        return "Normal/High";
      case 0x6:
        return "Normal/Very High";
      case 0x7:
        return "Normal/Super High";
      case 0x100:
        return "Fine/Very Low";
      case 0x101:
        return "Fine/Low";
      case 0x102:
        return "Fine/Medium Low";
      case 0x103:
        return "Fine/Medium";
      case 0x104:
        return "Fine/Medium High";
      case 0x105:
        return "Fine/High";
      case 0x106:
        return "Fine/Very High";
      case 0x107:
        return "Fine/Super High";
      case 0x200:
        return "Super Fine/Very Low";
      case 0x201:
        return "Super Fine/Low";
      case 0x202:
        return "Super Fine/Medium Low";
      case 0x203:
        return "Super Fine/Medium";
      case 0x204:
        return "Super Fine/Medium High";
      case 0x205:
        return "Super Fine/High";
      case 0x206:
        return "Super Fine/Very High";
      case 0x207:
        return "Super Fine/Super High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  getMacroDescription(): string{
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_MACRO, "Normal", "Macro", "View", "Manual");
  }

  getDigitalZoomDescription(): string{
    return this.getDecimalRational(SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM, 3);
  }

  private getSequentialShotDescription(): string
  {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_SEQUENTIAL_SHOT, "None", "Standard", "Best", "Adjust Exposure");
  }

  private getWideRangeDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_WIDE_RANGE, "Off", "On");
  }

  private getColorAdjustmentModeDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_COLOR_ADJUSTMENT_MODE, "Off", "On");
  }

  private getQuickShotDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_QUICK_SHOT, "Off", "On");
  }

  private getSelfTimerDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_SELF_TIMER, "Off", "On");
  }

  private getVoiceMemoDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_VOICE_MEMO, "Off", "On");
  }

  private getRecordShutterDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_RECORD_SHUTTER_RELEASE, "Record while down", "Press start, press stop");
  }

  private getFlickerReduceDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_FLICKER_REDUCE, "Off", "On");
  }

  private getOptimalZoomOnDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_OPTICAL_ZOOM_ON, "Off", "On");
  }

  private getDigitalZoomOnDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_DIGITAL_ZOOM_ON, "Off", "On");
  }

  private getLightSourceSpecialDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_LIGHT_SOURCE_SPECIAL, "Off", "On");
  }

  private getResavedDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_RESAVED, "No", "Yes");
  }

  private getSceneSelectDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_SCENE_SELECT,
      "Off", "Sport", "TV", "Night", "User 1", "User 2", "Lamp");
  }

  private getSequenceShotIntervalDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_SEQUENCE_SHOT_INTERVAL,
      "5 frames/sec", "10 frames/sec", "15 frames/sec", "20 frames/sec");
  }

  private getFlashModeDescription() {
    return this.getIndexedDescription(SanyoMakernoteDirectory.TAG_FLASH_MODE,
      "Auto", "Force", "Disabled", "Red eye");
  }
}