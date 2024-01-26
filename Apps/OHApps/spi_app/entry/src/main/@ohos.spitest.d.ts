/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

declare namespace um_spi {

    function sync_get_flashid_value(): number;
    function sync_get_deviceid_value(): number;
    function sync_write_buffer_value(num: number,char: string,cahr: string): number;
    function sync_read_date(item: number): string;
    function sync_read_value(item: number): string;
    function sync_read_sum_list(): number;
    function sync_all_erase():number;
    function sync_get_MB_Free():number;
}

export default um_spi;