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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import * as math from 'mathjs';

export default function mathjsTest() {
  describe('mathjs_Test', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    it('bignumber_1', 0, () => {
      // bignumber
      const result = math.bignumber('12345678901234567890');
      expect(JSON.stringify(result)).assertEqual('{"mathjs":"BigNumber","value":"12345678901234567890"}')
    })
    it('bignumber_2', 0, () => {
      // bignumber
      const result = math.bignumber('0');
      expect(JSON.stringify(result)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('bignumber_3', 0, () => {
      // bignumber
      const result = math.bignumber('-12345678901234567890');
      expect(JSON.stringify(result)).assertEqual('{"mathjs":"BigNumber","value":"-12345678901234567890"}')
    })
    it('bignumber_4', 0, () => {
      // bignumber
      const result = math.bignumber('912345678901234567890');
      expect(JSON.stringify(result)).assertEqual('{"mathjs":"BigNumber","value":"912345678901234567890"}')
    })
    it('bignumber_5', 0, () => {
      // bignumber
      const result = math.bignumber('1');
      expect(JSON.stringify(result)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })

    it('boolean_1', 0, () => {
      // boolean
      const result = math.boolean(1);
      expect(result).assertEqual(true)
    })
    it('boolean_2', 0, () => {
      // boolean
      const result = math.boolean(0);
      expect(result).assertEqual(false)
    })
    it('boolean_3', 0, () => {
      // boolean
      const result = math.boolean(-1);
      expect(result).assertEqual(true)
    })
    it('boolean_4', 0, () => {
      // boolean
      const result = math.boolean(11);
      expect(result).assertEqual(true)
    })
    it('boolean_5', 0, () => {
      // boolean
      const result = math.boolean(1.2);
      expect(result).assertEqual(true)
    })

    it('chain_1', 0, () => {
      // chain
      const resultchain = math.chain(3).done();
      expect(resultchain.toString()).assertEqual('3')
    })
    it('chain_2', 0, () => {
      // chain
      const resultchain = math.chain(-1).add(4).done();
      expect(resultchain.toString()).assertEqual('3')
    })
    it('chain_3', 0, () => {
      // chain
      const resultchain = math.chain(0).add(4).multiply(2).done();
      expect(resultchain.toString()).assertEqual('8')
    })
    it('chain_4', 0, () => {
      // chain
      const resultchain = math.chain(-3).done();
      expect(resultchain.toString()).assertEqual('-3')
    })
    it('chain_5', 0, () => {
      // chain
      const resultchain = math.chain(1).done();
      expect(resultchain.toString()).assertEqual('1')
    })

    it('complex_1', 0, () => {
      // complex
      const resultcomplex1 = math.complex(2, 3);
      expect(resultcomplex1.toString()).assertEqual('2 + 3i')
    })
    it('complex_2', 0, () => {
      // complex
      const resultcomplex = math.complex(-2, 3);
      expect(resultcomplex.toString()).assertEqual('-2 + 3i')
    })
    it('complex_3', 0, () => {
      // complex
      const resultcomplex = math.complex(2, -3);
      expect(resultcomplex.toString()).assertEqual('2 - 3i')
    })
    it('complex_4', 0, () => {
      // complex
      const resultcomplex = math.complex(0, 3);
      expect(resultcomplex.toString()).assertEqual('3i')
    })
    it('complex_5', 0, () => {
      // complex
      const resultcomplex = math.complex(2, 0);
      expect(resultcomplex.toString()).assertEqual('2')
    })

    it('createUnit_1', 0, () => {
      // createUnit
      const resultcreateUnit1 = math.createUnit('meter1');
      expect(resultcreateUnit1.toString()).assertEqual('meter1')
    })
    it('createUnit_2', 0, () => {
      // createUnit
      let result2 = math.createUnit('knot', {definition: '0.514444444 m/s', aliases: ['knots', 'kt', 'kts']})
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"Unit","value":null,"unit":"knot","fixPrefix":false}')
    })
    it('createUnit_3', 0, () => {
      // createUnit
      let result3 = math.createUnit('mph', '1 mile/hour')
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"Unit","value":null,"unit":"mph","fixPrefix":false}')
    })
    it('createUnit_4', 0, () => {
      // createUnit
      let result4 = math.createUnit('km', math.unit(1000, 'm'))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"Unit","value":null,"unit":"km","fixPrefix":false}')
    })
    it('createUnit_5', 0, () => {
      // createUnit
      let option5: math.CreateUnitOptions = {
        prefixes: 'short',
        aliases: ['knots', 'kt', 'kts'],
        offset: 0,
        'override': true
      }
      const resultcreateUnit5 = math.createUnit('knot', '0.514444444 m / s', option5);
      expect(JSON.stringify(resultcreateUnit5)).assertEqual('{"mathjs":"Unit","value":null,"unit":"knot","fixPrefix":false}')
    })

    it('fraction_1', 0, () => {
      // fraction
      const resultfraction1 = math.fraction(1, 2);
      expect(resultfraction1.toString()).assertEqual('0.5')
    })
    it('fraction_2', 0, () => {
      // fraction
      const resultfraction2 = math.fraction(-1, 2);
      expect(resultfraction2.toString()).assertEqual('-0.5')
    })
    it('fraction_3', 0, () => {
      // fraction
      try {
        math.fraction(1, 0);
      } catch (e) {
        expect(e.message).assertEqual('Division by Zero')
      }
    })
    it('fraction_4', 0, () => {
      // fraction
      const resultfraction4 = math.fraction(9, 3);
      expect(resultfraction4.toString()).assertEqual('3')
    })
    it('fraction_5', 0, () => {
      // fraction
      const resultfraction5 = math.fraction(-11, -2);
      expect(resultfraction5.toString()).assertEqual('5.5')
    })

    it('index_1', 0, () => {
      // index
      const resultindex1 = math.index([1, 2, 3], 0);
      expect(resultindex1.toString()).assertEqual('[[1, 2, 3], [0]]')
    })
    it('index_2', 0, () => {
      // index
      const resultindex2 = math.index([1, 2, 3], 1);
      expect(resultindex2.toString()).assertEqual('[[1, 2, 3], [1]]')
    })
    it('index_3', 0, () => {
      // index
      const resultindex3 = math.index([1, 2, 3], 2);
      expect(resultindex3.toString()).assertEqual('[[1, 2, 3], [2]]')
    })
    it('index_4', 0, () => {
      // index
      const resultindex4 = math.index([1, 2, 3], 4);
      expect(resultindex4.toString()).assertEqual('[[1, 2, 3], [4]]')
    })
    it('index_5', 0, () => {
      // index
      const resultindex5 = math.index([1, 2, 3], -1);
      expect(resultindex5.toString()).assertEqual('[[1, 2, 3], [-1]]')
    })

    it('matrix_1', 0, () => {
      // matrix
      const resultmatrix1 = math.matrix([[1, 2], [3, 4]]);
      expect(resultmatrix1.toString()).assertEqual('[[1, 2], [3, 4]]')
    })
    it('matrix_2', 0, () => {
      // matrix
      const resultmatrix2 = math.matrix([[1, -2], [-3, 4]]);
      expect(resultmatrix2.toString()).assertEqual('[[1, -2], [-3, 4]]')
    })
    it('matrix_3', 0, () => {
      // matrix
      const resultmatrix3 = math.matrix([[1, 2]]);
      expect(resultmatrix3.toString()).assertEqual('[[1, 2]]')
    })
    it('matrix_4', 0, () => {
      // matrix
      const resultmatrix4 = math.matrix([[1, 2], [3, 4], [5, 6]]);
      expect(resultmatrix4.toString()).assertEqual('[[1, 2], [3, 4], [5, 6]]')
    })
    it('matrix_5', 0, () => {
      // matrix
      const resultmatrix5 = math.matrix([[1, 2, 3], [4, 5, 6]]);
      expect(resultmatrix5.toString()).assertEqual('[[1, 2, 3], [4, 5, 6]]')
    })

    it('number_1', 0, () => {
      // number
      const resultnumber1 = math.number(math.pi);
      expect(resultnumber1.toString()).assertEqual('3.141592653589793')
    })
    it('number_2', 0, () => {
      // number
      const resultnumber2 = math.number('123');
      expect(resultnumber2.toString()).assertEqual('123')
    })
    it('number_3', 0, () => {
      // number
      const resultnumber3 = math.number(12);
      expect(resultnumber3.toString()).assertEqual('12')
    })
    it('number_4', 0, () => {
      // number
      const resultnumber4 = math.number(math.bignumber('12345678901234567890'));
      expect(resultnumber4.toString()).assertEqual('12345678901234567000')
    })
    it('number_5', 0, () => {
      // number
      const resultnumber5 = math.number(false);
      expect(resultnumber5.toString()).assertEqual('0')
    })

    it('sparse_1', 0, () => {
      // sparse
      const resultsparse1 = math.sparse([[1, 0], [0, 2]]);
      expect(resultsparse1.toString()).assertEqual('[[1, 0], [0, 2]]')
    })
    it('sparse_2', 0, () => {
      // sparse
      const resultsparse2 = math.sparse([[1, 0]]);
      expect(resultsparse2.toString()).assertEqual('[[1, 0]]')
    })
    it('sparse_3', 0, () => {
      // sparse
      const resultsparse3 = math.sparse([[1, 2], [3, 4], [5, 6]]);
      expect(resultsparse3.toString()).assertEqual('[[1, 2], [3, 4], [5, 6]]')
    })
    it('sparse_4', 0, () => {
      // sparse
      const resultsparse4 = math.sparse([[1, 0, 3], [4, 5, 6]]);
      expect(resultsparse4.toString()).assertEqual('[[1, 0, 3], [4, 5, 6]]')
    })
    it('sparse_5', 0, () => {
      // sparse
      const resultsparse5 = math.sparse([[1]]);
      expect(resultsparse5.toString()).assertEqual('[[1]]')
    })

    it('unit_1', 0, () => {
      // unit
      const resultunit1 = math.unit(5, 'meter');
      expect(resultunit1.toString()).assertEqual('5 meter')
    })
    it('unit_2', 0, () => {
      // unit
      const resultunit2 = math.unit(math.bignumber('12345678901234567'), 'meter');
      expect(resultunit2.toString()).assertEqual('12.345678901234567 petameter')
    })
    it('unit_3', 0, () => {
      // unit
      const resultunit3 = math.unit(-5, 'meter');
      expect(resultunit3.toString()).assertEqual('-5 meter')
    })
    it('unit_4', 0, () => {
      // unit
      const resultunit4 = math.unit(115, 'meter');
      expect(resultunit4.toString()).assertEqual('115 meter')
    })
    it('unit_5', 0, () => {
      // unit
      const resultunit5 = math.unit(0, 'meter');
      expect(resultunit5.toString()).assertEqual('0 meter')
    })
    it('unit_6', 0, () => {
      // unit
      const resultunit6 = math.unit("0.514444444 m / s");
      expect(resultunit6.toString()).assertEqual('0.514444444 m / s')
    })

    it('evaluate_1', 0, () => {
      // evaluate
      let resultevaluate1: number = math.evaluate('2 + 3')
      expect(resultevaluate1).assertEqual(5)
    })
    it('evaluate_2', 0, () => {
      // evaluate
      let resultevaluate3: boolean = math.evaluate('false')
      expect(resultevaluate3).assertEqual(false)
    })
    it('evaluate_3', 0, () => {
      // evaluate
      let resultevaluate4: number = math.evaluate('[1,2,3]')
      expect(resultevaluate4.toString()).assertEqual('[1, 2, 3]')
    })
    it('evaluate_4', 0, () => {
      // evaluate
      let resultevaluate5: number = math.evaluate('0 + 3')
      expect(resultevaluate5.toString()).assertEqual('3')
    })
    it('evaluate_5', 0, () => {
      // evaluate
      let matrix = '[[1,2],[3,4]]'
      let resultevaluate2: number = math.evaluate(matrix)
      expect(resultevaluate2.toString()).assertEqual('[[1, 2], [3, 4]]')
    })

    it('splitUnit_1', 0, () => {
      // splitUnit
      const result1 = math.splitUnit(math.unit(5, 'meter'), []);
      expect(JSON.stringify(result1)).assertEqual('[{"mathjs":"Unit","value":5,"unit":"meter","fixPrefix":false}]')
    })
    it('splitUnit_2', 0, () => {
      // splitUnit
      const result2 = math.splitUnit(math.unit('5 meter'), [math.unit('meter')]);
      expect(JSON.stringify(result2)).assertEqual('[{"mathjs":"Unit","value":5,"unit":"meter","fixPrefix":true}]')
    })
    it('splitUnit_3', 0, () => {
      // splitUnit
      const result3 = math.splitUnit(math.unit(5, 'meter'), [math.unit('meter')]);
      expect(JSON.stringify(result3)).assertEqual('[{"mathjs":"Unit","value":5,"unit":"meter","fixPrefix":true}]')
    })
    it('splitUnit_4', 0, () => {
      // splitUnit
      const result4 = math.splitUnit(math.unit(5, 'm'),[ math.unit('ft'),  math.unit('in')]);
      expect(JSON.stringify(result4)).assertEqual('[{"mathjs":"Unit","value":16,"unit":"ft","fixPrefix":false},{"mathjs":"Unit","value":4.850393700787392,"unit":"in","fixPrefix":true}]')
    })

    it('splitUnit_5', 0, () => {
      // splitUnit
      const result5 = math.splitUnit(math.unit(5, 'm/s'),[ math.unit('m/s')]);
      expect(JSON.stringify(result5)).assertEqual('[{"mathjs":"Unit","value":5,"unit":"m / s","fixPrefix":true}]')
    })

    it('string_1', 0, () => {
      // string
      const result1 = math.string(1);
      expect(JSON.stringify(result1)).assertEqual('"1"')
    })
    it('string_2', 0, () => {
      // string
      const result2 = math.string(math.bignumber(2));
      expect(JSON.stringify(result2)).assertEqual('"2"')
    })
    it('string_3', 0, () => {
      // string
      const result3 = math.string('5 m/s');
      expect(JSON.stringify(result3)).assertEqual('"5 m/s"')
    })
    it('string_4', 0, () => {
      // string
      const result4 = math.string(math.unit(5, 'm/s'));
      expect(JSON.stringify(result4)).assertEqual('"5 m / s"')
    })
    it('string_5', 0, () => {
      // string
      const result5 = math.string(null);
      expect(JSON.stringify(result5)).assertEqual('"null"')
    })

    it('compile_1', 0, () => {
      // compile
      const result1: ESObject = math.compile('sqrt(3^2 + 4^2)').evaluate();
      expect(JSON.stringify(result1)).assertEqual('5')
    })
    it('compile_2', 0, () => {
      // compile
      const result2: ESObject = math.compile("sqrt(-4)").evaluate();
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"Complex","re":0,"im":2}')
    })
    it('compile_3', 0, () => {
      // compile
      const result3: ESObject = math.compile('4 + 3').evaluate();
      expect(JSON.stringify(result3)).assertEqual('7')
    })
    it('compile_4', 0, () => {
      // compile
      const result4: ESObject = math.compile('2 * 3').evaluate();
      expect(JSON.stringify(result4)).assertEqual('6')
    })
    it('compile_5', 0, () => {
      // compile
      const result5: ESObject = math.compile('9 - 7').evaluate();
      expect(JSON.stringify(result5)).assertEqual('2')
    })

    it('parser_1', 0, () => {
      // parser
      const result1: string = math.parser().evaluate('x = 7 / 2');
      expect(result1.toString()).assertEqual('3.5')
    })
    it('parser_2', 0, () => {
      // parser
      const result2: string = math.parser().evaluate('sqrt(3^2 + 4^2)');
      expect(result2.toString()).assertEqual('5')
    })
    it('parser_3', 0, () => {
      // parser
      const result3: string = math.parser().evaluate('sqrt(-4)');
      expect(result3.toString()).assertEqual('2i')
    })
    it('parser_4', 0, () => {
      // parser
      const result4: string = math.parser().evaluate('2 inch to cm');
      expect(result4.toString()).assertEqual('5.08 cm')
    })
    it('parser_5', 0, () => {
      // parser
      const result5: string = math.parser().evaluate('cos(45 deg)') ;
      expect(JSON.stringify(result5)).assertEqual('0.7071067811865476')
    })

    it('derivative_1', 0, () => {
      // derivative
      const result1 = math.derivative('x^2 + x', 'x');
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"OperatorNode","op":"+","fn":"add","args":[{"mathjs":"OperatorNode","op":"*","fn":"multiply","args":[{"mathjs":"ConstantNode","value":2},{"mathjs":"SymbolNode","name":"x"}],"implicit":false,"isPercentage":false},{"mathjs":"ConstantNode","value":1}],"implicit":false,"isPercentage":false}')
    })
    it('derivative_2', 0, () => {
      // derivative
      const result2 = math.derivative('2x^2 + 3x + 4', 'x');
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"OperatorNode","op":"+","fn":"add","args":[{"mathjs":"OperatorNode","op":"*","fn":"multiply","args":[{"mathjs":"ConstantNode","value":4},{"mathjs":"SymbolNode","name":"x"}],"implicit":false,"isPercentage":false},{"mathjs":"ConstantNode","value":3}],"implicit":false,"isPercentage":false}')
    })
    it('derivative_3', 0, () => {
      // derivative
      const result3 = math.derivative('sin(2x)', 'x');
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"OperatorNode","op":"*","fn":"multiply","args":[{"mathjs":"ConstantNode","value":2},{"mathjs":"FunctionNode","fn":{"mathjs":"SymbolNode","name":"cos"},"args":[{"mathjs":"OperatorNode","op":"*","fn":"multiply","args":[{"mathjs":"ConstantNode","value":2},{"mathjs":"SymbolNode","name":"x"}],"implicit":true,"isPercentage":false}]}],"implicit":false,"isPercentage":false}')
    })
    it('derivative_4', 0, () => {
      // derivative
      const result4 = math.derivative(math.parse('x^2 + x'), math.parse('x'));
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"OperatorNode","op":"+","fn":"add","args":[{"mathjs":"OperatorNode","op":"*","fn":"multiply","args":[{"mathjs":"ConstantNode","value":2},{"mathjs":"SymbolNode","name":"x"}],"implicit":false,"isPercentage":false},{"mathjs":"ConstantNode","value":1}],"implicit":false,"isPercentage":false}')
    })
    it('derivative_5', 0, () => {
      // derivative
      const result5 = math.derivative('2*x', 'x');
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"ConstantNode","value":2}')
    })

    const m =
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]
    it('lsolve_1', 0, () => {
      // lsolve
      const b1 = [1, 2, 3, 4]
      const result1 = math.lsolve(m, b1);
      expect(JSON.stringify(result1)).assertEqual('[[1],[1],[1],[1]]')
    })
    it('lsolve_2', 0, () => {
      // lsolve
      const b2 = [
        [1],
        [2],
        [3],
        [4]
      ]
      const result2 = math.lsolve(m, b2);
      expect(JSON.stringify(result2)).assertEqual('[[1],[1],[1],[1]]')
    })
    it('lsolve_3', 0, () => {
      // lsolve
      const b3 = math.matrix([1, 2, 3, 4])
      const result3 = math.lsolve(m, b3);
      expect(JSON.stringify(result3)).assertEqual('[[1],[1],[1],[1]]')
    })
    it('lsolve_4', 0, () => {
      // lsolve
      const b4 = math.matrix([[1], [2], [3], [4]], 'sparse')
      const result4 = math.lsolve(m, b4);
      expect(JSON.stringify(result4)).assertEqual('[[1],[1],[1],[1]]')
    })
    it('lsolve_5', 0, () => {
      // lsolve
      const b5 = math.matrix([
        [1],
        [2],
        [3],
        [4]
      ])
      const result5 = math.lsolve(m, b5);
      expect(JSON.stringify(result5)).assertEqual('[[1],[1],[1],[1]]')
    })

    it('lup_1', 0, () => {
      // lup
      const result1 = math.lup([[2, 1], [1, 4]]);
      expect(JSON.stringify(result1)).assertEqual('{"L":[[1,0],[0.5,1]],"U":[[2,1],[0,3.5]],"p":[0,1]}')
    })
    it('lup_2', 0, () => {
      // lup
      const result2 = math.lup(math.matrix([[2, 1], [1, 4]]));
      expect(JSON.stringify(result2)).assertEqual('{"L":{"mathjs":"DenseMatrix","data":[[1,0],[0.5,1]],"size":[2,2]},"U":{"mathjs":"DenseMatrix","data":[[2,1],[0,3.5]],"size":[2,2]},"p":[0,1]}')
    })
    it('lup_3', 0, () => {
      // lup
      const result3 = math.lup(math.sparse([[2, 1], [1, 4]]));
      expect(JSON.stringify(result3)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.5,1],"index":[0,1,1],"ptr":[0,2,3],"size":[2,2]},"U":{"mathjs":"SparseMatrix","values":[2,1,3.5],"index":[0,0,1],"ptr":[0,1,3],"size":[2,2]},"p":[0,1]}')
    })
    it('lup_4', 0, () => {
      // lup
      const m4 = math.matrix([[2, 1], [1, 4]], 'sparse')
      const result4 = math.lup(m4);
      expect(JSON.stringify(result4)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.5,1],"index":[0,1,1],"ptr":[0,2,3],"size":[2,2]},"U":{"mathjs":"SparseMatrix","values":[2,1,3.5],"index":[0,0,1],"ptr":[0,1,3],"size":[2,2]},"p":[0,1]}')
    })
    it('lup_5', 0, () => {
      // lup
      const m5 = math.matrix([[2, 1], [1, 4]], 'dense')
      const result5 = math.lup(m5);
      expect(JSON.stringify(result5)).assertEqual('{"L":{"mathjs":"DenseMatrix","data":[[1,0],[0.5,1]],"size":[2,2]},"U":{"mathjs":"DenseMatrix","data":[[2,1],[0,3.5]],"size":[2,2]},"p":[0,1]}')
    })

    it('lusolve_1', 0, () => {
      // lusolve
      const result1 = math.lusolve([[-2, 3], [2, 1]], [11, 9]);
      expect(JSON.stringify(result1)).assertEqual('[[2],[5]]')
    })
    it('lusolve_2', 0, () => {
      // lusolve
      const m2 = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]
      const result2 = math.lusolve(m2, [-1, -1, -1, -1]);
      expect(JSON.stringify(result2)).assertEqual('[[-1],[-0.5],[-0.3333333333333333],[-0.25]]')
    })
    it('lusolve_3', 0, () => {
      // lusolve
      const m3 =
        [
          [1, 0, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 3, 0],
          [0, 0, 0, 4]
        ]
      const b3 = math.matrix([-1, -1, -1, -1])
      const result3 = math.lusolve(m3, b3);
      expect(JSON.stringify(result3)).assertEqual('[[-1],[-0.5],[-0.3333333333333333],[-0.25]]')
    })
    it('lusolve_4', 0, () => {
      // lusolve
      const m4 =
        [
          [1, 0, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 3, 0],
          [0, 0, 0, 4]
        ]
      const b4 = [-1, -1, -1, -1]
      const result4 = math.lusolve(m4, b4);
      expect(JSON.stringify(result4)).assertEqual('[[-1],[-0.5],[-0.3333333333333333],[-0.25]]')
    })
    it('lusolve_5', 0, () => {
      // lusolve
      const m4 =
        [
          [1, 0, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 3, 0],
          [0, 0, 0, 4]
        ]
      const b5 = [
        [-1],
        [-1],
        [-1],
        [-1]
      ]
      const result5 = math.lusolve(m4, b5);
      expect(JSON.stringify(result5)).assertEqual('[[-1],[-0.5],[-0.3333333333333333],[-0.25]]')
    })

    it('qr_1', 0, () => {
      // qr
      const result1 = math.qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]]);
      expect(JSON.stringify(result1)).assertEqual('{"Q":[[0.5,-0.5,0.49999999999999992,0.5],[0.5,0.5000000000000001,-0.5000000000000002,0.5000000000000001],[0.5,0.5,0.5000000000000001,-0.5000000000000001],[0.5,-0.4999999999999999,-0.5000000000000001,-0.5]],"R":[[1.9999999999999996,3,2],[0,5,-2],[0,0,4],[0,0,0]]}')
    })
    it('qr_2', 0, () => {
      // qr
      const m2 = [
        [1, -1,  4],
        [1,  4, -2],
        [1,  4,  2],
        [1,  -1, 0]
      ]
      const result2 = math.qr(m2);
      expect(JSON.stringify(result2)).assertEqual('{"Q":[[0.5,-0.5,0.49999999999999992,0.5],[0.5,0.5000000000000001,-0.5000000000000002,0.5000000000000001],[0.5,0.5,0.5000000000000001,-0.5000000000000001],[0.5,-0.4999999999999999,-0.5000000000000001,-0.5]],"R":[[1.9999999999999996,3,2],[0,5,-2],[0,0,4],[0,0,0]]}')
    })
    it('qr_3', 0, () => {
      // qr
      const m3 = [[15, 42], [20, 81]]
      const result3 = math.qr(m3);
      expect(JSON.stringify(result3)).assertEqual('{"Q":[[0.6000000000000001,-0.8],[0.8,0.6]],"R":[[25,90],[0,15]]}')
    })
    it('qr_4', 0, () => {
      // qr
      const m4 = [
        [7.507, 9.868, 5.057],
        [4.482, 2.536, 9.744],
        [6.527, 1.094, 3.321]
      ]
      const result4 = math.qr(m4);
      expect(JSON.stringify(result4)).assertEqual('{"Q":[[0.688035188511916,0.7014713412756386,-0.18586429656695424],[0.4107864279885984,-0.16534848404002778,0.8966127310082278],[0.598215755350643,-0.6932516398787825,-0.40192048200563072]],"R":[[10.9107791655775,8.485733657968277,9.468771426145148],[0,5.744378146155103,-0.36610375169256315],[0,0,6.461900782464385]]}')
    })
    it('qr_5', 0, () => {
      // qr
      const m5 = math.matrix([[15, 42], [20, 81]], 'dense')
      const result5 = math.qr(m5);
      expect(JSON.stringify(result5)).assertEqual('{"Q":{"mathjs":"DenseMatrix","data":[[0.6000000000000001,-0.8],[0.8,0.6]],"size":[2,2]},"R":{"mathjs":"DenseMatrix","data":[[25,90],[0,15]],"size":[2,2]}}')
    })

    it('rationalize_1', 0, () => {
      // rationalize
      const result1 = math.rationalize('2x/y - y/(x+1)');
      expect(result1.toString()).assertEqual('(2 * x ^ 2 + 2 * x - y ^ 2) / (x * y + y)')
    })
    it('rationalize_2', 0, () => {
      // rationalize
      const result2 = math.rationalize('(2x+1)^2');
      expect(result2.toString()).assertEqual('4 * x ^ 2 + 4 * x + 1')
    })
    it('rationalize_3', 0, () => {
      // rationalize
      const result3 = math.rationalize('2x/( (2x-1) / (3x+2) ) - 5x/ ( (3x+4) / (2x^2-5) ) + 3');
      expect(result3.toString()).assertEqual('(-20 * x ^ 4 + 28 * x ^ 3 + 104 * x ^ 2 + 6 * x - 12) / (6 * x ^ 2 + 5 * x - 4)')
    })
    it('rationalize_4', 0, () => {
      // rationalize
      const result4 = math.rationalize('x+x+x+y',{y:1});
      expect(result4.toString()).assertEqual('3 * x + 1')
    })
    it('rationalize_5', 0, () => {
      // rationalize
      const result5 = math.rationalize('x+x+x+y',{});
      expect(result5.toString()).assertEqual('3 * x + y')
    })

    it('simplifyConstant_1', 0, () => {
      // simplifyConstant
      const result1 = math.simplifyConstant("(3-3)*x");
      expect(result1.toString()).assertEqual('0 * x')
    })
    it('simplifyConstant_2', 0, () => {
      // simplifyConstant
      const result2 = math.simplifyConstant(math.parse("z-cos(tau/8)"));
      expect(result2.toString()).assertEqual('z - cos(tau / 8)')
    })
    it('simplifyConstant_3', 0, () => {
      // simplifyConstant
      const result3 = math.simplifyConstant('x + 4*3/6');
      expect(result3.toString()).assertEqual('x + 2')
    })
    it('simplifyConstant_4', 0, () => {
      // simplifyConstant
      const result4 = math.simplifyConstant('z cos(0)');
      expect(result4.toString()).assertEqual('z (1)')
    })
    it('simplifyConstant_5', 0, () => {
      // simplifyConstant
      const result5 = math.simplifyConstant('(5.2 + 1.08)t', {exactFractions: false});
      expect(result5.toString()).assertEqual('6.28 t')
    })

    it('simplifyCore_1', 0, () => {
      // simplifyCore
      const result1 = math.simplifyCore(math.parse("0*x"));
      expect(result1.toString()).assertEqual('0')
    })
    it('simplifyCore_2', 0, () => {
      // simplifyCore
      const result2 = math.simplifyCore(math.parse("(x+0)*2"));
      expect(result2.toString()).assertEqual('2 * x')
    })
    it('simplifyCore_3', 0, () => {
      // simplifyCore
      const f = math.parse('2 * 1 * x ^ (1 - 0)')
      const result3 = math.simplifyCore(f);
      expect(result3.toString()).assertEqual('2 * x')
    })
    it('simplifyCore_4', 0, () => {
      // simplifyCore
      const result4 = math.simplifyCore('2 * 1 * x ^ (2 - 1)');
      expect(result4.toString()).assertEqual('2 * x ^ (2 - 1)')
    })
    it('simplifyCore_5', 0, () => {
      // simplifyCore
      const result5 = math.simplifyCore('0.4 * x + 0', { exactFractions: false });
      expect(result5.toString()).assertEqual('0.4 * x')
    })

    it('resolve_1', 0, () => {
      // resolve
      const result1 = math.resolve(math.parse("1 + x"), { x: 7 });
      expect(result1.toString()).assertEqual('1 + 7')
    })
    it('resolve_2', 0, () => {
      // resolve
      const result2 = math.resolve(math.parse("size(text)"), { text: "Hello World" });
      expect(result2.toString()).assertEqual('size("Hello World")')
    })
    it('resolve_3', 0, () => {
      // resolve
      const result3 = math.resolve(math.parse("x + y"), { x: math.parse("3z") });
      expect(result3.toString()).assertEqual('3 z + y')
    })
    it('resolve_4', 0, () => {
      // resolve
      const result4 = math.resolve(math.parse("3x"), { x: math.parse("y+z"), z: math.parse("w^y") });
      expect(result4.toString()).assertEqual('3 (y + w ^ y)')
    })
    it('resolve_5', 0, () => {
      // resolve
      const result5 = math.resolve('x + y', {x:1, y:2});
      expect(result5.toString()).assertEqual('1 + 2')
    })

    it('slu_1', 0, () => {
      // slu
      const A = math.sparse([[4,3], [6, 3]])
      const result1 = math.slu(A, 1, 0.001);
      expect(JSON.stringify(result1)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,1.5,1],"index":[0,1,1],"ptr":[0,2,3],"size":[2,2]},"U":{"mathjs":"SparseMatrix","values":[4,3,-1.5],"index":[0,0,1],"ptr":[0,1,3],"size":[2,2]},"p":[0,1],"q":[0,1]}')
    })
    it('slu_2', 0, () => {
      // slu
      const m = math.sparse(
        [
          [4.5, 0, 3.2, 0],
          [3.1, 2.9, 0, 0.9],
          [0, 1.7, 3, 0],
          [3.5, 0.4, 0, 1]
        ])
      const result2 = math.slu(m, 0, 1);
      expect(JSON.stringify(result2)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.7777777777777778,0.6888888888888889,1,0.13793103448275862,0.5862068965517241,1,-0.5090156032420466,1],"index":[0,3,1,1,3,2,2,3,3],"ptr":[0,3,6,8,9],"size":[4,4]},"U":{"mathjs":"SparseMatrix","values":[4.5,2.9,3.2,-2.2044444444444444,4.292260536398468,0.9,-0.5275862068965517,0.6073124575998857],"index":[0,1,0,1,2,1,2,3],"ptr":[0,1,2,5,8],"size":[4,4]},"p":[0,1,2,3],"q":null}')
    })
    it('slu_3', 0, () => {
      // slu
      const m = math.sparse(
        [
          [4.5, 0, 3.2, 0],
          [3.1, 2.9, 0, 0.9],
          [0, 1.7, 3, 0],
          [3.5, 0.4, 0, 1]
        ])
      const result3 = math.slu(m, 1, 1);
      expect(JSON.stringify(result3)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.9375,1,0.9,1,0.01185185185185181,1],"index":[0,2,1,3,2,3,3],"ptr":[0,2,4,6,7],"size":[4,4]},"U":{"mathjs":"SparseMatrix","values":[3.2,1,3.5,4.5,-4.21875,0.4,1.7,2.519851851851852],"index":[0,1,1,0,2,1,2,3],"ptr":[0,1,2,5,8],"size":[4,4]},"p":[0,3,2,1],"q":[2,3,0,1]}')
    })
    it('slu_4', 0, () => {
      // slu
      const m = math.sparse(
        [
          [4.5, 0, 3.2, 0],
          [3.1, 2.9, 0, 0.9],
          [0, 1.7, 3, 0],
          [3.5, 0.4, 0, 1]
        ])
      const result4 = math.slu(m, 2, 1);
      expect(JSON.stringify(result4)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.13793103448275862,0.5862068965517241,1,-0.40383141762452107,0.6827586206896552,1,-0.5090156032420466,1],"index":[0,3,2,1,2,3,2,3,3],"ptr":[0,3,6,8,9],"size":[4,4]},"U":{"mathjs":"SparseMatrix","values":[2.9,3.1,4.5,3.2,4.292260536398468,0.9,-0.5275862068965517,0.6073124575998857],"index":[0,0,1,1,2,0,2,3],"ptr":[0,1,3,5,8],"size":[4,4]},"p":[1,0,2,3],"q":[1,0,2,3]}')
    })
    it('slu_5', 0, () => {
      // slu
      const m = math.sparse(
        [
          [4.5, 0, 3.2, 0],
          [3.1, 2.9, 0, 0.9],
          [0, 1.7, 3, 0],
          [3.5, 0.4, 0, 1]
        ])
      const result5 = math.slu(m, 3, 1);
      expect(JSON.stringify(result5)).assertEqual('{"L":{"mathjs":"SparseMatrix","values":[1,0.9375,1,0.9,1,0.01185185185185181,1],"index":[0,2,1,3,2,3,3],"ptr":[0,2,4,6,7],"size":[4,4]},"U":{"mathjs":"SparseMatrix","values":[3.2,1,3.5,4.5,-4.21875,0.4,1.7,2.519851851851852],"index":[0,1,1,0,2,1,2,3],"ptr":[0,1,2,5,8],"size":[4,4]},"p":[0,3,2,1],"q":[2,3,0,1]}')
    })

    it('usolve_1', 0, () => {
      // usolve
      const m =
        [
          [1, 1, 1, 1],
          [0, 1, 1, 1],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ]
      const b1 = [1, 2, 3, 4]
      const result1 = math.usolve(m, b1);
      expect(JSON.stringify(result1)).assertEqual('[[-1],[-1],[-1],[4]]')
    })
    it('usolve_2', 0, () => {
      // usolve
      const m =
        [
          [1, 1, 1, 1],
          [0, 1, 1, 1],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ]
      const b2 = [
        [1],
        [2],
        [3],
        [4]
      ]
      const result2 = math.usolve(m, b2);
      expect(JSON.stringify(result2)).assertEqual('[[-1],[-1],[-1],[4]]')
    })
    it('usolve_3', 0, () => {
      // usolve
      const m =
        [
          [1, 1, 1, 1],
          [0, 1, 1, 1],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ]
      const b3 = math.matrix([1, 2, 3, 4])
      const result3 = math.usolve(m, b3);
      expect(JSON.stringify(result3)).assertEqual('[[-1],[-1],[-1],[4]]')
    })
    it('usolve_4', 0, () => {
      // usolve
      const m =
        [
          [1, 1, 1, 1],
          [0, 1, 1, 1],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ]
      const b4 = math.matrix([[1], [2], [3], [4]], 'sparse')
      const result4 = math.usolve(m, b4);
      expect(JSON.stringify(result4)).assertEqual('[[-1],[-1],[-1],[4]]')
    })
    it('usolve_5', 0, () => {
      // usolve
      const m =
        [
          [1, 1, 1, 1],
          [0, 1, 1, 1],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ]
      const b5 = math.matrix([
        [1],
        [2],
        [3],
        [4]
      ])
      const result5 = math.usolve(m, b5);
      expect(JSON.stringify(result5)).assertEqual('[[-1],[-1],[-1],[4]]')
    })

    it('abs_1', 0, () => {
      // abs
      let result1: number = math.abs(-1)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('abs_2', 0, () => {
      // abs
      let result2 = math.abs(math.bignumber('-1.23456789123456'))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"1.23456789123456"}')
    })
    it('abs_3', 0, () => {
      // abs
      let matrix = math.matrix([-1, -2, -3]);
      let result3 = math.abs(matrix)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[1,2,3],"size":[3]}')
    })
    it('abs_4', 0, () => {
      // abs
      let result4 = math.abs([-1, -3])
      expect(JSON.stringify(result4)).assertEqual('[1,3]')
    })
    it('abs_5', 0, () => {
      // abs
      let result5 = math.abs([-1])
      expect(JSON.stringify(result5)).assertEqual('[1]')
    })

    it('add_1', 0, () => {
      // add
      let result1: number = math.add(-1, 1)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('add_2', 0, () => {
      // add
      let result2 = math.add([1, 2], [3, 4])
      expect(JSON.stringify(result2)).assertEqual('[4,6]')
    })
    it('add_3', 0, () => {
      // add
      let result3: math.Matrix = math.add(math.matrix([-1, -2, -3]), math.matrix([1, 2, 3]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[0,0,0],"size":[3]}')
    })
    it('add_4', 0, () => {
      // add
      let result4 = math.add([1, 2, 3], 1)
      expect(JSON.stringify(result4)).assertEqual('[2,3,4]')
    })
    it('add_5', 0, () => {
      // add
      let result5: number = math.add(-1, 2)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('cbrt_1', 0, () => {
      // cbrt
      let result1: number = math.cbrt(2)
      expect(JSON.stringify(result1)).assertEqual('1.2599210498948732')
    })
    it('cbrt_2', 0, () => {
      // cbrt
      let result2 = math.cbrt(math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"1.259921049894873164767210607278228350570251464701507980081975112"}')
    })
    it('cbrt_3', 0, () => {
      // cbrt
      let result3: number = math.cbrt(2, false)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"Complex","re":1.2599210498948732,"im":0}')
    })
    it('cbrt_4', 0, () => {
      // cbrt
      let result4 = math.cbrt(2, true)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[{"mathjs":"Complex","re":1.2599210498948732,"im":0},{"mathjs":"Complex","re":-0.6299605249474363,"im":1.0911236359717216},{"mathjs":"Complex","re":-0.6299605249474363,"im":-1.0911236359717216}],"size":[3]}')
    })
    it('cbrt_5', 0, () => {
      // cbrt
      let result5: number = math.cbrt(1)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('ceil_1', 0, () => {
      // ceil
      let result1: number = math.ceil(0.95)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('ceil_2', 0, () => {
      // ceil
      let result2: number = math.ceil(4)
      expect(JSON.stringify(result2)).assertEqual('4')
    })
    it('ceil_3', 0, () => {
      // ceil
      let result3: number = math.ceil(7.004)
      expect(JSON.stringify(result3)).assertEqual('8')
    })
    it('ceil_4', 0, () => {
      // ceil
      let result4: number = math.ceil(-7.004)
      expect(JSON.stringify(result4)).assertEqual('-7')
    })
    it('ceil_5', 0, () => {
      // ceil
      let result5: number = math.ceil(1)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('fix_1', 0, () => {
      // fix
      let result1: number = math.fix(0.9512)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('fix_2', 0, () => {
      // fix
      let result2: number = math.fix(0.9512, 2)
      expect(JSON.stringify(result2)).assertEqual('0.95')
    })
    it('fix_3', 0, () => {
      // fix
      let result3: number = math.fix(0.9512, 1)
      expect(JSON.stringify(result3)).assertEqual('0.9')
    })
    it('fix_4', 0, () => {
      // fix
      let result4: number = math.fix(0.9512, 3)
      expect(JSON.stringify(result4)).assertEqual('0.951')
    })
    it('fix_5', 0, () => {
      // fix
      let result5: number = math.fix(-0.9512, 1)
      expect(JSON.stringify(result5)).assertEqual('-0.9')
    })

    it('floor_1', 0, () => {
      // floor
      let result1: number = math.floor(0.9512)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('floor_2', 0, () => {
      // floor
      let result2: number = math.floor(0.9512, 1)
      expect(JSON.stringify(result2)).assertEqual('0.9')
    })
    it('floor_3', 0, () => {
      // floor
      let result3: number = math.floor(0.9512, 2)
      expect(JSON.stringify(result3)).assertEqual('0.95')
    })
    it('floor_4', 0, () => {
      // floor
      let result4: number = math.floor(0.9512, 3)
      expect(JSON.stringify(result4)).assertEqual('0.951')
    })
    it('floor_5', 0, () => {
      // floor
      let result5: number = math.floor(-0.9512, 1)
      expect(JSON.stringify(result5)).assertEqual('-1')
    })

    it('round_1', 0, () => {
      // round
      let result1: number = math.round(0.9512)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('round_2', 0, () => {
      // round
      let result2: number = math.round(0.9512, 1)
      expect(JSON.stringify(result2)).assertEqual('1')
    })
    it('round_3', 0, () => {
      // round
      let result3: number = math.round(0.9512, 2)
      expect(JSON.stringify(result3)).assertEqual('0.95')
    })
    it('round_4', 0, () => {
      // round
      let result4: number = math.round(0.9512, 3)
      expect(JSON.stringify(result4)).assertEqual('0.951')
    })
    it('round_5', 0, () => {
      // round
      let result5: number = math.round(-0.9512, 1)
      expect(JSON.stringify(result5)).assertEqual('-1')
    })

    it('cube_1', 0, () => {
      // cube
      let result1: number = math.cube(2)
      expect(JSON.stringify(result1)).assertEqual('8')
    })
    it('cube_2', 0, () => {
      // cube
      let result2 = math.cube(math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"8"}')
    })
    it('cube_3', 0, () => {
      // cube
      let result3: number = math.cube(-2)
      expect(JSON.stringify(result3)).assertEqual('-8')
    })
    it('cube_4', 0, () => {
      // cube
      let result4: number = math.cube(3)
      expect(JSON.stringify(result4)).assertEqual('27')
    })
    it('cube_5', 0, () => {
      // cube
      let result5: number = math.cube(1)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('divide_1', 0, () => {
      // divide
      let result1: number = math.divide(2, 1)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('divide_2', 0, () => {
      // divide
      let result2 = math.divide(math.bignumber(2), math.bignumber(1))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('divide_3', 0, () => {
      // divide
      let result3 = math.divide(math.bignumber(2), 1)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('divide_4', 0, () => {
      // divide
      let result4 = math.divide([2, 4, 6], 2)
      expect(JSON.stringify(result4)).assertEqual('[1,2,3]')
    })
    it('divide_5', 0, () => {
      // divide
      let result5: number = math.divide(2, -1)
      expect(JSON.stringify(result5)).assertEqual('-2')
    })

    it('dotDivide_1', 0, () => {
      // dotDivide
      let result1 = math.dotDivide(2, 1)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('dotDivide_2', 0, () => {
      // dotDivide
      let result2 = math.dotDivide(math.bignumber(2), 1)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('dotDivide_3', 0, () => {
      // dotDivide
      let result3 = math.dotDivide(math.bignumber(2), math.bignumber(1))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('dotDivide_4', 0, () => {
      // dotDivide
      let result4 = math.dotDivide([2, 4, 6], 2)
      expect(JSON.stringify(result4)).assertEqual('[1,2,3]')
    })
    it('dotDivide_5', 0, () => {
      // dotDivide
      let result5 = math.dotDivide(2, -1)
      expect(JSON.stringify(result5)).assertEqual('-2')
    })

    it('dotMultiply_1', 0, () => {
      // dotMultiply
      let result1 = math.dotMultiply(2, 1)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('dotMultiply_2', 0, () => {
      // dotMultiply
      let result2 = math.dotMultiply(math.bignumber(2), 1)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('dotMultiply3', 0, () => {
      // dotMultiply
      let result3 = math.dotMultiply(math.bignumber(2), math.bignumber(1))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('dotMultiply_4', 0, () => {
      // dotMultiply
      let result4 = math.dotMultiply([2, 4, 6], 2)
      expect(JSON.stringify(result4)).assertEqual('[4,8,12]')
    })
    it('dotMultiply_5', 0, () => {
      // dotMultiply
      let result5 = math.dotMultiply(2, -1)
      expect(JSON.stringify(result5)).assertEqual('-2')
    })

    it('dotPow_1', 0, () => {
      // dotPow
      let result1 = math.dotPow(2, 2)
      expect(JSON.stringify(result1)).assertEqual('4')
    })
    it('dotPow_2', 0, () => {
      // dotPow
      let result2 = math.dotPow(math.bignumber(2), 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"4"}')
    })
    it('dotPow_3', 0, () => {
      // dotPow
      let result3 = math.dotPow(math.bignumber(2), math.bignumber(2))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"4"}')
    })
    it('dotPow_4', 0, () => {
      // dotPow
      let result4 = math.dotPow([2, 4, 6], 2)
      expect(JSON.stringify(result4)).assertEqual('[4,16,36]')
    })
    it('dotPow_5', 0, () => {
      // dotPow
      let result5 = math.dotPow(-2, 2)
      expect(JSON.stringify(result5)).assertEqual('4')
    })


    it('exp_1', 0, () => {
      // exp
      let result1 = math.exp(2.12)
      expect(JSON.stringify(result1)).assertEqual('8.331137487687693')
    })
    it('exp_2', 0, () => {
      // exp
      let result2 = math.exp(math.bignumber(2.12))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"8.331137487687691937500649449446874091796250630155291957563780645"}')
    })
    it('exp_3', 0, () => {
      // exp
      let result3 = math.exp(2)
      expect(JSON.stringify(result3)).assertEqual('7.38905609893065')
    })
    it('exp_4', 0, () => {
      // exp
      let result4 = math.exp(-1)
      expect(JSON.stringify(result4)).assertEqual('0.36787944117144232')
    })
    it('exp_5', 0, () => {
      // exp
      let result5 = math.exp(0)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('expm1_1', 0, () => {
      // expm1
      let result1 = math.expm1(2.12)
      expect(JSON.stringify(result1)).assertEqual('7.331137487687693')
    })
    it('expm1_2', 0, () => {
      // expm1
      let result2 = math.expm1(math.bignumber(2.12))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"7.331137487687691937500649449446874091796250630155291957563780645"}')
    })
    it('expm1_3', 0, () => {
      // expm1
      let result3 = math.expm1(2)
      expect(JSON.stringify(result3)).assertEqual('6.38905609893065')
    })
    it('expm1_4', 0, () => {
      // expm1
      let result4 = math.expm1(-1)
      expect(JSON.stringify(result4)).assertEqual('-0.6321205588285577')
    })
    it('expm1_5', 0, () => {
      // expm1
      let result5 = math.expm1(0)
      expect(JSON.stringify(result5)).assertEqual('0')
    })

    it('gcd_1', 0, () => {
      // gcd
      let result1 = math.gcd(2, 3, 4)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('gcd_2', 0, () => {
      // gcd
      let result2 = math.gcd([2, 3], [4, 5])
      expect(JSON.stringify(result2)).assertEqual('[2,1]')
    })
    it('gcd_3', 0, () => {
      // gcd
      let matrix1 = math.matrix([[1,2],[3,4]])
      let matrix2 = math.matrix([[5,6],[7,8]])
      let result3 = math.gcd(matrix1, matrix2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,2],[1,4]],"size":[2,2]}')
    })
    it('gcd_4', 0, () => {
      // gcd
      let result4 = math.gcd(math.bignumber(1), math.bignumber(2), math.bignumber(3))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })
    it('gcd_5', 0, () => {
      // gcd
      let result5 = math.gcd(2, 3)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('hypot_1', 0, () => {
      // hypot
      let result1 = math.hypot(2, 3, 4)
      expect(JSON.stringify(result1)).assertEqual('5.385164807134504')
    })
    it('hypot_2', 0, () => {
      // hypot
      let result2 = math.hypot(math.bignumber(2), math.bignumber(3), math.bignumber(4))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"5.385164807134504031250710491540329556295120161644788837680388672"}')
    })
    it('hypot_3', 0, () => {
      // hypot
      let result3 = math.hypot(2, 3)
      expect(JSON.stringify(result3)).assertEqual('3.6055512754639896')
    })
    it('hypot4', 0, () => {
      // hypot
      let result4 = math.hypot(-1, 4)
      expect(JSON.stringify(result4)).assertEqual('4.123105625617661')
    })
    it('hypot_5', 0, () => {
      // hypot
      let result5 = math.hypot(2, -4)
      expect(JSON.stringify(result5)).assertEqual('4.47213595499958')
    })

    it('lcm_1', 0, () => {
      // lcm
      let result1 = math.lcm(4, 2)
      expect(JSON.stringify(result1)).assertEqual('4')
    })
    it('lcm_2', 0, () => {
      // lcm
      let result2 = math.lcm(math.bignumber(4), math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"4"}')
    })
    it('lcm_3', 0, () => {
      // lcm
      let matrix1 = math.matrix([[1,2],[3,4]])
      let matrix2 = math.matrix([[5,6],[7,8]])
      let result3 = math.lcm(matrix1, matrix2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[5,6],[21,8]],"size":[2,2]}')
    })
    it('lcm_4', 0, () => {
      // lcm
      let result4 = math.lcm([1,2], [3,4])
      expect(JSON.stringify(result4)).assertEqual('[3,4]')
    })
    it('lcm_5', 0, () => {
      // lcm
      let result5 = math.lcm(-4, 2)
      expect(JSON.stringify(result5)).assertEqual('4')
    })

    it('log_1', 0, () => {
      // log
      let result1 = math.log(1)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('log_2', 0, () => {
      // log
      let result2 = math.log(10)
      expect(JSON.stringify(result2)).assertEqual('2.302585092994046')
    })
    it('log_3', 0, () => {
      // log
      let result3 = math.log(10, 1)
      expect(JSON.stringify(result3)).assertEqual('null')
    })
    it('log_4', 0, () => {
      // log
      let result4 = math.log(1, 2)
      expect(JSON.stringify(result4)).assertEqual('0')
    })
    it('log_5', 0, () => {
      // log
      let result5 = math.log(10, 2)
      expect(JSON.stringify(result5)).assertEqual('3.3219280948873626')
    })

    it('log10_1', 0, () => {
      // log10
      let result1 = math.log10(10)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('log10_2', 0, () => {
      // log10
      let result2 = math.log10(100)
      expect(JSON.stringify(result2)).assertEqual('2')
    })
    it('log10_3', 0, () => {
      // log10
      let result3 = math.log10(1)
      expect(JSON.stringify(result3)).assertEqual('0')
    })
    it('log10_4', 0, () => {
      // log10
      let result4 = math.log10(math.bignumber(10))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })
    it('log10_5', 0, () => {
      // log10
      let result5 = math.log10([10, 100])
      expect(JSON.stringify(result5)).assertEqual('[1,2]')
    })

    it('log1p_1', 0, () => {
      // log1p
      let result1 = math.log1p(0)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('log1p_2', 0, () => {
      // log1p
      let result2 = math.log1p(10)
      expect(JSON.stringify(result2)).assertEqual('2.3978952727983707')
    })
    it('log1p_3', 0, () => {
      // log1p
      let result3 = math.log1p(100)
      expect(JSON.stringify(result3)).assertEqual('4.61512051684126')
    })
    it('log1p_4', 0, () => {
      // log1p
      let result4 = math.log1p(math.bignumber(10))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"2.397895272798370544061943577965129299821706853937417175218567709"}')
    })
    it('log1p_5', 0, () => {
      // log1p
      let result5 = math.log1p([10, 100])
      expect(JSON.stringify(result5)).assertEqual('[2.3978952727983707,4.61512051684126]')
    })

    it('log2_1', 0, () => {
      // log2
      let result1 = math.log2(2)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('log2_2', 0, () => {
      // log2
      let result2 = math.log2(1024)
      expect(JSON.stringify(result2)).assertEqual('10')
    })
    it('log2_3', 0, () => {
      // log2
      let result3 = math.log2(1)
      expect(JSON.stringify(result3)).assertEqual('0')
    })
    it('log2_4', 0, () => {
      // log2
      let result4 = math.log2(math.bignumber(2))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })
    it('log2_5', 0, () => {
      // log2
      let result5 = math.log2([2, 1024])
      expect(JSON.stringify(result5)).assertEqual('[1,10]')
    })

    it('mod_1', 0, () => {
      // mod
      let result1 = math.mod(4, 2)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('mod_2', 0, () => {
      // mod
      let result2 = math.mod(4, math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('mod_3', 0, () => {
      // mod
      let result3 = math.mod(4, 1)
      expect(JSON.stringify(result3)).assertEqual('0')
    })
    it('mod_4', 0, () => {
      // mod
      let result4 = math.mod(-4, 2)
      expect(JSON.stringify(result4)).assertEqual('0')
    })
    it('mod_5', 0, () => {
      // mod
      let result5 = math.mod(math.bignumber(4), 2)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })

    it('multiply_1', 0, () => {
      // multiply
      let result1 = math.multiply(4, 2)
      expect(JSON.stringify(result1)).assertEqual('8')
    })
    it('multiply_2', 0, () => {
      // multiply
      let result2 = math.multiply([1, 2], [3, 4])
      expect(JSON.stringify(result2)).assertEqual('11')
    })
    it('multiply_3', 0, () => {
      // multiply
      let matrix1 = math.matrix([[1,2],[3,4]])
      let matrix2 = math.matrix([[5,6],[7,8]])
      let result3 = math.multiply(matrix1, 2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[2,4],[6,8]],"size":[2,2]}')
    })
    it('multiply_4', 0, () => {
      // multiply
      let matrix1 = math.matrix([[1,2],[3,4]])
      let matrix2 = math.matrix([[5,6],[7,8]])
      let result4 = math.multiply(matrix1, matrix2)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[19,22],[43,50]],"size":[2,2]}')
    })
    it('multiply_5', 0, () => {
      // multiply
      let result5 = math.multiply(math.bignumber(4), 2)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"8"}')
    })

    it('norm_1', 0, () => {
      // norm
      let result1 = math.norm(4)
      expect(JSON.stringify(result1)).assertEqual('4')
    })
    it('norm_2', 0, () => {
      // norm
      let result2 = math.norm(4.8)
      expect(JSON.stringify(result2)).assertEqual('4.8')
    })
    it('norm_3', 0, () => {
      // norm
      let result3 = math.norm(math.bignumber(4))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"4"}')
    })
    it('norm_4', 0, () => {
      // norm
      let result4 = math.norm(math.bignumber(4.1234567890123456))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"4.123456789012345"}')
    })
    it('norm_5', 0, () => {
      // norm
      let result5 = math.norm(-4)
      expect(JSON.stringify(result5)).assertEqual('4')
    })

    it('nthRoot_1', 0, () => {
      // nthRoot
      let result1 = math.nthRoot(4)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('nthRoot_2', 0, () => {
      // nthRoot
      let result2 = math.nthRoot(math.bignumber(4))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('nthRoot_3', 0, () => {
      // nthRoot
      let result3 = math.nthRoot(4, 2)
      expect(JSON.stringify(result3)).assertEqual('2')
    })
    it('nthRoot_4', 0, () => {
      // nthRoot
      let result4 = math.nthRoot(math.bignumber(4), 2)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('nthRoot_5', 0, () => {
      // nthRoot
      let result5 = math.nthRoot(math.bignumber(4), math.bignumber(2))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })

    it('pow_1', 0, () => {
      // pow
      let result1 = math.pow(4, 2)
      expect(JSON.stringify(result1)).assertEqual('16')
    })
    it('pow_2', 0, () => {
      // pow
      let result2 = math.pow(4, math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"16"}')
    })
    it('pow_3', 0, () => {
      // pow
      let result3 = math.pow(math.bignumber(4), 2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"16"}')
    })
    it('pow_4', 0, () => {
      // pow
      let result4 = math.pow(math.bignumber(4), math.bignumber(2))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"16"}')
    })
    it('pow_5', 0, () => {
      // pow
      let result5 = math.pow(4, 1)
      expect(JSON.stringify(result5)).assertEqual('4')
    })

    it('sign_1', 0, () => {
      // sign
      let result1 = math.sign(8)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('sign_2', 0, () => {
      // sign
      let result2 = math.sign(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })
    it('sign_3', 0, () => {
      // sign
      let result3 = math.sign([8, 9])
      expect(JSON.stringify(result3)).assertEqual('[1,1]')
    })

    it('sign_4', 0, () => {
      // sign
      let matrix = math.matrix([1,2])
      let result4 = math.sign(matrix)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[1,1],"size":[2]}')
    })

    it('sign_5', 0, () => {
      // sign
      let result5 = math.sign(9)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('sqrt_1', 0, () => {
      // sqrt
      let result1 = math.sqrt(8)
      expect(JSON.stringify(result1)).assertEqual('2.8284271247461903')
    })
    it('sqrt_2', 0, () => {
      // sqrt
      let result2 = math.sqrt(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2.828427124746190097603377448419396157139343750753896146353359476"}')
    })
    it('sqrt_3', 0, () => {
      // sqrt
      let result3 = math.sqrt(9)
      expect(JSON.stringify(result3)).assertEqual('3')
    })
    it('sqrt_4', 0, () => {
      // sqrt
      let result4 = math.sqrt(math.bignumber(9))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"3"}')
    })
    it('sqrt_5', 0, () => {
      // sqrt
      let complex = math.complex(3, 6)
      let result5 = math.sqrt(complex)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"Complex","re":2.2032026611843234,"im":1.3616541287161306}')
    })

    it('square_1', 0, () => {
      // square
      let result1 = math.square(8)
      expect(JSON.stringify(result1)).assertEqual('64')
    })
    it('square_2', 0, () => {
      // square
      let result2 = math.square(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"64"}')
    })
    it('square_3', 0, () => {
      // square
      let mFraction3 = math.fraction({s:3, n:6, d: 9});
      let result3 = math.square(mFraction3)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"Fraction","n":4,"d":1}')
    })
    it('square_4', 0, () => {
      // square
      let mFraction4 = math.fraction(8);
      let result4 = math.square(mFraction4)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"Fraction","n":64,"d":1}')
    })
    it('square_5', 0, () => {
      // square
      let complex = math.complex(3, 6)
      let result5 = math.square(complex)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"Complex","re":-27,"im":36}')
    })

    it('subtract_1', 0, () => {
      // subtract
      let result1 = math.subtract(8, 2)
      expect(JSON.stringify(result1)).assertEqual('6')
    })
    it('subtract_2', 0, () => {
      // subtract
      let result2 = math.subtract(math.bignumber(8), 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"6"}')
    })
    it('subtract_3', 0, () => {
      // subtract
      let result3 = math.subtract(math.bignumber(8), math.bignumber(8))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('subtract_4', 0, () => {
      // subtract
      let complex = math.complex(3, 6)
      let result4 = math.subtract(complex, 2)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"Complex","re":1,"im":6}')
    })
    it('subtract_5', 0, () => {
      // subtract
      let mFraction3 = math.fraction({s:3, n:6, d: 9});
      let result5 = math.subtract(mFraction3, 2)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"Fraction","n":0,"d":1}')
    })

    it('unaryMinus_1', 0, () => {
      // unaryMinus
      let result1 = math.unaryMinus(8)
      expect(JSON.stringify(result1)).assertEqual('-8')
    })
    it('unaryMinus_2', 0, () => {
      // unaryMinus
      let result2 = math.unaryMinus(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"-8"}')
    })
    it('unaryMinus_3', 0, () => {
      // unaryMinus
      let result3 = math.unaryMinus([4, 5, 6])
      expect(JSON.stringify(result3)).assertEqual('[-4,-5,-6]')
    })
    it('unaryMinus_4', 0, () => {
      // unaryMinus
      let result4 = math.unaryMinus(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[-1,-2],[-3,-4]],"size":[2,2]}')
    })
    it('unaryMinus_5', 0, () => {
      // unaryMinus
      let mFraction = math.fraction({s:3, n:6, d: 9});
      let result5 = math.unaryMinus(mFraction)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"Fraction","n":-2,"d":1}')
    })

    it('unaryPlus_1', 0, () => {
      // unaryPlus
      let result1 = math.unaryPlus(8)
      expect(JSON.stringify(result1)).assertEqual('8')
    })
    it('unaryPlus_2', 0, () => {
      // unaryPlus
      let result2 = math.unaryPlus(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"8"}')
    })
    it('unaryPlus_3', 0, () => {
      // unaryPlus
      let result3 = math.unaryPlus([4, 5, 6])
      expect(JSON.stringify(result3)).assertEqual('[4,5,6]')
    })
    it('unaryPlus_4', 0, () => {
      // unaryPlus
      let result4 = math.unaryPlus(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,2],[3,4]],"size":[2,2]}')
    })
    it('unaryPlus_5', 0, () => {
      // unaryPlus
      let mFraction = math.fraction({s:3, n:6, d: 9});
      let result5 = math.unaryPlus(mFraction)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"Fraction","n":2,"d":1}')
    })

    it('xgcd_1', 0, () => {
      // xgcd
      let result1 = math.xgcd(8, 2)
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[2,0,1],"size":[3]}')
    })
    it('xgcd_2', 0, () => {
      // xgcd
      let result2 = math.xgcd(math.bignumber(8), 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[{"mathjs":"BigNumber","value":"2"},{"mathjs":"BigNumber","value":"0"},{"mathjs":"BigNumber","value":"1"}],"size":[3]}')
    })
    it('xgcd_3', 0, () => {
      // xgcd
      let result3 = math.xgcd(math.bignumber(8), math.bignumber(2))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[{"mathjs":"BigNumber","value":"2"},{"mathjs":"BigNumber","value":"0"},{"mathjs":"BigNumber","value":"1"}],"size":[3]}')
    })
    it('xgcd_4', 0, () => {
      // xgcd
      let result4 = math.xgcd(8, math.bignumber(2))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[{"mathjs":"BigNumber","value":"2"},{"mathjs":"BigNumber","value":"0"},{"mathjs":"BigNumber","value":"1"}],"size":[3]}')
    })
    it('xgcd_5', 0, () => {
      // xgcd
      let result5 = math.xgcd(8, 1)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[1,0,1],"size":[3]}')
    })

    it('bitAnd_1', 0, () => {
      // bitAnd
      let result1 = math.bitAnd(8, 2)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('bitAnd_2', 0, () => {
      // bitAnd
      let result2 = math.bitAnd(8, math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('bitAnd_3', 0, () => {
      // bitAnd
      let result3 = math.bitAnd(7, 2)
      expect(JSON.stringify(result3)).assertEqual('2')
    })
    it('bitAnd_4', 0, () => {
      // bitAnd
      let result4 = math.bitAnd(7, 1)
      expect(JSON.stringify(result4)).assertEqual('1')
    })
    it('bitAnd_5', 0, () => {
      // bitAnd
      let result5 = math.bitAnd(8, 0)
      expect(JSON.stringify(result5)).assertEqual('0')
    })

    it('bitNot_1', 0, () => {
      // bitNot
      let result1 = math.bitNot(8)
      expect(JSON.stringify(result1)).assertEqual('-9')
    })
    it('bitNot_2', 0, () => {
      // bitNot
      let result2 = math.bitNot(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"-9"}')
    })
    it('bitNot_3', 0, () => {
      // bitNot
      let result3 = math.bitNot([1, 2, 3])
      expect(JSON.stringify(result3)).assertEqual('[-2,-3,-4]')
    })
    it('bitNot_4', 0, () => {
      // bitNot
      let result4 = math.bitNot(math.matrix([1,2]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[-2,-3],"size":[2]}')
    })
    it('bitNot_5', 0, () => {
      // bitNot
      let result5 = math.bitNot(-9)
      expect(JSON.stringify(result5)).assertEqual('8')
    })

    it('bitOr_1', 0, () => {
      // bitOr
      let result1 = math.bitOr(8, 2)
      expect(JSON.stringify(result1)).assertEqual('10')
    })
    it('bitOr_2', 0, () => {
      // bitOr
      let result2 = math.bitOr(math.bignumber(9), math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"11"}')
    })
    it('bitOr_3', 0, () => {
      // bitOr
      let result3 = math.bitOr([2,3], [1,5])
      expect(JSON.stringify(result3)).assertEqual('[3,7]')
    })
    it('bitOr_4', 0, () => {
      // bitOr
      let result4 = math.bitOr(math.matrix([1, 2]), math.matrix([3, 4]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[3,6],"size":[2]}')
    })
    it('bitOr_5', 0, () => {
      // bitOr
      let result5 = math.bitOr(8, 0)
      expect(JSON.stringify(result5)).assertEqual('8')
    })

    it('leftShift_1', 0, () => {
      // leftShift
      let result1 = math.leftShift(8, 2)
      expect(JSON.stringify(result1)).assertEqual('32')
    })
    it('leftShift_2', 0, () => {
      // leftShift
      let result2 = math.leftShift(8, math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"32"}')
    })
    it('leftShift_3', 0, () => {
      // leftShift
      let result3 = math.leftShift(math.bignumber(8), 2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"32"}')
    })
    it('leftShift_4', 0, () => {
      // leftShift
      let result4 = math.leftShift([4, 3], 2)
      expect(JSON.stringify(result4)).assertEqual('[16,12]')
    })
    it('leftShift_5', 0, () => {
      // leftShift
      let result5 = math.leftShift(9, 2)
      expect(JSON.stringify(result5)).assertEqual('36')
    })

    it('rightArithShift_1', 0, () => {
      // rightArithShift
      let result1 = math.rightArithShift(8, 2)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('rightArithShift_2', 0, () => {
      // rightArithShift
      let result2 = math.rightArithShift(8, math.bignumber(2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('rightArithShift_3', 0, () => {
      // rightArithShift
      let result3 = math.rightArithShift(math.bignumber(8), 2)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"2"}')
    })
    it('rightArithShift_4', 0, () => {
      // rightArithShift
      let result4 = math.rightArithShift([4, 3], 2)
      expect(JSON.stringify(result4)).assertEqual('[1,0]')
    })
    it('rightArithShift_5', 0, () => {
      // rightArithShift
      let result5 = math.rightArithShift(9, 2)
      expect(JSON.stringify(result5)).assertEqual('2')
    })

    it('rightLogShift_1', 0, () => {
      // rightLogShift
      let result1 = math.rightLogShift(8, 2)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('rightLogShift_2', 0, () => {
      // rightLogShift
      let result2 = math.rightLogShift(math.matrix([[2, 3], [4, 5]]), 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[[0,0],[1,1]],"size":[2,2]}')
    })
    it('rightLogShift_3', 0, () => {
      // rightLogShift
      let result3 = math.rightLogShift([1, 2, 3], 2)
      expect(JSON.stringify(result3)).assertEqual('[0,0,0]')
    })
    it('rightLogShift_4', 0, () => {
      // rightLogShift
      let result4 = math.rightLogShift([4, 3], 2)
      expect(JSON.stringify(result4)).assertEqual('[1,0]')
    })
    it('rightLogShift_5', 0, () => {
      // rightLogShift
      let result5 = math.rightLogShift(9, 2)
      expect(JSON.stringify(result5)).assertEqual('2')
    })

    it('bellNumbers_1', 0, () => {
      // bellNumbers
      let result1 = math.bellNumbers(8)
      expect(JSON.stringify(result1)).assertEqual('4140')
    })
    it('bellNumbers_2', 0, () => {
      // bellNumbers
      let result2 = math.bellNumbers(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"4140"}')
    })
    it('bellNumbers_3', 0, () => {
      // bellNumbers
      let result3 = math.bellNumbers(1)
      expect(JSON.stringify(result3)).assertEqual('1')
    })
    it('bellNumbers_4', 0, () => {
      // bellNumbers
      let result4 = math.bellNumbers(math.bignumber(3))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"5"}')
    })
    it('bellNumbers_5', 0, () => {
      // bellNumbers
      let result5 = math.bellNumbers(4)
      expect(JSON.stringify(result5)).assertEqual('15')
    })

    it('catalan_1', 0, () => {
      // catalan
      let result1 = math.catalan(8)
      expect(JSON.stringify(result1)).assertEqual('1430')
    })
    it('catalan_2', 0, () => {
      // catalan
      let result2 = math.catalan(math.bignumber(9))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"4862"}')
    })
    it('catalan_3', 0, () => {
      // catalan
      let result3 = math.catalan(1)
      expect(JSON.stringify(result3)).assertEqual('1')
    })
    it('catalan_4', 0, () => {
      // catalan
      let result4 = math.catalan(math.bignumber(7))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"429"}')
    })
    it('catalan_5', 0, () => {
      // catalan
      let result5 = math.catalan(11)
      expect(JSON.stringify(result5)).assertEqual('58786')
    })

    it('composition_1', 0, () => {
      // composition
      let result1 = math.composition(8, 2)
      expect(JSON.stringify(result1)).assertEqual('7')
    })
    it('composition_2', 0, () => {
      // composition
      let result2 = math.composition(math.bignumber(8), 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"7"}')
    })
    it('composition_3', 0, () => {
      // composition
      let result3 = math.composition(8, math.bignumber(2))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"7"}')
    })
    it('composition_4', 0, () => {
      // composition
      let result4 = math.composition(9, 3)
      expect(JSON.stringify(result4)).assertEqual('28')
    })
    it('composition_5', 0, () => {
      // composition
      let result5 = math.composition(9, 1)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('stirlingS2_1', 0, () => {
      // stirlingS2
      let result1 = math.stirlingS2(2, 2)
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('stirlingS2_2', 0, () => {
      // stirlingS2
      let result2 = math.stirlingS2(2, 1)
      expect(JSON.stringify(result2)).assertEqual('1')
    })
    it('stirlingS2_3', 0, () => {
      // stirlingS2
      let result3 = math.stirlingS2(9, 2)
      expect(JSON.stringify(result3)).assertEqual('255')
    })
    it('stirlingS2_4', 0, () => {
      // stirlingS2
      let result4 = math.stirlingS2(math.bignumber(8), 2)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"127"}')
    })
    it('stirlingS2_5', 0, () => {
      // stirlingS2
      let result5 = math.stirlingS2(9, 3)
      expect(JSON.stringify(result5)).assertEqual('3025')
    })

    it('arg_1', 0, () => {
      // arg
      let result1 = math.arg(2)
      expect(JSON.stringify(result1)).assertEqual('0')
    })
    it('arg_2', 0, () => {
      // arg
      let result2 = math.arg(math.bignumber(0.2))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('arg_3', 0, () => {
      // arg
      let result3 = math.arg(math.bignumber(2.5))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"0"}')
    })
    it('arg_4', 0, () => {
      // arg
      let result4 = math.arg([1, 2, 3])
      expect(JSON.stringify(result4)).assertEqual('[0,0,0]')
    })
    it('arg_5', 0, () => {
      // arg
      let result5 = math.arg(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[0,0],[0,0]],"size":[2,2]}')
    })

    it('conj_1', 0, () => {
      // conj
      let result1 = math.conj(2)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('conj_2', 0, () => {
      // conj
      let result2 = math.conj(math.bignumber(8))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"8"}')
    })
    it('conj_3', 0, () => {
      // conj
      let result3 = math.conj([1, 2, 3])
      expect(JSON.stringify(result3)).assertEqual('[1,2,3]')
    })
    it('conj_4', 0, () => {
      // conj
      let result4 = math.conj(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,2],[3,4]],"size":[2,2]}')
    })
    it('conj_5', 0, () => {
      // conj
      let result5 = math.conj(math.bignumber(1))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"1"}')
    })

    it('distance_1', 0, () => {
      // distance
      let result1 = math.distance([5, 6], [1, 2])
      expect(JSON.stringify(result1)).assertEqual('5.656854249492381')
    })
    it('distance_2', 0, () => {
      // distance
      let result2 = math.distance(math.matrix([5, 6]), math.matrix([1, 2]))
      expect(JSON.stringify(result2)).assertEqual('5.656854249492381')
    })
    it('distance_3', 0, () => {
      // distance
      let result3 = math.distance([1, 2], [5, 6])
      expect(JSON.stringify(result3)).assertEqual('5.656854249492381')
    })
    it('distance_4', 0, () => {
      // distance
      let result4 = math.distance(math.matrix([1, 2]), math.matrix([5, 6]))
      expect(JSON.stringify(result4)).assertEqual('5.656854249492381')
    })
    it('distance_5', 0, () => {
      // distance
      let result5 = math.distance([3, -4], [1, 2])
      expect(JSON.stringify(result5)).assertEqual('6.324555320336759')
    })

    it('intersect_1', 0, () => {
      // intersect
      let result1 = math.intersect([7, 8], [5, 6], [-3, 4], [1, 2])
      expect(JSON.stringify(result1)).assertEqual('[1,2]')
    })
    it('intersect_2', 0, () => {
      // intersect
      let result2 = math.intersect([7, -8], [5, -6], [3, 4], [1, 2])
      expect(JSON.stringify(result2)).assertEqual('[-1,0]')
    })
    it('intersect_3', 0, () => {
      // intersect
      let result3 = math.intersect([7, 8], [5, -6], [3, -4], [1, 2])
      expect(JSON.stringify(result3)).assertEqual('[4.6,-8.8]')
    })
    it('intersect_4', 0, () => {
      // intersect
      let result4 = math.intersect([7, -8], [5, 6], [-3, 4], [1, 2])
      expect(JSON.stringify(result4)).assertEqual('[5.923076923076923,-0.4615384615384617]')
    })
    it('intersect_5', 0, () => {
      // intersect
      let result5 = math.intersect(math.matrix([7, 8]), [5, 6], [-3, 4], [1, 2])
      expect(JSON.stringify(result5)).assertEqual('[1,2]')
    })

    it('and_1', 0, () => {
      // and
      let result1 = math.and([7, 8], [1, 2])
      expect(JSON.stringify(result1)).assertEqual('[true,true]')
    })
    it('and_2', 0, () => {
      // and
      let result2 = math.and(7, 8)
      expect(JSON.stringify(result2)).assertEqual('true')
    })
    it('and_3', 0, () => {
      // and
      let result3 = math.and(math.matrix([7, 8]), math.matrix([1, 2]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[true,true],"size":[2]}')
    })
    it('and_4', 0, () => {
      // and
      let result4 = math.and(math.bignumber(7), math.bignumber(2))
      expect(JSON.stringify(result4)).assertEqual('true')
    })
    it('and_5', 0, () => {
      // and
      let result5 = math.and([7, 1], [4, 3])
      expect(JSON.stringify(result5)).assertEqual('[true,true]')
    })

    it('not_1', 0, () => {
      // not
      let result1 = math.not([7, 8])
      expect(JSON.stringify(result1)).assertEqual('[false,false]')
    })
    it('not_2', 0, () => {
      // not
      let result2 = math.not(7)
      expect(JSON.stringify(result2)).assertEqual('false')
    })
    it('not_3', 0, () => {
      // not
      let result3 = math.not(math.matrix([7, 8]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[false,false],"size":[2]}')
    })
    it('not_4', 0, () => {
      // not
      let result4 = math.not(math.bignumber(8))
      expect(JSON.stringify(result4)).assertEqual('false')
    })
    it('not_5', 0, () => {
      // not
      let result5 = math.not(1)
      expect(JSON.stringify(result5)).assertEqual('false')
    })

    it('or_1', 0, () => {
      // or
      let result1 = math.or([7, 8], [1, 2])
      expect(JSON.stringify(result1)).assertEqual('[true,true]')
    })
    it('or_2', 0, () => {
      // or
      let result2 = math.or(7, 8)
      expect(JSON.stringify(result2)).assertEqual('true')
    })
    it('or_3', 0, () => {
      // or
      let result3 = math.or(math.bignumber(6), math.bignumber(3))
      expect(JSON.stringify(result3)).assertEqual('true')
    })
    it('or_4', 0, () => {
      // or
      let result4 = math.or(math.matrix([7, 8]), math.matrix([1, 2]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[true,true],"size":[2]}')
    })
    it('or_5', 0, () => {
      // or
      let result5 = math.or(math.complex(2, 3), math.complex(-2, 1))
      expect(JSON.stringify(result5)).assertEqual('true')
    })

    it('xor_1', 0, () => {
      // xor
      let result1 = math.xor([7, 8], [1, 2])
      expect(JSON.stringify(result1)).assertEqual('[false,false]')
    })
    it('xor_2', 0, () => {
      // xor
      let result2 = math.or(7, 8)
      expect(JSON.stringify(result2)).assertEqual('true')
    })
    it('xor_3', 0, () => {
      // xor
      let result3 = math.xor(math.bignumber(6), math.bignumber(3))
      expect(JSON.stringify(result3)).assertEqual('false')
    })
    it('xor_4', 0, () => {
      // xor
      let result4 = math.xor(math.matrix([7, 8]), math.matrix([1, 2]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[false,false],"size":[2]}')
    })
    it('xor_5', 0, () => {
      // xor
      let result5 = math.xor(math.complex(2, 3), math.complex(-2, 1))
      expect(JSON.stringify(result5)).assertEqual('false')
    })

    it('apply_1', 0, () => {
      // apply
      math.apply([1, 2, 3], 0, (array: math.MathCollection) => {
        expect(JSON.stringify(array)).assertEqual('[1,2,3]')
        return 1
      })
    })
    it('apply_2', 0, () => {
      // apply
      math.apply([1, 2], 0, (array: math.MathCollection) => {
        expect(JSON.stringify(array)).assertEqual('[1,2]')
        return 2
      })
    })
    it('apply_3', 0, () => {
      // apply
      math.apply([1, 2, 3, 4], 0, (array: math.MathCollection) => {
        expect(JSON.stringify(array)).assertEqual('[1,2,3,4]')
        return 2
      })
    })
    it('apply_4', 0, () => {
      // apply
      math.apply(math.matrix([[1]]), 0, (array: math.MathCollection) => {
        expect(JSON.stringify(array)).assertEqual('[1]')
        return 2
      })
    })
    it('apply_5', 0, () => {
      // apply
      math.apply([[1], [2], [3]], 0, (array: math.MathCollection) => {
        expect(JSON.stringify(array)).assertEqual('[1,2,3]')
        return 2
      })
    })

    it('concat_1', 0, () => {
      // concat
      let result1 = math.concat([1, 2, 3], [4, 5])
      expect(JSON.stringify(result1)).assertEqual('[1,2,3,4,5]')
    })
    it('concat_2', 0, () => {
      // concat
      let result2 = math.concat( [math.bignumber(1), math.bignumber(2), math.bignumber(3)],
        [math.bignumber(4)])
      expect(result2.toString()).assertEqual('1,2,3,4')
    })
    it('concat_3', 0, () => {
      // concat
      let result3 = math.concat([[1], [2], [3]], [[4]], 0)
      expect(JSON.stringify(result3)).assertEqual('[[1],[2],[3],[4]]')
    })
    it('concat_4', 0, () => {
      // concat
      let result4 = math.concat(math.matrix([[1, 2], [3, 4]]), math.matrix([[5, 6], [7, 8]]))
      expect(result4.toString()).assertEqual('[[1, 2, 5, 6], [3, 4, 7, 8]]')
    })
    it('concat_5', 0, () => {
      // concat
      let result5 = math.concat([[1]], [[2]])
      expect(JSON.stringify(result5)).assertEqual('[[1,2]]')
    })

    it('cross_1', 0, () => {
      // cross
      let result1 = math.cross([1, 2, 4], [3, 4, 5])
      expect(JSON.stringify(result1)).assertEqual('[-6,7,-2]')
    })
    it('cross_2', 0, () => {
      // cross
      let result2 = math.cross(math.matrix([1, 2, 4]), math.matrix([3, 4, 5]))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[-6,7,-2],"size":[3]}')
    })
    it('cross_3', 0, () => {
      // cross
      let result3 = math.cross([-1, 2, 4], [3, -4, 5])
      expect(JSON.stringify(result3)).assertEqual('[26,17,-2]')
    })
    it('cross_4', 0, () => {
      // cross
      let result4 = math.cross(math.matrix([-1, 2, 4]), math.matrix([3, -4, 5]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[26,17,-2],"size":[3]}')
    })
    it('cross_5', 0, () => {
      // cross
      let result5 = math.cross([1, -2, 4], [3, 4, 5])
      expect(JSON.stringify(result5)).assertEqual('[-26,7,10]')
    })

    it('det_1', 0, () => {
      // det
      let result1 = math.det([[1, 2], [3, 4]])
      expect(JSON.stringify(result1)).assertEqual('-2')
    })
    it('det_2', 0, () => {
      // det
      let result2 = math.det(math.matrix([[2, 4], [3, 6]]))
      expect(JSON.stringify(result2)).assertEqual('0')
    })
    it('det_3', 0, () => {
      // det
      let result3 = math.det([[6, 2], [1, 3]])
      expect(JSON.stringify(result3)).assertEqual('16')
    })
    it('det_4', 0, () => {
      // det
      let result4 = math.det([[-2, 4], [0, 5]])
      expect(JSON.stringify(result4)).assertEqual('-10')
    })
    it('det_5', 0, () => {
      // det
      let result5 = math.det([[-1, 3], [2, 6]])
      expect(JSON.stringify(result5)).assertEqual('-12')
    })

    it('diag_1', 0, () => {
      // diag
      let result1 = math.diag([[1, 2], [3, 4]])
      expect(JSON.stringify(result1)).assertEqual('[1,4]')
    })
    it('diag_2', 0, () => {
      // diag
      let result2 = math.diag([[1, 2], [3, 4]], 2)
      expect(JSON.stringify(result2)).assertEqual('[]')
    })
    it('diag_3', 0, () => {
      // diag
      let result3 = math.diag([[1, 2], [3, 4]], math.bignumber(1))
      expect(JSON.stringify(result3)).assertEqual('[2]')
    })
    it('diag_4', 0, () => {
      // diag
      let result4 = math.diag([[1, -2], [3, 4]])
      expect(JSON.stringify(result4)).assertEqual('[1,4]')
    })
    it('diag_5', 0, () => {
      // diag
      let result5 = math.diag([[1, 2], [3, -4]])
      expect(JSON.stringify(result5)).assertEqual('[1,-4]')
    })

    it('dot_1', 0, () => {
      // dot
      let result1 = math.dot([1, 2], [3, 4])
      expect(JSON.stringify(result1)).assertEqual('11')
    })
    it('dot_2', 0, () => {
      // dot
      let result2 = math.dot(math.matrix([1, 2]), math.matrix([3, 4]))
      expect(JSON.stringify(result2)).assertEqual('11')
    })
    it('dot_3', 0, () => {
      // dot
      let result3 = math.dot([1, -2], [3, 4])
      expect(JSON.stringify(result3)).assertEqual('-5')
    })
    it('dot_4', 0, () => {
      // dot
      let result4 = math.dot(math.matrix([1, 2]), math.matrix([-3, 4]))
      expect(JSON.stringify(result4)).assertEqual('5')
    })
    it('dot_5', 0, () => {
      // dot
      let result5 = math.dot([1, 7], [2, 5])
      expect(JSON.stringify(result5)).assertEqual('37')
    })

    it('expm_1', 0, () => {
      // expm
      let result1 = math.expm(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[51.968956198705285,74.73656456700355],[112.10484685050534,164.07380304921043]],"size":[2,2]}')
    })
    it('expm_2', 0, () => {
      // expm
      let result2 = math.expm(math.matrix([[-1, 2], [3, 4]]))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[[21.317881543142274,42.36509251981126],[63.54763877971688,127.23061284267015]],"size":[2,2]}')
    })
    it('expm_3', 0, () => {
      // expm
      let result3 = math.expm(math.matrix([[1, -2], [3, 4]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[-13.168977126183755,-11.750043390268857],[17.62506508540328,4.4560879592195395]],"size":[2,2]}')
    })
    it('expm_4', 0, () => {
      // expm
      let result4 = math.expm(math.matrix([[6, 9], [5, 7]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[256896.78352247213,371307.80073775194],[206282.11152097327,298153.2058266667]],"size":[2,2]}')
    })
    it('expm_5', 0, () => {
      // expm
      let result5 = math.expm(math.matrix([[4, 8], [3, 2]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[1788.6289263383455,2384.6581214068096],[894.2467955275545,1192.4643959866414]],"size":[2,2]}')
    })

    it('identity_1', 0, () => {
      // identity
      let result1 = math.identity(8)
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,1]],"size":[8,8]}')
    })
    it('identity_2', 0, () => {
      // identity
      let result2 = math.identity(9)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1]],"size":[9,9]}')
    })
    it('identity_3', 0, () => {
      // identity
      let result3 = math.identity([1, 2])
      expect(JSON.stringify(result3)).assertEqual('[[1,0]]')
    })
    it('identity_4', 0, () => {
      // identity
      let result4 = math.identity([3, 4])
      expect(JSON.stringify(result4)).assertEqual('[[1,0,0,0],[0,1,0,0],[0,0,1,0]]')
    })
    it('identity_5', 0, () => {
      // identity
      let result5 = math.identity([6, 7])
      expect(JSON.stringify(result5)).assertEqual('[[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,0,1,0]]')
    })

    it('filter_1', 0, () => {
      // filter
      let result1 = math.filter([3, 4], ( value: number[],
                                          index: Number,
                                          matrix: math.Matrix | math.MathArray | string[]) => {
        return true;
      })
      expect(JSON.stringify(result1)).assertEqual('[3,4]')
    })
    it('filter_2', 0, () => {
      // filter
      let result2 = math.filter([3, 4], ( value: number[],
                                          index: Number,
                                          matrix: math.Matrix | math.MathArray | string[]) => {
        return false;
      })
      expect(JSON.stringify(result2)).assertEqual('[]')
    })
    it('filter_3', 0, () => {
      // filter
      let result3 = math.filter(math.matrix([3, 4]) , ( value: number[],
                                                        index: Number,
                                                        matrix: math.Matrix | math.MathArray | string[]) => {
        return false;
      })
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[],"size":[0]}')
    })
    it('filter_4', 0, () => {
      // filter
      let result4 = math.filter(math.matrix([3, 4]), ( value: number[],
                                                       index: Number,
                                                       matrix: math.Matrix | math.MathArray | string[]) => {
        return true;
      })
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[3,4],"size":[2]}')
    })
    it('filter_5', 0, () => {
      // filter
      let result5 = math.filter([3, 4, 5, 6], ( value: number[],
                                                index: Number,
                                                matrix: math.Matrix | math.MathArray | string[]) => {
        return false;
      })
      expect(JSON.stringify(result5)).assertEqual('[]')
    })

    it('flatten_1', 0, () => {
      // flatten
      let result1 = math.flatten([[1, 2], [3, 4]])
      expect(JSON.stringify(result1)).assertEqual('[1,2,3,4]')
    })
    it('flatten_2', 0, () => {
      // flatten
      let result2 = math.flatten(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[1,2,3,4],"size":[4]}')
    })
    it('flatten_3', 0, () => {
      // flatten
      let result3 = math.flatten(math.matrix([[1, -2], [3, 4]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[1,-2,3,4],"size":[4]}')
    })
    it('flatten_4', 0, () => {
      // flatten
      let result4 = math.flatten(math.matrix([[1, 2], [-3, 4]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[1,2,-3,4],"size":[4]}')
    })
    it('flatten_5', 0, () => {
      // flatten
      let result5 = math.flatten([[11, 5], [7, 9]])
      expect(JSON.stringify(result5)).assertEqual('[11,5,7,9]')
    })

    it('forEach_1', 0, () => {
      // forEach
      math.forEach([1, 2, 3], (value: number, index: number, matrix: number[]) => {
        expect(value).assertEqual(matrix[index])
      });
    })
    it('forEach_2', 0, () => {
      // forEach
      math.forEach(math.matrix([1, 2]), (value: number, index: number[], matrix: math.Matrix) => {
        expect(value).assertEqual(matrix.get(index) as number)
      });
    })
    it('forEach_3', 0, () => {
      // forEach
      math.forEach([1, 2], (value: number, index: number, matrix: number[]) => {
        expect(value).assertEqual(matrix[index])
      });
    })
    it('forEach_4', 0, () => {
      // forEach
      math.forEach([1, 3], (value: number, index: number, matrix: number[]) => {
        expect(value).assertEqual(matrix[index])
      });
    })
    it('forEach_5', 0, () => {
      // forEach
      math.forEach([1, 2, 3, 4], (value: number, index: number, matrix: number[]) => {
        expect(value).assertEqual(matrix[index])
      });
    })

    it('inv_1', 0, () => {
      // inv
      let result1 = math.inv([[1, 2], [5, 6]])
      expect(JSON.stringify(result1)).assertEqual('[[-1.5,0.5],[1.25,-0.25]]')
    })
    it('inv_2', 0, () => {
      // inv
      let result2 = math.inv([[1, 2], [3, 4]])
      expect(JSON.stringify(result2)).assertEqual('[[-2,1],[1.5,-0.5]]')
    })
    it('inv_3', 0, () => {
      // inv
      let result3 = math.inv(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[-2,1],[1.5,-0.5]],"size":[2,2]}')
    })
    it('inv_4', 0, () => {
      // inv
      let result4 = math.inv([[2, 3], [4 , 5]])
      expect(JSON.stringify(result4)).assertEqual('[[-2.5,1.5],[2,-1]]')
    })
     it('inv_5', 0, () => {
      // inv
       let result5 = math.inv([[3, 1], [6 , 7]])
      expect(JSON.stringify(result5)).assertEqual('[[0.4666666666666667,-0.06666666666666667],[-0.4,0.2]]')
    })

    it('kron_1', 0, () => {
      // kron
      let result1 = math.kron([1, 2, 3], [2, 4, 5])
      expect(JSON.stringify(result1)).assertEqual('[[2,4,5,4,8,10,6,12,15]]')
    })
    it('kron_2', 0, () => {
      // kron
      let result2 = math.kron([1, 2], [3, 4])
      expect(JSON.stringify(result2)).assertEqual('[[3,4,6,8]]')
    })
    it('kron_3', 0, () => {
      // kron
      let result3 = math.kron(math.matrix([1, 2, 3]), math.matrix([2, 4, 5]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[2,4,5,4,8,10,6,12,15]],"size":[1,9]}')
    })
    it('kron_4', 0, () => {
      // kron
      let result4 = math.kron(math.matrix([1, 2]), math.matrix([3, 4]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[3,4,6,8]],"size":[1,4]}')
    })
    it('kron_5', 0, () => {
      // kron
      let result5 = math.kron([1, 3, 5], [6, 4, 8])
      expect(JSON.stringify(result5)).assertEqual('[[6,4,8,18,12,24,30,20,40]]')
    })

    it('map_1', 0, () => {
      // map
      let result1 = math.map(math.matrix([[1, 2], [3, 4]]), (value: number, index: number[], matrix: math.Matrix) => {
        return value * 1.5
      })
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[1.5,3],[4.5,6]],"size":[2,2]}')
    })
    it('map_2', 0, () => {
      // map
      let result2 = math.map(math.matrix([[1, 2], [3, 4]]), (value: number, index: number[], matrix: math.Matrix) => {
        return value
      })
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,2],[3,4]],"size":[2,2]}')
    })
    it('map_3', 0, () => {
      // map
      let result3 = math.map(math.matrix([[1, 2], [3, 4]]), (value: number, index: number[], matrix: math.Matrix) => {
        return value * 2
      })
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[2,4],[6,8]],"size":[2,2]}')
    })
    it('map_4', 0, () => {
      // map
      let result4 = math.map(math.matrix([[1, 2], [3, 4]]), (value: number, index: number[], matrix: math.Matrix) => {
        return value * 0.5
      })
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[0.5,1],[1.5,2]],"size":[2,2]}')

    })
    it('map_5', 0, () => {
      // map
      let result5 = math.map(math.matrix([[1, 2], [3, 4]]), (value:number, index: number[], matrix: math.Matrix) => {
        return value + 0.5
      })
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[1.5,2.5],[3.5,4.5]],"size":[2,2]}')
    })

    it('ones_1', 0, () => {
      // ones
      let result1 = math.ones([1, 2, 3])
      expect(JSON.stringify(result1)).assertEqual('[[[1,1,1],[1,1,1]]]')
    })
    it('ones_2', 0, () => {
      // ones
      let result2 = math.ones(4)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[1,1,1,1],"size":[4]}')
    })
    it('ones_3', 0, () => {
      // ones
      let result3 = math.ones(math.bignumber(5))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"}],"size":[5]}')
    })
    it('ones_4', 0, () => {
      // ones
      let result4 = math.ones([math.bignumber(1), math.bignumber(2), math.bignumber(3)])
      expect(JSON.stringify(result4)).assertEqual('[[[{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"}],[{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"},{"mathjs":"BigNumber","value":"1"}]]]')
    })
    it('ones_5', 0, () => {
      // ones
      let result5 = math.ones(6)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[1,1,1,1,1,1],"size":[6]}')
    })

    it('partitionSelect_1', 0, () => {
      // partitionSelect
      let result1: math.Matrix = math.partitionSelect([[1, 2], [3, 4]], 0)
      expect(JSON.stringify(result1)).assertEqual('[1,2]')
    })
    it('partitionSelect_2', 0, () => {
      // partitionSelect
      let result2: math.Matrix = math.partitionSelect([[1, 2, 4], [3, 4, 5]], 1)
      expect(JSON.stringify(result2)).assertEqual('[1,2,4]')
    })
    it('partitionSelect_3', 0, () => {
      // partitionSelect
      let result3: math.Matrix = math.partitionSelect([[1, 2], [3, 4], [5, 6]], 0)
      expect(JSON.stringify(result3)).assertEqual('[1,2]')
    })
    it('partitionSelect_4', 0, () => {
      // partitionSelect
      let result4: math.Matrix = math.partitionSelect(math.matrix([1, 2]), 0)
      expect(JSON.stringify(result4)).assertEqual('1')
    })
    it('partitionSelect_5', 0, () => {
      // partitionSelect
      let result5: math.Matrix = math.partitionSelect([[1, 2], [3, 4], [5, 6], [7, 8]], 0)
      expect(JSON.stringify(result5)).assertEqual('[1,2]')
    })

    it('range_1', 0, () => {
      // range
      let result1: math.Matrix = math.range(0, 4)
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[0,1,2,3],"size":[4]}')
    })
    it('range_2', 0, () => {
      // range
      let result2: math.Matrix = math.range(0, 8, 2)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[0,2,4,6],"size":[4]}')
    })
    it('range_3', 0, () => {
      // range
      let result3: math.Matrix = math.range(3, -1, -1)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[3,2,1,0],"size":[4]}')
    })
    it('range_4', 0, () => {
      // range
      let result4: math.Matrix = math.range(0, 4, 1)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[0,1,2,3],"size":[4]}')
    })
    it('range_5', 0, () => {
      // range
      let result5: math.Matrix = math.range(0, 4, 2)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[0,2],"size":[2]}')
    })

    it('reshape_1', 0, () => {
      // reshape
      let result1 = math.reshape([1, 2, 3, 4], [2, 2])
      expect(JSON.stringify(result1)).assertEqual('[[1,2],[3,4]]')
    })
    it('reshape_2', 0, () => {
      // reshape
      let result2 = math.reshape([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3])
      expect(JSON.stringify(result2)).assertEqual('[[1,2,3],[4,5,6],[7,8,9]]')
    })
    it('reshape_3', 0, () => {
      // reshape
      let result3 = math.reshape([1, 2, 3, 4], [1, 4])
      expect(JSON.stringify(result3)).assertEqual('[[1,2,3,4]]')
    })
    it('reshape_4', 0, () => {
      // reshape
      let result4 = math.reshape([1, 2, 3, 4], [4, 1])
      expect(JSON.stringify(result4)).assertEqual('[[1],[2],[3],[4]]')
    })
    it('reshape_5', 0, () => {
      // reshape
      let result5 = math.reshape([1, 2, 3, 4, 5, 6], [2, 3])
      expect(JSON.stringify(result5)).assertEqual('[[1,2,3],[4,5,6]]')
    })

    it('resize_1', 0, () => {
      // resize
      let result1 = math.resize([1, 2, 3, 4], [2, 2])
      expect(JSON.stringify(result1)).assertEqual('[[1,0],[2,0]]')
    })
    it('resize_2', 0, () => {
      // resize
      let result2 = math.resize([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3])
      expect(JSON.stringify(result2)).assertEqual('[[1,0,0],[2,0,0],[3,0,0]]')
    })
    it('resize_3', 0, () => {
      // resize
      let result3 = math.resize([1, 2, 3, 4], [1, 4])
      expect(JSON.stringify(result3)).assertEqual('[[1,0,0,0]]')
    })
    it('resize_4', 0, () => {
      // resize
      let result4 = math.resize([1, 2, 3, 4], [4, 1])
      expect(JSON.stringify(result4)).assertEqual('[[1],[2],[3],[4]]')
    })
    it('resize_5', 0, () => {
      // resize
      let result5 = math.resize([1, 2, 3, 4, 5, 6], [2, 3])
      expect(JSON.stringify(result5)).assertEqual('[[1,0,0],[2,0,0]]')
    })

    it('column_1', 0, () => {
      // column
      let result1 = math.column([[1, 2, 3], [4, 5, 6]], 1)
      expect(JSON.stringify(result1)).assertEqual('[[2],[5]]')
    })
    it('column_2', 0, () => {
      // column
      let result2 = math.column([[3], [4]], 0)
      expect(JSON.stringify(result2)).assertEqual('[[3],[4]]')
    })
    it('column_3', 0, () => {
      // column
      let result3 = math.column([[1, 2], [3, 4]], 0)
      expect(JSON.stringify(result3)).assertEqual('[[1],[3]]')
    })
    it('column_4', 0, () => {
      // column
      let result4 = math.column(math.matrix([[1, 2], [3, 4]]), 0)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[1],[3]],"size":[2,1]}')
    })
    it('column_5', 0, () => {
      // column
      let result5 = math.column([[1, 2], [3, 4]], 1)
      expect(JSON.stringify(result5)).assertEqual('[[2],[4]]')
    })

    it('rotate_1', 0, () => {
      // rotate
      let result1 = math.rotate([1, 2], 1)
      expect(JSON.stringify(result1)).assertEqual('[-1.1426396637476532,1.922075596544176]')
    })
    it('rotate_2', 0, () => {
      // rotate
      let result2 = math.rotate(math.matrix([1, 2]), 0)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[1,2],"size":[2]}')
    })
    it('rotate_3', 0, () => {
      // rotate
      let result3 = math.rotate([3, 6], 1)
      expect(JSON.stringify(result3)).assertEqual('[-3.4279189912429593,5.766226789632528]')
    })
    it('rotate_4', 0, () => {
      // rotate
      let result4 = math.rotate([1, 2], 0)
      expect(JSON.stringify(result4)).assertEqual('[1,2]')
    })
    it('rotate_5', 0, () => {
      // rotate
      let result5 = math.rotate([4, 5], 1)
      expect(JSON.stringify(result5)).assertEqual('[-2.0461457005669237,6.067395468572284]')
    })

    it('size_1', 0, () => {
      // size
      let result1 = math.size(false)
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[],"size":[0]}')
    })
    it('size_2', 0, () => {
      // size
      let result2 = math.size(1)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[],"size":[0]}')
    })
    it('size_3', 0, () => {
      // size
      let result3 = math.size(true)
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[],"size":[0]}')
    })
    it('size_4', 0, () => {
      // size
      let result4 = math.size([1, 2, 3])
      expect(JSON.stringify(result4)).assertEqual('[3]')
    })
    it('size_5', 0, () => {
      // size
      let result5 = math.size(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[2,2],"size":[2]}')
    })

    it('sort_1', 0, () => {
      // sort
      let result1 = math.sort([1, 2, 3], 'desc')
      expect(JSON.stringify(result1)).assertEqual('[3,2,1]')
    })
    it('sort_2', 0, () => {
      // sort
      let result2 = math.sort([1, 3, 2], 'natural')
      expect(JSON.stringify(result2)).assertEqual('[1,2,3]')
    })
    it('sort_3', 0, () => {
      // sort
      let result3 = math.sort([1, 3, 2], 'asc')
      expect(JSON.stringify(result3)).assertEqual('[1,2,3]')
    })
    it('sort_4', 0, () => {
      // sort
      let result4 = math.sort([1, 2, 3, 0, -1], 'desc')
      expect(JSON.stringify(result4)).assertEqual('[3,2,1,0,-1]')
    })
    it('sort_5', 0, () => {
      // sort
      let result5 = math.sort([1, -2, 3, -4, 5, 6], 'natural')
      expect(JSON.stringify(result5)).assertEqual('[-4,-2,1,3,5,6]')
    })

    it('sqrtm_1', 0, () => {
      // sqrtm
      let result1 = math.sqrtm([[33, 24], [48, 57]])
      expect(JSON.stringify(result1)).assertEqual('[[5.000000000000001,2.000000000000001],[4.000000000000002,7.000000000000002]]')
    })
    it('sqrtm_2', 0, () => {
      // sqrtm
      let result2 = math.sqrtm([[7, 10], [15, 22]])
      expect(JSON.stringify(result2)).assertEqual('[[1.5666989036012802,1.7407765595569775],[2.6111648393354665,4.177863742936745]]')
    })
    it('sqrtm_3', 0, () => {
      // sqrtm
      let result3 = math.sqrtm([4])
      expect(JSON.stringify(result3)).assertEqual('[2]')
    })
    it('sqrtm_4', 0, () => {
      // sqrtm
      let result4 = math.sqrtm([16])
      expect(JSON.stringify(result4)).assertEqual('[4]')
    })
    it('sqrtm_5', 0, () => {
      // sqrtm
      let result5 = math.sqrtm([20.25])
      expect(JSON.stringify(result5)).assertEqual('[4.5]')
    })

    it('subset_1', 0, () => {
      // subset
      let result1 = math.subset([[0, 1], [2, 3]], math.index(1, [0, 1]))
      expect(JSON.stringify(result1)).assertEqual('[[2,3]]')
    })
    it('subset_2', 0, () => {
      // subset
      let result2 = math.subset([[0, 1], [2, 3]], math.index(1, 0), 9)
      expect(JSON.stringify(result2)).assertEqual('[[0,1],[9,3]]')
    })
    it('subset_3', 0, () => {
      // subset
      let result3 = math.subset([[0, 1], [2, 3]], math.index(2, [0, 1]), [4, 5])
      expect(JSON.stringify(result3)).assertEqual('[[0,1],[2,3],[4,5]]')
    })
    it('subset_4', 0, () => {
      // subset
      let result4 = math.subset([[0, 1], [2, 3]], math.index(1, 0))
      expect(JSON.stringify(result4)).assertEqual('2')
    })
    it('subset_5', 0, () => {
      // subset
      let result5 = math.subset([[0, 1], [2, 3]], math.index([0, 1], 0))
      expect(JSON.stringify(result5)).assertEqual('[[0],[2]]')
    })

    it('trace_1', 0, () => {
      // trace
      let result1 = math.trace([[1, 2], [3, 4]])
      expect(JSON.stringify(result1)).assertEqual('5')
    })
    it('trace_2', 0, () => {
      // trace
      let result2 = math.trace(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result2)).assertEqual('5')
    })
    it('trace_3', 0, () => {
      // trace
      let result3 = math.trace(math.matrix([[2, 3], [4, 6]]))
      expect(JSON.stringify(result3)).assertEqual('8')
    })
    it('trace_4', 0, () => {
      // trace
      let result4 = math.trace(math.matrix([[1, 3], [5, 8]]))
      expect(JSON.stringify(result4)).assertEqual('9')
    })
    it('trace_5', 0, () => {
      // trace
      let result5 = math.trace(math.matrix([[8, 9], [3, 4]]))
      expect(JSON.stringify(result5)).assertEqual('12')
    })

    it('transpose_1', 0, () => {
      // transpose
      let result1 = math.transpose(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,3],[2,4]],"size":[2,2]}')
    })
    it('transpose_2', 0, () => {
      // transpose
      let result2 = math.transpose(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,3],[2,4]],"size":[2,2]}')
    })
    it('transpose_3', 0, () => {
      // transpose
      let result3 = math.transpose(math.matrix([[2, 3], [4, 6]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[2,4],[3,6]],"size":[2,2]}')
    })
    it('transpose_4', 0, () => {
      // transpose
      let result4 = math.transpose(math.matrix([[1, 3], [5, 8]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,5],[3,8]],"size":[2,2]}')
    })
    it('transpose_5', 0, () => {
      // transpose
      let result5 = math.transpose(math.matrix([[8, 9], [3, 4]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[8,3],[9,4]],"size":[2,2]}')
    })

    it('zeros_1', 0, () => {
      // zeros
      let result1 = math.zeros(4)
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[0,0,0,0],"size":[4]}')
    })
    it('zeros_2', 0, () => {
      // zeros
      let result2 = math.zeros(9)
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"DenseMatrix","data":[0,0,0,0,0,0,0,0,0],"size":[9]}')
    })
    it('zeros_3', 0, () => {
      // zeros
      let result3 = math.zeros([2, 2])
      expect(JSON.stringify(result3)).assertEqual('[[0,0],[0,0]]')
    })
    it('zeros_4', 0, () => {
      // zeros
      let result4 = math.zeros(4, '')
      expect(JSON.stringify(result4)).assertEqual('[0,0,0,0]')
    })
    it('zeros_5', 0, () => {
      // zeros
      let result5 = math.zeros([3, 3])
      expect(JSON.stringify(result5)).assertEqual('[[0,0,0],[0,0,0],[0,0,0]]')
    })

    it('fft_1', 0, () => {
      // fft
      let result1 = math.fft(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":10,"im":0},{"mathjs":"Complex","re":-2,"im":0}],[{"mathjs":"Complex","re":-4,"im":0},{"mathjs":"Complex","re":0,"im":0}]],"size":[2,2]}')
    })
    it('fft_2', 0, () => {
      // fft
      let result2 = math.fft([[1, 2], [3, 4]])
      expect(JSON.stringify(result2)).assertEqual('[[{"mathjs":"Complex","re":10,"im":0},{"mathjs":"Complex","re":-2,"im":0}],[{"mathjs":"Complex","re":-4,"im":0},{"mathjs":"Complex","re":0,"im":0}]]')
    })
    it('fft_3', 0, () => {
      // fft
      let result3 = math.fft(math.matrix([[4, 2], [7, 9]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":22,"im":0},{"mathjs":"Complex","re":0,"im":0}],[{"mathjs":"Complex","re":-10,"im":0},{"mathjs":"Complex","re":4,"im":0}]],"size":[2,2]}')
    })
    it('fft_4', 0, () => {
      // fft
      let result4 = math.fft(math.matrix([[5, 6], [4, 7]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":22,"im":0},{"mathjs":"Complex","re":-4,"im":0}],[{"mathjs":"Complex","re":0,"im":0},{"mathjs":"Complex","re":2,"im":0}]],"size":[2,2]}')
    })
    it('fft_5', 0, () => {
      // fft
      let result5 = math.fft(math.matrix([[3, 4], [5, 6]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":18,"im":0},{"mathjs":"Complex","re":-2,"im":0}],[{"mathjs":"Complex","re":-4,"im":0},{"mathjs":"Complex","re":0,"im":0}]],"size":[2,2]}')
    })

    it('ifft_1', 0, () => {
      // ifft
      let result1 = math.ifft(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":2.5,"im":0},{"mathjs":"Complex","re":-0.5,"im":0}],[{"mathjs":"Complex","re":-1,"im":0},{"mathjs":"Complex","re":0,"im":0}]],"size":[2,2]}')
    })
    it('ifft_2', 0, () => {
      // ifft
      let result2 = math.ifft([[1, 2], [3, 4]])
      expect(JSON.stringify(result2)).assertEqual('[[{"mathjs":"Complex","re":2.5,"im":0},{"mathjs":"Complex","re":-0.5,"im":0}],[{"mathjs":"Complex","re":-1,"im":0},{"mathjs":"Complex","re":0,"im":0}]]')
    })
    it('ifft_3', 0, () => {
      // ifft
      let result3 = math.ifft(math.matrix([[4, 2], [5, 7]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":4.5,"im":0},{"mathjs":"Complex","re":0,"im":0}],[{"mathjs":"Complex","re":-1.5,"im":0},{"mathjs":"Complex","re":1,"im":0}]],"size":[2,2]}')
    })
    it('ifft_4', 0, () => {
      // ifft
      let result4 = math.ifft(math.matrix([[3, 2], [7, 9]]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":5.25,"im":0},{"mathjs":"Complex","re":-0.25,"im":0}],[{"mathjs":"Complex","re":-2.75,"im":0},{"mathjs":"Complex","re":0.75,"im":0}]],"size":[2,2]}')
    })
    it('ifft_5', 0, () => {
      // ifft
      let result5 = math.ifft(math.matrix([[3, 4], [5, 6]]))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"DenseMatrix","data":[[{"mathjs":"Complex","re":4.5,"im":0},{"mathjs":"Complex","re":-0.5,"im":0}],[{"mathjs":"Complex","re":-1,"im":0},{"mathjs":"Complex","re":0,"im":0}]],"size":[2,2]}')
    })


    it('combinations_1', 0, () => {
      // combinations
      let result1 = math.combinations(3, 1)
      expect(JSON.stringify(result1)).assertEqual('3')
    })
    it('combinations_2', 0, () => {
      // combinations
      let result2 = math.combinations(3, 3)
      expect(JSON.stringify(result2)).assertEqual('1')
    })
    it('combinations_3', 0, () => {
      // combinations
      let result3 = math.combinations(5, 2)
      expect(JSON.stringify(result3)).assertEqual('10')
    })
    it('combinations_4', 0, () => {
      // combinations
      let result4 = math.combinations(math.bignumber(6), 2)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"BigNumber","value":"15"}')
    })
    it('combinations_5', 0, () => {
      // combinations
      let result5 = math.combinations(math.bignumber(7), 3)
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"35"}')
    })


    it('factorial_1', 0, () => {
      // factorial
      let result1 = math.factorial(3)
      expect(JSON.stringify(result1)).assertEqual('6')
    })
    it('factorial_2', 0, () => {
      // factorial
      let result2 = math.factorial(math.bignumber(5))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"120"}')
    })
    it('factorial_3', 0, () => {
      // factorial
      let result3 = math.factorial(math.matrix([[1, 2], [3, 4]]))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"DenseMatrix","data":[[1,2],[6,24]],"size":[2,2]}')
    })
    it('factorial_4', 0, () => {
      // factorial
      let result4 = math.factorial([[1, 2], [3, 4]])
      expect(JSON.stringify(result4)).assertEqual('[[1,2],[6,24]]')
    })
    it('factorial_5', 0, () => {
      // factorial
      let result5 = math.factorial([[1, 2], [3, 4], [5, 6]])
      expect(JSON.stringify(result5)).assertEqual('[[1,2],[6,24],[120,720]]')
    })

    it('gamma_1', 0, () => {
      // gamma
      let result1 = math.gamma(3)
      expect(JSON.stringify(result1)).assertEqual('2')
    })
    it('gamma_2', 0, () => {
      // gamma
      let result2 = math.gamma(math.bignumber(5))
      expect(JSON.stringify(result2)).assertEqual('{"mathjs":"BigNumber","value":"24"}')
    })
    it('gamma_3', 0, () => {
      // gamma
      let result3 = math.gamma(math.complex(2, 3))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"Complex","re":-0.08239527266561186,"im":0.09177428743525934}')
    })
    it('gamma_4', 0, () => {
      // gamma
      let result4 = math.gamma(7)
      expect(JSON.stringify(result4)).assertEqual('720')
    })
    it('gamma_5', 0, () => {
      // gamma
      let result5 = math.gamma(math.bignumber(11))
      expect(JSON.stringify(result5)).assertEqual('{"mathjs":"BigNumber","value":"3628800"}')
    })

    it('kldivergence_1', 0, () => {
      // kldivergence
      let result1 = math.kldivergence([1, 2], [3, 4])
      expect(JSON.stringify(result1)).assertEqual('0.018995643791203554')
    })
    it('kldivergence_2', 0, () => {
      // kldivergence
      let result2 = math.kldivergence(math.matrix([1, 2]), math.matrix([3, 4]))
      expect(JSON.stringify(result2)).assertEqual('0.018995643791203554')
    })
    it('kldivergence_3', 0, () => {
      // kldivergence
      let result3 = math.kldivergence([6, 7], [5, 4])
      expect(JSON.stringify(result3)).assertEqual('0.017755208821735438')
    })
    it('kldivergence_4', 0, () => {
      // kldivergence
      let result4 = math.kldivergence([8, 3], [6, 2])
      expect(JSON.stringify(result4)).assertEqual('0.0013509874213508896')
    })
    it('kldivergence_5', 0, () => {
      // kldivergence
      let result5 = math.kldivergence([9, 3], [5, 4])
      expect(JSON.stringify(result5)).assertEqual('0.08123740811186303')
    })

    it('lgamma_1', 0, () => {
      // lgamma
      let result1 = math.lgamma(3)
      expect(JSON.stringify(result1)).assertEqual('0.6931471805599454')
    })
    it('lgamma_2', 0, () => {
      // lgamma
      let result2 = math.lgamma(5)
      expect(JSON.stringify(result2)).assertEqual('3.178053830347945')
    })
    it('lgamma_3', 0, () => {
      // lgamma
      let result3 = math.lgamma(math.complex(2, 3))
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"Complex","re":-2.0928517530927317,"im":2.302396543466868}')
    })
    it('lgamma_4', 0, () => {
      // lgamma
      let result4 = math.lgamma(math.complex(4, 7))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"Complex","re":-3.1323017150686043,"im":11.2821567789266}')
    })
    it('lgamma_5', 0, () => {
      // lgamma
      let result5 = math.lgamma(7)
      expect(JSON.stringify(result5)).assertEqual('6.5792512120101')
    })

    it('multinomial_1', 0, () => {
      // multinomial
      let result1 = math.multinomial([1, 2, 3])
      expect(JSON.stringify(result1)).assertEqual('60')
    })
    it('multinomial_2', 0, () => {
      // multinomial
      let result2 = math.multinomial([1, 2])
      expect(JSON.stringify(result2)).assertEqual('3')
    })
    it('multinomial_3', 0, () => {
      // multinomial
      let result3 = math.multinomial([math.bignumber(4), math.bignumber(7)])
      expect(JSON.stringify(result3)).assertEqual('{"mathjs":"BigNumber","value":"330"}')
    })
    it('multinomial_4', 0, () => {
      // multinomial
      let result4 = math.multinomial([1])
      expect(JSON.stringify(result4)).assertEqual('1')
    })
    it('multinomial_5', 0, () => {
      // multinomial
      let result5 = math.multinomial([1, 2, 3, 4])
      expect(JSON.stringify(result5)).assertEqual('12600')
    })

    it('permutations_1', 0, () => {
      // permutations
      let result1 = math.permutations(3)
      expect(JSON.stringify(result1)).assertEqual('6')
    })
    it('permutations_2', 0, () => {
      // permutations
      let result2 = math.permutations(3, 1)
      expect(JSON.stringify(result2)).assertEqual('3')
    })
    it('permutations_3', 0, () => {
      // permutations
      let result3 = math.permutations(5, 2)
      expect(JSON.stringify(result3)).assertEqual('20')
    })
    it('permutations_4', 0, () => {
      // permutations
      let result4 = math.permutations(4, 3)
      expect(JSON.stringify(result4)).assertEqual('24')
    })
    it('permutations_5', 0, () => {
      // permutations
      let result5 = math.permutations(3, 2)
      expect(JSON.stringify(result5)).assertEqual('6')
    })

    it('pickRandom_1', 0, () => {
      // pickRandom
      let result1 = math.pickRandom([1, 2])
      expect(result1).assertLessOrEqual(2)
      expect(result1).assertLargerOrEqual(1)
    })
    it('pickRandom_2', 0, () => {
      // pickRandom
      let result2 = math.pickRandom([1, 2, 3])
      expect(result2).assertLessOrEqual(3)
      expect(result2).assertLargerOrEqual(1)
    })
    it('pickRandom_3', 0, () => {
      // pickRandom
      let result3 = math.pickRandom([1, 2, 3], 1)
      expect(result3[0]).assertLessOrEqual(3)
      expect(result3[0]).assertLargerOrEqual(1)
    })
    it('pickRandom_4', 0, () => {
      // pickRandom
      let result4 = math.pickRandom([1, 2, 3], 0)
      expect(JSON.stringify(result4)).assertEqual('[]')
    })
    it('pickRandom_5', 0, () => {
      // pickRandom
      let result5 = math.pickRandom([4, 7, 3])
      expect(result5).assertLessOrEqual(7)
      expect(result5).assertLargerOrEqual(3)
    })

    it('random_1', 0, () => {
      // random
      let result1 = math.random([3, 5, -1, 9], -2, 4)
      expect(JSON.stringify(result1)).assertEqual('[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]]')
    })
    it('random_2', 0, () => {
      // random
      let result2 = math.random(math.matrix([1, 2, 3, 4]), 1, 4)
      math.forEach(result2, (value: number, index: number[], matrix: math.Matrix) => {
        expect(value).assertLessOrEqual(4)
        expect(value).assertLargerOrEqual(1)
      })
    })
    it('random_3', 0, () => {
      // random
      let result3 = math.random([3, 5], 1, 4)
      math.forEach(result3, (value: number, index: number, matrix: number[]) => {
        expect(value).assertLessOrEqual(4)
        expect(value).assertLargerOrEqual(1)
      })
    })
    it('random_4', 0, () => {
      // random
      let result4 = math.random(math.matrix([1, 4, 2]), 1, 3)
      math.forEach(result4, (value: number, index: number[], matrix: math.Matrix) => {
        expect(value).assertLessOrEqual(3)
        expect(value).assertLargerOrEqual(1)
      })
    })
    it('random_5', 0, () => {
      // random
      let result5 = math.random(1, 9)
      expect(result5).assertLessOrEqual(9)
      expect(result5).assertLargerOrEqual(1)
    })

    it('randomInt_1', 0, () => {
      // randomInt
      let result1 = math.randomInt(math.matrix([1, 2, 3, 4]))
      expect(JSON.stringify(result1)).assertEqual('{"mathjs":"DenseMatrix","data":[[[[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]],"size":[1,2,3,4]}')
    })
    it('randomInt_2', 0, () => {
      // randomInt
      let result2 = math.randomInt([1, 3, 4])
      expect(JSON.stringify(result2)).assertEqual('[[[0,0,0,0],[0,0,0,0],[0,0,0,0]]]')
    })
    it('randomInt_3', 0, () => {
      // randomInt
      let result3: math.Matrix = math.randomInt(math.matrix([1, 4, 6, 2]), 2, 4)
      math.forEach(result3, (value: number, index: number[], matrix: math.Matrix) => {
        expect(value).assertLessOrEqual(4)
        expect(value).assertLargerOrEqual(2)
      })
    })
    it('randomInt_4', 0, () => {
      // randomInt
      let result4 = math.randomInt(math.matrix([1, 3, 4]), 1)
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[[[0,0,0,0],[0,0,0,0],[0,0,0,0]]],"size":[1,3,4]}')
    })
    it('randomInt_5', 0, () => {
      // randomInt
      let result5 = math.randomInt([1, 2, 3, 4], 0, 4)
      math.forEach(result5, (value: number, index: number, matrix: number[]) => {
        expect(value).assertLessOrEqual(4)
        expect(value).assertLargerOrEqual(0)
      })
    })

    it('compare_1', 0, () => {
      // compare
      let result1 = math.compare(2, 3)
      expect(JSON.stringify(result1)).assertEqual('-1')
    })
    it('compare_2', 0, () => {
      // compare
      let result2 = math.compare('2', '3')
      expect(JSON.stringify(result2)).assertEqual('-1')
    })
    it('compare_3', 0, () => {
      // compare
      let result3 = math.compare([1, 2], [3, 4])
      expect(JSON.stringify(result3)).assertEqual('[-1,-1]')
    })
    it('compare_4', 0, () => {
      // compare
      let result4 = math.compare(math.matrix([2, 3]), math.matrix([-1, 4]))
      expect(JSON.stringify(result4)).assertEqual('{"mathjs":"DenseMatrix","data":[1,-1],"size":[2]}')
    })
    it('compare_5', 0, () => {
      // compare
      let result5 = math.compare(5, 3)
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('compareNatural_1', 0, () => {
      // compareNatural
      const result1 = math.compareNatural('apple', 'banana');
      expect(result1.toString()).assertEqual('-1')
    })
    it('compareNatural_2', 0, () => {
      // compareNatural
      const result2 = math.compareNatural(0, -1);
      expect(result2.toString()).assertEqual('1')
    })
    it('compareNatural_3', 0, () => {
      // compareNatural
      const result3 = math.compareNatural(1, 0);
      expect(result3.toString()).assertEqual('1')
    })
    it('compareNatural_4', 0, () => {
      // compareNatural
      const result4 = math.compareNatural(1, 2);
      expect(result4.toString()).assertEqual('-1')
    })
    it('compareNatural_5', 0, () => {
      // compareNatural
      const result5 = math.compareNatural(1, 1);
      expect(result5.toString()).assertEqual('0')
    })

    it('compareText_1', 0, () => {
      // compareText
      const result1 = math.compareText('apple', 'banana');
      expect(result1.toString()).assertEqual('-1')
    })
    it('compareText_2', 0, () => {
      // compareText
      const result2 = math.compareText('apple', 'app');
      expect(result2.toString()).assertEqual('1')
    })
    it('compareText_3', 0, () => {
      // compareText
      const result3 = math.compareText('ban', 'banana');
      expect(result3.toString()).assertEqual('-1')
    })
    it('compareText_4', 0, () => {
      // compareText
      const result4 = math.compareText('apple', 'apples');
      expect(result4.toString()).assertEqual('-1')
    })
    it('compareText_5', 0, () => {
      // compareText
      const result5 = math.compareText('app', 'app');
      expect(result5.toString()).assertEqual('0')
    })

    it('deepEqual_1', 0, () => {
      // deepEqual
      const result1 = math.deepEqual([1, 2, 3], [1, 2, 3]);
      expect(result1.toString()).assertEqual('true')
    })
    it('deepEqual_2', 0, () => {
      // deepEqual
      const result2 = math.deepEqual([1, 2, 3], [1, -2, 3]);
      expect(result2.toString()).assertEqual('false')
    })
    it('deepEqual_3', 0, () => {
      // deepEqual
      const result3 = math.deepEqual([1, 2, 3], [1, 2]);
      expect(result3.toString()).assertEqual('false')
    })
    it('deepEqual_4', 0, () => {
      // deepEqual
      const result4 = math.deepEqual([1, 2, 3], [1]);
      expect(result4.toString()).assertEqual('false')
    })
    it('deepEqual_5', 0, () => {
      // deepEqual
      const result5 = math.deepEqual([1], [1]);
      expect(result5.toString()).assertEqual('true')
    })

    it('equal_1', 0, () => {
      // equal
      const result1 = math.equal(2 + 2, 4);
      expect(result1.toString()).assertEqual('true')
    })
    it('equal_2', 0, () => {
      // equal
      const result2 = math.equal(2 - 2, 0);
      expect(result2.toString()).assertEqual('true')
    })
    it('equal_3', 0, () => {
      // equal
      const result3 = math.equal(2 * 2, 4);
      expect(result3.toString()).assertEqual('true')
    })
    it('equal_4', 0, () => {
      // equal
      const result4 = math.equal(2 / 2, 1);
      expect(result4.toString()).assertEqual('true')
    })
    it('equal_5', 0, () => {
      // equal
      const result5 = math.equal(2 % 2, 0);
      expect(result5.toString()).assertEqual('true')
    })

    it('equalText_1', 0, () => {
      // equalText
      const result1 = math.equalText('apple', 'apple');
      expect(result1.toString()).assertEqual('true')
    })
    it('equalText_2', 0, () => {
      // equalText
      const result2 = math.equalText('apple', 'orange');
      expect(result2.toString()).assertEqual('false')
    })
    it('equalText_3', 0, () => {
      // equalText
      const result3 = math.equalText('1', '1');
      expect(result3.toString()).assertEqual('true')
    })
    it('equalText_4', 0, () => {
      // equalText
      const result4 = math.equalText('2*2', '2*2');
      expect(result4.toString()).assertEqual('true')
    })
    it('equalText_5', 0, () => {
      // equalText
      const result5 = math.equalText('banana', 'apple');
      expect(result5.toString()).assertEqual('false')
    })

    it('larger_1', 0, () => {
      // larger
      const result1 = math.larger(5, 3);
      expect(result1.toString()).assertEqual('true')
    })
    it('larger_2', 0, () => {
      // larger
      const result2 = math.larger(3, 5);
      expect(result2.toString()).assertEqual('false')
    })
    it('larger_3', 0, () => {
      // larger
      const result3 = math.larger('-5', '3');
      expect(result3.toString()).assertEqual('false')
    })
    it('larger_4', 0, () => {
      // larger
      const result4 = math.larger(0, 0);
      expect(result4.toString()).assertEqual('false')
    })
    it('larger_5', 0, () => {
      // larger
      const result5 = math.larger('5', '3');
      expect(result5.toString()).assertEqual('true')
    })

    it('largerEq_1', 0, () => {
      // largerEq
      const result1 = math.largerEq(5, 5);
      expect(result1.toString()).assertEqual('true')
    })
    it('largerEq_2', 0, () => {
      // largerEq
      const result2 = math.largerEq(-4, 5);
      expect(result2.toString()).assertEqual('false')
    })
    it('largerEq_3', 0, () => {
      // largerEq
      const result3 = math.largerEq('5', '5');
      expect(result3.toString()).assertEqual('true')
    })
    it('largerEq_4', 0, () => {
      // largerEq
      const result4 = math.largerEq('-5', '5');
      expect(result4.toString()).assertEqual('false')
    })
    it('largerEq_5', 0, () => {
      // largerEq
      const result5 = math.largerEq(7, 5);
      expect(result5.toString()).assertEqual('true')
    })

    it('smaller_1', 0, () => {
      // smaller
      const result1 = math.smaller(3, 5);
      expect(result1.toString()).assertEqual('true')
    })
    it('smaller_2', 0, () => {
      // smaller
      const result2 = math.smaller(3, -5);
      expect(result2.toString()).assertEqual('false')
    })
    it('smaller_3', 0, () => {
      // smaller
      const result3 = math.smaller('3', '5');
      expect(result3.toString()).assertEqual('true')
    })
    it('smaller_4', 0, () => {
      // smaller
      const result4 = math.smaller('3', '-5');
      expect(result4.toString()).assertEqual('false')
    })
    it('smaller_5', 0, () => {
      // smaller
      const result5 = math.smaller(3, 3);
      expect(result5.toString()).assertEqual('false')
    })

    it('smallerEq_1', 0, () => {
      // smallerEq
      const result1 = math.smallerEq(5, 5);
      expect(result1.toString()).assertEqual('true')
    })
    it('smallerEq_2', 0, () => {
      // smallerEq
      const result2 = math.smallerEq(3, 5);
      expect(result2.toString()).assertEqual('true')
    })
    it('smallerEq_3', 0, () => {
      // smallerEq
      const result3 = math.smallerEq('5', '5');
      expect(result3.toString()).assertEqual('true')
    })
    it('smallerEq_4', 0, () => {
      // smallerEq
      const result4 = math.smallerEq('3', '5');
      expect(result4.toString()).assertEqual('true')
    })
    it('smallerEq_5', 0, () => {
      // smallerEq
      const result5 = math.smallerEq(5, 9);
      expect(result5.toString()).assertEqual('true')
    })

    it('unequal_1', 0, () => {
      // unequal
      const result1 = math.unequal(2 + 2, 5);
      expect(result1.toString()).assertEqual('true')
    })
    it('unequal_2', 0, () => {
      // unequal
      try {
        const result2 = math.unequal('2 + 2', 5);
      } catch (e) {
        expect(e.message).assertEqual('Cannot convert "2 + 2" to a number')
      }
    })
    it('unequal_3', 0, () => {
      // unequal
      const result3 = math.unequal('2', 5);
      expect(result3.toString()).assertEqual('true')
    })
    it('unequal_4', 0, () => {
      // unequal
      const result4 = math.unequal(2 + 2, 4);
      expect(result4.toString()).assertEqual('false')
    })
    it('unequal_5', 0, () => {
      // unequal
      const result5 = math.unequal('4', 4);
      expect(result5.toString()).assertEqual('false')
    })

    it('setCartesian_1', 0, () => {
      // setCartesian
      const result1 = math.setCartesian([1, 2], [3, 4]);
      expect(JSON.stringify(result1)).assertEqual('[[1,3],[1,4],[2,3],[2,4]]')
    })
    it('setCartesian_2', 0, () => {
      // setCartesian
      const result2 = math.setCartesian([-1, 2], [-3, 4]);
      expect(JSON.stringify(result2)).assertEqual('[[-1,-3],[-1,4],[2,-3],[2,4]]')
    })
    it('setCartesian_3', 0, () => {
      // setCartesian
      const result3 = math.setCartesian([1, -2], [3, 4]);
      expect(JSON.stringify(result3)).assertEqual('[[-2,3],[-2,4],[1,3],[1,4]]')
    })
    it('setCartesian_4', 0, () => {
      // setCartesian
      const result4 = math.setCartesian([1, 2], [3, -4]);
      expect(JSON.stringify(result4)).assertEqual('[[1,-4],[1,3],[2,-4],[2,3]]')
    })
    it('setCartesian_5', 0, () => {
      // setCartesian
      const result5 = math.setCartesian([-1, -2], [3, 4]);
      expect(JSON.stringify(result5)).assertEqual('[[-2,3],[-2,4],[-1,3],[-1,4]]')
    })

    it('setDifference_1', 0, () => {
      // setDifference
      const result1 = math.setDifference([1, 2, 3], [2, 3, 4]);
      expect(JSON.stringify(result1)).assertEqual('[1]')
    })
    it('setDifference_2', 0, () => {
      // setDifference
      const result2 = math.setDifference([1, 2, 3], [2, 3]);
      expect(JSON.stringify(result2)).assertEqual('[1]')
    })
    it('setDifference_3', 0, () => {
      // setDifference
      const result3 = math.setDifference([1, 2, 3], [-2, 3, 4]);
      expect(JSON.stringify(result3)).assertEqual('[1,2]')
    })
    it('setDifference_4', 0, () => {
      // setDifference
      const result4 = math.setDifference([1, 2, 3], [4, 5, 6]);
      expect(JSON.stringify(result4)).assertEqual('[1,2,3]')
    })
    it('setDifference_5', 0, () => {
      // setDifference
      const result5 = math.setDifference([1, 2, 3], [1, 2, 3]);
      expect(JSON.stringify(result5)).assertEqual('[]')
    })

    it('setDistinct_1', 0, () => {
      // setDistinct
      const result1 = math.setDistinct([1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result1)).assertEqual('[1,2,3]')
    })
    it('setDistinct_2', 0, () => {
      // setDistinct
      const result2 = math.setDistinct([3, 3, 3]);
      expect(JSON.stringify(result2)).assertEqual('[3]')
    })
    it('setDistinct_3', 0, () => {
      // setDistinct
      const result3 = math.setDistinct([-1, 2, -2, 3, 3, 3]);
      expect(JSON.stringify(result3)).assertEqual('[-2,-1,2,3]')
    })
    it('setDistinct_4', 0, () => {
      // setDistinct
      const result4 = math.setDistinct([1, 2, 3, 2, 3, 2]);
      expect(JSON.stringify(result4)).assertEqual('[1,2,3]')
    })
    it('setDistinct_5', 0, () => {
      // setDistinct
      const result5 = math.setDistinct([1, 2, 2, 3, 3, -3]);
      expect(JSON.stringify(result5)).assertEqual('[-3,1,2,3]')
    })

    it('setIntersect_1', 0, () => {
      // setIntersect
      const result1 = math.setIntersect([1, 2, 3], [2, 3, 4]);
      expect(JSON.stringify(result1)).assertEqual('[2,3]')
    })
    it('setIntersect_2', 0, () => {
      // setIntersect
      const result2 = math.setIntersect([1, 2, 3], [2, -3, 4]);
      expect(JSON.stringify(result2)).assertEqual('[2]')
    })
    it('setIntersect_3', 0, () => {
      // setIntersect
      const result3 = math.setIntersect([1, -2, 3], [2, 3, 4]);
      expect(JSON.stringify(result3)).assertEqual('[3]')
    })
    it('setIntersect_4', 0, () => {
      // setIntersect
      const result4 = math.setIntersect([1, 2, 3], [2, 4]);
      expect(JSON.stringify(result4)).assertEqual('[2]')
    })
    it('setIntersect_5', 0, () => {
      // setIntersect
      const result5 = math.setIntersect([1, 2, 3], [4]);
      expect(JSON.stringify(result5)).assertEqual('[]')
    })

    it('setIsSubset_1', 0, () => {
      // setIsSubset
      const result1 = math.setIsSubset([1, 2], [1, 2, 3]);
      expect(result1).assertEqual(true)
    })
    it('setIsSubset_2', 0, () => {
      // setIsSubset
      const result2 = math.setIsSubset([1], [1, 2, 3]);
      expect(result2).assertEqual(true)
    })
    it('setIsSubset_3', 0, () => {
      // setIsSubset
      const result3 = math.setIsSubset([1, 2, 3], [1, 2, 3]);
      expect(result3).assertEqual(true)
    })
    it('setIsSubset_4', 0, () => {
      // setIsSubset
      const result4 = math.setIsSubset([1, 2, 0], [1, 2, 3]);
      expect(result4).assertEqual(false)
    })
    it('setIsSubset_5', 0, () => {
      // setIsSubset
      const result5 = math.setIsSubset([1, -2], [1, 2, 3]);
      expect(result5).assertEqual(false)
    })

    it('setMultiplicity_1', 0, () => {
      // setMultiplicity
      const result1 = math.setMultiplicity(1, [1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result1)).assertEqual('1')
    })
    it('setMultiplicity_2', 0, () => {
      // setMultiplicity
      const result2 = math.setMultiplicity(-1, [1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result2)).assertEqual('0')
    })
    it('setMultiplicity_3', 0, () => {
      // setMultiplicity
      const result3 = math.setMultiplicity(0, [1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result3)).assertEqual('0')
    })
    it('setMultiplicity_4', 0, () => {
      // setMultiplicity
      const result4 = math.setMultiplicity(2, [1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result4)).assertEqual('2')
    })
    it('setMultiplicity_5', 0, () => {
      // setMultiplicity
      const result5 = math.setMultiplicity(-1, [1, 2, 2, 3, 3, 3, -1]);
      expect(JSON.stringify(result5)).assertEqual('1')
    })

    it('setPowerset_1', 0, () => {
      // setPowerset
      const result1 = math.setPowerset([1, 2]);
      expect(JSON.stringify(result1)).assertEqual('[[],[1],[2],[1,2]]')
    })
    it('setPowerset_2', 0, () => {
      // setPowerset
      const result2 = math.setPowerset([2, 3]);
      expect(JSON.stringify(result2)).assertEqual('[[],[2],[3],[2,3]]')
    })
    it('setPowerset_3', 0, () => {
      // setPowerset
      const result3 = math.setPowerset([-1, 2]);
      expect(JSON.stringify(result3)).assertEqual('[[],[-1],[2],[-1,2]]')
    })
    it('setPowerset_4', 0, () => {
      // setPowerset
      const result4 = math.setPowerset([1, -2]);
      expect(JSON.stringify(result4)).assertEqual('[[],[-2],[1],[-2,1]]')
    })
    it('setPowerset_5', 0, () => {
      // setPowerset
      const result5 = math.setPowerset([1, 2, 3]);
      expect(JSON.stringify(result5)).assertEqual('[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]')
    })

    it('setSize_1', 0, () => {
      // setSize
      const result1 = math.setSize([1, 2, 3]);
      expect(JSON.stringify(result1)).assertEqual('3')
    })
    it('setSize_2', 0, () => {
      // setSize
      const result2 = math.setSize([1]);
      expect(JSON.stringify(result2)).assertEqual('1')
    })
    it('setSize_3', 0, () => {
      // setSize
      const result3 = math.setSize([1, 2]);
      expect(JSON.stringify(result3)).assertEqual('2')
    })
    it('setSize_4', 0, () => {
      // setSize
      const result4 = math.setSize([[1], [2], [3], [4], [5], [6]]);
      expect(JSON.stringify(result4)).assertEqual('6')
    })
    it('setSize_5', 0, () => {
      // setSize
      const result5 = math.setSize([]);
      expect(JSON.stringify(result5)).assertEqual('0')
    })

    it('setSymDifference_1', 0, () => {
      // setSymDifference
      const result1 = math.setSymDifference([1, 2, 3], [2, 3, 4]);
      expect(JSON.stringify(result1)).assertEqual('[1,4]')
    })
    it('setSymDifference_2', 0, () => {
      // setSymDifference
      const result2 = math.setSymDifference([2, 3], [3, 2]);
      expect(JSON.stringify(result2)).assertEqual('[]')
    })
    it('setSymDifference_3', 0, () => {
      // setSymDifference
      const result3 = math.setSymDifference([1, 2, 3], [4, 3, 2]);
      expect(JSON.stringify(result3)).assertEqual('[1,4]')
    })
    it('setSymDifference_4', 0, () => {
      // setSymDifference
      const result4 = math.setSymDifference([1, -2, 3], [3, 4]);
      expect(JSON.stringify(result4)).assertEqual('[-2,1,4]')
    })
    it('setSymDifference_5', 0, () => {
      // setSymDifference
      const result5 = math.setSymDifference([1, 2, 3], [2, -4]);
      expect(JSON.stringify(result5)).assertEqual('[1,3,-4]')
    })

    it('setUnion_1', 0, () => {
      // setUnion
      const result1 = math.setUnion([1, 2, 3], [2, 3, 4]);
      expect(JSON.stringify(result1)).assertEqual('[1,4,2,3]')
    })
    it('setUnion_2', 0, () => {
      // setUnion
      const result2 = math.setUnion([1, 2, 3], [4]);
      expect(JSON.stringify(result2)).assertEqual('[1,2,3,4]')
    })
    it('setUnion_3', 0, () => {
      // setUnion
      const result3 = math.setUnion([1, 2, 3], [2, 4]);
      expect(JSON.stringify(result3)).assertEqual('[1,3,4,2]')
    })
    it('setUnion_4', 0, () => {
      // setUnion
      const result4 = math.setUnion([1, 2, 3], [3, 2]);
      expect(JSON.stringify(result4)).assertEqual('[1,2,3]')
    })
    it('setUnion_5', 0, () => {
      // setUnion
      const result5 = math.setUnion([1, 2, 3], [-2, 3, 4]);
      expect(JSON.stringify(result5)).assertEqual('[1,2,-2,4,3]')
    })

    it('erf_1', 0, () => {
      // erf
      const result1 = math.erf(0.5);
      expect(result1.toString()).assertEqual('0.5204998778130465')
    })
    it('erf_2', 0, () => {
      // erf
      const result2 = math.erf(1);
      expect(result2.toString()).assertEqual('0.8427007929497148')
    })
    it('erf_3', 0, () => {
      // erf
      const result3 = math.erf(0);
      expect(result3.toString()).assertEqual('0')
    })
    it('erf_4', 0, () => {
      // erf
      const result4 = math.erf(-0.5);
      expect(result4.toString()).assertEqual('-0.5204998778130465')
    })
    it('erf_5', 0, () => {
      // erf
      const result5 = math.erf(5);
      expect(result5.toString()).assertEqual('0.9999999999984626')
    })

    it('mad_1', 0, () => {
      // mad
      const result1: number = math.mad([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('1')
    })
    it('mad_2', 0, () => {
      // mad
      const result2: number = math.mad([1, -2, -3, 4, 5]);
      expect(result2.toString()).assertEqual('3')
    })
    it('mad_3', 0, () => {
      // mad
      const result3: number = math.mad([-1, 2, 3, -4, 5]);
      expect(result3.toString()).assertEqual('3')
    })
    it('mad_4', 0, () => {
      // mad
      const result4: number = math.mad([1, 2, 3, 4, -5]);
      expect(result4.toString()).assertEqual('1')
    })
    it('mad_5', 0, () => {
      // mad
      const result5: number = math.mad([1, -2, 3, -4, 5]);
      expect(result5.toString()).assertEqual('3')
    })

    it('max_1', 0, () => {
      // max
      const result1: number = math.max(1, 2, 3, 4, 5);
      expect(result1.toString()).assertEqual('5')
    })
    it('max_2', 0, () => {
      // max
      const result2: number = math.max(1, -1, 2);
      expect(result2.toString()).assertEqual('2')
    })
    it('max_3', 0, () => {
      // max
      const result3: number = math.max([1, 2, 3, 4, 5]);
      expect(result3.toString()).assertEqual('5')
    })
    it('max_4', 0, () => {
      // max
      const result4: number = math.max(1, -2, 3, -4, 5);
      expect(result4.toString()).assertEqual('5')
    })
    it('max_5', 0, () => {
      // max
      const result5: number = math.max(1, 2, 5, 3, 4);
      expect(result5.toString()).assertEqual('5')
    })

    it('mean_1', 0, () => {
      // mean
      const result1: number = math.mean([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('3')
    })
    it('mean_2', 0, () => {
      // mean
      const result2: number = math.mean([1, -2, -3, 4, 5]);
      expect(result2.toString()).assertEqual('1')
    })
    it('mean_3', 0, () => {
      // mean
      const result3: number = math.mean([1, 2, 3, 4, -5]);
      expect(result3.toString()).assertEqual('1')
    })
    it('mean_4', 0, () => {
      // mean
      const result4: number = math.mean([-1, 2, 3, -4, 5]);
      expect(result4.toString()).assertEqual('1')
    })
    it('mean_5', 0, () => {
      // mean
      const result5: number = math.mean(-1, 2, 3, -4, -5);
      expect(result5.toString()).assertEqual('-1')
    })

    it('median_1', 0, () => {
      // median
      const result1: number = math.median([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('3')
    })
    it('median_2', 0, () => {
      // median
      const result2: number = math.median([-1, 2, 3, -4, 5]);
      expect(result2.toString()).assertEqual('2')
    })
    it('median_3', 0, () => {
      // median
      const result3: number = math.median([1, -2, -3, 4, 5]);
      expect(result3.toString()).assertEqual('1')
    })
    it('median_4', 0, () => {
      // median
      const result4: number = math.median([1, 2, 3, 4, -5]);
      expect(result4.toString()).assertEqual('2')
    })
    it('median_5', 0, () => {
      // median
      const result5: number = math.median(1, 2, 3, 4, 5);
      expect(result5.toString()).assertEqual('3')
    })

    it('min_1', 0, () => {
      // min
      const result1: number = math.min(1, 2, 3, 4, 5);
      expect(result1.toString()).assertEqual('1')
    })
    it('min_2', 0, () => {
      // min
      const result2: number = math.min([1, 2, 3, 4, 5]);
      expect(result2.toString()).assertEqual('1')
    })
    it('min_3', 0, () => {
      // min
      const result3: number = math.min(5, 2, 3, 4, 1);
      expect(result3.toString()).assertEqual('1')
    })
    it('min_4', 0, () => {
      // min
      const result4: number = math.min([5, 2, 3, 4, 1]);
      expect(result4.toString()).assertEqual('1')
    })
    it('min_5', 0, () => {
      // min
      const result5: number = math.min(1, 2, -3, 4, 5);
      expect(result5.toString()).assertEqual('-3')
    })

    it('mode_1', 0, () => {
      // mode
      const result1: number[] = math.mode([1, 2, 2, 3, 3, 3]);
      expect(JSON.stringify(result1)).assertEqual('[3]')
    })
    it('mode_2', 0, () => {
      // mode
      const result2: number[] = math.mode(1, 2, 2, 3, 3, 3);
      expect(JSON.stringify(result2)).assertEqual('[3]')
    })
    it('mode_3', 0, () => {
      // mode
      const result3: number[] = math.mode(1, 2, 3, 2, 3, 3);
      expect(JSON.stringify(result3)).assertEqual('[3]')
    })
    it('mode_4', 0, () => {
      // mode
      const result4: number[] = math.mode([1, 3, 2, 3, 3, 2]);
      expect(JSON.stringify(result4)).assertEqual('[3]')
    })
    it('mode_5', 0, () => {
      // mode
      const result5: number[] = math.mode(1, 2, -2, 3, -3, 3);
      expect(JSON.stringify(result5)).assertEqual('[3]')
    })

    it('prod_1', 0, () => {
      // prod
      const result1: number = math.prod([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('120')
    })
    it('prod_2', 0, () => {
      // prod
      const result2: number = math.prod(1, 2, 3, 4, 5);
      expect(result2.toString()).assertEqual('120')
    })
    it('prod_3', 0, () => {
      // prod
      const result3: number = math.prod([1, 2, -3, 4, 5]);
      expect(result3.toString()).assertEqual('-120')
    })
    it('prod_4', 0, () => {
      // prod
      const result4: number = math.prod([1, -2, -3, 4, 5]);
      expect(result4.toString()).assertEqual('120')
    })
    it('prod_5', 0, () => {
      // prod
      const result5: number = math.prod(1, -2, 3, -4, 5);
      expect(result5.toString()).assertEqual('120')
    })

    it('quantileSeq_1', 0, () => {
      // quantileSeq
      const result1 = math.quantileSeq([1, 2, 3, 4, 5], 0.5);
      expect(result1.toString()).assertEqual('3')
    })
    it('quantileSeq_2', 0, () => {
      // quantileSeq
      const result2 = math.quantileSeq([1, 2, 3, 4, 5], 0.5, true);
      expect(result2.toString()).assertEqual('3')
    })
    it('quantileSeq_3', 0, () => {
      // quantileSeq
      const result3 = math.quantileSeq([1, 2, 3, 4, 5], 0.5, false);
      expect(result3.toString()).assertEqual('3')
    })
    it('quantileSeq_4', 0, () => {
      // quantileSeq
      const result4 = math.quantileSeq([1, 2, 3, 4, 5], 1);
      expect(result4.toString()).assertEqual('5')
    })
    it('quantileSeq_5', 0, () => {
      // quantileSeq
      const result5 = math.quantileSeq([1, -2, 3, -4, 5], 0.5);
      expect(result5.toString()).assertEqual('1')
    })

    it('std_1', 0, () => {
      // std
      const result1 = math.std([1, 2, 3, 4, 5]);
      expect(JSON.stringify(result1)).assertEqual('1.5811388300841898')
    })
    it('std_2', 0, () => {
      // std
      const result2 = math.std([1, 2, 3, 4, 5], 0);
      expect(JSON.stringify(result2)).assertEqual('1.5811388300841898')
    })
    it('std_3', 0, () => {
      // std
      const result3 = math.std([1, 2, 3, 4, 5], 0, 'unbiased');
      expect(JSON.stringify(result3)).assertEqual('1.5811388300841898')
    })
    it('std_4', 0, () => {
      // std
      const result4 = math.std([1, 2, 3, 4, 5], 0, 'uncorrected');
      expect(JSON.stringify(result4)).assertEqual('1.4142135623730951')
    })
    it('std_5', 0, () => {
      // std
      const result5 = math.std([1, 2, 3, 4, 5], 0, 'biased');
      expect(JSON.stringify(result5)).assertEqual('1.2909944487358056')
    })

    it('sum_1', 0, () => {
      // sum
      const result1: number = math.sum([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('15')
    })
    it('sum_2', 0, () => {
      // sum
      const result2: number = math.sum([1, -2, -3, 4, 5]);
      expect(result2.toString()).assertEqual('5')
    })
    it('sum_3', 0, () => {
      // sum
      const result3: number = math.sum([-1, 2, 3, -4, 5]);
      expect(result3.toString()).assertEqual('5')
    })
    it('sum_4', 0, () => {
      // sum
      const result4: number = math.sum(1, 2, -3, 4, 5);
      expect(result4.toString()).assertEqual('9')
    })
    it('sum_5', 0, () => {
      // sum
      const result5: number = math.sum(1, 2, 3, 4, -5);
      expect(result5.toString()).assertEqual('5')
    })

    it('count_1', 0, () => {
      // count
      const result1 = math.count([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('5')
    })
    it('count_2', 0, () => {
      // count
      const result2 = math.count([1, 2, 3]);
      expect(result2.toString()).assertEqual('3')
    })
    it('count_3', 0, () => {
      // count
      const result3 = math.count([1, 3]);
      expect(result3.toString()).assertEqual('2')
    })
    it('count_4', 0, () => {
      // count
      const result4 = math.count([1]);
      expect(result4.toString()).assertEqual('1')
    })
    it('count_5', 0, () => {
      // count
      const result5 = math.count([[1], [2], [3], [4]]);
      expect(result5.toString()).assertEqual('4')
    })

    it('cumsum_1', 0, () => {
      // cumsum
      const result1 = math.cumsum([1, 2, 3, 4, 5]);
      expect(JSON.stringify(result1)).assertEqual('[1,3,6,10,15]')
    })
    it('cumsum_2', 0, () => {
      // cumsum
      const result2 = math.cumsum(1, 2, 3, 4, 5);
      expect(JSON.stringify(result2)).assertEqual('[1,3,6,10,15]')
    })
    it('cumsum_3', 0, () => {
      // cumsum
      const result3 = math.cumsum([1, -2, -3, 4, 5]);
      expect(JSON.stringify(result3)).assertEqual('[1,-1,-4,0,5]')
    })
    it('cumsum_4', 0, () => {
      // cumsum
      const result4 = math.cumsum(1, -2, -3, 4, 5);
      expect(JSON.stringify(result4)).assertEqual('[1,-1,-4,0,5]')
    })
    it('cumsum_5', 0, () => {
      // cumsum
      const result5 = math.cumsum([1, 2, 3, 4, -5]);
      expect(JSON.stringify(result5)).assertEqual('[1,3,6,10,5]')
    })

    it('variance_1', 0, () => {
      // variance
      const result1 = math.variance([1, 2, 3, 4, 5]);
      expect(result1.toString()).assertEqual('2.5')
    })
    it('variance_2', 0, () => {
      // variance
      const result2 = math.variance([1, 2, 3, 4, 5], 0);
      expect(result2.toString()).assertEqual('2.5')
    })
    it('variance_3', 0, () => {
      // variance
      const result3 = math.variance([1, 2, 3, 4, 5], 0, 'unbiased');
      expect(result3.toString()).assertEqual('2.5')
    })
    it('variance_4', 0, () => {
      // variance
      const result4 = math.variance([1, 2, 3, 4, 5], 0, 'uncorrected');
      expect(result4.toString()).assertEqual('2')
    })
    it('variance_5', 0, () => {
      // variance
      const result5 = math.variance([1, 2, 3, 4, 5], 0, 'biased');
      expect(result5.toString()).assertEqual('1.6666666666666667')
    })

    it('format_1', 0, () => {
      // format
      const result1 = math.format(0.1 + 0.2, { precision: 14 });
      expect(result1.toString()).assertEqual('0.3')
    })
    it('format_2', 0, () => {
      // format
      const result2 = math.format(0.1 + 0.2, { precision: 14, notation: 'fixed' });
      expect(result2.toString()).assertEqual('0.30000000000000')
    })
    it('format_3', 0, () => {
      // format
      const result3 = math.format(0.1 + 0.2, { precision: 14, notation: 'exponential'});
      expect(result3.toString()).assertEqual('3.0000000000000e-1')
    })
    it('format_4', 0, () => {
      // format
      const result4 = math.format(0.1 + 0.2, { precision: 14, notation: 'engineering'});
      expect(result4.toString()).assertEqual('300.00000000000e-3')
    })
    it('format_5', 0, () => {
      // format
      const result5 = math.format(0.1 + 0.2, { precision: 14, notation: 'auto'});
      expect(result5.toString()).assertEqual('0.3')
    })

    it('acos_1', 0, () => {
      // acos
      const result1 = math.acos(0.5);
      expect(result1.toString()).assertEqual('1.0471975511965979')
    })
    it('acos_2', 0, () => {
      // acos
      const result2 = math.acos(0);
      expect(result2.toString()).assertEqual('1.5707963267948966')
    })
    it('acos_3', 0, () => {
      // acos
      const result3 = math.acos(math.bignumber(0.123456789123456));
      expect(result3.toString()).assertEqual('1.447023754243771814471859078296904329059864780624845560434717309')
    })
    it('acos_4', 0, () => {
      // acos
      const result4 = math.acos(0.5);
      expect(result4.toString()).assertEqual('1.0471975511965979')
    })
    it('acos_5', 0, () => {
      // acos
      const result5 = math.acos(0.8);
      expect(result5.toString()).assertEqual('0.6435011087932843')
    })

    it('acosh_1', 0, () => {
      // acosh
      const result1 = math.acosh(2);
      expect(result1.toString()).assertEqual('1.3169578969248166')
    })
    it('acosh_2', 0, () => {
      // acosh
      const result2 = math.acosh(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.4919288090375847145686914971099068538405727277702130575943208328')
    })
    it('acosh_3', 0, () => {
      // acosh
      const result3 = math.acosh(1.8);
      expect(result3.toString()).assertEqual('1.1929107309930491')
    })
    it('acosh_4', 0, () => {
      // acosh
      const result4 = math.acosh(1);
      expect(result4.toString()).assertEqual('0')
    })
    it('acosh_5', 0, () => {
      // acosh
      const result5 = math.acosh(2.5);
      expect(result5.toString()).assertEqual('1.566799236972411')
    })

    it('acot_1', 0, () => {
      // acot
      const result1 = math.acot(2);
      expect(result1.toString()).assertEqual('0.4636476090008061')
    })
    it('acot_2', 0, () => {
      // acot
      const result2 = math.acot(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.7273240042765510571706164232843425622981139877407516619500685006')
    })
    it('acot_3', 0, () => {
      // acot
      const result3 = math.acot(0.8);
      expect(result3.toString()).assertEqual('0.8960553845713439')
    })
    it('acot_4', 0, () => {
      // acot
      const result4 = math.acot(1);
      expect(result4.toString()).assertEqual('0.7853981633974483')
    })
    it('acot_5', 0, () => {
      // acot
      const result5 = math.acot(0.5);
      expect(result5.toString()).assertEqual('1.1071487177940904')
    })

    it('acoth_1', 0, () => {
      // acoth
      const result1 = math.acoth(2);
      expect(result1.toString()).assertEqual('0.5493061443340548')
    })
    it('acoth_2', 0, () => {
      // acoth
      const result2 = math.acoth(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('1.422454695724241593166158355407346993461600193149100942223214839')
    })
    it('acoth_3', 0, () => {
      // acoth
      const result3 = math.acoth(1.8);
      expect(result3.toString()).assertEqual('0.6263814842476839')
    })
    it('acoth_4', 0, () => {
      // acoth
      const result4 = math.acoth(1.2);
      expect(result4.toString()).assertEqual('1.1989476363991853')
    })
    it('acoth_5', 0, () => {
      // acoth
      const result5 = math.acoth(1.5);
      expect(result5.toString()).assertEqual('0.8047189562170503')
    })

    it('acsc_1', 0, () => {
      // acsc
      const result1 = math.acsc(2);
      expect(result1.toString()).assertEqual('0.5235987755982989')
    })
    it('acsc_2', 0, () => {
      // acsc
      const result2 = math.acsc(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('1.097586235925750390647663099937697283975413088743339183248408574')
    })
    it('acsc_3', 0, () => {
      // acsc
      const result3 = math.acsc(1.8);
      expect(result3.toString()).assertEqual('0.5890309702162739')
    })
    it('acsc_4', 0, () => {
      // acsc
      const result4 = math.acsc(1.2);
      expect(result4.toString()).assertEqual('0.9851107833377457')
    })
    it('acsc_5', 0, () => {
      // acsc
      const result5 = math.acsc(45);
      expect(result5.toString()).assertEqual('0.022224051618267154')
    })


    it('acsch_1', 0, () => {
      // acsch
      const result1 = math.acsch(2);
      expect(result1.toString()).assertEqual('0.48121182505960347')
    })
    it('acsch_2', 0, () => {
      // acsch
      const result2 = math.acsch(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.801497577192051144678082049419592697653143732734643426653547733')
    })
    it('acsch_3', 0, () => {
      // acsch
      const result3 = math.acsch(0.8);
      expect(result3.toString()).assertEqual('1.0475930126492587')
    })
    it('acsch_4', 0, () => {
      // acsch
      const result4 = math.acsch(1.2);
      expect(result4.toString()).assertEqual('0.7584861371937422')
    })
    it('acsch_5', 0, () => {
      // acsch
      const result5 = math.acsch(0.5);
      expect(result5.toString()).assertEqual('1.4436354751788103')
    })


    it('asec_1', 0, () => {
      // asec
      const result1 = math.asec(2);
      expect(result1.toString()).assertEqual('1.0471975511965979')
    })
    it('asec_2', 0, () => {
      // asec
      const result2 = math.asec(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.4732100908691462285836585917020541581231716109442137272390637223')
    })
    it('asec_3', 0, () => {
      // asec
      const result3 = math.asec(0.8);
      expect(result3.toString()).assertEqual('0.6931471805599451i')
    })
    it('asec_4', 0, () => {
      // asec
      const result4 = math.asec(1.2);
      expect(result4.toString()).assertEqual('0.5856855434571508')
    })
    it('asec_5', 0, () => {
      // asec
      const result5 = math.asec(0.5);
      expect(result5.toString()).assertEqual('1.3169578969248166i')
    })

    it('asech_1', 0, () => {
      // asech
      const result1 = math.asech(0.5);
      expect(result1.toString()).assertEqual('1.3169578969248166')
    })
    it('asech_2', 0, () => {
      // asech
      const result2 = math.asech(math.bignumber(0.123456789123456));
      expect(result2.toString()).assertEqual('2.781178890704787013227688760283895484915587684834851322440829232')
    })
    it('asech_3', 0, () => {
      // asech
      const result3 = math.asech(0.8);
      expect(result3.toString()).assertEqual('0.6931471805599453')
    })
    it('asech_4', 0, () => {
      // asech
      const result4 = math.asech(0.2);
      expect(result4.toString()).assertEqual('2.2924316695611777')
    })
    it('asech_5', 0, () => {
      // asech
      const result5 = math.asech(1);
      expect(result5.toString()).assertEqual('0')
    })

    it('asin_1', 0, () => {
      // asin
      const result1 = math.asin(0.5);
      expect(result1.toString()).assertEqual('0.5235987755982989')
    })
    it('asin_2', 0, () => {
      // asin
      const result2 = math.asin(math.bignumber(0.123456789123456));
      expect(result2.toString()).assertEqual('0.123772572551124804759462613342847113038719919062707350052754987')
    })
    it('asin_3', 0, () => {
      // asin
      const result3 = math.asin(0.2);
      expect(result3.toString()).assertEqual('0.2013579207903308')
    })
    it('asin_4', 0, () => {
      // asin
      const result4 = math.asin(0.8);
      expect(result4.toString()).assertEqual('0.9272952180016123')
    })
    it('asin_5', 0, () => {
      // asin
      const result5 = math.asin(-0.8);
      expect(result5.toString()).assertEqual('-0.9272952180016123')
    })

    it('asinh_1', 0, () => {
      // asinh
      const result1 = math.asinh(2);
      expect(result1.toString()).assertEqual('1.4436354751788103')
    })
    it('asinh_2', 0, () => {
      // asinh
      const result2 = math.asinh(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.9660339848421970583787384819076941704116833983052549444121700908')
    })
    it('asinh_3', 0, () => {
      // asinh
      const result3 = math.asinh(1.2);
      expect(result3.toString()).assertEqual('1.015973134179692')
    })
    it('asinh_4', 0, () => {
      // asinh
      const result4 = math.asinh(2.5);
      expect(result4.toString()).assertEqual('1.6472311463710958')
    })
    it('asinh_5', 0, () => {
      // asinh
      const result5 = math.asinh(3);
      expect(result5.toString()).assertEqual('1.8184464592320668')
    })

    it('atan_1', 0, () => {
      // atan
      const result1 = math.atan(2);
      expect(result1.toString()).assertEqual('1.1071487177940904')
    })
    it('atan_2', 0, () => {
      // atan
      const result2 = math.atan(math.bignumber(1.123456789123456));
      expect(result2.toString()).assertEqual('0.8434723225183455620607052683554088798004707119468012485374037955')
    })
    it('atan_3', 0, () => {
      // atan
      const result3 = math.atan(1.2);
      expect(result3.toString()).assertEqual('0.8760580505981934')
    })
    it('atan_4', 0, () => {
      // atan
      const result4 = math.atan(2.5);
      expect(result4.toString()).assertEqual('1.1902899496825317')
    })
    it('atan_5', 0, () => {
      // atan
      const result5 = math.atan(3);
      expect(result5.toString()).assertEqual('1.2490457723982544')
    })

    it('atan2_1', 0, () => {
      // atan2
      const result1 = math.atan2(2, 1);
      expect(result1.toString()).assertEqual('1.1071487177940904')
    })
    it('atan2_2', 0, () => {
      // atan2
      const result2 = math.atan2(-2, 1);
      expect(result2.toString()).assertEqual('-1.1071487177940904')
    })
    it('atan2_3', 0, () => {
      // atan2
      const result3 = math.atan2(2, 1.5);
      expect(result3.toString()).assertEqual('0.9272952180016122')
    })
    it('atan2_4', 0, () => {
      // atan2
      const result4 = math.atan2(2, 0.5);
      expect(result4.toString()).assertEqual('1.3258176636680326')
    })
    it('atan2_5', 0, () => {
      // atan2
      const result5 = math.atan2(2, -1);
      expect(result5.toString()).assertEqual('2.0344439357957027')
    })

    it('atanh_1', 0, () => {
      // atanh
      const result1 = math.atanh(0.5);
      expect(result1.toString()).assertEqual('0.5493061443340548')
    })
    it('atanh_2', 0, () => {
      // atanh
      const result2 = math.atanh(math.bignumber(0.123456789123456));
      expect(result2.toString()).assertEqual('0.1240898137222890274232113305766244050381852828051158282386081066')
    })
    it('atanh_3', 0, () => {
      // atanh
      const result3 = math.atanh(0.12);
      expect(result3.toString()).assertEqual('0.12058102840844404')
    })
    it('atanh_4', 0, () => {
      // atanh
      const result4 = math.atanh(0.8);
      expect(result4.toString()).assertEqual('1.0986122886681098')
    })
    it('atanh_5', 0, () => {
      // atanh
      const result5 = math.atanh(-0.8);
      expect(result5.toString()).assertEqual('-1.0986122886681098')
    })

    it('cos_1', 0, () => {
      // cos
      const result1 = math.cos(math.pi / 3);
      expect(result1.toString()).assertEqual('0.5000000000000001')
    })
    it('cos_2', 0, () => {
      // cos
      const result2 = math.cos(math.pi / 2);
      expect(result2.toString()).assertEqual('6.123233995736766e-17')
    })
    it('cos_3', 0, () => {
      // cos
      const result3 = math.cos(math.pi / 4);
      expect(result3.toString()).assertEqual('0.7071067811865476')
    })
    it('cos_4', 0, () => {
      // cos
      const result4 = math.cos(0);
      expect(result4.toString()).assertEqual('1')
    })
    it('cos_5', 0, () => {
      // cos
      const result5 = math.cos(1);
      expect(result5.toString()).assertEqual('0.5403023058681398')
    })

    it('cosh_1', 0, () => {
      // cosh
      const result1 = math.cosh(1);
      expect(result1.toString()).assertEqual('1.5430806348152437')
    })
    it('cosh_2', 0, () => {
      // cosh
      const result2 = math.cosh(math.bignumber(0.123456789123456));
      expect(result2.toString()).assertEqual('1.007630473714477928744567672478075038430306896055123868009681705')
    })
    it('cosh_3', 0, () => {
      // cosh
      const result3 = math.cosh(0.8);
      expect(result3.toString()).assertEqual('1.3374349463048447')
    })
    it('cosh_4', 0, () => {
      // cosh
      const result4 = math.cosh(1.2);
      expect(result4.toString()).assertEqual('1.8106555673243747')
    })
    it('cosh_5', 0, () => {
      // cosh
      const result5 = math.cosh(1.5);
      expect(result5.toString()).assertEqual('2.352409615243247')
    })

    it('cot_1', 0, () => {
      // cot
      const result1 = math.cot(math.pi / 4);
      expect(result1.toString()).assertEqual('1.0000000000000002')
    })
    it('cot_2', 0, () => {
      // cot
      const result2 = math.cot(math.pi / 2);
      expect(result2.toString()).assertEqual('6.123233995736766e-17')
    })
    it('cot_3', 0, () => {
      // cot
      const result3 = math.cot(math.pi / 3);
      expect(result3.toString()).assertEqual('0.577350269189626')
    })
    it('cot_4', 0, () => {
      // cot
      const result4 = math.cot(math.pi / 5);
      expect(result4.toString()).assertEqual('1.3763819204711738')
    })
    it('cot_5', 0, () => {
      // cot
      const result5 = math.cot(math.pi / 8);
      expect(result5.toString()).assertEqual('2.414213562373095')
    })

    it('coth_1', 0, () => {
      // coth
      const result1 = math.coth(1);
      expect(result1.toString()).assertEqual('1.3130352854993312')
    })
    it('coth_2', 0, () => {
      // coth
      const result2 = math.coth(2);
      expect(result2.toString()).assertEqual('1.0373147207275482')
    })
    it('coth_3', 0, () => {
      // coth
      const result3 = math.coth(1.2);
      expect(result3.toString()).assertEqual('1.1995375441923508')
    })
    it('coth_4', 0, () => {
      // coth
      const result4 = math.coth(0.8);
      expect(result4.toString()).assertEqual('1.5059407020437066')
    })
    it('coth_5', 0, () => {
      // coth
      const result5 = math.coth(0.5);
      expect(result5.toString()).assertEqual('2.163953413738653')
    })

    it('csc_1', 0, () => {
      // csc
      const result1 = math.csc(math.pi / 6);
      expect(result1.toString()).assertEqual('2.0000000000000004')
    })
    it('csc_2', 0, () => {
      // csc
      const result2 = math.csc(math.pi / 4);
      expect(result2.toString()).assertEqual('1.4142135623730951')
    })
    it('csc_3', 0, () => {
      // csc
      const result3 = math.csc(math.pi / 3);
      expect(result3.toString()).assertEqual('1.1547005383792517')
    })
    it('csc_4', 0, () => {
      // csc
      const result4 = math.csc(math.pi / 2);
      expect(result4.toString()).assertEqual('1')
    })
    it('csc_5', 0, () => {
      // csc
      const result5 = math.csc(math.pi / 5);
      expect(result5.toString()).assertEqual('1.7013016167040798')
    })

    it('csch_1', 0, () => {
      // csch
      const result1 = math.csch(1);
      expect(result1.toString()).assertEqual('0.8509181282393216')
    })
    it('csch_2', 0, () => {
      // csch
      const result2 = math.csch(0.5);
      expect(result2.toString()).assertEqual('1.9190347513349437')
    })
    it('csch_3', 0, () => {
      // csch
      const result3 = math.csch(math.bignumber('1.234567890123456'));
      expect(result3.toString()).assertEqual('0.6357415241049707957014321480921356354516210535862880604661287277')
    })
    it('csch_4', 0, () => {
      // csch
      const result4 = math.csch(1.2);
      expect(result4.toString()).assertEqual('0.6624879771943155')
    })
    it('csch_5', 0, () => {
      // csch
      const result5 = math.csch(1.5);
      expect(result5.toString()).assertEqual('0.46964244059522464')
    })

    it('sec_1', 0, () => {
      // sec
      const result1 = math.sec(math.pi / 3);
      expect(result1.toString()).assertEqual('1.9999999999999996')
    })
    it('sec_2', 0, () => {
      // sec
      const result2 = math.sec(2);
      expect(result2.toString()).assertEqual('-2.402997961722381')
    })
    it('sec_3', 0, () => {
      // sec
      const result3 = math.sec(math.pi / 4);
      expect(result3.toString()).assertEqual('1.414213562373095')
    })
    it('sec_4', 0, () => {
      // sec
      const result4 = math.sec(math.pi / 5);
      expect(result4.toString()).assertEqual('1.2360679774997896')
    })
    it('sec_5', 0, () => {
      // sec
      const result5 = math.sec(math.bignumber('12.34567890123456'));
      expect(result5.toString()).assertEqual('1.024856601889707098256759984753504599080896852496688047907249545')
    })

    it('sech_1', 0, () => {
      // sech
      const result1 = math.sech(1);
      expect(result1.toString()).assertEqual('0.6480542736638855')
    })
    it('sech_2', 0, () => {
      // sech
      const result2 = math.sech(1.2);
      expect(result2.toString()).assertEqual('0.5522861542782048')
    })
    it('sech_3', 0, () => {
      // sech
      const result3 = math.sech(1.5);
      expect(result3.toString()).assertEqual('0.4250960349422805')
    })
    it('sech_4', 0, () => {
      // sech
      const result4 = math.sech(2);
      expect(result4.toString()).assertEqual('0.2658022288340797')
    })
    it('sech_5', 0, () => {
      // sech
      const result5 = math.sech(math.bignumber('1.234567890123456'));
      expect(result5.toString()).assertEqual('0.5365017630341793440355736518162142064479033797688161480407054283')
    })

    it('sin_1', 0, () => {
      // sin
      const result1 = math.sin(math.pi / 6);
      expect(result1.toString()).assertEqual('0.49999999999999992')
    })
    it('sin_2', 0, () => {
      // sin
      const result2 = math.sin(math.pi / 2);
      expect(result2.toString()).assertEqual('1')
    })
    it('sin_3', 0, () => {
      // sin
      const result3 = math.sin(math.pi / 3);
      expect(result3.toString()).assertEqual('0.8660254037844386')
    })
    it('sin_4', 0, () => {
      // sin
      const result4 = math.sin(math.pi / 4);
      expect(result4.toString()).assertEqual('0.7071067811865475')
    })
    it('sin_5', 0, () => {
      // sin
      const result5 = math.sin(math.bignumber('1.234567890123456'));
      expect(result5.toString()).assertEqual('0.9440057250452663177934709291331742014963531069160728721949729743')
    })

    it('sinh_1', 0, () => {
      // sinh
      const result1 = math.sinh(1);
      expect(result1.toString()).assertEqual('1.1752011936438014')
    })
    it('sinh_2', 0, () => {
      // sinh
      const result2 = math.sinh(0.8);
      expect(result2.toString()).assertEqual('0.888105982187623')
    })
    it('sinh_3', 0, () => {
      // sinh
      const result3 = math.sinh(math.bignumber('1.234567890123456'));
      expect(result3.toString()).assertEqual('1.572966311124400417031317283967973679905214880088449904338847762')
    })
    it('sinh_4', 0, () => {
      // sinh
      const result4 = math.sinh(0.5);
      expect(result4.toString()).assertEqual('0.5210953054937474')
    })
    it('sinh_5', 0, () => {
      // sinh
      const result5 = math.sinh(1.2);
      expect(result5.toString()).assertEqual('1.5094613554121725')
    })

    it('tan_1', 0, () => {
      // tan
      const result1 = math.tan(math.pi / 4);
      expect(result1.toString()).assertEqual('0.99999999999999984')
    })
    it('tan_2', 0, () => {
      // tan
      const result2 = math.tan(1.2);
      expect(result2.toString()).assertEqual('2.5721516221263188')
    })
    it('tan_3', 0, () => {
      // tan
      const result3 = math.tan(math.pi / 3);
      expect(result3.toString()).assertEqual('1.7320508075688767')
    })
    it('tan_4', 0, () => {
      // tan
      const result4 = math.tan(math.pi / 6);
      expect(result4.toString()).assertEqual('0.5773502691896257')
    })
    it('tan_5', 0, () => {
      // tan
      const result5 = math.tan(math.bignumber('1.234567890123456'));
      expect(result5.toString()).assertEqual('2.861238404038386114914925630446297436642015309105079356379181748')
    })

    it('tanh_1', 0, () => {
      // tanh
      const result1 = math.tanh(1);
      expect(result1.toString()).assertEqual('0.7615941559557649')
    })
    it('tanh_2', 0, () => {
      // tanh
      const result2 = math.tanh(math.bignumber('1.234567890123456'));
      expect(result2.toString()).assertEqual('0.8438991991116102927595250135792206544520474312082494377833605523')
    })
    it('tanh_3', 0, () => {
      // tanh
      const result3 = math.tanh(1.2);
      expect(result3.toString()).assertEqual('0.8336546070121552')
    })
    it('tanh_4', 0, () => {
      // tanh
      const result4 = math.tanh(0.8);
      expect(result4.toString()).assertEqual('0.6640367702678489')
    })
    it('tanh_5', 0, () => {
      // tanh
      const result5 = math.tanh(0.5);
      expect(result5.toString()).assertEqual('0.46211715726000976')
    })

    it('to_1', 0, () => {
      // to
      const b = math.unit('0.1m')
      const result1 = math.to(b, 'inch') // 3.9370078740157 inch
      expect(result1.toString()).assertEqual('3.9370078740157486 inch')
    })
    it('to_2', 0, () => {
      // to
      const result2 = math.to(math.unit('2 inch'), 'cm')             // returns Unit 5.08 cm
      expect(result2.toString()).assertEqual('5.08 cm')
    })
    it('to_3', 0, () => {
      // to
      const result3 = math.to(math.unit('2 inch'), math.unit('cm'))  // returns Unit 5.08 cm
      expect(result3.toString()).assertEqual('5.08 cm')
    })
    it('to_4', 0, () => {
      // to
      const result4 = math.to(math.unit(16, 'bytes'), 'bits')        // returns Unit 128 bits
      expect(result4.toString()).assertEqual('128 bits')
    })
    it('to_5', 0, () => {
      // to
      const result5 = math.to(math.unit('5m'), math.unit('cm'))      //  a)
      expect(result5.toString()).assertEqual('500 cm')
    })


    it('isNumber_1', 0, () => {
      // isNumber
      const result1 = math.isNumber(42);
      expect(result1.toString()).assertEqual('true')
    })
    it('isNumber_2', 0, () => {
      // isNumber
      const result2 = math.isNumber('42');
      expect(result2.toString()).assertEqual('false')
    })
    it('isNumber_3', 0, () => {
      // isNumber
      const result3 = math.isNumber(.42);
      expect(result3.toString()).assertEqual('true')
    })
    it('isNumber_4', 0, () => {
      // isNumber
      const result4 = math.isNumber('.42');
      expect(result4.toString()).assertEqual('false')
    })
    it('isNumber_5', 0, () => {
      // isNumber
      const result5 = math.isNumber("a");
      expect(result5.toString()).assertEqual('false')
    })

    it('isBigNumber_1', 0, () => {
      // isBigNumber
      const result1 = math.isBigNumber(math.bignumber(42));
      expect(result1.toString()).assertEqual('true')
    })
    it('isBigNumber_2', 0, () => {
      // isBigNumber
      const result2 = math.isBigNumber(1234567891234223);
      expect(result2.toString()).assertEqual('false')
    })
    it('isBigNumber_3', 0, () => {
      // isBigNumber
      const result3 = math.isBigNumber(math.bignumber(1234567891234223));
      expect(result3.toString()).assertEqual('true')
    })
    it('isBigNumber_4', 0, () => {
      // isBigNumber
      const result4 = math.isBigNumber(math.bignumber(0));
      expect(result4.toString()).assertEqual('true')
    })
    it('isBigNumber_5', 0, () => {
      // isBigNumber
      const result5 = math.isBigNumber(0);
      expect(result5.toString()).assertEqual('false')
    })

    it('isComplex_1', 0, () => {
      // isComplex
      const result1 = math.isComplex(math.complex(2, 3));
      expect(result1.toString()).assertEqual('true')
    })
    it('isComplex_2', 0, () => {
      // isComplex
      const result2 = math.isComplex(math.complex(-2, 3));
      expect(result2.toString()).assertEqual('true')
    })
    it('isComplex_3', 0, () => {
      // isComplex
      const result3 = math.isComplex(math.complex(2, -3));
      expect(result3.toString()).assertEqual('true')
    })
    it('isComplex_4', 0, () => {
      // isComplex
      const result4 = math.isComplex(math.complex(2, 0));
      expect(result4.toString()).assertEqual('true')
    })
    it('isComplex_5', 0, () => {
      // isComplex
      const result5 = math.isComplex(math.complex(0, 3));
      expect(result5.toString()).assertEqual('true')
    })

    it('isFraction_1', 0, () => {
      // isFraction
      const result1 = math.isFraction(math.fraction(1, 2));
      expect(result1.toString()).assertEqual('true')
    })
    it('isFraction_2', 0, () => {
      // isFraction
      const result2 = math.isFraction(math.fraction(-1, 2));
      expect(result2.toString()).assertEqual('true')
    })
    it('isFraction_3', 0, () => {
      // isFraction
      const result3 = math.isFraction(math.fraction(1, -2));
      expect(result3.toString()).assertEqual('true')
    })
    it('isFraction_4', 0, () => {
      // isFraction
      const result4 = math.isFraction(math.fraction(3, 2));
      expect(result4.toString()).assertEqual('true')
    })
    it('isFraction_5', 0, () => {
      // isFraction
      const result5 = math.isFraction(0);
      expect(result5.toString()).assertEqual('false')
    })

    it('isUnit_1', 0, () => {
      // isUnit
      const result1 = math.isUnit(math.unit('5 cm'));
      expect(result1.toString()).assertEqual('true')
    })
    it('isUnit_2', 0, () => {
      // isUnit
      const result2 = math.isUnit(math.unit('5 m/s'));
      expect(result2.toString()).assertEqual('true')
    })
    it('isUnit_3', 0, () => {
      // isUnit
      const result3 = math.isUnit(math.unit('5 s'));
      expect(result3.toString()).assertEqual('true')
    })
    it('isUnit_4', 0, () => {
      // isUnit
      const result4 = math.isUnit(math.unit('5 m'));
      expect(result4.toString()).assertEqual('true')
    })
    it('isUnit_5', 0, () => {
      // isUnit
      const result5 = math.isUnit('5 m');
      expect(result5.toString()).assertEqual('false')
    })

    it('isString_1', 0, () => {
      // isString
      const result1 = math.isString('Hello, world!');
      expect(result1.toString()).assertEqual('true')
    })
    it('isString_2', 0, () => {
      // isString
      const result2 = math.isString('[1,2,3]');
      expect(result2.toString()).assertEqual('true')
    })
    it('isString_3', 0, () => {
      // isString
      const result3 = math.isString('1 + 2');
      expect(result3.toString()).assertEqual('true')
    })
    it('isString_4', 0, () => {
      // isString
      const result4 = math.isString(math.boolean(1));
      expect(result4.toString()).assertEqual('false')
    })
    it('isString_5', 0, () => {
      // isString
      const result5 = math.isString(math.bignumber('12345'));
      expect(result5.toString()).assertEqual('false')
    })

    it('isMatrix_1', 0, () => {
      // isMatrix
      const result1 = math.isMatrix(math.matrix([]));
      expect(result1.toString()).assertEqual('true')
    })
    it('isMatrix_2', 0, () => {
      // isMatrix
      const result2 = math.isMatrix(math.matrix([1, 2, 3]));
      expect(result2.toString()).assertEqual('true')
    })
    it('isMatrix_3', 0, () => {
      // isMatrix
      const result3 = math.isMatrix(math.matrix([[1, 2], [3, 4]]));
      expect(result3.toString()).assertEqual('true')
    })
    it('isMatrix_4', 0, () => {
      // isMatrix
      const result4 = math.isMatrix(math.matrix([1]));
      expect(result4.toString()).assertEqual('true')
    })
    it('isMatrix_5', 0, () => {
      // isMatrix
      const result5 = math.isMatrix([[1,2],[3,4]]);
      expect(result5.toString()).assertEqual('false')
    })

    it('isCollection_1', 0, () => {
      // isCollection
      const result1 = math.isCollection(math.matrix([]));
      expect(result1.toString()).assertEqual('true')
    })
    it('isCollection_2', 0, () => {
      // isCollection
      const result2 = math.isCollection(math.matrix([1, 2, 3]));
      expect(result2.toString()).assertEqual('true')
    })
    it('isCollection_3', 0, () => {
      // isCollection
      const result3 = math.isCollection(math.matrix([[1, 2], [3, 4]]));
      expect(result3.toString()).assertEqual('true')
    })
    it('isCollection_4', 0, () => {
      // isCollection
      const result4 = math.isCollection(math.matrix([1]));
      expect(result4.toString()).assertEqual('true')
    })
    it('isCollection_5', 0, () => {
      // isCollection
      const result5 = math.isCollection([[1,2],[3,4]]);
      expect(result5.toString()).assertEqual('true')
    })

    it('isDenseMatrix_1', 0, () => {
      // isDenseMatrix
      const result1 = math.isDenseMatrix(math.matrix([]));
      expect(result1.toString()).assertEqual('true')
    })
    it('isDenseMatrix_2', 0, () => {
      // isDenseMatrix
      const result2 = math.isDenseMatrix(math.matrix([1, 2, 3]));
      expect(result2.toString()).assertEqual('true')
    })
    it('isDenseMatrix_3', 0, () => {
      // isDenseMatrix
      const result3 = math.isDenseMatrix(math.matrix([[1, 2], [3, 4]]));
      expect(result3.toString()).assertEqual('true')
    })
    it('isDenseMatrix_4', 0, () => {
      // isDenseMatrix
      const result4 = math.isDenseMatrix(math.matrix([1]));
      expect(result4.toString()).assertEqual('true')
    })
    it('isDenseMatrix_5', 0, () => {
      // isDenseMatrix
      const result5 = math.isDenseMatrix([[1,2],[3,4]]);
      expect(result5.toString()).assertEqual('false')
    })

    it('isSparseMatrix_1', 0, () => {
      // isSparseMatrix
      const result1 = math.isSparseMatrix(math.matrix([]));
      expect(result1.toString()).assertEqual('false')
    })
    it('isSparseMatrix_2', 0, () => {
      // isSparseMatrix
      const result2 = math.isSparseMatrix(math.matrix([1, 2, 3]));
      expect(result2.toString()).assertEqual('false')
    })
    it('isSparseMatrix_3', 0, () => {
      // isSparseMatrix
      const result3 = math.isSparseMatrix(math.matrix([[1, 0, 0, 0], [0, 5, 0, 0], [2, 0, 0, 7]]));
      expect(result3.toString()).assertEqual('false')
    })
    it('isSparseMatrix_4', 0, () => {
      // isSparseMatrix
      const result4 = math.isSparseMatrix(math.matrix([1]));
      expect(result4.toString()).assertEqual('false')
    })
    it('isSparseMatrix_5', 0, () => {
      // isSparseMatrix
      const result5 = math.isSparseMatrix([[1,2],[3,4]]);
      expect(result5.toString()).assertEqual('false')
    })

    it('isBoolean_1', 0, () => {
      // isBoolean
      const result1 = math.isBoolean(0);
      expect(result1.toString()).assertEqual('false')
    })
    it('isBoolean_2', 0, () => {
      // isBoolean
      const result2 = math.isBoolean(1);
      expect(result2.toString()).assertEqual('false')
    })
    it('isBoolean_3', 0, () => {
      // isBoolean
      const result3 = math.isBoolean(true);
      expect(result3.toString()).assertEqual('true')
    })
    it('isBoolean_4', 0, () => {
      // isBoolean
      const result4 = math.isBoolean(false);
      expect(result4.toString()).assertEqual("true")
    })
    it('isBoolean_5', 0, () => {
      // isBoolean
      const result5 = math.isBoolean('true');
      expect(result5.toString()).assertEqual('false')
    })

    it('isFunction_1', 0, () => {
      // isFunction
      const result2 = math.isFunction(()=>{return true;});
      expect(result2.toString()).assertEqual('true')
    })
    it('isFunction_2', 0, () => {
      // isFunction
      const result3 = math.isFunction((n: string) => {return true;});
      expect(result3.toString()).assertEqual('true')
    })
    it('isFunction_3', 0, () => {
      // isFunction
      const result4 = math.isFunction(false);
      expect(result4.toString()).assertEqual('false')
    })
    it('isFunction_4', 0, () => {
      // isFunction
      const result5 = math.isFunction('true');
      expect(result5.toString()).assertEqual('false')
    })
    it('isFunction_5', 0, () => {
      // isFunction
      const result1 = math.isFunction(() => {});
      expect(result1.toString()).assertEqual('true')
    })

    it('isDate_1', 0, () => {
      // isDate
      const result1 = math.isDate(new Date());
      expect(result1.toString()).assertEqual('true')
    })
    it('isDate_2', 0, () => {
      // isDate
      const result2 = math.isDate('12/30');
      expect(result2.toString()).assertEqual('false')
    })
    it('isDate_3', 0, () => {
      // isDate
      const result3 = math.isDate(new Date(''));
      expect(result3.toString()).assertEqual('true')
    })
    it('isDate_4', 0, () => {
      // isDate
      const result4 = math.isDate('15:40');
      expect(result4.toString()).assertEqual('false')
    })
    it('isDate_5', 0, () => {
      // isDate
      const result5 = math.isDate(new Date('1501931099251'));
      expect(result5.toString()).assertEqual('true')
    })

    it('isRegExp_1', 0, () => {
      // isRegExp
      const result1 = math.isRegExp(new RegExp('\wd'));
      expect(result1.toString()).assertEqual('true')
    })
    it('isRegExp_2', 0, () => {
      // isRegExp
      const result2 = math.isRegExp(new RegExp('php/g'));
      expect(result2.toString()).assertEqual('true')
    })
    it('isRegExp_3', 0, () => {
      // isRegExp
      const result3 = math.isRegExp(new RegExp('hello/g'));
      expect(result3.toString()).assertEqual('true')
    })
    it('isRegExp_4', 0, () => {
      // isRegExp
      const result4 = math.isRegExp(new RegExp('/123/'));
      expect(result4.toString()).assertEqual('true')
    })
    it('isRegExp_5', 0, () => {
      // isRegExp
      const result5 = math.isRegExp('/^[abc]$/');
      expect(result5.toString()).assertEqual('false')
    })

    it('isObject_1', 0, () => {
      // isObject
      const result1 = math.isObject(math.matrix());
      expect(result1.toString()).assertEqual('false')
    })
    it('isObject_2', 0, () => {
      // isObject
      const result2 = math.isObject([]);
      expect(result2.toString()).assertEqual('false')
    })
    it('isObject_3', 0, () => {
      // isObject
      const result3 = math.isObject(math.fraction(1, 2));
      expect(result3.toString()).assertEqual('false')
    })
    it('isObject_4', 0, () => {
      // isObject
      const result4 = math.isObject(math.bignumber(2));
      expect(result4.toString()).assertEqual('false')
    })
    it('isObject_5', 0, () => {
      // isObject
      const result5 = math.isObject(math.parse('2'));
      expect(result5.toString()).assertEqual('false')
    })

    it('isNull_1', 0, () => {
      // isNull
      const result1 = math.isNull(null);
      expect(result1.toString()).assertEqual('true')
    })
    it('isNull_2', 0, () => {
      // isNull
      let a: ESObject;
      const result2 = math.isNull(a);
      expect(result2.toString()).assertEqual('false')
    })
    it('isNull_3', 0, () => {
      // isNull
      const result3 = math.isNull('null');
      expect(result3.toString()).assertEqual('false')
    })
    it('isNull_4', 0, () => {
      // isNull
      const result4 = math.isNull(undefined);
      expect(result4.toString()).assertEqual('false')
    })
    it('isNull_5', 0, () => {
      // isNull
      const result5 = math.isNull(1);
      expect(result5.toString()).assertEqual('false')
    })

    it('isUndefined_1', 0, () => {
      // isUndefined
      const result1 = math.isUndefined(undefined);
      expect(result1.toString()).assertEqual('true')
    })
    it('isUndefined_2', 0, () => {
      // isUndefined
      const result2 = math.isUndefined(null);
      expect(result2.toString()).assertEqual('false')
    })
    it('isUndefined_3', 0, () => {
      // isUndefined
      const result3 = math.isUndefined(0);
      expect(result3.toString()).assertEqual('false')
    })
    it('isUndefined_4', 0, () => {
      // isUndefined
      let a: ESObject;
      const result4 = math.isUndefined(a);
      expect(result4.toString()).assertEqual('true')
    })
    it('isUndefined_5', 0, () => {
      // isUndefined
      const result5 = math.isUndefined('null');
      expect(result5.toString()).assertEqual('false')
    })

    it('clone_1', 0, () => {
      // clone
      const result1 = math.clone(3.5);
      expect(result1.toString()).assertEqual('3.5')
    })
    it('clone_2', 0, () => {
      // clone
      const result2 = math.clone('2 - 4i');
      expect(result2.toString()).assertEqual('2 - 4i')
    })
    it('clone_3', 0, () => {
      // clone
      const result3 = math.clone('45 deg');
      expect(result3.toString()).assertEqual('45 deg')
    })
    it('clone_4', 0, () => {
      // clone
      const result4 = math.clone([[1, 2], [3, 4]]);
      expect(JSON.stringify(result4)).assertEqual('[[1,2],[3,4]]')
    })
    it('clone_5', 0, () => {
      // clone
      const result5 = math.clone("hello world");
      expect(result5.toString()).assertEqual('hello world')
    })

    it('hasNumericValue_1', 0, () => {
      // hasNumericValue
      const result1 = math.hasNumericValue(2);
      expect(result1.toString()).assertEqual('true')
    })
    it('hasNumericValue_2', 0, () => {
      // hasNumericValue
      const result2 = math.hasNumericValue('2');
      expect(result2.toString()).assertEqual('true')
    })
    it('hasNumericValue_3', 0, () => {
      // hasNumericValue
      const result3 = math.hasNumericValue(0);
      expect(result3.toString()).assertEqual('true')
    })
    it('hasNumericValue_4', 0, () => {
      // hasNumericValue
      const result4 = math.hasNumericValue(math.bignumber(500));
      expect(result4.toString()).assertEqual('true')
    })
    it('hasNumericValue_5', 0, () => {
      // hasNumericValue
      const result5 = math.hasNumericValue(math.complex('2-4i'));
      expect(result5.toString()).assertEqual('false')
    })

    it('isInteger_1', 0, () => {
      // isInteger
      const result1 = math.isInteger(1);
      expect(result1.toString()).assertEqual('true')
    })
    it('isInteger_2', 0, () => {
      // isInteger
      const result2 = math.isInteger(0.1);
      expect(result2.toString()).assertEqual('false')
    })
    it('isInteger_3', 0, () => {
      // isInteger
      const result3 = math.isInteger(-1);
      expect(result3.toString()).assertEqual('true')
    })
    it('isInteger_4', 0, () => {
      // isInteger
      const result4 = math.isInteger(math.bignumber(0));
      expect(result4.toString()).assertEqual('true')
    })
    it('isInteger_5', 0, () => {
      // isInteger
      const result5 = math.isInteger([1,2]);
      expect(result5.toString()).assertEqual('true,true')
    })

    it('isNaN_1', 0, () => {
      // isNaN
      const result1 = math.isNaN(0);
      expect(result1.toString()).assertEqual('false')
    })
    it('isNaN_2', 0, () => {
      // isNaN
      const result2 = math.isNaN(math.bignumber());
      expect(result2.toString()).assertEqual('false')
    })
    it('isNaN_3', 0, () => {
      // isNaN
      const result3 = math.isNaN(math.fraction(1));
      expect(result3.toString()).assertEqual('false')
    })
    it('isNaN_4', 0, () => {
      // isNaN
      const result4 = math.isNaN(math.fraction(math.bignumber()));
      expect(result4.toString()).assertEqual('false')
    })
    it('isNaN_5', 0, () => {
      // isNaN
      const result5 = math.isNaN(NaN);
      expect(result5.toString()).assertEqual('true')
    })

    it('isNegative_1', 0, () => {
      // isNegative
      const result1 = math.isNegative(-1);
      expect(result1.toString()).assertEqual('true')
    })
    it('isNegative_2', 0, () => {
      // isNegative
      const result2 = math.isNegative(-0.1);
      expect(result2.toString()).assertEqual('true')
    })
    it('isNegative_3', 0, () => {
      // isNegative
      const result3 = math.isNegative(math.bignumber(-1));
      expect(result3.toString()).assertEqual('true')
    })
    it('isNegative_4', 0, () => {
      // isNegative
      const result4 = math.isNegative(0);
      expect(result4.toString()).assertEqual('false')
    })
    it('isNegative_5', 0, () => {
      // isNegative
      const result5 = math.isNegative([2, -3]);
      expect(result5.toString()).assertEqual('false,true')
    })

    it('isNumeric_1', 0, () => {
      // isNumeric
      const result1 = math.isNumeric(1);
      expect(result1.toString()).assertEqual('true')
    })
    it('isNumeric_2', 0, () => {
      // isNumeric
      const result2 = math.isNumeric(math.bignumber(0));
      expect(result2.toString()).assertEqual('true')
    })
    it('isNumeric_3', 0, () => {
      // isNumeric
      const result3 = math.isNumeric(true);
      expect(result3.toString()).assertEqual('true')
    })
    it('isNumeric_4', 0, () => {
      // isNumeric
      const result4 = math.isNumeric(math.fraction(1));
      expect(result4.toString()).assertEqual('true')
    })
    it('isNumeric_5', 0, () => {
      // isNumeric
      const result5 = math.isNumeric(-0.5);
      expect(result5.toString()).assertEqual('true')
    })

    it('isPositive_1', 0, () => {
      // isPositive
      const result1 = math.isPositive(0);
      expect(result1.toString()).assertEqual('false')
    })
    it('isPositive_2', 0, () => {
      // isPositive
      const result2 = math.isPositive(-1);
      expect(result2.toString()).assertEqual('false')
    })
    it('isPositive_3', 0, () => {
      // isPositive
      const result3 = math.isPositive(0.5);
      expect(result3.toString()).assertEqual('true')
    })
    it('isPositive_4', 0, () => {
      // isPositive
      const result4 = math.isPositive(math.bignumber(1));
      expect(result4.toString()).assertEqual('true')
    })
    it('isPositive_5', 0, () => {
      // isPositive
      const result5 = math.isPositive([1, 2]);
      expect(result5.toString()).assertEqual('true,true')
    })

    it('isPrime_1', 0, () => {
      // isPrime
      const result1 = math.isPrime(-1);
      expect(result1.toString()).assertEqual('false')
    })
    it('isPrime_2', 0, () => {
      // isPrime
      const result2 = math.isPrime(0.1);
      expect(result2.toString()).assertEqual('false')
    })
    it('isPrime_3', 0, () => {
      // isPrime
      const result3 = math.isPrime(1);
      expect(result3.toString()).assertEqual('false')
    })
    it('isPrime_4', 0, () => {
      // isPrime
      const result4 = math.isPrime(math.bignumber(-2));
      expect(result4.toString()).assertEqual('false')
    })
    it('isPrime_5', 0, () => {
      // isPrime
      const result5 = math.isPrime([-1, 0]);
      expect(result5.toString()).assertEqual('false,false')
    })

    it('isZero_1', 0, () => {
      // isZero
      const result1 = math.isZero(0);
      expect(result1.toString()).assertEqual('true')
    })
    it('isZero_2', 0, () => {
      // isZero
      const result2 = math.isZero(1);
      expect(result2.toString()).assertEqual('false')
    })
    it('isZero_3', 0, () => {
      // isZero
      const result3 = math.isZero(math.bignumber(-1));
      expect(result3.toString()).assertEqual('false')
    })
    it('isZero_4', 0, () => {
      // isZero
      const result4 = math.isZero([-1, -0]);
      expect(result4.toString()).assertEqual('false,true')
    })
    it('isZero_5', 0, () => {
      // isZero
      const result5 = math.isZero(math.fraction(1));
      expect(result5.toString()).assertEqual('false')
    })

    it('typeOf_1', 0, () => {
      // typeOf
      const result1 = math.typeOf('abc');
      expect(result1.toString()).assertEqual('string')
    })
    it('typeOf_2', 0, () => {
      // typeOf
      const result2 = math.typeOf(1);
      expect(result2.toString()).assertEqual('number')
    })
    it('typeOf_3', 0, () => {
      // typeOf
      const result3 = math.typeOf(true);
      expect(result3.toString()).assertEqual('boolean')
    })
    it('typeOf_4', 0, () => {
      // typeOf
      const result4 = math.typeOf(false);
      expect(result4.toString()).assertEqual('boolean')
    })
    it('typeOf_5', 0, () => {
      // typeOf
      const result5 = math.typeOf(new Date());
      expect(result5.toString()).assertEqual('Date')
    })
  })
}