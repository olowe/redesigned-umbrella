import messages from "../../messages";
import OrderbookHeading from "./OrderbookHeading";
import OrderbookItems from "./OrderbookItems";

interface Props {
  bids: any[];
  asks: any[];
}

function Orderbook(props: Props) {
  const { bids, asks } = props;

  return (
    <div className="orderbook-table-container">
      <table>
        <OrderbookHeading title={messages.bids} category="bids" />
        <tbody>
          <OrderbookItems orders={bids} category="bids" />
        </tbody>
      </table>

      <div className="orderbook-table-divider" />

      <table>
        <OrderbookHeading title={messages.asks} category="asks" />
        <tbody>
          <OrderbookItems orders={asks} category="asks" />
        </tbody>
      </table>
    </div>
  );
}

export default Orderbook;
