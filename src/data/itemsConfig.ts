import rawItemsConfig from './items-config.json';

export interface ItemConfigBase {
  icon_col: number,
  icon_row: number,
  localized_name?: {
    en: string,
  },
};

export interface RecipeConfig extends ItemConfigBase {
  category: string,
  name: string;
};

export interface MachineConfig extends ItemConfigBase {
  crafting_categories: string[],
  crafting_speed: number,
}

export interface ItemsConfig {
  [k: string]: ItemConfigBase | undefined,
};

export interface MachinesConfig {
  [k: string]: MachineConfig | undefined,
};

export interface RecipesConfig {
  [k: string]: RecipeConfig,
};

export type MachineConfigKey = 'assembling-machine' | 'furnace';

export interface RootItemsConfig {
  'assembling-machine': MachinesConfig,
  'furnace': MachinesConfig,
  items: ItemsConfig,
  recipes: RecipesConfig,
};

const itemsConfig = rawItemsConfig as RootItemsConfig;

export const allRecipes = Object.keys(itemsConfig.recipes).map(recipeName => (
  itemsConfig.recipes[recipeName]
));

export default itemsConfig;
