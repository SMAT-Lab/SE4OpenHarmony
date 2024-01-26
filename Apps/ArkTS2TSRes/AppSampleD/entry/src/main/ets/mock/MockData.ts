let __generate__Id: number = 0;
function generateId(): string {
    return "MockData_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import User from '../appsampled/data/User';
import Tool from '../appsampled/data/Tool';
import { SearchResult, AudioInfo, VideoDetailInfo, VideoInfo } from '../appsampled/data/SearchResult';
export class MockInput {
    public static readonly TEST_INPUT_CONTENT_1: string = '黑夜问白天';
    public static readonly TEST_INPUT_CONTENT_2: string = '哦想';
    public static readonly TEST_INPUT_CONTENT_3: string = '我不愿让你一个人';
}
export function getMockUser(): Array<User> {
    let userArr: Array<User> = [];
    userArr.push(new User('opposite user', $r('app.media.app_icon')));
    userArr.push(new User('user1', $r('app.media.app_icon')));
    userArr.push(new User('user2', $r('app.media.app_icon')));
    userArr.push(new User('user3', $r('app.media.app_icon')));
    userArr.push(new User('user4', $r('app.media.app_icon')));
    userArr.push(new User('user5', $r('app.media.app_icon')));
    userArr.push(new User('user6', $r('app.media.app_icon')));
    userArr.push(new User('user7', $r('app.media.app_icon')));
    userArr.push(new User('user8', $r('app.media.app_icon')));
    return userArr;
}
export function getMockTool(): Array<Tool> {
    let userArr: Array<Tool> = [];
    userArr.push(new Tool('打招呼', $r('app.media.app_icon')));
    userArr.push(new Tool('比个心', $r('app.media.app_icon')));
    userArr.push(new Tool('相册随机', $r('app.media.app_icon')));
    userArr.push(new Tool('以图换图', $r('app.media.app_icon')));
    userArr.push(new Tool('视频通话', $r('app.media.app_icon')));
    return userArr;
}
export function getMockSearch(): Array<string> {
    let arr: Array<string> = [];
    arr.push('黑夜问白天');
    arr.push('哦想');
    arr.push('我不愿让你一个人');
    arr.push('test data 4');
    arr.push('测试数据 5');
    arr.push('test data 6');
    arr.push('测试数据 7');
    arr.push('test data 8');
    arr.push('测试数据 9');
    return arr;
}
export function getMockSearchResult(): Array<SearchResult> {
    let labelList: Array<Array<string>> = getLabelList();
    let audioInfoList: Array<Array<AudioInfo>> = getAudioInfoList();
    let videoDetailInfoList: Array<Array<VideoDetailInfo>> = getVideoDetailInfoList();
    let videoInfoList: Array<Array<VideoInfo>> = getVideoInfoList();
    let searchResultList: Array<SearchResult> = [
        new SearchResult(labelList[0], audioInfoList[0], videoDetailInfoList[0], videoInfoList[0]),
        new SearchResult(labelList[1], audioInfoList[1], videoDetailInfoList[1], videoInfoList[1]),
        new SearchResult(labelList[2], audioInfoList[2], videoDetailInfoList[2], videoInfoList[2]),
    ];
    return searchResultList;
}
function getLabelList(): Array<Array<string>> {
    let labelList: Array<Array<string>> = [
        ['翻唱', '林俊杰', '合拍', '吉他弹唱', '女生', '歌曲教学'],
        ['手势舞', '翻唱', '舞蹈', '安与骑兵', '广场舞', '疯狂梗传'],
        ['伴奏', '五月天', '合唱', '林俊杰', '吉他弹唱', '钢琴']
    ];
    return labelList;
}
function getAudioInfoList(): Array<Array<AudioInfo>> {
    let audioInfoList: Array<Array<AudioInfo>> = [
        [
            new AudioInfo(1, '黑夜问白天', $r('app.media.app_icon'), '林俊杰', '02:03', '42.7万人使用', 'demo_video.mp4'),
            new AudioInfo(2, '黑夜问白天（TV）', $r('app.media.app_icon'), '林俊杰', '00:32', '22.4万使用', 'demo_video.mp4'),
            new AudioInfo(3, '黑夜问白天（演唱会）', $r('app.media.app_icon'), '林俊杰', '01:31', '35.6万使用', 'demo_video.mp4')
        ],
        [
            new AudioInfo(1, '哦想', $r('app.media.app_icon'), '安与骑兵', '01:04', '1.7万人使用', 'demo_video.mp4'),
            new AudioInfo(2, '哦想（剪辑版）', $r('app.media.app_icon'), '安与骑兵', '00:30', '1685人使用', 'demo_video.mp4'),
            new AudioInfo(3, '哦想（Cover安与骑兵）', $r('app.media.app_icon'), '听月@国酒香', '01：04', '3309人使用', 'demo_video.mp4')
        ],
        [
            new AudioInfo(1, '我不愿让你一个人', $r('app.media.app_icon'), '五月天', '01:00', '3.3万人使用', 'demo_video.mp4'),
            new AudioInfo(2, '我不愿让你一个人（剪辑版）', $r('app.media.app_icon'), '年岁并进', '00:35', '1.3万人使用', 'demo_video.mp4'),
            new AudioInfo(3, '我不愿让你一个人', $r('app.media.app_icon'), '五月天', '01:00', '982人使用', 'demo_video.mp4')
        ]
    ];
    return audioInfoList;
}
function getVideoDetailInfoList(): Array<Array<VideoDetailInfo>> {
    let videoDetailInfoList: Array<Array<VideoDetailInfo>> = [
        [
            new VideoDetailInfo(1, '重拾快乐~', $r('app.media.app_icon'), '2021.10.12', '《黑夜问白天》林俊杰', '#林俊杰', '2.8w', '2188', '8487', '8062', 'demo_video.mp4', '韦德', $r('app.media.app_icon'), '贫穷让我们相遇', '3711'),
            new VideoDetailInfo(2, '俊杰观察', $r('app.media.app_icon'), '2022.02.28', '林俊杰清唱功底有多强', '#林俊杰#黑夜问白天#清唱', '49.3w', '3.6w', '2.7w', '4.4w', 'demo_video.mp4', '小桃冰茶', $r('app.media.app_icon'), '可以没有伴奏，不能没有提词器', '7.5万'),
            new VideoDetailInfo(3, '王巨星', $r('app.media.app_icon'), '2021.11.30', '好喜欢的歌啊啊啊啊', '#林俊杰', '65.5w', '1.5w', '2.3w', '2.8w', 'demo_video.mp4', 'LCCL', $r('app.media.app_icon'), '如果王巨星回复了我，我就好好生活', '2.4万')
        ],
        [
            new VideoDetailInfo(1, '青鸟艺术声乐培训', $r('app.media.app_icon'), '2022.06.10', '给高考准备的一首歌', '#青鸟艺术声乐培训#高考#小助手', '85.6w', '3.6w', '6.2w', '6.0w', 'demo_video.mp4', '小小的太阳', $r('app.media.app_icon'), '我的喉咙只适合做核酸', '4.5万'),
            new VideoDetailInfo(2, 'Old马声乐小课堂', $r('app.media.app_icon'), '2022.11.16', '艺考选取曲子不能盲目跟风 挑选合适自己的作品最重要', '#音乐艺考生#声乐教学#无声卡演唱', '1.5w', '640', '1190', '2228', 'demo_video.mp4', 'zhongchuYYDS', $r('app.media.app_icon'), '感觉她咬字太流行了', '1486'),
            new VideoDetailInfo(3, '女王', $r('app.media.app_icon'), '2022.06.12', '安于骑兵演唱的《哦想》', '#聆听天籁之音#音乐分享', '3042', '244', '1174', '1319', 'demo_video.mp4', '用户5295745367339', $r('app.media.app_icon'), '还是原唱好', '101')
        ],
        [
            new VideoDetailInfo(1, '一只喵', $r('app.media.app_icon'), '2023.05.29', '如果相识不能相恋 是不是还不如擦肩', '#五月天 #林俊杰 #我不愿让你一个人 #突然好想你', '21.4w', '1.7w', '2.7w', '3.2w', 'demo_video.mp4', '1', $r('app.media.app_icon'), '这四首歌放一起', '1.6万'),
            new VideoDetailInfo(2, '碑海北', $r('app.media.app_icon'), '2021.11.23', '我不愿让你一个人', '#奔向浪漫', '45.5w', '4.0w', '1.8w', '9.0w', 'demo_video.mp4', 'veafew520', $r('app.media.app_icon'), '为什么看这样的视频会哭？', '1.3万'),
            new VideoDetailInfo(3, '诺', $r('app.media.app_icon'), '2023.01.02', '懂你疼你更好的人', '#我不愿让你一个人', '14.4w', '5469', '9736', '1.4w', 'demo_video.mp4', '橘澜', $r('app.media.app_icon'), '不出意外的话这辈子都见不到了', '5554')
        ]
    ];
    return videoDetailInfoList;
}
function getVideoInfoList(): Array<Array<VideoInfo>> {
    let videoInfoList: Array<Array<VideoInfo>> = [
        [
            new VideoInfo('重拾快乐~', $r('app.media.app_icon'), '2.8w', '《黑夜问白天》林俊杰', $r('app.media.app_icon')),
            new VideoInfo('王巨星', $r('app.media.app_icon'), '65.5w', '好喜欢的歌啊啊啊啊', $r('app.media.app_icon')),
            new VideoInfo('林俊杰', $r('app.media.app_icon'), '108.2w', '今晚大家开心吗', $r('app.media.app_icon')),
            new VideoInfo('俊杰观察', $r('app.media.app_icon'), '49.3w', '林俊杰清唱功底有多强？', $r('app.media.app_icon')),
            new VideoInfo('心跳乱了节奏', $r('app.media.app_icon'), '8467', '大哥又是压轴！熬最深的夜，看年少青春', $r('app.media.app_icon')),
            new VideoInfo('俊杰观察', $r('app.media.app_icon'), '17.2w', '在半空中真好...不会吵...被忽略的好歌！', $r('app.media.app_icon')),
            new VideoInfo('音雨蓝', $r('app.media.app_icon'), '4.9w', '湖南女子学院校园操场上，小哥翻唱林俊杰《黑夜问白天》', $r('app.media.app_icon')),
            new VideoInfo('会火大明星', $r('app.media.app_icon'), '3.3w', '没人可以拒绝黑夜问白天全程跟唱！', $r('app.media.app_icon')),
            new VideoInfo('曹雨航', $r('app.media.app_icon'), '59.0w', '等再见不如说一次再见#林俊杰', $r('app.media.app_icon')),
            new VideoInfo('音雨蓝', $r('app.media.app_icon'), '17.5w', '#大学生活#黑夜问白天翻唱', $r('app.media.app_icon'))
        ],
        [
            new VideoInfo('民谣小酒馆', $r('app.media.app_icon'), '1.6w', '清澈的嗓音，宛如天籁之音', $r('app.media.app_icon')),
            new VideoInfo('Old马声乐小课堂', $r('app.media.app_icon'), '1.5w', '艺考选取曲子不能盲目跟风 挑选合适自己的作品最重要', $r('app.media.app_icon')),
            new VideoInfo('女王', $r('app.media.app_icon'), '3043', '安于骑兵演唱的《哦想》', $r('app.media.app_icon')),
            new VideoInfo('故里音乐', $r('app.media.app_icon'), '123', '有粉丝说想听#完整版必须安排上', $r('app.media.app_icon')),
            new VideoInfo('倾听音乐', $r('app.media.app_icon'), '7543', '《哦，想》被小女孩和老师唱红了全网', $r('app.media.app_icon')),
            new VideoInfo('安与骑兵', $r('app.media.app_icon'), '1.6w', '#安与骑兵 清唱《哦！想》', $r('app.media.app_icon')),
            new VideoInfo('688音乐视频', $r('app.media.app_icon'), '1.0w', '第18集 女孩刚刚开口歌声已经是我醉了', $r('app.media.app_icon')),
            new VideoInfo('忆路音乐', $r('app.media.app_icon'), '2.8w', '来听听原唱，哦了半天发现我这嗓子还是只适合做核酸', $r('app.media.app_icon')),
            new VideoInfo('郭一橙', $r('app.media.app_icon'), '1870', '#真人真唱#广场舞', $r('app.media.app_icon')),
            new VideoInfo('歌吧音乐', $r('app.media.app_icon'), '5.3w', '干净的声音，犹如天籁,生活明朗，万物可爱', $r('app.media.app_icon'))
        ],
        [
            new VideoInfo('五月天饭团', $r('app.media.app_icon'), '45.8w', '#五月天 五月天的歌里什么都有，唯独没有纠缠', $r('app.media.app_icon')),
            new VideoInfo('碑海北', $r('app.media.app_icon'), '45.5w', '我不愿让你一个人', $r('app.media.app_icon')),
            new VideoInfo('碑海北', $r('app.media.app_icon'), '33.7w', '一段健康的感情可以让你每晚平静入睡', $r('app.media.app_icon')),
            new VideoInfo('一只喵', $r('app.media.app_icon'), '21.4w', '如果相识不能相恋 是不是还不如擦肩', $r('app.media.app_icon')),
            new VideoInfo('良友音乐409', $r('app.media.app_icon'), '7788', '五月天的《我不愿让你一个人》', $r('app.media.app_icon')),
            new VideoInfo('五月天饭团', $r('app.media.app_icon'), '4.5w', '#五月天 life版《我不愿让你一个人》', $r('app.media.app_icon')),
            new VideoInfo('橘子调', $r('app.media.app_icon'), '2.1w', '五月天的歌#后来的我们', $r('app.media.app_icon')),
            new VideoInfo('俊杰观察', $r('app.media.app_icon'), '7.1w', '也许未来你会找到懂你疼你更好的人', $r('app.media.app_icon')),
            new VideoInfo('诺', $r('app.media.app_icon'), '14.4w', '#我不愿让你一个人 懂你疼你更好的人', $r('app.media.app_icon')),
            new VideoInfo('孤思路', $r('app.media.app_icon'), '11.0w', '和@音乐人青峰（合拍）一起', $r('app.media.app_icon'))
        ]
    ];
    return videoInfoList;
}
