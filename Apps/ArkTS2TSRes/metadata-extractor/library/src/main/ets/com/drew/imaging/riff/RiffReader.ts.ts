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
import RiffHandler from './RiffHandler';
import SequentialReader from '../../lang/SequentialReader';
import StringValue from '../../metadata/StringValue';
class RiffReader {
    /**
     * Processes a RIFF data sequence.
     *
     * @param reader the {@link SequentialReader} from which the data should be read
     * @param handler the {@link RiffHandler} that will coordinate processing and accept read values
     * @throws RiffProcessingException if an error occurred during the processing of RIFF data that could not be
     *                                 ignored or recovered from
     * @throws IOException an error occurred while accessing the required data
     */
    public processRiff(reader: SequentialReader, handler: RiffHandler): void {
        // RIFF files are always little-endian
        reader.setMotorolaByteOrder(false);
        // PROCESS FILE HEADER
        let fileFourCC: string = reader.getString(4);
        if (fileFourCC != "RIFF")
            throw new Error("Invalid RIFF header: " + fileFourCC);
        // The total size of the chunks that follow plus 4 bytes for the FourCC
        let fileSize: number = reader.getInt32();
        let sizeLeft: number = fileSize;
        let identifier: string = reader.getString(4);
        sizeLeft -= 4;
        if (!handler.shouldAcceptRiffIdentifier(identifier))
            return;
        // PROCESS CHUNKS
        this.processChunks(reader, sizeLeft, handler);
    }
    public processChunks(reader: SequentialReader, sectionSize: number, handler: RiffHandler): void {
        while (reader.getPosition() < sectionSize) {
            let fourCC: string = StringValue.Int8Array2String(reader.getBytes(4), 'utf-8');
            let size: number = reader.getInt32();
            if (fourCC == "LIST" || fourCC == "RIFF") {
                let listName: string = StringValue.Int8Array2String(reader.getBytes(4), 'utf-8');
                if (handler.shouldAcceptList(listName)) {
                    this.processChunks(reader, size - 4, handler);
                }
                else {
                    reader.skip(size - 4);
                }
            }
            else if (fourCC == "IDIT") {
                // Avi DateTimeOriginal
                handler.processChunk(fourCC, reader.getBytes(size - 2));
                reader.skip(2); // ?0A 00?
            }
            else {
                if (handler.shouldAcceptChunk(fourCC)) {
                    handler.processChunk(fourCC, reader.getBytes(size));
                }
                else {
                    reader.skip(size);
                }
                // Bytes read must be even - skip one if not
                if ((size & 1) == 1) {
                    reader.skip(1);
                }
            }
        }
    }
}
export default RiffReader;
