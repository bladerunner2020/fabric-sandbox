import { Canvas, Text, Group }  from 'fabric';
import './styles.css';

const canvas = new Canvas('canvas', {
  backgroundColor: '#F8F8F8',
  width: 800,
  height: 600,
});

const hello = new Text('Hello', { left: 75, top: 0 });
const world = new Text('World', { left: 150, top: 50 });

const hello2 = new Text('Hello', { left: 75, top: 0 });
const world2 = new Text('World', { left: 150, top: 50 });

const group = new Group([], {
  left: 200,
  top: 250,
  backgroundColor: '#add8e6',
  // objectsRelativeToGroup: true
});
console.log('Group', group.left, group.top, group.width, group.height);

const group2 = new Group([hello2, world2], {
  left: 200,
  top: 250,
  backgroundColor: '#90EE90'
});
console.log('Group2', group2.left, group2.top, group2.width, group2.height);


canvas.add(group);
canvas.add(group2);

group.add(hello);
group.add(world);

console.log('Group', group.left, group.top, group.width, group.height);
