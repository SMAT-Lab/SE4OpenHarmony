class PoetryConstructor{
  constructor(public txt:string,public fSize:number,public dTime:number) {
    this.txt=txt
    this.fSize=fSize
    this.dTime=dTime
  }
}
export const PoetryData:PoetryConstructor[]=[
  {
    txt:'《古诗十九首·迢迢牵牛星》',
    fSize:24,
    dTime:0
  },
  {
    txt:'    迢迢牵牛星，皎皎河汉女。',
    fSize:22,
    dTime:1000
  },
  {
    txt:'    纤纤擢素手，札札弄机杼。',
    fSize:22,
    dTime:2000
  },
  {
    txt:'    终日不成章，泣涕零如雨。',
    fSize:22,
    dTime:3000
  },
  {
    txt:'    河汉清且浅，相去复几许。',
    fSize:22,
    dTime:4000
  },
  {
    txt:'    盈盈一水间，脉脉不得语。',
    fSize:22,
    dTime:5000
  }
]

export const qixiString:string[]=[
  '七夕到来浪漫到，天上人间共神话。',
  '牛郎织女鹊桥会，人间情侣也成对。',
  '心心相印无朝暮，岁岁年年情不移。',
  '手牵手儿盟誓愿，今生爱你永不变!'
]

export const imgString:Resource[]=[
  $r('app.media.qixi'),
  $r('app.media.qixi4'),
  $r('app.media.qixi5'),
  $r('app.media.qixi3')
]