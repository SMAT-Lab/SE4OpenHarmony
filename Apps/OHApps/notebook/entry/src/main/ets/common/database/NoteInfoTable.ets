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
 
 import data_rdb from '@ohos.data.relationalStore';
import { NOTE_INFO, STORE_CONFIG } from '../constants/CommonConstants'
import NoteInfo from '../bean/NoteInfo'
import { Logger } from '../utils/log/Logger';

const Tag = 'noteInfo'

export class NoteInfoTable {
  rdbStore: data_rdb.RdbStore // RdbStore

  /**
   * 获取RdbStore实例
   * @param callback
   */
  getRdbStore(callback) {
    // RdbStore存在
    if (this.rdbStore) {
      callback();
      return
    }
    // StoreConfig
    const CONFIG = {
      name: STORE_CONFIG.name,
      securityLevel: data_rdb.SecurityLevel.S1
    }
    // RdbStore不存在，获取
    data_rdb.getRdbStore(globalThis.context, CONFIG, (err, RdbStore) => {
      if (err) {
        Logger.info(Tag, "Get RdbStore failed, err: " + err);
        return
      }
      // 保存到全局
      this.rdbStore = RdbStore;
      Logger.info(Tag, "Get RdbStore successfully.");
      // 创建数据表
      RdbStore.executeSql(NOTE_INFO.sqlCreate, null, function (err) {
        if (err) {
          Logger.info(Tag, "ExecuteSql failed, err: " + err);
          return
        }
        Logger.info(Tag, 'Create table done.');
        callback();
      })
    })
  }

  /**
   * 插入数据
   * @param noteInfo 笔记信息
   * @param callback 插入成功的回调方法
   */
  insertNote(noteInfo: NoteInfo, callback) {
    try {
      // 获取RdbStore
      this.getRdbStore(() => {
        // 数据格式转换
        const valueBucket = generateBucket(noteInfo);
        // 插入数据
        this.rdbStore.insert(NOTE_INFO.tableName, valueBucket, function (status, rowId) {
          if (status) {
            Logger.info(Tag, "Insert is failed");
            return;
          }
          Logger.info(Tag, "Insert is successful, rowId = " + rowId);
          callback(true);
        })
      })
    } catch (err) {
      callback(false);
      Logger.info(Tag, err);
    }
  }

  /**
   * 通过ID删除笔记
   * @param id 笔记id
   * @param callback 删除成功的回调方法
   */
  deleteById(id, callback) {
    try {
      // 获取RdbStore
      this.getRdbStore(() => {
        // 获取RdbPredicates
        let predicates = new data_rdb.RdbPredicates(NOTE_INFO.tableName);
        // 匹配id字段
        predicates.equalTo("id", id);
        // 删除数据
        this.rdbStore.delete(predicates, function (err, rows) {
          if (err) {
            Logger.info(Tag, "Delete failed, err: " + err);
            return
          }
          Logger.info(Tag, "Delete rows: " + rows);
          callback(true);
        })
      })
    } catch (err) {
      callback(false);
      Logger.info(Tag, err);
    }
  }

  /**
   * 修改笔记信息
   * @param noteInfo 笔记信息
   * @param callback 更新成功的回调函数
   */
  updateNote(noteInfo: NoteInfo, callback) {
    try {
      // 获取RdbStore
      this.getRdbStore(() => {
        // 数据格式转换
        const valueBucket = generateBucket(noteInfo);
        Logger.info(Tag, " updateNote " + JSON.stringify(valueBucket));
        // 获取RdbPredicates
        let predicates = new data_rdb.RdbPredicates(NOTE_INFO.tableName);
        // 匹配id字段
        predicates.equalTo("id", noteInfo.id);
        // 更新数据
        this.rdbStore.update(valueBucket, predicates, function (err, rows) {
          if (err) {
            Logger.info(Tag, "Updated failed, err: " + err);
            callback(false);
            return
          }
          Logger.info(Tag, "Updated row count: " + rows);
          callback(true);
        })
      })
    } catch (err) {
      callback(false);
      Logger.info(Tag, err);
    }
  }

  /**
   * 查询全部笔记
   * @param callback 查询成功的回调函数
   */
  queryAll(callback) {
    try {
      // 获取RdbStore
      this.getRdbStore(() => {
        // 获取RdbPredicates
        let predicates = new data_rdb.RdbPredicates(NOTE_INFO.tableName)
        // 按照date字段降序排序
        predicates.orderByDesc('date');
        // 查询数据
        this.rdbStore.query(predicates, NOTE_INFO.columns, (err, resultSet) => {
          if (err) {
            Logger.info(Tag, "query failed, err: " + err)
            return
          }
          let result: Array<NoteInfo> = []
          let count = resultSet.rowCount
          if (count === 0) {
            callback(result)
          } else {
            // 跳转到第一行
            resultSet.goToFirstRow()
            for (let i = 0;i < count; i++) {
              let tem = new NoteInfo(0, '', '', '', '')
              // 获取数据
              tem.id = resultSet.getDouble(resultSet.getColumnIndex('id'))
              tem.date = resultSet.getString(resultSet.getColumnIndex('date'))
              tem.title = resultSet.getString(resultSet.getColumnIndex('title'))
              tem.content = resultSet.getString(resultSet.getColumnIndex('content'))
              tem.imageArr = resultSet.getString(resultSet.getColumnIndex('imageArr'))
              result[i] = tem
              // 跳转到下一行
              resultSet.goToNextRow()
            }
            resultSet.close()
            callback(result)
          }
        })
      })
    } catch (err) {
      callback([]);
      Logger.info(Tag, err);
    }
  }
}

// 数据转换
function generateBucket(noteInfo: NoteInfo) {
  let obj = {};
  NOTE_INFO.columns.forEach((item) => {
    if (item != 'id') {
      obj[item] = noteInfo[item];
    }
  });
  return obj;
}





