let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export { default as XMLConstants } from './src/main/ets/batik/constants/XMLConstants';
export { default as SVGXMLConstants } from './src/main/ets/batik/constants/SVGXMLConstants';
export { default as RegexConstants } from './src/main/ets/batik/constants/RegexConstants';
export { default as SVGAttrConstants } from './src/main/ets/batik/constants/SVGAttrConstants';
export * from './src/main/ets/batik/svggen/SVGCircle';
export * from './src/main/ets/batik/svggen/SVGDeclares';
export * from './src/main/ets/batik/svggen/SVGEllipse';
export * from './src/main/ets/batik/svggen/SVGLine';
export * from './src/main/ets/batik/svggen/SVGPath';
export * from './src/main/ets/batik/svggen/SVGPolygonAndPolyLine';
export * from './src/main/ets/batik/svggen/SVGRect';
export * from './src/main/ets/batik/svggen/SVGRoot';
export * from './src/main/ets/batik/svggen/SVGSpecifiedFormat';
export * from './src/main/ets/batik/SVGManager';
export * from './src/main/ets/batik/SVGXMLChecker';
export { consoleInfo, consoleDebug, consoleLog, consoleWarn, consoleError } from './src/main/ets/batik/util/LogUtil';
export { GlobalContext } from './src/main/ets/batik/tools/GlobalContext';
