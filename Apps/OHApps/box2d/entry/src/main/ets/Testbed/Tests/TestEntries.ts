/*
* Copyright (c) 2006-2009 Erin Catto http://www.box2d.org
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

import { TestEntry } from "../Framework/Test";

import { AddPair } from "./AddPair";
import { ApplyForce } from "./ApplyForce";
import { BasicSliderCrank } from "./BasicSliderCrank";
import { BodyTypes } from "./BodyTypes";
import { Breakable } from "./Breakable";
import { Bridge } from "./Bridge";
import { BulletTest } from "./BulletTest";
import { Cantilever } from "./Cantilever";
import { Car } from "./Car";
import { ContinuousTest } from "./ContinuousTest";
import { Chain } from "./Chain";
import { CharacterCollision } from "./CharacterCollision";
import { CollisionFiltering } from "./CollisionFiltering";
import { CollisionProcessing } from "./CollisionProcessing";
import { CompoundShapes } from "./CompoundShapes";
import { Confined } from "./Confined";
import { ConvexHull } from "./ConvexHull";
import { ConveyorBelt } from "./ConveyorBelt";
import { DistanceTest } from "./DistanceTest";
import { Dominos } from "./Dominos";
import { DumpShell } from "./DumpShell";
import { DynamicTreeTest } from "./DynamicTreeTest";
import { EdgeShapes } from "./EdgeShapes";
import { EdgeTest } from "./EdgeTest";
import { Gears } from "./Gears";
import { HeavyOnLight } from "./HeavyOnLight";
import { HeavyOnLightTwo } from "./HeavyOnLightTwo";
import { Mobile } from "./Mobile";
import { MobileBalanced } from "./MobileBalanced";
import { MotorJoint } from "./MotorJoint";
import { OneSidedPlatform } from "./OneSidedPlatform";
import { Pinball } from "./Pinball";
import { PolyCollision } from "./PolyCollision";
import { PolyShapes } from "./PolyShapes";
import { Prismatic } from "./Prismatic";
import { Pulleys } from "./Pulleys";
import { Pyramid } from "./Pyramid";
import { RayCast } from "./RayCast";
import { Revolute } from "./Revolute";
import { RopeJoint } from "./RopeJoint";
import { SensorTest } from "./SensorTest";
import { ShapeCast } from "./ShapeCast";
import { ShapeEditing } from "./ShapeEditing";
import { Skier } from "./Skier";
import { SliderCrank } from "./SliderCrank";
import { SphereStack } from "./SphereStack";
import { TheoJansen } from "./TheoJansen";
import { Tiles } from "./Tiles";
import { TimeOfImpact } from "./TimeOfImpact";
import { Tumbler } from "./Tumbler";
import { VaryingFriction } from "./VaryingFriction";
import { VaryingRestitution } from "./VaryingRestitution";
import { VerticalStack } from "./VerticalStack";
import { Web as MyWeb} from "./Web";

import { Rope } from "./Rope";

import { MotorJoint2 } from "./MotorJoint2";
import { BlobTest } from "./BlobTest";
import { TestCCD } from "./TestCCD";
import { TestRagdoll } from "./TestRagdoll";
import { TestStack } from "./TestStack";
import { PyramidTopple } from "./PyramidTopple";
import { DominoTower } from "./DominoTower";
import { TopdownCar } from "./TopdownCar";

// #if B2_ENABLE_CONTROLLER
import { BuoyancyTest } from "./BuoyancyTest";
// #endif

// #if B2_ENABLE_PARTICLE
import { Sandbox } from "./Sandbox";
import { Sparky } from "./Sparky";
import { DamBreak } from "./DamBreak";
import { LiquidTimer } from "./LiquidTimer";
import { WaveMachine } from "./WaveMachine";
import { Particles } from "./Particles";
import { Faucet } from "./Faucet";
import { DrawingParticles } from "./DrawingParticles";
import { Soup } from "./Soup";
import { ParticlesSurfaceTension } from "./ParticlesSurfaceTension";
import { ElasticParticles } from "./ElasticParticles";
import { RigidParticles } from "./RigidParticles";
import { MultipleParticleSystems } from "./MultipleParticleSystems";
import { Impulse } from "./Impulse";
import { SoupStirrer } from "./SoupStirrer";
import { Fracker } from "./Fracker";
import { Maxwell } from "./Maxwell";
import { Ramp } from "./Ramp";
import { Pointy } from "./Pointy";
import { AntiPointy } from "./AntiPointy";
import { CornerCase } from "./CornerCase";
import { ParticleCollisionFilter } from "./ParticleCollisionFilter";
import { EyeCandy } from "./EyeCandy";
// #endif

import { Segway } from "./Segway";

export const g_testEntries: TestEntry[] = [
  // #if B2_ENABLE_PARTICLE
  new TestEntry("Sparky", Sparky.Create),//0 大小球碰撞，无小球，有三条大球半径线
  // #endif

  new TestEntry("Shape Cast", ShapeCast.Create),//1 图标排列，无差异
  new TestEntry("Time of Impact", TimeOfImpact.Create),//2 交互动画 ，拖方块轨迹变化，差异无数字显示
  new TestEntry("Character Collision", CharacterCollision.Create),//sss3 交互动画，有静态效果，暂无交互
  new TestEntry("Tiles", Tiles.Create),//4 交互动画，拖动可对各砖块进行拖移，目前无交互
  new TestEntry("Heavy on Light", HeavyOnLight.Create),//5 交互动画 ，目前除不能交互外，图像差异还有，大小两圆，目前都是只有半径线
  new TestEntry("Heavy on Light Two", HeavyOnLightTwo.Create),//6交互动画 ，目前除不能交互外，图像差异还有，可变色两小圆，目前都是只有半径线
  new TestEntry("Vertical Stack", VerticalStack.Create),//sss7 交互动画，(整体为墙倾倒)可拖动方块，目前无交互
  new TestEntry("Basic Slider Crank", BasicSliderCrank.Create),//8 交互动画，(左机械臂)可拖动方块，目前无交互
  new TestEntry("Slider Crank", SliderCrank.Create),//sss9 交互动画，(向上推砖机械臂)可拖动方块，目前无交互
  new TestEntry("Sphere Stack", SphereStack.Create),//sss10 交互动画 ，(整体为墙倾倒)可拖动变色圆形，目前无交互，圆形只有半径线
  new TestEntry("Convex Hull", ConvexHull.Create),//sss11 不规则图形填充，目前无数字显示
  new TestEntry("Tumbler", Tumbler.Create),//sss12 旋转方形容器内注入很多小方块
  new TestEntry("Ray-Cast", RayCast.Create),//sss13 棍子一端固定，绕其旋转
  new TestEntry("Dump Shell", DumpShell.Create),//14 交互动画，固定方形容器内类似伸缩鱼竿，两节方块均可拖动，目前无交互
  new TestEntry("Apply Force", ApplyForce.Create),//sss15 交互动画，可拖动指南针图标撞击被定点牵引的小方块，撞击后小方块变色，目前无交互
  new TestEntry("Continuous Test", ContinuousTest.Create),//sss16 小棍撞击定点木桩后被随机弹飞或停住
  new TestEntry("Motor Joint", MotorJoint.Create),//sss17交互动画，可变色定点方块可被拖拽，松开后弹回原位
  new TestEntry("One-Sided Platform", OneSidedPlatform.Create),//sss18 交互动画，方桌上可变色小球可被拖动，目前无交互
  new TestEntry("Mobile", Mobile.Create),//19 交互动画，天平上两端同等数量的同等质量的砝码，砝码可拖动，目前无交互
  new TestEntry("MobileBalanced", MobileBalanced.Create),//20 交互动画，天平上两端同等数量的同等质量的可变色砝码，砝码可拖动，目前无交互
  new TestEntry("Conveyor Belt", ConveyorBelt.Create),//sss21 交互动画 五个可变色方块从桌面依次掉落，目前无交互
  new TestEntry("Gears", Gears.Create),//sss22 交互动画，两组由滑轮组成的可变色拖动动画，目前无交互，圆形只有半径线
  new TestEntry("Varying Restitution", VaryingRestitution.Create),//sss23 交互动画，五个可拖动的弹力小球落下后弹起，静置后变灰，目前无交互，圆形只有半径线
  new TestEntry("Cantilever", Cantilever.Create),//sss24 交互动画，两角度斜坡上固定两个可拖动方块链，掉落的其他可变色元件也可拖动，目前无交互
  new TestEntry("Edge Test", EdgeTest.Create),//25 交互动画，在不规则平面上静置的方形圆形可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Body Types", BodyTypes.Create),//sss26 交互动画，T形桌面上静置一个可变色可被拖动的方块，另外T形桌子也可被拖动，呈不稳定形态，目前无交互
  new TestEntry("Shape Editing", ShapeEditing.Create),//sss27 交互动画，可变色大方块可被拖动，目前无交互
  new TestEntry("Car", Car.Create),//sss28 交互动画，可被拖动的小车被拖过高山，跷跷板，软桥，目前无交互
  new TestEntry("Prismatic", Prismatic.Create),//sss29 交互动画，可被拖动的木板被以固定角度的折线条固定,拖动后弹回原位，目前无交互
  new TestEntry("Revolute", Revolute.Create),//sss30 交互动画，一个大圆从高处落下，微微弹起小三角，目前无交互，圆形只有半径线
  new TestEntry("Pulleys", Pulleys.Create),//sss31 交互动画，两个滑轮两端各有一个方块，方块可变色拖动，目前无交互
  new TestEntry("Polygon Shapes", PolyShapes.Create),//sss32 平面上有一个嵌入平面1/3的圆，目前圆形未展示
  new TestEntry("Web", MyWeb.Create),//sss33 交互动画，一个球门网的形状，顶点小方块可拖拽，目前无交互
  new TestEntry("RopeJoint", RopeJoint.Create),//34 交互动画，重力摆锤，锤身可拖动，目前无交互
  new TestEntry("Pinball", Pinball.Create),//35交互动画，可变色拖动小球掉入底部为漏斗形状的容器里，目前无交互，小球只有半径线
  new TestEntry("Bullet Test", BulletTest.Create),//sss36 棍子和方块随机掉落定点，随机弹开或静置
  new TestEntry("Confined", Confined.Create),//sss37 固定方块容器，吴动画效果
  new TestEntry("Pyramid", Pyramid.Create),//38 交互动画，可拖动金字塔砖块，目前无交互
  new TestEntry("Theo Jansen's Walker", TheoJansen.Create),//sss39 交互动画，平面上小球为沙子，螃蟹横向走动可被拖动，目前无交互，小圆只有半径线
  new TestEntry("Edge Shapes", EdgeShapes.Create),//sss40 被固定一端的木棍在曲线上方摆动并被动态切割
  new TestEntry("PolyCollision", PolyCollision.Create),//41两个方块固定位置，无动画效果
  new TestEntry("Bridge", Bridge.Create),//42 交互动画，软桥上圆形和三角形可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Breakable", Breakable.Create),//sss43 交互动画，两个相对静止的可被拖动方块从上方掉落后摔开，目前无交互
  new TestEntry("Chain", Chain.Create),//sss44交互动画，一条被挂起来的方块链，每节都可被拖动，目前无交互
  new TestEntry("Collision Filtering", CollisionFiltering.Create),//sss45 交互动画 多个分离的图形可被拖动变色，目前无交互，圆形只有半径线
  new TestEntry("Collision Processing", CollisionProcessing.Create),//sss46 交互动画 多个图形静置后变灰拖动可吞噬，目前无交互，圆形只有半径线
  new TestEntry("Compound Shapes", CompoundShapes.Create),//sss47 交互动画 多图形与小桶同时掉落，可拖动变色，目前无交互，圆形只有半径线
  new TestEntry("Distance Test", DistanceTest.Create),//sss48 两个平板衔接，无交互点击切换图层
  new TestEntry("Dominos", Dominos.Create),//sss49 交互动画，多骨诺米牌形式的动画，环节中图形可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Dynamic Tree", DynamicTreeTest.Create),//sss50 不规则排列的图形，点击切换图层
  new TestEntry("Sensor Test", SensorTest.Create),//sss51 交互动画 多个小圆可被拖进大圆中旋转，目前无交互，圆形只有半径线
  new TestEntry("Varying Friction", VaryingFriction.Create),//sss52 交互动画 多个方块从既定路线滑落可拖动改变，目前无交互
  new TestEntry("Add Pair Stress Test", AddPair.Create),//53 橡皮擦将笔记擦去的动画，无交互
  new TestEntry("Skier", Skier.Create),//54 交互动画，可拖动倒置螺丝钉在固定平面滑行，目前无交互

  new TestEntry("Rope", Rope.Create),//sss55 皮筋动画无交互

  new TestEntry("Motor Joint (Bug #487)", MotorJoint2.Create),//sss56 交互动画两个被棍子连接的圆可被拖动，目前无交互
  new TestEntry("Blob Test", BlobTest.Create),//sss57 交互动画 以小圆串起来的弹性大圆可被拖动旋转，目前无交互，圆形只有半径线
  new TestEntry("Continuous Collision", TestCCD.Create),//58 交互动画，大小圆形和一个桶形在固定容器被碰撞，可被拖动，目前无交互
  new TestEntry("Ragdolls", TestRagdoll.Create),//59 交互动画 两个人形从楼梯滚落，可拖动，形状可变色，目前无交互
  new TestEntry("Stacked Boxes", TestStack.Create),//60 交互动画，大圆和三面墙同时落下，大圆落在了斜坡上撞倒了墙，过程中图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Pyramid Topple", PyramidTopple.Create),//61 交互动画，矩形组成的金字塔，可拖拽矩形，目前无交互
  new TestEntry("Domino Tower", DominoTower.Create),//sss63 交互动画，两个方形撞击金字塔，过程中形状都可拖动，目前无交互
  new TestEntry("TopDown Car", TopdownCar.Create),//63 交互动画，汽车可被拖动进方形容器，目前无交互

  // #if B2_ENABLE_CONTROLLER
  new TestEntry("Buoyancy Test", BuoyancyTest.Create),//64 交互动画，多形状从水底浮起，十字形从水面落下，过程中形状都可被拖动，目前无交互，圆形只有半径线
  // #endif

  // #if B2_ENABLE_PARTICLE
  new TestEntry("Sandbox", Sandbox.Create),//65 交互动画 彩色小球从固定路线不断落下，大矩形可沿固定路线围堵，形状均可被拖动，目前无交互，圆形只有半径线
  // new TestEntry("Sparky", Sparky.Create),
  new TestEntry("DamBreak", DamBreak.Create),//sss66 交互动画，无数小球在方形容器内以水流状态存在，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Liquid Timer", LiquidTimer.Create),//67 交互动画，水流小球以固定路线流下，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Wave Machine", WaveMachine.Create),//sss68 交互动画 水流小球在不断摇晃的容器中，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Particles", Particles.Create),//sss69 交互动画 大圆和水流小球一起落进水渠，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Faucet", Faucet.Create),//70 交互动画 水流小球不断从高处水龙头中流出，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Particle Drawing", DrawingParticles.Create),//sss71  固定的图形，无动画
  new TestEntry("Soup", Soup.Create),//72 交互动画 方块被水流小球淹没，图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Surface Tension", ParticlesSurfaceTension.Create),//73 交互动画，大圆和彩色水流小球一起落下，图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Elastic Particles", ElasticParticles.Create),//74 交互动画，由彩色水球固定弹性形状与大圆一起落下，图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Rigid Particles", RigidParticles.Create),//75交互动画，由彩色水球固定无弹性形状与大圆一起落下，图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Multiple Systems", MultipleParticleSystems.Create),//76交互动画，大的方形被两边不断涌出的蓝色红色小球冲击，形状均可拖动，目前无交互，圆形只有半径线
  new TestEntry("Impulse", Impulse.Create),//77 交互动画，无数小球在方形容器内以水流状态存在，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Soup Stirrer", SoupStirrer.Create),//78 交互动画 多图形被水流小球淹没，图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Fracker", Fracker.Create),//79 交互动画 网格墙中有不同颜色的小球在空格内，可被拖拽但有局限，目前无交互，圆形只有半径线
  new TestEntry("Maxwell", Maxwell.Create),//80 交互动画，方形容器中有一些不断碰撞的小球，开始有隔板可移动可去掉,图形均可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Ramp", Ramp.Create),//81 交互动画，相对静止的无数小球落到斜坡后被撞碎，可拖拽小球，目前无交互，圆形只有半径线
  new TestEntry("Pointy", Pointy.Create),//82 交互动画，小球被以两个方向喷出，可拖拽改变方向，目前无交互，圆形只有半径线
  new TestEntry("AntiPointy", AntiPointy.Create),//83 交互动画，一定数量小球落到固定容器，可拖拽小球，目前无交互，圆形只有半径线
  new TestEntry("Corner Case", CornerCase.Create),//84 交互动画 水流小球落进固定容器，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Particle Collisions", ParticleCollisionFilter.Create),//85 交互动画，交互动画 水流小球在固定容器中碰撞，小球可被拖动，目前无交互，圆形只有半径线
  new TestEntry("Eye Candy", EyeCandy.Create),//86 交互动画 容器中有个摆动的木板不可拖动，搅动水流小球，小球可被拖动，目前无交互，圆形只有半径线，图形过大，不能完全展示
  // #endif

  new TestEntry("Segway", Segway.Create),//87 交互动画，木板下连接一个小圆，可不断来回滚动，可以拖拽改变方向，目前无交互，圆形只有半径线
];
