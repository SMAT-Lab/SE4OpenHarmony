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
import fs from '@ohos.file.fs';
import systemDateTime from '@ohos.systemDateTime';
import { BusinessError } from '@ohos.base';
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
import { TipsDialog } from '../../common/TipsDialog';
  import worker, { MessageEvents } from '@ohos.worker';
import prompt from '@system.prompt';

const TAG = 'fileRW'


enum fileOperateType {
  WRITE = 0,
  READ = 1
}

@Entry
@Component
export struct fileRW {
  @State message: string = '';
  @StorageLink('btnEnabled')@Watch("btnEnabledOnchange") myBtnEnabled: boolean = true;
  private  myWriteTimeSpeed: number = 0;
  private myReadTimeSpeed: number = 0;
  btnEnabledOnchange() {
    Logger.info(TAG,"btnEnabledOnchange:"+this.myBtnEnabled);
    if(this.myBtnEnabled){
      Logger.info(TAG,"myWriteTimeSpeed:"+this.myWriteTimeSpeed+"myReadTimeSpeed:"+this.myReadTimeSpeed);
      if(this.myWriteTimeSpeed && this.myReadTimeSpeed){
        this.message = "写入速度："+this.myWriteTimeSpeed+" M/s\n\n"+"读取速度："+this.myReadTimeSpeed+" M/s\n";
      }
    }
    else{
      this.message = "正在读写测试中....";
    }
  }
  getSpeed(mSTime: number): number {
    let ret: number = 0;
    let sTime: number = mSTime / 1000;
    Logger.info(TAG, `getSpeed sTime: ${sTime}`);
    ret = 2048 / sTime;
    return Math.round(ret);
  }

  createFileWork() {

    let writeAndReadWorkerInstance = new worker.ThreadWorker('@bundle:com.yarward.factorytest/entry/ets/pages/workers/fileWorker');
    // 主线程向worker线程传递信息
    let myFilePath:string = globalThis.pathDir + "/test.txt";
    writeAndReadWorkerInstance.postMessage(myFilePath);
    // 在调用terminate后，执行onexit
    writeAndReadWorkerInstance.onexit = function() {
      Logger.info(TAG,"writeAndReadWorkerInstance main thread terminate");
    }
    // 写入数据接收信息回调监听
    writeAndReadWorkerInstance.addEventListener("message", (event: MessageEvents)=>{
       Logger.info(TAG,"writeAndReadWorkerInstance onmessage listener callback");
      if(event.data < 0){
        Logger.info(TAG,"file Operate fail");
        return;
      }
      Logger.info(TAG,"writeAndReadWorkerInstance onmessage listener event.data:"+event.data);
      // 获取写入速度
      let writeTimeSpeed = event.data[0];
      let readTimeSpeed= event.data[1];

      this.myWriteTimeSpeed = writeTimeSpeed;
      this.myReadTimeSpeed = readTimeSpeed;

      try{
        Logger.info(TAG,"writeAndReadWorkerInstance onmessage listener this.writeTimeSpeed:"+writeTimeSpeed+"this.readTimeSpeed:"+writeTimeSpeed);
        AppStorage.set("writeTimeSpeed",writeTimeSpeed);
        AppStorage.set("readTimeSpeed",readTimeSpeed);
        AppStorage.set("btnEnabled",true);
      }
      catch(err){
        Logger.error(TAG,"AppStorage.setOrCreate fail.err:"+err);
      }

      writeAndReadWorkerInstance.terminate();

    })

  }

  onPageShow() {
    let writeTimeSpeed = AppStorage.get("writeTimeSpeed") as number;
    let readTimeSpeed = AppStorage.get("readTimeSpeed") as number;
    let myBtnEnabled = < boolean > AppStorage.get("btnEnabled");
    Logger.info(TAG,"aboutToAppear writeTimeSpeed: "+writeTimeSpeed+"readTimeSpeed:"+readTimeSpeed +"myBtnEnabled" +myBtnEnabled);

    if(writeTimeSpeed){
      this.myWriteTimeSpeed = writeTimeSpeed;
    }
    if(readTimeSpeed){
      this.myReadTimeSpeed = readTimeSpeed;
    }
    Logger.info(TAG,"aboutToAppear myWriteTimeSecond: "+this.myWriteTimeSpeed+"myReadTimeSecond:"+this.myReadTimeSpeed);

    this.myBtnEnabled = myBtnEnabled;
    if(myBtnEnabled === false){
      this.message =  "正在读写测试中....";
    }
    else {
      this.btnEnabledOnchange();
    }

  }

  build() {
    Column() {
      TitleBar({ title: '存储设备读写测试' })
      Scroll() {
        Column() {
          Button("读写300M文件开始测试")
            .onClick( () => {
              Logger.info(TAG,"onClick");

              if(this.myBtnEnabled === false) {
                prompt.showToast({
                  message: '正在读写测试，请勿重复点击！',
                  duration: 2000,
                });
              }
              else {
                try{
                  AppStorage.setOrCreate("btnEnabled",false);
                }catch(err){
                  Logger.error(TAG,"AppStorage.setOrCreate fail.err:"+err);
                }
                this.myWriteTimeSpeed = 0;
                this.myReadTimeSpeed = 0;
                this.createFileWork();
              }

            })
            Text(this.message)
              .margin({ top: 100 })

        }
        .width('100%')
        .constraintSize({ minHeight: '100%' })
      }
    }
  }
}
