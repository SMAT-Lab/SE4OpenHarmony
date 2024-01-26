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
import * as rm from 'reflect-metadata';

import {
  instanceToInstance,
  instanceToPlain,
} from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';

import { describe,it as _it,expect } from "../utils/utils";
import {model1} from "../utils/model"
export default function circular_reference_problemTest() {
  describe('circular_reference_problemTest',  () => {

    _it('should skip circular reference objects in instanceToPlain operation', () => {
      defaultMetadataStorage.clear();

      class Caption {
        text: string = "";
      }

      class Photo {
        id: number|null = 0;
        filename: string = "";
        user: User = new User();
        users: User[] = [];
        caption: Caption = new Caption();
      }

      class User {
        id: number|null = null;
        firstName: string = "";
        caption: Caption = new Caption();
        photos: Photo[] = [];
      }

      const photo1:Photo = new Photo();
      photo1.id = 1;
      photo1.filename = 'me.jpg';

      const photo2:Photo = new Photo();
      photo2.id = 2;
      photo2.filename = 'she.jpg';

      const caption:Caption = new Caption();
      caption.text = 'cool photo';

      const user:User = new User();
      user.caption = caption;
      user.firstName = 'Umed Khudoiberdiev';
      user.photos = [photo1, photo2];

      photo1.user = user;
      photo2.user = user;
      photo1.users = [user];
      photo2.users = [user];

      photo1.caption = caption;
      photo2.caption = caption;

      const plainUser:User = instanceToPlain(user, { enableCircularCheck: true }) as User;
      console.log("aaa---plainUser" + JSON.stringify(plainUser) )
      console.log("aaa---plainUser" + JSON.stringify(model1))

      expect(plainUser).toEqual(model1);
    });
  })
}
