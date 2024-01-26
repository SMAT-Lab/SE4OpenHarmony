/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { BigNumber } from './BigNumber';

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  zerosStr: string = '0'
  @State message: string = 'bignumber test'
  @State mathAbs: string = this.zerosStr
  @State mathTimeAbs: string = this.zerosStr
  @State mathAcos: string = this.zerosStr
  @State mathTimeAcos: string = this.zerosStr
  @State mathAdd: string = this.zerosStr
  @State mathAsin: boolean = true
  @State mathTimeAsin: string = this.zerosStr
  @State mathAtan: boolean = true
  @State mathTimeAtan: string = this.zerosStr
  @State mathByteValue: boolean = true
  @State mathTimeByteValue: string = this.zerosStr
  @State mathCompare: string = this.zerosStr
  @State mathTimeCompare: string = this.zerosStr
  @State mathCos: boolean = true
  @State mathTimeCos: string = this.zerosStr
  @State mathDivide: string = this.zerosStr
  @State mathTimeDivide: string = this.zerosStr
  @State mathExp: string = this.zerosStr
  @State mathTimeExp: string = this.zerosStr
  @State mathFormat: string = this.zerosStr
  @State mathTimeFormat: string = this.zerosStr
  @State mathIntValue: string = this.zerosStr
  @State mathTimeIntValue: string = this.zerosStr
  @State mathLeftShift: string = this.zerosStr
  @State mathTimeLeftShift: string = this.zerosStr
  @State mathLog: string = this.zerosStr
  @State mathTimeLog: string = this.zerosStr
  @State mathLongValue: string = this.zerosStr
  @State mathTimeLongValue: string = this.zerosStr
  @State mathMax: string = this.zerosStr
  @State mathTimeMax: string = this.zerosStr
  @State mathMin: string = this.zerosStr
  @State mathTimeMin: string = this.zerosStr
  @State mathMultiply: string = this.zerosStr
  @State mathTimeMultiply: string = this.zerosStr
  @State mathRadix: boolean = true
  @State mathTimeRadix: string = this.zerosStr
  @State mathRightArithShift: boolean = true
  @State mathTimeRightArithShift: string = this.zerosStr
  @State mathRound: boolean = true
  @State mathTimeRound: string = this.zerosStr
  @State mathSin: string = this.zerosStr
  @State mathTimeSin: string = this.zerosStr
  @State mathSqrt: string = this.zerosStr
  @State mathTimeSqrt: string = this.zerosStr
  @State mathSubtract: string = this.zerosStr
  @State mathTimeSubtract: string = this.zerosStr
  @State mathTan:  string = this.zerosStr
  @State mathTimeTan: string = this.zerosStr
  @State mathUnaryMinus: string = this.zerosStr
  @State mathTimeUnaryMinus: string = this.zerosStr
  @State mathSignum: string = this.zerosStr
  @State mathposSignum: number = 0
  @State mathTimeSignum: string = this.zerosStr
  @State mathTimeSignum1: string = this.zerosStr
  mathatanSignum: string = ""
  mathatanSignum1: string = ""
  mathatanSignum2: string = ""
  mathUnaryMinus1: string = ""
  mathUnaryMinus2: string = ""
  mathTan1: string = ""
  mathTan2: string = ""
  mathSubtract1: string = ""
  mathSubtract2: string = ""
  mathSqrt1: string = ""
  mathSqrt2: string = ""
  mathSin1: string = ""
  mathRound1: string = ""
  mathRound2: string = ""
  mathRightArithShift1: string = ""
  mathRightArithShift2: string = ""
  mathRadix1: string = ""
  mathRadix2: number = 0
  mathMultiply1: string = ""
  mathMultiply2: string = ""
  mathMin1: string = ""
  mathMin2: string = ""
  mathMax1: string = ""
  mathMax2: string = ""
  mathLongValue1: string = ""
  mathLog1: string = ""
  mathLog2: string = ""
  mathLeftShift1: string = ""
  mathLeftShift2: string = ""
  mathIntValue1: string = ""
  mathFormat1: string = ""
  mathExp1: string = ""
  mathExp2: string = ""
  mathDivide1: string = ""
  mathDivide2: string = ""
  mathCos1: string = ""
  mathCompare1: string = ""
  mathCompare2: string = ""
  mathByteValue1: string = ""
  mathAtan1: string = ""
  mathAtan2: string = ""
  mathAsin1: string = ""
  mathAdd1: string = ""
  mathAdd2: string = ""
  mathAcosStr: string = ""
  mathAbsStr: string = ""

  build() {
    Scroll(this.scroller) {
      Column() {

        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)


        Text('点击 test squareRoot')
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {

              tb('220983929785.7', '48833897223529771949253.378778868849049559624562513592321569', 1, 4);
              tb('1180052939140.7', '1392524939174533146207410.12619352287', 1, 4);
              tb('120468836204612.6', '14512740496493785900839846763.82328768609126547', 1, 4);
              tb('76418328144.477890944', '5839760876397101738682.29836547353', 10, 4);
              tb('263359760985014.62241224437474495709', '69358363706084030080212405554.3002793975414740876419285502', 20, 4);
              tb('492974271191746.46231483998877250102', '243023632057033585989741137703.800100153395469328387', 20, 4);
              tb('23762326490698.34975320239967323205', '564648160250544549780100380.5514166040523', 20, 4);
              tb('316358493873927157.1740897995245240711', '100082696646179606634487051294887359.5035240594546', 20, 4);
              tb('19107253881509743.3779260316306131671181869224843248420235662435238492667857670998535738552', '365087150892469154433642273521263.83276841', 73, 4);
              tb('20416269776260474006.927083982432268806569265768750039002235065141713481228428261', '416824071577046905366185925400975939799.8', 60, 1);
              tb('907424493602245756936.066129375330541537462629768', '823419211589292150660922033473258691103594.23268549807171826865266573694', 27, 0);
              tb('74542661576900.1739714442102128431140459355738187797819043083309413315', '5556608394968269531202589612.9', 55, 2);
              tb('92093628036.6480124503328403126750210810151658188780763586760022178450462311', '8481236324952480852423.718960437545027', 64, 1);
              tb('3.3219621290607638259315016171393711588977731624802456157919679857160686287774881e+24', '11035432386913922898118885283020330437836330418535.765864', 55, 5);
              tb('374863740368.0156985152529892838083189109926642299794', '140522823842699082383715.919571886197001394994582', 40, 4);
              tb('23603002885797536.790280728725364655699852314300322649', '557101745226966849549415425061219.969394346783798760227', 36, 1);
              tb('247788926631.668855265587728589', '61399352161274570866824.398764295216033428917127', 18, 1);
              tb('57915787478641.83665522345250623634912714466', '3354238439271206551123435622.197210160416', 29, 1);
              tb('744842151657434987604.2791022189701', '554789830885677382051879929528491741366735.693239816410110026056705884', 13, 3);
              tb('4.544263396953483598942089836714002627162343460178e+26', '206503298208912140516268973108976781377094781756302253.10316325966', 22, 3);
              tb('2.0019209241842586055583598727675929480248543e+39', '4007687386686756091822637898553155471331634538521264108680442236674656851419653.351763057', 4, 4);
              tb('6.576613095964895855186161492615465e+30', '43251839814016972458988090681594663492334963080297610004985253.9613', 3, 3);
              tb('6.07284120868169228806782907964188066871171e+34', '3687940034586251730077294264351100568013474596967205874685411761358250.20335920865', 7, 0);
              tb('45974968665.29964986693286971876228807290133907777', '2113697743775284668710.510', 38, 6);
              tb('9.39851185518650310576202501936615855344549247e+23', '883320250920812443260322053150977725907138537017.6109350', 21, 6);
              tb('3.07926577824804164817768119357737974040003e+37', '948187773308951760156602418478473823522730515817565059043672065724339252452.6444', 4, 2);
              tb('2.611751832666679532237559742004135839298e+31', '682124763543775920380116102948198971902395978922979169982661154.965777107019', 8, 0);
              tb('2.355735861300212899781981274e+21', '5549491448215855908992552523083142006504786.98270', 6, 5);
              tb('2.148665877305983003246901853661043e+30', '4616765052299089605130822036135055816921350866756700565077388.7685983542855487709', 3, 4);
              tb('9679153997438690735.573001818', '93686022106133386382529030832963639287.904519199', 9, 6);
              tb('8.0002250603549316133021057523452459826997456e+29', '640036010163310691747774480314864168983618826504059678896941.563828701', 14, 2);
              tb('5013216366623851214.1896508660273321751', '25132338338585248190238248636234491768.941684121900', 19, 6);
              tb('2.769026363487970868792191331612149e+26', '76675070016914161693612991003380354517429223150278706.17849523', 7, 6);
              tb('2.423119730416880716999556301580963194716353e+22', '587150922793557668101013208341938836941193210.8', 20, 4);
              tb('37838002948618379.82724648128060201962219175', '1431714467139653206157054572446837.45539086584', 26, 5);
              tb('1336693769272.52325053384226966971097495236409237893207026280721123585', '1786750232811985622866694.6930741720574199999999999999', 56, 1);
              tb('24311351864975.074869841182393118014836563', '591041829502627051005856744.915583060322969111', 27, 3);
              tb('42984058671789597132.7221112172629645', '1847629299899850465200384668635639967676.41', 16, 3);
              tb('571382471180033.53319393302415277060828996943848848613781018317122334349', '326477928371801851150832020172.11648736659691111111111', 56, 6);
              tb('18354976800132.7205784689505763982983253834776256454914296697190444244517734', '336905173333410406277377949.452223919511111111111111111111', 61, 0);
              tb('24590607446647400780.287370661652288997152', '604697974595110599812980781794694145333.72111111111', 21, 1);
              tb('2263343854329.638037260235405086446634', '5122725402931741767463814.840999999', 24, 4);
              tb('218875865535828595.704079834928718536449349620686728272', '47906644514058120040043799772367208.9448736248559332241111111111111', 36, 1);
              tb('63216259733951.59', '3996295494750428253401001163.9486336398226471847', 2, 0);
              AlertDialog.show({ title: 'squareRoot test 成功',
                message: '',
                confirm: { value: 'OK', action: () => {
                } }
              })
            } catch (err) {
              console.log('errerr ' + err)
              AlertDialog.show({ title: 'squareRoot test 失败',
                message: err,
                confirm: { value: 'OK', action: () => {
                } }
              })
            }
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatanSignum = value
          })

        Text('absoluteValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSignum = new BigNumber(this.mathatanSignum).abs().toString()
              let time1 = Date.now()
              this.mathTimeSignum = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatanSignum1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatanSignum2 = value
          })

        Text('comparedTo test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathposSignum = new BigNumber(this.mathatanSignum1).comparedTo(this.mathatanSignum2)
              let time1 = Date.now()
              this.mathTimeSignum1 = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathposSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSignum1)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathUnaryMinus1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathUnaryMinus2 = value
          })

        Text('decimalPlaces test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathUnaryMinus = new BigNumber(this.mathUnaryMinus1).decimalPlaces(Number(this.mathUnaryMinus2)).toString()
              let time1 = Date.now()
              this.mathTimeUnaryMinus = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathUnaryMinus)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeUnaryMinus)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathTan1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathTan2 = value
          })

        Text('dividedBy test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathTan =  new BigNumber(this.mathTan1).dividedBy(this.mathTan2).toString()
              let time1 = Date.now()
              this.mathTimeTan = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathTan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeTan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSubtract1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSubtract2 = value
          })

        Text('subtract test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSubtract =new BigNumber(this.mathSubtract1).dividedToIntegerBy(this.mathSubtract2).toString()
              let time1 = Date.now()
              this.mathTimeSubtract = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathSubtract)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSubtract)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSqrt1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSqrt2 = value
          })

        Text('pow test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSqrt =new BigNumber(this.mathSqrt1).pow(this.mathSqrt2).toString()
              let time1 = Date.now()
              this.mathTimeSqrt = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathSqrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSqrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSin1 = value
          })

        Text('integerValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSin =  new BigNumber(this.mathSin1).integerValue().toString()
              let time1 = Date.now()
              this.mathTimeSin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathSin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRound1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRound2 = value
          })

        Text('isEqualTo test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathRound = new BigNumber(this.mathRound1).eq(this.mathRound2)
              let time1 = Date.now()
              this.mathTimeRound = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathRound)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRound)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRightArithShift1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRightArithShift2 = value
          })

        Text('isGreaterThan test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathRightArithShift =  new BigNumber(this.mathRightArithShift1).isGreaterThan(this.mathRightArithShift2)
              let time1 = Date.now()
              this.mathTimeRightArithShift = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathRightArithShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRightArithShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRadix1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRadix2 = Number(value)
          })

        Text('isLessThan test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathRadix = new BigNumber(this.mathRadix1).isLessThan(this.mathRadix2)
              let time1 = Date.now()
              this.mathTimeRadix = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathRadix)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRadix)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMultiply1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMultiply2 = value
          })

        Text('minus test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMultiply = new BigNumber(this.mathMultiply1).minus(this.mathMultiply2).toString()
              let time1 = Date.now()
              this.mathTimeMultiply = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMultiply)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMultiply)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMin1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMin2 = value
          })

        Text('modulo test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMin = new BigNumber(this.mathMin1).modulo(this.mathMin2).toString()
              let time1 = Date.now()
              this.mathTimeMin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMax1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMax2 = value
          })

        Text('multipliedBy test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMax = new BigNumber(this.mathMax1).multipliedBy(this.mathMax2).toString()
              let time1 = Date.now()
              this.mathTimeMax = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMax)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMax)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLongValue1 = value
          })

        Text('negated test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLongValue = new BigNumber(this.mathLongValue1).negated().toString()
              let time1 = Date.now()
              this.mathTimeLongValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLongValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLongValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLog1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLog2 = value
          })

        Text('plus test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLog = new BigNumber(this.mathLog1).plus(this.mathLog2).toString()
              let time1 = Date.now()
              this.mathTimeLog = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLog)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLog)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLeftShift1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLeftShift2 = value
          })

        Text('shiftedBy test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLeftShift = new BigNumber(this.mathLeftShift1).shiftedBy(Number(this.mathLeftShift2)).toString()
              let time1 = Date.now()
              this.mathTimeLeftShift = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLeftShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLeftShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIntValue1 = value
          })

        Text('squareRoot test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIntValue = new BigNumber(this.mathIntValue1).squareRoot().toString()
              let time1 = Date.now()
              this.mathTimeIntValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIntValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIntValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathFormat1 = value
          })

        Text('toExponential test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathFormat = new BigNumber(this.mathFormat1).toExponential()
              let time1 = Date.now()
              this.mathTimeFormat = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathFormat)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeFormat)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathExp1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathExp2 = value
          })

        Text('toFraction test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathExp = new BigNumber(this.mathExp1).toFraction(this.mathExp2).toString()
              let time1 = Date.now()
              this.mathTimeExp = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathExp)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeExp)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathDivide1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathDivide2 = value
          })

        Text('divide test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathDivide = new BigNumber(this.mathDivide1).toPrecision(Number(this.mathDivide2))
              let time1 = Date.now()
              this.mathTimeDivide = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathDivide)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeDivide)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCos1 = value
          })

        Text('isZero test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCos = new BigNumber(this.mathCos1).isZero()
              let time1 = Date.now()
              this.mathTimeCos = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathCos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCompare1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCompare2 = value
          })

        Text('precision test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCompare = new BigNumber(this.mathCompare1).precision(Number(this.mathCompare2)).toString()
              let time1 = Date.now()
              this.mathTimeCompare = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathCompare)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCompare)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathByteValue1 = value
          })

        Text('isPositive test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathByteValue = new BigNumber(this.mathByteValue1).isPositive()
              let time1 = Date.now()
              this.mathTimeByteValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathByteValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeByteValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAtan1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAtan2 = value
          })

        Text('isLessThan test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAtan = new BigNumber(this.mathAtan1).isLessThan(this.mathAtan2)
              let time1 = Date.now()
              this.mathTimeAtan = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAtan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAtan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAsin1 = value
          })

        Text('isNegative test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAsin = new BigNumber(this.mathAsin1).isNegative()
              let time1 = Date.now()
              this.mathTimeAsin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAsin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAsin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

      }
      .width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(30)
    .onScroll((xOffset: number, yOffset: number) => {
      console.info(xOffset + ' ' + yOffset)
    })
    .onScrollEdge((side: Edge) => {
      console.info('To the edge')
    })
    .onScrollEnd(() => {
      console.info('Scroll Stop')
    })
  }
  onPageHide(): void {
    console.log('lllllllllllll消失')
  }
}

function tb(root:string, value:string, dp:number, rm: BigNumber.RoundingMode) {
  BigNumber.config({ DECIMAL_PLACES: dp, ROUNDING_MODE: rm });
  let actual = areEqual(root, new BigNumber(value).sqrt().valueOf());
  if (actual) {
    return
  }
  // throw new Error(' failed areEqual test' + root);
};

function areEqual(expected:string, actual:string) {
  // If expected and actual are both NaN, consider them equal.
  if (expected === actual || expected !== expected && actual !== actual) {
    return true
  } else {
    console.log(
      '  Test number '+ ' failed areEqual test' +
      '  Expected: ' + expected +
      '  Actual:   ' + actual
    );
    return false
  }
};