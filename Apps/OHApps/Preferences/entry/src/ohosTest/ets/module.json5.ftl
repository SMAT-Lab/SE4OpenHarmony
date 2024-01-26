/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

{
  "module": {
    "name": "${moduleName}_test",
    "type": "feature",
    "srcEntrance": "./ets/Application/AbilityStage.ts",
    "description": "$string:entry_test_desc",
    "mainElement": "TestAbility",
    "deviceTypes": [${deviceTypes ?replace("[","")?replace("]","")}],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:test_pages",
    "uiSyntax": "ets",
    "abilities": [
      {
        "name": "TestAbility",
        "srcEntrance": "./ets/testability/TestAbility.ts",
        "description": "$string:TestAbility_desc",
        "icon": "$media:icon",
        "label": "$string:TestAbility_label",
        "visible": true,
        "skills": [
          {
            "actions": [
              "action.system.home"
            ],
            "entities": [
              "entity.system.home"
            ]
          }
        ]
      }
    ]
  }
}
