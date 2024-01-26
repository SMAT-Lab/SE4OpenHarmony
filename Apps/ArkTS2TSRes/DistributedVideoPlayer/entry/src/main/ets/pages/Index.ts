interface Index_Params {
    tabsIndex?: number;
    videoIndex?: number;
    title?: string;
    SpeedIndex?: number;
    isPlay?: boolean;
    controls?: number;
    showSideBar?: boolean;
    showPlaybackProgress?: boolean;
    currentTime?: number;
    duration?: number;
    kvStoreModel?: KvStoreModel;
    ratio?: number;
    isLand?: boolean;
    isLoading?: boolean;
    continuationMode?: string;
    controlBarTimeoutID?: number;
    tabsController?: TabsController;
    remoteDeviceModel?: RemoteDeviceModel;
    mediaDataSource?: MediaDataSource;
    mediaUtil?: MediaUtils;
    mediaList?: Array<mediaLibrary.FileAsset>;
    mXComponentController?: XComponentController;
    surfaceId?: string;
    avPlayer?: AVPlayerUtils;
    fileAsset?: mediaLibrary.FileAsset;
    fd?: number;
    listener?;
    onLand?;
    startX?: number;
    startY?: number;
    moveX?: number;
    moveY?: number;
    startAbilityCallBack?;
}
interface localVideoItem_Params {
    media?: mediaLibrary.FileAsset;
    pixelMap?: PixelMap;
    videoIndex?: number;
    index?: number;
    event?: (event?: ClickEvent) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import mediaQuery from '@ohos.mediaquery';
import preferences from '@ohos.data.preferences';
import MediaDataSource from '../common/BasicDataSource';
import { TitleBar } from '../common/TitleBar';
import { toTime } from '../utils/utils';
import { RemoteDeviceModel } from '../model/RemoteDeviceModel';
import { KvStoreModel } from '../model/KvStoreModel';
import Logger from '../model/Logger';
import MediaUtils from '../utils/MediaUtils';
import AVPlayerUtils from '../utils/AVPlayerUtils';
import DistributedDataModel from '../model/DistributedDataModel';
const TAG: string = "Index";
const EXIT: string = 'exit';
const DATA_CHANGE: string = 'dataChange';
const PlaybackSpeed: string[] = ['0.75X', '1.0X', '1.25X', '1.75X', '2.0X'];
const PREFERENCES_NAME = 'setting';
let preferenceSetting: preferences.Preferences = null;
class localVideoItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.media = undefined;
        this.__pixelMap = new ObservedPropertyObject(undefined, this, "pixelMap");
        this.__videoIndex = new SynchedPropertySimpleTwoWay(params.videoIndex, this, "videoIndex");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.event = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: localVideoItem_Params) {
        if (params.media !== undefined) {
            this.media = params.media;
        }
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.event !== undefined) {
            this.event = params.event;
        }
    }
    aboutToBeDeleted() {
        this.__pixelMap.aboutToBeDeleted();
        this.__videoIndex.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private media: mediaLibrary.FileAsset;
    private __pixelMap: ObservedPropertyObject<PixelMap>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: PixelMap) {
        this.__pixelMap.set(newValue);
    }
    private __videoIndex: SynchedPropertySimpleTwoWay<number>;
    get videoIndex() {
        return this.__videoIndex.get();
    }
    set videoIndex(newValue: number) {
        this.__videoIndex.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private event: (event?: ClickEvent) => void;
    async aboutToAppear() {
        let size = { width: 128, height: 80 };
        this.pixelMap = await this.media.getThumbnail(size);
    }
    render() {
        Row.create({ space: 10 });
        Row.width(330);
        Row.height(100);
        Row.padding(10);
        Row.borderRadius(20);
        Row.backgroundColor('#464646');
        Row.alignItems(VerticalAlign.Center);
        Row.onClick(this.event);
        Image.create(this.pixelMap);
        Image.height(80);
        Image.aspectRatio(1.6);
        Image.objectFit(ImageFit.Cover);
        Image.borderRadius(10);
        Text.create(this.media.displayName.replace('.mp4', ''));
        Text.width(172);
        Text.fontSize(14);
        Text.fontColor(this.videoIndex === this.index ? '#E5007DFF' : '#FFFFFF');
        Text.pop();
        Row.pop();
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tabsIndex = new ObservedPropertySimple(0, this, "tabsIndex");
        this.__videoIndex = new ObservedPropertySimple(0, this, "videoIndex");
        this.__title = new ObservedPropertySimple('', this, "title");
        this.__SpeedIndex = new ObservedPropertySimple(1, this, "SpeedIndex");
        this.__isPlay = new ObservedPropertySimple(false
        // 是否显示控制栏
        , this, "isPlay");
        this.__controls = new ObservedPropertySimple(Visibility.Visible, this, "controls");
        this.__showSideBar = new ObservedPropertySimple(false, this, "showSideBar");
        this.__showPlaybackProgress = new ObservedPropertySimple(false, this, "showPlaybackProgress");
        this.__currentTime = new ObservedPropertySimple(0, this, "currentTime");
        this.__duration = new ObservedPropertySimple(0, this, "duration");
        this.__kvStoreModel = new ObservedPropertyObject(new KvStoreModel(), this, "kvStoreModel");
        this.__ratio = new ObservedPropertySimple(1.0
        // 是否横屏
        , this, "ratio");
        this.__isLand = new ObservedPropertySimple(false
        // 是否正在加载
        , this, "isLand");
        this.__isLoading = new ObservedPropertySimple(true, this, "isLoading");
        this.__continuationMode = AppStorage.SetAndLink('continuationMode', 'continuation'
        // 控制栏定时器id
        , this, "continuationMode");
        this.controlBarTimeoutID = undefined;
        this.tabsController = new TabsController();
        this.remoteDeviceModel = new RemoteDeviceModel();
        this.mediaDataSource = new MediaDataSource([]);
        this.mediaUtil = new MediaUtils();
        this.mediaList = [];
        this.mXComponentController = new XComponentController();
        this.surfaceId = '';
        this.avPlayer = new AVPlayerUtils();
        this.fileAsset = undefined;
        this.fd = undefined;
        this.listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)');
        this.onLand = (mediaQueryResult) => {
            Logger.info(TAG, `onLand: mediaQueryResult.matches= ${mediaQueryResult.matches}`);
            if (mediaQueryResult.matches) {
                this.isLand = true;
            }
            else {
                this.isLand = false;
            }
        };
        this.startX = undefined;
        this.startY = undefined;
        this.moveX = undefined;
        this.moveY = undefined;
        this.startAbilityCallBack = (key) => {
            Logger.info(TAG, `startAbilityCallBack ${key}`);
            if (DATA_CHANGE === key) {
                globalThis.deviceID = "local";
                globalThis.firstHop = true;
                let video = new DistributedDataModel(this.title, this.currentTime, this.SpeedIndex, this.isPlay, true);
                this.isPlay = false;
                this.kvStoreModel.put(DATA_CHANGE, JSON.stringify(video));
                if (this.continuationMode == 'continuation') {
                    globalThis.context.terminateSelf();
                }
            }
            if (EXIT === key) {
                this.kvStoreModel.put(DATA_CHANGE, EXIT);
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("videoIndex", this.resetVideo);
        this.declareWatch("title", this.initVideo);
        this.declareWatch("SpeedIndex", this.setSpeed);
        this.declareWatch("isPlay", this.dataChange);
        this.declareWatch("controls", this.showControlBarEvent);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
        if (params.videoIndex !== undefined) {
            this.videoIndex = params.videoIndex;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.SpeedIndex !== undefined) {
            this.SpeedIndex = params.SpeedIndex;
        }
        if (params.isPlay !== undefined) {
            this.isPlay = params.isPlay;
        }
        if (params.controls !== undefined) {
            this.controls = params.controls;
        }
        if (params.showSideBar !== undefined) {
            this.showSideBar = params.showSideBar;
        }
        if (params.showPlaybackProgress !== undefined) {
            this.showPlaybackProgress = params.showPlaybackProgress;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.kvStoreModel !== undefined) {
            this.kvStoreModel = params.kvStoreModel;
        }
        if (params.ratio !== undefined) {
            this.ratio = params.ratio;
        }
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.controlBarTimeoutID !== undefined) {
            this.controlBarTimeoutID = params.controlBarTimeoutID;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
        if (params.remoteDeviceModel !== undefined) {
            this.remoteDeviceModel = params.remoteDeviceModel;
        }
        if (params.mediaDataSource !== undefined) {
            this.mediaDataSource = params.mediaDataSource;
        }
        if (params.mediaUtil !== undefined) {
            this.mediaUtil = params.mediaUtil;
        }
        if (params.mediaList !== undefined) {
            this.mediaList = params.mediaList;
        }
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.avPlayer !== undefined) {
            this.avPlayer = params.avPlayer;
        }
        if (params.fileAsset !== undefined) {
            this.fileAsset = params.fileAsset;
        }
        if (params.fd !== undefined) {
            this.fd = params.fd;
        }
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
        if (params.onLand !== undefined) {
            this.onLand = params.onLand;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.startY !== undefined) {
            this.startY = params.startY;
        }
        if (params.moveX !== undefined) {
            this.moveX = params.moveX;
        }
        if (params.moveY !== undefined) {
            this.moveY = params.moveY;
        }
        if (params.startAbilityCallBack !== undefined) {
            this.startAbilityCallBack = params.startAbilityCallBack;
        }
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        this.__videoIndex.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__SpeedIndex.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__controls.aboutToBeDeleted();
        this.__showSideBar.aboutToBeDeleted();
        this.__showPlaybackProgress.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__kvStoreModel.aboutToBeDeleted();
        this.__ratio.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__continuationMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tabsIndex: ObservedPropertySimple<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    private __videoIndex: ObservedPropertySimple<number>;
    get videoIndex() {
        return this.__videoIndex.get();
    }
    set videoIndex(newValue: number) {
        this.__videoIndex.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __SpeedIndex: ObservedPropertySimple<number>;
    get SpeedIndex() {
        return this.__SpeedIndex.get();
    }
    set SpeedIndex(newValue: number) {
        this.__SpeedIndex.set(newValue);
    }
    private __isPlay: ObservedPropertySimple<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    // 是否显示控制栏
    private __controls: ObservedPropertySimple<number>;
    get controls() {
        return this.__controls.get();
    }
    set controls(newValue: number) {
        this.__controls.set(newValue);
    }
    // 是否显示侧边栏
    private __showSideBar: ObservedPropertySimple<boolean>;
    get showSideBar() {
        return this.__showSideBar.get();
    }
    set showSideBar(newValue: boolean) {
        this.__showSideBar.set(newValue);
    }
    private __showPlaybackProgress: ObservedPropertySimple<boolean>;
    get showPlaybackProgress() {
        return this.__showPlaybackProgress.get();
    }
    set showPlaybackProgress(newValue: boolean) {
        this.__showPlaybackProgress.set(newValue);
    }
    private __currentTime: ObservedPropertySimple<number>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    private __duration: ObservedPropertySimple<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private __kvStoreModel: ObservedPropertyObject<KvStoreModel>;
    get kvStoreModel() {
        return this.__kvStoreModel.get();
    }
    set kvStoreModel(newValue: KvStoreModel) {
        this.__kvStoreModel.set(newValue);
    }
    private __ratio: ObservedPropertySimple<number>;
    get ratio() {
        return this.__ratio.get();
    }
    set ratio(newValue: number) {
        this.__ratio.set(newValue);
    }
    // 是否横屏
    private __isLand: ObservedPropertySimple<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    // 是否正在加载
    private __isLoading: ObservedPropertySimple<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    // 流转模式
    private __continuationMode: ObservedPropertyAbstract<string>;
    get continuationMode() {
        return this.__continuationMode.get();
    }
    set continuationMode(newValue: string) {
        this.__continuationMode.set(newValue);
    }
    // 控制栏定时器id
    private controlBarTimeoutID: number;
    private tabsController: TabsController;
    private remoteDeviceModel: RemoteDeviceModel;
    private mediaDataSource: MediaDataSource;
    private mediaUtil: MediaUtils;
    private mediaList: Array<mediaLibrary.FileAsset>;
    private mXComponentController: XComponentController;
    private surfaceId: string;
    private avPlayer: AVPlayerUtils;
    private fileAsset: mediaLibrary.FileAsset;
    private fd: number;
    private listener;
    private onLand;
    private startX: number;
    private startY: number;
    private moveX: number;
    private moveY: number;
    TabBuilder(index: number, text: string, parent = null) {
        Column.create();
        Text.create(text);
        Text.fontColor(Color.White);
        Text.fontSize(24);
        Text.fontFamily('HarmonyHeiTi');
        Text.pop();
        Divider.create();
        Divider.width('75%');
        Divider.strokeWidth(5);
        Divider.color('#007Dff');
        Divider.opacity(this.tabsIndex === index ? 1 : 0);
        Column.pop();
    }
    async aboutToAppear() {
        this.getVideos();
        // 订阅DATA_CHANGE类型的数据变更通知
        this.kvStoreModel.setOnMessageReceivedListener(DATA_CHANGE, value => {
            Logger.info(TAG, `DATA_CHANGE ${value}`);
            if (globalThis.isDistributed) {
                if (value.search(EXIT) !== -1) {
                    Logger.info(TAG, `EXIT ${EXIT}`);
                    globalThis.context.terminateSelf((error) => {
                        Logger.error(TAG, `terminateSelf finished, error= ${error}`);
                    });
                }
                else {
                    let video = JSON.parse(value);
                    globalThis.dataChange = true;
                    globalThis.firstHop = video.firstHop;
                    this.title = video.title;
                    this.currentTime = video.currentTime;
                    if (!video.firstHop) {
                        this.setCurrentTime();
                    }
                    this.SpeedIndex = video.SpeedIndex;
                    this.isPlay = video.isPlay;
                    Logger.info(TAG, `title:${this.title},currentTime:${this.currentTime},SpeedIndex:${this.SpeedIndex},isPlay:${this.isPlay},firstHop:${globalThis.firstHop}`);
                    globalThis.dataChange = false;
                }
            }
        });
        if (AppStorage.Get('isStage') === 'Stage') {
            globalThis.isDistributed = true;
        }
        globalThis.deviceID = AppStorage.Get('deviceID');
        this.listener.on('change', this.onLand);
        preferenceSetting = await preferences.getPreferences(globalThis.context, PREFERENCES_NAME);
        this.continuationMode = <string>await preferenceSetting.get('continuationMode', 'continuation');
    }
    private startAbilityCallBack;
    async getVideos() {
        this.mediaDataSource['dataArray'] = [];
        let fileList = await this.mediaUtil.getFileAssetsFromType(mediaLibrary.MediaType.VIDEO);
        Logger.info(TAG, 'getVideos fileList:' + JSON.stringify(fileList));
        this.mediaList = this.mediaDataSource['dataArray'] = fileList;
        Logger.info(TAG, 'getVideos mediaList:' + JSON.stringify(this.mediaList));
        Logger.info(TAG, 'getVideos mediaDataSource:' + JSON.stringify(this.mediaDataSource['dataArray']));
        this.mediaDataSource.notifyDataReload();
        if (!globalThis.isDistributed) {
            this.title = this.mediaList[this.videoIndex].displayName.replace('.mp4', '');
        }
    }
    dataChange() {
        Logger.info(TAG, `dataChange, title = ${this.title}, currentTime = ${this.currentTime}, SpeedIndex = ${this.SpeedIndex}, isPlay = ${this.isPlay}`);
        if (this.isPlay) {
            this.playVideo();
        }
        else {
            this.avPlayer.pause();
            this.controls = Visibility.Visible;
            clearTimeout(this.controlBarTimeoutID);
        }
        this.controls = Visibility.Visible;
        this.distributedDataSync();
    }
    distributedDataSync() {
        if (globalThis.isDistributed && !globalThis.firstHop && !globalThis.dataChange) {
            let video = new DistributedDataModel(this.title, this.currentTime, this.SpeedIndex, this.isPlay, false);
            this.kvStoreModel.put(DATA_CHANGE, JSON.stringify(video));
        }
    }
    showControlBarEvent() {
        if (this.controls == Visibility.Visible) {
            this.controlBarTimeoutID = setTimeout(() => {
                this.controls = Visibility.Hidden;
            }, 5000);
        }
    }
    async initVideo() {
        Logger.info(TAG, 'initVideo');
        try {
            this.mediaList.forEach((file, index) => {
                if (file.displayName.replace('.mp4', '') === this.title) {
                    this.fileAsset = file;
                    this.videoIndex = index;
                }
            });
            let fdPath = await this.prepareVideo();
            await this.avPlayer.initVideoPlayer(fdPath, this.surfaceId);
            if (globalThis.firstHop && globalThis.isDistributed) {
                this.setCurrentTime();
            }
            if (globalThis.firstHop && globalThis.deviceID === "remote") {
                this.dataChange();
                globalThis.firstHop = false;
                let video = new DistributedDataModel(this.title, this.currentTime, this.SpeedIndex, this.isPlay, false);
                this.kvStoreModel.put(DATA_CHANGE, JSON.stringify(video));
            }
        }
        catch (error) {
            Logger.info(TAG, `initVideo error ${JSON.stringify(error)}`);
        }
    }
    async prepareVideo() {
        Logger.info(TAG, 'prepareVideo');
        this.fd = await this.fileAsset.open('Rw');
        this.ratio = this.fileAsset.width / this.fileAsset.height;
        this.mXComponentController.setXComponentSurfaceSize({
            surfaceWidth: this.fileAsset.width,
            surfaceHeight: this.fileAsset.height
        });
        this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
        this.isLoading = false;
        this.duration = this.fileAsset.duration / 1000;
        return 'fd://' + this.fd;
    }
    async resetVideo() {
        Logger.info(TAG, 'resetVideo');
        if (globalThis.firstHop) {
            return;
        }
        this.SpeedIndex = 1;
        this.currentTime = 0;
        this.isLoading = true;
        await this.fileAsset.close(this.fd);
        this.fileAsset = this.mediaList[this.videoIndex];
        this.title = this.fileAsset.displayName.replace('.mp4', '');
        this.isPlay = false;
        this.distributedDataSync();
        let fdPath = await this.prepareVideo();
        await this.avPlayer.reset(fdPath);
    }
    async playVideo() {
        Logger.info(TAG, 'playVideo');
        if (globalThis.firstHop) {
            return;
        }
        this.avPlayer.setTimeUpdateCallBackCallBack((time: number) => {
            this.currentTime = time / 1000;
        });
        this.avPlayer.play();
        this.isPlay = true;
        this.showControlBarEvent();
    }
    aboutToDisappear() {
        this.clearVideoPlayer();
    }
    clearVideoPlayer() {
        Logger.info(TAG, 'clearVideoPlayer');
        if (this.avPlayer) {
            this.avPlayer.stop();
            this.avPlayer.release();
        }
        if (this.fileAsset) {
            this.fileAsset.close(this.fd);
        }
    }
    setCurrentTime() {
        Logger.info(TAG, 'setCurrentTime');
        this.avPlayer.seek(this.currentTime);
        this.isLoading = false;
        this.distributedDataSync();
    }
    setSpeed() {
        Logger.info(TAG, 'setSpeed');
        this.avPlayer.setSpeed(this.SpeedIndex);
        this.distributedDataSync();
    }
    render() {
        SideBarContainer.create(SideBarContainerType.Overlay);
        SideBarContainer.showSideBar(this.showSideBar);
        SideBarContainer.showControlButton(false);
        SideBarContainer.sideBarPosition(SideBarPosition.End);
        SideBarContainer.sideBarWidth(350);
        SideBarContainer.minSideBarWidth(200);
        SideBarContainer.maxSideBarWidth(400);
        SideBarContainer.onChange((value: boolean) => {
            Logger.info('status:' + value);
        });
        Tabs.create({ controller: this.tabsController });
        Tabs.backgroundColor('#7F000000');
        Tabs.vertical(false);
        Tabs.scrollable(false);
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, '本地视频');
            } });
        Scroll.create();
        Scroll.edgeEffect(EdgeEffect.Spring);
        Scroll.padding(10);
        Column.create({ space: 10 });
        Column.constraintSize({ minHeight: '100%' });
        LazyForEach.create("3", this, ObservedObject.GetRawObject(this.mediaDataSource), (item, index) => {
            this.isRenderingInProgress = true;
            let earlierCreatedChild_2: localVideoItem = (this && this.findChildById) ? this.findChildById("2") as localVideoItem : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new localVideoItem("2", this, { media: item, videoIndex: this.__videoIndex, index: index, event: () => {
                        this.videoIndex = index;
                        this.title = item.displayName.replace('.mp4', '');
                    } }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    media: item, index: index, event: () => {
                        this.videoIndex = index;
                        this.title = item.displayName.replace('.mp4', '');
                    }
                });
                View.create(earlierCreatedChild_2);
            }
            this.isRenderingInProgress = false;
        });
        LazyForEach.pop();
        Column.pop();
        Scroll.pop();
        TabContent.pop();
        Tabs.pop();
        Stack.create();
        Stack.id("container");
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(Color.Black);
        Stack.onClick(() => {
            if (!this.showSideBar) {
                this.controls = (this.controls === Visibility.Hidden) ? Visibility.Visible : Visibility.Hidden;
            }
            else {
                this.showSideBar = false;
            }
        });
        Gesture.create(GesturePriority.High);
        GestureGroup.create(GestureMode.Exclusive);
        TapGesture.create({ count: 2 });
        TapGesture.onAction(() => {
            this.isPlay = !this.isPlay;
        });
        TapGesture.pop();
        PanGesture.create({ direction: PanDirection.Left | PanDirection.Right });
        PanGesture.onActionStart((event: GestureEvent) => {
            Logger.info(TAG, 'PlaybackEvent Pan start');
            this.startX = event.offsetX;
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            Logger.info(TAG, 'PlaybackEvent Pan update');
            // 右滑
            if (event.offsetX - this.startX > 0) {
                this.startX = event.offsetX;
                this.showPlaybackProgress = true;
                if (this.currentTime === this.duration) {
                    return;
                }
                else {
                    this.currentTime += 1;
                }
            } // 左滑
            else if (event.offsetX - this.startX < 0) {
                this.startX = event.offsetX;
                this.showPlaybackProgress = true;
                if (this.currentTime === 0) {
                    return;
                }
                else {
                    this.currentTime -= 1;
                }
            }
        });
        PanGesture.onActionEnd(() => {
            Logger.info(TAG, 'PlaybackEvent Pan end');
            this.showPlaybackProgress = false;
            this.isLoading = true;
            this.setCurrentTime();
        });
        PanGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        XComponent.create({
            id: 'xComponent',
            type: 'surface',
            controller: this.mXComponentController
        });
        XComponent.width('100%');
        XComponent.aspectRatio(this.ratio);
        // 控制栏
        Column.create();
        // 控制栏
        Column.width('100%');
        // 控制栏
        Column.height('100%');
        // 控制栏
        Column.justifyContent(FlexAlign.SpaceBetween);
        // 控制栏
        Column.alignItems(HorizontalAlign.Start);
        // 控制栏
        Column.visibility(this.controls);
        let earlierCreatedChild_4: TitleBar = (this && this.findChildById) ? this.findChildById("4") as TitleBar : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new TitleBar("4", this, {
                title: this.title,
                isLand: this.isLand,
                startAbilityCallBack: this.startAbilityCallBack.bind(this),
                remoteDeviceModel: this.remoteDeviceModel,
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                title: this.title,
                isLand: this.isLand,
                startAbilityCallBack: this.startAbilityCallBack.bind(this),
                remoteDeviceModel: this.remoteDeviceModel
            });
            View.create(earlierCreatedChild_4);
        }
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.padding({ left: 10, right: 10 });
        Flex.linearGradient({
            direction: GradientDirection.Top,
            colors: [['#CC000000', 0.0], ['#33000000', 0.66], ['#00000000', 0.99]]
        });
        Image.create(this.isPlay ? $r("app.media.ic_pause") : $r("app.media.ic_play"));
        Image.id("playBtn");
        Image.width(36);
        Image.height(36);
        Image.flexShrink(0);
        Image.margin({ right: 10 });
        Image.onClick(() => {
            this.isPlay = !this.isPlay;
        });
        Text.create(toTime(this.currentTime));
        Text.flexShrink(0);
        Text.fontColor(Color.White);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.pop();
        Slider.create({
            value: this.currentTime,
            min: 0,
            max: this.duration,
            step: 1
        });
        Slider.id("slider");
        Slider.blockColor(Color.White);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor(Color.White);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.currentTime = value;
            this.setCurrentTime();
        });
        Text.create(toTime(this.duration));
        Text.flexShrink(0);
        Text.fontColor(Color.White);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.pop();
        Select.create([{ value: PlaybackSpeed[0] },
            { value: PlaybackSpeed[1] },
            { value: PlaybackSpeed[2] },
            { value: PlaybackSpeed[3] },
            { value: PlaybackSpeed[4] }]);
        Select.id("playbackSpeed");
        Select.flexShrink(0);
        Select.backgroundColor('#00000000');
        Select.margin({ left: 10, right: 10 });
        Select.selected(this.SpeedIndex);
        Select.value(PlaybackSpeed[this.SpeedIndex]);
        Select.font({ size: 24 });
        Select.fontColor("#E5007DFF");
        Select.selectedOptionFont({ size: 16 });
        Select.selectedOptionFontColor("#E5007DFF");
        Select.optionFont({ size: 16 });
        Select.optionFontColor("#7F007DFF");
        Select.onSelect((index: number, value: string) => {
            Logger.info(TAG, `index ${index}`);
            this.SpeedIndex = index;
        });
        Select.pop();
        Image.create($r("app.media.ic_public_view_list"));
        Image.id("viewList");
        Image.width(36);
        Image.aspectRatio(1);
        Image.flexShrink(0);
        Image.margin({ right: 10 });
        Image.onClick(() => {
            this.showSideBar = !this.showSideBar;
        });
        Flex.pop();
        // 控制栏
        Column.pop();
        If.create();
        if (this.showPlaybackProgress) {
            If.branchId(0);
            Text.create(toTime(this.currentTime) + '/' + toTime(this.duration));
            Text.fontColor(Color.White);
            Text.padding(12);
            Text.backgroundColor('#CC000000');
            Text.borderRadius(8);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.isLoading) {
            If.branchId(0);
            Column.create();
            LoadingProgress.create();
            LoadingProgress.height(96);
            LoadingProgress.width(96);
            LoadingProgress.color(Color.Grey);
            Text.create("正在加载...");
            Text.fontColor(Color.White);
            Text.fontFamily('HarmonyHeiTi');
            Text.fontSize(14);
            Text.pop();
            Column.pop();
        }
        If.pop();
        Stack.pop();
        SideBarContainer.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
