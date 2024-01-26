# icu4j单元测试用例

该测试用例基于OpenHarmony系统下，进行单元测试

单元测试用例覆盖情况

|                         接口名                         | 是否通过	 | 备注  |
|:---------------------------------------------------:|:-----:|:---:|
|                parse(input:string)                | pass  |     |
|               isLiteralElement(input:LiteralElement)                | pass  |     |
|                       isArgumentElement(input:ArgumentElement)                       | pass  |     |
|                       isNumberElement(input:NumberElement)                        | pass  |     |
|                      isDateElement(input:DateElement)                     | pass  |     |
| isTimeElement(input:TimeElement) | pass  |     |
| isSelectElement(input:SelectElement) | pass  |     |
| isPluralElement(input:PluralElement) | pass  |     |
| isPoundElement(input:PoundElement) | pass  |     |
| isTagElement(input:TagElement) | pass  |     |
| isNumberSkeleton(input:NumberSkeleton) | pass  |     |
| isDateTimeSkeleton(input:DateTimeSkeleton) | pass  |     |
| createLiteralElement(input:string):LiteralElement | pass  |     |
| createNumberElement(input:string):NumberElement | pass  |     |
| parseDateTimeSkeleton(input:string):ExtendedDateTimeFormatOptions | pass  |     |
| convertNumberSkeletonToNumberFormatOptions(input:NumberSkeletonToken) | pass  |     |