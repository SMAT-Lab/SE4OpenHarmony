## utileCode单元测试用例

该测试用例基于OpenHarmony系统下，采用 
[leap-year库测试用例](https://github.com/sindresorhus/leap-year/blob/main/test.js)
[imagetype库测试用例](https://github.com/fatelei/imagetype/blob/master/test/test_imtype.js)
[node-cache库测试用例](https://github.com/ptarjan/node-cache/blob/master/test.js)
进行单元测试

### 单元测试用例覆盖情况

| 接口名         | 是否通过 | 备注  |
|---------------|------|-----|
| isLeapYear()    | pass |     |
| isJPG()         | pass |     |
| isPNG()         | pass |     |
| isGIF()         | pass |     |
| isBMP()         | pass |     |
| isTIF()         | pass |     |
| get12()         | pass |     |
| get24()         | pass |     |
| getCountryCode()        | pass |     |
| getCountryCodeByLanguage()        | pass |     |
| getCountryCodeFromMap()         | pass |  循环测试map的value   |
| randomColor()         | pass |     |
| gcoord.transform()         | pass |     |
| cache.get()         | pass |     |
| cache.put()         | pass |     |
| cache.del()         | pass |     |
| cache.size()         | pass |     |
| cache.memsize()         | pass |     |
| cache.debug()         | pass |     |
| cache.hits()         | pass |     |
| cache.misses()         | pass |     |
| cache.keys()         | pass |     |
| cache.exportJson()         | pass |     |
| cache.importJson()         | pass |     |
| TempUtils.F2C()         | pass |     |
| TempUtils.C2F()         | pass |     |

