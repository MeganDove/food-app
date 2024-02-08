import logo from "../assets/logo.jpg";

import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx";
import { UserJourneyContext } from "../store/user-journey-context.jsx";

export default function Header({}) {
	const { items } = useContext(CartContext);
	const cartQuantity = items.length;

	const { showCart } = useContext(UserJourneyContext);

	return (
		<div id="main-header">
			<div id="title">
				<img src={logo} alt="An illustration of a plate and some glasses in front of a cityscape" />
				<h1>FOOD APP</h1>
			</div>
			<div>
				<button onClick={showCart}>Cart ({cartQuantity})</button>
			</div>
		</div>
	);
}