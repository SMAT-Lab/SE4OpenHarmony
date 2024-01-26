interface Index_Params {
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    commonFontSize?;
    fontColor?;
    zindexRevers?: boolean;
    selectArr?: Array<ArrayItem>;
    selectIndex?;
    title?: string;
    controlZindex?: number;
    canvasZindex?: number;
    time?;
    app?: Main;
    m_settings?;
    fps?: string;
    index?: number;
    isLoad?: boolean;
    visibile?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Main } from '../Testbed/Framework/Main';
import * as box2d from '@ohos/box2d';
import { Settings } from '../Testbed/Framework/Test';
import { g_testEntries } from '../Testbed/Tests/TestEntries';
class ArrayItem {
    value: string = '';
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.commonFontSize = 14;
        this.fontColor = Color.Grey;
        this.zindexRevers = false;
        this.selectArr = [];
        this.selectIndex = 0;
        this.__title = new ObservedPropertySimple("Box2D Testbed version " + box2d.b2_version + "<br>(branch: " + box2d.b2_branch + " commit: " + box2d.b2_commit + ")", this, "title");
        this.__controlZindex = new ObservedPropertySimple(99, this, "controlZindex");
        this.__canvasZindex = new ObservedPropertySimple(1, this, "canvasZindex");
        this.time = 60;
        this.app = new Main(this.time, this.context);
        this.m_settings = this.app ? this.app.m_settings : (new Settings());
        this.__fps = new ObservedPropertySimple(this.app ? this.app.m_fps.toFixed(1).toString() : "FPS", this, "fps");
        this.__index = new ObservedPropertySimple(this.app ? this.app.m_test_index : this.selectIndex, this, "index");
        this.isLoad = false;
        this.__visibile = new ObservedPropertySimple(Visibility.Visible, this, "visibile");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.commonFontSize !== undefined) {
            this.commonFontSize = params.commonFontSize;
        }
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.zindexRevers !== undefined) {
            this.zindexRevers = params.zindexRevers;
        }
        if (params.selectArr !== undefined) {
            this.selectArr = params.selectArr;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.controlZindex !== undefined) {
            this.controlZindex = params.controlZindex;
        }
        if (params.canvasZindex !== undefined) {
            this.canvasZindex = params.canvasZindex;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.app !== undefined) {
            this.app = params.app;
        }
        if (params.m_settings !== undefined) {
            this.m_settings = params.m_settings;
        }
        if (params.fps !== undefined) {
            this.fps = params.fps;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isLoad !== undefined) {
            this.isLoad = params.isLoad;
        }
        if (params.visibile !== undefined) {
            this.visibile = params.visibile;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__controlZindex.aboutToBeDeleted();
        this.__canvasZindex.aboutToBeDeleted();
        this.__fps.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__visibile.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private commonFontSize;
    private fontColor;
    private zindexRevers: boolean;
    private selectArr: Array<ArrayItem>;
    private selectIndex;
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __controlZindex: ObservedPropertySimple<number>;
    get controlZindex() {
        return this.__controlZindex.get();
    }
    set controlZindex(newValue: number) {
        this.__controlZindex.set(newValue);
    }
    private __canvasZindex: ObservedPropertySimple<number>;
    get canvasZindex() {
        return this.__canvasZindex.get();
    }
    set canvasZindex(newValue: number) {
        this.__canvasZindex.set(newValue);
    }
    private time;
    private app: Main;
    private m_settings;
    private __fps: ObservedPropertySimple<string>;
    get fps() {
        return this.__fps.get();
    }
    set fps(newValue: string) {
        this.__fps.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private isLoad: boolean;
    private __visibile: ObservedPropertySimple<Visibility>;
    get visibile() {
        return this.__visibile.get();
    }
    set visibile(newValue: Visibility) {
        this.__visibile.set(newValue);
    }
    aboutToAppear() {
        for (let i: number = 0; i < g_testEntries.length; ++i) {
            let o: ArrayItem = new ArrayItem();
            o.value = g_testEntries[i].name;
            this.selectArr[i] = o;
        }
        const loop = () => {
            let tt = new Date().getTime();
            this.app.SimulationLoop(tt);
            setTimeout(loop, this.time);
        };
        setTimeout(loop, this.time);
    }
    render() {
        Stack.create();
        Stack.onKeyEvent((e: KeyEvent) => {
            switch (e.type) {
                case KeyType.Down:
                    this.app.HandleKeyDown(e);
                    break;
                case KeyType.Up:
                    this.app.HandleKeyUp(e);
                    break;
            }
        });
        Scroll.create();
        Scroll.zIndex(this.controlZindex);
        Scroll.visibility(this.visibile);
        Flex.create();
        Column.create();
        Column.width('100%');
        Text.create(this.title);
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Grey);
        Text.pop();
        Text.create(this.fps);
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Grey);
        Text.pop();
        Text.create("Tests");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Grey);
        Text.pop();
        Select.create(this.selectArr);
        Select.space(8);
        Select.selected(this.index);
        Select.value(this.selectArr[this.index].value);
        Select.font({ size: 20, weight: 200, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 30, weight: 300, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 20, weight: 200, family: 'serif', style: FontStyle.Normal });
        Select.onSelect((index: number) => {
            this.index = index;
            if (this.app) {
                this.app.m_test_index = index;
                this.app.LoadTest();
            }
        });
        Select.pop();
        this.connect_number_input("Vel Iters", this.m_settings.velocityIterations, (value: number): void => {
            this.m_settings.velocityIterations = value;
        }, 1, 20, 1, this);
        this.connect_number_input("Pos Iters", this.m_settings.positionIterations, (value: number): void => {
            this.m_settings.positionIterations = value;
        }, 1, 20, 1, this);
        // #if B2_ENABLE_PARTICLE
        this.connect_number_input("Pcl Iters", this.m_settings.particleIterations, (value: number): void => {
            this.m_settings.particleIterations = value;
        }, 1, 100, 1, this);
        // #endif
        this.connect_number_input("Hertz", this.m_settings.hz, (value: number): void => {
            this.m_settings.hz = value;
        }, 10, 120, 1, this);
        this.connect_checkbox_input("Sleep", this.m_settings.enableSleep, (value: boolean): void => {
            this.m_settings.enableSleep = value;
        }, this);
        this.connect_checkbox_input("Warm Starting", this.m_settings.enableWarmStarting, (value: boolean): void => {
            this.m_settings.enableWarmStarting = value;
        }, this);
        this.connect_checkbox_input("Time of Impact", this.m_settings.enableContinuous, (value: boolean): void => {
            this.m_settings.enableContinuous = value;
        }, this);
        this.connect_checkbox_input("Sub-Stepping", this.m_settings.enableSubStepping, (value: boolean): void => {
            this.m_settings.enableSubStepping = value;
        }, this);
        // #if B2_ENABLE_PARTICLE
        this.connect_checkbox_input("Strict Particle/Body Contacts", this.m_settings.strictContacts, (value: boolean): void => {
            this.m_settings.strictContacts = value;
        }, this);
        //    // #endif
        Text.create("Draw");
        //    // #endif
        Text.fontSize(16);
        //    // #endif
        Text.fontWeight(FontWeight.Bold);
        //    // #endif
        Text.fontColor(Color.Grey);
        //    // #endif
        Text.pop();
        this.connect_checkbox_input("Shapes", this.m_settings.drawShapes, (value: boolean): void => {
            this.m_settings.drawShapes = value;
        }, this);
        // #if B2_ENABLE_PARTICLE
        this.connect_checkbox_input("Particles", this.m_settings.drawParticles, (value: boolean): void => {
            this.m_settings.drawParticles = value;
        }, this);
        // #endif
        this.connect_checkbox_input("Joints", this.m_settings.drawJoints, (value: boolean): void => {
            this.m_settings.drawJoints = value;
        }, this);
        this.connect_checkbox_input("AABBs", this.m_settings.drawAABBs, (value: boolean): void => {
            this.m_settings.drawAABBs = value;
        }, this);
        this.connect_checkbox_input("Contact Points", this.m_settings.drawContactPoints, (value: boolean): void => {
            this.m_settings.drawContactPoints = value;
        }, this);
        this.connect_checkbox_input("Contact Normals", this.m_settings.drawContactNormals, (value: boolean): void => {
            this.m_settings.drawContactNormals = value;
        }, this);
        this.connect_checkbox_input("Contact Impulses", this.m_settings.drawContactImpulse, (value: boolean): void => {
            this.m_settings.drawContactImpulse = value;
        }, this);
        this.connect_checkbox_input("Friction Impulses", this.m_settings.drawFrictionImpulse, (value: boolean): void => {
            this.m_settings.drawFrictionImpulse = value;
        }, this);
        this.connect_checkbox_input("Center of Masses", this.m_settings.drawCOMs, (value: boolean): void => {
            this.m_settings.drawCOMs = value;
        }, this);
        this.connect_checkbox_input("Statistics", this.m_settings.drawStats, (value: boolean): void => {
            this.m_settings.drawStats = value;
        }, this);
        this.connect_checkbox_input("Profile", this.m_settings.drawProfile, (value: boolean): void => {
            this.m_settings.drawProfile = value;
        }, this);
        this.connect_button_input("Pause (P)", (e: ClickEvent): void => {
            this.app.Pause();
        }, this);
        this.connect_button_input("Single Step (O)", (e: ClickEvent): void => {
            this.app.SingleStep();
        }, this);
        this.connect_button_input("Restart (R)", (e: ClickEvent): void => {
            this.app.LoadTest();
        }, this);
        this.connect_button_input("Demo", (e: ClickEvent): void => {
            this.app.ToggleDemo();
        }, this);
        Column.pop();
        Flex.pop();
        Scroll.pop();
        Flex.create();
        Flex.width('100%');
        Flex.height('100%');
        Flex.position({ x: 0, y: 0 });
        Flex.zIndex(this.canvasZindex);
        Flex.onClick((event: ClickEvent) => {
        });
        Flex.onHover((isHover: boolean) => {
        });
        Flex.onMouse((e: MouseEvent) => {
            switch (e.action) {
                case MouseAction.Press:
                    this.app.HandleMouseDown(e);
                    break;
                case MouseAction.Release:
                    this.app.HandleMouseUp(e);
                    break;
                case MouseAction.Move:
                    this.app.HandleMouseMove(e);
                    break;
                case MouseAction.Hover:
                    this.app.HandleMouseWheel(e);
                    break;
            }
        });
        Flex.onTouch((e: TouchEvent) => {
            switch (e.type) {
                case TouchType.Down:
                    this.app.HandleTouchStart(e);
                    break;
                case TouchType.Up:
                    this.app.HandleTouchEnd(e);
                    break;
                case TouchType.Move:
                    this.app.HandleTouchMove(e);
                    break;
                case TouchType.Cancel:
                    break;
            }
        });
        Canvas.create(this.context);
        Canvas.width('100%');
        Canvas.height('100%');
        Canvas.backgroundColor('#ffff00');
        Canvas.onReady(() => {
            this.isLoad = true;
        });
        Canvas.pop();
        Flex.pop();
        Flex.create();
        Flex.width("30%");
        Flex.position({ x: -10, y: 70 });
        Flex.zIndex(999);
        Button.createWithLabel('图层切换');
        Button.fontColor(Color.White);
        Button.margin({ left: '10', top: '10' });
        Button.padding({ left: 20, right: 20, bottom: 10, top: 10 });
        Button.fontSize(this.commonFontSize);
        Button.onClick((event: ClickEvent) => {
            this.zindexRevers = !this.zindexRevers;
            if (!this.zindexRevers) {
                this.controlZindex = 99;
                this.canvasZindex = 1;
                this.visibile = Visibility.Visible;
            }
            else {
                this.controlZindex = 1;
                this.canvasZindex = 99;
                this.visibile = Visibility.None;
            }
        });
        Button.pop();
        Flex.pop();
        Stack.pop();
    }
    connect_number_input(label: string, init: number, update: (value: number) => void, min: number, max: number, step: number, parent = null) {
        Flex.create();
        Text.create(label);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(this.fontColor);
        Text.margin({ left: '20' });
        Text.fontSize(this.commonFontSize);
        Text.pop();
        TextInput.create({
            text: init + ''
        });
        TextInput.width('30%');
        TextInput.margin({ left: '20' });
        TextInput.textAlign(TextAlign.Start);
        TextInput.fontColor(this.fontColor);
        TextInput.fontSize(this.commonFontSize);
        TextInput.onChange((value: string) => {
            update(Number.parseInt(value, 10));
        });
        Flex.pop();
    }
    connect_checkbox_input(label: string, init: boolean, update: (value: boolean) => void, parent = null) {
        Flex.create();
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        Checkbox.select(init);
        Checkbox.selectedColor(0xed6f21);
        Checkbox.onChange((value: boolean) => {
            update(value);
        });
        Checkbox.pop();
        Text.create(label);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(this.fontColor);
        Text.margin({ left: '10' });
        Text.fontSize(this.commonFontSize);
        Text.pop();
        Flex.pop();
    }
    connect_button_input(label: string, callback: (e: ClickEvent) => void, parent = null) {
        Flex.create();
        Button.createWithLabel(label);
        Button.fontColor(Color.White);
        Button.margin({ left: '10', top: '10' });
        Button.padding({ left: 20, right: 20, bottom: 10, top: 10 });
        Button.fontSize(this.commonFontSize);
        Button.onClick((event: ClickEvent) => {
            callback(event);
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
