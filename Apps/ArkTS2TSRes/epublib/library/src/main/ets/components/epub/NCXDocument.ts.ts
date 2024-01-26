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
import NCXAttributeValues from './NCXAttributeValues';
import MediatypeService from '../service/MediatypeService';
import Author from '../domain/Author';
import Identifier from '../domain/Identifier';
import NCXAttributes from './NCXAttributes';
import { Constants } from '../Constants';
import StringUtil from '../util/StringUtil';
import TOCReference from '../domain/TOCReference';
import TableOfContents from '../domain/TableOfContents';
import NCXTags from './NCXTags';
import EpubResource from "../domain/EpubResource";
import Book from '../domain/Book';
import ResourceUtil from '../util/ResourceUtil';
import DOMUtil from './DOMUtil';
import fs from '@ohos.file.fs';
import { DOMParser } from '@xmldom/xmldom';
import { XMLSerializer } from '@xmldom/xmldom';
import EpubWriter from './EpubWriter';
class NCXDocument {
    public static readonly NAMESPACE_NCX: string = "http://www.daisy.org/z3986/2005/ncx/";
    public static readonly PREFIX_NCX: string = "ncx";
    public static readonly NCX_ITEM_ID: string = "ncx";
    public static readonly DEFAULT_NCX_HREF: string = "toc.ncx";
    public static readonly PREFIX_DTB: string = "dtb";
    public static read(book: Book): EpubResource {
        let ncxResource: EpubResource = null;
        if (book.getSpine().getTocResource() == null) {
            console.error("Book does not contain a table of contents file");
            return ncxResource;
        }
        try {
            ncxResource = book.getSpine().getTocResource();
            if (ncxResource == null) {
                return ncxResource;
            }
            console.debug("-----------NXCDocument.ets---read------ResourceUtil.getAsDocument---------" + ncxResource.toString());
            let ncxDocument: ESObject = ResourceUtil.getAsDocument(ncxResource);
            let navMapElement = DOMUtil.getFirstElementByTagNameNS(ncxDocument.documentElement, NCXDocument.NAMESPACE_NCX, NCXTags.navMap);
            let tableOfContents = new TableOfContents(NCXDocument.readTOCReferences(navMapElement.childNodes, book));
            book.setTableOfContents(tableOfContents);
        }
        catch (e) {
            console.error(e);
            console.error("--------NCXDocument.ets---read----" + e);
        }
        return ncxResource;
    }
    private static readTOCReferences(navPoints: ESObject, book: Book): TOCReference[] {
        if (navPoints == null) {
            return new Array<TOCReference>();
        }
        let result: Array<TOCReference> = new Array<TOCReference>();
        for (let i = 0; i < navPoints.length; i++) {
            let node: ESObject = navPoints.item(i);
            if (node.nodeType != 1) { // Node.ELEMENT_NODE == 1
                continue;
            }
            if (node.nodeName != NCXTags.navPoint) {
                continue;
            }
            let tocReference: TOCReference = NCXDocument.readTOCReference(<ESObject>node, book);
            result.push(tocReference);
        }
        return result;
    }
    private static readTOCReference(navPointElement: ESObject, book: Book): TOCReference {
        let label: string = NCXDocument.readNavLabel(navPointElement);
        let tocResourceRoot: string = StringUtil.substringBeforeLast(book.getSpine().getTocResource().getHref(), '/');
        if (tocResourceRoot.length == book.getSpine().getTocResource().getHref().length) {
            tocResourceRoot = "";
        }
        else {
            tocResourceRoot = tocResourceRoot + "/";
        }
        let reference: string = StringUtil.collapsePathDots(tocResourceRoot + NCXDocument.readNavReference(navPointElement));
        let href: string = StringUtil.substringBefore(reference, Constants.FRAGMENT_SEPARATOR_CHAR);
        let fragmentId: string = StringUtil.substringAfter(reference, Constants.FRAGMENT_SEPARATOR_CHAR);
        let resourceNew: EpubResource = book.getResources().getByHref(href);
        if (resourceNew == null) {
            console.error("Resource with href " + href + " in NCX document not found");
        }
        let result: TOCReference = new TOCReference(label, resourceNew, fragmentId);
        let childTOCReferences: Array<TOCReference> = NCXDocument.readTOCReferences(navPointElement.childNodes, book);
        result.setChildren(childTOCReferences);
        return result;
    }
    private static readNavReference(navPointElement: ESObject): string {
        let contentElement: ESObject = DOMUtil.getFirstElementByTagNameNS(navPointElement, NCXDocument.NAMESPACE_NCX, NCXTags.content);
        let result: string = DOMUtil.getAttribute(contentElement, NCXDocument.NAMESPACE_NCX, NCXAttributes.src);
        try {
            result = decodeURI(result);
        }
        catch (e) {
            console.error(e.getMessage());
        }
        return result;
    }
    private static readNavLabel(navPointElement: ESObject): string {
        let navLabel: ESObject = DOMUtil.getFirstElementByTagNameNS(navPointElement, NCXDocument.NAMESPACE_NCX, NCXTags.navLabel);
        return DOMUtil.getTextChildrenContent(DOMUtil.getFirstElementByTagNameNS(navLabel, NCXDocument.NAMESPACE_NCX, NCXTags.text));
    }
    public static createNCXResource(book: Book, rootPath: string): EpubResource {
        return NCXDocument.createNCXResourceInner(book.getMetadata().getIdentifiers(), book.getTitle(), book.getMetadata().getAuthors(), book.getTableOfContents(), rootPath);
    }
    public static createNCXResourceInner(identifiers: Identifier[], title: string, authors: Author[], tableOfContents: TableOfContents, rootPath: string): EpubResource {
        let filePath = rootPath + "/" + NCXDocument.DEFAULT_NCX_HREF;
        let fd = fs.openSync(filePath, 0o100 | 0o2);
        NCXDocument.writeInner(fd.fd, identifiers, title, authors, tableOfContents);
        fs.closeSync(fd);
        // test the file content
        let stat = fs.statSync(filePath);
        let fd1 = fs.openSync(filePath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num1 = fs.readSync(fd1.fd, buf);
        let resource: EpubResource = new EpubResource(NCXDocument.DEFAULT_NCX_HREF, MediatypeService.NCX, NCXDocument.NCX_ITEM_ID, new Uint8Array(buf), ResourceUtil.decode(new Uint8Array(buf)));
        let strData = resource.getStrData();
        console.error('file content.+++++++++++ /toc.ncx: ' + strData);
        return resource;
    }
    public static writeInner(fd: number, identifiers: Identifier[], title: string, authors: Author[], tableOfContents: TableOfContents): void {
        let domParser = new DOMParser();
        let document: ESObject = domParser.parseFromString("<?xml encoding='" + Constants.CHARACTER_ENCODING + "'?>");
        let root: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.ncx);
        root.setAttribute("xmlns" + EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXDocument.NAMESPACE_NCX);
        root.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.version, NCXAttributeValues.version);
        let headElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.head);
        for (let identifier of identifiers) {
            NCXDocument.writeMetaElement(identifier.getScheme(), identifier.getValue(), headElement, document);
        }
        NCXDocument.writeMetaElement("generator", Constants.EPUBLIB_GENERATOR_NAME, headElement, document);
        NCXDocument.writeMetaElement("depth", String(tableOfContents.calculateDepth()), headElement, document);
        NCXDocument.writeMetaElement("totalPageCount", "0", headElement, document);
        NCXDocument.writeMetaElement("maxPageNumber", "0", headElement, document);
        root.appendChild(headElement);
        let docTitleElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.docTitle);
        let textElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.text);
        // write the first title
        textElement.textContent = StringUtil.defaultIfNull(title);
        docTitleElement.appendChild(textElement);
        root.appendChild(docTitleElement);
        for (let author of authors) {
            let docAuthorElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.docAuthor);
            let textElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.text);
            textElement.textContent = author.getLastname() + ", " + author.getFirstname();
            docAuthorElement.appendChild(textElement);
            root.appendChild(docAuthorElement);
        }
        let navMapElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.navMap);
        NCXDocument.writeNavPoints(tableOfContents.getTocReferences(), 1, navMapElement, document);
        root.appendChild(navMapElement);
        document.appendChild(root);
        // write document to file
        let xmlSerializer = new XMLSerializer();
        let xmlDocument: string = xmlSerializer.serializeToString(document);
        let num = fs.writeSync(fd, xmlDocument);
    }
    private static writeMetaElement(dtbName: string, content: string, parentElement: ESObject, document: ESObject): void {
        let metaElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.meta);
        metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.name, NCXDocument.PREFIX_DTB + ":" + dtbName);
        metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.content, content);
        parentElement.appendChild(metaElement);
    }
    private static writeNavPoints(tocReferences: TOCReference[], playOrder: number, parentElement: ESObject, document: ESObject): number {
        for (let tocReference of tocReferences) {
            if (tocReference.getResource() == null) {
                playOrder = NCXDocument.writeNavPoints(tocReference.getChildren(), playOrder, parentElement, document);
                continue;
            }
            let navPointElement = NCXDocument.writeNavPointStart(tocReference, playOrder, parentElement, document);
            playOrder++;
            if (tocReference.getChildren().length !== 0) {
                playOrder = NCXDocument.writeNavPoints(tocReference.getChildren(), playOrder, navPointElement, document);
            }
            parentElement.appendChild(navPointElement);
        }
        return playOrder;
    }
    private static writeNavPointStart(tocReference: TOCReference, playOrder: number, parentElement: ESObject, document: ESObject): ESObject {
        let navPointElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.navPoint);
        navPointElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.id, "navPoint-" + playOrder);
        navPointElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.playOrder, String(playOrder));
        navPointElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.clazz, NCXAttributeValues.chapter);
        let navLabelElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.navLabel);
        let textElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.text);
        textElement.textContent = tocReference.getTitle();
        navLabelElement.appendChild(textElement);
        navPointElement.appendChild(navLabelElement);
        let contentElement: ESObject = document.createElementNS(NCXDocument.NAMESPACE_NCX, NCXTags.content);
        contentElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, NCXAttributes.src, tocReference.getCompleteHref());
        navPointElement.appendChild(contentElement);
        return navPointElement;
    }
}
export default NCXDocument;
