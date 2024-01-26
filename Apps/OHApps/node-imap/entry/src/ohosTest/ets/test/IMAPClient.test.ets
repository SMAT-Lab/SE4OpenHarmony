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

import hilog from '@ohos.hilog';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import promptAction from '@ohos.promptAction'
import Imap, { inspect } from '@ohos/node-imap'
import socket from '@ohos.net.socket'
import StatusBean from '../../../main/ets/bean/StatusBean'
import MsgListBean, { MsgListFootBean, MsgListHeadBean } from '../../../main/ets/bean/MsgListBean'
import IMAPClientUtil from '../IMAPClientUtil';
import GlobalObj from '../../../main/ets/GlobalObj';
import MailBoxes from '../../../main/ets/bean/MailBoxes';
import Box from '../../../main/ets/bean/Box';
import DetailCallback from '../../../main/ets/bean/DetailCallback';
import { ImapMessageAttributes } from '../../../main/ets/bean/ImapMessage';
import MsgSendBean from '../../../main/ets/bean/MsgSendBean';
import AppendOptions from '../../../main/ets/bean/AppendOptions';

export default function IMAPClientTest() {
  let isLogin = false;
  let util: IMAPClientUtil = new IMAPClientUtil()
  // let endIndex: number = 10 //当前页
  // let bean: StatusBean = undefined //获取邮件列表之前先获取该文件夹里面的邮件总数和状态
  // let uidList: Array<string> = [] //邮件uid列表
  // let subFolderList: Array<string> = [] //邮件列表数据集合
  // let folderList: Array<string> = [] //邮件列表数据集合
  // let listData: Array<MsgListBean> = [] //邮件列表数据集合
  describe('IMAPClientTest', () => {
    beforeAll(async (done: Function) => {
      try {
        if (!GlobalObj?.getInstance()?.getClient()) {
          let client = new Imap({
            user: 'xxx@qq.com',
            password: 'xxx',
            host: 'imap.qq.com',
            port: 143,
            tls: false,
            tlsOptions: undefined,
            socketTimeout: 60000,
            connTimeout: 60000,
            authTimeout: 60000,
            keepalive: true,
          });
          GlobalObj?.getInstance()?.setClient(client)
        }
        if (GlobalObj?.getInstance()?.getClient()) {
          util?.login(() => {
            isLogin = true;
            done()
          }, (err: Error) => {
            console.log(err.message);
            done()
          }, () => {
            console.log('Connection ended');
            done()
          })
        }
      } catch (err) {
        done()
      }
    })
    it('serverSupports', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let checkResult: boolean = GlobalObj?.getInstance()?.getClient()?.serverSupports('IMAP4') ? GlobalObj?.getInstance()?.getClient()?.serverSupports('IMAP4') : false;
      expect(checkResult).assertEqual(true)
      done()
    })
    it('getBoxes', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
        if (err) {
          expect(1).assertEqual(2)
          done()
        }
        if (!data || typeof data != 'object') {
          expect(1).assertEqual(2)
          done()
        }
        expect(1).assertEqual(1)
        done()
      })
    })
    it('addBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        let folderName = 'test' + new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            expect(1).assertEqual(1)
            done()
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('delBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        let folderName = 'test' + new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            GlobalObj?.getInstance()?.getClient()?.delBox(folderName, (err: Error) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              } else {
                expect(1).assertEqual(1)
                done()
              }
            });
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('renameBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        let folderName = 'test' + new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            GlobalObj?.getInstance()?.getClient()?.renameBox(folderName, 'newFolder', (err: Error) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              } else {
                GlobalObj?.getInstance()?.getClient()?.delBox('newFolder', (err: Error) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  } else {
                    expect(1).assertEqual(1)
                    done()
                  }
                });
              }
            });
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('subscribeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        let folderName = 'test' + new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            GlobalObj?.getInstance()?.getClient()?.subscribeBox(folderName, (err: Error) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              } else {
                expect(1).assertEqual(1)
                done()
              }
            });
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('unsubscribeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        let folderName = 'test' + new Date().getTime();
        GlobalObj?.getInstance()?.getClient()?.addBox(folderName, (err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            GlobalObj?.getInstance()?.getClient()?.subscribeBox(folderName, (err: Error) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              } else {
                GlobalObj?.getInstance()?.getClient()?.unsubscribeBox(folderName, (err: Error) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  } else {
                    expect(1).assertEqual(1)
                    done()
                  }
                });
              }
            });
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('getSubscribedBoxes', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err: Error) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          } else {
            expect(1).assertEqual(1)
            done()
          }
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('status', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            expect(1).assertEqual(1)
            done()
          })
        })


      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('openBox_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, data: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                if (err) {
                  expect(1).assertEqual(2)
                  done()
                } else {
                  expect(1).assertEqual(1)
                  done()
                }
              });
            });
          })
        })
      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('fetch_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let prefix: string = ''
              let buffer: string = '';
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                  prefix = '(#' + seqno + ') ';
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                  buffer += data;
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {

                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (buffer && buffer.length > 1) {
                    GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        expect(1).assertEqual(1)
                        done()
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }

                }
              }
              util?.getListData(1, 10, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('addFlags_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }

              let prefix: string = ''
              let buffer: string = '';
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                  prefix = '(#' + seqno + ') ';
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                  buffer += data;
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.addFlags(uidList[0], '\\Seen', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('setFlags_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.setFlags(uidList[0], '\\Seen', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }

                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('delFlags_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.delFlags(uidList[0], '\\Seen', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('addKeywords_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.addKeywords(uidList[0], 'testKeyWords', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }

                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('setKeywords_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.setKeywords(uidList[0], 'testKeyWords', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('delKeywords_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    GlobalObj?.getInstance()?.getClient()?.delKeywords(uidList[0], 'testKeyWords', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('expunge_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    let uid = uidList[0]
                    GlobalObj?.getInstance()?.getClient()?.addFlags(uid, '\\Deleted', (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.expunge(uid, (err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                              if (err) {
                                expect(1).assertEqual(2)
                                done()
                              } else {
                                expect(1).assertEqual(1)
                                done()
                              }
                            });
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('search_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              GlobalObj?.getInstance()?.getClient()?.search(['RECENT'], (err: Error, uids: number[]) => {
                if (err) {
                  expect(1).assertEqual(2)
                  done()
                } else {
                  GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                    if (err) {
                      expect(1).assertEqual(2)
                      done()
                    } else {
                      expect(1).assertEqual(1)
                      done()
                    }
                  });
                }
              });
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('sort_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
              break;
            }
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              try {
                GlobalObj?.getInstance()?.getClient()?.sort(['DATE'], ['ALL'], (err: Error, uids: number[]) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  } else {
                    GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        expect(1).assertEqual(1)
                        done()
                      }
                    });
                  }
                });
              } catch (err) {
                if (err && err.message == 'Sort is not supported on the server') {
                  expect(1).assertEqual(1)
                  done()
                } else {
                  expect(1).assertEqual(2)
                  done()
                }
                GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  } else {
                    expect(1).assertEqual(1)
                    done()
                  }
                });
              }
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('copy_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let selectFoler = ''
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
            }
            selectFoler = keyArr[i]
          }
          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }

              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    let uid = uidList[0];
                    GlobalObj?.getInstance()?.getClient()?.copy(uid, selectFoler, (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('move_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      let uidList: Array<string> = []
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasInbox = false;
          let selectFoler = ''
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === 'INBOX') {
              hasInbox = true;
            }
            selectFoler = keyArr[i]
          }

          if (!hasInbox) {
            expect(1).assertEqual(2)
            done()
          }
          GlobalObj?.getInstance()?.getClient()?.status('INBOX', (err: Error, data: Box) => {
            if (err) {
              expect(1).assertEqual(2)
              done()
            }
            if (!data ) {
              expect(1).assertEqual(2)
              done()
            }
            GlobalObj?.getInstance()?.getClient()?.openBox('INBOX', true, (err: Error, box: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }


              let callback: DetailCallback = {
                messageStartCallback: (seqno: number) => {
                  console.log('Message #%d', seqno);
                },
                bodyStartCallback: () => {
                },
                bodyDataCallback: (data: string) => {
                },
                bodyEndCallback: () => {

                },
                attributesCallback: (attrs: ImapMessageAttributes) => {
                  if (attrs && typeof attrs === 'object') {
                    uidList.push(attrs.uid + '');
                  }
                },
                messageEndCallback: () => {
                },
                fetchErrorCallback: (err: Error) => {
                  expect(1).assertEqual(2)
                  done()
                },
                fetchEndCallback: () => {
                  console.log('Done fetching all messages!');
                  if (uidList && uidList.length >= 1 && uidList[0]) {
                    let uid = uidList[0];
                    GlobalObj?.getInstance()?.getClient()?.move(uid, selectFoler, (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });
                  } else {
                    expect(1).assertEqual(0)
                    done()
                  }
                }
              }
              util?.getListData(1, null, callback)
            });
          })
        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('append_closeBox', 0, (done: Function) => {
      if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
        expect(1).assertEqual(2)
        done()
      }
      try {
        GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data: MailBoxes) => {
          if (err) {
            expect(1).assertEqual(2)
            done()
          }
          if (!data || typeof data != 'object') {
            expect(1).assertEqual(2)
            done()
          }
          let hasUploadBox = false;
          let selectFoler = 'uploadMail'
          let keyArr = Object.getOwnPropertyNames(data)
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === selectFoler) {
              hasUploadBox = true;
              break;
            }
          }

          if (!hasUploadBox) {
            GlobalObj?.getInstance()?.getClient()?.addBox(selectFoler, (err: Error) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              } else {
                GlobalObj?.getInstance()?.getClient()?.status(selectFoler, (err: Error, data: Box) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  }
                  if (!data ) {
                    expect(1).assertEqual(2)
                    done()
                  }
                  GlobalObj?.getInstance()?.getClient()?.openBox(selectFoler, true, (err: Error, box: Box) => {
                    if (err) {
                      expect(1).assertEqual(2)
                      done()
                    }
                    let msg: MsgSendBean = {
                      text: 'IMAP协议测试上传的邮件',
                      from: `${'鸿蒙搬砖工'} <${'xxx@qq.com'}>`,
                      to: 'xxx@qq.com',
                      cc: 'xxx@xxx.com',
                      bcc: 'xxx@xxx.com',
                      subject: '鸿蒙客户端IMAP协议的主题'
                    }
                    let data = JSON.stringify(msg);
                    let option: AppendOptions = {
                      mailbox: 'INBOX',
                      flags: ['Seen'], //取值 Seen flagged等
                      date: new Date(),
                    }
                    GlobalObj?.getInstance()?.getClient()?.append(data, option, (err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                          if (err) {
                            expect(1).assertEqual(2)
                            done()
                          } else {
                            expect(1).assertEqual(1)
                            done()
                          }
                        });
                      }
                    });

                  });
                })
              }
            });
          } else {
            GlobalObj?.getInstance()?.getClient()?.status(selectFoler, (err: Error, data: Box) => {
              if (err) {
                expect(1).assertEqual(2)
                done()
              }
              if (!data ) {
                expect(1).assertEqual(2)
                done()
              }
              GlobalObj?.getInstance()?.getClient()?.openBox(selectFoler, true, (err: Error, box: Box) => {
                if (err) {
                  expect(1).assertEqual(2)
                  done()
                }
                let msg: MsgSendBean = {
                  text: 'IMAP协议测试上传的邮件',
                  from: `${'鸿蒙搬砖工'} <${'xxx@xx.com'}>`,
                  to: 'xxx@xx.com',
                  cc: 'xxx@xxx.com',
                  bcc: 'xxx@xxx.com',
                  subject: '鸿蒙客户端IMAP协议的主题'
                }
                let data = JSON.stringify(msg);
                let option: AppendOptions = {
                  mailbox: 'INBOX',
                  flags: ['Seen'], //取值 Seen flagged等
                  date: new Date(),
                }
                GlobalObj?.getInstance()?.getClient()?.append(data, option, (err: Error) => {
                  if (err) {
                    expect(1).assertEqual(2)
                    done()
                  } else {
                    GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                      if (err) {
                        expect(1).assertEqual(2)
                        done()
                      } else {
                        expect(1).assertEqual(1)
                        done()
                      }
                    });
                  }
                });

              });
            })
          }

        })

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
    it('end', 0, (done: Function) => {
      try {
        if (!GlobalObj?.getInstance()?.getClient() || !isLogin) {
          expect(1).assertEqual(2)
          done()
        }
        GlobalObj?.getInstance()?.getClient()?.end(() => {
          isLogin = false;
          expect(1).assertEqual(1)
          done()
        });

      } catch (err) {
        expect(1).assertEqual(2)
        done()
      }
    })
  })
}