/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class JumpBean {
    showText: string = '';
    jumpPath: string = '';
    constructor(text, path) {
        this.showText = text;
        this.jumpPath = path;
    }
}
export default class JumpPathConfig {
    public static dataList: Array<JumpBean>;
    public static getText(): string[] {
        this.initData();
        let tempArr: string[] = new Array<string>(this.dataList.length);
        for (let index = 0; index < this.dataList.length; index++) {
            tempArr[index] = this.dataList[index].showText;
        }
        return tempArr;
    }
    public static getIndex(): number[] {
        this.initData();
        let tempArr: number[] = new Array<number>(this.dataList.length);
        for (let index = 0; index < this.dataList.length; index++) {
            tempArr[index] = index;
        }
        return tempArr;
    }
    public static getJumpPath(position: number): string {
        if (position < 0) {
            return 'pages/Index';
        }
        this.initData();
        if (position >= this.dataList.length) {
            return 'pages/Index';
        }
        return this.dataList[position].jumpPath;
    }
    private static initData() {
        if (!this.dataList) {
            this.dataList = new Array<JumpBean>();
        }
        if (this.dataList.length < 1) {
            let bean0 = new JumpBean('AvPlayer缓存播放示例', 'pages/HttpsPlayer');
            this.dataList.push(bean0);
            let bean1 = new JumpBean('IjkPlayer缓存播放示例', 'pages/IjkVideoPlayerPage');
            this.dataList.push(bean1);
            let bean2 = new JumpBean('自定义缓存容量大小策略示例', 'pages/DiyCacheSizePage');
            this.dataList.push(bean2);
            let bean3 = new JumpBean('自定义缓存个数策略示例', 'pages/DiyCacheCountPage');
            this.dataList.push(bean3);
            let bean4 = new JumpBean('使用自定义请求头注入器示例', 'pages/DiyCacheHeaderPage');
            this.dataList.push(bean4);
            let bean5 = new JumpBean('使用自定义命名规则示例', 'pages/DiyFileNameGeneratorPage');
            this.dataList.push(bean5);
        }
    }
}
