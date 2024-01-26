/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class StackUtil <T> {
  public dataStore: Array<T> = [];
  public top: number = 0;

  /*使用栈stack类的实现*/
  constructor() {
    //    this.dataStore = []; //保存栈内元素，初始化为一个空数组
    //    this.top = 0; //栈顶位置，初始化为0
    //    this.push = push; //入栈
    //    this.pop = pop; //出栈
    //    this.peek = peek; //查看栈顶元素
    //    this.clear = clear; //清空栈
    //    this.length = length; //栈内存放元素的个数
  }

  public push(element: T) {
    this.dataStore[this.top++] = element;
  }

  public pop(): T {
    return this.dataStore[--this.top];
  }

  public peek(): T {
    return this.dataStore[this.top-1];
  }

  public clear(): void {
    this.top = 0;
  }

  public length(): number {
    return this.top;
  }

  public empty(): boolean{
    if (this.top == 0) {
      return true
    } else {
      return false
    }
  }
}

export default StackUtil