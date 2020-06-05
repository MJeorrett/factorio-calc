import itemsConfig, { Item } from './itemsConfig';

type IconCoordinates = {
  col: number,
  row: number,
};

const getItemOrRecipe = (itemOrRecipeName: string): Item => {
  const item = itemsConfig.items[itemOrRecipeName] || itemsConfig.recipes[itemOrRecipeName];

  if (item === undefined) throw new Error(`Could not find item or recipe with name ${itemOrRecipeName}.`);

  return item;
}

export const getIconCoordinates = (itemOrRecipeName: string): IconCoordinates => {
  const item = getItemOrRecipe(itemOrRecipeName);

  return {
    col: item.icon_col,
    row: item.icon_row,
  };
};

export const getLabel = (itemOrRecipeName: string): string => {
  const item = getItemOrRecipe(itemOrRecipeName);

  if (item.localized_name === undefined) {
    throw new Error(`No label in config for item or recipe ${itemOrRecipeName}.`);
  }

  return item.localized_name.en;
}

export type MachineCategory = {
  name: string,
  label: string,
  defaultMachine: string,
};

export const machineCategories: MachineCategory[] = [
  {
    name: 'assembling-machine',
    label: 'Assembling Machine',
    defaultMachine: 'assembling-machine-3',
  },
  {
    name: 'furnace',
    label: 'Furnace',
    defaultMachine: 'electric-furnace',
  },
];
