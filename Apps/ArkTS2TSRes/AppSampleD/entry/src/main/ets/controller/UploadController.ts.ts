/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import http from '@ohos.net.http';
import Logger from '../utils/Logger';
import Constant from '../utils/Constant';
import NetworkModel from '../model/NetworkModel';
import R from '../appsampled/data/R';
const TAG: string = '[UploadController]';
export default class UploadController {
    private networkModel: NetworkModel = new NetworkModel();
    public async uploadFile(fileName: string): Promise<void> {
        Logger.info(TAG, `uploadFile start`);
        let extraData = {
            name: fileName,
            url: `${Constant.UPLOAD_URL}/${fileName}`
        };
        Logger.info(TAG, `uploadFile extraData->${JSON.stringify(extraData)}`);
        this.networkModel.uploadFile(Constant.ACTION_UPLOAD, fileName, (res) => {
            if (res) {
                Logger.info(TAG, `uploadFile success`);
                // 上传成功后请求服务器添加文件
                let data: ESObject = AppStorage.get("userInfo");
                this.networkModel.request(Constant.ACTION_ADD_FILE, http.RequestMethod.POST, extraData, data?.token);
            }
        });
    }
}
