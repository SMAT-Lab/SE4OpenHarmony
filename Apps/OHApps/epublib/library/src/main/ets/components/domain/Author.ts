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


import StringUtil from "../util/StringUtil"
import Relator from "./Relator"

class Author {
    private static readonly serialVersionUID: BigInt = BigInt( 6663408501416574200);
    private firstname: string;
    private lastname: string;
    private relator: Relator = Relator.AUTHOR;

    public constructor(lastname: string, firstname?: string) {
        if (firstname == null) {
            firstname = '';
        }
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public toString(): string {
        return this.lastname + ", " + this.firstname;
    }

    public hashCode(): number {
        return StringUtil.hashCode(this.firstname, this.lastname);
    }

    public equals(authorObject: Object): boolean {
        if (!(authorObject instanceof Author)) {
            return false;
        }
        let other: Author = authorObject;
        return StringUtil.equals(this.firstname, other.firstname)
        && StringUtil.equals(this.lastname, other.lastname);
    }

    public setRole(code: string): Relator {
        let result: Relator = Relator.byCode(code);
        if (result == null) {
            result = Relator.AUTHOR;
        }
        this.relator = result;
        return result;
    }

    public getRelator(): Relator {
        return this.relator;
    }

    public setRelator(relator: Relator): void {
        this.relator = relator;
    }
}

export default Author