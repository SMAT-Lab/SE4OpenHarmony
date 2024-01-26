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

import { commonButton } from './commonButton';
//import headsetRecordingTest from '@ohos.headsetRecordingTest'
import media from '@ohos.multimedia.media';

let avRecorder = undefined;

@Component
export struct headsetRecordingButton {
  @State backColor: Color = Color.Red;
  @State btnName: string = "耳机录音";
  private intervalID;
  private avRecorder;
  private avProfile = {
    audioBitrate: 100000, // 音频比特率
    audioChannels: 2, // 音频声道数
    audioCodec: media.CodecMimeType.AUDIO_AAC, // 音频编码格式，当前只支持aac
    audioSampleRate: 48000, // 音频采样率
    fileFormat: media.ContainerFormatType.CFT_MPEG_4A, // 封装格式，当前只支持m4a
  };
  private avConfig = {
    audioSourceType: media.AudioSourceType.AUDIO_SOURCE_TYPE_MIC, // 音频输入源，这里设置为麦克风
    profile: this.avProfile,
    url: 'fd://35', // 参考应用文件访问与管理开发示例新建并读写一个文件
  };

  // 注册audioRecorder回调函数
  setAudioRecorderCallback() {
    // 状态机变化回调函数
    this.avRecorder.on('stateChange', (state, reason) => {
      console.log(`AudioRecorder current state is ${state}`);
    })
    // 错误上报回调函数
    this.avRecorder.on('error', (err) => {
      console.error(`AudioRecorder failed, code is ${err.code}, message is ${err.message}`);
    })
  }

  // 开始录制对应的流程
  async startRecordingProcess() {
    // 1.创建录制实例
    this.avRecorder = await media.createAVRecorder();
    this.setAudioRecorderCallback();
    // 2.获取录制文件fd赋予avConfig里的url；参考FilePicker文档
    // 3.配置录制参数完成准备工作
    await this.avRecorder.prepare(this.avConfig);
    // 4.开始录制
    await this.avRecorder.start();
  }

  // 暂停录制对应的流程
  async pauseRecordingProcess() {
    if (this.avRecorder.state === 'started') { // 仅在started状态下调用pause为合理状态切换
      await this.avRecorder.pause();
    }
  }

  // 恢复录制对应的流程
  async resumeRecordingProcess() {
    if (this.avRecorder.state === 'paused') { // 仅在paused状态下调用resume为合理状态切换
      await this.avRecorder.resume();
    }
  }

  // 停止录制对应的流程
  async stopRecordingProcess() {
    // 1. 停止录制
    if (this.avRecorder.state === 'started'
    || this.avRecorder.state === 'paused') { // 仅在started或者paused状态下调用stop为合理状态切换
      await this.avRecorder.stop();
    }
    // 2.重置
    await this.avRecorder.reset();
    // 3.释放录制实例
    await this.avRecorder.release();
    // 4.关闭录制文件fd
  }

  aboutToAppear() {

    // this.intervalID = setInterval(()=> {
    //   // headsetRecordingTest.headsetRecording_test().then((data) => {
    //   //   if (data == 0) {
    //   //     this.backColor = Color.Green
    //   //     clearInterval(this.intervalID);
    //   //   }
    //   // })
    //   // 检测耳机是否接入
    //   // 录音
    //   media.createAVRecorder().then((recorder) => {
    //     avRecorder = recorder;
    //   }, (err) => {
    //     console.error(`Invoke createAVRecorder failed, code is ${err.code}, message is ${err.message}`);
    //   })
    // }, 1000);
  }

  build() {
    commonButton({
      backColor: $backColor,
      btnName: $btnName,
    })
      .onClick(async () => {
        await this.startRecordingProcess(); // 开始录制
        // 用户此处可以自行设置录制时长，例如通过设置休眠阻止代码执行
        await this.pauseRecordingProcess(); //暂停录制
        await this.resumeRecordingProcess(); // 恢复录制
        await this.stopRecordingProcess(); // 停止录制
      })
  }
}