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
import OlympusFocusInfoMakernoteDescriptor from './OlympusFocusInfoMakernoteDescriptor';
import Directory from '../../Directory';
/**
 * The Olympus focus info makernote is used by many manufacturers (Epson, Konica, Minolta and Agfa...), and as such contains some tags
 * that appear specific to those manufacturers.
 */
class OlympusFocusInfoMakernoteDirectory extends Directory {
    public static TagFocusInfoVersion = 0x0000;
    public static TagAutoFocus = 0x0209;
    public static TagSceneDetect = 0x0210;
    public static TagSceneArea = 0x0211;
    public static TagSceneDetectData = 0x0212;
    public static TagZoomStepCount = 0x0300;
    public static TagFocusStepCount = 0x0301;
    public static TagFocusStepInfinity = 0x0303;
    public static TagFocusStepNear = 0x0304;
    public static TagFocusDistance = 0x0305;
    public static TagAfPoint = 0x0308;
    // 0x031a Continuous AF parameters?
    public static TagAfInfo = 0x0328; // ifd
    public static TagExternalFlash = 0x1201;
    public static TagExternalFlashGuideNumber = 0x1203;
    public static TagExternalFlashBounce = 0x1204;
    public static TagExternalFlashZoom = 0x1205;
    public static TagInternalFlash = 0x1208;
    public static TagManualFlash = 0x1209;
    public static TagMacroLed = 0x120A;
    public static TagSensorTemperature = 0x1500;
    public static TagImageStabilization = 0x1600;
    public static _tagNameMap: Map<number, string> = new Map([
        [OlympusFocusInfoMakernoteDirectory.TagFocusInfoVersion, "Focus Info Version"],
        [OlympusFocusInfoMakernoteDirectory.TagAutoFocus, "Auto Focus"],
        [OlympusFocusInfoMakernoteDirectory.TagSceneDetect, "Scene Detect"],
        [OlympusFocusInfoMakernoteDirectory.TagSceneArea, "Scene Area"],
        [OlympusFocusInfoMakernoteDirectory.TagSceneDetectData, "Scene Detect Data"],
        [OlympusFocusInfoMakernoteDirectory.TagZoomStepCount, "Zoom Step Count"],
        [OlympusFocusInfoMakernoteDirectory.TagFocusStepCount, "Focus Step Count"],
        [OlympusFocusInfoMakernoteDirectory.TagFocusStepInfinity, "Focus Step Infinity"],
        [OlympusFocusInfoMakernoteDirectory.TagFocusStepNear, "Focus Step Near"],
        [OlympusFocusInfoMakernoteDirectory.TagFocusDistance, "Focus Distance"],
        [OlympusFocusInfoMakernoteDirectory.TagAfPoint, "AF Point"],
        [OlympusFocusInfoMakernoteDirectory.TagAfInfo, "AF Info"],
        [OlympusFocusInfoMakernoteDirectory.TagExternalFlash, "External Flash"],
        [OlympusFocusInfoMakernoteDirectory.TagExternalFlashGuideNumber, "External Flash Guide Number"],
        [OlympusFocusInfoMakernoteDirectory.TagExternalFlashBounce, "External Flash Bounce"],
        [OlympusFocusInfoMakernoteDirectory.TagExternalFlashZoom, "External Flash Zoom"],
        [OlympusFocusInfoMakernoteDirectory.TagInternalFlash, "Internal Flash"],
        [OlympusFocusInfoMakernoteDirectory.TagManualFlash, "Manual Flash"],
        [OlympusFocusInfoMakernoteDirectory.TagMacroLed, "Macro LED"],
        [OlympusFocusInfoMakernoteDirectory.TagSensorTemperature, "Sensor Temperature"],
        [OlympusFocusInfoMakernoteDirectory.TagImageStabilization, "Image Stabilization"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new OlympusFocusInfoMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Olympus Focus Info";
    }
    protected getTagNameMap(): Map<number, string> {
        return OlympusFocusInfoMakernoteDirectory._tagNameMap;
    }
}
export default OlympusFocusInfoMakernoteDirectory;
