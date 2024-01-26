# inversifyDemo

## 简介
本demo是基于openHarmony系统下使用三方js库[inversify](https://github.com/inversify/InversifyJS)，inversify是一个强大而轻量级的控制反转容器，用于JavaScript和Node.js由TypeScript提供支持的应用程序。

## 下载安装
```
ohpm install inversify reflect-metadata
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

```
   import { injectable, inject } from "inversify";
   import "reflect-metadata";
   import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
   import { TYPES } from "./types";
   
   @injectable()
   class Katana implements Weapon {
       public hit() {
           return "cut!";
       }
   }
   
   @injectable()
   class Shuriken implements ThrowableWeapon {
       public throw() {
           return "hit!";
       }
   }
   
   @injectable()
   @Reflect.metadata("design:paramtypes",[Object,Object])
   class Ninja implements Warrior {
   
       private _katana: Weapon;
       private _shuriken: ThrowableWeapon;
   
       public constructor(
           @inject(TYPES.Weapon) katana: Weapon,
           @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
       ) {
           this._katana = katana;
           this._shuriken = shuriken;
       }
   
       public fight() { return this._katana.hit(); }
       public sneak() { return this._shuriken.throw(); }
   
   }
   
   export { Ninja, Katana, Shuriken };
```

## 接口说明

|       方法名        |      入参       |    接口描述    |
|:----------------:|:-------------:|:----------:|
|   injectable()   |               |    装饰器     |
|     inject()     |    |    进口注入    |
|   Container()    |   |     容器     |

更多接口的使用可参考[官方文档](https://github.com/inversify/InversifyJS/tree/master/wiki)，单元测试用例详情见[TEST.md](./TEST.md)

## 约束与限制
在下述版本验证通过：

DevEco Studio: 4.0 Beta1(4.0.3.400), SDK: API10 (4.0.9.6)。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/inversifyDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。