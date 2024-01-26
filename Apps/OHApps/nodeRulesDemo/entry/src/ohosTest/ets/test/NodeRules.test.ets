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
import RuleEngine from "node-rules";
//import { API, Fact } from "node-rules";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '@ohos/hypium'

export default function NodeRulesTest() {

  let diff = (obj1: ESObject, obj2: ESObject) => {
    let o1 = obj1 instanceof Object;
    let o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
      return obj1 === obj2;
    }
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    let keys: string[] = Object.keys(obj1)
    for (let o = 0; o < keys.length; o++) {
      let key = keys[o]
      let t1 = obj1[key] instanceof Object;
      let t2 = obj2[key] instanceof Object;
      if (t1 && t2) {
        if (!diff(obj1[key], obj2[key])) {
          return false
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }


  describe('NodeRulesTest', () => {
    _it("should empty the existing rule array", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      R.init();
      let diffResult = diff(R.rules, [])
      expect(diffResult).assertTrue();
    });
    _it("Rule should be turned on if the field  ON is absent in the rule", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      expect(R.rules[0].on).assertEqual(true);
    });
    _it("Rule can be passed to register as both arrays and individual objects", 0, () => {
      let rule: ESObject = {
        condition: (R: ESObject) => {
          R.when(1);
        },
        consequence: (R: ESObject) => {
          R.stop();
        }
      };
      let R1: ESObject = new RuleEngine(rule);
      let R2: ESObject = new RuleEngine([rule]);
      let diffResult = diff(R1.rules, R2.rules)
      expect(diffResult).assertTrue();
    });
    _it("Rules can be appended multiple times via register after creating rule engine instance", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        }
      ];
      let R1: ESObject = new RuleEngine(rules);
      let R2: ESObject = new RuleEngine(rules[0]);
      let R3: ESObject = new RuleEngine();
      R2.register(rules[1]);
      let diffResult1 = diff(R1.rules, R2.rules)
      expect(diffResult1).assertTrue();
      R3.register(rules);
      let diffResult2 = diff(R1.rules, R3.rules)
      expect(diffResult2).assertTrue();
    });
    _it("should only push active rules into active rules array", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
          on: true
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
          on: false
        }
      ];
      let R: ESObject = new RuleEngine();
      R.register(rules);
      let diffResult1 = diff(R.activeRules, R.rules)
      expect(diffResult1).assertFalse();
      //          // @ts-ignore
      //                expect(R.activeRules).not().assertEqual(R.rules);
    });
    _it("should sort the rules according to priority, if priority is present", 0, () => {
      let rules: ESObject[] = [
        {
          priority: 8,
          index: 1,
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        },
        {
          priority: 6,
          index: 2,
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        },
        {
          priority: 9,
          index: 0,
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          }
        }
      ];
      let R: ESObject = new RuleEngine();
      R.register(rules);
      expect(R.activeRules[2].index).assertEqual(2);
    });
    _it("should run consequnce when condition matches", 0, () => {
      let rule: ESObject = {
        condition: (R: ESObject, f: ESObject) => {
          R.when(f.transactionTotal < 500);
        },
        consequence: (R: ESObject, f: ESObject) => {
          f.result = false;
          R.stop();
        }
      };
      let R: ESObject = new RuleEngine(rule);
      R.execute(
        {
          transactionTotal: 200,
        },
        (result: ESObject) => {
          expect(result.result).assertEqual(false);
        }
      );
    });
    _it("should chain rules and find result with next", 0, () => {
      let rule: ESObject[] = [
        {
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.card == "VISA");
          },
          consequence: (R: ESObject, f: ESObject) => {
            R.stop();
            f.result = "Custom Result";
          },
          priority: 4
        },
        {
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.transactionTotal < 1000);
          },
          consequence: (R: ESObject, f: ESObject) => {
            R.next();
          },
          priority: 8
        }
      ];
      let R: ESObject = new RuleEngine(rule);
      R.execute(
        {
          transactionTotal: 200,
          card: "VISA"
        },
        (result: ESObject) => {
          expect(result.result).assertEqual("Custom Result");
        }
      );
    });
    _it("should provide access to rule definition properties via rule", 0, () => {
      let rule: ESObject = {
        name: "sample rule name",
        id: "xyzzy",
        condition: (R: ESObject, f: ESObject) => {
          R.when(f.input === true);
        },
        consequence: (R: ESObject, f: ESObject) => {
          f.result = true;
          f.ruleName = R.rule().name;
          f.ruleID = R.rule().id;
          R.stop();
        }
      };
      let R: ESObject = new RuleEngine(rule);
      R.execute(
        {
          input: true
        },
        (result: ESObject) => {
          expect(result.ruleName).assertEqual(rule.name);
          expect(result.ruleID).assertEqual(rule.id);
        }
      );
    });


    _it("should include the matched rule path", 0, () => {
      let rules: ESObject[] = [
        {
          name: "rule A",
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.x === true);
          },
          consequence: (R: ESObject) => {
            R.next();
          }
        },
        {
          name: "rule B",
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.y === true);
          },
          consequence: (R: ESObject) => {
            R.next();
          }
        },
        {
          id: "rule C",
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.x === true && f.y === false);
          },
          consequence: (R: ESObject) => {
            R.next();
          }
        },
        {
          id: "rule D",
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.x === false && f.y === false);
          },
          consequence: (R: ESObject) => {
            R.next();
          }
        },
        {
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.x === true && f.y === false);
          },
          consequence: (R: ESObject) => {
            R.next();
          }
        }
      ];
      let lastMatch = "index_" + (rules.length - 1).toString();
      let R: ESObject = new RuleEngine(rules);
      R.execute(
        {
          x: true,
          y: false
        },
        (result: ESObject) => {
          let diffResult: boolean = diff(result.matchPath, [
            rules[0].name,
            rules[2].id,
            lastMatch
          ])
          expect(diffResult).assertTrue();
        }
      );
    });


    _it("should support fact as optional second parameter for es6 compatibility", 0, () => {
      let rule: ESObject = {
        condition: (R: ESObject, f: ESObject) => {
          R.when(f.transactionTotal < 500);
        },
        consequence: (R: ESObject, f: ESObject) => {
          f.result = false;
          R.stop();
        }
      };
      let R: ESObject = new RuleEngine(rule);
      R.execute(
        {
          transactionTotal: 200,
        },
        (result: ESObject) => {
          expect(result.result).assertEqual(false);
        }
      );
    });
    _it("should work even when process NextTick is unavailable", 0, () => {

      let rule: ESObject = {
        condition: (R: ESObject, f: ESObject) => {
          R.when(f.transactionTotal < 500);
        },
        consequence: (R: ESObject, f: ESObject) => {
          f.result = false;
          R.stop();
        }
      };
      let R: ESObject = new RuleEngine(rule);
      R.execute({
        transactionTotal: 200
      },
        (result: ESObject) => {
          expect(result.result).assertEqual(false);
        }
      );
    });
    _it("find selector function for rules should exact number of matches", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one"
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two"
        }
      ];
      let R: ESObject = new RuleEngine(rules);

      expect(
        R.findRules({
          id: "one"
        }).length
      ).assertEqual(1);
    });
    _it("find selector function for rules should give the correct match as result", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one"
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two"
        }
      ];
      let R: ESObject = new RuleEngine(rules);

      expect(
        R.findRules({
          id: "one"
        })[0].id
      ).assertEqual("one");
    });
    _it("find selector function should filter off undefined entries in the query if any", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one"
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two"
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      expect(
        R.findRules({
          id: "one",
          myMistake: undefined
        })[0].id
      ).assertEqual("one");
    });
    _it("find without condition works fine", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two",
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      expect(R.findRules().length).assertEqual(2);
    });
    _it("checking whether turn off rules work as expected", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two",
          on: false,
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      R.turn("OFF", {
        id: "one"
      });
      expect(
        R.findRules({
          id: "one"
        })[0].on
      ).assertEqual(false);
    });
    _it("checking whether turn on rules work as expected", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one"
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two",
          on: false
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      R.turn("ON", {
        id: "two"
      });
      expect(
        R.findRules({
          id: "two"
        })[0].on
      ).assertEqual(true);
    });
    _it("checking whether prioritize work", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two",
          priority: 1
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "zero",
          priority: 8
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
          priority: 4
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      R.prioritize(10, {
        id: "one"
      });
      expect(
        R.findRules({
          id: "one"
        })[0].priority
      ).assertEqual(10);
    });
    _it("checking whether rules reorder after prioritize", 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            R.when(1);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "two",
          priority: 1
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "zero",
          priority: 8
        },
        {
          condition: (R: ESObject) => {
            R.when(0);
          },
          consequence: (R: ESObject) => {
            R.stop();
          },
          id: "one",
          priority: 4
        }
      ];
      let R: ESObject = new RuleEngine(rules);
      R.prioritize(10, {
        id: "one"
      });
      expect(R.activeRules[0].id).assertEqual("one");
    });
    _it("does not rerun when a fact changes if ignoreFactChanges is true", 0, (done: Function) => {
      let rules: ESObject[] = [
        {
          name: "rule1",
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.value1 > 5);
          },
          consequence: (R: ESObject, f: ESObject) => {
            f.result = false;
            f.errors = f.errors || [];
            f.errors.push("must be less than 5");
            R.next();
          }
        }
      ];
      let fact: ESObject = {
        value1: 6
      };
      let R: ESObject = new RuleEngine(rules, {
        ignoreFactChanges: true
      });

      R.execute(fact, (result: ESObject) => {
        expect(result.errors.length).assertEqual(1);
        done();
      });
    });
    _it("context switches and finishes the fact which needs least iteration first", 0, (done: Function) => {
      let rules: ESObject[] = [
        {
          name: "high credibility customer - avoid checks and bypass",
          priority: 4,
          on: true,
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.userCredibility && f.userCredibility > 5);
          },
          consequence: (R: ESObject, f: ESObject) => {
            f.result = true;
            R.stop();
          }
        },
        {
          name: "block guest payment above 10000",
          priority: 3,
          condition: (R: ESObject, f: ESObject) => {
            R.when(
              f.customerType &&
                f.transactionTotal > 10000 &&
                f.customerType == "guest"
            );
          },
          consequence: (R: ESObject, f: ESObject) => {
            f.result = false;
            R.stop();
          }
        },
        {
          name: "is customer guest?",
          priority: 2,
          condition: (R: ESObject, f: ESObject) => {
            R.when(!f.userLoggedIn);
          },
          consequence: (R: ESObject, f: ESObject) => {
            f.customerType = "guest";
            // the fact has been altered above, so all rules will run again since ignoreFactChanges is not set.
            R.next();
          }
        },
        {
          name: "block Cashcard Payment",
          priority: 1,
          condition: (R: ESObject, f: ESObject) => {
            R.when(f.cardType == "Cash Card");
          },
          consequence: (R: ESObject, f: ESObject) => {
            f.result = false;
            R.stop();
          }
        }
      ];
      let straightFact: ESObject = {
        name: "straightFact",
        userCredibility: 1,
        userLoggedIn: true,
        transactionTotal: 12000,
        cardType: "Cash Card"
      };

      /** example of a caned up rule. will take two iterations. ****/
      let chainedFact: ESObject = {
        name: "chainedFact",
        userCredibility: 2,
        userLoggedIn: false,
        transactionTotal: 100000,
        cardType: "Credit Card"
      };

      let R: ESObject = new RuleEngine(rules);
      let isStraightFactFast = false;


      R.execute(straightFact, (result: ESObject) => {
        isStraightFactFast = true;
      });

      R.execute(chainedFact, (result: ESObject) => {
        expect(isStraightFactFast).assertTrue();
        done();
      });
    });

    let time: number = 0
    let printTime = (isEnd: boolean, tag?: string) => {
      if (isEnd) {
        console.info(tag, 'useTime:' + (Date.now() - time))
      } else {
        time = Date.now()
      }
    }

    _it('nodeRules_useTime', 0, () => {
      let rules: ESObject[] = [
        {
          condition: (R: ESObject) => {
            printTime(false)
            R.when(true);
            printTime(true, 'when')

          },
          consequence: (R: ESObject) => {
            printTime(false)
            R.next()
            printTime(true, 'next')
          }
        },
        {
          condition: (R: ESObject) => {
            R.when(true);
          },
          consequence: (R: ESObject) => {
            printTime(false)
            R.stop();
            printTime(true, 'stop')

            printTime(false)
            R.restart()
            printTime(true, 'restart')
          }
        }
      ];
      let R2: ESObject = new RuleEngine(rules[0]);
      printTime(false)
      R2.register(rules[1]);
      printTime(true, 'register')

      printTime(false)
      R2.execute({x: true, y: false}, (result: ESObject) => {})
      printTime(true, 'execute')

    })

  })
}