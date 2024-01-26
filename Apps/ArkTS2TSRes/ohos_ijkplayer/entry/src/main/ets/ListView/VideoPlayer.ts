let __generate__Id: number = 0;
function generateId(): string {
    return "VideoPlayer_" + ++__generate__Id;
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
import { IjkPlayer } from './IjkPlayer';
import { PlayerInterface } from './playerInterface';
import { PlayerListener } from './PlayerListener';
import { VideoSource } from './VideoSource';
export class VideoPlayer implements PlayerInterface {
    private static instance: VideoPlayer;
    private player: PlayerInterface;
    private constructor() {
        this.player = new IjkPlayer();
    }
    public static getInstance() {
        if (!VideoPlayer.instance) {
            VideoPlayer.instance = new VideoPlayer();
        }
        return VideoPlayer.instance;
    }
    init(): void {
    }
    setVideoSource(video: VideoSource): PlayerInterface {
        return this.player.setVideoSource(video);
    }
    setContext(context: object): PlayerInterface {
        return this.player.setContext(context);
    }
    play(): void {
        this.player.play();
    }
    pause(): void {
        this.player.pause();
    }
    stop(): void {
        this.player.stop();
    }
    seekTo(position: number): void {
        this.player.seekTo(position);
    }
    release(): void {
        this.player.release();
    }
    setListener(listener: PlayerListener): PlayerInterface {
        return this.player.setListener(listener);
    }
    getDuration(): number {
        return this.player.getDuration();
    }
    getCurrentPosition(): number {
        return this.player.getCurrentPosition();
    }
    isPlaying(): boolean {
        return this.player.isPlaying();
    }
}
