# jsDiff

## 简介

本demo是基于openHarmony系统下使用三方js库jsdiff,jsdiff提供JavaScript文本差异的工具库

## 下载安装

```
ohpm install diff
```

## 使用说明

```
  import { diffChars} from 'diff'


  const one = 'beep boop   afff阿三是技术';
  const other = 'beepboob 啊发撒烦烦烦 e ';
  const diff = diffChars(one, other);

  diff.forEach((part) => {
      if (part.added) {
        //do something
      } else if (part.removed) {
      //do something
      } else {
     //do something
      }
      let str = part.value; //比较的字符或字符串
  });
    
    // 更多的用法參考index.ets 文件
    
```

## part对象属性说明
##### value: 文字内容
##### added：如果值被插入到新字符串中，则为真
##### removed：如果值已从旧字符串中删除，则为真

## 接口
|模块名 | 功能 | 备注 |
|---|---|---|
| diffChars(oldStr, newStr[, options]) |  区分两个文本块，逐个字符进行比较 | ignoreCase:true忽略大小写差异。默认为false |
| diffWords(oldStr, newStr[, options]) |  区分两个文本块，逐字比较，忽略空格 | ignoreCase: 同中diffChars |
| diffWordsWithSpace(oldStr, newStr[, options]) |   区分两个文本块，逐字比较，将空格视为重要 | ignoreWhitespace:true忽略前导和尾随空格。这与diffTrimmedLines；newlineIsToken:true将换行符视为单独的标记|
| diffLines(oldStr, newStr[, options]) |   区分两个文本块，逐行比较| |
| diffTrimmedLines(oldStr, newStr[, options]) |  区分两个文本块，逐行比较，忽略前导和尾随空格|
| diffSentences(oldStr, newStr[, options]) |  区分两个文本块，逐句比较 |
| diffCss(oldStr, newStr[, options]) |  区分两个文本块，比较 CSS 标记 |
| diffJson(oldObj, newObj[, options]) |   比较两个 JSON 对象，比较每个对象上定义的字段 |
| diffArrays(oldArr, newArr[, options]) |  区分两个数组，比较每个项目是否严格相等 (===) |

更多模块的使用可参考[官方文档](https://github.com/kpdecker/jsdiff/blob/master/README.md)，单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/jsDiffDemo/TEST.md)

## 约束与限制
在下述版本验证通过：
DevEco Studio: 4.0 Release(4.0.3.600), SDK: API10 (4.0.10.11)

DevEco Studio: 4.0 Beta2(4.0.3.512), SDK: API10 (4.0.10.9)

DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)

## 贡献代码

使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR 

## 开源协议

该项目基于 [License](https://github.com/kpdecker/jsdiff/blob/master/LICENSE) ，请自由地享受和参与开源
