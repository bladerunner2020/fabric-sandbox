import {
  Canvas, Group, Point, Line, Circle
}  from 'fabric';
import './styles.css';

// We have a React Wrapper library (see a separate pdf file)
// In this file we repeated the calls of FabricJS methods

// When we render <Canvas> FarbicJS canvas is created and initialized
const canvas = new Canvas('canvas1', {
  backgroundColor: '#F8F8F8',
  width: 800,
  height: 600,
});

// This is just for visualization (not part of problem :-)
canvas.add(new Line([0, 100, 800, 100], { stroke: 'lightgrey', strokeWidth: 1 }));
canvas.add(new Line([100, 0, 100, 600], { stroke: 'lightgrey', strokeWidth: 1 }));

// <Group defaultOptions={{ x: 100, y: 100 }}> 
const group1 = new Group([]); // group is created in useFarbicObject hook

// ExtendedCanvas._onObjectAdded (we redefine this method to update coordinates)
canvas.add(group1); // add created object (that is - group1) to canvas
group1.setXY(new Point(100, 100)); // update coordinates
group1.setCoords();
group1.triggerLayout();
canvas.requestRenderAll();

// <Group defaultOptions={{ originX: 'center' }} >
const group2 = new Group([], { originX: 'center' }); // group is created in useFarbicObject hook

// ExtendedGroup._onObjectAdded (and redefine method of Group as well)
group1.triggerLayout();
group1.add(group2); // add created object (that is - group2) to group
group2.setXY(new Point(100, 100));
group2.setCoords();
group2.triggerLayout();
canvas.requestRenderAll();

// <Circle
//   defaultOptions={{
//     x: 0, // Position relative parent group
//     y: 0,
//     radius: 50,
//     fill: 'white',
//     shadow: '0 2 4 #d9d9d9',
//     originX: 'center', // should be centered relatively width or parent group?
//     originY: 'center'
//   }}
// />
const circle1 = new Circle({ // circle is created in useFarbicObject hook
  radius: 50,
  fill: 'white',
  shadow: '0 2 4 #d9d9d9',
  originX: 'center',
  originY: 'center'
});

// ExtendedGroup._onObjectAdded
group2.add(circle1);
circle1.setXY(new Point(100, 100)); // we set absolute coordinates
circle1.setCoords();
group2.triggerLayout();
canvas.requestRenderAll();

// <Circle
//   defaultOptions={{
//     x: 0,
//     y: 0,
//     radius: 42,
//     fill: 'transparent',
//     stroke: '#E37566',
//     strokeWidth: 6,
//     shadow: '0 2 4 #d9d9d9',
//     originX: 'center',
//     originY: 'center'
//   }}
// />
const circle2 = new Circle({ // circle is created in useFarbicObject hook
  radius: 42,
  fill: 'transparent',
  stroke: '#E37566',
  strokeWidth: 6,
  shadow: '0 2 4 #d9d9d9',
  originX: 'center',
  originY: 'center'
});

// ExtendedGroup._onObjectAdded
group2.add(circle2);
circle2.setXY(new Point(100, 100)); // we set absolute coordinates
circle2.setCoords();
group2.triggerLayout();
canvas.requestRenderAll();
