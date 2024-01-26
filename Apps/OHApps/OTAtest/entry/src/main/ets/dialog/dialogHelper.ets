/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export namespace DialogHelper {
/**
 * 弹框
 *
 * @param title 标题
 * @param message 内容
 * @param confirmText 确认按钮显示内容
 * @param operator 回调
 */
  export interface DialogOperator {
    /**
     * 取消
     */
    onCancel?: () => void;

    /**
     * 确认
     */
    onConfirm?: () => void;
  }

  export function showDialog(title: string | Resource, message: string | Resource, confirmText?: string | Resource,
                             operator ?: DialogOperator): void {
    AlertDialog.show(
      {
        title: title,
        message: message,
        primaryButton: {
          value: confirmText,
          action: () => {
            console.log('defaultKnowDialog button is clicked');
            if (operator) {
              operator.onConfirm();
            }
          },
          backgroundColor: $r('sys.float.ohos_id_corner_radius_button')
        },
        secondaryButton: {
          value: '取消',
          action: () => {
            console.info('Callback when the second button is clicked')
            if (operator) {
              operator.onCancel();
            }
          }
        },
        cancel: () => {
          console.log('Closed callbacks');
          if (operator) {
            operator.onCancel();
          }
        },
        alignment: DialogAlignment.Bottom,
        offset: ({
          dx: '0vp',
          dy: -12
        }),
        autoCancel: false,
      }
    )
  }
}
