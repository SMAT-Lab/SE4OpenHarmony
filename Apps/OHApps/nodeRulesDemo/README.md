# node-rules

## 介绍

node-rules 是一个轻量级的正向链接规则引擎。

## 下载安装

1.如果已经安装好 nodejs 之后，输入以下命令。

```
ohpm install node-rules@7.2.0
```

OpenHarmony
ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony har包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

2.在需要使用的页面导入 node-rules。

```
import RuleEngine from "node-rules"
```

## 使用说明

1.定义规则
规则将有条件及其相应的结果组成。

```
    class Rule {
      condition(R: ESObject) {
        R.when((this as ESObject).transactionTotal < 500);
      }

      consequence(R: ESObject) {
        (this as ESObject).result = false;
        (this as ESObject).reason = "The transaction was blocked as it was less than 500";
        R.stop();
      }
    }


    let rule = new Rule()
```

这里的优先级是一个可选参数，当有多个规则运行时，它将用于指定一个规则相对于其他规则的优先级。在上面的规则中，R.when 计算条件表达式并
R.stop 用于停止对事实的进一步处理，因为我们已经得到了一个结果。

函数 <span style="color:#ff6700">R.stop</span> <span style="color:#ff6700">R.when</span> <span style="color:#ff6700">
R.next</span> <span style="color:#ff6700">R.restart</span> 是流量控制 API 的一部分，允许用户控制引擎流量。

2.定义一个事实
事实是规则引擎应用其规则以获得结果的那些输入 json 值。根据您的决定，一个事实可以具有多个属性。

```
    let fact: ESObject = {
      name: "user4",
      application: "MOB2",
      transactionTotal: Number.parseInt(this.setValue),
      cardType: "Credit Card"
    }
```

3.使用规则引擎
下面的示例显示了如何使用规则引擎将示例规则应用于特定事实。规则可以作为规则数组或单个规则对象输入到规则引擎当中。

```
   let ruleEngine = new RuleEngine();

    class Rule {
      condition(ruleEngine: ESObject) {
        ruleEngine.when((this as ESObject).transactionTotal < 500);
      }

      consequence(ruleEngine: ESObject) {
        (this as ESObject).result = false;
        (this as ESObject).reason = "The transaction was blocked as it was less than 500";
        ruleEngine.stop();
      }
    }


    let rule = new Rule()


    ruleEngine.register(rule);


    let fact: ESObject = {
      name: "user4",
      application: "MOB2",
      transactionTotal: Number.parseInt(this.setValue),
      cardType: "Credit Card"
    }

    console.log("------" + this.setValue);

    ruleEngine.execute(fact, (data: ESObject) => {
      if (data.result) {
        console.log("Valid transaction:" + data.result); //满足规则
        this.resultStr = "Valid transaction:" + data.result;
      } else {
        console.log("Blocked Reason:" + data["reason"]); //不满足规则
        this.resultStr = "Blocked Reason:" + data["reason"];
      }

    })
```

4.控制在规则引擎上运行的规则
如果您正在寻找方法来指定将规则应用于事实的顺序，则可以通过使用 priority 参数来完成。

```
"priority": 4
```

## 接口说明

#### R.register

注册规则。

#### R.When

此函数用于传递我们要评估的条件表达式。在上面的表达式中，我们通过表达式来检查上下文中事实的 transactionTotal 属性是否低于
500.如果传递给的表达式 R.when 计算结果为真，则条件将执行。否则，规则引擎将移至下一条规则，或者如果没有规则可应用，则可能终止。

#### R.stop

该函数在结果函数中使用，以指示规则引擎停止处理事实。如果调用此函数，及时留下要应用的规则，规则引擎也不会对事实应用其余规则。它主要用于当我们对特定事实得出结论并且不需要对其进行任何进一步处理来生成结果时。

如上例所示，当事务小于 500 时，我们不在需要处理规则。因此将 false 存储在 result 属性中并在结果内立即调用 stop。

#### R.next

该函数在后果函数中使用。者用于指示规则引擎开始对事实应用下一个规则（如果有）。

#### R.restart

该函数用于结果函数内部，以指示规则引擎从头开始对事实应用规则。当事实对象被结果函数修改并且需要再次遍历所有的规则时，规则引擎也会在内部使用此函数。在初始化新规则引擎时使用该
ignoreFactChanges:true 选项将关闭此功能。

#### R.execute

执行并验证事实。

## 约束与限制

在下述版本验证通过：适配DevEco Studio:4.1 Canary(4.1.3.317)，OpenHarmony SDK:API version 11 (4.1.0.36).

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/nodeRulesDemo/LICENSE)
，请自由地享受和参与开源。
