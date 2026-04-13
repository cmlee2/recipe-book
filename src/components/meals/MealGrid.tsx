import MealCard from "./MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealGridProps {
  meals: Meal[];
}

export default function MealGrid({ meals }: MealGridProps) {
  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-5xl mb-4">🍳</div>
        <p className="font-display text-lg text-warm">No meals found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal, i) => (
        <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
          <MealCard
            id={meal.idMeal}
            name={meal.strMeal}
            thumb={meal.strMealThumb}
          />
        </div>
      ))}
    </div>
  );
}
