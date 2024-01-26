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
class Date {
    private event: string;
    private dateString: string;
    public constructor(dateString: string, event: string) {
        this.dateString = dateString;
        this.event = event;
    }
    private static checkDate(dateString: string): string {
        if (dateString == null) {
            throw new Error("Cannot create a date from a blank string");
        }
        return dateString;
    }
    public getValue(): string {
        return this.dateString;
    }
    public getEvent(): string {
        return this.event;
    }
    public setEvent(event: string): void {
        this.event = event;
    }
    public toString(): string {
        if (this.event == null) {
            return this.dateString;
        }
        return "" + this.event + ":" + this.dateString;
    }
}
export default Date;