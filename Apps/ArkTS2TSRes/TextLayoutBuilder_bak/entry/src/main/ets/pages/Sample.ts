interface Sample_Params {
    scroller?: Scroller;
    strTest?;
    data1?: TextLayout.Layout;
    data2?: TextLayout.Layout;
    data3?: TextLayout.Layout;
    data4?: TextLayout.Layout;
    data5?: TextLayout.Layout;
    data6?: TextLayout.Layout;
    data7?: TextLayout.Layout;
    data8?: TextLayout.Layout;
    data9?: TextLayout.Layout;
    data10?: TextLayout.Layout;
    data11?: TextLayout.Layout;
    data12?: TextLayout.Layout;
    data13?: TextLayout.Layout;
    data14?: TextLayout.Layout;
    data15?: TextLayout.Layout;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Sample_" + ++__generate__Id;
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
import { TextLayout } from '@ohos/textlayoutbuilder';
import { TextInfo } from '@ohos/textlayoutbuilder';
interface modelType {
    model: TextLayout.Layout;
}
let modelFn = (modelData: TextLayout.Layout): modelType => {
    const datas: modelType = {
        model: modelData
    };
    return datas;
};
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.strTest = '我想问，123456，你知道是如何生成的吗？https://fanyi.youdao.com/这是有道翻译的链接，如何你告诉我答案全部正确的话我将录用你为有道翻译的小小程序猿，https://fanyi.youdao.com/程序的架构你还拿不，大禹的板子屏幕很大，凑个字数。如何你告诉我答案全部正确的话我将录用你为有道翻译的小小程序猿.';
        this.data1 = new TextLayout.Layout();
        this.data2 = new TextLayout.Layout();
        this.data3 = new TextLayout.Layout();
        this.data4 = new TextLayout.Layout();
        this.data5 = new TextLayout.Layout();
        this.data6 = new TextLayout.Layout();
        this.data7 = new TextLayout.Layout();
        this.data8 = new TextLayout.Layout();
        this.data9 = new TextLayout.Layout();
        this.data10 = new TextLayout.Layout();
        this.data11 = new TextLayout.Layout();
        this.data12 = new TextLayout.Layout();
        this.data13 = new TextLayout.Layout();
        this.data14 = new TextLayout.Layout();
        this.data15 = new TextLayout.Layout();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.strTest !== undefined) {
            this.strTest = params.strTest;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
        if (params.data2 !== undefined) {
            this.data2 = params.data2;
        }
        if (params.data3 !== undefined) {
            this.data3 = params.data3;
        }
        if (params.data4 !== undefined) {
            this.data4 = params.data4;
        }
        if (params.data5 !== undefined) {
            this.data5 = params.data5;
        }
        if (params.data6 !== undefined) {
            this.data6 = params.data6;
        }
        if (params.data7 !== undefined) {
            this.data7 = params.data7;
        }
        if (params.data8 !== undefined) {
            this.data8 = params.data8;
        }
        if (params.data9 !== undefined) {
            this.data9 = params.data9;
        }
        if (params.data10 !== undefined) {
            this.data10 = params.data10;
        }
        if (params.data11 !== undefined) {
            this.data11 = params.data11;
        }
        if (params.data12 !== undefined) {
            this.data12 = params.data12;
        }
        if (params.data13 !== undefined) {
            this.data13 = params.data13;
        }
        if (params.data14 !== undefined) {
            this.data14 = params.data14;
        }
        if (params.data15 !== undefined) {
            this.data15 = params.data15;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private strTest;
    private data1: TextLayout.Layout;
    private data2: TextLayout.Layout;
    private data3: TextLayout.Layout;
    private data4: TextLayout.Layout;
    private data5: TextLayout.Layout;
    private data6: TextLayout.Layout;
    private data7: TextLayout.Layout;
    private data8: TextLayout.Layout;
    private data9: TextLayout.Layout;
    private data10: TextLayout.Layout;
    private data11: TextLayout.Layout;
    private data12: TextLayout.Layout;
    private data13: TextLayout.Layout;
    private data14: TextLayout.Layout;
    private data15: TextLayout.Layout;
    render() {
        Scroll.create(this.scroller);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create("默认显示");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("单行显示，文字颜色紫色");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("最大 2 行显示，结尾省略号，带内边距");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("链接颜色红色，文字间距");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("文字反向排列");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("文字靠右对齐");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("文本最大宽度");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("文本点击状态");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("标记指定文本特殊显示");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("标记多处指定文本特殊显示");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("特殊文本点击，数据回调");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("显示空字符串,背景色红色占位");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("每行最大显示五个字符");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("每行最小显示五个字符");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Text.create("左缩进");
        Text.fontSize(16);
        Text.fontColor("#999999");
        Text.margin({ left: 14, top: 14, bottom: 14 });
        Text.pop();
        Column.create();
        Column.backgroundColor("#cccccc");
        Column.margin({ left: 14, right: 14 });
        Column.borderRadius(10);
        Column.pop();
        Column.create();
        Column.height(200);
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    aboutToAppear() {
        let textInfo1 = new TextInfo();
        textInfo1.setStart(2);
        textInfo1.setEnd(8);
        textInfo1.setFontSize('16');
        textInfo1.setFontColor('#00ff00');
        textInfo1.setFontLetterSpacing('6');
        let textInfo2 = new TextInfo();
        textInfo2.setStart(11);
        textInfo2.setEnd(15);
        textInfo2.setFontSize('18');
        textInfo2.setFontColor('#ff0000');
        textInfo2.setFontLetterSpacing('8');
        let textInfo3 = new TextInfo();
        textInfo3.setStart(50);
        textInfo3.setEnd(53);
        textInfo3.setFontSize('20');
        textInfo3.setFontColor('#ffff00');
        textInfo3.setFontLetterSpacing('10');
        this.data1
            .setText(this.strTest);
        let tempData2: TextLayout.Layout = this.data2.creatTempLayout();
        tempData2.setText(this.strTest)
            .setTextColor('#800080')
            .setSingleLine(true);
        this.data2 = tempData2;
        let tempData3: TextLayout.Layout = this.data3.creatTempLayout();
        tempData3
            .setText(this.strTest)
            .setSingleLine(false)
            .setMaxLines(2)
            .setEllipsize(TextOverflow.Ellipsis)
            .setIncludeFontPadding(true);
        this.data3 = tempData3;
        let tempData4: TextLayout.Layout = this.data4.creatTempLayout();
        tempData4
            .setText(this.strTest)
            .setMaxLines(3)
            .setEllipsize(TextOverflow.Ellipsis)
            .setIncludeFontPadding(true)
            .setLinkColor('#ff0000')
            .setLetterSpacing(6);
        this.data4 = tempData4;
        let tempData5: TextLayout.Layout = this.data5.creatTempLayout();
        tempData5
            .setText(this.strTest)
            .setIncludeFontPadding(true)
            .setTextDirection(1);
        this.data5 = tempData5;
        let tempData6: TextLayout.Layout = this.data6.creatTempLayout();
        tempData6
            .setText(this.strTest)
            .setIncludeFontPadding(true)
            .setAlignment(TextAlign.End);
        this.data6 = tempData6;
        let tempData7: TextLayout.Layout = this.data7.creatTempLayout();
        tempData7
            .setText(this.strTest)
            .setMaxWidth(200)
            .setIncludeFontPadding(true);
        this.data7 = tempData7;
        let tempData8: TextLayout.Layout = this.data8.creatTempLayout();
        tempData8
            .setText(this.strTest)
            .setIncludeFontPadding(true)
            .setIsEnablePressState(true)
            .setTextPressStateStyle("#999999");
        this.data8 = tempData8;
        let tempData9: TextLayout.Layout = this.data9.creatTempLayout();
        tempData9
            .setText(this.strTest)
            .setSpecialTextInfo(textInfo1);
        this.data9 = tempData9;
        let tempData10: TextLayout.Layout = this.data10.creatTempLayout();
        tempData10
            .setText(this.strTest)
            .setSpecialTextInfo(textInfo1)
            .setSpecialTextInfo(textInfo2)
            .setSpecialTextInfo(textInfo3);
        this.data10 = tempData10;
        let tempData11: TextLayout.Layout = this.data11.creatTempLayout();
        tempData11
            .setText("              ")
            .setBgColor("#ff0000")
            .setIncludeFontPadding(true);
        this.data11 = tempData11;
        let tempData12: TextLayout.Layout = this.data12.creatTempLayout();
        tempData12
            .setText(this.strTest)
            .setSpecialTextInfo(textInfo1)
            .setSpecialTextInfo(textInfo2)
            .setSpecialTextInfo(textInfo3)
            .setSpecialTextClick((textInfo) => {
            AlertDialog.show({
                title: '',
                message: '我点击了 = ' + textInfo.getText()
            });
        });
        this.data12 = tempData12;
        let tempData13: TextLayout.Layout = this.data13.creatTempLayout();
        tempData13
            .setText("一二三四五六七八九十你我他你我他你我他你我他你我他你我他你我他你我他你我")
            .setIncludeFontPadding(true)
            .setMaxEms(5);
        this.data13 = tempData13;
        let tempData14: TextLayout.Layout = this.data14.creatTempLayout();
        tempData14
            .setText("一二三")
            .setIncludeFontPadding(true)
            .setBgColor("#ff0000")
            .setMinEms(5);
        this.data14 = tempData14;
        let tempData15: TextLayout.Layout = this.data15.creatTempLayout();
        tempData15
            .setText("一二三四五六七八九十你我他你我他你我他你我他你我他你我他你我他你我他你我")
            .setIndents(20, 0);
        this.data15 = tempData15;
    }
}
loadDocument(new Sample("1", undefined, {}));
