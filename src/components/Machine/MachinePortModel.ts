import { PortModel, PortModelAlignment, DefaultLinkModel, LinkModel, LinkModelGenerics } from '@projectstorm/react-diagrams';

import round from '../../utils/round';
import { MachineLinkModel } from './MachineLinkModel';
import { MachineNodeModel } from './MachineNodeModel';

type MachinePortModelOptions = {
  itemName: string,
  itemsPerCraft: number,
  craftsPerSecond: number,
  isIngredient: boolean,
}

export class MachinePortModel extends PortModel {
  private _itemName: string;
  private _isIngredient: boolean;
  private _itemsPerCraft: number;
  private _craftsPerSecond: number;
  private _satisfaction: number = 0;

  private get _allLinks(): MachineLinkModel[] { return Object.keys(this.links).map(linkName => this.links[linkName] as MachineLinkModel) }

  get itemName(): string { return this._itemName }
  get isIngredient(): boolean { return this._isIngredient }
  get itemsPerSecond(): number { return this._craftsPerSecond * this._itemsPerCraft }
  get satisfaction(): number { return this._satisfaction }

  constructor({
    itemName,
    itemsPerCraft,
    craftsPerSecond,
    isIngredient,
  }: MachinePortModelOptions) {
    super({
      name: isIngredient ? `input-${itemName}` : `output-${itemName}`,
      alignment: isIngredient ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });

    this._itemName = itemName;
    this._itemsPerCraft = itemsPerCraft;
    this._craftsPerSecond = craftsPerSecond;
    this._isIngredient = isIngredient;
  }

  createLinkModel() {
    if (this._isIngredient) return null;

    const link = new MachineLinkModel({
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

  updateCraftsPerSecond(craftsPerSecond: number) {
    this._craftsPerSecond = craftsPerSecond;
    this.updateLinks();
  }

  updateSatisfaction() {
    const supplyLinks = this._allLinks.filter(link => link.getTargetPort() === this);
    const totalSupply = supplyLinks.reduce((total, link) => {
      return total + link.itemsPerSecond;
    }, 0)

    this._satisfaction = round(totalSupply / this.itemsPerSecond);
  }

  updateLinks() {
    const itemsPerSecondPerLink = round(this.itemsPerSecond / this._allLinks.length);
    this._allLinks.forEach(link => {
      const machineLink = link as MachineLinkModel;
      machineLink.updateItemsPerSecond(itemsPerSecondPerLink);
      const targetPort = machineLink.getTargetPort() as MachinePortModel;
      targetPort.updateSatisfaction();
      (targetPort.parent as MachineNodeModel).markDirty();
    });
  }
}