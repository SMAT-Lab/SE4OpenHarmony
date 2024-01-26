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


import EpubResource from "./EpubResource"
import SpineReference from "./SpineReference"
import TableOfContents from "./TableOfContents"
import StringUtil from "../util/StringUtil"

class Spine {
    private tocResource: EpubResource;
    private spineReferences: Array<SpineReference> = [];

    /**
     * Creates a spine out of all the resources in the table of contents.
     *
     * @param tableOfContents
     */
    public constructor(tableOfContents: TableOfContents, spineReferences: Array<SpineReference>) {
        if (tableOfContents != null) {
            this.spineReferences = Spine.createSpineReferences(tableOfContents.getAllUniqueResources());
        } else if (spineReferences != null) {
            this.spineReferences = spineReferences;
        }
    }

    public static createSpineReferences(resources: Array<EpubResource>): Array<SpineReference>{
        let result: Array<SpineReference> = new Array<SpineReference>();
        resources.forEach(function (value) {
            result.push(new SpineReference(value, true));
        })
        return result;
    }

    public getSpineReferences(): Array<SpineReference>{
        return this.spineReferences;
    }

    public setSpineReferences(spineReferences: Array<SpineReference>): void{
        this.spineReferences = spineReferences;
    }

    /**
     * Gets the resource at the given index.
     * Null if not found.
     *
     * @param index
     * @return the resource at the given index.
     */
    public getResource(index: number): EpubResource {
        if (index < 0 || index >= this.spineReferences.length) {
            return null;
        }
        return this.spineReferences[index].getResource();
    }

    /**
     * Finds the first resource that has the given resourceId.
     *
     * Null if not found.
     *
     * @param resourceId
     * @return the first resource that has the given resourceId.
     */
    public findFirstResourceById(resourceId: string): number {
        if (StringUtil.isBlank(resourceId)) {
            return -1;
        }

        for (let i = 0; i < this.spineReferences.length; i++) {
            let spineReference: SpineReference = this.spineReferences[i];
            if (resourceId == spineReference.getResourceId()) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Adds the given spineReference to the spine references and returns it.
     *
     * @param spineReference
     * @return the given spineReference
     */
    public addSpineReference(spineReference: SpineReference): SpineReference {
        if (this.spineReferences == null) {
            this.spineReferences = new Array<SpineReference>();
        }
        this.spineReferences.push(spineReference);
        return spineReference;
    }

    /**
     * Adds the given resource to the spine references and returns it.
     *
     * @return the given spineReference
     */
    public addResource(resource: EpubResource): SpineReference {
        return this.addSpineReference(new SpineReference(resource, true));
    }

    /**
     * The number of elements in the spine.
     *
     * @return The number of elements in the spine.
     */
    public size(): number {
        return this.spineReferences.length;
    }

    /**
     * As per the epub file format the spine officially maintains a reference to the Table of Contents.
     * The epubWriter will look for it here first, followed by some clever tricks to find it elsewhere if not found.
     * Put it here to be sure of the expected behaviours.
     *
     * @param tocResource
     */
    public setTocResource(tocResource: EpubResource): void {
        this.tocResource = tocResource;
    }

    /**
     * The resource containing the XML for the tableOfContents.
     * When saving an epub file this resource needs to be in this place.
     *
     * @return The resource containing the XML for the tableOfContents.
     */
    public getTocResource(): EpubResource {
        return this.tocResource;
    }

    /**
     * The position within the spine of the given resource.
     *
     * @param currentResource
     * @return something &lt; 0 if not found.
     *
     */
    public getResourceIndex(currentResource: EpubResource): number{
        if (currentResource == null) {
            return -1;
        }
        return this.getResourceIndexByStr(currentResource.getHref());
    }

    /**
     * The first position within the spine of a resource with the given href.
     *
     * @return something &lt; 0 if not found.
     *
     */
    public getResourceIndexByStr(resourceHref: string): number {
        let result: number = -1;
        if (StringUtil.isBlank(resourceHref)) {
            return result;
        }
        for (let i: number = 0; i < this.spineReferences.length; i++) {
            if (resourceHref == this.spineReferences[i].getResource().getHref()) {
                result = i;
                break;
            }
        }
        return result;
    }

    /**
     * Whether the spine has any references
     * @return Whether the spine has any references
     */
    public isEmpty(): boolean {
        return this.spineReferences.length == 0;
    }
}

export default Spine