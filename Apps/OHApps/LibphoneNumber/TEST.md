# libphonenumber-js单元测试用例

该测试用例基于OpenHarmony系统下，采用[原库测试用例](https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/test)进行单元测试。

单元测试用例覆盖情况

## AsYouType类
|         接口名         |  是否通过	   |备注|
|:-------------------:|:--------:|:---:|
 |     input(text)     |   PASS   |     |
 |       reset()       |   PASS   |     |
 |     getNumber()     |   PASS   |     |
 |  getNumberValue()   |   PASS   |     |
 | getNationalNumber() |   PASS   |     |
 |     getChars()      |   PASS   |     |
 |    getTemplate()    |   PASS   |     |
 |  getCallingCode()   |   PASS   |     |
 |    getCountry()     |   PASS   |     |
 |  isInternational()  |   PASS   |     |
 |    isPossible()     |   PASS   |     |
 |      isValid()      |   PASS   |     |

## 格式化号码
|         接口名         |  是否通过	   |备注|
|:-------------------:|:--------:|:---:|
|format(parsedNumber: ParsedNumber, format: NumberFormat)   |   PASS   |     |
|format(phone: NationalNumber, format: NumberFormat)  |   PASS   |     |
|format(phone: NationalNumber, format: NumberFormat)  |   PASS   |     |
|format(phone: NationalNumber, country: CountryCode, format: NumberFormat)  |   PASS   |     |
|formatNumber(parsedNumber: ParsedNumber, format: NumberFormat, options?: FormatNumberOptions)  |   PASS   |     |
|formatNumber(phone: NationalNumber, format: NumberFormat, options?: FormatNumberOptions) |   PASS   |     |
|formatNumber(phone: NationalNumber, country: CountryCode, format: NumberFormat, options?: FormatNumberOptions) |   PASS   |     |

## 解析手机号码
|                                                                               接口名                                                                               |                                       是否通过	                                       |备注|
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------:|:---:|
|                                              parsePhoneNumberWithError(text: string, defaultCountry?: CountryCode)                                              |                                       PASS                                        |     |
|                                              parse(text: string, options?: CountryCode &#124; ParseNumberOptions)                                               |   PASS   |     |
|                                           parseNumber(text: string, options?: CountryCode &#124; ParseNumberOptions)                                            |   PASS   |     |
| parsePhoneNumberFromString(text: string, defaultCountry?: CountryCode &#124;  { defaultCountry?: CountryCode, defaultCallingCode?: string, extract?: boolean }) |   PASS   |     |
|                                                  parsePhoneNumber(text: string, defaultCountry?: CountryCode)                                                   |                                       PASS                                        |     |

## 解析手机号码的有效性
|                                                                    接口名                                                                     |  是否通过	   |备注|
|:------------------------------------------------------------------------------------------------------------------------------------------:|:--------:|:---:|
|    isValidPhoneNumber(text: string, defaultCountry?: CountryCode &#124; { defaultCountry?: CountryCode, defaultCallingCode?: string })     |   PASS   |     |
|   isPossiblePhoneNumber(text: string, defaultCountry?: CountryCode &#124; { defaultCountry?: CountryCode, defaultCallingCode?: string })   |   PASS   |     |
|                                       isPossibleNumber(phone: NationalNumber, country?: CountryCode)                                       |   PASS   |     |
| validatePhoneNumberLength(text: string, defaultCountry?: CountryCode &#124; { defaultCountry?: CountryCode, defaultCallingCode?: string }) |   PASS   |     |
|                                        isValidNumber(phone: NationalNumber, country?: CountryCode)                                         |   PASS   |     |
|                                    isValidNumberForRegion(phone: NationalNumber, country: CountryCode)                                     |   PASS   |     |

## 获取手机号码类型
|                    接口名                    |  是否通过	   |备注|
|:-----------------------------------------:|:--------:|:---:|
| getNumberType(parsedNumber: ParsedNumber) |   PASS   |     |
|getNumberType(phone: NationalNumber, country?: CountryCode)                 |   PASS   |     |
|getExampleNumber(country: CountryCode, examples: Examples)               |   PASS   |     |

## 查找号码
|                                                                          接口名                                                                           |  是否通过	   |备注|
|:------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------:|:---:|
|                                                    findNumbers(text: string, options?: CountryCode)                                                    |   PASS   |     |
|                                                   searchNumbers(text: string, options?: CountryCode)                                                   |   PASS   |     |
|                                    findNumbers(text: string, options?: { defaultCountry?: CountryCode, v2: true })                                     |   PASS   |     |
|                                   searchNumbers(text: string, options?: { defaultCountry?: CountryCode, v2: true })                                    |   PASS   |     |
|  findPhoneNumbersInText(text: string, options?: CountryCode &#124; { defaultCountry?: CountryCode, defaultCallingCode?: string, extended?: boolean })  |   PASS   |     |
| searchPhoneNumbersInText(text: string, options?: CountryCode &#124; { defaultCountry?: CountryCode, defaultCallingCode?: string, extended?: boolean }) |   PASS   |     |

## PhoneNumber类
|         接口名         |  是否通过	   |备注|
|:-------------------:|:--------:|:---:|
|setExt(ext: Extension)  |   PASS   |     |
| getPossibleCountries()       |   PASS   |     |
|isPossible()   |   PASS   |     |
|isValid()  |   PASS   |     |
|getType() |   PASS   |     |
|format(format: NumberFormat, options?: FormatNumberOptions)   |   PASS   |     |
|formatNational(options?: FormatNumberOptionsWithoutIDD)  |   PASS   |     |
|formatInternational(options?: FormatNumberOptionsWithoutIDD) |   PASS   |     |
|getURI(options?: FormatNumberOptionsWithoutIDD)    |   PASS   |     |
|isNonGeographic() |   PASS   |     |
|isEqual(phoneNumber: PhoneNumber)   |   PASS   |     |
