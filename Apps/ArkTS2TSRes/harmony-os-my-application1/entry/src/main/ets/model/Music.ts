let __generate__Id: number = 0;
function generateId(): string {
    return "Music_" + ++__generate__Id;
}
export class Music {
    data: Array<MusicInfo>;
}
class MusicInfo {
    title: string;
    author: string;
    url: string;
    pic: string;
    link: string;
    type: string;
}
