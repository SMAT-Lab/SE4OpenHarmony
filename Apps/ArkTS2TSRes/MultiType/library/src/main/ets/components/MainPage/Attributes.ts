let __generate__Id: number = 0;
function generateId(): string {
    return "Attributes_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
export class Attributes {
    topPadding?: Length;
    rightPadding?: Length;
    bottomPadding?: Length;
    leftPadding?: Length;
    topMargin?: Length;
    rightMargin?: Length;
    bottomMargin?: Length;
    leftMargin?: Length;
    space?: number; //列表项间距
    initialIndex?: number; //初次加载时起始位置
    divider?: dividerType;
    listDirection?: Axis; //排列方向
    editMode?: boolean; //是否处于可编辑模式
    edgeEffect?: EdgeEffect; //滑动效果
    chainAnimation?: boolean; //是否启用链式联动动效
    onItemDelete?: (index: number) => boolean; //列表项删除时触发
    onScrollIndex?: (firstIndex: number, lastIndex: number) => void; //当前列表显示的起始位置和终止位置发生变化时触发
    sticky?: Sticky; //吸顶效果
    width?: Length;
    height?: Length;
    backgroundColor?: Color;
}
class dividerType {
    strokeWidth: Length = 0;
    color?: Color;
    startMargin?: Length;
    endMargin?: Length;
}
