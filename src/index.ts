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

const hello = new Text('Hello', { left: 0, top: 0 });
console.log(hello.left)
const world = new Text('World', { left: 150, top: 50 });

const hello2 = new Text('Hello2', { left: 0, top: 0 });
const world2 = new Text('World2', { left: 150, top: 150 });

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

canvas.add(group);


setTimeout(() => {
  group.add(hello);
  canvas.renderAll();
}, 1000)

setTimeout(() => {
  group.add(world);
  canvas.renderAll();
}, 2000)


setTimeout(() => {
  group.add(subgroup);
  canvas.renderAll();
}, 3000)

setTimeout(() => {
  subgroup.add(hello2);
  canvas.renderAll();
}, 4000)

setTimeout(() => {
  subgroup.add(world2);
  canvas.renderAll();
}, 5000)