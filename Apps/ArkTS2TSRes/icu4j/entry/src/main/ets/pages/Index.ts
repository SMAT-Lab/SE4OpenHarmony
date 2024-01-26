interface Index_Params {
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import * as intl_messageformat_parser from '@f-fjs/intl-messageformat-parser';
import { ExtendedDateTimeFormatOptions, MessageFormatElement } from '@f-fjs/intl-messageformat-parser';
import { setData, CustomDialogExample } from './loading';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Column.create({ space: 20 });
        Column.width('100%');
        Button.createWithLabel('parse测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input = 'On{takenDate,date,short} {name} took {numPhotos,plural, =0 {no photos.} =1{one photo.} other {# photos}}';
            let ast: MessageFormatElement[] = intl_messageformat_parser.parse(input);
            setData(JSON.stringify(ast), this.dialogController);
        });
        Button.pop();
        Button.createWithLabel('isLiteralElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.LiteralElement = {
                type: intl_messageformat_parser.TYPE.literal, value: 'testValue'
            };
            let typesResult: boolean = intl_messageformat_parser.isLiteralElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isArgumentElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.ArgumentElement = {
                type: intl_messageformat_parser.TYPE.argument, value: 'testValue'
            };
            let typesResult: boolean = intl_messageformat_parser.isArgumentElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isNumberElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.NumberElement = {
                type: intl_messageformat_parser.TYPE.number, value: 'testValue'
            };
            let typesResult: boolean = intl_messageformat_parser.isNumberElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isDateElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.DateElement = {
                type: intl_messageformat_parser.TYPE.date, value: 'testValue'
            };
            let typesResult: boolean = intl_messageformat_parser.isDateElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isTimeElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.TimeElement = {
                type: intl_messageformat_parser.TYPE.time, value: 'testValue'
            };
            let typesResult: boolean = intl_messageformat_parser.isTimeElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isSelectElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.SelectElement = {
                type: intl_messageformat_parser.TYPE.select, value: 'testValue', options: {} as any
            };
            let typesResult: boolean = intl_messageformat_parser.isSelectElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isPluralElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.PluralElement = {
                type: intl_messageformat_parser.TYPE.plural,
                value: 'testValue',
                options: {} as any,
                offset: 0,
                pluralType: undefined
            };
            let typesResult: boolean = intl_messageformat_parser.isPluralElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isPoundElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.PoundElement = {
                type: intl_messageformat_parser.TYPE.pound
            };
            let typesResult: boolean = intl_messageformat_parser.isPoundElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isTagElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.TagElement = {
                type: intl_messageformat_parser.TYPE.tag, value: 'testValue', children: []
            };
            const typesResult: boolean = intl_messageformat_parser.isTagElement(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isNumberSkeleton测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.NumberSkeleton = {
                type: intl_messageformat_parser.SKELETON_TYPE.number, tokens: []
            };
            let typesResult: boolean = intl_messageformat_parser.isNumberSkeleton(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('isDateTimeSkeleton测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input: intl_messageformat_parser.DateTimeSkeleton = {
                type: intl_messageformat_parser.SKELETON_TYPE.dateTime, pattern: ''
            };
            let typesResult: boolean = intl_messageformat_parser.isDateTimeSkeleton(input);
            if (typesResult) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('createLiteralElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let typesResult: intl_messageformat_parser.LiteralElement = intl_messageformat_parser.createLiteralElement('testValue');
            if (typesResult.value == 'testValue') {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('createNumberElement测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let typesResult: intl_messageformat_parser.NumberElement = intl_messageformat_parser.createNumberElement('testValue');
            if (typesResult.value == 'testValue') {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('parseDateTimeSkeleton测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let input = 'ymd';
            let skeletonResult: ExtendedDateTimeFormatOptions = intl_messageformat_parser.parseDateTimeSkeleton(input);
            if (skeletonResult != null) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Button.createWithLabel('convertNumberSkeletonToNumberFormatOptions测试');
        Button.fontSize(24);
        Button.onClick(() => {
            let skeletonTokens: intl_messageformat_parser.NumberSkeletonToken[] = [{
                    stem: 'percent', options: ['testOptions']
                }];
            let skeletonResult: any = intl_messageformat_parser.convertNumberSkeletonToNumberFormatOptions(skeletonTokens);
            if (skeletonResult != null) {
                setData('测试成功', this.dialogController);
            }
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
