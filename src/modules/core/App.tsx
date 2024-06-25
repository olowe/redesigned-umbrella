import { OrderbookProvider } from "../orderbook";
import Router from "./Router";

function App() {
  return (
    <OrderbookProvider>
      <Router />
    </OrderbookProvider>
  );
}

export default App;
