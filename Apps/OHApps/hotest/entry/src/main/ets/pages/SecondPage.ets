import common from '@ohos.app.ability.common'
@Entry
@Component
struct SecondPage {
  @State message: string = 'SecondPage'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(()=>{
          let context =  getContext(this) as common.UIAbilityContext; // UIAbilityContext
          const RESULT_CODE: number = 1001;
          let abilityResult = {
            resultCode: RESULT_CODE,
            want: {
              bundleName: "com.example.hotest",
              abilityName: 'FuncAbility',
              // moduleName: 'module1',
              parameters: {
                info: '来自FuncAbility Index页面',
              },
            },
          }
          // context为被调用方UIAbility的AbilityContext
          context.terminateSelfWithResult(abilityResult, (err) => {
            // ...
          });
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}