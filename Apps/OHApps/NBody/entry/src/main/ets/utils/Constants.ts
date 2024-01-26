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

export default class Constants {
  // N-Body程序 模拟时间步骤数
  public static readonly TIME_STEPS_TASK_POOL: number = 5000000;
  public static readonly TIME_STEPS_WORKER: number = 50000000;
  // 数学π
  public static readonly PI: number = Math.PI;
  // 太阳质量系数
  public static readonly SOLAR_MASS: number = 4 * Constants.PI * Constants.PI;
  // 一年的天数
  public static readonly DAYS_PER_YEAR: number = 365.24;
  // 木星的位置、速度和质量，相对于太阳
  public static readonly JUPITER_X: number = 4.84143144246472090e+00;
  public static readonly JUPITER_Y: number = -1.16032004402742839e+00;
  public static readonly JUPITER_Z: number = -1.03622044471123109e-01;
  public static readonly JUPITER_VX: number = 1.66007664274403694e-03 * Constants.DAYS_PER_YEAR;
  public static readonly JUPITER_VY: number = 7.69901118419740425e-03 * Constants.DAYS_PER_YEAR;
  public static readonly JUPITER_VZ: number = -6.90460016972063023e-05 * Constants.DAYS_PER_YEAR;
  public static readonly JUPITER_MASS: number = 9.54791938424326609e-04 * Constants.SOLAR_MASS;
  // 土星的位置、速度和质量
  public static readonly SATURN_X: number = 8.34336671824457987e+00;
  public static readonly SATURN_Y: number = 4.12479856412430479e+00;
  public static readonly SATURN_Z: number = -4.03523417114321381e-01;
  public static readonly SATURN_VX: number = -2.76742510726862411e-03 * Constants.DAYS_PER_YEAR;
  public static readonly SATURN_VY: number = 4.99852801234917238e-03 * Constants.DAYS_PER_YEAR;
  public static readonly SATURN_VZ: number = 2.30417297573763929e-05 * Constants.DAYS_PER_YEAR;
  public static readonly SATURN_MASS: number = 2.85885980666130812e-04 * Constants.SOLAR_MASS;
  // 天王星的位置、速度和质量
  public static readonly URANUS_X: number = 1.28943695621391310e+01;
  public static readonly URANUS_Y: number = -1.51111514016986312e+01;
  public static readonly URANUS_Z: number = -2.23307578892655734e-01;
  public static readonly URANUS_VX: number = 2.96460137564761618e-03 * Constants.DAYS_PER_YEAR;
  public static readonly URANUS_VY: number = 2.37847173959480950e-03 * Constants.DAYS_PER_YEAR;
  public static readonly URANUS_VZ: number = -2.96589568540237556e-05 * Constants.DAYS_PER_YEAR;
  public static readonly URANUS_MASS: number = 4.36624404335156298e-05 * Constants.SOLAR_MASS;
  // 海王星的位置、速度和质量
  public static readonly NEPTUNE_X: number = 1.53796971148509165e+01;
  public static readonly NEPTUNE_Y: number = -2.59193146099879641e+01;
  public static readonly NEPTUNE_Z: number = 1.79258772950371181e-01;
  public static readonly NEPTUNE_VX: number = 2.68067772490389322e-03 * Constants.DAYS_PER_YEAR;
  public static readonly NEPTUNE_VY: number = 1.62824170038242295e-03 * Constants.DAYS_PER_YEAR;
  public static readonly NEPTUNE_VZ: number = -9.51592254519715870e-05 * Constants.DAYS_PER_YEAR;
  public static readonly NEPTUNE_MASS: number = 5.15138902046611451e-05 * Constants.SOLAR_MASS;
}
