/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import image from '@ohos.multimedia.image';
import avSession from '@ohos.multimedia.avsession';
import Log from '../common/Log';
import MediaData from '../common/MediaData';
import resourceManager from '@ohos.resourceManager';
import WantAgent from '@ohos.app.ability.wantAgent';
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager';
import common from '@ohos.app.ability.common';
import { GlobalContext } from '../common/GlobalContext';
import { BusinessError } from '@ohos.base';

export class ProviderFeature {
  private constants = new MediaData();
  private session: avSession.AVSession | null = null;
  private isPlayLink: SubscribedAbstractProperty<boolean> | null = null;
  private currentPlayItemLink: SubscribedAbstractProperty<avSession.AVQueueItem> | null = null;
  private currentAVMetadataLink: SubscribedAbstractProperty<avSession.AVMetadata> | null = null;
  private currentImageLink: SubscribedAbstractProperty<PixelMap> | null = null;
  private currentLyricLink: SubscribedAbstractProperty<string> | null = null;
  private queueItems: Array<avSession.AVQueueItem> = [this.constants.queueItemFirst, this.constants.queueItemSecond, this.constants.queueItemThird];
  private lyrics: Array<string> = this.constants.lyricsForDemo;
  private currentLyricLine: number = 0;
  private isSendLyrics: boolean = false;
  private pixelMap: PixelMap | null = null;
  private queueItemPixelMapArray: Array<PixelMap> = [];
  private MetadataPixelMapArray: Array<PixelMap> = [];
  private resourceManager: resourceManager.ResourceManager = (GlobalContext.getContext()
    .getObject('context') as (common.UIAbilityContext)).resourceManager;
  private avMetadataList: Array<avSession.AVMetadata> = [this.constants.avMetadataFirst, this.constants.avMetadataSecond, this.constants.avMetadataThird];
  private currentState: avSession.AVPlaybackState = {
    state: avSession.PlaybackState.PLAYBACK_STATE_PAUSE
  }
  private constantsForControl: MediaData = new MediaData();

  constructor() {
    this.isPlayLink = AppStorage.setAndLink('IsPlaying', false);
    this.currentPlayItemLink = AppStorage.setAndLink<avSession.AVQueueItem>('CurrentPlayItem', undefined);
    this.currentAVMetadataLink = AppStorage.setAndLink<avSession.AVMetadata>('CurrentAVMetadata', undefined);
    this.currentImageLink = AppStorage.setAndLink<PixelMap>('CurrentImage', undefined);
    this.currentLyricLink = AppStorage.setAndLink('CurrentLyric', 'No lyric');
    this.currentImageLink.set(null);
    this.currentAVMetadataLink.set(this.avMetadataList[0]);
    this.Init();

  }

  async Init(): Promise<void> {
    await this.prepareImageResources();
    await this.prepareResourcesForController();
    await this.InitFirstMusicState();
    await this.startContinuousTask();
  }

  async startContinuousTask(): Promise<void> {
    let wantAgentInfo: WantAgent.WantAgentInfo = {
      wants: [
        {
          bundleName: "com.samples.mediaprovider",
          abilityName: "com.samples.mediaprovider.EntryAbility"
        }
      ],
      operationType: WantAgent.OperationType.START_ABILITY,
      requestCode: 0,
      wantAgentFlags: [WantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    };
    let want = await WantAgent.getWantAgent(wantAgentInfo);
    await backgroundTaskManager.startBackgroundRunning(GlobalContext.getContext()
      .getObject('context') as (common.UIAbilityContext), backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, want);
  }

  async CreateAVSession(): Promise<boolean> {
    this.handleLyrics();

    Log.info(`Start create AVSession`)
    let ret: boolean = true;
    this.session = (await avSession.createAVSession(GlobalContext.getContext()
      .getObject('context') as (common.UIAbilityContext), "AVSessionDemo", 'audio') as avSession.AVSession);
    await this.session.activate().catch((err: BusinessError) => {
      Log.error(`Failed to activate AVSession, error info: ${JSON.stringify(err)}`);
      ret = false;
    });
    await this.session.setAVQueueItems(this.queueItems).catch((err: BusinessError) => {
      Log.error(`Failed to set AVQueue items, error info: ${JSON.stringify(err)}`);
      ret = false;
    });
    await this.session.setAVQueueTitle('Queue title').catch((err: BusinessError) => {
      Log.error(`Failed to set AVQueue title, error info: ${JSON.stringify(err)}`);
      ret = false;
    });
    return ret;
  }

  async InitFirstMusicState(): Promise<void> {
    let that = this;
    that.isPlayLink?.set(false);
    that.currentLyricLine = 0;
    that.currentImageLink?.set(that.MetadataPixelMapArray[0]);
    that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PAUSE;
    await that.session?.setAVPlaybackState(that.currentState);

    await that.setAVMetadataToController(0);
    that.currentPlayItemLink?.set(that.queueItems[0]);
    that.currentAVMetadataLink?.set(that.avMetadataList[0]);
  }

  async RegisterListener(): Promise<void> {
    let that = this;
    this.session?.on('play', async () => {
      console.info(`on play , do play task`);
      let that = this;
      that.isPlayLink?.set(true);
      that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PLAY;
      await that.session?.setAVPlaybackState(that.currentState);
    });
    this.session?.on('pause', async () => {
      console.info(`on pause , do pause task`);
      that.isPlayLink?.set(false);
      that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PAUSE;
      await that.session?.setAVPlaybackState(that.currentState);
    });
    this.session?.on('stop', async () => {
      console.info(`on stop , do stop task`);
      that.isPlayLink?.set(false);
      that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PAUSE;
      await that.session?.setAVPlaybackState(that.currentState);
    });
    this.session?.on('playNext', async () => {
      console.info(`on playNext , do playNext task`);
      if (that.currentPlayItemLink) {
        let nextId: number = that.currentPlayItemLink.get().itemId + 1;
        nextId = that.queueItems.length > nextId ? nextId : nextId - that.queueItems.length;
        await that.handleNewItem(nextId);
      }
    });
    this.session?.on('playPrevious', async () => {
      console.info(`on playPrevious , do playPrevious task`);
      if (that.currentPlayItemLink) {
        let previousId: number = that.currentPlayItemLink.get().itemId - 1;
        previousId = previousId < 0 ? previousId + that.queueItems.length : previousId;
        await that.handleNewItem(previousId);
      }
    });
    this.session?.on('skipToQueueItem', async (itemId) => {
      console.info(`on skipToQueueItem , do skip task`);
      await that.handleNewItem(itemId);
    });
    this.session?.on('commonCommand', (commandString, args) => {
      console.info(`on commonCommand , command is ${commandString}, args are ${JSON.stringify(args)}`);
      that.handleCommonCommand(commandString, args);
    });
  }

  async play(): Promise<void> {
    console.info(`Start do play task`);
    let that = this;
    that.isPlayLink?.set(true);
    that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PLAY;
    await that.session?.setAVPlaybackState(that.currentState);
  }

  async setAVMetadataToController(itemId: number): Promise<void> {
    let that = this;
    switch (itemId) {
      case 0:
        await that.session?.setAVMetadata(that.constantsForControl.avMetadataList[0]);
        break;
      case 1:
        await that.session?.setAVMetadata(that.constantsForControl.avMetadataList[1]);
        break;
      case 2:
        await that.session?.setAVMetadata(that.constantsForControl.avMetadataList[2]);
        break;
    }
  }

  async pause(): Promise<void> {
    console.info(`on pause , do pause task`);
    let that = this;
    that.isPlayLink?.set(false);
    that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PAUSE;
    await that.session?.setAVPlaybackState(that.currentState);
  }

  async previous(): Promise<void> {
    console.info(`on playPrevious , do playPrevious task`);
    let that = this;
    if (that.currentPlayItemLink) {
      let previousId: number = that.currentPlayItemLink.get().itemId - 1;
      previousId = previousId < 0 ? previousId + that.queueItems.length : previousId;
      await that.handleNewItem(previousId);
    }
  }

  async next(): Promise<void> {
    console.info(`on playNext , do playNext task`);
    let that = this;
    if (that.currentPlayItemLink) {
      let nextId: number = that.currentPlayItemLink.get().itemId + 1;
      nextId = that.queueItems.length > nextId ? nextId : nextId - that.queueItems.length;
      await that.handleNewItem(nextId);
    }
  }

  async handleNewItem(itemId: number): Promise<void> {
    let that = this;
    that.isPlayLink?.set(true);
    that.currentLyricLine = 0;
    that.currentLyricLink?.set(that.lyrics[that.currentLyricLine]);
    that.currentImageLink?.set(that.MetadataPixelMapArray[itemId]);
    that.currentState.state = avSession.PlaybackState.PLAYBACK_STATE_PLAY;
    await that.session?.setAVPlaybackState(that.currentState);
    await that.setAVMetadataToController(itemId);
    that.currentPlayItemLink?.set(that.queueItems[itemId]);
    if (that.currentPlayItemLink) {
      that.currentAVMetadataLink?.set(that.avMetadataList[that.currentPlayItemLink.get().itemId]);
    }
  }

  async handleCommonCommand(commandString: string, args: Record<string, Object>): Promise<void> {
    let that = this;
    switch (commandString) {
      case 'lyrics':
        that.isSendLyrics = args.lyrics as boolean;
        if (that.currentPlayItemLink) {
          await that.session?.setAVMetadata(that.constantsForControl.avMetadataList[that.currentPlayItemLink.get().itemId]);
        }
        await that.session?.setExtras({ lyricsLineNumber: that.currentLyricLine });
        await that.session?.dispatchSessionEvent('lyrics', { lyrics: that.lyrics[that.currentLyricLine] });
        break;
      case 'updateQueueItems':
        that.updateQueueItems();
        break;
      default:
        Log.warn(`Unknow command, please check`);
        break;
    }
  }

  async handleLyrics(): Promise<void> {
    let that = this;
    that.currentLyricLink?.set(that.lyrics[that.currentLyricLine]);
    setInterval(async () => {
      if (that.isPlayLink?.get()) {
        Log.info('Switch lyrics line for every 10s.' + that.isSendLyrics);
        if (that.isSendLyrics) {
          await that.session?.setExtras({ lyricsLineNumber: that.currentLyricLine });
          await that.session?.dispatchSessionEvent('lyrics', { lyrics: that.lyrics[that.currentLyricLine] });
        }
        that.currentLyricLine++;
        if (that.currentLyricLine > 20) {
          that.next();
          that.currentLyricLine = 0;
        }
      }
      that.currentLyricLink?.set(that.lyrics[that.currentLyricLine]);
    }, 2000);
  }

  async updateQueueItems(): Promise<void> {
    let that = this;
    await that.session?.setAVQueueItems(that.queueItems).catch((err: BusinessError) => {
      Log.error(`Failed to set AVQueueItems, error info: ${JSON.stringify(err)}`);
    });
  }

  async prepareImageResources(): Promise<void> {
    let that = this;
    that.queueItemPixelMapArray.push(await that.saveRawFileToPixelMap('first.png'));
    that.queueItemPixelMapArray.push(await that.saveRawFileToPixelMap('second.png'));
    that.queueItemPixelMapArray.push(await that.saveRawFileToPixelMap('third.png'));
    that.MetadataPixelMapArray.push(await that.saveRawFileToPixelMap('first_with_background.png'));
    that.MetadataPixelMapArray.push(await that.saveRawFileToPixelMap('second_with_background.png'));
    that.MetadataPixelMapArray.push(await that.saveRawFileToPixelMap('third_with_background.png'));
    for (let i = 0; i < that.queueItemPixelMapArray.length; i++) {
        that.queueItems[i].description!.mediaImage = that.queueItemPixelMapArray[i];
        that.avMetadataList[i].mediaImage = that.MetadataPixelMapArray[i];
    }
    this.currentPlayItemLink?.set(this.queueItems[0]);
    that.currentImageLink?.set(that.MetadataPixelMapArray[0]);
    this.currentAVMetadataLink?.set(this.avMetadataList[0]);
  }

  async saveRawFileToPixelMap(rawFilePath: string): Promise<image.PixelMap> {
    let that = this;
    let value: Uint8Array = await that.resourceManager.getRawFileContent(rawFilePath);
    let imageBuffer: ArrayBuffer = value.buffer;
    let imageSource: image.ImageSource = image.createImageSource(imageBuffer);
    let imagePixel: image.PixelMap = await imageSource.createPixelMap({ desiredSize: { width: 900, height: 900 } });
    return imagePixel;
  }

  async prepareResourcesForController(): Promise<void> {
    let that = this;
    that.constantsForControl.avMetadataList[0].mediaImage = await that.saveRawFileToPixelMap('first.png');
    that.constantsForControl.avMetadataList[1].mediaImage = await that.saveRawFileToPixelMap('second.png');
    that.constantsForControl.avMetadataList[2].mediaImage = await that.saveRawFileToPixelMap('third.png');
  }
}
