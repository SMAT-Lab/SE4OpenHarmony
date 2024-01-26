interface MySpan_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySpan_" + ++__generate__Id;
}
export class MySpan extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySpan_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.height(250);
        Flex.padding({ left: 35, right: 35, top: 35 });
        Text.create('Basic Usage');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Text.create();
        Span.create('This is the Span component');
        Span.fontSize(12);
        Span.textCase(TextCase.Normal);
        Span.decoration({ type: TextDecorationType.None, color: Color.Red });
        Text.pop();
        // 文本横线添加
        Text.create('Text Decoration');
        // 文本横线添加
        Text.fontSize(9);
        // 文本横线添加
        Text.fontColor(0xCCCCCC);
        // 文本横线添加
        Text.pop();
        Text.create();
        Span.create('I am Underline-span');
        Span.decoration({ type: TextDecorationType.Underline, color: Color.Red });
        Span.fontSize(12);
        Text.pop();
        Text.create();
        Span.create('I am LineThrough-span');
        Span.decoration({ type: TextDecorationType.LineThrough, color: Color.Red });
        Span.fontSize(12);
        Text.pop();
        Text.create();
        Span.create('I am Overline-span');
        Span.decoration({ type: TextDecorationType.Overline, color: Color.Red });
        Span.fontSize(12);
        Text.pop();
        // 文本字符间距
        Text.create('LetterSpacing');
        // 文本字符间距
        Text.fontSize(9);
        // 文本字符间距
        Text.fontColor(0xCCCCCC);
        // 文本字符间距
        Text.pop();
        Text.create();
        Span.create('span letter spacing');
        Span.letterSpacing(0);
        Span.fontSize(12);
        Text.pop();
        Text.create();
        Span.create('span letter spacing');
        Span.letterSpacing(-2);
        Span.fontSize(12);
        Text.pop();
        Text.create();
        Span.create('span letter spacing');
        Span.letterSpacing(3);
        Span.fontSize(12);
        Text.pop();
        // 文本大小写展示设置
        Text.create('Text Case');
        // 文本大小写展示设置
        Text.fontSize(9);
        // 文本大小写展示设置
        Text.fontColor(0xCCCCCC);
        // 文本大小写展示设置
        Text.pop();
        Text.create();
        Span.create('I am Lower-span');
        Span.fontSize(12);
        Span.textCase(TextCase.LowerCase);
        Span.decoration({ type: TextDecorationType.None });
        Text.pop();
        Text.create();
        Span.create('I am Upper-span');
        Span.fontSize(12);
        Span.textCase(TextCase.UpperCase);
        Span.decoration({ type: TextDecorationType.None });
        Text.pop();
        Flex.pop();
    }
}
