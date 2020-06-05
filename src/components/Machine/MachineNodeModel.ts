import { NodeModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';

type MachineNodeModelOptions = {
  machineName: string,
};

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineName: string;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];

  get machineName(): string { return this._machineName }
  get ingredientPorts(): MachinePortModel[] { return this._ingredientPorts }
  get resultPorts(): MachinePortModel[] { return this._resultPorts }

  constructor({
    machineName,
  }: MachineNodeModelOptions) {
    super({
      type: MachineNodeModel.type,
    });

    this._machineName = machineName;
    this.addPort(new MachinePortModel({ itemName: 'copper-plate', isIngredient: true }));
    this.addPort(new MachinePortModel({ itemName: 'iron-plate', isIngredient: true }));
    this.addPort(new MachinePortModel({ itemName: 'copper-cable', isIngredient: false }));
    this.addPort(new MachinePortModel({ itemName: 'iron-cable', isIngredient: false }));
  }

  addPort(port: MachinePortModel) {
    if (port.isIngredient) {
      this._ingredientPorts.push(port);
    }
    else {
      this._resultPorts.push(port);
    }

    return super.addPort(port);
  }

  removePort(port: MachinePortModel) {
    if (port.isIngredient) {
      this._ingredientPorts = this._ingredientPorts.filter(p => p.getID() === port.getID());
    }
    else {
      this._resultPorts = this._resultPorts.filter(p => p.getID() === port.getID());
    }

    super.removePort(port);
  }

  performanceTune() {
    return false;
  }
}