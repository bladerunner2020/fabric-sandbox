import {
  Canvas, Group, Rect
}  from 'fabric';
import './styles.css';

const canvas = new Canvas('canvas1', {
  backgroundColor: '#F8F8F8',
  width: 800,
  height: 600,
});

const rect = new Rect({ left: 50, top: 50, width: 100, height: 100, fill: 'green', stroke: 'red', strokeWidth: 1 });

const group = new Group([], { backgroundColor: '#add8e6' }, false);

canvas.add(group);
canvas.renderAll();

setTimeout(() => {
  group.add(rect);
  canvas.renderAll();
  console.log('rect', rect.left, rect.top, rect.width, rect.height, rect.getX(), rect.getY(), rect.getCoords())
  console.log('group', group.left, group.top, group.width, group.height, group.getX(), group.getY())
}, 1000);

setTimeout(() => {
  rect.set({ 
    left: 25, top: 25, width: 200, height: 200
  })
  rect.setCoords();
  canvas.renderAll();
  console.log('rect', rect.left, rect.top, rect.width, rect.height, rect.getX(), rect.getY(), rect.getCoords())
  console.log('group', group.left, group.top, group.width, group.height, group.getX(), group.getY())
}, 2000);
