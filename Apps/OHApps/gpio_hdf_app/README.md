# gpio app demo
gpio的相关操作app demo
## 开发环境
1. 搭载OpenHarmony-4.0-Release版本的Unionpi Tiger开发板  
2. Microsoft VS Code 1.80.2
3. DevEco Studio 4.0 Beta2
4. 一堆led灯 
## gpio简介
通用输入输出端口的简称。可以通过软件控制其输出和输入，通俗来说就是常用引脚，可以控制引脚的高低电平，对其进行读取或者写入。
## 操作方式
### Linux编程
首先在/sys/class/gpio/export中写入具体的gpio号即可导出相应的设备文件  
不知道gpio号的可以执行以下命令查看
> cat /sys/kernel/debug/gpio

导出成功后，/sys/class/gpio/目录下会出现gpio[gpio号]文件夹，进入此文件夹，可操作以下设备文件用于操作gpio  
1. direction 写入in, out, high, low。high/low会同时设置方向为输出，并将value设置为相应的1/0。
2. value文件是端口的数值，为1或0。1为高电平，0为低电平
### hdf方式编程
详见: [OpenHarmony hdf的gpio驱动文档](https://docs.openharmony.cn/pages/v3.2/zh-cn/device-dev/driver/driver-platform-gpio-des.md/)  
## NAPI导出
众所周知，arkts支持面向对象编程,那么如何使用napi将c++类包装为一个arkts类？  
### 新建Napi类对应c++类的接口
C++类
```C++
class GpioCtl
{
protected:
    uint32_t gpio;

public:
    GpioCtl(uint32_t gpio,uint32_t direction);
    uint16_t read();
    bool write(uint16_t data);
};
```
Napi类,napi不支持传入c++成员函数指针，因此只能用全静态函数
```C++
class  GpioNapi
{
protected:
    static napi_ref gpioClassRef;

public:
    static napi_value define(napi_env env);

    static napi_value Constructor(napi_env env, napi_callback_info cb);

    static void Destructor(napi_env env,void* nativeObject,void* finalize_hint);

    static napi_value read(napi_env env, napi_callback_info cb);

    static napi_value write(napi_env env, napi_callback_info cb);
};
napi_ref GpioNapi::gpioClassRef = nullptr;
```
### 定义arkts类
在define函数中，调用napi_define_class定义一个arkts类，并传入构造时的回调函数，并将该类返回
```C++
static napi_value define(napi_env env)
{
    napi_value gpioClass;
    napi_property_descriptor desc[]={
        DECLARE_NAPI_FUNCTION("read",read),
        DECLARE_NAPI_FUNCTION("write",write)
    };
    napi_define_class(env,"Gpio",NAPI_AUTO_LENGTH,Constructor,nullptr,sizeof(desc)/sizeof(desc[0]) ,desc,&gpioClass);
            napi_create_reference(env,gpioClass,1,&gpioClassRef);
    return gpioClass;
}
```
### 绑定c++对象
在构造时的回调函数中，接收参数，并将参数转换为c++变量用于构造c++对象，调用napi_warp将真正的c++对象指针绑定到arkts对象中，同时绑定析构时的回调函数，析构时的回调函数会删除c++对象以释放相关资源
```C++
static napi_value Constructor(napi_env env, napi_callback_info cb) 
{
    napi_value this_var;
    size_t argc=2;
    napi_value argv[2];
    napi_get_cb_info(env,cb,&argc,argv,&this_var,nullptr);
    NAPI_ASSERT(env,argc==2,"requires 2 parameter");
    napi_valuetype type;
    napi_typeof(env,argv[0],&type);
    NAPI_ASSERT(env,type==napi_number,"frist parameter type requires number");
    napi_typeof(env,argv[1],&type);
    NAPI_ASSERT(env,type==napi_number,"2nd parameter type requires number");

    uint32_t gpioNum,dir;
    napi_get_value_uint32(env,argv[0],&gpioNum);
    napi_get_value_uint32(env,argv[1],&dir);

    auto *gpio=new GpioCtl(gpioNum,dir);
    napi_wrap(env,this_var,gpio,Destructor,nullptr,nullptr);
    return this_var;
}
```
### 编写arkts成员函数对应的NAPI函数
首先通过napi_get_cb_info获取this对象以及参数，然后检查this对象是否是之前定义的arkts类的一个实例(如果是JavaScript调用，因为没有类型检查，可能存在被当成静态函数调用的情况，arkts则无此问题),然后调用napi_unwarp取出之前绑定的c++对象指针，然后操作此c++对象完成实际操作
```C++
static napi_value read(napi_env env, napi_callback_info cb) 
{
    size_t argc=0;
    napi_value this_var,gpioClass;
    napi_get_cb_info(env,cb,&argc,nullptr,&this_var,nullptr);

    napi_get_reference_value(env,gpioClassRef,&gpioClass);

    bool isInstance;
    napi_instanceof(env,this_var,gpioClass,&isInstance);
    NAPI_ASSERT(env,isInstance,"this read function isn't static function!");

    GpioCtl* gpio;
    napi_unwrap(env,this_var,reinterpret_cast<void**>(&gpio));
    /*使用C++对象完成相关操作...*/
    return ret;
}
```
### 定义枚举
定义枚举可以有效约束接口参数的合法性以及使代码更加易读

定义gpio名称枚举
```C++
static napi_value defineGpioName(napi_env env)
{
    napi_value gpioName,gpio1,gpio2,gpio3,gpio4,gpio5,gpio6,gpio7,gpio8,gpio9,gpio10,gpio11,gpio12,gpio13,gpio14,gpio15,gpio16;
    napi_create_object(env,&gpioName);

    napi_create_uint32(env,Gpio::GPIO_01,&gpio1);
    ......//此处省略
    napi_create_uint32(env,Gpio::GPIO_16,&gpio16);
    
    napi_property_descriptor desc[]={
        DECLARE_NAPI_STATIC_PROPERTY("GPIO_01",gpio1),
        ......//此处省略
        DECLARE_NAPI_STATIC_PROPERTY("GPIO_16",gpio16)
    };
    napi_define_properties(env,gpioName,sizeof(desc)/sizeof(desc[0]) ,desc);
    return gpioName;
}
```
定义gpio输入输出等方向枚举
```C++
static napi_value defineDir(napi_env env)
{
    napi_value dir,input,output,error;
    napi_create_object(env,&dir);

    napi_create_uint32(env,direction::input,&input);
    napi_create_uint32(env,direction::output,&output);
    napi_create_uint32(env,direction::error,&error);

    napi_property_descriptor desc[]={
        DECLARE_NAPI_STATIC_PROPERTY("input",input),
        DECLARE_NAPI_STATIC_PROPERTY("output",output),
        DECLARE_NAPI_STATIC_PROPERTY("error",error)
    };
    napi_define_properties(env,dir, sizeof(desc)/sizeof(desc[0]) ,desc);
    return dir;
}
```
定义高电平，低电平等枚举
```C++
static napi_value defineVal(napi_env env)
{
    napi_value val,low,height;
    napi_create_object(env,&val);

    napi_create_uint32(env,val::low,&low);
    napi_create_uint32(env,val::height,&height);

    napi_property_descriptor desc[]={
        DECLARE_NAPI_STATIC_PROPERTY("low",low),
        DECLARE_NAPI_STATIC_PROPERTY("height",height)
    };
    napi_define_properties(env,val, sizeof(desc)/sizeof(desc[0]) ,desc);
    return val;
}
```
###  编写arkts模块接口定义文件
编写完napi接口后，还需要让方舟编译器知道模块里提供了哪些接口，有什么参数，各个参数的类型又是什么。这就需要模块接口定义文件(.d.ts)来说明，这里采用es6的模块声明方式来编写，将napi定义的枚举与类进行显式说明。
```TypeScript
export enum GpioName {
  GPIO_01,
  GPIO_02,
  GPIO_03,
  GPIO_04,
  GPIO_05,
  GPIO_06,
  GPIO_07,
  GPIO_08,
  GPIO_09,
  GPIO_10,
  GPIO_11,
  GPIO_12,
  GPIO_13,
  GPIO_14,
  GPIO_15,
  GPIO_16,
}

export enum Dir {
  input,
  output,
  error
}

export enum Val {
  low,
  height
}

export class Gpio {
  constructor(gpio: GpioName, direction: Dir);

  read(): Val;

  write(val: Val): void;
}
```
### 编写app
创建一个api10的app项目，创建一个选择框和开关，选择框用于选gpio针脚,开关控制gpio的高电平和低电平
```TypeScript
    Row(){
        Text("选择pin: ")
        Select([
            { value: "GPIO_01" },
            { value: "GPIO_02" },
            { value: "GPIO_03" },
            { value: "GPIO_04" },
            { value: "GPIO_05" },
            { value: "GPIO_06" },
            { value: "GPIO_07" },
            { value: "GPIO_08" },
            { value: "GPIO_09" },
            { value: "GPIO_10" },
            { value: "GPIO_11" },
            { value: "GPIO_12" },
            { value: "GPIO_13" },
            { value: "GPIO_14" },
            { value: "GPIO_15" },
            { value: "GPIO_16" },
          ])
        .selected(0)
        .value(this.gpioSelectValue)
        .onSelect((index: number, value: string) => {
            this.gpioSelectValue = value;
            this.gpio = new Gpio(GpioName[value], Dir.output);
            let val = this.gpio.read();
            this.gpioIsOpen = (val === Val.height);
        })
    }
    Row() {
        Text("开关: ")
        Toggle({ type: ToggleType.Switch, isOn: this.gpioIsOpen })
        .onChange((isOn: boolean) => {
            this.gpioIsOpen = isOn;
            if (isOn) {
                this.gpio.write(Val.height);
            }
            else {
                this.gpio.write(Val.low);
            }
            Prompt.showToast({message:isOn?"打开":"关闭"});
        })
    }
```