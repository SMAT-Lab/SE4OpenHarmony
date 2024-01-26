let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import { Gson, StringBuilder, GsonBuilder, StringReader, JsonReader, JsonWriter, JsonObject, JsonArray, JsonPrimitive, JsonTreeReader, JsonTreeWriter, JsonNull, parseString, JsonElement } from '@ohos/gson-ts';
export default function exampleJsunit() {
    describe('appInfoTest', () => {
        it('app_info_test_001', 0, () => {
            //json字符串转对象
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                let log = '';
                for (let i = 0; i < Object.keys(obj1).length; i++) {
                    log += 'key:' + Object.keys(obj1)[i] + ' value:' + Object.values(obj1)[i] + '; ';
                }
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_002', 0, () => {
            //字符串转object转字符串
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_003', 0, () => {
            //字符串转object转JsonElement
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let str3 = new Gson().toJson(jsonElement);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_004', 0, () => {
            //字符串转object转JsonElement转object
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let obj2 = new Gson().fromJson(jsonElement);
                let log = '';
                for (let i = 0; i < Object.keys(obj2).length; i++) {
                    log += 'key:' + Object.keys(obj2)[i] + ' value:' + Object.values(obj2)[i] + '; ';
                }
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_005', 0, () => {
            //字符串转object转JsonElement转object转字符串
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let obj2 = new Gson().fromJson(jsonElement);
                let str4 = new Gson().toJson(obj2);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_006', 0, () => {
            //字符串转object转字符串转JsonElement转字符串
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let obj1 = new Gson().fromJson(value);
                let str2 = new Gson().toJson(obj1);
                let str5 = new Gson().toJson(parseString(str2));
                // 原始字符串转为object再转为string再转为JsonElement再转为string
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_007', 0, () => {
            let result = new Gson().getSerializeNulls();
            expect(result).assertFalse();
        });
        it('app_info_test_008', 0, () => {
            let result = new Gson().getHtmlSafe();
            expect(result).assertTrue();
        });
        it('app_info_test_009', 0, () => {
            try {
                new Gson().newJsonWriter(new StringBuilder());
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_010', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new Gson().newJsonReader(new StringReader(value));
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_011', 0, () => {
            try {
                new GsonBuilder().setSerializeNulls();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_012', 0, () => {
            try {
                new GsonBuilder().setGenerateNonExecutableJson();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_013', 0, () => {
            try {
                new GsonBuilder().setPrettyPrinting();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_014', 0, () => {
            try {
                new GsonBuilder().setLenient();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_015', 0, () => {
            try {
                new GsonBuilder().disableHtmlEscaping();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_016', 0, () => {
            try {
                new GsonBuilder().create();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_017', 0, () => {
            let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
            new JsonReader(new StringReader(value)).setLenient(false);
            let result = new JsonReader(new StringReader(value)).isLenient();
            expect(result).assertFalse();
        });
        it('app_info_test_018', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).beginObject();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_019', 0, () => {
            let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
            let result = new JsonReader(new StringReader(value)).hasNext();
            expect(result).assertTrue();
        });
        it('app_info_test_020', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).peek();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_021', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).peekNumber();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_022', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).close();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_023', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).skipValue();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_024', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonReader(new StringReader(value)).getPath();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_025', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).getOut();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_026', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonWriter(new StringBuilder()).setIndent(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_027', 0, () => {
            new JsonWriter(new StringBuilder()).setLenient(false);
            let result = new JsonWriter(new StringBuilder()).isLenient();
            expect(result).assertFalse();
        });
        it('app_info_test_028', 0, () => {
            new JsonWriter(new StringBuilder()).setHtmlSafe(true);
            let result = new JsonWriter(new StringBuilder()).isHtmlSafe();
            expect(result).assertTrue();
        });
        it('app_info_test_029', 0, () => {
            new JsonWriter(new StringBuilder()).setSerializeNulls(false);
            let result = new JsonWriter(new StringBuilder()).getSerializeNulls();
            expect(result).assertFalse();
        });
        it('app_info_test_030', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).beginArray();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_031', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).beginObject();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_032', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonWriter(new StringBuilder()).name(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_033', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonWriter(new StringBuilder()).value(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_034', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).value(true);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_035', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).value(1);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_036', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonWriter(new StringBuilder()).jsonValue(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_037', 0, () => {
            try {
                new JsonWriter(new StringBuilder()).nullValue();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_038', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).length;
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_039', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).append(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_040', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).insert(1, value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_041', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).clear();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_042', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).remove(0, 1);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_043', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).replace(value, value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_044', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).toString();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_045', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringBuilder(value).equals(new StringBuilder(value));
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_046', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringReader(value).read();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_047', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let valueArray = [value, value];
                new StringReader(value).readBuffer(valueArray, 0, 2);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_048', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let valueArray = [value, value];
                new StringReader(value).readBufferOption(valueArray, 0, 2);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_049', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new StringReader(value).close();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_050', 0, () => {
            try {
                new JsonObject().deepCopy();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_051', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                let result: JsonObject = new JsonObject().deepCopy();
                new JsonObject().add(value, result);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_052', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().remove(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_053', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().addProperty(value, value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_054', 0, () => {
            try {
                new JsonObject().entries();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_055', 0, () => {
            try {
                new JsonObject().entrySet();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_056', 0, () => {
            try {
                new JsonObject().keySet();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_057', 0, () => {
            try {
                new JsonObject().size();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_058', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().has(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_059', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().get(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_060', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().getAsJsonPrimitiveByMemberName(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_061', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().getAsJsonArrayByMemberName(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_062', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonObject().getAsJsonObjectByMemberName(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_063', 0, () => {
            try {
                new JsonNull().deepCopy();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_064', 0, () => {
            try {
                new JsonArray().deepCopy();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_065', 0, () => {
            try {
                let value = new JsonArray().deepCopy();
                new JsonArray().addAll(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_066', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonArray().add(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_067', 0, () => {
            try {
                new JsonArray().set(1, JsonNull.INSTANCE);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_068', 0, () => {
            try {
                new JsonArray().remove(JsonNull.INSTANCE);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_069', 0, () => {
            try {
                new JsonArray().remove(1);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_070', 0, () => {
            try {
                new JsonArray().contains(JsonNull.INSTANCE);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_071', 0, () => {
            try {
                new JsonArray().size();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_072', 0, () => {
            try {
                new JsonArray().isEmpty();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_073', 0, () => {
            try {
                new JsonArray().iterator();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_074', 0, () => {
            try {
                new JsonArray().list();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_075', 0, () => {
            try {
                new JsonArray().get(1);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_076', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).deepCopy();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_077', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).getAsBoolean();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_078', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).isNumber();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_079', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).getAsNumber();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_080', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).isString();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_081', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonPrimitive(value).getAsString();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_082', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).hasNext();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_083', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).peek();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_084', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).nextNull();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_085', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).nextJsonElement();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_086', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).close();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_087', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).skipValue();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_088', 0, () => {
            try {
                new JsonTreeReader(JsonNull.INSTANCE).getPath();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_089', 0, () => {
            try {
                new JsonTreeWriter().get();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_090', 0, () => {
            try {
                new JsonTreeWriter().beginArray();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_091', 0, () => {
            try {
                new JsonTreeWriter().beginObject();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_092', 0, () => {
            try {
                let value: string = '{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }';
                new JsonTreeWriter().value(value);
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_093', 0, () => {
            try {
                new JsonTreeWriter().nullValue();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
        it('app_info_test_094', 0, () => {
            try {
                new JsonTreeWriter().close();
                expect(true).assertTrue();
            }
            catch (e) {
                expect(false).assertTrue();
            }
        });
    });
}
