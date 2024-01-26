/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const array: Array<SelectOption> = [
  { value: 'crc32' }, { value: 'crc32b' }, { value: 'md4' }, { value: 'md5' }, { value: 'ripemd128' },
  { value: 'ripemd160' }, { value: 'sha1' }, { value: 'sha256' }, { value: 'sha384' }, { value: 'sha512' },
  { value: 'tiger128' }, { value: 'tiger160' }, { value: 'tiger192' }
]
const LicensePlateArray: Array<SelectOption> = [
  { value: 'es-AR' }, { value: 'de-DE' }, { value: 'de-LI' }, { value: 'en-IN' }, { value: 'cs-CZ' },
  { value: 'hu-HU' }, { value: 'pt-BR' }, { value: 'pt-PT' }, { value: 'sq-AL' }, { value: 'sv-SE' },
  { value: 'any' }
]
const IDCardArray: Array<SelectOption> = [
  { value: 'LK' }, { value: 'PL' }, { value: 'ES' }, { value: 'FI' }, { value: 'IN' },
  { value: 'IT' }, { value: 'IR' }, { value: 'MZ' }, { value: 'NO' }, { value: 'TH' },
  { value: 'zh-TW' }, { value: 'he-IL' }, { value: 'ar-LY' }, { value: 'ar-TN' },
  { value: 'zh-CN' }, { value: 'zh-HK' }, { value: 'any' }
]

const TaxIDArray:Array<SelectOption> = [
  { value: 'bg-BG' }, { value: 'cs-CZ' }, { value: 'de-AT' }, { value: 'de-DE' }, { value: 'dk-DK' },
  { value: 'el-CY' }, { value: 'el-GR' }, { value: 'en-CA' }, { value: 'en-GB' }, { value: 'en-IE' },
  { value: 'en-US' }, { value: 'es-ES' }, { value: 'et-EE' }, { value: 'fi-FI' },
  { value: 'fr-BE' }, { value: 'fr-CA' }, { value: 'fr-FR' }
]
const VATArray: Array<SelectOption> = [
  { value: 'AT' }, { value: 'AL' }, { value: 'AR' }, { value: 'AU' }, { value: 'BE' },
  { value: 'BG' }, { value: 'BO' }, { value: 'BR' }, { value: 'BY' }, { value: 'CA' },
  { value: 'CH' }, { value: 'CL' }, { value: 'CO' }, { value: 'CR' }, { value: 'CY' },
  { value: 'CZ' }, { value: 'DE' }, { value: 'DK' }, { value: 'DO' }, { value: 'EC' },
  { value: 'EE' }, { value: 'EL' }, { value: 'ES' }, { value: 'FI' }, { value: 'FR' },
  { value: 'GB' }, { value: 'GT' }, { value: 'HN' }, { value: 'HR' }, { value: 'HU' },
  { value: 'ID' }, { value: 'IE' }, { value: 'IL' }, { value: 'IN' }, { value: 'IS' },
  { value: 'IT' }, { value: 'KZ' }, { value: 'LT' }, { value: 'LU' }, { value: 'LV' },
  { value: 'MK' }, { value: 'MT' }, { value: 'MX' }, { value: 'NG' }, { value: 'NI' },
]
const PostalCodeArray: Array<SelectOption> = [
  { value: 'AU' }, { value: 'AT' }, { value: 'AD' }, { value: 'BA' }, { value: 'BE' },
  { value: 'BG' }, { value: 'BR' }, { value: 'BY' }, { value: 'CA' },{ value: 'CH' },
  { value: 'CN' }, { value: 'CZ' }, { value: 'DE' }, { value: 'DK' }, { value: 'DO' },
  { value: 'DZ' }, { value: 'EE' }, { value: 'ES' }, { value: 'FI' }, { value: 'FR' },
  { value: 'GB' }, { value: 'GR' }, { value: 'HR' }, { value: 'HU' },{ value: 'any' },
]
export  interface  dataType{
  text:string
  str:string
  str1?:string
  default?:string
  local?: SelectOption[]
  min?:number
  max?:number
  values?: string[]
  IPVersion?: number
  mode:string
}
let  data:dataType[] = [
  { text:"1.检查字符串是否为 base32 编码", str:"ZG======",mode:"isBase32" },
  { text:"2.检查字符串是否为 Base58 编码", str:"91GHkLMNtyo98",mode:"isBase58" },
  { text:"3.检查字符串是否为 Base64 编码", str:"Zm9vYmFy",mode:"isBase64" },
  { text:"4.检查字符串是否仅包含 ASCII 字符", str:"foobar",mode:"isAscii" },
  { text:"5.检查字符串是否是 BIC（银行识别码）", str:"SBICKEN1345",mode:"isBIC" },
  { text:"6.检查字符串是否是 布尔值", str:"true",mode:"isBoolean" },
  { text:"7.检查字符串是否为有效的 BTC 地址", str:"1MUz4VMYui5qY1mxUiG8BQ1Luv6tqkvaiL",mode:"isBtcAddress" },
  { text:"8.检查字符串是否为信用卡号", str:"375556917985515",mode:"isCreditCard" },
  { text:"9.检查字符串是否为有效的货币金额", str:"$10,123",mode:"isCurrency" },
  { text:"10.检查字符串是否为数据 URI 格式", str:"data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E",mode:"isDataURI" },
  { text:"11.检查字符串是否为有效日期", str:"2020/02/29",mode:"isDate" },
  { text:"12.检查字符串是否表示十进制数，例如 0.1、.3、1.1、1.00003、4.0 等", str:"10",mode:"isDecimal" },
  { text:"13.检查字符串是否为 EAN（欧洲货号）", str:"9421023610112",mode:"isEAN" },
  { text:"14.检查字符串是否为电子邮件", str:"foo@bar.com",mode:"isEmail" },
  { text:"15.检查字符串的长度是否为零", str:"",mode:"isEmpty" },
  { text:"16.检查字符串是否为以太坊地址", str:"0x0000000000000000000000000000000000000001",mode:"isEthereumAddress" },
  { text:"17.检查字符串是否为完全限定的域名（例如 domain.com）", str:"domain.com",mode:"isFQDN" },
  { text:"18.检查字符串是否包含任何全角字符", str:"ひらがな・カタカナ、．漢字",mode:"isFullWidth" },
  { text:"19.检查字符串是否包含任何半角字符", str:"abc123い",mode:"isHalfWidth" },
  { text:"20.检查字符串是否为十六进制数", str:"0xff0044",mode:"isHexadecimal" },
  { text:"21.检查字符串是否为十六颜色", str:"#ff0000ff",mode:"isHexColor" },
  { text:"22.检查字符串是否是基于 CSS 颜色级别 4 规范的 HSL（色调、饱和度、亮度、可选 alpha）颜色", str:"hsl(360,0000000000100%,000000100%)",mode:"isHSL" },
  { text:"23.检查字符串是否为 IBAN（国际银行帐号）", str:"SC52BAHL01031234567890123456USD",mode:"isIBAN" },
  { text:"24.检查字符串是否为有效的身份证代码", str:"722222222v", default :"LK",local:IDCardArray, mode:"isIdentityCard" },
  { text:"25.检查字符串是否为有效的 IMEI 号码", str:"352099001761481",mode:"isIMEI" },
  { text:"26.检查字符串是否为 ISBN", str:"3836221195",mode:"isISBN" },
  { text:"27.检查字符串是否为 ISIN（股票/证券标识符）", str:"AU0000XVGZA3",mode:"isISIN" },
  { text:"28.检查字符串是否为有效的 ISO6391 装运集装箱标识", str:"ay",mode:"isISO6391" },
  { text:"29.检查字符串是否为有效的 ISO8601 装运集装箱标识", str:"2009-12T12:34",mode:"isISO8601" },
  { text:"30.检查字符串是否为有效的 ISO31661Alpha2 装运集装箱标识", str:"FR",mode:"isISO31661Alpha2" },
  { text:"31.检查字符串是否为有效的 ISO31661Alpha3 装运集装箱标识", str:"ABW",mode:"isISO31661Alpha3" },
  { text:"32.检查字符串是否为有效的 ISO4217 装运集装箱标识", str:"AED",mode:"isISO4217" },
  { text:"33.字符串中是否包含某个字符", str:"Hello World", str1:"H", mode:"contains" },
  { text:"34.比较字符串", str:"Hello World", str1:"Hello World", mode:"equals" },
  { text:"35.检查字符串是否是指定日期之后的日期", str:"2022-04-10", str1:"2023-07-18", mode:"isAfter" },
  { text:"36.检查字符串是否是指定日期之前的日期", str:"2010-08-04", str1:"2010-07-02", mode:"isBefore" },
  { text:"37.检查字符串是否仅包含字母 （a-zA-Z）", str:"aweawrfadfaff", mode:"isAlpha" },
  { text:"38.检查字符串是否仅包含字母和数字 （a-zA-Z0-9）", str:"aweawrfadfaff", mode:"isAlphanumeric" },
  { text:"39.检查字符串的长度（以 UTF-8 字节为单位）是否在某个范围内", str:"abc", min:1, max:4, mode:"isByteLength" },
  { text:"40.检查字符串是否为浮点数", str:"1.2", min:1, max:2, mode:"isFloat" },
  { text:"41.检查字符串是否为整数", str:"2", min:1, max:3, mode:"isInt" },
  { text:"42.检查字符串是否是可被另一个整数整除的数字", str:"10", min:2, mode:"isDivisibleBy" },
  { text:"43.检查字符串是否在允许值的数组或字符串中", str:"foo", values:['foo','bar'], mode:"isIn" },
  { text:"44.检查字符串是否为 IP（版本 4 或 6）", str:"127.0.0.1", IPVersion:4 , mode:"isIP" },
  { text:"45.检查字符串是否为 IP 范围（版本 4 或 6）", str:"127.0.0.1/1", IPVersion:4 , mode:"isIPRange" },
  { text:"46.检查字符串是否为算法类型的哈希", str:"d94f3f01", default :"crc32" ,local:array, mode:"isHash" },
  { text:"47.检查字符串是否为 ISRC", str:"USAT29900609", mode:"isISRC" },
  { text:"48.检查字符串是否为 ISSN", str:"0378-5955", mode:"isISSN" },
  { text:"49.检查字符串是否有效（注意：使用 JSON.parse）", str:'{ "key": "value" }', mode:"isJSON" },
  { text:"50.检查字符串是否为有效的 JWT 令牌", str:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI', mode:"isJWT" },
  { text:"51.检查字符串是否为有效经纬度坐标", str:'(-17.738223, 85.605469)', mode:"isLatLong" },
  { text:"52.检查字符串的长度是否在某个范围内", str:'abc', min:1, max:4, mode:"isLength" },
  { text:"53.检查字符串是否为小写", str:'abc', mode:"isLowercase" },
  { text:"54.检查字符串是否与国家/地区车牌的格式匹配", str:'AB123CD', default :'es-AR',local:LicensePlateArray, mode:"isLicensePlate" },
  { text:"55.检查字符串是否为区域设置", str:'uz_Latn_UZ',  mode:"isLocale" },
  { text:"56.检查字符串是否通过 Luhn 算法检查", str:'01234567897',  mode:"isLuhnNumber" },
  { text:"57.检查字符串是否为 MAC 地址", str:'ab:ab:ab:ab:ab:ab',  mode:"isMACAddress" },
  { text:"58.检查字符串是否为磁铁 URI 格式", str:'magnet:?xt.1=urn:sha1:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456&xt.2=urn:sha1:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',  mode:"isMagnetURI" },
  { text:"59.检查字符串是否为 MD5 哈希", str:'d94f3f016ae679c3008de268209132f2',  mode:"isMD5" },
  { text:"60.检查字符串是否与有效的 MIME 类型格式匹配", str:'application/json',  mode:"isMimeType" },
  { text:"61.检查字符串是否为手机号码", str:'19876543210',  mode:"isMobilePhone" },
  { text:"62.检查字符串是否是MongoDB ObjectId的有效十六进制编码表示形式", str:'507f1f77bcf86cd799439011',  mode:"isMongoId" },
  { text:"63.检查字符串是否包含一个或多个多字节字符", str:'ひらがな・カタカナ、．漢字',  mode:"isMultibyte" },
  { text:"64.检查字符串是否仅包含数字", str:'123',  mode:"isNumeric" },
  { text:"65.检查字符串是否为有效的八进制数", str:'076543210',  mode:"isOctal" },
  { text:"66.检查字符串是否为有效的护照号码", str:'AF0549358',  str1:"AM",  mode:"isPassportNumber" },
  { text:"67.检查字符串是否为有效的端口号", str:'22', mode:"isPort" },
  { text:"68.检查字符串是否为邮政编码", str:'4000', default :"AU",local:PostalCodeArray, mode:"isPostalCode" },
  { text:"69.检查字符串是否为有效的 RFC 3339 日期", str:'2009-05-19 14:39:22-06:00', mode:"isRFC3339" },
  { text:"70.检查字符串是 RGB 还是 RGBA 颜色", str:'rgb(0,0,0)', mode:"isRgbColor" },
  { text:"71.检查字符串是否为语义版本控制规范 （SemVer）", str:'1.0.0-beta', mode:"isSemVer" },
  { text:"72.检查字符串是否包含任何代理项对字符", str:'ABC千𥧄1-2-3', mode:"isSurrogatePair" },
  { text:"73.检查字符串是否为大写", str:'ABC', mode:"isUppercase" },
  { text:"74.检查字符串是否为 slug 类型", str:'foo-bar', mode:"isSlug" },
  { text:"75.检查该字符串是否可以被视为强密码", str:'%2%k{7BsL"M%Kd6e', mode:"isStrongPassword" },
  { text:"76.检查字符串是否是有效的时间", str:'00:00', mode:"isTime" },
  { text:"77.检查字符串是否为有效的税号", str:'0101010012', default :"bg-BG",local:TaxIDArray, mode:"isTaxID" },
  { text:"78.检查字符串是否为 URL", str:'www.foobar.com', mode:"isURL" },
  { text:"79.检查字符串是否为 UUID", str:'A987FBC9-4BED-3078-CF07-9141BA07C9F3', mode:"isUUID" },
  { text:"80.检查字符串是否包含全角和半角字符的混合", str:'ひらがなカタカナ漢字ABCDE', mode:"isVariableWidth" },
  { text:"81.如果给定的国家/地区代码与 ISO 3166-1 alpha-2 匹配，请检查字符串是否为有效的增值税号", str:'ATU12345678', default :'AT',local:VATArray, mode:"isVAT" },
  { text:"82.检查字符串是否仅由白名单中显示的字符组成", str:'foo',str1:"abcdefghijklmnopqrstuvwxyz-", mode:"isWhitelisted" },
  { text:"83.检查字符串是否与模式匹配", str:'abc',str1:"abc", mode:"matches" },
  { text:"84.从输入的两侧修剪字符", str:'\\S010100201000\\S',str1:"\\S", mode:"trim" },
  { text:"85.从输入的左侧修剪字符", str:'\\S010100201000',str1:"\\S", mode:"ltrim" },
  { text:"86.从输入的右侧修剪字符", str:'010100201000\\S',str1:"\\S", mode:"rtrim" },
  { text:"87.将 、、 <> & '/‘ ’替换为 HTML 实体", str:"<script> alert('xss&fun'); </script>", mode:"escape" },
  { text:"88.将 HTML 实体替换为、、 <> & '/‘ ’ ", str:'&lt;script&gt; alert(&quot;xss&amp;fun&quot;); &lt;&#x2F;script&gt;', mode:"unescape" },
  { text:"89.删除数值＜32和127的字符，主要是控制字符", str:'\u2206\x0A', mode:"stripLow" },
  { text:"90.将输入字符串转换为整数，或者如果输入不是int则为NaN", str:'3', mode:"toInt" },
  { text:"91.将输入字符串转换为float，或者如果输入不是float则为NaN", str:'2.', mode:"toFloat" },
  { text:"92.删除未出现在白名单中的字符", str:'abcdef', str1:"abc",mode:"whitelist" },
  { text:"93.删除黑名单中出现的字符", str:'abcdef', str1:"abc",mode:"blacklist" },
  { text:"94.将电子邮件地址规范化", str:'some.name@qq.com', mode:"normalizeEmail" },
  { text:"95.将输入字符串转换为布尔值", str:'true', mode:"toBoolean" },
  { text:"96.将输入字符串转换为日期，如果输入不是日期，则转换为null", str:'2022/05/07', mode:"toDate" }
]
export { data}