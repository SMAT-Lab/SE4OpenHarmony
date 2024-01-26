interface Index_Params {
    listener?;
    ImageModel?: ImageModel;
    game?: GameRules;
    isGameStart?: boolean;
    timer?: number;
    isRefresh?: boolean;
    numArray?: PictureItem[];
    imgDatas?: Array<photoAccessHelper.PhotoAsset>;
    gameTime?: number;
    index?: number;
    isLand?: boolean;
    onLand?;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import mediaQuery from '@ohos.mediaquery';
import GameRules from "../model/GameRules";
import ImagePicker from '../common/ImagePicker';
import Logger from '../model/Logger';
import PictureItem from '../model/PictureItem';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import emitter from '@ohos.events.emitter';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import ImageModel from '../model/ImageModel';
const PERMISSIONS: Array<Permissions> = ['ohos.permission.READ_MEDIA', 'ohos.permission.WRITE_MEDIA',
    'ohos.permission.MEDIA_LOCATION', 'ohos.permission.MANAGE_MISSIONS'];
const IMAGE_SIZE: number = px2vp(640);
const GAME_TIME: number = 300; // 游戏时长
const TAG: string = 'Index';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)');
        this.ImageModel = new ImageModel(getContext(this));
        this.game = new GameRules();
        this.__isGameStart = AppStorage.SetAndLink('isGameStart', false, this, "isGameStart");
        this.timer = -1;
        this.isRefresh = false;
        this.__numArray = new ObservedPropertyObject([], this, "numArray");
        this.__imgDatas = new ObservedPropertyObject([], this, "imgDatas");
        this.__gameTime = new ObservedPropertySimple(GAME_TIME, this, "gameTime");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__isLand = new ObservedPropertySimple(false, this, "isLand");
        this.onLand = (mediaQueryResult: mediaQuery.MediaQueryResult) => {
            console.info(`[eTSMediaQuery.Index]onLand: mediaQueryResult.matches=${mediaQueryResult.matches}`);
            this.isLand = mediaQueryResult.matches;
        };
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ImagePicker("3", this, {
                    imageDatas: this.imgDatas,
                    index: this.__index
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            gridCount: 12
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("gameTime", this.onTimeOver);
        this.declareWatch("index", this.onImageChange);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
        if (params.ImageModel !== undefined) {
            this.ImageModel = params.ImageModel;
        }
        if (params.game !== undefined) {
            this.game = params.game;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.isRefresh !== undefined) {
            this.isRefresh = params.isRefresh;
        }
        if (params.numArray !== undefined) {
            this.numArray = params.numArray;
        }
        if (params.imgDatas !== undefined) {
            this.imgDatas = params.imgDatas;
        }
        if (params.gameTime !== undefined) {
            this.gameTime = params.gameTime;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.onLand !== undefined) {
            this.onLand = params.onLand;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__imgDatas.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private listener;
    private ImageModel: ImageModel;
    private game: GameRules;
    private __isGameStart: ObservedPropertyAbstract<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private timer: number;
    private isRefresh: boolean;
    private __numArray: ObservedPropertyObject<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
    }
    private __imgDatas: ObservedPropertyObject<Array<photoAccessHelper.PhotoAsset>>;
    get imgDatas() {
        return this.__imgDatas.get();
    }
    set imgDatas(newValue: Array<photoAccessHelper.PhotoAsset>) {
        this.__imgDatas.set(newValue);
    }
    private __gameTime: ObservedPropertySimple<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __isLand: ObservedPropertySimple<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private onLand;
    async aboutToAppear() {
        this.listener.on('change', this.onLand);
        await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
        this.imgDatas = await this.ImageModel.getAllImg();
        Logger.info(TAG, `images = ${this.imgDatas.length}`);
        this.numArray = await this.ImageModel.splitPic(this.index);
        // 测试用例，模拟游戏成功
        emitter.on({ eventId: 0, priority: 0 }, () => {
            Logger.info(TAG, 'emitter on , eventID = 0');
            for (let i = 0; i < 7; i++) {
                this.numArray[i].index = i;
            }
            this.gameOver();
        });
        // 测试用例，模拟时间结束
        emitter.on({ eventId: 1, priority: 0 }, () => {
            Logger.info(TAG, 'emitter on , eventID = 1');
            this.gameTime = 0;
        });
    }
    onTimeOver() {
        if (this.gameTime == 0) {
            this.isGameStart = false;
            AlertDialog.show({ message: 'TimeOver' });
            clearInterval(this.timer);
        }
    }
    async onImageChange() {
        this.isRefresh = true;
        this.dialogController.close();
        this.numArray = [];
        this.numArray = await this.ImageModel.splitPic(this.index);
        this.init();
        this.isGameStart = false;
        this.isRefresh = false;
    }
    init() {
        this.gameTime = GAME_TIME;
        clearInterval(this.timer);
    }
    gameOver() {
        let count = 0;
        for (let i = 0; i < 7; i++) {
            if (this.numArray[i].index == i) {
                count++;
            }
            else {
                count = 0;
                break;
            }
        }
        if (count === 7) {
            this.isGameStart = false;
            AlertDialog.show({ message: $r('app.string.congratulations') });
            clearInterval(this.timer);
            this.gameTime = GAME_TIME;
        }
    }
    start() {
        this.init();
        this.timer = setInterval(() => {
            this.gameTime--;
        }, 1000);
    }
    private dialogController: CustomDialogController;
    ImageShow(parent = null) {
        Image.create(this.imgDatas[this.index].uri);
        Image.id('imageShow');
        Image.width('90%');
        Image.height(275);
        Image.objectFit(ImageFit.Fill);
        Image.onClick(async () => {
            if (this.isRefresh) {
                return;
            }
            this.imgDatas = await this.ImageModel.getAllImg();
            setTimeout(() => {
                this.dialogController.open();
            }, 200);
        });
    }
    ImageGrid(leftMargin: number, topMargin: number, parent = null) {
        Grid.create();
        Grid.id('imageGrid');
        Grid.columnsTemplate('1fr 1fr 1fr');
        Grid.columnsGap(2);
        Grid.rowsGap(2);
        Grid.width('90%');
        Grid.height(275);
        Grid.margin({ left: leftMargin, top: topMargin });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.numArray), (item: PictureItem, index) => {
            GridItem.create();
            GridItem.id(`image${index}`);
            GridItem.backgroundColor(item.pixelMap === undefined ? "#f5f5f5" : "#ffdead");
            GridItem.onClick(() => {
                if (this.isRefresh) {
                    return;
                }
                if (this.isGameStart) {
                    this.isRefresh = true;
                    this.numArray = this.game.gameInit(index, ObservedObject.GetRawObject(this.numArray));
                    this.gameOver();
                    this.isRefresh = false;
                }
            });
            Image.create(item.pixelMap);
            Image.width('99%');
            Image.objectFit(ImageFit.Fill);
            Image.height(90);
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({ left: '1%', right: '1%' });
        Row.create();
        Text.create(`Time:0${Math.floor(this.gameTime / 60)}:${this.gameTime % 60 < 10 ? '0' + this.gameTime % 60 : this.gameTime % 60}`);
        Text.id('time');
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Row.pop();
        If.create();
        if (this.imgDatas.length > 0) {
            If.branchId(0);
            If.create();
            if (this.isLand) {
                If.branchId(0);
                Row.create();
                Row.margin({ top: 5 });
                this.ImageShow(this);
                this.ImageGrid(10, 0, this);
                Row.pop();
            }
            else {
                If.branchId(1);
                Column.create();
                Column.margin({ top: 5 });
                this.ImageShow(this);
                this.ImageGrid(0, 5, this);
                Column.pop();
            }
            If.pop();
        }
        If.pop();
        Button.createWithLabel($r('app.string.start'), { type: ButtonType.Capsule, stateEffect: true });
        Button.id('start');
        Button.height(50);
        Button.width('100%');
        Button.fontSize(18);
        Button.margin({ top: 5 });
        Button.backgroundColor(this.isGameStart ? $r('app.color.forbid') : $r('app.color.allow'));
        Button.enabled(!this.isGameStart);
        Button.onClick(() => {
            this.isGameStart = true;
            this.start();
            this.numArray = this.game.gameBegin(ObservedObject.GetRawObject(this.numArray));
        });
        Button.pop();
        Button.createWithLabel($r('app.string.restart'), { type: ButtonType.Capsule, stateEffect: true });
        Button.id('restart');
        Button.height(50);
        Button.width('100%');
        Button.fontSize(18);
        Button.margin({ top: 5 });
        Button.backgroundColor(this.isGameStart ? $r('app.color.allow') : $r('app.color.forbid'));
        Button.enabled(this.isGameStart);
        Button.onClick(() => {
            this.isGameStart = true;
            this.start();
            this.numArray = this.game.gameBegin(ObservedObject.GetRawObject(this.numArray));
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
