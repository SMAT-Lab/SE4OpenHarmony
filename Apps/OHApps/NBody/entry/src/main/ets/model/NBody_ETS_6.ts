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

import Constants from '../utils/Constants';

/**
 * 天体类
 */
class Body {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  mass: number;

  constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, mass: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.mass = mass;
  }
}

const jupiter: Body = new Body(Constants.JUPITER_X, Constants.JUPITER_Y, Constants.JUPITER_Z, Constants.JUPITER_VX,
                               Constants.JUPITER_VY, Constants.JUPITER_VZ, Constants.JUPITER_MASS);
const saturn: Body = new Body(Constants.SATURN_X, Constants.SATURN_Y, Constants.SATURN_Z, Constants.SATURN_VX,
                              Constants.SATURN_VY, Constants.SATURN_VZ, Constants.SATURN_MASS);
const uranus: Body = new Body(Constants.URANUS_X, Constants.URANUS_Y, Constants.URANUS_Z, Constants.URANUS_VX,
                              Constants.URANUS_VY, Constants.URANUS_VZ, Constants.URANUS_MASS);
const neptune: Body = new Body(Constants.NEPTUNE_X, Constants.NEPTUNE_Y, Constants.NEPTUNE_Z, Constants.NEPTUNE_VX,
                               Constants.NEPTUNE_VY, Constants.NEPTUNE_VZ, Constants.NEPTUNE_MASS);
const sun: Body = new Body(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Constants.SOLAR_MASS);

const bodies: Body[] = Array(sun, jupiter, saturn, uranus, neptune);

/**
 * 调整太阳的速度，保证该孤立系统动量守恒
 */
export function offsetMomentum(): void {
  // p为momentum的缩写,表示：动量, 等于质量乘以速度 p=mv
  let px: number = 0;
  let py: number = 0;
  let pz: number = 0;

  // 累加计算整个系统中，各个天体在三维各矢量方向的动量
  for (let i: number = 0; i < bodies.length; i++) {
    const body: Body = bodies[i];
    const mass: number = body.mass;
    px += body.vx * mass;
    py += body.vy * mass;
    pz += body.vz * mass;
  }

  // 太阳预设速度为0，通过动量守恒定律，反推太阳各矢量方向速度
  const body: Body = bodies[0];
  body.vx = -px / Constants.SOLAR_MASS;
  body.vy = -py / Constants.SOLAR_MASS;
  body.vz = -pz / Constants.SOLAR_MASS;
}

/**
 * 更新天体在按指定的时间变化后的位置信息
 * @param dt - delta time 时间变化
 */
export function advance(dt: number): void {
  const size = bodies.length;

  // 两两配对计算各天体瞬时速度
  for (let i = 0; i < size; i++) {
    const iBody = bodies[i];
    let vxi: number = iBody.vx;
    let vyi: number = iBody.vy;
    let vzi: number = iBody.vz;
    for (let j: number = i + 1; j < size; j++) {
      const jBody: Body = bodies[j];

      // 天体间距离差
      const dx: number = iBody.x - jBody.x;
      const dy: number = iBody.y - jBody.y;
      const dz: number = iBody.z - jBody.z;

      const d2: number = dx * dx + dy * dy + dz * dz;
      const mag: number = dt / (d2 * Math.sqrt(d2));

      // 由天体距离计算引力对速度的相互影响
      const jMass: number = jBody.mass;
      vxi -= dx * jMass * mag;
      vyi -= dy * jMass * mag;
      vzi -= dz * jMass * mag;

      const iMass: number = iBody.mass;
      jBody.vx += dx * iMass * mag;
      jBody.vy += dy * iMass * mag;
      jBody.vz += dz * iMass * mag;
    }
    iBody.vx = vxi;
    iBody.vy = vyi;
    iBody.vz = vzi;
  }

  // 更新天体的位置信息
  for (let i: number = 0; i < size; i++) {
    const body: Body = bodies[i];
    body.x += dt * body.vx; // 位置 = 时间 * 速度
    body.y += dt * body.vy;
    body.z += dt * body.vz;
  }
}

/**
 * 在程序开始和结束后调用，通过计算机械能，判断机械能守恒与否，以检查程序的运行正确性
 * @returns 返回系统机械能
 */
export function energy(): number {
  let energy: number = 0.0;
  const size: number = bodies.length;

  // 计算各天体的机械能总和，机械能公式：机械能=动能+势能
  for (let i: number = 0; i < size; i++) {
    const iBody: Body = bodies[i];

    // 对每个天体的动能进行加和，动能公式为：动能=1/2×物体质量×运动速度的平方
    energy += 0.5 * iBody.mass * (iBody.vx * iBody.vx + iBody.vy * iBody.vy + iBody.vz * iBody.vz);

    // 计算当前遍历到的天体和其他天体间的势能，势能公式为：引力势能=-G*物理A质量*物理B质量/距离
    for (let j: number = i + 1; j < size; j++) {
      const jBody: Body = bodies[j];
      const dx: number = iBody.x - jBody.x;
      const dy: number = iBody.y - jBody.y;
      const dz: number = iBody.z - jBody.z;

      const distance: number = Math.sqrt(dx * dx + dy * dy + dz * dz);
      energy -= (iBody.mass * jBody.mass) / distance;
    }
  }
  return energy;
}
