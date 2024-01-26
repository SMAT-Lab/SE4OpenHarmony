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
  static readonly RULES_OF_THE_GAME='' +
  '共有红黄蓝绿四张卡；' +
  '红卡+50，黄卡+10，绿卡-5，蓝卡归0；' +
  '每轮游戏共3次抽卡机会，' +
  '每抽一次、记录一次得分，' +
  '抽卡结束后根据总得分进行成绩分段：'+
  '【 状元(≥50)、榜眼(40)、探花(25)、进士(10)、壮志未酬(<10) 】  ' +
  '抽到红卡(得分≥50)游戏结束；' +
  '抽到蓝卡(得分归0)游戏结束；' +
  '3次机会用完,游戏结束。';
  /**
   * 日志样式
   */
  static readonly LOG_COLOR:number=0x00BFFF
  static readonly TAG:string='MyTAG----'
  /**
   * GameAbility中的FinalGrade页
   */
  static readonly SECOND_URL2: string = 'pages/FinalGrade';

}