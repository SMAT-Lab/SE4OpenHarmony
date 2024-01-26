# caverphone

## 简介

>CaverPhone算法(语音匹配算法)的JavaScript实现，规则为：将关键字转换为小写，移除不是a-z的字符，按照规则替换指定字符(如字符串起始、结束，文本中包含cq等)，在结尾放置6个1，返回前十个字符，具体参照CaverPhone算法规则。

## 下载安装
```shell
ohpm install caverphone 
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

### caverPhone

   ```
    let result = caverPhone('Cailean');
   ```
## 接口说明

   ```
   // 获取语音匹配算法结果代码
   public caverPhone(src: string)
   ```
## 约束与限制

在下述版本验证通过：

- DevEco Studio: 4.0 Canary1(4.0.0.112), SDK: API10 (4.0.7.2)

## 目录结构

````
|---- CaverPhone
|   |---- entry # 示例代码文件夹                
|   |---- README.md  # 安装使用方法
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/subsampling-scale-image-view/pulls) 。

## 开源协议
本项目基于 [ISC License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/CaverPhone/LICENSE) ，请自由地享受和参与开源。

  
