/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import SequentialReader from '../../../lang/SequentialReader';
class Atom {
    public size: number;
    public type: string;
    public constructor(reader?: SequentialReader, atom?: Atom) {
        if (atom == undefined || atom == null) {
            this.size = reader.getUInt32();
            /*
             * A zero size isn't legal for contained atoms, but Canon uses it to
             * terminate the CNTH atom (EOS 100D, PowerShot SX30 IS)
             */
            if (this.size == 0) {
                // previous Atom was terminated by a 32bit zero block
                this.size = reader.getUInt32();
            }
            this.type = reader.getString(4);
            if (this.size == 1) {
                this.size = reader.getInt64();
            }
            else if (this.size == 0) {
                this.size = -1;
            }
        }
        if (reader == undefined || reader == null) {
            this.size = atom.size;
            this.type = atom.type;
        }
    }
}
export default Atom;
