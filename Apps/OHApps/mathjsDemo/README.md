# mathjs

## 简介
- mathjs是一个OpenHarmony系统下使用数学运算的示例，包含数字、大数、三角函数、字符串、和矩阵等数学功能。 
- 目前示例的功能有如下

| 数学库 | 功能  |
| :-----------: |:---------------:|
| [mathjs](https://mathjs.org/docs/reference/functions.html) | 代数函数，算术函数，按位函数，逻辑函数，矩阵函数，三角函数，判断函数，比较函数，大数运算。 |
| [long](https://github.com/dcodeIO/long.js) | 字符串转long类型，number转long类型,long算术函数,long按位函数,long逻辑函数，long类型转换为 32 位整数。 |
| [bignumber.js](https://mikemcl.github.io/bignumber.js) | 进制的转换函数 |
| [matrix](https://mljs.github.io/matrix) |矩阵操作和计算函数    |

## 下载安装

| 库名 | URL地址  |                ohpm安装                 |
| :-----------: |:---------------:|:------------------------------------:|
| mathjs     | https://github.com/josdejong/mathjs |         ohpm install mathjs          |
| long      | https://github.com/dcodeIO/long.js |           ohpm install long           |
| bignumber.js |https://github.com/MikeMcl/bignumber.js       |       ohpm install bignumber.js       |
| matrix | https://github.com/mljs/matrix |        ohpm install ml-matrix         |

OpenHarmony ohpm环境配置等更多内容，请参考[如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

### mathjs 使用功能
```javascript
	import * as math from 'mathjs';
	或者 import {abs,add,bignumber,...} from 'mathjs';

	let mathabs = math.abs(math.bignumber('-123456789123456789123456789'))
	console.log(mathabs);//123456789123456789123456789
          
   	let mathabs = abs(bignumber('-123456789123456789123456789'))
	console.log(mathabs);//123456789123456789123456789
          
    let mathabs = math.add(math.bignumber('123456789123456789123456789'),math.bignumber('123456789123456789123456789'))
	console.log(mathabs);//123456789123456789123456789
          
   	let mathabs = add(bignumber('123456789123456789123456789'),bignumber('123456789123456789123456789'))
	console.log(mathabs);//246913578246913578246913578
	
```
更多使用方法请参照：https://mathjs.org/docs/reference/functions.html

### bignumber.js 使用功能

``` javascript
	import BigNumber from "bignumber.js";

	let x = BigNumber("123456789",16);
	console.log(x);//4886718345

    let x = new BigNumber(123.4567);
    let y = BigNumber('123456.7e-3');
    let z = new BigNumber(x);
    x.isEqualTo(y) && y.isEqualTo(z) && x.isEqualTo(z);
    

```

更多使用方法请参照：https://mikemcl.github.io/bignumber.js

### long 使用功能

``` javascript
	import long  from "long";

	let longvalue = long.fromString('1234567891234567891').toString()
    console.log(longvalue);//1234567891234567891

	let intvalue = long.fromString('1234567891234567891').toInt().toString()
    console.log(intvalue);//-1071401261

```

更多使用方法请参照：https://github.com/dcodeIO/long.js



### matrix 使用功能

``` javascript
	import { Matrix } from 'ml-matrix'

	let A = new Matrix([[1, 1],[2, 2]]);

	let B = new Matrix([[3, 3],[1, 1]]);

	const addition = Matrix.add(A, B);//[[4, 4], [3, 3], rows: 2, columns: 2]

```

更多使用方法请参照：https://mljs.github.io/matrix



## 目录

```
/mathjsDemo # demo代码
|—— entry
├── src     
│   └── main
│   	└── ets
│   	    └── entryability
│   	    └── crcalc
│   	        └── crcalc.ets         # mathjs大数据运算界面
│   	    └── ejml
│   	        └── ejml.ets           # matrix矩阵界面
│   	        └── ejmlMathjs.ets     # mathjs矩阵界面
│   	    └── jafama
│   	        └── jafama.ets         # mathjs三角函数界面
│   	    └── mathjs
│   	        └── mathjs.ets         # mathjs位运算及数值判断界面
│   	    └── pages
│       	    └── Index.ets          # mathjs示例首页
```

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/mathjsDemo/LICENSE) ，请自由地享受和参与开源。
