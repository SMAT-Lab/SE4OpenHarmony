# epublib

## 简介

> Epublib是一个用于读取/写入/操作epub文件的ets库


## 效果展示：
![动画](epublib.jpeg)


## 下载安装

```shell
ohpm install @ohos/epublib
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。


## 使用说明
### 示例代码
1.在entryAbility中引入GlobalContext
```
import { GlobalContext } from '@ohos/epublib'

onWindowStageCreate(windowStage: window.WindowStage) {
// Main window is created, set main page for this ability
GlobalContext.getContext().setValue('filePath',this.context.filesDir)
}
 ```
2.在page页面中引入epublib
```
import {DOMParser,EpubReader,EpubWriter, Book,Author,EpubResource,MediaType,Metadata,MediatypeService} from "@ohos/epublib"
```
3.使用

```
  funcStart(input: string) {
    console.log("-----funcStart----filePath-----------------" + input)
    let result = EpubReader.readEpub(input);
    if (result != undefined) {
      result.then((book) => {
        this.text = book.getResources()
          .getResourceMap()
          .get("chapter_446465249.xhtml")
          .getStrData()
          .toString();
        console.error("----index-result-------" + this.text)
        this.testEpubWriter(book)

      });
    }
  }

```

## 接口说明
1. 获取Book实例
   `readEpub(inPath:string, encoding?:string, lazyLoadedTypes?: Array<MediaType>):Book`
2. 通过resources读取电子书
   `readEpubToBook(resources:Resources, result?:Book):Book`
3. 惰性地从EPUB文件中读取并解析EPUB电子书
   `readEpubLazy(inPath: string, encoding?: string, lazyLoadedTypes?: Array<MediaType>): Book `
4. 获取构成该书的所有图像、章节、章节、xhtml文件、样式表等的集合
   `getResources(): Resources `
5. 获取该书内容。
   `getStrData()`
6. 写入Book内容 
   `write(book: Book, fileName: string)`
7. 获取EPUB电子书的内容顺序
   `getSpine()`
8. 获取EPUB电子书的元数据
   `getMetadata()`
9. 向EPUB电子书中添加一个资源
   `addResource(resource: EpubResource): EpubResource`
10. 获取epub文件在文件夹中的位置
   `getHref()`
11. 通过压缩文件加载资源 
   `loadResources(ZipFile zipFile, String defaultHtmlEncoding, List<MediaType> lazyLoadedTypes) `
12. 截取输出目录 
   `outFile(inZipPath: string): string`
13. 设置作者
   `addAuthor(author: Author)`
14. 添加标题
   `addTitle(title: string): string`
15. 设置语言 
   `setLanguage(language: string)`

## 约束与限制

在下述版本验证通过：


- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构

````
|---- epublib  
|     |---- entry  # 示例代码文件夹
|     |---- epublib   # 电子书库文件夹
|         |---- index.ets 提供外部接口文件    
|             |---- src
|                 |---- main
|                     |---- ets
|                         |---- components
|                             |---- domain # 相关的book一系列数据model
|                             |---- epub   # 解析处理 
|                             |---- service # 定义了支持的媒体类型
|                             |---- util # 通用方法库
|                             |---- Constants.ets # 常量定义
|     |---- README.md  # 安装使用方法                    
````


## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [LGPL License 3.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/epublib/LICENSE) ，请自由地享受和参与开源。
