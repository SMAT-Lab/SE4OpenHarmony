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
interface RiffHandler {
    /**
     * Gets whether the specified RIFF identifier is of interest to this handler.
     * Returning <code>false</code> causes processing to stop after reading only
     * the first twelve bytes of data.
     *
     * @param identifier The four character code identifying the type of RIFF data
     * @return true if processing should continue, otherwise false
     */
    shouldAcceptRiffIdentifier(identifier: string): boolean;
    /**
     * Gets whether this handler is interested in the specific chunk type.
     * Returns <code>true</code> if the data should be copied into an array and passed
     * to {@link RiffHandler#processChunk(String, byte[])}, or <code>false</code> to avoid
     * the copy and skip to the next chunk in the file, if any.
     *
     * @param fourCC the four character code of this chunk
     * @return true if {@link RiffHandler#processChunk(String, byte[])} should be called, otherwise false
     */
    shouldAcceptChunk(fourCC: string): boolean;
    /**
     * Gets whether this handler is interested in the specific list type.
     * Returns <code>true</code> if the chunks should continue being processed,
     * or <code>false</code> to avoid any unknown chunks within the list.
     *
     * @param fourCC the four character code of this chunk
     * @return true if {@link RiffHandler#processChunk(String, byte[])} should be called, otherwise false
     */
    shouldAcceptList(fourCC: string): boolean;
    /**
     * Perform whatever processing is necessary for the type of chunk with its
     * payload.
     *
     * This is only called if a previous call to {@link RiffHandler#shouldAcceptChunk(String)}
     * with the same <code>fourCC</code> returned <code>true</code>.
     *
     * @param fourCC the four character code of the chunk
     * @param payload they payload of the chunk as a byte array
     */
    processChunk(fourCC: string, payload: ArrayBuffer): void;
}
export default RiffHandler;
