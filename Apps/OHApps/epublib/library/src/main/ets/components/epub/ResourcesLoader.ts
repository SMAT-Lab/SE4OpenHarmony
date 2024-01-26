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


import Zlib from "@ohos.zlib"
import EpubResource from "../domain/EpubResource"
import Resources from "../domain/Resources"
import MediaType from "../domain/MediaType"
import MediatypeService from "../service/MediatypeService"
import ResourceUtil from "../util/ResourceUtil"
import util from '@ohos.util';
import Fileio from '@ohos.fileio';
import fs from '@ohos.file.fs';

class ResourcesLoader {
    constructor() {
    }

    public static loadResources(inZipPath: string, defaultHtmlEncoding: string, lazyLoadedTypes?: Array<MediaType>): Resources {
        return this.readerOutZipFiles(inZipPath, defaultHtmlEncoding, lazyLoadedTypes);
    }

    public static loadResourcesZip(inZipPath: string): Promise<string> | null{
        if (inZipPath == "" || !inZipPath.toLowerCase().endsWith(".epub")||!fs.accessSync(inZipPath)) {
            return null;
        }
        return new Promise(result => {
            let newPath = inZipPath.replace(".epub", ".zip")
            fs.rename(inZipPath, newPath).then(()=> {
                console.info("rename succeed");
                let outFile = inZipPath.substring(0, newPath.length - ".zip".length)
                fs.mkdir(outFile).then(() => {
                    var options = {
                        level: Zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
                        memLevel: Zlib.MemLevel.MEM_LEVEL_DEFAULT,
                        strategy: Zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
                    };
                    Zlib.decompressFile(newPath, outFile, options).then((data) => {
                        console.log("unzipFile result��" + data);
                        result(outFile)
                    }).catch((err) => {
                        console.log("catch((err)=>" + err);
                    })
                })
            }).catch(function (err) {
                console.info("rename failed with error:" + err);
            });
        })


    }

    public static readerOutZipFiles(outZipPath: string, defaultHtmlEncoding: string, lazyLoadedTypes?: Array<MediaType>): Resources {
        let result = new Resources()
        return ResourcesLoader.readerDir(outZipPath, defaultHtmlEncoding, lazyLoadedTypes, result);
    }

    private static readerDir(outZipPath: string, defaultHtmlEncoding: string, lazyLoadedTypes?: Array<MediaType>, result?: Resources): Resources {
        console.info("-----ResourcesLoader.ets--------------init---readerDir-----------------")
        try {
            let dir = Fileio.opendirSync(outZipPath);
            let dirent;
            do {
                dirent = dir.readSync();
                if (dirent && dirent.isFile()) {
                    result.add(ResourcesLoader.readerFile(outZipPath, defaultHtmlEncoding, dirent, lazyLoadedTypes));
                } else if (dirent && dirent.isDirectory()) {
                    result = this.readerDir(outZipPath + "/" + dirent.name, defaultHtmlEncoding + "/", lazyLoadedTypes, result);
                }
            } while (dirent);
        } catch (e) {
            console.error(e);
        }
        console.info("-----ResourcesLoader.ets---readerDir()--------------result----" + result);
        return result;
    }

    private static readerFile(dirPath: string, defaultHtmlEncoding: string, dirent: any, lazyLoadedTypes?: Array<MediaType>): EpubResource {
        let fullpath = dirPath + "/" + dirent.name;
        let stat = fs.statSync(fullpath);
        let resource: EpubResource;
        let fd = fs.openSync(fullpath, 0o2);
        let buf = new ArrayBuffer(stat.size);
        let num = fs.readSync(fd.fd, buf);
        resource = ResourceUtil.createResource(dirent.name, new Uint8Array(buf));
        if (resource.getMediaType() == MediatypeService.XHTML) {
            resource.setInputEncoding(defaultHtmlEncoding);
        }
        return resource;
    }

    /**
     * Whether the given href will load a mediaType that is in the collection of lazilyLoadedMediaTypes.
     *
     * @param href
     * @param lazilyLoadedMediaTypes
     * @return Whether the given href will load a mediaType that is in the collection of lazilyLoadedMediaTypes.
     */
    private static shouldLoadLazy(href: string, lazilyLoadedMediaTypes?: Array<MediaType>): boolean {
        if (lazilyLoadedMediaTypes == null || lazilyLoadedMediaTypes.length == 0 || (lazilyLoadedMediaTypes.length == 1 && lazilyLoadedMediaTypes[0] == null)) {
            return false;
        }
        let meiaType = MediatypeService.determineMediaType(href);
        return lazilyLoadedMediaTypes.indexOf(meiaType) >= 0;
    }

    /**
     * read the file's content, return byte[]
     * @param filePath file's path
     * @return Uint8Array
     */
    private static getBytesFromReadFile(filePath: string, size: number): Uint8Array{
        let steam = fs.createStreamSync(filePath, "r+");
        let bytes: Uint8Array;
        steam.read(new ArrayBuffer(size), { offset: 1, length: 5 }, function (err, readOut) {
            if (!err) {
                let textEncoder = new util.TextEncoder();
                bytes = textEncoder.encodeInto(readOut.toString());
            }
        });
        steam.close();
        return bytes;
    }

    /**
     * read the file's content, return byte[]
     * @param filePath file's path
     * @return Uint8Array
     */
    private static getStrFromReadFile(filePath: string, size: number): string{
        let steam = fs.createStreamSync(filePath, "r+");
        let strRet: string;
        steam.read(new ArrayBuffer(size), { offset: 1, length: 5 }, function (err, readOut) {
            if (!err) {
                strRet = readOut.toString();
            }
        });
        steam.close();
        return strRet;
    }
}

export default ResourcesLoader