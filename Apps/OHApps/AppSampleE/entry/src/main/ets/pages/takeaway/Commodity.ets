/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
import call from '@ohos.telephony.call';
import BusinessController from '../../controller/BusinessController';
import CommodityController from '../../controller/CommodityController';
import Logger from '../../utils/Logger';
import Car from '../../data/Car'
import { getStringData } from '../../utils/ResourceDataHandle';
import { CommentInfo, CommodityInfo } from '../../data/Server';
import { BusinessError } from '@ohos.base';

const TAG: string = '[Commodity]';
const CAR_NUM = 1; // 初始化数量
const RESET = 0; // 重置
@Extend(Row) function rowStyleShop() {
  .width('95%')
  .height(170)
  .borderRadius(8)
  .margin({ top: 12 })
  .padding(12)
}

@Entry
@Component
struct Commodity {
  @State isShow: boolean = false;
  @State isPanel: boolean = false;
  @State isShop: boolean = true;
  @State isLogin: boolean = false;
  @State money: number = 0;
  @State count: number = 0;
  @State commodityList: Array<CommodityInfo> = []; // 商品列表
  @State commentList: Array<CommentInfo> = []; // 评论列表
  @State buyCarList: Array<Car> = []; // 购物车列表
  @State businessId: string = (router.getParams() as Record<string, Object>).businessId as string;
  @State businessName: string = (router.getParams() as Record<string, Object>).businessName as string;
  @State businessScore: string = (router.getParams() as Record<string, Object>).businessScore as string;
  @State businessSale: string = (router.getParams() as Record<string, Object>).businessSale as string;
  @State businessTime: string = (router.getParams() as Record<string, Object>).businessTime as string;
  @State businessRank: string = (router.getParams() as Record<string, Object>).businessRank as string;
  private commodityController: CommodityController = new CommodityController();
  private businessController: BusinessController = new BusinessController();

  callUp(phoneNumber: string): void {
    let isSupport = call.hasVoiceCapability();
    Logger.info(TAG, `callUp isSupport = ${isSupport}`);
    call.makeCall(phoneNumber, err => {
      if (!err) {
        Logger.info(TAG, 'callUp make call success');
      } else {
        Logger.info(TAG, `callUp make call fail, err is: = ${JSON.stringify(err)}`);
      }
    })
  }

  addCar(name: string, price: number): void {
    let cars: Car = new Car();
    cars.name = name;
    cars.price = Number(price);
    cars.num = CAR_NUM;
    this.buyCarList.push(cars);
  }

  aboutToAppear() {
    Logger.info(TAG, 'Commodity aboutToAppear');
    // 商品列表
    this.commodityController.getCommodityList(this.businessId).then((res: CommodityInfo[]) => {
      this.commodityList = res;
      Logger.info(TAG, `commodityList then res= ${JSON.stringify(this.commodityList)}`);
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `commodityList catch err= ${JSON.stringify(err)}`);
    })
    // 商家评论列表
    this.businessController.getCommentList(this.businessId).then((res: CommentInfo[]) => {
      this.commentList = res;
      Logger.info(TAG, `commentList then res= ${JSON.stringify(this.commentList)}`);
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `commentList catch err= ${JSON.stringify(err)}`);
    })
  }

  build() {
    Stack() {
      Column() {
        Row() {
          Image($r('app.media.icon'))
            .width(24)
            .height(24)
            .onClick(() => {
              router.back();
            })
          Blank()
          Image($r('app.media.icon'))
            .width(24)
            .height(24)
            .onClick(() => {
              this.isShow = !this.isShow;
            })
        }
        .width('90%')
        .height('8%')

        Row() {
          Column() {
            Row() {
              Text(this.businessName)
                .fontSize(24)
                .fontWeight(5)
            }
            .width('100%')

            Row() {
              Text(this.businessScore + getStringData($r('app.string.business_score')))
                .fontColor($r('app.color.business_score'))
                .fontSize(20)
                .fontWeight(5)
              Row() {
                Text($r('app.string.business_delivery'))
                  .fontColor($r('app.color.business_delivery'))
                  .fontSize(12)
                  .fontWeight(5)
                  .margin({ left: 6, right: 6 })
              }
              .margin({ left: 6 })
              .borderWidth(2)
              .border({ color: $r('app.color.comm_border') })

              Text(getStringData($r('app.string.business_distribution')) + this.businessTime + getStringData($r('app.string.business_min')))
                .fontSize(12)
                .fontWeight(5)
                .margin({ left: 12 })
              Text(getStringData($r('app.string.commodity_month')) + this.businessSale)
                .fontSize(12)
                .fontWeight(5)
                .margin({ left: 6 })
            }
            .width('100%')
            .margin({ top: 4 })

            Row() {
              Row() {
                Text(this.businessRank)
                  .fontSize(12)
                  .fontWeight(5)
              }.backgroundColor($r('app.color.index_bg'))

              Blank()
            }
            .width('100%')
            .margin({ top: 12 })

            Row() {
              Text($r('app.string.business_reduce'))
                .fontColor(Color.Red)
                .fontSize(12)
                .fontWeight(5)
                .borderWidth(2)
                .border({ color: Color.Red })
            }
            .width('100%')
            .margin({ top: 12 })
          }
          .justifyContent(FlexAlign.Start)
          .height('90%')
          .width('90%')
          .margin({ left: 12, right: 12 })
        }
        .height('17%')
        .margin({ top: 12 })

        Row() {
          Tabs({ barPosition: BarPosition.Start }) {
            // 点菜
            TabContent() {
              Scroll() {
                Column() {
                  ForEach(this.commodityList, (commodity: CommodityInfo, index) => {
                    Row() {
                      Image($r('app.media.icon'))
                        .width(150)
                        .height(150)
                      Column() {
                        Row() {
                          Text(commodity.name)
                            .fontSize(20)
                            .fontWeight(5)
                        }
                        .width('100%')

                        Row() {
                          Button(commodity.standards + getStringData($r('app.string.commodity_right')))
                            .fontColor($r('app.color.pd_standard'))
                            .backgroundColor($r('app.color.pd_standard_bg'))
                            .margin({ top: 6, bottom: 6 })
                          Blank()
                        }
                        .width('100%')
                        .margin({ top: 4 })

                        Row() {
                          Text(getStringData($r('app.string.commodity_month')) + commodity.salesNumber)
                            .fontColor($r('app.color.pd_font_gray'))
                          Text(getStringData($r('app.string.commodity_good')))
                            .fontColor($r('app.color.pd_font_gray'))
                            .margin({ left: 12 })
                          Blank()
                        }
                        .width('100%')
                        .margin({ top: 4 })

                        Row() {
                          Text(getStringData($r('app.string.commodity_money')) + commodity.price)
                            .fontSize(20)
                          Blank()
                          Text($r('app.string.commodity_plus'))
                            .textAlign(TextAlign.Center)
                            .width(28)
                            .height(28)
                            .fontColor(Color.Black)
                            .fontSize(20)
                            .fontWeight(15)
                            .borderRadius(24)
                            .backgroundColor($r('app.color.comm_plus'))
                            .onClick(() => {
                              this.money = this.money + Number(commodity.price);
                              this.count++;
                              if (this.buyCarList.length <= this.commentList.length && this.count === 1) {
                                this.addCar(commodity.name, Number(commodity.price));
                              } else {
                                for (let index = 0; index < this.buyCarList.length; index++) {
                                  const element = this.buyCarList[index]['name'];
                                  if (element === commodity.name) {
                                    // 更新数据
                                    Logger.info(TAG, 'cars this.commentList.length==' + JSON.stringify(this.buyCarList[index]['num']));
                                    let carsL: Car = new Car();
                                    carsL.num = this.buyCarList[index]['num'] + 1;
                                    Logger.info(TAG, 'cars carsL.num==' + JSON.stringify(carsL.num));
                                    carsL.name = commodity.name;
                                    carsL.price = Number(commodity.price);
                                    this.buyCarList[index] = carsL;
                                    break;
                                  } else {
                                    if (index == this.buyCarList.length - 1) {
                                      this.addCar(commodity.name, Number(commodity.price));
                                      break;
                                    } else {
                                      continue;
                                    }
                                  }
                                }
                              }
                              Logger.info(TAG, 'this.buyCarList==' + JSON.stringify(this.buyCarList))
                            })
                            .id('commodity' + index)
                        }
                        .width('90%')
                        .width('100%')
                        .margin({ top: 4 })
                      }
                      .justifyContent(FlexAlign.Start)
                      .height('100%')
                      .width('58%')
                      .margin({ left: 12 })
                    }
                    .rowStyleShop()
                    .id('commentList' + index)
                    .onClick(() => {
                      router.push({
                        url: 'pages/takeaway/ProductDetails',
                        params: {
                          commodityId: commodity.id
                        }
                      });
                    })
                  }, (commodity: CommodityInfo) => JSON.stringify(commodity))
                }
                .margin({ bottom: 55 })
              }
              .width('90%')
              .height('95%')
            }
            .tabBar($r('app.string.commodity_tabs_order'))
            .id('order')
            // 评价
            TabContent() {
              Column() {
                Row() {
                  Text($r('app.string.commodity_all_in'))
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .backgroundColor($r('app.color.pd_standard'))
                    .height(38)
                    .borderRadius(8)

                  Text($r('app.string.commodity_best_new'))
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .backgroundColor($r('app.color.comm_good'))
                    .height(38)
                    .borderRadius(8)
                    .margin({ left: 12 })

                  Text($r('app.string.commodity_good_reviews'))
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .backgroundColor($r('app.color.comm_good'))
                    .height(38)
                    .borderRadius(8)
                    .margin({ left: 12 })

                  Text($r('app.string.commodity_bad_reviews'))
                    .fontSize(16)
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .backgroundColor($r('app.color.comm_bad'))
                    .height(38)
                    .borderRadius(8)
                    .margin({ left: 12 })

                  Text($r('app.string.commodity_video'))
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .backgroundColor($r('app.color.comm_video'))
                    .height(38)
                    .borderRadius(8)
                    .margin({ left: 12 })
                }

                Scroll() {
                  Column() {
                    ForEach(this.commentList, (comment: CommentInfo) => {
                      Column() {
                        Row() {
                          Image($r('app.media.icon'))
                            .width(70)
                            .height(70)
                          Column() {
                            Row() {
                              Text(comment.userName)
                                .fontSize(18)

                              Text($r('app.string.commodity_vip'))
                                .margin({ left: 12 })
                                .padding(4)
                                .borderRadius(8)
                                .textAlign(TextAlign.Center)
                                .fontColor($r('app.color.comm_vip'))
                                .backgroundColor($r('app.color.comm_vip_bg'))
                            }
                            .justifyContent(FlexAlign.Start)
                            .width('100%')

                            Text(comment.createTime)
                              .width('100%')
                              .textAlign(TextAlign.Start)
                              .fontColor($r('app.color.pd_font_gray'))
                              .margin({ top: 6 })
                          }
                          .width('100%')
                          .margin({ left: 12 })

                          Blank()
                        }
                        .margin({ top: 24 })
                        .width('90%')

                        Column() {
                          Text(comment.content)
                            .width('100%')
                            .textAlign(TextAlign.Start)
                            .maxLines(3)
                          Row() {
                            Image($r('app.media.icon'))
                              .margin({ top: 12 })
                              .width(200)
                              .height(200)
                          }
                          .justifyContent(FlexAlign.Start)
                          .width('100%')
                        }
                        .margin({ top: 24 })
                        .width('90%')
                      }
                      .width('100%')
                    })
                  }
                  .margin({ bottom: 55 })
                }
                .width('90%')
                .height('95%')
              }
            }
            .tabBar($r('app.string.pd_tabs_appraise'))
            .id('appraise')
          }
          .onChange((index: number) => {
            if (index === 0) {
              this.isShop = true;
            } else {
              this.isShop = false;
            }
          })
        }
        .width('100%')
        .height('70%')
      }
      .width('100%')
      .height('100%')

      // 去结
      Column() {
        Column() {
          if (this.isShop) {
            Row() {
              Text($r('app.string.commodity_des'))
            }
            .padding({ top: 6, bottom: 6 })
            .height('4%')

            Row() {
              Row() {
                Image($r('app.media.icon'))
                  .width(38)
                  .height(38)
                Text(getStringData($r('app.string.commodity_money')) + this.money)
                  .fontSize(24)
                  .fontColor(Color.White)
                  .fontWeight(5)
                  .margin({ left: 12 })
                Divider()
                  .height(24)
                  .vertical(true)
                  .color($r('app.color.comm_fee'))
                  .margin({ left: 6 })
                Text($r('app.string.commodity_fee'))
                  .fontColor($r('app.color.comm_fee'))
                  .margin({ left: 6 })
              }
              .width('75%')
              .borderRadius({ topLeft: 24, bottomLeft: 24 })
              .padding({ left: 24 })
              .onClick(() => {
                this.isPanel = !this.isPanel;
                Logger.info(TAG, 'isPanel make call success ' + this.isPanel)
              })
              .id('panel')

              Row() {
                if (this.money !== 0) {
                  Text($r('app.string.commodity_to_pay'))
                    .fontSize(20)
                    .fontColor($r('app.color.comm_fee'))
                    .onClick(() => {
                      this.callUp(getStringData($r('app.string.commodity_tell')))
                    })
                    .id('pay')
                } else {
                  Text($r('app.string.commodity_to_give'))
                    .fontColor($r('app.color.comm_fee'))
                }
              }
              .padding({ left: 24 })
              .height('100%')
              .width('25%')
              .backgroundColor(this.money == 0 ? $r('app.color.comm_car') : $r('app.color.comm_plus'))
              .borderRadius({ topRight: 24, bottomRight: 24 })
            }
            .borderRadius(24)
            .backgroundColor($r('app.color.comm_car'))
            .width('100%')
            .height('8%')
          }
        }
        .borderRadius(8)
        .width('90%')
        .backgroundColor($r('app.color.comm_to_pay'))
      }
      .justifyContent(FlexAlign.Center)
      .position({ y: '88%' })
      .width('100%')
      .zIndex(3)

      // 购物车
      Panel(this.isPanel) { // 展示购物车
        Column() {
          Text($r('app.string.commodity_reduce_money'))
            .fontSize(18)
            .margin({ top: 12, bottom: 12 })
            .width('100%')
            .backgroundColor($r('app.color.pd_standard_bg'))
            .textAlign(TextAlign.Center)
          Row() {
            Blank()
            Image($r('app.media.icon'))
              .width(18)
              .height(18)
            Text($r('app.string.commodity_clear_car'))
              .fontColor($r('app.color.pd_font_gray'))
              .margin({ left: 12 })
          }
          .width('90%')
          .margin({ left: 12 })
          .padding({ right: 24, left: 24, top: 12, bottom: 12 })
          .onClick(() => {
            this.buyCarList = [];
            this.isPanel = false;
            this.money = RESET; // 重置金额
            this.count = RESET;
          })

          Divider()
            .width('90%')

          Scroll() {
            Column() {
              ForEach(this.buyCarList, (buyCar: Car, index) => {
                Row() {
                  Image($r('app.media.icon'))
                    .width(100)
                    .height(100)
                  Column() {
                    Row() {
                      Text(buyCar.name)
                        .fontWeight(10)
                        .fontSize(24)
                    }
                    .width('100%')

                    Row() {
                      Text($r('app.string.commodity_one'))
                        .fontColor($r('app.color.pd_font_gray'))
                    }
                    .width('100%')

                    Row() {
                      Text(getStringData($r('app.string.commodity_money')) + buyCar.price)
                        .fontWeight(10)
                        .fontColor($r('app.color.pd_money'))
                        .fontSize(24)
                      Blank()
                      Text($r('app.string.commodity_reduce'))
                        .fontSize(18)
                        .borderRadius(24)
                        .borderWidth(2)
                        .border({ color: $r('app.color.comm_plus') })
                        .width(28)
                        .height(28)
                        .backgroundColor(Color.White)
                        .textAlign(TextAlign.Center)
                        .onClick(() => {
                          this.money = this.money - Number(buyCar.price);
                          let carsL: Car = new Car();
                          carsL.num = this.buyCarList[index]['num'] - 1;
                          carsL.name = buyCar.name;
                          carsL.price = Number(buyCar.price);
                          this.buyCarList[index] = carsL;
                          if (buyCar.num === 1) {
                            this.buyCarList.splice(index, 1);
                          }
                          if (this.buyCarList.length === 0) {
                            this.isPanel = false;
                            this.count = RESET;
                          }
                        })
                      Text(String(buyCar.num))
                        .margin({ left: 12 })
                      Text($r('app.string.commodity_plus'))
                        .borderRadius(24)
                        .fontSize(18)
                        .width(28)
                        .height(28)
                        .backgroundColor($r('app.color.comm_plus'))
                        .textAlign(TextAlign.Center)
                        .margin({ left: 12 })
                        .onClick(() => {
                          this.money = this.money + Number(buyCar.price);
                          let carsL: Car = new Car();
                          carsL.num = this.buyCarList[index]['num'] + 1;
                          carsL.name = buyCar.name;
                          carsL.price = Number(buyCar.price);
                          this.buyCarList[index] = carsL;
                        })
                    }
                    .margin({ top: 12 })
                    .width('100%')
                  }
                  .width('70%')
                  .margin({ left: 12 })
                }
                .width('100%')
                .padding({ top: 12, bottom: 12 })
              })
            }
            .margin({ bottom: 200 })
          }
          .height('100%')
          .width('90%')
        }
      }
      .type(PanelType.Foldable)
      .dragBar(false)
      .halfHeight(500)
      .width('100%')
      .mode(PanelMode.Half)
      .zIndex(2)

      if (this.isShow) {
        Stack() {
          Column() {
            Row() {
              Image($r('app.media.icon'))
                .width(24)
                .height(24)
              Text($r('app.string.commodity_car'))
                .margin({ left: 12 })
            }
            .width('100%')
            .height('33%')
            .padding(12)

            Row() {
              Image($r('app.media.icon'))
                .width(24)
                .height(24)
              Text($r('app.string.commodity_share'))
                .margin({ left: 12 })
            }
            .onClick(() => {
              Logger.info(TAG, 'onClick onClick ');
              this.callUp(getStringData($r('app.string.commodity_tell')));
            })
            .width('100%')
            .height('33%')
            .padding(12)

            Row() {
              Image($r('app.media.icon'))
                .width(24)
                .height(24)
              Text($r('app.string.commodity_call'))
                .margin({ left: 12 })
            }
            .onClick(() => {
              Logger.info(TAG, 'onClick onClick ');
              this.callUp(getStringData($r('app.string.commodity_tell')));
            })
            .width('100%')
            .height('33%')
            .padding(12)
          }
          .borderRadius(8)
          .opacity(1)
          .backgroundColor($r('app.color.comm_bg'))
          .height('20%')
          .width('32%')
        }
        .position({ x: '65%', y: '6%' })
      }
    }
    .onClick(() => {
      this.isShow = false;
    })
    .width('100%')
    .height('100%')
  }
}
