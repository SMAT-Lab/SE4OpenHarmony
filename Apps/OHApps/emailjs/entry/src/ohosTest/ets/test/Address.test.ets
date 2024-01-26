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

import { describe, it, expect } from '@ohos/hypium'
import { addressparser, AddressObject } from '@ohos/emailjs'

export default function addressTest() {
  describe('addressTest', () => {
    it('addressparser_should_handle_single_address_correctly', 0, () => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      let resukt:AddressObject[] = [
        {
          address: 'andris@tr.ee', name: ''
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris@tr.ee'))
    })


    it('addressparser_should_handle_multiple_addresses_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          address: 'andris@tr.ee', name: ''
        },
        {
          address: 'andris@example.com', name: ''
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris@tr.ee, andris@example.com'))
    })

    it('addressparser_should_handle_unquoted_name_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris <andris@tr.ee>'))
    })


    it('addressparser_should_handle_quoted_name_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'reinman, andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('"reinman, andris" <andris@tr.ee>'))
    })

    it('addressparser_should_handle_quoted_semicolons_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'reinman; andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('"reinman; andris" <andris@tr.ee>'))
    })

    it('addressparser_should_handle_unquoted_name_unquoted_address_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris andris@tr.ee'))
    })

    it('addressparser_should_handle_empty_group_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'Undisclosed', group: []
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('Undisclosed:;'))
    })

    it('addressparser_should_handle_address_group_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'Disclosed',
          group: [
            {
              address: 'andris@tr.ee', name: ''
            },
            {
              address: 'andris@example.com', name: ''
            },
          ],
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('Disclosed:andris@tr.ee, andris@example.com;'))
    })


    it('addressparser_should_handle_semicolon_as_a_delimiter', 0, () => {
      let resukt:AddressObject[] = [
        {
          address: 'andris@tr.ee', name: ''
        },
        {
          address: 'andris@example.com', name: ''
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris@tr.ee; andris@example.com;'))
    })

    it('addressparser_should_handle_mixed_group_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          address: 'test.user@mail.ee', name: 'Test User'
        },
        {
          name: 'Disclosed',
          group: [
            {
              address: 'andris@tr.ee', name: ''
            },
            {
              address: 'andris@example.com', name: ''
            },
          ],
        },
        {
          name: 'Undisclosed', group: []
        },
      ]
      expect(resukt).assertDeepEquals(addressparser(
        'Test User <test.user@mail.ee>, Disclosed:andris@tr.ee, andris@example.com;,,,, Undisclosed:;'
      ))
    })


    it('addressparser_semicolon_as_delimiter_should_not_break_group_parsing', 0, () => {
      let resukt:AddressObject[] = [
        {
          address: 'test.user@mail.ee', name: 'Test User'
        },
        {
          name: 'Disclosed',
          group: [
            {
              address: 'andris@tr.ee',
              name: '',
            },
            {
              address: 'andris@example.com',
              name: '',
            },
          ],
        },
        {
          name: 'Undisclosed', group: []
        },
        {
          address: 'bob@example.com', name: ''
        },
      ]
      expect(resukt).assertDeepEquals(addressparser(
        'Test User <test.user@mail.ee>; Disclosed:andris@tr.ee, andris@example.com;,,,, Undisclosed:; bob@example.com;'
      ))
    })


    it('addressparser_should_handle_name_from_comment_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris@tr.ee (andris)'))
    })


    it('addressparser_should_handle_skip_comment_correctly', 0, () => {
      let resukt:AddressObject[] = [
        {
          name: 'andris', address: 'andris@tr.ee'
        },
      ]
      expect(resukt).assertDeepEquals(addressparser('andris@tr.ee (reinman) andris'))
    })


    it('addressparser_should_handle_missing_address_correctly', 0, () => {
      let resukt:AddressObject[] = [{
        name: 'andris', address: ''
      }]
      expect(resukt).assertDeepEquals(addressparser('andris'))
    })


    it('addressparser_should_handle_apostrophe_in_name_correctly', 0, () => {
      let resukt:AddressObject[] = [{
        name: "O'Neill", address: ''
      }]
      expect(resukt).assertDeepEquals(addressparser("O'Neill"))
    })

    it('addressparser_should_handle_particularly_bad_input_unescaped_colon_correctly', 0, () => {
      let resukt :AddressObject[]= [
        {
          name: 'FirstName Surname-WithADash',
          group: [
            {
              name: undefined,
              group: [{
                address: 'firstname@company.com', name: 'Company'
              }],
            },
          ],
        },
      ]
      expect(resukt).assertDeepEquals(addressparser(
        'FirstName Surname-WithADash :: Company <firstname@company.com>'
      ))
    })

  })
}