import { Group as FabricGroup, Object as FabricObject, Point } from "fabric";

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
      { ...rest, left: x ?? left, top: y ?? top, layout: "fixed-size" },
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
    obj.left = obj.left ?? 0;
    obj.top = obj.top ?? 0;
    // eslint-disable-next-line no-underscore-dangle
    super._onRelativeObjectAdded(obj);
  }

  onLayout() {
    this.layout === "fixed-size" && this.setCoords();
    this.canvas?.requestRenderAll();
  }

  // _adjustObjectPosition(object: FabricObject, diff: Point) {
  //   object.set({
  //     left: diff.x,
  //     top: diff.y,
  //   });
  // }

  getLayoutStrategyResult<T extends this["layout"]>(
    layoutDirective: T,
    objects: FabricObject[],
    context: LayoutContext
  ) {
    if (layoutDirective === "fixed-size" && context.type !== "initialization") {
      const { width, height } = this.prepareBoundingBox(
        layoutDirective,
        objects,
        context
      );
      if (width && height) {
        const { x, y } = this.getRelativeCenterPoint();
        return {
          width,
          height,
          centerX: x,
          centerY: y,
        };
      }
    }
    return super.getLayoutStrategyResult(
      layoutDirective === "fixed-size" ? "fixed" : layoutDirective,
      objects,
      context
    );
  }
}

export default ExtendedGroup;
