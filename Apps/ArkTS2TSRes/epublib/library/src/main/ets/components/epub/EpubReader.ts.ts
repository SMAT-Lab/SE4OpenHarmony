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
import Book from "../domain/Book";
import MediaType from "../domain/MediaType";
import MediatypeService from "../service/MediatypeService";
import ResourcesLoader from "../epub/ResourcesLoader";
import { Constants } from '../Constants';
import EpubResource from "../domain/EpubResource";
import Resources from "../domain/Resources";
import { DOMParser } from '@xmldom/xmldom';
import StringUtil from '../util/StringUtil';
import PackageDocumentReader from "./PackageDocumentReader";
import NCXDocument from './NCXDocument';
import fs from '@ohos.file.fs';
class EpubReader {
    constructor() {
    }
    public static readEpub(epubPath: string, encoding?: string, lazyLoadedTypes?: Array<MediaType>): Promise<Book> {
        return new Promise(result => {
            ResourcesLoader.loadResourcesZip(epubPath).then((outFile) => {
                let book = EpubReader.readEpubFile(outFile, encoding, lazyLoadedTypes);
                result(book);
            });
        });
    }
    public static unEpub(epubPath: string): Promise<string> {
        return ResourcesLoader.loadResourcesZip(epubPath);
    }
    public static outFile(inZipPath: string): string {
        return inZipPath.substring(0, inZipPath.length - ".epub".length);
    }
    public static readEpubFile(inPath: string, encoding?: string, lazyLoadedTypes?: Array<MediaType>): Book {
        try {
            let res = fs.accessSync(inPath);
            if (res) {
                return this.readEpubToBook(ResourcesLoader.loadResources(inPath, encoding ? encoding : Constants.CHARACTER_ENCODING, lazyLoadedTypes ? lazyLoadedTypes : null));
            }
        }
        catch (err) {
            console.info("accessSync failed : " + err.message + ", error code: " + err.code);
        }
    }
    public static readEpubLazy(inPath: string, encoding?: string, lazyLoadedTypes?: Array<MediaType>): Book {
        return this.readEpubToBook(ResourcesLoader.loadResources(inPath, encoding ? encoding : Constants.CHARACTER_ENCODING, lazyLoadedTypes ? lazyLoadedTypes : Array.from(MediatypeService.mediatypes)));
    }
    public static readEpubToBook(resources: Resources, result?: Book): Book {
        result = result || new Book();
        this.handleMimeType(resources);
        let packageResourceHref = this.getPackageResourceHref(resources);
        let packageResource = this.processPackageResource(packageResourceHref, result, resources);
        result.setOpfResource(packageResource);
        let ncxResource = this.processNcxResource(packageResource, result);
        result.setNcxResource(ncxResource);
        return result;
    }
    private static processNcxResource(packageResource: EpubResource, book: Book): EpubResource {
        return NCXDocument.read(book);
    }
    private static getPackageResourceHref(resources: Resources): string {
        let defaultResult: string = "content.opf";
        let result: string = defaultResult;
        let containerResource: EpubResource = resources.remove("container.xml");
        if (containerResource == null) {
            return result;
        }
        try {
            let domParser = new DOMParser();
            let document = domParser.parseFromString(containerResource.getStrData());
            let rootFileElement = document.getElementsByTagName("rootfiles")[0].getElementsByTagName("rootfile")[0];
            result = rootFileElement.getAttribute("full-path");
        }
        catch (e) {
            console.error(e);
        }
        if (StringUtil.isBlank(result)) {
            result = defaultResult;
        }
        return result;
    }
    private static processPackageResource(packageResourceHref: string, book: Book, resources: Resources): EpubResource {
        let packageResource = resources.remove(packageResourceHref);
        try {
            PackageDocumentReader.read(packageResource, this, book, resources);
        }
        catch (e) {
            console.error(e);
        }
        return packageResource;
    }
    private static handleMimeType(resources: Resources): void {
        resources.remove("mimetype");
    }
}
export default EpubReader;
