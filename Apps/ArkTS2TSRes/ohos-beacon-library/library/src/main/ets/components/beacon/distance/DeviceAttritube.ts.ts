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
class DeviceAttribute {
    private coefficient1: number;
    private coefficient2: number;
    private coefficient3: number;
    private version: string;
    private buildNumber: string;
    private manufacturer: string;
    private defaultModel: boolean;
    public constructor(coefficient1: number, coefficient2: number, coefficient3: number, version: string, buildNumber: string, manufacturer: string, defaultModel: boolean) {
        this.coefficient1 = coefficient1;
        this.coefficient2 = coefficient2;
        this.coefficient3 = coefficient3;
        this.version = version;
        this.buildNumber = buildNumber;
        this.manufacturer = manufacturer;
        this.defaultModel = defaultModel;
    }
    public setCoefficient1(coefficient1: number) {
        this.coefficient1 = coefficient1;
    }
    public getCoefficient1(): number {
        return this.coefficient1;
    }
    public setCoefficient2(coefficient2: number) {
        this.coefficient2 = coefficient2;
    }
    public getCoefficient2(): number {
        return this.coefficient2;
    }
    public setCoefficient3(coefficient3: number) {
        this.coefficient3 = coefficient3;
    }
    public getCoefficient3(): number {
        return this.coefficient3;
    }
    public setVersion(version: string) {
        this.version = version;
    }
    public getVersion(): string {
        return this.version;
    }
    public setBuildNumber(buildNumber: string) {
        this.buildNumber = buildNumber;
    }
    public getBuildNumber(): string {
        return this.buildNumber;
    }
    public setManufacturer(manufacturer: string) {
        this.manufacturer = manufacturer;
    }
    public getManufacturer(): string {
        return this.manufacturer;
    }
    public setDefaultModel(defaultModel: boolean) {
        this.defaultModel = defaultModel;
    }
    public getDefaultModel(): boolean {
        return this.defaultModel;
    }
}
export default DeviceAttribute;
