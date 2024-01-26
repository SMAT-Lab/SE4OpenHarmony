let __generate__Id: number = 0;
function generateId(): string {
    return "IjkPlayer_" + ++__generate__Id;
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
import { OnBufferingUpdateListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnBufferingUpdateListener';
import { OnCompletionListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnCompletionListener';
import { OnErrorListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnErrorListener';
import { OnInfoListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnInfoListener';
import { OnPreparedListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnPreparedListener';
import { OnSeekCompleteListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnSeekCompleteListener';
import { OnVideoSizeChangedListener } from '@ohos/ijkplayer/src/main/ets/ijkplayer/callback/OnVideoSizeChangedListener';
import { IjkMediaPlayer } from '@ohos/ijkplayer/src/main/ets/ijkplayer/IjkMediaPlayer';
import { LogUtils } from '@ohos/ijkplayer/src/main/ets/ijkplayer/utils/LogUtils';
import { BasePlayer } from './BasePlayer';
import { PlayerInterface } from './playerInterface';
import { VideoSource } from './VideoSource';
export class IjkPlayer extends BasePlayer {
    private mIjkMediaPlayer: IjkMediaPlayer;
    private hasContext: boolean = false;
    constructor() {
        super();
        this.mIjkMediaPlayer = IjkMediaPlayer.getInstance();
    }
    init(): void {
        if ((this.mIjkMediaPlayer == null && this.context != null) || this.needInit) {
            this.needInit = false;
            let ijkMediaPlayer = this.mIjkMediaPlayer;
            //暂停上一个
            if (this.hasContext) {
                ijkMediaPlayer.stop();
                ijkMediaPlayer.reset();
            }
            ijkMediaPlayer.setContext(this.context!);
            this.hasContext = true;
            ijkMediaPlayer.setDebug(true);
            ijkMediaPlayer.native_setup();
            if (this.videoSource != null) {
                ijkMediaPlayer.setDataSource(this.videoSource.videoUrl);
            }
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "enable-accurate-seek", "1");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "max-buffer-size", "102400");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "min-frames", "100");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "start-on-prepared", "1");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "packet-buffering", "0");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "framedrop", "5");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "max_cached_duration", "3000");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "infbuf", "1");
            //屏幕常亮
            ijkMediaPlayer.setScreenOnWhilePlaying(true);
            //设置超时
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "timeout", "10000000");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "connect_timeout", "10000000");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "listen_timeout", "10000000");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "addrinfo_timeout", "10000000");
            ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "dns_cache_timeout", "10000000");
            let listener = this.playListener;
            let mOnVideoSizeChangedListener: OnVideoSizeChangedListener = {
                onVideoSizeChanged(width: number, height: number, sar_sum: number, sar_den: number) {
                    LogUtils.getInstance()
                        .LOGI("setOnVideoSizeChangedListener-->go:" + width + "," + height + "," + sar_sum + "," + sar_den);
                }
            };
            ijkMediaPlayer.setOnVideoSizeChangedListener(mOnVideoSizeChangedListener);
            let mOnPreparedListener: OnPreparedListener = {
                onPrepared() {
                }
            };
            ijkMediaPlayer.setOnPreparedListener(mOnPreparedListener);
            let mOnCompletionListener: OnCompletionListener = {
                onCompletion() {
                    if (listener != null) {
                        listener.onComplete();
                    }
                }
            };
            ijkMediaPlayer.setOnCompletionListener(mOnCompletionListener);
            let onBufferingUpdateListener: OnBufferingUpdateListener = {
                onBufferingUpdate(percent: number) {
                }
            };
            ijkMediaPlayer.setOnBufferingUpdateListener(onBufferingUpdateListener);
            let onSeekCompleteListener: OnSeekCompleteListener = {
                onSeekComplete() {
                }
            };
            ijkMediaPlayer.setOnSeekCompleteListener(onSeekCompleteListener);
            let onInfoListener: OnInfoListener = {
                onInfo(what: number, extra: number) {
                }
            };
            ijkMediaPlayer.setOnInfoListener(onInfoListener);
            let onErrorListener: OnErrorListener = {
                onError(what: number, extra: number) {
                    if (listener != null) {
                        listener.onError();
                    }
                }
            };
            ijkMediaPlayer.setOnErrorListener(onErrorListener);
            ijkMediaPlayer.setMessageListener();
            ijkMediaPlayer.prepareAsync();
            this.mIjkMediaPlayer = ijkMediaPlayer;
        }
    }
    setVideoSource(video: VideoSource): PlayerInterface {
        super.setVideoSource(video);
        if (this.mIjkMediaPlayer != null) {
        }
        return this;
    }
    setContext(context: Context): PlayerInterface {
        return super.setContext(context);
    }
    play(): void {
        this.init();
        if (this.mIjkMediaPlayer != null) {
            this.mIjkMediaPlayer.start();
        }
    }
    pause(): void {
        if (this.mIjkMediaPlayer != null) {
            this.mIjkMediaPlayer.pause();
        }
    }
    stop(): void {
        if (this.mIjkMediaPlayer != null) {
            this.mIjkMediaPlayer.stop();
        }
    }
    seekTo(position: number): void {
        if (this.mIjkMediaPlayer != null) {
            this.mIjkMediaPlayer.seekTo(position.toString());
        }
    }
    release(): void {
        if (this.mIjkMediaPlayer != null) {
            this.mIjkMediaPlayer.release();
        }
    }
    getDuration(): number {
        if (this.mIjkMediaPlayer != null) {
            return this.mIjkMediaPlayer.getDuration();
        }
        return super.getDuration();
    }
    getCurrentPosition(): number {
        if (this.mIjkMediaPlayer != null) {
            return this.mIjkMediaPlayer.getCurrentPosition();
        }
        return super.getCurrentPosition();
    }
    isPlaying(): boolean {
        if (this.mIjkMediaPlayer != null) {
            return this.mIjkMediaPlayer.isPlaying();
        }
        return super.isPlaying();
    }
}
