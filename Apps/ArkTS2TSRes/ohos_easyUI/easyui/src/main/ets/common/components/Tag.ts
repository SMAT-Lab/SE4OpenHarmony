interface Tag_Params {
    tagText?: string;
    tagType?: TagType;
    tagSize?: TagSize;
    color?: string;
    isPlain?: boolean;
    isRound?: boolean;
    isMark?: boolean;
    textColor?: string;
    click?: () => void //点击事件的方法
    ;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Tag_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
const textColor: string = "#ffffffff"; //标签的文字颜色
const primaryColor: string = "#ff1989fa"; //主要样式标签颜色
const successColor: string = "#ff07c160"; //成功样式标签颜色
const dangerColor: string = "#ffff4444"; //危险样式标签颜色
const defaultColor: string = "#ff969799"; //默认样式标签颜色
const largeSize: number = 24; //大尺寸标签
const mediumSize: number = 20; //中等尺寸标签
const defaultSize: number = 16; //默认尺寸标签
const round: number = 10; //圆角度
export class Tag extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.tagText = "标签" //标签文本内容，默认为“标签”
        ;
        this.tagType = TagType.default //标签类型 ，默认为default
        ;
        this.tagSize = TagSize.default //标签尺寸，默认为default
        ;
        this.color = "" //标签颜色 ，不设置的话会使用TagType的default
        ;
        this.isPlain = false //标签是否为空心样式
        ;
        this.isRound = false //标签是否是圆角样式
        ;
        this.isMark = false //标签是否是标记标签
        ;
        this.textColor = "#ffffffff" //标签文字颜色，默认为白色
        ;
        this.click = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Tag_Params) {
        if (params.tagText !== undefined) {
            this.tagText = params.tagText;
        }
        if (params.tagType !== undefined) {
            this.tagType = params.tagType;
        }
        if (params.tagSize !== undefined) {
            this.tagSize = params.tagSize;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.isPlain !== undefined) {
            this.isPlain = params.isPlain;
        }
        if (params.isRound !== undefined) {
            this.isRound = params.isRound;
        }
        if (params.isMark !== undefined) {
            this.isMark = params.isMark;
        }
        if (params.textColor !== undefined) {
            this.textColor = params.textColor;
        }
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private tagText: string; //标签文本内容，默认为“标签”
    private tagType: TagType; //标签类型 ，默认为default
    private tagSize: TagSize; //标签尺寸，默认为default
    private color: string; //标签颜色 ，不设置的话会使用TagType的default
    private isPlain: boolean; //标签是否为空心样式
    private isRound: boolean; //标签是否是圆角样式
    private isMark: boolean; //标签是否是标记标签
    private textColor: string; //标签文字颜色，默认为白色
    private click: () => void; //点击事件的方法
    render() {
        If.create();
        if (!this.isMark) {
            If.branchId(0);
            Column.create();
            Text.create(this.tagText);
            Text.backgroundColor(this.isPlain ? textColor : this.color === "" ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.color);
            Text.fontColor(this.isPlain ? this.textColor === textColor ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.textColor : this.textColor);
            Text.padding({
                top: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                left: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                right: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                bottom: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 2
            });
            Text.fontSize(this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize);
            Text.borderRadius(this.isRound ? (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * round : 2);
            Text.borderWidth(this.isPlain ? 1 : 0);
            Text.borderColor(this.isPlain ? this.textColor === textColor ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.textColor : this.textColor);
            Text.onClick(this.click);
            Text.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Stack.create();
            Text.create(this.tagText);
            Text.backgroundColor(this.color === "" ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.color);
            Text.fontColor(this.color === "" ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.color);
            Text.padding({
                top: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                left: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                right: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 8,
                bottom: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 2
            });
            Text.borderRadius((this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * round);
            Text.pop();
            Text.create(this.tagText);
            Text.backgroundColor(this.color === "" ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.color);
            Text.fontColor(this.isPlain ? this.tagType === 0 ? defaultColor : this.tagType === 1 ? primaryColor : this.tagType === 2 ? successColor : dangerColor : this.textColor);
            Text.padding({
                top: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                left: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 5,
                bottom: (this.tagSize === 0 ? defaultSize : this.tagSize === 1 ? mediumSize : largeSize) / defaultSize * 2
            });
            Text.position({ x: 0 });
            Text.onClick(this.click);
            Text.pop();
            Stack.pop();
        }
        If.pop();
    }
}
//定义标签大小
export enum TagSize {
    default,
    medium,
    large
}
//定义标签类型
export enum TagType {
    default,
    primary,
    success,
    danger
}
