import itemsConfig, { Item } from './itemsConfig';

export const getItemOrRecipe = (itemOrRecipeName: string): Item => {
  const item = itemsConfig.items[itemOrRecipeName] || itemsConfig.recipes[itemOrRecipeName];

  if (item === undefined) throw new Error(`Could not find item or recipe with name ${itemOrRecipeName}.`);

  return item;
};
