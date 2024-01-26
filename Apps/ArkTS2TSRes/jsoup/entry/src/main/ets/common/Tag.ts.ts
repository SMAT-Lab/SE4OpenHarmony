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
export default class Tag {
    private name: string;
    private indentCount: number;
    private attributes: Map<string, string>;
    private children: Array<Tag>;
    private parent: Tag;
    public constructor() {
        this.attributes = new Map<string, string>();
        this.children = new Array<Tag>();
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getIndentCount(): number {
        return this.indentCount;
    }
    public setIndentCount(indentCount: number): void {
        this.indentCount = indentCount;
    }
    public getAttributes(): Map<string, string> {
        return this.attributes;
    }
    public setAttributes(attributes: Map<string, string>): void {
        this.attributes = attributes;
    }
    public getChildren(): Array<Tag> {
        return this.children;
    }
    public setChildren(children: Array<Tag>): void {
        this.children = children;
    }
    public getParent(): Tag {
        return this.parent;
    }
    public setParent(parent: Tag): void {
        this.parent = parent;
    }
    public toString(): string {
        return "Tag{" +
            "name='" + this.name + '\'' +
            ", indentCount=" + this.indentCount +
            ", attributes=" + this.attributes +
            ", children=" + this.children +
            ", parent=" + this.parent +
            '}';
    }
}
