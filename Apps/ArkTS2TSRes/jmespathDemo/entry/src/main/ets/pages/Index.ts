interface Index_Params {
    defaultExampleArray?: TestExample[];
    expressionText?: string;
    caseText?: string;
    resultText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import JmesPath from 'jmespath';
interface TestExample {
    name: string;
    expression: string;
    case: string;
    result: string;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.defaultExampleArray = [{
                name: '基本表达式',
                expression: 'a.b.c[0].d[1][0]',
                case: `{"a": {
      "b": {
        "c": [
          {"d": [0, [1, 2]]},
          {"d": [3, 4]}
        ]
      }
    }}`,
                result: '1'
            }, {
                name: '切片',
                expression: '[0:5]',
                case: '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]',
                result: `[
    0,
    1,
    2,
    3,
    4
    ]`
            }, {
                name: '列表和切片投影',
                expression: 'people[*].first',
                case: `{
    "people": [
      {"first": "James", "last": "d"},
      {"first": "Jacob", "last": "e"},
      {"first": "Jayden", "last": "f"},
      {"missing": "different"}
    ],
    "foo": {"bar": "baz"}
  }`,
                result: `[
    "James",
    "Jacob",
    "Jayden"
    ]`
            }, {
                name: '对象投影',
                expression: 'ops.*.numArgs',
                case: `{
      "ops": {
        "functionA": {"numArgs": 2},
        "functionB": {"numArgs": 3},
        "functionC": {"variadic": true}
      }
    }`,
                result: `[
      2,
      3
    ]`
            }, {
                name: '展平投影',
                expression: 'reservations[*].instances[*].state',
                case: `{
      "reservations": [
        {
          "instances": [
            {"state": "running"},
            {"state": "stopped"}
          ]
        },
        {
          "instances": [
            {"state": "terminated"},
            {"state": "running"}
          ]
        }
      ]
    }`,
                result: `[
      [
        "running",
        "stopped"
      ],
      [
        "terminated",
        "running"
      ]
    ]`
            }, {
                name: '过滤投影',
                expression: "machines[?state=='running'].name",
                case: `{
    "machines": [
      {"name": "a", "state": "running"},
      {"name": "b", "state": "stopped"},
      {"name": "c", "state": "running"}
    ]
  }`,
                result: `[
      "a",
      "c"
    ]`
            }, {
                name: '管道表达式',
                expression: 'people[*].first | [0]',
                case: `{
      "people": [
        {"first": "James", "last": "d"},
        {"first": "Jacob", "last": "e"},
        {"first": "Jayden", "last": "f"},
        {"missing": "different"}
      ],
      "foo": {"bar": "baz"}
    }`,
                result: '"James"'
            }, {
                name: '多选',
                expression: 'people[].{Name: name, State: state.name}',
                case: `{
      "people": [
        {
          "name": "a",
          "state": {"name": "up"}
        },
        {
          "name": "b",
          "state": {"name": "down"}
        },
        {
          "name": "c",
          "state": {"name": "up"}
        }
      ]
    }`,
                result: `[
      {
        "Name": "a",
        "State": "up"
      },
      {
        "Name": "b",
        "State": "down"
      },
      {
        "Name": "c",
        "State": "up"
      }
    ]`
            }, {
                name: '函数',
                expression: 'max_by(people, &age).name',
                case: `{
      "people": [
        {
          "name": "b",
          "age": 30
        },
        {
          "name": "a",
          "age": 50
        },
        {
          "name": "c",
          "age": 40
        }
      ]
    }`,
                result: '"a"'
            }];
        this.__expressionText = new ObservedPropertySimple(this.defaultExampleArray[0].expression, this, "expressionText");
        this.__caseText = new ObservedPropertySimple(this.defaultExampleArray[0].case, this, "caseText");
        this.__resultText = new ObservedPropertySimple(this.defaultExampleArray[0].result, this, "resultText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.defaultExampleArray !== undefined) {
            this.defaultExampleArray = params.defaultExampleArray;
        }
        if (params.expressionText !== undefined) {
            this.expressionText = params.expressionText;
        }
        if (params.caseText !== undefined) {
            this.caseText = params.caseText;
        }
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
    }
    aboutToBeDeleted() {
        this.__expressionText.aboutToBeDeleted();
        this.__caseText.aboutToBeDeleted();
        this.__resultText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private defaultExampleArray: TestExample[];
    private __expressionText: ObservedPropertySimple<string>;
    get expressionText() {
        return this.__expressionText.get();
    }
    set expressionText(newValue: string) {
        this.__expressionText.set(newValue);
    }
    private __caseText: ObservedPropertySimple<string>;
    get caseText() {
        return this.__caseText.get();
    }
    set caseText(newValue: string) {
        this.__caseText.set(newValue);
    }
    private __resultText: ObservedPropertySimple<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.margin({ top: 5, left: 10, bottom: 50, right: 10 });
        Text.create('选择示例：');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Select.create([{ value: '基本表达式' },
            { value: '切片' },
            { value: '列表和切片投影' },
            { value: '对象投影' },
            { value: '展平投影' },
            { value: '过滤投影' },
            { value: '管道表达式' },
            { value: '多选' },
            { value: '函数' }]);
        Select.selected(0);
        Select.value('基本表达式');
        Select.font({ size: 16, weight: 500 });
        Select.fontColor('#182431');
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number) => {
            this.expressionText = this.defaultExampleArray[index].expression;
            this.caseText = this.defaultExampleArray[index].case;
            this.resultText = this.defaultExampleArray[index].result;
        });
        Select.pop();
        Text.create('输入表达式：');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Search.create({ value: this.expressionText });
        Search.searchButton('搜索');
        Search.width('95%');
        Search.height(40);
        Search.backgroundColor('#F5F5F5');
        Search.placeholderColor(Color.Black);
        Search.placeholderFont({ size: 14, weight: 400 });
        Search.textFont({ size: 14, weight: 400 });
        Search.onSubmit((value: string) => {
            if (!value || value === '') {
                this.resultText = '表达式为空，请输入表达式';
                return;
            }
            try {
                let result: number | string = JmesPath.search(JSON.parse(this.caseText), value);
                if (result) {
                    this.resultText = JSON.stringify(result);
                }
                else {
                    this.resultText = '没有找到对应结果';
                }
            }
            catch (error) {
                console.error(`Search exception, error: ${error.message}.`);
                this.resultText = '搜索异常，请检查表达式是否正确';
            }
        });
        Search.pop();
        Text.create('测试数据：');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextArea.create({ text: this.caseText });
        TextArea.placeholderFont({ size: 16, weight: 400 });
        TextArea.width(336);
        TextArea.margin(10);
        TextArea.fontSize(16);
        TextArea.fontColor('#ff1f1f1f');
        TextArea.backgroundColor('#fff3f3f3');
        TextArea.onChange((value: string) => {
            this.caseText = value;
        });
        Text.create('测试结果：');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.resultText);
        Text.fontSize(20);
        Text.margin(10);
        Text.padding(10);
        Text.borderRadius(10);
        Text.width('90%');
        Text.fontSize(16);
        Text.fontColor('#ff1f1f1f');
        Text.backgroundColor('#ffc3c3c3');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
