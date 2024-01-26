interface RecyclerView_Params {
    array?: Array<string>;
    child?: (itemData: ESObject) => void;
    controller?: RecyclerView.Controller;
    columnsNum?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecyclerView_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { FadeInAnimator } from './itemAnimator/FadeInAnimator';
import { FadeInDownAnimator } from './itemAnimator/FadeInDownAnimator';
import { FadeInUpAnimator } from './itemAnimator/FadeInUpAnimator';
import { FadeInLeftAnimator } from './itemAnimator/FadeInLeftAnimator';
import { FadeInRightAnimator } from './itemAnimator/FadeInRightAnimator';
import { LandingAnimator } from './itemAnimator/LandingAnimator';
import { ScaleInAnimator } from './itemAnimator/ScaleInAnimator';
import { ScaleInLeftAnimator } from './itemAnimator/ScaleInLeftAnimator';
import { ScaleInTopAnimator } from './itemAnimator/ScaleInTopAnimator';
import { ScaleInRightAnimator } from './itemAnimator/ScaleInRightAnimator';
import { ScaleInBottomAnimator } from './itemAnimator/ScaleInBottomAnimator';
import { SlideInLeftAnimator } from './itemAnimator/SlideInLeftAnimator';
import { SlideInRightAnimator } from './itemAnimator/SlideInRightAnimator';
import { SlideInUpAnimator } from './itemAnimator/SlideInUpAnimator';
import { SlideInDownAnimator } from './itemAnimator/SlideInDownAnimator';
import { OvershootInLeftAnimator } from './itemAnimator/OvershootInLeftAnimator';
import { OvershootInRightAnimator } from './itemAnimator/OvershootInRightAnimator';
import { SlideInLeftAnimationAdapter } from './adapterAnimator/SlideInLeftAnimationAdapter';
import { AlphaInAnimationAdapter } from './adapterAnimator/AlphaInAnimationAdapter';
import { ScaleInAnimationAdapter } from './adapterAnimator/ScaleInAnimationAdapter';
import { SlideInRightAnimationAdapter } from './adapterAnimator/SlideInRightAnimationAdapter';
import { SlideInBottomAnimationAdapter } from './adapterAnimator/SlideInBottomAnimationAdapter';
class RecyclerView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.array = [];
        this.child = undefined;
        this.__controller = new ObservedPropertyObject(new RecyclerView.Controller(), this, "controller");
        this.columnsNum = 1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RecyclerView_Params) {
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.child !== undefined) {
            this.child = params.child;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.columnsNum !== undefined) {
            this.columnsNum = params.columnsNum;
        }
    }
    aboutToBeDeleted() {
        this.__controller.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private array: Array<string>;
    private __child;
    private __controller: ObservedPropertyObject<RecyclerView.Controller>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: RecyclerView.Controller) {
        this.__controller.set(newValue);
    }
    private columnsNum: number;
    render() {
        If.create();
        if (this.controller.adapterAnimation !== null) {
            If.branchId(0);
            If.create();
            if (this.controller.adapterAnimation == RecyclerView.AdapterAnimationType.AlphaIn) {
                If.branchId(0);
                let earlierCreatedChild_2: AlphaInAnimationAdapter = (this && this.findChildById) ? this.findChildById("2") as AlphaInAnimationAdapter : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new AlphaInAnimationAdapter("2", this, {
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_2);
                }
            }
            else if (this.controller.adapterAnimation == RecyclerView.AdapterAnimationType.ScaleIn) {
                If.branchId(1);
                let earlierCreatedChild_3: ScaleInAnimationAdapter = (this && this.findChildById) ? this.findChildById("3") as ScaleInAnimationAdapter : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new ScaleInAnimationAdapter("3", this, {
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_3);
                }
            }
            else if (this.controller.adapterAnimation == RecyclerView.AdapterAnimationType.SlideInBottom) {
                If.branchId(2);
                let earlierCreatedChild_4: SlideInBottomAnimationAdapter = (this && this.findChildById) ? this.findChildById("4") as SlideInBottomAnimationAdapter : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new SlideInBottomAnimationAdapter("4", this, {
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_4);
                }
            }
            else if (this.controller.adapterAnimation == RecyclerView.AdapterAnimationType.SlideInLeft) {
                If.branchId(3);
                let earlierCreatedChild_5: SlideInLeftAnimationAdapter = (this && this.findChildById) ? this.findChildById("5") as SlideInLeftAnimationAdapter : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new SlideInLeftAnimationAdapter("5", this, {
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_5);
                }
            }
            else if (this.controller.adapterAnimation == RecyclerView.AdapterAnimationType.SlideInRight) {
                If.branchId(4);
                let earlierCreatedChild_6: SlideInRightAnimationAdapter = (this && this.findChildById) ? this.findChildById("6") as SlideInRightAnimationAdapter : undefined;
                if (earlierCreatedChild_6 == undefined) {
                    View.create(new SlideInRightAnimationAdapter("6", this, {
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_6.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_6);
                }
            }
            If.pop();
        }
        else {
            If.branchId(1);
            If.create();
            if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.FadeIn) {
                If.branchId(0);
                let earlierCreatedChild_7: FadeInAnimator = (this && this.findChildById) ? this.findChildById("7") as FadeInAnimator : undefined;
                if (earlierCreatedChild_7 == undefined) {
                    View.create(new FadeInAnimator("7", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_7.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_7);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.FadeInDown) {
                If.branchId(1);
                let earlierCreatedChild_8: FadeInDownAnimator = (this && this.findChildById) ? this.findChildById("8") as FadeInDownAnimator : undefined;
                if (earlierCreatedChild_8 == undefined) {
                    View.create(new FadeInDownAnimator("8", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_8.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_8);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.FadeInUp) {
                If.branchId(2);
                let earlierCreatedChild_9: FadeInUpAnimator = (this && this.findChildById) ? this.findChildById("9") as FadeInUpAnimator : undefined;
                if (earlierCreatedChild_9 == undefined) {
                    View.create(new FadeInUpAnimator("9", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_9.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_9);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.FadeInLeft) {
                If.branchId(3);
                let earlierCreatedChild_10: FadeInLeftAnimator = (this && this.findChildById) ? this.findChildById("10") as FadeInLeftAnimator : undefined;
                if (earlierCreatedChild_10 == undefined) {
                    View.create(new FadeInLeftAnimator("10", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_10.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_10);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.FadeInRight) {
                If.branchId(4);
                let earlierCreatedChild_11: FadeInRightAnimator = (this && this.findChildById) ? this.findChildById("11") as FadeInRightAnimator : undefined;
                if (earlierCreatedChild_11 == undefined) {
                    View.create(new FadeInRightAnimator("11", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_11.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_11);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.Landing) {
                If.branchId(5);
                let earlierCreatedChild_12: LandingAnimator = (this && this.findChildById) ? this.findChildById("12") as LandingAnimator : undefined;
                if (earlierCreatedChild_12 == undefined) {
                    View.create(new LandingAnimator("12", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_12.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_12);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.ScaleIn) {
                If.branchId(6);
                let earlierCreatedChild_13: ScaleInAnimator = (this && this.findChildById) ? this.findChildById("13") as ScaleInAnimator : undefined;
                if (earlierCreatedChild_13 == undefined) {
                    View.create(new ScaleInAnimator("13", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_13.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_13);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.ScaleInLeft) {
                If.branchId(7);
                let earlierCreatedChild_14: ScaleInLeftAnimator = (this && this.findChildById) ? this.findChildById("14") as ScaleInLeftAnimator : undefined;
                if (earlierCreatedChild_14 == undefined) {
                    View.create(new ScaleInLeftAnimator("14", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_14.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_14);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.ScaleInRight) {
                If.branchId(8);
                let earlierCreatedChild_15: ScaleInRightAnimator = (this && this.findChildById) ? this.findChildById("15") as ScaleInRightAnimator : undefined;
                if (earlierCreatedChild_15 == undefined) {
                    View.create(new ScaleInRightAnimator("15", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_15.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_15);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.ScaleInTop) {
                If.branchId(9);
                let earlierCreatedChild_16: ScaleInTopAnimator = (this && this.findChildById) ? this.findChildById("16") as ScaleInTopAnimator : undefined;
                if (earlierCreatedChild_16 == undefined) {
                    View.create(new ScaleInTopAnimator("16", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_16.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_16);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.ScaleInBottom) {
                If.branchId(10);
                let earlierCreatedChild_17: ScaleInBottomAnimator = (this && this.findChildById) ? this.findChildById("17") as ScaleInBottomAnimator : undefined;
                if (earlierCreatedChild_17 == undefined) {
                    View.create(new ScaleInBottomAnimator("17", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_17.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_17);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.SlideInLeft) {
                If.branchId(11);
                let earlierCreatedChild_18: SlideInLeftAnimator = (this && this.findChildById) ? this.findChildById("18") as SlideInLeftAnimator : undefined;
                if (earlierCreatedChild_18 == undefined) {
                    View.create(new SlideInLeftAnimator("18", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_18.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_18);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.SlideInRight) {
                If.branchId(12);
                let earlierCreatedChild_19: SlideInRightAnimator = (this && this.findChildById) ? this.findChildById("19") as SlideInRightAnimator : undefined;
                if (earlierCreatedChild_19 == undefined) {
                    View.create(new SlideInRightAnimator("19", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_19.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_19);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.SlideInUp) {
                If.branchId(13);
                let earlierCreatedChild_20: SlideInUpAnimator = (this && this.findChildById) ? this.findChildById("20") as SlideInUpAnimator : undefined;
                if (earlierCreatedChild_20 == undefined) {
                    View.create(new SlideInUpAnimator("20", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_20.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_20);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.SlideInDown) {
                If.branchId(14);
                let earlierCreatedChild_21: SlideInDownAnimator = (this && this.findChildById) ? this.findChildById("21") as SlideInDownAnimator : undefined;
                if (earlierCreatedChild_21 == undefined) {
                    View.create(new SlideInDownAnimator("21", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_21.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_21);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.OvershootInLeft) {
                If.branchId(15);
                let earlierCreatedChild_22: OvershootInLeftAnimator = (this && this.findChildById) ? this.findChildById("22") as OvershootInLeftAnimator : undefined;
                if (earlierCreatedChild_22 == undefined) {
                    View.create(new OvershootInLeftAnimator("22", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_22.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_22);
                }
            }
            else if (this.controller.itemAnimation == RecyclerView.ItemAnimationType.OvershootInRight) {
                If.branchId(16);
                let earlierCreatedChild_23: OvershootInRightAnimator = (this && this.findChildById) ? this.findChildById("23") as OvershootInRightAnimator : undefined;
                if (earlierCreatedChild_23 == undefined) {
                    View.create(new OvershootInRightAnimator("23", this, {
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_23.updateWithValueParams({
                        array: this.array,
                        controller: this.controller,
                        columnsNum: this.columnsNum,
                        child: (itemData: any) => {
                            this.child(itemData);
                        }
                    });
                    View.create(earlierCreatedChild_23);
                }
            }
            If.pop();
        }
        If.pop();
    }
}
export default RecyclerView;
namespace RecyclerView {
    export enum ItemAnimationType {
        FadeIn,
        FadeInDown,
        FadeInUp,
        FadeInLeft,
        FadeInRight,
        Landing,
        ScaleIn,
        ScaleInLeft,
        ScaleInRight,
        ScaleInTop,
        ScaleInBottom,
        SlideInLeft,
        SlideInRight,
        SlideInUp,
        SlideInDown,
        OvershootInLeft,
        OvershootInRight
    }
    export enum AdapterAnimationType {
        AlphaIn,
        ScaleIn,
        SlideInBottom,
        SlideInLeft,
        SlideInRight // 从右侧平移进入
    }
    export class Controller {
        addValueCallback: (index: number, value: any) => void = () => { };
        deleteValueCallback: (index: number) => void = () => { };
        duration: number = 500;
        itemAnimation = RecyclerView.ItemAnimationType.FadeIn;
        adapterAnimation: any = null;
        isFirstOnly: boolean = false;
        mWidth: number = 480;
        mHeight: number = 855;
        public addValue(index: number, value: any) {
            this.addValueCallback(index, value);
        }
        public deleteValue(index: number) {
            this.deleteValueCallback(index);
        }
        public setDuration(duration: number) {
            this.duration = duration;
        }
        public setItemAnimation(itemAnimation: RecyclerView.ItemAnimationType) {
            this.itemAnimation = itemAnimation;
        }
        public setAdapterAnimation(adapterAnimation: RecyclerView.AdapterAnimationType) {
            this.adapterAnimation = adapterAnimation;
        }
        public setFirstOnly(isFirstOnly: boolean) {
            this.isFirstOnly = isFirstOnly;
        }
        public setWidth(width: number) {
            this.mWidth = width;
            return this;
        }
        public setHeight(height: number) {
            this.mHeight = height;
            return this;
        }
    }
    export class ArrayType {
        isNewValue: boolean;
        value: any;
        constructor(isNewValue: boolean, value: any) {
            this.isNewValue = isNewValue;
            this.value = value;
        }
    }
    export class AnimationAdapterTypeData {
        animationAdapterKey: number;
        value: any;
        constructor(animationAdapterKey: number, value: any) {
            this.animationAdapterKey = animationAdapterKey;
            this.value = value;
        }
    }
}
