import { NodeModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';
import { MachineCategory, findCategoryForMachine, getMachine, Recipe, findRecipeByName, Machine } from '../../data';

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineCategory: MachineCategory;
  private _machine: Machine;
  private _machineCount: number = 1;
  private _selectedRecipe: Recipe | null = null;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];
  private _redrawCount: number = 0;

  private get _allPorts(): MachinePortModel[] { return [...this._ingredientPorts, ...this._resultPorts] }
  private get _craftsPerSecond(): number {
    if (this._selectedRecipe === null) return -1;
    return (1 / (this._selectedRecipe.craftingTime / this._machine.craftingSpeed)) * this._machineCount;
  }

  get machine(): Machine { return this._machine }
  get machineCount(): number { return this._machineCount }
  get selectedRecipe(): Recipe | null { return this._selectedRecipe }
  get machineCategory(): MachineCategory { return this._machineCategory }
  get ingredientPorts(): MachinePortModel[] { return this._ingredientPorts }
  get resultPorts(): MachinePortModel[] { return this._resultPorts }
  get redrawCount(): number { return this._redrawCount }

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

  markDirty() {
    this._redrawCount++;
  }

  updatePortsCraftsPerSecond() {
    this._allPorts.forEach(port => {
      port.updateCraftsPerSecond(this._craftsPerSecond);
    });
    this.markDirty();
  }

  setMachineName = (value: string) => {
    this._machine = getMachine(this._machineCategory.configKey, value);

    if (this._selectedRecipe === null) return;

    if (!this._machine.recipes.find(r => r.name === (this._selectedRecipe as Recipe).name)) {
      this.setSelectedRecipeName(null);
    }

    this.updatePortsCraftsPerSecond();
  }

  setMachineCount = (count: number) => {
    this._machineCount = count;
    this.updatePortsCraftsPerSecond();
  }

  fitMachineCount = () => {
    let maxRequiredMachines = 0;
    this._resultPorts.forEach((port: MachinePortModel) => {
      const test = port.getTotalRequestedItemsPerSecond();
      const requiredMachines = test / (port.itemsPerSecond / this._machineCount);
      maxRequiredMachines = Math.max(requiredMachines, maxRequiredMachines);
    });
    this.setMachineCount(Math.ceil(maxRequiredMachines));
  }

  setSelectedRecipeName = (recipeName: string | null) => {
    if (recipeName === null) {
      this.removeAllPorts();
      this._selectedRecipe = null;
      return;
    }

    this.removeAllPorts();

    const recipe = findRecipeByName(recipeName);
    this._selectedRecipe = recipe;

    recipe.ingredients.forEach(ingredient => {
      this.addPort(new MachinePortModel({
        itemName: ingredient.name,
        itemsPerCraft: ingredient.amount,
        craftsPerSecond: this._craftsPerSecond,
        isIngredient: true,
        isResource: ingredient.isResource,
      }));
    });
    recipe.results.forEach(result => {
      this.addPort(new MachinePortModel({
        itemName: result.name,
        itemsPerCraft: result.amount,
        craftsPerSecond: this._craftsPerSecond,
        isIngredient: false,
        isResource: false,
      }));
      this._ingredientPorts.reverse();
    });

    this.markDirty();
  }

  addPort(port: MachinePortModel) {
    if (port.isIngredient) {
      if (port.isResource) {
        this._ingredientPorts.unshift(port)
      }
      else {
        this._ingredientPorts.push(port);
      }
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