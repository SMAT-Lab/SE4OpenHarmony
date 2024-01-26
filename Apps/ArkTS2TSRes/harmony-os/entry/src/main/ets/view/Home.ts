interface Home_Params {
    swiperController?: SwiperController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Home_" + ++__generate__Id;
}
import CommonConstants from '../common/constants/CommonConstants';
import mainViewModel from '../viewmodel/MainViewModel';
import ItemData from '../common/bean/ItemData';
export default class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    render() {
        Scroll.create();
        Column.create();
        Column.create();
        Column.width(CommonConstants.FULL_PARENT);
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.mainPage_tabTitles_home'));
        Text.fontWeight(FontWeight.Medium);
        Text.fontSize($r('app.float.page_title_text_size'));
        Text.margin({
            top: $r('app.float.mainPage_tabTitles_margin')
        });
        Text.padding({ left: $r('app.float.mainPage_tabTitles_padding') });
        Text.pop();
        Column.pop();
        // 轮播图
        Swiper.create(this.swiperController);
        // 轮播图
        Swiper.margin({ top: $r('app.float.home_swiper_margin') });
        // 轮播图
        Swiper.autoPlay(true);
        ForEach.create("2", this, ObservedObject.GetRawObject(mainViewModel.getSwiperImages()), (img: Resource) => {
            Image.create(img);
            Image.borderRadius($r('app.float.home_swiper_borderRadius'));
        }, img => img);
        ForEach.pop();
        // 轮播图
        Swiper.pop();
        //   第一个栅格
        Grid.create();
        //   第一个栅格
        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
        //   第一个栅格
        Grid.rowsTemplate('1fr 1fr');
        //   第一个栅格
        Grid.columnsGap($r('app.float.home_grid_columnsGap'));
        //   第一个栅格
        Grid.rowsGap($r('app.float.home_grid_rowGap'));
        //   第一个栅格
        Grid.padding({
            top: $r('app.float.home_grid_padding'),
            bottom: $r('app.float.home_grid_padding')
        });
        //   第一个栅格
        Grid.height($r('app.float.home_grid_height'));
        //   第一个栅格
        Grid.backgroundColor(Color.White);
        //   第一个栅格
        Grid.borderRadius($r('app.float.home_grid_borderRadius'));
        // 遍历拿到每一个栅格对象
        ForEach.create("3", this, ObservedObject.GetRawObject(mainViewModel.getFirstGridData()), (item: ItemData) => {
            GridItem.create();
            Column.create();
            Image.create(item.img);
            Image.width($r('app.float.home_homeCell_size'));
            Image.height($r('app.float.home_homeCell_size'));
            Text.create(item.title);
            Text.fontSize($r('app.float.little_text_size'));
            Text.margin({ top: $r('app.float.home_homeCell_margin') });
            Text.pop();
            Column.pop();
            GridItem.pop();
        }, item => JSON.stringify(item));
        // 遍历拿到每一个栅格对象
        ForEach.pop();
        //   第一个栅格
        Grid.pop();
        // 列表文字
        Text.create($r('app.string.home_list'));
        // 列表文字
        Text.fontSize($r('app.float.normal_text_size'));
        // 列表文字
        Text.fontWeight(FontWeight.Medium);
        // 列表文字
        Text.width(CommonConstants.FULL_PARENT);
        // 列表文字
        Text.margin({ top: $r('app.float.home_text_margin') });
        // 列表文字
        Text.pop();
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.create();
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.width(CommonConstants.FULL_PARENT);
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.height($r('app.float.home_secondGrid_height'));
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.columnsTemplate('1fr 1fr');
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.rowsTemplate('1fr 1fr');
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.columnsGap($r('app.float.home_grid_columnsGap'));
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.rowsGap($r('app.float.home_grid_rowGap'));
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.margin({ bottom: $r('app.float.setting_button_bottom') });
        // 遍历 mainViewModel 中的二维数组数据，设置每个 GridItem 的显示内容
        ForEach.create("4", this, ObservedObject.GetRawObject(
        // 获取二维数据，并通过匿名函数描述如何对于每个 secondItem 数据进行操作
        mainViewModel.getSecondGridData()), (secondItem: ItemData) => {
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.create();
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.padding({ top: $r('app.float.home_list_padding'), left: $r('app.float.home_list_padding') });
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.borderRadius($r('app.float.home_backgroundImage_borderRadius'));
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.align(Alignment.TopStart);
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.backgroundImage(secondItem.img);
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.backgroundImageSize(ImageSize.Cover);
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.width(CommonConstants.FULL_PARENT);
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.height(CommonConstants.FULL_PARENT);
            // 每个 Column 布局可以呈现两行文本信息
            Column.create();
            // 每个 Column 布局可以呈现两行文本信息
            Column.alignItems(HorizontalAlign.Start);
            // 第一行展示 secondItem 的标题，设置字体大小、粗细、颜色
            Text.create(secondItem.title);
            // 第一行展示 secondItem 的标题，设置字体大小、粗细、颜色
            Text.fontSize($r('app.float.normal_text_size'));
            // 第一行展示 secondItem 的标题，设置字体大小、粗细、颜色
            Text.fontWeight(FontWeight.Medium);
            // 第一行展示 secondItem 的标题，设置字体大小、粗细、颜色
            Text.pop();
            // 第二行展示 secondItem 的其他信息，例如介绍、数量等
            Text.create(secondItem.others);
            // 第二行展示 secondItem 的其他信息，例如介绍、数量等
            Text.margin({ top: $r('app.float.home_list_margin') });
            // 第二行展示 secondItem 的其他信息，例如介绍、数量等
            Text.fontSize($r('app.float.little_text_size'));
            // 第二行展示 secondItem 的其他信息，例如介绍、数量等
            Text.fontColor($r('app.color.home_grid_fontColor'));
            // 第二行展示 secondItem 的其他信息，例如介绍、数量等
            Text.pop();
            // 每个 Column 布局可以呈现两行文本信息
            Column.pop();
            // 每个 GridItem 组件包含一个 Column 布局（即两行文本）和一些外观属性
            GridItem.pop();
        }, secondItem => JSON.stringify(secondItem) // 通过第二个匿名函数设置循环遍历的键值对
        );
        // 遍历 mainViewModel 中的二维数组数据，设置每个 GridItem 的显示内容
        ForEach.pop();
        //   第二个栅格
        // 定义网格布局 Grid 组件
        Grid.pop();
        Column.pop();
        Scroll.pop();
    }
}
