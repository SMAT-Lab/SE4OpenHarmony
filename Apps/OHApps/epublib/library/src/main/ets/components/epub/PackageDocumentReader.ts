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


import OPFValues from './OPFValues';
import OPFAttributes from './OPFAttributes';
import OPFTags from './OPFTags';
import PackageDocumentBase from './PackageDocumentBase'
import Book from "../domain/Book"
import MediatypeService from "../service/MediatypeService"
import { Constants } from '../Constants';
import EpubResource from "../domain/EpubResource"
import Resources from "../domain/Resources"
import EpubReader from "./EpubReader"
import StringUtil from '../util/StringUtil'
import DOMUtil from './DOMUtil'
import Spine from "../domain/Spine"
import SpineReference from "../domain/SpineReference"
import ResourceUtil from "../util/ResourceUtil"
import PackageDocumentMetadataReader from "./PackageDocumentMetadataReader"
import GuideReference from "../domain/GuideReference"

class PackageDocumentReader extends PackageDocumentBase {
    private static POSSIBLE_NCX_ITEM_IDS: Array<string> = ["toc", "ncx", "ncxtoc"];

    constructor() {
        super();
    }

    public static read(packageResource: EpubResource, epubReader: EpubReader, book: Book, resources: Resources): void {
        let packageDocument:ESObject = ResourceUtil.getAsDocument(packageResource);
        let packageHref: string = packageResource.getHref();
        resources = this.fixHrefs(packageHref, resources);
        this.readGuide(packageDocument, epubReader, book, resources);
        // Books sometimes use non-identifier ids. We map these here to legal ones
        let idMapping: Map<string, string> = new Map<string, string>();

        resources = this.readManifest(packageDocument, packageHref, epubReader, resources, idMapping);
        book.setResources(resources);
        this.readCover(packageDocument, book);
        book.setMetadata(PackageDocumentMetadataReader.readMetadata(packageDocument));
        book.setSpine(this.readSpine(packageDocument, book.getResources(), idMapping));
        // if we did not find a cover page then we make the first page of the book the cover page
        if (book.getCoverPage() == null && book.getSpine().size() > 0) {
            book.setCoverPage(book.getSpine().getResource(0));
        }
    }

    /**
         * Reads the manifest containing the resource ids, hrefs and mediatypes.
         *
         * @param packageDocument
         * @param packageHref
         * @param epubReader
         * @param book
         * @param resourcesByHref
         * @return a Map with resources, with their id's as key.
         */
    private static readManifest(packageDocument:ESObject, packageHref: string,
                                epubReader: EpubReader, resources: Resources, idMapping: Map<string, string>): Resources {
        console.info("--------------PackageDocumentReader.ets--init---readManifest()-----------")
        let manifestElement = DOMUtil.getFirstElementByTagNameNS(packageDocument.documentElement, PackageDocumentBase.NAMESPACE_OPF, OPFTags.manifest);
        let result = new Resources();
        if (manifestElement == null) {
            console.error("Package document does not contain element " + OPFTags.manifest);
            return result;
        }
        let itemElements = manifestElement.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.item);
        for (let i = 0; i < itemElements.length; i++) {
            let itemElement = itemElements.item(i);
            let id = DOMUtil.getAttribute(itemElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.id);
            let href = DOMUtil.getAttribute(itemElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.href);
            try {
                href = decodeURI(href);
            } catch (e) {
                console.error(e);
            }
            let mediaTypeName = DOMUtil.getAttribute(itemElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.media_type);
            let resource = resources.remove(href);
            if (resource == null) {
                console.error("resource with href '" + href + "' not found")
                continue;
            }
            resource.setId(id);
            let mediaType = MediatypeService.getMediaTypeByName(mediaTypeName);
            if (mediaType != null) {
                resource.setMediaType(mediaType);
            }
            result.add(resource);
            idMapping.set(id, resource.getId());
        }
        return result;
    }

    /**
         * Reads the book's guide.
         * Here some more attempts are made at finding the cover page.
         *
         * @param packageDocument
         * @param epubReader
         * @param book
         * @param resources
         */
    private static readGuide(packageDocument:ESObject,
                             epubReader: EpubReader, book: Book, resources: Resources): void {
        let guideElement = DOMUtil.getFirstElementByTagNameNS(packageDocument.documentElement, PackageDocumentBase.NAMESPACE_OPF, OPFTags.guide);
        if (guideElement == null) {
            return;
        }
        let guide = book.getGuide();
        let guideReferences = guideElement.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.reference);
        for (let i = 0; i < guideReferences.length; i++) {
            let referenceElement = guideReferences.item(i);
            let resourceHref = DOMUtil.getAttribute(referenceElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.href);
            if (StringUtil.isBlank(resourceHref)) {
                continue;
            }
            let subHerf = resourceHref;
            if (resourceHref.indexOf(Constants.FRAGMENT_SEPARATOR_CHAR) !== -1) {
                subHerf = resourceHref.substring(0, resourceHref.indexOf(Constants.FRAGMENT_SEPARATOR_CHAR));
            }
            let resource = resources.getByHref(subHerf);
            if (resource == null) {
                console.error("Guide is referencing resource with href " + resourceHref + " which could not be found");
                continue;
            }
            let type = DOMUtil.getAttribute(referenceElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.type);
            if (StringUtil.isBlank(type)) {
                console.error("Guide is referencing resource with href " + resourceHref + " which is missing the 'type' attribute");
                continue;
            }
            let title = DOMUtil.getAttribute(referenceElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.title);
            if (StringUtil.equalsIgnoreCase(GuideReference.COVER, type)) {
                continue; // cover is handled elsewhere
            }
            let reference = new GuideReference(resource, type, title, resourceHref.substring(resourceHref.indexOf(Constants.FRAGMENT_SEPARATOR_CHAR)));
            guide.addReference(reference);
        }
    }


    /**
         * Strips off the package prefixes up to the href of the packageHref.
         *
         * Example:
         * If the packageHref is "OEBPS/content.opf" then a resource href like "OEBPS/foo/bar.html" will be turned into "foo/bar.html"
         *
         * @param packageHref
         * @param resourcesByHref
         * @return The stripped package href
         */
    static fixHrefs(packageHref: string,
                    resourcesByHref: Resources): Resources {
        let lastSlashPos: number = packageHref.lastIndexOf('/');
        if (lastSlashPos < 0) {
            return resourcesByHref;
        }
        let result: Resources = new Resources();
        for (let resourceNew of resourcesByHref.getAll()) {
            if (StringUtil.isNotBlank(resourceNew.getHref())
            && resourceNew.getHref().length > lastSlashPos) {
                resourceNew.setHref(resourceNew.getHref().substring(lastSlashPos + 1));
            }
            result.add(resourceNew);
        }
        return result;
    }

    /**
         * Reads the document's spine, containing all sections in reading order.
         *
         * @param packageDocument
         * @param epubReader
         * @param book
         * @param resourcesById
         * @return the document's spine, containing all sections in reading order.
         */
    private static readSpine(packageDocument:ESObject, resources: Resources, idMapping: Map<string, string>): Spine {

        let spineElement = DOMUtil.getFirstElementByTagNameNS(packageDocument.documentElement, PackageDocumentBase.NAMESPACE_OPF, OPFTags.spine);
        if (spineElement == null) {
            console.error("Element " + OPFTags.spine + " not found in package document, generating one automatically");
            return PackageDocumentReader.generateSpineFromResources(resources);
        }
        let result = new Spine(null, new Array<SpineReference>());
        let tocResourceId = DOMUtil.getAttribute(spineElement, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.toc);
        result.setTocResource(PackageDocumentReader.findTableOfContentsResource(tocResourceId, resources));
        let spineNodes = packageDocument.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.itemref);
        let spineReferences = new Array<SpineReference>();
        for (let i = 0; i < spineNodes.length; i++) {
            let spineItem = spineNodes.item(i);
            let itemref = DOMUtil.getAttribute(spineItem, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.idref);
            if (StringUtil.isBlank(itemref)) {
                console.error("itemref with missing or empty idref"); // XXX
                continue;
            }
            let id = idMapping.get(itemref);
            if (id == null) {
                id = itemref;
            }
            let resource = resources.getByIdOrHref(id)
            ;
            if (resource == null) {
                console.error("resource with id \'" + id + "\' not found");
                continue;
            }

            let spineReference = new SpineReference(resource, true);
            if (StringUtil.equalsIgnoreCase(OPFValues.no, DOMUtil.getAttribute(spineItem, PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.linear))) {
                spineReference.setLinear(false);
            }
            spineReferences.push(spineReference);
        }
        result.setSpineReferences(spineReferences);
        return result;
    }

    /**
         * Creates a spine out of all resources in the resources.
         * The generated spine consists of all XHTML pages in order of their href.
         *
         * @param resources
         * @return a spine created out of all resources in the resources.
         */
    private static generateSpineFromResources(resources: Resources): Spine {
        let result: Spine = new Spine(null, null);
        let resourceHrefs: Array<string> = new Array<string>();
        for (let getAllHrefsKey in resources.getAllHrefs()) {
            resourceHrefs.push(getAllHrefsKey);
        }
        resourceHrefs.sort();
        for (let resourceHref in resourceHrefs) {
            let resourceNew: EpubResource = resources.getByHref(resourceHref);
            if (resourceNew.getMediaType() == MediatypeService.NCX) {
                result.setTocResource(resourceNew);
            } else if (resourceNew.getMediaType() == MediatypeService.XHTML) {
                result.addSpineReference(new SpineReference(resourceNew, true));
            }
        }
        return result;
    }


    /**
         * The spine tag should contain a 'toc' attribute with as value the resource id of the table of contents resource.
         *
         * Here we try several ways of finding this table of contents resource.
         * We try the given attribute value, some often-used ones and finally look through all resources for the first resource with the table of contents mimetype.
         *
         * @param spineElement
         * @param resourcesById
         * @return the Resource containing the table of contents
         */
    static findTableOfContentsResource(tocResourceId: string, resources: Resources): EpubResource {
        let tocResource: EpubResource = null;
        if (StringUtil.isNotBlank(tocResourceId)) {
            tocResource = resources.getByIdOrHref(tocResourceId);
        }

        if (tocResource != null) {
            return tocResource;
        }

        // get the first resource with the NCX mediatype
        tocResource = resources.findFirstResourceByMediaType(MediatypeService.NCX);

        if (tocResource == null) {
            for (let i = 0; i < PackageDocumentReader.POSSIBLE_NCX_ITEM_IDS.length; i++) {
                tocResource = resources.getByIdOrHref(PackageDocumentReader.POSSIBLE_NCX_ITEM_IDS[i]);
                if (tocResource != null) {
                    break;
                }
                tocResource = resources.getByIdOrHref(PackageDocumentReader.POSSIBLE_NCX_ITEM_IDS[i].toUpperCase());
                if (tocResource != null) {
                    break;
                }
            }
        }

        if (tocResource == null) {
            console.error("Could not find table of contents resource. Tried resource with id '" + tocResourceId + "', " + Constants.DEFAULT_TOC_ID + ", " + Constants.DEFAULT_TOC_ID.toUpperCase() + " and any NCX resource.");
        }
        return tocResource;
    }


    /**
         * Find all resources that have something to do with the coverpage and the cover image.
         * Search the meta tags and the guide references
         *
         * @param packageDocument
         * @return all resources that have something to do with the coverpage and the cover image.
         */
    // package
    static findCoverHrefs(packageDocument:ESObject): Set<string> {

        let result: Set<string> = new Set<string>();

        // try and find a meta tag with name = 'cover' and a non-blank id
        let coverResourceId = DOMUtil.getFindAttributeValue(packageDocument, PackageDocumentBase.NAMESPACE_OPF,
            OPFTags.meta, OPFAttributes.name, OPFValues.meta_cover,
            OPFAttributes.content);

        if (StringUtil.isNotBlank(coverResourceId)) {
            let coverHref = DOMUtil.getFindAttributeValue(packageDocument, PackageDocumentBase.NAMESPACE_OPF,
                OPFTags.item, OPFAttributes.id, coverResourceId,
                OPFAttributes.href);
            if (StringUtil.isNotBlank(coverHref)) {
                result.add(coverHref);
            } else {
                result.add(coverResourceId); // maybe there was a cover href put in the cover id attribute
            }
        }
        // try and find a reference tag with type is 'cover' and reference is not blank
        let coverHref = DOMUtil.getFindAttributeValue(packageDocument, PackageDocumentBase.NAMESPACE_OPF,
            OPFTags.reference, OPFAttributes.type, OPFValues.reference_cover,
            OPFAttributes.href);
        if (StringUtil.isNotBlank(coverHref)) {
            result.add(coverHref);
        }
        return result;
    }

    /**
         * Finds the cover resource in the packageDocument and adds it to the book if found.
         * Keeps the cover resource in the resources map
         * @param packageDocument
         * @param book
         * @param resources
         */
    private static readCover(packageDocument:ESObject, book: Book): void {
        let coverHrefs: Set<string> = this.findCoverHrefs(packageDocument);
        for (let coverHref of coverHrefs) {
            let resource: EpubResource = book.getResources().getByHref(coverHref);
            if (resource == null) {
                console.error("Cover resource " + coverHref + " not found");
                continue;
            }
            if (resource.getMediaType() == MediatypeService.XHTML) {
                book.setCoverPage(resource);
            } else if (MediatypeService.isBitmapImage(resource.getMediaType())) {
                book.setCoverImage(resource);
            }
        }
    }
}

export default PackageDocumentReader