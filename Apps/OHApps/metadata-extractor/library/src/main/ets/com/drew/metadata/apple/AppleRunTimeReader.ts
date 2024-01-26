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

import Directory from '../Directory'
import Metadata from '../Metadata'
import AppleMakernoteDirectory from '../exif/makernotes/AppleMakernoteDirectory'
import AppleRunTimeMakernoteDirectory from '../exif/makernotes/AppleRunTimeMakernoteDirectory'
import BplistReader from '../plist/BplistReader'
import PropertyListResults from '../plist/PropertyListResults'


export default class AppleRunTimeReader {

 public  extract(bytes: Int8Array,   metadata:Metadata,   parentDirectory:Directory):void
    {
        parentDirectory.setByteArray(AppleMakernoteDirectory.TAG_RUN_TIME, bytes);

        if (!BplistReader.isValid(bytes)) {
        	parentDirectory.addError("Input array is not a bplist");
        	return;
        }

        let directory = new AppleRunTimeMakernoteDirectory();
        directory.setParent(parentDirectory);

        try {
            AppleRunTimeReader.processAppleRunTime(directory, bytes);

            if (directory.getTagCount() > 0) {
                metadata.addDirectory(directory);
            }
        } catch (error) {

            parentDirectory.addError("Error processing TAG_RUN_TIME: " + JSON.stringify(error));
        }
    }

    /**
     * Process the BPLIST containing the RUN_TIME tag. The directory will only be populated with values
     * if the <tt>flag</tt> indicates that the CMTime structure is &quot;valid&quot;.
     *
     * @param directory The <tt>AppleRunTimeMakernoteDirectory</tt> to set values onto.
     * @param bplist The BPLIST
     * @throws IOException Thrown if an error occurs parsing the BPLIST as a CMTime structure.
     */
    private static  processAppleRunTime(  directory:AppleRunTimeMakernoteDirectory, bplist:Int8Array): void
    {
        let  results:PropertyListResults = BplistReader.parse(bplist);

        let  entrySet:Set<Map<number,number>> = results.getEntrySet();

        if (entrySet != null) {
            let values:Map<String, Object> = new Map<String, Object>();

            entrySet.forEach((value1,value2,SET)=>{
              value1.forEach((v,k,map)=>{
                let key = results.getObjects().indexOf(k,0).toString();
                let value = results.getObjects().indexOf(v,0);
                values.set(key, value);
              })

            })

            // https://developer.apple.com/documentation/coremedia/cmtime-u58

            let flags:number = parseInt(values.get("flags").toString());

            if ((flags & 0x1) == 0x1) {
                directory.setInt(AppleRunTimeMakernoteDirectory.CMTimeFlags, flags);
                directory.setInt(AppleRunTimeMakernoteDirectory.CMTimeEpoch, parseInt(values.get("epoch").toString()));
                directory.setLong(AppleRunTimeMakernoteDirectory.CMTimeScale, parseInt(values.get("timescale").toString()));
                directory.setLong(AppleRunTimeMakernoteDirectory.CMTimeValue, parseInt(values.get("value").toString()));
            }
        }
    }
}