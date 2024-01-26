# dayjs

## 介绍

[dayjs](https://github.com/iamkun/dayjs) 是一个轻量的处理时间和日期的 JavaScript 库，可以运行 node.js 和浏览器中，本库基于 [dayjs](https://github.com/iamkun/dayjs)原库 v1.11.7 版本进行验证。

## 下载安装

```node
ohpm install dayjs
```

## 使用说明

```javascript
import dayjs from "dayjs";
```

## 示例代码

### 1.API

```javascript
dayjs("2018-08-08"); // 解析

dayjs().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A"); // 展示

dayjs().set("month", 3).month(); // 获取

dayjs().add(1, "year"); // 处理

dayjs().isBefore(dayjs()); // 查询
```

### 2. 国际化

Day.js 支持国际化，但除非手动加载，多国语言默认是不会被打包到工程里的

```javascript
import "dayjs/locale/es"; // 按需加载

dayjs.locale("es"); // 全局使用西班牙语

dayjs("2018-05-05").locale("zh-cn").format(); // 在这个实例上使用简体中文
```

### 3. 插件

插件是一些独立的程序，可以给 Day.js 增加新功能和扩展已有功能

```javascript
import advancedFormat from "dayjs/plugin/advancedFormat"; // 按需加载插件

dayjs.extend(advancedFormat); // 使用插件

dayjs().format("Q Do k kk X x"); // 使用扩展后的API
```

[单元测试用例](https://gitee.com/tybrave/openharmony_tpc_samples/tree/master/dayjs/TEST.md)详情可参考

## 时间格式规范

由于运行环境的限制，时间格式需要注意：

支持："2021-1-4 0:0:0.000"

不支持："2021-1-4 0:0:0:000"

---

支持："2021-1-4 0:0:0.000-05:00"

不支持："2021-1-4 0:0:0.000-0500"

## 约束与限制

在下述版本验证通过：
- DevEco Studio: 4.0(4.0.3.512), SDK: API10(4.0.10.9)
- DevEco Studio: 3.2Release(3.1.3.400)，OpenHarmony SDK: API9 Release（3.2.11.5）。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/dayjs/LICENSE)
，请自由地享受和参与开源。~~~~~~
