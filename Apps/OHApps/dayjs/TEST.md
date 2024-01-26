## dayjs 单元测试用例

该测试用例基于 OpenHarmony 系统下，采用[原库测试用例](https://github.com/iamkun/dayjs/tree/dev/test) 进行单元测试

### 单元测试用例覆盖情况

| 接口名                                                             | 是否通过 | 备注 |
| ------------------------------------------------------------------ | -------- | ---- |
| clone()                                                            | pass     |
| isValid()                                                          | pass     |
| year()                                                             | pass     |
| year(value:number)                                                 | pass     |
| month()                                                            | pass     |
| month(value:number)                                                | pass     |
| date()                                                             | pass     |
| date(value:number)                                                 | pass     |
| day()                                                              | pass     |
| day(value:number)                                                  | pass     |
| hour()                                                             | pass     |
| hour(value:number)                                                 | pass     |
| minute()                                                           | pass     |
| minute(value:number)                                               | pass     |
| second()                                                           | pass     |
| second(value:number)                                               | pass     |
| millisecond()                                                      | pass     |
| millisecond(value:number)                                          | pass     |
| set(unit:UnitType,value:number)                                    | pass     |
| get(unit:UnitType)                                                 | pass     |
| add(value:number,unit?:ManipulateType)                             | pass     |
| subtract(value:number,unit?:ManipulateType)                        | pass     |
| startOf(unit:OpUnitType)                                           | pass     |
| endOf(unit:OpUnitType)                                             | pass     |
| format(template?:string)                                           | pass     |
| diff(date?:ConfigType,unit?:QUnitType \|OpUnitType,float?:boolean) | pass     |
| valueOf()                                                          | pass     |
| unix()                                                             | pass     |
| daysInMonth()                                                      | pass     |
| toDate()                                                           | pass     |
| toJSON()                                                           | pass     |
| toISOString()                                                      | pass     |
| toString()                                                         | pass     |
| utcOffset()                                                        | pass     |
| isBefore(date:ConfigType,unit?:OpUnitType)                         | pass     |
| isSame(date:ConfigType,unit?:OpUnitType)                           | pass     |
| isAfter(date:ConfigType,unit?:OpUnitType)                          | pass     |
| locale()                                                           | pass     |
