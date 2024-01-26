let __generate__Id: number = 0;
function generateId(): string {
    return "CommonConstants_" + ++__generate__Id;
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
/**
 * Common constants for all features.
 */
export default class CommonConstants {
    /**
     * 账户输入长度。
     */
    static readonly INPUT_ACCOUNT_LENGTH = 11;
    /**
     * 密码输入长度。
     */
    static readonly INPUT_PASSWORD_LENGTH = 8;
    /**
     * 输入框左边距。
     */
    static readonly INPUT_PADDING_LEFT = 0;
    /**
     * 模拟登录延迟时间。
     */
    static readonly LOGIN_DELAY_TIME = 2000;
    /**
     * 组件间公共间距。
     */
    static readonly COMMON_SPACE = 12;
    /**
     * 首页标题文本。
     */
    static readonly HOME_TITLE = '首页';
    /**
     * 我的页面标题文本。
     */
    static readonly MINE_TITLE = '我的';
    /**
     * 其他登录方式间距。
     */
    static readonly LOGIN_METHODS_SPACE = 44;
    /**
     * 组件宽度或高度均覆盖父组件。
     */
    static readonly FULL_PARENT = '100%';
    /**
     * 按钮宽度。
     */
    static readonly BUTTON_WIDTH = '90%';
    /**
     * 首页选项卡索引。
     */
    static readonly HOME_TAB_INDEX = 0;
    /**
     * 我的选项卡索引。
     */
    static readonly MINE_TAB_INDEX = 1;
}
