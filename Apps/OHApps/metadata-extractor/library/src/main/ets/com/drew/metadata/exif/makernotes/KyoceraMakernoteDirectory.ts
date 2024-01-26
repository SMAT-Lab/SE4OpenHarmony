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

import { KyoceraMakernoteDescriptor } from './KyoceraMakernoteDescriptor';
import Directory from '../../Directory';

export class KyoceraMakernoteDirectory extends Directory{
    public static TAG_PROPRIETARY_THUMBNAIL = 0x0001;
    public static TAG_PRINT_IMAGE_MATCHING_INFO = 0x0E00;

    private static _tagNameMap:Map<number, string> = new Map<number, string>()
    .set(KyoceraMakernoteDirectory.TAG_PROPRIETARY_THUMBNAIL, "Proprietary Thumbnail Format Data")
    .set(KyoceraMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info")

    constructor(){
    super()
    this.setDescriptor(new KyoceraMakernoteDescriptor(this));
    }
    public  getName():string
    {
        return "Kyocera/Contax Makernote";
    }

    protected  getTagNameMap():Map<number,string>
    {
        return KyoceraMakernoteDirectory._tagNameMap;
    }
}