let __generate__Id: number = 0;
function generateId(): string {
    return "AbsDanmakuSync_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
export abstract class AbsDanmakuSync {
    public static SYNC_STATE_HALT: number = 1;
    public static SYNC_STATE_PLAYING: number = 2;
    /**
     * Get the uptime of timer synchronization
     *
     * @return
     */
    public abstract getUptimeMillis(): number;
    /**
     * Get the state of timer synchronization
     *
     * @return SYNC_STATE_HALT or SYNC_STATE_PLAYING
     */
    public abstract getSyncState(): number;
    /**
     * Get the threshold-time of timer synchronization
     * This value should be greater than or equal to 1000L
     *
     * @return
     */
    public getThresholdTimeMills(): number {
        return 1500;
    }
    /**
     * synchronize pause/resume state with outside playback
     * @return
     */
    public isSyncPlayingState(): boolean {
        return false;
    }
}
