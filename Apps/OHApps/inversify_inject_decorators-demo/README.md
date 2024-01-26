# inversify_inject_decorators-demo

### 介绍
inversify_inject_decorators-demo是一个在OpenHarmony系统上验证inversify-inject-decorators（一个工具库，主要提供了lazyInject之类的方法，除了字面上所说的惰性，另外一个非常重要的功能就是允许将inversifyJs集成到任何自己控制类实例创建的库或者框架，比如react。）能力的代码示例。


### 安装教程

```shell
ohpm install inversify-inject-decorators inversify reflect-metadata
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

inversify-inject-decorators库依赖inversify、reflect-metadata两个库

### 使用说明

#### 1.lazyInject

下面的示例演示如何注入到属性中 使用装饰器：@lazyInject
````typescript
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named } from "inversify";
@Entry
@Component
struct LazyInjectPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear(){
    this.sample()
  }

  sample(){
    let container = new Container();
    let { lazyInject } = getDecorators(container);
    let TYPES = { Weapon: "Weapon" };

    interface Weapon {
      name: string;
      durability: number;
      use(): void;
    }

    @injectable()
    class Sword implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Sword";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    class Warrior {
      @lazyInject(TYPES.Weapon)
      public weapon: Weapon;
    }

    container.bind<Weapon>(TYPES.Weapon).to(Sword);

    let warrior = new Warrior();
    console.log((warrior.weapon instanceof Sword)+""); // true
    this.message=(warrior.weapon instanceof Sword)+"";
  }
}
````

#### 2.lazyInjectNamed

下面的示例演示如何注入到命名属性中 使用装饰器：@lazyInjectNamed
````typescript
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named } from "inversify";
@Entry
@Component
struct LazyInjectNamedPage {
  @State message: string = 'Hello World'
  @State message2: string = 'Hello World 2'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.message2)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear(){
    this.sample()
  }

  sample(){
    let container = new Container();
    let { lazyInjectNamed } = getDecorators(container);
    let TYPES = { Weapon: "Weapon" };

    interface Weapon {
      name: string;
      durability: number;
      use(): void;
    }

    @injectable()
    class Sword implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Sword";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    @injectable()
    class Shuriken implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Shuriken";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    class Warrior {

      @lazyInjectNamed(TYPES.Weapon, "not-throwable")
      @named("not-throwable")
      public primaryWeapon: Weapon;

      @lazyInjectNamed(TYPES.Weapon, "throwable")
      @named("throwable")
      public secondaryWeapon: Weapon;

    }

    container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetNamed("not-throwable");
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetNamed("throwable");

    let warrior = new Warrior();
    console.log((warrior.primaryWeapon instanceof Sword)+""); // true
    console.log((warrior.primaryWeapon instanceof Shuriken)+""); // true
    this.message=(warrior.primaryWeapon instanceof Sword)+"";
    this.message2=(warrior.primaryWeapon instanceof Shuriken)+"";
  }
}
````

#### 3.lazyInjectTagged

下面的示例演示如何注入标记的属性 使用装饰器：@lazyInjectTagged
````typescript
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named } from "inversify";
@Entry
@Component
struct LazyInjectTaggedPage {
  @State message: string = 'Hello World'
  @State message2: string = 'Hello World 2'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.message2)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear(){
    this.sample()
  }

  sample(){
    let container = new Container();
    let { lazyInjectTagged } = getDecorators(container);
    let TYPES = { Weapon: "Weapon" };

    interface Weapon {
      name: string;
      durability: number;
      use(): void;
    }

    @injectable()
    class Sword implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Sword";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    @injectable()
    class Shuriken implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Shuriken";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    class Warrior {

      @lazyInjectTagged(TYPES.Weapon, "throwable", false)
      @tagged("throwwable", false)
      public primaryWeapon: Weapon;

      @lazyInjectTagged(TYPES.Weapon, "throwable", true)
      @tagged("throwwable", true)
      public secondaryWeapon: Weapon;

    }

    container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetTagged("throwable", false);
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetTagged("throwable", true);

    let warrior = new Warrior();
    console.log((warrior.primaryWeapon instanceof Sword)+""); // true
    console.log((warrior.primaryWeapon instanceof Shuriken)+""); // true
    this.message=(warrior.primaryWeapon instanceof Sword)+"";
    this.message2=(warrior.primaryWeapon instanceof Shuriken)+"";
  }
}
````

#### 4.lazyMultiInject

以下示例演示如何对属性进行多注入 使用装饰器：@lazyMultiInject
````typescript
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named } from "inversify";
@Entry
@Component
struct LazyMultiInjectPage {
  @State message: string = 'Hello World'
  @State message2: string = 'Hello World 2'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.message2)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear(){
    this.sample()
  }

  sample(){
    let container = new Container();
    let { lazyMultiInject } = getDecorators(container);
    let TYPES = { Weapon: "Weapon" };

    interface Weapon {
      name: string;
      durability: number;
      use(): void;
    }

    @injectable()
    class Sword implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Sword";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    @injectable()
    class Shuriken implements Weapon {
      public name: string;
      public durability: number;
      public constructor() {
        this.durability = 100;
        this.name = "Shuriken";
      }
      public use() {
        this.durability = this.durability - 10;
      }
    }

    class Warrior {

      @lazyMultiInject(TYPES.Weapon)
      public weapons: Weapon[];

    }

    container.bind<Weapon>(TYPES.Weapon).to(Sword);
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken);

    let warrior = new Warrior();
    console.log((warrior.weapons[0] instanceof Sword)+""); // true
    console.log((warrior.weapons[1] instanceof Shuriken)+""); // true
    this.message=(warrior.weapons[0] instanceof Sword)+"";
    this.message2=(warrior.weapons[1] instanceof Shuriken)+"";
  }
}
````
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/inversify-inject-decorators-demo/TEST.md)

更多使用方式请参考[inversify-inject-decorators](https://github.com/inversify/inversify-inject-decorators)

### 约束和限制

在下述版本验证通过：

DevEco Studio: 4.0 Beta1(4.0.3.400) SDK API10(4.0.9.6)

### 目录结构

````
|---- inversify-inject-decorators-demo  
|     |---- entry  # 示例代码文件夹
|     |---- ohosTest # 单元测试文件夹
|     |---- README.MD  # 安装使用方法  
````

### 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

### 开源协议

本项目基于 [ Apache License 2.0 ](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/inversify_inject_decorators-demo/LICENSE) ，请自由地享受和参与开源。

