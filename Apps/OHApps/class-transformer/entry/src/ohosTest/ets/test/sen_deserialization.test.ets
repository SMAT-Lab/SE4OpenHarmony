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

  serialize,
  deserialize,
  deserializeArray
} from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';

import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { describe,it as _it,expect } from "../utils/utils";
import { model3 } from '../utils/model';

export default function sen_deserializationTest() {
  describe('sen_deserializationTest', () =>  {
    _it('should perform serialization and deserialization properly', () => {
      defaultMetadataStorage.clear();

      class User {
        firstName: string = "";
        lastName: string = "";
        @Exclude()
        password: string = "";

      }

      const user:User = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      const user1 = new User();
      user1.firstName = 'Dima';
      user1.lastName = 'Zotov';
      user1.password = 'imnosuperman';

      const user2 = new User();
      user2.firstName = 'Bakhrom';
      user2.lastName = 'Baubekov';
      user2.password = 'imnosuperman';

      const users = [user1, user2];
      const plainUser:User = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const plainUsers:Array<User> = [
        {
          firstName: 'Dima',
          lastName: 'Zotov',
          password: 'imnobatman',
        },
        {
          firstName: 'Bakhrom',
          lastName: 'Baubekov',
          password: 'imnosuperman',
        },
      ];

      const plainedUser = serialize(user);
      console.log(`cccccccccccc---1`)
      expect(plainedUser).toEqual(
        JSON.stringify({
          firstName: 'Umed',
          lastName: 'Khudoiberdiev',
        })
      );
      console.log(`cccccccccccc---2`)

      const plainedUsers = serialize(users);
      expect(plainedUsers).toEqual(
        JSON.stringify([
          {
            firstName: 'Dima',
            lastName: 'Zotov',
          },
          {
            firstName: 'Bakhrom',
            lastName: 'Baubekov',
          },
        ])
      );
      console.log(`cccccccccccc---3`)

      const classedUser:User = deserialize(User, JSON.stringify(plainUser));
      expect(classedUser instanceof User).toBe(true);
      console.log(`cccccccccccc---3${JSON.stringify(classedUser)}`)
      expect(classedUser).toEqual(model3);
      console.log(`cccccccccccc---4`)

      const classedUsers:Array<User> = deserializeArray(User, JSON.stringify(plainUsers));
      expect(classedUsers[0] instanceof User).toBe(true);
      expect(classedUsers[1] instanceof User).toBe(true);
      console.log(`cccccccccccc---5`)

      const userLike1 = new User();
      userLike1.firstName = 'Dima';
      userLike1.lastName = 'Zotov';

      const userLike2 = new User();
      userLike2.firstName = 'Bakhrom';
      userLike2.lastName = 'Baubekov';

      expect(classedUsers).toEqual([userLike1, userLike2]);
    });

    _it('should successfully deserialize object with unknown nested properties ', () => {
      defaultMetadataStorage.clear();

      class TestObject {
        prop: string = "";
      }


      interface Extra {
        anotherProp: string,
      }
      interface Payload {
        prop: string,
        extra: Extra,
      }
      const payload:Payload = {
        prop: 'Hi',
        extra: {
          anotherProp: "let's see how this works out!",
        },
      }
      const result:TestObject = deserialize(TestObject, JSON.stringify(payload));
      expect(result instanceof TestObject).toBe(true);
      expect(result.prop).toEqual('Hi');
      // TODO: We should strip, but it's a breaking change
      // (<any>result).extra.should.be.undefined;
    });

    _it('should not overwrite non writable properties on deserialize', () => {
      class TestObject {
        get getterOnlyProp(): string {
          return 'I cannot write!';
        }

        normalProp: string = 'Hello!';
      }

   
      expect(deserialize(TestObject, JSON.stringify({
        getterOnlyProp: 'I CAN write!',
        normalProp: 'Goodbye!',
      })).getterOnlyProp).toEqual('I cannot write!');
      expect(deserialize(TestObject, JSON.stringify({
        getterOnlyProp: 'I CAN write!',
        normalProp: 'Goodbye!',
      })).normalProp).toEqual('Goodbye!');
    });
  })
}