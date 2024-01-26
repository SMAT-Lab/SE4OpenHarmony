# javascript_natural_sort

## 简介

> Natural Sort algorithm for Javascript

## 下载安装

```shell
ohpm  install javascript-natural-sort@0.7.1
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import { naturalSort } from "javascript-natural-sort"

['10',9,2,'1','4'].sort(naturalSort)
// ['1',2,'4',9,'10']

['10.0401',10.022,10.042,'10.021999'].sort(naturalSort)
// ['10.021999',10.022,'10.0401',10.042]

['10.04f','10.039F','10.038d','10.037D'].sort(naturalSort)
// ['10.037D','10.038d','10.039F','10.04f']

['1.528535047e5','1.528535047e7','1.528535047e3'].sort(naturalSort)
// ['1.528535047e3','1.528535047e5','1.528535047e7']

['192.168.0.100','192.168.0.1','192.168.1.1'].sort(naturalSort)
// ['192.168.0.1','192.168.0.100','192.168.1.1']

['car.mov','01alpha.sgi','001alpha.sgi','my.string_41299.tif'].sort(naturalSort)
// ['001alpha.sgi','01alpha.sgi','car.mov','my.string_41299.tif']

['10/12/2008','10/11/2008','10/11/2007','10/12/2007'].sort(naturalSort)
// ['10/11/2007', '10/12/2007', '10/11/2008', '10/12/2008']

['$10002.00','$10001.02','$10001.01'].sort(naturalSort)
// ['$10001.01','$10001.02','$10002.00']

['1 Title - The Big Lebowski','1 Title - Gattaca','1 Title - Last Picture Show'].sort(naturalSort)
// ['1 Title - Gattaca','1 Title - Last Picture Show','1 Title - The Big Lebowski']

['a', 'B'].sort(naturalSort);
// ['B', 'a']

naturalSort.insensitive = true;
['a', 'B'].sort(naturalSort);
// ['a', 'B']
```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/javascript_natural_sort/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 接口说明

| **接口**         | 参数  | 功能      |
|----------------|-----|---------|
| naturalSort()  | 无   |  自然排序   |

## 目录结构

````
|---- javascript_natural_sort
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/javascript_natural_sort/LICENSE)，请自由地享受和参与开源。
    