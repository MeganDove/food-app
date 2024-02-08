import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx"
import { UserJourneyContext } from "../store/user-journey-context.jsx";

import Modal from "./UI/Modal.jsx";

export default function Cart() {
	const { items, addItemToCart, removeItemFromCart } = useContext(CartContext);
	const { status } = useContext(UserJourneyContext);

	return (
		<Modal open={status==="cart"} className="cart">
			<h2>Your Cart</h2>
			<ul>
				{items.map((itemData) => <li key={itemData.item.id} className="cart-item">
					<p>{itemData.item.name} - {itemData.quantity} x ${itemData.item.price}</p>
					<div className="cart-item-actions">
						<button onClick={() => {removeItemFromCart(itemData.item.id)}}>-</button>
						<p>{itemData.quantity}</p>
						<button onClick={() => {addItemToCart(itemData.item)}}>+</button>
					</div>
				</li>)}
			</ul>
		</Modal>
	);
}