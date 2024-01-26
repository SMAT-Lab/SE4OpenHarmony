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
export default interface Box {
    /** The name of this mailbox. */
    name: string;
    /** True if this mailbox was opened in read-only mode. (Only available with openBox() calls) */
    readOnly?: boolean | undefined;
    /** True if new keywords can be added to messages in this mailbox. */
    newKeywords: boolean;
    /** A 32-bit number that can be used to determine if UIDs in this mailbox have changed since the last time this mailbox was opened. */
    uidvalidity: number;
    /** The uid that will be assigned to the next message that arrives at this mailbox. */
    uidnext: number;
    /** array - A list of system-defined flags applicable for this mailbox. Flags in this list but not in permFlags may be stored for the current session only. Additional server implementation-specific flags may also be available. */
    flags: string[];
    /** A list of flags that can be permanently added/removed to/from messages in this mailbox. */
    permFlags: string[];
    /** Whether or not this mailbox has persistent UIDs. This should almost always be true for modern mailboxes and should only be false for legacy mail stores where supporting persistent UIDs was not technically feasible. */
    persistentUIDs: boolean;
    /** Contains various message counts for this mailbox: */
    messages: {
        /** Total number of messages in this mailbox. */
        total: number;
        /** Number of messages in this mailbox having the Recent flag (this IMAP session is the first to see these messages). */
        new: number;
        /** (Only available with status() calls) Number of messages in this mailbox not having the Seen flag (marked as not having been read). */
        unseen: number;
    };
    /** (Available with openBox() and status()) The highest modification sequence value of all messages in the mailbox. */
    highestmodseq: string;
}
