/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { SMB2} from '@ohos/smbj'
import prompt from '@ohos.promptAction';

@Entry
@Component
struct Index {
  @State message: string = 'test'
  @State serverIP: string = ''
  @State clientIP: string = ''
  @State basePath :string = 'test_smbj'
  @State userName: string = 'test'
  @State password: string = 'test123'
  @State foldName: string = ''
  @State newFileName: string = ''
  @State content: string = ''
  @State fileName: string = ''
  @State log: string = 'log'
  @State readResult:string = ''
  @State handlePopup: boolean = false

  build() {
    Column() {
      TextInput({ placeholder: '服务器ip', text: this.serverIP })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 20 })
        .onChange((value: string) => {
          this.serverIP = value
        })
      TextInput({ placeholder: '客户端ip', text: this.clientIP })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 20 })
        .onChange((value: string) => {
          this.clientIP = value
        })
      TextInput({ placeholder: 'share', text: this.basePath })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 20 })
        .onChange((value: string) => {
          this.basePath = value
        })
      TextInput({ placeholder: 'UserName', text: this.userName })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.userName = value
        })

      TextInput({ placeholder: 'password', text: this.password })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.password = value
        })

      TextInput({ placeholder: '文件夹名称', text: this.foldName })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.foldName = value
        })
      TextInput({ placeholder: '文件名', text: this.fileName })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.fileName = value

        })
      TextInput({ placeholder: '新文件名称', text: this.newFileName })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.newFileName = value
        })

      TextInput({ placeholder: '文件内容', text: this.content })
        .placeholderColor(Color.Gray)
        .caretColor(Color.Blue)
        .height(50)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Black)
        .margin({ top: 10 })
        .onChange((value: string) => {
          this.content = value
        })
      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceAround }) {
        Button('exit', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(90).onClick(() => {
          let smbClient=this.getClient();
          let check = this.fileName == ''?this.foldName:this.fileName
          if(!!smbClient) {
            try {
              smbClient.exists(check,  (err:ESObject, exit:boolean) =>{
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})
                  smbClient!.close()
                }else{
                  prompt.showToast({message:"文件夹或文件是否存在:"+exit,duration:5000})
                  console.log("smb exit:" + exit);
                }
              })
            } catch (err) {
              console.info("smb exits error")
            }

          }
        })

        Button('mkdir', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(90).onClick(() => {
          let smbClient=this.getClient();
          if(!!smbClient){
            try {
              smbClient.mkdir(this.foldName,  (err:ESObject) =>{
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})

                }else{
                  prompt.showToast({message:"make dir success",duration:5000})
                }

              })
            } catch (err) {
              console.info("smb mkdir error")
            }
          }
        })
        Button('readdir', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(90).onClick(() => {
          let smbClient=this.getClient();
          try{
            if(!!smbClient) {
              smbClient.readdir(this.foldName,  (err:ESObject,fileNames:ESObject)=> {
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})
                }else{
                  prompt.showToast({message:JSON.stringify(fileNames),duration:5000})
                }
              })
            }
          }catch (e){
            console.log('smb readdir erro:')
          }
        })
        Button('readFile', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(120).onClick(() => {
          let smbClient=this.getClient();
          if(!!smbClient){
            try{
              smbClient.readFile(this.fileName , null, (err:ESObject,result:ESObject) => {
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})
                }else{
                  prompt.showToast({message:JSON.stringify(result),duration:5000})
                }
              })
            }catch (e){
              console.log('smb readFile erro:')
            }
          }
        })
      }.margin({ top: 10 }).height(80)
      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceAround }) {
        Button('rename', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(90).onClick(() => {
          let smbClient=this.getClient();
          if(!!smbClient){
            try {
              smbClient.rename(this.fileName,this.newFileName,  (err:ESObject)=> {
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})

                }else{
                  prompt.showToast({message:"rename success",duration:5000})
                }

              })
            } catch (err) {
              console.info("smb rename error")
            }
          }
        })

        Button('writeFile', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(120).onClick(() => {
          let smbClient=this.getClient();
          if(!!smbClient){
            try{
              smbClient.writeFile(this.fileName,this.content,'UTF-8',  (err:ESObject)=> {
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})
                }else{
                  prompt.showToast({message:"writeFile success",duration:5000})
                }
              })
            }catch (e){
              console.log('smb writeFile erro:' )
            }
          }
        })
        Button('rmfile', {
          type: ButtonType.Capsule,
          stateEffect: true
        }).backgroundColor(0x317aff).width(90).onClick(() => {
          let smbClient=this.getClient();
          if(!!smbClient){
            try {
              smbClient.unlink(this.fileName,(err:ESObject,result:ESObject) =>{
                if (err) {
                  console.log('smb erro:' + err.message)
                  prompt.showToast({message:err.message,duration:5000})
                }else{
                  prompt.showToast({message:"rmfile success",duration:5000})
                }

              })
            }catch (e){
              console.log('smb unlink erro:' )
            }
          }
        })

      }.margin({ top: 10 }).height(80)
    }
    .height('100%')
  }

  public getClient(){
    if(!this.serverIP){
      prompt.showToast({message:'请输入服务器ip',duration:2000})
      return
    }
    if(!this.clientIP){
      prompt.showToast({message:'请输入客户端ip',duration:2000})
      return
    }
    if(!this.basePath){
      prompt.showToast({message:'请输入share',duration:2000})
      return
    }
    if(!this.userName){
      prompt.showToast({message:'请输入用户名',duration:2000})
      return
    }
    if(!this.password){
      prompt.showToast({message:'请输入密码',duration:2000})
      return
    }
    let option:Options = new Options('\\\\'+this.serverIP+'\\'+this.basePath,'DOMAIN',this.userName,this.password,this.clientIP)
    return new SMB2(option);
  }
}

class Options{
  share: string;
  domain:string;
  username: string;
  password: string;
  clientIP:string;

  constructor(share:string,domain:string,username:string,password:string,clientIP:string) {
    this.share = share;
    this.domain = domain;
    this.username = username;
    this.password = password;
    this.clientIP = clientIP;
  }
}
