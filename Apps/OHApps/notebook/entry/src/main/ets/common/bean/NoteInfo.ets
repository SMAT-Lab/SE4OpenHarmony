/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 
/**
 * NoteInfo
 *
 * @param id
 * @param date
 * @param title
 * @param content
 * @param imageArr
 */
export default class NoteInfo {
  id: number;
  date: string;
  title: string;
  content: string;
  imageArr: string;

  constructor(id: number, date: string, title: string, content: string, imageArr: string) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.content = content;
    this.imageArr = imageArr;
  }
}

