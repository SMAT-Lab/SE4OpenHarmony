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
  classToClassFromExist,
  instanceToPlain,
  classToPlainFromExist,
  plainToInstance,
  plainToClassFromExist,
} from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';

import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { describe,it as _it,expect } from "../utils/utils";
import { model3, model7, model8,model2 } from '../utils/model';
interface PlainedUser {
  firstName: string,
  lastName: string,
  password: string,
}
interface PlainedUserOne {
  firstName:string;
  lastName: string;
}
export default function transformation_optionSpecTest() {

  describe('transformation_optionSpecTest', () =>  {
    _it('@Exclude with toPlainOnly set to true then it should be excluded only during instanceToPlain and classToPlainFromExist operations', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number;
        firstName: string;
        lastName: string;

        @Exclude({ toPlainOnly: true })
        password: string;

        constructor() {
          this.id = 0;
          this.firstName = "";
          this.lastName = "";
          this.password = "";
        }
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      interface PlainUser {
        id:number;
        firstName: string,
        lastName: string,
        password: string,
      }
      const plainUser:PlainUser = {
        id:0,
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const classedUser:User = plainToInstance(User, plainUser);
      expect(classedUser).toEqual(plainUser);
    });

    _it('@Exclude with toClassOnly set to true then it should be excluded only during plainToInstance and plainToClassFromExist operations', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number;
        firstName: string;
        lastName: string;

        @Exclude({ toClassOnly: true })
        password: string;

        constructor() {
          this.id = 0;
          this.firstName = "";
          this.lastName = "";
          this.password = ""
        }
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      interface PlainUser {
        firstName: string,
        lastName: string,
        password: string,
        id:number;

      }
      const plainUser:PlainUser = {
        id:0,
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const classedUser:User = plainToInstance(User, plainUser);

      expect(classedUser instanceof User).toBe(true);
      interface Value {
        id:number;
        firstName: string;
        lastName: string;
        password:string;
      }
      const value:Value = {
        id:0,
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password:""
      }
      expect(classedUser).toEqual(value);


      const plainedUser:PlainedUser = instanceToPlain(user) as PlainedUser;
      expect(plainedUser).toEqual(model2);
    });

    _it('@Expose with toClassOnly set to true then it should be excluded only during instanceToPlain and classToPlainFromExist operations', () => {
      defaultMetadataStorage.clear();

      @Exclude()
      class User {
        @Expose()
        firstName: string;

        @Expose()
        lastName: string;

        @Expose({ toClassOnly: true })
        password: string;

        constructor() {
          this.firstName = "";
          this.lastName = "";
          this.password = "";
        }
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      const plainUser:PlainedUser = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      interface Obj1 {
        firstName : string
        lastName :string,
      }
      const obj1:Obj1 = {
        firstName : 'Umed',
        lastName :'Khudoiberdiev',
      }
      const plainedUser:PlainedUserOne = instanceToPlain(user) as PlainedUserOne;

      expect(plainedUser).toEqual(obj1);

      expect(plainToInstance(User, plainUser) instanceof User ).toBe(true);


    });

    _it('@Expose with toPlainOnly set to true then it should be excluded only during instanceToPlain and classToPlainFromExist operations', () => {
      defaultMetadataStorage.clear();

      @Exclude()
      class User {
        @Expose()
        firstName: string;

        @Expose()
        lastName: string;

        @Expose({ toPlainOnly: true })
        password: string;

        constructor() {
          this.firstName = "";
          this.lastName = "";
          this.password = "";
        }
      }

      const user:User = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      const plainUser:PlainedUser = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };


      const plainedUser:PlainedUser = instanceToPlain(user) as PlainedUser;

      expect(plainedUser).toEqual(plainUser);

      expect(plainToInstance(User, plainUser) instanceof User ).toBe(true);
      expect(plainToInstance(User, plainUser)).toEqual(model3);
    });

    _it('should ignore undefined properties when exposeUnsetFields is set to false during class to plain', () => {
      defaultMetadataStorage.clear();

      @Exclude()
      class User {
        @Expose()
        firstName: string;

        @Expose()
        lastName: string;

        constructor() {
          this.firstName = "";
          this.lastName = "";
        }
      }



      expect(instanceToPlain(new User(), { exposeUnsetFields: true })).toEqual(model7);

      interface ExposeUnset {
        exposeUnsetFields:boolean
      }
      const exposeUnset:ExposeUnset =  { exposeUnsetFields: false }
      expect(plainToInstance(User, exposeUnset) instanceof User).toBe(true);

      expect(plainToInstance(User, exposeUnset)).toEqual(model7);
    });
  })
}