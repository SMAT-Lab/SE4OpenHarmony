let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { describe, it, expect } from '@ohos/hypium';
import { Checksum, Options } from '@ohos/checksum';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        it('Checksum_test01', 0, () => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksum = mChecksum.checksum('dshaw', options);
            expect(checksum).assertEqual('fe4dbfe51f451af1ebd90c9905a80b289a760151');
        });
        it('Checksum_test02', 0, () => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksum = mChecksum.checksum('', options);
            expect(checksum).assertEqual('92b404e556588ced6c1acd4ebf053f6809f73a93');
        });
        it('Checksum_test03', 0, () => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksum = mChecksum.checksum('string', options);
            expect(checksum).assertEqual('dc01626ba8b8935383fd9d535dcc34e1cc51f82a');
        });
        it('Checksum_test04', 0, () => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksum = mChecksum.checksum('md5', options);
            expect(checksum).assertEqual('3f3d5a0decc8c342a30268991858b7677c556c41');
        });
        it('checksumFile_test01', 0, (done: Function) => {
            let mChecksum = new Checksum();
            let options = new Options();
            let fileName = '/data/storage/el2/base/haps/entry/files/Test.txt';
            let checksumFile: any = mChecksum.checksumFile(fileName, options, done);
            expect(checksumFile).assertUndefined();
        });
        it('checksumFile_test02', 0, (done: Function) => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksumFile: any = mChecksum.checksumFile('./data', options, done);
            expect(checksumFile).assertUndefined();
        });
        it('checksumFile_test03', 0, (done: Function) => {
            let mChecksum = new Checksum();
            let options = new Options();
            let fileName = 'entry/src/main/ets/pages/Index.ets';
            let checksumFile: any = mChecksum.checksumFile(fileName, options, done);
            expect(checksumFile).assertUndefined();
        });
        it('checksumFile_test04', 0, (done: Function) => {
            let mChecksum = new Checksum();
            let options = new Options();
            let checksumFile: any = mChecksum.checksumFile('', options, done());
            expect(checksumFile).assertUndefined();
        });
    });
}
