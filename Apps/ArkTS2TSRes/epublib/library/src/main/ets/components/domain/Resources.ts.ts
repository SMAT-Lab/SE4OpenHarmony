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
import EpubResource from "./EpubResource";
import StringUtil from "../util/StringUtil";
import MediatypeService from "../service/MediatypeService";
import MediaType from "./MediaType";
import { Constants } from '../Constants';
class Resources {
    private IMAGE_PREFIX: string = "image_";
    private ITEM_PREFIX: string = "item_";
    private lastId: number = 1;
    private resources: Map<string, EpubResource> = new Map<string, EpubResource>();
    constructor() {
    }
    /**
     * Adds a resource to the resources.
     *
     * Fixes the resources id and href if necessary.
     *
     * @param resource
     * @return the newly added resource
     */
    public add(resource: EpubResource): EpubResource {
        this.fixResourceHref(resource);
        this.fixResourceId(resource);
        console.info("-----------------Resources------------------key:==" + resource.getHref() + "------value:==" + resource.toString() + "----------------");
        this.resources.set(resource.getHref(), resource);
        return resource;
    }
    /**
     * Checks the id of the given resource and changes to a unique identifier if it isn't one already.
     *
     * @param resource
     */
    public fixResourceId(resource: EpubResource): void {
        let resourceId: string = resource.getId();
        // first try and create a unique id based on the resource's href
        if (StringUtil.isBlank(resourceId)) {
            resourceId = StringUtil.substringBeforeLast(resource.getHref(), ".");
            resourceId = StringUtil.substringAfterLast(resourceId, "/");
        }
        resourceId = this.makeValidId(resourceId, resource);
        // check if the id is unique. if not: create one from scratch
        if (StringUtil.isBlank(resourceId) || this.containsId(resourceId)) {
            resourceId = this.createUniqueResourceId(resource);
        }
        resource.setId(resourceId);
    }
    /**
     * Check if the id is a valid identifier. if not: prepend with valid identifier
     *
     * @param resource
     * @return a valid id
     */
    private makeValidId(resourceId: string, resource: EpubResource): string {
        // TODO if (StringUtil.isNotBlank(resourceId) && ! Character.isJavaIdentifierStart(resourceId.charAt(0))) {
        if (StringUtil.isNotBlank(resourceId)) {
            resourceId = this.getResourceItemPrefix(resource) + resourceId;
        }
        return resourceId;
    }
    private getResourceItemPrefix(resource: EpubResource): string {
        let result: string = this.ITEM_PREFIX;
        if (MediatypeService.isBitmapImage(resource.getMediaType())) {
            result = this.IMAGE_PREFIX;
        }
        return result;
    }
    /**
     * Creates a new resource id that is guaranteed to be unique for this set of Resources
     *
     * @param resource
     * @return a new resource id that is guaranteed to be unique for this set of Resources
     */
    private createUniqueResourceId(resource: EpubResource): string {
        let counter: number = this.lastId;
        if (counter == Number.MAX_VALUE) {
            // TODO: Integer.MAX_VALUE
            if (this.resources.size == Number.MAX_VALUE) {
                // TODO IllegalArgumentException
            }
            else {
                counter = 1;
            }
        }
        let prefix: string = this.getResourceItemPrefix(resource);
        let result: string = prefix + counter;
        while (this.containsId(result)) {
            result = prefix + (++counter);
        }
        this.lastId = counter;
        return result;
    }
    /**
     * Whether the map of resources already contains a resource with the given id.
     *
     * @param id
     * @return Whether the map of resources already contains a resource with the given id.
     */
    public containsId(id: string): boolean {
        if (StringUtil.isBlank(id)) {
            return false;
        }
        for (let resource of this.resources.values()) {
            if (id == resource.getId()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the resource with the given id.
     *
     * @param id
     * @return null if not found
     */
    public getById(id: string): EpubResource {
        if (StringUtil.isBlank(id)) {
            return null;
        }
        for (let resource of this.resources.values()) {
            if (id == resource.getId()) {
                return resource;
            }
        }
        return null;
    }
    /**
     * Remove the resource with the given href.
     *
     * @param href
     * @return the removed resource, null if not found
     */
    public remove(href: string): EpubResource {
        if (this.resources.has(href)) {
            let resource = this.resources.get(href);
            this.resources.delete(href);
            return resource;
        }
        return null;
    }
    private fixResourceHref(resource: EpubResource): void {
        if (StringUtil.isNotBlank(resource.getHref())
            && !this.resources.has(resource.getHref())) {
            return;
        }
        if (StringUtil.isBlank(resource.getHref())) {
            if (resource.getMediaType() == null) {
                // TODO IllegalArgumentException
                console.error("Resource must have either a MediaType or a hre");
                throw new Error("Resource must have either a MediaType or a hre");
            }
            let i = 1;
            let href = this.createHref(resource.getMediaType(), i);
            while (this.resources.has(resource.getHref())) {
                href = this.createHref(resource.getMediaType(), (++i));
            }
            resource.setHref(href);
        }
    }
    private createHref(mediaType: MediaType, counter: number): string {
        if (MediatypeService.isBitmapImage(mediaType)) {
            return "image_" + counter + mediaType.getDefaultExtension();
        }
        else {
            return "item_" + counter + mediaType.getDefaultExtension();
        }
    }
    public isEmpty(): boolean {
        return this.resources.size == 0;
    }
    /**
     * The number of resources
     * @return The number of resources
     */
    public size(): number {
        return this.resources.size;
    }
    /**
     * The resources that make up this book.
     * Resources can be xhtml pages, images, xml documents, etc.
     *
     * @return The resources that make up this book.
     */
    public getResourceMap(): Map<string, EpubResource> {
        return this.resources;
    }
    public getAll(): IterableIterator<EpubResource> {
        return this.resources.values();
    }
    /**
     * Whether there exists a resource with the given href
     * @param href
     * @return Whether there exists a resource with the given href
     */
    public containsByHref(href: string): boolean {
        if (StringUtil.isBlank(href)) {
            return false;
        }
        // TODO Constants.FRAGMENT_SEPARATOR_CHAR
        return this.resources.has(StringUtil.substringBefore(href, Constants.FRAGMENT_SEPARATOR_CHAR));
    }
    /**
     * Sets the collection of Resources to the given collection of resources
     *
     * @param resources
     */
    public set(resources: Array<EpubResource>): void {
        this.resources.clear();
        this.addAll(resources);
    }
    /**
     * Adds all resources from the given Collection of resources to the existing collection.
     *
     * @param resources
     */
    public addAll(resources: Array<EpubResource>): void {
        for (let resource of resources) {
            this.fixResourceHref(resource);
            this.resources.set(resource.getHref(), resource);
        }
    }
    /**
     * First tries to find a resource with as id the given idOrHref, if that
     * fails it tries to find one with the idOrHref as href.
     *
     * @param idOrHref
     * @return the found Resource
     */
    public getByIdOrHref(idOrHref: string): EpubResource {
        let resource: EpubResource = this.getById(idOrHref);
        if (resource == null) {
            resource = this.getByHref(idOrHref);
        }
        return resource;
    }
    /**
     * Gets the resource with the given href.
     * If the given href contains a fragmentId then that fragment id will be ignored.
     *
     * @param href
     * @return null if not found.
     */
    public getByHref(href: string): EpubResource {
        if (StringUtil.isBlank(href)) {
            return null;
        }
        href = StringUtil.substringBefore(href, Constants.FRAGMENT_SEPARATOR_CHAR);
        let result: EpubResource = this.resources.get(href);
        return result;
    }
    /**
     * Gets the first resource (random order) with the give mediatype.
     *
     * Useful for looking up the table of contents as it's supposed to be the only resource with NCX mediatype.
     *
     * @param mediaType
     * @return the first resource (random order) with the give mediatype.
     */
    public findFirstResourceByMediaType(mediaType: MediaType, resources?: IterableIterator<EpubResource>): EpubResource {
        resources = resources || this.resources.values();
        for (let resource of resources) {
            if (resource.getMediaType() == mediaType) {
                return resource;
            }
        }
        return null;
    }
    /**
     * All resources that have the given MediaType.
     *
     * @param mediaType
     * @return All resources that have the given MediaType.
     */
    public getResourcesByMediaType(mediaType: MediaType): Array<EpubResource> {
        let result = new Array<EpubResource>();
        if (mediaType == null) {
            return result;
        }
        for (let resource of this.getAll()) {
            if (resource.getMediaType() == mediaType) {
                result.push(resource);
            }
        }
        return result;
    }
    /**
     * All Resources that match any of the given list of MediaTypes
     *
     * @param mediaTypes
     * @return All Resources that match any of the given list of MediaTypes
     */
    public getResourcesByMediaTypes(mediaTypes: Array<MediaType>): Array<EpubResource> {
        let result = new Array<EpubResource>();
        if (mediaTypes == null) {
            return result;
        }
        // this is the fastest way of doing this according to
        // http://stackoverflow.com/questions/1128723/in-java-how-can-i-test-if-an-array-contains-a-certain-value
        let mediaTypesList = Array.from(mediaTypes);
        for (let resource of this.getAll()) {
            if (mediaTypesList.indexOf(resource.getMediaType()) >= 0) {
                result.push(resource);
            }
        }
        return result;
    }
    /**
     * All resource hrefs
     *
     * @return all resource hrefs
     */
    public getAllHrefs(): IterableIterator<string> {
        return this.resources.keys();
    }
}
export default Resources;
