import messages from "../../messages";
import { useOrderbook } from "../../modules/orderbook";
import Orderbook from "./Orderbook";

function OrderbookPage() {
  const orderbook = useOrderbook();

  let statusMessage = messages.disconnected;
  if (orderbook.status === "connected") {
    statusMessage = messages.connected;
  } else if (orderbook.status === "interrupted") {
    statusMessage = messages.interrupted;
  } else if (orderbook.status === "connecting") {
    statusMessage = messages.connecting;
  } else if (orderbook.status === "waiting") {
    statusMessage = messages.waiting;
  }

  return (
    <div className="orderbook-container">
      <h1>{messages.orderbookPageTitle}</h1>

      <h3>
        <span>Status: {statusMessage}</span>
      </h3>

      {orderbook.ready && (
        <Orderbook bids={orderbook.bids} asks={orderbook.asks} />
      )}
    </div>
  );
}

export default OrderbookPage;
