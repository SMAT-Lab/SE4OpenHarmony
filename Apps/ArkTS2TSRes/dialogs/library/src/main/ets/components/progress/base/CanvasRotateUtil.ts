let __generate__Id: number = 0;
function generateId(): string {
    return "CanvasRotateUtil_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export class CanvasRotateUtil {
    radius = 0;
    startAngled = 0;
    startCenterX = 0;
    startCenterY = 0;
    hasRotate = 0;
    hasTranslateX = 0;
    hasTranslateY = 0;
    constructor(ctxWidth: number, ctxHeight: number) {
        this.radius = Math.sqrt(ctxWidth * ctxWidth / 4 + ctxHeight * ctxHeight / 4);
        this.startAngled = Math.atan(ctxHeight / ctxWidth) * 180 / Math.PI;
        this.startCenterX = this.getCoordinatesX(-this.startAngled, this.radius); // 初始位置中心点X坐标
        this.startCenterY = this.getCoordinatesY(-this.startAngled, this.radius); // 初始位置中心点Y坐标
    }
    rotate(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, rotate: number) {
        let newX = this.getCoordinatesX(-this.startAngled - rotate, this.radius); // 旋转后位置中心点X坐标
        let newY = this.getCoordinatesY(-this.startAngled - rotate, this.radius); // 旋转后位置中心点Y坐标
        let translateX = this.startCenterX - newX; // 需要位移的X距离
        let translateY = newY - this.startCenterY; // 需要位移的Y距离
        ctx.rotate((-this.hasRotate) * Math.PI / 180); // 先将画布旋转恢复为原样
        ctx.translate(translateX - this.hasTranslateX, translateY - this.hasTranslateY); // 将画布中心点位移到初始位置的中心点
        ctx.rotate(rotate * Math.PI / 180); // 最后再旋转画布到最新的旋转角度
        // 记录旋转和位移的数值，用于下一次旋转和位移之前恢复
        this.hasTranslateX = translateX;
        this.hasTranslateY = translateY;
        this.hasRotate = rotate;
    }
    getCoordinatesX(angled: number, radius: number) {
        return Math.cos(angled * Math.PI / 180) * radius;
    }
    getCoordinatesY(angled: number, radius: number) {
        return Math.sin(angled * Math.PI / 180) * radius;
    }
}
