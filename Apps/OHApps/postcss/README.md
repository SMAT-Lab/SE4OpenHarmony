# postcss

## 简介
PostCSS是一个用JS插件转换样式的工具。这些插件可以检测你的CSS，支持变量和混合，编译未来的CSS语法，内联图像等等。

PostCSS被包括维基百科、Twitter、阿里巴巴和JetBrains在内的行业领导者使用。Autoprefixer和Stylelint PostCSS插件是最流行的CSS工具之一。

## 下载安装

```
ohpm install @ohos/postcss
```
OpenHarmony
ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

```js
import postcss from '@ohos/postcss'
let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' })
let comment = new postcss.Comment({ text: 'hi' })
let decl = new postcss.Declaration({ prop: 'color', value: 'black' })
let result = postcss.fromJSON({ type: 'not-a-node-type' })
```
## 接口说明
postcss.AtRule()
postcss.Comment()
postcss.Declaration()
postcss.fromJSON()
postcss.parse()
postcss.Root()

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录

```
/postcss       # 工程根目录
      ├── entry                  # 示例代码文件夹  
           ├── src 
               ├── main
                   ├── ets
                      ├── pages 
                         ├── index.ets   sample代码
      ├── library                  
          ├── main                   
                 ├── components                 
                    ├── lib                 # 源库文件      
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT](https://github.com/postcss/postcss/blob/main/LICENSE) 协议，请自由地享受和参与开源。
