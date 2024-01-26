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

import hilog from '@ohos.hilog';
import { describe, expect, it } from '@ohos/hypium'
import { BooleanValue, ExprContext, NumberValue, StringValue, xpathParse } from 'xslt-processor/src/xpath.js'
import { xmlValue, } from 'xslt-processor/src/util.js'
import { xmlParse } from 'xslt-processor/src/dom.js'
import { getKeys, numExpr } from './Stdlib';

export default function xpathTest() {
  describe('XPathTest', () => {
    const expr = [
      "@*",
      "@*|node()",
      "/descendant-or-self::div",
      "/div",
      "//div",
      "/descendant-or-self::node()/child::para",
      "substring('12345', 0, 3)",
      "//title | //link",
      "$x//title",
      // "$x/title",  // TODO(mesch): parsing of this expression is broken
      "id('a')//title",
      "//*[@about]",
      "count(descendant::*)",
      "count(descendant::*) + count(ancestor::*)",
      "concat(substring-before(@image,'marker'),'icon',substring-after(@image,'marker'))",
      "@*|text()",
      "*|/",
      "source|destination",
      "$page != 'to' and $page != 'from'",
      "substring-after(icon/@image, '/mapfiles/marker')",
      "substring-before($str, $c)",
      "$page = 'from'",
      "segments/@time",
      "child::para",
      "child::*",
      "child::text()",
      "child::node()",
      "attribute::name",
      "attribute::*",
      "descendant::para",
      "ancestor::div",
      "ancestor-or-self::div",
      "descendant-or-self::para",
      "self::para",
      "child::chapter/descendant::para",
      "child::*/child::para",
      "/",
      "/descendant::para",
      "/descendant::olist/child::item",
      "child::para[position()=1]",
      "child::para[position()=last()]",
      "child::para[position()=last()-1]",
      "child::para[position()>1]",
      "following-sibling::chapter[position()=1]",
      "preceding-sibling::chapter[position()=1]",
      "/descendant::figure[position()=42]",
      "/child::doc/child::chapter[position()=5]/child::section[position()=2]",
      "child::para[attribute::type='warning']",
      "child::para[attribute::type='warning'][position()=5]",
      "child::para[position()=5][attribute::type='warning']",
      "child::chapter[child::title='Introduction']",
      "child::chapter[child::title]",
      "child::*[self::chapter or self::appendix]",
      "child::*[self::chapter or self::appendix][position()=last()]",
      "count(//*[id='u1']|//*[id='u2'])",
      "count(//*[id='u1']|//*[class='u'])",
      "count(//*[class='u']|//*[class='u'])",
      "count(//*[class='u']|//*[id='u1'])",

      // Axis expressions
      "count(//*[@id='self']/ancestor-or-self::*)",
      "count(//*[@id='self']/ancestor::*)",
      "count(//*[@id='self']/attribute::*)",
      "count(//*[@id='self']/child::*)",
      "count(//*[@id='self']/descendant-or-self::*)",
      "count(//*[@id='self']/descendant::*)",
      "count(//*[@id='self']/following-sibling::*)",
      "count(//*[@id='self']/following::*)",
      "//*[@id='self']/parent::*/@id",
      "count(//*[@id='self']/preceding-sibling::*)",
      "count(//*[@id='self']/preceding::*)",
      "//*[@id='self']/self::*/@id",

      // (Japanese)
      "/descendant-or-self::\u90e8\u5206",
      "//\u90e8\u5206",
      "substring('\uff11\uff12\uff13\uff14\uff15', 0, 3)",
      "//\u30bf\u30a4\u30c8\u30eb | //\u30ea\u30f3\u30af",
      "$\u8b0e//\u30bf\u30a4\u30c8\u30eb",
      "//*[@\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3]",
      "concat(substring-before(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'),'\u30a2\u30a4\u30b3\u30f3',substring-after(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'))",
      "\u30bd\u30fc\u30b9|\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3",
      "$\u30da\u30fc\u30b8 != '\u307e\u3067' and $\u30da\u30fc\u30b8 != '\u304b\u3089'",
      "substring-after(\u30a2\u30a4\u30b3\u30f3/@\u30a4\u30e1\u30fc\u30b8, '/\u5730\u56f3\u30d5\u30a1\u30a4\u30eb/\u76ee\u5370')",
      "substring-before($\u6587\u5b57\u5217, $\u6587\u5b57)",
      "$\u30da\u30fc\u30b8 = '\u304b\u3089'",
      "\u30bb\u30b0\u30e1\u30f3\u30c8/@\u6642\u523b",
      "child::\u6bb5\u843d",
      "attribute::\u540d\u524d",
      "descendant::\u6bb5\u843d",
      "ancestor::\u90e8\u5206",
      "ancestor-or-self::\u90e8\u5206",
      "descendant-or-self::\u6bb5\u843d",
      "self::\u6bb5\u843d",
      "child::\u7ae0/descendant::\u6bb5\u843d",
      "child::*/child::\u6bb5\u843d",
      "/descendant::\u6bb5\u843d",
      "/descendant::\u9806\u5e8f\u30ea\u30b9\u30c8/child::\u9805\u76ee",
      "child::\u6bb5\u843d[position()=1]",
      "child::\u6bb5\u843d[position()=last()]",
      "child::\u6bb5\u843d[position()=last()-1]",
      "child::\u6bb5\u843d[position()>1]",
      "following-sibling::\u7ae0[position()=1]",
      "preceding-sibling::\u7ae0[position()=1]",
      "/descendant::\u56f3\u8868[position()=42]",
      "/child::\u6587\u66f8/child::\u7ae0[position()=5]/child::\u7bc0[position()=2]",
      "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
      "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a'][position()=5]",
      "child::\u6bb5\u843d[position()=5][attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
      "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb='\u306f\u3058\u3081\u306b']",
      "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb]",
      "child::*[self::\u7ae0 or self::\u4ed8\u9332]",
      "child::*[self::\u7ae0 or self::\u4ed8\u9332][position()=last()]",

      //Selenium bugs
      "id('nested1')/div[1]//input[2]",
      "id('foo')//div[contains(@id, 'useful')]//input",
      "(//table[@class='stylee'])//th[text()='theHeaderText']/../td",

      // The following are all expressions that used to occur in google
      // maps XSLT templates.
      "$address",
      "$address=string(/page/user/defaultlocation)",
      "$count-of-snippet-of-url = 0",
      "$daddr",
      "$form",
      "$form = 'from'",
      "$form = 'to'",
      "$form='near'",
      "$home",
      "$i",
      "$i > $page and $i < $page + $range",
      "$i < $page and $i >= $page - $range",
      "$i < @max",
      "$i <= $page",
      "$i + 1",
      "$i = $page",
      "$i = 1",
      "$info = position() or (not($info) and position() = 1)",
      "$is-first-order",
      "$is-first-order and $snippets-exist",
      "$more",
      "$more > 0",
      "$near-point",
      "$page",
      "$page != 'from'",
      "$page != 'to'",
      "$page != 'to' and $page != 'from'",
      "$page > 1",
      "$page = 'basics'",
      "$page = 'details'",
      "$page = 'from'",
      "$page = 'to'",
      "$page='from'",
      "$page='to'",
      "$r >= 0.5",
      "$r >= 1",
      "$r - 0",
      "$r - 1",
      "$r - 2",
      "$r - 3",
      "$r - 4",
      "$saddr",
      "$sources",
      "$sources[position() < $details]",
      "$src",
      "$str",
      "\"'\"",
      "(//location[string(info/references/reference[1]/url)=string($current-url)]/info/references/reference[1])[1]",
      "(not($count-of-snippet-of-url = 0) and (position() = 1) or not($current-url = //locations/location[position() = $last-pos]//reference[1]/url))",
      "(not($info) and position() = 1) or $info = position()",
      ".",
      "../@arg0",
      "../@filterpng",
      "/page/@filterpng",
      "4",
      "@attribution",
      "@id",
      "@max > @num",
      "@meters > 16093",
      "@name",
      "@start div @num + 1",
      "@url",
      "ad",
      "address/line",
      "adsmessage",
      "attr",
      "boolean(location[@id='near'][icon/@image])",
      "bubble/node()",
      "calltoaction/node()",
      "category",
      "contains($str, $c)",
      "count(//location[string(info/references/reference[1]/url)=string($current-url)]//snippet)",
      "count(//snippet)",
      "count(attr)",
      "count(location)",
      "count(structured/source) > 1",
      "description/node()",
      "destination",
      "destinationAddress",
      "domain",
      "false()",
      "icon/@class != 'noicon'",
      "icon/@image",
      "info",
      "info/address/line",
      "info/distance",
      "info/distance and $near-point",
      "info/distance and info/phone and $near-point",
      "info/distance or info/phone",
      "info/panel/node()",
      "info/phone",
      "info/references/reference[1]",
      "info/references/reference[1]/snippet",
      "info/references/reference[1]/url",
      "info/title",
      "info/title/node()",
      "line",
      "location",
      "location[@id!='near']",
      "location[@id='near'][icon/@image]",
      "location[position() > $numlocations div 2]",
      "location[position() <= $numlocations div 2]",
      "locations",
      "locations/location",
      "near",
      "node()",
      "not($count-of-snippets = 0)",
      "not($form = 'from')",
      "not($form = 'near')",
      "not($form = 'to')",
      "not(../@page)",
      "not(structured/source)",
      "notice",
      "number(../@info)",
      "number(../@items)",
      "number(/page/@linewidth)",
      "page/ads",
      "page/directions",
      "page/error",
      "page/overlay",
      "page/overlay/locations/location",
      "page/refinements",
      "page/request/canonicalnear",
      "page/request/near",
      "page/request/query",
      "page/spelling/suggestion",
      "page/user/defaultlocation",
      "phone",
      "position()",
      "position() != 1",
      "position() != last()",
      "position() > 1",
      "position() < $details",
      "position()-1",
      "query",
      "references/@total",
      "references/reference",
      "references/reference/domain",
      "references/reference/url",
      "reviews/@positive div (reviews/@positive + reviews/@negative) * 5",
      "reviews/@positive div (reviews/@positive + reviews/@negative) * (5)",
      "reviews/@total",
      "reviews/@total > 1",
      "reviews/@total > 5",
      "reviews/@total = 1",
      "segments/@distance",
      "segments/@time",
      "segments/segment",
      "shorttitle/node()",
      "snippet",
      "snippet/node()",
      "source",
      "sourceAddress",
      "sourceAddress and destinationAddress",
      "string(../@daddr)",
      "string(../@form)",
      "string(../@page)",
      "string(../@saddr)",
      "string(info/title)",
      "string(page/request/canonicalnear) != ''",
      "string(page/request/near) != ''",
      "string-length($address) > $linewidth",
      "structured/@total - $details",
      "structured/source",
      "structured/source[@name]",
      "substring($address, 1, $linewidth - 3)",
      "substring-after($str, $c)",
      "substring-after(icon/@image, '/mapfiles/marker')",
      "substring-before($str, $c)",
      "tagline/node()",
      "targetedlocation",
      "title",
      "title/node()",
      "true()",
      "url",
      "visibleurl"
    ];


    // eval an xpath expression to a single node
    const evalNodeSet = (expr: ESObject, ctx: ESObject): ESObject => {
      const expr1: ESObject = xpathParse(expr);
      const e: ESObject = expr1.evaluate(ctx);
      return e.nodeSetValue();
    }

    const doTestEvalDom = (xml: ESObject, page: ESObject, location: ESObject, lat: ESObject, latValue: ESObject, lon: ESObject, lonValue: ESObject) => {
      const slashPage = `/${page}`;
      const slashPageLocationAtLat = `/${page}/${location}/@${lat}`;
      const slashPageLocationAtLon = `/${page}/${location}/@${lon}`;

      const ctx: ESObject = new ExprContext(xmlParse(xml));

      let ns: ESObject = evalNodeSet(page, ctx);
      expect(ns.length).assertEqual(1);

      ns = evalNodeSet(slashPage, ctx);
      expect(ns.length).assertEqual(1);

      expect(evalNodeSet('/', ctx).length).assertEqual(1);

      expect(evalNodeSet('/', ctx)[0].nodeName).assertEqual('#document');

      expect(evalNodeSet(slashPage, ctx)[0].nodeName).assertEqual(page);

      let n: ESObject = evalNodeSet(slashPageLocationAtLat, ctx)[0];
      expect(n.nodeName).assertEqual(lat);
      expect(n.nodeValue).assertEqual(latValue);

      n = evalNodeSet(slashPageLocationAtLon, ctx)[0];
      expect(n.nodeName).assertEqual(lon);
      expect(n.nodeValue).assertEqual(lonValue);
    }


    it('can_parse_the_xpaths', 0, () => {
      for (let i = 0; i < expr.length; ++i) {
        expect(!!xpathParse(expr[i])).assertTrue()
      }
    })

    it('can_evaluate_variables_on_a_HTML_context', 0, () => {
      const bodyEl: ESObject = xmlParse(
        `<body>
              <div id="test1"></div>
              <div id="testid">test1</div>
              <a id="jshref" href="javascript:doFoo('a', 'b')">javascript href with spaces</a>
              <span id="u1" class="u"></span>
              <span id="u2" class="u"></span>
              <span id="u3" class="u"></span>
              <span style="visibility: visible">do not squint!</span>
            </body>`);

      for (const e of numExpr) {
        let ctx: ESObject = new ExprContext(bodyEl);
        ctx.setCaseInsensitive(true);
        if (e[2] && typeof e[2] == 'object') {
          let keys = getKeys(e[2])
          for(let i = 0;i < keys.length; i++){
            const v: ESObject = e[2][keys[i]];
            if (typeof v == 'number') {
              ctx.setVariable(keys[i], new NumberValue(v));
            } else if (typeof v == 'string') {
              ctx.setVariable(keys[i], new StringValue(v));
            } else if (typeof v == 'boolean') {
              ctx.setVariable(keys[i], new BooleanValue(v));
            }
          }
        }
        // allow exceptions to be caught and asserted upon
        let result: ESObject;
        try {
          result = xpathParse(e[0]).evaluate(ctx);
        } catch (ex) {
          expect(ex).assertEqual(e[1]);
          continue;
        }
        if (typeof e[1] == 'number') {
          expect(e[1]).assertEqual(result.numberValue());
        } else if (typeof e[1] == 'boolean') {
          expect(e[1]).assertEqual(result.booleanValue());
        } else if (typeof e[1] == 'string' ) {
          expect(e[1]).assertEqual(result.stringValue());
        }
      }
    })

    it('can_evaluate_axis_on_a_context', 0, () => {
      // For the following axis expressions, we need full control over the
      // entire document. We verify that they give the
      // right results by counting the nodes in their result node sets. For
      // the axes that contain only one node, we check that we found the
      // right node using the id. For axes that contain elements, we only
      // count the elements, so we don't have to worry about whitespace
      // normalization for the text nodes.
      const axisTests = [
        ["count(//*[@id='self']/ancestor-or-self::*)", 3],
        ["count(//*[@id='self']/ancestor::*)", 2],
        ["count(//*[@id='self']/attribute::node())", 1],
        ["count(//*[@id='self']/child::*)", 1],
        ["count(//*[@id='self']/descendant-or-self::*)", 3],
        ["count(//*[@id='self']/descendant::*)", 2],
        ["count(//*[@id='self']/following-sibling::*)", 3],
        ["count(//*[@id='self']/@*/following-sibling::*)", 0],
        ["count(//*[@id='self']/following::*)", 4],
        ["//*[@id='self']/parent::*/@id", "parent"],
        ["count(/parent::*)", 0],
        ["count(//*[@id='self']/preceding-sibling::*)", 1],
        ["count(//*[@id='self']/@*/preceding-sibling::*)", 0],
        ["count(//*[@id='self']/preceding::*)", 2],
        ["//*[@id='self']/self::*/@id", "self"]
      ];

      const xml = [
        '<page>',
        ' <p></p>',
        ' <list id="parent">',
        '  <item></item>',
        '  <item id="self"><d><d></d></d></item>',
        '  <item></item>',
        '  <item></item>',
        '  <item></item>',
        ' </list>',
        ' <f></f>',
        '</page>'
      ].join("");
      const ctx: ESObject = new ExprContext(xmlParse(xml));

      for (const e of axisTests) {
        const result: ESObject = xpathParse(e[0]).evaluate(ctx);
        if (typeof e[1] == 'number') {
          expect(e[1]).assertEqual(result.numberValue());
        } else if (typeof e[1] == 'string') {
          expect(e[1]).assertEqual(result.stringValue());
        } else if (typeof e[1] == 'boolean') {
          expect(e[1]).assertEqual(result.booleanValue());
        }
      }

    })

    it('can_handle_attribute_asterisk', 0, () => {
      const ctx: ESObject = new ExprContext(xmlParse('<x a="1" b="1"><y><z></z></y></x>'));
      const expr: ESObject = xpathParse("count(/x/@*)");
      expect(2).assertEqual(expr.evaluate(ctx).numberValue());
    })

    it('can_eval_dom', 0, () => {
      const xml = [
        '<page>',
        '<request>',
        '<q>new york</q>',
        '</request>',
        '<location lat="100" lon="200"/>',
        '</page>'
      ].join('');

      doTestEvalDom(xml, 'page', 'location', 'lat', '100', 'lon', '200');
    })

    it('can_eval_Japanese_dom', 0, () => {
      const xml = [
        '<\u30da\u30fc\u30b8>',
        '<\u30ea\u30af\u30a8\u30b9\u30c8>',
        '<\u30af\u30a8\u30ea>\u6771\u4eac</\u30af\u30a8\u30ea>',
        '</\u30ea\u30af\u30a8\u30b9\u30c8>',
        '<\u4f4d\u7f6e \u7def\u5ea6="\u4e09\u5341\u4e94" ',
        "\u7d4c\u5ea6='\u767e\u56db\u5341'/>",
        '</\u30da\u30fc\u30b8>'
      ].join('');

      doTestEvalDom(xml, '\u30da\u30fc\u30b8', '\u4f4d\u7f6e',
        '\u7def\u5ea6', '\u4e09\u5341\u4e94',
        '\u7d4c\u5ea6', '\u767e\u56db\u5341');
    })

    it('can_handle_whitespace', 0, () => {
      const xmlString = '<div><p> Here is some <strong>funky </strong> text' +
        '<ul> <li>that contains</li> <li> spaces and stuff</li> </ul></p></div>';
      const value: ESObject = xmlValue(xmlParse(xmlString));
      expect(' Here is some funky  text that contains  spaces and stuff ').assertEqual(value);
    })

    it('has_positional_predicament_determination', 0, () => {
      // These XPaths all start with "//", which is equivalent to
      // "/descendant-or-self::node()/", a step unto itself. So we check the second
      // step for the positional predicate, not the first.
      const tests = [
        ["//a", false],
        ["//a[1]", true],
        ["//a[1][@foo]", true],
        ["//a[last()]", true],
        ["//a[position()=1]", true],
        ["//a[@foo]", false],
        ["//a[@foo='1']", false],
        ["//a[@foo and position()=2]", true],
        ["//a[(@foo or position()=2)]", true],
        ["//a[@foo][2]", true],
        ["//a[0+1]", true],
        ["//a[(0+1)]", true],
        ["//a[string-length('bar')]", true],
        ["//a[b[@baz='1'] and position()=2]", true],
        ["//a[b[1]]", false],
        ["//a[b[position()=1][2]]", false]
      ];

      for (const test of tests) {
        expect(xpathParse(test[0]).steps[1].hasPositionalPredicate).assertEqual(test[1]);
      }
    })

    it('returns_on_first_match', 0, () => {
      const xml = `<body>
            <a href="#">top</a>
            <div>
                <a href="http://code.google.com/p/ajaxslt">ajaxslt</a>
                <p><a href="http://sourceforge.net/projects/goog-ajaxslt/">
                old site</a></p>
            </div>
        </body>`;
      const tests = [
        ["//a", 3],
        ["//a[contains(@href, 'ajaxslt')]", 2],
        ["//div/descendant::a", 2],
        ["(//div | //p)/a", 2],
        ["(//a)[2]", 1]
      ];

      const parsedXML: ESObject = xmlParse(xml);
      const ctx: ESObject = new ExprContext(parsedXML);

      for (const test of tests) {
        const expr: ESObject = xpathParse(test[0]);

        ctx.setReturnOnFirstMatch(false);
        const normalResults: ESObject = expr.evaluate(ctx);
        expect(test[1]).assertEqual(normalResults.value.length);

        ctx.setReturnOnFirstMatch(true);
        const firstMatchResults: ESObject = expr.evaluate(ctx);
        expect(1).assertEqual(firstMatchResults.value.length);

        expect(normalResults.value[0]).assertEqual(firstMatchResults.value[0]);
      }
    })

    it('assertContain', 0, () => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
      let a = 'abc'
      let b = 'b'
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertContain(b)
      expect(a).assertEqual(a)
    })
  })
}