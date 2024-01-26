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

import Mp4Handler from '../../../imaging/mp4/Mp4Handler'
import Mp4UuidBoxDirectory from './Mp4UuidBoxDirectory'
import ByteArrayReader from '../../../lang/ByteArrayReader'
import SequentialByteArrayReader from '../../../lang/SequentialByteArrayReader'
import Metadata from '../../Metadata'
import Mp4Context from '../Mp4Context'
import Mp4BoxTypes from '../Mp4BoxTypes'
import Box from '../boxes/Box'
import UuidBox from '../boxes/UuidBox'
import ByteTrie from '../../../lang/ByteTrie'
import UuidType from './UuidType'
import PhotoshopReader from '../../photoshop/PhotoshopReader'
import ExifReader from '../../exif/ExifReader'
import XmpReader from '../../xmp/XmpReader'
import {IptcReader} from '../../iptc/IptcReader'

export default class Mp4UuidBoxHandler extends Mp4Handler<Mp4UuidBoxDirectory>{

    private static _uuidLookup:ByteTrie<UuidType>;

    public constructor(metadata:Metadata){
    super(metadata);
        Mp4UuidBoxHandler._uuidLookup = new ByteTrie<UuidType>();
        Mp4UuidBoxHandler._uuidLookup.setDefaultValue(UuidType.Unknown);
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.Exif, Int8Array.of(0x05, 0x37, 0xcd, 0xab, 0x9d, 0x0c, 0x44, 0x31, 0xa7, 0x2a, 0xfa, 0x56, 0x1f, 0x2a, 0x11, 0x3e));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.PhotoshopImageResources, Int8Array.of(0x2c, 0x4c, 0x01, 0x00, 0x85, 0x04, 0x40, 0xb9, 0xa0, 0x3e, 0x56, 0x21, 0x48, 0xd6, 0xdf, 0xeb));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.IptcIim, Int8Array.of(0x33, 0xc7, 0xa4,0xd2, 0xb8, 0x1d, 0x47, 0x23, 0xa0, 0xba, 0xf1, 0xa3, 0xe0, 0x97, 0xad, 0x38));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.PiffTrackEncryptionBox, Int8Array.of(0x89, 0x74, 0xdb, 0xce, 0x7b, 0xe7, 0x4c, 0x51, 0x84, 0xf9, 0x71, 0x48, 0xf9, 0x88, 0x25, 0x54 ));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.GeoJp2WorldFileBox, Int8Array.of(0x96, 0xa9, 0xf1, 0xf1, 0xdc, 0x98, 0x40, 0x2d, 0xa7, 0xae, 0xd6, 0x8e, 0x34, 0x45, 0x18, 0x09 ));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.PiffSampleEncryptionBox, Int8Array.of(0xa2, 0x39, 0x4f, 0x52, 0x5a, 0x9b, 0x4f, 0x14, 0xa2, 0x44, 0x6c, 0x42, 0x7c, 0x64, 0x8d, 0xf4));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.GeoJp2GeoTiffBox, Int8Array.of(0xb1, 0x4b, 0xf8, 0xbd, 0x08, 0x3d, 0x4b, 0x43, 0xa5, 0xae, 0x8c, 0xd7, 0xd5, 0xa6,0xce, 0x03));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.Xmp, Int8Array.of(0xbe, 0x7a, 0xcf, 0xcb, 0x97, 0xa9, 0x42, 0xe8, 0x9c, 0x71, 0x99, 0x94, 0x91, 0xe3, 0xaf, 0xac ));
        Mp4UuidBoxHandler._uuidLookup.addPath(UuidType.PiffProtectionSystemSpecificHeaderBox, Int8Array.of(0xd0, 0x8a, 0x4f, 0x18, 0x10, 0xf3, 0x4a, 0x82, 0xb6, 0xc8, 0x32, 0xd8, 0xab, 0xa1, 0x83, 0xd3 ));


    }


    public  getDirectory():Mp4UuidBoxDirectory
    {
        return new Mp4UuidBoxDirectory();
    }


    public  shouldAcceptBox( box:Box):boolean
    {
        return box.classtype==Mp4BoxTypes.BOX_USER_DEFINED;
    }

    public  shouldAcceptContainer(box:Box):boolean
    {
        return false;
    }


    public processBox( box:Box,payload:Int8Array,  context:Mp4Context):Mp4Handler<any>
    {
        if (payload != null && payload.length >= 16) {
            let uuidType = Mp4UuidBoxHandler._uuidLookup.find(payload);

            switch (uuidType) {
                case UuidType.Exif:
                    new ExifReader().extract(new ByteArrayReader(payload, 16), this.metadata, 0, this.directory);
                    break;
                case UuidType.IptcIim:
                    new IptcReader().extract(new SequentialByteArrayReader(payload, 16), this.metadata, payload.length - 16, this.directory);
                    break;
                case UuidType.PhotoshopImageResources:
                    new PhotoshopReader().extract(new SequentialByteArrayReader(payload, 16), payload.length - 16,  this.metadata, this.directory);
                    break;
                case UuidType.Xmp:
                    new XmpReader().extract(payload, 16, payload.length - 16,  this.metadata, this.directory);
                    break;
                default:
                    let reader = new SequentialByteArrayReader(payload);
                    let userBox = new UuidBox(reader, box);
                    userBox.addMetadata(this.directory);
                    break;
            }
        }

        return this;
    }
}