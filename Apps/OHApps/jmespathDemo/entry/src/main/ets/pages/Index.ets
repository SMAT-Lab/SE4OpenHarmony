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

@Entry
@Component
struct Index {
  defaultExampleArray: TestExample[] = [{
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
  }]
  @State expressionText: string = this.defaultExampleArray[0].expression
  @State caseText: string = this.defaultExampleArray[0].case
  @State resultText: string = this.defaultExampleArray[0].result

  build() {
    Scroll() {
      Column() {
        Text('选择示例：')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        Select([{ value: '基本表达式' },
          { value: '切片' },
          { value: '列表和切片投影' },
          { value: '对象投影' },
          { value: '展平投影' },
          { value: '过滤投影' },
          { value: '管道表达式' },
          { value: '多选' },
          { value: '函数' }])
          .selected(0)
          .value('基本表达式')
          .font({ size: 16, weight: 500 })
          .fontColor('#182431')
          .selectedOptionFont({ size: 16, weight: 400 })
          .optionFont({ size: 16, weight: 400 })
          .onSelect((index: number) => {
            this.expressionText = this.defaultExampleArray[index].expression
            this.caseText = this.defaultExampleArray[index].case
            this.resultText = this.defaultExampleArray[index].result
          })
        Text('输入表达式：')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        Search({ value: this.expressionText })
          .searchButton('搜索')
          .width('95%')
          .height(40)
          .backgroundColor('#F5F5F5')
          .placeholderColor(Color.Black)
          .placeholderFont({ size: 14, weight: 400 })
          .textFont({ size: 14, weight: 400 })
          .onSubmit((value: string) => {
            if (!value || value === '') {
              this.resultText = '表达式为空，请输入表达式'
              return
            }
            try {
              let result: number | string = JmesPath.search(JSON.parse(this.caseText), value)
              if (result) {
                this.resultText = JSON.stringify(result)
              } else {
                this.resultText = '没有找到对应结果'
              }
            } catch (error) {
              console.error(`Search exception, error: ${error.message}.`)
              this.resultText = '搜索异常，请检查表达式是否正确'
            }
          })
        Text('测试数据：')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        TextArea({ text: this.caseText })
          .placeholderFont({ size: 16, weight: 400 })
          .width(336)//.height(a)
          .margin(10)
          .fontSize(16)
          .fontColor('#ff1f1f1f')
          .backgroundColor('#fff3f3f3')
          .onChange((value: string) => {
            this.caseText = value
          })
        Text('测试结果：')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        Text(this.resultText)
          .fontSize(20)
          .margin(10)
          .padding(10)
          .borderRadius(10)
          .width('90%')
          .fontSize(16)
          .fontColor('#ff1f1f1f')
          .backgroundColor('#ffc3c3c3')
          .fontWeight(FontWeight.Bold)
      }.width('100%')
      .alignItems(HorizontalAlign.Start)
      .margin({ top: 5, left: 10, bottom: 50, right: 10 })
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(10)
  }
}