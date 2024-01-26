## OpenHarmony BLE蓝牙连接

### 1. 简介

​	OpenHarmony蓝牙模块提供了基础的传统蓝牙能力以及BLE的扫描、广播等功能，这里将介绍如何通过OpenHarmony提供的@ohos.bluetooth (蓝牙接口)打开当前设备的蓝牙，连接BLE蓝牙设备，并订阅获取来自BLE设备的数据。

### 2.设备与环境

​	**设备**：Unionpi Tiger、Sinocare三诺臂式电子血压计
​	**开发工具**：DevEco Studio 3.1.0.200
​	**OpenHarmony SDK**：API9

### 3.逻辑流程

​		开始  —》Unionpi_Tiger 设备打开蓝牙 —》开始扫描BLE设备 —》 打开三诺臂式电子血压计 —》连接血压计 —》Unionpi_Tiger 订阅获取血压计的服务 —》三诺臂式电子血压计开始测量血压 —》通过日志查看BLE设备发送过来的数据 —》结束

### 4.操作流程

Unionpi_Tiger获取权限，打开蓝牙：

![get](../figures/ble_app/get.png)

开始扫描BLE设备，等待扫描设备完成，点击连接按钮，连接设备。

![scan](../figures/ble_app/scan.png)

成功连接设备后，可以配对列表中看到连接的BLE设备，并且在日志中看到连接成功

![conncet](../figures/ble_app/connect.png)

![conncet](../figures/ble_app/begin1.png)

在血压计中点开始按钮，开始测量，可以在日志中看到数据

![conncet](../figures/ble_app/begin2.png)

测量结果完成后，在日志中查看结果，同时查看血压计的数据，两者数据一致

![result](../figures/ble_app/result1.png)

![result](../figures/ble_app/result.png)

#### 注意：

1.因为扫描的设备过多，在代码中的扫描中添加了设备地址的过滤条件，为了方便查看。

```ets
    bluetooth.BLE.startBLEScan(
      [{
        deviceId: "C0:00:00:03:EE:FE",
      }],
      {
        interval: 7000,
        dutyMode: bluetooth.ScanDuty.SCAN_MODE_LOW_POWER,
        matchMode: bluetooth.MatchMode.MATCH_MODE_AGGRESSIVE,
      }
    )
```

2.如果需要向服务端发送设置通知此特征值请求、client端向低功耗蓝牙设备写入特定的特征值、订阅蓝牙低功耗设备的特征值变化事件，则需要先通过getServices接口获取该BLE设备的所有服务，再从这些服务中找到所需的服务。并且需要服务的各项UUID，Sinocare三诺臂式电子血压计的数据服务uuid如下：

```
serviceUuid: "0000FC00-0000-1000-8000-00805F9B34FB",
characteristicUuid: "0000FCA0-0000-1000-8000-00805F9B34FB",
descriptorUuid: "00002903-0000-1000-8000-00805F9B34FB",
```

具体代码可以参考当前目录`entry\src\main\ets\pages\Bluetooth.ets` 
