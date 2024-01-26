interface Index_Params {
    pixelMap?: PixelMap | null;
    diskPixMap?: PixelMap | null;
    context?: Context;
    db?: DbUtils | null;
    mBitmapUtils?: BitmapUtils;
    config?: DaoConfig;
    start?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import prompt from '@system.prompt';
import fileIo from '@ohos.file.fs';
import { HttpUtils } from '@ohos/xutils/';
import { HttpMethod } from '@ohos/xutils/';
import { RequestCallBack } from '@ohos/xutils/';
import { RequestParams } from '@ohos/xutils/';
import { ResponseInfo } from '@ohos/xutils/';
import { DbUtils } from '@ohos/xutils/';
import { DaoConfig } from '@ohos/xutils/';
import { QueryCallBack } from '@ohos/xutils/';
import { Selector } from '@ohos/xutils/';
import { BitmapUtils } from '@ohos/xutils/';
import { BitmapLoadCallBack } from '@ohos/xutils/';
import { BitmapDisplayConfig } from '@ohos/xutils/';
import { User } from '../entity/User';
import { Weather } from '../entity/Weather';
import { DB_NAME, TABLE_NAME, SQL_CREATE_TABLE, COLUMNS } from '../entity/RdbConfig';
import { valuesBuckets, newValuesBuckets } from '../entity/Employee';
export class FileBean {
    filename: string = '';
    name: string = '';
    uri: string = '';
    type: string = '';
}
export class DataBean {
    name: string = '';
    value: string = '';
}
export class UploadBean {
    url: string = '';
    method: HttpMethod = HttpMethod.POST;
    header: Map<string, Object> = new Map<string, Object>();
    files: FileBean[] = [];
    data: DataBean[] = [];
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pixelMap = new ObservedPropertyObject(null, this, "pixelMap");
        this.__diskPixMap = new ObservedPropertyObject(null, this, "diskPixMap");
        this.context = getContext();
        this.db = null;
        this.mBitmapUtils = new BitmapUtils(this.context);
        this.config = new DaoConfig();
        this.start = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.diskPixMap !== undefined) {
            this.diskPixMap = params.diskPixMap;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.db !== undefined) {
            this.db = params.db;
        }
        if (params.mBitmapUtils !== undefined) {
            this.mBitmapUtils = params.mBitmapUtils;
        }
        if (params.config !== undefined) {
            this.config = params.config;
        }
        if (params.start !== undefined) {
            this.start = params.start;
        }
    }
    aboutToBeDeleted() {
        this.__pixelMap.aboutToBeDeleted();
        this.__diskPixMap.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pixelMap: ObservedPropertyObject<PixelMap | null>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: PixelMap | null) {
        this.__pixelMap.set(newValue);
    }
    private __diskPixMap: ObservedPropertyObject<PixelMap | null>;
    get diskPixMap() {
        return this.__diskPixMap.get();
    }
    set diskPixMap(newValue: PixelMap | null) {
        this.__diskPixMap.set(newValue);
    }
    private context: Context;
    private db: DbUtils | null;
    private mBitmapUtils: BitmapUtils;
    private config: DaoConfig;
    private start: boolean;
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Text.create('GET请求');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            new HttpUtils()
                .send(HttpMethod.GET, "http://hshapp.ncn.com.cn/wisdom3/config/config.do", new HttpCallBack());
        });
        Text.pop();
        Text.create('POST请求');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let requestParams: RequestParams = new RequestParams();
            requestParams.addHeader("Content-Type", "application/json");
            requestParams.addQueryStringParameter("user_id", "108913");
            new HttpUtils()
                .sendParams(HttpMethod.POST, "http://hshapp.ncn.com.cn/wisdom3/config/config.do", requestParams, new HttpCallBackPost());
        });
        Text.pop();
        Text.create('文件上传');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            // 文件上传成功后的路径  http://106.15.92.248/node/uploads/
            this.upload();
        });
        Text.pop();
        Text.create('文件下载');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            //   文件下载的路径在 data/app/el2/100/base/com.ohos.xutils/haps/entry/files 目录下
            new HttpUtils().download('https://count.liqucn.com/d.php?id=725672&urlos=android&from_type=web/xUtils/hsh.apk', '/hsh.apk', new DownloadCallBack());
        });
        Text.pop();
        Divider.create();
        Divider.margin({ top: 10 });
        Text.create('创建数据库');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.config.setDbName(DB_NAME);
            this.db = new DbUtils(this.config);
            this.db.setCallback(new DbCallBack());
        });
        Text.pop();
        Text.create('创建表');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.config.setDbName(DB_NAME);
            this.config.setTableName(TABLE_NAME);
            this.config.setCreateTableSql(SQL_CREATE_TABLE);
            if (this.db)
                this.db.createTableIfNotExist();
        });
        Text.pop();
        Text.create('插入数据');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.saveAll(valuesBuckets);
        });
        Text.pop();
        Text.create('查询所有数据集合');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.findAll(Selector.from(TABLE_NAME, COLUMNS));
        });
        Text.pop();
        Text.create('查询符合条件的数据集合');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.execNonQuery("", Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Lisa")
                    .and("AGE", "equalTo", 18), "query");
        });
        Text.pop();
        Text.create('查询符合条件的第一条数据');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.execNonQuery("", Selector.from(TABLE_NAME, COLUMNS).where("NAME", "equalTo", "Rose"), "queryFirst");
        });
        Text.pop();
        Text.create('更新数据');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.update(newValuesBuckets[0], Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Rose"));
        });
        Text.pop();
        Text.create('删除数据');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.delete(Selector.from(TABLE_NAME, COLUMNS)
                    .where("NAME", "equalTo", "Rose"));
        });
        Text.pop();
        Text.create('删除表');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.dropTable(TABLE_NAME);
        });
        Text.pop();
        Text.create('删除数据库');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            if (this.db)
                this.db.dropDb();
        });
        Text.pop();
        Divider.create();
        Divider.margin({ top: 10 });
        Text.create('加载图片');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let config: BitmapDisplayConfig = new BitmapDisplayConfig();
            config.setLoadingPixMap(ObservedObject.GetRawObject(this.pixelMap));
            this.mBitmapUtils.display("https://scpic.chinaz.net/Files/pic/pic9/202109/apic35340_s.jpg", config, new MyBitmapLoadCallBack((pixMap) => {
                this.pixelMap = pixMap;
            }));
        });
        Text.pop();
        Image.create(this.pixelMap == null ? $r('app.media.icon') : this.pixelMap);
        Image.width(200);
        Image.height(200);
        Image.border({ width: 1 });
        Image.margin(30);
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('png', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Text.create('从缓存中获取图片');
        Text.fontSize(20);
        Text.margin(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.mBitmapUtils.display("https://scpic.chinaz.net/Files/pic/pic9/202109/apic35340_s.jpg", null, new MyBitmapLoadCallBack((pixMap) => {
                this.diskPixMap = pixMap;
            }));
        });
        Text.pop();
        Image.create(this.diskPixMap == null ? $r('app.media.icon') : this.diskPixMap);
        Image.width(200);
        Image.height(200);
        Image.border({ width: 1 });
        Image.margin(30);
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('png', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Button.createWithLabel("清除本地文件");
        Button.width(150);
        Button.height(45);
        Button.onClick((e: ClickEvent) => {
            this.mBitmapUtils.configBitmapCacheListener();
            this.mBitmapUtils.clearCache();
        });
        Button.margin(30);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    upload() {
        let path = this.context.cacheDir + '/file.txt';
        console.info("file path is " + path);
        let fd = fileIo.openSync(path, 0o100 | 0o2);
        let content: string = "hello, world123456";
        let num = fileIo.writeSync(fd.fd, content);
        fileIo.close(fd);
        console.info('num is ' + num);
        let header = new Map<string, Object>();
        header.set("Charset", "utf-8");
        header.set("Content-Type", "multipart/form-data");
        let uploadConfig: UploadBean = {
            url: 'http://106.15.92.248:8080/upload',
            method: HttpMethod.POST,
            header: header,
            files: [{
                    filename: 'file.txt',
                    name: 'file',
                    uri: 'internal://cache/file.txt',
                    type: 'txt'
                } as FileBean],
            data: [
                {
                    name: 'file1',
                    value: 'file content',
                } as DataBean,
            ]
        };
        new HttpUtils().upload(uploadConfig, {
            onSuccess() {
                console.info("HttpHandler：upload success ");
            },
            onProgress(uploadedSize: number, totalSize: number) {
                console.info("HttpHandler：upload totalSize:" + totalSize + "--uploadedSize:" + uploadedSize);
            },
            onError(err: Object) {
                console.log("HttpHandler：upload error : " + JSON.stringify(err));
            }
        });
    }
}
/**
 * 网络请求回调
 * @param responseInfo
 */
class HttpCallBack<T extends Weather> extends RequestCallBack<Weather> {
    onSuccess(responseInfo: ResponseInfo<Weather>) {
        console.log("HttpHandler：http request success : " + responseInfo.result);
        prompt.showToast({ message: 'http request success : ' + responseInfo.result });
    }
    onFailure() {
        console.log("HttpHandler：http request fail");
        prompt.showToast({ message: 'http request fail' });
    }
    onError(err: Object) {
        console.log("HttpHandler：http request error : " + JSON.stringify(err));
        prompt.showToast({ message: 'http request error ' + JSON.stringify(err) });
    }
    onDownloadSuccess() {
    }
    onDownloadProgress(receivedSize: number, totalSize: number) {
    }
    onProgress(uploadedSize: number, totalSize: number) {
    }
}
class HttpCallBackPost<T extends User> extends RequestCallBack<User> {
    onSuccess(responseInfo: ResponseInfo<User>) {
        console.log("HttpHandler：http request success : " + responseInfo.result);
        prompt.showToast({ message: 'http request success : ' + responseInfo.result });
    }
    onFailure() {
        console.log("HttpHandler：http request fail");
        prompt.showToast({ message: 'http request fail' });
    }
    onError(err: Object) {
        console.log("HttpHandler：http request error : " + JSON.stringify(err));
        prompt.showToast({ message: 'http request error : ' + JSON.stringify(err) });
    }
    onDownloadSuccess() {
    }
    onDownloadProgress(receivedSize: number, totalSize: number) {
    }
    onProgress(uploadedSize: number, totalSize: number) {
    }
}
class DownloadCallBack<T extends User> extends RequestCallBack<User> {
    onSuccess(responseInfo: ResponseInfo<User>) {
        console.log("HttpHandler：http request success : " + responseInfo.result);
        prompt.showToast({ message: 'http request success : ' + responseInfo.result });
    }
    onFailure() {
        console.log("HttpHandler：http request fail");
        prompt.showToast({ message: 'http request fail' });
    }
    onDownloadProgress(receivedSize: number, totalSize: number) {
        console.log("HttpHandler: receivedSize=" + receivedSize + '  totalSize=' + totalSize);
    }
    onDownloadSuccess() {
        console.log("HttpHandler：download completed");
        prompt.showToast({ message: 'download task completed' });
    }
    onError(err: Object) {
        console.log("HttpHandler：download error : " + JSON.stringify(err));
        prompt.showToast({ message: 'download error : ' + JSON.stringify(err) });
    }
    onProgress(uploadedSize: number, totalSize: number) {
    }
}
/**
 * 数据库查询回调
 * @param map
 */
class DbCallBack extends QueryCallBack {
    onSuccessCreateDb() {
        prompt.showToast({ message: '创建数据库成功' });
        console.log('DbUtils：create store done.');
    }
    onSuccessCreateTable() {
        prompt.showToast({ message: '创建表成功' });
        console.log('DbUtils：create table done.');
    }
    onSuccessInsert(ret: Object) {
        prompt.showToast({ message: '插入数据成功' });
        console.log("DbUtils：insert done: " + ret);
    }
    onErrorInsert(err: Object) {
        console.log("DbUtils：insert err: " + JSON.stringify(err));
        prompt.showToast({ message: '插入数据失败' });
    }
    onSuccessUpdate() {
        console.log("DbUtils：update done");
        prompt.showToast({ message: '更新数据成功' });
    }
    onErrorUpdate(err: Object) {
        console.log("DbUtils：update err: " + JSON.stringify(err));
        prompt.showToast({ message: '更新数据失败' });
    }
    onSuccessDelete(rows: Object) {
        console.log("DbUtils：delete done " + rows);
        prompt.showToast({ message: '删除数据成功' });
    }
    onErrorDelete(err: object) {
        console.log("DbUtils：delete err: " + JSON.stringify(err));
        prompt.showToast({ message: '删除数据失败' });
    }
    onSuccessQuery(resultSet: any) {
        prompt.showToast({ message: "查询到" + resultSet.rowCount + "条数据" });
    }
    onFailQuery(msg: string) {
        prompt.showToast({ message: msg });
    }
    onSuccessQueryFirst(map: Map<string, object>) {
        prompt.showToast({ message: "查询成功" });
        console.log("DbUtils： this.personEntity.AGE=" + map.get("AGE"));
        console.log("DbUtils： this.personEntity.SALARY=" + map.get("SALARY"));
    }
    onSuccessDropTable() {
        console.log("DbUtils：drop table done ");
        prompt.showToast({ message: '删除表成功' });
    }
    onSuccessDeleteDb() {
        console.log('DbUtils：delete db success');
        prompt.showToast({ message: '删除数据库成功' });
    }
}
class MyBitmapLoadCallBack extends BitmapLoadCallBack {
    MyCallBackFun: any = null;
    constructor(fuc: (pixMap: PixelMap) => void) {
        super();
        this.MyCallBackFun = fuc;
    }
    onLoadCompleted(uri: string, bitmap: PixelMap) {
        this.MyCallBackFun(bitmap);
        bitmap.getImageInfo((info) => {
            console.info("BitmapLoadCallBack complete:" + JSON.stringify(info));
        });
        return bitmap;
    }
    onLoadDiskCompleted(uri: string, bitmap: PixelMap): PixelMap {
        return bitmap;
    }
    onLoadFailedPixelMap(value?: PixelMap) {
        return value;
    }
    onLoadFailedResource(Resource: Resource) {
    }
    onLoadMemoryCompleted(url: string, pixelMap: PixelMap) {
        this.MyCallBackFun(pixelMap);
        return pixelMap;
    }
    onProgressUpdate(receivedSize: number, totalSize: number) {
        console.log("BitmapUtils onProgressUpdate receivedSize : " + receivedSize + "receivedSize :" + totalSize);
    }
    onLoadingPixelMap(PixelMap: PixelMap) {
        console.log("BitmapUtils onLoadingPixelMap PixelMap " + (PixelMap == null));
    }
    onLoadStarted(disconfig: any) {
        console.log("BitmapUtils onLoadStarted PixelMap : " + JSON.stringify(disconfig));
    }
}
loadDocument(new Index("1", undefined, {}));
