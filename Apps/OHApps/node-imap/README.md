# IMAP

## 简介

本项目是适配OpenHarmony环境的IMAP协议三方库，支持的能力如下:

- 支持连接邮件服务器。
- 支持客户端下载服务器上的邮件。
- 支持获取邮件信息。
- 支持邮件操作反馈至服务器。

## 下载安装

```
ohpm install @ohos/node-imap
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
1.登录  LoginPage login

```
async login() {
    const ctx = this;
    try {
      ctx.showToast('开始登录账号', 'login-imap')
      let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'))
      if (!globalThis.client) {
        if (ctx.secure) {
          let context: Context = globalThis.context ? globalThis.context : getContext(ctx)
          let ca0Data = await context.resourceManager.getRawFileContent('QQMailMiddle.pem')
          let ca0 = '';
          for (let i = 0; i < ca0Data.length; i++) {
            let todo = ca0Data[i]
            let item = String.fromCharCode(todo);
            ca0 += item;
          }
          // @ts-ignore
          ctx.option.secureOptions.ca[0] = ca0;

          let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem')
          let ca1 = '';
          for (let i = 0; i < ca1Data.length; i++) {
            let todo = ca1Data[i]
            let item = String.fromCharCode(todo);
            ca1 += item;
          }
          // @ts-ignore
          option.secureOptions.ca[1] = ca1;

          globalThis.client = new Imap({
            user: ctx.account + ctx.mailType,
            password: ctx.password,
            host: `imap.${hostParam}.com`,
            port: 993,
            tls: true,
            tlsOptions: ctx.option,
            socketTimeout: 60000,
            connTimeout: 60000,
            authTimeout: 60000,
            keepalive: true,

          });
        } else {
          globalThis.client = new Imap({
            user: 'xxx@xx.com',
            password: 'xxxxx',
            host: 'imap.xx.com',
            port: 143,
            tls: false,
            tlsOptions: undefined,
            socketTimeout: 60000,
            connTimeout: 60000,
            authTimeout: 60000,
            keepalive: true,

          });
        }
      }
      ctx.showToast(`客户端初始化成功，参数：${JSON.stringify(globalThis.client._config)}`, 'login-imap')
      if (globalThis.client) {
        globalThis.client.once('ready', function () {
          ctx.isLogin = true;
          ctx.showToast('登录成功，准备跳转邮件文件夹列表', 'login-imap')
          // globalThis.client._doKeepaliveTimer(true) //登陆成功之后通过noop命令不断的轮训服务器 防止断开连接 原库已封装了该命令不断调用 无需用户手动调用
        });

        globalThis.client.once('error', function (err) {
          console.log(err);
        });

        globalThis.client.once('end', function () {
          console.log('Connection ended');
        });
        ctx.showToast('开始连接服务器', 'login-imap')
        await globalThis.client.connect();
        ctx.showToast('服务器连接成功', 'login-imap')
      }
    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp')
    }
  }
```

2.退出登录 LoginPage loginOut

```
  loginOut() {
    const ctx = this;
    try {
      ctx.showToast('开始退出登录,请稍等', 'loginOut-imap')
      if (globalThis.client) {
        globalThis.client.end(() => {
          ctx.showToast('退出登录成功', 'loginOut-imap')
          router.clear()
          router.pushUrl({
            url: 'pages/Index"'
          })
        });

      } else {
        ctx.showToast('退出登录失败，客户端对象为空', 'loginOut-imap')
        router.clear()
        router.pushUrl({
          url: 'pages/Index"'
        })
      }
    } catch (err) {
      ctx.showToast(`退出登录出错：${err.message}`, 'loginOut-smtp')
    }
  }
```

3.获取邮箱文件夹列表 FolerPager refreshFolderList

```
  refreshFolderList() {
    const ctx = this;
    if (globalThis.client) {
      globalThis.client.getBoxes(function (err, data) {
        if (err) throw err;
        if (!data || typeof data != 'object') {
          throw new Error('get box status fail')
        }
        ctx.listData = [];
        for (let key in data) {
          console.log(`zdy---getBoxes key--->${key}`);
          ctx.listData.push(key.toString())
        }

      })
    } else {
      this.showToast('账号未登录，请登录后再试', 'MsgList-imap')
      router.back()
    }
  }
```

4.添加文件夹 FolerPager createFolder

```
  createFolder() {
    const ctx = this;
    try {
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始创建文件夹', 'createFolder-imap')
      if (globalThis.client) {
        globalThis.client.addBox(ctx.inputValue, (err, result) => {
          if (err) {
            ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'createFolder-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('创建文件夹成功', 'createFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'createFolder-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'createFolder-smtp')
    }
  }
```

5.删除文件夹 FolerPager  deleteFolder

```
  deleteFolder() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择一个需要删除的文件夹', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始删除文件夹', 'deleteFolder-imap')
      if (globalThis.client) {
        globalThis.client.delBox(ctx.selectFolder, (err, result) => {
          if (err) {
            ctx.showToast('删除文件夹失败', 'deleteFolder-imap')
          } else {
            ctx.selectFolder = undefined;
            ctx.showToast('删除文件夹成功', 'deleteFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'MsgList-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp')
    }
  }
```

6.重命名文件夹 FolerPager  renameFolder

```
 renameFolder() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始重命名文件夹', 'renameFolder-imap')
      if (globalThis.client) {
        globalThis.client.renameBox(ctx.selectFolder, ctx.inputValue, (err, result) => {
          if (err) {
            ctx.showToast(`重命名文件夹失败,原因：${err.message}`, 'renameFolder-imap')
          } else {
            ctx.selectFolder = undefined;
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('重命名文件夹成功', 'renameFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'renameFolder-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'renameFolder-smtp')
    }
  }
```

7.订阅文件夹 FolerPager  subBox

```
  subBox() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择邮箱', 'subBox-imap')
        return
      }
      ctx.showToast('订阅一个文件夹', 'subBox-imap')
      if (globalThis.client) {
        globalThis.client.subscribeBox(this.selectFolder , (err, result) => {
          if (err) {
            ctx.showToast(`订阅邮箱失败,原因：${err.message}`, 'subBox-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('订阅邮箱成功', 'subBox-imap')
            // ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'subBox-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`订阅邮箱出错：${err.message}`, 'subBox-smtp')
    }
  }
```

8.取消订阅文件夹 FolerPager  unSubBox

```
unSubBox() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择邮箱', 'unSubBox-imap')
        return
      }
      ctx.showToast('取消订阅邮箱', 'unSubBox-imap')
      if (globalThis.client) {
        globalThis.client.unsubscribeBox(this.selectFolder, (err, result) => {
          if (err) {
            ctx.showToast(`取消订阅邮箱失败,原因：${err.message}`, 'unSubBox-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('取消订阅邮箱成功', 'unSubBox-imap')
            // ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'unSubBox-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`取消订阅邮箱出错：${err.message}`, 'unSubBox-smtp')
    }
  }
```

9.获取订阅文件夹列表 FolerPager getSubList

```
getSubList() {
    const ctx = this;
    try {
      ctx.showToast('开始回用户$HOME目录下所有的文件，但LSUB命令只显示那些使用SUBSCRIBE命令设置为活动邮箱的文件。两个参数：邮箱路径和邮箱名。', 'closeBox-imap')
      if (globalThis.client) {
        globalThis.client.getSubscribedBoxes((err, result) => {
          if (err) {
            ctx.showToast(`获取所有活动邮箱的文件失败,原因：${err.message}`, 'expungeMail-imap')
          } else {
            ctx.showToast('获取所有活动邮箱的文件成功', 'expungeMail-imap')
            ctx.listData = [];
            for (let key in result) {
              console.log(`zdy---getBoxes key--->${key}`);
              ctx.listData.push(key.toString())
            }
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'expungeMail-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`获取所有活动邮箱的文件出错：${err.message}`, 'expungeMail-smtp')
    }
  }
```

10.邮件信息列表 MsgListPage getListData

```
  getListData() {
    const ctx = this;
    ctx.refreshPageSize();
    let buffer = '';
    ctx.uidList = [];
    ctx.listData = [];
    ctx.selectFolder = '';
    ctx.searchType = '';
    ctx.selectMsg = -1;
    // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
    var f = globalThis.client.seq.fetch(`${ctx.startIndex}:${ctx.endIndex}`, {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f.on('message', function (msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';

      msg.on('body', function (stream, info) {

        stream.on('data', function (chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function () {
          // console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));

        });
      });
      msg.once('attributes', function (attrs) {
        if (attrs && typeof attrs === 'object') {
          let uid = attrs['uid'] ? attrs['uid'] : ''
          ctx.uidList.push(uid);
        }
      });
      msg.once('end', function () {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function (err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function () {
      console.log('Done fetching all messages!');
      try {
        if (ctx.listData.length > 0) {
          ctx.listData.pop()
        }
        if (ctx.listData.length == 0) {
          ctx.listData.push(new MsgListHeadBean())
        }
        let jsonObj = buffer.split('\r\n\r\n')
        if (!jsonObj) {
          throw new Error('get message list fail')
        }
        for (let i = 0; i < jsonObj.length; i++) {
          let childArr = jsonObj[i].split('\r\n')
          let bean = new MsgListBean();
          if (i < ctx.uidList.length) {
            bean.uid = ctx.uidList[i];
          }
          for (let j = 0; j < childArr.length; j++) {
            let child = childArr[j];
            if (child && child.indexOf('Date') != -1) {
              bean.Date = child;
            } else if (child && child.indexOf('From') != -1) {
              bean.From = child;
            } else if (child && child.indexOf('To') != -1) {
              bean.To = child;
            } else if (child && child.indexOf('Subject') != -1) {
              bean.Subject = child;
            } else {
              continue;
            }
          }
          ctx.listData.push(bean)
        }
        ctx.listData.push(new MsgListFootBean())
      } catch (err) {
        throw err
      }
      // globalThis.client.end();
    });
  }
```

11.上传邮件 MsgListPage appendMail

```
  appendMail() {
    const ctx = this;
    ctx.selectMsg = -1
    try {
      let data = ctx.createMailData();
      if (!data || data.length < 1) {
        ctx.showToast('上传的邮件数据不可以为空', 'appendMail-imap')
        return
      }
      ctx.showToast('开始上传邮件', 'appendMail-imap')
      if (globalThis.client) {
        let option = {
          mailbox: ctx.folderName,
          flag: ['Seen'], //取值 Seen flagged等
          date: new Date(), //取值 Seen flagged等

        }
        globalThis.client.append(data, option, (err, result) => {
          if (err) {
            ctx.showToast(`上传邮件失败,原因：${err.message}`, 'appendMail-imap')
          } else {
            ctx.showToast('上传邮件成功', 'appendMail-imap')
            ctx.startIndex = 0;
            ctx.endIndex = 0;
            ctx.getListData()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'appendMail-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`上传邮件出错：${err.message}`, 'appendMail-smtp')
    }
  }
```

12.关闭邮箱 MsgListPage closeBox

```
  closeBox() {
    const ctx = this;
    try {
      ctx.selectMsg = -1
      ctx.showToast('开始关闭本文件夹', 'closeBox-imap')
      if (globalThis.client) {

        globalThis.client.closeBox((err, result) => {
          if (err) {
            ctx.showToast(`关闭本文件夹失败,原因：${err.message}`, 'closeBox-imap')
          } else {
            ctx.showToast('关闭本文件夹成功', 'appendMail-imap')
            router.clear()
            router.pushUrl({
              url: 'pages/FolderPage'
            })
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'closeBox-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`关闭本文件夹出错：${err.message}`, 'closeBox-smtp')
    }
  }
```

13.搜索邮件 search

```
  search() {
    const ctx = this;
    try {
      ctx.selectMsg = -1
      ctx.showToast('开始搜索邮件', 'search-imap')
      if (globalThis.client) {
        globalThis.client.search([ctx.searchType], (err, result) => {
          if (err) {
            ctx.showToast(`搜索邮件失败,原因：${err.message}`, 'search-imap')
          } else {
            ctx.showToast('搜索邮件成功 ' + JSON.stringify(result), 'search-imap')

            let jsonObj = result.split(',')
            if (!jsonObj) {
              throw new Error('get message list fail')
            }
            ctx.listData = [];
            for (let i = 0; i < jsonObj.length; i++) {
              let bean = new MsgListBean();
              bean.Date = '';
              bean.From = '';
              bean.To = '';
              bean.Subject = '当前搜索的信息编号：' + jsonObj[i];
              ctx.listData.push(bean)
            }

          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'search-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`搜索邮件出错：${err.message}`, 'search-smtp')
    }
  }
```

14.复制邮件 copyMail

```
copyMail() {
  const ctx = this;
  try {
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'copyMail---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'copyMail---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'copyMail---IMAP')
      return
    }
    if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
      ctx.showToast('请先选择一个邮箱', 'copyMail---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid
    if (globalThis.client) {
      globalThis.client.copy(uid, ctx.selectFolder, (err, result) => {
        if (err) {
          ctx.showToast(`复制邮件失败,原因：${err.message}`, 'copyMail-imap')
        } else {
          ctx.showToast('复制邮件成功 ' + JSON.stringify(result), 'copyMail-imap')

        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'copyMail-imap')
      router.back()
    }
  } catch (err) {
    ctx.showToast(`复制邮件出错：${err.message}`, 'copyMail-smtp')
  }
}
```

15.移动邮件 moveMail

```
moveMail() {
  const ctx = this;
  try {
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'moveMail---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'moveMail---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'moveMail---IMAP')
      return
    }
    if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
      ctx.showToast('请先选择一个邮箱', 'moveMail---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid
    if (globalThis.client) {
      globalThis.client.move(uid, ctx.selectFolder, (err, result) => {
        if (err) {
          ctx.showToast(`移动邮件失败,原因：${err.message}`, 'moveMail-imap')
        } else {
          ctx.showToast('移动邮件成功 ' + JSON.stringify(result), 'moveMail-imap')

        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'moveMail-imap')
      router.back()
    }
  } catch (err) {
    ctx.showToast(`移动邮件出错：${err.message}`, 'moveMail-smtp')
  }
}
```

16.排序邮件  sortMail

```
sortMail() {
  const ctx = this;
  try {
    if (!ctx.selectSort || ctx.selectSort.length < 1) {
      ctx.showToast('排序参数不可以为空', 'sortMail-imap')
      return
    }
    ctx.showToast('开始设置排序', 'sortMail-imap')
    if (globalThis.client) {

      globalThis.client.sort([ctx.selectSort], ['ALL'], (err, result) => {
        if (err) {
          ctx.showToast(`设置排序失败,原因：${err.message}`, 'sortMail-imap')
        } else {
          ctx.showToast('设置排序成功', 'sortMail-imap')
          ctx.startIndex = 0;
          ctx.endIndex = 0;
          ctx.getListData()
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'sortMail-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`设置排序出错：${err.message}`, 'sortMail-smtp')
  }
}
```

17.添加Flag addFlag

```
addFlag() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'addFlag---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'addFlag---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'addFlag---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件添加已读标记', 'addFlag-imap')
    if (globalThis.client) {
      globalThis.client.addFlags(uid, '\\Seen', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件添加已读标记失败,原因：${err.message}`, 'addFlag-imap')
        } else {
          ctx.showToast('给邮件添加已读标记成功', 'addFlag-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'storeMail-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件添加已读标记出错：${err.message}`, 'storeMail-smtp')
  }
}
```

18.设置Flag setFlag

```
setFlag() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'setFlag---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'setFlag---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'setFlag---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件设置已读标记', 'setFlag-imap')
    if (globalThis.client) {
      globalThis.client.setFlags(uid, '\\Seen', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件设置已读标记失败,原因：${err.message}`, 'setFlag-imap')
        } else {
          ctx.showToast('给邮件设置已读标记成功', 'setFlag-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'setFlag-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件设置已读标记出错：${err.message}`, 'setFlag-smtp')
  }
}
```

19.删除Flag deleteFlag

```
deleteFlag() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'deleteFlag---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'deleteFlag---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'deleteFlag---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件取消已读标记', 'deleteFlag-imap')
    if (globalThis.client) {
      globalThis.client.delFlags(uid, '\\Seen', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件取消已读标记失败,原因：${err.message}`, 'deleteFlag-imap')
        } else {
          ctx.showToast('给邮件取消已读标记成功', 'deleteFlag-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'deleteFlag-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件取消已读标记出错：${err.message}`, 'deleteFlag-smtp')
  }
}
```

20.添加Keywords addKeywords

```
addKeywords() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'setKeywords---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'setKeywords---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件添加关键字', 'setKeywords-imap')
    if (globalThis.client) {
      globalThis.client.addKeywords(uid, '鸿蒙关键字', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件添加关键字失败,原因：${err.message}`, 'setKeywords-imap')
        } else {
          ctx.showToast('给邮件添加关键字成功', 'setKeywords-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'setKeywords-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件添加关键字出错：${err.message}`, 'setKeywords-smtp')
  }
}
```

21.设置Keywords setKeywords

```
setKeywords() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'setKeywords---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'setKeywords---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件设置关键字', 'setKeywords-imap')
    if (globalThis.client) {
      globalThis.client.setKeywords(uid, '鸿蒙关键字', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件设置关键字失败,原因：${err.message}`, 'setKeywords-imap')
        } else {
          ctx.showToast('给邮件设置关键字成功', 'setKeywords-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'setKeywords-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件设置关键字出错：${err.message}`, 'setKeywords-smtp')
  }
}
```

22.删除Keywords delKeywords

```
delKeywords() {
  const ctx = this;
  try {
    const ctx = this;
    if (!ctx.selectMsg || ctx.selectMsg === -1) {
      ctx.showToast('请先选择一个邮件', 'delKeywords---IMAP')
      return
    }
    if (!ctx.listData || ctx.listData.length < 3) {
      ctx.showToast('当前邮箱中暂无可用的消息', 'delKeywords---IMAP')
      return
    }
    if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
      ctx.showToast('请选择正确的可以操作的邮件', 'delKeywords---IMAP')
      return
    }
    let uid = ctx.listData[ctx.selectMsg].uid

    ctx.showToast('开始给邮件删除关键字', 'delKeywords-imap')
    if (globalThis.client) {
      globalThis.client.delKeywords(uid, '鸿蒙关键字', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件删除关键字失败,原因：${err.message}`, 'delKeywords-imap')
        } else {
          ctx.showToast('给邮件删除关键字成功', 'delKeywords-imap')
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'delKeywords-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件删除关键字出错：${err.message}`, 'delKeywords-smtp')
  }
}
```

23.永久删除邮件 storeMail -> addDeleteFlag -> expungeMail

```
storeMail() {
  const ctx = this;
  if (!ctx.selectMsg || ctx.selectMsg === -1) {
    ctx.showToast('请先选择一个邮件', 'storeMail---IMAP')
    return
  }
  if (!ctx.listData || ctx.listData.length < 3) {
    ctx.showToast('当前邮箱中暂无可用的消息', 'storeMail---IMAP')
    return
  }
  if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
    ctx.showToast('请选择正确的可以操作的邮件', 'storeMail---IMAP')
    return
  }
  let uid = ctx.listData[ctx.selectMsg].uid
  ctx.addDeleteFlag(uid)
}

addDeleteFlag(uid: string) {
  const ctx = this;
  try {

    ctx.showToast('开始给邮件打删除标记', 'storeMail-imap')
    if (globalThis.client) {
      globalThis.client.addFlags(uid, '\\Seen', (err, result) => {
        if (err) {
          ctx.showToast(`给邮件打删除标记失败,原因：${err.message}`, 'storeMail-imap')
        } else {
          ctx.showToast('给邮件打删除标记成功', 'storeMail-imap')
          ctx.startIndex = 0;
          ctx.endIndex = 0;
          ctx.expungeMail(uid)
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'storeMail-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`给邮件打删除标记出错：${err.message}`, 'storeMail-smtp')
  }
}

expungeMail(uid: string) {
  const ctx = this;
  try {
    ctx.selectMsg = -1
    ctx.showToast('开始永久删除所有的标志为DELETED的邮件，EXPUNGE删除的邮件将不可以恢复', 'closeBox-imap')
    if (globalThis.client) {
      globalThis.client.expunge(uid, (err, result) => {
        if (err) {
          ctx.showToast(`永久删除失败,原因：${err.message}`, 'expungeMail-imap')
        } else {
          ctx.showToast('永久删除成功', 'expungeMail-imap')
          ctx.getListData()
        }
      });
    } else {
      this.showToast('账号未登录，请登录后再试', 'expungeMail-imap')
      router.back()
    }

  } catch (err) {
    ctx.showToast(`永久删除出错：${err.message}`, 'expungeMail-smtp')
  }
}
```

24.获取邮件详情 MsgDetailPage aboutToAppear

```
aboutToAppear() {
  const ctx = this;
  if (!globalThis.client) {
    this.showToast('账号未登录，请登录后再试', 'MsgDetail-imap')
    router.back()
    return
  }
  if (router.getParams() && router.getParams()['clickIndex']) {
    ctx.clickIndex = router.getParams()['clickIndex']
  } else {
    this.showToast('未获取到邮箱文件夹参数', 'MsgDetail-imap')
    router.back()
    return
  }
  var f = globalThis.client.seq.fetch(`${ctx.clickIndex}`, {
    bodies: 'TEXT',
    struct: true
  });
  f.on('message', function (msg, seqno) {
    console.log('Message #%d', seqno);
    var prefix = '(#' + seqno + ') ';

    msg.on('body', function (stream, info) {
      var buffer = '';
      stream.on('data', function (chunk) {
        buffer += chunk.toString('utf8');
      });
      stream.once('end', function () {
        try {
          ctx.showToast(`获取整个邮件体成功：${'\r\n'}${buffer}`, 'MsgDetail-imap');
          if (buffer.length > 65535) {
            ctx.message = `获取整个邮件体成功,文本长度超过65535，text，取65535长度用于显示：${'\r\n'}${buffer.substring(0, 65535)}`
          } else {
            ctx.message = `获取整个邮件体成功：${'\r\n'}${buffer}`
          }

        } catch (err) {
          throw err
        }
      });
    });
    msg.once('attributes', function (attrs) {
      // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
    });
    msg.once('end', function () {
      console.log(prefix + 'Finished');
    });
  });
  f.once('error', function (err) {
    console.log('Fetch error: ' + err);
  });
  f.once('end', function () {
    console.log('Done fetching all messages!');
    globalThis.client.end();
  });
}
```

## 接口说明

| 使用方法                                                     | 入参                                                         | 接口描述                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| end()                                                        |                                                              | 发送队列中的所有请求后，关闭与服务器的连接                   |
| on(event:stringm listener:Function)                          |                                                              | 绑定事件监听器                                               |
| append(msgdata:any, options:Connection.AppendOption, callback:(err:Error) =>void) | msgdata:any, options:Connection.AppendOption, callback:(err:Error) =>void | 将消息附加到选定的邮箱，msgData是包含RFC-822兼容MIME消息的字符串或缓冲区 |
| serverSupports(capability: string)                           | capability: string                                           | 检查服务器是否支持指定的功能                                 |
| destroy()                                                    |                                                              | 立即断开与服务器的连接                                       |
| copy(source:any, mailboxName: string, callback:(error:Error)=>void) | source:any, mailboxName: string, callback:(error:Error)=>void | 将当前打开的邮箱中的邮件复制到另一个邮箱                     |
| addBox(mailboxName:string, callback:(error:Error)=>void)     | mailboxName:string, callback:(error:Error)=>void             | 在服务器上创建新邮箱。邮箱名称应包括任何必要的前缀/路径。    |
| expunge(uids:any, callback:(error:Error)=>void)              | uids:any, callback:(error:Error)=>void                       | 永久删除当前打开的邮箱中标记为已删除的所有邮件。如果服务器支持“UIDPLUS”功能，则只能提供uid删除uid中同时具有uid并设置了\已删除标志的消息。注意：至少在Gmail上，使用任何当前打开的非垃圾邮件或垃圾箱邮箱的邮箱执行此操作仅存档任何标记为已删除的邮件（通过将他们移动到“所有邮件”邮箱） |
| fetch(source:any, options:Connection.FetchOptions)           | source:any, options:Connection.FetchOptions                  | 获取当前打开的邮箱中的邮件                                   |
| connect()                                                    |                                                              | 尝试与IMAP服务器连接和身份验证                               |
| getSubscribedBoxes(nsPrefix:string, callback:(error:Error, mailboxes:Connection.MailBoxes)=>void) | nsPrefix:string, callback:(error:Error, mailboxes:Connection.MailBoxes)=>void | 获取订阅邮箱的完整列表。如果未指定nsPrefix,则使用主个人命名空间 |
| renameBox(oldMailboxName: string, newMailboxName:string, callback:(error:Error,mailbox:Connection.Box)=>void) | oldMailboxName: string, newMailboxName:string, callback:(error:Error,mailbox:Connection.Box)=>void | 重命名服务器上存在的特定邮箱。oldMailBoxName和newMailBoxName都应包括任何必要的前缀/路径。注意:重命名“收件箱”邮箱将导致“收件箱”中的所有邮件都移动到新邮箱 |
| search(criteria:any[], callback:(error:Error, uids:number[])) | criteria:any[], callback:(error:Error, uids:number[])        | 使用给定条件在当前打开的邮箱中搜索邮件。条件是描述要查找的内容的列表。对于需要参数的条件类型，请使用数组而不仅仅是字符串条件类型名称(例如【‘From’,'foo@bar.com'】)。在条件类型前面加上要否定的“!” |
| openBox()                                                    |                                                              | openBox的时候自动调用，选择当前文件夹                        |
| status(mailboxName:string, callback:(error:Error, mailbox:Connection.Box) => void) | mailboxName:string, callback:(error:Error, mailbox:Connection.Box) => void | 获取有关当前打开的邮箱以外的邮箱的信息。注意：不能保证这将是服务器上的快速操作。此外，不要在当前打开的邮箱上调用此功能 |
| subscribeBox(mailboxName: string, callback:(error: Error)=>void) | mailboxName: string, callback:(error: Error)=>void           | 订阅服务器上存在的特定邮箱。邮箱名称应包括任何必要的前缀/路径 |
| unsubscribeBox(mailboxName: string, callback:(error: Error)=>void) | mailboxName: string, callback:(error: Error)=>void           | 取消订阅服务器上存在的特定邮箱。邮箱名称应包括任何必要的前缀/路径 |
| sort(sortCriteria:Connection.SortCriteria[], searchCriteria: any[], callback:(error:Error, uid:number[])=>void) | sortCriteria:Connection.SortCriteria[], searchCriteria: any[], callback:(error:Error, uid:number[])=>void | 使用给定的排序标准对当前打开的邮件邮箱进行排序。此方法首先在邮箱中搜索与给定搜索条件匹配的邮件，然后按给定的排序条件排序。（这是RFC5256的规范） |
| move(source:any, flags:any, callback:(error:Error)=>void)    | source:any, flags:any, callback:(error:Error)=>void          | 将当前打开的邮箱中的邮件移动到另一个邮箱。注意：目标邮箱中的邮件将具有新的邮件UID. |
| addFlags(source:any, flags:any,callback:(error:Error)=>void) | source:any, flags:any,callback:(error:Error)=>void           | 向消息(s)添加标志(s)                                         |
| delFlags(source:any, flags:any,callback:(error:Error)=>void) | source:any, flags:any,callback:(error:Error)=>void           | 从消息(s)删除标志(s)                                         |
| setlFlags(source:any, flags:any,callback:(error:Error)=>void) | source:any, flags:any,callback:(error:Error)=>void           | 设置消息(s)的标志(s)                                         |
| addKeywords(source:any,keywords:any,callback:(error:Error)=>void) | source:any,keywords:any,callback:(error:Error)=>void         | 将关键字(s)添加到消息(s)中。关键字是单个关键字或关键字数组。 |
| delKeywords(source:any,keywords:any,callback:(error:Error)=>void) | source:any,keywords:any,callback:(error:Error)=>void         | 从消息(s)中删除到消息关键字(s)。关键字是单个关键字或关键字数组。 |
| setKeywords(source:any,keywords:any,callback:(error:Error)=>void) | source:any,keywords:any,callback:(error:Error)=>void         | 设置消息(s)中的消息关键字(s)。关键字是单个关键字或关键字数组。 |
| openBox(mailboxName:string, openReadOnly:boolean, modifiers: Object, callback:(error:Error, mailbox: Connection.Box)=>void) | mailboxName:string, openReadOnly:boolean, modifiers: Object, callback:(error:Error, mailbox: Connection.Box)=>void | 打开服务器上存在的特定邮箱。邮箱名称应包括任何必要的前缀/路径。IMAP扩展使用修饰符 |
| closeBox(autoExpunge:boolean, callback:(error: Error)=>void) | autoExpunge:boolean, callback:(error: Error)=>void           | 关闭当前打开的邮箱。如果autoExpunge为true,则如果邮箱未以只读模式打开，则当前打开的邮箱中标记为已删除的任何邮件都将被删除。如果autoExpunge为false,您将断开连接或者打开另一个邮箱，则标记为已删除的邮件将不会从当前打开的邮箱中删除。 |
| delBox(mailboxName:string,callback:(error:Error)=>void)      | mailboxName:string,callback:(error:Error)=>void              | 删除服务器上存在的特定邮箱。邮箱名称应包括任何必要的前缀/路径。 |
| getBoxes(nsPrefix:string,callback:(error:Error,maiboxes:Connection.MailBoxes)=>void) | nsPrefix:string,callback:(error:Error,maiboxes:Connection.MailBoxes)=>void | 获取邮箱的完整列表。如果未指定nsPrefix,则使用主个人命名空间  |
| append(msgData:any,options:Connection.AppendOptions,callback:(error:Error)=>void) | msgData:any,options:Connection.AppendOptions,callback:(error:Error)=>void | 将消息附加到选定的邮箱。msgData是包含RFC-822兼容MIME消息的字符串或者缓冲区 |

更多模块的使用可参考[官方文档](https://github.com/mscdex/node-imap/blob/master/README.md)，[单元测试用例](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/node-imap/TEST.md)详情可参考

## 约束与限制

在下述版本验证通过：

DevEco Studio: 4.0 Release(4.0.3.413), SDK: API10 (4.0.10.3)

支持的邮箱类型：QQ邮箱、新浪邮箱、搜狐邮箱、126邮箱。

## 目录结构

```
|---- node-imap
|     |---- entry  # 示例代码文件夹
			|----bean  # 测试数据定义	
			|----pages # 页面测试代码
				|----index.ets 			#入口页面
				|----LoginPage.ets 		#登录页面
				|----FolderPage.ets 	#文件操作页面
				|----MsgDetailPage.ets	#具体信息处理页面
			    |----MsgListPage.ets	#信息列表处理页面
			    |----TestPage.ets		#测试场景页面
|     |---- IMAP  # IMAP库文件夹
|           |---- src  # IMAP库核心代码
				|----main
					 |----dependecies  #依赖的工具
					 |----js  	       #imap核心代码
					 |----polyfill     #imap对pollyfill的依赖
|           |---- index.ets  # IMAP库对外暴露接口
|     |---- README.MD  # 安装使用方法
```

## 贡献代码

使用过程中发现任何问题都可以提 [issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/node-imap/LICENSE) ，请自由的享受和参与开源。
