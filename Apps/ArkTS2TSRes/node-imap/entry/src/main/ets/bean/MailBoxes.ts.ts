/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
interface Folder {
    /** mailbox attributes. An attribute of 'NOSELECT' indicates the mailbox cannot be opened */
    attribs: string[];
    /** hierarchy delimiter for accessing this mailbox's direct children. */
    delimiter: string;
    /** an object containing another structure similar in format to this top level, otherwise null if no children */
    children: MailBoxes;
    /** pointer to parent mailbox, null if at the top level */
    parent: Folder;
}
export default interface MailBoxes {
    [name: string]: Folder;
}
