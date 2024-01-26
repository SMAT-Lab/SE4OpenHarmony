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

import { AccessOptions, Client, FileInfo, FTPResponse, join, to } from '@ohos/basic-ftp'
import fs from '@ohos.file.fs';
import {
  AppendListener,
  CdToParentDirectoryListener,
  CurrentDirectoryListener,
  DeleteAllButSelfListener,
  DeleteAllListener,
  DeleteEmptyDirectoryListener,
  DeleteFileListener,
  DownloadDirListener,
  DownloadSingleListener,
  EnsureRemotePathListener,
  FeaturesListener,
  FileListListener,
  FileSizeListener,
  LastModifyListener,
  LoginListener,
  RenameFileListener,
  SetWorkingDirectoryListener,
  UploadDirListener,
  UploadSingleListener
} from '../interfaces/NoTlsResultListener'
import LinkedList from '@ohos.util.LinkedList';

export default class NoTlsUtil {
  private client: Client;
  private isLogin: boolean = false
  private TAG: string = 'BasicFtp'

  constructor(context, timeOut?: number) {
    if (!context) {
      throw new Error('context can not be null')
    }
    if (!context.cacheDir) {
      throw new Error('context is not a Context object')
    }
    this.client = new Client(context, timeOut)
  }

  public setTag(tag?: string) {
    if (tag) {
      this.TAG = tag
    }
  }

  public close() {
    if (this.client) {
      this.client.close();
    }
  }

  public getLogin() {
    return this.isLogin;
  }

  public async doLogin(options: AccessOptions, listener?: LoginListener) {
    try {
      this.isLogin = false;
      if (listener) {
        if (!this.client) {
          listener.onLoginErr(new Error('client object not init yet'))
          return
        }
        if (!options) {
          listener.onLoginErr(new Error('options param can not be null'))
          return
        }
        if (!options.host) {
          listener.onLoginErr(new Error('host can not be null'))
          return
        }
        if (!options.user) {
          listener.onLoginErr(new Error('user can not be null'))
          return
        }
        if (!options.password) {
          listener.onLoginErr(new Error('password can not be null'))
          return
        }
        listener.onLoginStart('开始登录')
        await this.client.access(options)
        this.isLogin = true;
        let clientStatus = this.client.closed
        console.log("BasicFtpTest : closed 获取发客户端状态 : " + clientStatus)
        listener.onLoginSuccess('登录成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!options) {
          throw new Error('options param can not be null')
        }
        if (!options.host) {
          throw new Error('host can not be null')
        }
        if (!options.user) {
          throw new Error('user can not be null')
        }
        if (!options.password) {
          throw new Error('password can not be null')
        }
        console.log(`${this.TAG}------>${'开始登录'}`)
        await this.client.access(options)
        this.isLogin = true;
        console.log(`${this.TAG}------>${'登录成功'}`)
      }

    } catch (err) {
      this.isLogin = false;
      if (listener) {
        listener.onLoginErr(err)
      } else {
        throw err
      }
    }
  }

  public async getList(path?: string, listener?: FileListListener) {
    const ctx = this;
    try {
      if (!path) {
        path = ''
      }
      if (listener) {
        if (!this.client) {
          listener.getListErr(new Error('client object not init yet'))
          return
        }
        listener.getListStart('开始获取文件列表')
        let [listErr, listInfo] = await to<FileInfo[]>(this.client.list(path))
        if (listErr) {
          listener.getListErr(listErr)
          return;
        }
        if (!listInfo) {
          listener.getListErr(new Error('获取文件列表失败'))
          return;
        }
        listener.getListSuccess(listInfo)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        console.log(`${this.TAG}------>${'开始获取文件列表'}`)
        let [listErr, listInfo] = await to<FileInfo[]>(this.client.list(path))
        if (listErr) {
          throw listErr
        }
        if (!listInfo) {
          throw new Error('获取文件列表失败')
        }
        console.log(`${this.TAG}---client.list--->${JSON.stringify(listInfo)}`)
      }

    } catch (err) {
      if (listener) {
        listener.getListErr(err)
      } else {
        throw err
      }
    }
  }

  public async getFileSize(path: string, listener?: FileSizeListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.getSizeErr(new Error('client object not init yet'))
          return
        }
        if (!path || path.length < 1) {
          listener.getSizeErr(new Error('file path can not be null'))
          return
        }
        listener.getSizeStart('开始获取文件大小')
        let [listErr, fileSize] = await to<number>(this.client.size(path))
        if (listErr) {
          listener.getSizeErr(listErr)
          return;
        }
        if (!fileSize) {
          listener.getSizeErr(new Error('获取文件大小失败'))
          return;
        }
        listener.getSizeSuccess(fileSize)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!path || path.length < 1) {
          throw new Error('file path can not be null')
        }
        console.log(`${this.TAG}------>${'开始获取文件大小'}`)
        let [listErr, fileSize] = await to<number>(this.client.size(path))
        if (listErr) {
          throw listErr
        }
        if (!fileSize) {
          throw new Error('获取文件大小失败')
        }
        console.log(`${this.TAG}---client.size--->${JSON.stringify(fileSize)}`)
      }

    } catch (err) {
      if (listener) {
        listener.getSizeErr(err)
      } else {
        throw err
      }
    }
  }

  public async uploadSingleFile(localPath: string, remotePath: string, listener?: UploadSingleListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.uploadErr(new Error('client object not init yet'))
          return
        }
        if (!localPath || localPath.length < 1) {
          listener.uploadErr(new Error('localPath can not be null'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.uploadErr(new Error('remotePath can not be null'))
          return
        }
        let [statErr, stat] = await to<fs.Stat>(fs.stat(localPath))
        if (statErr) {
          listener.uploadErr(statErr)
          return;
        }
        if (!stat) {
          listener.uploadErr(new Error('获取本地文件信息失败，upload流程结束'))
          return;
        }
        let totalSize = stat.size;
        this.client.trackProgress((info) => {
          if (listener) {
            listener.uploadProgress(info.bytes, totalSize)
          }
        })
        listener.uploadStart('开始upload单个文件')
        let [listErr, response] = await to<FTPResponse>(this.client.uploadFrom(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          listener.uploadErr(listErr)
          return;
        }
        if (!response) {
          this.client.trackProgress(null)
          listener.uploadErr(new Error('upload单个文件失败，未获得响应信息'))
          return;
        }
        this.client.trackProgress(null)
        listener.uploadSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!localPath || localPath.length < 1) {
          throw new Error('localPath path can not be null')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        let [statErr, stat] = await to<fs.Stat>(fs.stat(localPath))
        if (statErr) {
          throw statErr
        }
        if (!stat) {
          throw new Error('获取本地文件信息失败，upload流程结束')
        }
        let totalSize = stat.size;
        this.client.trackProgress((info) => {
          if (listener) {
            listener.uploadProgress(info.bytes, totalSize)
          }
          console.log(`${this.TAG}---currentSize--->${info.bytes}，totalSize--->${totalSize}`)
        })


        console.log(`${this.TAG}------>${'开始upload单个文件'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.uploadFrom(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          throw listErr
        }
        if (!response) {
          this.client.trackProgress(null)
          throw new Error('upload单个文件失败，未获得响应信息')
        }
        this.client.trackProgress(null)
        console.log(`${this.TAG}---uploadFrom success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.uploadErr(err)
      } else {
        throw err
      }
    }
  }

  public async appendFile(localPath: string, remotePath: string, listener?: AppendListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.appendErr(new Error('client object not init yet'))
          return
        }
        if (!localPath || localPath.length < 1) {
          listener.appendErr(new Error('localPath can not be null'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.appendErr(new Error('remotePath can not be null'))
          return
        }
        let [statErr, stat] = await to<fs.Stat>(fs.stat(localPath))
        if (statErr) {
          listener.appendErr(statErr)
          return;
        }
        if (!stat) {
          listener.appendErr(new Error('获取本地文件信息失败，upload流程结束'))
          return;
        }
        let totalSize = stat.size;
        this.client.trackProgress((info) => {
          if (listener) {
            listener.appendProgress(info.bytes, totalSize)
          }
        })
        listener.appendStart('开始附加upload单个文件')
        let [listErr, response] = await to<FTPResponse>(this.client.appendFrom(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          listener.appendErr(listErr)
          return;
        }
        if (!response) {
          this.client.trackProgress(null)
          listener.appendErr(new Error('附加upload单个文件失败，未获得响应信息'))
          return;
        }
        this.client.trackProgress(null)
        listener.appendSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!localPath || localPath.length < 1) {
          throw new Error('localPath path can not be null')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        let [statErr, stat] = await to<fs.Stat>(fs.stat(localPath))
        if (statErr) {
          throw statErr
        }
        if (!stat) {
          throw new Error('获取本地文件信息失败，upload流程结束')
        }
        let totalSize = stat.size;
        this.client.trackProgress((info) => {
          if (listener) {
            listener.appendProgress(info.bytes, totalSize)
          }
          console.log(`${this.TAG}---currentSize--->${info.bytes}，totalSize--->${totalSize}`)
        })
        console.log(`${this.TAG}------>${'开始附加upload单个文件'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.uploadFrom(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          throw listErr
        }
        if (!response) {
          this.client.trackProgress(null)
          throw new Error('附加upload单个文件失败，未获得响应信息')
        }
        this.client.trackProgress(null)
        listener.appendSuccess(response)
        console.log(`${this.TAG}---uploadFrom success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.appendErr(err)
      } else {
        throw err
      }
    }
  }


  public async downloadSingleFile(localPath: string, remotePath: string, listener?: DownloadSingleListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.downloadErr(new Error('client object not init yet'))
          return
        }
        if (!localPath || localPath.length < 1) {
          listener.downloadErr(new Error('localPath can not be null'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.downloadErr(new Error('remotePath can not be null'))
          return
        }
        let [statErr, fileSize] = await to<number>(this.client.size(remotePath))
        if (statErr) {
          listener.downloadErr(statErr)
          return;
        }
        if (!fileSize) {
          listener.downloadErr(new Error('获取需要下载的文件信息失败，下载流程结束'))
          return;
        }
        this.client.trackProgress((info) => {
          if (listener) {
            listener.downloadProgress(info.bytes, fileSize)
          }
        })
        listener.downloadStart('开始下载单个文件')
        let [listErr, response] = await to<FTPResponse>(this.client.downloadTo(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          listener.downloadErr(listErr)
          return;
        }
        if (!response) {
          this.client.trackProgress(null)
          listener.downloadErr(new Error('下载单个文件失败，未获得响应信息'))
          return;
        }
        this.client.trackProgress(null)
        listener.downloadSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!localPath || localPath.length < 1) {
          throw new Error('localPath path can not be null')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        let [statErr, fileSize] = await to<number>(this.client.size(remotePath))
        if (statErr) {
          throw statErr
        }
        if (!fileSize) {
          throw new Error('获取需要下载的文件信息失败，下载流程结束')
        }

        this.client.trackProgress((info) => {
          if (listener) {
            listener.downloadProgress(info.bytes, fileSize)
          }
          console.log(`${this.TAG}---currentSize--->${info.bytes}，totalSize--->${fileSize}`)
        })
        console.log(`${this.TAG}------>${'开始下载传单个文件'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.downloadTo(localPath, remotePath))
        if (listErr) {
          this.client.trackProgress(null)
          throw listErr
        }
        if (!response) {
          this.client.trackProgress(null)
          throw new Error('下载单个文件失败，未获得响应信息')
        }
        this.client.trackProgress(null)
        console.log(`${this.TAG}---downloadTo success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.downloadErr(err)
      } else {
        throw err
      }
    }
  }

  public async getServerFeatures(listener?: FeaturesListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.featuresErr(new Error('client object not init yet'))
          return
        }
        listener.featuresStart('开始获取服务器能力')
        let [listErr, response] = await to<Map<string, string>>(this.client.features())
        if (listErr) {
          listener.featuresErr(listErr)
          return;
        }
        if (!response) {
          listener.featuresErr(new Error('获取服务器能力失败，未获得响应信息'))
          return;
        }
        listener.featuresSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        console.log(`${this.TAG}------>${'开始获取服务器能力'}`)
        let [listErr, response] = await to<Map<string, string>>(this.client.features())
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('获取服务器能力失败，未获得响应信息')
        }
        console.log(`${this.TAG}---features success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.featuresErr(err)
      } else {
        throw err
      }
    }
  }

  public async setWorkingDirectory(remotePath: string, listener?: SetWorkingDirectoryListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.setWorkingDirectoryErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.setWorkingDirectoryErr(new Error('remotePath can not be null'))
          return
        }
        listener.setWorkingDirectoryStart('开始设置工作目录')
        let [listErr, response] = await to<FTPResponse>(this.client.cd(remotePath))
        if (listErr) {
          listener.setWorkingDirectoryErr(listErr)
          return;
        }
        if (!response) {
          listener.setWorkingDirectoryErr(new Error('设置工作目录失败，未获得响应信息'))
          return;
        }
        listener.setWorkingDirectorySuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始设置工作目录'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.cd(remotePath))
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('设置工作目录失败，未获得响应信息')
        }
        console.log(`${this.TAG}---cd success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.setWorkingDirectoryErr(err)
      } else {
        throw err
      }
    }
  }

  public async cdToParentDirectory(listener?: CdToParentDirectoryListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.cdToParentDirectoryErr(new Error('client object not init yet'))
          return
        }
        listener.cdToParentDirectoryStart('开始切换到工作目录的父目录')
        let [listErr, response] = await to<FTPResponse>(this.client.cdup())
        if (listErr) {
          listener.cdToParentDirectoryErr(listErr)
          return;
        }
        if (!response) {
          listener.cdToParentDirectoryErr(new Error('切换到工作目录的父目录失败，未获得响应信息'))
          return;
        }
        listener.cdToParentDirectorySuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        console.log(`${this.TAG}------>${'开始切换到工作目录的父目录'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.cdup())
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('切换到工作目录的父目录失败，未获得响应信息')
        }
        console.log(`${this.TAG}---cdup success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.cdToParentDirectoryErr(err)
      } else {
        throw err
      }
    }
  }

  public async deleteFile(remotePath: string, listener?: DeleteFileListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.deleteFileErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.deleteFileErr(new Error('remotePath can not be null'))
          return
        }
        listener.deleteFileStart('开始从当前工作目录中删除文件')
        let [listErr, response] = await to<FTPResponse>(this.client.remove(remotePath))
        if (listErr) {
          listener.deleteFileErr(listErr)
          return;
        }
        if (!response) {
          listener.deleteFileErr(new Error('从当前工作目录中删除文件失败，未获得响应信息'))
          return;
        }
        listener.deleteFileSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始从当前工作目录中删除文件'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.remove(remotePath))
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('从当前工作目录中删除文件失败，未获得响应信息')
        }
        console.log(`${this.TAG}---remove success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.deleteFileErr(err)
      } else {
        throw err
      }
    }
  }

  public async getLastModify(remotePath: string, listener?: LastModifyListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.lastModifyErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.lastModifyErr(new Error('remotePath can not be null'))
          return
        }
        listener.lastModifyStart('开始获取文件的最后修改时间')
        let [listErr, response] = await to<Date>(this.client.lastMod(remotePath))
        if (listErr) {
          listener.lastModifyErr(listErr)
          return;
        }
        if (!response) {
          listener.lastModifyErr(new Error('获取文件的最后修改时间失败，未获得响应信息'))
          return;
        }
        listener.lastModifySuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始获取文件的最后修改时间'}`)
        let [listErr, response] = await to<Date>(this.client.lastMod(remotePath))
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('获取文件的最后修改时间失败，未获得响应信息')
        }
        console.log(`${this.TAG}---lastMod success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.lastModifyErr(err)
      } else {
        throw err
      }
    }
  }

  public async getCurrentDirectory(listener?: CurrentDirectoryListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.currentDirectoryErr(new Error('client object not init yet'))
          return
        }
        listener.currentDirectoryStart('开始获取当前工作目录')
        let [listErr, response] = await to<string>(this.client.pwd())
        if (listErr) {
          listener.currentDirectoryErr(listErr)
          return;
        }
        if (!response) {
          listener.currentDirectoryErr(new Error('获取当前工作目录失败，未获得响应信息'))
          return;
        }
        listener.currentDirectorySuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        console.log(`${this.TAG}------>${'开始获取当前工作目录'}`)
        let [listErr, response] = await to<string>(this.client.pwd())
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('获取当前工作目录失败，未获得响应信息')
        }
        console.log(`${this.TAG}---pwd success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.currentDirectoryErr(err)
      } else {
        throw err
      }
    }
  }

  public async ensureRemotePath(remotePath: string, listener?: EnsureRemotePathListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.ensureRemotePathErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.ensureRemotePathErr(new Error('remotePath can not be null'))
          return
        }
        listener.ensureRemotePathStart('开始确保远程服务器存在给定的目录')
        let [listErr, response] = await to<void>(this.client.ensureDir(remotePath))
        if (listErr) {
          listener.ensureRemotePathErr(listErr)
          return;
        }

        listener.ensureRemotePathSuccess('确保远程服务器存在给定的目录成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始获取当前工作目录'}`)
        let [listErr, response] = await to<void>(this.client.ensureDir(remotePath))
        if (listErr) {
          throw listErr
        }
        console.log(`${this.TAG}---ensureDir success--->${'确保远程服务器存在给定的目录成功'}`)
      }

    } catch (err) {
      if (listener) {
        listener.ensureRemotePathErr(err)
      } else {
        throw err
      }
    }
  }

  public async deleteEmptyDirectory(remotePath: string, listener?: DeleteEmptyDirectoryListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.deleteEmptyDirectoryErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.deleteEmptyDirectoryErr(new Error('remotePath can not be null'))
          return
        }
        listener.deleteEmptyDirectoryStart('开始删除空目录，如果不为空，将失败')
        let [listErr, response] = await to<FTPResponse>(this.client.removeEmptyDir(remotePath))
        if (listErr) {
          listener.deleteEmptyDirectoryErr(listErr)
          return;
        }
        if (!response) {
          listener.deleteEmptyDirectoryErr(new Error('删除空目录失败，未获得响应信息'))
          return;
        }
        listener.deleteEmptyDirectorySuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始删除空目录，如果不为空，将失败'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.removeEmptyDir(remotePath))
        if (listErr) {
          throw listErr
        }
        if (!response) {
          throw new Error('删除空目录失败，未获得响应信息')
        }
        console.log(`${this.TAG}---removeEmptyDir success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.deleteEmptyDirectoryErr(err)
      } else {
        throw err
      }
    }
  }

  public async deleteAll(remotePath: string, listener?: DeleteAllListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.deleteAllErr(new Error('client object not init yet'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.deleteAllErr(new Error('remotePath can not be null'))
          return
        }
        listener.deleteAllStart('开始删除目录及其所有内容')
        let [listErr, response] = await to<void>(this.client.removeDir(remotePath))
        if (listErr) {
          listener.deleteAllErr(listErr)
          return;
        }
        listener.deleteAllSuccess('删除目录及其所有内容成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始删除目录及其所有内容'}`)
        let [listErr, response] = await to<void>(this.client.removeDir(remotePath))
        if (listErr) {
          throw listErr
        }

        console.log(`${this.TAG}---removeDir success--->${'删除目录及其所有内容成功'}`)
      }

    } catch (err) {
      if (listener) {
        listener.deleteAllErr(err)
      } else {
        throw err
      }
    }
  }

  public async deleteAllButSelf(listener?: DeleteAllButSelfListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.deleteAllButSelfErr(new Error('client object not init yet'))
          return
        }
        listener.deleteAllButSelfStart('开始清空当前工作目录')
        let [listErr, response] = await to<void>(this.client.clearWorkingDir())
        if (listErr) {
          listener.deleteAllButSelfErr(listErr)
          return;
        }

        listener.deleteAllButSelfSuccess('清空当前工作目录成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        console.log(`${this.TAG}------>${'开始清空当前工作目录'}`)
        let [listErr, response] = await to<void>(this.client.clearWorkingDir())
        if (listErr) {
          throw listErr
        }

        console.log(`${this.TAG}---clearWorkingDir success--->${'清空当前工作目录成功'}`)
      }

    } catch (err) {
      if (listener) {
        listener.deleteAllButSelfErr(err)
      } else {
        throw err
      }
    }
  }

  public async renameFile(newPath: string, remotePath: string, listener?: RenameFileListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.renameFileErr(new Error('client object not init yet'))
          return
        }
        if (!newPath || newPath.length < 1) {
          listener.renameFileErr(new Error('newPath can not be null'))
          return
        }
        if (!remotePath || remotePath.length < 1) {
          listener.renameFileErr(new Error('remotePath can not be null'))
          return
        }
        listener.renameFileStart('开始重命名文件')
        let [listErr, response] = await to<FTPResponse>(this.client.rename(remotePath, newPath))
        if (listErr) {
          listener.renameFileErr(listErr)
          return;
        }
        if (!response) {
          listener.renameFileErr(new Error('文件重命名失败，未获取到响应信息'))
          return;
        }
        listener.renameFileSuccess(response)
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!newPath || newPath.length < 1) {
          throw new Error('newPath can not be null')
        }
        if (!remotePath || remotePath.length < 1) {
          throw new Error('remotePath can not be null')
        }
        console.log(`${this.TAG}------>${'开始重命名文件'}`)
        let [listErr, response] = await to<FTPResponse>(this.client.rename(newPath, remotePath))
        if (listErr) {
          throw listErr
        }

        console.log(`${this.TAG}---rename success--->${JSON.stringify(response)}`)
      }

    } catch (err) {
      if (listener) {
        listener.renameFileErr(err)
      } else {
        throw err
      }
    }
  }

  public async uploadDir(localDir: string, remoteDir: string, listener?: UploadDirListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.uploadDirErr(new Error('client object not init yet'))
          return
        }
        if (!localDir || localDir.length < 1) {
          listener.uploadDirErr(new Error('localDir can not be null'))
          return
        }
        if (!remoteDir || remoteDir.length < 1) {
          listener.uploadDirErr(new Error('remoteDir can not be null'))
          return
        }
        let [localErr, localStat] = await to<fs.Stat>(fs.stat(localDir))
        if (localErr) {
          listener.uploadDirErr(localErr)
          return
        }
        if (!localStat) {
          listener.uploadDirErr(new Error('get localDir info fail'))
          return
        }
        if (!localStat.isDirectory()) {
          listener.uploadDirErr(new Error('localDir is not Directory'))
          return
        }
        let list: LinkedList<number> = new LinkedList();
        list.add(0)
        let totalSize = await this.getTotalSize(list, localDir, listener)
        this.client.trackProgress((info) => {
          listener.uploadDirProgress(info.bytes, totalSize)
        })
        listener.uploadDirStart('开始upload文件夹')
        let [listErr, response] = await to<void>(this.client.uploadFromDir(localDir, remoteDir))
        if (listErr) {
          this.client.trackProgress(null)
          listener.uploadDirErr(listErr)
          return;
        }
        this.client.trackProgress(null)
        listener.uploadDirSuccess('upload文件夹成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!localDir || localDir.length < 1) {
          throw new Error('localDir can not be null')
        }
        if (!remoteDir || remoteDir.length < 1) {
          throw new Error('remoteDir can not be null')
        }
        let [localErr, localStat] = await to(fs.stat(localDir))
        if (localErr) {
          throw localErr
        }
        if (!localStat) {
          throw new Error('get localDir info fail')
        }
        if (!localStat.isDirectory()) {
          throw new Error('localDir is not Directory')
        }
        let list: LinkedList<number> = new LinkedList();
        list.add(0)
        let totalSize = await this.getTotalSize(list, localDir, listener)
        this.client.trackProgress((info) => {
          console.log(`${this.TAG}---upload progress currentSize--->${info.bytes},totalSize--->${totalSize}`)
        })
        console.log(`${this.TAG}------>${'开始upload文件夹'}`)
        let [listErr, response] = await to<void>(this.client.uploadFromDir(localDir, remoteDir))
        if (listErr) {
          this.client.trackProgress(null)
          throw listErr
        }
        this.client.trackProgress(null)
        console.log(`${this.TAG}---uploadFromDir success--->${'upload文件夹成功'}`)
      }

    } catch (err) {
      if (listener) {
        listener.uploadDirErr(err)
      } else {
        throw err
      }
    }
  }

  public async getTotalSize(cacheList: LinkedList<number>, localDir: string, listener?: UploadDirListener): Promise<number> {
    const files = await fs.listFile(localDir)
    for (const file of files) {
      const fullPath = join(localDir, file)
      const [statErr, stats] = await to<fs.Stat>(fs.stat(fullPath))
      if (statErr) {
        if (listener) listener.uploadDirErr(statErr)
        throw statErr;
      }
      if (!stats) {
        if (listener) listener.uploadDirErr(new Error('获取本地文件信息失败，upload流程结束'))
        throw new Error('获取本地文件信息失败，upload流程结束');
      }
      if (stats.isFile()) {
        // 此处属于对原库的优化 需要获取一下状态 一是为了阻塞进度 否则立马开启第二个会直接失败 而是确保socket处于连接状态
        let size = cacheList.removeFirst()
        size += stats.size;
        cacheList.add(size);
      } else if (stats.isDirectory()) {
        await this.getTotalSize(cacheList, fullPath, listener)
      }
    }
    return new Promise<number>(function (resolve, reject) {
      let size = cacheList.removeFirst()
      resolve(size)
    })
  }

  public async downloadDir(localDir: string, remoteDir: string, listener?: DownloadDirListener) {
    const ctx = this;
    try {
      if (listener) {
        if (!this.client) {
          listener.downloadDirErr(new Error('client object not init yet'))
          return
        }
        if (!localDir || localDir.length < 1) {
          listener.downloadDirErr(new Error('localDir can not be null'))
          return
        }
        if (!remoteDir || remoteDir.length < 1) {
          listener.downloadDirErr(new Error('remoteDir can not be null'))
          return
        }
        let list: LinkedList<number> = new LinkedList();
        list.add(0)
        let totalSize = await this.getTotalDownloadSize(list, remoteDir)
        this.client.trackProgress((info) => {

          listener.downloadDirProgress(info.bytes, totalSize)
        })
        listener.downloadDirStart('开始下载文件夹')
        let [listErr, response] = await to<void>(this.client.downloadToDir(localDir, remoteDir))
        if (listErr) {
          this.client.trackProgress(null)
          listener.downloadDirErr(listErr)
          return;
        }
        this.client.trackProgress(null)
        listener.downloadDirSuccess('下载文件夹成功')
      } else {
        if (!this.client) {
          throw new Error('client object not init yet')
        }
        if (!localDir || localDir.length < 1) {
          throw new Error('localDir can not be null')
        }
        if (!remoteDir || remoteDir.length < 1) {
          throw new Error('remoteDir can not be null')
        }
        let list: LinkedList<number> = new LinkedList();
        list.add(0)
        let totalSize = await this.getTotalDownloadSize(list, remoteDir)
        this.client.trackProgress((info) => {
          console.log(`${this.TAG}---downloadToDir progress currentSize--->${info.bytes},totalSize--->${totalSize}`)
        })
        console.log(`${this.TAG}------>${'开始下载文件夹'}`)
        let [listErr, response] = await to<void>(this.client.downloadToDir(localDir, remoteDir))
        if (listErr) {
          this.client.trackProgress(null)
          throw listErr
        }
        this.client.trackProgress(null)
        console.log(`${this.TAG}---downloadToDir success--->${'下载文件夹成功'}`)
      }

    } catch (err) {
      if (listener) {
        listener.downloadDirErr(err)
      } else {
        throw err
      }
    }
  }

  private async getTotalDownloadSize(cacheList: LinkedList<number>, remoteDir: string): Promise<number> {
    for (const file of await this.client.list(remoteDir)) {
      if (file.isDirectory) {
        await this.getTotalDownloadSize(cacheList, remoteDir + "\\" + file.name)
      } else if (file.isFile) {
        let size = cacheList.removeFirst()
        size += await this.client.size(remoteDir + "\\" + file.name);
        cacheList.add(size);
      }
    }
    return new Promise<number>(function (resolve, reject) {
      let size = cacheList.removeFirst()
      resolve(size)
    })
  }
}