import rawItemsConfig from './items-config.json';

export interface ItemConfigBase {
  icon_col: number,
  icon_row: number,
  localized_name?: {
    en: string,
  },
  subgroup?: string,
};

interface RecipeItem {
  amount: number,
  name: string,
}

export interface RecipeConfig extends ItemConfigBase {
  category: string,
  name: string;
  'energy_required': number,
  ingredients: RecipeItem[],
  results: RecipeItem[],
};

export interface MachineConfig extends ItemConfigBase {
  crafting_categories: string[],
  crafting_speed: number,
}

export interface ItemsConfig {
  [k: string]: ItemConfigBase | undefined,
}

export interface MachinesConfig {
  [k: string]: MachineConfig | undefined,
}

export interface RecipesConfig {
  [k: string]: RecipeConfig,
}

interface ResourceConfig {
  [k: string]: any,
}

export type MachineConfigKey = 'assembling-machine' | 'furnace' | 'rocket-silo';

export interface RootItemsConfig {
  'assembling-machine': MachinesConfig,
  'furnace': MachinesConfig,
  items: ItemsConfig,
  recipes: RecipesConfig,
  resource: ResourceConfig,
  'rocket-silo': MachinesConfig,
};

const itemsConfig = rawItemsConfig as RootItemsConfig;

export const allRecipes = Object.keys(itemsConfig.recipes).map(recipeName => (
  itemsConfig.recipes[recipeName]
));

export const resourceNames = Object.keys(itemsConfig.resource);

export default itemsConfig;
