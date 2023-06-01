import { Group as FabricGroup, Object as FabricObject } from "fabric";

type FabricGroupParams = ConstructorParameters<typeof FabricGroup>;
type GroupParams = FabricGroupParams[1];
type ExtendedGroupParams = GroupParams & {
  x?: number;
  y?: number;
};

class ExtendedGroup extends FabricGroup {
  x?: number;
  y?: number;

  constructor(
    objects?: FabricGroupParams[0],
    options?: ExtendedGroupParams,
    objectsRelativeToGroup?: boolean
  ) {
    const { x, y, left, top, ...rest } = options || {};
    super(
      objects,
      // Сохраняем начальные позиции группы
      { ...rest, left: x ?? left, top: y ?? top },
      objectsRelativeToGroup
    );
  }

  _onObjectAdded(obj: FabricObject): void {
    // console.log(obj.constructor.name, obj.left, obj.top, this.canvas)
    // const x = this.x || 0;
    // const y = this.y || 0;
    // obj.set({
    //   left: x + obj.left,
    //   top: y + obj.top
    // });
    // obj.setCoords();

    // eslint-disable-next-line no-underscore-dangle
    super._onRelativeObjectAdded(obj);
  }

  onLayout() {
    this.canvas?.requestRenderAll();
  }

  getLayoutStrategyResult1<T extends this["layout"]>(
    layoutDirective: T,
    objects: FabricObject[],
    context: LayoutContext
  ) {
    console.log(context.type);
    if (layoutDirective === "fixed" && context.type === "added") {
      console.log(objects);
      const { width, height, ...rest } = this.getObjectsBoundingBox(objects);

      console.log(width, height, rest);
      return { width: 100, height: 100, centerX: 100, centerY: 100 };
    }
    return super.getLayoutStrategyResult(layoutDirective, objects, context);
  }
}

export default ExtendedGroup;
