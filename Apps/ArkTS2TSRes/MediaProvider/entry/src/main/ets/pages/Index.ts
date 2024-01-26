interface Index_Params {
    message?: string;
    isPlaying?: boolean;
    currentPlayItem?: avSession.AVQueueItem | null;
    currentAVMetadata?: avSession.AVMetadata | null;
    currentImage?: PixelMap | null;
    currentLyric?: string;
    providerFeature?: ProviderFeature;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
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
import Utils from '../common/Utils';
import { ProviderFeature } from '../feature/ProviderFeature';
import avSession from '@ohos.multimedia.avsession';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__isPlaying = AppStorage.SetAndLink('IsPlaying', false, this, "isPlaying");
        this.__currentPlayItem = AppStorage.SetAndLink('CurrentPlayItem', null, this, "currentPlayItem");
        this.__currentAVMetadata = AppStorage.SetAndLink('CurrentAVMetadata', null, this, "currentAVMetadata");
        this.__currentImage = AppStorage.SetAndLink('CurrentImage', null, this, "currentImage");
        this.__currentLyric = AppStorage.SetAndLink('CurrentLyric', '', this, "currentLyric");
        this.providerFeature = new ProviderFeature();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.providerFeature !== undefined) {
            this.providerFeature = params.providerFeature;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__isPlaying.aboutToBeDeleted();
        this.__currentPlayItem.aboutToBeDeleted();
        this.__currentAVMetadata.aboutToBeDeleted();
        this.__currentImage.aboutToBeDeleted();
        this.__currentLyric.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __isPlaying: ObservedPropertyAbstract<boolean>;
    get isPlaying() {
        return this.__isPlaying.get();
    }
    set isPlaying(newValue: boolean) {
        this.__isPlaying.set(newValue);
    }
    private __currentPlayItem: ObservedPropertyAbstract<avSession.AVQueueItem | null>;
    get currentPlayItem() {
        return this.__currentPlayItem.get();
    }
    set currentPlayItem(newValue: avSession.AVQueueItem | null) {
        this.__currentPlayItem.set(newValue);
    }
    private __currentAVMetadata: ObservedPropertyAbstract<avSession.AVMetadata | null>;
    get currentAVMetadata() {
        return this.__currentAVMetadata.get();
    }
    set currentAVMetadata(newValue: avSession.AVMetadata | null) {
        this.__currentAVMetadata.set(newValue);
    }
    private __currentImage: ObservedPropertyAbstract<PixelMap | null>;
    get currentImage() {
        return this.__currentImage.get();
    }
    set currentImage(newValue: PixelMap | null) {
        this.__currentImage.set(newValue);
    }
    private __currentLyric: ObservedPropertyAbstract<string>;
    get currentLyric() {
        return this.__currentLyric.get();
    }
    set currentLyric(newValue: string) {
        this.__currentLyric.set(newValue);
    }
    private providerFeature: ProviderFeature;
    async aboutToAppear() {
        let createAVSessionResult: Boolean = await this.providerFeature.CreateAVSession();
        if (!createAVSessionResult) {
            Utils.showPrompt(`Failed to init AVSession`);
        }
        await this.providerFeature.RegisterListener();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Flex.backgroundImage($r('app.media.background1'));
        Flex.backgroundImageSize(ImageSize.Cover);
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.margin({ left: '34vp', right: '34vp' });
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.height('100%');
        Flex.width('100%');
        Text.create(this.isPlaying ? $r('app.string.In_play') : $r('app.string.Not_in_play'));
        Text.fontSize('20sp');
        Text.fontColor('#182431');
        Text.margin({ top: '55vp' });
        Text.width('80vp');
        Text.height('26vp');
        Text.id('PageTitle');
        Text.pop();
        Image.create(this.currentImage ? this.currentImage : '');
        Image.width('100%');
        Image.margin({ top: '15vp' });
        Image.id('CurrentImage');
        If.create();
        if (this.currentAVMetadata) {
            If.branchId(0);
            Text.create(this.currentAVMetadata.title ? this.currentAVMetadata.title : 'No title');
            Text.width('100%');
            Text.height('32vp');
            Text.fontSize('24fp');
            Text.fontColor('#556B89');
            Text.id('Title');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.currentAVMetadata) {
            If.branchId(0);
            Text.create(this.currentAVMetadata.artist ? this.currentAVMetadata.artist : 'No artist');
            Text.width('100%');
            Text.height('19vp');
            Text.margin({ top: '12vp' });
            Text.fontSize('14fp');
            Text.fontColor('#556B89');
            Text.id('Artist');
            Text.pop();
        }
        If.pop();
        Text.create(this.currentLyric ? this.currentLyric : '');
        Text.width('100%');
        Text.height('19vp');
        Text.opacity(0.8);
        Text.margin({ top: '8vp' });
        Text.fontSize('14fp');
        Text.fontColor('#556B89');
        Text.id('Lyric');
        Text.pop();
        Flex.create({
            direction: FlexDirection.Row,
            alignItems: ItemAlign.Center,
            alignContent: FlexAlign.Center,
            justifyContent: FlexAlign.Center
        });
        Flex.height('64vp');
        Flex.margin({ left: '36vp', right: '36vp' });
        Flex.margin({ top: '80vp' });
        Button.createWithChild({ stateEffect: true });
        Button.width('30vp');
        Button.height('30vp');
        Button.backgroundColor('#00000000');
        Button.id('Previous');
        Button.onClick(async () => {
            this.providerFeature.previous();
        });
        Image.create($r('app.media.previous'));
        Button.pop();
        Button.createWithChild({ stateEffect: true });
        Button.width('64vp');
        Button.height('64vp');
        Button.margin({ left: '48vp' });
        Button.backgroundColor('#00000000');
        Button.id('PlayOrPause');
        Button.onClick(async () => {
            if (!this.isPlaying) {
                await this.providerFeature.play();
            }
            else {
                await this.providerFeature.pause();
            }
        });
        Image.create(this.isPlaying ? $r('app.media.pause') : $r('app.media.play'));
        Button.pop();
        Button.createWithChild({ stateEffect: true });
        Button.width('30vp');
        Button.height('30vp');
        Button.margin({ left: '48vp' });
        Button.backgroundColor('#00000000');
        Button.id('Next');
        Button.onClick(async () => {
            this.providerFeature.next();
        });
        Image.create($r('app.media.next'));
        Button.pop();
        Flex.pop();
        Flex.pop();
        Flex.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
