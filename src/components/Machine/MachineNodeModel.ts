import { NodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';
import { MachineCategory, findCategoryForMachine, MachineRecipe, getMachine, Recipe, findRecipeByName, Machine } from '../../data';

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineCategory: MachineCategory;
  private _machine: Machine;
  private _selectedRecipe: Recipe | null = null;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];

  get machine(): Machine { return this._machine }
  get selectedRecipe(): Recipe | null { return this._selectedRecipe }
  get machineCategory(): MachineCategory { return this._machineCategory }
  get ingredientPorts(): MachinePortModel[] { return this._ingredientPorts }
  get resultPorts(): MachinePortModel[] { return this._resultPorts }
  get portLinks(): string[] {
    return Object.keys(this.ports).reduce((portLinks: string[], port) => {
      return [...portLinks, ...Object.keys(this.ports[port].links)];
    }, []);
  }

  constructor(machineName: string) {
    super({
      type: MachineNodeModel.type,
    });

    this._machineCategory = findCategoryForMachine(machineName);
    this._machine = getMachine(this._machineCategory.configKey, machineName);
  }

  private removeAllPorts = () => {
    Object.keys(this.ports).forEach(portName => {
      const port = this.ports[portName];
      Object.keys(port.links).forEach(linkName => {
        port.links[linkName].remove();
      });
      this.removePort(this.ports[portName] as MachinePortModel);
    });
  }

  setMachineName = (value: string) => {
    this._machine = getMachine(this._machineCategory.configKey, value);

    if (this._selectedRecipe) {
      this.setSelectedRecipeName(this._selectedRecipe.name);
    }
  }

  setSelectedRecipeName = (recipeName: string | null) => {
    this.removeAllPorts();
    
    if (recipeName === null) {
      this._selectedRecipe = null;
      return;
    }

    const recipe = findRecipeByName(recipeName);
    this._selectedRecipe = recipe;
    const craftsPerSecond = 1 / (recipe.craftingTime / this.machine.craftingSpeed);

    recipe.ingredients.forEach(ingredient => {
      this.addPort(new MachinePortModel({
        itemName: ingredient.name,
        itemsPerSecond: craftsPerSecond * ingredient.amount,
        isIngredient: true
      }));
    });
    recipe.results.forEach(result => {
      this.addPort(new MachinePortModel({
        itemName: result.name,
        itemsPerSecond: craftsPerSecond * result.amount,
        isIngredient: false,
      }));
    })
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
      this._ingredientPorts = this._ingredientPorts.filter(p => p.getID() !== port.getID());
    }
    else {
      this._resultPorts = this._resultPorts.filter(p => p.getID() !== port.getID());
    }

    super.removePort(port);
  }

  performanceTune() {
    return false;
  }
}