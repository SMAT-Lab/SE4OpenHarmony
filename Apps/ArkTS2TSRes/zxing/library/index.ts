let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
export { ArgumentException, ArithmeticException, ChecksumException, Exception, FormatException, IllegalArgumentException, IllegalStateException, NotFoundException, ReaderException, ReedSolomonException, UnsupportedOperationException, WriterException, BarcodeFormat, Binarizer, BinaryBitmap, DecodeHintType, InvertedLuminanceSource, LuminanceSource, MultiFormatReader, MultiFormatWriter, PlanarYUVLuminanceSource, Reader, Result, ResultMetadataType, ResultPointCallback, RGBLuminanceSource, Writer, ResultPoint, ZXingSystem, ZXingStringBuilder, ZXingStringEncoding, ZXingCharset, ZXingArrays, ZXingStandardCharsets, ZXingInteger, BitArray, BitMatrix, BitSource, CharacterSetECI, DecoderResult, DefaultGridSampler, DetectorResult, EncodeHintType, GlobalHistogramBinarizer, GridSampler, GridSamplerInstance, HybridBinarizer, PerspectiveTransform, StringUtils, MathUtils, WhiteRectangleDetector, GenericGF, GenericGFPoly, ReedSolomonDecoder, ReedSolomonEncoder, DataMatrixReader, DataMatrixWriter, SymbolShapeHint, DataMatrixDecodedBitStreamParser, PDF417Reader, PDF417Writer, PDF417ResultMetadata, PDF417DecodedBitStreamParser, PDF417DecoderErrorCorrection, QRCodeReader, QRCodeWriter, QRCodeDecoderErrorCorrectionLevel, QRCodeDecoderFormatInformation, QRCodeVersion, QRCodeMode, QRCodeDecodedBitStreamParser, QRCodeDataMask, QRCodeEncoder, QRCodeEncoderQRCode, QRCodeMatrixUtil, QRCodeByteMatrix, QRCodeMaskUtil, AztecCodeReader, AztecCodeWriter, AztecDetectorResult, AztecEncoder, AztecHighLevelEncoder, AztecCode, AztecDecoder, AztecDetector, AztecPoint, OneDReader, EAN13Reader, Code128Reader, ITFReader, ITFWriter, Code39Reader, Code39Writer, RSS14Reader, RSSExpandedReader, AbstractExpandedDecoder, createAbstractExpandedDecoder, MultiFormatOneDReader, UPCEWriter, EAN13Writer, UPCAWriter, UPCEReader, MaxiCodeReader, Code93Reader, Code93Writer, CodaBarWriter, CodaBarReader, CameraView, CameraService, GlobalContext } from './src/main/ets/index';
