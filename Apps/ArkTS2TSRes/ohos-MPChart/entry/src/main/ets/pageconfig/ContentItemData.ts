let __generate__Id: number = 0;
function generateId(): string {
    return "ContentItemData_" + ++__generate__Id;
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
import ContentItem from './ContentItem';
export default class ContentItemData {
    private static itemData: Array<ContentItem> = new Array();
    public static getData(): Array<ContentItem> {
        if (ContentItemData.itemData.length > 0) {
            return ContentItemData.itemData;
        }
        return ContentItemData.addData();
    }
    /**
     * 添加页面跳转路径
     */
    public static addData(): Array<ContentItem> {
        //Line Charts
        ContentItemData.itemData.push(new ContentItem("Line Charts"));
        ContentItemData.itemData.push(new ContentItem("Basic  ", "Simple line chart.", "pages/lineCharts/LineChartPage"));
        ContentItemData.itemData.push(new ContentItem("Multiple  ", "Show multiple data sets.", "pages/lineCharts/MultiplePage"));
        ContentItemData.itemData.push(new ContentItem("No Axis Config ", "No axis config line chart.", "pages/lineCharts/LineChartNotAxisConfigPage"));
        ContentItemData.itemData.push(new ContentItem("Dual Axis  ", "Line chart with dual y-axes.", "pages/lineCharts/DualAxisPage"));
        ContentItemData.itemData.push(new ContentItem("Inverted Axis  ", "Inverted y-axis.", "pages/lineCharts/InvertedAxisPage"));
        ContentItemData.itemData.push(new ContentItem("Cubic  ", "Line chart with a cubic line shape.", "pages/lineCharts/CubicAxisPage"));
        ContentItemData.itemData.push(new ContentItem("Colorful", "Colorful line chart.", "pages/lineCharts/ColorfulPage"));
        ContentItemData.itemData.push(new ContentItem("Performance  ", "Render 30.000 data points smoothly.", "pages/lineCharts/PerformanceAxisPage"));
        ContentItemData.itemData.push(new ContentItem("Filled  ", "Colored area between two lines.", "pages/lineCharts/FilledAxisPage"));
        //Bar Charts
        ContentItemData.itemData.push(new ContentItem("Bar Charts"));
        ContentItemData.itemData.push(new ContentItem("Basic ", "Simple bar chart.", "pages/barCharts/ScrollBarChartPage"));
        ContentItemData.itemData.push(new ContentItem("Basic2 ", "Variation of the simple bar chart.", "pages/barCharts/BarChartPage2"));
        ContentItemData.itemData.push(new ContentItem("Event Control & custom markerView", "Event control  custom markerView.", "pages/barCharts/CustomMarkerViewChartPage"));
        ContentItemData.itemData.push(new ContentItem("Basic Extension ", "Simple bar chart.", "pages/barCharts/ScrollBarChartPage2"));
        ContentItemData.itemData.push(new ContentItem("Multiple", "Show multiple data sets.", "pages/barCharts/BarChartMultiplePage"));
        ContentItemData.itemData.push(new ContentItem("CustomGridLine ", "CustomGridLine", "pages/barCharts/CustomGridLineChartPage"));
        ContentItemData.itemData.push(new ContentItem("Horizontal", "Render bar chart horizontally.", "pages/barCharts/HorizontalBarChartPage"));
        ContentItemData.itemData.push(new ContentItem("Stacked ", "Stacked bar chart", "pages/barCharts/StackedBarChartPage"));
        ContentItemData.itemData.push(new ContentItem("Negative ", "Positive and negative values with unique colors.", "pages/barCharts/BarChartNegativePage"));
        ContentItemData.itemData.push(new ContentItem("Negative Horizontal", "demonstrates how to create a HorizontalBarChart with positive and negative values.", "pages/barCharts/HorizontalBarNegativeChartPage"));
        ContentItemData.itemData.push(new ContentItem("Stacked 2", "Stacked bar chart with negative values.", "pages/barCharts/StackedNegativePage"));
        ContentItemData.itemData.push(new ContentItem("Sine", "Sine function in bar chart format.", "pages/barCharts/SineBarChartPage"));
        ContentItemData.itemData.push(new ContentItem("waterfall ", "Simple waterfall chart.", "pages/barCharts/SimpleWaterfallChartPage"));
        //Pie Charts
        ContentItemData.itemData.push(new ContentItem("Pie Charts"));
        ContentItemData.itemData.push(new ContentItem("Basic", "Simple pie1 chart.", "pages/pieCharts/PieChartPage"));
        ContentItemData.itemData.push(new ContentItem("Value Lines", "Stylish lines drawn outward from slices.", "pages/pieCharts/PiePolylineChartPage"));
        ContentItemData.itemData.push(new ContentItem("Half Pie", "180° (half) pie chart.", "pages/pieCharts/HalfPieChartPage"));
        //Other Charts
        ContentItemData.itemData.push(new ContentItem("Other Charts"));
        ContentItemData.itemData.push(new ContentItem("Combined Chart", "Bar and line chart together.", "pages/otherCharts/CombinedChartPage"));
        ContentItemData.itemData.push(new ContentItem("Scatter Plot", "Simple scatter plot.", "pages/otherCharts/ScatterChartPage"));
        ContentItemData.itemData.push(new ContentItem("Bubble Chart", "Simple bubble chart.", "pages/otherCharts/BubbleChartPage"));
        ContentItemData.itemData.push(new ContentItem("Candlestick", "Simple financial chart.", "pages/otherCharts/CandlestickChartPage"));
        ContentItemData.itemData.push(new ContentItem("Radar Chart", "Simple web chart.", "pages/otherCharts/RadarChartPage"));
        //Scrolling Charts
        ContentItemData.itemData.push(new ContentItem("Scrolling Charts"));
        ContentItemData.itemData.push(new ContentItem("Multiple   ", "Various types of charts as fragments.", "pages/scrollingCharts/ListViewMultiChartPage"));
        ContentItemData.itemData.push(new ContentItem("View Pager", "Swipe through different charts.", "pages/scrollingCharts/ViewPagerPage"));
        ContentItemData.itemData.push(new ContentItem("Tall Bar Chart", "Bars bigger than your screen!", "pages/scrollingCharts/TallBarChartPage"));
        ContentItemData.itemData.push(new ContentItem("Many Bar Charts", "More bars than your screen can handle!", "pages/scrollingCharts/ManyBarChartsPage"));
        //Even More Line Charts
        ContentItemData.itemData.push(new ContentItem("Even More Line Charts"));
        ContentItemData.itemData.push(new ContentItem("Dynamic", "Build a line chart by pushing points and sets.", "pages/evenMoreLineCharts/DynamicPage"));
        ContentItemData.itemData.push(new ContentItem("Realtime", "push data points in realtime.", "pages/evenMoreLineCharts/RealtimePage"));
        ContentItemData.itemData.push(new ContentItem("Hourly", "Uses the current time to push a data point for each hour.", "pages/evenMoreLineCharts/HourlyPage"));
        //Interface Performance Test Page
        ContentItemData.itemData.push(new ContentItem("Interface Test"));
        ContentItemData.itemData.push(new ContentItem("Interface test1", "performance", "pages/testCharts/InterfacePerformancePage"));
        return ContentItemData.itemData;
    }
}
