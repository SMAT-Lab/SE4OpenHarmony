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


import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { SMB2} from '@ohos/smbj'
import Option from './Option'

let client:SMB2;
export default function abilityTest() {


  describe('SmbjTest', ()=>  {

    beforeAll(()=>  {
      /** 测试用例仅供参考
       * 配置自己要分享文件的主机IP和文件夹  如：**.**.**.**，test_smbj
       * 分享给指定用户的 用户名和密码
       * 配置自己要测试的客户端IP RK3568上  可参考RK3568手动设置IP.bat
       * */
      let option:Option = new Option('\\\\**.**.**.**\\test_smbj','DOMAIN','test','test1234','**.**.**.**')
      client = new SMB2(option)
    })

    it('exists', 0, ()=>  {
      client.exists('test.txt',  (err:ESObject, exit:boolean) =>{
        if (err) {
          console.log('smb erro:' + err.message)
          expect().assertFail()
        }
        expect(exit).assertTrue()
      })
    })
    it('mkdir', 0, ()=>  {
      client.mkdir('test',  (err:ESObject)=> {
        expect(err).assertNull()
      })
    })
    it('readdir', 0, ()=>  {
      client.readdir('test', (err:ESObject,fileNames:ESObject)=> {
        expect(fileNames.length).assertEqual(1)
      })
    })
    it('readFile', 0, ()=>  {
      client.readFile('ss.txt' , null, (err:ESObject,result:ESObject)  => {
        expect(result).assertEqual('1234567')
      })
    })
    it('rename', 0, ()=>  {
      client.rename('test','retest', (err:ESObject)=>  {
        expect(err).assertNull()
      })
    })
    it('writeFile', 0, ()=>  {
      client.writeFile('test.txt','1234455','UTF-8',(err:ESObject)=>  {
        expect(err).assertNull()
      })
    })
    it('rmdir', 0, ()=>  {
      client.rmdir('test',(err:ESObject,files:ESObject)=> {
        expect(err).assertNull()
      })
    })
    it('unlink', 0, ()=>  {
      client.unlink('test\\11.txt',(err:ESObject,result:ESObject) =>{
        expect(err).assertNull()
      })
    })

  })
}