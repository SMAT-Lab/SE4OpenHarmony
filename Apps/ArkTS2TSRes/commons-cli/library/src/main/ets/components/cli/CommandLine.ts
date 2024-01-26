let __generate__Id: number = 0;
function generateId(): string {
    return "CommandLine_" + ++__generate__Id;
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
import { Properties } from './Properties';
import { CliOption } from './Option';
import { JList } from './JList';
import { Util } from './Util';
export class CommandLine {
    private args: JList<string> = new JList();
    private options: JList<CliOption> = new JList();
    public static builder(): CommandLineBulider {
        return new CommandLineBulider();
    }
    public addArg(arg: string): void {
        this.args.insert(arg);
    }
    public addOption(opt: CliOption): void {
        this.options.insert(opt);
    }
    public getArgList(): JList<string> {
        return this.args;
    }
    public getArgs(): string[] {
        let answer: string[] = new Array(this.args.length());
        for (let index = 0; index < this.args.length(); index++) {
            let str = this.args.get(index);
            answer[index] = str;
        }
        return answer;
    }
    public getOptions(): CliOption[] {
        let processed = this.options;
        // reinitialize array
        let optionsArray: CliOption[] = new Array(processed.length());
        for (let index = 0; index < processed.length(); index++) {
            let opt = processed.get(index);
            optionsArray[index] = opt;
        }
        // return the array
        return optionsArray;
    }
    public hasOption(opt: string | CliOption): boolean {
        if (typeof opt == 'string') {
            let o = this.resolveOption(opt);
            return this.options.contains(o);
        }
        if (typeof opt == 'object') {
            return this.options.contains(opt);
        }
        return false;
    }
    /**
       * Retrieve the first argument, if any, of an option.
       *
       * @param opt name of the option.
       * @param defaultValue is the default value to be returned if the option is not specified.
       * @return Value of the argument if option is set, and has an argument, otherwise {@code defaultValue}.
       */
    public getOptionValue(opt: string, defaultValue?: string): string | null {
        let option = this.resolveOption(opt);
        if (option == null) {
            return null;
        }
        let values = this.getOptionValues(option);
        let answer = values == null ? null : values[0];
        if (defaultValue) {
            return answer != null ? answer : defaultValue;
        }
        else {
            return answer;
        }
    }
    /**
       * Retrieve the map of values associated to the option. This is convenient for options specifying Java properties like
       * <code>-Dparam1=value1
       * -Dparam2=value2</code>. The first argument of the option is the key, and the 2nd argument is the value. If the option
       * has only one argument ({@code -Dfoo}) it is considered as a boolean flag and the value is {@code "true"}.
       *
       * @param opt name of the option.
       * @return The Properties mapped by the option, never {@code null} even if the option doesn't exists.
       * @since 1.2
       */
    public getOptionProperties(opt: string): Properties {
        let props: Properties = new Properties();
        for (let index = 0; index < this.options.length(); index++) {
            let option: CliOption = this.options.get(index);
            if (opt == (option.getOpt()) || opt == (option.getLongOpt())) {
                let values: JList<string> = option.getValuesList();
                if (values.length() >= 2) {
                    // use the first 2 arguments as the key/value pair
                    props.setProperty(values.get(0), values.get(1));
                }
                else if (values.length() == 1) {
                    // no explicit value, handle it as a boolean
                    props.setProperty(values.get(0), "true");
                }
            }
        }
        return props;
    }
    /**
       * Retrieves the array of values, if any, of an option.
       *
       * @param option string name of the option.
       * @return Values of the argument if option is set, and has an argument, otherwise null.
       * @since 1.5.0
       */
    public getOptionValues(option: CliOption): string[] {
        let values: JList<string> = new JList();
        for (let index = 0; index < this.options.length(); index++) {
            let processedOption: CliOption = this.options.get(index);
            if (processedOption == option) {
                let list = processedOption.getValuesList();
                for (let i = 0; i < list.length(); i++) {
                    values.insert(list.get(i));
                }
            }
        }
        return values.length() == 0 ? [] : this.toStringArray(values);
    }
    private toStringArray(values: JList<string>): string[] {
        let arr: string[] = new Array(values.length());
        for (let index = 0; index < values.length(); index++) {
            arr[index] = values.get(index);
        }
        return arr;
    }
    private resolveOption(opt: string): CliOption {
        opt = Util.stripLeadingHyphens(opt);
        for (let index = 0; index < this.options.length(); index++) {
            let option = this.options.get(index);
            if (opt == option.getOpt() || opt == option.getLongOpt()) {
                return option;
            }
        }
        return new CliOption(null);
    }
}
class CommandLineBulider {
    private commandLine: CommandLine = new CommandLine();
    public addArg(arg: string): CommandLineBulider {
        this.commandLine.addArg(arg);
        return this;
    }
    public addOption(opt: CliOption): CommandLineBulider {
        this.commandLine.addOption(opt);
        return this;
    }
    public buildCommandLine(): CommandLine {
        return this.commandLine;
    }
}
