let __generate__Id: number = 0;
function generateId(): string {
    return "XmlGraphicsBatik.test_" + ++__generate__Id;
}
/**
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import fileio from '@ohos.fileio';
import { consoleError, SVGAttrConstants, SVGCircle, SVGDeclares, SVGEllipse, SVGLine, SVGManager, SVGPath, SVGPolygonAndPolyLine, SVGRect, SVGRoot, SVGSpecifiedFormat, SVGXMLChecker, XMLConstants } from '@ohos/XmlGraphicsBatik';
import { GlobalContext } from '@ohos/XmlGraphicsBatik';
import { childObj, result, attrObj } from './VariableSubstitution';
export default function xmlGraphicsBatikTest() {
    describe('XmlGraphicsBatikTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('xml_graphics_batik_instance', 0, () => {
            expect(JSON.stringify(SVGManager.getInstance()))
                .assertEqual('{"_filePath":"/data/storage/el2/base/haps/entry_test/files","_svgObj":{},"_checker":{"_svgStringReader":null,"_isRootTag":true}}');
        }); //待定位
        it('xml_graphics_batik_SVGXMLChecker', 0, () => {
            let checker = new SVGXMLChecker();
            let svgOriginXml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="50" y="50" rx="20" ry="20" width="100" height="100" style="fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"/></svg>';
            checker.check(svgOriginXml, () => {
                expect(true).assertTrue();
            });
        });
        it('xml_graphics_batik_SVGXMLChecker_catch', 0, () => {
            let checker = new SVGXMLChecker();
            let svgOriginXml = '<xml>not xml</xml><?xml version="1.0" encoding="utf-8" standalone="yes" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="50" y="50" rx="20" ry="20" width="100" height="100" style="fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"/></svg>';
            try {
                checker.check(svgOriginXml, () => {
                    expect(true).assertTrue();
                });
            }
            catch (error) {
                expect(false).assertFalse();
            }
        });
        it('xml_graphics_batik_getFilePath', 0, () => {
            SVGManager.getInstance().getFilePath((path) => {
                let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
                expect(filesDir).assertEqual(path);
            });
        });
        it('xml_graphics_batik_svgRoot', 0, () => {
            let svg: SVGRoot = new SVGRoot();
            svg.setXMLNS(XMLConstants.XMLNS_NAMESPACE_URI_SVG);
            svg.setXMLNSLink(XMLConstants.XLINK_NAMESPACE_URI);
            svg.setSvgId('svgRoot');
            svg.setXMLSpace(false);
            svg.setWidth(250);
            svg.setHeight(250);
            svg.setViewBox(10, 10, 250, 250);
            let svgObj = svg.toObj();
            expect(JSON.stringify(svgObj))
                .assertEqual('{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","id":"svgRoot","xml:space":"default","width":250,"height":250,"viewBox":{"x":10,"y":10,"width":250,"height":250}}');
        });
        it('xml_graphics_batik_declares', 0, () => {
            let declares: SVGDeclares = new SVGDeclares();
            declares.setXMLVersion('1.0');
            declares.setEncoding('utf-8');
            declares.setStandalone(true);
            let declaresObj = declares.toObj();
            expect(JSON.stringify(declaresObj))
                .assertEqual('{"declaration":{"attributes":{"version":"1.0","encoding":"utf-8","standalone":"yes"}},"elements":[{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[]}]}');
        });
        it('xml_graphics_batik_SVGCircle', 0, () => {
            let circle: SVGCircle = new SVGCircle();
            circle.setCX(170);
            circle.setCY(80);
            circle.setR(50);
            circle.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)');
            let circleObj = circle.toObj();
            expect(JSON.stringify(circleObj))
                .assertEqual('{"cx":170,"cy":80,"r":50,"style":"fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)"}');
        });
        it('xml_graphics_batik_SVGEllipse', 0, () => {
            let ellipse: SVGEllipse = new SVGEllipse();
            ellipse.setCX(100);
            ellipse.setCY(80);
            ellipse.setRX(70);
            ellipse.setRY(50);
            ellipse.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let ellipseObj = ellipse.toObj();
            expect(JSON.stringify(ellipseObj))
                .assertEqual('{"cx":100,"cy":80,"rx":70,"ry":50,"style":"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)"}');
        });
        it('xml_graphics_batik_SVGLine', 0, () => {
            let line: SVGLine = new SVGLine();
            line.setX1(50);
            line.setY1(50);
            line.setX2(200);
            line.setY2(200);
            line.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let lineObj = line.toObj();
            expect(JSON.stringify(lineObj))
                .assertEqual('{"x1":50,"y1":50,"x2":200,"y2":200,"style":"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)"}');
        });
        it('xml_graphics_batik_SVGPath', 0, () => {
            let path: SVGPath = new SVGPath();
            let pathPoints: string[] = new Array();
            pathPoints.push('M10,20 ');
            pathPoints.push('50,70');
            pathPoints.push('L80,70');
            pathPoints.push('L80,150');
            path.setD(pathPoints);
            path.addPoints('l', 20);
            path.addPointsWithoutOrder(0, 40);
            path.addPoints('z');
            path.setPathLength(100);
            path.addAttribute('style', 'fill:none;stroke-width:2;stroke:black');
            let pathObj = path.toObj();
            expect(JSON.stringify(pathObj))
                .assertEqual('{"d":"M10,20  50,70 L80,70 L80,150 l 20,0  0,40  ","pathLength":100,"style":"fill:none;stroke-width:2;stroke:black"}');
        });
        it('xml_graphics_batik_polygon', 0, () => {
            let polygon: SVGPolygonAndPolyLine = new SVGPolygonAndPolyLine();
            let points: number[] = new Array();
            points.push(10);
            points.push(10);
            points.push(150);
            points.push(50);
            polygon.setPoints(points);
            polygon.addPoints(70, 70);
            polygon.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)');
            let polygonObj = polygon.toObj();
            expect(JSON.stringify(polygonObj))
                .assertEqual('{"points":"10 10 150 50 70 70","style":"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"}');
        });
        it('xml_graphics_batik_polyline', 0, () => {
            let polyline: SVGPolygonAndPolyLine = new SVGPolygonAndPolyLine();
            let points: number[] = new Array();
            points.push(10);
            points.push(10);
            points.push(150);
            points.push(50);
            polyline.setPoints(points);
            polyline.addPoints(70, 70);
            polyline.addAttribute('style', 'fill:none;stroke-width:5;stroke:rgb(0,0,0)');
            let polylineObj = polyline.toObj();
            expect(JSON.stringify(polylineObj))
                .assertEqual('{"points":"10 10 150 50 70 70","style":"fill:none;stroke-width:5;stroke:rgb(0,0,0)"}');
        });
        it('xml_graphics_batik_rect', 0, () => {
            let rect: SVGRect = new SVGRect();
            rect.setX(10);
            rect.setY(10);
            rect.setRX(20);
            rect.setRY(20);
            rect.setWidth(100);
            rect.setHeight(100);
            rect.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let rectObj = rect.toObj();
            expect(JSON.stringify(rectObj))
                .assertEqual('{"x":10,"y":10,"rx":20,"ry":20,"width":100,"height":100,"style":"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)"}');
        });
        it('xml_graphics_batik_SVGSpecifiedFormat', 0, () => {
            let circle: SVGCircle = new SVGCircle();
            circle.setCX(170);
            circle.setCY(80);
            circle.setR(50);
            circle.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)');
            let circleObj = circle.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('circle');
            svgSpecifiedFormat.setAttributes(circleObj);
            expect(JSON.stringify(svgSpecifiedFormat.toObj()))
                .assertEqual('{"type":"element","name":"circle","attributes":{"cx":170,"cy":80,"r":50,"style":"fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)"}}');
        });
        it('xml_graphics_batik_addChildNode', 0, () => {
            SVGManager.getInstance().createSVGDeclares();
            let circle: SVGCircle = new SVGCircle();
            circle.setCX(170);
            circle.setCY(80);
            circle.setR(50);
            circle.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)');
            let circleObj = circle.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('circle');
            svgSpecifiedFormat.setAttributes(circleObj);
            let svgRoot = SVGManager.getInstance().getSVGRoot();
            if (svgRoot) {
                let allAttrCircleObj = svgSpecifiedFormat.toObj();
                SVGManager.getInstance().addChildNode(svgRoot, allAttrCircleObj);
                let result = '{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[{"type":"element","name":"circle","attributes":{"cx":170,"cy":80,"r":50,"style":"fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)"}}]}';
                expect(JSON.stringify(svgRoot))
                    .assertEqual(result);
            }
        });
        it('xml_graphics_batik_total_svg', 0, () => {
            let svgManager = SVGManager.getInstance();
            svgManager.createSVGDeclares();
            let circle: SVGCircle = new SVGCircle();
            circle.setCX(80);
            circle.setCY(80);
            circle.setR(70);
            circle.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let circleObj = circle.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('circle');
            svgSpecifiedFormat.setAttributes(circleObj);
            let svgLocalRoot = svgManager.getSVGRoot();
            if (svgLocalRoot) {
                let allAttrCircleObj = svgSpecifiedFormat.toObj();
                svgManager.addChildNode(svgLocalRoot, allAttrCircleObj);
                expect(JSON.stringify(svgManager.getSVGTotalObj()))
                    .assertEqual('{"declaration":{"attributes":{"version":"1.0","encoding":"utf-8","standalone":"yes"}},"elements":[{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[{"type":"element","name":"circle","attributes":{"cx":80,"cy":80,"r":70,"style":"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)"}}]}]}');
            }
        });
        it('xml_graphics_batik_createSVGDeclares', 0, () => {
            SVGManager.getInstance().createSVGDeclares();
            expect(JSON.stringify(SVGManager.getInstance().getSVGRoot()))
                .assertEqual('{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[]}');
        });
        it('xml_graphics_batik_convertObjToXML', 0, () => {
            expect(SVGManager.getInstance().convertObjToXML(result))
                .assertEqual('<?xml version="1.0" encoding="utf-8" standalone="yes" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="50" y="50" rx="20" ry="20" width="100" height="100" style="fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)" /></svg>');
        });
        it('xml_graphics_batik_createFolder', 0, () => {
            let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
            SVGManager.getInstance().createFolder(filesDir + "/xtsFolder");
            try {
                let stat = fileio.statSync(filesDir + "/xtsFolder");
                expect(stat.isDirectory()).assertTrue();
            }
            catch (e) {
                consoleError('XmlGraphicsBatik', 'create folder xts error: ' + e);
            }
        });
        it('xml_graphics_batik_saveSVG', 0, () => {
            SVGManager.getInstance().saveSVG('xts.svg', result, () => {
                expect(true).assertTrue();
            });
        });
        it('xml_graphics_batik_getValueForKey', 0, () => {
            let declares = SVGManager.getInstance().getValueForKey(result, "declaration");
            expect(JSON.stringify(declares))
                .assertEqual('{"attributes":{"version":"1.0","encoding":"utf-8","standalone":"yes"}}');
        });
        it('xml_graphics_batik_removeByKey', 0, () => {
            SVGManager.getInstance().removeByKey(result, "declaration");
            expect(JSON.stringify(result))
                .assertEqual('{"elements":[{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[{"type":"element","name":"rect","attributes":{"x":50,"y":50,"rx":20,"ry":20,"width":100,"height":100,"style":"fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"}}]}]}');
        }); //待定位
        it('xml_graphics_batik_setChildNode', 0, () => {
            SVGManager.getInstance().setChildNode(result, childObj);
            expect(JSON.stringify(result)).assertEqual('{"elements":[{"type":"text","text":"this is a child node"}]}');
        });
        it('xml_graphics_batik_setAttribute', 0, () => {
            SVGManager.getInstance().setAttribute(attrObj, "attr", "value");
            expect(JSON.stringify(attrObj))
                .assertEqual('{"declaration":{"attributes":{"version":"1.0","encoding":"utf-8","standalone":"yes"}},"elements":[{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},"elements":[{"type":"element","name":"rect","attributes":{"x":50,"y":50,"rx":20,"ry":20,"width":100,"height":100,"style":"fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"}}]}],"attr":"value"}');
        });
    });
}
