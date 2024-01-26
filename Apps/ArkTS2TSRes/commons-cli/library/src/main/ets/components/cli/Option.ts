let __generate__Id: number = 0;
function generateId(): string {
    return "Option_" + ++__generate__Id;
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
import { OptionValidator } from './OptionValidator';
export class CliOption {
    private option: string = '';
    private longOption: string = '';
    private argName: string = '';
    private description: string = '';
    private required: boolean = false;
    private optionalArg: boolean = false;
    private argCount: number = CliOption.UNINITIALIZED;
    private type: string = 'string';
    private values: JList<string> = new JList();
    private valuesep: string = '';
    public static UNINITIALIZED: number = -1;
    public static UNLIMITED_VALUES: number = -2;
    public constructor(builder: CliBulider | null) {
        if (builder) {
            this.argName = builder.argName;
            this.description = builder.description;
            this.longOption = builder.longOption;
            this.argCount = builder.argCount;
            this.option = builder.option;
            this.optionalArg = builder.optionalArgFlag;
            this.required = builder.requiredFlag;
            this.type = builder.type;
            this.valuesep = builder.valueSepara;
        }
    }
    public static createOption(option: string, hasArg: boolean, description?: string, longOption?: string | null): CliOption {
        // ensure that the option is valid
        let opt = new CliOption(null);
        opt.option = OptionValidator.validate(option);
        if (longOption) {
            opt.longOption = longOption;
        }
        // if hasArg is set then the number of arguments is 1
        if (hasArg) {
            opt.argCount = 1;
        }
        opt.description = description ? description : '';
        return opt;
    }
    public static builder(option: string): CliBulider {
        return new CliBulider(option);
    }
    acceptsArg(): boolean {
        return (this.buildHasArg() || this.buildHasArgs() || this.hasOptionalArg()) && (this.argCount <= 0 || this.values.length() < this.argCount);
    }
    private add(value: string): void {
        this.values.insert(value);
    }
    addValueForProcessing(value: string): void {
        if (this.argCount == CliOption.UNINITIALIZED) {
            throw new Error("NO_ARGS_ALLOWED");
        }
        this.processValue(value);
    }
    public getArgName(): string {
        return this.argName;
    }
    public getArgs(): number {
        return this.argCount;
    }
    public getDescription(): string {
        return this.description;
    }
    public getId(): string {
        return this.getKey().charAt(0);
    }
    getKey(): string {
        // if 'opt' is null, then it is a 'long' option
        return this.option == null ? this.longOption : this.option;
    }
    public getLongOpt(): string {
        return this.longOption;
    }
    public getOpt(): string {
        return this.option;
    }
    public getValue(index: number): string {
        return this.hasNoValues() ? '' : this.values.get(index);
    }
    public getValueSeparator(): string {
        return this.valuesep;
    }
    public getValuesList(): JList<string> {
        return this.values;
    }
    public buildHasArg(): boolean {
        return this.argCount > 0 || this.argCount == CliOption.UNLIMITED_VALUES;
    }
    public hasArgName(): boolean {
        return this.argName != null && !(this.argName.length == 0);
    }
    public buildHasArgs(): boolean {
        return this.argCount > 1 || this.argCount == CliOption.UNLIMITED_VALUES;
    }
    public hasLongOpt(): boolean {
        return this.longOption != null;
    }
    private hasNoValues(): boolean {
        return (this.values.length() == 0);
    }
    public hasOptionalArg(): boolean {
        return this.optionalArg;
    }
    public hasValueSeparator(): boolean {
        if (this.valuesep) {
            return this.valuesep.charCodeAt(0) > 0;
        }
        else {
            return this.valuesep.length > 0;
        }
    }
    public isRequired(): boolean {
        return this.required;
    }
    private processValue(value: string): void {
        // this Option has a separator character
        if (this.hasValueSeparator()) {
            // get the separator character
            let sep = this.getValueSeparator();
            // store the index for the value separator
            let index = value.indexOf(sep);
            // while there are more value separators
            while (index != -1) {
                // next value to be added
                if (this.values.length() == this.argCount - 1) {
                    break;
                }
                // store
                this.add(value.substring(0, index));
                // parse
                value = value.substring(index + 1);
                // get new index
                index = value.indexOf(sep);
            }
        }
        // store the actual value or the last value that has been parsed
        this.add(value);
    }
    requiresArg(): boolean {
        if (this.optionalArg) {
            return false;
        }
        if (this.argCount == CliOption.UNLIMITED_VALUES) {
            return this.values.length() == 0;
        }
        return this.acceptsArg();
    }
    public setArgName(argName: string): void {
        this.argName = argName;
    }
    public setArgs(num: number): void {
        this.argCount = num;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public buildLongOpt(longOpt: string): void {
        this.longOption = longOpt;
    }
    public setOptionalArg(optionalArg: boolean): void {
        this.optionalArg = optionalArg;
    }
    public setRequired(required: boolean): void {
        this.required = required;
    }
    public setValueSeparator(sep: string): void {
        this.valuesep = sep;
    }
    /**
       * Gets the values of this Option as a String array or null if there are no values
       *
       * @return the values of this Option as a String array or null if there are no values
       */
    public getValues(): string[] {
        if (this.hasNoValues()) {
            return [];
        }
        else {
            let arr: string[] = new Array(this.values.length());
            for (let index: number = 0; index < this.values.length(); index++) {
                arr[index] = this.values.get(index);
            }
            return arr;
        }
    }
}
export class CliBulider {
    public option: string = '';
    public description: string = '';
    public longOption: string = '';
    public argName: string = '';
    public type: string = 'string';
    public requiredFlag: boolean = false;
    public optionalArgFlag: boolean = false;
    public argCount: number = CliOption.UNINITIALIZED;
    public valueSepara: string = '';
    constructor(option: string) {
        this.optionFun(option);
    }
    public buildOption(): CliOption {
        if (this.option == null && this.longOption == null) {
            throw new Error("Either opt or longOpt must be specified");
        }
        return new CliOption(this);
    }
    public argNames(argName?: string): CliBulider {
        this.argName = argName ? argName : '';
        return this;
    }
    public desc(description: string): CliBulider {
        this.description = description;
        return this;
    }
    // 空参时，默认参数为true
    public buildHasArg(hasArg?: boolean): CliBulider {
        this.argCount = hasArg ? 1 : CliOption.UNINITIALIZED;
        return this;
    }
    public buildHasArgs(): CliBulider {
        this.argCount = CliOption.UNLIMITED_VALUES;
        return this;
    }
    public buildLongOpt(longOpt?: string): CliBulider {
        this.longOption = longOpt ? longOpt : '';
        return this;
    }
    public numberOfArgs(numberOfArgs: number): CliBulider {
        this.argCount = numberOfArgs;
        return this;
    }
    public optionFun(option: string): CliBulider {
        this.option = OptionValidator.validate(option);
        return this;
    }
    public optionalArg(isOptional: boolean): CliBulider {
        this.optionalArgFlag = isOptional;
        return this;
    }
    // 空参时，默认参数为true
    public required(required: boolean): CliBulider {
        this.requiredFlag = required;
        return this;
    }
    // 空参时，默认传入"="
    public valueSeparator(sep: string): CliBulider {
        this.valueSepara = sep;
        return this;
    }
}
