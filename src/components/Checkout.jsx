import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx"
import { UserJourneyContext } from "../store/user-journey-context.jsx";

import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";

import useHttp from "../hooks/useHttp.js"

const requestConfig = {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	}
};

export default function Cart() {
	const { items, addItemToCart, removeItemFromCart, clearCart } = useContext(CartContext);
	const { status, hideCheckout } = useContext(UserJourneyContext);

	const {data, isLoading, error, sendRequest} = useHttp("http://localhost:3000/orders", requestConfig);

	const cartPrices = items.map((itemData) => itemData.item.price*itemData.quantity);
	const cartTotal = cartPrices.length ? cartPrices.reduce((a, b) => a+b).toFixed(2) : 0;

	function submitOrder(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const customerData = Object.fromEntries(formData.entries());

		sendRequest(JSON.stringify({
			order: {
				items: items,
				customer: customerData
			}
		}));
		hideCheckout();
		clearCart();
	};

	return (
		<Modal open={status==="checkout"} className="cart">
			<form onSubmit={submitOrder}>
				<h2>Checkout</h2>
				<p>Total Amount: ${cartTotal}</p>
				<ul>
					<li className="control-row">
						<Input label="Full Name" id="name"/>
					</li>
					<li className="control-row">
						<Input label="Email Address" id="email"/>
					</li>
					<li className="control-row">
						<Input label="Street" id="street"/>
					</li>
					<li className="control-row">
						<Input label="Postal Code" id="postal-code"/>
						<Input label="City" id="city"/>
					</li>
				</ul>
				<div className="modal-actions">
					<button className="text-button" onClick={hideCheckout}>Close</button>
					<button className="button">Submit order</button>
				</div>
			</form>
		</Modal>
	);
}