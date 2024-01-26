let __generate__Id: number = 0;
function generateId(): string {
    return "imagedata_" + ++__generate__Id;
}
export const Swiper_Data: object[] = [
    { "image": $r("app.media.QQ"),
        // 调转到的页面
        "url": "pages/Index"
    },
    { "image": $r("app.media.weixin"),
        "url": "pages/SecondPage",
    },
    { "image": $r("app.media.wink"),
        "url": "pages/ButtonPage", }
];
