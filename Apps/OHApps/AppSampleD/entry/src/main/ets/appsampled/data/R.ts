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
export default class R{
  private success: boolean;
  private message: string;
  private code: number;
  private data: any;

  public getSuccess(): boolean{
    return this.success;
  }
  public setSuccess(success: boolean){
    this.success = success;
  }
  public getMessage(): string{
    return this.message;
  }
  public setMessage(message: string){
    this.message = message;
  }
  public getCode(): number{
    return this.code;
  }
  public setCode(code: number){
    this.code = code;
  }
  public getData(): any{
    return this.data;
  }
  public setData(data: any){
    this.data = data;
  }
}