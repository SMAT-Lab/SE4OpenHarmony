let __generate__Id: number = 0;
function generateId(): string {
    return "SearchResult_" + ++__generate__Id;
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
/**
 * 综合类下的音频信息
 */
export class AudioInfo {
    public audioId: number; // 音频ID
    public audioName: string; // 音频名称
    public audioIcon: Resource; // 音频图片
    public audioAuthorName: string; // 音频作者名称
    public audioTime: string; // 音频时间
    public audioNum: string; // 音频使用人数
    public audio: string; // 播放音频的文件名称
    constructor(audioId: number, audioName: string, audioIcon: Resource, audioAuthorName: string, audioTime: string, audioNum: string, audio: string) {
        this.audioId = audioId;
        this.audioName = audioName;
        this.audioIcon = audioIcon;
        this.audioAuthorName = audioAuthorName;
        this.audioTime = audioTime;
        this.audioNum = audioNum;
        this.audio = audio;
    }
}
/**
 * 综合类下的视频信息
 */
export class VideoDetailInfo {
    public videoDetailId: number; // 视频ID
    public videoDetailAuthorName: string; // 视频作者名称
    public videoDetailAuthorIcon: Resource; // 视频作者头像
    public videoDetailTime: string; // 视频发布时间
    public videoDetailTitle: string; // 视频标题
    public videoDetailLabel: string; // 视频标签
    public videoDetailLike: string; // 视频点赞数
    public videoDetailComment: string; // 视频评论数
    public videoDetailCollect: string; // 视频收藏数
    public videoDetailTransmit: string; // 视频评论数
    public videoDetail: string; // 播放视频的文件名称
    public commenterName: string; // 评论人名称
    public commenterIcon: Resource; // 评论人头像
    public commenterContent: string; // 评论内容
    public commenterLike: string; // 评论点赞数
    constructor(videoDetailId: number, videoDetailAuthorName: string, videoDetailAuthorIcon: Resource, videoDetailTime: string, videoDetailTitle: string, videoDetailLabel: string, videoDetailLike: string, videoDetailComment: string, videoDetailCollect: string, videoDetailTransmit: string, videoDetail: string, commenterName: string, commenterIcon: Resource, commenterContent: string, commenterLike: string) {
        this.videoDetailId = videoDetailId;
        this.videoDetailAuthorName = videoDetailAuthorName;
        this.videoDetailAuthorIcon = videoDetailAuthorIcon;
        this.videoDetailTime = videoDetailTime;
        this.videoDetailTitle = videoDetailTitle;
        this.videoDetailLabel = videoDetailLabel;
        this.videoDetailLike = videoDetailLike;
        this.videoDetailComment = videoDetailComment;
        this.videoDetailCollect = videoDetailCollect;
        this.videoDetailTransmit = videoDetailTransmit;
        this.videoDetail = videoDetail;
        this.commenterName = commenterName;
        this.commenterIcon = commenterIcon;
        this.commenterContent = commenterContent;
        this.commenterLike = commenterLike;
    }
}
/**
 * 视频类下的视频信息
 */
export class VideoInfo {
    public videoAuthorName: string; // 视频作者名称
    public videoAuthorIcon: Resource; // 视频作者头像
    public videoLikeNum: string; // 视频点赞数
    public videoTitle: string; // 视频标题
    public video: Resource; // 视频展示图片的文件名称
    constructor(videoAuthorName: string, videoAuthorIcon: Resource, videoLikeNum: string, videoTitle: string, video: Resource) {
        this.videoAuthorName = videoAuthorName;
        this.videoAuthorIcon = videoAuthorIcon;
        this.videoLikeNum = videoLikeNum;
        this.videoTitle = videoTitle;
        this.video = video;
    }
}
/**
 * 一条搜索的搜索结果模板
 */
export class SearchResult {
    public labelList: Array<string>;
    public audioInfoList: Array<AudioInfo>;
    public videoDetailInfo: Array<VideoDetailInfo>;
    public videoInfo: Array<VideoInfo>;
    constructor(labelList: Array<string>, audioInfoList: Array<AudioInfo>, videoDetailInfo: Array<VideoDetailInfo>, videoInfo: Array<VideoInfo>) {
        this.labelList = labelList;
        this.audioInfoList = audioInfoList;
        this.videoDetailInfo = videoDetailInfo;
        this.videoInfo = videoInfo;
    }
}
