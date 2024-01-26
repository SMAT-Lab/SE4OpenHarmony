let __generate__Id: number = 0;
function generateId(): string {
    return "User_" + ++__generate__Id;
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
export default class User {
    private username: string;
    private userIcon: Resource;
    constructor(username: string, userIcon: Resource) {
        this.username = username;
        this.userIcon = userIcon;
    }
    public getUsername(): string {
        return this.username;
    }
    public setUsername(username: string) {
        this.username = username;
    }
    public getUserIcon(): Resource {
        return this.userIcon;
    }
    public setUserIcon(userIcon: Resource) {
        this.userIcon = userIcon;
    }
}
