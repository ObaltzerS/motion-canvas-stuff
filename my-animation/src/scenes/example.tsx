import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Text, Line} from '@motion-canvas/2d/lib/components';
import {createSignal} from '@motion-canvas/core/lib/signals';
import {Vector2} from '@motion-canvas/core/lib/types';
import {waitFor} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const radius = createSignal(3);
  const diameter = createSignal(() => radius() * 2);
  const circumference = createSignal(() => Math.PI * diameter());
  const area = createSignal(() => Math.PI * radius() * radius());
  const rotation = createSignal(() => Math.PI / 4);

  const scale = 100;
  const textStyle = {
    fontWeight: 700,
    fontSize: 56,
    offsetY: -1,
    padding: 20,
    cache: true,
  };

  view.add(
    <>
      <Circle
        width={() => radius() * scale * 2}
        height={() => radius() * scale * 2}
        fill={'#e13238'}
        rotation={rotation()}
      />
      <Line
        points={[
          () => Vector2.left.scale(radius() * scale),
          () => Vector2.right.scale(radius() * scale),
        ]}
        lineDash={[20, 20]}
        startArrow
        endArrow
        startOffset={8}
        endOffset={8}
        lineWidth={8}
        stroke={'#242424'}
        rotation={rotation()}
      />
      <Line
        points={[
          () => Vector2.up.scale(radius() * scale),
          Vector2.down.scale(0),
        ]}
        lineDash={[20, 20]}
        startArrow
        endArrow
        startOffset={8}
        endOffset={8}
        lineWidth={8}
        stroke={'#242424'}
        rotation={rotation()}
      />
      <Text
        text={() => `D = ${diameter().toFixed(2)}`}
        x={() => (radius() * scale) / 2}
        fill={'#242424'}
        {...textStyle}
      />
      <Text
        text={() => `A = ${area().toFixed(2)}`}
        y={() => radius() * scale}
        fill={'#e13238'}
        {...textStyle}
      />
      <Text
        text={() => `C = ${circumference().toFixed(2)}`}
        x={() => radius() * scale}
        offsetX={-1}
        fill={'#e13238'}
        {...textStyle}
      />
      <Text
        text={() => `r = ${radius().toFixed(2)}`}
        y={() => (radius() * scale) / 3}
        offsetX={-1}
        fill={'#242424'}
        {...textStyle}
      />
        
    </>,
  );

  yield* radius(4, 2).to(3, 2);
  yield* rotation(0, 2).to(Math.PI / 4, 2);
  //yield* waitFor(1);
});