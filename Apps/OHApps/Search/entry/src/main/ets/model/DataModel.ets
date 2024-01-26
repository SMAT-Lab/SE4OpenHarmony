/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

export interface BookModel {
  title: string
  introduction: string
  image: Resource
}

const BOOKS: BookModel[] = [
  { title: 'My diary', introduction: 'I am happy today', image: $r('app.media.book_img1') },
  { title: 'Cat', introduction: 'I have a cat', image: $r('app.media.book_img2') },
  { title: 'Happy', introduction: 'Have fun every day', image: $r('app.media.book_img3') },
  { title: 'Sentiment', introduction: 'I\'m not angry', image: $r('app.media.book_img4') },
  { title: 'Tree', introduction: 'Small tree observation diary', image: $r('app.media.book_img1') },
  { title: 'I am very kind', introduction: 'I am very kind', image: $r('app.media.book_img2') },
  { title: 'Seahorse Daddy', introduction: 'Big-bellied hippocampus dad', image: $r('app.media.book_img3') },
  { title: 'Butterfly', introduction: 'Butterfly', image: $r('app.media.book_img4') },
  { title: 'Good friend', introduction: 'Good friends are with you all your life', image: $r('app.media.book_img1') }
]

export class DataModel {
  private books: Array<BookModel> = BOOKS

  constructor() {
  }

  query(key: string) {
    let result: Array<BookModel> = []
    this.books.forEach((item) => {
      if (item.title.match(key) || item.introduction.match(key)) {
        result.push(item)
      }
    })
    return result
  }

  getAllData() {
    return this.books
  }
}

export default new DataModel()