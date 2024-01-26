/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import QuickTimeDirectory from '../QuickTimeDirectory';
import QuickTimeMetadataDescriptor from './QuickTimeMetadataDescriptor';
class QuickTimeMetadataDirectory extends QuickTimeDirectory {
    // User Data Types Holder (0x0400 - 0x04FF)
    // https://sno.phy.queensu.ca/~phil/exiftool/TagNames/QuickTime.html#Meta
    // User Metadata Types Holder (0x0500 - 0x05FF)
    // https://developer.apple.com/library/content/documentation/QuickTime/QTFF/Metadata/Metadata.html#//apple_ref/doc/uid/TP40000939-CH1-SW43
    // https://sno.phy.queensu.ca/~phil/exiftool/TagNames/QuickTime.html#Meta
    public static readonly TAG_ALBUM: number = 0x0500;
    public static readonly TAG_ARTIST: number = 0x0501;
    public static readonly TAG_ARTWORK: number = 0x0502;
    public static readonly TAG_AUTHOR: number = 0x0503;
    public static readonly TAG_COMMENT: number = 0x0504;
    public static readonly TAG_COPYRIGHT: number = 0x0505;
    public static readonly TAG_CREATION_DATE: number = 0x0506;
    public static readonly TAG_DESCRIPTION: number = 0x0507;
    public static readonly TAG_DIRECTOR: number = 0x0508;
    public static readonly TAG_TITLE: number = 0x0509;
    public static readonly TAG_GENRE: number = 0x050A;
    public static readonly TAG_INFORMATION: number = 0x050B;
    public static readonly TAG_KEYWORDS: number = 0x050C;
    public static readonly TAG_LOCATION_ISO6709: number = 0x050D;
    public static readonly TAG_PRODUCER: number = 0x050E;
    public static readonly TAG_PUBLISHER: number = 0x050F;
    public static readonly TAG_SOFTWARE: number = 0x0510;
    public static readonly TAG_YEAR: number = 0x0511;
    public static readonly TAG_COLLECTION_USER: number = 0x0512;
    public static readonly TAG_RATING_USER: number = 0x0513;
    public static readonly TAG_LOCATION_NAME: number = 0x0514;
    public static readonly TAG_LOCATION_BODY: number = 0x0515;
    public static readonly TAG_LOCATION_NOTE: number = 0x0516;
    public static readonly TAG_LOCATION_ROLE: number = 0x0517;
    public static readonly TAG_LOCATION_DATE: number = 0x0518;
    public static readonly TAG_DIRECTION_FACING: number = 0x0519;
    public static readonly TAG_DIRECTION_MOTION: number = 0x051A;
    public static readonly TAG_DISPLAY_NAME: number = 0x051B;
    public static readonly TAG_CONTENT_IDENTIFIER: number = 0x051C;
    public static readonly TAG_MAKE: number = 0x051D;
    public static readonly TAG_MODEL: number = 0x051E;
    public static readonly TAG_ORIGINATING_SIGNATURE: number = 0x051F;
    public static readonly TAG_PIXEL_DENSITY: number = 0x0520;
    public constructor() {
        super();
        this.setDescriptor(new QuickTimeMetadataDescriptor(this));
    }
    public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [QuickTimeMetadataDirectory.TAG_ALBUM, "Album"],
        [QuickTimeMetadataDirectory.TAG_ARTIST, "Artist"],
        [QuickTimeMetadataDirectory.TAG_ARTWORK, "Artwork"],
        [QuickTimeMetadataDirectory.TAG_AUTHOR, "Author"],
        [QuickTimeMetadataDirectory.TAG_COMMENT, "Comment"],
        [QuickTimeMetadataDirectory.TAG_COPYRIGHT, "Copyright"],
        [QuickTimeMetadataDirectory.TAG_CREATION_DATE, "Creation Date"],
        [QuickTimeMetadataDirectory.TAG_DESCRIPTION, "Description"],
        [QuickTimeMetadataDirectory.TAG_DIRECTOR, "Director"],
        [QuickTimeMetadataDirectory.TAG_TITLE, "Title"],
        [QuickTimeMetadataDirectory.TAG_GENRE, "Genre"],
        [QuickTimeMetadataDirectory.TAG_INFORMATION, "Information"],
        [QuickTimeMetadataDirectory.TAG_KEYWORDS, "Keywords"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_ISO6709, "ISO 6709"],
        [QuickTimeMetadataDirectory.TAG_PRODUCER, "Producer"],
        [QuickTimeMetadataDirectory.TAG_PUBLISHER, "Publisher"],
        [QuickTimeMetadataDirectory.TAG_SOFTWARE, "Software"],
        [QuickTimeMetadataDirectory.TAG_YEAR, "Year"],
        [QuickTimeMetadataDirectory.TAG_COLLECTION_USER, "Collection User"],
        [QuickTimeMetadataDirectory.TAG_RATING_USER, "Rating User"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_NAME, "Location Name"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_BODY, "Location Body"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_NOTE, "Location Note"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_ROLE, "Location Role"],
        [QuickTimeMetadataDirectory.TAG_LOCATION_DATE, "Location Date"],
        [QuickTimeMetadataDirectory.TAG_DIRECTION_FACING, "Direction Facing"],
        [QuickTimeMetadataDirectory.TAG_DIRECTION_MOTION, "Direction Motion"],
        [QuickTimeMetadataDirectory.TAG_DISPLAY_NAME, "Display Name"],
        [QuickTimeMetadataDirectory.TAG_CONTENT_IDENTIFIER, "Content Identifier"],
        [QuickTimeMetadataDirectory.TAG_MAKE, "Make"],
        [QuickTimeMetadataDirectory.TAG_MODEL, "Model"],
        [QuickTimeMetadataDirectory.TAG_ORIGINATING_SIGNATURE, "Originating Signature"],
        [QuickTimeMetadataDirectory.TAG_PIXEL_DENSITY, "Pixel Density"],
        [0x0400, "iTunes Info"],
        [0x0401, "Parent Short Title"],
        [0x0402, "Parent Product ID"],
        [0x0403, "Parent Title"],
        [0x0404, "Short Title"],
        [0x0405, "Unknown_AACR?"],
        [0x0406, "Unknown_CDEK?"],
        [0x0407, "Unknown_CDET?"],
        [0x0408, "GUID"],
        [0x0409, "Product Version"],
        [0x040A, "Album Artist"],
        [0x040B, "Apple Store Account Type"],
        [0x040C, "Album"],
        [0x040D, "Apple Store Account"],
        [0x040E, "Album Title ID"],
        [0x040F, "Author"],
        [0x0410, "Category"],
        [0x0411, "Apple Store Catalog ID"],
        [0x0412, "Cover Art"],
        [0x0413, "Compilation"],
        [0x0414, "Copyright"],
        [0x0415, "Description"],
        [0x0416, "Disk Number"],
        [0x0417, "Description"],
        [0x0418, "Episode Global Unique ID"],
        [0x0419, "Genre ID"],
        [0x041A, "Genre"],
        [0x041B, "Grouping"],
        [0x041C, "Google Host Header"],
        [0x041D, "Google Ping Message"],
        [0x041E, "Google Ping URL"],
        [0x041F, "Google Source Data"],
        [0x0420, "Google Start Time"],
        [0x0421, "Google Track Duration"],
        [0x0422, "HD Video"],
        [0x0423, "iTunes U"],
        [0x0424, "Keyword"],
        [0x0425, "Long Description"],
        [0x0426, "Podcast"],
        [0x0427, "Performer"],
        [0x0428, "Play Gap"],
        [0x0429, "Play List ID"],
        [0x042A, "Product ID"],
        [0x042B, "Purchase Date"],
        [0x042C, "Podcast URL"],
        [0x042D, "Rating Percent"],
        [0x042E, "Release Date"],
        [0x042F, "Rating"],
        [0x0430, "Apple Store Country"],
        [0x0431, "Sort Album Artist"],
        [0x0432, "Sort Album"],
        [0x0433, "Sort Artist"],
        [0x0434, "Sort Composer"],
        [0x0435, "Sort Name"],
        [0x0436, "Sort Show"],
        [0x0437, "Media Type"],
        [0x0438, "Title"],
        [0x0439, "Beats Per Minute"],
        [0x043A, "Track Number"],
        [0x043B, "TV Episode ID"],
        [0x043C, "TV Episode"],
        [0x043D, "TV Network Name"],
        [0x043E, "TV Show"],
        [0x043F, "TV Season"],
        [0x0440, "Year"],
        [0x0441, "Artist"],
        [0x0442, "Album"],
        [0x0443, "Comment"],
        [0x0444, "Composer"],
        [0x0445, "Copyright"],
        [0x0446, "Content Create Date"],
        [0x0447, "Description"],
        [0x0448, "Encoded By"],
        [0x0449, "Genre"],
        [0x044A, "Grouping"],
        [0x044B, "Lyrics"],
        [0x044C, "Title"],
        [0x044D, "Narrator"],
        [0x044E, "Publisher"],
        [0x044F, "Encoder"],
        [0x0450, "Track"],
        [0x0451, "Composer"]
    ]);
    static readonly _tagIntegerMap: Map<string, number> = new Map<string, number>([
        ["com.apple.quicktime.album", QuickTimeMetadataDirectory.TAG_ALBUM],
        ["com.apple.quicktime.artist", QuickTimeMetadataDirectory.TAG_ARTIST],
        ["com.apple.quicktime.artwork", QuickTimeMetadataDirectory.TAG_ARTWORK],
        ["com.apple.quicktime.author", QuickTimeMetadataDirectory.TAG_AUTHOR],
        ["com.apple.quicktime.comment", QuickTimeMetadataDirectory.TAG_COMMENT],
        ["com.apple.quicktime.copyright", QuickTimeMetadataDirectory.TAG_COPYRIGHT],
        ["com.apple.quicktime.creationdate", QuickTimeMetadataDirectory.TAG_CREATION_DATE],
        ["com.apple.quicktime.description", QuickTimeMetadataDirectory.TAG_DESCRIPTION],
        ["com.apple.quicktime.director", QuickTimeMetadataDirectory.TAG_DIRECTOR],
        ["com.apple.quicktime.title", QuickTimeMetadataDirectory.TAG_TITLE],
        ["com.apple.quicktime.genre", QuickTimeMetadataDirectory.TAG_GENRE],
        ["com.apple.quicktime.information", QuickTimeMetadataDirectory.TAG_INFORMATION],
        ["com.apple.quicktime.keywords", QuickTimeMetadataDirectory.TAG_KEYWORDS],
        ["com.apple.quicktime.location.ISO6709", QuickTimeMetadataDirectory.TAG_LOCATION_ISO6709],
        ["com.apple.quicktime.producer", QuickTimeMetadataDirectory.TAG_PRODUCER],
        ["com.apple.quicktime.publisher", QuickTimeMetadataDirectory.TAG_PUBLISHER],
        ["com.apple.quicktime.software", QuickTimeMetadataDirectory.TAG_SOFTWARE],
        ["com.apple.quicktime.year", QuickTimeMetadataDirectory.TAG_YEAR],
        ["com.apple.quicktime.collection.user", QuickTimeMetadataDirectory.TAG_COLLECTION_USER],
        ["com.apple.quicktime.rating.user", QuickTimeMetadataDirectory.TAG_RATING_USER],
        ["com.apple.quicktime.location.name", QuickTimeMetadataDirectory.TAG_LOCATION_NAME],
        ["com.apple.quicktime.location.body", QuickTimeMetadataDirectory.TAG_LOCATION_BODY],
        ["com.apple.quicktime.location.note", QuickTimeMetadataDirectory.TAG_LOCATION_NOTE],
        ["com.apple.quicktime.location.role", QuickTimeMetadataDirectory.TAG_LOCATION_ROLE],
        ["com.apple.quicktime.location.date", QuickTimeMetadataDirectory.TAG_LOCATION_DATE],
        ["com.apple.quicktime.direction.facing", QuickTimeMetadataDirectory.TAG_DIRECTION_FACING],
        ["com.apple.quicktime.direction.motion", QuickTimeMetadataDirectory.TAG_DIRECTION_MOTION],
        ["com.apple.quicktime.displayname", QuickTimeMetadataDirectory.TAG_DISPLAY_NAME],
        ["com.apple.quicktime.content.identifier", QuickTimeMetadataDirectory.TAG_CONTENT_IDENTIFIER],
        ["com.apple.quicktime.make", QuickTimeMetadataDirectory.TAG_MAKE],
        ["com.apple.quicktime.model", QuickTimeMetadataDirectory.TAG_MODEL],
        ["com.apple.photos.originating.signature", QuickTimeMetadataDirectory.TAG_ORIGINATING_SIGNATURE],
        ["com.apple.quicktime.pixeldensity", QuickTimeMetadataDirectory.TAG_PIXEL_DENSITY],
        ["----", 0x0400],
        ["@PST", 0x0401],
        ["@ppi", 0x0402],
        ["@pti", 0x0403],
        ["@sti", 0x0404],
        ["AACR", 0x0405],
        ["CDEK", 0x0406],
        ["CDET", 0x0407],
        ["GUID", 0x0408],
        ["VERS", 0x0409],
        ["aART", 0x040A],
        ["akID", 0x040B],
        ["albm", 0x040C],
        ["apID", 0x040D],
        ["atID", 0x040E],
        ["auth", 0x040F],
        ["catg", 0x0410],
        ["cnID", 0x0411],
        ["covr", 0x0412],
        ["cpil", 0x0413],
        ["cprt", 0x0414],
        ["desc", 0x0415],
        ["disk", 0x0416],
        ["dscp", 0x0417],
        ["egid", 0x0418],
        ["geID", 0x0419],
        ["gnre", 0x041A],
        ["grup", 0x041B],
        ["gshh", 0x041C],
        ["gspm", 0x041D],
        ["gspu", 0x041E],
        ["gssd", 0x041F],
        ["gsst", 0x0420],
        ["gstd", 0x0421],
        ["hdvd", 0x0422],
        ["itnu", 0x0423],
        ["keyw", 0x0424],
        ["ldes", 0x0425],
        ["pcst", 0x0426],
        ["perf", 0x0427],
        ["pgap", 0x0428],
        ["plID", 0x0429],
        ["prID", 0x042A],
        ["purd", 0x042B],
        ["purl", 0x042C],
        ["rate", 0x042D],
        ["rldt", 0x042E],
        ["rtng", 0x042F],
        ["sfID", 0x0430],
        ["soaa", 0x0431],
        ["soal", 0x0432],
        ["soar", 0x0433],
        ["soco", 0x0434],
        ["sonm", 0x0435],
        ["sosn", 0x0436],
        ["stik", 0x0437],
        ["titl", 0x0438],
        ["tmpo", 0x0439],
        ["trkn", 0x043A],
        ["tven", 0x043B],
        ["tves", 0x043C],
        ["tvnn", 0x043D],
        ["tvsh", 0x043E],
        ["tvsn", 0x043F],
        ["yrrc", 0x0440],
        ["�ART", 0x0441],
        ["�alb", 0x0442],
        ["�cmt", 0x0443],
        ["�com", 0x0444],
        ["�cpy", 0x0445],
        ["�day", 0x0446],
        ["�des", 0x0447],
        ["�enc", 0x0448],
        ["�gen", 0x0449],
        ["�grp", 0x044A],
        ["�lyr", 0x044B],
        ["�nam", 0x044C],
        ["�nrt", 0x044D],
        ["�pub", 0x044E],
        ["�too", 0x044F],
        ["�trk", 0x0450],
        ["�wrt", 0x0451]
    ]);
    public getName(): string {
        return "QuickTime Metadata";
    }
    protected getTagNameMap(): Map<number, string> {
        return QuickTimeMetadataDirectory._tagNameMap;
    }
}
export default QuickTimeMetadataDirectory;
