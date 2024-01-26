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
import FullBox from './FullBox';
import Box from './Box';
import SequentialReader from '../../../lang/SequentialReader';
class ItemProtectionBox extends FullBox {
    public protectionCount: number;
    public protectionSchemes: Set<InstanceType<typeof ItemProtectionBox.ProtectionSchemeInfoBox>>;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box, null);
        this.protectionCount = reader.getUInt16();
        this.protectionSchemes = new Set<InstanceType<typeof ItemProtectionBox.ProtectionSchemeInfoBox>>();
        for (let i = 1; i <= this.protectionCount; i++) {
            this.protectionSchemes.add(new ItemProtectionBox.ProtectionSchemeInfoBox(reader, box));
        }
    }
    static ProtectionSchemeInfoBox = class extends Box {
        public constructor(reader: SequentialReader, box: Box) {
            super(null, box);
        }
        public OriginalFormatBox = class extends Box {
            public dataFormat: string;
            public constructor(reader: SequentialReader, box: Box) {
                super(reader, null);
                this.dataFormat = reader.getString(4);
            }
        };
    };
}
export default ItemProtectionBox;
