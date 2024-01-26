interface TransitionsAnimation_Params {
    isLand?: boolean;
    pageCountDown?: number;
    listener?;
    gotoNav?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import window from '@ohos.window';
import mediaQuery from '@ohos.mediaquery';
const SKIP_COUNTDOWN: number = 3; // 第一段进场动画用时3s
interface MediaQueryResult {
    matches: boolean;
}
export class TransitionsAnimation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isLand = new ObservedPropertySimple(false, this, "isLand");
        this.__pageCountDown = new ObservedPropertySimple(6 // 进场动画总用时6s
        , this, "pageCountDown");
        this.listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)');
        this.gotoNav = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TransitionsAnimation_Params) {
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.pageCountDown !== undefined) {
            this.pageCountDown = params.pageCountDown;
        }
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
        if (params.gotoNav !== undefined) {
            this.gotoNav = params.gotoNav;
        }
    }
    aboutToBeDeleted() {
        this.__isLand.aboutToBeDeleted();
        this.__pageCountDown.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isLand: ObservedPropertySimple<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private __pageCountDown: ObservedPropertySimple<number>; // 进场动画总用时6s
    get pageCountDown() {
        return this.__pageCountDown.get();
    }
    set pageCountDown(newValue: number) {
        this.__pageCountDown.set(newValue);
    }
    private listener;
    private gotoNav: () => void;
    aboutToAppear() {
        this.listener.on('change', (mediaQueryResult: MediaQueryResult): void => {
            this.isLand = mediaQueryResult.matches;
        });
        window.getLastWindow(getContext(this)).then((result: window.Window) => {
            result.setWindowSystemBarEnable([]);
        });
        let timer = setInterval(() => {
            this.pageCountDown--;
            if (this.pageCountDown == 0) {
                window.getLastWindow(getContext(this)).then((result: window.Window) => {
                    result.setWindowSystemBarEnable(['status', 'navigation']);
                });
                this.gotoNav(); // 6秒后执行gotoNav函数跳转到首页
                clearInterval(timer); // 关闭定时器
            }
        }, 1000);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.backgroundColor('#f1f3f5');
        If.create();
        if (this.pageCountDown > SKIP_COUNTDOWN) {
            If.branchId(0);
            Image.create($r('app.media.enter_app'));
            Image.objectFit(ImageFit.Contain);
        }
        else if (this.pageCountDown <= SKIP_COUNTDOWN) {
            If.branchId(1);
            Column.create();
            Row.create();
            Row.margin({ top: this.isLand ? '10vp' : '181vp' });
            Image.create($r('app.media.enter_app_animation'));
            Image.objectFit(ImageFit.Contain);
            Image.width(this.isLand ? '60%' : '80%');
            Image.aspectRatio(1.4);
            Row.pop();
            Column.create();
            Column.margin({ top: this.isLand ? '10vp' : '200vp' });
            Text.create($r('app.string.shopping'));
            Text.fontSize(24);
            Text.pop();
            Text.create($r('app.string.shoppingAdvertising'));
            Text.margin({ top: 10 });
            Text.fontSize(20);
            Text.opacity(0.6);
            Text.pop();
            Column.pop();
            Column.pop();
            Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
            Flex.position({ x: this.isLand ? '85%' : '75.3%', y: '3%' });
            Flex.width(this.isLand ? '10%' : '18.9%');
            Flex.aspectRatio(2.4);
            Flex.backgroundColor('rgba(0,0,0,0.3)');
            Flex.borderRadius('18vp');
            Flex.onClick(() => {
                window.getLastWindow(getContext(this)).then((result: window.Window) => {
                    result.setWindowSystemBarEnable(['status', 'navigation']);
                });
                this.pageCountDown = 0;
                router.push({ url: 'pages/Index' });
            });
            Text.create($r('app.string.skip'));
            Text.fontSize('16vp');
            Text.textAlign(TextAlign.Center);
            Text.fontColor('#FFFFFF');
            Text.pop();
            Text.create(`${this.pageCountDown}`);
            Text.fontSize('16vp');
            Text.textAlign(TextAlign.Center);
            Text.fontColor('#FFFFFF');
            Text.margin({ left: '4vp' });
            Text.pop();
            Flex.pop();
        }
        If.pop();
        Flex.pop();
    }
}
loadDocument(new TransitionsAnimation("1", undefined, {}));
