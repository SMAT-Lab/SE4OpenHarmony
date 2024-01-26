interface Index_Params {
    arr?: number[];
    message?: string;
    apis?: Array<ModuleItem>;
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
import prompt from '@ohos.prompt';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as ns from 'dayjs/locale/zh-cn';
dayjs.extend(customParseFormat);
dayjs.locale("zh-cn");
interface ApiItem {
    apiName: string;
    func: () => void;
    des?: string;
}
interface ModuleItem {
    moduleName: string;
    examples: Array<ApiItem>;
}
let apisIndex: Array<ModuleItem> = [
    {
        moduleName: "Parse",
        examples: [
            {
                apiName: "dayjs('20130108').valueOf()",
                des: "解析无分隔符的时间，得到时间戳",
                func: () => {
                    showMessage(dayjs('20130108').valueOf().toString());
                }
            },
            {
                apiName: "dayjs( '2018-04-24').valueOf()",
                des: "解析带-的时间，得到时间戳",
                func: () => {
                    showMessage(dayjs('2018-04-24').valueOf().toString());
                }
            },
            {
                apiName: "dayjs('2018-04-24 11:12').format()",
                des: "解析带时分的时间",
                func: () => {
                    showMessage(dayjs('2018-04-24 11:12').format());
                }
            },
            {
                apiName: "dayjs( '2018-05-02 11:12:13').valueOf()",
                des: "解析带时分秒的时间",
                func: () => {
                    showMessage(dayjs('2018-05-02 11:12:13').valueOf().toString());
                }
            },
            {
                apiName: "dayjs().toJSON()",
                des: "通过同toJSON获取当前时间",
                func: () => {
                    showMessage(dayjs().toJSON());
                }
            },
            {
                apiName: "dayjs('2018-05-02 11:12:13.998').valueOf()",
                des: "解析带时分秒毫秒的时间",
                func: () => {
                    showMessage(dayjs('2018-05-02 11:12:13.998').valueOf().toString());
                }
            },
            {
                apiName: "dayjs( '2018-4-1').valueOf()",
                des: "获取时间戳",
                func: () => {
                    showMessage(dayjs('2018-4-1').valueOf().toString());
                }
            },
            {
                apiName: "dayjs().second()",
                des: "获取当前秒",
                func: () => {
                    showMessage(dayjs().second() + "");
                }
            },
            {
                apiName: "dayjs().minute()",
                des: "获取当前分",
                func: () => {
                    showMessage(dayjs().minute() + "");
                }
            },
            {
                apiName: "dayjs().hour()",
                des: "获取当前时",
                func: () => {
                    showMessage(dayjs().hour() + "");
                }
            },
            {
                apiName: "dayjs().date()",
                des: "获取当前日",
                func: () => {
                    showMessage(dayjs().date().toString());
                }
            },
            {
                apiName: "dayjs().day()",
                des: "获取当前周",
                func: () => {
                    showMessage(dayjs().day() + "");
                }
            },
            {
                apiName: "dayjs().day(5).day()",
                des: "获取指定周五",
                func: () => {
                    showMessage(dayjs().day(5).day() + "");
                }
            },
            {
                apiName: "dayjs().month()",
                des: "获取当前月",
                func: () => {
                    showMessage(dayjs().month() + "");
                }
            },
            {
                apiName: "dayjs().year()",
                des: "获取当前年",
                func: () => {
                    showMessage(dayjs().year() + "");
                }
            },
            {
                apiName: 'dayjs("2024-01-10 20:00:00").startOf("day").subtract(1,"hour").format()',
                des: "通过startOf设置某天的开始",
                func: () => {
                    showMessage(dayjs("2024-01-10 02:00:00").startOf("day").subtract(1, "hour").format() + "");
                }
            },
            {
                apiName: 'dayjs("2024-01-10 20:00:00").endOf("day").add(1,"hour").format()',
                des: "通过endOf设置某天的结束",
                func: () => {
                    showMessage(dayjs("2024-01-10 20:00:00").endOf("day").add(1, "hour").format() + "");
                }
            },
            {
                apiName: 'dayjs("2023-12-31").diff("2024-01-10","days")',
                des: "获取时间差(天)",
                func: () => {
                    showMessage(dayjs("2023-12-31").diff("2024-01-10", "days") + "");
                }
            },
            {
                apiName: 'dayjs().daysInMonth()',
                des: "获取当前月天数",
                func: () => {
                    showMessage(dayjs().daysInMonth() + "");
                }
            },
            {
                apiName: "dayjs().get('year');",
                des: "通过get方式获取当前年",
                func: () => {
                    showMessage(dayjs().get('year') + "");
                }
            },
            {
                apiName: "dayjs().set('year', 2013);",
                des: "通过set方式设置当前年",
                func: () => {
                    showMessage(dayjs().set('year', 2013).format());
                }
            },
            {
                apiName: "dayjs().subtract(1, 'day')",
                des: "当前日期往前一天",
                func: () => {
                    showMessage(dayjs().subtract(1, 'day').format());
                }
            },
            {
                apiName: "dayjs().add(1, 'day')",
                des: "当前日期往后一天",
                func: () => {
                    showMessage(dayjs().add(1, 'day').format());
                }
            },
        ],
    }
];
function showMessage(text: string) {
    prompt.showToast({ message: text + "" || "没有任何信息..." });
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__apis = new ObservedPropertyObject(apisIndex, this, "apis");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.apis !== undefined) {
            this.apis = params.apis;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__apis.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __apis: ObservedPropertyObject<Array<ModuleItem>>;
    get apis() {
        return this.__apis.get();
    }
    set apis(newValue: Array<ModuleItem>) {
        this.__apis.set(newValue);
    }
    BuildItemForAPI(param: ModuleItem, parent = null) {
        Column.create();
        Text.create(param.moduleName);
        Text.fontSize(30);
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(param.examples), (item: ApiItem, index) => {
            Flex.create({ alignItems: ItemAlign.Start, direction: FlexDirection.Column });
            Flex.padding(10);
            Flex.margin({ bottom: 10 });
            Flex.width("100%");
            Column.create();
            Text.create(`${item.apiName}`);
            Text.fontSize(20);
            Text.margin({ bottom: 8 });
            Text.width("100%");
            Text.pop();
            Text.create(`描述：${item.des || "无"}`);
            Text.fontSize(16);
            Text.fontColor(Color.Red);
            Text.width("100%");
            Text.margin({ top: 10, bottom: 20 });
            Text.pop();
            Column.pop();
            Button.createWithLabel("运行");
            Button.onClick(() => item.func());
            Button.width("100%");
            Button.pop();
            Flex.pop();
        });
        ForEach.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        List.create();
        List.width("100%");
        ForEach.create("3", this, ObservedObject.GetRawObject(this.apis), (v: ModuleItem, index) => {
            ListItem.create();
            this.BuildItemForAPI({ moduleName: v.moduleName, examples: v.examples }, this);
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
