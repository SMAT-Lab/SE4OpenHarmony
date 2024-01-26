interface DbInsert_Params {
    params?;
    isEditing?: boolean;
    recordId?: string;
    contentR?: string;
    checkBoxChecked?: boolean;
    user?: AuthUser | null | undefined;
    content?: string;
    agcDataBase?: Database | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DbInsert_" + ++__generate__Id;
}
import router from '@ohos.router';
import { Post } from './Post';
import Long from "long";
import buffer from '@ohos.buffer';
import cloud, { AuthUser, Database, ObjectTypeInfo } from '@hw-agconnect/cloud';
interface RouterParamsType {
    isEditing?: boolean;
    checkBoxStatus?: boolean;
    recordId?: string;
    content?: string;
}
class DbInsert extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.params = router.getParams() as Record<string, Object>;
        this.isEditing = this.params.isEditing as boolean;
        this.recordId = this.params.recordId as string;
        this.contentR = this.params.content as string;
        this.checkBoxChecked = this.params.checkBoxStatus as boolean;
        this.user = AppStorage.Get('user');
        this.__content = new ObservedPropertySimple('', this, "content");
        this.agcDataBase = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DbInsert_Params) {
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.isEditing !== undefined) {
            this.isEditing = params.isEditing;
        }
        if (params.recordId !== undefined) {
            this.recordId = params.recordId;
        }
        if (params.contentR !== undefined) {
            this.contentR = params.contentR;
        }
        if (params.checkBoxChecked !== undefined) {
            this.checkBoxChecked = params.checkBoxChecked;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.agcDataBase !== undefined) {
            this.agcDataBase = params.agcDataBase;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private params;
    private isEditing: boolean;
    private recordId: string;
    private contentR: string;
    private checkBoxChecked: boolean;
    private user: AuthUser | null | undefined;
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private agcDataBase: Database | undefined;
    aboutToAppear() {
        this.user = AppStorage.Get<AuthUser>('user');
        this.loadObjectInfo().then((res: ObjectTypeInfo) => {
            this.agcDataBase = cloud.database({ objectTypeInfo: res, zoneName: "Demo" });
        });
    }
    loadObjectInfo(): Promise<ObjectTypeInfo> {
        return new Promise(async (resolve: Function) => {
            const context = getContext(this);
            const value = await context.resourceManager.getRawFileContent('schema.json');
            let json: string = buffer.from(value).toString("utf8");
            let objectTypeInfo: ObjectTypeInfo = JSON.parse(json);
            resolve(objectTypeInfo);
        });
    }
    onPageShow() {
        if (this.recordId?.length) {
            this.content = this.contentR;
        }
    }
    handleUpsert() {
        if (this.content !== '') {
            let post = new Post();
            if (this.isEditing) {
                post.setId(Long.fromString(this.recordId.toString()));
            }
            let uid = this.user ? this.user.getUid() : '';
            post.setContent(this.content);
            post.setInsertDate(new Date());
            post.setUserId(uid);
            try {
                (this.agcDataBase as Database).collection(Post).upsert(post);
                AlertDialog.show({
                    title: $r('app.string.dialog_success_title'),
                    message: $r('app.string.dialog_success_message'),
                    cancel: () => {
                        let params: RouterParamsType = { checkBoxStatus: this.checkBoxChecked };
                        router.back({ url: 'pages/CloudDb/CloudDb', params });
                    }
                });
                this.content = '';
            }
            catch (err) {
            }
        }
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
        Column.margin({
            left: 20,
            right: 20
        });
        TextArea.create({ text: this.content });
        TextArea.height(100);
        TextArea.margin({ top: 20 });
        TextArea.backgroundColor($r('app.color.start_window_background'));
        TextArea.border({
            color: $r('app.color.body_color'),
            width: 1,
            radius: 4
        });
        TextArea.onChange((event) => {
            this.content = event;
        });
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.margin({ top: 10 });
        Button.borderRadius(4);
        Button.width('100%');
        Button.backgroundColor($r('app.color.login_button'));
        Button.onClick(() => {
            this.handleUpsert();
        });
        Text.create($r('app.string.publishButton_label'));
        Text.textAlign(TextAlign.Center);
        Text.fontSize($r('app.float.body_font_size'));
        Text.fontColor($r('app.color.start_window_background'));
        Text.width('90%');
        Text.height(40);
        Text.pop();
        Button.pop();
        Column.pop();
        Column.pop();
    }
    NavigationTitle(parent = null) {
        Column.create();
        Text.create($r('app.string.cloudDB_label'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.pop();
        Column.pop();
    }
}
loadDocument(new DbInsert("1", undefined, {}));
