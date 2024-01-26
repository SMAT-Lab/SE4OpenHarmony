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
import MediaType from "../domain/MediaType";
import StringUtil from "../util/StringUtil";
/**
 * Manages mediatypes that are used by epubs
 *
 * @author paul
 *
 */
class MediatypeService {
    private static readonly listXHTML: string[] = [".htm", ".html", ".xhtml"];
    public static readonly XHTML: MediaType = new MediaType("application/xhtml+xml", ".xhtml", MediatypeService.listXHTML);
    public static readonly EPUB: MediaType = new MediaType("application/epub+zip", ".epub");
    public static readonly NCX: MediaType = new MediaType("application/x-dtbncx+xml", ".ncx");
    public static readonly JAVASCRIPT: MediaType = new MediaType("text/javascript", ".js");
    public static readonly CSS: MediaType = new MediaType("text/css", ".css");
    // images
    private static readonly listJPG: string[] = [".jpg", ".jpeg"];
    public static readonly JPG: MediaType = new MediaType("image/jpeg", ".jpg", MediatypeService.listJPG);
    public static readonly PNG: MediaType = new MediaType("image/png", ".png");
    public static readonly GIF: MediaType = new MediaType("image/gif", ".gif");
    public static readonly SVG: MediaType = new MediaType("image/svg+xml", ".svg");
    // fonts
    public static readonly TTF: MediaType = new MediaType("application/x-truetype-font", ".ttf");
    public static readonly OPENTYPE: MediaType = new MediaType("application/vnd.ms-opentype", ".otf");
    public static readonly WOFF: MediaType = new MediaType("application/font-woff", ".woff");
    // audio
    public static readonly MP3: MediaType = new MediaType("audio/mpeg", ".mp3");
    public static readonly OGG: MediaType = new MediaType("audio/ogg", ".ogg");
    // video
    public static readonly MP4: MediaType = new MediaType("video/mp4", ".mp4");
    public static readonly SMIL: MediaType = new MediaType("application/smil+xml", ".smil");
    public static readonly XPGT: MediaType = new MediaType("application/adobe-page-template+xml", ".xpgt");
    public static readonly PLS: MediaType = new MediaType("application/pls+xml", ".pls");
    public static mediatypes: MediaType[] = [
        MediatypeService.XHTML, MediatypeService.EPUB, MediatypeService.JPG, MediatypeService.PNG, MediatypeService.GIF,
        MediatypeService.CSS, MediatypeService.SVG, MediatypeService.TTF, MediatypeService.NCX, MediatypeService.XPGT,
        MediatypeService.OPENTYPE, MediatypeService.WOFF, MediatypeService.SMIL, MediatypeService.PLS,
        MediatypeService.JAVASCRIPT, MediatypeService.MP3, MediatypeService.MP4, MediatypeService.OGG
    ];
    public static mediaTypesByName: Map<string, MediaType> = new Map<string, MediaType>();
    constructor() {
    }
    public static isBitmapImage(mediaType: MediaType): boolean {
        return mediaType == MediatypeService.JPG || mediaType == MediatypeService.PNG || mediaType == MediatypeService.GIF;
    }
    /**
     * Gets the MediaType based on the file extension.
     * Null of no matching extension found.
     *
     * @param filename
     * @return the MediaType based on the file extension.
     */
    public static determineMediaType(filename: string): MediaType {
        for (let mediaType of this.mediaTypesByName.values()) {
            for (let extension of mediaType.getExtensions()) {
                if (StringUtil.endsWithIgnoreCase(filename, extension)) {
                    return mediaType;
                }
            }
        }
        return null;
    }
    public static getMediaTypeByName(mediaTypeName: string): MediaType {
        return MediatypeService.mediaTypesByName.get(mediaTypeName);
    }
}
export default MediatypeService;
{
    let i: number;
    for (i = 0; i < MediatypeService.mediatypes.length; i++) {
        MediatypeService.mediaTypesByName.set(MediatypeService.mediatypes[i].getName(), MediatypeService.mediatypes[i]);
    }
}
