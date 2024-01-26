/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
export class JList<T> {
    dataSouce: Array<T>;
    // 列表的大小
    listSize: number;
    // 列表中当前的位置
    pos: number;
    constructor() {
        this.dataSouce = [];
        // 列表的大小
        this.listSize = 0;
        // 列表中当前的位置
        this.pos = 0;
    }
    /**
      * 在列表的末尾添加新元素
      * @param {*} element 要添加的元素
    */
    append(element: T) {
        this.dataSouce[this.listSize++] = element;
    }
    /**
      * 在列表中插入一个元素
      * @param {*} element
      * @param {*} after
     */
    insert(element: T) {
        this.dataSouce.push(element);
        this.listSize++;
    }
    /**
    * 在列表中移除一个元素
    * @param {*} element 要删除的元素
    */
    remove(element: T) {
        // 查找当前元素的索引
        const index = this.dataSouce.indexOf(element);
        if (index >= 0) {
            this.dataSouce.splice(index, 1);
            this.listSize--;
            return true;
        }
        return false;
    }
    /**
    * 判断给定的值是否在列表中
    */
    contains(element: T) {
        return this.dataSouce.indexOf(element) > -1;
    }
    /**
    * 将列表的当前位置设移动到第一个元素
    */
    front() {
        this.pos = 0;
    }
    /**
     * 将列表的当前位置移动到最后一个元素
    */
    end() {
        this.pos = this.listSize - 1;
    }
    /**
    * 将当前位置前移一位
    */
    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }
    /**
    * 将当前位置向后移一位
    */
    next() {
        if (this.pos <= (this.listSize - 1)) {
            ++this.pos;
        }
    }
    /**
    * 返回列表的当前位置
    */
    currPos() {
        return this.pos;
    }
    /**
    * 将当前位置移动到指定位置
    * @param {*} position
    */
    moveTo(position) {
        this.pos = position;
    }
    /**
    * 返回当前位置的元素
    */
    getElement() {
        return this.dataSouce[this.pos];
    }
    /**
    * 返回指定位置的元素
    */
    get(pos: number) {
        return this.dataSouce[pos];
    }
    /**
    * 清楚列表中的元素
    */
    clear() {
        delete this.dataSouce;
        this.dataSouce = [];
        this.listSize = 0;
        this.pos = 0;
    }
    /**
    * 列表的长度
    */
    length(): number {
        return this.listSize;
    }
    /**
    * 显示当前列表的元素
    */
    toString() {
        return this.dataSouce;
    }
}
