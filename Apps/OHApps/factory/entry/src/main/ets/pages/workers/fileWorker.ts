/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// worker.ts
import worker from '@ohos.worker';
import systemDateTime from '@ohos.systemDateTime';
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';
const TAG =  'fileWorker '

// 创建worker线程中与主线程通信的对象
const workerPort = worker.workerPort
enum fileOperateType {
  WRITE = 0,
  READ = 1
}

async function fileRead(filePath) {
  console.info(TAG,"fileRead start");

  fs.open(filePath, fs.OpenMode.READ_ONLY).then(async (file: fs.File)=> {
    let readBuf = new ArrayBuffer(67108864);
    console.info(TAG, "fileRead filePath:" + filePath);
    let readFirstTime = await  systemDateTime.getRealActiveTime(false);
    console.info(TAG, "fileRead readFirstTime:" + readFirstTime);
    let len = 0;
    let retLen;
    for (let i = 0;i < 32; i++) {
      retLen = fs.readSync(file.fd, readBuf, { offset: len });
      len = len + retLen;
    }
    let readLastTime = await systemDateTime.getRealActiveTime(false);
    fs.closeSync(file);

    console.info(TAG, "fileRead readLastTime:" + readLastTime);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.info(TAG,"remove file failed with error message: " + err.message + ", error code: " + err.code);
      } else {
        console.info(TAG,"remove file succeed");
      }
    });
    let readTimeSecond =  readLastTime- readFirstTime;
    // worker线程向主线程发送信息
    workerPort.postMessage(readTimeSecond);

  }).catch((err: BusinessError) => {
    console.error(TAG,"open file failed with error message: " + err.message + ", error code: " + err.code);
    // worker线程向主线程发送信息
    workerPort.postMessage(-1)
  })
  console.info(TAG,"fileRead end");

}
// worker线程接收主线程信息
async function fileWrite(filePath: string) {

  console.info(TAG,"fileWrite start filePath:"+filePath);
  fs.open(filePath, fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE).then(async (file: fs.File) => {
    console.log(TAG,"file fd: " + file.fd);
    let writeBuf = new ArrayBuffer(67108864);
    let len = 0;
    let writeFirstTime = await systemDateTime.getRealActiveTime(false);
    //41920
    for ( let i = 0;i < 32; i++) {
      let retLen = fs.writeSync(file.fd, writeBuf, { offset: len });
      len = len + retLen;
    }
    let writeLastTime = await systemDateTime.getRealActiveTime(false);
    fs.closeSync(file);
    let writeTimeSecond = writeLastTime - writeFirstTime;
    // worker线程向主线程发送信息
    workerPort.postMessage(writeTimeSecond)
  }).catch((err: BusinessError) => {
    console.error(TAG,"open file failed with error message: " + err.message + ", error code: " + err.code);
    // worker线程向主线程发送信息
    workerPort.postMessage(-1)
  }).catch((err: BusinessError) => {
    workerPort.postMessage(-1)
    console.info(TAG,"remove file failed with error message: " + err.message + ", error code: " + err.code);
  });
  console.info(TAG,"fileWrite end");
}

async function fileWriteAndRead(filePath: string) {

    console.info(TAG, "fileWriteAndRead start filePath:" + filePath);
    fs.open(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE).then(async (file: fs.File) => {
      console.log(TAG, "file fd: " + file.fd);
      let length = 12582912;
      let writeBuf = new ArrayBuffer(length);
      let readBuf = new ArrayBuffer(length);

      let retLen;
      let len = 0;

      let writeFirstTime = await systemDateTime.getRealActiveTime(false);

      for (let i = 0;i < 25; i++) {

        retLen = fs.writeSync(file.fd, writeBuf, { offset: len });
        len = retLen + len;
      }
      let writeLastTime = await systemDateTime.getRealActiveTime(false);

      let readFirstTime = await  systemDateTime.getRealActiveTime(false);
      len = 0;
      for (let i = 0;i < 25; i++) {

        retLen = fs.readSync(file.fd, readBuf, { offset: len });
        len = retLen + len;
      }
      let readLastTime = await systemDateTime.getRealActiveTime(false);
      fs.closeSync(file);
      fs.unlinkSync(filePath);
      // 获取读写时间间隔
      let myReadTimeSecond = readLastTime - readFirstTime;

      let myWriteTimeSecond = writeLastTime - writeFirstTime;
      console.log(TAG, "file myWriteTimeSecond: " + myWriteTimeSecond+"file myReadTimeSecond: " + myReadTimeSecond);


      // worker线程向主线程发送信息
      myWriteTimeSecond = myWriteTimeSecond / 1000;
      myReadTimeSecond = myReadTimeSecond / 1000;
      let myWriteTimeSpeed = Math.floor(300 / myWriteTimeSecond) ;
      let myReadTimeSpeed = Math.floor(300 / myReadTimeSecond) ;

      var buffer = new ArrayBuffer(2);
      buffer[0] = myWriteTimeSpeed;
      buffer[1] = myReadTimeSpeed;
      console.log(TAG, "file buffer: " + buffer);
      workerPort.postMessage(buffer,[buffer]);
    }).catch((err: BusinessError) => {
      console.error(TAG, "open file failed with error message: " + err.message + ", error code: " + err.code);
      // worker线程向主线程发送信息
      workerPort.postMessage(-1)
    }).catch((err: BusinessError) => {
      workerPort.postMessage(-1)
      console.info(TAG, "remove file failed with error message: " + err.message + ", error code: " + err.code);
    });
    console.info(TAG, "fileWriteAndRead end");

}

workerPort.onmessage = async function(e) {



  // data：主线程发送的信息
  let workFilePath = e.data;
  console.info(TAG, `workFilePath: + ${workFilePath}` );
  fileWriteAndRead(workFilePath);

}

// worker线程发生error的回调
workerPort.onerror= function(e) {
  console.log(TAG, "worker.ts onerror");
}