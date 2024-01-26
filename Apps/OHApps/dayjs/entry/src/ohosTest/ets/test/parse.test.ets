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

import moment from "../../../../node_modules/moment/moment"
import dayjs from 'dayjs'
import {dataTest} from "../utils/testPlugin"

import { REGEX_PARSE } from 'dayjs/esm/constant'
import { it, expect, describe } from "../utils/utils"

export default function parseTest() {
  describe('Parse', () => {
    it('moment_js_like_formatted_dates', () => {
      let d = '20130108'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())

      d = '2018-04-24'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())

      d = '2018-04-24 11:12'
      expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend

      d = '2018-05-02 11:12:13'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())

      d = '2018-05-02 11:12:13.998'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())

      d = '2018-4-1'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend

      d = '2018-4-1 11:12'
      expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend

      d = '2018-4-1 1:1:1.223'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend

      d = '2018-01'
      expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend

      d = '2018'
      expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend

      d = '2018-05-02T11:12:13Z' // should go direct to new Date() rather our regex
      expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend

    })

    it('String_ISO_8601_date_time_and_zone', () => {
      const time = '2018-04-04T16:00:00.000Z'
      expect(dayjs(time).valueOf()).toBe(moment(time).valueOf())
    })

    it('String_RFC_2822_time_and_zone', () => {
      const time = 'Mon, 11 Feb 2019 09:46:50 GMT+1'
      const expected = '2019-02-11T08:46:50.000Z'
      const d = dayjs(time)
      expect(d.toISOString()).toEqual(expected)
      expect(d.valueOf()).toBe(moment(time).valueOf())
    })


    it('rejects_invalid_values', () => {
      expect(dataTest({}).isValid()).toBe(false)
      expect(dataTest(() => '2018-01-01').isValid()).toBe(false)
      expect(dayjs(Number.POSITIVE_INFINITY).isValid()).toBe(false)
      expect(dayjs(Number.NaN).isValid()).toBe(false)
      expect(dataTest([2018, 5, 1, 13, 52, 44]).isValid()).toBe(false) // Arrays with time part
    })

    it('parses_Arrays_with_date_part', () => {
      const dateParts = [2018, 5, 1]
      const expected = '2018-05-01T00:00:00.000Z'
      const d = dataTest(dateParts)
      const normalized = d.add(d.utcOffset(), 'minutes') // make test run in every timezone
      expect(normalized.toISOString()).toEqual(expected)
    })


    it('parses_unlimited_millisecond', () => {
      const date = '2019-03-25T06:41:00.999999999'
      const ds:dayjs.Dayjs = dayjs(date)
      expect(ds.valueOf()).toEqual(moment(date).valueOf())
      expect(ds.millisecond()).toEqual(moment(date).millisecond())
    })

    it('String_Other_Undefined_and_Null_and_isValid', () => {

      expect(dayjs('otherString').toString().toLowerCase()).toBe(moment('otherString').toString().toLowerCase())

      expect(dayjs(undefined).toDate().toString()).toEqual(moment(undefined).toDate().toString())

      expect(dayjs().isValid()).toBe(true)

      expect(dayjs(undefined).isValid()).toBe(true)

      expect(dayjs('').isValid()).toBe(false)

      expect(dayjs(null).isValid()).toBe(false)

      expect(dayjs('otherString').isValid()).toBe(false)

      expect(dayjs(null).toString().toLowerCase()).toBe(moment("").toString().toLowerCase())

    })
    it('Unix_Timestamp_Number_milliseconds_1523520536000', () => {
      const timestamp = 1523520536000
      expect(dayjs(timestamp).valueOf()).toBe(moment(timestamp).valueOf())
    })

    it('Unix_Timestamp_Number_seconds_1318781876', () => {
      const timestamp1 = 1318781876
      const timestamp2 = 1318781876.721
      expect(dayjs.unix(timestamp1).valueOf()).toBe(moment.unix(timestamp1).valueOf())
      expect(dayjs.unix(timestamp2).valueOf()).toBe(moment.unix(timestamp2).valueOf())
    })

    it('String_and_Number_20180101', () => {
      expect(dayjs(20180101).valueOf()).toBe(moment(20180101).valueOf())
      expect(dayjs('20180101').valueOf()).toBe(moment('20180101').valueOf())
    })

    it('Number_0', () => {
      expect(dayjs(0).valueOf()).toBe(moment(0).valueOf())
    })

    it('Clone_not_affect_each_other', () => {
      const base = dayjs(20170101)
      const year = base.year()
      const another = base.set('year', year + 1)
      expect(another.unix() - base.unix()).toBe(31536000)
    })

    it('Clone_with_same_value', () => {
      const base = dayjs()
      const year = base.year()
      const newBase = base.set('year', year + 1)
      const another = newBase.clone()
      expect(newBase.toString()).toBe(another.toString())
    })
  })


  describe('REGEX_PARSE', () => {
    const title = "2020/9/30";
    it(title, () => {
      const date = '2020/9/30'
      const d = date.match(REGEX_PARSE)
      expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
      if(!!d)
        expect(d.join('-')).toBe('2020/9/30-2020-9-30----')
    })
    // it('2019-03-25T06:41:00.999999999', () => {
    //   const date = '2019-03-25T06:41:00.999999999'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d.join('-')).toBe('2019-03-25T06:41:00.999999999-2019-03-25-06-41-00-999999999')
    // })
    // it('20210102T012345', () => {
    //   const date = '20210102T012345'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d.join('-')).toBe('20210102T012345-2021-01-02-01-23-45-')
    // })
    // it('2021-01-02T01:23', () => {
    //   const date = '2021-01-02T01:23'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d.join('-')).toBe('2021-01-02T01:23-2021-01-02-01-23--')
    // })
    // it('2021-01-02T01:23:45', () => {
    //   const date = '2021-01-02T01:23:45'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d.join('-')).toBe('2021-01-02T01:23:45-2021-01-02-01-23-45-')
    // })
    //
    // it('2020-12-31T18:00:00.000-0500 (no regex match)', () => {
    //   const date = '2020-12-31T18:00:00.000-0500'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d).toBe(null)
    // })
    //
    // // format used in timezone plugin utcString
    // it('2021-1-4 0:42:53:000', () => {
    //   const date = '2021-1-4 0:42:53:000'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d.join('-')).toBe('2021-1-4 0:42:53:000-2021-1-4-0-42-53-000')
    // })
    //
    // it('2020-12-31T18:00:00-05:00 (no regex match)', () => {
    //   const date = '2020-12-31T18:00:00-05:00'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d).toBe(null)
    // })
    //
    // it('2021-01-02T01:23:45-0500 (no regex match)', () => {
    //   const date = '2021-01-02T01:23:45-0500'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d).toBe(null)
    // })
    // it('2021-01-02T01:23:45Z (no regex match)', () => {
    //   const date = '2021-01-02T01:23:45Z'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d).toBe(null)
    // })
    //
    // // dots should not be matched, and fallback to Date
    // it('2021.01.03', () => {
    //   const date = '2021.01.03'
    //   const d = date.match(REGEX_PARSE)
    //   expect(dayjs(date).valueOf()).toBe(moment(date).valueOf())
    //   expect(d).toBe(null)
    // })
  })
}

