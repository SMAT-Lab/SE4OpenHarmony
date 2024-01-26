## validator单元测试用例

该测试用例基于OpenHarmony系统下，采用[validator.js库测试用例](https://github.com/validatorjs/validator.js/test) 进行单元测试

### 单元测试用例覆盖情况

| 接口名                                           | 是否通过 | 备注  |
|-----------------------------------------------|------|-----|
| **contains(str, seed [, options])**           | pass |     |
| **equals(str, comparison)**                   | pass |     |
| **isAfter(str [, options])**                  | pass |     |
| **isAlpha(str [, locale, options])**          | fail |     |
| **isAlphanumeric(str [, locale, options])**   | fail |     |
| **isAscii(str)**                              | pass |     |
| **isBase32(str [, options])**                 | pass |     |
| **isBase58(str)**                             | pass |     |
| **isBase64(str [, options])**                 | fail |     |
| **isBefore(str [, date])**                    | pass |     |
| **isBIC(str)**                                | pass |     |
| **isBoolean(str [, options])**                | pass |     |
| **isBtcAddress(str)**                         | pass |     |
| **isByteLength(str [, options])**             | pass |     |
| **isCreditCard(str [, options])**             | pass |     |
| **isCurrency(str [, options])**               | fail |     |
| **isDataURI(str)**                            | pass |     |
| **isDate(str [, options])**                   | pass |     |
| **isDecimal(str [, options])**                | fail |     |
| **isDivisibleBy(str, number)**                | pass |     |
| **isEAN(str)**                                | pass |     |
| **isEmail(str [, options])**                  | fail |     |
| **isEmpty(str [, options])**                  | pass |     |
| **isEthereumAddress(str)**                    | pass |     |
| **isFloat(str [, options])**                  | fail |     |
| **isFQDN(str [, options])**                   | pass |     |
| **isFullWidth(str)**                          | pass |     |
| **isHalfWidth(str)**                          | pass |     |
| **isHash(str, algorithm)**                    | pass |     |
| **isHexadecimal(str)**                        | pass |     |
| **isHexColor(str)**                           | pass |     |
| **isHSL(str)**                                | pass |     |
| **isIBAN(str)**                               | pass |     |
| **isIdentityCard(str [, locale])**            | pass |     |
| **isIMEI(str [, options]))**                  | pass |     |
| **isIn(str, values)**                         | pass |     |
| **isInt(str [, options])**                    | pass |     |
| **isIP(str [, version])**                     | pass |     |
| **isIPRange(str [, version])**                | pass |     |
| **isISBN(str [, options])**                   | pass |     |
| **isISIN(str)**                               | pass |     |
| **isISO6391(str)**                            | pass |     |
| **isISO8601(str [, options])**                | pass |     |
| **isISO31661Alpha2(str)**                     | pass |     |
| **isISO31661Alpha3(str)**                     | pass |     |
| **isISO4217(str)**                            | pass |     |
| **isISRC(str)**                               | pass |     |
| **isISSN(str [, options])**                   | pass |     |
| **isJSON(str [, options])**                   | pass |     |
| **isJWT(str)**                                | pass |     |
| **isLatLong(str [, options])**                | pass |     |
| **isLength(str [, options])**                 | pass |     |
| **isLicensePlate(str, locale)**               | pass |     |
| **isLocale(str)**                             | pass |     |
| **isLowercase(str)**                          | pass |     |
| **isLuhnNumber(str)**                         | pass |     |
| **isMACAddress(str [, options])**             | pass |     |
| **isMagnetURI(str)**                          | pass |     |
| **isMD5(str)**                                | pass |     |
| **isMimeType(str)**                           | pass |     |
| **isMobilePhone(str [, locale [, options]])** | pass |     |
| **isMongoId(str)**                            | pass |     |
| **isMultibyte(str)**                          | pass |     |
| **isNumeric(str [, options])**                | pass |     |
| **isOctal(str)**                              | pass |     |
| **isPassportNumber(str, countryCode)**        | pass |     |
| **isPort(str)**                               | pass |     |
| **isPostalCode(str, locale)**                 | pass |     |
| **isRFC3339(str)**                            | pass |     |
| **isRgbColor(str [, includePercentValues])**  | pass |     |
| **isSemVer(str)**                             | pass |     |
| **isSurrogatePair(str)**                      | pass |     |
| **isUppercase(str)**                          | pass |     |
| **isSlug(str)**                               | pass |     |
| **isStrongPassword(str [, options])**         | pass |     |
| **isTime(str [, options])**                   | pass |     |
| **isTaxID(str, locale)**                      | pass |     |
| **isURL(str [, options])**                    | pass |     |
| **isUUID(str [, version])**                   | pass |     |
| **isVariableWidth(str)**                      | pass |     |
| **isVAT(str, countryCode)**                   | pass |     |
| **isWhitelisted(str, chars)**                 | pass |     |
| **matches(str, pattern [, modifiers])**       | pass |     |
| **blacklist(input, chars)**                   | pass |     |
| **escape(input)**                             | pass |     |
| **ltrim(input [, chars])**                    | pass |     |
| **normalizeEmail(email [, options])**         | pass |     |
| **rtrim(input [, chars])**                    | pass |     |
| **stripLow(input [, keep_new_lines])**        | pass |     |
| **toBoolean(input [, strict])**               | pass |     |
| **toDate(input)**                             | pass |     |
| **toFloat(input)**                            | pass |     |
| **toInt(input [, radix])**                    | pass |     |
| **trim(input [, chars])**                     | pass |     |
| **unescape(input)**                           | pass |     |
| **whitelist(input, chars)**                   | pass |     |
