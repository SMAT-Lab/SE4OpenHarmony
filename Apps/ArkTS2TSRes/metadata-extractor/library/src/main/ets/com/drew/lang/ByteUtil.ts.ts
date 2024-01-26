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
class ByteUtil {
    public static getInt16(buffer: Int8Array, offset: number, bigEndian: boolean): number {
        if (bigEndian) {
            return ((buffer[offset] & 0xFF) << 8) |
                ((buffer[offset + 1] & 0xFF));
        }
        else {
            return ((buffer[offset] & 0xFF)) |
                ((buffer[offset + 1] & 0xFF) << 8);
        }
    }
    public static getInt32(buffer: Int8Array, offset: number, bigEndian: boolean): number {
        if (bigEndian) {
            return ((buffer[offset] & 0xFF) << 24) |
                ((buffer[offset + 1] & 0xFF) << 16) |
                ((buffer[offset + 2] & 0xFF) << 8) |
                ((buffer[offset + 3] & 0xFF));
        }
        else {
            return ((buffer[offset] & 0xFF)) |
                ((buffer[offset + 1] & 0xFF) << 8) |
                ((buffer[offset + 2] & 0xFF) << 16) |
                ((buffer[offset + 3] & 0xFF) << 24);
        }
    }
    public static getLong64(buffer: Int8Array, offset: number, bigEndian: boolean): number {
        if (bigEndian) {
            return ((buffer[offset] & 0xFF) << 56) |
                ((buffer[offset + 1] & 0xFF) << 48) |
                ((buffer[offset + 2] & 0xFF) << 40) |
                ((buffer[offset + 3] & 0xFF) << 32) |
                ((buffer[offset + 4] & 0xFF) << 24) |
                ((buffer[offset + 5] & 0xFF) << 16) |
                ((buffer[offset + 6] & 0xFF) << 8) |
                ((buffer[offset + 7] & 0xFF));
        }
        else {
            return ((buffer[offset] & 0xFF)) |
                ((buffer[offset + 1] & 0xFF) << 8) |
                ((buffer[offset + 2] & 0xFF) << 16) |
                ((buffer[offset + 3] & 0xFF) << 24) |
                ((buffer[offset + 4] & 0xFF) << 32) |
                ((buffer[offset + 5] & 0xFF) << 40) |
                ((buffer[offset + 6] & 0xFF) << 48) |
                ((buffer[offset + 7] & 0xFF) << 56);
        }
    }
}
export default ByteUtil;
