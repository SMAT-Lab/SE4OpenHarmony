/*
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
export const AvPlayerCreate: () => number;
export const AvPlayerSetURLSourceAbnormalOne: () => number;
export const AvPlayerSetURLSourceAbnormalTwo: () => number;
export const AvPlayerSetFDSource: () => number;
export const AvPlayerSetFDSourceAbnormalOne: () => number;
export const AvPlayerSetFDSourceAbnormalTwo: () => number;
export const AvPlayerSetFDSourceAbnormalThree: () => number;
export const AvPlayerPrepare: (a:number,b:number,c:number) => number;
export const AvPlayerPlay: (a:number,b:number,c:number, d:number) => number;
export const AvPlayerPause: (a:number,b:number,c:number, d:number, e:number) => number;
export const AvPlayerStop: (a:number,b:number,c:number, d:number) => number;
export const AvPlayerReset: (a:number,b:number,c:number, d:number, e:number, f:number, g:number) => number;
export const AvPlayerRelease: () => number;
export const AvPlayerReleaseAbnormalOne: () => number;
export const AvPlayerReleaseSync: () => number;
export const AvPlayerReleaseSyncAbnormalOne: () => number;
export const AvPlayerSetVolume: () => number;
export const AvPlayerSetVolumeAbnormalOne: () => number;
export const AvPlayerSeek: () => number;
export const AvPlayerSeekAbnormalOne: () => number;
export const AvPlayerGetCurrentTime: () => number;
export const AvPlayerGetCurrentTimeAbnormalOne: () => number;
export const AvPlayerGetVideoWidth: () => number;
export const AvPlayerGetVideoWidthAbnormalOne: () => number;
export const AvPlayerGetVideoHeight: () => number;
export const AvPlayerGetVideoHeightAbnormalOne: () => number;
export const AvPlayerSetPlaybackSpeed: () => number;
export const AvPlayerSetPlaybackSpeedAbnormalOne: () => number;
export const AvPlayerGetPlaybackSpeed: () => number;
export const AvPlayerGetPlaybackSpeedAbnormalOne: () => number;
export const AvPlayerSelectBitRate: () => number;
export const AvPlayerSelectBitRateAbnormalOne: () => number;
export const AvPlayerSetVideoSurface: () => number;
export const AvPlayerSetVideoSurfaceAbnormalOne: () => number;
export const AvPlayerSetVideoSurfaceAbnormalTwo: () => number;
export const AvPlayerSetVideoSurfaceAbnormalThree: () => number;
export const AvPlayerGetDuration: () => number;
export const AvPlayerGetDurationAbnormalOne: () => number;
export const AvPlayerGetState: (a:number,b:number,c:number, d:number, e:number) => number;
export const AvPlayerIsPlaying: () => number;
export const AvPlayerIsPlayingAbnormalOne: () => number;
export const AvPlayerIsLooping: () => number;
export const AvPlayerIsLoopingAbnormalOne: () => number;
export const AvPlayerSetLooping: () => number;
export const AvPlayerSetLoopingAbnormalOne: () => number;
export const AvPlayerSetPlayerCallback: () => number;
export const AvPlayerSetPlayerCallbackAbnormalOne: () => number;
export const AvPlayerSetPlayerCallbackAbnormalTwo: () => number;
export const AvPlayerSetPlayerCallbackAbnormalThree: () => number;
export const AvPlayerSelectTrack: () => number;
export const AvPlayerSelectTrackAbnormalOne: () => number;
export const AvPlayerDeselectTrack: () => number;
export const AvPlayerDeselectTrackAbnormalOne: () => number;
export const AvPlayerGetCurrentTrack: () => number;
export const AvPlayerGetCurrentTrackAbnormalOne: () => number;
export const dummy: (a:number,b:number) => number;
export const dummyForSize: (a:number,b:number) => number;

