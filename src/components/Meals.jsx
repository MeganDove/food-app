import MealCard from "./MealCard.jsx";

import useHttp from "../hooks/useHttp.js"

export default function Meals() {
	const {data: availableMeals, isFetching, error} = useHttp("http://localhost:3000/meals", null, []);

	if(error) {
	  return (
	  		<div>
			    <h3>An error occured!</h3>
			    <p>{error.message}</p>
		   </div>
	  );
	}

	if(isFetching) {
		return <p>Fetching meals...</p>
	}

	return (
		<>
			{isFetching ? <p>Fetching available meals</p> :
			 	<div id="meals">
					{availableMeals.map((meal) => <MealCard key={meal.id} mealData={meal}/>)}
				</div>
			}
		</>
	);
}