/*
 * GNU LESSER GENERAL PUBLIC LICENSE
 * Version 3, 29 June 2007
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * The Free Software Foundation may publish revised and/or new versions of the GNU Lesser
 * General Public License from time to time. Such new versions will be similar in spirit to the
 * present version, but may differ in detail to address new problems or concerns.

 * Each version is given a distinguishing version number. If the Library as you received it
 * specifies that a certain numbered version of the GNU Lesser General Public License “or any
 * later version” applies to it, you have the option of following the terms and conditions either
 * of that published version or of any later version published by the Free Software Foundation. If
 * the Library as you received it does not specify a version number of the GNU Lesser General
 * Public License, you may choose any version of the GNU Lesser General Public License ever
 * published by the Free Software Foundation.

 * If the Library as you received it specifies that a proxy can decide whether future versions of
 * the GNU Lesser General Public License shall apply, that proxy's public statement of
 * acceptance of any version is permanent authorization for you to choose that version
 * for the Library.
 */


import {
  DOMParser,
  EpubReader,
  EpubWriter,
  Book,
  Author,
  EpubResource,
  MediaType,
  Metadata
} from "@ohos/epublib"
import util from '@ohos.util';
import prompt from '@ohos.promptAction';
import fs from '@ohos.file.fs';

@Entry
@Component
struct Index {
  srcStr = '<?xml version="1.0"?>' +
  '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">' +
  '<rootfiles>' +
  '<rootfile full-path="content.opf" media-type="application/oebps-package+xml"/>' +
  '</rootfiles>' +
  '</container>';
  @State text: string | undefined  = '-Epub-'
  @State compressEnabled: boolean = true
  @State clickEnabled: boolean = true
  private context: Context = getContext()
  filePath: string = this.context.filesDir

  build() {
    Column() {

      Button('Compress')
        .width(150)
        .height(60)
        .enabled(this.compressEnabled)
        .onClick(() => {
          console.info("- St -");
          this.funcUnEpub(this.filePath + "/epub-book.epub");
        })
      Button('Click')
        .width(150)
        .enabled(this.clickEnabled)
        .height(60)
        .onClick(() => {
          console.info("- St -");
          this.funcStart(this.filePath + "/epub-book.epub");
        })
        .margin({ top: 10 })
      TextArea({ text: this.text })
        .height('60%')
        .padding(15)
        .fontSize(px2fp(25))
        .focusable(false)
        .fontColor("#070707")
        .margin({ top: 30 })
        .align(Alignment.TopStart)
    }.height('90%').width('100%').padding(35).margin({ top: 30 })
  }

  test() {
    console.info("- Test to unit system lib.dow.d.ts of  getElementsByTagNameNS(namespaceURI: string, localName: string)-");
    let dataStr = this.readerFile(this.filePath + "/test", "mimetype");
    let domParser: DOMParser = new DOMParser();
    let result: ESObject = domParser.parseFromString(dataStr + "");
    this.text = result.toString();
  }

  funcUnEpub(input: string) {
    try {
      EpubReader.unEpub(input).then((data) => {
        this.compressEnabled= !this.compressEnabled
        console.log("----unEpub----successful-----------" + data)
      });
    } catch (err) {
      prompt.showToast({ message: 'no input file found',
        duration: 2000 });
      console.log("----unEpub----failed-----------" + err)
    }
  }

  funcStart(epubFile: string) {
    let book = EpubReader.readEpubFile(EpubReader.outFile(epubFile))

    if (book) {
      this.text = book.getResources()
        ?.getResourceMap()
        ?.get("chapter_446465249.xhtml")
        ?.getStrData()
        ?.toString();
      this.clickEnabled = !this.clickEnabled
      console.error("----index-result-------" + this.text)
      this.testEpubWriter(book)
    }
  }

  private testEpubWriter1() {
    let book = new Book();
    // Set the title
    book.getMetadata().addTitle("Epublib test book 1");
    // Add an Author
    book.getMetadata().addAuthor(new Author("Joe", "Tester"));
    let res = new EpubResource("heft", new MediaType("name", "extend"))
    book.addResource(res)
    book.setMetadata(new Metadata())
    // Create EpubWriter
    let epubWriter = new EpubWriter();

    // Write the Book as Epub
    epubWriter.write(book, "test1_book1.epub");

  }

  private testEpubWriter(book: Book) {
    let epubWriter = new EpubWriter();
    // Write the Book as Epub
    epubWriter.write(book, "test1_book1.epub");

  }

  private testFileIO2() {
    console.log('test start')
    console.info("------------getFilesDir dir: " + this.filePath);
    //      此处返回为："/data/storage/el2/base/haps/entry/files"
    //      真实路径为（带包名）："/data/app/el2/100/base/com.example.epublib.hmservice/haps/entry/files"
    //      push时需要使用真实路径（带包名）
    //      注意：push后文件owner属性为root，需修改为与files相同的owner
    let fullPath = this.filePath + "/test/chapter_446465249.xhtml";
    let fileFD = fs.openSync(fullPath, 0o2);
    console.info("------openSync fileFD:" + fileFD);
    let buf = new ArrayBuffer(4096);
    let num = fs.readSync(fileFD.fd, buf);
    let fileRet = this.a2s(buf);
    let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
    let strData = textDecoder.decodeWithStream(new Uint8Array(buf));
    let testStr = fs.readTextSync(fullPath, { encoding: 'utf-8' })
    console.info("----------readSync num:" + num + ", testStr:" + testStr)
    console.info("----------readSync num:" + num + ", testStr:" + strData)
  }

  private a2s(buf: ArrayBuffer): string {
    let intArray: Int32Array = new Int32Array(buf)
    let numberArray: number[] = Array.from(intArray)
    return String.fromCharCode(...numberArray);
  }

  private readerFile(dirPath: string, nameFile: string): string {
    let fullpath = dirPath + "/" + nameFile;
    console.debug("---------fullpath----" + fullpath);
    let stat = fs.statSync(fullpath);
    let strData = fs.readTextSync(fullpath, { encoding: 'utf-8' });
    return strData;
  }

  copyStr(src: string) {
    let str = ""
    for (let i = 0; i < src.length; i++) {
      str += src[i]
    }
    return str
  }
}