let __generate__Id: number = 0;
function generateId(): string {
    return "HelpFormatter_" + ++__generate__Id;
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
import { Options } from './Options';
import { OptionGroup } from './OptionGroup';
import { CliOption } from './Option';
import { JList } from './JList';
export class HelpFormatter {
    /** The string to display at the beginning of the usage statement */
    public static DEFAULT_SYNTAX_PREFIX: string = "usage: ";
    /** Default number of characters per line */
    public static DEFAULT_WIDTH: number = 74;
    /** Default padding to the left of each line */
    public static DEFAULT_LEFT_PAD: number = 1;
    /** number of space characters to be prefixed to each description line */
    public static DEFAULT_DESC_PAD: number = 3;
    /**
       * the new line string
       *
       * @deprecated Scope will be made private for next major version - use get/setNewLine methods instead.
       */
    public defaultNewLine: string = "\n";
    /** Default prefix for shortOpts */
    public static DEFAULT_OPT_PREFIX: string = "-";
    /** Default prefix for long Option */
    public static DEFAULT_LONG_OPT_PREFIX: string = "--";
    /**
       * default separator displayed between a long Option and its value
       *
       * @since 1.3
       **/
    public static DEFAULT_LONG_OPT_SEPARATOR: string = " ";
    /** Default name for an argument */
    public static DEFAULT_ARG_NAME: string = "arg";
    /**
       * number of characters per line
       *
       * @deprecated Scope will be made private for next major version - use get/setWidth methods instead.
       */
    public defaultWidth: number = HelpFormatter.DEFAULT_WIDTH;
    /**
       * amount of padding to the left of each line
       *
       * @deprecated Scope will be made private for next major version - use get/setLeftPadding methods instead.
       */
    public defaultLeftPad: number = HelpFormatter.DEFAULT_LEFT_PAD;
    /**
       * the number of characters of padding to be prefixed to each description line
       *
       * @deprecated Scope will be made private for next major version - use get/setDescPadding methods instead.
       */
    public defaultDescPad: number = HelpFormatter.DEFAULT_DESC_PAD;
    /** The separator displayed between the long option and its value. */
    private longOptSeparator: string = HelpFormatter.DEFAULT_LONG_OPT_SEPARATOR;
    /**
       * the string to display at the beginning of the usage statement
       *
       * @deprecated Scope will be made private for next major version - use get/setSyntaxPrefix methods instead.
       */
    public defaultSyntaxPrefix: string = HelpFormatter.DEFAULT_SYNTAX_PREFIX;
    /**
       * the long Opt prefix
       *
       * @deprecated Scope will be made private for next major version - use get/setLongOptPrefix methods instead.
       */
    public defaultLongOptPrefix: string = HelpFormatter.DEFAULT_LONG_OPT_PREFIX;
    /**
       * the shortOpt prefix
       *
       * @deprecated Scope will be made private for next major version - use get/setOptPrefix methods instead.
       */
    public defaultOptPrefix: string = HelpFormatter.DEFAULT_OPT_PREFIX;
    /**
       * the name of the argument
       *
       * @deprecated Scope will be made private for next major version - use get/setArgName methods instead.
       */
    public defaultArgName: string = HelpFormatter.DEFAULT_ARG_NAME;
    constructor() {
    }
    /**
       * Print the help for {@code options} with the specified command line syntax. This method prints help information
       * to System.out.
       *
       * @param cmdLineSyntax the syntax for this application
       * @param header the banner to display at the beginning of the help
       * @param options the Options instance
       * @param footer the banner to display at the end of the help
       * @param autoUsage whether to print an automatically generated usage statement
       */
    public printHelp(cmdLineSyntax: string, header: string, options: Options, footer: string, autoUsage: boolean, width?: number, leftPad?: number, descPad?: number): void {
        if (cmdLineSyntax == null || cmdLineSyntax == "") {
            throw new Error("cmdLineSyntax not provided");
        }
        if (!width) {
            width = this.getWidth();
        }
        if (!leftPad) {
            leftPad = this.getLeftPadding();
        }
        if (!descPad) {
            descPad = this.getDescPadding();
        }
        if (autoUsage) {
            this.printUsage(width, cmdLineSyntax, options);
        }
        else {
            this.printUsage(width, cmdLineSyntax);
        }
        if (header != null && !(header.length == 0)) {
            this.printWrapped(width, 0, header);
        }
        this.printOptions(width, options, leftPad, descPad);
        if (footer != null && !(footer.length == 0)) {
            this.printWrapped(width, 0, footer);
        }
    }
    /**
       * Print the help for the specified Options to the specified writer, using the specified width, left padding and
       * description padding.
       *
       * @param width The number of characters to display per line
       * @param options The command line Options
       * @param leftPad the number of characters of padding to be prefixed to each line
       * @param descPad the number of characters of padding to be prefixed to each description line
       */
    public printOptions(width: number, options: Options, leftPad: number, descPad: number): void {
        let sb = this.renderOptions(width, options, leftPad, descPad);
        for (let index = 0; index < sb.length; index++) {
            console.log("commons-cli:" + sb[index]);
        }
    }
    /**
       * Gets the 'longOptPrefix'.
       *
       * @return the 'longOptPrefix'
       */
    public getLongOptPrefix(): string {
        return this.defaultLongOptPrefix;
    }
    /**
       * Gets the 'optPrefix'.
       *
       * @return the 'optPrefix'
       */
    public getOptPrefix(): string {
        return this.defaultOptPrefix;
    }
    /**
       * Gets the 'syntaxPrefix'.
       *
       * @return the 'syntaxPrefix'
       */
    public getSyntaxPrefix(): string {
        return this.defaultSyntaxPrefix;
    }
    /**
       * Gets the 'newLine'.
       *
       * @return the 'newLine'
       */
    public getNewLine(): string {
        console.log("");
        return this.defaultNewLine;
    }
    /**
       * Gets the 'width'.
       *
       * @return the 'width'
       */
    public getWidth(): number {
        return this.defaultWidth;
    }
    /**
       * Gets the 'descPadding'.
       *
       * @return the 'descPadding'
       */
    public getDescPadding(): number {
        return this.defaultDescPad;
    }
    /**
       * Gets the 'leftPadding'.
       *
       * @return the 'leftPadding'
       */
    public getLeftPadding(): number {
        return this.defaultLeftPad;
    }
    /**
       * Gets the 'argName'.
       *
       * @return the 'argName'
       */
    public getArgName(): string {
        return this.defaultArgName;
    }
    public getLongOptSeparator(): string {
        return this.longOptSeparator;
    }
    /**
       * Print the cmdLineSyntax to the specified writer, using the specified width.
       *
       * @param cmdLineSyntax The usage statement.
       */
    public printUsage(width: number, cmdLineSyntax: string, options?: Options): void {
        if (options) {
            // initialize the string buffer
            let buff: string = this.getSyntaxPrefix() + cmdLineSyntax + " ";
            // create a list for processed option groups
            let processedGroups: JList<OptionGroup> = new JList();
            let optList: JList<CliOption> = options.getOptions();
            let arr: Array<CliOption> = new Array(optList.length());
            for (let index: number = 0; index < optList.length(); index++) {
                arr[index] = optList.get(index);
            }
            //sort options ascending
            arr.sort((left: CliOption, right: CliOption) => {
                if (left.getKey() > right.getKey())
                    return 1;
                if (left.getKey() < right.getKey())
                    return -1;
                return 0;
            });
            // iterate over the options
            for (let index: number = 0; index < arr.length; index++) {
                // get the next Option
                let option: CliOption = arr[index];
                // check if the option is part of an OptionGroup
                let group: OptionGroup | null = options.getOptionGroup(option);
                // if the option is part of a group
                if (group != null) {
                    // and if the group has not already been processed
                    if (!processedGroups.contains(group)) {
                        // add the group to the processed list
                        processedGroups.insert(group);
                        // add the usage clause
                        buff += this.appendOptionGroup(buff, group);
                    }
                    // otherwise the option was displayed in the group
                    // previously so ignore it.
                }
                // if the Option is not part of an OptionGroup
                else {
                    buff += this.appendOption(option, option.isRequired());
                }
                if (arr[index + 1]) {
                    buff += " ";
                }
            }
            // call printWrapped
            this.printWrapped(width, buff.toString().indexOf(' ') + 1, buff.toString());
        }
        else {
            let argPos = cmdLineSyntax.indexOf(' ') + 1;
            this.printWrapped(width, this.getSyntaxPrefix().length + argPos, this.getSyntaxPrefix() + cmdLineSyntax);
        }
    }
    /**
       * Print the specified text to the specified PrintWriter.
       *
       * @param nextLineTabStop The position on the next line for the first tab.
       * @param text The text to be written to the PrintWriter
       */
    public printWrapped(width: number, nextLineTabStop: number, text: string): void {
        let sb = this.renderWrappedTextBlock(width, nextLineTabStop, text);
        for (let index = 0; index < sb.length; index++) {
            console.log("commons-cli:" + sb[index]);
        }
    }
    /**
       * Render the specified Options and return the rendered Options in a StringBuffer.
       *
       * @param sb The StringBuffer to place the rendered Options into.
       * @param width The number of characters to display per line
       * @param options The command line Options
       * @param leftPad the number of characters of padding to be prefixed to each line
       * @param descPad the number of characters of padding to be prefixed to each description line
       *
       * @return the StringBuffer with the rendered Options contents.
       */
    protected renderOptions(width: number, options: Options, leftPad: number, descPad: number): string[] {
        let lpad = this.createPadding(leftPad);
        let dpad = this.createPadding(descPad);
        let sb: string[] = new Array();
        // first create list containing only <lpad>-a,--aaa where
        // -a is opt and --aaa is long opt; in parallel look for
        // the longest opt string this list will be then used to
        let max = 0;
        let prefixList: JList<string> = new JList();
        let optList: JList<CliOption> = options.helpOptions();
        let arr: Array<CliOption> = new Array(optList.length());
        for (let index = 0; index < optList.length(); index++) {
            arr[index] = optList.get(index);
        }
        //sort options ascending
        arr.sort((left: CliOption, right: CliOption) => {
            if (left.getKey() > right.getKey())
                return 1;
            if (left.getKey() < right.getKey())
                return -1;
            return 0;
        });
        for (let index: number = 0; index < arr.length; index++) {
            let optBuf: string = "";
            let option: CliOption = arr[index];
            if (option.getOpt() == null) {
                optBuf += lpad + "   " + this.getLongOptPrefix() + option.getLongOpt();
            }
            else {
                optBuf += lpad + this.getOptPrefix() + option.getOpt();
                if (option.hasLongOpt()) {
                    optBuf += ',' + this.getLongOptPrefix() + option.getLongOpt();
                }
            }
            if (option.buildHasArg()) {
                let argName: string = option.getArgName();
                if (argName != null && argName.length == 0) {
                    // if the option has a blank argname
                    optBuf += ' ';
                }
                else {
                    optBuf += option.hasLongOpt() ? this.longOptSeparator : " ";
                    optBuf += "<" + (argName != null ? option.getArgName() : this.getArgName()) + ">";
                }
            }
            prefixList.insert(optBuf);
            max = optBuf.length > max ? optBuf.length : max;
        }
        let x = 0;
        for (let index = 0; index < arr.length; index++) {
            let option: CliOption = arr[index];
            let optBuf = prefixList.get(x++);
            if (optBuf.length < max) {
                optBuf += this.createPadding(max - optBuf.length);
            }
            optBuf += dpad;
            let nextLineTabStop = max + descPad;
            if (option.getDescription() != null) {
                optBuf += option.getDescription();
            }
            sb.push(this.renderWrappedText(width, nextLineTabStop, optBuf));
            if (optList.get(index + 1)) {
                this.getNewLine();
            }
        }
        return sb;
    }
    /**
       * Appends the usage clause for an Option to a StringBuffer.
       *
       * @param buff the StringBuffer to append to
       * @param option the Option to append
       * @param required whether the Option is required or not
       */
    private appendOption(option: CliOption, required: boolean): string {
        let buff = "";
        if (!required) {
            buff += "[";
        }
        if (option.getOpt() != null) {
            buff += "-" + option.getOpt();
        }
        else {
            buff += "--" + option.getLongOpt();
        }
        // if the Option has a value and a non blank argname
        if (option.buildHasArg() && (option.getArgName() == null || !(option.getArgName().length == 0))) {
            buff += option.getOpt() == null ? this.longOptSeparator : " ";
            buff += "<" + (option.getArgName() != null ? option.getArgName() : this.getArgName()) + ">";
        }
        // if the Option is not a required option
        if (!required) {
            buff += "]";
        }
        return buff;
    }
    /**
       * Appends the usage clause for an OptionGroup to a StringBuffer. The clause is wrapped in square brackets if the group
       * is required. The display of the options is handled by appendOption
       *
       * @param buff the StringBuffer to append to
       * @param group the group to append
       * @see #appendOption(StringBuffer,Option,boolean)
       */
    private appendOptionGroup(buff: string, group: OptionGroup): string {
        if (!(group.isRequired())) {
            buff += "[";
        }
        let optList: JList<CliOption> = group.getOptions();
        let arr: Array<CliOption> = new Array(optList.length());
        for (let index = 0; index < optList.length(); index++) {
            arr[index] = optList.get(index);
        }
        //sort options ascending
        arr.sort((left: CliOption, right: CliOption) => {
            if (left.getKey() > right.getKey())
                return 1;
            if (left.getKey() < right.getKey())
                return -1;
            return 0;
        });
        for (let index = 0; index < arr.length; index++) {
            buff += this.appendOption(arr[index], true);
            if (arr[index + 1]) {
                buff += " | ";
            }
        }
        if (!(group.isRequired())) {
            buff += "]";
        }
        return buff;
    }
    /**
       * Render the specified text width a maximum width. This method differs from renderWrappedText by not removing leading
       * spaces after a new line.
       *
       * @param sb The StringBuffer to place the rendered text into.
       * @param width The number of characters to display per line
       * @param nextLineTabStop The position on the next line for the first tab.
       * @param text The text to be rendered.
       */
    private renderWrappedTextBlock(width: number, nextLineTabStop: number, text: string): string[] {
        let arr = text.split("\n");
        let sb: Array<string> = new Array();
        let firstLine = true;
        for (let index = 0; index < arr.length; index++) {
            if (!firstLine) {
                this.getNewLine();
            }
            else {
                firstLine = false;
            }
            sb.push(this.renderWrappedText(width, nextLineTabStop, arr[index]));
        }
        return sb;
    }
    /**
       * Render the specified text and return the rendered Options in a StringBuffer.
       *
       * @param sb The StringBuffer to place the rendered text into.
       * @param width The number of characters to display per line
       * @param nextLineTabStop The position on the next line for the first tab.
       * @param text The text to be rendered.
       *
       * @return the StringBuffer with the rendered Options contents.
       */
    protected renderWrappedText(width: number, nextLineTabStop: number, text: string): string {
        let sb = "";
        let pos = this.findWrapPos(text, width, 0);
        if (pos == -1) {
            sb += this.rtrim(text);
            return sb;
        }
        sb += this.rtrim(text.substring(0, pos));
        if (nextLineTabStop >= width) {
            // stops infinite loop happening
            nextLineTabStop = 1;
        }
        // all following lines must be padded with nextLineTabStop space characters
        let padding = this.createPadding(nextLineTabStop);
        while (true) {
            text = padding + text.substring(pos).trim();
            pos = this.findWrapPos(text, width, 0);
            if (pos == -1) {
                sb += text;
                return sb;
            }
            if (text.length > width && pos == nextLineTabStop - 1) {
                pos = width;
            }
            sb += this.rtrim(text.substring(0, pos));
        }
    }
    /**
       * Return a String of padding of length {@code len}.
       *
       * @param len The length of the String of padding to create.
       *
       * @return The String of padding
       */
    protected createPadding(len: number): string {
        let padding = "";
        for (let index = 0; index < len; index++) {
            padding += " ";
        }
        return padding;
    }
    /**
       * Finds the next text wrap position after {@code startPos} for the text in {@code text} with the column width
       * {@code width}. The wrap point is the last position before startPos+width having a whitespace character (space,
       * \n, \r). If there is no whitespace character before startPos+width, it will return startPos+width.
       *
       * @param text The text being searched for the wrap position
       * @param width width of the wrapped text
       * @param startPos position from which to start the lookup whitespace character
       * @return position on which the text must be wrapped or -1 if the wrap position is at the end of the text
       */
    public findWrapPos(text: string, width: number, startPos: number): number {
        // the line ends before the max wrap pos or a new line char found
        let str = text.substring(startPos);
        let pos = str.indexOf("\n");
        if (pos != -1 && pos <= width) {
            return pos + 1;
        }
        pos = str.indexOf("\t");
        if (pos != -1 && pos <= width) {
            return pos + 1;
        }
        if (startPos + width >= text.length) {
            return -1;
        }
        // look for the last whitespace character before startPos+width
        for (pos = startPos + width; pos >= startPos; --pos) {
            let c = text.charAt(pos);
            if (c == ' ' || c == '\n' || c == '\r') {
                break;
            }
        }
        // if we found it - just return
        if (pos > startPos) {
            return pos;
        }
        // if we didn't find one, simply chop at startPos+width
        pos = startPos + width;
        return pos == text.length ? -1 : pos;
    }
    /**
       * Remove the trailing whitespace from the specified String.
       *
       * @param s The String to remove the trailing padding from.
       *
       * @return The String of without the trailing padding
       */
    public rtrim(s: string): string {
        if (s.length == 0) {
            return s;
        }
        let pos = s.length;
        while (pos > 0 && HelpFormatter.isWhitespace(s.charAt(pos - 1))) {
            --pos;
        }
        return s.substring(0, pos);
    }
    private static isWhitespace(s: string): boolean {
        if (" " == s || "\n" == s || "\t" == s) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * Sets the 'argName'.
    *
    * @param name the new value of 'argName'
    */
    public setArgName(name: string): void {
        this.defaultArgName = name;
    }
    /**
     * Sets the 'descPadding'.
     *
     * @param padding the new value of 'descPadding'
     */
    public setDescPadding(padding: number): void {
        this.defaultDescPad = padding;
    }
    /**
     * Sets the 'leftPadding'.
     *
     * @param padding the new value of 'leftPadding'
     */
    public setLeftPadding(padding: number): void {
        this.defaultLeftPad = padding;
    }
    /**
     * Sets the 'longOptPrefix'.
     *
     * @param prefix the new value of 'longOptPrefix'
     */
    public setLongOptPrefix(prefix: string): void {
        this.defaultLongOptPrefix = prefix;
    }
    /**
     * Set the separator displayed between a long option and its value. Ensure that the separator specified is supported by
     * the parser used, typically ' ' or '='.
     *
     * @param longOptSeparator the separator, typically ' ' or '='.
     * @since 1.3
     */
    public setLongOptSeparator(longOptSeparator: string): void {
        this.longOptSeparator = longOptSeparator;
    }
    /**
     * Sets the 'newLine'.
     *
     * @param newline the new value of 'newLine'
     */
    public setNewLine(newline: string): void {
        this.defaultNewLine = newline;
    }
    /**
     * Sets the 'optPrefix'.
     *
     * @param prefix the new value of 'optPrefix'
     */
    public setOptPrefix(prefix: string): void {
        this.defaultOptPrefix = prefix;
    }
    /**
     * Sets the 'syntaxPrefix'.
     *
     * @param prefix the new value of 'syntaxPrefix'
     */
    public setSyntaxPrefix(prefix: string): void {
        this.defaultSyntaxPrefix = prefix;
    }
    /**
     * Sets the 'width'.
     *
     * @param width the new value of 'width'
     */
    public setWidth(width: number): void {
        this.defaultWidth = width;
    }
}
