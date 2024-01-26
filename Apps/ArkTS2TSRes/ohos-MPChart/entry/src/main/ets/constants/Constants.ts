let __generate__Id: number = 0;
function generateId(): string {
    return "Constants_" + ++__generate__Id;
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
export default class Constants {
    // 切换是否显示数值
    static readonly TOGGLE_VALUES: string = 'Toggle Values';
    // 切换是否显示填充
    static readonly TOGGLE_FILLED: string = 'Toggle Filled';
    // 切换是否显示圆形
    static readonly TOGGLE_CIRCLES: string = 'Toggle Circles';
    // 切换三次曲线
    static readonly TOGGLE_CUBIC: string = 'Toggle Cubic';
    // 切换阶梯式
    static readonly TOGGLE_STEPPED: string = 'Toggle Stepped';
    // 切换水平三次曲线
    static readonly TOGGLE_HORIZONTAL_CUBIC: string = 'Toggle Horizontal Cubic';
    // 切换是否捏合缩放
    static readonly TOGGLE_PINCHZOOM: string = 'Toggle PinchZoom';
    // 切换是否自动缩放
    static readonly TOGGLE_AUTO_SCALE: string = 'Toggle Auto Scale';
    // 切换是否高亮
    static readonly TOGGLE_HIGHLIGHT: string = 'Toggle Highlight';
    // 切换圆角矩形
    static readonly TOGGLE_ROUNDED: string = 'Toggle Rounded';
    // X轴动画
    static readonly ANIMATE_X: string = 'Animate X';
    // Y轴动画
    static readonly ANIMATE_Y: string = 'Animate Y';
    // XY轴动画
    static readonly ANIMATE_XY: string = 'Animate XY';
    // 切换是否显示边框
    static readonly TOGGLE_BAR_BORDERS: string = 'Toggle Bar Borders';
    //添加单个数据
    static readonly ADD_ENTRY: string = 'Add Entry';
    //添加多个数据
    static readonly ADD_MULTIPLE: string = 'Add Multiple';
    //清空图表
    static readonly CLEAR_CHART: string = 'Clear chart';
    //保存图像
    static readonly SAVE_IMAGE: string = 'Save Image';
    //显示Y轴数值
    static readonly TOGGLE_Y_VALUES: string = 'Toggle Y-Values';
    //显示X轴数值
    static readonly TOGGLE_X_VALUES: string = 'Toggle X-Values';
    //切换图表的百分比数值
    static readonly TOGGLE_PERCENT: string = 'Toggle Percent ';
    static readonly TOGGLE_MINIMUM_ANGLES: string = 'Toggle Minimum Angles';
    //切换PietChart中间部分的空白是否填充
    static readonly TOGGLE_HOLE: string = 'Toggle Hole';
    //点击PietChart自动旋转
    static readonly TOGGLE_CURVED_SLICES: string = 'Toggle Curved Slices ';
    //绘制PietChart中间文本
    static readonly DRAW_CENTER_TEXT: string = 'Draw Center Text';
}
