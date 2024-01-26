/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import OneDimensionalCodeWriter from './OneDimensionalCodeWriter';
import { int } from '../../customTypings';
import EncodeHintType from '../EncodeHintType';
export default class UPCEANWriter extends OneDimensionalCodeWriter {
    // @Override
    public getDefaultMargin(): int {
        // Use a different default more appropriate for UPC/EAN
        return 9;
    }
    encodeCode(contents: String, hints: Map<EncodeHintType, any>): boolean[] {
        return [];
    }
}
