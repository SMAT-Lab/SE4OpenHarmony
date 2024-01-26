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



import Book from "../domain/Book"
import MediatypeService from "../service/MediatypeService"
import EpubResource from "../domain/EpubResource"
import BookProcessor from './BookProcessor'
import NCXDocument from './NCXDocument'
import ResourceUtil from "../util/ResourceUtil"
import fs from '@ohos.file.fs';
import PackageDocumentWriter from "./PackageDocumentWriter";
import Zlib from "@ohos.zlib"
import { GlobalContext } from '../util/GlobalContext'

class EpubWriter {

    // package
    public static readonly EMPTY_NAMESPACE_PREFIX: string = "";
    private bookProcessor: BookProcessor = new BookProcessor();
    private book: Book;
    private mediatypeService: MediatypeService = new MediatypeService();

    constructor(book?: Book) {
        this.book = book;
    }

    public write(book: Book, fileName: string): void {
        this.book = book;
        if (fileName == "" || !fileName.toLowerCase().endsWith(".epub")) {
            return null;
        }
        let outFile = fileName.substring(0, fileName.length - ".epub".length)
        let dirPath = GlobalContext.getContext().getValue('filePath') + "/" + outFile
        fs.mkdir(dirPath).then(() => {
            this.writeMimeType(dirPath);
            this.writeContainer(dirPath);
            this.initTOCResource(book, dirPath);
            let pathOEBPS = dirPath + "/OEBPS";
            fs.mkdir(pathOEBPS).then(() => {
                this.writeResources(book, dirPath);
                this.writePackageDocument(book, dirPath);
            })

        }).then(() => {
            this.generateEpub(dirPath)
        });

    }

    private generateEpub(dirPath: string) {
        var outFile = dirPath + ".zip";
        var options = {
            level: Zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
            memLevel: Zlib.MemLevel.MEM_LEVEL_DEFAULT,
            strategy: Zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
        };
        Zlib.compressFile(dirPath, outFile, options).then((data) => {
            console.log("zipFile result��" + data);
            fs.rename(outFile, dirPath + ".epub")
        }).then(() => {
        }).catch((err) => {
            console.log("catch((err)=>" + err);
        });


    }

    private processBook(book: Book) {
        if (this.bookProcessor != null) {
            book = this.bookProcessor.processBook(book);
        }
        return book;
    }

    private initTOCResource(book: Book, rootPath: string): void {
        let tocResource: EpubResource;
        try {
            tocResource = NCXDocument.createNCXResource(book, rootPath);
            let currentTocResource: EpubResource = book.getSpine().getTocResource();
            if (currentTocResource != null) {
                book.getResources().remove(currentTocResource.getHref());
            }
            book.getSpine().setTocResource(tocResource);
            book.getResources().add(tocResource);
        } catch (e) {
            console.error(e);
        }
    }

    private writeResources(book: Book, rootPath: string): void {
        for (let resource of book.getResources().getAll()) {
            this.writeResource(resource, rootPath);
        }
    }

    /**
       * Writes the resource to the resultStream.
       *
       * @param resource
       * @param resultStream
       * @throws IOException
       */
    private writeResource(resource: EpubResource, rootPath: string): void{
        if (resource == null) {
            return;
        }

        let pathNew = rootPath + "/OEBPS";
        let filePath = pathNew + "/" + resource.getHref();
        let fd = fs.openSync(filePath, 0o100 | 0o2);
        let out = resource.getStrData();
        let sizeStr = out.length;
        let size = resource.getData().length;
        let size2 = out.length;
        let num = fs.writeSync(fd.fd, out);
        fs.closeSync(fd);

        // test the file content
        let stat = fs.statSync(filePath);
        let fd1 = fs.openSync(filePath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num1 = fs.readSync(fd.fd, buf);

        let resourcetmp: EpubResource = ResourceUtil.createResource("mimetype", new Uint8Array(buf));
        let strData = resourcetmp.getStrData();
        console.error('file content.+++++++++++ /' + resource.getHref() + ': ' + strData);
    }

    private writePackageDocument(book: Book, rootPath: string): void{
        let pathNew = rootPath + "/OEBPS";
        let filePath = pathNew + "/content.opf";
        let fd = fs.openSync(filePath, 0o100 | 0o2);
        PackageDocumentWriter.write(fd.fd, book);
        fs.closeSync(fd);

        // test the file content
        let stat = fs.statSync(filePath);
        let fd1 = fs.openSync(filePath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num1 = fs.readSync(fd.fd, buf);

        let resource: EpubResource = ResourceUtil.createResource("content.opf", new Uint8Array(buf));
        let strData = resource.getStrData();
        console.error('file content.+++++++++++ /content.opf: ' + strData);
    }

    /**
       * Writes the META-INF/container.xml file.
       *
       * @param resultStream
       * @throws IOException
       */
    private writeContainer(rootPath: string): void{
        let out: string = "<?xml version=\"1.0\"?>\n";
        out = out.concat("<container version=\"1.0\" xmlns=\"urn:oasis:names:tc:opendocument:xmlns:container\">\n");
        out = out.concat("\t<rootfiles>\n");
        out = out.concat("\t\t<rootfile full-path=\"OEBPS/content.opf\" media-type=\"application/oebps-package+xml\"/>\n");
        out = out.concat("\t</rootfiles>\n");
        out = out.concat("</container>");

        let pathNew = rootPath + "/META-INF";
        fs.mkdirSync(pathNew);
        let filePath = pathNew + "/container.xml";
        let fd = fs.openSync(filePath, 0o100 | 0o2);
        let num = fs.writeSync(fd.fd, out);
        fs.closeSync(fd);

        // test the file content
        let stat = fs.statSync(filePath);
        let fd1 = fs.openSync(filePath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num1 = fs.readSync(fd1.fd, buf);
        fs.closeSync(fd1);

        let resource: EpubResource = ResourceUtil.createResource("container.xml", new Uint8Array(buf));
        let strData = resource.getStrData();
        console.error('file content.+++++++++++ /container.xml: ' + strData);
    }

    /**
       * Stores the mimetype as an uncompressed file in the ZipOutputStream.
       *
       * @param resultStream
       * @throws IOException
       */
    private writeMimeType(rootPath: string): void{
        let filePath = rootPath + "/mimetype";
        let fd = fs.openSync(filePath, 0o100 | 0o2);
        let num = fs.writeSync(fd.fd, MediatypeService.EPUB.getName());
        fs.closeSync(fd);

        // test the file content
        let stat = fs.statSync(filePath);
        let fd1 = fs.openSync(filePath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num1 = fs.readSync(fd1.fd, buf);
        fs.closeSync(fd1);

        let resource: EpubResource = ResourceUtil.createResource("mimetype", new Uint8Array(buf));
        let strData = resource.getStrData();
        console.error('file content.+++++++++++ /mimetype: ' + strData);
    }

    public static getNcxId(): string {
        return "ncx";
    }

    public static getNcxHref(): string{
        return "toc.ncx";
    }

    public static getNcxMediaType(): string{
        return MediatypeService.NCX.getName();
    }

    private getBookProcessor(): BookProcessor{
        return this.bookProcessor;
    }

    public setBookProcessor(bookProcessor: BookProcessor): void{
        this.bookProcessor = bookProcessor;
    }
}

export default EpubWriter