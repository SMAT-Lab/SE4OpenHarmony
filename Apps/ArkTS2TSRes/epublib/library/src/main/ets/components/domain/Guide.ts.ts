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
import ResourceReference from './ResourceReference';
import GuideReference from './GuideReference';
import EpubResource from "./EpubResource";
class Guide {
    public static DEFAULT_COVER_TITLE: string = GuideReference.COVER;
    private references: Array<GuideReference> = new Array<GuideReference>();
    private static readonly COVERPAGE_NOT_FOUND: number = -1;
    private static readonly COVERPAGE_UNITIALIZED: number = -2;
    private coverPageIndex: number = -1;
    constructor() {
    }
    public getReferences(): Array<GuideReference> {
        return this.references;
    }
    public setReferences(references: Array<GuideReference>): void {
        this.references = references;
        this.uncheckCoverPage();
    }
    private uncheckCoverPage(): void {
        this.coverPageIndex = Guide.COVERPAGE_UNITIALIZED;
    }
    public getCoverReference(): GuideReference {
        this.checkCoverPage();
        if (this.coverPageIndex >= 0) {
            return this.references[this.coverPageIndex];
        }
        return null;
    }
    public setCoverReference(guideReference: GuideReference): number {
        if (this.coverPageIndex >= 0) {
            this.references.splice(this.coverPageIndex, 0, guideReference);
        }
        else {
            this.references.splice(0, 0, guideReference);
            this.coverPageIndex = 0;
        }
        return this.coverPageIndex;
    }
    private checkCoverPage(): void {
        if (this.coverPageIndex == Guide.COVERPAGE_UNITIALIZED) {
            this.initCoverPage();
        }
    }
    private initCoverPage(): void {
        let result: number = Guide.COVERPAGE_NOT_FOUND;
        for (let i: number = 0; i < this.references.length; i++) {
            let guideReference: GuideReference = this.references[i];
            if (guideReference.getType() == GuideReference.COVER) {
                result = i;
                break;
            }
        }
        this.coverPageIndex = result;
    }
    /**
         * The coverPage of the book.
         *
         * @return The coverPage of the book.
         */
    public getCoverPage(): EpubResource {
        let guideReference: GuideReference = this.getCoverReference();
        if (guideReference == null) {
            return null;
        }
        return guideReference.getResource();
    }
    public setCoverPage(coverPage: EpubResource): void {
        let coverPageGuideReference: GuideReference = new GuideReference(coverPage, GuideReference.COVER, Guide.DEFAULT_COVER_TITLE);
        this.setCoverReference(coverPageGuideReference);
    }
    public addReference(reference: GuideReference): ResourceReference {
        this.references.push(reference);
        this.uncheckCoverPage();
        return reference;
    }
    /**
         * A list of all GuideReferences that have the given referenceTypeName (ignoring case).
         *
         * @param referenceTypeName
         * @return A list of all GuideReferences that have the given referenceTypeName (ignoring case).
         */
    public getGuideReferencesByType(referenceTypeName: string): Array<GuideReference> {
        let result: Array<GuideReference> = new Array<GuideReference>();
        for (let guideReference of this.references) {
            if (referenceTypeName.toLowerCase() == guideReference.getType().toLowerCase()) {
                result.push(guideReference);
            }
        }
        return result;
    }
}
export default Guide;
