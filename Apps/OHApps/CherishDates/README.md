# CherishDates——基于OpenHarmony的重要日子提醒工具



| 姓名 | 专业 | 学号       |
| ---- | --- | ---------- |
| 王恺璇 | 人工智能 | 202111081085 |
| 钟芸霏 | 人工智能 | 202111081008 |





## 一、项目介绍

<font color="blue">简要介绍项目开发背景、实现功能。</font>

<img src="https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/1.PNG" alt="1" style="zoom: 50%;" />

应用介绍【CherishDates】
CherishDates是一款用于记录生活中重要日子的 App ,可以用于记录：
纪念日：如结婚纪念日、情侣纪念日、生日纪念日等；
有效期：如化妆品过期时间、药品有效期、食物保质期等；
天数：如恋爱天数等；
还具有提醒功能，可以用作生日提醒、打卡提醒、纪念日提醒等重要日子的提醒。
【有哪些功能和特点】
＊公历和农历都支持；
＊多种主题色彩支持；
＊多种分类标签支持。





## 二、人员分工

- **成员1：王恺璇** 
  - 主要负责TabPage、ToolPage、MainnPage、JitangPage、XingzuoPage、Xingzuo2Page、WenanPage、XiaohuaPage、WhitenoisePage、CutiePetPage以及全部Model和Component开发
  - 负责报告撰写

* **成员2：钟芸霏**
  * 主要负责LoginPage、AddPage、MePage、GiftBoxPage、PurchaseHistoryPage、SettingPage开发
  * 负责视频制作、PPT制作以及报告撰写





## 三、 项目开发环境和Gitee代码开源

- ### 开发硬件型号、开发软件环境、使用编程语言

  - 硬件型号：DAYU200
  - 软件环境：OpenHarmony 3.2.13.5
  - 编程语言：DevEco-ArkTS

- ### Gitee代码开源

  - gitee链接：https://gitee.com/whoopeeeeeee/open-harmony/tree/master/CherishDates
  - gitee首页截图
  

![2](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/2.PNG)



## 四、程序整体架构及技术说明

<font color=blue>画出架构图。简要说明功能以及所使用的技术点。</font>

![3](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/3.PNG)

![4](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/4.PNG)

![5](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/5.PNG)

​		打开APP，页面加载画面（OpenPage）运用了progress进度条。

​		首页（MainnPage）运用了Text，Image，Button等基础组件以及Row，Column，Tabs等容器组件，同时进行了日期弹窗和文本弹窗设计。

​		在工具页（ToolPage），我们使用来源于聚合数据的API，并在这里进一步运用了Video和Web等功能组件、Http网络请求以及自定义组件Component。

​		在我的页面通过router实现页面跳转，并涉及了文本弹窗、切换按钮Toggle等。同时可以通过router back跳转页面回到原页面。

​		与此同时我们完成了应用以及桌面上UIAbility图标和名称的修改。

![7](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/7.PNG)





## 五、总结展望

<font color=blue>总结已经完成的项目功能和效果，分析存在的不足并提出进一步改进的方向。</font>

#### 已经完成的项目功能和效果

打开APP，页面完成加载后进入首页。在首页可以添加重要日子：点击加号，输入日子的名称、日期和类别，在这里也可以进行模板选择、提醒设置、置顶等操作。

![6](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/6.PNG)

在工具页，点击”每日打气“查看正能量文案；点击”星座运势“，根据日期或星座名称，查询星座详细信息；点击”治愈萌宠“，与可爱的至于萌宠一起放松身心，享受纯粹的快乐时光；点击”静心白噪“，播放白噪音视频，进入宁静世界，舒缓压力，提供放松和专注的美妙体验；点击”文案生成“，轻松生成朋友圈文案；点击“轻松一刻”，查看笑话一则。

![9](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/9.PNG)

在我的页面通过router实现页面跳转：通过“点击登录”可以进行登录；点击“提醒日礼盒”可以查看付费功能；点击“购买记录”可以查看帐号历史购买记录；点击“设置”可以进行APP功能设置——包括数据同步、主题颜色、密码锁等；同时点击“分享给好友”、“联系我们”、“给个评价”会出现可供选择的弹窗。

![8](https://gitee.com/whoopeeeeeee/open-harmony/raw/master/CherishDates/IMG-storage/8.PNG)

#### 存在的不足以及进一步改进的方向

受限于时间以及技术水平，我们意识到这款APP目前仍有许多需要完善的地方。以下是我们计划改进的主要方面：

1. 倒计时功能的缺失：我们将着手编写倒计时功能，以满足用户对于天数倒计时的需求。未来的版本中，您将能够使用该功能来追踪“中高考倒计时”、“生日倒计时”、“考研倒计时”等重要日子的倒计时功能。

2. 添加日期的次数受限：目前，我们在首页上预置了透明方框，用户可以在添加页面输入“重要日子名称”、“日期”、“类别”等参数，在页面间参数传递的同时，方框背景色将变为白色。然而，我们意识到目前预置的透明方框数量有限，一旦填满，无法再进行添加操作。在下一个版本中，我们将尝试新的传参方法，以解决此问题，并使用户能够无限制地添加重要日期。

3. 页面间切换方式和设计简单性：目前页面间切换方式相对单一，且页面设计相对简单。为了提升用户体验，我们将进一步美化页面设计，增加更多的切换效果和交互细节。我们计划在未来的更新中，通过引入更多的视觉元素和交互特性来改善页面设计，使用户感到更加愉悦和舒适。





## 六、其他

<font color=blue>开发期间遇到问题的解决方案，心得体会等。</font>

#### 遇到问题的解决方案

1、previewer和开发板上比例不一致：在previewer上预览效果较好的页面在开发板上会出现变形，比如页面过长或组件宽度不一致等。对于过长的页面，我们添加了scroll功能，可以通过滑动操作在开发板上看到完整的页面。对于组件宽度不一致的情况，我们添加Blank( )并修改margin中的参数，在每次修改后运行到开发板上查看效果。

2、 将添加的重要日子显示在首页上：我们在AddPage上添加了参数传递，将重要日子的”名称“、”日期“、”类别“传递给首页，并在首页上预置了透明方框接受传递参数。

3、在调用API时出现报错：修改模型中的变量和API接口返回的参数一致。

4、在开发板上运行”星座运势“出现闪退、无法播放”静心白噪“中的视频：重新连网后再查看就可正常操作。

#### 心得体会

在本次实训课程中，我们学习使用ArkTS语言完成基于OpenHarmony系统的UI界面开发。这是一个之前没有接触过的模块，而且课程时间较短，网络上能查到的学习资料较少，需要在短时间内理解掌握大量知识，并完成运用产出，这对我们来说是不小的挑战。我们在开发项目的过程中也遇到了很多问题，但是通过解决这些问题，我们学到了很多，并进一步巩固了课内所学知识。

非常感谢这次实训课程，它让我们有机会接触到相对实际的编程项目。通过这次实训，我们不仅仅是通过理论学习，还实际应用了所学的知识。我们学习了解了OpenHarmony系统和DevEco编程环境，并熟悉了开发板的操作使用。这使我们对这些工具和平台有了更深入的了解，为我们将来在实际项目中应用这些技术打下了坚实的基础。

总之，这次实训课程不仅让我们面对挑战，锻炼了我们解决问题的能力，还让我们对新的编程语言和开发环境有了更深入的了解。我们相信这些经历将对我们的职业发展产生积极的影响，并为我们在未来的学习和工作中提供更多的机会和可能性。