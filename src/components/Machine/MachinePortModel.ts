import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

type MachinePortModelOptions = {
  itemName: string,
  isIngredient: boolean,
}

export class MachinePortModel extends PortModel {
  private _itemName: string;
  private _isIngredient: boolean;

  get itemName(): string { return this._itemName }
  get isIngredient(): boolean { return this._isIngredient }

  constructor({
    itemName,
    isIngredient,
  }: MachinePortModelOptions) {
    super({
      name: isIngredient ? `input-${itemName}` : `output-${itemName}`,
      alignment: isIngredient ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });

    this._itemName = itemName;
    this._isIngredient = isIngredient;
  }

  createLinkModel() {
    if (this._isIngredient) return null;

    const link = new DefaultLinkModel();

    return link;
  }

  canLinkToPort(otherPort: MachinePortModel) {
    return this._itemName === otherPort._itemName;
  }
}