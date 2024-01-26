let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
export { default as MaterialDialog } from './src/main/ets/components/mainpage/MaterialDialog';
export { ClickCallback } from './src/main/ets/components/mainpage/ClickCallback';
export { ColorCallback } from './src/main/ets/components/mainpage/ColorCallback';
export { ColorPalette } from './src/main/ets/components/mainpage/ColorPalette';
export { DateTimeCallback } from './src/main/ets/components/mainpage/DateTimeCallback';
export { InputCallback } from './src/main/ets/components/mainpage/InputCallback';
export { ItemListener } from './src/main/ets/components/mainpage/ItemListener';
export { MultiChoiceListener } from './src/main/ets/components/mainpage/MultiChoiceListener';
export { SingleChoiceListener } from './src/main/ets/components/mainpage/SingleChoiceListener';
export { ToggleCallback } from './src/main/ets/components/mainpage/ToggleCallback';
export { WhichButton } from './src/main/ets/components/mainpage/WhichButton';
export { DialogAttributeModel } from './src/main/ets/components/mainpage/model/DialogAttributeModel';
export { TextAttributeModel } from './src/main/ets/components/mainpage/model/TextAttributeModel';
export { ListItemAttributeModel } from './src/main/ets/components/mainpage/model/ListItemAttributeModel';
export { InputLayoutAttributeModel } from './src/main/ets/components/mainpage/model/InputLayoutAttributeModel';
export { IconAttributeModel } from './src/main/ets/components/mainpage/model/IconAttributeModel';
export { DateTimeAttributeModel } from './src/main/ets/components/mainpage/model/DateTimeAttributeModel';
export { ColorPickAttributeModel } from './src/main/ets/components/mainpage/model/ColorPickAttributeModel';
export { CheckboxAttributeModel } from './src/main/ets/components/mainpage/model/CheckboxAttributeModel';
export { ButtonAttributeModel } from './src/main/ets/components/mainpage/model/ButtonAttributeModel';
