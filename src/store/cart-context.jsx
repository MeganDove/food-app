import { createContext, useReducer } from "react";

export const CartContext = createContext({
	items: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearCart: () => {}
});

function cartReducer(state, action) {
	if(action.type === "ADD_ITEM") {
		const updatedItems = [...state.items];
		const existingCartItemIndex = updatedItems.findIndex(
			(cartItem) => cartItem.item.id === action.payload.id
		);
		const existingCartItem = updatedItems[existingCartItemIndex];

		if(existingCartItem) {
			const updatedItem = {
			  ...existingCartItem,
			  quantity: existingCartItem.quantity + 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems.push({
			  item: action.payload,
			  quantity: 1,
			});
		}

		return {
			items: updatedItems,
		};

	} else if(action.type === "REMOVE_ITEM") {
		const updatedItems = [...state.items];
		const cartItemIndex = updatedItems.findIndex(
			(cartItem) => cartItem.item.id === action.payload
		);

		const cartItem = {
			...updatedItems[cartItemIndex],
		};
		cartItem.quantity -= 1;

		if (cartItem.quantity <= 0) {
			updatedItems.splice(cartItemIndex, 1);
		} else {
			updatedItems[cartItemIndex] = cartItem;
		}

		return {
			items: updatedItems,
		};
	} else if(action.type === "CLEAR_CART") {
		return {
			items: []
		}
	}
}

export default function CartContextProvider({children}) {
	const [cartState, cartDispatch] = useReducer(cartReducer, {
		items: [],
	});

	function handleAddItemToCart(item) {
		cartDispatch({
			type: "ADD_ITEM",
			payload: item
		});
	}

	function handleRemoveItemFromCart(itemId) {
		cartDispatch({
			type: "REMOVE_ITEM",
			payload: itemId
		});
	}

	function handleClearCart() {
		cartDispatch({
			type: "CLEAR_CART"
		});
	}

	const ctxValue = {
		items: cartState.items,
		addItemToCart: handleAddItemToCart,
		removeItemFromCart: handleRemoveItemFromCart,
		clearCart: handleClearCart
	};

	return (
		<CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
	);
}