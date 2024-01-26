## 利用NAPI提供的接口实现APP与pwm舵机硬件交互

**PS：不了解 pwm 的可以先阅读 unionman\unionpi_Tiger\sample\hardware\pwm 中的README.md**

**NAPI**在 `unionman\unionpi_Tiger\sample\app\gpioled_app\README.md` 中有详细介绍及说明

**工程目录如下：**

```
├── entry
   └── src
       ├── main
       │   ├── ets
       │   │   ├── entryability
       │   │   │   └── EntryAbility.ts
       │   │   └── pages
       │   │       └── Index.ets         // 主要代码
       │   ├── module.json5              // 配置文件
       │              
       └── ohosTest
           ├── ets
           │   ├── test
           │   │   ├── Ability.test.ets  // 测试代码
           │   │   └── List.test.ets
           │   ├── testability
           │   │   ├── pages
           │   │   │   └── Index.ets     // 测试UI
           │   │   └── TestAbility.ets
           │   └── testrunner
           │       └── OpenHarmonyTestRunner.ts
           ├── module.json5
```

流程如下：

### 1. 添加子系统

打开`build/subsystem_config.json`文件，添加下列语句

**添加 napisubsys 子系统**

```json
  "napisubsys": {
    "path": "vendor/unionman/unionpi_tiger/sample/napi/napisubsys",
    "name": "napisubsys"
  },
```

### 2. 添加组件

打开`unionpi_tiger/sample/napi/napisubsys/ohos.build`文件，在`"parts":`中添加下列语句

```json
    "pwmnapipart": {
      "variants": [
        "phone"
      ],
      "module_list": [
        "//vendor/unionman/unionpi_tiger/sample/napi/napisubsys/pwmnapipart/pwmnapidemo:pwmtest"
      ]
    }
```

### 3.添加产品定义

打开`vendor/unionman/unionpi_tiger/config.json`文件，在`"subsystems":`中添加下列语句

**添加  pwmnapipart 子组件**

```json
    {
      "subsystem": "napisubsys",
      "components": [
        {
         "component": "pwmnapipart",
         "features": []
       }
     ]
    },
```

**注意：在这些配置文件中，不要多加空行、符号，可能会导致开发板无法开机**

### 4.编译和烧录

参考：[unionpi_tiger/README_zh.md · OpenHarmony/device_board_unionman - Gitee.com](https://gitee.com/openharmony/device_board_unionman/blob/master/unionpi_tiger/README_zh.md#编译与调试)

在编译完成后，会在 `out\unionpi_tiger\packages\phone\system\lib\module` 目录下面生成对应的 **libpwmtest.z.so** 文件，该文件就是我们所需的库文件。

### 5.APP使用

#### 1.修改系统配置文件

修改系统权限，使 APP 能够使用开发板 pwm 的系统文件

打开 `device\board\unionman\unionpi_tiger\config\init\arm\init.A311D.cfg` 文件，在 **"jobs - name ：init" 的 "cmds"** 中添加下面语句

```
"write /sys/class/pwm/pwmchip0/export 0",
 "write /sys/class/pwm/pwmchip2/export 0",
"chmod 666 /sys/class/pwm/pwmchip0/pwm0/duty_cycle",
"chmod 666 /sys/class/pwm/pwmchip0/pwm0/period",
"chmod 666 /sys/class/pwm/pwmchip0/pwm0/enable",
"chmod 666 /sys/class/pwm/pwmchip0/pwm0/polarity",
"chmod 666 /sys/class/pwm/pwmchip2/pwm0/duty_cycle",
"chmod 666 /sys/class/pwm/pwmchip2/pwm0/period",
"chmod 666 /sys/class/pwm/pwmchip2/pwm0/enable",
"chmod 666 /sys/class/pwm/pwmchip2/pwm0/polarity",
```

**注意：在这些配置文件中，不要多加空行、符号，可能会导致开发板无法开机**

#### 2.安装APP

DevEco Studio 的安装可参考：

[搭建开发环境流程-快速开始-HUAWEI DevEco Studio For OpenHarmony使用指南-工具-HarmonyOS应用开发 | HarmonyOS](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ohos-deveco-studio-setup-flow-0000001218600628)

使用 DevEco Studio 打开位于 `vendor\unionman\unionpi_tiger\sample\app` 的 `pwm_app` 文件夹，并设置应用签名

点击 DevEco Studio 左上角的 **文件**，然后点击 **项目结构**，进入项目结构界面：

![1](../figures/pwm/2.png)

选择 **Signing Configs** ,在 **Automatically generate signature** 处打勾，然后点击 Apply，最后点击 OK

将位于`unionman\unionpi_tiger\sample\napi\napisubsys`中的`@ohos.pwmtest.d.ts`复制并放在`X:\Users\XXXXX\AppData\Local\OpenHarmony\Sdk\ets\3.1.6.6\api`文件夹内

*此路径是由SDK安装目录决定，如不清楚自己路径可打开DevEco Studio—工具—SDK管理—外观和行为—OpenHarmony SDK中查看*

在DevEco Studio右上角点击运行按钮，将APP安装至开发板

### 6.APP演示

![2](../figures/pwm/1.gif)
