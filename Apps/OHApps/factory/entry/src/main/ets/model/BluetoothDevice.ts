/**
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { ProfileConnectionState } from './BluetoothModel';
export class Profile {
  profileId: number = -1;
  profileConnectionState: number = -1

  constructor() {
  }
}

/**
 * Bluetooth device class
 */
export default class BluetoothDevice {
  deviceId: string = '';
  deviceName: string = '';
  deviceType: string = '';
  connectionState: number = 0;
  profiles: Map<number, Profile> = new Map();

  constructor() {
  }

  setProfiles(data: Array<{
    profileId: number;
    profileConnectionState: number;
  }>): void{

    data.forEach((item: {
      profileId: number;
      profileConnectionState: number;
    }) => {
      this.setProfile({
        profileId: item.profileId,
        deviceId: this.deviceId,
        profileConnectionState: item.profileConnectionState
      })
    })
  }

  setProfile(data: {
    profileId: number;
    deviceId: string;
    profileConnectionState: number;
  }): void{
    if (this.deviceId !== data.deviceId) {
      return;
    }

    this.profiles.set(data.profileId, data)

    let countStateDisconnect = 0;
    let countStateConnecting = 0;
    let countStateConnected = 0;
    let countStateDisconnecting = 0;

    this.profiles.forEach((profile, key) => {
      if (profile.profileConnectionState == ProfileConnectionState.STATE_DISCONNECTED) {
        countStateDisconnect++;
      } else if (profile.profileConnectionState == ProfileConnectionState.STATE_CONNECTING) {
        countStateConnecting++;
      } else if (profile.profileConnectionState == ProfileConnectionState.STATE_CONNECTED) {
        countStateConnected++;
      } else if (profile.profileConnectionState == ProfileConnectionState.STATE_DISCONNECTING) {
        countStateDisconnecting++;
      }
    });

    if (countStateConnected > 0 || countStateDisconnecting > 0) {
      this.connectionState = ProfileConnectionState.STATE_CONNECTED;
    } else if (countStateConnecting > 0) {
      this.connectionState = ProfileConnectionState.STATE_CONNECTING;
    } else {
      this.connectionState = ProfileConnectionState.STATE_DISCONNECTED;
    }
  }
}
