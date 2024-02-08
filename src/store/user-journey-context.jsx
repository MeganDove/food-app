import { createContext, useState } from "react";

export const UserJourneyContext = createContext({
	status: "",
	showCart: () => {},
	hideCart: () => {},
	showCheckout: () => {},
	hideCheckout: () => {}
});

export default function UserJourneyContextProvider({children}) {
	const [userStatus, setUserStatus] = useState("");

	const ctxValue = {
		status: userStatus,
		showCart: () => setUserStatus("cart"),
		hideCart: () => setUserStatus(""),
		showCheckout: () => setUserStatus("checkout"),
		hideCheckout: () => setUserStatus("")
	};

	return (
		<UserJourneyContext.Provider value={ctxValue}>{children}</UserJourneyContext.Provider>
	);
}