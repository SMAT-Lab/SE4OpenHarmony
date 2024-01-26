# utilCode

## 简介

utilCode是一个OpenHarmony系统下使用通用工具的示例，包含温度转换、正则校验、图片处理、坐标转换、和颜色获取等常用功能。 目前示例的功能有如下

| 条目 | 功能  | 依赖库  |
| :-----------: |:---------------:|:---------------:|
| 温度相关 | 摄氏度华氏度互相转换。 |无|
| [坐标转换相关](https://github.com/star-nodejs/gcoord) | 是一个处理地理坐标系的js库，用来修正百度地图、高德地图及其它互联网地图坐标系不统一的问题。 |ohpm install gcoord|
| [国家码相关](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-sim.md) | 获取国家码 |无|
| [颜色相关](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-universal-attributes-opacity.md) |获取颜色    |ohpm install randomcolor|
| [Hap相关](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md#reqpermissiondetail) |获取Hap信息，操作Hap     |无|
| [正则相关](https://github.com/validatorjs/validator.js) |正则校验     |ohpm install validator |
| [内存缓存相关](https://github.com/ptarjan/node-cache) |缓存写入读取数据     | ohpm install memory-cache |
|时间相关 |格式化时间     | ohpm i time-ampm <br> ohpm i leap-year|
| [类型转换](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-pixel-units.md) |基础数据转换     |无|
| [图片相关](https://gitee.com/openharmony-tpc/ImageKnife) |图片处理工具类     |ohpm install @ohos/imageknife <br>  ohpm i imagetype |

## 使用说明

### 温度相关

#### 华氏度转摄氏度

``` javascript
import { TempUtils} from '@ohos/util_code'
TempUtils.F2C(89.6)
```

#### 摄氏度转华氏度

``` javascript
import { TempUtils} from '@ohos/util_code'
TempUtils.C2F(89.6)
```

### 坐标转换相关

该功能模块基于[gcoord](https://github.com/star-nodejs/gcoord) 开发

#### BD09 坐标转 GCJ02 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
```

#### GCJ02 坐标转 BD09 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.BD09// 目标坐标系
            );
```

#### GCJ02 坐标转 WGS84 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.GCJ02, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
```

#### WGS84 坐标转 GCJ02 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.GCJ02 // 目标坐标系
            );
```

#### BD09 坐标转 WGS84 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.BD09, // 当前坐标系
            gcoord.WGS84 // 目标坐标系
            );
```

#### WGS84 坐标转 BD09 坐标

``` javascript
	import gcoord from 'gcoord'
	
	gcoord.transform(
              [116.403988, 39.914266], // 经纬度坐标
            gcoord.WGS84, // 当前坐标系
            gcoord.BD09 // 目标坐标系
            );
```

### 国家码相关

#### 根据 Sim 卡获取ISO国家

[getISOCountryCodeForSim(slotId: number, callback: AsyncCallback<string>): void](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-sim.md#simgetisocountrycodeforsim
)

获取指定卡槽SIM卡的ISO国家码。使用callback异步回调。

``` javascript
	import sim from '@ohos.telephony.sim';
	
        sim.getISOCountryCodeForSim(0, (err, data) => {
            console.log(`callback: err->${JSON.stringify(err)}, data->${JSON.stringify(data)}`);
        });
```

#### 获取系统地区

[static getSystemRegion(): string](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-i18n.md#getsystemregion9)

获取系统地区。地区的详细说明参见实例化Locale对象。

系统能力：SystemCapability.Global.I18n

``` javascript
import I18n from '@ohos.i18n';
try {
  let systemRegion = I18n.System.getSystemRegion(); // 获取系统当前地区设置
} catch(error) {
  console.error(`call System.getSystemRegion failed, error code: ${error.code}, message: ${error.message}.`);
}
```

#### 根据地区获取拨号字冠

``` javascript
import { CountryUtils} from '@ohos/util_code'
 CountryUtils.getCountryCodeByLanguage() //返回拨号字冠
```

#### 根据SIM卡获取拨号字冠

``` javascript
import { CountryUtils} from '@ohos/util_code'
 CountryUtils.getCountryCodeByLanguage() //返回拨号字冠
```

#### 根据地区获取拨号字冠

``` javascript
import {CountryUtils} from '@ohos/util_code'
CountryUtils.getCountryCode('CN')
```

### 颜色相关

该功能模块基于[randomcolor](https://github.com/fatelei/imagetype) 开发

#### 获取随机颜色

您可以传递一个选项对象来影响它产生的颜色类型。选项对象接受以下属性：

| 验证器                                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| hue      | 控制生成颜色的色调。您可以传递表示颜色名称的字符串：red, orange, yellow, green, blue, purple,pink并且monochrome当前受支持。如果您传递一个十六进制颜色字符串，例如#00FFFF，randomColor 将提取其色调值并使用它来生成颜色。
| luminosity      | 控制生成颜色的亮度。bright您可以指定包含,light或 的字符串dark。
| count      | 一个整数，指定要生成的颜色数。
| seed      | 一个整数或字符串，传递时将导致 randomColor 每次返回相同的颜色。
| format      | 指定生成颜色格式的字符串。可能的值为rgb、rgba、rgbArray、hsl、hsla、hslArray和hex （默认值）。
| alphargba      | 介于 0 和 1 之间的小数。仅当使用具有 alpha 通道（和）的格式时才相关hsla。默认为随机值。

``` javascript
// @ts-ignore
import randomColor from 'randomcolor';

// Returns a hex code for an attractive color
randomColor(); 

// Returns an array of ten green colors
randomColor({
   count: 10,
   hue: 'green'
});

// Returns a hex code for a light blue
randomColor({
   luminosity: 'light',
   hue: 'blue'
});

// Returns a hex code for a 'truly random' color
randomColor({
   luminosity: 'random',
   hue: 'random'
});

// Returns a bright color in RGB
randomColor({
   luminosity: 'bright',
   format: 'rgb' // e.g. 'rgb(225,200,20)'
});

// Returns a dark RGB color with random alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
});

// Returns a dark RGB color with specified alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba',
   alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
});

// Returns a light HSL color with random alpha
randomColor({
   luminosity: 'light',
   format: 'hsla' // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)'
});

```

#### 获取颜色

[开发者可以通过“$r('sys.type.resource_id')”的形式引用系统资源。sys代表是系统资源；type代表资源类型，可以取“color”、“float”、“string”、“media”；resource_id代表资源id。](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/quick-start/resource-categories-and-access.md#%E7%B3%BB%E7%BB%9F%E8%B5%84%E6%BA%90)

``` javascript
Text($r('app.string.message_arrive', "five of the clock"))
  .fontColor($r('app.color.color_hello'))
  .fontSize($r('app.float.font_hello'))
```

#### 设置颜色透明度值

[设置组件的透明度。](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-universal-attributes-opacity.md)

属性

| 名称      | 参数类型                                     | 描述                                       |
| ------- | ---------------------------------------- | ---------------------------------------- |
| opacity | number I [Resource](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-types.md#resource)| 元素的不透明度，取值范围为0到1，1表示不透明，0表示完全透明, 达到隐藏组件效果，但是在布局中占位。<br>**
说明：**<br/>子组件可以继承父组件的此属性。默认值：1<br>从API version 9开始，该接口支持在ArkTS卡片中使用。 |

``` ts
// xxx.ets
@Entry
@Component
struct OpacityExample {
  build() {
    Column({ space: 5 }) {
      Text('opacity(1)').fontSize(9).width('90%').fontColor(0xCCCCCC)
      Text().width('90%').height(50).opacity(1).backgroundColor(0xAFEEEE)
      Text('opacity(0.7)').fontSize(9).width('90%').fontColor(0xCCCCCC)
      Text().width('90%').height(50).opacity(0.7).backgroundColor(0xAFEEEE)
      Text('opacity(0.4)').fontSize(9).width('90%').fontColor(0xCCCCCC)
      Text().width('90%').height(50).opacity(0.4).backgroundColor(0xAFEEEE)
      Text('opacity(0.1)').fontSize(9).width('90%').fontColor(0xCCCCCC)
      Text().width('90%').height(50).opacity(0.1).backgroundColor(0xAFEEEE)
      Text('opacity(0)').fontSize(9).width('90%').fontColor(0xCCCCCC)
      Text().width('90%').height(50).opacity(0).backgroundColor(0xAFEEEE)
    }
    .width('100%')
    .padding({ top: 5 })
  }
}
```

#### 获取颜色红绿蓝

[颜色说明](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-appendix-enums.md
)

| 颜色名称                 | 颜色值   | 颜色示意                                                     |
| ------------------------ | -------- | ------------------------------------------------------------ |
| Black                    | 0x000000 | ![img.png](img/img.png)|
| Blue                     | 0x0000ff | ![img_1.png](img/img_1.png) |
| Brown                    | 0xa52a2a | ![img_2.png](img/img_2.png)|
| Gray                     | 0x808080 | ![img_3.png](img/img_3.png) |
| Grey                     | 0x808080 | ![img_4.png](img/img_4.png) |
| Green                    | 0x008000 | ![img_5.png](img/img_5.png) |
| Orange                   | 0xffa500 | ![img_6.png](img/img_6.png) |
| Pink                     | 0xffc0cb | ![img_7.png](img/img_7.png) |
| Red                      | 0xff0000 | ![img_8.png](img/img_8.png)|
| White                    | 0xffffff |![img_9.png](img/img_9.png)|
| Yellow                   | 0xffff00 | ![img_10.png](img/img_10.png) |
| Transparent<sup>9+</sup> | rgba(0,0,0,0)  |  透明色                                                                   |

更多使用方法请参照：

### Hap 相关

#### Hap 前台转到后台监听

[onBackground(): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-app-ability-uiAbility.md#uiabilityonbackground)

Ability生命周期回调，当应用从前台转到后台时触发。

``` javascript
import Ability from '@ohos.app.ability.UIAbility';
class myAbility extends Ability {
    onBackground() {
        console.log('onBackground');
    }
}
```

#### Hap 后台转到前台监听

[onBackground(): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-app-ability-uiAbility.md#uiabilityonbackground)

Ability生命周期回调，当应用从前台转到后台时触发。

``` javascript
import Ability from '@ohos.app.ability.UIAbility';
class myAbility extends Ability {
    onForeground() {
        console.log('onForeground');
    }
}
}
```


#### 判断 Hap 是否处于前台

[onBackground(): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-app-ability-uiAbility.md#uiabilityonbackground)

Ability生命周期回调，当应用从前台转到后台时触发。

系统能力：SystemCapability.Ability.AbilityRuntime.AbilityCore

对应前后监听接口，监听hap，onForeground，触发则hap在前台

``` javascript
import Ability from '@ohos.app.ability.UIAbility';
class myAbility extends Ability {
    onForeground() {
        console.log('onForeground');
    }
}
}
```

#### 打开 Hap

[startAbility(want: Want, callback: AsyncCallback<void>): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-inner-application-uiAbilityContext.md#uiabilitycontextstartability)

启动Ability（callback形式）。

使用规则：

调用方应用位于后台时，使用该接口启动Ability需申请ohos.permission.START_ABILITIES_FROM_BACKGROUND权限

目标Ability的exported属性若配置为false，调用方应用需申请ohos.permission.START_INVISIBLE_ABILITY权限

组件启动规则详见：组件启动规则（Stage模型）

系统能力：SystemCapability.Ability.AbilityRuntime.Core

``` javascript
import common from '@ohos.app.ability.common';
let want = {
  bundleName: 'com.example.myapp',
  abilityName: 'MyAbility'
};

try {
  this.context.startAbility(want, (error) => {
    if (error.code) {
      // 处理业务逻辑错误
      console.log('startAbility failed, error.code: ' + JSON.stringify(error.code) +
        ' error.message: ' + JSON.stringify(error.message));
      return;
    }
    // 执行正常业务
    console.log('startAbility succeed');
  });
} catch (paramError) {
  // 处理入参错误异常
  console.log('error.code: ' + JSON.stringify(paramError.code) +
    ' error.message: ' + JSON.stringify(paramError.message));
}
```

#### 关闭应用

[terminateSelf(callback: AsyncCallback<void>): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-inner-application-uiAbilityContext.md#uiabilitycontextterminateself)

停止Ability自身（callback形式）。

系统能力：SystemCapability.Ability.AbilityRuntime.Core

``` javascript
import common from '@ohos.app.ability.common';
this.context.terminateSelf((error) => {
  if (error.code) {
    // 处理业务逻辑错误
    console.log('terminateSelf failed, error.code: ' + JSON.stringify(error.code) +
      ' error.message: ' + JSON.stringify(error.message));
    return;
  }
  // 执行正常业务
  console.log('terminateSelf succeed');
}); error.message: ' + JSON.stringify(paramError.message));
}
```

#### 获取 Ability 信息

[queryAbilityInfo(want: Want, abilityFlags: number, userId: number, callback: AsyncCallback<Array<AbilityInfo>>): void;](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager.md#bundlemanagerqueryabilityinfo)

以异步方法根据给定的want、abilityFlags和userId获取多个AbilityInfo，使用callback形式返回结果。

系统接口： 此接口为系统接口。

需要权限： ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO

系统能力： SystemCapability.BundleManager.BundleFramework.Core

[AbilityInfo](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-abilityInfo.md)
请参考

以下各项对应的系统能力均为SystemCapability.BundleManager.BundleFramework.Core。

| 名称                  | 类型                                                     | 可读 | 可写 | 说明                                      |
| --------------------- | -------------------------------------------------------- | ---- | ---- | ------------------------------------------ |
| bundleName            | string                                                   | 是   | 否   | 应用Bundle名称。                            |
| moduleName            | string                                                   | 是   | 否   | Ability所属的HAP的名称。                    |
| name                  | string                                                   | 是   | 否   | Ability名称。                               |
| label                 | string                                                   | 是   | 否   | Ability对用户显示的名称。                   |
| labelId               | number                                                   | 是   | 否   | Ability的标签资源id。                       |
| description           | string                                                   | 是   | 否   | Ability的描述。                             |
| descriptionId         | number                                                   | 是   | 否   | Ability的描述资源id。                       |
| icon                  | string                                                   | 是   | 否   | Ability的图标资源文件索引。                 |
| iconId                | number                                                   | 是   | 否   | Ability的图标资源id。                       |
| process               | string                                                   | 是   | 否   | Ability的进程，如果不设置，默认为包的名称。 |
| exported             | boolean                                                  | 是   | 否   | 判断Ability是否可以被其他应用调用。         |
| type                  | AbilityType     | 是   | 否   | Ability类型<br />此属性仅可在FA模型下使用。 |
| orientation           | DisplayOrientation  | 是   | 否   | Ability的显示模式。                         |
| launchType            | LaunchType      | 是   | 否   | Ability的启动模式。                         |
| permissions           | Array\<string>                                           | 是   | 否   | 被其他应用Ability调用时需要申请的权限集合，通过调用bundleManager.queryAbilityInfo接口，传入GET_ABILITY_INFO_WITH_PERMISSION获取。 |
| readPermission        | string                                                   | 是   | 否   | 读取Ability数据所需的权限<br />此属性仅可在FA模型下使用。 |
| writePermission       | string                                                   | 是   | 否   | 向Ability写数据所需的权限<br />此属性仅可在FA模型下使用。 |
| uri                   | string                                                   | 是   | 否   | 获取Ability的统一资源标识符（URI）<br />此属性仅可在FA模型下使用。 |
| deviceTypes           | Array\<string>                                           | 是   | 否   | Ability支持的设备类型。                     |
| applicationInfo       | ApplicationInfo    | 是   | 否   | 应用程序的配置信息，通过调用bundleManager.queryAbilityInfo接口，传入GET_ABILITY_INFO_WITH_APPLICATION获取。 |
| metadata              | Array\[Metadata>           | 是   | 否   | ability的元信息，通过调用bundleManager.queryAbilityInfo
(js-apis-bundleManager.md#bundlemanagerqueryabilityinfo)接口，传入GET_ABILITY_INFO_WITH_METADATA获取。 |
| enabled               | boolean                                                  | 是   | 否   | ability是否可用。                           |
| supportWindowModes    | Array\<SupportWindowMode> | 是   | 否   | ability支持的窗口模式。                      |
| windowSize|WindowSize                                           |    是   | 否   | 表示窗口尺寸。|

``` javascript
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
let abilityFlags = bundleManager.AbilityFlag.GET_ABILITY_INFO_DEFAULT;
let userId = 100;
let want = {
    bundleName : "com.example.myapplication",
    abilityName : "com.example.myapplication.MainAbility"
};

try {
    bundleManager.queryAbilityInfo(want, abilityFlags, userId, (err, data) => {
        if (err) {
            hilog.error(0x0000, 'testTag', 'queryAbilityInfo failed: %{public}s', err.message);
        } else {
            hilog.info(0x0000, 'testTag', 'queryAbilityInfo successfully: %{public}s', JSON.stringify(data));
        }
    });
} catch (err) {
    hilog.error(0x0000, 'testTag', 'queryAbilityInfo failed: %{public}s', err.message);
}
```

#### 获取 Hap 信息

[getBundleInfo(bundleName: string, bundleFlags: number, userId: number, callback: AsyncCallback<BundleInfo>): void;
](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager.md#/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md)

以异步方法根据给定的bundleName、bundleFlags和userId获取BundleInfo，使用callback形式返回结果。

获取调用方自己的信息时不需要权限。

系统接口： 此接口为系统接口。

需要权限： ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO

系统能力： SystemCapability.BundleManager.BundleFramework.Core

[BundleInfo](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md)
参考

以下各项对应的系统能力均为SystemCapability.BundleManager.BundleFramework.Core。

| 名称                              | 类型                                                         | 可读 | 可写 | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ | ---- | ---- | ------------------------------------------------------------ |
| name                              | string                                                       | 是   | 否   | 应用包的名称。                                               |
| vendor                            | string                                                       | 是   | 否   | 应用包的供应商。                                               |
| versionCode                       | number                                                       | 是   | 否   | 应用包的版本号。                                              |
| versionName                       | string                                                       | 是   | 否   | 应用包的版本文本描述信息。                                     |
| minCompatibleVersionCode          | number                                                       | 是   | 否   | 分布式场景下的应用包兼容的最低版本。                           |
| targetVersion                     | number                                                       | 是   | 否   | 该标签标识应用运行目标版本。                                |
| appInfo                           | ApplicationInfo       | 是   | 否   | 应用程序的配置信息，通过调用bundleManager.getBundleInfo接口，传入GET_BUNDLE_INFO_WITH_APPLICATION获取。                                           |
| hapModulesInfo                    | ArrayHapModuleInfo   | 是   | 否   | 模块的配置信息，通过调用bundleManager.getBundleInfo接口，传入GET_BUNDLE_INFO_WITH_HAP_MODULE获取。                                                 |
| reqPermissionDetails     | Array  | 是   | 否   | 应用运行时需向系统申请的权限集合的详细信息，通过调用bundleManager.getBundleInfo接口，传入GET_BUNDLE_INFO_WITH_REQUESTED_PERMISSION获取。|
| permissionGrantStates        | ArrayPermissionGrantState | 是   | 否   | 申请权限的授予状态，通过调用bundleManager.getBundleInfo接口，传入GET_BUNDLE_INFO_WITH_REQUESTED_PERMISSION获取。                     |
| signatureInfo          |SignatureInfo                                 | 是   | 否   | 应用包的签名信息，通过调用bundleManager.getBundleInfo接口，传入GET_BUNDLE_INFO_WITH_SIGNATURE_INFO获取。                                           |
| installTime                       | number                                                       | 是   | 否   | 应用包安装时间。                                          |
| updateTime                        | number                                                       | 是   | 否   | 应用包更新时间。                                            |

``` javascript
// 额外获取ApplicationInfo和SignatureInfo
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
let bundleName = 'com.example.myapplication';
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_SIGNATURE_INFO;
let userId = 100;

try {
    bundleManager.getBundleInfo(bundleName, bundleFlags, userId).then((data) => {
        hilog.info(0x0000, 'testTag', 'getBundleInfo successfully. Data: %{public}s', JSON.stringify(data));
    }).catch(err => {
        hilog.error(0x0000, 'testTag', 'getBundleInfo failed. Cause: %{public}s', err.message);
    });
} catch (err) {
    hilog.error(0x0000, 'testTag', 'getBundleInfo failed. Cause: %{public}s', err.message);
}
```

#### 获取Hap签名信息

[BundleInfo](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md)
包含
[SignatureInfo](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md)
，可用getBundleInfo获取BundleInfo中的SignatureInfo

SignatureInfo参考

描述应用包的签名信息。

**系统能力:** 以下各项对应的系统能力均为SystemCapability.BundleManager.BundleFramework.Core。

| 名称      | 类型           | 可读 | 可写 | 说明                        |
| --------- | -------------- | ---- | ---- | --------------------------- |
| appId     | string         | 是   | 否   | 应用的appId。                 |
|fingerprint| string         | 是   | 否   | 应用包的指纹信息。            |

``` javascript
// 额外获取ApplicationInfo和SignatureInfo
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
let bundleName = 'com.example.myapplication';
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_SIGNATURE_INFO;
let userId = 100;

try {
    bundleManager.getBundleInfo(bundleName, bundleFlags, userId).then((data) => {
        hilog.info(0x0000, 'testTag', 'getBundleInfo successfully. Data: %{public}s', JSON.stringify(data));
    }).catch(err => {
        hilog.error(0x0000, 'testTag', 'getBundleInfo failed. Cause: %{public}s', err.message);
    });
} catch (err) {
    hilog.error(0x0000, 'testTag', 'getBundleInfo failed. Cause: %{public}s', err.message);
}
```

#### 获取所有已安装 Hap 信息

getAllBundleInfo(bundleFlags: number, userId: number, callback: AsyncCallback<Array<BundleInfo>>): void;

以异步方法根据给定的bundleFlags和userId获取系统中所有的BundleInfo，使用callback形式返回结果。

系统接口： 此接口为系统接口。

需要权限： ohos.permission.GET_BUNDLE_INFO_PRIVILEGED

系统能力： SystemCapability.BundleManager.BundleFramework.Core

[BundleInfo](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-bundleManager-bundleInfo.md)

``` javascript
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT;

try {
    bundleManager.getAllBundleInfo(bundleFlags, (err, data) => {
        if (err) {
            hilog.error(0x0000, 'testTag', 'getAllBundleInfo failed: %{public}s', err.message);
        } else {
            hilog.info(0x0000, 'testTag', 'getAllBundleInfo successfully: %{public}s', JSON.stringify(data));
        }
    });
} catch (err) {
    hilog.error(0x0000, 'testTag', 'getAllBundleInfo failed: %{public}s', err.message);
}
```

### 正则相关

正则相关功能请参考：[validator](*)，validator功能已包含本模块功能

### 内存缓存相关

该功能模块基于 [node-cache](https://github.com/ptarjan/node-cache) 开发

#### 导入内存缓存实例

获取内存缓存操作对象

``` javascript
// @ts-ignore
import cache from 'memory-cache';
```

#### 缓存中写入数据

put = function(key, value, time, timeoutCallback)

写入数据

``` javascript
// @ts-ignore
import cache from 'memory-cache';
cache.put('foo', 'bar');
```

#### 缓存中读取数据

get = function(key)

通过key读取数据

``` javascript
// @ts-ignore
import cache from 'memory-cache';
cache.get('foo')
```

#### 根据键值移除缓存

del = function(key)

通过键值移除数据

``` javascript
// @ts-ignore
import cache from 'memory-cache';
cache.del('foo')
```

#### 清除所有缓存

清除所有数据

``` javascript
// @ts-ignore
import cache from 'memory-cache';
cache.clear()
```

#### 缓存大小

size = function()

返回缓存中的当前条目数

``` javascript
// @ts-ignore
import cache from 'memory-cache';;
cache.size();
```

#### 缓存内存大小

memsize = function()

返回缓存中占用空间的条目数

``` javascript
// @ts-ignore
import cache from 'memory-cache';
cache.memsize();
```

### 时间相关

该功能模块基于 [leap-year](https://github.com/sindresorhus/leap-year) [time-ampm](https://github.com/ipostol/time-ampm) 开发

#### 将 Date 类型转为时间字符串

js语言特性

``` javascript
const date = new Date();
const isoString = date.toISOString();
console.log(isoString); // 输出类似于 "2023-04-26T03:36:41.839Z" 的字符串
```

#### 将 Date 类型转为时间戳

js语言特性

``` javascript
const date = new Date();
const timestamp = date.getTime(); // 返回时间戳，例如：1630198499637
```

#### 将时间戳转为 Date 类型

js语言特性

``` javascript
const timestamp = 1646112000000; // 2022-03-01 00:00:00的时间戳
const date = new Date(timestamp);
console.log(date); // 输出：Tue Mar 01 2022 00:00:00 GMT+0800 (中国标准时间)
```

#### 获取当前 Date

js语言特性

``` javascript
new Date()
```

#### 判断时间为上午下午

输入0—24的小时数，输出上午时间或者下午时间

``` javascript
import { get12, get24 } from 'time-ampm';

const t1 = 0;
console.log(get12(t1)); // '12 am';

const t2 = '10 pm';
console.log(get24(t2)); // '22';

```

#### 判断是否为闰年

判断是否为润年，参数支持number

``` javascript
import isLeapYear from 'leap-year';

isLeapYear(2014);//参数支持number
//=> false

isLeapYear(2016);
//=> true

```

### 类型转换

#### number转 hexString

js语言特性

``` javascript
//number.tostring(radix);
//radix落围2n36，不写就是十进制
var num = 255;
console.log(num.tostring(16));// 十进务十六进制
console.log(num.tostring(16).toupperCase());// 十进制转十六进制，再转大写
```

#### hexString 转 number

js语言特性

``` javascript
//parseInt(string, radix)
//radix范围2n36，不写就是十进制
var str = "FF";
console.1og(parseInt(str，16));//六进制舞广进制
var str1 = "12";
console.log(parseInt(str1));//产停串舞十进制
```

#### 像素单位转换

[像素单位转换](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/arkui-ts/ts-pixel-units.md/#%E5%83%8F%E7%B4%A0%E5%8D%95%E4%BD%8D%E8%BD%AC%E6%8D%A2)

| 名称   | 描述                                       |
| ---- | ---------------------------------------- |
| px   | 屏幕物理像素单位。                                |
| vp   | 屏幕密度相关像素，根据屏幕像素密度转换为屏幕物理像素，当数值不带单位时，默认单位vp。 |
| fp   | 字体像素，与vp类似适用屏幕密度变化，随系统字体大小设置变化。          |
| lpx  | 视窗逻辑像素单位，lpx单位为实际屏幕宽度与逻辑宽度（通过designWidth配置）的比值，designWidth默认值为720。当designWidth为720时，在实际宽度为1440物理像素的屏幕上，1lpx为2px大小。 |

| 接口                                                | 描述                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| vp2px(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number  | 将vp单位的数值转换为以px为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |
| px2vp(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number  | 将px单位的数值转换为以vp为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |
| fp2px(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number  | 将fp单位的数值转换为以px为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |
| px2fp(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number  | 将px单位的数值转换为以fp为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |
| lpx2px(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number | 将lpx单位的数值转换为以px为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |
| px2lpx(value&nbsp;:&nbsp;number)&nbsp;:&nbsp;number | 将px单位的数值转换为以lpx为单位的数值。<br/>从API version 9开始，该接口支持在ArkTS卡片中使用。 |

```ts
// xxx.ets
@Entry
@Component
struct Example {
  build() {
    Column() {
      Flex({ wrap: FlexWrap.Wrap }) {
        Column() {
          Text("width(220)")
            .width(220).height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White).fontSize('12vp')
        }.margin(5)
        Column() {
          Text("width('220px')")
            .width('220px').height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White)
        }.margin(5)
        Column() {
          Text("width('220vp')")
            .width('220vp').height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White).fontSize('12vp')
        }.margin(5)
        Column() {
          Text("width('220lpx') designWidth:720")
            .width('220lpx').height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White).fontSize('12vp')
        }.margin(5)
        Column() {
          Text("width(vp2px(220) + 'px')")
            .width(vp2px(220) + 'px').height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White).fontSize('12vp')
        }.margin(5)
        Column() {
          Text("fontSize('12fp')")
            .width(220).height(40).backgroundColor(0xF9CF93)
            .textAlign(TextAlign.Center).fontColor(Color.White).fontSize('12fp')
        }.margin(5)
      }.width('100%')
    }
  }
}
```

### 图片相关

该功能模块基于 [ImageKnife](https://gitee.com/openharmony-tpc/ImageKnife) [imagetype](https://github.com/fatelei/imagetype) 开发

#### PixelMap 转 ArrayBuffer

[readPixelsToBuffer(dst: ArrayBuffer): Promise<void>](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#readpixelstobuffer7)

读取图像像素数据，结果写入ArrayBuffer里，使用Promise形式返回。指定BGRA_8888格式创建pixelmap，读取的像素数据与原数据保持一致。

``` javascript
const readBuffer = new ArrayBuffer(96);  //96为需要创建的像素buffer大小，取值为：height * width *4
pixelmap.readPixelsToBuffer(readBuffer).then(() => {
    console.log('Succeeded in reading image pixel data.');  //符合条件则进入 
}).catch(error => {
    console.log('Failed to read image pixel data.');  //不符合条件则进入
})
```

#### ArrayBuffer 转 PixelMap

``` javascript
const color = new ArrayBuffer(96);  //96为需要创建的像素buffer大小，取值为：height * width *4
let bufferArr = new Uint8Array(color);
let opts = { editable: true, pixelFormat: 3, size: { height: 4, width: 6 } }
image.createPixelMap(color, opts)
    .then( pixelmap => {
        if (pixelmap == undefined) {
            console.info('createPixelMap failed.');
        }
        const area = { pixels: new ArrayBuffer(8),
            offset: 0,
            stride: 8,
            region: { size: { height: 1, width: 2 }, x: 0, y: 0 }
        }
        let bufferArr = new Uint8Array(area.pixels);
        for (var i = 0; i < bufferArr.length; i++) {
            bufferArr[i] = i + 1;
        }

        pixelmap.writePixels(area).then(() => {
		    console.info('Succeeded to write pixelmap into the specified area.');
        })
    }).catch(error => {
        console.log('error: ' + error);
    })
```

#### 获取 PixelMap

[writePixels(area: PositionArea): Promise<void>](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#writepixels7)

将PixelMap写入指定区域内，使用Promise形式返回写入结果。

``` javascript
const area = {
    pixels: new ArrayBuffer(8),
    offset: 0,
    stride: 8,
    region: { size: { height: 1, width: 2 }, x: 0, y: 0 }
}
pixelmap.readPixels(area).then(() => {
    console.log('Succeeded in reading the image data in the area.'); //符合条件则进入
}).catch(error => {
    console.log('Failed to read the image data in the area.'); //不符合条件则进入
})
```

#### 缩放图片

[scale(x: number, y: number, callback: AsyncCallback<void>): void](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#scale9)

根据输入的宽高对图片进行缩放，使用callback形式返回。

``` javascript
async function Demo() {
	await pixelmap.scale(2.0, 1.0);
}
```

#### 裁剪图片

[crop(region: Region, callback: AsyncCallback<void>): void](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#crop9)

根据输入的尺寸对图片进行裁剪，使用callback形式返回。

``` javascript
async function Demo() {
	await pixelmap.crop({ x: 0, y: 0, size: { height: 100, width: 100 } });
}
```

#### 旋转图片

[rotate(angle: number, callback: AsyncCallback<void>): void](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#rotate9)

根据输入的角度对图片进行旋转，使用callback形式返回。

``` javascript
var angle = 90.0;
pixelmap.rotate(angle, (err) => {
	if (err) {
        console.error("Failed to set rotation.");
        return;
    } else {
        console.log("Succeeded in setting rotation.");
	}
})
```

#### 转为圆形图片

[圆形剪裁显示](https://gitee.com/openharmony-tpc/ImageKnife#%E5%9B%BE%E7%89%87%E5%8F%98%E6%8D%A2%E7%9B%B8%E5%85%B3)

``` javascript
import AbilityStage from "@ohos.application.AbilityStage"
import {ImageKnife} from '@ohos/imageknife'

export default class MyAbilityStage extends AbilityStage {
    onCreate() {
        // 初始化全局ImageKnife实例，在AbilityStage.ts中调用ImageKnife.with(this.context)进行初始化
        globalThis.ImageKnife = ImageKnife.with(this.context)
    }
 }
类型:CropCircleTransformation
request.cropCircle()
```

#### 转为圆角图片

[圆形剪裁显示](https://gitee.com/openharmony-tpc/ImageKnife#%E5%9B%BE%E7%89%87%E5%8F%98%E6%8D%A2%E7%9B%B8%E5%85%B3)

``` javascript
import AbilityStage from "@ohos.application.AbilityStage"
import {ImageKnife} from '@ohos/imageknife'

export default class MyAbilityStage extends AbilityStage {
    onCreate() {
        // 初始化全局ImageKnife实例，在AbilityStage.ts中调用ImageKnife.with(this.context)进行初始化
        globalThis.ImageKnife = ImageKnife.with(this.context)
    }
 }
类型:RoundedCornersTransformation
request.roundedCorners()
```

#### 添加圆角边框

[添加圆角边框](https://gitee.com/openharmony-tpc/ImageKnife#1%E5%8A%A0%E8%BD%BD%E6%99%AE%E9%80%9A%E5%9B%BE%E7%89%87)

``` javascript
import {ImageKnifeComponent} from '@ohos/imageknife'
import {ImageKnifeOption} from '@ohos/imageknife'
import {ImageKnifeDrawFactory} from '@ohos/imageknife'
@Entry
@Component
struct Index {
  @State imageKnifeOption1: ImageKnifeOption =
    { // 加载一张本地的jpg资源（必选）
      loadSrc: $r('app.media.jpgSample'),
      // 组件宽设置为300，高设置为300（必选）
      size: { width: '300', height: '300' },
      // 占位图使用本地资源icon_loading（可选）
      placeholderSrc: $r('app.media.icon_loading'),
      // 失败占位图使用本地资源icon_failed（可选）
      errorholderSrc: $r('app.media.icon_failed'),
      // 绘制圆角30，边框5，边框"#ff00ff".用户自定义绘制（可选）
      drawLifeCycle:ImageKnifeDrawFactory.createRoundLifeCycle(5,"#ff00ff",30)
    };


  build() {
    Scroll() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        ImageKnifeComponent({ imageKnifeOption: this.imageKnifeOption1 })
      }
    }
    .width('100%')
    .height('100%')
  }
}
```

#### 转为灰度图片

[灰度级转换](https://gitee.com/openharmony-tpc/ImageKnife#%E5%9B%BE%E7%89%87%E5%8F%98%E6%8D%A2%E7%9B%B8%E5%85%B3)

``` javascript
import AbilityStage from "@ohos.application.AbilityStage"
import {ImageKnife} from '@ohos/imageknife'

export default class MyAbilityStage extends AbilityStage {
    onCreate() {
        // 初始化全局ImageKnife实例，在AbilityStage.ts中调用ImageKnife.with(this.context)进行初始化
        globalThis.ImageKnife = ImageKnife.with(this.context)
    }
 }
类型:GrayscaleTransformation
request.grayscale()
```

#### 快速模糊

[模糊处理](https://gitee.com/openharmony-tpc/ImageKnife#%E5%9B%BE%E7%89%87%E5%8F%98%E6%8D%A2%E7%9B%B8%E5%85%B3)

``` javascript
import AbilityStage from "@ohos.application.AbilityStage"
import {ImageKnife} from '@ohos/imageknife'

export default class MyAbilityStage extends AbilityStage {
    onCreate() {
        // 初始化全局ImageKnife实例，在AbilityStage.ts中调用ImageKnife.with(this.context)进行初始化
        globalThis.ImageKnife = ImageKnife.with(this.context)
    }
 }
类型:BlurTransformation
request.blur()
```

#### 图片打包器类

图片打包器类，用于图片压缩和打包。在调用ImagePacker的方法前，需要先通过createImagePacker构建一个ImagePacker实例，当前支持格式有：jpeg webp。

``` javascript
import image from '@ohos.multimedia.image';
const imageSourceApi = image.createImageSource(0);
let packOpts = { format:"image/jpeg", quality:98 };
imagePackerApi.packing(imageSourceApi, packOpts, data => {})
```

#### 获取图片尺寸

[提供基本的图像操作，包括获取图像信息、读写图像数据。调用readNextImage和readLatestImage接口时会返回image。](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#image9)

**系统能力：** SystemCapability.Multimedia.Image.Core

| 名称     | 类型               | 可读 | 可写 | 说明                                               |
| -------- | ------------------ | ---- | ---- | -------------------------------------------------- |
| clipRect | [Region](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#region7) | 是   | 是   | 要裁剪的图像区域。                                 |
| size     | [Size](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#size)      | 是   | 否   | 图像大小。                                         |
| format   | number             | 是   | 否   | 图像格式，参考[PixelMapFormat。](https://gitee.com/openharmony/docs/blob/OpenHarmony-3.2-Release/zh-cn/application-dev/reference/apis/js-apis-image.md#pixelmapformat7) |

``` javascript
import image from '@ohos.multimedia.image';
img.getComponent(4, (err, component) => {
    if(err) {
        console.log('getComponent failed.');
    } else {
        console.log('getComponent succeeded.');
    }
})
```

#### 判断是否为图片

目前支持 jpeg png gif tiff bmp

``` javascript
    import imtype from 'imtype';
   globalThis.context.resourceManager.getMedia($r("app.media.bmp"))
      .then(data => {
        this.bmp = imtype.isBMP(new Uint8Array(data))
      })
      .catch(err => {
        console.log('addFileToDisk err=' + err)
      })
```

## 目录

```
/util_code # 三方库源代码
├── entry      # demo用例
│   └── src
│       └── main
│   	    └── ets      # demo代码
│               └── entryability    # entryability
│               └── pages    # 测试demo页
│                   ├── CachePage.ets    # 内存缓存测试页
│                   ├── ColorDemo.ets    # 颜色测试页
│                   ├── GcoordPage.ets   # 坐标转换测试页
│                   ├── Index.ets        # 首页，测试页入口
│                   ├── PicturePage.ets  # 图片测试页
│                   └──  TimePage.ets     #时间测试页
├── library      # 功能代码模块
│   └── src
│       └── main
│           └── utilcode  # 功能代码模块
│               ├─ CountryUtils.ts  # 国家码模块源码
│               ├─ TempUtil.ts      # 温度模块源码
│               └── basic.ts         # 接口
```

## 约束与限制

在下述版本验证通过：

DevEco Studio 版本：3.1 Beta1（3.1.0.200），OpenHarmony SDK:API9（3.2.10.6）
DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/zdy09/openharmony_tpc_samples/blob/master/utilCode/LICENSE)
，请自由地享受和参与开源。
