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
// package com.google.zxing.datamatrix.encoder;
/*final*/
import C40Encoder from './C40Encoder';
import HighLevelEncoder from './HighLevelEncoder';
import { char, int } from '../../../customTypings';
import StringBuilder from '../../util/StringBuilder';
import StringUtils from '../../common/StringUtils';
export default class TextEncoder extends C40Encoder {
    // @Override
    public getEncodingMode(): int {
        return HighLevelEncoder.TEXT_ENCODATION;
    }
    // @Override
    encodeChar(c: char, sb: StringBuilder): int {
        if (c === StringUtils.getCharCode(' ')) {
            sb.append('\u0003');
            return 1;
        }
        if (c >= StringUtils.getCharCode('0') && c <= StringUtils.getCharCode('9')) {
            sb.append(/*(char)*/ (c - 48 + 4));
            return 1;
        }
        if (c >= StringUtils.getCharCode('a') && c <= StringUtils.getCharCode('z')) {
            sb.append(/*(char)*/ (c - 97 + 14));
            return 1;
        }
        if (c < StringUtils.getCharCode(' ')) {
            sb.append('\u0000'); // Shift 1 Set
            sb.append(c);
            return 2;
        }
        if (c <= StringUtils.getCharCode('/')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 33));
            return 2;
        }
        if (c <= StringUtils.getCharCode('@')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 58 + 15));
            return 2;
        }
        if (c >= StringUtils.getCharCode('[') && c <= StringUtils.getCharCode('_')) {
            sb.append('\u0001'); // Shift 2 Set
            sb.append(/*(char)*/ (c - 91 + 22));
            return 2;
        }
        if (c === StringUtils.getCharCode('`')) {
            sb.append('\u0002'); // Shift 3 Set
            sb.append(/*(char)*/ 0); // '`' - 96 == 0
            return 2;
        }
        if (c <= StringUtils.getCharCode('Z')) {
            sb.append('\u0002'); // Shift 3 Set
            sb.append(/*(char)*/ (c - 65 + 1));
            return 2;
        }
        if (c <= 127) {
            sb.append('\u0002'); // Shift 3 Set
            sb.append(/*(char)*/ (c - 123 + 27));
            return 2;
        }
        sb.append('\u0001\u001e'); // Shift 2, Upper Shift
        let len: int = 2;
        len += this.encodeChar(/*(char)*/ (c - 128), sb);
        return len;
    }
}
