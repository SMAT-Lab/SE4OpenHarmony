/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { Util } from './Util';
export class SpeedCalculator {
    private timestamp: number = 0;
    private increaseBytes: number = 0;
    private bytesPerSecond: number = 0;
    private beginTimestamp: number = 0;
    private endTimestamp: number = 0;
    private allIncreaseBytes: number = 0;
    public reset(): void {
        this.timestamp = 0;
        this.increaseBytes = 0;
        this.bytesPerSecond = 0;
        this.beginTimestamp = 0;
        this.endTimestamp = 0;
        this.allIncreaseBytes = 0;
    }
    // convenience for unit test
    nowMillis(): number {
        return new Date().getTime();
    }
    public downloading(increaseBytes: number): void {
        if (this.timestamp == 0) {
            this.timestamp = this.nowMillis();
            this.beginTimestamp = this.timestamp;
        }
        this.increaseBytes += increaseBytes;
        this.allIncreaseBytes += increaseBytes;
    }
    public flush(): void {
        const nowMillis: number = this.nowMillis();
        const sinceNowIncreaseBytes: number = this.increaseBytes;
        const durationMillis: number = Math.max(1, nowMillis - this.timestamp);
        this.increaseBytes = 0;
        this.timestamp = nowMillis;
        // precision loss
        this.bytesPerSecond = Math.floor(sinceNowIncreaseBytes / durationMillis * 1000);
    }
    /**
     * Get instant bytes per-second.
     */
    public getInstantBytesPerSecondAndFlush(): number {
        this.flush();
        return this.bytesPerSecond;
    }
    /**
     * Get bytes per-second and only if duration is greater than or equal to 1 second will flush and
     * re-calculate speed.
     */
    public getBytesPerSecondAndFlush(): number {
        const interval: number = this.nowMillis() - this.timestamp;
        if (interval < 1000 && this.bytesPerSecond != 0)
            return this.bytesPerSecond;
        // the first time we using 500 milliseconds to let speed valid more quick
        if (this.bytesPerSecond == 0 && interval < 500)
            return 0;
        return this.getInstantBytesPerSecondAndFlush();
    }
    public getBytesPerSecondFromBegin(): number {
        const endTimestamp: number = this.endTimestamp == 0 ? this.nowMillis() : this.endTimestamp;
        const sinceNowIncreaseBytes: number = this.allIncreaseBytes;
        const durationMillis: number = Math.max(1, endTimestamp - this.beginTimestamp);
        // precision loss
        return Math.floor(sinceNowIncreaseBytes / durationMillis * 1000);
    }
    public endTask(): void {
        this.endTimestamp = this.nowMillis();
    }
    /**
     * Get instant speed
     */
    public instantSpeed(): string {
        return this.getSpeedWithSIAndFlush();
    }
    /**
     * Get speed with at least one second duration.
     */
    public speed(): string {
        return this.humanReadableSpeed(this.getBytesPerSecondAndFlush(), true);
    }
    /**
     * Get last time calculated speed.
     */
    public lastSpeed(): string {
        return this.humanReadableSpeed(this.bytesPerSecond, true);
    }
    public getInstantSpeedDurationMillis(): number {
        return this.nowMillis() - this.timestamp;
    }
    /**
     * With wikipedia: https://en.wikipedia.org/wiki/Kibibyte
     * <p>
     * 1KiB = 2^10B = 1024B
     * 1MiB = 2^10KB = 1024KB
     */
    public getSpeedWithBinaryAndFlush(): string {
        return this.humanReadableSpeed(this.getInstantBytesPerSecondAndFlush(), false);
    }
    /**
     * With wikipedia: https://en.wikipedia.org/wiki/Kilobyte
     * <p>
     * 1KB = 1000B
     * 1MB = 1000KB
     */
    public getSpeedWithSIAndFlush(): string {
        return this.humanReadableSpeed(this.getInstantBytesPerSecondAndFlush(), true);
    }
    public averageSpeed(): string {
        return this.speedFromBegin();
    }
    public speedFromBegin(): string {
        return this.humanReadableSpeed(this.getBytesPerSecondFromBegin(), true);
    }
    private humanReadableSpeed(bytes: number, si: boolean): string {
        return Util.humanReadableBytes(bytes, si) + "/s";
    }
}
