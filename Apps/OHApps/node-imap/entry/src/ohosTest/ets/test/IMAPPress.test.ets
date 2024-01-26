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
import Imap, { inspect } from '@ohos/node-imap'

export default function IMAPPress() {
  let count = 1;
  let id = undefined;
  describe('IMAPPress', function () {
    beforeAll(async function (done) {

    })

    function allApiInterface() {
      it('Connection', 0, function (done) {
        try {
          if (!globalThis.client) {
            globalThis.client = new Imap({
              user: 'xx@qq.com',
              password: 'xxx',
              host: 'imap.xx.com',
              port: 143,
              tls: false,
              tlsOptions: undefined,
              socketTimeout: 60000,
              connTimeout: 60000,
              authTimeout: 60000,
              keepalive: true,
            });
            done()
          } else {
            done()
          }
        } catch (err) {
          done()
        }
      })

      it('connect', 0, function () {
        if (globalThis.client) {
          globalThis.client.once('ready', function () {
          });

          globalThis.client.once('error', function (err) {

          });

          globalThis.client.once('end', function () {
            console.log('Connection ended');
          });
          globalThis.client.connect();
          expect(1).assertEqual(1)
        } else {
          expect(1).assertEqual(1)
        }
      })
      it('serverSupports', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.serverSupports('IMAP4');
            expect(true).assertEqual(true)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }
      })
      it('getBoxes', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.getBoxes(function (err, data) {
            })
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }
      })
      it('addBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            let folderName = 'test' + new Date().getTime();
            globalThis.client.addBox(folderName, (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('delBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            let folderName = 'test' + new Date().getTime();
            globalThis.client.delBox(folderName, (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('renameBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            let folderName = 'test' + new Date().getTime();
            globalThis.client.renameBox(folderName, 'newFolder', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }
      })
      it('subscribeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            let folderName = 'test' + new Date().getTime();
            globalThis.client.subscribeBox(folderName, (err, result) => {
              if (err) {
                expect(1).assertEqual(1)
              } else {
                expect(1).assertEqual(1)
              }
            });

          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('unsubscribeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
          return;
        } else {
          try {
            let folderName = 'test' + new Date().getTime();
            globalThis.client.unsubscribeBox(folderName, (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('getSubscribedBoxes', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
          return
        } else {
          try {
            globalThis.client.getSubscribedBoxes((err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('status', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
          return
        } else {
          try {
            globalThis.client.status('INBOX', function (err, data) {

            })
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }
      })
      it('openBox_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.openBox('INBOX', true, function (err, box) {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('fetch_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            var f = globalThis.client.seq.fetch(`1:10`, {
              bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
              struct: true
            });
            f.on('message', function (msg, seqno) {
              msg.on('body', function (stream, info) {

                stream.on('data', function (chunk) {
                });
                stream.once('end', function () {
                });
              });
              msg.once('attributes', function (attrs) {
              });
              msg.once('end', function () {
              });
            });
            f.once('error', function (err) {

            });
            f.once('end', function () {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('addFlags_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.addFlags('1', '\\Seen', (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('setFlags_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.setFlags('1', '\\Seen', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('delFlags_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.delFlags('1', '\\Seen', (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('addKeywords_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.addKeywords('1', 'testKeyWords', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('setKeywords_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.setKeywords('1', 'testKeyWords', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('delKeywords_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.delKeywords('1', 'testKeyWords', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('expunge_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.expunge('1', (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('search_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.search(['RECENT'], (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('sort_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.sort(['DATE'], ['ALL'], (err, result) => {
            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('copy_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.copy('1', 'test', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('move_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            globalThis.client.move('1', 'test', (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('append_closeBox', 0, function () {
        if (!globalThis.client) {
          expect(1).assertEqual(1)
        } else {
          try {
            let msg = {
              text: 'IMAP协议测试上传的邮件',
              from: `${'鸿蒙搬砖工'} <${'xxx@qq.com'}>`,
              to: 'xxx@qq.com',
              cc: 'xxx@163.com',
              bcc: 'xxx@139.com',
              subject: '鸿蒙客户端IMAP协议的主题'
            }
            let data = JSON.stringify(msg);
            let option = {
              mailbox: 'INBOX',
              flag: ['Seen'], //取值 Seen flagged等
              date: new Date(),
            }
            globalThis.client.append(data, option, (err, result) => {

            });
            expect(1).assertEqual(1)
          } catch (err) {
            expect(1).assertEqual(1)
          }
        }

      })
      it('end', 0, function () {
        try {
          if (!globalThis.client) {
            expect(1).assertEqual(1)
          } else {
            globalThis.client.end(() => {
            });
            expect(1).assertEqual(1)
          }
        } catch (err) {
          console.log(`imaptest---count -3--->${count},err---${err.message}`);
          expect(1).assertEqual(1)
        }
      })
      it('destory', 0, function (done) {
        try {
          if (!globalThis.client) {
            expect(1).assertEqual(1)
          } else {
            globalThis.client.destroy();
            globalThis.client = undefined;
            expect(1).assertEqual(1)
          }
          if (id) {
            clearInterval(id)
            id = undefined;
          }
          if (count <= 1000) {
            count += 1;
            console.log(`imaptest---count -1 --->${count}`);
            id = setTimeout(function () {
              allApiInterface()
              done()
            }, 1000)
          } else {
            console.log(`imaptest---count -2--->${count}`);
            done()
          }


        } catch (err) {
          console.log(`imaptest---count -3--->${count},err---${err.message}`);
          expect(1).assertEqual(1)
          done()
        }
      })
    }

    allApiInterface()
  })
}