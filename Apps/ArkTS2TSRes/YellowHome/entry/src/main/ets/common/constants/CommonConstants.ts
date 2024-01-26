let __generate__Id: number = 0;
function generateId(): string {
    return "CommonConstants_" + ++__generate__Id;
}
//本类为自定义常用常量封装类
export default class CommonConstants {
    /**
     *首页标题
     */
    static readonly INDEX_MESSAGE: string = '进京赶考 ';
    /**
     *次页标题
     */
    static readonly SECOND_MESSAGE: string = 'This is the second page of Ability1 ';
    /**
     * 三页标题
     */
    static readonly THIRD_MESSAGE: string = 'This is the third page of Ability1 ';
    /**
     * 第二个Ability标题
     */
    static readonly SECOND_ABILITY_MESSAGE: string = 'This is the  page of Ability2 ';
    /**
     * 第三个Ability标题
     */
    static readonly THIRD_ABILITY_MESSAGE: string = 'This is the  page of Ability3 ';
    /**
     * 第二页url
     */
    static readonly SECOND_URL: string = 'pages/Second';
    /**
     * 第三页url
     */
    static readonly THIRD_URL: string = 'pages/Third';
    /**
     *页面跳转传递数据
     */
    static readonly PAGE_TRANSMIT_DATA: string = 'Harmony OS';
    /**
     * 游戏规则
     */
    static readonly RULES_OF_THE_GAME = '' +
        '共有红黄蓝绿四种签；' +
        '红签+50，黄签+10，绿签-5，蓝签归0；' +
        '每轮游戏共3次抽签机会，' +
        '每抽一次、记录一次得分，' +
        '抽签结束后根据总得分进行成绩分段：' +
        '【 状元(≥50)、榜眼(40)、探花(25)、进士(10)、壮志未酬(<10) 】  ' +
        '抽到红签(得分≥50)游戏结束；' +
        '抽到蓝签(得分归0)游戏结束；' +
        '3次机会用完,游戏结束。';
    /**
     * 日志样式
     */
    static readonly LOG_COLOR: number = 0x00BFFF;
    static readonly TAG: string = 'MyTAG----';
    /**
     * GameAbility中的FinalGrade页
     */
    static readonly SECOND_URL2: string = 'pages/FinalGrade';
    /*
     * 图片数组
     * */
    static images: Array<string> = ['images/red.jpg', 'images/yellow.jpg', 'images/blue.jpg', 'images/purple.jpg', 'images/green.jpg'];
}
