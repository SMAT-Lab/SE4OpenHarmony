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

/**
 * 角色
 */
export enum MUCRoomRole
{
    RoleNone = "0",                      /**< Not present in room. */
    RoleVisitor = "1",                    /**< The user visits a room. */
    RoleParticipant = "2",                /**< The user has voice in a moderatd room. */
    RoleModerator = "3",                  /**< The user is a room moderator. */
    RoleInvalid  = "4"                    /**< Invalid role. */
};
