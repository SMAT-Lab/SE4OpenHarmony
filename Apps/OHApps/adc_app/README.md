# APP读取ADC温度传感器

**PS：建议学习该例程前先学习`..\..\hardware\adc`例程**

## 例程使用方法

### 一.添加子系统

打开`build/subsystem_config.json`文件，**添加下列语句**

```json
  "napisubsys":{
    "path":"vendor/unionman/unionpi_tiger/sample/napi/napisubsys",
    "name":"napisubsys"
  },
```

### 二.添加组件

打开`vendor/unionman/unionpi_tiger/sample/napi/napisubsys/ohos.build`文件，修改为

```json
{
    "subsystem": "napisubsys",
    "parts": {
        "adc_component": {
            "variants": [
                "phone"
            ],
            "module_list": [
                "//vendor/unionman/unionpi_tiger/sample/napi/napisubsys/adc_component:adc_napi"
            ]
        }
    }
}
```



### 三.添加产品定义

打开`vendor/unionman/unionpi_tiger/config.json`文件，在`"subsystems":`中添加下列语句

```json
    {
      "subsystem": "napisubsys",
      "components": [
        {
          "component": "adc_component",
          "features": []
        }
      ]
    },
```



### 四.编译 打包 烧录

在`vendor/unionman/unionpi_tiger/sample/BUILD.gn`，在`"deps ="`中添加下列语句

```gn
"napi/napisubsys/adc_component:sample_server"
```

编译、打包、烧录参考:https://gitee.com/openharmony/device_board_unionman/blob/master/unionpi_tiger/README_zh.md#%E7%BC%96%E8%AF%91%E4%B8%8E%E8%B0%83%E8%AF%95

### 五.使用

- 重新挂载，打开权限
```
hdc_std shell
mount -o rw,remount /
```

- 打开`cmd窗口`

```
hdc_std file send Z:\openharmony\OpenHarmony-3.1-release\out\a311d\common\common\sample_server /data
```

- 与开发板交互

```
hdc_std shell
```

- 修改权限

```
chmod 777 data/sample_server
```

- 运行`sample_server`

```
./data/sample_server
```

- 安装app

(1).用DevEco Studio打开位于 `unionman\a311d\sample\app` 的 `adc_app` 文件夹

(2).设置应用签名

![2](../figures/i2c/2.png)

![3](../figures/i2c/3.png)

(3).将位于`vendor\unionman\unionpi_tiger\sample\napi\napisubsys`中的`@ohos.adc_napi.d.ts`复制并放在`X:\Users\XXXXX\AppData\Local\OpenHarmony\Sdk\ets\3.1.6.6\api`文件夹内

(*此路径是由SDK安装目录决定，如不清楚自己路径可打开DevEco Studio—工具—SDK管理—外观和行为—OpenHarmony SDK中查看*)

(4).安装app至开发板

在DevEco Studio右上角点击图片上所示按钮![4](../figures/i2c/4.png)

### 六.效果 

![5](../figures/adc_effect.gif)