interface IngredientsListProps {
  ingredients: string[];
  allergens: string[];
}

function IngredientsList({ ingredients, allergens }: IngredientsListProps) {
  const isAllergen = (ingredient: string) => {
    return allergens.some(allergen =>
      ingredient.toLowerCase().includes(allergen.toLowerCase())
    );
  };

  return (
    <div className="ingredients-list">
      <h3>Ingredients</h3>
      {ingredients.length > 0 ? (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className={isAllergen(ingredient) ? 'allergen' : ''}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No ingredient information available</p>
      )}

      {allergens.length > 0 && (
        <div className="allergen-warning">
          <strong>Allergen Warning:</strong> Contains {allergens.join(', ')}
        </div>
      )}
    </div>
  );
}

export default IngredientsList;
