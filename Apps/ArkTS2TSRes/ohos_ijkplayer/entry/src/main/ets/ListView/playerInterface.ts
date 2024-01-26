let __generate__Id: number = 0;
function generateId(): string {
    return "playerInterface_" + ++__generate__Id;
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
import { PlayerListener } from './PlayerListener';
import { VideoSource } from './VideoSource';
export interface PlayerInterface {
    init(): void;
    setVideoSource(video: VideoSource): PlayerInterface;
    setContext(context: object): PlayerInterface;
    play(): void;
    pause(): void;
    stop(): void;
    seekTo(position: number): void;
    release(): void;
    setListener(listener: PlayerListener): PlayerInterface;
    getDuration(): number;
    getCurrentPosition(): number;
    isPlaying(): boolean;
}
