/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import zlib from '@ohos.zlib'
import fileio from '@ohos.fileio'
import prompt from '@ohos.promptAction'
import Logger from '../model/Logger'
import data_preferences from '@ohos.data.preferences'
import { AddDialog } from '../common/AddDialog'
import { ZipLibSource } from '../model/DataSource'
import common from '@ohos.app.ability.common'

const TAG: string = '[Index]'
let fileList: data_preferences.Preferences | null = null;

@Entry
@Component
struct Index {
  @State isInserted: boolean = false
  @State files: ZipLibSource = new ZipLibSource([])
  @State fileName: string = ''
  @State fileContent: string = ''
  private path: string = ''
  private title: Resource = $r('app.string.MainAbility_label')
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: AddDialog({
      fileName: this.fileName,
      fileContent: this.fileContent,
      isInserted: this.isInserted,
      createFile: async (isInserted: boolean, fileName: string, fileContent: string) => {
        Logger.info(TAG, `enter the createFile`)
        this.fileName = `${fileName}.txt`
        let isDuplication = this.files.fileData.includes(this.fileName)
        Logger.info(TAG, `isInserted = ${isInserted}  isDuplication = ${isDuplication}`)
        if (!isInserted || isDuplication) {
          return
        }
        let fd = fileio.openSync(`${this.path}/${this.fileName}`, 0o100 | 0o2, 0o666)
        let number = fileio.writeSync(fd, fileContent)
        Logger.info(TAG, `fd = ${fd} number = ${number}`)
        this.files.pushData(this.fileName)
        Logger.info(TAG, `this.files = ${JSON.stringify(this.files.fileData)}`)
        if (fileList){
          await fileList.put('fileName', JSON.stringify(this.files.fileData))
          await fileList.flush()
        }
      }
    }),
    autoCancel: true,
    alignment: DialogAlignment.Default
  })

  async aboutToAppear() {
    fileList = await data_preferences.getPreferences(getContext(this), 'fileList')
    let ctx = getContext(this) as common.Context
    this.path = ctx.filesDir
    let value = await fileList.get('fileName', '')
    this.files.fileData = JSON.parse(`${value}`)
    this.files.notifyDataReload()
  }

  async zipHandler(path: string, fileName: string): Promise<void> {
    let zipFile = `${path}/${fileName}`
    Logger.debug(TAG, `zipFile = ${zipFile}`)
    let tempName = fileName.split('.')
    let newName = `${tempName[0]}.zip`
    let zipOutFile = `${this.path}/${newName}`
    Logger.debug(TAG, `zipOutFile = ${zipOutFile}`)

    let options: zlib.Options = {
      level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
      memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
      strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
    }
    if (this.files.fileData.includes(newName)) {
      prompt.showToast({
        message: $r('app.string.warning_failed')
      })
      return
    }
    try {
      zlib.zipFile(zipFile, zipOutFile, options).then(data => {
        Logger.info(TAG, `data = ${JSON.stringify(data)}`)
        prompt.showToast({
          message: $r('app.string.tip_complete')
        })
        this.files.pushData(`${newName}`)
      })
    } catch {
      prompt.showToast({
        message: $r('app.string.warning_failure')
      })
    }
    if(fileList){
      await fileList.put('fileName', JSON.stringify(this.files.fileData))
      await fileList.flush()
    }
  }

  async unzipHandler(path: string, fileName: string): Promise<void> {
    let zipFile = `${path}/${fileName}`
    Logger.debug(TAG, `zipFile = ${zipFile}`)
    let tempName = fileName.split('.')
    let newName = tempName[0]
    let zipOutFile = `${this.path}/${newName}`
    Logger.debug(TAG, `zipOutFile = ${zipOutFile}`)
    if (this.files.fileData.includes(newName)) {
      prompt.showToast({
        message: $r('app.string.warning_failed')
      })
      return
    }
    let options: zlib.Options = {
      level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
      memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
      strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
    }

    zlib.unzipFile(zipFile, zipOutFile, options).then(data => {
      Logger.info(TAG, `data = ${JSON.stringify(data)}`)
    })
    prompt.showToast({
      message: $r('app.string.tip_complete')
    })
    this.files.pushData(`${newName}`)
    if(fileList){
      await fileList.put('fileName', JSON.stringify(this.files.fileData))
      await fileList.flush()
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
      Column() {
        Row() {
          Text(this.title)
            .width('90%')
            .fontColor(Color.White)
            .fontSize(28)

          Button() {
            Image($r('app.media.add'))
              .height(45).width('100%')
              .objectFit(ImageFit.Contain)
              .align(Alignment.End)
          }
          .id('addFileBtn')
          .width('10%')
          .type(ButtonType.Normal)
          .backgroundColor($r('app.color.button_bg'))
          .align(Alignment.End)
          .onClick(() => {
            this.dialogController.open()
          })
        }
        .width('100%')
        .height('8%')
        .constraintSize({ minHeight: 70 })
        .padding({ left: 10, right: 10 })
        .backgroundColor($r('app.color.button_bg'))

        List({ space: 20, initialIndex: 0 }) {
          LazyForEach(this.files, (item:string, index) => {
            ListItem() {
              Row() {
                Image(item.includes('.zip') ? $r('app.media.zip') : $r('app.media.file'))
                  .width('10%')
                  .margin({ left: 15, top: 5, bottom: 5 })
                  .objectFit(ImageFit.Contain)
                Column() {
                  Text(item)
                    .width('50%')
                    .fontSize(18)
                    .margin({ left: 15 })
                }

                Row() {
                  Button(item.includes('.zip') ? $r('app.string.unzip') : $r('app.string.zip'))
                    .fontSize(18)
                    .onClick(() => {
                      item.includes('.zip') ? this.unzipHandler(this.path, item) : this.zipHandler(this.path, item)
                    })
                    .id('compress_' + index)
                }
                .width('25%')
                .margin({ left: '15' })
              }
            }
            .width('95%')
            .borderRadius(10)
            .margin({ top: '1%', left: '2.5%' })
            .align(Alignment.Center)
            .backgroundColor(Color.White)
          }, (item:string) => item)
        }
        .width('100%')
        .layoutWeight(1)
      }
      .height('100%')
      .width('100%')
      .backgroundColor($r('app.color.index_bg'))
    }
  }
}
