let __generate__Id: number = 0;
function generateId(): string {
    return "SongOption_" + ++__generate__Id;
}
class songItem {
    image: Resource;
    txt: string;
}
const songOption: songItem[] = [
    { image: $r('app.media.ic_collect'), txt: '999+' },
    { image: $r('app.media.ic_download'), txt: '下载' },
    { image: $r('app.media.ic_comments'), txt: '评论' },
    { image: $r('app.media.ic_share'), txt: '分享' },
];
const songList = [
    { id: 1, title: '不知道', image: '/images/svip.png', singer: '小碗你好' },
    { id: 2, title: '歌名你好', image: '/images/vip.png', singer: '张三-你好我好都好' },
    { id: 3, title: '还是歌名', image: '/images/huiyuan.png', singer: '不知道你是谁' },
    { id: 4, title: 'AIUHGVNHK', image: '/images/free.png', singer: 'Gwyu-Hjjiyabn' },
    { id: 5, title: '可可不喜欢', image: '/images/svip.png', singer: '名佚' },
    { id: 6, title: '我是UOUYGBJ', image: '/images/svip.png', singer: '我是小树' },
    { id: 7, title: '好好学习', image: '/images/svip.png', singer: '全村最帅' },
    { id: 8, title: '安心安心', image: '/images/svip.png', singer: '小安安' },
    { id: 9, title: 'HBNJGHJHB', image: '/images/svip.png', singer: '我是小树' },
    { id: 10, title: '安心安心', image: '/images/svip.png', singer: '小安安', },
    { id: 11, title: 'Notebook', image: '/images/svip.png', singer: '小安安', },
    { id: 12, title: '不知道', image: '/images/svip.png', singer: '小碗你好', },
    { id: 13, title: '歌名你好', image: '/images/svip.png', singer: '张三-你好我好都好' },
    { id: 14, title: '还是歌名', image: '/images/svip.png', singer: '不知道你是谁' },
    { id: 15, title: 'AIUHGVNHK', image: '/images/svip.png', singer: 'Gwyu-Hjjiyabn' },
    { id: 16, title: '可可不喜欢', image: '/images/svip.png', singer: '名佚' },
    { id: 17, title: '我是UOUYGBJ', image: '/images/svip.png', singer: '我是小树' },
    { id: 18, title: '好好学习', image: '/images/svip.png', singer: '全村最帅' },
    { id: 19, title: '安心安心', image: '/images/svip.png', singer: '小安安' },
    { id: 20, title: 'HBNJGHJHB', image: '/images/svip.png', singer: '我是小树' },
    { id: 21, title: '安心安心', image: '/images/svip.png', singer: '小安安' },
    { id: 23, title: 'Notebook', image: '', singer: '小安安' },
    { id: 24, title: '安心安心', image: '/images/free.png', singer: '小安安' },
    { id: 25, title: 'Notebook', image: '/images/vip.png', singer: '小安安' }
];
export { songItem, songOption, songList };
