interface CloudDb_Params {
    scroller?: Scroller;
    user?: AuthUser | null | undefined;
    isSelected?: boolean;
    isShowButton?: boolean;
    allRecords?: Post[];
    likeCount?: number;
    agcDataBase?: Database | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CloudDb_" + ++__generate__Id;
}
import cloud, { AuthUser, Database, ObjectTypeInfo } from '@hw-agconnect/cloud';
import { Login, AuthMode } from "@hw-agconnect/auth-component";
import { Post } from './Post';
import router from '@ohos.router';
import buffer from '@ohos.buffer';
import Long from 'long';
import Logger from '@ohos.hilog';
const TAG = "[CloudDBPage]";
interface RouterParamsType {
    isEditing?: boolean;
    checkBoxStatus?: boolean;
    recordId?: string;
    content?: string;
}
class CloudDb extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__user = AppStorage.SetAndLink('user', null, this, "user");
        this.__isSelected = new ObservedPropertySimple(false, this, "isSelected");
        this.__isShowButton = new ObservedPropertySimple(true, this, "isShowButton");
        this.__allRecords = new ObservedPropertyObject([], this, "allRecords");
        this.__likeCount = new ObservedPropertySimple(0, this, "likeCount");
        this.agcDataBase = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CloudDb_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.isSelected !== undefined) {
            this.isSelected = params.isSelected;
        }
        if (params.isShowButton !== undefined) {
            this.isShowButton = params.isShowButton;
        }
        if (params.allRecords !== undefined) {
            this.allRecords = params.allRecords;
        }
        if (params.likeCount !== undefined) {
            this.likeCount = params.likeCount;
        }
        if (params.agcDataBase !== undefined) {
            this.agcDataBase = params.agcDataBase;
        }
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__isSelected.aboutToBeDeleted();
        this.__isShowButton.aboutToBeDeleted();
        this.__allRecords.aboutToBeDeleted();
        this.__likeCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __user: ObservedPropertyAbstract<AuthUser | null | undefined>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: AuthUser | null | undefined) {
        this.__user.set(newValue);
    }
    private __isSelected: ObservedPropertySimple<boolean>;
    get isSelected() {
        return this.__isSelected.get();
    }
    set isSelected(newValue: boolean) {
        this.__isSelected.set(newValue);
    }
    private __isShowButton: ObservedPropertySimple<boolean>;
    get isShowButton() {
        return this.__isShowButton.get();
    }
    set isShowButton(newValue: boolean) {
        this.__isShowButton.set(newValue);
    }
    private __allRecords: ObservedPropertyObject<Post[]>;
    get allRecords() {
        return this.__allRecords.get();
    }
    set allRecords(newValue: Post[]) {
        this.__allRecords.set(newValue);
    }
    private __likeCount: ObservedPropertySimple<number>;
    get likeCount() {
        return this.__likeCount.get();
    }
    set likeCount(newValue: number) {
        this.__likeCount.set(newValue);
    }
    private agcDataBase: Database | undefined;
    NavigationTitle(parent = null) {
        Column.create();
        Text.create($r('app.string.cloudDB_label'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.pop();
        Column.pop();
    }
    onPageShow() {
        this.orderByDate();
    }
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
    async getPostList() {
        try {
            const resultArray = await (this.agcDataBase as Database)
                .collection(Post)
                .query()
                .orderByDesc("insertDate")
                .limit(100, 0)
                .get();
            this.allRecords = resultArray;
            console.log("query success : " + JSON.stringify(resultArray));
        }
        catch (err) {
            console.log("query err------------", JSON.stringify(err));
        }
    }
    async orderByMostLiked() {
        try {
            const resultArray = await (this.agcDataBase as Database)
                .collection(Post)
                .query()
                .orderByDesc("likeCount")
                .limit(100, 0)
                .get();
            this.allRecords = resultArray;
            console.log("query success : " + JSON.stringify(resultArray));
        }
        catch (err) {
            console.log("query err------------" + JSON.stringify(err));
        }
    }
    async getMyPosts(uid: string) {
        try {
            const resultArray = await (this.agcDataBase as Database)
                .collection(Post)
                .query()
                .equalTo("userId", uid)
                .orderByDesc("insertDate")
                .get();
            this.allRecords = resultArray;
        }
        catch (err) {
        }
    }
    async getMyPostsByLike(uid: string) {
        try {
            const resultArray = await (this.agcDataBase as Database)
                .collection(Post)
                .query()
                .equalTo("userId", uid)
                .orderByDesc("likeCount")
                .get();
            this.allRecords = resultArray;
        }
        catch (err) {
        }
    }
    async deleteRecord(post: Post, uid: string) {
        if (post.userId === uid) {
            try {
                const record = await (this.agcDataBase as Database)
                    .collection(Post)
                    .delete(post);
                this.onCheckboxToggle();
            }
            catch (err) {
            }
        }
    }
    async updateLikeCount(item: Post) {
        let likes: string[] = JSON.parse(item.likes);
        let userId: string = this.user ? this.user.getUid() : '';
        let index: number = likes.indexOf(userId);
        if (index >= 0) {
            likes = likes.filter((item: string) => item !== userId);
            item.likeCount = likes.length;
            item.setLikes(JSON.stringify(likes));
        }
        else {
            likes.push(userId);
            item.likeCount = likes.length;
            item.setLikes(JSON.stringify(likes));
        }
        try {
            await (this.agcDataBase as Database).collection(Post).upsert(item);
        }
        catch (err) {
        }
        this.allRecords = this.allRecords.map((record: Post) => {
            if ((record.id as Long).toString() == (item.id as Long).toString()) {
                console.log('record' + JSON.stringify(record));
                record.likeCount = item.likeCount;
                record.likes = item.likes;
            }
            return record;
        });
    }
    async orderByDate() {
        if (this.isSelected) {
            let userId: string = this.user ? this.user.getUid() : '';
            this.getMyPosts(userId);
        }
        else {
            this.getPostList();
        }
    }
    async orderByLikes() {
        if (this.isSelected) {
            let userId: string = this.user ? this.user.getUid() : '';
            this.getMyPostsByLike(userId);
        }
        else {
            this.orderByMostLiked();
        }
    }
    async onCheckboxToggle() {
        if (this.isSelected) {
            let userId: string = this.user ? this.user.getUid() : '';
            this.getMyPosts(userId);
        }
        else {
            this.getPostList();
        }
    }
    onCancel() {
        Logger.info(0x00, TAG, 'Cancel button is clicked');
    }
    onAccept() {
        Logger.info(0x00, TAG, 'Confirm button is clicked');
    }
    existApp() {
        Logger.info(0x00, TAG, 'Click the callback in the blank area');
    }
    pad(val: number) {
        let str = val.toString();
        return str.padStart(2, '0');
    }
    getFormattedDate(date: Date) {
        return ([date.getFullYear(), this.pad(date.getMonth() + 1), this.pad(date.getDate())].join('-')
            +
                ' '
            +
                [this.pad(date.getHours()), this.pad(date.getMinutes()), this.pad(date.getSeconds()),].join(':'));
    }
    render() {
        Column.create();
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
        Column.margin({
            left: 20,
            right: 20
        });
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.margin({ top: 10, bottom: 10 });
        Row.create();
        Row.create();
        Row.border({ radius: 4, width: 1 });
        Row.padding(5);
        Text.create($r('app.string.cloudDB_Publications'));
        Text.fontSize($r('app.float.list_item_font_size'));
        Text.onClick(() => {
            // order by date
            this.orderByDate();
        });
        Text.pop();
        Text.create('|');
        Text.fontSize($r('app.float.list_item_font_size'));
        Text.margin({ left: 5 });
        Text.pop();
        Text.create($r('app.string.cloudDB_HighestHit'));
        Text.fontSize($r('app.float.list_item_font_size'));
        Text.margin({ left: 5 });
        Text.onClick(() => {
            this.orderByLikes();
        });
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ left: 5 });
        If.create();
        if (this.user !== null && this.user !== undefined) {
            If.branchId(0);
            Checkbox.create();
            Checkbox.width(8);
            Checkbox.height(8);
            Checkbox.onChange((value: boolean) => {
                this.isSelected = value;
                this.onCheckboxToggle();
            });
            Checkbox.onAppear(() => {
                this.onCheckboxToggle();
            });
            Checkbox.select(this.isSelected);
            Checkbox.pop();
            Text.create($r('app.string.cloudDB_SeeOnly'));
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.pop();
        }
        If.pop();
        Row.pop();
        Row.pop();
        Row.create();
        If.create();
        if (this.user != null && this.user != undefined) {
            If.branchId(0);
            Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
            Button.width(70);
            Button.height(24);
            Button.borderRadius(4);
            Button.backgroundColor($r('app.color.login_button'));
            Button.onClick(() => {
                let params: RouterParamsType = {
                    isEditing: false,
                    checkBoxStatus: this.isSelected,
                };
                router.pushUrl({
                    url: 'pages/CloudDb/DbInsert',
                    params
                });
            });
            Text.create($r('app.string.cloudDB_new_record'));
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.textAlign(TextAlign.Center);
            Text.margin(5);
            Text.fontColor($r('app.color.white'));
            Text.pop();
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
            Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
            Button.width(70);
            Button.height(24);
            Button.borderRadius(4);
            Button.backgroundColor($r('app.color.login_button'));
            Text.create($r('app.string.cloudDB_new_record'));
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.textAlign(TextAlign.Center);
            Text.margin(5);
            Text.fontColor($r('app.color.white'));
            Text.pop();
            Button.pop();
            Column.pop();
        }
        If.pop();
        Row.pop();
        Flex.pop();
        Column.create();
        List.create({ initialIndex: 0, scroller: this.scroller });
        List.height('85%');
        List.scrollBar(BarState.Off);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.allRecords), (item: Post) => {
            ListItem.create();
            ListItem.padding(10);
            ListItem.border({ color: $r('app.color.black'), width: 1, radius: 4 });
            ListItem.margin({ top: 10 });
            Column.create();
            Column.create();
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ bottom: 15 });
            Image.create($r('app.media.window'));
            Image.width(20);
            Image.height(20);
            Text.create(item.insertDate ? this.getFormattedDate(new Date(item.insertDate)) : '');
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.pop();
            Flex.pop();
            Row.create();
            Row.margin({ bottom: 15 });
            Text.create(item.content);
            Text.fontSize($r('app.float.list_item_font_size'));
            Text.width('100%');
            Text.maxLines(2);
            Text.pop();
            Row.pop();
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            If.create();
            if (this.user != null && this.user != undefined && this.user?.getUid() === item?.userId) {
                If.branchId(0);
                Row.create();
                Row.create();
                Image.create($r("app.media.ic_public_delete_filled_red"));
                Image.width(20);
                Image.height(20);
                Image.margin({ right: 10 });
                Image.onClick(() => {
                    AlertDialog.show({
                        title: $r('app.string.deleteButton_label'),
                        message: $r('app.string.popUpDesc_label'),
                        primaryButton: {
                            value: $r('app.string.deleteButton_label'),
                            action: () => {
                                let userId: string = this.user ? this.user.getUid() : '';
                                this.deleteRecord(item, userId);
                            },
                            backgroundColor: $r('app.color.dialog_cancel_background'),
                            fontColor: $r('app.color.white')
                        },
                        secondaryButton: {
                            value: $r('app.string.cancelButton_label'),
                            action: () => {
                                this.onCancel();
                            },
                            fontColor: $r('app.color.action_button_background')
                        },
                        autoCancel: true
                    });
                });
                Image.create($r("app.media.ic_public_edit_outline"));
                Image.width(20);
                Image.height(20);
                Image.onClick(() => {
                    let recordId = '';
                    if (item.id !== undefined) {
                        recordId = item.id.toString();
                    }
                    let params: RouterParamsType = {
                        isEditing: true,
                        recordId: recordId,
                        content: item.content,
                        checkBoxStatus: this.isSelected,
                    };
                    router.pushUrl({
                        url: 'pages/CloudDb/DbInsert',
                        params
                    });
                });
                Row.pop();
                Row.pop();
            }
            If.pop();
            If.create();
            if (this.user != null && this.user != undefined) {
                If.branchId(0);
                Row.create();
                Text.create(item.likeCount.toString());
                Text.fontSize($r('app.float.list_item_font_size'));
                Text.pop();
                Image.create(item.likes.includes(this.user?.getUid()) && this.user?.getUid() ? $r('app.media.ic_public_thumbsup_filled') : $r('app.media.ic_public_thumbsup'));
                Image.width(20);
                Image.height(20);
                Image.margin({ left: 5 });
                Image.onClick(() => {
                    this.updateLikeCount(item);
                });
                Row.pop();
            }
            else {
                If.branchId(1);
                Row.create();
                Login.create({
                    modes: [AuthMode.PHONE_VERIFY_CODE],
                    onSuccess: (user: AuthUser) => {
                        this.isShowButton = false;
                        AppStorage.Set<AuthUser>('user', user);
                    }
                });
                Row.create();
                Text.create(item.likeCount.toString());
                Text.fontSize($r('app.float.list_item_font_size'));
                Text.pop();
                Image.create($r('app.media.ic_public_thumbsup'));
                Image.width(20);
                Image.height(20);
                Image.margin({ left: 5 });
                Row.pop();
                Row.pop();
            }
            If.pop();
            Flex.pop();
            Column.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new CloudDb("1", undefined, {}));
