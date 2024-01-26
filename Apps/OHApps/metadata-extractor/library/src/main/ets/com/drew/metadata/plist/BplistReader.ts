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

import PropertyListResults from './PropertyListResults'
import Trailer from './Trailer'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'
export default class BplistReader{
  private static  readonly PLIST_DTD:string = "<!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";

    private static readonly BPLIST_HEADER:string[]= ['b', 'p', 'l', 'i', 's', 't', '0', '0'];

    /**
     * Ensure that a BPLIST is valid.
     */
    public static  isValid(bplist:Int8Array):boolean
    {
        if (bplist.length < BplistReader.BPLIST_HEADER.length) {
            return false;
        }

        var valid:boolean = true;
        for (let i = 0; i < BplistReader.BPLIST_HEADER.length; i++) {
            if (String(bplist.indexOf(i,0)) != BplistReader.BPLIST_HEADER[i]) {
                valid = false;
                break;
            }
        }

        return valid;
    }

    public static  parse( bplist:Int8Array) :PropertyListResults
    {
        if (!BplistReader.isValid(bplist)) {
            throw new Error("Input is not a bplist");
        }

        let objects:Array<Object> = new Array<Object>();

        let  trailer:Trailer = BplistReader.readTrailer(bplist);

        // List out the pointers
        let reader:SequentialByteArrayReader = new SequentialByteArrayReader(bplist, (trailer.getOffsetTableOffset() + trailer.getTopObject()));
        let offsets:number[] = new Number[trailer.getNumObjects()];
        for (let i = 0; i < trailer.getNumObjects(); i++) {
            if (trailer.getOffsetIntSize() == 1) {
                offsets[i] = reader.getByte();
            } else if (trailer.getOffsetIntSize() == 2) {
                offsets[i] = reader.getUInt16();
            }
        }

        for (let i = 0; i < offsets.length; i++) {
            reader = new SequentialByteArrayReader(bplist, offsets[i]);
            let marker:number = reader.getByte();
            let objectFormat:number = marker >> 4 & 0x0F;
            switch (objectFormat) {
                case 0x0D:    // dict
                  BplistReader.handleDict(i, marker, reader, objects);
                    break;
                case 0x05:    // string (ASCII)
                    let charCount:number = marker & 0x0F;
                    objects.push(i, reader.getString(charCount));
                    break;
                case 0x04:    // data
                  BplistReader.handleData(i, marker, reader, objects);
                    break;
                case 0x01:    // int
                  BplistReader.handleInt(i, marker, reader, objects);
                    break;
                default:
                    throw new Error("Un-handled objectFormat encountered");
            }
        }

        return new PropertyListResults(objects, trailer);
    }

    private static  handleInt( objectIndex:number,  marker:number,   reader:SequentialByteArrayReader,  objects:Array<Object>) :void
    {
        let objectSize:number = Math.pow(2, (marker & 0x0F));
        if (objectSize == 1) {
            objects.push(objects.splice(objectIndex, 0,reader.getByte()));
        } else if (objectSize == 2) {
            objects.push(objects.splice(objectIndex, 0,reader.getUInt16()));
        } else if (objectSize == 4) {
            objects.push(objects.splice(objectIndex,0, reader.getUInt32()));
        } else if (objectSize == 8) {
            objects.push(objects.splice(objectIndex,0, reader.getInt64()));
        }
    }

    private static  handleDict( objectIndex:number, marker:number,   reader:SequentialByteArrayReader,objects:Array<Object>) :void
    {
        // Using linked map preserves the key order
        let map:Map<number,number> = new Map();
        let dictEntries:number = marker & 0x0F;
        let keyRefs:number[]= new Number[dictEntries];

        for (let j = 0; j < dictEntries; j++) {
            keyRefs[j] = reader.getByte();
        }
        for (let j = 0; j < dictEntries; j++) {
            map.set(keyRefs[j], reader.getByte());
        }

        objects.push(objects.splice(objectIndex,0, map));
    }

    private static  handleData( objectIndex:number,  marker:number, reader:SequentialByteArrayReader, objects:Array<Object>) :void
    {
        let byteCount = marker & 0x0F;
        if (byteCount == 0x0F) {
            let sizeMarker = reader.getByte();
            if ((sizeMarker >> 4 & 0x0F) != 1) {
                throw new Error("Invalid size marker");
            }

            let objectSizeWidth = Math.pow(2, sizeMarker & 0x0F);
            if (objectSizeWidth == 1) {
                byteCount = reader.getInt8();
            } else if (objectSizeWidth == 2) {
                byteCount = reader.getUInt16();
            }
        }

        objects.push(objects.splice(objectIndex, 0,reader.getBytes(byteCount)));
    }


    /**
     * Given a full byte array containing the BPLIST, read the trailer object from the end
     * of the array. 5 unused bytes and 1 sort version are skipped.
     *
     * @param bplist The BPLIST binary array.
     * @return Returns the <tt>Trailer</tt> object with values parsed from the array.
     * @throws IOException
     */
    private static  readTrailer(bplist : Int8Array):Trailer
    {
        let reader:SequentialByteArrayReader = new SequentialByteArrayReader(bplist, bplist.length - Trailer.STRUCT_SIZE);
        reader.skip(5);    // Skip the 5-byte _unused values
        reader.skip(1);    // Skip 1-byte sort version

        let  trailer:Trailer = new Trailer();
        trailer.setOffsetIntSize(reader.getByte());
        trailer.set0bjectRefSize(reader.getByte());
        trailer.setNumObjects(reader.getInt64())
        trailer.setTopObject(reader.getInt64());
        trailer.setOffsetTableOffset(reader.getInt64());

        return trailer;
    }
}