### 1.0.3
- fix:修改xml_js依赖库的依赖版本为^1.0.2

### 1.0.2
- fix:修改README.OpenSource文件中依赖组件的License File路径信息
- fix:修改组件依赖的"@ohos/protobufjs"版本为固定"1.0.2"版本，1.0.2之上版本与本组件使用方式不兼容。
- 适配版本：DevEco Studio: 4.1 Canary2(4.1.3.400), SDK: API11 (4.1.0.36)

### 1.0.2-rc.1
- 适配ArkTs语法
- 修改文件对外导出方式及对象

### 1.0.2-rc.0
- 修复不兼容API9问题

### 1.0.1
1.修正ohpm包依赖方式：由相对路径改为依赖指定版本。

### 1.0.0
1.基于@ohos/protobufjs@1.0.1版本进行protobuf.Message的格式转换。

2.支持protobuf中基础类型：int32,uint32,bool,double,float,string。

3.protobuf.Message格式转换为json.xml.html时Message类型需要为protobuf.Builder.Message。

4.json,xml转换为protobuf.Message时，需要注意数据类型需要与原始proto文件一致。

