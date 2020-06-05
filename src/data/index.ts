import itemsConfig from './itemsConfig';

type IconCoordinates = {
  col: number,
  row: number,
};

export const getIconCoordinates = (itemOrRecipeName: string): IconCoordinates => {
  const item = itemsConfig.items[itemOrRecipeName] || itemsConfig.recipes[itemOrRecipeName];

  if (item === undefined) throw new Error(`Could not find item or recipe with name ${itemOrRecipeName}.`);

  return {
    col: item.icon_col,
    row: item.icon_row,
  };
};