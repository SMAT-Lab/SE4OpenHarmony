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
class Box {
    public size: number;
    public classtype: string;
    public usertype: string;
    public isLargeSize: boolean;
    public constructor(reader?: SequentialReader, box?: Box) {
        if (reader != null) {
            this.size = reader.getUInt32();
            this.classtype = reader.getString(4);
            if (this.size == 1) {
                this.size = reader.getInt64();
                this.isLargeSize = true;
            }
            else if (this.size == 0) {
                this.size = -1;
            }
        }
        if (box != null) {
            this.size = box.size;
            this.classtype = box.classtype;
            this.usertype = box.usertype;
        }
    }
}
export default Box;
