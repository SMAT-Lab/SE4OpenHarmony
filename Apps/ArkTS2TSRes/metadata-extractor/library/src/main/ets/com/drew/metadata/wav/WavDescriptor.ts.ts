/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import WavDirectory from './WavDirectory';
import TagDescriptor from '../TagDescriptor';
class WavDescriptor extends TagDescriptor<WavDirectory> {
    public constructor(directory: WavDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case WavDirectory.TAG_FORMAT:
                return this._directory.getString(WavDirectory.TAG_FORMAT);
            case WavDirectory.TAG_CHANNELS:
                return this._directory.getInt(WavDirectory.TAG_CHANNELS);
            case WavDirectory.TAG_SAMPLES_PER_SEC:
                return this._directory.getInt(WavDirectory.TAG_SAMPLES_PER_SEC);
            case WavDirectory.TAG_BYTES_PER_SEC:
                return this._directory.getInt(WavDirectory.TAG_BYTES_PER_SEC);
            case WavDirectory.TAG_BLOCK_ALIGNMENT:
                return this._directory.getInt(WavDirectory.TAG_BLOCK_ALIGNMENT);
            case WavDirectory.TAG_DURATION:
                return this._directory.getString(WavDirectory.TAG_DURATION);
            case WavDirectory.TAG_FORMAT:
                return this._directory.getString(WavDirectory.TAG_FORMAT);
            default:
                return super.getDescription(tagType);
        }
    }
}
export default WavDescriptor;
