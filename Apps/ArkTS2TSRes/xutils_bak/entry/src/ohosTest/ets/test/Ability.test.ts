let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { HttpUtils, BitmapCacheListener, BitmapDisplayConfig, BitmapUtils, GlobalContext, HttpRedirectHandler, DbUpgradeListener } from '@ohos/xutils/';
import { HttpMethod } from '@ohos/xutils/';
import { RequestCallBack } from '@ohos/xutils/';
import { RequestParams } from '@ohos/xutils/';
import { ResponseInfo } from '@ohos/xutils/';
import { DbUtils } from '@ohos/xutils/';
import { QueryCallBack } from '@ohos/xutils/';
import { DaoConfig } from '@ohos/xutils';
import { Selector } from '@ohos/xutils';
import { User } from '../../../main/ets/entity/User';
import { Weather } from '../../../main/ets/entity/Weather';
import { valuesBuckets, newValuesBuckets } from '../../../main/ets/entity/Employee';
import { DB_NAME, TABLE_NAME, SQL_CREATE_TABLE, COLUMNS } from '../../../main/ets/entity/RdbConfig';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
let db: DbUtils;
export default function abilityTest() {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
        let config = new DaoConfig();
        config.setDbName(DB_NAME);
        config.setTableName(TABLE_NAME);
        config.setCreateTableSql(SQL_CREATE_TABLE);
        db = new DbUtils(config);
        db.setCallback(new DbCallBack());
        db.createTableIfNotExist();
        // Presets an action, which is performed only once before all test cases of the test suite start.
        // This API supports only one parameter: preset action function.
    });
    beforeEach(() => {
        // Presets an action, which is performed before each unit test case starts.
        // The number of execution times is the same as the number of test cases defined by **it**.
        // This API supports only one parameter: preset action function.
    });
    afterEach(() => {
        // Presets a clear action, which is performed after each unit test case ends.
        // The number of execution times is the same as the number of test cases defined by **it**.
        // This API supports only one parameter: clear action function.
    });
    afterAll(() => {
        // Presets a clear action, which is performed after all test cases of the test suite end.
        // This API supports only one parameter: clear action function.
    });
    describe('xUtils_Test', () => {
        let httpUtils: any = new HttpUtils();
        it("setTextCharset_utf8", 0, () => {
            httpUtils.setTextCharset('UTF-8');
            expect(httpUtils.responseTextCharset).assertEqual('UTF-8');
        });
        it("setTextCharset_utf16", 0, () => {
            httpUtils.setTextCharset('UTF-16');
            expect(httpUtils.responseTextCharset).assertEqual('UTF-16');
        });
        it("HttpUtils_setTextCharset_US_ASCII", 0, () => {
            httpUtils.setTextCharset('US_ASCII');
            expect(httpUtils.responseTextCharset).assertEqual('US_ASCII');
        });
        it("HttpUtils_setTextCharset_GBK", 0, () => {
            httpUtils.setTextCharset('GBK');
            expect(httpUtils.responseTextCharset).assertEqual('GBK');
        });
        it("HttpUtils_setHttpRedirectHandler", 0, () => {
            let redirect = new redirectHandler();
            httpUtils.setHttpRedirectHandler(redirect);
            expect(httpUtils.httpRedirectHandler).assertEqual(redirect);
        });
        it("setCurrentHttpCacheExpiry", 0, () => {
            let httpUtils: any = new HttpUtils().setCurrentHttpCacheExpiry(100);
            expect(httpUtils.currentRequestExpiry).assertEqual(100);
        });
        it("setCurrentHttpCacheExpiry_negative", 0, () => {
            let httpUtils: any = new HttpUtils().setCurrentHttpCacheExpiry(-1000);
            expect(httpUtils.currentRequestExpiry).assertEqual(-1000);
        });
        it("setCurrentHttpCacheExpiry_null", 0, () => {
            let httpUtils: any = new HttpUtils().setCurrentHttpCacheExpiry(null);
            expect(httpUtils.currentRequestExpiry).assertNull();
        });
        it("setCurrentHttpCacheExpiry_undefined", 0, () => {
            let httpUtils: any = new HttpUtils().setCurrentHttpCacheExpiry(undefined);
            expect(httpUtils.currentRequestExpiry).assertUndefined();
        });
        it("setTimeout", 0, () => {
            let httpUtils: any = new HttpUtils().setTimeout(100);
            expect(httpUtils.connectTimeout).assertEqual(100);
        });
        it("setTimeout_negative", 0, () => {
            let httpUtils: any = new HttpUtils().setTimeout(-100);
            expect(httpUtils.connectTimeout).assertEqual(-100);
        });
        it("setTimeout_null", 0, () => {
            let httpUtils: any = new HttpUtils().setTimeout(null);
            expect(httpUtils.connectTimeout).assertEqual(null);
        });
        it("setTimeout_undefined", 0, () => {
            let httpUtils: any = new HttpUtils().setTimeout(undefined);
            expect(httpUtils.connectTimeout).assertEqual(undefined);
        });
        it("setSoTimeout", 0, () => {
            let httpUtils: any = new HttpUtils().setSoTimeout(200);
            expect(httpUtils.readTimeout).assertEqual(200);
        });
        it("setSoTimeout_negative", 0, () => {
            let httpUtils: any = new HttpUtils().setSoTimeout(-200);
            expect(httpUtils.readTimeout).assertEqual(-200);
        });
        it("setSoTimeout_null", 0, () => {
            let httpUtils: any = new HttpUtils().setSoTimeout(null);
            expect(httpUtils.readTimeout).assertEqual(null);
        });
        it("setSoTimeout_undefined", 0, () => {
            let httpUtils: any = new HttpUtils().setSoTimeout(undefined);
            expect(httpUtils.readTimeout).assertEqual(undefined);
        });
        it("setInterceptor", 0, () => {
            let httpUtils: any = new HttpUtils().setInterceptor(() => { });
            expect(typeof httpUtils.interceptorFunction).assertEqual('function');
        });
        it("HttpCallBack_set_and_get_Rate_less_than_200", 0, () => {
            let httpcall: any = new HttpCallBack();
            httpcall.setRate(10);
            expect(httpcall.getRate()).assertEqual(200);
        });
        it("HttpCallBack_set_and_get_Rate_greater_than_200", 0, () => {
            let httpcall: any = new HttpCallBack();
            httpcall.setRate(201);
            expect(httpcall.getRate()).assertEqual(201);
        });
        it("HttpCallBack_set_and_get_Rate_equal_to_200", 0, () => {
            let httpcall: any = new HttpCallBack();
            httpcall.setRate(200);
            expect(httpcall.getRate()).assertEqual(200);
        });
        let requestParams = new RequestParams();
        it("RequestParams_addHeader", 0, () => {
            requestParams.addHeader("Content-Type", "application/json");
            expect(requestParams.getHeaders().size).assertEqual(1);
        });
        it("RequestParams_getHeaders", 0, () => {
            let header: string = requestParams.getHeaders().get('Content-Type');
            expect(header).assertEqual('application/json');
        });
        it("RequestParams_addHeader_undefined", 0, () => {
            requestParams.addHeader("Content-Type", undefined);
            expect(requestParams.getHeaders().size).assertEqual(1);
        });
        it("RequestParams_getHeaders_undefined", 0, () => {
            let header: string = requestParams.getHeaders().get('Content-Type');
            expect(header).assertUndefined();
        });
        it("RequestParams_addQueryStringParameter", 0, () => {
            requestParams.addQueryStringParameter("user_id", '108913');
            expect(requestParams.getQueryStringParams().size).assertEqual(1);
        });
        it("RequestParams_addQueryStringParameter_number", 0, () => {
            requestParams.getQueryStringParams().set('age', 20);
            expect(requestParams.getQueryStringParams().get('age')).assertEqual(20);
        });
        it("RequestParams_addQueryStringParameter_boolean", 0, () => {
            requestParams.getQueryStringParams().set('married', true);
            expect(requestParams.getQueryStringParams().get('married')).assertTrue();
        });
        it("RequestParams_addQueryStringParameter_function", 0, () => {
            requestParams.getQueryStringParams().set('callback', () => { });
            expect(typeof requestParams.getQueryStringParams().get('callback')).assertEqual('function');
        });
        it("RequestParams_getQueryStringParams", 0, () => {
            let stringParams: string = requestParams.getQueryStringParams().get("user_id");
            expect(stringParams).assertEqual('108913');
        });
        let dbConfig = new DaoConfig();
        it("DaoConfig_setDbName", 0, () => {
            dbConfig.setDbName(DB_NAME);
            expect(dbConfig.getDbName()).assertEqual(DB_NAME);
        });
        it("DaoConfig_table_name", 0, () => {
            dbConfig.setTableName(TABLE_NAME);
            expect(dbConfig.getTableName()).assertEqual(TABLE_NAME);
        });
        it("DaoConfig_setCreateTableSql", 0, () => {
            dbConfig.setCreateTableSql(SQL_CREATE_TABLE);
            expect(dbConfig.getCreateTableSql()).assertEqual(SQL_CREATE_TABLE);
        });
        it("DaoConfig_db_version", 0, () => {
            dbConfig.setDbVersion(1.0);
            expect(dbConfig.getDbVersion()).assertEqual(1.0);
        });
        it("DbUtils_dbName", 0, () => {
            expect(db.getDaoConfig().getDbName()).assertEqual(DB_NAME);
        });
        it("DbUtils_configDebug_true", 0, () => {
            db.configDebug(true);
            let dbUtil: any = db;
            expect(dbUtil.debug).assertTrue();
        });
        it("DbUtils_configDebug_false", 0, () => {
            db.configDebug(false);
            let dbUtil: any = db;
            expect(dbUtil.debug).assertFalse();
        });
        it("DbUtils_getDaoConfig", 0, () => {
            expect(db.getDaoConfig()).assertDeepEquals(dbConfig);
        });
        it("DaoConfig_db_upgrade_listener", 0, () => {
            dbConfig.setDbUpgradeListener(new UpgradeListener());
            expect(typeof dbConfig.getDbUpgradeListener()).assertEqual('object');
        });
        it("DaoConfig_dbDir", 0, () => {
            let filesDir = GlobalContext.getContext().getValue('filesDir') as string;
            dbConfig.setDbDir(filesDir);
            expect(dbConfig.getDbDir()).assertEqual('/data/storage/el2/base/haps/entry_test/files');
        });
        let selector: any = Selector.from('TABLE', ['AGE', 'NAME']);
        it("Selector_from", 0, () => {
            expect(selector.tableName).assertEqual('TABLE');
            expect(selector.queryColumns).assertDeepEquals(["AGE", "NAME"]);
        });
        it("Selector_getQueryColumns", 0, () => {
            expect(selector.getQueryColumns()).assertDeepEquals(['AGE', 'NAME']);
        });
        let bitmapDisplayConfig = new BitmapDisplayConfig();
        it("bitmapDisplayConfig_getLoadingPixMapisNull_true", 0, () => {
            expect(bitmapDisplayConfig.getLoadingPixMapisNull()).assertTrue();
        });
        it("bitmapDisplayConfig_setLoadingPixMap", 0, () => {
            let pix: any = $r('app.media.icon');
            bitmapDisplayConfig.setLoadingPixMap(pix);
            expect(bitmapDisplayConfig.getLoadingPixMap()).assertDeepEquals(pix);
        });
        it("bitmapDisplayConfig_setLoadingDrawable", 0, () => {
            let pix = $r('app.media.icon');
            bitmapDisplayConfig.setLoadingDrawable(pix);
            expect(bitmapDisplayConfig.getLoadingDrawable()).assertDeepEquals(pix);
        });
        it("bitmapDisplayConfig_setLoadFailedPixelMap", 0, () => {
            let pix: any = $r('app.media.icon');
            bitmapDisplayConfig.setLoadFailedPixelMap(pix);
            expect(bitmapDisplayConfig.getLoadFailedPixelMap()).assertDeepEquals(pix);
        });
        it("bitmapDisplayConfig_setLoadFailedDrawable", 0, () => {
            let pix = $r('app.media.icon');
            bitmapDisplayConfig.setLoadFailedDrawable(pix);
            expect(bitmapDisplayConfig.getLoadFailedDrawable()).assertDeepEquals(pix);
        });
        it("bitmapDisplayConfig_getLoadFailedPixMapisNull_false", 0, () => {
            expect(bitmapDisplayConfig.getLoadingPixMapisNull()).assertFalse();
        });
        it("bitmapDisplayConfig_setAutoRotation_true", 0, () => {
            bitmapDisplayConfig.setAutoRotation(true);
            expect(bitmapDisplayConfig.isAutoRotation()).assertTrue();
        });
        it("bitmapDisplayConfig_setAutoRotation_false", 0, () => {
            bitmapDisplayConfig.setAutoRotation(false);
            expect(bitmapDisplayConfig.isAutoRotation()).assertFalse();
        });
        it("bitmapDisplayConfig_setShowOriginal_true", 0, () => {
            bitmapDisplayConfig.setShowOriginal(true);
            expect(bitmapDisplayConfig.isShowOriginal()).assertTrue();
        });
        it("bitmapDisplayConfig_setShowOriginal_false", 0, () => {
            bitmapDisplayConfig.setShowOriginal(false);
            expect(bitmapDisplayConfig.isShowOriginal()).assertFalse();
        });
        let bitmapMaxSize = bitmapDisplayConfig.getBitmapMaxSize();
        it("bitmapDisplayConfig_getBitmapMaxSize", 0, () => {
            expect(bitmapMaxSize.getWidth()).assertEqual(0);
            expect(bitmapMaxSize.getHeight()).assertEqual(0);
        });
        let bit = new BitmapUtils();
        it("BitmapUtils_configDefaultLoadingImage_LoadingPixMap", 0, () => {
            bit.configDefaultLoadingImage(null, $r('app.media.icon') as any);
            expect(bit.defaultDisplayConfig.getLoadingPixMap()).assertDeepEquals($r('app.media.icon'));
        });
        it("BitmapUtils_configDefaultLoadingImage_LoadingDrawable", 0, () => {
            bit.configDefaultLoadingImage($r('app.media.icon'), null);
            expect(bit.defaultDisplayConfig.getLoadingDrawable()).assertDeepEquals($r('app.media.icon'));
        });
        it("BitmapUtils_configDefaultLoadFailedImage_LoadFailedDrawable", 0, () => {
            bit.configDefaultLoadFailedImage($r('app.media.icon'), null);
            expect(bit.defaultDisplayConfig.getLoadFailedDrawable()).assertDeepEquals($r('app.media.icon'));
        });
        it("BitmapUtils_configDefaultLoadFailedImage_LoadFailedPixelMap", 0, () => {
            bit.configDefaultLoadFailedImage(null, $r('app.media.icon') as any);
            expect(bit.defaultDisplayConfig.getLoadFailedPixelMap()).assertDeepEquals($r('app.media.icon'));
        });
        it("BitmapUtils_configDefaultAutoRotation_true", 0, () => {
            bit.configDefaultAutoRotation(true);
            expect(bit.defaultDisplayConfig.isAutoRotation()).assertTrue();
        });
        it("BitmapUtils_configDefaultAutoRotation_false", 0, () => {
            bit.configDefaultAutoRotation(false);
            expect(bit.defaultDisplayConfig.isAutoRotation()).assertFalse();
        });
        it("BitmapUtils_configDefaultShowOriginal_true", 0, () => {
            bit.configDefaultShowOriginal(true);
            expect(bit.defaultDisplayConfig.isShowOriginal()).assertTrue();
        });
        it("BitmapUtils_configDefaultShowOriginal_false", 0, () => {
            bit.configDefaultShowOriginal(false);
            expect(bit.defaultDisplayConfig.isShowOriginal()).assertFalse();
        });
        it("BitmapUtils_configDefaultDisplayConfig", 0, () => {
            let defaultDisplayConfig = new BitmapDisplayConfig();
            bit.configDefaultDisplayConfig(defaultDisplayConfig);
            expect(bit.defaultDisplayConfig).assertEqual(defaultDisplayConfig);
        });
        it("BitmapUtils_configDefaultCacheExpiry", 0, () => {
            bit.configDefaultCacheExpiry(1);
            expect(bit.globalConfig.getDefaultCacheExpiry()).assertEqual(1);
        });
        it("BitmapUtils_configDefaultConnectTimeout", 0, () => {
            bit.configDefaultConnectTimeout(100);
            expect(bit.globalConfig.getDefaultConnectTimeout()).assertEqual(100);
        });
        it("BitmapUtils_configDefaultReadTimeout", 0, () => {
            bit.configDefaultReadTimeout(1000);
            expect(bit.globalConfig.getDefaultReadTimeout()).assertEqual(1000);
        });
        it("BitmapUtils_configMemoryCacheEnabled_true", 0, () => {
            bit.configMemoryCacheEnabled(true);
            expect(bit.globalConfig.isMemoryCacheEnabled()).assertTrue();
        });
        it("BitmapUtils_configMemoryCacheEnabled_false", 0, () => {
            bit.configMemoryCacheEnabled(false);
            expect(bit.globalConfig.isMemoryCacheEnabled()).assertFalse();
        });
        it("BitmapUtils_configBitmapCacheListener", 0, () => {
            bit.configBitmapCacheListener(new bitmapCacheListener());
            expect(bit.globalConfig.getBitmapCacheListener()).not().assertNull();
        });
        it("BitmapUtils_setImageSize_width", 0, () => {
            bit.setImageSize(1);
            expect(bit.size).assertNull();
        });
        it("BitmapUtils_setImageSize_width_height", 0, () => {
            bit.setImageSize(1, 1);
            expect(bit.size?.getWidth()).assertEqual(1);
            expect(bit.size?.getHeight()).assertEqual(1);
        });
        it("BitmapUtils_pause_false", 0, () => {
            expect(bit.isPaused()).assertFalse();
        });
        it("BitmapUtils_pause_true", 0, () => {
            bit.pause();
            expect(bit.isPaused()).assertTrue();
        });
        it("BitmapUtils_resume", 0, () => {
            bit.resume();
            expect(bit.isPaused()).assertFalse();
        });
        it("BitmapUtils_cancel_false", 0, () => {
            expect(bit.isCancelled()).assertFalse();
        });
        it("BitmapUtils_cancel", 0, () => {
            bit.cancel();
            expect(bit.isCancelled()).assertTrue();
        });
        it("getBitmapFileFromDiskCache_empty", 0, () => {
            expect(bit.getBitmapFileFromDiskCache('')).assertEqual('/data/storage/el2/base/haps/entry_test/filesxBitmapCache');
        });
        it("getBitmapFileFromDiskCache_undefined", 0, () => {
            expect(bit.getBitmapFileFromDiskCache(undefined)).assertUndefined();
        });
        it("getSuccess", 0, () => {
            new HttpUtils()
                .send(HttpMethod.GET, "http://hshapp.ncn.com.cn/wisdom3/config/config.do", new HttpCallBack());
        });
        it("get_empty", 0, () => {
            new HttpUtils()
                .send(HttpMethod.GET, '', new HttpCallBack());
        });
        it("getError", 0, () => {
            new HttpUtils()
                .send(HttpMethod.GET, "http://hshapp.ncn.com.cn/wisdom3/config/config.d", new HttpCallBack());
        });
        it('postSuccess', 0, () => {
            setTimeout(() => {
                let requestParams = new RequestParams();
                requestParams.addHeader("Content-Type", "application/json");
                requestParams.addQueryStringParameter("user_id", "108913");
                new HttpUtils()
                    .sendParams(HttpMethod.POST, "http://hshapp.ncn.com.cn/wisdom3/user/v1.0/view_user_info.do", requestParams, new HttpCallBackPost());
            });
        });
        it('post_empty', 0, () => {
            setTimeout(() => {
                let requestParams = new RequestParams();
                requestParams.addHeader("Content-Type", "application/json");
                requestParams.addQueryStringParameter("user_id", "108913");
                new HttpUtils()
                    .sendParams(HttpMethod.POST, "", requestParams, new HttpCallBackPost());
            });
        });
        it('postError', 0, () => {
            setTimeout(() => {
                let requestParams = new RequestParams();
                requestParams.addHeader("Content-Type", "application/json");
                requestParams.addQueryStringParameter("user_id", "108913");
                new HttpUtils()
                    .sendParams(HttpMethod.POST, "http://hshapp.ncn.com.cn/wisdom3/user/v1.0/view_user_info.d", requestParams, new HttpCallBackPost());
            });
        });
        it('db', 0, () => {
            setTimeout(() => {
                if (db) {
                    db.saveAll(valuesBuckets);
                }
            }, 100);
            setTimeout(() => {
                //查询全部数据
                db.findAll(Selector.from(TABLE_NAME, COLUMNS));
                //条件查询
                db.findAll(Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Lisa")
                    .and("AGE", "equalTo", 18));
                //查询第一条符合条件的结果
                db.findFirst(Selector.from(TABLE_NAME, COLUMNS).where("NAME", "equalTo", "Rose"));
                //更新数据
                db.update(newValuesBuckets[0], Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Rose"));
                //删除数据
                db.delete(Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Rose"));
                //删除表
                db.dropTable(TABLE_NAME);
                //删除数据库
                db.dropDb();
            }, 200);
        });
    });
}
class redirectHandler implements HttpRedirectHandler {
    getDirectRequest() {
    }
}
class bitmapCacheListener implements BitmapCacheListener {
    onInitMemoryCacheFinished() {
        throw new Error('Method not implemented.');
    }
    onInitDiskFinished() {
        throw new Error('Method not implemented.');
    }
    onClearCacheFinished(uri?: string) {
        throw new Error('Method not implemented.');
    }
    onClearMemoryCacheFinished(uri?: string) {
        throw new Error('Method not implemented.');
    }
    onClearDiskCacheFinished(uri?: string) {
        throw new Error('Method not implemented.');
    }
    onFlushCacheFinished() {
        throw new Error('Method not implemented.');
    }
    onCloseCacheFinished() {
        throw new Error('Method not implemented.');
    }
}
class UpgradeListener implements DbUpgradeListener {
    onUpgrade(db: DbUtils, oldVersion: number, newVersion: number) {
        throw new Error('Method not implemented.');
    }
}
class HttpCallBack<T extends Weather> extends RequestCallBack<Weather> {
    onSuccess(responseInfo: ResponseInfo<Weather>) {
        console.log("HttpHandler：http get request success" + JSON.stringify(responseInfo));
        expect(responseInfo.response.responseCode).assertEqual(200);
    }
    onFailure() {
        console.log("HttpHandler：http get request fail");
    }
    onError(err: any) {
        console.log("HttpHandler：http get request error : " + JSON.stringify(err));
    }
    onDownloadSuccess() {
        console.log("HttpHandler：http get request onDownloadSuccess");
    }
    public onDownloadProgress(receivedSize: number, totalSize: number) {
    }
    public onProgress(uploadedSize: number, totalSize: number) {
    }
}
class HttpCallBackPost<T extends User> extends RequestCallBack<User> {
    onSuccess(responseInfo: ResponseInfo<User>) {
        expect(responseInfo.response.responseCode).assertEqual(200);
    }
    onFailure() {
        console.log("HttpHandler：http post request fail");
    }
    onError(err: any) {
        console.log("HttpHandler：http post request error : " + JSON.stringify(err));
    }
    onDownloadSuccess() {
    }
    public onDownloadProgress(receivedSize: number, totalSize: number) {
    }
    public onProgress(uploadedSize: number, totalSize: number) {
    }
}
class DbCallBack extends QueryCallBack {
    onSuccessCreateDb() {
        console.log('DbUtils：create store done.');
    }
    onSuccessCreateTable() {
        console.log('DbUtils：create table done.');
    }
    onSuccessInsert(ret: any) {
        expect(ret).assertEqual(4);
        console.log("DbUtils：insert done: " + ret);
    }
    onErrorInsert(err: any) {
        console.log("DbUtils：insert err: " + JSON.stringify(err));
    }
    onSuccessUpdate() {
        console.log("DbUtils：update done");
    }
    onErrorUpdate(err: any) {
        console.log("DbUtils：update err: " + JSON.stringify(err));
    }
    onSuccessDelete(rows: any) {
        console.log("DbUtils：delete done " + rows);
    }
    onErrorDelete(err: any) {
        console.log("DbUtils：delete err: " + JSON.stringify(err));
    }
    onSuccessQuery(resultSet: any) {
        //验证数据新增是否成功
        expect(resultSet.rowCount).assertEqual(valuesBuckets.length);
        console.log("DbUtils： onSuccessQuery" + resultSet.rowCount);
    }
    onFailQuery(msg: string) {
        console.log("DbUtils： onFailQuery" + msg);
    }
    onSuccessQueryFirst(map: Map<string, any>) {
        expect(map.get("AGE")).assertEqual(22);
        expect(map.get("SALARY")).assertEqual(100.5);
        console.log("DbUtils： this.personEntity.AGE=" + map.get("AGE"));
        console.log("DbUtils： this.personEntity.SALARY=" + map.get("SALARY"));
    }
    onSuccessDropTable() {
        console.log("DbUtils：drop table done ");
    }
    onSuccessDeleteDb() {
        console.log('DbUtils：delete db success');
    }
}
