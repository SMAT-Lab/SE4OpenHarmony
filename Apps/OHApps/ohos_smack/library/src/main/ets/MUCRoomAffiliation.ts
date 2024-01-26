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
 * 从属关系（岗位）
 */
export enum MUCRoomAffiliation {
    AffiliationNone = "0", /**< No affiliation with the room. */
    AffiliationOutcast = "1", /**< The user has been banned from the room. */
    AffiliationMember = "2", /**< The user is a member of the room. */
    AffiliationOwner = "3", /**< The user is a room owner. */
    AffiliationAdmin = "4", /**< The user is a room admin. */
    AffiliationInvalid = "5" /**< Invalid affiliation. */
}
;
