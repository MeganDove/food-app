import { useState, useEffect, useContext } from "react";

import { fetchAvailableMeals } from "../http.js";

import MealCard from "./MealCard.jsx";

export default function Meals() {
	const [isFetching, setIsFetching] = useState(false);
	const [availableMeals, setAvailableMeals] = useState([]);
	const [error, setError] = useState();

	useEffect(() => {
	    async function fetchMeals() {
			setIsFetching(true);
			try {
				const meals = await fetchAvailableMeals();
				setAvailableMeals(meals);
				setIsFetching(false);
			} catch (error) {
				setError({message: error.message || "Could not fetch available meals, please try again later"});
				setIsFetching(false);
			}
	    }
	    fetchMeals(); 
	}, []);

	console.log(availableMeals);

	if(error) {
	  return (
	  		<div>
			    <h3>An error occured!</h3>
			    <p>{error.message}</p>
		   </div>
	  );
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