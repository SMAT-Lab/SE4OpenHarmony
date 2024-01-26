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


import Age from './Age'

export default class  Face{

    private readonly  _x:number;
    private readonly  _y:number;
    private readonly  _width:number;
    private readonly  _height:number;

    private readonly  _name:string;

    private readonly  _age:Age;

    public constructor( x:number,  y:number,  width:number,  height:number, name:string,  age:Age)
    {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._name = name;
        this._age = age;
    }

    public  getX():number
    {
        return this._x;
    }

    public  getY():number
    {
        return this._y;
    }

    public  getWidth():number
    {
        return this._width;
    }

    public  getHeight():number
    {
        return this._height;
    }
    public  getName():string
    {
        return this._name;
    }

    public  getAge():Age
    {
        return this._age;
    }
    public  toString():string
    {
        var result:string = '';
        result.concat("x: ").concat(String(this._x));
        result.concat(" y: ").concat(String(this._y));
        result.concat(" width: ").concat(String(this._width));
        result.concat(" height: ").concat(String(this._height));
        if (this._name != null)
            result.concat(" name: ").concat(this._name);
        if (this._age != null)
            result.concat(" age: ").concat(this._age.toFriendlyString());
        return result.toString();
    }
}