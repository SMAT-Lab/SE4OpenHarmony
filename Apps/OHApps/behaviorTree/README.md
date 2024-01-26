# behaviortree

## 介绍

[behaviortree](https://github.com/Calamari/BehaviorTree.js)，是行为树 javascript 版实现，可以运行 node.js 和浏览器中，本库基于 [behaviortree](https://github.com/Calamari/BehaviorTree.js)原库 v2.1.0 版本进行验证。

## 下载安装

```javascript
ohpm install behaviortree
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

```javascript
import { BehaviorTree } from "behaviortree";
```

## 示例

### 1.创建一个简单的任务

```javascript
import { Task, SUCCESS } from "behaviortree";

const myTask = new Task({
  // (optional) this function is called directly before the run method
  // is called. It allows you to setup things before starting to run
  start: function (blackboard) {
    blackboard.isStarted = true;
  },

  // (optional) this function is called directly after the run method
  // is completed with either this.success() or this.fail(). It allows you to clean up
  // things, after you run the task.
  end: function (blackboard) {
    blackboard.isStarted = false;
  },

  // This is the meat of your task. The run method does everything you want it to do.
  run: function (blackboard) {
    return SUCCESS;
  },
});
```

方法：

- start - 在调用运行之前调用。但如果任务在以 this.running()结束后恢复
- end - 在调用运行后调用。但如果任务以 this.running()结束则不会
- run - 包含你希望任务做的事情

### 2.创建序列

```javascript
import { Sequence } from "behaviortree";

const mySequence = new Sequence({
  nodes: [
    // here comes in a list of nodes (Tasks, Sequences or Priorities)
    // as objects or as registered strings
  ],
});
```

### 3.创建优先级选择器

```javascript
import { Selector } from "behaviortree";

const mySelector = new Selector({
  nodes: [
    // here comes in a list of nodes (Tasks, Sequences or Priorities)
    // as objects or as registered strings
  ],
});
```

### 4.创建随机选择器

```javascript
import { Random } from "behaviortree";

const mySelector = new Random({
  nodes: [
    // here comes in a list of nodes (Tasks, Sequences or Priorities)
    // as objects or as registered strings
  ],
});
```

### 5.创建行为树实例

```javascript
import { BehaviorTree } from "behaviortree";

var bTree = new BehaviorTree({
  tree: mySelector,
  blackboard: {},
});
```

### 6.遍历行为树

```javascript
bTree.step();
```

[单元测试用例](https://gitee.com/tybrave/openharmony_tpc_samples/tree/master/behaviortree/TEST.md)详情可参考

## 约束与限制

在下述版本验证通过：
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)
- DevEco Studio: 3.1 Beta1(3.1.0.400)，OpenHarmony SDK: API9（3.2.11.9）。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/behaviortreeDemo/LICENSE)
，请自由地享受和参与开源。
