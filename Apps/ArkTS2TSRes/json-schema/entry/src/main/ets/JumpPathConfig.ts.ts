/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
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
            let bean0 = new JumpBean('简单对象验证', 'pages/SimpleValidatePage');
            this.dataList.push(bean0);
            let bean1 = new JumpBean('更简单对象验证', 'pages/VerySimpleValidatePage');
            this.dataList.push(bean1);
            let bean2 = new JumpBean('复杂示例', 'pages/ComplicatedValidatePage');
            this.dataList.push(bean2);
            let bean3 = new JumpBean('验证全部功能', 'pages/AllValidatePage');
            this.dataList.push(bean3);
            let bean4 = new JumpBean('处理undefined', 'pages/UnDefinedValidatePage');
            this.dataList.push(bean4);
            let bean5 = new JumpBean('Format验证', 'pages/FormatValidatePage');
            this.dataList.push(bean5);
            let bean6 = new JumpBean('嵌套错误验证', 'pages/NestedErrorsValidatePage');
            this.dataList.push(bean6);
            let bean7 = new JumpBean('本地化错误信息', 'pages/LocalErrorMessagePage');
            this.dataList.push(bean7);
            let bean8 = new JumpBean('自定义关键词', 'pages/DiyKeyWordValidatePage');
            this.dataList.push(bean8);
            let bean9 = new JumpBean('验证自定义关键词validateContains函数返回值的改变对于验证结果的影响', 'pages/DiyAnotherPage');
            this.dataList.push(bean9);
            let bean10 = new JumpBean('移除schema', 'pages/DereferencingSchemasPage');
            this.dataList.push(bean10);
            let bean11 = new JumpBean('默认基础URI', 'pages/DefaultBaseUriPage');
            this.dataList.push(bean11);
            let bean12 = new JumpBean('验证ReWrite', 'pages/ReWritePage');
            this.dataList.push(bean12);
            let bean13 = new JumpBean('验证前属性预处理', 'pages/PrePropertyValidatePage');
            this.dataList.push(bean13);
            let bean14 = new JumpBean('是否允许未知关键字失败', 'pages/AllowUnknownPage');
            this.dataList.push(bean14);
            let bean15 = new JumpBean('跳过关键字验证', 'pages/SkipAttributesPage');
            this.dataList.push(bean15);
        }
    }
}
