import { NodeModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';
import { MachineCategory, findCategoryForMachine, MachineRecipe, getRecipesForMachine, Recipe, findRecipeByName } from '../../data';

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineCategory: MachineCategory;
  private _machineName: string;
  private _recipes: MachineRecipe[];
  private _selectedRecipe: Recipe | null = null;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];

  get machineName(): string { return this._machineName }
  set machineName(value: string) {
    this._machineName = value;
    this._recipes = getRecipesForMachine(this.machineCategory.configKey, this._machineName);
    if (!this._recipes.find(r => r.name === this._selectedRecipe?.name)) {
      this._selectedRecipe = null;
    }
  }

  get selectedRecipe(): Recipe | null { return this._selectedRecipe }

  get recipes(): MachineRecipe[] { return this._recipes }
  get machineCategory(): MachineCategory { return this._machineCategory }
  get ingredientPorts(): MachinePortModel[] { return this._ingredientPorts }
  get resultPorts(): MachinePortModel[] { return this._resultPorts }

  constructor(machineName: string) {
    super({
      type: MachineNodeModel.type,
    });

    this._machineCategory = findCategoryForMachine(machineName);
    this._machineName = machineName;
    this._recipes = getRecipesForMachine(this.machineCategory.configKey, machineName);
  }

  setSelectedRecipeName(value: string) {
    var recipe = findRecipeByName(value);
    this._selectedRecipe = recipe;

    Object.keys(this.ports).forEach(portName => {
      const port = this.ports[portName];
      Object.keys(port.links).forEach(linkName => {
        port.links[linkName].remove();
      });
      this.removePort(this.ports[portName] as MachinePortModel);
    });

    recipe.ingredients.forEach(ingredient => {
      this.addPort(new MachinePortModel({ itemName: ingredient.name, isIngredient: true }));
    });
    recipe.results.forEach(result => {
      this.addPort(new MachinePortModel({ itemName: result.name, isIngredient: false }));
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