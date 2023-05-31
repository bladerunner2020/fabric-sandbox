## General architecture

Our module provides a React wrapper for FarbicJS.

The idea behind this model to make possible using FarbicJS objects as React components:

```typescript
// Simplified examples (all components missing props here)
<Canvas>
  <Circle />
  <Rect />
  <Group>
    <Text />
    <Rect />
  </Group>
</Canvas>
```

What we want to achieve:

We want to render some complex object (in real life it has more components).
This object is represented by Group with coordinates 100, 100 (first group).
Inside this group we place another group. In the second group we place 2 circles. 
These cirles must be centered in group2.
The entire object should starts at 100, 100 coordinates.

```typescript
 <Canvas
  id="canvas"
  backgroundImage={background}
  canvasOptions={{
    backgroundColor: '#F8F8F8',
    height: 600,
    width: 800
  }}
>
  <Group defaultOptions={{ x: 100, y: 100 }}> // We set starting position of our group as 100, 100 !!!
    <Group defaultOptions={{ originX: 'center' }} >
      <Circle
        defaultOptions={{
          x: 0, // Position relative parent group
          y: 0,
          radius: 50,
          fill: 'white',
          shadow: '0 2 4 #d9d9d9',
          originX: 'center', // should be centered relatively width or parent group?
          originY: 'center'
        }}
      />
      <Circle
        defaultOptions={{
          x: 0,
          y: 0,
          radius: 42,
          fill: 'transparent',
          stroke: '#E37566',
          strokeWidth: 6,
          shadow: '0 2 4 #d9d9d9',
          originX: 'center',
          originY: 'center'
        }}
      />
      {showIcon ? (
        <Image
          defaultOptions={{
            width: 50,
            height: 50,
            image: icon,
            originX: 'center',
            originY: 'center'
          }}
        />
      ) : null}
    </Group>
  </Group>
</Canvas>
```

All components are uncontrolled React components - we provide only default options.
Each object is rendered into virtual React DOM structure and return empty object: `<></>`. For example:

```typescript
function Rect({ defaultOptions }: RectProps) {
  useFabricObject(rectFactory, defaultOptions); // Magic is here!
  return <></>; // We need just a virtual React DOM!
}
```

The createion, updating and removing objects from Farbic canvas are done with useEffect hooks (inside useFabricObject hook):

- on mount: we create object and add it to Fabric canvas
- on update: we update object on Fabric canvas
- on unmount: we remove object from Fabric canvas

The Farbic canvas instance is accessible from any child component with the help of React context. Here is the fragment of `<Canvas />`:

```typescript
  return (
    <>
      <canvas id={id} />
      {canvas ? (
        <CanvasContext.Provider value={canvas}>
          <ContainerContext.Provider value={canvas}>
            {children}
          </ContainerContext.Provider>
        </CanvasContext.Provider>
      )
        : null}
    </>
  );
```

As can see there are 2 context providers. The second is context ContainerContext which is necessary for groups. 

When we add objects to canvas or group we update coordinates by redefine _onObjectAdded:

In Canvas:
```typescript
_onObjectAdded(obj: AbstractObject<any>): void {
  super._onObjectAdded(obj);
  obj.recalculate();
  this.requestRenderAll();
}
```

In Group:
```typescript
_onObjectAdded(obj: AbstractObject<any>): void {
  const list = this.getObjects();
  if (list.length === 1) this.triggerLayout();
  super._onObjectAdded(obj);
  const groupXY = this.getAbsoluteXY();
  console.log(groupXY)  
  obj.recalculate(groupXY);
  this.triggerLayout();
  this.canvas?.requestRenderAll();
}
```
