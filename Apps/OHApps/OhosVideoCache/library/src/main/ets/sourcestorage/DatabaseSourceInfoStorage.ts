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

import SourceInfo from '../SourceInfo';
import SourceInfoStorage from './SourceInfoStorage';
import Preconditions from '../Preconditions'
import relationalStore from '@ohos.data.relationalStore';
import { ValuesBucket } from '@ohos.data.ValuesBucket'
import { Context } from '@ohos.abilityAccessCtrl';

export default class DatabaseSourceInfoStorage implements SourceInfoStorage {
  private DB_NAME: string = "VideoCache.db";
  private TABLE: string = "SourceInfo";
  private COLUMN_ID: string = "ID";
  private COLUMN_URL: string = "URL";
  private COLUMN_LENGTH: string = "LENGTH";
  private COLUMN_MIME: string = "MIME";
  private ALL_COLUMNS: string[] = [this.COLUMN_ID, this.COLUMN_URL, this.COLUMN_LENGTH, this.COLUMN_MIME];
  private CREATE_SQL: string =
    "CREATE TABLE " + this.TABLE + " (" +
    this.COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
    this.COLUMN_URL + " TEXT NOT NULL," +
    this.COLUMN_MIME + " TEXT," +
    this.COLUMN_LENGTH + " INTEGER" +
    ");";
  private store: relationalStore.RdbStore | null = null;

  constructor(context: Context) {
    Preconditions.checkNotNull(context);
    const self = this;
    const STORE_CONFIG: relationalStore.StoreConfig = {
      name: this.DB_NAME,
      securityLevel: relationalStore.SecurityLevel.S1,
      encrypt: false
    }
    relationalStore.getRdbStore(context, STORE_CONFIG).then((result) => {
      self.store = result;
      self.createTable();
    })
  }

  private createTable() {
    if (this.store) {
      this.store.executeSql(this.CREATE_SQL, null, () => {
      })
    }
  }

  public onCreate(): void {
    this.createTable();
  }

  public onUpgrade(): void {
    throw new Error("Should not be called. There is no any migration");
  }

  release(): void {
    // close(); 关闭数据库
  }

  async put(url: string, sourceInfo: SourceInfo): Promise<void> {
    const self = this;
    if (!self.store) {
      return new Promise((resolve, reject) => {
        reject(new Error("store is not create"))
      })
    }
    try{
      Preconditions.checkAllNotNull(url, sourceInfo);
      let sourceInfoFromDb = await self.get(url);
      let exist = sourceInfoFromDb != null;
      let contentValues = self.convert(sourceInfo);
      if (exist) {
        let predicates = new relationalStore.RdbPredicates(self.TABLE)
        predicates.equalTo(self.COLUMN_URL, url)
        await self.store !!.update(contentValues, predicates);
      } else {
        await self.store !!.insert(self.TABLE, contentValues);
      }
      return new Promise((resolve,reject) => {
        resolve();
      })
    }catch(err){
      return Promise.reject(err)
    }
    
    

  }

  async get(url: string): Promise<SourceInfo | null> {
    const self = this;
    if (!self.store) {
      return new Promise((resolve, reject) => {
        return reject(new Error("store is null"))
      })
    }
    let resultSet: relationalStore.ResultSet|null = null;
    try {
    Preconditions.checkNotNull(url);

      let predicates = new relationalStore.RdbPredicates(self.TABLE)
      predicates.equalTo(self.COLUMN_URL, url)
      resultSet = await self.store !!.query(predicates, self.ALL_COLUMNS)
      if (!resultSet) {
        return Promise.resolve(null);
      }
      let isExit = resultSet.goToFirstRow();
      if (!isExit) {
        return Promise.resolve(null);
      }
      let columnUrl = resultSet.getString(resultSet.getColumnIndex(self.COLUMN_URL))
      let length = resultSet.getLong(resultSet.getColumnIndex(self.COLUMN_LENGTH))
      let mime = resultSet.getString(resultSet.getColumnIndex(self.COLUMN_MIME))
      let info = new SourceInfo(columnUrl, length, mime)
      return new Promise((resolve, reject) => {
        resolve(info)
      })
    } catch (err) {
      return Promise.reject(err)
    } finally {
      if (resultSet) {
        resultSet.close()
      }
    }
  }

  private convert(sourceInfo: SourceInfo): ValuesBucket {
    this.COLUMN_URL
    let values: ValuesBucket = {
      "URL": sourceInfo.url,
      "LENGTH": sourceInfo.length,
      "MIME": sourceInfo.mime,
    };
    return values;
  }
}