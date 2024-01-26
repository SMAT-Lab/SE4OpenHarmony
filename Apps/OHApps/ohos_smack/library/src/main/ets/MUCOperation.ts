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

export enum MUCOperation {
    RequestVoiceList = "0", /**< Request the room's Voice List. */
    RequestBanList = "1", /**< Request the room's Ban List. */
    RequestMemberList = "2", /**< Request the room's Member List. */
    RequestModeratorList = "3", /**< Request the room's Moderator List. */
    RequestOwnerList = "4", /**< Request the room's Owner List. */
    RequestAdminList = "5", /**< Request the room's Admin List. */
}
