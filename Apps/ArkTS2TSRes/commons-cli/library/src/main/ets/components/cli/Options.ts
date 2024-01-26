let __generate__Id: number = 0;
function generateId(): string {
    return "Options_" + ++__generate__Id;
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
import { JList } from './JList';
import { JMap } from './JMap';
import { Util } from './Util';
import { CliOption } from './Option';
import { OptionGroup } from './OptionGroup';
export class Options {
    /** a map of the options with the character key */
    private shortOpts: JMap<string, CliOption> = new JMap();
    /** a map of the options with the long key */
    private longOpts: JMap<string, CliOption> = new JMap();
    /** a map of the required options */
    // N.B. This can contain either a String (addOption) or an OptionGroup (addOptionGroup)
    private requiredOpts: JList<Object> = new JList();
    /** a map of the option groups */
    private optionGroups: JMap<string, OptionGroup> = new JMap();
    constructor() {
    }
    public addOption(opt: CliOption): Options {
        let key = opt.getKey();
        // add it to the long option list
        if (opt.hasLongOpt()) {
            this.longOpts.put(opt.getLongOpt(), opt);
        }
        // if the option is required add it to the required list
        if (opt.isRequired()) {
            if (this.requiredOpts.contains(key)) {
                this.requiredOpts.remove(key);
            }
            this.requiredOpts.insert(key);
        }
        this.shortOpts.put(key, opt);
        return this;
    }
    /**
       * Add the specified option group.
       *
       * @param group the OptionGroup that is to be added
       * @return the resulting Options instance
       */
    public addOptionGroup(group: OptionGroup): Options {
        if (group.isRequired()) {
            this.requiredOpts.insert(group);
        }
        for (let index = 0; index < group.getOptions().length(); index++) {
            // an Option cannot be required if it is in an
            // OptionGroup, either the group is required or
            // nothing is required
            let option = group.getOptions().get(index);
            option.setRequired(false);
            this.addOption(option);
            this.optionGroups.put(option.getKey(), group);
        }
        return this;
    }
    /**
       * Add an option that contains a short-name and a long-name.
       *
       * <p>
       * The added option is set as required. It may be specified as requiring an argument. This method is a shortcut for:
       * </p>
       *
       * <pre>
       * <code>
       * Options option = new Option(opt, longOpt, hasArg, description);
       * option.setRequired(true);
       * options.add(option);
       * </code>
       * </pre>
       *
       * @param opt Short single-character name of the option.
       * @param longOpt Long multi-character name of the option.
       * @param hasArg flag signalling if an argument is required after this option
       * @param description Self-documenting description
       * @return the resulting Options instance
       * @since 1.4
       */
    public addRequiredOption(opt: string, longOpt: string, hasArg: boolean, description: string): Options {
        let option = CliOption.createOption(opt, hasArg, description, longOpt);
        option.setRequired(true);
        this.addOption(option);
        return this;
    }
    /**
       * Gets the options with a long name starting with the name specified.
       *
       * @param opt the partial name of the option
       * @return the options matching the partial name specified, or an empty list if none matches
       * @since 1.3
       */
    public getMatchingOptions(opt: string): JList<string> {
        opt = Util.stripLeadingHyphens(opt);
        let matchingOpts: JList<string> = new JList();
        // for a perfect match return the single option only
        if (this.longOpts.containsKey(opt)) {
            let opts: JList<string> = new JList();
            opts.insert(opt);
            return opts;
        }
        for (let longOpt of this.longOpts.keys()) {
            if (longOpt.indexOf(opt) == 0) {
                matchingOpts.insert(longOpt);
            }
        }
        return matchingOpts;
    }
    /**
       * Gets the {@link Option} matching the long or short name specified.
       *
       * <p>
       * The leading hyphens in the name are ignored (up to 2).
       * </p>
       *
       * @param opt short or long name of the {@link Option}
       * @return the option represented by opt
       */
    public getOption(opt: string): CliOption {
        opt = Util.stripLeadingHyphens(opt);
        if (this.shortOpts.containsKey(opt)) {
            return this.shortOpts.get(opt) == null ? new CliOption(null) : this.shortOpts.get(opt) as CliOption;
        }
        return this.longOpts.get(opt) == null ? new CliOption(null) : this.longOpts.get(opt) as CliOption;
    }
    /**
       * Gets the OptionGroup the {@code opt} belongs to.
       *
       * @param opt the option whose OptionGroup is being queried.
       * @return the OptionGroup if {@code opt} is part of an OptionGroup, otherwise return null
       */
    public getOptionGroup(opt: CliOption): OptionGroup {
        return this.optionGroups.get(opt.getKey()) == null ? new OptionGroup() : this.optionGroups.get(opt.getKey()) as OptionGroup;
    }
    /**
       * Gets the OptionGroups that are members of this Options instance.
       *
       * @return a Collection of OptionGroup instances.
       */
    getOptionGroups(): Set<OptionGroup> {
        return new Set<OptionGroup>(this.optionGroups.values());
    }
    /**
       * Gets a read-only list of options in this set
       *
       * @return read-only Collection of {@link Option} objects in this descriptor
       */
    public getOptions(): JList<CliOption> {
        return this.helpOptions();
    }
    /**
       * Gets the required options.
       *
       * @return read-only List of required options
       */
    public getRequiredOptions(): JList<Object> {
        return this.requiredOpts;
    }
    /**
       * Returns whether the named {@link Option} is a member of this {@link Options}.
       *
       * @param opt long name of the {@link Option}
       * @return true if the named {@link Option} is a member of this {@link Options}
       * @since 1.3
       */
    public hasLongOption(opt: string): boolean {
        opt = Util.stripLeadingHyphens(opt);
        return this.longOpts.containsKey(opt);
    }
    /**
       * Returns whether the named {@link Option} is a member of this {@link Options}.
       *
       * @param opt short or long name of the {@link Option}
       * @return true if the named {@link Option} is a member of this {@link Options}
       */
    public hasOption(opt: string): boolean {
        opt = Util.stripLeadingHyphens(opt);
        return this.shortOpts.containsKey(opt) || this.longOpts.containsKey(opt);
    }
    /**
       * Returns whether the named {@link Option} is a member of this {@link Options}.
       *
       * @param opt short name of the {@link Option}
       * @return true if the named {@link Option} is a member of this {@link Options}
       * @since 1.3
       */
    public hasShortOption(opt: string): boolean {
        opt = Util.stripLeadingHyphens(opt);
        return this.shortOpts.containsKey(opt);
    }
    /**
       * Returns the Options for use by the HelpFormatter.
       *
       * @return the List of Options
       */
    helpOptions(): JList<CliOption> {
        let val = this.shortOpts.values();
        let arr: JList<CliOption> = new JList();
        for (let option of val) {
            arr.insert(option);
        }
        return arr;
    }
}
