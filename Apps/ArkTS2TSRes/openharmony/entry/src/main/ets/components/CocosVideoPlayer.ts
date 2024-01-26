interface CocosVideoPlayer_Params {
    videoInfo?: VideoInfo;
    workPort?: PortProxy | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CocosVideoPlayer_" + ++__generate__Id;
}
/****************************************************************************
 Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
import { PortProxy } from '../common/PortProxy';
enum EventType {
    PLAYING = 0,
    PAUSED,
    STOPPED,
    COMPLETED,
    META_LOADED,
    CLICKED,
    READY_TO_PLAY,
    UPDATE,
    QUIT_FULLSCREEN = 1000
}
interface param {
    videoTag?: number;
    videoEvent?: EventType;
    args?: number;
}
@Observed
export class VideoInfo {
    public x: number = 0;
    public y: number = 0;
    public w: number = 0;
    public h: number = 0;
    // url
    public url: string | Resource = "";
    public viewTag: number = 0;
    public visible: boolean = true;
    public duration: number = 0;
    public currentTime: number = 0;
    public isFullScreen: boolean = false;
    public currentProgressRate: number | string | PlaybackSpeed | null = null;
    public resourceType: number = 0;
    /**
     * https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/arkui-ts/ts-media-components-video.md#videocontroller
     *
     */
    public controller: VideoController = new VideoController();
    constructor(x: number, y: number, w: number, h: number, viewTag: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.viewTag = viewTag;
    }
}
export class CocosVideoPlayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoInfo = new SynchedPropertyNesedObject(params.videoInfo, this, "videoInfo");
        this.workPort = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CocosVideoPlayer_Params) {
        this.__videoInfo.set(params.videoInfo);
        if (params.workPort !== undefined) {
            this.workPort = params.workPort;
        }
    }
    aboutToBeDeleted() {
        this.__videoInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoInfo: SynchedPropertyNesedObject<VideoInfo>;
    get videoInfo() {
        return this.__videoInfo.get();
    }
    public workPort: PortProxy | null;
    render() {
        Video.create({
            src: this.videoInfo.url,
            controller: this.videoInfo.controller,
            currentProgressRate: this.videoInfo.currentProgressRate as number | string | PlaybackSpeed
        });
        Video.position({ x: this.videoInfo.x, y: this.videoInfo.y });
        Video.width(this.videoInfo.w);
        Video.height(this.videoInfo.h);
        Video.controls(false);
        Video.autoPlay(false);
        Video.onStart(() => {
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag as number,
                videoEvent: EventType.PLAYING as EventType
            } as param);
        });
        Video.onPause(() => {
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag as number,
                videoEvent: EventType.PAUSED as EventType
            } as param);
        });
        Video.onFinish(() => {
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag,
                videoEvent: EventType.COMPLETED
            } as param);
        });
        Video.onPrepared((event): void => {
            this.videoInfo.duration = event?.duration as number;
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag,
                videoEvent: EventType.READY_TO_PLAY,
                args: event?.duration
            } as param);
        });
        Video.onClick((event): void => {
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag,
                videoEvent: EventType.CLICKED
            } as param);
        });
        Video.onUpdate((event) => {
            this.videoInfo.currentTime = event?.time as number;
            this.workPort?.postMessage("onVideoEvent", {
                videoTag: this.videoInfo.viewTag,
                videoEvent: EventType.UPDATE,
                args: event?.time
            } as param);
        });
        Video.onFullscreenChange((event) => {
            if (!event?.fullscreen) {
                this.workPort?.postMessage("onVideoEvent", {
                    videoTag: this.videoInfo.viewTag,
                    videoEvent: EventType.QUIT_FULLSCREEN
                } as param);
            }
            this.videoInfo.isFullScreen = event?.fullscreen as boolean;
        });
        Video.visibility(this.videoInfo.visible ? Visibility.Visible : Visibility.None);
    }
}
