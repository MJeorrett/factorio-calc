import itemsConfig from './itemsConfig';

export type RecipeItem = {
  amount: number,
  name: string,
};

export type Recipe = {
  name: string,
  category: string,
  craftingTime: number,
  ingredients: RecipeItem[],
  results: RecipeItem[],
};

export const allRecipes: Recipe[] = Object.keys(itemsConfig.recipes).map(recipeName => {
  const recipeConfig = itemsConfig.recipes[recipeName];
  return {
    name: recipeName,
    category: recipeConfig.category,
    craftingTime: recipeConfig.energy_required,
    ingredients: recipeConfig.ingredients,
    results: recipeConfig.results,
  };
});

export const findRecipeByName = (recipeName: string): Recipe => {
  const recipe = allRecipes.find(r => r.name === recipeName);

  if (recipe === undefined) {
    throw new Error(`Could not find recipe with name '${recipeName}'.`);
  }

  return recipe;
};
