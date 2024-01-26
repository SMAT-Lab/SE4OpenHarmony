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
import { model10, model11, model12, model13, model14, model15, model16,
  model17,
  model18,
  model19,
  model2,
  model20,
  model21,
  model22,
  model23,
  model24,
  model25,
  model26,
  model27,
  model28,
  model29,
  model3,
  model30,
  model31,
  model32,
  model33,
  model34,
  model35,
  model36,
  model37,
  model38,
  model39,
  model40,
  model42,
  model8,
  model9 } from '../utils/model';

export default function basic_functionalityTest() {
  describe('basic_functionalityTest', () =>  {
    _it('should convert instance of the given object to plain javascript object and should expose all properties since its a default behaviour', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number|null = 0;
        firstName: string = "";
        lastName: string = "";
        password: string = "";
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';



      const fromExistUser:User = new User();
      fromExistUser.id = 1;
      
      const plainUser:User = instanceToPlain(user) as User;

      expect(plainUser instanceof User).toBe(false);
      

      expect(plainUser).toEqual(model2);
      

      const plainUser2:User = classToPlainFromExist(user, { id: 1, age: 27 }) as User;
      

      expect(plainUser2 instanceof User).toBe(false);
      

      expect(plainUser2).toEqual(model10);
      
      const sourceValue:Record<string,string> = {
        "firstName": 'Umed',
        "lastName": 'Khudoiberdiev',
        "password": 'imnosuperman',
      }



      const transformedUser:User = plainToInstance(User, sourceValue);
      expect(transformedUser instanceof User).toBe(true);
      expect(transformedUser).toEqual(model2);
      

      const fromExistTransformedUser:User = plainToClassFromExist(fromExistUser, sourceValue);
      expect(fromExistTransformedUser instanceof User).toBe(true);
      expect(fromExistTransformedUser).toEqual(model12);
      

      const classToClassUser:User = instanceToInstance(user);
      expect(classToClassUser instanceof User ).toBe(true);
      expect(classToClassUser).toEqual(user);
      expect(classToClassUser).toEqual(model2);
      



    });

    _it('should exclude extraneous values if the excludeExtraneousValues option is set to true', () => {
      defaultMetadataStorage.clear();

      class User {
        @Expose() id: number = 0;
        @Expose() firstName: string = "";
        @Expose() lastName: string = "";
      }



      const transformedUser:User = plainToInstance(User, model11);
      expect(transformedUser instanceof User ).toBe(true);
      expect(transformedUser).toHaveProperty('age');
      expect(transformedUser.id).toBeUndefined();

      const transformedUserWithoutExtra:User = plainToInstance(User, model11, { excludeExtraneousValues: true });
      expect(transformedUserWithoutExtra instanceof User).toBe(true);
      expect(transformedUserWithoutExtra).not.toHaveProperty('age');
    });

    _it('should exclude extraneous values if both excludeExtraneousValues and ignoreDecorators option is set to true', () => {
      // fixes https://github.com/typestack/class-transformer/issues/533
      defaultMetadataStorage.clear();

      class ExampleClass {
        @Exclude()
        public valueOne!: number;

        @Expose()
        public valueTwo!: number;
      }


      const sourceValue:Record<string,number|boolean> = { "valueOne": 42, "valueTwo": 42, "extra": true, "_otherExtra": true }
      const instance:ExampleClass = plainToInstance(
        ExampleClass,
        sourceValue,
        {
          ignoreDecorators: true,
          excludeExtraneousValues: true,
        }
      );

      expect(instance instanceof ExampleClass ).toBe(true);
      expect(instance).toEqual(model13);


    });

    _it('should exclude all objects marked with @Exclude() decorator', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number = 0;
        firstName: string = "";
        lastName: string = "";
        @Exclude()
        password: string = "";
      }

      const user:User= new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';



      const fromExistUser = new User();
      fromExistUser.id = 1;

      const plainUser: User = instanceToPlain(user) as User;
      expect(plainUser instanceof User).toBe(false);

      expect(plainUser).toEqual(model42);
      expect(plainUser.password).toBeUndefined();






    });

    _it('should exclude all properties from object if whole class is marked with @Exclude() decorator', () => {
      defaultMetadataStorage.clear();

      @Exclude()
      class User {
        id: number = 0;
        firstName: string = "";
        lastName: string = "";
        password: string = "";
      }

      interface FromPlainUser {
        firstName: string,
        lastName: string,
        password: string,
      }
      const fromPlainUser:FromPlainUser = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      const fromExistUser = new User();
      fromExistUser.id = 1;

      const plainUser: User = instanceToPlain(user) as User;
      expect(plainUser instanceof User).toBe(false);

      expect(plainUser).toEqual(model8);

      expect(plainUser.firstName).toBeUndefined();
      expect(plainUser.lastName).toBeUndefined();
      expect(plainUser.password).toBeUndefined();

      interface ExistUser { id: number, age: number }
      const existUser:ExistUser = { id: 1, age: 27 };
      const plainUser2:User = classToPlainFromExist(user, existUser) as User;
      expect(plainUser2 instanceof User ).toBe(false);
      expect(plainUser2).toEqual(model21);
      expect(plainUser2).toEqual(existUser);



    });

    _it('should exclude all properties from object if whole class is marked with @Exclude() decorator, but include properties marked with @Expose() decorator', () => {
      defaultMetadataStorage.clear();

      @Exclude()
      class User {
        id: number = 0;

        @Expose()
        firstName: string = "";

        @Expose()
        lastName: string = "";

        password: string = "";
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      interface FromPlainUser {
        firstName: string,
        lastName: string,
        password: string,
      }
      const fromPlainUser:FromPlainUser = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const fromExistUser:User = new User();
      fromExistUser.id = 1;



      interface ExistUser { id: number, age: number }
      const existUser:ExistUser = { id: 1, age: 27 };
      const plainUser2:User = classToPlainFromExist(user, existUser) as User;
      expect(plainUser2 instanceof User).toBe(false);
      expect(plainUser2).toEqual(model23);
      expect(plainUser2).toEqual(existUser);




    });

    _it('should exclude all properties from object if its defined via transformation options, but include properties marked with @Expose() decorator', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number = 0;

        @Expose()
        firstName: string = "";

        @Expose()
        lastName: string = "";

        password: string = "";
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';



      const fromExistUser = new User();
      fromExistUser.id = 1;

      const classToClassFromExistUser:User = classToClassFromExist(user, fromExistUser, { strategy: 'excludeAll' });
      expect(classToClassFromExistUser instanceof User).toBe(true);
      expect(classToClassFromExistUser).not.toEqual(user);


    });

    _it('should expose all properties from object if its defined via transformation options, but exclude properties marked with @Exclude() decorator', () => {
      defaultMetadataStorage.clear();

      class User {
        id?: number = 0;
        firstName: string = "";

        @Exclude()
        lastName: string = "";

        @Exclude()
        password: string = "";
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      const fromPlainUser:User = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const fromExistUser = new User();
      fromExistUser.id = 1;

      const plainUser:User = instanceToPlain(user, { strategy: 'exposeAll' }) as User;
      expect(plainUser instanceof User).toBe(false);
      expect(plainUser.lastName).toBeUndefined();
      expect(plainUser.password).toBeUndefined();


      const plainUser2:User = classToPlainFromExist(user, { id: 1, age: 27 }, { strategy: 'exposeAll' }) as User;
      expect(plainUser2 instanceof User).toBe(false);









    });

    // _it('should convert values to specific types if they are set via @Type decorator', () => {
    //   defaultMetadataStorage.clear();
    //
    //   class User {
    //     id: number;
    //
    //     @Type(type => String)
    //     firstName: string;
    //
    //     @Type(type => String)
    //     lastName: string;
    //
    //     @Type(type => Number)
    //     password: number;
    //
    //     @Type(type => Boolean)
    //     isActive: boolean;
    //
    //     @Type(type => Date)
    //     registrationDate: Date;
    //
    //     @Type(type => String)
    //     lastVisitDate: string;
    //
    //     @Type(type => Buffer)
    //     uuidBuffer: Buffer;
    //
    //     @Type(type => String)
    //     nullableString?: null | string;
    //
    //     @Type(type => Number)
    //     nullableNumber?: null | number;
    //
    //     @Type(type => Boolean)
    //     nullableBoolean?: null | boolean;
    //
    //     @Type(type => Date)
    //     nullableDate?: null | Date;
    //
    //     @Type(type => Buffer)
    //     nullableBuffer?: null | Buffer;
    //   }
    //
    //   const date = new Date();
    //   const user = new User();
    //   const uuid = Buffer.from('1234');
    //   user.firstName = 321 as any;
    //   user.lastName = 123 as any;
    //   user.password = '123' as any;
    //   user.isActive = '1' as any;
    //   user.registrationDate = date.toString() as any;
    //   user.lastVisitDate = date as any;
    //   user.uuidBuffer = uuid as any;
    //   user.nullableString = null as any;
    //   user.nullableNumber = null as any;
    //   user.nullableBoolean = null as any;
    //   user.nullableDate = null as any;
    //   user.nullableBuffer = null as any;
    //
    //   const fromPlainUser = {
    //     firstName: 321,
    //     lastName: 123,
    //     password: '123',
    //     isActive: '1',
    //     registrationDate: date.toString(),
    //     lastVisitDate: date,
    //     uuidBuffer: uuid,
    //     nullableString: null as null | string,
    //     nullableNumber: null as null | string,
    //     nullableBoolean: null as null | string,
    //     nullableDate: null as null | string,
    //     nullableBuffer: null as null | string,
    //   };
    //
    //   const fromExistUser = new User();
    //   fromExistUser.id = 1;
    //
    //   const plainUser: any = instanceToPlain(user, { strategy: 'exposeAll' });
    //   expect(plainUser).not.toBeInstanceOf(User);
    //   expect(plainUser).toEqual({
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    //
    //   const existUser = { id: 1, age: 27 };
    //   const plainUser2 = classToPlainFromExist(user, existUser, { strategy: 'exposeAll' });
    //   expect(plainUser2).not.toBeInstanceOf(User);
    //   expect(plainUser2).toEqual({
    //     id: 1,
    //     age: 27,
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    //   expect(plainUser2).toEqual(existUser);
    //
    //   const transformedUser = plainToInstance(User, fromPlainUser, { strategy: 'exposeAll' });
    //   expect(transformedUser).toBeInstanceOf(User);
    //   expect(transformedUser).toEqual({
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    //
    //   const fromExistTransformedUser = plainToClassFromExist(fromExistUser, fromPlainUser, { strategy: 'exposeAll' });
    //   expect(fromExistTransformedUser).toBeInstanceOf(User);
    //   expect(fromExistTransformedUser).toEqual({
    //     id: 1,
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    //
    //   const classToClassUser = instanceToInstance(user, { strategy: 'exposeAll' });
    //   expect(classToClassUser).toBeInstanceOf(User);
    //   expect(classToClassUser).not.toEqual(user);
    //   expect(classToClassUser).toEqual({
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    //
    //   const classToClassFromExistUser = classToClassFromExist(user, fromExistUser, { strategy: 'exposeAll' });
    //   expect(classToClassFromExistUser).toBeInstanceOf(User);
    //   expect(classToClassFromExistUser).not.toEqual(user);
    //   expect(classToClassFromExistUser).toEqual(fromExistUser);
    //   expect(classToClassFromExistUser).toEqual({
    //     id: 1,
    //     firstName: '321',
    //     lastName: '123',
    //     password: 123,
    //     isActive: true,
    //     registrationDate: new Date(date.toString()),
    //     lastVisitDate: date.toString(),
    //     uuidBuffer: uuid,
    //     nullableString: null,
    //     nullableNumber: null,
    //     nullableBoolean: null,
    //     nullableDate: null,
    //     nullableBuffer: null,
    //   });
    // });

    _it('should transform nested objects too and make sure their decorators are used too', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;
        name: string = "";

        @Exclude()
        filename: string = "";

        uploadDate: Date = new Date();
      }

      class User {
        firstName: string = "";
        lastName: string = "";

        @Exclude()
        password: string = "";

        photo: Photo = new Photo(); // type should be automatically guessed
      }

      const photo = new Photo();
      photo.id = 1;
      photo.name = 'Me';
      photo.filename = 'iam.jpg';
      photo.uploadDate = new Date();

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.photo = photo;

      const plainUser:User = instanceToPlain(user, { strategy: 'exposeAll' }) as User;

      expect(plainUser instanceof User).toBe(false);

      expect(plainUser.photo instanceof Photo).toBe(false);

      expect(plainUser.password).toBeUndefined();

      expect(plainUser.photo.filename).toBeUndefined();

      expect(plainUser.photo.uploadDate).toEqual(photo.uploadDate);



      const plainUser2:User = classToPlainFromExist(user, { id: 1, age: 27, photo: { id: 2, description: 'photo' } }, { strategy: 'exposeAll' }) as User;

      expect(plainUser2 instanceof User).toBe(false);
      expect(plainUser2.photo instanceof Photo).toBe(false);


      expect(plainUser2.password).toBeUndefined();
      expect(plainUser2.photo.filename).toBeUndefined();
      expect(plainUser2.photo.uploadDate).toEqual(photo.uploadDate);
    });

    _it('should transform nested objects too and make sure given type is used instead of automatically guessed one', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;
        name: string = "";

        @Exclude()
        filename: string = "";
      }

      class ExtendedPhoto {
        id: number = 0;

        @Exclude()
        name: string = "";

        filename: string = "";
      }

      class User {
        id: number = 0;
        firstName: string = "";
        lastName: string = "";

        @Exclude()
        password: string = "";

        @Type(() => ExtendedPhoto) // force specific type
        photo: Photo = new Photo();
      }

      const photo = new Photo();
      photo.id = 1;
      photo.name = 'Me';
      photo.filename = 'iam.jpg';

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.photo = photo;

      const plainUser: User = instanceToPlain(user) as User;


      expect(plainUser instanceof User).toBe(false);

      expect(plainUser.password).toBeUndefined();
      expect(plainUser.photo.name).toBeUndefined();
    });

    _it('should convert given plain object to class instance object', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;
        name: string = "";

        @Exclude()
        filename: string = "";

        metadata: string = "";
        uploadDate: Date = new Date();
      }

      class User {
        id: number = 0;
        firstName: string = "";
        lastName: string  = "";

        @Exclude()
        password: string = "";

        @Type(() => Photo)
        photo: Photo = new Photo();
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.photo = new Photo();
      user.photo.id = 1;
      user.photo.name = 'Me';
      user.photo.filename = 'iam.jpg';
      user.photo.uploadDate = new Date();


      const fromExistUser = new User();
      fromExistUser.id = 1;
      const fromExistPhoto = new Photo();
      fromExistPhoto.metadata = 'taken by Camera';
      fromExistUser.photo = fromExistPhoto;


      const photo:Record<string,string|number|Date> = {
          "id": 1,
          "name": 'Me',
          "filename": 'iam.jpg',
          "uploadDate": new Date(),
        }
      const sourceValue:Record<string,string|Record<string,string|number|Date>> = {
        "firstName": 'Umed',
        "lastName": 'Khudoiberdiev',
        "password": 'imnosuperman',
        "photo": photo,
      }
      const transformedUser:User = plainToInstance(User, sourceValue);

      expect(transformedUser instanceof User).toBe(true);

      expect(transformedUser.photo instanceof Photo).toBe(true);


      const fromExistTransformedUser:User = plainToClassFromExist(fromExistUser,sourceValue);
      expect(fromExistTransformedUser).toEqual(fromExistUser);

      expect(fromExistTransformedUser.photo).toEqual(fromExistPhoto);

      const classToClassUser:User = instanceToInstance(user);
      expect(classToClassUser instanceof User).toBe(true);
      expect(classToClassUser.photo instanceof Photo).toBe(true);

      expect(classToClassUser).not.toEqual(user.photo);


      const classToClassFromExistUser:User = classToClassFromExist(user, fromExistUser);
      expect(classToClassFromExistUser instanceof User).toBe(true);
      expect(classToClassFromExistUser.photo instanceof Photo).toBe(true);

      expect(classToClassFromExistUser).not.toEqual(user.photo);
      expect(classToClassFromExistUser).toEqual(fromExistUser);
    });

    _it('should expose only properties that match given group', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;

        @Expose({
          groups: ['user', 'guest'],
        })
        filename: string = "";

        @Expose({
          groups: ['admin'],
        })
        status: number = 0;

        metadata: string = "";
      }

      class User {
        id: number = 0;
        firstName: string = "";

        @Expose({
          groups: ['user', 'guest'],
        })
        lastName: string = "";

        @Expose({
          groups: ['user'],
        })
        password: string = "";

        @Expose({
          groups: ['admin'],
        })
        isActive: boolean = true;

        @Type(() => Photo)
        photo: Photo = new Photo();

        @Expose({
          groups: ['admin'],
        })
        @Type(() => Photo)
        photos: Photo[] = [];
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.isActive = false;
      user.photo = new Photo();
      user.photo.id = 1;
      user.photo.filename = 'myphoto.jpg';
      user.photo.status = 1;
      user.photos = [user.photo];



      const fromExistUser = new User();
      fromExistUser.id = 1;
      fromExistUser.photo = new Photo();
      fromExistUser.photo.metadata = 'taken by Camera';

      const plainUser1:User = instanceToPlain(user) as User;
      

      expect(plainUser1 instanceof User).toBe(false);
      
      expect(plainUser1.lastName).toBeUndefined();
      
      expect(plainUser1.password).toBeUndefined();
      
      expect(plainUser1.isActive).toBeUndefined();

      const plainUser2:User = instanceToPlain(user, { groups: ['user'] }) as User;
      
      expect(plainUser2 instanceof User).toBe(false);
      
      expect(plainUser2.isActive).toBeUndefined();

      const photo:Record<string,string|number> = {
          "id": 1,
          "filename": 'myphoto.jpg',
          "status": 1,
        }

      const photos:Array<Record<string,string|number>> = [
          {
            "id": 1,
            "filename": 'myphoto.jpg',
            "status": 1,
          },
        ]

      const sourceValue:Record<string,string|boolean|Array<Record<string,string|number>>|Record<string,string|number>> = {
        "firstName": 'Umed',
        "lastName": 'Khudoiberdiev',
        "password": 'imnosuperman',
        "isActive": false,
        "photo": photo,
        "photos": photos,
      }
      const transformedUser2:User = plainToInstance(User, sourceValue , { groups: ['user'] });
      expect(transformedUser2 instanceof User).toBe(true);
      
      expect(transformedUser2.photo instanceof Photo).toBe(true);
      

      const fromExistTransformedUser:User = plainToClassFromExist(fromExistUser, sourceValue, { groups: ['user'] });
      
      expect(fromExistTransformedUser).toEqual(fromExistUser);
      
      expect(fromExistTransformedUser.photo).toEqual(fromExistUser.photo);
      

      const classToClassUser:User = instanceToInstance(user, { groups: ['user'] });
      
      expect(classToClassUser instanceof User).toBe(true);
      
      expect(classToClassUser.photo instanceof Photo).toBe(true);
      
      expect(classToClassUser).not.toEqual(user);
      
      expect(classToClassUser).not.toEqual(user.photo);
      

      const classToClassFromExistUser:User = classToClassFromExist(user, fromExistUser, { groups: ['user'] });
      
      expect(classToClassFromExistUser instanceof User).toBe(true);
      
      expect(classToClassFromExistUser.photo instanceof Photo).toBe(true);
      
      expect(classToClassFromExistUser).not.toEqual(user);
      
      expect(classToClassFromExistUser).not.toEqual(user.photo);
      
      expect(classToClassFromExistUser).toEqual(fromExistUser);
      

      const plainUser3:User = instanceToPlain(user, { groups: ['guest'] }) as User;
      
      expect(plainUser3 instanceof User).toBe(false);
      
      expect(plainUser3.password).toBeUndefined();
      
      expect(plainUser3.isActive).toBeUndefined();

      const transformedUser3:User = plainToInstance(User, sourceValue, { groups: ['guest'] });
      expect(transformedUser3 instanceof User).toBe(true);
      
      expect(transformedUser3.photo instanceof Photo).toBe(true);
      

      const plainUser4:User = instanceToPlain(user, { groups: ['admin'] }) as User;
      
      expect(plainUser4 instanceof User).toBe(false);
      
      expect(plainUser4.lastName).toBeUndefined();
      
      expect(plainUser4.password).toBeUndefined();

      const transformedUser4:User = plainToInstance(User, sourceValue, { groups: ['admin'] });
      
      expect(transformedUser4 instanceof User).toBe(true);
      
      expect(transformedUser4.photo instanceof Photo).toBe(true);
      
      expect(transformedUser4.photos[0] instanceof Photo).toBe(true);
      

      const plainUser5:User = instanceToPlain(user, { groups: ['admin', 'user'] }) as User;
      
      expect(plainUser5 instanceof User).toBe(false);
      

      const transformedUser5:User = plainToInstance(User, sourceValue, { groups: ['admin', 'user'] });
      expect(transformedUser5 instanceof User).toBe(true);

    _it('should expose only properties that match given version', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;

        @Expose({
          since: 1.5,
          until: 2,
        })
        filename: string = "";

        @Expose({
          since: 2,
        })
        status: number = 0;
      }

      class User {
        @Expose({
          since: 1,
          until: 2,
        })
        firstName: string = "";

        @Expose({
          since: 0.5,
        })
        lastName: string = "";

        @Exclude()
        password: string = "";

        @Type(() => Photo)
        photo: Photo = new Photo();

        @Expose({
          since: 3,
        })
        @Type(() => Photo)
        photos: Photo[] = [];
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.photo = new Photo();
      user.photo.id = 1;
      user.photo.filename = 'myphoto.jpg';
      user.photo.status = 1;
      user.photos = [user.photo];



      const plainUser1: User = instanceToPlain(user) as User;
      
      expect(plainUser1 instanceof User).toBe(false);
      

      expect(plainUser1).toEqual(model36);
      

      const transformedUser1:User = plainToInstance(User, sourceValue);
      
      expect(transformedUser1 instanceof User).toBe(true);
      
      expect(transformedUser1.photo instanceof Photo).toBe(true);
      
      expect(transformedUser1.photos[0] instanceof Photo).toBe(true);
      

      const plainUser2: User = instanceToPlain(user, { version: 0.3 }) as User;
      
      expect(plainUser2 instanceof User).toBe(false);
      
      expect(plainUser2).toEqual(model34);

      const transformedUser2:User = plainToInstance(User, model33, { version: 0.3 });
      
      expect(transformedUser2 instanceof User).toBe(true);
      
      expect(transformedUser2.photo instanceof Photo).toBe(true);
      

      const plainUser3: User = instanceToPlain(user, { version: 0.5 }) as User;
      
      expect(plainUser3 instanceof User).toBe(false);
      
      expect(plainUser3).toEqual(model35);

      const transformedUser3:User = plainToInstance(User, sourceValue, { version: 0.5 });
      
      expect(transformedUser3 instanceof User).toBe(true);
      
      expect(transformedUser3.photo instanceof Photo).toBe(true);
      

      const plainUser4: User = instanceToPlain(user, { version: 1 }) as User;
      
      expect(plainUser4 instanceof User).toBe(false);
      
      expect(plainUser4).toEqual(model37);

      const transformedUser4:User = plainToInstance(User, sourceValue, { version: 1 });
      
      expect(transformedUser4 instanceof User).toBe(true);
      
      expect(transformedUser4.photo instanceof Photo).toBe(true);
      

      const plainUser5: User = instanceToPlain(user, { version: 1.5 }) as User;
      expect(plainUser5 instanceof User).toBe(false);
      
      expect(plainUser5).toEqual(model38);

      const transformedUser5:User = plainToInstance(User, sourceValue, { version: 1.5 });
      
      expect(transformedUser5 instanceof User).toBe(true);
      
      expect(transformedUser5.photo instanceof Photo).toBe(true);
      

      const plainUser6:User = instanceToPlain(user, { version: 2 }) as User;
      
      expect(plainUser6 instanceof User).toBe(false);
      
      expect(plainUser6).toEqual(model39);

      const transformedUser6:User = plainToInstance(User,sourceValue, { version: 2 });
      
      expect(transformedUser6 instanceof User).toBe(true);
      
      expect(transformedUser6.photo instanceof Photo).toBe(true);
      

      const plainUser7:User = instanceToPlain(user, { version: 3 }) as User;
      
      expect(plainUser7 instanceof User).toBe(false);
      
      expect(plainUser7).toEqual(model40);

      const transformedUser7:User = plainToInstance(User, sourceValue, { version: 3 });
      
      expect(transformedUser7 instanceof User).toBe(true);
      
      expect(transformedUser7.photo instanceof Photo).toBe(true);
      
      expect(transformedUser7.photos[0] instanceof Photo).toBe(true);
      

    });

    _it('should expose method and accessors that have @Expose()', () => {
      defaultMetadataStorage.clear();

      class User {
        firstName: string = "";
        lastName: string = "";

        @Exclude()
        password: string = "";

        @Expose()
        get name(): string {
          return this.firstName + ' ' + this.lastName;
        }

        @Expose()
        getName(): string {
          return this.firstName + ' ' + this.lastName;
        }
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      interface FromPlainUser {
        firstName: string,
        lastName: string,
        password: string,
      }
      const fromPlainUser:FromPlainUser = {
        firstName: 'Umed',
        lastName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const plainUser: User = instanceToPlain(user) as User;
      expect(plainUser instanceof User).toBe(false);

      const transformedUser:User = plainToInstance(User, fromPlainUser);
      expect(transformedUser instanceof User).toBe(true);
      const likeUser = new User();
      likeUser.firstName = 'Umed';
      likeUser.lastName = 'Khudoiberdiev';
      expect(transformedUser).toEqual(likeUser);
    });

    _it('should expose with alternative name if its given', () => {
      defaultMetadataStorage.clear();

      class User {
        @Expose({ name: 'myName' })
        firstName: string  = "";

        @Expose({ name: 'secondName' })
        lastName: string = "";

        @Exclude()
        password: string = "";

        @Expose()
        get name(): string {
          return this.firstName + ' ' + this.lastName;
        }

        @Expose({ name: 'fullName' })
        getName(): string {
          return this.firstName + ' ' + this.lastName;
        }
      }

      const user = new User();
      user.firstName = 'Umed';
      user.lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';

      interface FromPlainUser {
        myName: string,
        secondName: string,
        password: string,
      }
      const fromPlainUser:FromPlainUser = {
        myName: 'Umed',
        secondName: 'Khudoiberdiev',
        password: 'imnosuperman',
      };

      const plainUser: User = instanceToPlain(user)  as User;
      expect(plainUser instanceof User).toBe(false);
      expect(plainUser).toEqual(model19);

      const transformedUser: User = plainToInstance(User, fromPlainUser);
      expect(transformedUser instanceof User).toBe(true);
      const likeUser = new User();
      likeUser.firstName = 'Umed';
      likeUser.lastName = 'Khudoiberdiev';
      expect(transformedUser).toEqual(likeUser);
    });

    _it('should exclude all prefixed properties if prefix is given', () => {
      defaultMetadataStorage.clear();

      class Photo {
        id: number = 0;
        $filename: string = "";
        status: number = 0;
      }

      class User {
        $system: string = "";
        _firstName: string = "";
        _lastName: string = "";

        @Exclude()
        password: string = "";

        @Type(() => Photo)
        photo: Photo = new Photo();

        @Expose()
        get name(): string {
          return this._firstName + ' ' + this._lastName;
        }
      }

      const user = new User();
      user.$system = '@#$%^&*token(*&^%$#@!';
      user._firstName = 'Umed';
      user._lastName = 'Khudoiberdiev';
      user.password = 'imnosuperman';
      user.photo = new Photo();
      user.photo.id = 1;
      user.photo.$filename = 'myphoto.jpg';
      user.photo.status = 1;

      interface Photo1 {
        id: number,
        $filename: string,
        status: number,
      }
      interface FromPlainUser{
        $system: string,
        _firstName: string,
        _lastName: string,
        password: string,
        photo: Photo1,
      }
      const fromPlainUser:FromPlainUser = {
        $system: '@#$%^&*token(*&^%$#@!',
        _firstName: 'Khudoiberdiev',
        _lastName: 'imnosuperman',
        password: 'imnosuperman',
        photo: {
          id: 1,
          $filename: 'myphoto.jpg',
          status: 1,
        },
      };

      const plainUser: User = instanceToPlain(user, { excludePrefixes: ['_', '$'] }) as User;
      expect(plainUser instanceof User).toBe(false);
      expect(plainUser).toEqual(model18);

      const transformedUser:User = plainToInstance(User, fromPlainUser, { excludePrefixes: ['_', '$'] });
      expect(transformedUser instanceof User).toBe(true);
      const likeUser = new User();
      likeUser.photo = new Photo();
      likeUser.photo.id = 1;
      likeUser.photo.status = 1;
      expect(transformedUser).toEqual(likeUser);
    });

    _it('should transform array', () => {
      defaultMetadataStorage.clear();

      class User {
        id: number = 0;
        firstName: string = "";
        lastName: string = "";

        @Exclude()
        password: string = "";

        @Expose()
        get name(): string {
          return this.firstName + ' ' + this.lastName;
        }
      }

      const user1 = new User();
      user1.firstName = 'Umed';
      user1.lastName = 'Khudoiberdiev';
      user1.password = 'imnosuperman';

      const user2 = new User();
      user2.firstName = 'Dima';
      user2.lastName = 'Zotov';
      user2.password = 'imnomesser';

      const users = [user1, user2];

      const plainUsers: User = instanceToPlain(users)as User;
      





      const plainUser2:Array<User> = classToPlainFromExist(users, [
        { id: 1, age: 27 },
        { id: 2, age: 30 },
      ])as Array<User>;
      
      expect(plainUser2).toEqual(model9);


      const sourceValue:Array<Record<string,string>> = [
        {
          "firstName": 'Umed',
          "lastName": 'Khudoiberdiev',
          "name": 'Umed Khudoiberdiev',
        },
        {
          "firstName": 'Dima',
          "lastName": 'Zotov',
          "name": 'Dima Zotov',
        },
      ]
      const transformedUser:Array<User> = plainToInstance(User, sourceValue);

      
      expect(transformedUser[0] instanceof User).toBe(true);
      
      expect(transformedUser[1] instanceof User ).toBe(true);
      const likeUser1 = new User();
      likeUser1.firstName = 'Umed';
      likeUser1.lastName = 'Khudoiberdiev';

      const likeUser2 = new User();
      likeUser2.firstName = 'Dima';
      likeUser2.lastName = 'Zotov';
      
      expect(transformedUser).toEqual([likeUser1, likeUser2]);

      const classToClassUsers:Array<User> = instanceToInstance(users);
      
      expect(classToClassUsers[0] instanceof User ).toBe(true);
      
      expect(classToClassUsers[1] instanceof User).toBe(true);
      
      expect(classToClassUsers[1]).not.toEqual(user1);

      const classUserLike1 = new User();
      classUserLike1.firstName = 'Umed';
      classUserLike1.lastName = 'Khudoiberdiev';

      const classUserLike2 = new User();
      classUserLike2.firstName = 'Dima';
      classUserLike2.lastName = 'Zotov';

      
      expect(classToClassUsers).toEqual([classUserLike1, classUserLike2]);

      const fromExistUser1 = new User();
      fromExistUser1.id = 1;

      const fromExistUser2 = new User();
      fromExistUser2.id = 2;

      const fromExistUsers = [fromExistUser1, fromExistUser2];

      const classToClassFromExistUser:Array<User> = classToClassFromExist(users, fromExistUsers);
      
      expect(classToClassFromExistUser[0] instanceof User).toBe(true);
      
      expect(classToClassFromExistUser[1] instanceof User).toBe(true);
      
      expect(classToClassFromExistUser[1]).not.toEqual(user1);
      
      expect(classToClassFromExistUser).toEqual(fromExistUsers);

      const fromExistUserLike1 = new User();
      fromExistUserLike1.id = 1;
      fromExistUserLike1.firstName = 'Umed';
      fromExistUserLike1.lastName = 'Khudoiberdiev';

      const fromExistUserLike2 = new User();
      fromExistUserLike2.id = 2;
      fromExistUserLike2.firstName = 'Dima';
      fromExistUserLike2.lastName = 'Zotov';

      
      expect(classToClassFromExistUser).toEqual([fromExistUserLike1, fromExistUserLike2]);
      
    });



    _it('should not pollute the prototype with a `__proto__` property', () => {
      interface PlainObject {
        admin?:undefined
      }
      const plainObject:PlainObject = {};
      classToPlainFromExist(JSON.parse('{"__proto__": { "admin": true }}'), plainObject);
      expect(plainObject.admin).toEqual(undefined);
    });



  })
})}