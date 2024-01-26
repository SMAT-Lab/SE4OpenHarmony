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
import StringUtil from "../util/StringUtil";
class Identifier {
    /**
     *
     */
    private static readonly serialVersionUID: number = 955949951416391810;
    private UUID: string = "UUID";
    private ISBN: string = "ISBN";
    private URL: string = "URL";
    private URI: string = "URI";
    private bookId: boolean = false;
    private scheme: string;
    private value: string;
    public constructor(scheme?: string, value?: string) {
        this.scheme = scheme ? scheme : this.UUID;
        this.value = value ? value : this.UUID;
    }
    /**
     * The first identifier for which the bookId is true is made the bookId identifier.
     * If no identifier has bookId == true then the first bookId identifier is written as the primary.
     *
     * @param identifiers
     * @return The first identifier for which the bookId is true is made the bookId identifier.
     */
    public static getBookIdIdentifier(identifiers: Array<Identifier>): Identifier {
        if (identifiers == null || identifiers.length == 0) {
            return null;
        }
        let result: Identifier = null;
        for (let identifier of identifiers) {
            if (identifier.isBookId()) {
                result = identifier;
                break;
            }
        }
        if (result == null) {
            result = identifiers[0];
        }
        return result;
    }
    public getScheme(): string {
        return this.scheme;
    }
    public setScheme(scheme: string): void {
        this.scheme = scheme;
    }
    public getValue(): string {
        return this.value;
    }
    public setValue(value: string): void {
        this.value = value;
    }
    public setBookId(bookId: boolean): void {
        this.bookId = bookId;
    }
    /**
     * This bookId property allows the book creator to add multiple ids and tell the epubwriter which one to write out as the bookId.
     *
     * The Dublin Core metadata spec allows multiple identifiers for a Book.
     * The epub spec requires exactly one identifier to be marked as the book id.
     *
     * @return whether this is the unique book id.
     */
    public isBookId(): boolean {
        return this.bookId;
    }
    public hashCode(): number {
        return StringUtil.hashCode(StringUtil.defaultIfNull(this.scheme)) ^ StringUtil.hashCode(StringUtil.defaultIfNull(this.value));
    }
    public equals(otherIdentifier: Object): boolean {
        if (!(otherIdentifier instanceof Identifier)) {
            return false;
        }
        return StringUtil.equals(this.scheme, otherIdentifier.scheme)
            && StringUtil.equals(this.value, otherIdentifier.value);
    }
    public toString(): string {
        if (StringUtil.isBlank(this.scheme)) {
            return "" + this.value;
        }
        return "" + this.scheme + ":" + this.value;
    }
}
export default Identifier;
