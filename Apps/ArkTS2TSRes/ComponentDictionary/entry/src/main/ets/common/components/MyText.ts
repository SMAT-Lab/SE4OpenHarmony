interface MyText_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyText_" + ++__generate__Id;
}
export class MyText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyText_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(600);
        Flex.width(350);
        Flex.padding({ left: 35, right: 35, top: 35 });
        // 文本水平方向对齐方式设置
        // 单行文本
        Text.create('textAlign');
        // 文本水平方向对齐方式设置
        // 单行文本
        Text.fontSize(9);
        // 文本水平方向对齐方式设置
        // 单行文本
        Text.fontColor(0xCCCCCC);
        // 文本水平方向对齐方式设置
        // 单行文本
        Text.pop();
        Text.create('TextAlign set to Center.');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.width('100%');
        Text.pop();
        Text.create('TextAlign set to Start.');
        Text.textAlign(TextAlign.Start);
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.width('100%');
        Text.pop();
        Text.create('TextAlign set to End.');
        Text.textAlign(TextAlign.End);
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.width('100%');
        Text.pop();
        // 多行文本
        Text.create('This is the text content with textAlign set to Center.');
        // 多行文本
        Text.textAlign(TextAlign.Center);
        // 多行文本
        Text.fontSize(12);
        // 多行文本
        Text.border({ width: 1 });
        // 多行文本
        Text.padding(10);
        // 多行文本
        Text.width('100%');
        // 多行文本
        Text.pop();
        Text.create('This is the text content with textAlign set to Start.');
        Text.textAlign(TextAlign.Start);
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.width('100%');
        Text.pop();
        Text.create('This is the text content with textAlign set to End.');
        Text.textAlign(TextAlign.End);
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.width('100%');
        Text.pop();
        // 文本超长时显示方式
        Text.create('TextOverflow+maxLines');
        // 文本超长时显示方式
        Text.fontSize(9);
        // 文本超长时显示方式
        Text.fontColor(0xCCCCCC);
        // 文本超长时显示方式
        Text.pop();
        // 超出maxLines截断内容展示
        Text.create('This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content. This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content.');
        // 超出maxLines截断内容展示
        Text.textOverflow({ overflow: TextOverflow.None });
        // 超出maxLines截断内容展示
        Text.maxLines(1);
        // 超出maxLines截断内容展示
        Text.fontSize(12);
        // 超出maxLines截断内容展示
        Text.border({ width: 1 });
        // 超出maxLines截断内容展示
        Text.padding(10);
        // 超出maxLines截断内容展示
        Text.pop();
        // 超出maxLines展示省略号
        Text.create('This is set textOverflow to Ellipsis text content This is set textOverflow to Ellipsis text content.'.split('')
            .join('\u200B'));
        // 超出maxLines展示省略号
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        // 超出maxLines展示省略号
        Text.maxLines(1);
        // 超出maxLines展示省略号
        Text.fontSize(12);
        // 超出maxLines展示省略号
        Text.border({ width: 1 });
        // 超出maxLines展示省略号
        Text.padding(10);
        // 超出maxLines展示省略号
        Text.pop();
        Text.create('lineHeight');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Text.create('This is the text with the line height set. This is the text with the line height set.');
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.pop();
        Text.create('This is the text with the line height set. This is the text with the line height set.');
        Text.fontSize(12);
        Text.border({ width: 1 });
        Text.padding(10);
        Text.lineHeight(20);
        Text.pop();
        Flex.pop();
    }
}
