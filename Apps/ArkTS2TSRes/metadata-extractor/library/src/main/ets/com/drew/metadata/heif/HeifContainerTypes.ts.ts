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
class HeifContainerTypes {
    public static readonly BOX_METADATA: string = "meta";
    public static readonly BOX_IMAGE_PROPERTY: string = "iprp";
    public static readonly BOX_ITEM_PROPERTY: string = "ipco";
    public static readonly BOX_MEDIA_DATA: string = "mdat";
    private static readonly _containerList: Set<string> = new Set<string>()
        .add(HeifContainerTypes.BOX_METADATA)
        .add(HeifContainerTypes.BOX_IMAGE_PROPERTY)
        .add(HeifContainerTypes.BOX_ITEM_PROPERTY);
}
export default HeifContainerTypes;
