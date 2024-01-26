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
import Sample from './Sample';
import Beacon from '../Beacon';
import DateUtils from '../utils/DateUtils';
export default class Stats {
    private static readonly INSTANCE: Stats = new Stats();
    private static readonly SIMPLE_DATE_FORMAT: string = "HH:mm:ss.fff";
    private mSamples: Array<Sample>;
    private mSampleIntervalMillis: number;
    private mEnableLogging: boolean;
    private mEnableHistoricalLogging: boolean;
    private mEnabled: boolean;
    private mSample: Sample = new Sample();
    public static getInstance(): Stats {
        return this.INSTANCE;
    }
    private constructor() {
        this.mSampleIntervalMillis = 0;
        this.clearSamples();
    }
    public getSamples(): Array<Sample> {
        this.rollSampleIfNeeded();
        return this.mSamples;
    }
    public setEnabled(enabled: boolean): void {
        this.mEnabled = enabled;
    }
    public isEnabled(): boolean {
        return this.mEnabled;
    }
    public setLoggingEnabled(enabled: boolean): void {
        this.mEnableLogging = enabled;
    }
    public setHistoricalLoggingEnabled(enabled: boolean): void {
        this.mEnableHistoricalLogging = enabled;
    }
    public setSampleIntervalMillis(interval: number): void {
        this.mSampleIntervalMillis = interval;
    }
    public log(beacon: Beacon): void {
        this.rollSampleIfNeeded();
        this.mSample.detectionCount++;
        if (this.mSample.firstDetectionTime == null) {
            this.mSample.firstDetectionTime = new Date();
        }
        if (this.mSample.lastDetectionTime != null) {
            let timeSinceLastDetection: number = new Date().getTime() - this.mSample.lastDetectionTime.getTime();
            if (timeSinceLastDetection > this.mSample.maxMillisBetweenDetections) {
                this.mSample.maxMillisBetweenDetections = timeSinceLastDetection;
            }
        }
        this.mSample.lastDetectionTime = new Date();
    }
    public clearSample(): void {
        this.mSample = null;
    }
    public newSampleInterval(): void {
        var boundaryTime: Date = new Date();
        if (this.mSample != null) {
            boundaryTime = new Date();
            if (this.mSample.sampleStartTime != null) {
                boundaryTime.setDate(this.mSample.sampleStartTime.getTime() + this.mSampleIntervalMillis);
                this.mSample.sampleStopTime = boundaryTime;
                if (!this.mEnableHistoricalLogging && this.mEnableLogging) {
                    this.logSample(this.mSample, true);
                }
            }
        }
        this.mSample = new Sample();
        this.mSample.sampleStartTime = boundaryTime;
        this.mSamples.push(this.mSample);
        if (this.mEnableHistoricalLogging) {
            this.logSamples();
        }
    }
    public clearSamples(): void {
        this.mSamples = new Array();
        this.newSampleInterval();
    }
    private logSample(sample: Sample, showHeader: boolean): void {
        if (showHeader) {
            console.debug("Stats", "sample start time, sample stop time, first detection" +
                " time, last detection time, max millis between detections, detection count");
        }
        console.debug("Stats", "%s, %s, %s, %s, %s, %s", this.formattedDate(sample.sampleStartTime), this.formattedDate(sample.sampleStopTime), this.formattedDate(sample.firstDetectionTime), this.formattedDate(sample.lastDetectionTime), sample.maxMillisBetweenDetections, sample.detectionCount);
    }
    private formattedDate(d: Date): String {
        var formattedDate: string = "";
        if (d != null) {
            formattedDate = DateUtils.dateFormat(d, Stats.SIMPLE_DATE_FORMAT);
        }
        return formattedDate;
    }
    private logSamples(): void {
        console.debug("Stats", "--- Stats for %s samples", this.mSamples.length);
        let firstPass: boolean = true;
        this.mSamples.forEach((sample) => {
            this.logSample(sample, firstPass);
            firstPass = false;
        });
    }
    private rollSampleIfNeeded(): void {
        if (this.mSample == null || (this.mSampleIntervalMillis > 0 && (new Date().getTime() - this.mSample.sampleStartTime.getTime()) >=
            this.mSampleIntervalMillis)) {
            this.newSampleInterval();
        }
    }
}
