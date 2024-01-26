let __generate__Id: number = 0;
function generateId(): string {
    return "ReboundJsunit.test_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import rebound from '@ohos/rebound';
import { SourceEntity } from "./SourceEntity.test";
const BASE_COUNT: number = 2000;
export default function reboundJsunit() {
    describe('ReboundJS', () => {
        it('extend', 0, () => {
            let source: SourceEntity = {
                a: 55, b: 20
            };
            let target: SourceEntity = {
                a: 10, c: 30, d: 20
            };
            rebound.util.extend(target, source);
            expect(target.a == 55).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.util.extend(target, source);
            }
            endTime(startTime, 'ReboundJS');
        });
        it('removeFirst', 0, () => {
            let beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
            rebound.util.removeFirst(beasts, "bison");
            expect(beasts.indexOf('bison') == 3).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.util.removeFirst(beasts, "bison");
            }
            endTime(startTime, 'removeFirst');
        });
        it('hexToRGB', 0, () => {
            let hexcolor = "#FFA501";
            let rgb: any = rebound.util.hexToRGB(hexcolor);
            expect(rgb.r == 255 && rgb.g == 165 && rgb.b == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.util.hexToRGB(hexcolor);
            }
            endTime(startTime, 'hexToRGB');
        });
        it('rgbToHex', 0, () => {
            let hex = rebound.util.rgbToHex(255, 165, 1);
            expect(hex.toUpperCase() == "#FFA501").assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.util.rgbToHex(255, 165, 1);
            }
            endTime(startTime, 'rgbToHex');
        });
        it('mapValueInRange', 0, () => {
            let mappedval: any = rebound.MathUtil.mapValueInRange(10, 1, 100, 0, 1);
            expect(mappedval.toFixed(1) == 0.1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.MathUtil.mapValueInRange(10, 1, 100, 0, 1);
            }
            endTime(startTime, 'mapValueInRange');
        });
        it('interpolateColor', 0, () => {
            let rgb = rebound.MathUtil.interpolateColor(10, "#AAA501", "#FFA501", 10, 100, true);
            expect(rgb == "rgb(170,165,1)").assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.MathUtil.interpolateColor(10, "#AAA501", "#FFA501", 10, 100, true);
            }
            endTime(startTime, 'interpolateColor');
        });
        it('tensionFromOrigamiValue', 0, () => {
            let out = rebound.OrigamiValueConverter.tensionFromOrigamiValue(31);
            let expected = 197.62;
            expect(out).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.OrigamiValueConverter.tensionFromOrigamiValue(31);
            }
            endTime(startTime, 'tensionFromOrigamiValue');
        });
        it('origamiValueFromTension', 0, () => {
            let out = rebound.OrigamiValueConverter.origamiValueFromTension(197.62);
            let expected = 31;
            expect(out).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.OrigamiValueConverter.origamiValueFromTension(197.62);
            }
            endTime(startTime, 'origamiValueFromTension');
        });
        it('frictionFromOrigamiValue', 0, () => {
            let out = rebound.OrigamiValueConverter.frictionFromOrigamiValue(9);
            let expected = 28;
            expect(out).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.OrigamiValueConverter.frictionFromOrigamiValue(9);
            }
            endTime(startTime, 'frictionFromOrigamiValue');
        });
        it('origamiFromFriction', 0, () => {
            let out = rebound.OrigamiValueConverter.origamiFromFriction(28);
            let expected = 9;
            expect(out).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.OrigamiValueConverter.origamiFromFriction(28);
            }
            endTime(startTime, 'origamiFromFriction');
        });
        it('degreesToRadians', 0, () => {
            let out = rebound.MathUtil.degreesToRadians(180);
            expect(out).assertEqual(Math.PI);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.MathUtil.degreesToRadians(180);
            }
            endTime(startTime, 'degreesToRadians');
        });
        it('radiansToDegrees', 0, () => {
            let out = rebound.MathUtil.radiansToDegrees(Math.PI);
            expect(out).assertEqual(180);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.MathUtil.radiansToDegrees(Math.PI);
            }
            endTime(startTime, 'radiansToDegrees');
        });
        it('SpringSystem', 0, () => {
            let spring = new rebound.Spring(new rebound.SpringSystem());
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG); //Tension 40, Friction 7
            spring.setEndValue(1);
            spring.advance(Date.now() / 1000, 17 / 1000);
            expect(spring.getCurrentValue() > 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.Spring(new rebound.SpringSystem());
            }
            endTime(startTime, 'SpringSystem');
        });
        //
        it('BouncyConversion.normalize', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.normalize(10, 1, 100)).assertEqual(0.09090909090909091);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.normalize(10, 1, 100);
            }
            endTime(startTime, 'BouncyConversion.normalize');
        });
        it('BouncyConversion.projectNormal', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.projectNormal(10, 1, 100)).assertEqual(991);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.projectNormal(10, 1, 100);
            }
            endTime(startTime, 'BouncyConversion.projectNormal');
        });
        it('BouncyConversion.linearInterpolation', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.linearInterpolation(10, 1, 100)).assertEqual(991);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.linearInterpolation(10, 1, 100);
            }
            endTime(startTime, 'BouncyConversion.linearInterpolation');
        });
        it('BouncyConversion.quadraticOutInterpolation', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.quadraticOutInterpolation(10, 1, 100)).assertEqual(-7919);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.quadraticOutInterpolation(10, 1, 100);
            }
            endTime(startTime, 'hexToRGB');
        });
        it('BouncyConversion.b3Friction1', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.b3Friction1(10)).assertEqual(5.28);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.b3Friction1(10);
            }
            endTime(startTime, 'BouncyConversion.b3Friction1');
        });
        it('BouncyConversion.b3Friction2', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.b3Friction2(10)).assertEqual(5.044);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bc = new rebound.BouncyConversion(10, 20);
                bc.b3Friction2(10);
            }
            endTime(startTime, 'BouncyConversion.b3Friction2');
        });
        it('BouncyConversion.b3Friction3', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.BouncyConversion(10, 20);
            }
            endTime(startTime, 'BouncyConversion.b3Friction3');
        });
        it('BouncyConversion.b3Nobounce', 0, () => {
            let bc = new rebound.BouncyConversion(10, 20);
            expect(bc.b3Nobounce(10)).assertEqual(5.28);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let bca = new rebound.BouncyConversion(10, 20);
                bca.b3Nobounce(10);
            }
            endTime(startTime, 'BouncyConversion.b3Nobounce');
        });
        it('fromOrigamiTensionAndFriction', 0, () => {
            let springConfig = rebound.SpringConfig.fromOrigamiTensionAndFriction(10, 10);
            expect(springConfig.tension === undefined || springConfig.friction === undefined).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.SpringConfig.fromOrigamiTensionAndFriction(10, 10);
            }
            endTime(startTime, 'fromOrigamiTensionAndFriction');
        });
        it('fromBouncinessAndSpeed', 0, () => {
            let springConfig = rebound.SpringConfig.fromBouncinessAndSpeed(10, 10);
            expect(springConfig.tension === undefined || springConfig.friction === undefined).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.SpringConfig.fromBouncinessAndSpeed(10, 10);
            }
            endTime(startTime, 'fromBouncinessAndSpeed');
        });
        it('coastingConfigWithOrigamiFriction', 0, () => {
            let springConfig = rebound.SpringConfig.coastingConfigWithOrigamiFriction(10);
            expect(springConfig.tension === undefined || springConfig.friction === undefined).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                rebound.SpringConfig.coastingConfigWithOrigamiFriction(10);
            }
            endTime(startTime, 'coastingConfigWithOrigamiFriction');
        });
        it('spring.getId', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getId().length > 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.SpringSystem().createSpring(10, 10);
            }
            endTime(startTime, 'spring.getId');
        });
        it('spring.setSpringConfig', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            let springConfig = rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
            spring.setSpringConfig(springConfig);
            expect(spring.getSpringConfig() == springConfig).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setSpringConfig(springConfig);
            }
            endTime(startTime, 'spring.setSpringConfig');
        });
        it('spring.setCurrentValue', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setCurrentValue(10, false);
            expect(spring.getStartValue() == 10 && spring.getCurrentValue() == 10).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setCurrentValue(10, false);
            }
            endTime(startTime, 'spring.setCurrentValue');
        });
        it('spring.getCurrentDisplacementDistance', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getCurrentDisplacementDistance() != undefined).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.getCurrentDisplacementDistance();
            }
            endTime(startTime, 'spring.getCurrentDisplacementDistance');
        });
        it('spring.setEndValue', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setEndValue(1.0);
            expect(spring.getEndValue() == 1.0 && !springsystem.getIsIdle()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                let springsystem2 = new rebound.SpringSystem();
                let spring2 = new rebound.Spring(springsystem2);
                spring2.setEndValue(1.0);
            }
            endTime(startTime, 'spring.setEndValue');
        });
        it('spring.setVelocity', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setVelocity(15);
            expect(spring.getVelocity() == 15 && !springsystem.getIsIdle()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setVelocity(15);
            }
            endTime(startTime, 'spring.setVelocity');
        });
        it('spring.getRestSpeedThreshold', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getRestSpeedThreshold() == .005).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.getRestSpeedThreshold();
            }
            endTime(startTime, 'spring.getRestSpeedThreshold');
        });
        it('spring.setRestSpeedThreshold', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getRestSpeedThreshold() == .005).assertTrue();
            spring.setRestSpeedThreshold(1);
            expect(spring.getRestSpeedThreshold() == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setRestSpeedThreshold(1);
            }
            endTime(startTime, 'spring.setRestSpeedThreshold');
        });
        it('spring.getRestDisplacementThreshold', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getRestDisplacementThreshold() == .005).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.getRestDisplacementThreshold();
            }
            endTime(startTime, 'spring.getRestDisplacementThreshold');
        });
        it('spring.setRestDisplacementThreshold', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(spring.getRestDisplacementThreshold() == .005).assertTrue();
            spring.setRestDisplacementThreshold(1);
            expect(spring.getRestDisplacementThreshold() == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setRestDisplacementThreshold(1);
            }
            endTime(startTime, 'spring.setRestDisplacementThreshold');
        });
        it('spring.setOvershootClampingEnabled', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setOvershootClampingEnabled(true);
            expect(spring.isOvershootClampingEnabled()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setOvershootClampingEnabled(true);
            }
            endTime(startTime, 'spring.setOvershootClampingEnabled');
        });
        it('spring.destroy', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = springsystem.createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(springsystem.getSpringById(spring.getId()) === undefined).assertFalse();
            expect(spring.getListeners().length > 0).assertTrue();
            spring.destroy();
            expect(springsystem.getSpringById(spring.getId()) == undefined).assertTrue();
            expect(spring.getListeners().length == 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.destroy();
            }
            endTime(startTime, 'spring.destroy');
        });
        it('spring.advance', 0, () => {
            let spring = new rebound.Spring(new rebound.SpringSystem());
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG); //Tension 40, Friction 7
            spring.setEndValue(1);
            spring.advance(Date.now() / 1000, 17 / 1000);
            expect(spring.getCurrentValue() > 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.advance(Date.now() / 1000, 17 / 1000);
            }
            endTime(startTime, 'spring.advance');
        });
        it('spring.isAtRest', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setAtRest();
            expect(spring.isAtRest()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.isAtRest();
            }
            endTime(startTime, 'spring.isAtRest');
        });
        it('spring.getListeners', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.removeAllListeners();
            expect(spring.getListeners().length == 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.getListeners();
            }
            endTime(startTime, 'spring.getListeners');
        });
        it('spring.removeAllListeners', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.removeAllListeners();
            expect(spring.getListeners().length == 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.removeAllListeners();
            }
            endTime(startTime, 'spring.removeAllListeners');
        });
        it('SpringSystem.createSpring', 0, () => {
            let spring = new rebound.SpringSystem().createSpring(10, 10);
            expect(spring != undefined).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.SpringSystem().createSpring(10, 10);
            }
            endTime(startTime, 'SpringSystem.createSpring');
        });
        it('SpringSystem.createSpringWithBouncinessAndSpeed', 0, () => {
            let spring = new rebound.SpringSystem().createSpringWithBouncinessAndSpeed(10, 10);
            expect(spring.getSpringConfig().tension >= 0 && spring.getSpringConfig().friction >= 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.SpringSystem().createSpringWithBouncinessAndSpeed(10, 10);
            }
            endTime(startTime, 'SpringSystem.createSpringWithBouncinessAndSpeed');
        });
        it('SpringSystem.createSpringWithConfig', 0, () => {
            let spring = new rebound.SpringSystem().createSpringWithConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            expect(spring != undefined).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new rebound.SpringSystem().createSpringWithConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            }
            endTime(startTime, 'SpringSystem.createSpringWithConfig');
        });
        it('SpringSystem.getIsIdle', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = springsystem.createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(springsystem.getIsIdle()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.getIsIdle();
            }
            endTime(startTime, 'SpringSystem.getIsIdle');
        });
        it('SpringSystem.setEndValue', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = springsystem.createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            spring.setEndValue(1.0);
            expect(springsystem.getIsIdle()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                spring.setEndValue(1.0);
            }
            endTime(startTime, 'SpringSystem.setEndValue');
        });
        it('SpringSystem.getSpringById', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = springsystem.createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(springsystem.getSpringById(spring.getId()) != undefined).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.getSpringById(spring.getId());
            }
            endTime(startTime, 'SpringSystem.getSpringById');
        });
        it('SpringSystem.getAllSprings', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = springsystem.createSpring(10, 10);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(springsystem.getAllSprings().length == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.getAllSprings();
            }
            endTime(startTime, 'SpringSystem.getAllSprings');
        });
        it('SpringSystem.registerSpring01', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            expect(springsystem.getAllSprings().length == 0).assertTrue();
            springsystem.registerSpring(spring);
            expect(springsystem.getAllSprings().length == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.registerSpring(spring);
            }
            endTime(startTime, 'SpringSystem.registerSpring01');
        });
        it('SpringSystem.registerSpring1', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            springsystem.registerSpring(spring);
            expect(springsystem.getAllSprings().length == 1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.registerSpring(spring);
            }
            endTime(startTime, 'SpringSystem.registerSpring1');
        });
        it('SpringSystem.deregisterSpring', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            springsystem.deregisterSpring(spring);
            expect(springsystem.getAllSprings().length == 0).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.deregisterSpring(spring);
            }
            endTime(startTime, 'SpringSystem.deregisterSpring');
        });
        it('SpringSystem.activateSpring', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            springsystem.activateSpring(spring);
            expect(springsystem.getIsIdle()).assertFalse();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.activateSpring(spring);
            }
            endTime(startTime, 'SpringSystem.activateSpring');
        });
        it('SpringSystem.registerSpring', 0, () => {
            let springsystem = new rebound.SpringSystem();
            let spring = new rebound.Spring(springsystem);
            spring.setSpringConfig(rebound.SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG);
            spring.addListener({
                onSpringUpdate: (spring: string) => {
                }
            });
            springsystem.registerSpring(spring);
            expect(springsystem.getIsIdle()).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                springsystem.registerSpring(spring);
            }
            endTime(startTime, 'SpringSystem.registerSpring');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
