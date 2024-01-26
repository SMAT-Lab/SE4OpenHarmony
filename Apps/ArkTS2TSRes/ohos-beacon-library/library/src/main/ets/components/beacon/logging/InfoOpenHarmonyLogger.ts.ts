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
import AbstractHarmonyLogger from './AbstractOpenHarmonyLogger';
class InfoHarmonyLogger extends AbstractHarmonyLogger {
    public v(message: string, ...args: any[]): void {
    }
    public d(message: string, ...args: any[]): void {
    }
    public i(message: string, ...args: any[]): void {
        for (let i = 0; i < args[0].length; i++) {
            message = message.replace("{" + i + "}", args[0][i]);
        }
        console.info(message);
    }
    public w(message: string, ...args: any[]): void {
        for (let i = 0; i < args[0].length; i++) {
            message = message.replace("{" + i + "}", args[0][i]);
        }
        console.warn(message);
    }
    public e(message: string, ...args: any[]): void {
        for (let i = 0; i < args[0].length; i++) {
            message = message.replace("{" + i + "}", args[0][i]);
        }
        console.error(message);
    }
}
export default InfoHarmonyLogger;
