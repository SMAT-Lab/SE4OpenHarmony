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

import StringUtil from '../../lang/StringUtil';
import { IptcDirectory } from './IptcDirectory';
import TagDescriptor from '../TagDescriptor';

export class IptcDescriptor extends TagDescriptor<IptcDirectory> {
  constructor(directory: IptcDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string{
    switch (tagType) {
      case IptcDirectory.TAG_DATE_CREATED:
        return this.getDateCreatedDescription();
      case IptcDirectory.TAG_DIGITAL_DATE_CREATED:
        return this.getDigitalDateCreatedDescription();
      case IptcDirectory.TAG_DATE_SENT:
        return this.getDateSentDescription();
      case IptcDirectory.TAG_EXPIRATION_DATE:
        return this.getExpirationDateDescription();
      case IptcDirectory.TAG_EXPIRATION_TIME:
        return this.getExpirationTimeDescription();
      case IptcDirectory.TAG_FILE_FORMAT:
        return this.getFileFormatDescription();
      case IptcDirectory.TAG_KEYWORDS:
        return this.getKeywordsDescription();
      case IptcDirectory.TAG_REFERENCE_DATE:
        return this.getReferenceDateDescription();
      case IptcDirectory.TAG_RELEASE_DATE:
        return this.getReleaseDateDescription();
      case IptcDirectory.TAG_RELEASE_TIME:
        return this.getReleaseTimeDescription();
      case IptcDirectory.TAG_TIME_CREATED:
        return this.getTimeCreatedDescription();
      case IptcDirectory.TAG_DIGITAL_TIME_CREATED:
        return this.getDigitalTimeCreatedDescription();
      case IptcDirectory.TAG_TIME_SENT:
        return this.getTimeSentDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getDateDescription(tagType: number): string{
    let s = this._directory.getString(tagType);
    if (s == null)
    return null;
    if (s.length == 8)
    return s.substring(0, 4) + ':' + s.substring(4, 6) + ':' + s.substring(6);
    return s;
  }

  public getTimeDescription(tagType: number): string{
    let s = this._directory.getString(tagType);
    if (s == null)
    return null;
    if (s.length == 6 || s.length == 11)
    return s.substring(0, 2) + ':' + s.substring(2, 4) + ':' + s.substring(4);
    return s;
  }

  public getFileFormatDescription(): string{
    let value = this._directory.getInteger(IptcDirectory.TAG_FILE_FORMAT);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "No ObjectData";
      case 1:
        return "IPTC-NAA Digital Newsphoto Parameter Record";
      case 2:
        return "IPTC7901 Recommended Message Format";
      case 3:
        return "Tagged Image File Format (Adobe/Aldus Image data)";
      case 4:
        return "Illustrator (Adobe Graphics data)";
      case 5:
        return "AppleSingle (Apple Computer Inc)";
      case 6:
        return "NAA 89-3 (ANPA 1312)";
      case 7:
        return "MacBinary II";
      case 8:
        return "IPTC Unstructured Character Oriented File Format (UCOFF)";
      case 9:
        return "United Press International ANPA 1312 variant";
      case 10:
        return "United Press International Down-Load Message";
      case 11:
        return "JPEG File Interchange (JFIF)";
      case 12:
        return "Photo-CD Image-Pac (Eastman Kodak)";
      case 13:
        return "Bit Mapped Graphics File [.BMP] (Microsoft)";
      case 14:
        return "Digital Audio File [.WAV] (Microsoft & Creative Labs)";
      case 15:
        return "Audio plus Moving Video [.AVI] (Microsoft)";
      case 16:
        return "PC DOS/Windows Executable Files [.COM][.EXE]";
      case 17:
        return "Compressed Binary File [.ZIP] (PKWare Inc)";
      case 18:
        return "Audio Interchange File Format AIFF (Apple Computer Inc)";
      case 19:
        return "RIFF Wave (Microsoft Corporation)";
      case 20:
        return "Freehand (Macromedia/Aldus)";
      case 21:
        return "Hypertext Markup Language [.HTML] (The Internet Society)";
      case 22:
        return "MPEG 2 Audio Layer 2 (Musicom), ISO/IEC";
      case 23:
        return "MPEG 2 Audio Layer 3, ISO/IEC";
      case 24:
        return "Portable Document File [.PDF] Adobe";
      case 25:
        return "News Industry Text Format (NITF)";
      case 26:
        return "Tape Archive [.TAR]";
      case 27:
        return "Tidningarnas Telegrambyra NITF version (TTNITF DTD)";
      case 28:
        return "Ritzaus Bureau NITF version (RBNITF DTD)";
      case 29:
        return "Corel Draw [.CDR]";
    }
    return "" + value
  }

  public getByLineDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_BY_LINE);
  }

  public getByLineTitleDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_BY_LINE_TITLE);
  }

  public getCaptionDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_CAPTION);
  }

  public getCategoryDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_CATEGORY);
  }

  public getCityDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_CITY);
  }

  public getCopyrightNoticeDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_COPYRIGHT_NOTICE);
  }

  public getCountryOrPrimaryLocationDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_COUNTRY_OR_PRIMARY_LOCATION_NAME);
  }

  public getCreditDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_CREDIT);
  }

  public getDateCreatedDescription(): string {
    return this.getDateDescription(IptcDirectory.TAG_DATE_CREATED);
  }

  public getDigitalDateCreatedDescription(): string{
    return this.getDateDescription(IptcDirectory.TAG_DIGITAL_DATE_CREATED);
  }

  public getDateSentDescription(): string{
    return this.getDateDescription(IptcDirectory.TAG_DATE_SENT);
  }

  public getExpirationDateDescription(): string{
    return this.getDateDescription(IptcDirectory.TAG_EXPIRATION_DATE);
  }

  public getExpirationTimeDescription(): string{
    return this.getTimeDescription(IptcDirectory.TAG_EXPIRATION_TIME);
  }

  public getHeadlineDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_HEADLINE);
  }

  public getKeywordsDescription(): string{
    let keywords = this._directory.getStringArray(IptcDirectory.TAG_KEYWORDS);
    if (keywords == null)
    return null;
    return StringUtil.join(keywords, ";");
  }

  public getObjectNameDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_OBJECT_NAME);
  }

  public getOriginalTransmissionReferenceDescription(): string {
    return this._directory.getString(IptcDirectory.TAG_ORIGINAL_TRANSMISSION_REFERENCE);
  }

  public getOriginatingProgramDescription() {
    return this._directory.getString(IptcDirectory.TAG_ORIGINATING_PROGRAM);
  }

  public getProvinceOrStateDescription() {
    return this._directory.getString(IptcDirectory.TAG_PROVINCE_OR_STATE);
  }

  public getRecordVersionDescription() {
    return this._directory.getString(IptcDirectory.TAG_APPLICATION_RECORD_VERSION);
  }

  public getReferenceDateDescription() {
    return this.getDateDescription(IptcDirectory.TAG_REFERENCE_DATE);
  }

  public getReleaseDateDescription() {
    return this.getDateDescription(IptcDirectory.TAG_RELEASE_DATE);
  }

  public getReleaseTimeDescription(): string{
    return this.getTimeDescription(IptcDirectory.TAG_RELEASE_TIME);
  }

  public getSourceDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_SOURCE);
  }

  public getSpecialInstructionsDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_SPECIAL_INSTRUCTIONS);
  }

  public getSupplementalCategoriesDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_SUPPLEMENTAL_CATEGORIES);
  }

  public getTimeCreatedDescription(): string{
    return this.getTimeDescription(IptcDirectory.TAG_TIME_CREATED);
  }

  public getDigitalTimeCreatedDescription(): string{
    return this.getTimeDescription(IptcDirectory.TAG_DIGITAL_TIME_CREATED);
  }

  public getTimeSentDescription(): string{
    return this.getTimeDescription(IptcDirectory.TAG_TIME_SENT);
  }

  public getUrgencyDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_URGENCY);
  }

  public getWriterDescription(): string{
    return this._directory.getString(IptcDirectory.TAG_CAPTION_WRITER);
  }
}