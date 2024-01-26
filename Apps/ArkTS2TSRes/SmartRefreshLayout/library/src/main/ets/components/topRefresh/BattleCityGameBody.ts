interface AirplaneGameBody_Params {
    model?: SmartRefreshForGame.Model;
    i?: number;
    enemyPlainList?: Array<BulletModel>;
    bulletList?: Array<BulletModel>;
    myPlainY?: number;
    isGameOver?: boolean;
    tipText?: string;
    flySpeed?: number;
    bulletSpeed?: number;
    enemyShowTime?: number;
    bulletShowTime?: number;
    enemyPlainSize?: number;
    myPlainSize?: number;
    bulletSize?: number;
    timeOutPlain?: number;
    timeOutBullet?: number;
    screenWidth?: number;
    bulletIndex?: number;
    enemyIndex?: number;
    gameIsStart?: boolean;
    downY?: number;
    initBackgroundColor?: Color | string | number;
    maxHeight?: number;
    isNotifyFinish?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BattleCityGameBody_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import SmartRefreshForGame from './SmartRefreshForGame';
import display from '@ohos.display';
class BulletModel {
    public index: number = 0;
    public x: number = 0;
    public y: number = 0;
}
export class AirplaneGameBody extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshForGame.Model(), this, "model");
        this.__i = new ObservedPropertySimple(0, this, "i");
        this.__enemyPlainList = new ObservedPropertyObject([] // 敌机的数组
        , this, "enemyPlainList");
        this.__bulletList = new ObservedPropertyObject([] // 存放子弹
        , this, "bulletList");
        this.__myPlainY = new ObservedPropertySimple(0 // 自己飞机的y位置
        , this, "myPlainY");
        this.__isGameOver = new ObservedPropertySimple(false // 游戏时是否结束
        , this, "isGameOver");
        this.__tipText = new ObservedPropertySimple(this.model.textLoading, this, "tipText");
        this.flySpeed = 3 // 敌机速度
        ;
        this.bulletSpeed = 8 // 子弹速度
        ;
        this.enemyShowTime = 1000 // 敌机刷新时间
        ;
        this.bulletShowTime = 500 // 子弹刷新时间
        ;
        this.enemyPlainSize = 50 // 敌机大小
        ;
        this.myPlainSize = 60 // 自己飞机的大小
        ;
        this.bulletSize = 20 // 子弹大小
        ;
        this.timeOutPlain = -1;
        this.timeOutBullet = -1;
        this.screenWidth = px2vp(display.getDefaultDisplaySync().width);
        this.bulletIndex = 1;
        this.enemyIndex = 0;
        this.__gameIsStart = new SynchedPropertySimpleOneWay(params.gameIsStart, this, "gameIsStart");
        this.__downY = new SynchedPropertySimpleOneWay(params.downY, this, "downY");
        this.initBackgroundColor = '';
        this.maxHeight = px2vp(150);
        this.__isNotifyFinish = new SynchedPropertySimpleOneWay(params.isNotifyFinish, this, "isNotifyFinish");
        this.updateWithValueParams(params);
        this.declareWatch("gameIsStart", this.onGameStateChange);
        this.declareWatch("downY", this.onYStateChange);
        this.declareWatch("isNotifyFinish", this.onFinishChange);
    }
    updateWithValueParams(params: AirplaneGameBody_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.i !== undefined) {
            this.i = params.i;
        }
        if (params.enemyPlainList !== undefined) {
            this.enemyPlainList = params.enemyPlainList;
        }
        if (params.bulletList !== undefined) {
            this.bulletList = params.bulletList;
        }
        if (params.myPlainY !== undefined) {
            this.myPlainY = params.myPlainY;
        }
        if (params.isGameOver !== undefined) {
            this.isGameOver = params.isGameOver;
        }
        if (params.tipText !== undefined) {
            this.tipText = params.tipText;
        }
        if (params.flySpeed !== undefined) {
            this.flySpeed = params.flySpeed;
        }
        if (params.bulletSpeed !== undefined) {
            this.bulletSpeed = params.bulletSpeed;
        }
        if (params.enemyShowTime !== undefined) {
            this.enemyShowTime = params.enemyShowTime;
        }
        if (params.bulletShowTime !== undefined) {
            this.bulletShowTime = params.bulletShowTime;
        }
        if (params.enemyPlainSize !== undefined) {
            this.enemyPlainSize = params.enemyPlainSize;
        }
        if (params.myPlainSize !== undefined) {
            this.myPlainSize = params.myPlainSize;
        }
        if (params.bulletSize !== undefined) {
            this.bulletSize = params.bulletSize;
        }
        if (params.timeOutPlain !== undefined) {
            this.timeOutPlain = params.timeOutPlain;
        }
        if (params.timeOutBullet !== undefined) {
            this.timeOutBullet = params.timeOutBullet;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.bulletIndex !== undefined) {
            this.bulletIndex = params.bulletIndex;
        }
        if (params.enemyIndex !== undefined) {
            this.enemyIndex = params.enemyIndex;
        }
        this.gameIsStart = params.gameIsStart;
        this.downY = params.downY;
        if (params.initBackgroundColor !== undefined) {
            this.initBackgroundColor = params.initBackgroundColor;
        }
        if (params.maxHeight !== undefined) {
            this.maxHeight = params.maxHeight;
        }
        this.isNotifyFinish = params.isNotifyFinish;
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__i.aboutToBeDeleted();
        this.__enemyPlainList.aboutToBeDeleted();
        this.__bulletList.aboutToBeDeleted();
        this.__myPlainY.aboutToBeDeleted();
        this.__isGameOver.aboutToBeDeleted();
        this.__tipText.aboutToBeDeleted();
        this.__gameIsStart.aboutToBeDeleted();
        this.__downY.aboutToBeDeleted();
        this.__isNotifyFinish.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefreshForGame.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForGame.Model) {
        this.__model.set(newValue);
    }
    private __i: ObservedPropertySimple<number>;
    get i() {
        return this.__i.get();
    }
    set i(newValue: number) {
        this.__i.set(newValue);
    }
    private __enemyPlainList: ObservedPropertyObject<Array<BulletModel>>; // 敌机的数组
    get enemyPlainList() {
        return this.__enemyPlainList.get();
    }
    set enemyPlainList(newValue: Array<BulletModel>) {
        this.__enemyPlainList.set(newValue);
    }
    private __bulletList: ObservedPropertyObject<Array<BulletModel>>; // 存放子弹
    get bulletList() {
        return this.__bulletList.get();
    }
    set bulletList(newValue: Array<BulletModel>) {
        this.__bulletList.set(newValue);
    }
    private __myPlainY: ObservedPropertySimple<number>; // 自己飞机的y位置
    get myPlainY() {
        return this.__myPlainY.get();
    }
    set myPlainY(newValue: number) {
        this.__myPlainY.set(newValue);
    }
    private __isGameOver: ObservedPropertySimple<boolean>; // 游戏时是否结束
    get isGameOver() {
        return this.__isGameOver.get();
    }
    set isGameOver(newValue: boolean) {
        this.__isGameOver.set(newValue);
    }
    private __tipText: ObservedPropertySimple<string>;
    get tipText() {
        return this.__tipText.get();
    }
    set tipText(newValue: string) {
        this.__tipText.set(newValue);
    }
    private flySpeed: number; // 敌机速度
    private bulletSpeed: number; // 子弹速度
    private enemyShowTime: number; // 敌机刷新时间
    private bulletShowTime: number; // 子弹刷新时间
    private enemyPlainSize: number; // 敌机大小
    private myPlainSize: number; // 自己飞机的大小
    private bulletSize: number; // 子弹大小
    private timeOutPlain: number;
    private timeOutBullet: number;
    private screenWidth: number;
    private bulletIndex: number;
    private enemyIndex: number;
    private __gameIsStart: SynchedPropertySimpleOneWay<boolean>;
    get gameIsStart() {
        return this.__gameIsStart.get();
    }
    set gameIsStart(newValue: boolean) {
        this.__gameIsStart.set(newValue);
    }
    private __downY: SynchedPropertySimpleOneWay<number>;
    get downY() {
        return this.__downY.get();
    }
    set downY(newValue: number) {
        this.__downY.set(newValue);
    }
    private initBackgroundColor: Color | string | number;
    private maxHeight: number;
    private __isNotifyFinish: SynchedPropertySimpleOneWay<boolean>;
    get isNotifyFinish() {
        return this.__isNotifyFinish.get();
    }
    set isNotifyFinish(newValue: boolean) {
        this.__isNotifyFinish.set(newValue);
    }
    private onFinishChange() {
        if (this.isNotifyFinish) {
            this.tipText = this.model.isFinishSuccess ? this.model.textLoadingFinish : this.model.textLoadingFailed;
        }
    }
    private onGameStateChange() {
        if (this.gameIsStart) {
            this.startGame();
        }
        else {
            this.stopGame();
        }
    }
    private onYStateChange() {
        if (this.downY < 0) {
            this.myPlainY = 0;
        }
        else if (this.downY > (this.maxHeight - this.myPlainSize)) {
            this.myPlainY = (this.maxHeight - this.myPlainSize);
        }
        else {
            this.myPlainY = this.downY;
        }
    }
    private startGame() {
        this.timeOutBullet = -1;
        this.timeOutPlain = -1;
        this.gameIsStart = true;
        this.isGameOver = false;
        this.tipText = this.model.textLoading;
    }
    private stopGame() {
        this.gameIsStart = false;
        this.isGameOver = false;
        this.bulletList = [];
        this.enemyPlainList = [];
        this.tipText = this.model.textLoading;
    }
    aboutToAppear() {
        setInterval(() => {
            if (this.gameIsStart) {
                if (!this.isGameOver) {
                    this.i++;
                }
                else {
                    clearTimeout(this.timeOutBullet);
                    clearTimeout(this.timeOutPlain);
                }
            }
            else {
                clearTimeout(this.timeOutBullet);
                clearTimeout(this.timeOutPlain);
                //        this.timeOutBullet = -1
                //        this.timeOutPlain = -1
            }
        }, 10);
    }
    // 主入口  绘制
    private onDraw(indexParam: number) {
        if (!this.gameIsStart) {
            return;
        }
        this.drawEnemyPlain(indexParam); // 画敌机
        this.drawBullet(indexParam); // 画子弹
        this.enemyPlainCollision(); // 判断敌机是否被子弹击中
        this.isDie(); // 判断自己是否死亡
        return '';
    }
    // 绘制敌机且让敌机移动
    private drawEnemyPlain(enemyIndex: number) {
        if (this.timeOutPlain == -1) {
            this.timeOutPlain = setTimeout(() => {
                let temp: BulletModel = {
                    index: enemyIndex,
                    x: -(this.enemyPlainSize),
                    y: Math.random() * (130 - this.enemyPlainSize)
                };
                this.enemyPlainList.push(temp);
                clearTimeout(this.timeOutPlain);
                this.timeOutPlain = -1;
            }, this.enemyShowTime);
        }
        this.enemyPlainList.forEach((item, index) => {
            item.x = item.x + this.flySpeed;
            if (item.x > this.screenWidth) {
                this.enemyPlainList.splice(index, 1);
            }
        });
        return "";
    }
    // 绘制子弹
    private drawBullet(bulletIndex: number) {
        if (this.timeOutBullet == -1) {
            this.timeOutBullet = setTimeout(() => {
                let temp: BulletModel = {
                    index: bulletIndex,
                    x: this.screenWidth - this.myPlainSize,
                    y: this.myPlainY + (this.myPlainSize / 2) - (this.bulletSize / 2),
                };
                this.bulletList.push(temp);
                clearTimeout(this.timeOutBullet);
                this.timeOutBullet = -1;
            }, this.bulletShowTime);
        }
        this.bulletList.forEach((item, index) => {
            item.x = item.x - this.bulletSpeed;
            if (item.x < -50) {
                this.bulletList.splice(index, 1);
            }
        });
    }
    //  判断敌机是否被子弹击中
    private enemyPlainCollision() {
        this.enemyPlainList.forEach((enemyItem, enemyIndex) => {
            this.bulletList.forEach((bulletItem, bulletIndex) => {
                let bulletX = bulletItem.x;
                let bulletY = bulletItem.y + (this.bulletSize / 2);
                let enemyX = enemyItem.x;
                let enemyY = enemyItem.y;
                if (((bulletX > enemyX) && (bulletX <= (enemyX + this.enemyPlainSize)))
                    &&
                        ((bulletY > enemyY) && (bulletY <= (enemyY + this.enemyPlainSize)))) {
                    this.enemyPlainList.splice(enemyIndex, 1);
                    this.bulletList.splice(bulletIndex, 1);
                }
            });
        });
    }
    // 判断自己是否死亡
    private isDie() {
        this.enemyPlainList.forEach(item => {
            let a1: number = this.screenWidth - (this.myPlainSize / 2);
            let b1: number = this.myPlainY + (this.myPlainSize / 2);
            let a2: number = item.x + (this.enemyPlainSize / 2);
            let b2: number = item.y + (this.enemyPlainSize / 2);
            let centerDistance = Math.sqrt(Math.pow((a1 - a2), 2) + Math.pow((b1 - b2), 2));
            if (centerDistance <= (this.myPlainSize / 2 + this.enemyPlainSize / 5)) {
                this.isGameOver = true;
                clearTimeout(this.timeOutBullet);
                clearTimeout(this.timeOutPlain);
                this.tipText = this.model.textGameOver;
                this.enemyPlainList = [];
                this.bulletList = [];
            }
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height(this.maxHeight);
        Text.create(this.onDraw(this.i) + '');
        Text.visibility(Visibility.None);
        Text.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height(this.maxHeight);
        Stack.backgroundColor(this.initBackgroundColor);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.enemyPlainList), (item: BulletModel) => {
            Image.create($r("app.media.plan_diren_b"));
            Image.width(50);
            Image.height(50);
            Image.translate({
                x: item.x,
                y: item.y,
                z: this.i - this.i
            });
        }, (item: BulletModel) => item.index.toString());
        ForEach.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.bulletList), (item: BulletModel) => {
            Image.create($r("app.media.zidan_b"));
            Image.width(this.bulletSize);
            Image.height(this.bulletSize);
            Image.translate({
                x: item.x,
                y: item.y,
                z: this.i - this.i
            });
        }, (item: BulletModel) => item.index.toString());
        ForEach.pop();
        Image.create($r("app.media.plan_me_b"));
        Image.width(this.myPlainSize);
        Image.height(this.myPlainSize);
        Image.translate({
            x: this.screenWidth - this.myPlainSize,
            y: this.myPlainY
        });
        //
        Text.create(this.tipText);
        //
        Text.width('100%');
        //
        Text.height('100%');
        //
        Text.textAlign(TextAlign.Center);
        //
        Text.fontSize(30);
        //
        Text.fontColor(this.initBackgroundColor == '#ffffff' ? '#000000' : '#ffffff');
        //
        Text.pop();
        Stack.pop();
        Flex.pop();
    }
}
