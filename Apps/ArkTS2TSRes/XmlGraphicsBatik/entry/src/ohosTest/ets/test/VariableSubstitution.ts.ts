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
export const attrObj = {
    "declaration": {
        "attributes": {
            "version": "1.0", "encoding": "utf-8", "standalone": "yes"
        }
    }, "elements": [{
            "type": "element", "name": "svg", "attributes": {
                "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink"
            }, "elements": [{
                    "type": "element", "name": "rect", "attributes": {
                        "x": 50,
                        "y": 50,
                        "rx": 20,
                        "ry": 20,
                        "width": 100,
                        "height": 100,
                        "style": "fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"
                    }
                }]
        }]
};
export const result = {
    "declaration": {
        "attributes": {
            "version": "1.0", "encoding": "utf-8", "standalone": "yes"
        }
    }, "elements": [{
            "type": "element", "name": "svg", "attributes": {
                "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink"
            }, "elements": [{
                    "type": "element", "name": "rect", "attributes": {
                        "x": 50,
                        "y": 50,
                        "rx": 20,
                        "ry": 20,
                        "width": 100,
                        "height": 100,
                        "style": "fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)"
                    }
                }]
        }]
};
export const childObj = {
    "type": "text", "text": "this is a child node"
};
