/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/
import * as box2d from '@ohos/box2d';
import { Settings, Test } from './Test';
import { g_camera, g_debugDraw } from './DebugDraw';
import { g_testEntries } from '../Tests/TestEntries';
import display from '@ohos.display';
export class Main {
    public m_time_last: number = 0;
    public m_fps_time: number = 0;
    public m_fps_frames: number = 0;
    public m_fps: number = 0;
    public readonly m_settings: Settings = new Settings();
    public m_test?: Test;
    public m_test_index: number = 0; //28
    public m_shift: boolean = false;
    public m_ctrl: boolean = false;
    public m_lMouseDown: boolean = false;
    public m_rMouseDown: boolean = false;
    public readonly m_projection0: box2d.b2Vec2 = new box2d.b2Vec2();
    public readonly m_viewCenter0: box2d.b2Vec2 = new box2d.b2Vec2();
    public m_demo_mode: boolean = false;
    public m_demo_time: number = 0;
    public m_max_demo_time: number = 1000 * 10;
    public m_ctx: CanvasRenderingContext2D | null = null;
    private width: number = 480;
    private height: number = 750;
    private densityPixels: number = 1.5;
    constructor(time: number, ctx: CanvasRenderingContext2D) {
        display.getAllDisplays((err, data) => {
            if (err.code) {
                console.error(' Main Failed to obtain all the display objects. Code: ' + JSON.stringify(err));
                return;
            }
            console.info('Main Succeeded in obtaining all the display objects. Data: ' + JSON.stringify(data));
            this.width = data[0].width;
            this.height = data[0].height;
            this.densityPixels = data[0].densityPixels;
        });
        g_debugDraw.m_ctx = this.m_ctx = ctx;
        this.LoadTest();
        this.m_time_last = time;
    }
    public HomeCamera(): void {
        g_camera.m_zoom = (this.m_test) ? (this.m_test.GetDefaultViewZoom()) : (1.0);
        g_camera.m_center.Set(0, 20 * g_camera.m_zoom);
    }
    public MoveCamera(move: box2d.b2Vec2): void {
        const position: box2d.b2Vec2 = g_camera.m_center.Clone();
        ///move.SelfRotate(g_camera.m_roll.GetAngle());
        position.SelfAdd(move);
        g_camera.m_center.Copy(position);
    }
    ///public RollCamera(roll: number): void {
    ///  const angle: number = g_camera.m_roll.GetAngle();
    ///  g_camera.m_roll.SetAngle(angle + roll);
    ///}
    public ZoomCamera(zoom: number): void {
        g_camera.m_zoom *= zoom;
        g_camera.m_zoom = box2d.b2Clamp(g_camera.m_zoom, 0.02, 20);
    }
    private m_mouse = new box2d.b2Vec2();
    public HandleMouseMove(e: MouseEvent): void {
        const element: box2d.b2Vec2 = new box2d.b2Vec2(e.windowX, e.windowY);
        const world: box2d.b2Vec2 = g_camera.ConvertScreenToWorld(element, new box2d.b2Vec2());
        this.m_mouse.Copy(element);
        if (this.m_lMouseDown) {
            if (this.m_test) {
                this.m_test.MouseMove(world);
            }
        }
        if (this.m_rMouseDown) {
            const projection: box2d.b2Vec2 = g_camera.ConvertElementToProjection(element, new box2d.b2Vec2());
            const diff: box2d.b2Vec2 = box2d.b2Vec2.SubVV(projection, this.m_projection0, new box2d.b2Vec2());
            const center: box2d.b2Vec2 = box2d.b2Vec2.SubVV(this.m_viewCenter0, diff, new box2d.b2Vec2());
            g_camera.m_center.Copy(center);
        }
    }
    public HandleMouseDown(e: MouseEvent): void {
        g_camera.m_width = this.width / this.densityPixels;
        g_camera.m_height = this.height / this.densityPixels;
        const element: box2d.b2Vec2 = new box2d.b2Vec2(e.windowX, e.windowY);
        const world: box2d.b2Vec2 = g_camera.ConvertScreenToWorld(element, new box2d.b2Vec2());
        switch (e.button) {
            case 1: // left mouse button
                this.m_lMouseDown = true;
                if (this.m_shift) {
                    if (this.m_test) {
                        this.m_test.ShiftMouseDown(world);
                    }
                }
                else {
                    if (this.m_test) {
                        this.m_test.MouseDown(world);
                    }
                }
                break;
            case 2: // right mouse button
                this.m_rMouseDown = true;
                const projection: box2d.b2Vec2 = g_camera.ConvertElementToProjection(element, new box2d.b2Vec2());
                this.m_projection0.Copy(projection);
                this.m_viewCenter0.Copy(g_camera.m_center);
                break;
        }
    }
    public HandleMouseUp(e: MouseEvent): void {
        const element: box2d.b2Vec2 = new box2d.b2Vec2(e.windowX, e.windowY);
        const world: box2d.b2Vec2 = g_camera.ConvertScreenToWorld(element, new box2d.b2Vec2());
        switch (e.button) {
            case 1: // left mouse button
                this.m_lMouseDown = false;
                if (this.m_test) {
                    this.m_test.MouseUp(world);
                }
                break;
            case 2: // right mouse button
                this.m_rMouseDown = false;
                break;
        }
    }
    public HandleTouchMove(e: TouchEvent): void {
        const element: box2d.b2Vec2 = new box2d.b2Vec2(e.touches[0].windowX, e.touches[0].windowY);
        const world: box2d.b2Vec2 = g_camera.ConvertScreenToWorld(element, new box2d.b2Vec2());
        if (this.m_test) {
            this.m_test.MouseMove(world);
        }
    }
    public HandleTouchStart(e: TouchEvent): void {
        g_camera.m_width = this.width / this.densityPixels;
        g_camera.m_height = this.height / this.densityPixels;
        const element: box2d.b2Vec2 = new box2d.b2Vec2(e.touches[0].windowX, e.touches[0].windowY);
        const world: box2d.b2Vec2 = g_camera.ConvertScreenToWorld(element, new box2d.b2Vec2());
        if (this.m_test) {
            this.m_test.MouseDown(world);
        }
    }
    public HandleTouchEnd(e: TouchEvent): void {
        if (this.m_test) {
            this.m_test.MouseUp(this.m_test.m_mouseWorld);
        }
    }
    public HandleMouseWheel(e: MouseEvent): void {
    }
    public HandleKeyDown(e: KeyEvent): void {
        switch (e.keyText) {
            case "Control":
                this.m_ctrl = true;
                break;
            case "Shift":
                this.m_shift = true;
                break;
            case "ArrowLeft":
                if (this.m_ctrl) {
                    if (this.m_test) {
                        this.m_test.ShiftOrigin(new box2d.b2Vec2(2, 0));
                    }
                }
                else {
                    this.MoveCamera(new box2d.b2Vec2(-0.5, 0));
                }
                break;
            case "ArrowRight":
                if (this.m_ctrl) {
                    if (this.m_test) {
                        this.m_test.ShiftOrigin(new box2d.b2Vec2(-2, 0));
                    }
                }
                else {
                    this.MoveCamera(new box2d.b2Vec2(0.5, 0));
                }
                break;
            case "ArrowDown":
                if (this.m_ctrl) {
                    if (this.m_test) {
                        this.m_test.ShiftOrigin(new box2d.b2Vec2(0, 2));
                    }
                }
                else {
                    this.MoveCamera(new box2d.b2Vec2(0, -0.5));
                }
                break;
            case "ArrowUp":
                if (this.m_ctrl) {
                    if (this.m_test) {
                        this.m_test.ShiftOrigin(new box2d.b2Vec2(0, -2));
                    }
                }
                else {
                    this.MoveCamera(new box2d.b2Vec2(0, 0.5));
                }
                break;
            case "Home":
                this.HomeCamera();
                break;
            case "z":
                this.ZoomCamera(1.1);
                break;
            case "x":
                this.ZoomCamera(0.9);
                break;
            case "r":
                this.LoadTest();
                break;
            case " ":
                if (this.m_test) {
                    this.m_test.LaunchBomb();
                }
                break;
            case "o":
                this.SingleStep();
                break;
            case "p":
                this.Pause();
                break;
            case "[":
                this.DecrementTest();
                break;
            case "]":
                this.IncrementTest();
                break;
            // #if B2_ENABLE_PARTICLE
            case ",":
                if (this.m_shift) {
                    Test.particleParameter.Decrement();
                }
                break;
            case ".":
                if (this.m_shift) {
                    Test.particleParameter.Increment();
                }
                break;
        }
        if (this.m_test) {
            this.m_test.Keyboard(e.keyText);
        }
    }
    public HandleKeyUp(e: KeyEvent): void {
        switch (e.keyText) {
            case "Control":
                this.m_ctrl = false;
                break;
            case "Shift":
                this.m_shift = false;
                break;
            default:
                break;
        }
        if (this.m_test) {
            this.m_test.KeyboardUp(e.keyText);
        }
    }
    public UpdateTest(time_elapsed: number): void {
        if (this.m_demo_mode) {
            this.m_demo_time += time_elapsed;
            if (this.m_demo_time > this.m_max_demo_time) {
                this.IncrementTest();
            }
            const str: string = ((500 + this.m_max_demo_time - this.m_demo_time) / 1000).toFixed(0).toString();
        }
        else {
        }
    }
    public DecrementTest(): void {
        if (this.m_test_index <= 0) {
            this.m_test_index = g_testEntries.length;
        }
        this.m_test_index--;
        this.LoadTest();
    }
    public IncrementTest(): void {
        this.m_test_index++;
        if (this.m_test_index >= g_testEntries.length) {
            this.m_test_index = 0;
        }
        this.LoadTest();
    }
    public LoadTest(restartTest: boolean = false): void {
        Test.fullscreenUI.Reset();
        if (!restartTest) {
            Test.particleParameter.Reset();
        }
        this.m_demo_time = 0;
        if (this.m_test) {
            this.m_test.RestoreParticleParameters();
        }
        //构建模型
        this.m_test = g_testEntries[this.m_test_index].createFcn();
        if (!restartTest) {
            this.HomeCamera();
        }
    }
    public Pause(): void {
        this.m_settings.pause = !this.m_settings.pause;
    }
    public SingleStep(): void {
        this.m_settings.pause = true;
        this.m_settings.singleStep = true;
    }
    public ToggleDemo(): void {
        this.m_demo_mode = !this.m_demo_mode;
    }
    public SimulationLoop(time: number): void {
        this.m_time_last = this.m_time_last || time;
        let time_elapsed: number = time - this.m_time_last;
        this.m_time_last = time;
        if (time_elapsed > 1000) {
            time_elapsed = 1000;
        } // clamp
        this.m_fps_time += time_elapsed;
        this.m_fps_frames++;
        if (this.m_fps_time >= 500) {
            this.m_fps = (this.m_fps_frames * 1000) / this.m_fps_time;
            this.m_fps_frames = 0;
            this.m_fps_time = 0;
        }
        {
            const ctx: CanvasRenderingContext2D | null = this.m_ctx;
            const restartTest = [false];
            if (ctx) {
                ctx.clearRect(0, 0, this.width / this.densityPixels, this.height / this.densityPixels);
                ctx.save();
                ctx.translate(0.5 * 480, 0.5 * 750);
                ctx.scale(1, -1);
                const s: number = 0.5 * g_camera.m_height / g_camera.m_extent;
                ctx.scale(s, s);
                ctx.lineWidth /= s;
                // apply camera
                ctx.scale(1 / g_camera.m_zoom, 1 / g_camera.m_zoom);
                ctx.lineWidth *= g_camera.m_zoom;
                ctx.translate(-g_camera.m_center.x, -g_camera.m_center.y);
                if (this.m_test) {
                    this.m_test.Step(this.m_settings);
                }
                Test.particleParameter.Changed(restartTest);
                // 绘制文字
                let msg = g_testEntries[this.m_test_index].name;
                if (Test.fullscreenUI.GetParticleParameterSelectionEnabled()) {
                    msg += " : ";
                    msg += Test.particleParameter.GetName();
                }
                if (this.m_test) {
                    this.m_test.DrawTitle(msg);
                }
                ctx.restore();
            }
            if (restartTest[0]) {
                this.LoadTest(true);
            }
            this.UpdateTest(time_elapsed);
        }
    }
}
