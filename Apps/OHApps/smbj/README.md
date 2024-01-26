# smbj

## 简介

>主要用于计算机间共享文件，支持安全保护，访问共享目录、打开文件、读写文件等


## 下载安装
```shell
ohpm install @ohos/smbj 
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。


## 使用说明

### 引入 SMB2
   ```
   // one: 
   import { SMB2} from '@ohos/smbj'
   
   //two:
   var client = new SMB2(
      {
        share: '\\\\10.50.40.30\\test_smbj',
        domain:'DOMAIN',
        username: 'Administrator',
        password: 'pass123',
        clientIP:'10.50.40.52'
      }
    )
    //three:
     client.exists(check, function (err, exit) {
            if (err) {
              console.log('smb erro:' + err.message)
              throw err;

            }
     prompt.showToast({message:"文件夹或文件是否存在"+exit,duration:5000})
   ```
## 接口说明   
1. 查询文件或文件夹是否存在
   ```
    public exists(path, callback)
   ```
2. 创建文件夹
   ```
   public mkdir(path, callback)
   ```
3. 读取文件夹
   ```
   readdir(path, callback)
   ```
4. 读取文件内容
   ```
   public readFile(filename: string, options?: { encoding: 'UTF-8' }, callback?: any)
   ```
5. 重命名文件夹或文件
   ```
   public rename(oldPath, newPath, callback)
   ```
6. 写入到文件
   ```
   public writeFile(filename, data, encoding?: string, callback?: any)
   ```
7. 删除文件夹
   ```
   public rmdir(path, callback) 
   ```
8. 删除文件
   ```
   public unlink(path, callback) 
   ```
9. 文件断点上传
   ```
   public sendFile(filename, data, callback) 
   ```

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
|---- smbj
    |---- entry
    |     |---- pages       # 示例代码文件夹       
    |---- library              # 库文件夹 
    |     |---- api         # 接口文件夹 
    |     |---- crypto      # 加密文件夹            
    |     |---- message     # 请求消息体文件夹
    |     |---- ntlm        # 身份认证文件夹
    |     |---- structures  # request/response结构体文件夹
    |     |---- tools       # socket处理文件夹
    |     |---- README.md  # 安装使用方法
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/smbj/LICENSE) ，请自由地享受和参与开源。

