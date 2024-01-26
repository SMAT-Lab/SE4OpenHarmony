# Jackrabbit

## 简介

> 本软件是参照开源软件 [jackrabbit](https://github.com/pagerinc/jackrabbit) 源码并用 TypeScript 语言实现了相关功能，在OpenHarmony上支持AMQP（Advanced Message Queuing Protocol）网络通信协议的library，可以在一个进程间传递异步消息。

> Jackrabbit底层依赖amqplib库，在RabbitMQ上实现了多种消息传递模式。

## 下载安装

1. 参考安装教程 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

2. 安装命令如下：

   ```
   ohpm install @ohos/jackrabbit
   ```
## 主要功能
1. 发布消息：支持json及string类型的消息发送，同时也支持设置相关的发布消息的配置信息
2. 消费消息：支持设置接收消息的回调函数，也支持设置相关消费信息的配置信息
3. 交换机配置：支持设置direct、fanout、topic共三种类型的交换机、支持设置交换机名称、是否持久化、是否超时等配置信息
4. 队列配置：支持设置队列名称、是否持久化、最大长度等配置信息
5. 更为精简的amqp通信接口：相对于amqplib提供的接口，jackrabbit在交换机和队列操作方面提供了更为精简易用的接口；客户端增加了Exchange和Queue的类抽象，相比于amqplib每次都需要通过字符串参数向服务端指定对哪个交换机/队列进行操作，jackrabbit在创建完交换机/队列后立刻就能拿到一个Exchange/Queue对象，以后只需要调用此对象的方法即可
6. 增加重连机制：增加了amqplib原本不支持的重连机制

## 使用说明
### 使用前言
1. 需要搭建RabbitMQ环境，请根据该参考链接安装环境：https://zhuanlan.zhihu.com/p/381644577

2. RabbitMQ与Erlang是存在版本对应关系，两者版本如果不对应会出现许多问题，详见：https://www.rabbitmq.com/which-erlang.html

3. 可参考版本对应关系：

   1. RabbitMQ版本为"rabbitmq-server-3.10.7.exe"，下载链接：https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.7
   2. Erlang版本为"otp_win64_25.0.exe"，下载链接：https://www.erlang.org/patches/otp-25.0

4. 由于RabbitMQ默认的guest只能从localhost连接不能使用远程连接，官方给出的解决方案是通过配置文件修改RabbitMQ的配置，以下是修改步骤：

   1. 找到RabbitMQ的安装目录，以rabbitmq-server-3.10.7为例；

   2. 在\rabbitmq_server-3.10.7\etc下有个README.txt文件，通过文件指引找到"真正"的RabbitMQ；

   3. 在C:\Users\%USERNAME%\AppData\Roaming\RabbitMQ目录下新建一个配置文件：rabbitmq.config，并写入：

      ```
      [{rabbit, [{loopback_users, []}]}].
      ```

   4. 保存并退出；

   5. 重启RabbitMQ服务：

      1. win键+R输入cmd，打开命令行窗口；

      2. 输入以下命令打开电脑服务；

         ```
         SERVICES.MSC
         ```

      3. 找到RabbitMQ单击并点击重启动此服务；

5. 测试机需联网并且与服务器的ip地址需要相同；

6. 库实现依赖buffer、stream、events等node模块，需配置polyfill后才能通过编译，配置方法参考： [OpenHarmony-SIG/openharmony-polyfill (gitee.com)](https://gitee.com/openharmony-sig/openharmony-polyfill) ；

7. 编译并安装hap包到测试机即可进行用例测试；

8. 具体使用demo请参考开源库sample页面的实现；

### 1.默认交换机

```
  receive(console: Console.Model) {
    if (this.rabbit) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.default();
    let hello = exchange.queue({ name: 'hello_jackrabbit', prefetch: 0 });
    let onMessage=(data:ESObject)=> {
      console.log('received:%s', data);
    }
    hello.consume(onMessage, { noAck: true });
    this.rabbit = rabbit;
    console.info('start receiver');
  }
```

```
  send(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.default();
    let hello = exchange.queue({ name: 'hello_jackrabbit' });

    exchange.publish('Hello World!', { key: 'hello_jackrabbit' });
    exchange.on('drain', () => {
      console.info('Message sent: Hello World!')
      setTimeout(() => {
        rabbit.close();
      }, 100);
    });
  }
```

### 2.直连交换机

```
  receiveEnglish(console: Console.Model) {
    if (this.rabbitEnglish) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.default();
    let hello = exchange.queue({ name: 'task_queue', durable: true });

    hello.consume(onGreet);

    let onGreet=(data:ESObject, ack:ESObject)=> {
      console.log('Hello, ' + data.name + '!');
      ack();
    }

    this.rabbitEnglish = rabbit;
    console.info('start English receiver');
  }
```

```
  publish(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.default();
    let hello = exchange.queue({ name: 'task_queue', durable: true });

    exchange.publish({ name: 'Hunter' }, { key: 'task_queue' });
    exchange.on('drain', () => {
      console.info('Message sent: Hunter');
      setTimeout(() => {
        rabbit.close();
      }, 100);
    });
  }
```

### 3.扇形交换机

```
  receive(console: Console.Model) {
    if (this.rabbit) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.fanout();
    let logs = exchange.queue({ exclusive: true });

    logs.consume(onLog, { noAck: true });
    // logs.consume(false); // stops consuming

    let onLog=(data:ESObject)=> {
      console.log('Received log:' + data);
    }

    this.rabbit = rabbit;
    console.info('start receiver');
  }
```

```
  send(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.fanout();

    exchange.publish('this is a log');
    exchange.on('drain', () => {
      console.info('Message sent: this is a log');
      setTimeout(() => {
        rabbit.close();
      }, 100);
    });
  }
```

### 4.多队列匹配

```
  receive(console: Console.Model) {
    if (this.rabbit) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.direct('direct_logs_jackrabbit');
    let errors = exchange.queue({ exclusive: true, key: 'error' });
    let logs = exchange.queue({ exclusive: true, keys: ['info', 'warning'] });
    let toDisk = (data:ESObject, ack:ESObject)=> {
      console.log('Writing to disk:' + data.text);
      ack();
    }

    let toConsole=(data:ESObject, ack:ESObject)=> {
      console.log('Writing to console:' + data.text);
      ack();
    }

    errors.consume(toDisk);
    logs.consume(toConsole);


    this.rabbit = rabbit;
    console.info('start receiver');
  }
```

```
  send(console: Console.Model) {
    var rabbit = jackrabbit('amqp://' + this.serverIp);
    var exchange = rabbit.direct('direct_logs_jackrabbit');

    exchange.publish({ text: 'this is a harmless log' }, { key: 'info' });
    exchange.publish({ text: 'this one is more important' }, { key: 'warning' });
    exchange.publish({ text: 'pay attention to me!' }, { key: 'error' });
    exchange.on('drain', () => {
      console.info('Message sent.');
      setTimeout(() => {
        rabbit.close();
      }, 100);
    });
  }
```

### 5.主题交换机

```
  receive(console: Console.Model) {
    if (this.rabbit) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.topic('topic_animals');
    let first=(data:ESObject, ack:ESObject)=> {
      console.log('First:' + data.text);
      ack();
    }

    let second=(data:ESObject, ack:ESObject)=> {
      console.log('Second:' + data.text);
      ack();
    }

    exchange
      .queue({ exclusive: true, key: '*.orange.*' })
      .consume(first);

    exchange
      .queue({ exclusive: true, keys: ['*.*.rabbit', 'lazy.#'] })
      .consume(second);


    this.rabbit = rabbit;
    console.info('start receiver');
  }
```

```
  send(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    let exchange = rabbit.topic('topic_animals');

    exchange
      .publish({ text: 'both queues 1' }, { key: 'quick.orange.rabbit' })
      .publish({ text: 'both queues 2' }, { key: 'lazy.orange.elephant' })
      .publish({ text: 'first queue 1' }, { key: 'quick.orange.fox' })
      .publish({ text: 'second queue 1' }, { key: 'lazy.brown.fox' })
      .publish({ text: 'second queue 2' }, { key: 'lazy.pink.rabbit' })
      .publish({ text: 'discarded' }, { key: 'quick.brown.fox' })
      .publish({ text: 'discarded' }, { key: 'orange' })
      .publish({ text: 'second queue 3' }, { key: 'lazy.orange.male.rabbit' })
      .on('drain', () => {
        console.info('Message sent.');
        setTimeout(() => {
          rabbit.close();
        }, 100);
      });
  }
```

### 6.一对一连接

```
  startServer(console: Console.Model) {
    if (this.rabbitServer) {
      return;
    }
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    const exchange = rabbit.default();
    const rpc = exchange.queue({ name: 'rpc_queue_jackrabbit', prefetch: 1, durable: false });

    const fib = (n) => {
      if (n === 0) {
        return 0;
      }

      if (n === 1) {
        return 1;
      }
      return fib(n - 1) + fib(n - 2);
    };

    const onRequest = (data:ESObject, reply:ESObject) => {
      console.log('got request for n:' + data.n);
      if (data.n > 30) {
        console.warn(`fib(${data.n}) may costs too mush time on device, replace to fib(30)`)
        data.n = 30;
      }
      reply({ result: fib(data.n) });
    };

    rpc.consume(onRequest);

    this.rabbitServer = rabbit;
    console.info('start rpc server');
  }
```

```
  startClient(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    const exchange = rabbit.default();
    const rpc = exchange.queue({ name: 'rpc_queue_jackrabbit', prefetch: 1, durable: false });

    const onReply = (data:ESObject) => {
      console.log('result:' + data.result);
      rabbit.close();
    };
    rpc.on('ready', () => {
      exchange.publish({ n: 30 }, {
        key: 'rpc_queue_jackrabbit',
        reply: onReply // auto sends necessary info so the reply can come to the exclusive reply-to queue for this rabbit instance
      });
    });
    console.info('Request fib(30), wait for reply.');
  }
```

### 7.超时检查

```
  startClientTimeout(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    const exchange = rabbit.default();

    exchange.rpcClient('rpc_queue_jackrabbit_timeout', { n: 30 }, { timeout: 1000 }, (result) => {
      if (result && result instanceof Error) {
        console.error(result.toString());
      } else {
        console.info(result);
      }
    });
    console.info('Request fib(30), wait for reply(with 1s timeout).');
  }
```

```
  startClient(console: Console.Model) {
    let rabbit = jackrabbit('amqp://' + this.serverIp);
    const exchange = rabbit.default();

    // ensure queue is ready before sending out request
    const rpc = exchange.queue({ name: 'rpc_queue_jackrabbit_timeout', prefetch: 1, durable: false, autoDelete: true });
    rpc.on('ready', () => {

      exchange.rpcClient('rpc_queue_jackrabbit_timeout', { n: 30 }, null, (result) => {
        if (result && result instanceof Error) {
          console.error(result.toString());
        } else {
          console.info(result);
        }
      });
    });
    console.info('Request fib(30), wait for reply.');
  }
```

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317) OpenHarmony SDK:API11 (4.1.0.36)


## 目录结构

```
|---- Jackrabbit
|     |---- amqplib  # amqplib库文件夹
|           |---- ets
|                 |---- lib  # 主要依赖
|                 |---- types  # 对外接口文件夹
|                 |---- callback_api.js  # callback回调脚本
|                 |---- channel_api.js  # promise回调脚本
|     |---- entry  # 示例代码文件夹
|     |---- library  # Jackrabbit库文件夹
|           |----ets    
|                 |---- compat  # 兼容工具文件夹
|                 |---- node_modules  # 依赖amqplib库
|                 |---- types  # 对外接口文件夹
|                 |---- exchange.js  # 交换机脚本
|                 |---- jackrabbit.js  # jackrabbit脚本
|                 |---- queue.js  # 队列脚本
|     |---- screenshot  # 效果展示截图
|     |---- README.md  # 安装使用方法
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT LICENSE](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/jackrabbit/LICENSE) ，请自由地享受和参与开源。
