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

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import FtpApiUtil from '../../../../../entry/src/main/ets/utils/FtpApiUtil'
import { AccessOptions, FileInfo, FileType, FTPResponse, UnixPermissions } from '@ohos/basic-ftp'
import fs from '@ohos.file.fs'
import socket from '@ohos.net.socket';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';

const BASE_COUNT = 1

async function loginServer(option: socket.TLSConnectOptions, secure: boolean, ftpUtil: FtpApiUtil, done: Function) {
  let loginInfo: AccessOptions | null = null
  if (secure) {
    let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext()
    let keyData = await context.resourceManager.getRawFileContent('client_rsa_private.pem.unsecure')
    let key = '';
    for (let i = 0; i < keyData.length; i++) {
      let todo = keyData[i]
      let item = String.fromCharCode(todo);
      key += item;
    }
    option.secureOptions.key = key;

    let certData = await context.resourceManager.getRawFileContent('client.pem')
    let cert = '';
    for (let i = 0; i < certData.length; i++) {
      let todo = certData[i]
      let item = String.fromCharCode(todo);
      cert += item;
    }
    option.secureOptions.cert = cert;


    let caData = await context.resourceManager.getRawFileContent('ca.pem')
    let ca = '';
    for (let i = 0; i < caData.length; i++) {
      let todo = caData[i]
      let item = String.fromCharCode(todo);
      ca += item;
    }
    if (option.secureOptions.ca instanceof Array) {
      option.secureOptions.ca[0] = ca;
    } else {
      option.secureOptions.ca = ca;
    }

    loginInfo = {
      host: 'xxx',
      user: 'xxx',
      password: 'xxx',
      secure: 'implicit',
      secureOptions: option
    }
  } else {
    loginInfo = {
      host: 'xxx',
      user: 'xxx',
      password: 'xxx',
      secure: false,
      secureOptions: undefined
    }
  }
  if (ftpUtil) {
    let startTime1: number = 0;
    ftpUtil.doLogin(loginInfo, {
      onLoginStart(info) {
        startTime1 = new Date().getTime();
      },
      onLoginSuccess(result) {
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("BasicFtpTest : login averageTime : " + averageTime1 + "us")
        expect(0).assertEqual(0)
        done()
      },
      onLoginErr(err: Error) {
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("BasicFtpTest : login averageTime : " + averageTime1 + "us")
        expect(0).assertEqual(1)
        done()
      }
    })
  } else {
    expect(0).assertEqual(1)
    done()
  }
}

function createSingleFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'
    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, '客户端发送到服务端的信息')
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

function createFileDir() {
  try {
    let localDir = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime())
    let localPath1 = localDir + '/' + 'test1.txt'
    let localPath2 = localDir + '/' + 'test2.txt'
    let localPath3 = localDir + '/' + 'test3.txt'

    fs.mkdirSync(localDir)
    let file = fs.openSync(localPath1, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, "客户端发送到服务端的信息，请查收\r\n")
    fs.fsyncSync(file.fd)
    fs.closeSync(file)

    let file1 = fs.openSync(localPath2, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    let str1 = '789456123abcd'
    fs.writeSync(file1.fd, str1)
    fs.fsyncSync(file1.fd)
    fs.closeSync(file1)


    let file3 = fs.openSync(localPath3, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    let str3 = '111111111111111111111111111111111111111111111111111111'
    fs.writeSync(file3.fd, str3)
    fs.fsyncSync(file3.fd)
    fs.closeSync(file3)
    return localDir
  } catch (err) {
    return null;
  }
}

function createDownloadToFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'
    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, '客户端发送到服务端的信息')
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

function createSizeFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'
    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, '客户端发送到服务端的信息')
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

function createLastModFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'
    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, '客户端发送到服务端的信息')
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

function createRenameFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'
    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, '客户端发送到服务端的信息')
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

function createDeleteSingleFile() {
  try {
    let tempPath = AbilityDelegatorRegistry.getAbilityDelegator()
      .getAppContext()
      .cacheDir + '/' + (new Date().getTime()) + '.txt'

    let file = fs.openSync(tempPath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
    fs.writeSync(file.fd, "客户端发送到服务端的信息，请查收\r\n")
    fs.fsyncSync(file.fd)
    fs.closeSync(file)
    return tempPath
  } catch (err) {
    return null
  }
}

export default function BasicFtpTest() {

  let ftpUtil: FtpApiUtil;
  let secure = false;

  let option: socket.TLSConnectOptions = {
    ALPNProtocols: ["spdy/1", "http/1.1"],
    address: {
      address: 'xxx',
      port: 21,
      family: 1
    },
    secureOptions: {
      key: '',
      cert: '',
      ca: [''],
      password: 'xxx',
      protocols: [socket.Protocol.TLSv12, socket.Protocol.TLSv13],
      useRemoteCipherPrefer: true,
      signatureAlgorithms: "rsa_pss_rsae_sha256:ECDSA+SHA256",
      cipherSuite: "AES256-SHA256"
    }
  }


  describe('BasicFtpTest', () => {
    beforeAll((done: Function) => {
      if (!ftpUtil || !ftpUtil.getLogin()) {
        let context = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext()
        ftpUtil = new FtpApiUtil(context)
        ftpUtil.setTag();
        loginServer(option, secure, ftpUtil, done)
      }
    })
    beforeEach((done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.setWorkingDirectory('/', {
          setWorkingDirectoryErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          setWorkingDirectoryStart(info) {
          },
          setWorkingDirectorySuccess(result: FTPResponse) {
            done()
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })


    it('list_root_1', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(0)
          done()
          return;
        }
        let startTime1: number = 0;
        ftpUtil.getList('', {
          getListErr(err: Error) {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("BasicFtpTest : list averageTime : " + averageTime1 + "us")
            expect(0).assertEqual(0)
            done()
          },
          getListStart(info) {
            startTime1 = new Date().getTime();
          },
          getListSuccess(result: FileInfo[]) {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("BasicFtpTest : list averageTime : " + averageTime1 + "us")
            expect(0).assertEqual(0)
            done()
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('uploadFrom', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.getFileSize('uploadText.txt', {
          getSizeErr(err: Error) {
            let tempPath = createSingleFile();
            let startTime1: number = 0;
            ftpUtil.uploadSingleFile(tempPath, 'uploadText.txt', {
              uploadErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              uploadStart(info) {
                startTime1 = new Date().getTime();
              },
              uploadSuccess(msg: FTPResponse) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : uploadFrom averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                fs.unlinkSync(tempPath)
                done()
              },
              uploadProgress(currentSize: number, totalSize: number) {
              }
            })
          },
          getSizeStart(info) {
          },
          getSizeSuccess(result: number) {
            ftpUtil.deleteFile('uploadText.txt', {
              deleteFileErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              deleteFileStart(info) {
              },
              deleteFileSuccess(msg: FTPResponse) {
                let tempPath = createSingleFile();
                let startTime1: number = 0;
                ftpUtil.uploadSingleFile(tempPath, 'uploadText.txt', {
                  uploadErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  uploadStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  uploadSuccess(msg: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : uploadFrom averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    fs.unlinkSync(tempPath)
                    done()
                  },
                  uploadProgress(currentSize: number, totalSize: number) {
                  }
                })
              }
            })
          }
        })
      }
    })

    it('uploadFromDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.ensureRemotePath('uploadDir', {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                ftpUtil.deleteAll('uploadDir', {
                  deleteAllErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  deleteAllStart(info) {

                  },
                  deleteAllSuccess(result) {
                    let localDir = createFileDir()
                    let startTime1: number = 0;
                    ftpUtil.uploadDir(localDir, 'uploadDir', {
                      uploadDirErr(err: Error) {
                        expect(0).assertEqual(1)
                        done()
                      },
                      uploadDirStart(info) {
                        startTime1 = new Date().getTime();
                      },
                      uploadDirSuccess(msg) {
                        let endTime1 = new Date().getTime();
                        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                        console.log("BasicFtpTest : uploadFromDir averageTime : " + averageTime1 + "us")
                        expect(0).assertEqual(0)
                        fs.rmdirSync(localDir)
                        done()
                      },
                      uploadDirProgress(currentSize: number, totalSize: number) {
                      }
                    })
                  }
                })
              }
            })

          }
        })
      }
    })

    it('downloadTo', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let localPath = AbilityDelegatorRegistry.getAbilityDelegator()
          .getAppContext()
          .cacheDir + '/' + (new Date().getTime()) + '.txt'

        ftpUtil.getFileSize('downloadTo.txt', {
          getSizeErr(err: Error) {
            let tempPath = createDownloadToFile();
            ftpUtil.uploadSingleFile(tempPath, 'downloadTo.txt', {
              uploadErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              uploadStart(info) {
              },
              uploadSuccess(msg: FTPResponse) {
                fs.unlinkSync(tempPath)
                let startTime1: number = 0;
                ftpUtil.downloadSingleFile(localPath, "downloadTo.txt", {
                  downloadErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  downloadStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  downloadSuccess(msg: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : downloadTo averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    fs.unlinkSync(localPath)
                    done()
                  },
                  downloadProgress(currentSize: number, totalSize: number) {
                  }
                })
              },
              uploadProgress(currentSize: number, totalSize: number) {
              }
            })
          },
          getSizeStart(info) {
          },
          getSizeSuccess(result: number) {
            let startTime1: number = 0;
            ftpUtil.downloadSingleFile(localPath, "downloadTo.txt", {
              downloadErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              downloadStart(info) {
                startTime1 = new Date().getTime();
              },
              downloadSuccess(msg: FTPResponse) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : downloadTo averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                fs.unlinkSync(localPath)
                done()
              },
              downloadProgress(currentSize: number, totalSize: number) {
              }
            })
          }
        })

      } else {
        expect(0).assertEqual(0)
        done()
      }
    })

    it('downloadDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let localDir = AbilityDelegatorRegistry.getAbilityDelegator()
          .getAppContext()
          .cacheDir + '/' + (new Date().getTime())
        ftpUtil.ensureRemotePath('downloadDir', {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                let startTime1: number = 0;
                ftpUtil.downloadDir(localDir, "downloadDir", {
                  downloadDirErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  downloadDirStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  downloadDirSuccess(msg) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : downloadDir averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    fs.rmdirSync(localDir)
                    done()
                  },
                  downloadDirProgress(currentSize: number, totalSize: number) {
                  }
                })
              }
            })
          }
        })

      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('size', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let tempPath = createSizeFile();
        let sizePath = (new Date().getTime()) + '.txt';
        ftpUtil.uploadSingleFile(tempPath, sizePath, {
          uploadErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          uploadStart(info) {
          },
          uploadSuccess(msg: FTPResponse) {
            fs.unlinkSync(tempPath)
            let startTime1: number = 0;
            ftpUtil.getFileSize(sizePath, {
              getSizeErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              getSizeStart(info) {
                startTime1 = new Date().getTime();
              },
              getSizeSuccess(result: number) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : size averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                done()
              }
            })
          },
          uploadProgress(currentSize: number, totalSize: number) {
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })
    it('features', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let startTime1: number = 0;
        ftpUtil.getServerFeatures({
          featuresErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          featuresStart(info) {
            startTime1 = new Date().getTime();
          },
          featuresSuccess(msg: Map<string, string>) {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("BasicFtpTest : features averageTime : " + averageTime1 + "us")
            expect(0).assertEqual(0)
            done()
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })
    it('lastMod', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let tempPath = createLastModFile();
        let lastModPath = (new Date().getTime()) + '.txt';
        ftpUtil.uploadSingleFile(tempPath, lastModPath, {
          uploadErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          uploadStart(info) {
          },
          uploadSuccess(msg: FTPResponse) {
            fs.unlinkSync(tempPath)
            let startTime1: number = 0;
            ftpUtil.getLastModify(lastModPath, {
              lastModifyErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              lastModifyStart(info) {
                startTime1 = new Date().getTime();
              },
              lastModifySuccess(msg: Date) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : lastMod averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                done()
              }
            })
          },
          uploadProgress(currentSize: number, totalSize: number) {
          }
        })


      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('rename', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.getFileSize('rename.txt', {
          getSizeErr(err: Error) {
            let tempPath = createRenameFile();
            let startTime1: number = 0;
            ftpUtil.uploadSingleFile(tempPath, 'rename.txt', {
              uploadErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              uploadStart(info) {
              },
              uploadSuccess(msg: FTPResponse) {
                fs.unlinkSync(tempPath)
                let startTime1: number = 0;
                ftpUtil.renameFile('newName.txt', 'rename.txt', {
                  renameFileErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  renameFileStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  renameFileSuccess(result: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : rename averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    ftpUtil.deleteFile('newName.txt', {
                      deleteFileErr(err: Error) {
                        done()
                      },
                      deleteFileStart(info) {
                      },
                      deleteFileSuccess(msg: FTPResponse) {
                        done()
                      }
                    })
                  }
                })
              },
              uploadProgress(currentSize: number, totalSize: number) {
              }
            })
          },
          getSizeStart(info) {
          },
          getSizeSuccess(result: number) {
            let startTime1: number = 0;
            ftpUtil.renameFile('newName.txt', 'rename.txt', {
              renameFileErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              renameFileStart(info) {
                startTime1 = new Date().getTime();
              },
              renameFileSuccess(result: FTPResponse) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : rename averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                ftpUtil.deleteFile('newName.txt', {
                  deleteFileErr(err: Error) {
                    done()
                  },
                  deleteFileStart(info) {
                  },
                  deleteFileSuccess(msg: FTPResponse) {
                    done()
                  }
                })
              }
            })

          }
        })
      }
    })


    it('cdup', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let startTime1: number = 0;
        ftpUtil.cdToParentDirectory({
          cdToParentDirectoryErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          cdToParentDirectoryStart(info) {
            startTime1 = new Date().getTime();
          },
          cdToParentDirectorySuccess(res: FTPResponse) {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("BasicFtpTest : cdup averageTime : " + averageTime1 + "us")
            expect(0).assertEqual(0)
            done()
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })


    it('ensureDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        let startTime1: number = 0;
        ftpUtil.ensureRemotePath("clientCreateOnServer", {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
            startTime1 = new Date().getTime();
          },
          ensureRemotePathSuccess(result) {
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
            console.log("BasicFtpTest : ensureDir averageTime : " + averageTime1 + "us")
            expect(0).assertEqual(0)
            done()
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('removeEmptyDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          return
        }
        ftpUtil.ensureRemotePath("emptyDir", {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                let startTime1: number = 0;
                ftpUtil.deleteEmptyDirectory("emptyDir", {
                  deleteEmptyDirectoryErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  deleteEmptyDirectoryStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  deleteEmptyDirectorySuccess(result: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : removeEmptyDir averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    done()
                  }
                })
              }
            })
          }
        })
      }
    })


    it('remove', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.getFileSize("singleDelete.txt", {
          getSizeErr(err: Error) {
            let tempPath = createDeleteSingleFile()
            ftpUtil.uploadSingleFile(tempPath, "singleDelete.txt", {
              uploadErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              uploadStart(info: string) {
              },
              uploadSuccess(msg: FTPResponse) {
                let startTime1: number = 0;
                ftpUtil.deleteFile("singleDelete.txt", {
                  deleteFileErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  deleteFileStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  deleteFileSuccess(msg: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : deleteSingleFile averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    done()
                  }
                })
              },
              uploadProgress(currentSize: number, totalSize: number) {
              }
            })
          },
          getSizeStart(info: string) {

          },
          getSizeSuccess(size: number) {
            let startTime1: number = 0;
            ftpUtil.deleteFile("singleDelete.txt", {
              deleteFileErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              deleteFileStart(info) {
                startTime1 = new Date().getTime();
              },
              deleteFileSuccess(msg: FTPResponse) {
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("BasicFtpTest : deleteSingleFile averageTime : " + averageTime1 + "us")
                expect(0).assertEqual(0)
                done()
              }
            })
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('removeDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.ensureRemotePath("deleteAll", {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                let startTime1: number = 0;
                ftpUtil.deleteAll("deleteAll", {
                  deleteAllErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  deleteAllStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  deleteAllSuccess(result) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : removeDir averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    done()
                  }
                })
              }
            })
          }
        })


      }
    })
    it('clearWorkingDir', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          expect(0).assertEqual(1)
          done()
          return
        }
        ftpUtil.ensureRemotePath("workingDir", {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                ftpUtil.setWorkingDirectory("workingDir", {
                  setWorkingDirectoryErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  setWorkingDirectoryStart(info) {
                  },
                  setWorkingDirectorySuccess(result: FTPResponse) {
                    let startTime1: number = 0;
                    ftpUtil.deleteAllButSelf({
                      deleteAllButSelfErr(err: Error) {
                        expect(0).assertEqual(1)
                        done()
                      },
                      deleteAllButSelfStart(info) {
                        startTime1 = new Date().getTime();
                      },
                      deleteAllButSelfSuccess(result) {
                        let endTime1 = new Date().getTime();
                        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                        console.log("BasicFtpTest : clearWorkingDir averageTime : " + averageTime1 + "us")
                        expect(0).assertEqual(0)
                        done()
                      }
                    })
                  }
                })
              }
            })
          }
        })
      } else {
        expect(0).assertEqual(1)
        done()
      }
    })

    it('cd', 0, (done: Function) => {
      if (ftpUtil) {
        if (!ftpUtil.getLogin()) {
          return
        }
        ftpUtil.ensureRemotePath("workingDir", {
          ensureRemotePathErr(err: Error) {
            expect(0).assertEqual(1)
            done()
          },
          ensureRemotePathStart(info) {
          },
          ensureRemotePathSuccess(result) {
            ftpUtil.cdToParentDirectory({
              cdToParentDirectoryErr(err: Error) {
                expect(0).assertEqual(1)
                done()
              },
              cdToParentDirectoryStart(info) {

              },
              cdToParentDirectorySuccess(res: FTPResponse) {
                let startTime1: number = 0;
                ftpUtil.setWorkingDirectory("workingDir", {
                  setWorkingDirectoryErr(err: Error) {
                    expect(0).assertEqual(1)
                    done()
                  },
                  setWorkingDirectoryStart(info) {
                    startTime1 = new Date().getTime();
                  },
                  setWorkingDirectorySuccess(result: FTPResponse) {
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                    console.log("BasicFtpTest : cd averageTime : " + averageTime1 + "us")
                    expect(0).assertEqual(0)
                    done()
                  }
                })
              }
            })
          }
        })

      }
    })

  }

  )
}
