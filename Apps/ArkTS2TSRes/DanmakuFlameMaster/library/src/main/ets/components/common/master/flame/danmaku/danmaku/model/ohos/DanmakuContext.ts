let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuContext_" + ++__generate__Id;
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
import { AlphaValue } from '../AlphaValue';
import { AbsDanmakuSync } from '../AbsDanmakuSync';
import { AbsDisplayer } from '../AbsDisplayer';
import { BaseDanmaku } from '../BaseDanmaku';
import { GlobalFlagValues } from '../GlobalFlagValues';
import { BaseComparator } from '../IDanmakus';
import { DanmakuFactory } from '../ohos/DanmakuFactory';
import { BaseCacheStuffer, Proxy } from '../ohos/BaseCacheStuffer';
import { DanmakuFilters, IDanmakuFilter, BaseDanmakuFilter } from '../../../controller/DanmakuFilters';
import { OhosDisplayer } from './OhosDisplayer';
export enum DanmakuConfigTag {
    FT_DANMAKU_VISIBILITY,
    FB_DANMAKU_VISIBILITY,
    L2R_DANMAKU_VISIBILITY,
    R2L_DANMAKU_VISIBILIY,
    SPECIAL_DANMAKU_VISIBILITY,
    TYPEFACE,
    TRANSPARENCY,
    SCALE_TEXTSIZE,
    MAXIMUM_NUMS_IN_SCREEN,
    DANMAKU_STYLE,
    DANMAKU_BOLD,
    COLOR_VALUE_WHITE_LIST,
    USER_ID_BLACK_LIST,
    USER_HASH_BLACK_LIST,
    SCROLL_SPEED_FACTOR,
    BLOCK_GUEST_DANMAKU,
    DUPLICATE_MERGING_ENABLED,
    MAXIMUN_LINES,
    OVERLAPPING_ENABLE,
    ALIGN_BOTTOM,
    DANMAKU_MARGIN,
    DANMAKU_SYNC
}
export function isVisibilityRelatedTag(tag: DanmakuConfigTag): boolean {
    return (tag === DanmakuConfigTag.FT_DANMAKU_VISIBILITY || tag === DanmakuConfigTag.FB_DANMAKU_VISIBILITY
        || tag === DanmakuConfigTag.L2R_DANMAKU_VISIBILITY || tag === DanmakuConfigTag.R2L_DANMAKU_VISIBILIY
        || tag === DanmakuConfigTag.SPECIAL_DANMAKU_VISIBILITY || tag === DanmakuConfigTag.COLOR_VALUE_WHITE_LIST
        || tag === DanmakuConfigTag.USER_ID_BLACK_LIST);
}
export interface ConfigChangedCallback {
    onDanmakuConfigChanged(config: DanmakuContext, tag: DanmakuConfigTag, value: any[]): boolean;
}
export class DanmakuContext {
    public static create(): DanmakuContext {
        return new DanmakuContext();
    }
    /**
       * Ĭ������
       */
    public mFont: string | any = null;
    /**
       * paint alpha:0-255
       */
    public transparency: number = AlphaValue.MAX;
    public scaleTextSize: number = 1.0;
    public margin: number = 0;
    /**
       * ��Ļ��ʾ��������
       */
    public FTDanmakuVisibility: boolean = true;
    public FBDanmakuVisibility: boolean = true;
    public L2RDanmakuVisibility: boolean = true;
    public R2LDanmakuVisibility: boolean = true;
    public SpecialDanmakuVisibility: boolean = true;
    mFilterTypes: number[] = new Array<number>();
    /**
       * ͬ����Ļ���� -1 ������Ч���Զ����� 0 ������ n ͬ�������ʾn����Ļ
       */
    public maximumNumsInScreen: number = -1;
    /**
       * Ĭ�Ϲ����ٶ�ϵ��
       */
    public scrollSpeedFactor: number = 1.0;
    public danmakuSync: AbsDanmakuSync | any;
    mColorValueWhiteList: number[] = new Array<number>();
    mUserIdBlackList: number[] = new Array<number>();
    mUserHashBlackList: string[] = new Array<string>();
    private mCallbackList: Array<ConfigChangedCallback> | any = null;
    private mBlockGuestDanmaku: boolean = false;
    private mDuplicateMergingEnable: boolean = false;
    private mIsAlignBottom: boolean = false;
    private mCacheStuffer: BaseCacheStuffer | any;
    private mIsMaxLinesLimited: boolean = true;
    private mIsPreventOverlappingEnabled: boolean = true;
    public mDisplayer: AbsDisplayer<any, any> = new OhosDisplayer();
    public mGlobalFlagValues: GlobalFlagValues = new GlobalFlagValues();
    public mDanmakuFilters: DanmakuFilters = new DanmakuFilters();
    public mDanmakuFactory: DanmakuFactory = DanmakuFactory.create();
    private mBaseComparator: BaseComparator | any;
    public getBaseComparator(): BaseComparator {
        return this.mBaseComparator;
    }
    public setBaseComparator(baseComparator: BaseComparator) {
        this.mBaseComparator = baseComparator;
    }
    public getDisplayer(): AbsDisplayer<any, any> {
        return this.mDisplayer;
    }
    //    /**
    //     * set typeface
    //     *
    //     * @param font
    //     */
    public setTypeface(font: string): DanmakuContext {
        if (this.mFont != font) {
            this.mFont = font;
            this.mDisplayer.clearTextHeightCache();
            this.mDisplayer.setTypeFace(font);
            this.notifyConfigureChanged(DanmakuConfigTag.TYPEFACE);
        }
        return this;
    }
    public setDanmakuTransparency(p: number): DanmakuContext {
        let newTransparency: number = (p * AlphaValue.MAX);
        if (newTransparency != this.transparency) {
            this.transparency = newTransparency;
            this.mDisplayer.setTransparency(newTransparency);
            this.notifyConfigureChanged(DanmakuConfigTag.TRANSPARENCY, p);
        }
        return this;
    }
    public setScaleTextSize(p: number): DanmakuContext {
        if (this.scaleTextSize != p) {
            this.scaleTextSize = p;
            this.mDisplayer.clearTextHeightCache();
            this.mDisplayer.setScaleTextSizeFactor(p);
            this.mGlobalFlagValues.updateMeasureFlag();
            this.mGlobalFlagValues.updateVisibleFlag();
            this.notifyConfigureChanged(DanmakuConfigTag.SCALE_TEXTSIZE, p);
        }
        return this;
    }
    public setDanmakuMargin(m: number): DanmakuContext {
        if (this.margin != m) {
            this.margin = m;
            this.mDisplayer.setMargin(m);
            this.mGlobalFlagValues.updateFilterFlag();
            this.mGlobalFlagValues.updateVisibleFlag();
            this.notifyConfigureChanged(DanmakuConfigTag.DANMAKU_MARGIN, m);
        }
        return this;
    }
    public setMarginTop(m: number): DanmakuContext {
        this.mDisplayer.setAllMarginTop(m);
        return this;
    }
    /**
     * @return �Ƿ���ʾ������Ļ
     */
    public getFTDanmakuVisibility(): boolean {
        return this.FTDanmakuVisibility;
    }
    /**
     * �����Ƿ���ʾ������Ļ
     *
     * @param visible
     */
    public setFTDanmakuVisibility(visible: boolean): DanmakuContext {
        this.setDanmakuVisible(visible, BaseDanmaku.TYPE_FIX_TOP);
        this.setFilterData(DanmakuFilters.TAG_TYPE_DANMAKU_FILTER, this.mFilterTypes);
        this.mGlobalFlagValues.updateFilterFlag();
        if (this.FTDanmakuVisibility != visible) {
            this.FTDanmakuVisibility = visible;
            this.notifyConfigureChanged(DanmakuConfigTag.FT_DANMAKU_VISIBILITY, visible);
        }
        return this;
    }
    private setFilterData<T>(tag: string, data: T, primary?: boolean) {
        if (primary === undefined) {
            this.setFilterData(tag, data, true);
        }
        else {
            let filter: IDanmakuFilter<T> = this.mDanmakuFilters.get(tag, primary) as IDanmakuFilter<T>;
            filter.setData(data);
        }
    }
    private setDanmakuVisible(visible: boolean, filterType: number) {
        let index: number = this.mFilterTypes.indexOf(filterType);
        if (visible) {
            if (index >= 0) {
                this.mFilterTypes.splice(index, 1);
            }
        }
        else if (index < 0 && index == undefined) {
            this.mFilterTypes.push(filterType);
        }
    }
    /**
     * @return �Ƿ���ʾ�ײ���Ļ
     */
    public getFBDanmakuVisibility(): boolean {
        return this.FBDanmakuVisibility;
    }
    /**
     * �����Ƿ���ʾ�ײ���Ļ
     *
     * @param visible
     */
    public setFBDanmakuVisibility(visible: boolean): DanmakuContext {
        this.setDanmakuVisible(visible, BaseDanmaku.TYPE_FIX_BOTTOM);
        this.setFilterData(DanmakuFilters.TAG_TYPE_DANMAKU_FILTER, this.mFilterTypes);
        this.mGlobalFlagValues.updateFilterFlag();
        if (this.FBDanmakuVisibility != visible) {
            this.FBDanmakuVisibility = visible;
            this.notifyConfigureChanged(DanmakuConfigTag.FB_DANMAKU_VISIBILITY, visible);
        }
        return this;
    }
    /**
     * @return �Ƿ���ʾ���ҹ�����Ļ
     */
    public getL2RDanmakuVisibility(): boolean {
        return this.L2RDanmakuVisibility;
    }
    /**
     * �����Ƿ���ʾ���ҹ�����Ļ
     *
     * @param visible
     */
    public setL2RDanmakuVisibility(visible: boolean): DanmakuContext {
        this.setDanmakuVisible(visible, BaseDanmaku.TYPE_SCROLL_LR);
        this.setFilterData(DanmakuFilters.TAG_TYPE_DANMAKU_FILTER, this.mFilterTypes);
        this.mGlobalFlagValues.updateFilterFlag();
        if (this.L2RDanmakuVisibility != visible) {
            this.L2RDanmakuVisibility = visible;
            this.notifyConfigureChanged(DanmakuConfigTag.L2R_DANMAKU_VISIBILITY, visible);
        }
        return this;
    }
    /**
     * @return �Ƿ���ʾ���������Ļ
     */
    public getR2LDanmakuVisibility(): boolean {
        return this.R2LDanmakuVisibility;
    }
    /**
     * �����Ƿ���ʾ���������Ļ
     *
     * @param visible
     */
    public setR2LDanmakuVisibility(visible: boolean): DanmakuContext {
        this.setDanmakuVisible(visible, BaseDanmaku.TYPE_SCROLL_RL);
        this.setFilterData(DanmakuFilters.TAG_TYPE_DANMAKU_FILTER, this.mFilterTypes);
        this.mGlobalFlagValues.updateFilterFlag();
        if (this.R2LDanmakuVisibility != visible) {
            this.R2LDanmakuVisibility = visible;
            this.notifyConfigureChanged(DanmakuConfigTag.R2L_DANMAKU_VISIBILIY, visible);
        }
        return this;
    }
    /**
     * @return �Ƿ���ʾ���ⵯĻ
     */
    public getSpecialDanmakuVisibility(): boolean {
        return this.SpecialDanmakuVisibility;
    }
    /**
     * �����Ƿ���ʾ���ⵯĻ
     *
     * @param visible
     */
    public setSpecialDanmakuVisibility(visible: boolean): DanmakuContext {
        this.setDanmakuVisible(visible, BaseDanmaku.TYPE_SPECIAL);
        this.setFilterData(DanmakuFilters.TAG_TYPE_DANMAKU_FILTER, this.mFilterTypes);
        this.mGlobalFlagValues.updateFilterFlag();
        if (this.SpecialDanmakuVisibility != visible) {
            this.SpecialDanmakuVisibility = visible;
            this.notifyConfigureChanged(DanmakuConfigTag.SPECIAL_DANMAKU_VISIBILITY, visible);
        }
        return this;
    }
    /**
     * ����ͬ����Ļ�ܶ� -1�Զ� 0������
     *
     * @param maxSize
     * @return
     */
    public setMaximumVisibleSizeInScreen(maxSize: number): DanmakuContext {
        this.maximumNumsInScreen = maxSize;
        // ������
        if (maxSize == 0) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_QUANTITY_DANMAKU_FILTER });
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_ELAPSED_TIME_FILTER });
            this.notifyConfigureChanged(DanmakuConfigTag.MAXIMUM_NUMS_IN_SCREEN, maxSize);
            return this;
        }
        // �Զ�����
        if (maxSize == -1) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_QUANTITY_DANMAKU_FILTER });
            this.mDanmakuFilters.registerFilter({ tag: DanmakuFilters.TAG_ELAPSED_TIME_FILTER });
            this.notifyConfigureChanged(DanmakuConfigTag.MAXIMUM_NUMS_IN_SCREEN, maxSize);
            return this;
        }
        this.setFilterData(DanmakuFilters.TAG_QUANTITY_DANMAKU_FILTER, maxSize);
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.MAXIMUM_NUMS_IN_SCREEN, maxSize);
        return this;
    }
    /**
       * ���������ʽ
       *
       * @param style DANMAKU_STYLE_NONE DANMAKU_STYLE_SHADOW or
       *            DANMAKU_STYLE_STROKEN or DANMAKU_STYLE_PROJECTION
       * @param values
       *        DANMAKU_STYLE_SHADOW ��Ӱģʽ�£�values������Ӱ�뾶
       *        DANMAKU_STYLE_STROKEN ���ģʽ�£�values������߿��
       *        DANMAKU_STYLE_PROJECTION
       *            ͶӰģʽ�£�values����offsetX, offsetY, alpha
       *                offsetX/offsetY: x/y �����ϵ�ƫ����
       *                alpha: ͶӰ͸���� [0...255]
       * @return
       */
    public setDanmakuStyle(style: number, ...values: number[]): DanmakuContext {
        this.mDisplayer.setDanmakuStyle(style, values);
        this.notifyConfigureChanged(DanmakuConfigTag.DANMAKU_STYLE, [style, values]);
        return this;
    }
    /**
     * �����Ƿ������ʾ,��ĳЩ������Ч
     *
     * @param bold
     * @return
     */
    public setDanmakuBold(bold: boolean): DanmakuContext {
        this.mDisplayer.setFakeBoldText(bold);
        this.notifyConfigureChanged(DanmakuConfigTag.DANMAKU_BOLD, bold);
        return this;
    }
    /**
       * ����ɫ�ʹ��˵�Ļ������
       * @param colors
       * @return
       */
    public setColorValueWhiteList(colors: number[]): DanmakuContext {
        this.mColorValueWhiteList.splice(0, this.mColorValueWhiteList.length);
        if (colors == null || colors.length == 0) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_TEXT_COLOR_DANMAKU_FILTER });
        }
        else {
            this.mColorValueWhiteList.push(...colors);
            this.setFilterData(DanmakuFilters.TAG_TEXT_COLOR_DANMAKU_FILTER, this.mColorValueWhiteList);
        }
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.COLOR_VALUE_WHITE_LIST, this.mColorValueWhiteList);
        return this;
    }
    public getColorValueWhiteList(): number[] {
        return this.mColorValueWhiteList;
    }
    /**
     * �������ε�Ļ�û�hash
     * @param hashes
     * @return
     */
    public setUserHashBlackList(hashes: string[]): DanmakuContext {
        this.mUserHashBlackList.splice(0, this.mUserHashBlackList.length);
        if (hashes == null || hashes.length == 0) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_USER_HASH_FILTER });
        }
        else {
            this.mUserHashBlackList.push(...hashes);
            this.setFilterData(DanmakuFilters.TAG_USER_HASH_FILTER, this.mUserHashBlackList);
        }
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_HASH_BLACK_LIST, this.mUserHashBlackList);
        return this;
    }
    public removeUserHashBlackList(hashes: string[]): DanmakuContext {
        if (hashes == null || hashes.length == 0) {
            return this;
        }
        hashes.forEach((hash: string) => {
            if (hash == null) {
                let index: number = 0;
                for (index; index < this.mUserHashBlackList.length; index++)
                    if (this.mUserHashBlackList[index] == null) { //�ҵ���һ����Ԫ��,��ɾ����
                        this.mUserHashBlackList.splice(index, 1);
                        return true;
                    }
            }
            else {
                let index: number = 0;
                for (index; index < this.mUserHashBlackList.length; index++)
                    if (this.mUserHashBlackList[index] == hash) {
                        this.mUserHashBlackList.splice(index, 1);
                        return true;
                    }
            }
            return false;
        });
        this.setFilterData(DanmakuFilters.TAG_USER_HASH_FILTER, this.mUserHashBlackList);
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_HASH_BLACK_LIST, this.mUserHashBlackList);
        return this;
    }
    /**
     * ��������û�
     * @param hashes
     * @return
     */
    public addUserHashBlackList(hashes: string[]): DanmakuContext {
        if (hashes == null || hashes.length == 0) {
            return this;
        }
        this.mUserHashBlackList.push(...hashes);
        this.setFilterData(DanmakuFilters.TAG_USER_HASH_FILTER, this.mUserHashBlackList);
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_HASH_BLACK_LIST, this.mUserHashBlackList);
        return this;
    }
    public getUserHashBlackList(): string[] {
        return this.mUserHashBlackList;
    }
    /**
     * �������ε�Ļ�û�id , 0 ��ʾ�ο͵�Ļ
     * @param ids
     * @return
     */
    public setUserIdBlackList(ids: number[]): DanmakuContext {
        this.mUserIdBlackList.splice(0, this.mUserIdBlackList.length);
        if (ids == null || ids.length == 0) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_USER_ID_FILTER });
        }
        else {
            this.mUserIdBlackList.push(...ids);
            this.setFilterData(DanmakuFilters.TAG_USER_ID_FILTER, this.mUserIdBlackList);
        }
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_ID_BLACK_LIST, this.mUserIdBlackList);
        return this;
    }
    public removeUserIdBlackList(ids: number[]): DanmakuContext {
        if (ids == null || ids.length == 0) {
            return this;
        }
        ids.forEach((id: number) => {
            let index: number = this.mUserIdBlackList.indexOf(id);
            if (index >= 0) {
                this.mUserIdBlackList.splice(index, 1);
            }
        });
        this.setFilterData(DanmakuFilters.TAG_USER_ID_FILTER, this.mUserIdBlackList);
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_ID_BLACK_LIST, this.mUserIdBlackList);
        return this;
    }
    /**
     * ��������û�
     * @param ids
     * @return
     */
    public addUserIdBlackList(ids: number[]): DanmakuContext {
        if (ids == null || ids.length == 0) {
            return this;
        }
        this.mUserIdBlackList.push(...ids);
        this.setFilterData(DanmakuFilters.TAG_USER_ID_FILTER, this.mUserIdBlackList);
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.USER_ID_BLACK_LIST, this.mUserIdBlackList);
        return this;
    }
    public getUserIdBlackList(): number[] {
        return this.mUserIdBlackList;
    }
    /**
     * �����Ƿ������ο͵�Ļ
     * @param block true���Σ�false������
     * @return
     */
    public blockGuestDanmaku(block: boolean): DanmakuContext {
        if (this.mBlockGuestDanmaku != block) {
            this.mBlockGuestDanmaku = block;
            if (block) {
                this.setFilterData(DanmakuFilters.TAG_GUEST_FILTER, block);
            }
            else {
                this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_GUEST_FILTER });
            }
            this.mGlobalFlagValues.updateFilterFlag();
            this.notifyConfigureChanged(DanmakuConfigTag.BLOCK_GUEST_DANMAKU, block);
        }
        return this;
    }
    /**
     * ���õ�Ļ�����ٶ�ϵ��,ֻ�Թ�����Ļ��Ч
     * @param p
     * @return
     */
    public setScrollSpeedFactor(p: number): DanmakuContext {
        if (this.scrollSpeedFactor != p) {
            this.scrollSpeedFactor = p;
            this.mDanmakuFactory.updateDurationFactor(p);
            this.mGlobalFlagValues.updateMeasureFlag();
            this.mGlobalFlagValues.updateVisibleFlag();
            this.notifyConfigureChanged(DanmakuConfigTag.SCROLL_SPEED_FACTOR, p);
        }
        return this;
    }
    /**
     * �����Ƿ����úϲ��ظ���Ļ
     * @param enable
     * @return
     */
    public setDuplicateMergingEnabled(enable: boolean): DanmakuContext {
        if (this.mDuplicateMergingEnable != enable) {
            this.mDuplicateMergingEnable = enable;
            this.mGlobalFlagValues.updateFilterFlag();
            this.notifyConfigureChanged(DanmakuConfigTag.DUPLICATE_MERGING_ENABLED, enable);
        }
        return this;
    }
    public isDuplicateMergingEnabled(): boolean {
        return this.mDuplicateMergingEnable;
    }
    public alignBottom(enable: boolean): DanmakuContext {
        if (this.mIsAlignBottom != enable) {
            this.mIsAlignBottom = enable;
            this.notifyConfigureChanged(DanmakuConfigTag.ALIGN_BOTTOM, enable);
            this.mGlobalFlagValues.updateVisibleFlag();
        }
        return this;
    }
    public isAlignBottom(): boolean {
        return this.mIsAlignBottom;
    }
    /**
       * ���������ʾ����
       * @param pairs map<K,V> ����nullȡ����������
       * K = (BaseDanmaku.TYPE_SCROLL_RL|BaseDanmaku.TYPE_SCROLL_LR|BaseDanmaku.TYPE_FIX_TOP|BaseDanmaku.TYPE_FIX_BOTTOM)
       * V = �������
       * @return
       */
    public setMaximumLines(pairs: Map<number, number>): DanmakuContext {
        this.mIsMaxLinesLimited = (pairs != null);
        if (pairs == null) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_MAXIMUN_LINES_FILTER, primary: false });
        }
        else {
            this.setFilterData(DanmakuFilters.TAG_MAXIMUN_LINES_FILTER, pairs, false);
        }
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.MAXIMUN_LINES, pairs);
        return this;
    }
    public setOverlapping(pairs: Map<number, boolean>): DanmakuContext {
        return this.preventOverlapping(pairs);
    }
    /**
     * ���÷���Ļ�ص�
     * @param pairs map<K,V> ����null�ָ�Ĭ������,Ĭ��Ϊ�����ص�
     * K = (BaseDanmaku.TYPE_SCROLL_RL|BaseDanmaku.TYPE_SCROLL_LR|BaseDanmaku.TYPE_FIX_TOP|BaseDanmaku.TYPE_FIX_BOTTOM)
     * V = true|false �Ƿ��ص�
     * @return
     */
    public preventOverlapping(pairs: Map<number, boolean>): DanmakuContext {
        this.mIsPreventOverlappingEnabled = (pairs != null);
        if (pairs == null) {
            this.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_OVERLAPPING_FILTER, primary: false });
        }
        else {
            this.setFilterData(DanmakuFilters.TAG_OVERLAPPING_FILTER, pairs, false);
        }
        this.mGlobalFlagValues.updateFilterFlag();
        this.notifyConfigureChanged(DanmakuConfigTag.OVERLAPPING_ENABLE, pairs);
        return this;
    }
    public isMaxLinesLimited(): boolean {
        return this.mIsMaxLinesLimited;
    }
    public isPreventOverlappingEnabled(): boolean {
        return this.mIsPreventOverlappingEnabled;
    }
    /**
     * ���û�������������Ĭ��ʹ��{@link SimpleTextCacheStuffer}ֻ֧�ִ�������ʾ, �����Ҫͼ�Ļ���������{@link SpannedCacheStuffer}
     * �����Ҫ����������ʽ����չ{@link SimpleTextCacheStuffer}|{@link SpannedCacheStuffer}
     * @param cacheStuffer
     * @param cacheStufferAdapter
     */
    public setCacheStuffer(cacheStuffer: BaseCacheStuffer, cacheStufferAdapter: Proxy): DanmakuContext {
        this.mCacheStuffer = cacheStuffer;
        if (this.mCacheStuffer != null) {
            this.mCacheStuffer.setProxy(cacheStufferAdapter);
            this.mDisplayer.setCacheStuffer(this.mCacheStuffer);
        }
        return this;
    }
    public setDanmakuSync(danmakuSync: AbsDanmakuSync): DanmakuContext {
        this.danmakuSync = danmakuSync;
        return this;
    }
    public registerConfigChangedCallback(listener: ConfigChangedCallback): void {
        if (listener == null || this.mCallbackList == null) {
            this.mCallbackList = new Array<ConfigChangedCallback>();
        }
        for (let i: number = 0; i < this.mCallbackList.length; i++) {
            if (listener == this.mCallbackList[i]) {
                return;
            }
        }
        this.mCallbackList.push(listener);
    }
    public unregisterConfigChangedCallback(listener: ConfigChangedCallback): void {
        if (listener == null || this.mCallbackList === null)
            return;
        for (let i: number = 0; i < this.mCallbackList.length; i++) {
            if (listener == this.mCallbackList[i]) {
                this.mCallbackList.splice(i, 1);
                return;
            }
        }
    }
    public unregisterAllConfigChangedCallbacks(): void {
        if (this.mCallbackList != null) {
            this.mCallbackList.length = 0;
            this.mCallbackList = null;
        }
    }
    private notifyConfigureChanged(tag: DanmakuConfigTag, ...values: any[]) {
        if (this.mCallbackList != null) {
            for (let i: number = 0; i < this.mCallbackList.length; i++) {
                if (this.mCallbackList[i] != null) {
                    this.mCallbackList[i].onDanmakuConfigChanged(this, tag, values);
                }
            }
        }
    }
    public registerFilter(filter: BaseDanmakuFilter<any>): DanmakuContext {
        this.mDanmakuFilters.registerFilter({ filter: filter });
        this.mGlobalFlagValues.updateFilterFlag();
        return this;
    }
    public unregisterFilter(filter: BaseDanmakuFilter<any>): DanmakuContext {
        this.mDanmakuFilters.unregisterFilter({ filter: filter });
        this.mGlobalFlagValues.updateFilterFlag();
        return this;
    }
    public resetContext(): DanmakuContext {
        this.mDisplayer = new OhosDisplayer();
        this.mGlobalFlagValues = new GlobalFlagValues();
        this.mDanmakuFilters = new DanmakuFilters();
        this.mDanmakuFilters.clear();
        this.mDanmakuFactory = DanmakuFactory.create();
        return this;
    }
}
