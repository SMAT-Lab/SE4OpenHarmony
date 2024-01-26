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

import { IptcDescriptor } from './IptcDescriptor';
import Directory from '../Directory';

export class IptcDirectory extends Directory {
  public static TAG_ENVELOPE_RECORD_VERSION             = 0x0100
  public static TAG_DESTINATION                         = 0x0105
  public static TAG_FILE_FORMAT                         = 0x0114
  public static TAG_FILE_VERSION                        = 0x0116
  public static TAG_SERVICE_ID                          = 0x011E
  public static TAG_ENVELOPE_NUMBER                     = 0x0128
  public static TAG_PRODUCT_ID                          = 0x0132
  public static TAG_ENVELOPE_PRIORITY                   = 0x013C
  public static TAG_DATE_SENT                           = 0x0146
  public static TAG_TIME_SENT                           = 0x0150
  public static TAG_CODED_CHARACTER_SET                 = 0x015A
  public static TAG_UNIQUE_OBJECT_NAME                  = 0x0164
  public static TAG_ARM_IDENTIFIER                      = 0x0178
  public static TAG_ARM_VERSION                         = 0x017a
  public static TAG_APPLICATION_RECORD_VERSION          = 0x0200
  public static TAG_OBJECT_TYPE_REFERENCE               = 0x0203
  public static TAG_OBJECT_ATTRIBUTE_REFERENCE          = 0x0204
  public static TAG_OBJECT_NAME                         = 0x0205
  public static TAG_EDIT_STATUS                         = 0x0207
  public static TAG_EDITORIAL_UPDATE                    = 0x0208
  public static TAG_URGENCY                             = 0X020A
  public static TAG_SUBJECT_REFERENCE                   = 0X020C
  public static TAG_CATEGORY                            = 0x020F
  public static TAG_SUPPLEMENTAL_CATEGORIES             = 0x0214
  public static TAG_FIXTURE_ID                          = 0x0216
  public static TAG_KEYWORDS                            = 0x0219
  public static TAG_CONTENT_LOCATION_CODE               = 0x021A
  public static TAG_CONTENT_LOCATION_NAME               = 0x021B
  public static TAG_RELEASE_DATE                        = 0X021E
  public static TAG_RELEASE_TIME                        = 0x0223
  public static TAG_EXPIRATION_DATE                     = 0x0225
  public static TAG_EXPIRATION_TIME                     = 0x0226
  public static TAG_SPECIAL_INSTRUCTIONS                = 0x0228
  public static TAG_ACTION_ADVISED                      = 0x022A
  public static TAG_REFERENCE_SERVICE                   = 0x022D
  public static TAG_REFERENCE_DATE                      = 0x022F
  public static TAG_REFERENCE_NUMBER                    = 0x0232
  public static TAG_DATE_CREATED                        = 0x0237
  public static TAG_TIME_CREATED                        = 0X023C
  public static TAG_DIGITAL_DATE_CREATED                = 0x023E
  public static TAG_DIGITAL_TIME_CREATED                = 0x023F
  public static TAG_ORIGINATING_PROGRAM                 = 0x0241
  public static TAG_PROGRAM_VERSION                     = 0x0246
  public static TAG_OBJECT_CYCLE                        = 0x024B
  public static TAG_BY_LINE                             = 0x0250
  public static TAG_BY_LINE_TITLE                       = 0x0255
  public static TAG_CITY                                = 0x025A
  public static TAG_SUB_LOCATION                        = 0x025C
  public static TAG_PROVINCE_OR_STATE                   = 0x025F
  public static TAG_COUNTRY_OR_PRIMARY_LOCATION_CODE    = 0x0264
  public static TAG_COUNTRY_OR_PRIMARY_LOCATION_NAME    = 0x0265
  public static TAG_ORIGINAL_TRANSMISSION_REFERENCE     = 0x0267
  public static TAG_HEADLINE                            = 0x0269
  public static TAG_CREDIT                              = 0x026E
  public static TAG_SOURCE                              = 0x0273
  public static TAG_COPYRIGHT_NOTICE                    = 0x0274
  public static TAG_CONTACT                             = 0x0276
  public static TAG_CAPTION                             = 0x0278
  public static TAG_LOCAL_CAPTION                       = 0x0279
  public static TAG_CAPTION_WRITER                      = 0x027A
  public static TAG_RASTERIZED_CAPTION                  = 0x027D
  public static TAG_IMAGE_TYPE                          = 0x0282
  public static TAG_IMAGE_ORIENTATION                   = 0x0283
  public static TAG_LANGUAGE_IDENTIFIER                 = 0x0287
  public static TAG_AUDIO_TYPE                          = 0x0296
  public static TAG_AUDIO_SAMPLING_RATE                 = 0x0297
  public static TAG_AUDIO_SAMPLING_RESOLUTION           = 0x0298
  public static TAG_AUDIO_DURATION                      = 0x0299
  public static TAG_AUDIO_OUTCUE                        = 0x029A
  public static TAG_JOB_ID                              = 0x02B8
  public static TAG_MASTER_DOCUMENT_ID                  = 0x02B9
  public static TAG_SHORT_DOCUMENT_ID                   = 0x02BA
  public static TAG_UNIQUE_DOCUMENT_ID                  = 0x02BB
  public static TAG_OWNER_ID                            = 0x02BC
  public static TAG_OBJECT_PREVIEW_FILE_FORMAT          = 0x02C8
  public static TAG_OBJECT_PREVIEW_FILE_FORMAT_VERSION  = 0x02C9
  public static TAG_OBJECT_PREVIEW_DATA                 = 0x02CA

  private static _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(IptcDirectory.TAG_ENVELOPE_RECORD_VERSION, "Enveloped Record Version")
    .set(IptcDirectory.TAG_DESTINATION, "Destination")
    .set(IptcDirectory.TAG_FILE_FORMAT, "File Format")
    .set(IptcDirectory.TAG_FILE_VERSION, "File Version")
    .set(IptcDirectory.TAG_SERVICE_ID, "Service Identifier")
    .set(IptcDirectory.TAG_ENVELOPE_NUMBER, "Envelope Number")
    .set(IptcDirectory.TAG_PRODUCT_ID, "Product Identifier")
    .set(IptcDirectory.TAG_ENVELOPE_PRIORITY, "Envelope Priority")
    .set(IptcDirectory.TAG_DATE_SENT, "Date Sent")
    .set(IptcDirectory.TAG_TIME_SENT, "Time Sent")
    .set(IptcDirectory.TAG_CODED_CHARACTER_SET, "Coded Character Set")
    .set(IptcDirectory.TAG_UNIQUE_OBJECT_NAME, "Unique Object Name")
    .set(IptcDirectory.TAG_ARM_IDENTIFIER, "ARM Identifier")
    .set(IptcDirectory.TAG_ARM_VERSION, "ARM Version")
    .set(IptcDirectory.TAG_APPLICATION_RECORD_VERSION, "Application Record Version")
    .set(IptcDirectory.TAG_OBJECT_TYPE_REFERENCE, "Object Type Reference")
    .set(IptcDirectory.TAG_OBJECT_ATTRIBUTE_REFERENCE, "Object Attribute Reference")
    .set(IptcDirectory.TAG_OBJECT_NAME, "Object Name")
    .set(IptcDirectory.TAG_EDIT_STATUS, "Edit Status")
    .set(IptcDirectory.TAG_EDITORIAL_UPDATE, "Editorial Update")
    .set(IptcDirectory.TAG_URGENCY, "Urgency")
    .set(IptcDirectory.TAG_SUBJECT_REFERENCE, "Subject Reference")
    .set(IptcDirectory.TAG_CATEGORY, "Category")
    .set(IptcDirectory.TAG_SUPPLEMENTAL_CATEGORIES, "Supplemental Category(s)")
    .set(IptcDirectory.TAG_FIXTURE_ID, "Fixture Identifier")
    .set(IptcDirectory.TAG_KEYWORDS, "Keywords")
    .set(IptcDirectory.TAG_CONTENT_LOCATION_CODE, "Content Location Code")
    .set(IptcDirectory.TAG_CONTENT_LOCATION_NAME, "Content Location Name")
    .set(IptcDirectory.TAG_RELEASE_DATE, "Release Date")
    .set(IptcDirectory.TAG_RELEASE_TIME, "Release Time")
    .set(IptcDirectory.TAG_EXPIRATION_DATE, "Expiration Date")
    .set(IptcDirectory.TAG_EXPIRATION_TIME, "Expiration Time")
    .set(IptcDirectory.TAG_SPECIAL_INSTRUCTIONS, "Special Instructions")
    .set(IptcDirectory.TAG_ACTION_ADVISED, "Action Advised")
    .set(IptcDirectory.TAG_REFERENCE_SERVICE, "Reference Service")
    .set(IptcDirectory.TAG_REFERENCE_DATE, "Reference Date")
    .set(IptcDirectory.TAG_REFERENCE_NUMBER, "Reference Number")
    .set(IptcDirectory.TAG_DATE_CREATED, "Date Created")
    .set(IptcDirectory.TAG_TIME_CREATED, "Time Created")
    .set(IptcDirectory.TAG_DIGITAL_DATE_CREATED, "Digital Date Created")
    .set(IptcDirectory.TAG_DIGITAL_TIME_CREATED, "Digital Time Created")
    .set(IptcDirectory.TAG_ORIGINATING_PROGRAM, "Originating Program")
    .set(IptcDirectory.TAG_PROGRAM_VERSION, "Program Version")
    .set(IptcDirectory.TAG_OBJECT_CYCLE, "Object Cycle")
    .set(IptcDirectory.TAG_BY_LINE, "By-line")
    .set(IptcDirectory.TAG_BY_LINE_TITLE, "By-line Title")
    .set(IptcDirectory.TAG_CITY, "City")
    .set(IptcDirectory.TAG_SUB_LOCATION, "Sub-location")
    .set(IptcDirectory.TAG_PROVINCE_OR_STATE, "Province/State")
    .set(IptcDirectory.TAG_COUNTRY_OR_PRIMARY_LOCATION_CODE, "Country/Primary Location Code")
    .set(IptcDirectory.TAG_COUNTRY_OR_PRIMARY_LOCATION_NAME, "Country/Primary Location Name")
    .set(IptcDirectory.TAG_ORIGINAL_TRANSMISSION_REFERENCE, "Original Transmission Reference")
    .set(IptcDirectory.TAG_HEADLINE, "Headline")
    .set(IptcDirectory.TAG_CREDIT, "Credit")
    .set(IptcDirectory.TAG_SOURCE, "Source")
    .set(IptcDirectory.TAG_COPYRIGHT_NOTICE, "Copyright Notice")
    .set(IptcDirectory.TAG_CONTACT, "Contact")
    .set(IptcDirectory.TAG_CAPTION, "Caption/Abstract")
    .set(IptcDirectory.TAG_LOCAL_CAPTION, "Local Caption")
    .set(IptcDirectory.TAG_CAPTION_WRITER, "Caption Writer/Editor")
    .set(IptcDirectory.TAG_RASTERIZED_CAPTION, "Rasterized Caption")
    .set(IptcDirectory.TAG_IMAGE_TYPE, "Image Type")
    .set(IptcDirectory.TAG_IMAGE_ORIENTATION, "Image Orientation")
    .set(IptcDirectory.TAG_LANGUAGE_IDENTIFIER, "Language Identifier")
    .set(IptcDirectory.TAG_AUDIO_TYPE, "Audio Type")
    .set(IptcDirectory.TAG_AUDIO_SAMPLING_RATE, "Audio Sampling Rate")
    .set(IptcDirectory.TAG_AUDIO_SAMPLING_RESOLUTION, "Audio Sampling Resolution")
    .set(IptcDirectory.TAG_AUDIO_DURATION, "Audio Duration")
    .set(IptcDirectory.TAG_AUDIO_OUTCUE, "Audio Outcue")
    .set(IptcDirectory.TAG_JOB_ID, "Job Identifier")
    .set(IptcDirectory.TAG_MASTER_DOCUMENT_ID, "Master Document Identifier")
    .set(IptcDirectory.TAG_SHORT_DOCUMENT_ID, "Short Document Identifier")
    .set(IptcDirectory.TAG_UNIQUE_DOCUMENT_ID, "Unique Document Identifier")
    .set(IptcDirectory.TAG_OWNER_ID, "Owner Identifier")
    .set(IptcDirectory.TAG_OBJECT_PREVIEW_FILE_FORMAT, "Object Data Preview File Format")
    .set(IptcDirectory.TAG_OBJECT_PREVIEW_FILE_FORMAT_VERSION, "Object Data Preview File Format Version")
    .set(IptcDirectory.TAG_OBJECT_PREVIEW_DATA, "Object Data Preview Data")

  constructor() {
    super()
    this.setDescriptor(new IptcDescriptor(this));
  }

  public getName(): string{
    return "IPTC";
  }

  protected getTagNameMap(): Map<number, string>{
    return IptcDirectory._tagNameMap;
  }

  public getKeywords() {
    let array = this.getStringArray(IptcDirectory.TAG_KEYWORDS);
    if (array == null)
    return null;
    return array;
  }

  public getDateSent() {
    return this.getmDate(IptcDirectory.TAG_DATE_SENT, IptcDirectory.TAG_TIME_SENT);
  }

  public getReleaseDate() {
    return this.getmDate(IptcDirectory.TAG_RELEASE_DATE, IptcDirectory.TAG_RELEASE_TIME);
  }

  public getExpirationDate() {
    return this.getmDate(IptcDirectory.TAG_EXPIRATION_DATE, IptcDirectory.TAG_EXPIRATION_TIME);
  }

  public getDateCreated() {
    return this.getmDate(IptcDirectory.TAG_DATE_CREATED, IptcDirectory.TAG_TIME_CREATED);
  }

  public getDigitalDateCreated() {
    return this.getmDate(IptcDirectory.TAG_DIGITAL_DATE_CREATED, IptcDirectory.TAG_DIGITAL_TIME_CREATED);
  }

  private getmDate(dateTagType: number, timeTagType: number) {
    let date = this.getString(dateTagType);
    let time = this.getString(timeTagType);

    if (date == null)
    return null;
    if (time == null)
    return null;

    return date + time
  }
}