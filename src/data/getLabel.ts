import { getItemOrRecipe } from './getItemOrRecipe';

export const getLabel = (itemOrRecipeName: string): string => {
  const item = getItemOrRecipe(itemOrRecipeName);

  if (item.localized_name === undefined) {
    throw new Error(`No label in config for item or recipe ${itemOrRecipeName}.`);
  }

  return item.localized_name.en;
};
