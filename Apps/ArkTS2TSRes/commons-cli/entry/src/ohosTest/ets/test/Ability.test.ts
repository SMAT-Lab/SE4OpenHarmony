let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { CliOption, CliBulider, Options, OptionGroup, CommandLine, DefaultParser, CommandLineParser, HelpFormatter } from '@ohos/commons-cli';
import { JList } from '@ohos/commons-cli/src/main/ets/components/cli/JList';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect, DEFAULT } from '@ohos/hypium';
let cliBuilder: CliBulider = CliOption.builder("abc");
let cliBuilderEmpty: CliBulider = CliOption.builder("");
let cliOption: CliOption = CliOption.createOption("a", true, "do not hide entries starting with .", "all");
let cliOptionEmpty: CliOption = CliOption.createOption("", false, "do not hide entries starting with .", "all");
let option: Options = new Options();
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('Options_builder', 0, () => {
            expect(cliBuilder.option).assertEqual("abc");
        });
        it('Options_builder_empty', 0, () => {
            expect(cliBuilderEmpty.option).assertEqual("");
        });
        it('Options_createOption', 0, () => {
            expect(cliOption.getOpt()).assertEqual("a");
        });
        it('Options_createOption_empty', 0, () => {
            expect(cliOptionEmpty.getOpt()).assertEqual("");
        });
        it('buildLongOpt', 0, () => {
            cliOption.buildLongOpt('abcdef');
            expect(cliOption.getLongOpt()).assertEqual("abcdef");
        });
        it('buildLongOpt_special', 0, () => {
            cliOption.buildLongOpt('abc&\nef');
            expect(cliOption.getLongOpt()).assertEqual("abc&\nef");
        });
        it('buildLongOpt_empty', 0, () => {
            cliOption.buildLongOpt('');
            expect(cliOption.getLongOpt()).assertEqual('');
        });
        it('hasArg_true', 0, () => {
            expect(cliOption.buildHasArg()).assertTrue();
        });
        it('hasArg_false', 0, () => {
            expect(cliOptionEmpty.buildHasArg()).assertFalse();
        });
        it('hasArgs_true', 0, () => {
            cliOption.setArgs(2);
            expect(cliOption.buildHasArgs()).assertTrue();
        });
        it('cliOptionEmpty_hasArg_false', 0, () => {
            cliOptionEmpty.setArgs(1);
            expect(cliOptionEmpty.buildHasArgs()).assertFalse();
        });
        it('setDescription', 0, () => {
            cliOption.setDescription('abcdef is description');
            expect(cliOption.getDescription()).assertEqual("abcdef is description");
        });
        it('setDescription_empty', 0, () => {
            cliOption.setDescription('');
            expect(cliOption.getDescription()).assertEqual("");
        });
        it('setDescription_special', 0, () => {
            cliOption.setDescription('abcdef\'s is description');
            expect(cliOption.getDescription()).assertEqual("abcdef\'s is description");
        });
        it('setOptionalArg_true', 0, () => {
            cliOption.setOptionalArg(true);
            expect(cliOption.hasOptionalArg()).assertTrue();
        });
        it('requiresArg_false', 0, () => {
            expect(cliOption.requiresArg()).assertFalse();
        });
        it('setOptionalArg_false', 0, () => {
            cliOption.setOptionalArg(false);
            expect(cliOption.hasOptionalArg()).assertFalse();
        });
        it('requiresArg_true', 0, () => {
            expect(cliOption.requiresArg()).assertTrue();
        });
        it('acceptsArg_false', 0, () => {
            opt.addValueForProcessing('h');
            expect(opt.acceptsArg()).assertFalse();
        });
        it('setArgName', 0, () => {
            cliOption.setArgName('opt');
            expect(cliOption.getArgName().length != 0).assertTrue();
        });
        it('getArgName', 0, () => {
            expect(cliOption.getArgName()).assertEqual('opt');
        });
        it('cliOption_getId', 0, () => {
            expect(cliOption.getId()).assertEqual('a');
        });
        it('cliOption_getKey', 0, () => {
            expect(cliOption.getKey()).assertEqual('a');
        });
        it('cliBuilder_getId', 0, () => {
            expect(cliBuilder.buildOption().getId()).assertEqual('a');
        });
        let optValue = CliOption.createOption("value", true, "do not hide entries starting with .", "all");
        optValue.addValueForProcessing('value_1');
        optValue.addValueForProcessing('value_2');
        optValue.addValueForProcessing('value_3');
        it('cliOption_getValue', 0, () => {
            expect(optValue.getValue(2)).assertEqual('value_3');
        });
        it('cliOption_getValue_negative', 0, () => {
            expect(optValue.getValue(-2)).assertEqual(undefined);
        });
        it('cliOption_getValues', 0, () => {
            expect(optValue.getValues()).assertDeepEquals(['value_1', 'value_2', 'value_3']);
        });
        it('cliOption_hasValueSeparator_false', 0, () => {
            expect(optValue.hasValueSeparator()).assertFalse();
        });
        it('cliOption_setValueSeparator', 0, () => {
            optValue.setValueSeparator('value');
            expect(optValue.getValueSeparator()).assertEqual('value');
        });
        it('cliOption_hasValueSeparator_true', 0, () => {
            expect(optValue.hasValueSeparator()).assertTrue();
        });
        it('cliOption_setValueSeparator_empty', 0, () => {
            optValue.setValueSeparator('');
            expect(optValue.getValueSeparator()).assertEqual('');
        });
        it('cliBuilder_getKey', 0, () => {
            expect(cliBuilder.buildOption().getKey()).assertEqual('abc');
        });
        it('acceptsArg_true', 0, () => {
            expect(cliOption.acceptsArg()).assertTrue();
        });
        it('setArgs_positive_number', 0, () => {
            cliOption.setArgs(2);
            expect(cliOption.getArgs()).assertEqual(2);
        });
        it('setArgs_negative', 0, () => {
            cliOption.setArgs(-2);
            expect(cliOption.getArgs()).assertEqual(-2);
        });
        it('setArgs_0', 0, () => {
            cliOption.setArgs(0);
            expect(cliOption.getArgs()).assertEqual(0);
        });
        it('addOption', 0, () => {
            option.addOption(cliOption);
            expect(option.hasOption('a')).assertTrue();
        });
        it('addOption_empty', 0, () => {
            option.addOption(cliOptionEmpty);
            expect(option.hasOption('')).assertTrue();
        });
        it('addOptionGroup', 0, () => {
            let group: OptionGroup = new OptionGroup();
            group.addOption(cliOption);
            group.addOption(cliBuilder.buildOption());
            group.setRequired(true);
            option.addOptionGroup(group);
            expect(option.getOptionGroups().size).assertEqual(1);
        });
        it('getNames', 0, () => {
            let group: OptionGroup = new OptionGroup();
            group.addOption(cliOption);
            group.addOption(cliBuilder.buildOption());
            expect(group.getNames().dataSouce).assertDeepEquals(['a', 'abc']);
        });
        it('getNames_empty', 0, () => {
            let group: OptionGroup = new OptionGroup();
            expect(group.getNames().dataSouce).assertDeepEquals([]);
        });
        it('setSelected', 0, () => {
            let group: OptionGroup = new OptionGroup();
            group.addOption(cliOption);
            group.addOption(cliBuilder.buildOption());
            group.setSelected(cliOption);
            expect(group.getSelected()).assertEqual(cliOption.getOpt());
        });
        it('getSelected', 0, () => {
            let group: OptionGroup = new OptionGroup();
            expect(group.getSelected()).assertNull();
        });
        it('getRequiredOptions', 0, () => {
            expect(option.getRequiredOptions().listSize).assertEqual(1);
        });
        let emptyOption = new Options();
        it('addOptionGroup_empty_group', 0, () => {
            let group: OptionGroup = new OptionGroup();
            group.setRequired(false);
            emptyOption.addOptionGroup(group);
            expect(emptyOption.getOptionGroups().size).assertEqual(0);
        });
        it('getRequiredOptions_empty', 0, () => {
            expect(emptyOption.getRequiredOptions().listSize).assertEqual(0);
        });
        it('setRequired_default', 0, () => {
            expect(cliOption.isRequired()).assertFalse();
        });
        it('setRequired_true', 0, () => {
            cliOption.setRequired(true);
            expect(cliOption.isRequired()).assertTrue();
        });
        it('setRequired_addRequiredOption_longOpt', 0, () => {
            option.addRequiredOption('abc', 'A', true, 'is test RequiredOption');
            expect(option.hasOption('A')).assertTrue();
        });
        it('setRequired_addRequiredOption_opt', 0, () => {
            expect(option.hasOption('abc')).assertTrue();
        });
        it('setRequired_addRequiredOption_opt_description', 0, () => {
            let opt: CliOption = option.getOption('A');
            expect(opt.getDescription()).assertEqual('is test RequiredOption');
        });
        it('setRequired_addRequiredOption_opt_hasArg', 0, () => {
            let opt: CliOption = option.getOption('A');
            expect(opt.buildHasArg()).assertTrue();
        });
        it('setRequired_getMatchingOptions_in_existence', 0, () => {
            let list: JList<string> = option.getMatchingOptions('abc');
            expect(list.listSize).assertEqual(0);
        });
        it('setRequired_getMatchingOptions_empty', 0, () => {
            let list: JList<string> = option.getMatchingOptions('');
            expect(list.listSize).assertEqual(1);
        });
        it('setRequired_getMatchingOptions_A', 0, () => {
            let list: JList<string> = option.getMatchingOptions('A');
            expect(list.listSize).assertEqual(1);
        });
        it('getOptions', 0, () => {
            option.addOption(cliOption);
            option.addOption(cliBuilder.buildOption());
            expect(option.getOptions().length()).assertEqual(9);
        });
        it('hasLongOption', 0, () => {
            option.addOption(cliBuilder.buildLongOpt('ABCDEF').buildOption());
            expect(option.hasLongOption('ABCDEF')).assertTrue();
        });
        it('hasLongOption_empty', 0, () => {
            option.addOption(cliBuilder.buildLongOpt('').buildOption());
            expect(option.hasLongOption('')).assertTrue();
        });
        it('hasLongOption_special', 0, () => {
            option.addOption(cliBuilder.buildLongOpt('\-').buildOption());
            expect(option.hasLongOption('\-')).assertTrue();
        });
        it('DefaultParser_new', 0, () => {
            let parser: CommandLineParser = new DefaultParser();
            expect(parser != null).assertTrue();
        });
        it('DefaultParser_createDefaultParser', 0, () => {
            let parser: DefaultParser = DefaultParser.createDefaultParser(true, false);
            expect(parser != null).assertTrue();
        });
        it('hasLongOption_builder', 0, () => {
            let parser: CommandLineParser = DefaultParser.builder().buildDefaultParser();
            ;
            expect(parser != null).assertTrue();
        });
        it('hasLongOption_setAllowPartialMatching_false', 0, () => {
            let parser: CommandLineParser = DefaultParser.builder().setAllowPartialMatching(false).buildDefaultParser();
            expect(parser != null).assertTrue();
        });
        it('hasLongOption_setStripLeadingAndTrailingQuotes_false', 0, () => {
            let parser: CommandLineParser = DefaultParser.builder().setStripLeadingAndTrailingQuotes(false).buildDefaultParser();
            expect(parser != null).assertTrue();
        });
        it('hasLongOption_setAllowPartialMatching_true', 0, () => {
            let parser: CommandLineParser = DefaultParser.builder().setAllowPartialMatching(true).buildDefaultParser();
            expect(parser != null).assertTrue();
        });
        it('hasLongOption_setStripLeadingAndTrailingQuotes_true', 0, () => {
            let parser: CommandLineParser = DefaultParser.builder().setStripLeadingAndTrailingQuotes(true).buildDefaultParser();
            expect(parser != null).assertTrue();
        });
        let helpFormatter = new HelpFormatter();
        it('HelpFormatter_getDescPadding_default', 0, () => {
            expect(helpFormatter.getDescPadding()).assertEqual(HelpFormatter.DEFAULT_DESC_PAD);
        });
        it('HelpFormatter_setDescPadding', 0, () => {
            helpFormatter.setDescPadding(5);
            expect(helpFormatter.getDescPadding()).assertEqual(5);
        });
        it('HelpFormatter_getLeftPadding_default', 0, () => {
            expect(helpFormatter.getLeftPadding()).assertEqual(HelpFormatter.DEFAULT_LEFT_PAD);
        });
        it('HelpFormatter_setLeftPadding', 0, () => {
            helpFormatter.setLeftPadding(5);
            expect(helpFormatter.getLeftPadding()).assertEqual(5);
        });
        it('HelpFormatter_getLongOptPrefix_default', 0, () => {
            expect(helpFormatter.getLongOptPrefix()).assertEqual(HelpFormatter.DEFAULT_LONG_OPT_PREFIX);
        });
        it('HelpFormatter_setLongOptPrefix', 0, () => {
            helpFormatter.setLongOptPrefix('opt');
            expect(helpFormatter.getLongOptPrefix()).assertEqual('opt');
        });
        it('HelpFormatter_getLongOptSeparator_default', 0, () => {
            expect(helpFormatter.getLongOptSeparator()).assertEqual(HelpFormatter.DEFAULT_LONG_OPT_SEPARATOR);
        });
        it('HelpFormatter_setLongOptSeparator', 0, () => {
            helpFormatter.setLongOptSeparator('opt');
            expect(helpFormatter.getLongOptSeparator()).assertEqual('opt');
        });
        it('HelpFormatter_getNewLine_default', 0, () => {
            expect(helpFormatter.getNewLine()).assertEqual("\n");
        });
        it('HelpFormatter_setNewLine', 0, () => {
            helpFormatter.setNewLine('NewLine');
            expect(helpFormatter.getNewLine()).assertEqual('NewLine');
        });
        it('HelpFormatter_getOptPrefix_default', 0, () => {
            expect(helpFormatter.getOptPrefix()).assertEqual(HelpFormatter.DEFAULT_OPT_PREFIX);
        });
        it('HelpFormatter_setOptPrefix', 0, () => {
            helpFormatter.setOptPrefix('Prefix');
            expect(helpFormatter.getOptPrefix()).assertEqual('Prefix');
        });
        it('HelpFormatter_getSyntaxPrefix_default', 0, () => {
            expect(helpFormatter.getSyntaxPrefix()).assertEqual(HelpFormatter.DEFAULT_SYNTAX_PREFIX);
        });
        it('HelpFormatter_setSyntaxPrefix', 0, () => {
            helpFormatter.setSyntaxPrefix('SyntaxPrefix');
            expect(helpFormatter.getSyntaxPrefix()).assertEqual('SyntaxPrefix');
        });
        it('HelpFormatter_getWidth_default', 0, () => {
            expect(helpFormatter.getWidth()).assertEqual(HelpFormatter.DEFAULT_WIDTH);
        });
        it('HelpFormatter_setWidth', 0, () => {
            helpFormatter.setWidth(64);
            expect(helpFormatter.getWidth()).assertEqual(64);
        });
        option.addOption(CliOption.createOption("c", true, "Name server config properties file", "configFile"));
        option.addOption(CliOption.createOption("h", false, "list help", null));
        let parsermy: CommandLineParser = new DefaultParser();
        let args = ["-h", "-c", "config.xml"];
        let cmdmy: CommandLine = parsermy.parse(option, args, null, false);
        it('CommandLineParser_parse', 0, () => {
            expect(cmdmy != null).assertTrue();
        });
        cmdmy.addArg("p");
        cmdmy.addArg("a");
        cmdmy.addArg("c");
        it('CommandLineParser_getArgs', 0, () => {
            expect(cmdmy.getArgs()).assertContain('p');
        });
        it('CommandLineParser_getArgList', 0, () => {
            expect(cmdmy.getArgList().dataSouce).assertContain('a');
        });
        it('CommandLineParser_getArgList_size', 0, () => {
            expect(cmdmy.getArgList().listSize).assertEqual(3);
        });
        let opt = CliOption.createOption("addOpt", true, "do not hide entries starting with .", "all");
        it('CommandLineParser_addOption', 0, () => {
            cmdmy.addOption(opt);
            expect(cmdmy.getOptions().length).assertEqual(3);
        });
        it('CommandLineParser_hasOption_opt', 0, () => {
            expect(cmdmy.hasOption(opt)).assertTrue();
        });
        it('CommandLineParser_hasOption_string', 0, () => {
            expect(cmdmy.hasOption('addOpt')).assertTrue();
        });
        it('CommandLineParser_hasOption_empty', 0, () => {
            expect(cmdmy.hasOption('add')).assertFalse();
        });
        it('CommandLineParser_hasOption_h', 0, () => {
            expect(cmdmy.hasOption("h")).assertTrue();
        });
        it('CommandLineParser_hasOption_c', 0, () => {
            expect(cmdmy.hasOption("c")).assertTrue();
        });
        it('CommandLineParser_getOptionValue', 0, () => {
            expect(cmdmy.getOptionValue("c")).assertEqual("config.xml");
        });
        let cOption = CliOption.createOption("addOpt", true, "do not hide entries starting with .", "all");
        it('CommandLineParser_getOptionValues', 0, () => {
            cOption.addValueForProcessing('h');
            cOption.addValueForProcessing('c');
            cmdmy.addOption(cOption);
            expect(cmdmy.getOptionValues(cOption)).assertDeepEquals(['h', 'c']);
        });
        it('CommandLineParser_getOptionProperties_0', 0, () => {
            expect(cmdmy.getOptionProperties("addOpt").size()).assertEqual(2);
        });
        it('CommandLineParser_getOptionProperties_empty', 0, () => {
            expect(cmdmy.getOptionProperties("add").size()).assertEqual(0);
        });
    });
}
