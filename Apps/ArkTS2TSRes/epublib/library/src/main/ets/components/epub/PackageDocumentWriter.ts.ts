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
import PackageDocumentMetadataWriter from './PackageDocumentMetadataWriter';
import OPFAttributes from './OPFAttributes';
import OPFTags from './OPFTags';
import NCXDocument from './NCXDocument';
import Book from '../domain/Book';
import Guide from '../domain/Guide';
import { Constants } from '../Constants';
import EpubWriter from './EpubWriter';
import PackageDocumentBase from './PackageDocumentBase';
import Spine from '../domain/Spine';
import GuideReference from '../domain/GuideReference';
import EpubResource from "../domain/EpubResource";
import MediatypeService from '../service/MediatypeService';
import StringUtil from '../util/StringUtil';
import { DOMParser } from '@xmldom/xmldom';
import { XMLSerializer } from '@xmldom/xmldom';
import fs from '@ohos.file.fs';
import OPFValues from './OPFValues';
class PackageDocumentWriter extends PackageDocumentBase {
    public static write(fd: number, book: Book): void {
        try {
            let domParser = new DOMParser();
            let document: ESObject = domParser.parseFromString("<?xml encoding='" + Constants.CHARACTER_ENCODING + "'?>");
            let root: ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.packageTag);
            root.setAttribute("xmlns:" + PackageDocumentBase.PREFIX_OPF, PackageDocumentBase.NAMESPACE_OPF);
            root.setAttribute("xmlns:" + PackageDocumentBase.PREFIX_DUBLIN_CORE, PackageDocumentBase.NAMESPACE_DUBLIN_CORE);
            root.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.version, "2.0");
            root.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.uniqueIdentifier, PackageDocumentBase.BOOK_ID_ID);
            PackageDocumentMetadataWriter.writeMetaData(book, root, document);
            this.writeManifest(book, root, document);
            this.writeSpine(book, root, document);
            this.writeGuide(book, root, document);
            document.appendChild(root);
            // write document to file
            let xmlSerializer = new XMLSerializer();
            let xmlDocument: string = xmlSerializer.serializeToString(document);
            let num = fs.writeSync(fd, xmlDocument);
            console.error("file content.+++++++++++ /xmlDocument:" + xmlDocument);
        }
        catch (e) {
            // TODO Auto-generated catch block
            console.error(e);
            console.error("--------PackageDocumentWriter-------write--------" + e);
        }
    }
    /**
     * Writes the package's spine.
     *
     * @param book
     * @param serializer
     * @throws IOException
     * @throws IllegalStateException
     * @throws IllegalArgumentException
     * @throws XMLStreamException
     */
    private static writeSpine(book: Book, parentElement: ESObject, document: ESObject): void {
        let spineElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.spine);
        // todo
        let res = book.getSpine().getTocResource();
        let resId: string = res === undefined ? NCXDocument.NCX_ITEM_ID : res.getId();
        spineElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.toc, resId);
        if (book.getCoverPage() != null // there is a cover page
            && book.getSpine().findFirstResourceById(book.getCoverPage().getId()) < 0) { // cover page is not already in the spine
            // write the cover html file
            let itemrefElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.itemref);
            itemrefElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.idref, book.getCoverPage().getId());
            itemrefElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.linear, "no");
            spineElement.appendChild(itemrefElement);
        }
        PackageDocumentWriter.writeSpineItems(book.getSpine(), spineElement, document);
        parentElement.appendChild(spineElement);
    }
    private static writeManifest(book: Book, parentElement: ESObject, document: ESObject): void {
        let manifestElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.manifest);
        let itemElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.item);
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.id, EpubWriter.getNcxId());
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.href, EpubWriter.getNcxHref());
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.media_type, EpubWriter.getNcxMediaType());
        manifestElement.appendChild(itemElement);
        for (let resource of PackageDocumentWriter.getAllResourcesSortById(book)) {
            PackageDocumentWriter.writeItem(book, resource, manifestElement, document);
        }
        parentElement.appendChild(manifestElement);
    }
    private static getAllResourcesSortById(book: Book): Array<EpubResource> {
        let allResources = Array.from(book.getResources().getAll());
        let sortResources = allResources.sort((resource1: EpubResource, resource2: EpubResource) => {
            return StringUtil.compareToIgnoreCase(resource1.getId(), resource2.getId());
        });
        return sortResources;
    }
    /**
     * Writes a resources as an item element
     * @param resource
     * @param serializer
     * @throws IOException
     * @throws IllegalStateException
     * @throws IllegalArgumentException
     * @throws XMLStreamException
     */
    private static writeItem(book: Book, resource: EpubResource, parentElement: ESObject, document: ESObject): void {
        if (resource == null ||
            (resource.getMediaType() == MediatypeService.NCX
                && book.getSpine().getTocResource() != null)) {
            return;
        }
        if (StringUtil.isBlank(resource.getId())) {
            console.error("resource id must not be empty (href: " + resource.getHref() + ", mediatype:" + resource.getMediaType() + ")");
            return;
        }
        if (StringUtil.isBlank(resource.getHref())) {
            console.error("resource href must not be empty (id: " + resource.getId() + ", mediatype:" + resource.getMediaType() + ")");
            return;
        }
        if (resource.getMediaType() == null) {
            console.error("resource mediatype must not be empty (id: " + resource.getId() + ", href:" + resource.getHref() + ")");
            return;
        }
        let itemElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.item);
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.id, resource.getId());
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.href, resource.getHref());
        itemElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.media_type, resource.getMediaType().getName());
        parentElement.appendChild(itemElement);
    }
    /**
     * List all spine references
     * @throws IOException
     * @throws IllegalStateException
     * @throws IllegalArgumentException
     */
    private static writeSpineItems(spine: Spine, parentElement: ESObject, document: ESObject): void {
        for (let spineReference of spine.getSpineReferences()) {
            let itemrefElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.itemref);
            itemrefElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.idref, spineReference.getResourceId());
            if (!spineReference.isLinear()) {
                itemrefElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.linear, OPFValues.no);
            }
            parentElement.appendChild(itemrefElement);
        }
    }
    private static writeGuide(book: Book, parentElement: ESObject, document: ESObject): void {
        let guideElement = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.guide);
        PackageDocumentWriter.ensureCoverPageGuideReferenceWritten(book.getGuide(), guideElement, document);
        for (let reference of book.getGuide().getReferences()) {
            PackageDocumentWriter.writeGuideReference(reference, guideElement, document);
        }
        parentElement.appendChild(guideElement);
    }
    private static ensureCoverPageGuideReferenceWritten(guide: Guide, parentElement: ESObject, document: ESObject): void {
        if (!(guide.getGuideReferencesByType(GuideReference.COVER).length == 0)) {
            return;
        }
        let coverPage: EpubResource = guide.getCoverPage();
        if (coverPage != null) {
            PackageDocumentWriter.writeGuideReference(new GuideReference(guide.getCoverPage(), GuideReference.COVER, GuideReference.COVER), parentElement, document);
        }
    }
    private static writeGuideReference(reference: GuideReference, parentElement: ESObject, document: ESObject): void {
        if (reference == null) {
            return;
        }
        let ele = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.reference);
        ele.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.type, reference.getType());
        ele.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.href, reference.getCompleteHref());
        if (StringUtil.isNotBlank(reference.getTitle())) {
            ele.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.title, reference.getTitle());
        }
        parentElement.appendChild(ele);
    }
}
export default PackageDocumentWriter;
