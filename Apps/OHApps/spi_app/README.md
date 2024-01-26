# 利用NAPI提供的接口实现软件与硬件交互

## 一、添加子系统

打开`build/subsystem_config.json`文件，添加下列语句

```json
  "napisubsys": {
    "path": "vendor/unionman/unionpi_tiger/sample/napi/napisubsys",
    "name": "napisubsys"
  },
```

## 二、添加组件

打开`vendor/unionman/unionpi_tiger/config.json`文件，在`"subsystems":`中添加下列语句

```json
     {
      "subsystem": "napisubsys",
      "components": [
        {
         "component": "spinapipart",
         "features": []
       }
     ]
    },
```

## 三、添加产品定义

在`productdefine\common\products\ohos-arm64.json`，在`"parts": `中添加下列语句

```
"napisubsys:spinapipart":{},
```

## 四、编译 烧录

见 https://gitee.com/openharmony/device_board_unionman/blob/master/unionpi_tiger/README_zh.md#%E7%BC%96%E8%AF%91%E4%B8%8E%E8%B0%83%E8%AF%95

## 五、hdc_std工具修改开发板文件权限

1、无权限时，无法访问spi传输时所需的文件，需通过hdc_std工具,输入以下语句进入开发板环境：

```
hdc_std shell
```

2、输入以下语句开放相应文件的权限:

```
echo 486 > /sys/class/gpio/export
chmod 777 /sys/class/gpio/gpio486/value
chmod 777 /sys/class/gpio/gpio486/direction
chmod 777 /dev/spidev0.0
```

## 六、定义.d.ts文件

将本文件同一目录下的@ohos.spitest.d.ts文件，放到OpenHarmony SDK目录ets\\${ets_version}\\api目录下。使用SDK 8则${ets_version}为3.1.6.6，SDK 7则为3.0.0.0。

## 七、应用开发

 1、使用鸿蒙应用开发工具：DevEco studio；打开同一目录下的spi_app文件项目
![](../figures/spi/1661498008.png)



 2、使用Micro USB数据线连接PC与开发板OTG口并接通电源后点击Run即可
![](../figures/spi/1661497707(1).png)


## 八、演示效果

![](../figures/spi/effect.gif)
