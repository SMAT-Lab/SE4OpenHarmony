let __generate__Id: number = 0;
function generateId(): string {
    return "AqlHelper.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Database, aql } from "library";
import { getNameObj } from './ArrayParsing';
export default function AqlHelperTest() {
    describe("AqlHelperTest1", () => {
        interface ObjType {
            a: string;
        }
        let objValue: ObjType = { a: "b" };
        const db = new Database();
        it("supports_simple_parameters", 0, () => {
            const values: (number | null | boolean | string | number[] | ObjType)[] = [
                0,
                42,
                -1,
                null,
                true,
                false,
                "",
                "string",
                [1, 2, 3],
                objValue,
            ];
            const query = aql `A ${values[0]} B ${values[1]} C ${values[2]} D ${values[3]} E ${values[4]} F ${values[5]} G ${values[6]} H ${values[7]} I ${values[8]} J ${values[9]} K EOF`;
            expect(query.query).assertEqual(`A @value0 B @value1 C @value2 D @value3 E @value4 F @value5 G @value6 H @value7 I @value8 J @value9 K EOF`);
            const bindVarNames = Object.keys(query.bindVars).sort((a, b) => +Number(a.substr(5)) > +Number(b.substr(5)) ? 1 : -1);
            expect(bindVarNames.join("")).assertEqual([
                "value0",
                "value1",
                "value2",
                "value3",
                "value4",
                "value5",
                "value6",
                "value7",
                "value8",
                "value9",
            ].join(""));
        });
        it("supports_arangojs_collection_parameters", 0, () => {
            const collection = db.collection<any>("potato");
            const query = aql `${collection}`;
            expect(query.query).assertEqual("@@value0");
            expect(query.bindVars["@value0"]).assertEqual("potato");
        });
        it("supports_arangojs_view_parameters", 0, () => {
            const view = db.view("banana");
            const query = aql `${view}`;
            expect(query.query).assertEqual("@@value0");
            expect(query.bindVars["@value0"]).assertEqual("banana");
        });
        it("supports_ArangoDB_collection_parameters", 0, () => {
            class ArangoCollection {
                isArangoCollection = true;
                name = "tomato";
            }
            const collection = new ArangoCollection();
            const query = aql `${collection}`;
            expect(query.query).assertEqual("@@value0");
            expect(query.bindVars["@value0"]).assertEqual("tomato");
        });
        it("supports_arbitrary_types", 0, () => {
            interface More {
                x: number;
            }
            interface Whatever {
                color: string;
                more: More;
            }
            const whatever: Whatever[] = [
                { color: "green", more: { x: 2 } },
                { color: "yellow", more: { x: 3 } },
            ];
            const query = aql `${whatever}`;
            expect(query.query).assertEqual("@value0");
            expect(Object.keys(query.bindVars).join("")).assertEqual(["value0"].join(""));
            expect(query.bindVars.value0).assertEqual(whatever);
        });
        it("supports_arbitrary_classes", 0, () => {
            class Whatever {
                color: string;
                constructor(color: string) {
                    this.color = color;
                }
            }
            const whatever: Whatever[] = [
                new Whatever("green"),
                new Whatever("yellow"),
            ];
            const query = aql `${whatever}`;
            expect(query.query).assertEqual("@value0");
            expect(Object.keys(query.bindVars).join("")).assertEqual(["value0"].join(""));
            expect(query.bindVars.value0).assertEqual(whatever);
        });
        it("supports_nesting_simple_queries", 0, () => {
            const query = aql `FOR x IN (${aql `FOR a IN 1..3 RETURN a`}) RETURN x`;
            expect(query.query).assertEqual("FOR x IN (FOR a IN 1..3 RETURN a) RETURN x");
        });
        it("supports_deeply_nesting_simple_queries1", 0, () => {
            const query = aql `FOR x IN (${aql `FOR a IN (${aql `FOR b IN 1..3 RETURN b`}) RETURN a`}) RETURN x`;
            expect(query.query).assertEqual("FOR x IN (FOR a IN (FOR b IN 1..3 RETURN b) RETURN a) RETURN x");
        });
        it("supports_deeply_nesting_simple_queries2", 0, () => {
            const collection = db.collection<any>("paprika");
            const query = aql `A ${collection} B ${aql `X ${collection} Y ${aql `J ${collection} K ${9} L`} Z`} C ${4}`;
            expect(query.query).assertEqual("A @@value0 B X @@value0 Y J @@value0 K @value1 L Z C @value2");
            expect(JSON.stringify(query.bindVars)).assertEqual(JSON.stringify(getNameObj("paprika", 9, 4)));
        });
        it("supports_arbitrary_nesting", 0, () => {
            const users = db.collection<any>("users");
            const role = "admin";
            const filter = aql `FILTER u.role == ${role}`;
            const query = aql `FOR u IN ${users} ${filter} RETURN u`;
            expect(query.query).assertEqual("FOR u IN @@value0 FILTER u.role == @value1 RETURN u");
            expect(JSON.stringify(query.bindVars)).assertEqual(JSON.stringify(getNameObj(users.name, role)));
        });
        it("supports_basic_nesting", 0, () => {
            interface JsonTyPE {
                value0: number;
            }
            let jsonChange: JsonTyPE = { value0: 1 };
            const query = aql `A ${aql `a ${1} b`} B`;
            expect(query.query).assertEqual("A a @value0 b B");
            expect(JSON.stringify(query.bindVars)).assertEqual(JSON.stringify(jsonChange));
        });
        it("supports_deep_nesting", 0, () => {
            interface JsonTyPE {
                value0: number;
                value1: number;
                value2: number;
                value3: number;
                value4: number;
                value5: number;
                value6: number;
            }
            let jsonChange: JsonTyPE = {
                value0: 1,
                value1: 2,
                value2: 3,
                value3: 4,
                value4: 5,
                value5: 6,
                value6: 7,
            };
            const query = aql `A ${1} ${aql `a ${2} ${aql `X ${3} ${aql `x ${4} y`} ${5} Y`} ${6} b`} ${7} B`;
            expect(query.query).assertEqual("A @value0 a @value1 X @value2 x @value3 y @value4 Y @value5 b @value6 B");
            expect(JSON.stringify(query.bindVars)).assertEqual(JSON.stringify(jsonChange));
        });
        it("supports_nesting_without_bindvars", 0, () => {
            const query = aql `A ${aql `B`} C`;
            expect(query.query).assertEqual("A B C");
            expect(JSON.stringify(query.bindVars)).assertEqual(JSON.stringify(new Object()));
        });
    });
}
