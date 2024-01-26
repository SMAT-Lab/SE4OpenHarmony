interface CloudStorage_Params {
    user?: AuthUser | null | undefined;
    isShowButton?: boolean;
    image?: Resource | PixelMap;
    progress?: string;
    accessAddress?: string;
    publicAccessAddress?: string;
    imageUploadingProgress?: number;
    canUpload?: boolean;
    imgUri?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CloudStorage_" + ++__generate__Id;
}
import cloud, { ProgressEvent, AuthUser, UploadParam } from '@hw-agconnect/cloud';
import { Login, AuthMode } from "@hw-agconnect/auth-component";
import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import image from '@ohos.multimedia.image';
class CloudStorage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__user = AppStorage.SetAndLink('user', null, this, "user");
        this.__isShowButton = new ObservedPropertySimple(true, this, "isShowButton");
        this.__image = new ObservedPropertyObject($r('app.media.empty_image'), this, "image");
        this.__progress = new ObservedPropertySimple('', this, "progress");
        this.__accessAddress = new ObservedPropertySimple('', this, "accessAddress");
        this.__publicAccessAddress = new ObservedPropertySimple('', this, "publicAccessAddress");
        this.__imageUploadingProgress = new ObservedPropertySimple(0, this, "imageUploadingProgress");
        this.__canUpload = new ObservedPropertySimple(true, this, "canUpload");
        this.__imgUri = new ObservedPropertySimple("", this, "imgUri");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CloudStorage_Params) {
        if (params.isShowButton !== undefined) {
            this.isShowButton = params.isShowButton;
        }
        if (params.image !== undefined) {
            this.image = params.image;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.accessAddress !== undefined) {
            this.accessAddress = params.accessAddress;
        }
        if (params.publicAccessAddress !== undefined) {
            this.publicAccessAddress = params.publicAccessAddress;
        }
        if (params.imageUploadingProgress !== undefined) {
            this.imageUploadingProgress = params.imageUploadingProgress;
        }
        if (params.canUpload !== undefined) {
            this.canUpload = params.canUpload;
        }
        if (params.imgUri !== undefined) {
            this.imgUri = params.imgUri;
        }
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__isShowButton.aboutToBeDeleted();
        this.__image.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__accessAddress.aboutToBeDeleted();
        this.__publicAccessAddress.aboutToBeDeleted();
        this.__imageUploadingProgress.aboutToBeDeleted();
        this.__canUpload.aboutToBeDeleted();
        this.__imgUri.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __user: ObservedPropertyAbstract<AuthUser | null | undefined>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: AuthUser | null | undefined) {
        this.__user.set(newValue);
    }
    private __isShowButton: ObservedPropertySimple<boolean>;
    get isShowButton() {
        return this.__isShowButton.get();
    }
    set isShowButton(newValue: boolean) {
        this.__isShowButton.set(newValue);
    }
    private __image: ObservedPropertyObject<Resource | PixelMap>;
    get image() {
        return this.__image.get();
    }
    set image(newValue: Resource | PixelMap) {
        this.__image.set(newValue);
    }
    private __progress: ObservedPropertySimple<string>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: string) {
        this.__progress.set(newValue);
    }
    private __accessAddress: ObservedPropertySimple<string>;
    get accessAddress() {
        return this.__accessAddress.get();
    }
    set accessAddress(newValue: string) {
        this.__accessAddress.set(newValue);
    }
    private __publicAccessAddress: ObservedPropertySimple<string>;
    get publicAccessAddress() {
        return this.__publicAccessAddress.get();
    }
    set publicAccessAddress(newValue: string) {
        this.__publicAccessAddress.set(newValue);
    }
    private __imageUploadingProgress: ObservedPropertySimple<number>;
    get imageUploadingProgress() {
        return this.__imageUploadingProgress.get();
    }
    set imageUploadingProgress(newValue: number) {
        this.__imageUploadingProgress.set(newValue);
    }
    private __canUpload: ObservedPropertySimple<boolean>;
    get canUpload() {
        return this.__canUpload.get();
    }
    set canUpload(newValue: boolean) {
        this.__canUpload.set(newValue);
    }
    private __imgUri: ObservedPropertySimple<string>;
    get imgUri() {
        return this.__imgUri.get();
    }
    set imgUri(newValue: string) {
        this.__imgUri.set(newValue);
    }
    aboutToAppear() {
        this.user = AppStorage.Get<AuthUser>('user');
    }
    // photoViewPicker
    initImagPicker(): Promise<string> {
        return new Promise((resolve: Function, reject: Function) => {
            let uri: string;
            const photoSelectOptions = new picker.PhotoSelectOptions();
            photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE; // 过滤选择媒体文件类型为IMAGE
            photoSelectOptions.maxSelectNumber = 1; // 选择媒体文件的最大数目
            const photoPicker = new picker.PhotoViewPicker();
            photoPicker.select(photoSelectOptions).then((photoSelectResult: picker.PhotoSelectResult) => {
                uri = photoSelectResult.photoUris[0];
                this.imgUri = uri;
                resolve(uri);
            }).catch((err: Object) => {
                reject(err);
            });
        });
    }
    upLoadImage() {
        this.initImagPicker().then((res: string) => {
            this.canUpload = false;
            let cloudPath: string = `testcloud/demo_${new Date().getTime()}.jpg`;
            let uploadParmas: UploadParam = {
                localPath: res,
                cloudPath: cloudPath,
                onUploadProgress: (pe: ProgressEvent) => {
                    console.log(`onUploadProgress:bytes:${pe.loaded} total:${pe.total}`);
                    let percentCompleted = Math.round((pe.loaded * 100) / pe.total);
                    this.imageUploadingProgress = percentCompleted;
                }
            };
            cloud.storage().upload(uploadParmas);
            this.getDownloadUrl(cloudPath);
        });
    }
    getDownloadUrl(path: string) {
        cloud.storage().getDownloadURL(path).then(async (downUrl: string) => {
            this.accessAddress = downUrl;
            this.publicAccessAddress = downUrl;
            let file = fs.openSync(this.imgUri, fs.OpenMode.READ_ONLY);
            const imageSource = image.createImageSource(file.fd);
            let options: image.InitializationOptions = {
                alphaType: 0,
                editable: false,
                pixelFormat: 3,
                scaleMode: 1,
                size: { height: 100, width: 100 }
            };
            this.image = await imageSource.createPixelMap(options);
            this.canUpload = true;
        });
    }
    render() {
        Column.create();
        Column.height('100%');
        Navigation.create();
        Navigation.title({ builder: () => {
                this.NavigationTitle.call(this);
            } });
        Navigation.height('50vp');
        Navigation.width('100%');
        Navigation.margin({ bottom: 10 });
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('90%');
        Column.margin({ bottom: 20 });
        Row.create();
        Row.margin({ bottom: 15 });
        Text.create($r('app.string.cloudStorage_description'));
        Text.fontSize($r('app.float.body_font_size'));
        Text.pop();
        Row.pop();
        Row.create();
        If.create();
        if (this.user !== null && this.user !== undefined) {
            If.branchId(0);
            Button.createWithLabel($r('app.string.cloudStorage_uploadButton'), { type: ButtonType.Normal });
            Button.borderRadius(4);
            Button.width('100%');
            Button.backgroundColor($r('app.color.login_button'));
            Button.opacity(this.canUpload ? 1 : 0.5);
            Button.enabled(this.canUpload);
            Button.height(40);
            Button.onClick(() => {
                // this.readFsBuff();
                this.upLoadImage();
            });
            Button.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Login.create({
                modes: [AuthMode.PHONE_VERIFY_CODE],
                onSuccess: (user: AuthUser) => {
                    this.isShowButton = false;
                    AppStorage.Set<AuthUser>('user', user);
                }
            });
            Button.createWithLabel($r('app.string.cloudStorage_uploadButton'), { type: ButtonType.Normal });
            Button.borderRadius(4);
            Button.width('100%');
            Button.backgroundColor($r('app.color.login_button'));
            Button.opacity(this.canUpload ? 1 : 0.5);
            Button.enabled(this.canUpload);
            Button.height(40);
            Button.pop();
            Column.pop();
        }
        If.pop();
        Row.pop();
        If.create();
        if (this.imageUploadingProgress !== 0) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Text.create($r('app.string.cloudStorage_progressLabel'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            Text.create(': ' + this.imageUploadingProgress.toString().substr(0, 5) + " %");
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            Row.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.width('90%');
        Column.margin({ bottom: 15 });
        Row.create();
        Image.create(this.image);
        Image.objectFit(ImageFit.Contain);
        Image.height(250);
        Image.backgroundColor($r('app.color.black'));
        Row.pop();
        Column.pop();
        If.create();
        if (this.accessAddress !== '' && this.publicAccessAddress !== '') {
            If.branchId(0);
            Column.create({ space: 10 });
            Column.width('90%');
            Column.margin({ right: 10 });
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Column.create();
            Column.height(30);
            Column.layoutWeight(3);
            Text.create($r('app.string.cloudStorage_accessAddressLabel'));
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.pop();
            Text.create(this.accessAddress.split('').join('\u200B'));
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.maxLines(1);
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.pop();
            Column.pop();
            Flex.pop();
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Column.create();
            Column.height(30);
            Column.layoutWeight(3);
            Text.create($r('app.string.cloudStorage_publicAccessAddressLabel'));
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.pop();
            Text.create(this.publicAccessAddress.split('').join('\u200B'));
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.maxLines(1);
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.pop();
            Column.pop();
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
    NavigationTitle(parent = null) {
        Column.create();
        Text.create($r('app.string.cloudStorage_label'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.pop();
        Column.pop();
    }
}
loadDocument(new CloudStorage("1", undefined, {}));
