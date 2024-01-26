/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class PhotographicConversions {
  public static readonly ROOT_TWO: number = Math.sqrt(2);

  constructor() {
    throw new Error("Not intended for instantiation.");
  }

  /**
   * Converts an aperture value to its corresponding F-stop number.
   *
   * @param aperture the aperture value to convert
   * @return the F-stop number of the specified aperture
   */
  public static apertureToFStop(aperture: number): number
  {
    return Math.pow(PhotographicConversions.ROOT_TWO, aperture);

    // NOTE jhead uses a different calculation as far as i can tell...  this confuses me...
    // fStop = (float)Math.exp(aperture * Math.log(2) * 0.5));
  }

  /**
   * Converts a shutter speed to an exposure time.
   *
   * @param shutterSpeed the shutter speed to convert
   * @return the exposure time of the specified shutter speed
   */
  public static shutterSpeedToExposureTime(shutterSpeed: number): number
  {
    return (1 / Math.exp(shutterSpeed * Math.log(2)));
  }
}

export default PhotographicConversions
