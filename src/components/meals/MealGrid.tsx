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
      <p className="py-12 text-center text-gray-500">No meals found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          thumb={meal.strMealThumb}
        />
      ))}
    </div>
  );
}
