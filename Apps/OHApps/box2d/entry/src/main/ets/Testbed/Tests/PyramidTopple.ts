/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
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
import * as testbed from '../Testbed';

export class PyramidTopple extends testbed.Test {
  constructor() {
    super();

    const WIDTH = 4;
    const HEIGHT = 30;

    const add_domino = (world: box2d.b2World, pos: box2d.b2Vec2, flipped: boolean) => {
      const mass = 1;

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position.Copy(pos);
      const body = world.CreateBody(bd);

      const shape = new box2d.b2PolygonShape();
      if (flipped) {
        shape.SetAsBox(0.5 * HEIGHT, 0.5 * WIDTH);
      } else {
        shape.SetAsBox(0.5 * WIDTH, 0.5 * HEIGHT);
      }

      const fd = new box2d.b2FixtureDef();
      fd.shape = shape;
      fd.density = mass / (WIDTH * HEIGHT);
      fd.friction = 0.6;
      fd.restitution = 0.0;
      body.CreateFixture(fd);
    };

    const world = this.m_world;
    ///settings.positionIterations = 30; // cpSpaceSetIterations(space, 30);
    ///world.SetGravity(new box2d.b2Vec2(0, -300)); // cpSpaceSetGravity(space, cpv(0, -300));
    ///box2d.b2_timeToSleep = 0.5; // cpSpaceSetSleepTimeThreshold(space, 0.5f);
    ///box2d.b2_linearSlop = 0.5; // cpSpaceSetCollisionSlop(space, 0.5f);

    // Add a floor.
    const bd = new box2d.b2BodyDef();
    const body = world.CreateBody(bd);
    const shape = new box2d.b2EdgeShape();
    shape.Set(new box2d.b2Vec2(-600, -240), new box2d.b2Vec2(600, -240));
    const fd = new box2d.b2FixtureDef();
    fd.shape = shape;
    fd.friction = 1.0;
    fd.restitution = 1.0;
    body.CreateFixture(fd);

    // Add the dominoes.
    const n = 12;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < (n - i); j++) {
        const offset = new box2d.b2Vec2((j - (n - 1 - i) * 0.5) * 1.5 * HEIGHT, (i + 0.5) * (HEIGHT + 2 * WIDTH) - WIDTH - 240);
        add_domino(world, offset, false);
        add_domino(world, box2d.b2Vec2.AddVV(offset, new box2d.b2Vec2(0, (HEIGHT + WIDTH) / 2), new box2d.b2Vec2()), true);

        if (j === 0) {
          add_domino(world, box2d.b2Vec2.AddVV(offset, new box2d.b2Vec2(0.5 * (WIDTH - HEIGHT), HEIGHT + WIDTH), new box2d.b2Vec2()), false);
        }

        if (j !== n - i - 1) {
          add_domino(world, box2d.b2Vec2.AddVV(offset, new box2d.b2Vec2(HEIGHT * 0.75, (HEIGHT + 3 * WIDTH) / 2), new box2d.b2Vec2()), true);
        } else {
          add_domino(world, box2d.b2Vec2.AddVV(offset, new box2d.b2Vec2(0.5 * (HEIGHT - WIDTH), HEIGHT + WIDTH), new box2d.b2Vec2()), false);
        }
      }
    }
  }

  public GetDefaultViewZoom(): number {
    return 10.0;
  }

  public static Create() {
    return new PyramidTopple();
  }
}
