import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx";

export default function MealCard({mealData}) {
	const { addItemToCart } = useContext(CartContext);

	return (
		<div className="meal-item">
			<article>
				<img src={`http://localhost:3000/${mealData.image}`}/>
				<h3>{mealData.name}</h3>
				<p className="meal-item-price">${mealData.price}</p>
				<p className="meal-item-description">{mealData.description}</p>
				<div className="meal-item-actions">
					<button className="button" onClick={() => addItemToCart(mealData)}>Add to Cart</button>
				</div>
			</article>
		</div>
	);
}