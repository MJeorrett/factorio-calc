import { NodeModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';
import { MachineCategory, findCategoryForMachine } from '../../data';

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineCategory: MachineCategory;
  private _machineName: string;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];

  get machineCategory(): MachineCategory { return this._machineCategory }
  get machineName(): string { return this._machineName }
  set machineName(value: string) { this._machineName = value }
  get ingredientPorts(): MachinePortModel[] { return this._ingredientPorts }
  get resultPorts(): MachinePortModel[] { return this._resultPorts }

  constructor(machineName: string) {
    super({
      type: MachineNodeModel.type,
    });

    this._machineCategory = findCategoryForMachine(machineName);
    this._machineName = machineName;
    this.addPort(new MachinePortModel({ itemName: 'copper-plate', isIngredient: true }));
    this.addPort(new MachinePortModel({ itemName: 'iron-plate', isIngredient: true }));
    this.addPort(new MachinePortModel({ itemName: 'copper-cable', isIngredient: false }));
    this.addPort(new MachinePortModel({ itemName: 'steel-plate', isIngredient: false }));
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