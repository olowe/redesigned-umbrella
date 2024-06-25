import OrderbookHeading from "./OrderbookHeading";
import OrderbookItems from "./OrderbookItems";

interface Props {
  orders: any[];
  category: string;
  heading: string;
}

function OrderbookTable(props: Props) {
  const { orders, category, heading } = props;

  return (
    <table>
      <OrderbookHeading title={heading} category={category} />
      <tbody>
        <OrderbookItems orders={orders} category={category} />
      </tbody>
    </table>
  );
}

export default OrderbookTable;
