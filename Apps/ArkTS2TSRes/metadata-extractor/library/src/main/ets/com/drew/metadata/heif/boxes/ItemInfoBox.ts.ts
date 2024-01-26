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
import HeifDirectory from '../HeifDirectory';
import SequentialReader from '../../../lang/SequentialReader';
import SequentialByteArrayReader from '../../../lang/SequentialByteArrayReader';
class ItemInfoBox extends FullBox {
    public entryCount: number;
    public entries: Map<number, InstanceType<typeof ItemInfoBox.ItemInfoEntry>>;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box, null);
        if (this.version == 0) {
            this.entryCount = reader.getUInt16();
        }
        else {
            this.entryCount = reader.getUInt32();
        }
        this.entries = new Map<number, InstanceType<typeof ItemInfoBox.ItemInfoEntry>>();
        for (let i = 1; i <= this.entryCount; i++) {
            let entryBox: Box = new Box(reader);
            let byteReader: SequentialByteArrayReader = new SequentialByteArrayReader(reader.getBytes(entryBox.size - 8));
            let itemInfoEntry: InstanceType<typeof ItemInfoBox.ItemInfoEntry> = new ItemInfoBox.ItemInfoEntry(byteReader, entryBox);
            this.entries.set(itemInfoEntry.itemID, itemInfoEntry);
        }
    }
    public static ItemInfoEntry = class extends FullBox {
        public itemID: number;
        public itemProtectionIndex: number;
        public itemName: string;
        public contentType: string;
        public contentEncoding: string;
        public extensionType: string;
        public itemType: string;
        public itemUriType: string;
        public constructor(reader: SequentialReader, box: Box) {
            super(reader, box, null);
            // 4 Bytes for length, 4 Bytes for type. Reader is indexed from AFTER type but box.size INCLUDES the aforementioned 8 bytes
            let headerLength: number = 8;
            if ((this.version == 0) || (this.version == 1)) {
                this.itemID = reader.getUInt16();
                this.itemProtectionIndex = reader.getUInt16();
                this.itemName = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                this.contentType = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                if (box.size - reader.getPosition() - headerLength > 0) {
                    this.extensionType = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                }
            }
            if (this.version == 1) {
                if (box.size - 28 >= 4) {
                    this.contentEncoding = reader.getString(4);
                }
            }
            if (this.version >= 2) {
                if (this.version == 2) {
                    this.itemID = reader.getUInt16();
                }
                else if (this.version == 3) {
                    this.itemID = reader.getUInt32();
                }
                this.itemProtectionIndex = reader.getUInt16();
                this.itemType = reader.getString(4);
                this.itemName = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                if (this.itemType == "mime") {
                    this.contentType = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                    if (box.size - reader.getPosition() - headerLength > 0) {
                        this.contentEncoding = reader.getNullTerminatedString((box.size - reader.getPosition() - headerLength), "UTF_8");
                    }
                }
                else if (this.itemType == "uri ") {
                    this.itemUriType = reader.getString((box.size - reader.getPosition() - headerLength));
                }
            }
        }
        public getItemType(): string {
            return this.itemType;
        }
    };
    public addMetadata(directory: HeifDirectory): void {
    }
    public getEntry(id: number): InstanceType<typeof ItemInfoBox.ItemInfoEntry> {
        return this.entries.get(id);
    }
}
export default ItemInfoBox;
