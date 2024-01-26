# ASN1js

## 简介

> ASN.1 (Syntax Notation One)是一种描述电信和计算机网络中数据表示、编码、传输和解码的规则和结构的标准和符号。
> [ASN1js](https://github.com/PeculiarVentures/ASN1.js)是一个实现此标准的纯JavaScript库。ASN.1是所有X.509相关数据结构和网络上使用的许多其他协议的基础。

## 下载安装

```shell
ohpm  install @fortanix/asn1js@1.52.0
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```
//region How to create new ASN. structures 
    var sequence = new asn1js.Sequence();
    sequence.valueBlock.value.push(new asn1js.Integer({ value: 1 }));

    var sequence_buffer = sequence.toBER(false); // Encode current sequence to BER (in ArrayBuffer)
    var current_size = sequence_buffer.byteLength;

    var integer_data = new ArrayBuffer(8);
    var integer_view = new Uint8Array(integer_data);
    integer_view[0] = 0x01;
    integer_view[1] = 0x01;
    integer_view[2] = 0x01;
    integer_view[3] = 0x01;
    integer_view[4] = 0x01;
    integer_view[5] = 0x01;
    integer_view[6] = 0x01;
    integer_view[7] = 0x01;

    sequence.valueBlock.value.push(new asn1js.Integer({
        isHexOnly: true,
        valueHex: integer_data
    })); // Put too long for decoding Integer value

    sequence_buffer = sequence.toBER(false);
    current_size = sequence_buffer.byteLength;
    //endregion 
```

```
    //region How to create new ASN.1 structures by calling constuctors with parameters 
    var sequence2 = new asn1js.Sequence({
        value: [
            new asn1js.Integer({ value: 1 }),
            new asn1js.Integer({
                isHexOnly: true,
                valueHex: integer_data
            }),
        ]
    });
    //endregion 
```

```
    //region How to validate ASN.1 against pre-defined schema 
    var asn1_schema = new asn1js.Sequence({
        name: "block1",
        value: [
            new asn1js.Null({
                name: "block2"
            }),
            new asn1js.Integer({
                name: "block3",
                optional: true // This block is absent inside data, but it's "optional". Hence verification against the schema will be passed.
            })
        ]
    });
    //endregion

    var variant1 = org.pkijs.verifySchema(encoded_sequence, asn1_schema); // Verify schema together with decoding of raw data
    var variant1_verified = variant1.verified;
    var variant1_result = variant1.result; // Verified decoded data with all block names inside
```

```
    //region How to use "internal schemas" for primitevely encoded data types 
    var primitive_octetstring = new asn1js.OctetString({ valueHex: encoded_sequence }); // Create a primitively encoded OctetString where internal data is an encoded Sequence

    var asn1_schema_internal = new asn1js.OctetString({
        name: "outer_block",
        primitiveSchema: new asn1js.Sequence({
            name: "block1",
            value: [
                    new asn1js.Null({
                        name: "block2"
                    })
            ]
        })
    });

    var variant6 = org.pkijs.compareSchema(primitive_octetstring, primitive_octetstring, asn1_schema_internal);
    var variant6_verified = variant4.verified;
    var variant6_block1_tag_num = variant6.result.block1.idBlock.tagNumber;
    var variant6_block2_tag_num = variant6.result.block2.idBlock.tagNumber;
    //endregion 

```

## 接口说明

| 接口名 |                                  参数                                   |
|:---:|:---------------------------------------------------------------------:|
|  BaseBlock   | parameters：object,primitiveSchema:object,name:string,optional:boolean |
|  OctetString   |                           parameters:object                           |
|  toJSON   |                                   无                                   |
|  toBER   |                           sizeOnly:boolean                            |
|  Integer   |                           parameters:object                           |
|  GeneralizedTime   |            parameters:object ,value:string,valueDate:Data             |
|  ObjectIdentifier   |                parameters:object,valueHex:ArrayBuffer                 |

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- ASN1js
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [BSD-3-Clause License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/ASN1js/LICENSE)
，请自由地享受和参与开源。
    