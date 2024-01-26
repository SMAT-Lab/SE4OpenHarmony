# pcx-js

## 简介

> 在OpenHarmony环境下,提供了PCX图像格式解码的能力。

## 下载安装

```shell
ohpm install pcx-js
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

### PCX解码使用

```typescript
import image from '@ohos.multimedia.image';
import util from '@ohos.util';
import PCX from 'pcx-js';

typedArrayToBuffer(array: Uint8ClampedArray): ArrayBuffer {
  return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}
        
getContext(this).resourceManager.getMediaContent($r("app.media.thimbleweed").id).then((uint8Array) => {
	let pcxDecoder = new PCX(uint8Array.buffer);
    // 获取到pcx图片的解码后的像素点数据 默认RGBA
	let decodeData = pcxDecoder.decode();
    // 转换成BGRA
	this.RBGA2BGRA(decodeData.pixelArray)
	// 通过image能力转换成PixelMap
    image.createPixelMap(this.typedArrayToBuffer(decodeData.pixelArray), {
		'size': {
		'width':  decodeData.width,
		'height':  decodeData.height
		}
	}).then((pixels) => {
		this.p1Pixels = pixels;
		})
	})
```

## 约束与限制

在下述版本验证通过：
- DevEco Studio: 4.1Canary2(4.1.3.322),SDK: API11(4.1.0.36)

## 目录结构

```

/entry/src/
- main/ets/     
    - pages                        # 测试page页面列表
       - index.ets                    	# 测试解析PCX图片格式
```

单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/pcx-js/TEST.md)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License]() ，请自由地享受和参与开源。



