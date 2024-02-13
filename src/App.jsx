import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

import CartContextProvider from "./store/cart-context.jsx";
import UserJourneyContextProvider from "./store/user-journey-context.jsx";

function App() {
  return (
    <UserJourneyContextProvider>
    <CartContextProvider>
      <Header cartNumber="5"/>
      <Meals />
      <Cart />
      <Checkout />
    </CartContextProvider>
    </UserJourneyContextProvider>
  );
  //Header
  //Grid
    //Card
}

export default App;
