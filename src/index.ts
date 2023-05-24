import {
  Canvas, Text, Group, Rect
}  from 'fabric';
import './styles.css';
import MyGroup from './MyGroup';

const canvas = new Canvas('canvas1', {
  backgroundColor: '#F8F8F8',
  width: 800,
  height: 600,
});

const zero = new Text('Zero', { left: 100, top: 0 });

const hello = new Text('Hello', { left: 0, top: 0 });
console.log(hello.left)
const world = new Text('World', { left: 150, top: 50 });

const hello2 = new Text('Hello2', { left: 0, top: 0 });
const world2 = new Text('World2', { left: 150, top: 150 });

const rect = new Rect({ left: 50, top: 50, width: 100, height: 100,  backgroundColor: '#0000ff'});

const group = new MyGroup([], {
  // layout: 'fixed',
  left: 100,
  top: 100,
  backgroundColor: '#add8e6'
});

const subgroup = new MyGroup([], {
  left: 250, 
  top: 250, 
  backgroundColor: '#32CD32'
})

canvas.add(zero);
console.log('zero', zero.left, zero.top, zero.originX, !!zero.canvas);
canvas.add(group);
console.log('group', group.left, group.top, group.getX(), group.getY(), !!zero.canvas);

setTimeout(() => {
  group.add(hello);
  canvas.renderAll();
  console.log('hello', hello.left, hello.top, hello.getX(), hello.getY(), !!zero.canvas);
}, 1000)

setTimeout(() => {
  group.add(world);
  canvas.renderAll();
  console.log('world', world.left, world.top)
}, 2000)


setTimeout(() => {
  group.add(subgroup);
  canvas.renderAll();
  console.log('subgroup', subgroup.left, subgroup.top, subgroup.getX(), subgroup.getY())
}, 3000)

setTimeout(() => {
  subgroup.add(hello2);
  canvas.renderAll();
  console.log('hello2', hello2.left, hello2.top, hello2.getX(), hello2.getY())
}, 4000)

setTimeout(() => {
  subgroup.add(world2);
  canvas.renderAll();
}, 5000)

setTimeout(() => {
  subgroup.add(rect);
  canvas.renderAll();
  console.log('rect', rect.left, rect.top, rect.getX(), rect.getY())
}, 6000)
