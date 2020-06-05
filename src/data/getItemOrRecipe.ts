import itemsConfig, { ItemConfigBase } from './itemsConfig';

export const getItemOrRecipe = (itemOrRecipeName: string): ItemConfigBase => {
  const item = itemsConfig.items[itemOrRecipeName] || itemsConfig.recipes[itemOrRecipeName];

  if (item === undefined) throw new Error(`Could not find item or recipe with name '${itemOrRecipeName}'.`);

  return item;
};
