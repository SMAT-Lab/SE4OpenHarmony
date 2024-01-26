/*
 * 自定义组件特点：
 * 可组合：允许开发者组合使用系统组件、及其属性和方法。
 * 可重用：自定义组件可以被其他组件重用，并作为不同的实例在不同的父组件或容器中使用。
 * 数据驱动UI更新：通过状态变量的改变，来驱动UI的刷新。
 *
 * */
import promptAction from '@ohos.promptAction';
//struct被@Component装饰后具备组件化的能力，需要实现build方法描述UI，一个struct只能被一个@Component装饰。

@Component
  //自定义组件的基本结构
  // struct：自定义组件基于struct实现，struct + 自定义组件名 + {...}的组合构成自定义组件，不能有继承关系。对于struct的实例化，可以省略new。
struct HelloComponent {

  aboutToAppear(){
    promptAction.showToast({message:"aboutToAppear"})
  }
  aboutToDisappear(){
    promptAction.showToast({message:"aboutToDisappear"})
  }

  /*
   * 组件生命周期，即一般用@Component装饰的自定义组件的生命周期，提供以下生命周期接口：
   * aboutToAppear：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其build()函数之前执行。
   * aboutToDisappear：在自定义组件即将析构销毁时执行。
   * */
  @State message: string = 'Hello, World!';
//build()函数：build()函数用于定义自定义组件的声明式UI描述，自定义组件必须定义build()函数。
  build() {
    // HelloComponent自定义组件组合系统组件Row和Text
    Row() {
      Text(this.message)
        .onClick(() => {
          // 状态变量message的改变驱动UI刷新，UI从'Hello, World!'刷新为'Hello, ArkUI!'
          this.message = 'Hello, ArkUI!';
        })
    }
  }
}
/*
* @Styles用于样式的扩展
如果每个组件的样式都需要单独设置，在开发过程中会出现大量代码在进行重复样式设置，
* 虽然可以复制粘贴，但为了代码简洁性和后续方便维护，就可以对公共样式进行复用，用到的装饰器@Styles
* 定义在全局的@Styles封装的样式，
 * */
@Styles  function globalFancy  () {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}

/*
* @Extend，用于扩展原生组件样式。
*注意点：1.和@Styles不同，@Extend仅支持定义在全局，不支持在组件内部定义。
*       2.和@Styles不同，@Extend装饰的方法支持参数
*       3.@Extend的参数可以为状态变量，当状态变量改变时，UI可以正常的被刷新渲染。
*       4.@Extend装饰的方法的参数可以为function，作为Event事件的句柄。
 * */
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}
//@Entry装饰的自定义组件将作为UI页面的入口。在单个UI页面中，最多可以使用@Entry装饰一个自定义组件。
@Entry
@Component
/*
 * 页面生命周期，即被@Entry装饰的组件生命周期，提供以下生命周期接口：
 * onPageShow：页面每次显示时触发。
 * onPageHide：页面每次隐藏时触发一次。
 * onBackPress：当用户点击返回按钮时触发。
 * */
struct StylePage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        HelloComponent({ message: '自定义组件' });
        Text(this.message)
          .globalFancy()
          // .fontSize(50)
          // .fontWeight(FontWeight.Bold)
        Text('Fancy')
          .fancy(16)
        Text('Fancy')
          .fancy(24)
        Button('Click me')
          //@Styles和@Extend仅仅应用于静态页面的样式复用，stateStyles可以依据组件的内部状态的不同，快速设置不同样式
          .stateStyles({
            focused: {
              .backgroundColor(Color.Pink)
            },
            pressed: {
              .backgroundColor(Color.Black)
            },
            normal: {
              .backgroundColor(Color.Yellow)
            }
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}