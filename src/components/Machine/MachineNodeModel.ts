import { NodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

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
  get selectedRecipe(): Recipe | null { return this._selectedRecipe }
  get recipes(): MachineRecipe[] { return this._recipes }
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
    this._machineName = machineName;
    this._recipes = getRecipesForMachine(this.machineCategory.configKey, machineName);
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
    this._machineName = value;
    this._recipes = getRecipesForMachine(this.machineCategory.configKey, this._machineName);
    if (!this._recipes.find(r => r.name === this._selectedRecipe?.name)) {
      this.setSelectedRecipeName(null);
    }
  }

  setSelectedRecipeName = (recipeName: string | null) => {
    this.removeAllPorts();
    
    if (recipeName === null) {
      this._selectedRecipe = null;
      return;
    }

    this._selectedRecipe = findRecipeByName(recipeName);

    this._selectedRecipe.ingredients.forEach(ingredient => {
      this.addPort(new MachinePortModel({ itemName: ingredient.name, isIngredient: true }));
    });
    this._selectedRecipe.results.forEach(result => {
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