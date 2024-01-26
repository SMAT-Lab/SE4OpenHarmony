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


import EpubResource from "../domain/EpubResource"
import MediatypeService from "../service/MediatypeService"


class LazyResource extends EpubResource {
    private filename: string;
    private cachedSize: number;

    /**
     * Creates a Lazy resource, by not actually loading the data for this entry.
     *
     * The data will be loaded on the first call to getData()
     *
     * @param filename the file name for the epub we're created from.
     * @param size the size of this resource.
     * @param href The resource's href within the epub.
     */
    public constructor(filename: string, size: number, href: string) {
        super(href, MediatypeService.determineMediaType(href), null, null, null);
        this.filename = filename;
        this.cachedSize = size;
    }

    /**
     * Returns the size of this resource in bytes.
     *
     * @return the size.
     */
    public getSize(): number {
        if (this.data != null) {
            return this.data.length;
        }
        return this.cachedSize;
    }
}

export default LazyResource