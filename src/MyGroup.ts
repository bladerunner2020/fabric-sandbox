import { Group as FabricGroup, Object as FabricObject } from 'fabric';

type FabricGroupParams = ConstructorParameters<typeof FabricGroup>;
type GroupParams = FabricGroupParams[1];
type ExtendedGroupParams = GroupParams & {
  x?: number;
  y?: number;
};

class ExtendedGroup extends FabricGroup {
  x?: number;
  y?: number;

  constructor(objects?: FabricGroupParams[0], options?: ExtendedGroupParams, objectsRelativeToGroup?: boolean) {
    const { x, y, ...rest } = options || {};
    super(objects, rest, objectsRelativeToGroup);
    // Сохраняем начальные позиции группы
    this.x = x || options?.left;
    this.y = y || options?.top;
  }

  _onObjectAdded(obj: FabricObject): void {
    console.log(obj.constructor.name, obj.left, obj.top, this.canvas)
    const x = this.x || 0;
    const y = this.y || 0;
    obj.set({
      left: x + obj.left,
      top: y + obj.top
    });
    obj.setCoords();

    // eslint-disable-next-line no-underscore-dangle
    super._onObjectAdded(obj);
  }
}

export default ExtendedGroup;
