let __generate__Id: number = 0;
function generateId(): string {
    return "DefaultParser_" + ++__generate__Id;
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
import { CommandLineParser } from './CommandLineParser';
import { Properties } from './Properties';
import { CommandLine } from './CommandLine';
import { OptionGroup } from './OptionGroup';
import { Options } from './Options';
import { Util } from './Util';
import { CliOption } from './Option';
import { JList } from './JList';
export class DefaultParser implements CommandLineParser {
    /** The command-line instance. */
    protected cmd: CommandLine;
    /** The current options. */
    protected options: Options;
    /**
       * Flag indicating how unrecognized tokens are handled. {@code true} to stop the parsing and add the remaining
       * tokens to the args list. {@code false} to throw an exception.
       */
    protected stopAtNonOption: boolean = false;
    /** The token currently processed. */
    protected currentToken: string = '';
    /** The last option parsed. */
    protected currentOption: CliOption | null;
    /** Flag indicating if tokens should no longer be analyzed and simply added as arguments of the command line. */
    protected skipParsing: boolean = false;
    /** The required options and groups expected to be found when parsing the command line. */
    protected expectedOpts: JList<Object> = new JList();
    /** Flag indicating if partial matching of long options is supported. */
    private allowPartialMatching: boolean;
    /** Flag indicating if balanced leading and trailing double quotes should be stripped from option arguments.
       * null represents the historic arbitrary behaviour */
    private stripLeadingAndTrailingQuotes: boolean = false;
    public constructor() {
        this.allowPartialMatching = true;
        this.cmd = new CommandLine();
        this.options = new Options();
        this.currentOption = new CliOption(null);
    }
    public static createDefaultParser(allowPartialMatching: boolean, stripLeadingAndTrailingQuotes: boolean): DefaultParser {
        let parse = new DefaultParser();
        parse.allowPartialMatching = allowPartialMatching;
        parse.stripLeadingAndTrailingQuotes = stripLeadingAndTrailingQuotes;
        return parse;
    }
    public static builder(): DefaultBulider {
        return new DefaultBulider();
    }
    /**
       * Throws a {@link MissingArgumentException} if the current option didn't receive the number of arguments expected.
       */
    private checkRequiredArgs(): void {
        if (this.currentOption != null && this.currentOption.requiresArg()) {
            throw Error("Missing argument for option: " + this.currentOption.getKey());
        }
    }
    /**
       * Throws a {@link MissingOptionException} if all of the required options are not present.
       *
       * @throws MissingOptionException if any of the required Options are not present.
       */
    protected checkRequiredOptions(): void {
        // if there are required options that have not been processed
        if (!(this.expectedOpts.length() == 0)) {
            let buf = "Missing required option";
            buf += this.expectedOpts.length() == 1 ? "" : "s";
            buf += ": ";
            for (let index = 0; index < this.expectedOpts.length(); index++) {
                let obj = this.expectedOpts.get(index);
                let nextObj = this.expectedOpts.get(index + 1);
                if (obj) {
                    buf += buf;
                }
                if (nextObj) {
                    buf += ", ";
                }
            }
            throw new Error(buf);
        }
    }
    /**
       * Searches for a prefix that is the long name of an option (-Xmx512m)
       *
       * @param token
       */
    private getLongPrefix(token: string): string {
        let t = Util.stripLeadingHyphens(token);
        let i: number;
        let opt = '';
        for (i = t.length - 2; i > 1; i--) {
            let prefix = t.substring(0, i);
            if (this.options.hasLongOption(prefix)) {
                opt = prefix;
                break;
            }
        }
        return opt;
    }
    /**
       * Gets a list of matching option strings for the given token, depending on the selected partial matching policy.
       *
       * @param token the token (may contain leading dashes)
       * @return the list of matching option strings or an empty list if no matching option could be found
       */
    private getMatchingLongOptions(token: string): JList<string> {
        if (this.allowPartialMatching) {
            return this.options.getMatchingOptions(token);
        }
        let matches: JList<string> = new JList();
        if (this.options.hasLongOption(token)) {
            let option: CliOption | null = this.options.getOption(token);
            matches.insert(option.getLongOpt());
        }
        return matches;
    }
    /**
       * Handles the following tokens:
       *
       * -S -SV -S V -S=V -S1S2 -S1S2 V -SV1=V2
       *
       * -L -LV -L V -L=V -l
       *
       * @param token the command line token to handle
       */
    private handleShortAndLongOption(token: string): void {
        let t = Util.stripLeadingHyphens(token);
        let pos = t.indexOf('=');
        if (t.length == 1) {
            // -S
            if (this.options.hasShortOption(t)) {
                this.handleOption(this.options.getOption(t));
            }
            else {
                this.handleUnknownToken(token);
            }
        }
        else if (pos == -1) {
            // no equal sign found (-xxx)
            if (this.options.hasShortOption(t)) {
                this.handleOption(this.options.getOption(t));
            }
            else if (!(this.getMatchingLongOptions(t).length() == 0)) {
                // -L or -l
                this.handleLongOptionWithoutEqual(token);
            }
            else {
                // look for a long prefix (-Xmx512m)
                let opt = this.getLongPrefix(t);
                if (opt != null && this.options.getOption(opt).acceptsArg()) {
                    this.handleOption(this.options.getOption(opt));
                    if (this.currentOption)
                        this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOff(t.substring(opt.length)));
                    this.currentOption = null;
                }
                else if (this.isJavaProperty(t)) {
                    // -SV1 (-Dflag)
                    this.handleOption(this.options.getOption(t.substring(0, 1)));
                    if (this.currentOption)
                        this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOff(t.substring(1)));
                    this.currentOption = null;
                }
                else {
                    // -S1S2S3 or -S1S2V
                    this.handleConcatenatedOptions(token);
                }
            }
        }
        else {
            // equal sign found (-xxx=yyy)
            let opt = t.substring(0, pos);
            let value = t.substring(pos + 1);
            if (opt.length == 1) {
                // -S=V
                let option: CliOption = this.options.getOption(opt);
                if (option != null && option.acceptsArg()) {
                    this.handleOption(option);
                    if (this.currentOption)
                        this.currentOption.addValueForProcessing(value);
                    this.currentOption = null;
                }
                else {
                    this.handleUnknownToken(token);
                }
            }
            else if (this.isJavaProperty(opt)) {
                // -SV1=V2 (-Dkey=value)
                this.handleOption(this.options.getOption(opt.substring(0, 1)));
                if (this.currentOption) {
                    this.currentOption.addValueForProcessing(opt.substring(1));
                    this.currentOption.addValueForProcessing(value);
                }
                this.currentOption = null;
            }
            else {
                // -L=V or -l=V
                this.handleLongOptionWithEqual(token);
            }
        }
    }
    protected handleConcatenatedOptions(token: string): void {
        for (let i = 1; i < token.length; i++) {
            let ch = token.charAt(i);
            if (!this.options.hasOption(ch)) {
                this.handleUnknownToken(this.stopAtNonOption && i > 1 ? token.substring(i) : token);
                break;
            }
            this.handleOption(this.options.getOption(ch));
            if (this.currentOption != null && token.length != i + 1) {
                // add the trail as an argument of the option
                this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOff(token.substring(i + 1)));
                break;
            }
        }
    }
    /**
       * Handles any command line token.
       *
       * @param token the command line token to handle
       * @throws ParseException
       */
    private handleToken(token: string): void {
        this.currentToken = token;
        if (this.skipParsing) {
            this.cmd.addArg(token);
        }
        else if ("--" == token) {
            this.skipParsing = true;
        }
        else if (this.currentOption != null && this.currentOption.acceptsArg() && this.isArgument(token)) {
            this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOn(token));
        }
        else if (token.indexOf("--") == 0) {
            this.handleLongOption(token);
        }
        else if (token.indexOf("-") == 0 && !("-" == token)) {
            this.handleShortAndLongOption(token);
        }
        else {
            this.handleUnknownToken(token);
        }
        if (this.currentOption != null && !this.currentOption.acceptsArg()) {
            this.currentOption = null;
        }
    }
    /**
       * Handles an unknown token. If the token starts with a dash an UnrecognizedOptionException is thrown. Otherwise the
       * token is added to the arguments of the command line. If the stopAtNonOption flag is set, this stops the parsing and
       * the remaining tokens are added as-is in the arguments of the command line.
       *
       * @param token the command line token to handle
       */
    private handleUnknownToken(token: string): void {
        if (token.indexOf("-") == 0 && token.length > 1 && !this.stopAtNonOption) {
            throw new Error("Unrecognized option: " + token);
        }
        this.cmd.addArg(token);
        if (this.stopAtNonOption) {
            this.skipParsing = true;
        }
    }
    /**
       * Tests if the token is a valid argument.
       *
       * @param token
       */
    private isArgument(token: string): boolean {
        return !this.isOption(token) || this.isNegativeNumber(token);
    }
    /**
       * Tests if the specified token is a Java-like property (-Dkey=value).
       */
    private isJavaProperty(token: string): boolean {
        let opt = token.substring(0, 1);
        let option: CliOption = this.options.getOption(opt);
        return option != null && (option.getArgs() >= 2 || option.getArgs() == CliOption.UNLIMITED_VALUES);
    }
    /**
       * Tests if the token looks like a long option.
       *
       * @param token
       */
    private isLongOption(token: string): boolean {
        if (token == null || !(token.indexOf("-") == 0) || token.length == 1) {
            return false;
        }
        let pos = token.indexOf("=");
        let t = pos == -1 ? token : token.substring(0, pos);
        if (!(this.getMatchingLongOptions(t).length() == 0)) {
            // long or partial long options (--L, -L, --L=V, -L=V, --l, --l=V)
            return true;
        }
        if (this.getLongPrefix(token) != null && !(token.indexOf("--") == 0)) {
            // -LV
            return true;
        }
        return false;
    }
    /**
       * Tests if the token is a negative number.
       *
       * @param token
       */
    private isNegativeNumber(token: string): boolean {
        try {
            //Double.parseDouble(token);
            if (!Number(token)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (Error) {
            return false;
        }
    }
    /**
       * Tests if the token looks like an option.
       *
       * @param token
       */
    private isOption(token: string): boolean {
        return this.isLongOption(token) || this.isShortOption(token);
    }
    /**
       * Tests if the token looks like a short option.
       *
       * @param token
       */
    private isShortOption(token: string): boolean {
        // short options (-S, -SV, -S=V, -SV1=V2, -S1S2)
        if (token == null || !(token.indexOf("-") == 0) || token.length == 1) {
            return false;
        }
        // remove leading "-" and "=value"
        let pos = token.indexOf("=");
        let optName = pos == -1 ? token.substring(1) : token.substring(1, pos);
        if (this.options.hasShortOption(optName)) {
            return true;
        }
        // check for several concatenated short options
        return !(optName.length == 0) && this.options.hasShortOption(optName.charAt(0));
    }
    /**
       * Handles the following tokens:
       *
       * --L --L=V --L V --l
       *
       * @param token the command line token to handle
       */
    private handleLongOption(token: string): void {
        if (token.indexOf('=') == -1) {
            this.handleLongOptionWithoutEqual(token);
        }
        else {
            this.handleLongOptionWithEqual(token);
        }
    }
    /**
       * Handles the following tokens:
       *
       * --L=V -L=V --l=V -l=V
       *
       * @param token the command line token to handle
       */
    private handleLongOptionWithEqual(token: string): void {
        let pos = token.indexOf('=');
        let value = token.substring(pos + 1);
        let opt: string = token.substring(0, pos);
        let matchingOpts: JList<string> = this.getMatchingLongOptions(opt);
        if (matchingOpts.length() == 0) {
            this.handleUnknownToken(this.currentToken);
        }
        else if (matchingOpts.length() > 1 && !this.options.hasLongOption(opt)) {
            throw new Error(this.createMessage(opt, matchingOpts));
        }
        else {
            let key = this.options.hasLongOption(opt) ? opt : matchingOpts.get(0);
            let option: CliOption = this.options.getOption(key);
            if (option.acceptsArg()) {
                this.handleOption(option);
                if (this.currentOption) {
                    this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOff(value));
                }
                this.currentOption = null;
            }
            else {
                this.handleUnknownToken(this.currentToken);
            }
        }
    }
    private createMessage(option: string, matchingOptions: JList<string>): string {
        let buf = "Ambiguous option: '";
        buf += option;
        buf += "'  (could be: ";
        for (let index = 0; index < matchingOptions.length(); index++) {
            buf += "'";
            buf += matchingOptions.get(index);
            buf += "'";
            if (matchingOptions.get(index + 1)) {
                buf += ", ";
            }
        }
        buf += ")";
        return buf;
    }
    /**
       * Handles the following tokens:
       *
       * --L -L --l -l
       *
       * @param token the command line token to handle
       */
    private handleLongOptionWithoutEqual(token: string): void {
        let matchingOpts: JList<string> = this.getMatchingLongOptions(token);
        if (matchingOpts.length() == 0) {
            this.handleUnknownToken(this.currentToken);
        }
        else if (matchingOpts.length() > 1 && !this.options.hasLongOption(token)) {
            throw new Error(this.createMessage(token, matchingOpts));
        }
        else {
            let key = this.options.hasLongOption(token) ? token : matchingOpts.get(0);
            this.handleOption(this.options.getOption(key));
        }
    }
    private handleOption(option: CliOption): void {
        // check the previous option before handling the next one
        this.checkRequiredArgs();
        //option = (CliOption) option.clone();
        //let copyOption: CliOption = option;
        let copyOption: CliOption = CliOption.builder(option.getOpt())
            .buildHasArg(option.buildHasArg())
            .valueSeparator(option.getValueSeparator())
            .numberOfArgs(option.getArgs())
            .argNames(option.getArgName())
            .optionalArg(option.hasOptionalArg())
            .buildLongOpt(option.getLongOpt())
            .desc(option.getDescription())
            .required(option.isRequired())
            .buildOption();
        this.updateRequiredOptions(copyOption);
        this.cmd.addOption(copyOption);
        if (option.buildHasArg()) {
            this.currentOption = copyOption;
        }
        else {
            this.currentOption = null;
        }
    }
    /**
       * Strips balanced leading and trailing quotes if the stripLeadingAndTrailingQuotes is set
       * If stripLeadingAndTrailingQuotes is null, then do not strip
       *
       * @param token a string
       * @return token with the quotes stripped (if set)
       */
    private stripLeadingAndTrailingQuotesDefaultOff(token: string): string {
        if (this.stripLeadingAndTrailingQuotes) {
            return Util.stripLeadingAndTrailingQuotes(token);
        }
        return token;
    }
    /**
       * Strips balanced leading and trailing quotes if the stripLeadingAndTrailingQuotes is set
       * If stripLeadingAndTrailingQuotes is null, then do not strip
       *
       * @param token a string
       * @return token with the quotes stripped (if set)
       */
    private stripLeadingAndTrailingQuotesDefaultOn(token: string): string {
        if (this.stripLeadingAndTrailingQuotes == null || this.stripLeadingAndTrailingQuotes) {
            return Util.stripLeadingAndTrailingQuotes(token);
        }
        return token;
    }
    /**
       * Removes the option or its group from the list of expected elements.
       *
       * @param option
       */
    private updateRequiredOptions(option: CliOption): void {
        if (option.isRequired()) {
            this.expectedOpts.remove(option.getKey());
        }
        // if the option is in an OptionGroup make that option the selected option of the group
        if (this.options.getOptionGroup(option) != null) {
            let group: OptionGroup = this.options.getOptionGroup(option);
            if (group.isRequired()) {
                this.expectedOpts.remove(group);
            }
            group.setSelected(option);
        }
    }
    /**
       * Sets the values of Options using the values in {@code properties}.
       *
       * @param properties The value properties to be processed.
       */
    private handleProperties(properties: Properties | null): void {
        if (properties == null) {
            return;
        }
        let str = properties.propertyNames();
        for (let index = 0; index < str.length; index++) {
            let option: string = str[index];
            let opt: CliOption = this.options.getOption(option);
            if (opt == null) {
                throw new Error("Default option wasn't defined");
            }
            // if the option is part of a group, check if another option of the group has been selected
            let group: OptionGroup = this.options.getOptionGroup(opt);
            let selected: boolean = group != null && group.getSelected() != null;
            if (!(this.cmd.hasOption(option)) && !selected) {
                // get the value from the properties
                let value: string = properties.getProperty(option);
                if (opt.buildHasArg()) {
                    if (opt.getValues() == null || opt.getValues().length == 0) {
                        opt.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOff(value));
                    }
                }
                else if (!("yes" == (value.toLocaleLowerCase()) || "true" == (value.toLocaleLowerCase()) || "1" == (value))) {
                    // if the value is not yes, true or 1 then don't add the option to the CommandLine
                    continue;
                }
                this.handleOption(opt);
                this.currentOption = null;
            }
        }
    }
    public parse(options: Options, argument: string[], properties: Properties | null, stopAtNonOption: boolean): CommandLine {
        this.options = options;
        this.stopAtNonOption = stopAtNonOption;
        this.skipParsing = false;
        this.currentOption = null;
        // Note that this collection cannot be modified later
        this.expectedOpts = new JList();
        let list = options.getRequiredOptions();
        for (let index = 0; index < list.length(); index++) {
            this.expectedOpts.insert(list.get(index));
        }
        let optionSet = options.getOptionGroups();
        // clear the data from the groups
        optionSet.forEach((group, key) => {
            group.setSelected(null);
        });
        this.cmd = new CommandLine();
        if (argument != null) {
            for (let index = 0; index < argument.length; index++) {
                this.handleToken(argument[index]);
            }
        }
        // check the arguments of the last option
        this.checkRequiredArgs();
        //add the default options
        this.handleProperties(properties);
        this.checkRequiredOptions();
        return this.cmd;
    }
}
class DefaultBulider {
    /** Flag indicating if partial matching of long options is supported. */
    private allowPartialMatching: boolean = true;
    /** Flag indicating if balanced leading and trailing double quotes should be stripped from option arguments. */
    private stripLeadingAndTrailingQuotes: boolean = false;
    constructor() {
    }
    public buildDefaultParser(): DefaultParser {
        return DefaultParser.createDefaultParser(this.allowPartialMatching, this.stripLeadingAndTrailingQuotes);
    }
    public setAllowPartialMatching(allowPartialMatching: boolean): DefaultBulider {
        this.allowPartialMatching = allowPartialMatching;
        return this;
    }
    public setStripLeadingAndTrailingQuotes(stripLeadingAndTrailingQuotes: boolean): DefaultBulider {
        this.stripLeadingAndTrailingQuotes = stripLeadingAndTrailingQuotes;
        return this;
    }
}
