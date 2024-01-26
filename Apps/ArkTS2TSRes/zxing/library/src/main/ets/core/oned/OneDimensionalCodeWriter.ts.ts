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
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.EncodeHintType;
// import com.google.zxing.Writer;
// import com.google.zxing.common.BitMatrix;
//
// import java.util.Collection;
// import java.util.Map;
// import java.util.regex.Pattern;
import BarcodeFormat from '../BarcodeFormat';
import EncodeHintType from '../EncodeHintType';
import Writer from '../Writer';
import BitMatrix from '../common/BitMatrix';
import { Pattern } from '../util/Pattern';
import { Collection, int } from '../../customTypings';
import Integer from '../util/Integer';
import IllegalArgumentException from '../IllegalArgumentException';
import StringUtils from '../common/StringUtils';
/**
 * <p>Encapsulates functionality and implementation that is common to one-dimensional barcodes.</p>
 *
 * @author dsbnatut@gmail.com (Kazuki Nishiura)
 */
export default /*public */ abstract class OneDimensionalCodeWriter implements Writer {
    private static NUMERIC: Pattern = Pattern.compile('^[0-9]*$');
    /**
     * Encode the contents to boolean array expression of one-dimensional barcode.
     * Start code and end code should be included in result, and side margins should not be included.
     *
     * @param contents barcode contents to encode
     * @return a {@code boolean[]} of horizontal pixels (false = white, true = black)
     */
    public abstract encodeCode(contents: string, hints: Map<EncodeHintType, any>): boolean[];
    /**
     * Encode the contents following specified format.
     * {@code width} and {@code height} are required size. This method may return bigger size
     * {@code BitMatrix} when specified size is too small. The user can set both {@code width} and
     * {@code height} to zero to get minimum size barcode. If negative value is set to {@code width}
     * or {@code height}, {@code IllegalArgumentException} is thrown.
     */
    // @Override
    public encode(contents: string, format: BarcodeFormat, width: int, height: int, hints: Map<EncodeHintType, any>): BitMatrix {
        if (StringUtils.isEmpty(contents)) {
            throw new IllegalArgumentException('Found empty contents');
        }
        if (width < 0 || height < 0) {
            throw new IllegalArgumentException('Negative size is not allowed. Input: '
                + width + 'x' + height);
        }
        let supportedFormats: Collection<BarcodeFormat> = this.getSupportedWriteFormats();
        if (supportedFormats != null && !this.includes(supportedFormats, format)) {
            throw new IllegalArgumentException('Can only encode ' + supportedFormats +
                ', but got ' + format);
        }
        let sidesMargin: int = this.getDefaultMargin();
        if (hints != null && hints.has(EncodeHintType.MARGIN)) {
            sidesMargin = Integer.parse(hints.get(EncodeHintType.MARGIN).toString());
        }
        let code: boolean[] = this.encodeCode(contents, hints);
        return OneDimensionalCodeWriter.renderResult(code, width, height, sidesMargin);
    }
    protected getSupportedWriteFormats(): Collection<BarcodeFormat> {
        return null;
    }
    /**
     * @return a byte array of horizontal pixels (0 = white, 1 = black)
     */
    private static renderResult(code: boolean[], width: int, height: int, sidesMargin: int): BitMatrix {
        let inputWidth: int = code.length;
        // Add quiet zone on both sides.
        let fullWidth: int = inputWidth + sidesMargin;
        let outputWidth: int = Math.max(width, fullWidth);
        let outputHeight: int = Math.max(1, height);
        let multiple: int = Math.trunc(outputWidth / fullWidth);
        let leftPadding: int = Math.trunc((outputWidth - (inputWidth * multiple)) / 2);
        let output: BitMatrix = new BitMatrix(outputWidth, outputHeight);
        for (let inputX: int = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
            if (code[inputX]) {
                output.setRegion(outputX, 0, multiple, outputHeight);
            }
        }
        return output;
    }
    /**
     * @param contents string to check for numeric characters
     * @throws IllegalArgumentException if input contains characters other than digits 0-9.
     */
    protected static checkNumeric(contents: string) {
        if (!OneDimensionalCodeWriter.NUMERIC.test(contents)) {
            throw new IllegalArgumentException('Input should only contain digits 0-9');
        }
    }
    /**
     * @param target encode black/white pattern into this array
     * @param pos position to start encoding at in {@code target}
     * @param pattern lengths of black/white runs to encode
     * @param startColor starting color - false for white, true for black
     * @return the int of elements added to target.
     */
    protected static appendPattern(target: boolean[], pos: int, pattern: Int32Array, startColor: boolean): int {
        let color: boolean = startColor;
        let numAdded: int = 0;
        for (let len of pattern) {
            for (let j = 0; j < len; j++) {
                target[pos++] = color;
            }
            numAdded += len;
            color = !color; // flip color after each segment
        }
        return numAdded;
    }
    public getDefaultMargin(): int {
        // CodaBar spec requires a side margin to be more than ten times wider than narrow space.
        // This seems like a decent idea for a default for all formats.
        return 10;
    }
    private includes(array, item) {
        return array.indexOf(item) !== -1;
    }
}
