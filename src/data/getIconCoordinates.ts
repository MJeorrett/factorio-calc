import { getItemOrRecipe } from './getItemOrRecipe';

export type IconCoordinates = {
  col: number,
  row: number,
};

export const getIconCoordinates = (itemOrRecipeName: string): IconCoordinates => {
  const item = getItemOrRecipe(itemOrRecipeName);

  return {
    col: item.icon_col,
    row: item.icon_row,
  };
};
