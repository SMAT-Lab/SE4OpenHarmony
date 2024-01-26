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

export class ServiceMessage {
  message: string = ''
  id: number = 0
}

export class ClientMessage {
  username: string = ''
  message: string = ''
  id: number = 0
}

export class UserCall {
  username: string = ''
  numUsers: number = 0
}