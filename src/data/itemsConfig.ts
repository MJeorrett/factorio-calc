import itemsConfig from './items-config.json';

export type Item = {
  icon_col: number,
  icon_row: number,
  localized_name?: {
    en: string,
  },
};

export type Items = {
  [k: string]: Item | undefined,
};

export type ItemsConfig = {
  items: Items,
  recipes: Items,
};

const typedItemsConfig: ItemsConfig = itemsConfig;

export default typedItemsConfig;
