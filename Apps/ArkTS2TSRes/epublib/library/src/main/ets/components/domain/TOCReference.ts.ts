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
import TitledResourceReference from "./TitledResourceReference";
import EpubResource from "./EpubResource";
class TOCReference extends TitledResourceReference {
    private children: Array<TOCReference> = new Array<TOCReference>();
    constructor(title: string, resource?: EpubResource, fragmentId?: string, children?: Array<TOCReference>) {
        super(resource, title, fragmentId);
        this.children = children;
    }
    public getChildren(): Array<TOCReference> {
        return this.children;
    }
    public addChildSection(childSection: TOCReference): TOCReference {
        this.children.push(childSection);
        return childSection;
    }
    public setChildren(children: Array<TOCReference>): void {
        this.children = children;
    }
}
export default TOCReference;
