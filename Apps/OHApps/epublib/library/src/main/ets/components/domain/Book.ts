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


import Resources from "./Resources"
import Metadata from "./Metadata"
import Spine from "./Spine"
import TableOfContents from "./TableOfContents"
import Guide from "./Guide"
import TOCReference from "./TOCReference"
import SpineReference from "./SpineReference"
import EpubResource from "./EpubResource"


class Book {
    private resources: Resources = new Resources();
    private metadata: Metadata = new Metadata();
    private spine: Spine = new Spine(null, new Array<SpineReference>());
    private tableOfContents: TableOfContents = new TableOfContents(new Array<TOCReference>());
    private guide: Guide = new Guide();
    private opfResource: EpubResource;
    private ncxResource: EpubResource;
    private coverImage: EpubResource ;

    constructor() {
    }

    /**
       * Adds the resource to the table of contents of the book as a child section of the given parentSection
       *
       * @param parentSection
       * @param sectionTitle
       * @param resource
       * @return The table of contents
       */
    public addSection(parentSection: TOCReference, sectionTitle: string,
                      resource: EpubResource): TOCReference{
        this.resources.add(resource);
        if (this.spine.findFirstResourceById(resource.getId()) < 0) {
            this.spine.addSpineReference(new SpineReference(resource, false));
        }
        return parentSection.addChildSection(new TOCReference(sectionTitle, resource, null, new Array<TOCReference>()));
    }

    public generateSpineFromTableOfContents(): void {
        let spine: Spine = new Spine(this.tableOfContents, null);
        // in case the tocResource was already found and assigned
        spine.setTocResource(this.spine.getTocResource());
        this.spine = spine;
    }

    /**
         * Adds a resource to the book's set of resources, table of contents and if there is no resource with the id in the spine also adds it to the spine.
         *
         * @param title
         * @param resource
         * @return The table of contents
         */
    public addSection1(title: string, resource: EpubResource): any {
        this.getResources().add(resource);
        let tocReference: TOCReference = this.tableOfContents.addTOCReference(new TOCReference(title, resource, null, new Array<TOCReference>()));
        if (this.spine.findFirstResourceById(resource.getId()) < 0) {
            this.spine.addSpineReference(new SpineReference(resource, true));
        }
        return tocReference;
    }

    /**
         * The Book's metadata (titles, authors, etc)
         *
         * @return The Book's metadata (titles, authors, etc)
         */
    public getMetadata(): Metadata {
        return this.metadata;
    }

    public setMetadata(metadata: Metadata): void {
        this.metadata = metadata;
    }

    public setResources(resources: Resources): void {
        this.resources = resources;
    }

    public addResource(resource: EpubResource): EpubResource {
        return this.resources.add(resource);
    }

    /**
         * The collection of all images, chapters, sections, xhtml files, stylesheets, etc that make up the book.
         *
         * @return The collection of all images, chapters, sections, xhtml files, stylesheets, etc that make up the book.
         */
    public getResources(): Resources {
        return this.resources;
    }


    /**
         * The sections of the book that should be shown if a user reads the book from start to finish.
         *
         * @return The Spine
         */
    public getSpine(): Spine {
        return this.spine;
    }

    public setSpine(spine: Spine): void {
        this.spine = spine;
    }


    /**
         * The Table of Contents of the book.
         *
         * @return The Table of Contents of the book.
         */
    public getTableOfContents(): TableOfContents {
        return this.tableOfContents;
    }

    public setTableOfContents(tableOfContents: TableOfContents): void {
        this.tableOfContents = tableOfContents;
    }

    /**
         * The book's cover page as a Resource.
         * An XHTML document containing a link to the cover image.
         *
         * @return The book's cover page as a Resource
         */
    public getCoverPage(): EpubResource {
        let coverPage: EpubResource = this.guide.getCoverPage();
        if (coverPage == null) {
            coverPage = this.spine.getResource(0);
        }
        return coverPage;
    }

    public setCoverPage(coverPage: EpubResource): void {
        if (coverPage == null) {
            return;
        }
        if (!this.resources.containsByHref(coverPage.getHref())) {
            this.resources.add(coverPage);
        }
        this.guide.setCoverPage(coverPage);
    }

    /**
         * Gets the first non-blank title from the book's metadata.
         *
         * @return the first non-blank title from the book's metadata.
         */
    public getTitle(): string {
        return this.getMetadata().getFirstTitle();
    }


    /**
         * The book's cover image.
         *
         * @return The book's cover image.
         */
    public getCoverImage(): EpubResource {
        return this.coverImage;
    }

    public setCoverImage(coverImage: EpubResource): void {
        if (coverImage == null) {
            return;
        }
        if (!this.resources.containsByHref(coverImage.getHref())) {
            this.resources.add(coverImage);
        }
        this.coverImage = coverImage;
    }

    /**
         * The guide; contains references to special sections of the book like colophon, glossary, etc.
         *
         * @return The guide; contains references to special sections of the book like colophon, glossary, etc.
         */
    public getGuide(): Guide {
        return this.guide;
    }

    public getOpfResource(): EpubResource {
        return this.opfResource;
    }

    public setOpfResource(opfResource: EpubResource): void {
        this.opfResource = opfResource;
    }

    public getNcxResource(): EpubResource {
        return this.ncxResource;
    }

    public setNcxResource(ncxResource: EpubResource): void {
        this.ncxResource = ncxResource;
    }
}

export default Book