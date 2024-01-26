# pinyin-pro

## 简介

本项目是OpenHarmony pinyin-pro Demo项目。
pinyin-pro是一个专业的 JavaScript 中文转拼音的库，具备多音字识别准确、体积轻量、性能优异、功能丰富等特点。

## 下载安装

```shell
$ ohpm install pinyin-pro
```

## 使用说明

支持多种环境及模块化规范的使用方式

###  导入

```javascript
import { pinyin } from 'pinyin-pro';

pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
```

## 使用示例
获取拼音


```javascript
import { pinyin } from 'pinyin-pro';

// 获取字符串格式拼音
pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'

// 获取数组格式拼音
pinyin('汉语拼音', { type: 'array' }); // ["hàn", "yǔ", "pīn", "yīn"]

// 获取不带音调数组格式拼音
pinyin('汉语拼音', { toneType: 'none' }); // "han yu pin yin"

// 获取不带音调数组格式拼音
pinyin('汉语拼音', { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]

// 音调以数组形式显示
pinyin('汉语拼音', { toneType: 'num' }); // "han4 yu3 pin1 yin1"

// 自动识别多音字
pinyin('睡着了'); // "shuì zháo le"
```

文本和拼音匹配

```javascript
import { match } from 'pinyin-pro';

// 支持首字母匹配
match('中文拼音', 'zwp'); // [0, 1, 2]

// 支持全拼匹配
match('中文拼音', 'zhongwenpin'); // [0, 1, 2]

// 支持混合匹配
match('中文拼音', 'zhongwp'); // [0, 1, 2]
```

拼音格式转换

```javascript
import { convert } from 'pinyin-pro';

// 数组转符号
convert('pin1 yin1'); // 'pīn yīn'

// 符号转数字
convert('pīn yīn', { format: 'symbolToNum' }); // 'pin1 yin1'

// 消除符号
convert('pīn yīn', { format: 'toneNone' }); // 'pin yin'
```

获取带汉字拼音的 HTML 字符串

```javascript
import { html } from 'pinyin-pro';

// 带拼音汉字的 HTML 字符串
html('汉语拼音');
/*
<span class="py-result-item">
<ruby>
    <span class="py-chinese-item">汉</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">hàn</rt>
    <rp>)</rp>
</ruby>
</span>
<span class="py-result-item">
<ruby>
    <span class="py-chinese-item">语</span>
    <rp>(</rp>
    <rt class="py-pinyin-item">yǔ</rt>
    <rp>)</rp>
</ruby>
</span>
*/
```

关于pinyin-pro更多的使用方式，可以参考官方文档[pinyin-pro](https://pinyin-pro.cn/guide/compare.htmlhttps://pinyin-pro.cn/guide/compare.html)

## 接口说明

| 接口                                | 描述                          |
|-----------------------------------|-----------------------------|
| **pinyin(text, options?)**        | 返回转换后的信息             |
| **match(text, pinyin， options?)** | 匹配成功返回匹配汉字对应下标数组; 不成功返回 null |
| **convert(pinyin, options?)**     | 将拼音的格式进行转换，并返回转换后的拼音        |
| **customPinyin(map)**             | 支持用户自定义设置词句拼音，当中文中匹配用户自己定义的词句拼音时，优先使用用户自定义的拼音。 |
| **html(text, options?)**          | 获取<ruby></ruby> 格式的汉字和拼音 HTML 字符串      |
| **polyphonic(text, options?)**    | 获取多音字的全部读音|
 

## 约束与限制
在下述版本验证通过：

DevEco Studio: DevEco Studio 4.0 Release(4.0.0.600), SDK: API10 (4.0.10.13)

## 目录

```
 ├── entry
 │ └── src
 │ │ └── main
 │ │ │ ├── ets
 │ │ │ │  └── pages
 │ │ │ │   └── index.ets        # 入口文件
 │ │ │ ├── resources              # hap资源存放目录
 │ │ │ └── module.json5            # hap配置文件
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/pinyinProDemo/LICENSE) 协议，请自由地享受和参与开源。
