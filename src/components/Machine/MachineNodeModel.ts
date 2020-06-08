import { NodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';
import { MachineCategory, findCategoryForMachine, MachineRecipe, getMachine, Recipe, findRecipeByName, Machine } from '../../data';
import round from '../../utils/round';

export class MachineNodeModel extends NodeModel {
  static type = 'machine';

  private _machineCategory: MachineCategory;
  private _machine: Machine;
  private _selectedRecipe: Recipe | null = null;
  private _ingredientPorts: MachinePortModel[] = [];
  private _resultPorts: MachinePortModel[] = [];
  private _redrawCount: number = 0;

  private get _allPorts(): MachinePortModel[] { return [...this._ingredientPorts, ...this._resultPorts] }

  get machine(): Machine { return this._machine }
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

  setMachineName = (value: string) => {
    this._redrawCount++;
    this._machine = getMachine(this._machineCategory.configKey, value);

    if (this._selectedRecipe === null) return;

    const craftsPerSecond = 1 / (this._selectedRecipe.craftingTime / this._machine.craftingSpeed);

    if (this._machine.recipes.find(r => r.name === (this._selectedRecipe as Recipe).name)) {
      this.setSelectedRecipeName(this._selectedRecipe.name);
      this._allPorts.map((port: MachinePortModel) => port.updateCraftsPerSecond(craftsPerSecond))
    }
    else {
      this.setSelectedRecipeName(null);
    }
  }

  setSelectedRecipeName = (recipeName: string | null) => {
    this._redrawCount++;
    if (recipeName === null) {
      this.removeAllPorts();
      this._selectedRecipe = null;
      return;
    }

    if (recipeName === this.selectedRecipe?.name) {
      this._allPorts.forEach(port => {
        port.updateLinks();
      });
      return;
    }

    this.removeAllPorts();

    const recipe = findRecipeByName(recipeName);
    this._selectedRecipe = recipe;
    const craftsPerSecond = 1 / (recipe.craftingTime / this._machine.craftingSpeed);

    recipe.ingredients.forEach(ingredient => {
      this.addPort(new MachinePortModel({
        itemName: ingredient.name,
        itemsPerCraft: ingredient.amount,
        craftsPerSecond,
        isIngredient: true,
        isResource: ingredient.isResource,
      }));
    });
    recipe.results.forEach(result => {
      this.addPort(new MachinePortModel({
        itemName: result.name,
        itemsPerCraft: result.amount,
        craftsPerSecond,
        isIngredient: false,
        isResource: false,
      }));
      this._ingredientPorts.reverse();
    });
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