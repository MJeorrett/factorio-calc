import { PortModel, PortModelAlignment, DefaultLinkModel } from '@projectstorm/react-diagrams';

type MachinePortModelOptions = {
  itemName: string,
  itemsPerSecond: number,
  isIngredient: boolean,
}

export class MachinePortModel extends PortModel {
  private _itemName: string;
  private _isIngredient: boolean;
  private _itemsPerSecond: number;

  get itemName(): string { return this._itemName }
  get isIngredient(): boolean { return this._isIngredient }
  get itemsPerSecond(): number { return this._itemsPerSecond }

  constructor({
    itemName,
    itemsPerSecond,
    isIngredient,
  }: MachinePortModelOptions) {
    super({
      name: isIngredient ? `input-${itemName}` : `output-${itemName}`,
      alignment: isIngredient ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });

    this._itemName = itemName;
    this._itemsPerSecond = itemsPerSecond;
    this._isIngredient = isIngredient;
  }

  createLinkModel() {
    if (this._isIngredient) return null;

    const link = new DefaultLinkModel({
      color: 'darkolivegreen',
      selectedColor: 'darkolivegreen',
    });

    return link;
  }

  canLinkToPort(otherPort: MachinePortModel) {
    return otherPort.isIngredient &&
      this._itemName === otherPort._itemName &&
      otherPort.parent !== this.parent;
  }
}