let __generate__Id: number = 0;
function generateId(): string {
    return "Tool_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
export default class Tool {
    private toolName: string;
    private toolIcon: Resource;
    constructor(toolName: string, toolIcon: Resource) {
        this.toolName = toolName;
        this.toolIcon = toolIcon;
    }
    public getToolName(): string {
        return this.toolName;
    }
    public setToolName(toolName: string) {
        this.toolName = toolName;
    }
    public getToolIcon(): Resource {
        return this.toolIcon;
    }
    public setToolIcon(toolIcon: Resource) {
        this.toolIcon = toolIcon;
    }
}
