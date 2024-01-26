/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 用于测试接口时长
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import {
  CacheListener,
  DiskUsage,
  FileNameGenerator,
  HeaderInjector,
  HttpProxyCacheServer,
  HttpProxyCacheServerBuilder,
  StorageUtils
} from '@ohos/video-cache';
import GlobalProxyServer from '../../../main/ets/GlobalProxyServer';
import fs from '@ohos.file.fs';
import HashMap from '@ohos.util.HashMap';

const BASE_COUNT = 10
let testUrl: string = 'https://www.w3school.com.cn/i/movie.mp4';
let server: HttpProxyCacheServer;
let startTime: number = 0;
let endTime: number = 0;
let cacheFolder: string;
let context: Context;

function getExtension(url: string): string {
  let dotIndex = url.lastIndexOf('.');
  let slashIndex = url.lastIndexOf('/');
  return dotIndex != -1 && dotIndex > slashIndex && dotIndex + 2 + 4 > url.length ?
  url.substring(dotIndex + 1, url.length) : "";
}

async function getProxyUrlTest(index: number, callback: (expectUrl: string, proxyUrl: string) => void, done: Function) {
  if (index == 0) {
    startTime = new Date().getTime();
  }
  if (index < BASE_COUNT) {
    let expectUrl = `http://127.0.0.1:${server.getProxyPort()}/${testUrl}`
    let proxyUrl = await server.getProxyUrl(testUrl);
    callback(expectUrl, proxyUrl)
    getProxyUrlTest(index + 1, callback, done)
  } else {
    endTime = new Date().getTime();
    let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
    console.log("OhosVideoCacheTest getProxyUrl :  averageTime1 : " + averageTime1 + "us")
    done()
  }
}

async function registerCacheListenerTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      class TestListener implements CacheListener {
        onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
        }
      }

      let listener: TestListener = new TestListener();
      if (index == 0) {
        startTime = new Date().getTime();
      }
      server.registerCacheListener(listener, testUrl);
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest registerCacheListener :  averageTime1 : " + averageTime1 + "us")
        done()
      } else {
        registerCacheListenerTest(index + 1, callback, done)
      }

    } catch (err) {
      done()
    }
  }
}

async function cacheDirectoryTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }
      let directory = context?.cacheDir + "/hahaha"
      let builder: HttpProxyCacheServerBuilder = new HttpProxyCacheServerBuilder(context)
        .cacheDirectory(directory ? directory : '')
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest cacheDirectory :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        cacheDirectoryTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function setFileNameGeneratorTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }

      class MyFileNameGenerator implements FileNameGenerator {
        generate(url: string): string {
          return '123456.mp4'
        }
      }

      let builder = new HttpProxyCacheServerBuilder(context)
        .setFileNameGenerator(new MyFileNameGenerator())
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest setFileNameGenerator :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        setFileNameGeneratorTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function maxCacheSizeTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }
      let builder = new HttpProxyCacheServerBuilder(context)
        .maxCacheSize(50 * 1024 * 1024)
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest maxCacheSize :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        maxCacheSizeTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function maxCacheFilesCountTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }
      let builder = new HttpProxyCacheServerBuilder(context)
        .maxCacheFilesCount(10)
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest maxCacheFilesCount :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        maxCacheFilesCountTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function setDiskUsageTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }

      class MyDiskUsage implements DiskUsage {
        touch(filePath: string) {
        }
      }

      let builder = new HttpProxyCacheServerBuilder(context)
        .setDiskUsage(new MyDiskUsage())
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest setDiskUsage :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        setDiskUsageTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function setHeaderInjectorTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }

      class MyHeaderInjector implements HeaderInjector {
        addHeaders(url: string): HashMap<string, string> {
          let header = new HashMap<string, string>()
          header.set("name", "abc")
          header.set("sex", "男")
          return header;
        }
      }

      let builder = new HttpProxyCacheServerBuilder(context)
        .setHeaderInjector(new MyHeaderInjector())
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest setHeaderInjector :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        setHeaderInjectorTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function buildTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }
      server = new HttpProxyCacheServerBuilder(context)
        .build()
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest build :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        buildTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function unregisterCacheListenerTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }

      class UnRegisterListener implements CacheListener {
        onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
        }
      }

      let listener: UnRegisterListener = new UnRegisterListener();
      server.registerCacheListener(listener, testUrl);
      server.unregisterCacheListener(listener, testUrl);
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest unregisterCacheListener :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        unregisterCacheListenerTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

async function shutdownTest(index: number, callback: () => void, done: Function) {
  if (index <= BASE_COUNT) {
    try {
      if (index == 0) {
        startTime = new Date().getTime();
      }
      server = new HttpProxyCacheServerBuilder(context).build()
      server?.shutdown();
      if (index == BASE_COUNT) {
        endTime = new Date().getTime();
        let averageTime1 = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.log("OhosVideoCacheTest shutdown :  averageTime1 : " + averageTime1 + "us")
        done()
      }else {
        shutdownTest(index + 1, callback, done)
      }
    } catch (err) {
      done()
    }
  }
}

export default function VideoCacheInterfaceTime() {
  describe('VideoCacheInterfaceTime', () => {
    beforeAll(() => {
      try {
        context = GlobalProxyServer.getInstance().getContext()
        cacheFolder = StorageUtils.getIndividualCacheDirectory(context)
        if (fs.accessSync(cacheFolder)) {
          fs.rmdirSync(cacheFolder);
        }
        fs.mkdirSync(cacheFolder);
      } catch (err) {
      }
      try {
        server = new HttpProxyCacheServerBuilder(context).build();
      } catch (err) {
      }

    })
    beforeEach(() => {
      try {
        let files = fs.listFileSync(cacheFolder)
        for (let i = 0; i < files.length; i++) {
          let allPath = cacheFolder + '/' + files[i];
          if (fs.statSync(allPath).isDirectory()) {
            fs.rmdirSync(allPath);
          } else {
            fs.unlinkSync(allPath);
          }
        }
      } catch (err) {
      }
    })
    afterEach(() => {
    })
    afterAll(() => {
    })

    it('getProxyUrl', 0, async (done: Function) => {
      getProxyUrlTest(0, (expectUrl: string, proxyUrl: string) => {
        expect(expectUrl).assertEqual(proxyUrl)
      }, done)

    })
    it('registerCacheListener', 0, async (done: Function) => {
      registerCacheListenerTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('cacheDirectory', 0, async (done: Function) => {
      cacheDirectoryTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('setFileNameGenerator', 0, async (done: Function) => {
      setFileNameGeneratorTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('maxCacheSize', 0, async (done: Function) => {
      maxCacheSizeTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('maxCacheFilesCount', 0, async (done: Function) => {
      maxCacheFilesCountTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('setDiskUsage', 0, async (done: Function) => {
      setDiskUsageTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('setHeaderInjector', 0, async (done: Function) => {
      setHeaderInjectorTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('build', 0, async (done: Function) => {
      buildTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('unregisterCacheListener', 0, async (done: Function) => {
      unregisterCacheListenerTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
    it('shutdown', 0, async (done: Function) => {
      shutdownTest(0, () => {
        expect(1).assertEqual(1);
      }, done)
    })
  })
}