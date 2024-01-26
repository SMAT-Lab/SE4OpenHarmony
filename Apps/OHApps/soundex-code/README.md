# ohos-gif-drawable

## 简介

在OpenHarmony环境下,提供了soundex语音算法能力。

## 下载安装

```typescript
ohpm install soundex-code
```

## 使用说明

```typescript
import {soundex} from 'soundex-code'

soundex('phonetics') // => 'P532'
soundex('Ashcraft') // => 'A261'
soundex('Lissajous') // => 'L222'
soundex('Smith') === soundex('Schmit') // => true

soundex('Ashcraftersson', 6) // => 'A26136'
soundex('A', 6) // => 'A000'
```

## 约束与限制
在下述版本验证通过：

DevEco Studio: 4.0 Canary1(4.0.3.212), SDK: API10(4.0.8.3)
DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）


## 目录结构

```
/entry/src/
- main/ets/     
    - pages                        # 测试page页面列表
       - index.ets                    	# 测试soundex-code
```

## 贡献代码

使用过程中发现任何问题都可以提 [issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/soundex-code/LICENSE) ，请自由的享受和参与开源。
