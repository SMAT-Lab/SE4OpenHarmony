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
import Directory from '../Directory';
import { EpsDescriptor } from './EpsDescriptor';
export class EpsDirectory extends Directory {
    public static TAG_DSC_VERSION: number = 1;
    public static TAG_AUTHOR: number = 2;
    public static TAG_BOUNDING_BOX: number = 3;
    public static TAG_COPYRIGHT: number = 4;
    public static TAG_CREATION_DATE: number = 5;
    public static TAG_CREATOR: number = 6;
    public static TAG_FOR: number = 7;
    public static TAG_IMAGE_DATA: number = 8;
    public static TAG_KEYWORDS: number = 9;
    public static TAG_MODIFY_DATE: number = 10;
    public static TAG_PAGES: number = 11;
    public static TAG_ROUTING: number = 12;
    public static TAG_SUBJECT: number = 13;
    public static TAG_TITLE: number = 14;
    public static TAG_VERSION: number = 15;
    public static TAG_DOCUMENT_DATA: number = 16;
    public static TAG_EMULATION: number = 17;
    public static TAG_EXTENSIONS: number = 18;
    public static TAG_LANGUAGE_LEVEL: number = 19;
    public static TAG_ORIENTATION: number = 20;
    public static TAG_PAGE_ORDER: number = 21;
    public static TAG_OPERATOR_INTERNVENTION: number = 22;
    public static TAG_OPERATOR_MESSAGE: number = 23;
    public static TAG_PROOF_MODE: number = 24;
    public static TAG_REQUIREMENTS: number = 25;
    public static TAG_VM_LOCATION: number = 26;
    public static TAG_VM_USAGE: number = 27;
    public static TAG_IMAGE_WIDTH: number = 28;
    public static TAG_IMAGE_HEIGHT: number = 29;
    public static TAG_COLOR_TYPE: number = 30;
    public static TAG_RAM_SIZE: number = 31;
    public static TAG_TIFF_PREVIEW_SIZE: number = 32;
    public static TAG_TIFF_PREVIEW_OFFSET: number = 33;
    public static TAG_WMF_PREVIEW_SIZE: number = 34;
    public static TAG_WMF_PREVIEW_OFFSET: number = 35;
    public static TAG_CONTINUE_LINE: number = 36;
    static _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(EpsDirectory.TAG_CONTINUE_LINE, "Line Continuation")
        .set(EpsDirectory.TAG_BOUNDING_BOX, "Bounding Box")
        .set(EpsDirectory.TAG_COPYRIGHT, "Copyright")
        .set(EpsDirectory.TAG_DOCUMENT_DATA, "Document Data")
        .set(EpsDirectory.TAG_EMULATION, "Emulation")
        .set(EpsDirectory.TAG_EXTENSIONS, "Extensions")
        .set(EpsDirectory.TAG_LANGUAGE_LEVEL, "Language Level")
        .set(EpsDirectory.TAG_ORIENTATION, "Orientation")
        .set(EpsDirectory.TAG_PAGE_ORDER, "Page Order")
        .set(EpsDirectory.TAG_VERSION, "Version")
        .set(EpsDirectory.TAG_IMAGE_DATA, "Image Data")
        .set(EpsDirectory.TAG_IMAGE_WIDTH, "Image Width")
        .set(EpsDirectory.TAG_IMAGE_HEIGHT, "Image Height")
        .set(EpsDirectory.TAG_COLOR_TYPE, "Color Type")
        .set(EpsDirectory.TAG_RAM_SIZE, "Ram Size")
        .set(EpsDirectory.TAG_CREATOR, "Creator")
        .set(EpsDirectory.TAG_CREATION_DATE, "Creation Date")
        .set(EpsDirectory.TAG_FOR, "For")
        .set(EpsDirectory.TAG_REQUIREMENTS, "Requirements")
        .set(EpsDirectory.TAG_ROUTING, "Routing")
        .set(EpsDirectory.TAG_TITLE, "Title")
        .set(EpsDirectory.TAG_DSC_VERSION, "DSC Version")
        .set(EpsDirectory.TAG_PAGES, "Pages")
        .set(EpsDirectory.TAG_OPERATOR_INTERNVENTION, "Operator Intervention")
        .set(EpsDirectory.TAG_OPERATOR_MESSAGE, "Operator Message")
        .set(EpsDirectory.TAG_PROOF_MODE, "Proof Mode")
        .set(EpsDirectory.TAG_VM_LOCATION, "VM Location")
        .set(EpsDirectory.TAG_VM_USAGE, "VM Usage")
        .set(EpsDirectory.TAG_AUTHOR, "Author")
        .set(EpsDirectory.TAG_KEYWORDS, "Keywords")
        .set(EpsDirectory.TAG_MODIFY_DATE, "Modify Date")
        .set(EpsDirectory.TAG_SUBJECT, "Subject")
        .set(EpsDirectory.TAG_TIFF_PREVIEW_SIZE, "TIFF Preview Size")
        .set(EpsDirectory.TAG_TIFF_PREVIEW_OFFSET, "TIFF Preview Offset")
        .set(EpsDirectory.TAG_WMF_PREVIEW_SIZE, "WMF Preview Size")
        .set(EpsDirectory.TAG_WMF_PREVIEW_OFFSET, "WMF Preview Offset");
    static _tagIntegerMap: Map<string, number> = new Map<string, number>()
        .set("%!PS-Adobe-", EpsDirectory.TAG_DSC_VERSION)
        .set("%%Author", EpsDirectory.TAG_AUTHOR)
        .set("%%BoundingBox", EpsDirectory.TAG_BOUNDING_BOX)
        .set("%%Copyright", EpsDirectory.TAG_COPYRIGHT)
        .set("%%CreationDate", EpsDirectory.TAG_CREATION_DATE)
        .set("%%Creator", EpsDirectory.TAG_CREATOR)
        .set("%%For", EpsDirectory.TAG_FOR)
        .set("%ImageData", EpsDirectory.TAG_IMAGE_DATA)
        .set("%%Keywords", EpsDirectory.TAG_KEYWORDS)
        .set("%%ModDate", EpsDirectory.TAG_MODIFY_DATE)
        .set("%%Pages", EpsDirectory.TAG_PAGES)
        .set("%%Routing", EpsDirectory.TAG_ROUTING)
        .set("%%Title", EpsDirectory.TAG_TITLE)
        .set("%%Version", EpsDirectory.TAG_VERSION)
        .set("%%DocumentData", EpsDirectory.TAG_DOCUMENT_DATA)
        .set("%%Emulation", EpsDirectory.TAG_EMULATION)
        .set("%%Extensions", EpsDirectory.TAG_EXTENSIONS)
        .set("%%LanguageLevel", EpsDirectory.TAG_LANGUAGE_LEVEL)
        .set("%%Orientation", EpsDirectory.TAG_ORIENTATION)
        .set("%%PageOrder", EpsDirectory.TAG_PAGE_ORDER)
        .set("%%OperatorIntervention", EpsDirectory.TAG_OPERATOR_INTERNVENTION)
        .set("%%OperatorMessage", EpsDirectory.TAG_OPERATOR_MESSAGE)
        .set("%%ProofMode", EpsDirectory.TAG_PROOF_MODE)
        .set("%%Requirements", EpsDirectory.TAG_REQUIREMENTS)
        .set("%%VMlocation", EpsDirectory.TAG_VM_LOCATION)
        .set("%%VMusage", EpsDirectory.TAG_VM_USAGE)
        .set("Image Width", EpsDirectory.TAG_IMAGE_WIDTH)
        .set("Image Height", EpsDirectory.TAG_IMAGE_HEIGHT)
        .set("Color Type", EpsDirectory.TAG_COLOR_TYPE)
        .set("Ram Size", EpsDirectory.TAG_RAM_SIZE)
        .set("TIFFPreview", EpsDirectory.TAG_TIFF_PREVIEW_SIZE)
        .set("TIFFPreviewOffset", EpsDirectory.TAG_TIFF_PREVIEW_OFFSET)
        .set("WMFPreview", EpsDirectory.TAG_WMF_PREVIEW_SIZE)
        .set("WMFPreviewOffset", EpsDirectory.TAG_WMF_PREVIEW_OFFSET)
        .set("%%+", EpsDirectory.TAG_CONTINUE_LINE);
    constructor() {
        super();
        this.setDescriptor(new EpsDescriptor(this));
    }
    getName() {
        return "EPS";
    }
    protected getTagNameMap() {
        return EpsDirectory._tagNameMap;
    }
}
