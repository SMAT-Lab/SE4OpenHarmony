/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import formBindingData from '@ohos.app.form.formBindingData';
import formInfo from '@ohos.app.form.formInfo';
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';

export default class EntryFormAbility extends FormExtensionAbility {
  onAddForm(want): formBindingData.FormBindingData {
    // Called to return a FormBindingData object.
    let formData = {};
    return formBindingData.createFormBindingData(formData);
  }

  onCastToNormalForm(formId): void {
    // Called when the form provider is notified that a temporary form is successfully
    // converted to a normal form.
  }

  onUpdateForm(formId): void {
    // Called to notify the form provider to update a specified form.
  }

  onChangeFormVisibility(newStatus): void {
    // Called when the form provider receives form events from the system.
  }

  onFormEvent(formId, message): void {
    // Called when a specified message event defined by the form provider is triggered.
  }

  onRemoveForm(formId): void {
    // Called to notify the form provider that a specified form has been destroyed.
  }

  onAcquireFormState(want): formInfo.FormState {
    // Called to return a {@link FormState} object.
    return formInfo.FormState.READY;
  }
};