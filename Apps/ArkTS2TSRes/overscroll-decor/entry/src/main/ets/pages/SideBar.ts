interface SideBar_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBar_" + ++__generate__Id;
}
import router from '@system.router';
class SideBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBar_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 10 });
        Column.height("100%");
        Column.width("85%");
        Column.backgroundColor(Color.White);
        Row.create({ space: 5 });
        Row.height("20%");
        Row.width("100%");
        Row.backgroundColor("#ffffbb33");
        Image.create($r('app.media.image'));
        Image.objectFit(ImageFit.Contain);
        Image.width("29%");
        Image.height("53%");
        Image.margin({ left: 16, right: 16 });
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create("Over-Scroll Demo App");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.width("60%");
        Text.pop();
        Text.create("EverythingMe");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/RecyclerViewAttachDemo' });
        });
        Image.create($r('app.media.ic_recycler'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("RecyclerView Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/RecyclerViewStaggeredGridDemo' });
        });
        Image.create($r('app.media.ic_recycler'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("RecyclerView - St.Grid Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/GridViewDemo' });
        });
        Image.create($r('app.media.ic_grid'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("Grid Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/ListViewDemo' });
        });
        Image.create($r('app.media.ic_list'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("ListView Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/ScrollViewDemo' });
        });
        Image.create($r('app.media.ic_scroller'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("ScrollView Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/ViewPagerDemo' });
        });
        Image.create($r('app.media.ic_view_pager'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("ViewPager Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/NestedScrollViewDemo' });
        });
        Image.create($r('app.media.ic_nested'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("NestedScrollView Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Row.create({ space: 15 });
        Row.height("6%");
        Row.width("100%");
        Row.onClick((event?: ClickEvent) => {
            router.push({ uri: 'pages/MiscViewsDemo' });
        });
        Image.create($r('app.media.ic_misc'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 8 });
        Text.create("Misc-Views  Demo");
        Text.fontSize(25);
        Text.fontColor("#727171");
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
export default SideBar;
