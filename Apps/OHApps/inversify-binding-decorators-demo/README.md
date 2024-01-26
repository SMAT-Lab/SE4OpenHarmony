# inversify-binding-decoratorsDemo

#### 介绍
inversify-binding-decoratorsDemo是一个在OpenHarmony系统上验证inversify-binding-decoratorsDemo（一个实用程序，允许开发人员使用 ES2016 装饰器声明 InversifyJS 绑定）能力的代码示例。

#### 安装
```shell
ohpm install inversify-binding-decorators
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

#### 使用说明

````
import { injectable, Container } from "inversify";
import { provide, buildProviderModule } from "inversify-binding-decorators/es/index";
import "reflect-metadata";

let container = new Container();

interface Warrior {
    katana: Weapon;
    shuriken: ThrowableWeapon;

    fight(): string;
    
    sneak(): string;
}

interface Weapon {
    hit(): string;
}

interface ThrowableWeapon {
    throw(): string;
}

let TYPE = {
    ThrowableWeapon: "ThrowableWeapon",
    Warrior: "Warrior",
    Weapon: "Weapon"
};

@provide(TYPE.Weapon)
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.ThrowableWeapon)
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@provide(TYPE.Warrior)
class Ninja implements Warrior {
    public katana: Weapon;
    public shuriken: ThrowableWeapon;
    
    public constructor(
        @inject(TYPE.Weapon) katana: Weapon,
        @inject(TYPE.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    
    public fight() {
        return this.katana.hit();
    }
    
    public sneak() {
        return this.shuriken.throw();
    }
}

container.load(buildProviderModule());
let ninja = container.get<Warrior>(TYPE.Warrior);

expect(ninja instanceof Ninja).eql(true);
expect(ninja.katana instanceof Katana).eql(true);
expect(ninja.shuriken instanceof Shuriken).eql(true);[README.md](..%2FEasyrelpace%2FREADME.md)
expect(ninja.fight()).eql("cut!");
expect(ninja.sneak()).eql("hit!");
````

单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/inversify-binding-decorators-demo/TEST.md)

更多使用方式请参考[inversify-binding-decorators](https://github.com/inversify/inversify-binding-decorators)

### 约束和限制

在下述版本验证通过：

DevEco Studio: 4.0 Beta1(4.0.3.400) SDK API10(4.0.9.6)

### 目录结构

````
|---- inversify-binding-decorators-demo  [README.md](..%2FEasyrelpace%2FREADME.md)
|     |---- entry  # 示例代码文件夹
|     |---- ohosTest # 单元测试文件夹
|     |---- README.MD  # 安装使用方法  
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [ Apache License 2.0 ](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/inversify-binding-decorators-demo/LICENSE) ，请自由地享受和参与开源。
