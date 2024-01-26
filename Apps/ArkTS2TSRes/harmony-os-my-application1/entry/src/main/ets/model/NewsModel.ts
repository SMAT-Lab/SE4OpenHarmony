let __generate__Id: number = 0;
function generateId(): string {
    return "NewsModel_" + ++__generate__Id;
}
export class NewsModel {
    data: Array<NewsDetail>;
}
class NewsDetail {
    title: string;
    desc: string;
    pic: string;
    hot: string;
    url: string;
    mobilUrl: string;
}
