/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import relationalStore from '@ohos.data.relationalStore'; // 导入模块
let context
context = getContext(this) as any
const STORE_CONFIG = {
  name: 'RdbTest.db', // 数据库文件名
  securityLevel: relationalStore.SecurityLevel.S1 // 数据库安全级别
};

const SQL_CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS EMPLOYEE (NAME TEXT NOT NULL, SCORE INTEGER)'; // 建表Sql语句

export class Ranking {
  name: string;
  score: number;

  constructor(name, score) {
    this.name = name
    this.score = score
  }
}

export class RankTable {
  private store

  public getStore() {
    relationalStore.getRdbStore(context, STORE_CONFIG, (err, store) => {

      if (err) {
        console.error(`Failed to get RdbStore. Code:${err.code}, message:${err.message}`);
        return;
      }
      console.info(`Succeeded in getting RdbStore.`);
      store.executeSql(SQL_CREATE_TABLE); // 创建数据表
      this.store = store
      // 请确保获取到RdbStore实例后，再进行数据库的增、删、改、查等操作
    })
  }

  generateBucket(rank: Ranking) {
    const {name,score} = rank;
    return {
      name,
      score,
    };
  }

  public insertData(name: string, score: number) {
    let rank = new Ranking(name, score)
    let valueBucket = this.generateBucket(rank)
    console.info("store:" + JSON.stringify(this.store))
    this.store.insert('EMPLOYEE', valueBucket, (err, rowId) => {
      if (err) {
        console.error(`Failed to insert data. Code:${err.code}, message:${err.message}`);
        return;
      }
      console.info(`Succeeded in inserting data. rowId:${rowId}`);
    })

  }

  public queryAll(callback) {
    try {
      let predicates = new relationalStore.RdbPredicates("EMPLOYEE")
      this.store.query(predicates, null, (err, resultSet) => {
        if (err) {
          console.error(`Failed to query data. Code:${err.code}, message:${err.message}`);
          return;
        }
        console.info(`ResultSet column names: ${resultSet.columnNames}`);
        console.info(`ResultSet column count: ${resultSet.columnCount}`);
        let result: Array<Ranking> = [];
        let count = resultSet.rowCount;
        if (count == 0) {
          console.log("No data");
          callback(result);
        }
        else {
          resultSet.goToFirstRow();
          for (let i = 0;i < count; i++) {
            let rank = new Ranking("", 1);
            console.log("Data number: " + i);
            rank.name = resultSet.getString(resultSet.getColumnIndex('name'));
            rank.score = resultSet.getDouble(resultSet.getColumnIndex('score'));
            result[i] = rank;
            resultSet.goToNextRow();
          }
        }
        callback(result)
      })
    } catch (err) {
      callback([])
    }
  }
}
