let __generate__Id: number = 0;
function generateId(): string {
    return "MainViewModel_" + ++__generate__Id;
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
import ItemData from '../common/bean/ItemData';
/**
 * Binds data to components and provides interfaces.
 */
export class MainViewModel {
    /**
     * 获取轮播图图片数据。
     *
     * @return {Array<Resource>} swiperImages - 轮播图图片数据。
     */
    getSwiperImages(): Array<Resource> {
        let swiperImages: Resource[] = [
            $r('app.media.fig1'),
            $r('app.media.fig2'),
            $r('app.media.fig3'),
            $r('app.media.fig4') // 轮播图图片资源4
        ];
        return swiperImages;
    }
    /**
     * 获取第一个网格的数据。
     *
     * @return {Array<ItemData>} firstGridData - 第一个网格的数据。
     */
    getFirstGridData(): Array<ItemData> {
        let firstGridData: ItemData[] = [
            new ItemData($r('app.string.my_love'), $r('app.media.love')),
            new ItemData($r('app.string.history_record'), $r('app.media.record')),
            new ItemData($r('app.string.message'), $r('app.media.message')),
            new ItemData($r('app.string.shopping_cart'), $r('app.media.shopping')),
            new ItemData($r('app.string.my_goal'), $r('app.media.target')),
            new ItemData($r('app.string.group'), $r('app.media.circle')),
            new ItemData($r('app.string.favorites'), $r('app.media.favorite')),
            new ItemData($r('app.string.recycle_bin'), $r('app.media.recycle')) // 回收站资源和标题
        ];
        return firstGridData;
    }
    /**
     * 获取第二个网格的数据。
     *
     * @return {Array<ItemData>} secondGridData - 第二个网格的数据。
     */
    getSecondGridData(): Array<ItemData> {
        let secondGridData: ItemData[] = [
            new ItemData($r('app.string.mainPage_top'), $r('app.media.top'), $r('app.string.mainPage_text_top')),
            new ItemData($r('app.string.mainPage_new'), $r('app.media.new'), $r('app.string.mainPage_text_new')),
            new ItemData($r('app.string.mainPage_brand'), $r('app.media.brand'), $r('app.string.mainPage_text_brand')),
            new ItemData($r('app.string.mainPage_found'), $r('app.media.found'), $r('app.string.mainPage_text_found')) // 发现资源、标题和文本
        ];
        return secondGridData;
    }
    /**
     * 获取设置列表的数据。
     *
     * @return {Array<ItemData>} settingListData - 设置列表的数据。
     */
    getSettingListData(): Array<ItemData> {
        let settingListData: ItemData[] = [
            new ItemData($r('app.string.setting_list_news'), $r("app.media.news"), $r("app.string.setting_toggle")),
            new ItemData($r('app.string.setting_list_data'), $r("app.media.data"), null),
            new ItemData($r('app.string.setting_list_menu'), $r("app.media.menu"), null),
            new ItemData($r('app.string.setting_list_about'), $r("app.media.about"), null),
            new ItemData($r('app.string.setting_list_storage'), $r("app.media.storage"), null),
            new ItemData($r('app.string.setting_list_privacy'), $r("app.media.privacy"), null) // 隐私资源和标题
        ];
        return settingListData;
    }
}
// 直接导出 MainViewModel 的实例，用于在其他模块中使用。
export default new MainViewModel();
