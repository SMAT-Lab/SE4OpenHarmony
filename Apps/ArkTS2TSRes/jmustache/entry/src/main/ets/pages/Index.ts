interface Index_Params {
    data?: Data;
    buttonList?: Format[];
    renderList?: Array<string>;
    text?: Text;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import Mustache from 'mustache';
import { Data, Format, Text, Data1, Partials } from './interface';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = {
            name: "cai",
            msg: {
                sex: "male",
                age: "66",
                hobby: "reading"
            },
            focus: "<span>sleep<span>",
            subject: [" Ch ", " En ", " Math ", " physics "],
            moreInfo: []
        };
        this.buttonList = [
            { name: "解析", description: "mustache会解析出‘{{}}’内包含的内容" },
            { name: "空值", description: "未找到对应值则不显示" },
            { name: "HTML转义", description: "'{{}}'默认HTML转义" },
            { name: "禁用HTML转义", description: "'{{{}}}'可以禁用HTML转义" },
            { name: "取消转义", description: "'&'可以取消转义变量" },
            { name: "对象属性", description: "'.'可用于访问对象属性的键" },
            { name: "构建块", description: "{{#}}开始一个部分,同时{{/}}结束它.两个标签之间的文本的行为由键的值决定." },
            { name: "枚举", description: "{{.}}表示枚举，可以循环输出整个字符串数组" },
            { name: "if", description: "{{#}}{{/}}不为空数组时，内部才会展示内容" },
            { name: "else", description: "{{^}}{{/}}为空数组时，内部会展示内容" },
            { name: "注释", description: "!表示注释,注释后不会渲染输出任何内容" },
            { name: "模块", description: "以{{>}}开始表示子模块,可以将复杂的结构拆分成几个小的子模块" },
            { name: "自定义标签", description: "标签可以自定义" },
            { name: "预编译", description: "" }
        ];
        this.renderList = [
            "NAME:{{name}}",
            "EMPTY:{{nothing}}",
            "{{focus}}",
            "{{{focus}}}",
            "{{&focus}}",
            "SEX:{{msg.sex}};AGE:{{msg.age}}",
            "{{#msg}}SEX:{{sex}};AGE:{{age}};HOBBY:{{hobby}}{{/msg}}",
            "{{#subject}}{{.}}{{/subject}}",
            "EMPTY-ARR:{{#moreInfo}}empty-arr{{/moreInfo}}\nARRAY: {{#subject}}arr {{/subject}}\n",
            "EMPTY-ARR:{{^moreInfo}}empty-arr{{/moreInfo}}\nARRAY: {{^subject}}arr {{/subject}}\n",
            "{{!name}}.",
            "NAME:{{name}}\nINFO:\n{{>template}}",
            "NAME:{{name}}\nNAME:<%name%>\n",
            "NAME:{{name}}\nNAME:<%name%>\n"
        ];
        this.__text = new ObservedPropertyObject({
            data: {},
            selected: -1,
            render: "",
            text: ""
        }, this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.buttonList !== undefined) {
            this.buttonList = params.buttonList;
        }
        if (params.renderList !== undefined) {
            this.renderList = params.renderList;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: Data;
    private buttonList: Format[];
    private renderList: Array<string>;
    private __text: ObservedPropertyObject<Text>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: Text) {
        this.__text.set(newValue);
    }
    FormatButton(i: number, parent = null) {
        Row.create();
        Row.padding(5);
        Text.create(this.buttonList[i].name);
        Text.onClick(() => {
            this.text.data = this.data;
            this.text.render = this.renderList[i];
            this.text.text = Mustache.render(this.renderList[i], this.data);
            this.text.selected = i;
        });
        Text.fontSize(20);
        Text.border({ width: 2, color: "#cccccc" });
        Text.padding(5);
        Text.backgroundColor("#00ffaa");
        Text.pop();
        Row.pop();
    }
    EventButton(i: number, clickEvent: (i: number) => void, parent = null) {
        Row.create();
        Row.padding(5);
        Text.create(this.buttonList[i].name);
        Text.onClick(() => {
            if (clickEvent) {
                clickEvent(i);
            }
        });
        Text.fontSize(20);
        Text.border({ width: 2, color: "#cccccc" });
        Text.padding(5);
        Text.backgroundColor("#00ffaa");
        Text.pop();
        Row.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height('100%');
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create("原内容:\n" + JSON.stringify(this.text.data));
        Text.fontSize(20);
        Text.fontColor(Color.Red);
        Text.width('100%');
        Text.pop();
        Text.create("转化格式:\n" + this.text.render);
        Text.fontSize(20);
        Text.fontColor(Color.Green);
        Text.margin(5);
        Text.width('100%');
        Text.pop();
        Text.create("格式化:\n" + this.text.text);
        Text.fontSize(20);
        Text.fontColor(Color.Blue);
        Text.margin(5);
        Text.width('100%');
        Text.pop();
        Column.pop();
        If.create();
        if (this.text.selected != 13 && this.text.selected != -1) {
            If.branchId(0);
            Text.create("description:" + this.buttonList[this.text.selected].description);
            Text.fontSize(20);
            Text.margin(10);
            Text.pop();
        }
        If.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        this.FormatButton(0, this);
        this.FormatButton(1, this);
        this.FormatButton(2, this);
        this.FormatButton(3, this);
        this.FormatButton(4, this);
        this.FormatButton(5, this);
        this.FormatButton(6, this);
        this.FormatButton(7, this);
        this.FormatButton(8, this);
        this.FormatButton(9, this);
        this.FormatButton(10, this);
        this.EventButton(11, (i: number) => {
            let partials: Partials = { template: "{{#msg}}SEX:{{sex}};AGE:{{age}};HOBBY:{{hobby}}{{/msg}}" };
            let data1: Data1 = { data: this.data, template: partials };
            this.text.data = data1;
            this.text.render = this.renderList[i];
            this.text.text = Mustache.render(this.renderList[i], this.data, partials);
            this.text.selected = i;
        }, this);
        this.EventButton(12, (i: number) => {
            let customTags = ['<%', '%>'];
            this.text.data = { data: this.data };
            this.text.render = this.renderList[i];
            let obj: Data = {};
            this.text.text = Mustache.render(this.renderList[i], this.data, obj, customTags);
            this.text.selected = i;
        }, this);
        this.EventButton(13, (i: number) => {
            this.text.data = { data: this.data };
            this.text.render = this.renderList[i];
            Mustache.parse(this.renderList[i]);
            this.text.text = Mustache.render(this.renderList[i], this.data);
            this.text.selected = i;
        }, this);
        Flex.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
