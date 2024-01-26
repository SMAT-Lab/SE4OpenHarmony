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
import StringUtil from '../util/StringUtil';
import { Constants } from '../Constants';
import EpubResource from './EpubResource';
import ResourceReference from './ResourceReference';
class TitledResourceReference extends ResourceReference {
    private fragmentId: string;
    private title: string;
    constructor(resourceNew: EpubResource, title?: string, fragmentId?: string) {
        super(resourceNew);
        this.title = title;
        this.fragmentId = fragmentId;
    }
    public getFragmentId(): string {
        return this.fragmentId;
    }
    public setFragmentId(fragmentId: string): void {
        this.fragmentId = fragmentId;
    }
    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }
    /**
         * If the fragmentId is blank it returns the resource href, otherwise it returns the resource href + '#' + the fragmentId.
         *
         * @return If the fragmentId is blank it returns the resource href, otherwise it returns the resource href + '#' + the fragmentId.
         */
    public getCompleteHref(): string {
        if (StringUtil.isBlank(this.fragmentId)) {
            return this.resourceNew.getHref();
        }
        else {
            return this.resourceNew.getHref() + Constants.FRAGMENT_SEPARATOR_CHAR + this.fragmentId;
        }
    }
    /**
         * Sets the resource to the given resource and sets the fragmentId .
         *
         */
    public setResource(resourceNew: EpubResource, fragmentId?: string): void {
        super.setResource(resourceNew);
        this.fragmentId = fragmentId;
    }
}
export default TitledResourceReference;
