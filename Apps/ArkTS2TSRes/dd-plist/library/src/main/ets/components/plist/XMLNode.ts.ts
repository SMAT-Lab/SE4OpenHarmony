/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
class XMLNode {
    eventType: number;
    name: string;
    text: string;
    depth: number;
    childNodes: Array<XMLNode> = new Array();
    public constructor(eventType?: number, name?: string, text?: string, depth?: number) {
        this.eventType = eventType;
        this.name = name;
        this.text = text;
        this.depth = depth;
    }
    public setEventType(eventType: number) {
        this.eventType = eventType;
    }
    public setName(name: string) {
        this.name = name;
    }
    public setText(text: string) {
        this.text = text;
    }
    public setDepth(depth: number) {
        this.depth = depth;
    }
    public getEventType(): number {
        return this.eventType;
    }
    public getName(): string {
        return this.name;
    }
    public getText(): string {
        return this.text;
    }
    public getDepth(): number {
        return this.depth;
    }
    public setChildNodes(arr: Array<XMLNode>) {
        this.childNodes = arr;
    }
    public addChildNode(n: XMLNode) {
        this.childNodes.push(n);
    }
    public getChildNodes(): Array<XMLNode> {
        return this.childNodes;
    }
    public toString(): string {
        return "XMLNode: {eventType: " + this.eventType + ", name: " + this.name + ", text: " + this.text + ", depth: " + this.depth + "}";
    }
}
export default XMLNode;
