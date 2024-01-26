let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
export { CliOption, CliBulider } from './src/main/ets/components/cli/Option';
export { Options } from './src/main/ets/components/cli/Options';
export { OptionGroup } from './src/main/ets/components/cli/OptionGroup';
export { CommandLine } from './src/main/ets/components/cli/CommandLine';
export { Properties } from './src/main/ets/components/cli/Properties';
export { HelpFormatter } from './src/main/ets/components/cli/HelpFormatter';
export { DefaultParser } from './src/main/ets/components/cli/DefaultParser';
export { CommandLineParser } from './src/main/ets/components/cli/CommandLineParser';
