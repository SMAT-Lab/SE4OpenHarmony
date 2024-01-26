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
class BeaconLocalBroadcastProcessor {
    private static mInstance: BeaconLocalBroadcastProcessor = null;
    public static readonly RANGE_NOTIFICATION: string = "org.altbeacon.beacon.range_notification";
    public static readonly MONITOR_NOTIFICATION: string = "org.altbeacon.beacon.monitor_notification";
    public static getInstance(): BeaconLocalBroadcastProcessor {
        if (this.mInstance == null) {
            this.mInstance = new BeaconLocalBroadcastProcessor();
        }
        return this.mInstance;
    }
    private constructor() {
    }
    registerCallCount: number = 0;
    public register(): void {
        this.registerCallCount += 1;
        this.unregister();
    }
    public unregister(): void {
        this.registerCallCount -= 1;
    }
}
export default BeaconLocalBroadcastProcessor;
