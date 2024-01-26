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
import DCAttributes from './DCAttributes';
import OPFAttributes from './OPFAttributes';
import DCTags from './DCTags';
import OPFTags from './OPFTags';
import StringUtil from '../util/StringUtil';
import Identifier from '../domain/Identifier';
import Author from '../domain/Author';
import DOMUtil from './DOMUtil';
import Metadata from '../domain/Metadata';
import PackageDocumentBase from './PackageDocumentBase';
import Date from '../domain/Date';
/**
 * Reads the package document metadata.
 *
 * In its own separate class because the PackageDocumentReader became a bit large and unwieldy.
 *
 * @author paul
 *
 */
class PackageDocumentMetadataReader {
    constructor() {
    }
    public static readMetadata(packageDocument: ESObject): Metadata {
        let result: Metadata = new Metadata();
        let metadataElement: ESObject = DOMUtil.getFirstElementByTagNameNS(packageDocument.documentElement, PackageDocumentBase.NAMESPACE_OPF, OPFTags.metadata);
        if (metadataElement == null) {
            console.error("Package does not contain element " + OPFTags.metadata);
            return result;
        }
        result.setTitles(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.title));
        result.setPublishers(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.publisher));
        result.setDescriptions(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.description));
        result.setRights(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.rights));
        result.setTypes(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.type));
        result.setSubjects(DOMUtil.getElementsTextChild(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.subject));
        result.setIdentifiers(PackageDocumentMetadataReader.readIdentifiers(metadataElement));
        result.setAuthors(PackageDocumentMetadataReader.readCreators(metadataElement));
        result.setContributors(PackageDocumentMetadataReader.readContributors(metadataElement));
        result.setDates(PackageDocumentMetadataReader.readDates(metadataElement));
        result.setOtherProperties(PackageDocumentMetadataReader.readOtherProperties(metadataElement));
        result.setMetaAttributes(PackageDocumentMetadataReader.readMetaProperties(metadataElement));
        let languageTag: ESObject = DOMUtil.getFirstElementByTagNameNS(metadataElement, PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.language);
        if (languageTag != null) {
            result.setLanguage(DOMUtil.getTextChildrenContent(languageTag));
        }
        return result;
    }
    /**
         * consumes meta tags that have a property attribute as defined in the standard. For example:
         * &lt;meta property="rendition:layout"&gt;pre-paginated&lt;/meta&gt;
         * @param metadataElement
         * @return
         */
    private static readOtherProperties(metadataElement: ESObject): Map<string, string> {
        let result: Map<string, string> = new Map<string, string>();
        let metaTags = metadataElement.getElementsByTagName(OPFTags.meta);
        for (let i: number = 0; i < metaTags.length; i++) {
            let metaNode = metaTags.item(i);
            let property = metaNode.getAttribute(OPFAttributes.property);
            if (property != null) {
                let name: string = property;
                let value: string = metaNode.textContent;
                result.set(name, value);
            }
        }
        return result;
    }
    /**
         * consumes meta tags that have a property attribute as defined in the standard. For example:
         * &lt;meta property="rendition:layout"&gt;pre-paginated&lt;/meta&gt;
         * @param metadataElement
         * @return
         */
    private static readMetaProperties(metadataElement: ESObject): Map<string, string> {
        let result: Map<string, string> = new Map<string, string>();
        let metaTags = metadataElement.getElementsByTagName(OPFTags.meta);
        for (let i: number = 0; i < metaTags.length; i++) {
            let metaElement: ESObject = metaTags.item(i);
            let name: string = metaElement.getAttribute(OPFAttributes.name);
            let value: string = metaElement.getAttribute(OPFAttributes.content);
            result.set(name, value);
        }
        return result;
    }
    private static getBookIdId(document: ESObject): string {
        let packageElement: ESObject = DOMUtil.getFirstElementByTagNameNS(document.documentElement, PackageDocumentBase.NAMESPACE_OPF, OPFTags.packageTag);
        if (packageElement == null) {
            return null;
        }
        let result: string = packageElement.getAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.uniqueIdentifier);
        return result;
    }
    private static readCreators(metadataElement: ESObject): Author[] {
        return PackageDocumentMetadataReader.readAuthors(DCTags.creator, metadataElement);
    }
    private static readContributors(metadataElement: ESObject): Author[] {
        return PackageDocumentMetadataReader.readAuthors(DCTags.contributor, metadataElement);
    }
    private static readAuthors(authorTag: string, metadataElement: ESObject): Author[] {
        let elements = metadataElement.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, authorTag);
        let result: Author[] = new Array<Author>();
        for (let i = 0; i < elements.length; i++) {
            let authorElement = elements.item(i);
            let author: Author = PackageDocumentMetadataReader.createAuthor(authorElement);
            if (author != null) {
                result.push(author);
            }
        }
        return result;
    }
    private static readDates(metadataElement: ESObject): Date[] {
        let elements = metadataElement.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.date);
        let result: Date[] = new Array<Date>();
        for (let i: number = 0; i < elements.length; i++) {
            let dateElement: ESObject = elements.item(i);
            let date: Date;
            try {
                date = new Date(DOMUtil.getTextChildrenContent(dateElement), dateElement.getAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.event));
                result.push(date);
            }
            catch (e) {
                console.error(e.getMessage());
            }
        }
        return result;
    }
    private static createAuthor(authorElement: ESObject): Author {
        let authorString: string = DOMUtil.getTextChildrenContent(authorElement);
        if (StringUtil.isBlank(authorString)) {
            return null;
        }
        let spacePos: number = authorString.lastIndexOf(' ');
        let result: Author;
        if (spacePos < 0) {
            result = new Author(authorString);
        }
        else {
            result = new Author(authorString.substring(0, spacePos), authorString.substring(spacePos + 1));
        }
        result.setRole(authorElement.getAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.role));
        return result;
    }
    private static readIdentifiers(metadataElement: ESObject): Identifier[] {
        let identifierElements = metadataElement.getElementsByTagNameNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.identifier);
        if (identifierElements.length == 0) {
            console.error("Package does not contain element " + DCTags.identifier);
            return new Array<Identifier>();
        }
        let bookIdId: string = PackageDocumentMetadataReader.getBookIdId(metadataElement.ownerDocument);
        let result: Identifier[] = new Array<Identifier>();
        for (let i: number = 0; i < identifierElements.length; i++) {
            let identifierElement: ESObject = identifierElements.item(i);
            let schemeName: string = identifierElement.getAttributeNS(PackageDocumentBase.NAMESPACE_OPF, DCAttributes.scheme);
            let identifierValue: string = DOMUtil.getTextChildrenContent(identifierElement);
            if (StringUtil.isBlank(identifierValue)) {
                continue;
            }
            let identifier: Identifier = new Identifier(schemeName, identifierValue);
            if (identifierElement.getAttribute("id") == bookIdId) {
                identifier.setBookId(true);
            }
            result.push(identifier);
        }
        return result;
    }
}
export default PackageDocumentMetadataReader;
