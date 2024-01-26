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
import Directory from './Directory';
/**
 * Models a particular tag within a {@link com.drew.metadata.Directory} and provides methods for obtaining its value.
 * Immutable.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class Tag {
    private readonly _tagType: number;
    private readonly _directory: Directory;
    public constructor(tagType: number, directory: Directory) {
        this._tagType = tagType;
        this._directory = directory;
    }
    /**
     * Gets the tag type as an int
     *
     * @return the tag type as an int
     */
    public getTagType() {
        return this._tagType;
    }
    /**
     * Gets the tag type in hex notation as a String with padded leading
     * zeroes if necessary (i.e. <code>0x100e</code>).
     *
     * @return the tag type as a string in hexadecimal notation
     */
    public getTagTypeHex() {
        return String.fromCharCode(this._tagType);
        //        return String.format("0x%04x", this._tagType);
    }
    /**
     * Get a description of the tag's value, considering enumerated values
     * and units.
     *
     * @return a description of the tag's value
     */
    public getDescription() {
        return this._directory.getDescription(this._tagType);
    }
    /**
     * Get whether this tag has a name.
     *
     * If <code>true</code>, it may be accessed via {@link #getTagName}.
     * If <code>false</code>, {@link #getTagName} will return a string resembling <code>"Unknown tag (0x1234)"</code>.
     *
     * @return whether this tag has a name
     */
    public hasTagName() {
        return this._directory.hasTagName(this._tagType);
    }
    /**
     * Get the name of the tag, such as <code>Aperture</code>, or
     * <code>InteropVersion</code>.
     *
     * @return the tag's name
     */
    public getTagName() {
        return this._directory.getTagName(this._tagType);
    }
    /**
     * Get the name of the {@link com.drew.metadata.Directory} in which the tag exists, such as
     * <code>Exif</code>, <code>GPS</code> or <code>Interoperability</code>.
     *
     * @return name of the {@link com.drew.metadata.Directory} in which this tag exists
     */
    public getDirectoryName() {
        return this._directory.getName();
    }
    /**
     * A basic representation of the tag's type and value.  EG: <code>[Exif IFD0] FNumber - f/2.8</code>.
     *
     * @return the tag's type and value
     */
    public toString() {
        let description = this.getDescription();
        if (description == undefined || description == null)
            description = this._directory.getString(this.getTagType()) + " (unable to formulate description)";
        return "[" + this._directory.getName() + "] " + this.getTagName() + " - " + description;
    }
}
export default Tag;
