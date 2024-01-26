interface Index_Params {
    message?: string;
    rule?: string;
    parse?: boolean | undefined;
    comment?: string;
    container?: number;
    declaration?: string;
    fromJson?: string;
    lazyResult?: string;
    list?: Array<string>;
    node?: string;
    postcss?: Array<ESObject>;
    previous?: boolean | undefined;
    processor?: string;
    result?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import postcss from '@ohos/postcss';
import Rule from '@ohos/postcss/src/main/ets/components/lib/rule';
import LazyResult from '@ohos/postcss/src/main/ets/components/lib/lazy-result';
import Processor from '@ohos/postcss/src/main/ets/components/lib/processor';
import { Root, } from '@ohos/postcss/src/main/ets/components/lib/postcss';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('test', this, "message");
        this.__rule = new ObservedPropertySimple('', this, "rule");
        this.__parse = new ObservedPropertySimple(false, this, "parse");
        this.__comment = new ObservedPropertySimple('', this, "comment");
        this.__container = new ObservedPropertySimple(0, this, "container");
        this.__declaration = new ObservedPropertySimple('', this, "declaration");
        this.__fromJson = new ObservedPropertySimple('', this, "fromJson");
        this.__lazyResult = new ObservedPropertySimple('', this, "lazyResult");
        this.__list = new ObservedPropertyObject([], this, "list");
        this.__node = new ObservedPropertySimple('', this, "node");
        this.__postcss = new ObservedPropertyObject([], this, "postcss");
        this.__previous = new ObservedPropertySimple(false, this, "previous");
        this.__processor = new ObservedPropertySimple('', this, "processor");
        this.__result = new ObservedPropertySimple('', this, "result");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.rule !== undefined) {
            this.rule = params.rule;
        }
        if (params.parse !== undefined) {
            this.parse = params.parse;
        }
        if (params.comment !== undefined) {
            this.comment = params.comment;
        }
        if (params.container !== undefined) {
            this.container = params.container;
        }
        if (params.declaration !== undefined) {
            this.declaration = params.declaration;
        }
        if (params.fromJson !== undefined) {
            this.fromJson = params.fromJson;
        }
        if (params.lazyResult !== undefined) {
            this.lazyResult = params.lazyResult;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.postcss !== undefined) {
            this.postcss = params.postcss;
        }
        if (params.previous !== undefined) {
            this.previous = params.previous;
        }
        if (params.processor !== undefined) {
            this.processor = params.processor;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__rule.aboutToBeDeleted();
        this.__parse.aboutToBeDeleted();
        this.__comment.aboutToBeDeleted();
        this.__container.aboutToBeDeleted();
        this.__declaration.aboutToBeDeleted();
        this.__fromJson.aboutToBeDeleted();
        this.__lazyResult.aboutToBeDeleted();
        this.__list.aboutToBeDeleted();
        this.__node.aboutToBeDeleted();
        this.__postcss.aboutToBeDeleted();
        this.__previous.aboutToBeDeleted();
        this.__processor.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    public __rule: ObservedPropertySimple<string>;
    get rule() {
        return this.__rule.get();
    }
    set rule(newValue: string) {
        this.__rule.set(newValue);
    }
    public __parse: ObservedPropertySimple<boolean | undefined>;
    get parse() {
        return this.__parse.get();
    }
    set parse(newValue: boolean | undefined) {
        this.__parse.set(newValue);
    }
    public __comment: ObservedPropertySimple<string>;
    get comment() {
        return this.__comment.get();
    }
    set comment(newValue: string) {
        this.__comment.set(newValue);
    }
    public __container: ObservedPropertySimple<number>;
    get container() {
        return this.__container.get();
    }
    set container(newValue: number) {
        this.__container.set(newValue);
    }
    public __declaration: ObservedPropertySimple<string>;
    get declaration() {
        return this.__declaration.get();
    }
    set declaration(newValue: string) {
        this.__declaration.set(newValue);
    }
    public __fromJson: ObservedPropertySimple<string>;
    get fromJson() {
        return this.__fromJson.get();
    }
    set fromJson(newValue: string) {
        this.__fromJson.set(newValue);
    }
    public __lazyResult: ObservedPropertySimple<string>;
    get lazyResult() {
        return this.__lazyResult.get();
    }
    set lazyResult(newValue: string) {
        this.__lazyResult.set(newValue);
    }
    public __list: ObservedPropertyObject<Array<string>>;
    get list() {
        return this.__list.get();
    }
    set list(newValue: Array<string>) {
        this.__list.set(newValue);
    }
    public __node: ObservedPropertySimple<string>;
    get node() {
        return this.__node.get();
    }
    set node(newValue: string) {
        this.__node.set(newValue);
    }
    public __postcss: ObservedPropertyObject<Array<any>>;
    get postcss() {
        return this.__postcss.get();
    }
    set postcss(newValue: Array<any>) {
        this.__postcss.set(newValue);
    }
    public __previous: ObservedPropertySimple<boolean | undefined>;
    get previous() {
        return this.__previous.get();
    }
    set previous(newValue: boolean | undefined) {
        this.__previous.set(newValue);
    }
    public __processor: ObservedPropertySimple<string>;
    get processor() {
        return this.__processor.get();
    }
    set processor(newValue: string) {
        this.__processor.set(newValue);
    }
    public __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    render() {
        Scroll.create();
        Row.create();
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('rule');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.ruleClick();
        });
        Button.pop();
        Text.create("结果 :" + this.rule);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('comment');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.commentClick();
        });
        Button.pop();
        Text.create("结果 :" + this.comment);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('container');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.containerClick();
        });
        Button.pop();
        Text.create("结果 :" + this.container);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('declaration');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.declarationClick();
        });
        Button.pop();
        Text.create("结果 :" + this.declaration);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('fromJson');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.fromJsonClick();
        });
        Button.pop();
        Text.create("结果 :" + this.fromJson);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('lazyResult');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.lazyResultClick();
        });
        Button.pop();
        Text.create("结果 :" + this.lazyResult);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('list');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.listClick();
        });
        Button.pop();
        Text.create("结果 :" + this.list);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('node');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.nodeClick();
        });
        Button.pop();
        Text.create("结果 :" + this.node);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('parse');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.parseClick();
        });
        Button.pop();
        Text.create("结果 :" + this.parse);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('postcss');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.postcssClick();
        });
        Button.pop();
        Text.create("结果 :" + this.postcss);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('previous-map');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.previousClick();
        });
        Button.pop();
        Text.create("结果 :" + this.previous);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('processor');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.processorClick();
        });
        Button.pop();
        Text.create("结果 :" + this.processor);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Button.createWithLabel('result');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.resultClick();
        });
        Button.pop();
        Text.create("结果 :" + this.result);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: "30px" });
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
    ruleClick() {
        let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' });
        this.rule = rule.name;
    }
    commentClick() {
        let comment = new postcss.Comment({ text: 'hi' });
        this.comment = comment.toString();
    }
    containerClick() {
        let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule;
        let size = 0;
        rule.each(() => {
            rule.prepend({ prop: 'color', value: 'aqua' });
            size += 1;
        });
        this.container = size;
    }
    declarationClick() {
        let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
        this.declaration = decl.prop;
    }
    fromJsonClick() {
        try {
            let result = postcss.fromJSON({ type: 'not-a-node-type' });
            if (result) {
            }
            else {
            }
        }
        catch (err) {
            this.fromJson = `${err}`;
        }
    }
    lazyResultClick() {
        let processor = new Processor();
        let result = new LazyResult(processor, 'a {}', {});
        this.lazyResult = result.root.type;
    }
    listClick() {
        this.list = postcss.list.space('a b');
    }
    nodeClick() {
        let rule = new postcss.Rule({ selector: 'a' });
        let error = rule.error('Test');
        this.node = error.message;
    }
    parseClick() {
        let css = postcss.parse('\uFEFF@host { a {\f} }');
        this.parse = css.first?.source?.input.hasBOM;
    }
    postcssClick() {
        let a = (): void => { };
        let b = (): void => { };
        this.postcss = postcss(a, b).plugins;
    }
    previousClick() {
        let map2: any = {
            version: 3,
            file: 'b',
            sources: ['a'],
            names: [],
            mappings: ''
        };
        this.previous = postcss.parse('a{}', {
            map: {
                prev: map2
            }
        }).source?.input.map.withContent();
    }
    processorClick() {
        let beforeFix = new Processor([
            (root: Root) => {
                root.walkRules(rule => {
                    if (!rule.selector.match(new RegExp('::(before|after)')))
                        return;
                    if (!rule.some(i => i.type === 'decl' && i.prop === 'content')) {
                        rule.prepend({ prop: 'content', value: '""' });
                    }
                });
            }
        ]);
        let result = beforeFix.process('a::before{top:0}');
        this.processor = result.css;
    }
    resultClick() {
        let processor = new Processor();
        let css = postcss.parse('a{}');
        let result = new postcss.Result(processor, css, {});
        result.warn('TT', { node: css.first });
        this.result = result.messages[0].toString();
    }
}
loadDocument(new Index("1", undefined, {}));
