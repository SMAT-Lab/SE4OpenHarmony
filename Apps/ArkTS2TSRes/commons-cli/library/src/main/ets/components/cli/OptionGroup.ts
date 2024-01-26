let __generate__Id: number = 0;
function generateId(): string {
    return "OptionGroup_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CliOption } from './Option';
import { JMap } from './JMap';
import { JList } from './JList';
export class OptionGroup {
    /** hold the options */
    private optionMap: JMap<string, CliOption> = new JMap();
    /** The name of the selected option */
    private selected: string | null;
    /** specified whether this group is required */
    private required: boolean;
    constructor() {
        this.selected = null;
        this.required = false;
    }
    /**
       * Add the specified {@code Option} to this group.
       *
       * @param option the option to add to this group
       * @return this option group with the option added
       */
    public addOption(option: CliOption): OptionGroup {
        // key - option name
        // value - the option
        this.optionMap.put(option.getKey(), option);
        return this;
    }
    /**
       * @return the names of the options in this group as a {@code Collection}
       */
    public getNames(): JList<string> {
        // the key set is the collection of names
        let val = this.optionMap.keys();
        let arr: JList<string> = new JList();
        for (let option of val) {
            arr.insert(option);
        }
        return arr;
    }
    /**
       * @return the options in this group as a {@code Collection}
       */
    public getOptions(): JList<CliOption> {
        // the values are the collection of options
        let val = this.optionMap.values();
        let arr: JList<CliOption> = new JList();
        for (let option of val) {
            arr.insert(option);
        }
        return arr;
    }
    /**
       * @return the selected option name
       */
    public getSelected(): string {
        return this.selected as string;
    }
    /**
       * Tests whether this option group is required.
       *
       * @return whether this option group is required
       */
    public isRequired(): boolean {
        return this.required;
    }
    /**
       * @param required specifies if this group is required
       */
    public setRequired(required: boolean): void {
        this.required = required;
    }
    /**
       * Set the selected option of this group to {@code name}.
       *
       * @param option the option that is selected
       * @throws AlreadySelectedException if an option from this group has already been selected.
       */
    public setSelected(option: CliOption | null): void {
        if (option == null) {
            // reset the option previously selected
            this.selected = null;
            return;
        }
        // if no option has already been selected or the
        // same option is being reselected then set the
        // selected member variable
        if (this.selected != null && !(this.selected == (option.getKey()))) {
            throw new Error("The option '" + option.getKey() + "' was specified but an option from this group " + "has already been selected: '" + this.getSelected() + "'");
        }
        this.selected = option.getKey();
    }
    /**
       * Returns the stringified version of this OptionGroup.
       *
       * @return the stringified representation of this group
       */
    public toString(): string {
        let buff: string = "";
        let iter = this.getOptions();
        buff += "[";
        for (let index = 0; index < iter.length(); index++) {
            let option: CliOption = iter.get(index);
            if (option.getOpt() != null) {
                buff += "-";
                buff += option.getOpt();
            }
            else {
                buff += "--";
                buff += option.getLongOpt();
            }
            if (option.getDescription() != null) {
                buff += " ";
                buff += option.getDescription();
            }
            if (iter.get(index + 1)) {
                buff += ", ";
            }
        }
        buff += "]";
        return buff.toString();
    }
}
