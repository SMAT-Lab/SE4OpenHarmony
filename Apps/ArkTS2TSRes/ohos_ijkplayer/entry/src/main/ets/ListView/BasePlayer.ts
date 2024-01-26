let __generate__Id: number = 0;
function generateId(): string {
    return "BasePlayer_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { PlayerInterface } from './playerInterface';
import { PlayerListener } from './PlayerListener';
import { VideoSource } from './VideoSource';
export abstract class BasePlayer implements PlayerInterface {
    protected videoSource: VideoSource | null = null;
    protected playListener: PlayerListener | null = null;
    protected context: Context | null = null;
    protected needInit: boolean = false;
    init(): void {
    }
    setVideoSource(video: VideoSource): PlayerInterface {
        if (video != this.videoSource) {
            this.needInit = true;
        }
        this.videoSource = video;
        return this;
    }
    setContext(context: Context): PlayerInterface {
        if (context != this.context) {
            this.needInit = true;
        }
        this.context = context;
        return this;
    }
    play(): void {
    }
    pause(): void {
    }
    stop(): void {
    }
    seekTo(position: number): void {
    }
    release(): void {
    }
    setListener(listener: PlayerListener): PlayerInterface {
        this.playListener = listener;
        return this;
    }
    getDuration(): number {
        return 0;
    }
    getCurrentPosition(): number {
        return 0;
    }
    isPlaying(): boolean {
        return false;
    }
}
