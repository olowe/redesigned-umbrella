import messages from "../../messages";
import OrderbookTable from "./OrderbookTable";

interface Props {
  bids: any[];
  asks: any[];
}

function Orderbook(props: Props) {
  const { bids, asks } = props;

  return (
    <div className="orderbook-table-container">
      <OrderbookTable heading={messages.bids} category="bids" orders={bids} />
      <div className="orderbook-table-divider" />
      <OrderbookTable heading={messages.asks} category="asks" orders={asks} />
    </div>
  );
}

export default Orderbook;
