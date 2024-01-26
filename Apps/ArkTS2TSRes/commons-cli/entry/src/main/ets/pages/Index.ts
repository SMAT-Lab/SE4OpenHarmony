interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { CliOption, CliBulider, Options, OptionGroup, CommandLine, Properties, HelpFormatter, DefaultParser, CommandLineParser } from '@ohos/commons-cli';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private createOption(optionString: string, hasArg: boolean, description?: string, longOption?: string): CliOption {
        let option: CliOption = CliOption.createOption(optionString, hasArg, description, longOption);
        return option;
    }
    private optionBuilder(option?: string): CliBulider {
        return CliOption.builder(option ? option : '');
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('testLs');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let optionsmy = new Options();
                optionsmy.addOption(this.createOption("a", false, "do not hide entries starting with .", "all"));
                optionsmy.addOption(this.createOption("A", false, "do not list implied . and ..", "almost-all"));
                optionsmy.addOption(this.optionBuilder("")
                    .buildLongOpt("block-size")
                    .desc("use SIZE-byte blocks")
                    .buildHasArg(true)
                    .argNames("SIZE")
                    .buildOption());
                let parsermy: CommandLineParser = new DefaultParser();
                let args = ["--block-size=10"];
                let cmdmy: CommandLine = parsermy.parse(optionsmy, args, null, false);
                console.log("commons-cli cmdmy.hasOption:" + cmdmy.hasOption("block-size"));
                console.log("commons-cli line.getOptionValue:" + cmdmy.getOptionValue("block-size"));
            }
            catch (error) {
                console.error("commons-cli testLs:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Options and HelpFormatter Test 1');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let optionsmy = new Options();
                optionsmy.addOption(this.createOption("t", true, "set time on system"));
                optionsmy.addOption(this.createOption("h", false, "list help"));
                let flag = optionsmy.hasOption("h");
                console.log("commons-cli hasOption('h'):" + flag);
                console.log("commons-cli hasArg:" + optionsmy.getOption("h").buildHasArg());
                console.log("commons-cli getDescription:" + optionsmy.getOption("h").getDescription());
                flag = optionsmy.hasOption("t");
                console.log("commons-cli hasOption('t'):" + flag);
                console.log("commons-cli hasArg:" + optionsmy.getOption("t").buildHasArg());
                console.log("commons-cli getDescription:" + optionsmy.getOption("t").getDescription());
                let parsermy: CommandLineParser = new DefaultParser();
                let args = ["-h"];
                let cmdmy: CommandLine = parsermy.parse(optionsmy, args, null, false);
                if (cmdmy.hasOption("t")) {
                    console.log("commons-cli system time has setted:" + cmdmy.getOptionValue("t"));
                }
                if (cmdmy.hasOption("h")) {
                    let formatstr = "CLI  cli  test";
                    let hf: HelpFormatter = new HelpFormatter();
                    hf.printHelp(formatstr, "header", optionsmy, "footer", false);
                    hf.printHelp(formatstr, "header", optionsmy, "footer", true);
                }
            }
            catch (error) {
                console.error("commons-cli:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Options and HelpFormatter Test 2');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let optionsmy = new Options();
                let option: CliOption = this.createOption("h", false, "Print help", "help");
                option.setRequired(false);
                optionsmy.addOption(option);
                option = this.createOption("c", true, "Name server config properties file", "configFile");
                option.setRequired(false);
                optionsmy.addOption(option);
                option = this.createOption("p", false, "Print all config item", "printConfigItem");
                option.setRequired(false);
                optionsmy.addOption(option);
                let parsermy: CommandLineParser = new DefaultParser();
                let args = ["-h", "-c", "config.xml"];
                let cmdmy: CommandLine = parsermy.parse(optionsmy, args, null, false);
                if (cmdmy.hasOption("h")) {
                    let formatstr = "testApp";
                    let hf: HelpFormatter = new HelpFormatter();
                    hf.setWidth(110);
                    hf.printHelp(formatstr, "header", optionsmy, "footer", true);
                }
                let opts: CliOption[] = cmdmy.getOptions();
                if (opts != null) {
                    for (let index = 0; index < opts.length; index++) {
                        let opt: CliOption = opts[index];
                        let name = opt.getLongOpt();
                        let value = cmdmy.getOptionValue(name);
                        console.log("commons-cli:" + name + "=>" + value);
                    }
                }
            }
            catch (error) {
                console.error("commons-cli:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Properties Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let opts: Options = new Options();
                let option: CliOption = this.createOption("a", false, "toggle -a");
                opts.addOption(option);
                option = this.createOption("c", false, "toggle -c", "c");
                opts.addOption(option);
                option = this.createOption("c", false, "toggle -c", "c");
                opts.addOption(option);
                let properties: Properties = new Properties();
                properties.setProperty("a", "true");
                properties.setProperty("c", "yes");
                let parser: CommandLineParser = new DefaultParser();
                let cmd: CommandLine = parser.parse(opts, [''], properties, false);
                console.log("commons-cli cmd.hasOption('a'):" + cmd.hasOption("a"));
                console.log("commons-cli cmd.hasOption('c'):" + cmd.hasOption("c"));
            }
            catch (error) {
                console.error("commons-cli Properties Test:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testGetOptionProperties');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let args: string[] = ["-Dparam1=value1", "-Dparam2=value2", "-Dparam3", "-Dparam4=value4", "-D", "--property", "foo=bar"];
                let options: Options = new Options();
                let help: CliOption = this.optionBuilder("D")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .numberOfArgs(2)
                    .optionalArg(true)
                    .required(false)
                    .buildLongOpt()
                    .argNames()
                    .buildOption();
                let version: CliOption = this.optionBuilder("")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .numberOfArgs(2)
                    .optionalArg(false)
                    .buildLongOpt("property")
                    .argNames()
                    .required(false)
                    .buildOption();
                options.addOption(help);
                options.addOption(version);
                let parser: CommandLineParser = new DefaultParser();
                let line: CommandLine = parser.parse(options, args, null, false);
                let props: Properties = line.getOptionProperties("D");
                // result 4
                console.log("commons-cli props.size():" + props.size());
                // result value1
                console.log("commons-cli props.getProperty('param1'):" + props.getProperty("param1"));
                // result value2
                console.log("commons-cli props.getProperty('param2'):" + props.getProperty("param2"));
                // result true
                console.log("commons-cli props.getProperty('param3'):" + props.getProperty("param3"));
                // result value4
                console.log("commons-cli props.getProperty('param4'):" + props.getProperty("param4"));
                // result bar
                console.log("commons-cli getProperty('foo'):" + line.getOptionProperties("property").getProperty("foo"));
                console.log("commons-cli line:" + line.getOptions()
                    .length);
            }
            catch (error) {
                console.error("commons-cli testGetOptionProperties:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testDefaultArgName');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let o = this.optionBuilder("f")
                    .buildLongOpt("longOpt")
                    .buildHasArg(true)
                    .required(true)
                    .buildOption();
                let optionsmy = new Options();
                optionsmy.addOption(o);
                let formatter: HelpFormatter = new HelpFormatter();
                formatter.setArgName("argument");
                formatter.printUsage(80, "app", optionsmy);
            }
            catch (error) {
                console.error("commons-cli testDefaultArgName:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testHelpWithLongOptSeparator');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let hf: HelpFormatter = new HelpFormatter();
                let opts: Options = new Options();
                let option: CliOption = this.createOption("f", true, "the file");
                opts.addOption(option);
                opts.addOption(this.optionBuilder("s")
                    .buildLongOpt("size")
                    .desc("the size")
                    .buildHasArg(true)
                    .argNames("SIZE")
                    .buildOption());
                opts.addOption(this.optionBuilder()
                    .buildLongOpt("age")
                    .desc("the age")
                    .buildHasArg(true)
                    .buildOption());
                hf.setLongOptSeparator("=");
                console.log("commons-cli  line.hasOption('option'):" + hf.getLongOptSeparator());
                hf.printHelp("create", "header", opts, "footer", false, 80, 2, 2);
            }
            catch (error) {
                console.error("commons-cli testHelpWithLongOptSeparator:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testOptionWithoutShortFormat');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let hf: HelpFormatter = new HelpFormatter();
                let opts: Options = new Options();
                let option: CliOption = this.createOption("a", false, "aaaaaaa", "aaa");
                opts.addOption(option);
                option = this.createOption('', false, "bbbbbbb", "bbb");
                opts.addOption(option);
                option = this.createOption("c", false, "ccccccc");
                opts.addOption(option);
                hf.printHelp("foobar", "", opts, "", true, 80, 2, 2);
            }
            catch (error) {
                console.error("commons-cli testOptionWithoutShortFormat:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testOptionWithoutShortFormat2');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let hf: HelpFormatter = new HelpFormatter();
                let help: CliOption = this.createOption("h", false, "print this message", "help");
                let version: CliOption = this.createOption("v", false, "print version information", "version");
                let newRun: CliOption = this.createOption("n", false, "Create NLT cache entries only for new items", "new");
                let trackerRun: CliOption = this.createOption("t", false, "Create NLT cache entries only for tracker items", "tracker");
                // @formatter:off
                let timeLimit: CliOption = this.optionBuilder("l")
                    .buildLongOpt("limit")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .desc("Set time limit for execution, in mintues")
                    .buildOption();
                let age: CliOption = this.optionBuilder("a")
                    .buildLongOpt("age")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .desc("Age (in days) of cache item before being recomputed")
                    .buildOption();
                let server: CliOption = this.optionBuilder("s")
                    .buildLongOpt("server")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .desc("The NLT server address")
                    .buildOption();
                let numResults: CliOption = this.optionBuilder("r")
                    .buildLongOpt("results")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .desc("Number of results per item")
                    .buildOption();
                let configFile: CliOption = this.optionBuilder()
                    .buildLongOpt("config")
                    .buildHasArg(true)
                    .valueSeparator("=")
                    .desc("Use the specified configuration file")
                    .buildOption();
                let mOptions: Options = new Options();
                mOptions.addOption(help);
                mOptions.addOption(version);
                mOptions.addOption(newRun);
                mOptions.addOption(trackerRun);
                mOptions.addOption(timeLimit);
                mOptions.addOption(age);
                mOptions.addOption(server);
                mOptions.addOption(numResults);
                mOptions.addOption(configFile);
                hf.printHelp("commandline", "header", mOptions, "footer", true, 80, 2, 2);
            }
            catch (error) {
                console.error("commons-cli testOptionWithoutShortFormat2:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testPrintHelpWithEmptySyntax');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let hf: HelpFormatter = new HelpFormatter();
                let opts: Options = new Options();
                // 报错跑异常：cmdLineSyntax not provided
                hf.printHelp("", "", opts, "", true);
            }
            catch (error) {
                console.error("commons-cli testPrintHelpWithEmptySyntax:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testPrintOptionGroupUsage');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let group: OptionGroup = new OptionGroup();
                let hf: HelpFormatter = new HelpFormatter();
                let opts: Options = new Options();
                group.addOption(this.optionBuilder("a").buildOption());
                group.addOption(this.optionBuilder("b").buildOption());
                group.addOption(this.optionBuilder("c").buildOption());
                opts.addOptionGroup(group);
                hf.printUsage(80, "app", opts);
                group.setRequired(true);
                opts.addOptionGroup(group);
                hf.printUsage(80, "app", opts);
            }
            catch (error) {
                console.error("commons-cli testPrintOptionGroupUsage:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('testPrintOptionWithEmptyArgNameUsage');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let option: CliOption = this.createOption("f", true);
                option.setArgName("");
                option.setRequired(true);
                let hf: HelpFormatter = new HelpFormatter();
                let opts: Options = new Options();
                opts.addOption(option);
                hf.printUsage(80, "app", opts);
                let formatter: HelpFormatter = new HelpFormatter();
                console.log("commons-cli formatter.rtrim(''):" + formatter.rtrim(''));
                console.log("commons-cli formatter.rtrim('  foo  '):" + formatter.rtrim("  foo  "));
                let optionA: CliOption = this.createOption("f", true, "the file");
                let optionB: CliOption = this.optionBuilder("s").buildLongOpt("size").buildHasArg(true).argNames("SIZE").desc("the size").buildOption();
                let optionC: CliOption = this.optionBuilder().buildLongOpt("age").buildHasArg(true).desc("the age").buildOption();
                let options: Options = new Options();
                options.addOption(optionA);
                options.addOption(optionB);
                options.addOption(optionC);
                hf = new HelpFormatter();
                hf.setLongOptSeparator("=");
                hf.printUsage(80, "create", options);
                let groups: OptionGroup = new OptionGroup();
                groups.addOption(this.createOption("a", false));
                groups.addOption(this.createOption("b", false));
                console.log("commons-cli groups.getNames().length():" + groups.getNames().length());
                console.log("commons-cli groups.getNames().contains('a'):" + groups.getNames().contains("a"));
                console.log("commons-cli groups.getNames().contains('b'):" + groups.getNames().contains("b"));
            }
            catch (error) {
                console.error("commons-cli testPrintOptionWithEmptyArgNameUsage:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
