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
  Author,
  Book,
  EpubReader,
  EpubResource,
  EpubWriter,
  GlobalContext,
  MediaType,
  Metadata,
  ResourcesLoader
} from '@ohos/epublib';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import fs from '@ohos.file.fs';
import ResourceUtil from '@ohos/epublib/src/main/ets/components/util/ResourceUtil';

let filePath: string = ''
export default function abilityTest() {
  describe('ActsAbilityTest',  ()=> {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(async () => {
      filePath = GlobalContext.getContext().getValue('filePath') as string
      let buffer: ArrayBufferLike = GlobalContext.getContext().getValue('buffer') as ArrayBufferLike
      filePath = filePath + '/abc.epub'
      let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
      fs.writeSync(file.fd, buffer)
      fs.closeSync(file);
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(()=> {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(()=> {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    it('readEpubFile', 0,async ()=> {
      let readEpubFile = EpubReader.readEpubFile(filePath)
      expect(readEpubFile.getResources().isEmpty()).assertTrue()
    })

    it('readEpubFile_err_path', 0, async ()=> {
      let readEpubFile = EpubReader.readEpubFile('/data/storage/el2/base/haps/entry_test/files/abc/')
      expect(readEpubFile).assertUndefined()
    })

    it('readEpubFile_null', 0, async ()=> {
      let readEpubFile = EpubReader.readEpubFile(null)
      expect(readEpubFile).assertUndefined()
    })

    it('readEpubFile_empty', 0, async ()=> {
      let readEpubFile = EpubReader.readEpubFile('')
      expect(readEpubFile).assertUndefined()
    })

    it('loadResourcesZip', 0, async ()=> {
      let zip = await ResourcesLoader.loadResourcesZip(filePath)
      expect(zip).assertEqual('/data/storage/el2/base/haps/entry_test/files/abc')
    })

    it('loadResourcesZip_err_path', 0, async ()=> {
      let zip = await ResourcesLoader.loadResourcesZip(filePath + 'test')
      expect(zip).assertNull()
    })

    it('loadResourcesZip_null', 0, async ()=> {
      try {
        await ResourcesLoader.loadResourcesZip(null)
      } catch (e) {
        expect(e.message).assertEqual('Cannot read property toLowerCase of null')
      }
    })

    it('loadResourcesZip_empty', 0, async ()=> {
      let zip = await ResourcesLoader.loadResourcesZip('')
      expect(zip).assertNull()
    })

    it('outFile', 0, ()=> {
      let outfile = EpubReader.outFile(filePath)
      expect(outfile).assertEqual('/data/storage/el2/base/haps/entry_test/files/abc')
    })

    it('outFile_null', 0, ()=> {
      try {
        EpubReader.outFile(null)
      } catch (e) {
        expect(e.message).assertEqual('Cannot read property substring of null')
      }
    })

    it('outFile_undefined', 0, ()=> {
      try {
        EpubReader.outFile(undefined)
      } catch (e) {
        expect(e.message).assertEqual('Cannot read property substring of undefined')
      }
    })

    it('outFile_empty', 0, ()=> {
      let outfile = EpubReader.outFile('')
      expect(outfile).assertEqual('')
    })

    it('createResource', 0, ()=> {
      let buf = new ArrayBuffer(10);
      let resource: EpubResource = ResourceUtil.createResource("content.opf", new Uint8Array(buf));
      expect(resource.getHref()).assertEqual('content.opf')
    })

    it('createResource_null', 0, ()=> {
      let buf = new ArrayBuffer(10);
      let resource: EpubResource = ResourceUtil.createResource(null, new Uint8Array(buf));
      expect(resource.getHref()).assertNull()
    })

    it('createResource_undefined', 0, ()=> {
      let buf = new ArrayBuffer(10);
      let resource: EpubResource = ResourceUtil.createResource(undefined, new Uint8Array(buf));
      expect(resource.getHref()).assertUndefined()
    })

    it('createResource_undefined_empty', 0, ()=> {
      let buf = new ArrayBuffer(10);
      let resource: EpubResource = ResourceUtil.createResource('', new Uint8Array(buf));
      expect(resource.getHref()).assertEqual('')
    })

    it('createStrResource', 0, ()=> {
      let strResource: EpubResource = ResourceUtil.createStrResource("content.opf", "data");
      expect(strResource.getHref()).assertEqual('content.opf')
    })

    it('createStrResource_null', 0, ()=> {
      let strResource: EpubResource = ResourceUtil.createStrResource(null, "data");
      expect(strResource.getHref()).assertNull()
    })

    it('createStrResource_undefined', 0, ()=> {
      let strResource: EpubResource = ResourceUtil.createStrResource(undefined, "data");
      expect(strResource.getHref()).assertUndefined()
    })

    it('createStrResource_empty', 0, ()=> {
      let strResource: EpubResource = ResourceUtil.createStrResource("", "");
      expect(strResource.getHref()).assertEqual('')
    })

    it('decode', 0, ()=> {
      let decode = ResourceUtil.decode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))
      expect(decode).assertEqual("\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t")
    })

    it('decode_complexity', 0, ()=> {
      let decode = ResourceUtil.decode(new Uint8Array([19, 28, 37, 46, 55, 64, 73, 82, 91]))
      expect(decode).assertEqual("\u0013\u001c%.7@IR[")
    })

    it('decode_null', 0, ()=> {
      try {
        ResourceUtil.decode(null)
      } catch (e) {
        expect(e.message).assertEqual('The type of Parameter must be Uint8Array.')
      }
    })

    it('decode_undefined', 0, ()=> {
      try {
        ResourceUtil.decode(undefined)
      } catch (e) {
        expect(e.message).assertEqual('The type of Parameter must be Uint8Array.')
      }
    })

    it('readEpubLazy', 0, ()=> {
      let book = EpubReader.readEpubLazy(filePath)
      expect(book.getResources().isEmpty()).assertTrue()
    })

    it('readEpubLazy_null', 0, ()=> {
      let book = EpubReader.readEpubLazy(null)
      expect(book.getResources().isEmpty()).assertTrue()
    })

    it('readEpubLazy_undefined', 0, ()=> {
      let book = EpubReader.readEpubLazy(undefined)
      expect(book.getResources().isEmpty()).assertTrue()
    })

    it('readEpubLazy_empty', 0, ()=> {
      let book = EpubReader.readEpubLazy('')
      expect(book.getResources().isEmpty()).assertTrue()
    })

    it('loadResources', 0, ()=> {
      let resources = ResourcesLoader.loadResources(filePath, 'UTF-8')
      expect(resources.isEmpty()).assertTrue()
    })

    it('loadResources_null', 0, ()=> {
      let resources = ResourcesLoader.loadResources(null, 'UTF-8')
      expect(resources.isEmpty()).assertTrue()
    })

    it('loadResources_undefined', 0, ()=> {
      let resources = ResourcesLoader.loadResources(undefined, 'UTF-8')
      expect(resources.isEmpty()).assertTrue()
    })

    it('loadResources_empty', 0, ()=> {
      let resources = ResourcesLoader.loadResources('', 'UTF-8')
      expect(resources.isEmpty()).assertTrue()
    })

    it('readEpubToBook', 0, ()=> {
      let resources = ResourcesLoader.loadResources(filePath, 'UTF-8')
      let book = EpubReader.readEpubToBook(resources)
      expect(book.getMetadata().getAuthors().length).assertEqual(0)
    })

    it('readEpubToBook_null', 0, ()=> {
      let resources = ResourcesLoader.loadResources(null, 'UTF-8')
      let book = EpubReader.readEpubToBook(resources)
      expect(book.getMetadata().getAuthors().length).assertEqual(0)
    })

    it('readEpubToBook_undefined', 0, ()=> {
      let resources = ResourcesLoader.loadResources(undefined, 'UTF-8')
      let book = EpubReader.readEpubToBook(resources)
      expect(book.getMetadata().getAuthors().length).assertEqual(0)
    })

    it('readEpubToBook_empty', 0, ()=> {
      let resources = ResourcesLoader.loadResources('', 'UTF-8')
      let book = EpubReader.readEpubToBook(resources)
      expect(book.getMetadata().getAuthors().length).assertEqual(0)
    })

    let book = new Book();
    // Set the title
    book.getMetadata().addTitle("Epublib test book 1");
    // Add an Author
    book.getMetadata().addAuthor(new Author("Joe", "Tester"));
    let res = new EpubResource("heft", new MediaType("name", "extend"))
    book.addResource(res)
    book.setMetadata(new Metadata())
    let resources = ResourcesLoader.loadResources('/data/storage/el2/base/haps/entry_test/files/test1_book1', 'UTF-8')

    it('EpubWriter', 0, ()=> {
      let epubWriter = new EpubWriter();
      // Write the Book as Epub
      epubWriter.write(book, "test1_book1.epub");
      let bookReader = EpubReader.readEpubToBook(resources)
      expect(bookReader != null).assertTrue()
    })

    it('EpubWriter_null', 0, ()=> {
      let epubWriter = new EpubWriter();
      // Write the Book as Epub
      epubWriter.write(null, "test1_book1.epub");
      let bookReader = EpubReader.readEpubToBook(resources)
      expect(bookReader != null).assertTrue()
    })

    it('EpubWriter_undefined', 0, ()=> {
      let epubWriter = new EpubWriter();
      // Write the Book as Epub
      epubWriter.write(undefined, "test1_book1.epub");
      let bookReader = EpubReader.readEpubToBook(resources)
      expect(bookReader != null).assertTrue()
    })

    it('EpubWriter_err', 0, ()=> {
      let epubWriter = new EpubWriter();
      // Write the Book as Epub
      epubWriter.write(book, "");
      let bookReader = EpubReader.readEpubToBook(resources)
      expect(bookReader != null).assertTrue()
    })
  })
}