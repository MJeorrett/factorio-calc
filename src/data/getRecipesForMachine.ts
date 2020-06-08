import itemsConfig, { MachineConfigKey } from './itemsConfig';
import { getLabel } from './getLabel';

export type MachineRecipe = {
  name: string,
  label: string,
};

export const getRecipesForMachine = (configKey: MachineConfigKey, machineName: string): MachineRecipe[] => {
  const machineConfig = itemsConfig[configKey][machineName];

  if (machineConfig === undefined) {
    throw new Error(`Could not find machine with config key '${configKey}' and name '${machineName}'.`);
  }

  return Object.keys(itemsConfig.recipes)
    .filter(recipeName => {
      const recipeCategory = itemsConfig.recipes[recipeName].category;
      return machineConfig.crafting_categories.includes(recipeCategory);
    })
    .map(recipeName => ({
      name: recipeName,
      label: getLabel(recipeName),
    }))
    .sort((a, b) => a.label > b.label ? 1 : -1);
};
