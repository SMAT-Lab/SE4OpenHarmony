/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

export enum PresenceRoomType {
    Available = "0", /**< The entity is online. */
    Chat = "1", /**< The entity is 'available for chat'. */
    Away = "2", /**< The entity is away. */
    DND = "3", /**< The entity is DND (Do Not Disturb). */
    XA = "4", /**< The entity is XA (eXtended Away). */
    Unavailable = "5", /**< The entity is offline. */
    Probe = "6", /**< This is a presence probe. */
    Error = "7", /**< This is a presence error. */
    Invalid = "8" /**< The stanza is invalid. */
}