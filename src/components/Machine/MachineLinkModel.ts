import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export class MachineLinkModel extends DefaultLinkModel {
  private _itemsPerSecond: number = 0;

  get itemsPerSecond(): number { return this._itemsPerSecond }

  updateItemsPerSecond(itemsPerSecond: number) {
    this._itemsPerSecond = itemsPerSecond;

    if (this.labels.length === 0) {
      this.addLabel('');
    }

    const label = this.labels[0] as any;
    label.options.label = `${itemsPerSecond} \\s`;
  }
}