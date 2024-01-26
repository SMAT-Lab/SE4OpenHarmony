# reflect_metadata单元测试用例

该测试用例基于OpenHarmony系统下，进行单元测试

单元测试用例覆盖情况

|                                                 接口名                                                 |是否通过	|备注|
|:---------------------------------------------------------------------------------------------------:|:---:|:---:|
| decorate(decorators: ClassDecorator[], target: Function)                      |    pass        |       |
|decorate(decorators: (PropertyDecorator \ MethodDecorator)[], target: Object, propertyKey: string , attributes?: PropertyDescriptor) |pass   |        |
|     defineMetadata(metadataKey: ESObject, metadataValue: any, target: Object, propertyKey: string)     |pass   |        |
|                                    deleteMetadata(metadataKey: ESObject, target: Object, propertyKey: string)                                    |pass   |        |
| getMetadata(metadataKey: ESObject, target: Object, propertyKey: string) |    pass    |       |
| getMetadataKeys(target: Object, propertyKey: string ) |pass   |        |
|     getOwnMetadata(metadataKey: ESObject, target: Object, propertyKey: string)     |pass   |        |
|                                    getOwnMetadataKeys(target: Object, propertyKey: string)                                    |pass   |        |
|     hasMetadata(metadataKey: ESObject, target: Object, propertyKey: string)     |pass   |        |
|                                    hasOwnMetadata(metadataKey: ESObject, target: Object, propertyKey: string)                                    |pass   |        |
| metadata(metadataKey: ESObject, metadataValue: ESObject) |pass | |
