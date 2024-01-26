## emailjs单元测试用例

该测试用例基于OpenHarmony系统下，参照[原库测试用例](https://github.com/eleith/emailjs/tree/main/test) 进行单元测试

### 单元测试用例覆盖情况

| 接口名                            | 是否通过 |备注|
|--------------------------------|---|---|
| addressparser(address?: string | pass||
| new SMTPConnection             |pass|
| getRFC2822Date |pass|
| getRFC2822DateUTC |pass|
| isRFC2822Date |pass|
| mimeEncode |pass|
| mimeWordEncode |pass|