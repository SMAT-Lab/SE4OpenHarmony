/**
 * The MIT License
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import Tag from './Tag';
export default class LabelSupplement {
    private static template: string = '';
    public static process(input: string): void {
        var tags: Array<Tag> = new Array<Tag>();
        var lastTag: Tag;
        let splits: string[];
        if (input.indexOf("\n") != -1) {
            splits = input.split("\n", input.length);
        }
        if (input.indexOf("\r\n") != -1) {
            splits = input.split("\r\n", input.length);
        }
        splits.forEach((value, index, array) => {
            var indentCount: number = 0;
            var tagName: string[] = value.split("\t");
            tagName.forEach((childValue, index, array) => {
                if (childValue == "")
                    indentCount++;
            });
            var tag: Tag = new Tag();
            tag.setIndentCount(indentCount);
            var attributes: string[];
            attributes = tagName[tagName.length - 1].split(" ");
            tag.setName(attributes[0]);
            attributes.forEach((attr) => {
                var attrs: string[] = attr.split(":");
                if (attrs.length > 0) {
                    tag.setAttributes(new Map().set(attrs[0], attrs[1]));
                }
            });
            LabelSupplement.analyzeTagStructure(tags, tag, lastTag);
            lastTag = tag;
        });
        LabelSupplement.show(tags);
    }
    private static analyzeTagStructure(tags: Array<Tag>, tag: Tag, lastTag: Tag): void {
        if (lastTag == null) {
            tags.push(tag);
        }
        else {
            let indentCount = tag.getIndentCount();
            let lastIndentCount = lastTag.getIndentCount();
            if (indentCount == lastIndentCount) {
                tag.setParent(lastTag.getParent());
                lastTag.getParent().getChildren().push(tag);
            }
            else if (indentCount > lastIndentCount) {
                tag.setParent(lastTag);
                lastTag.getChildren().push(tag);
            }
            else {
                var tmpParentTag = lastTag.getParent();
                while (true) {
                    if (tmpParentTag == null) {
                        tags.push(tag);
                        break;
                    }
                    else if (indentCount > tmpParentTag.getIndentCount()) {
                        tag.setParent(tmpParentTag);
                        tmpParentTag.getChildren().push(tag);
                        break;
                    }
                    tmpParentTag = tmpParentTag.getParent();
                }
            }
        }
    }
    private static show(tags: Array<Tag>): void {
        tags.forEach((it: Tag, index, array) => {
            LabelSupplement.showTag(it);
            if (it.getChildren().length > 0) {
                LabelSupplement.show(it.getChildren());
                console.info("</" + it.getName() + ">");
                LabelSupplement.template += "</" + it.getName() + ">";
            }
        });
    }
    private static showTag(tag: Tag): void {
        var a = '';
        tag.getAttributes().forEach((value, key, map) => {
            if (!!!key || !!!value) {
                return;
            }
            a += (key + ":" + value);
        });
        if (!!!tag.getAttributes().get("")) {
            if (a != '') {
                LabelSupplement.template += "<" + tag.getName() + " " + a + ">";
            }
            else {
                LabelSupplement.template += "<" + tag.getName() + a + ">";
            }
            console.info("<" + tag.getName() + "" + a + ">");
        }
        else {
            LabelSupplement.template += "<" + tag.getName() + a + ">" + tag.getAttributes().get("");
            console.info("<" + tag.getName() + " " + a + ">" + tag.getAttributes().get(""));
        }
        if (tag.getChildren().length == 0) {
            LabelSupplement.template += "</" + tag.getName() + ">";
            console.info("</" + tag.getName() + ">");
        }
    }
    public static getTemplate(): string {
        return LabelSupplement.template;
    }
}
