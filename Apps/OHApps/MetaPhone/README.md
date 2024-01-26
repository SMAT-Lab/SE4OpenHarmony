# metaphone

## 简介

>语音算法，支持将一个特定的字符串（通常是一个英文单词），将其转化为一个代码，然后可以将其与其他代码（或其他单词）进行比较，以检查他们是否（可能）发音相同。

## 下载安装
```shell
ohpm install metaphone 
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

### metaphone

   ```
    let result = metaphone('Agrippa');
   ```
## 接口说明
   ```
   // 获取单词的发音代码
   public metaphone(src: string)
   ```
## 约束与限制

在下述版本验证通过：

- DevEco Studio: 4.0 Canary1(4.0.0.112), SDK: API10 (4.0.7.2)
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)
## 目录结构

````
|---- MetaPhone
|   |---- entry # 示例代码文件夹                
|   |---- README.md  # 安装使用方法
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/subsampling-scale-image-view/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/MetaPhone/LICENSE) ，请自由地享受和参与开源。

  
