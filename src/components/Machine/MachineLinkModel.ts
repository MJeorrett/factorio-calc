import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export class MachineLinkModel extends DefaultLinkModel {
  updateItemsPerSecond(itemsPerSecond: number) {
    if (this.labels.length === 0) {
      this.addLabel('');
    }
    const label = this.labels[0] as any;
    label.options.label = `${itemsPerSecond} \\s`;
  }
}