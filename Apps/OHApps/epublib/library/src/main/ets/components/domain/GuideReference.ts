/*
 * GNU LESSER GENERAL PUBLIC LICENSE
 * Version 3, 29 June 2007
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * The Free Software Foundation may publish revised and/or new versions of the GNU Lesser
 * General Public License from time to time. Such new versions will be similar in spirit to the
 * present version, but may differ in detail to address new problems or concerns.

 * Each version is given a distinguishing version number. If the Library as you received it
 * specifies that a certain numbered version of the GNU Lesser General Public License “or any
 * later version” applies to it, you have the option of following the terms and conditions either
 * of that published version or of any later version published by the Free Software Foundation. If
 * the Library as you received it does not specify a version number of the GNU Lesser General
 * Public License, you may choose any version of the GNU Lesser General Public License ever
 * published by the Free Software Foundation.

 * If the Library as you received it specifies that a proxy can decide whether future versions of
 * the GNU Lesser General Public License shall apply, that proxy's public statement of
 * acceptance of any version is permanent authorization for you to choose that version
 * for the Library.
 */


import EpubResource from './EpubResource';
import TitledResourceReference from './TitledResourceReference';


class GuideReference extends TitledResourceReference {
    private static serialVersionUID: BigInt = BigInt(-316179702440631834);

    /**
      * the book cover(s), jacket information, etc.
      */
    public static COVER: string = "cover";

    /**
      * human-readable page with title, author, publisher, and other metadata
      */
    public static TITLE_PAGE: string = "title-page";

    /**
      * Human-readable table of contents.
      * Not to be confused the epub file table of contents
      *
      */
    public static TOC: string = "toc";

    /**
      * back-of-book style index
      */
    public static INDEX: string = "index";
    public static GLOSSARY: string = "glossary";
    public static ACKNOWLEDGEMENTS: string = "acknowledgements";
    public static BIBLIOGRAPHY: string = "bibliography";
    public static COLOPHON: string = "colophon";
    public static COPYRIGHT_PAGE: string = "copyright-page";
    public static DEDICATION: string = "dedication";

    /**
      *  an epigraph is a phrase, quotation, or poem that is set at the beginning of a document or component.
      *  source: http://en.wikipedia.org/wiki/Epigraph_%28literature%29
      */
    public static EPIGRAPH: string = "epigraph";
    public static FOREWORD: string = "foreword";

    /**
      * list of illustrations
      */
    public static LOI: string = "loi";

    /**
      * list of tables
      */
    public static LOT: string = "lot";
    public static NOTES: string = "notes";
    public static PREFACE: string = "preface";

    /**
      * A page of content (e.g. "Chapter 1")
      */
    public static TEXT: string = "text";
    private typeNew: string;

    constructor(resourceNew: EpubResource, typeNew?: string, title?: string, fragmentId?: string) {
        super(resourceNew, title, fragmentId);
        // todo  StringUtil  this.type = StringUtil.isNotBlank(type) ? type.toLowerCase() : null;
        if (null == typeNew || "" == typeNew) {
            this.typeNew = null;
        } else {
            this.typeNew = typeNew.toLowerCase();
        }

    }

    public getType(): string {
        return this.typeNew;
    }

    public setType(typeNew: string): void {
        this.typeNew = typeNew;
    }
}

export default GuideReference