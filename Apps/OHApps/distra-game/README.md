# 分布式飞机大战

## 工程目录:

```
entry/src/main/ets/
├── common
│   └── relationlStore.ets //数据库
├── entryability
│   └── EntryAbility.ts
├── object
│   └── hero.ets //对象声明
├── pages
│   ├── flygame.ets //游戏逻辑实现
│   ├── founction.ets //功能函数
│   ├── Index.ets
└── ytracom //图片资源

```

图片素材来源于：开源资源：https://github.com/xs528/game。

## 环境：

1. SDK版本：API9 3.2.10.7 FullSDK   (可兼容3.2.10.7以上的fullSDK版本 )。

   ps：3.2.10.7由Beta5源码编译出来，编译SDK命令：

   ```
   ./build.sh --product-name ohos-sdk
   ```

2. 游戏弹窗UI在Openharmony Beta5 上适配效果好，其余版本弹窗UI会出现偏差。

## 游戏使用：

1.如果需要实现分布式同步需先用系统自带的计算机进行分布式组网；组网步骤:

![p1](../figures/distra-game/p1.png)

当有对应设备时会有更多设备选项，选择对应的设备后会进行pin连接，组网成功后两端都开打开计算器，并且两边时同步的。

2.组网后可通过游戏蓝色图标进行获取可信任设备进行游戏拉起，设备都得安装游戏应用。

![p3](../figures/distra-game/p3.png)

选择设备，被选择的设备游戏会被拉起，此时点击两个图标外的区域就可以进入游戏模式选择。

![p4](../figures/distra-game/p4.png)

3.2.2relase上弹窗暂时有显示bug，蓝色为选择的游戏模式，可通过滑动游戏模式选择，同步模式为双方英雄飞机为同步的两边的操作都能同步到对方设备。

对抗模式为:

![p5](../figures/distra-game/p5.png)

3.如果需要单机游玩可以在不连接设备选择同步模式进行单机游戏。