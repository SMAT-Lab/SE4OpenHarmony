# mime-db

## 简介
这是一个mime类型和有关它们的信息的大型数据库。
它由一个单一的公共JSON文件组成，不包含任何逻辑，
允许它在使用API时尽可能保持不固执己见。
它汇集了以下来源的数据:
https://www.iana.org/assignments/media-types/media-types.xhtml
https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
https://hg.nginx.org/nginx/raw-file/default/conf/mime.types

## 下载安装

```
ohpm install mime-db@1.52.0
```
OpenHarmony
ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

```js
import * as db from 'mime-db'
// grab data on .js files
let data = db['application/javascript']
```
## 接口说明

db['application/javascript']

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录

```
|mime_db       # 工程根目录
      ├── entry                  # 示例代码文件夹   
          ├── src  
              ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/LICENSE) 协议，请自由地享受和参与开源。
