## protobuf-format单元测试用例

**单元测试用例覆盖情况**

### protobuf-format

| 接口名                                                                                                                 | 是否通过 | 备注 |
|---------------------------------------------------------------------------------------------------------------------| -------- | ---- |
| static messageToJson(message: Protobuf.Builder.Message): string                                                     | pass     |      |
| static jsonToMessage(builder: Protobuf.Builder, path: string, json: string &#124; Object): Protobuf.Builder.Message | pass     |      |
| static messageToXml(message: Protobuf.Builder.Message): string                                                                                                    | pass     |      |
| static xmlToMessage(builder: Protobuf.Builder, path: string, xml: string): Protobuf.Builder.Message                                                                                                        | pass     |      |
| static messageToHtml(message: Protobuf.Builder.Message): string                                                                                                        | pass     |      |
