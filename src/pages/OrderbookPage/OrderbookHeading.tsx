import messages from "../../messages";

interface Props {
  title: string;
  category: string;
}

function OrderbookHeading(props: Props) {
  const { title, category } = props;

  return (
    <thead>
      <tr>
        <th colSpan={2} className={`orderbook-${category}-heading`}>
          {title}
        </th>
      </tr>
      <tr>
        <th>{messages.price}</th>
        <th>{messages.amount}</th>
      </tr>
    </thead>
  );
}

export default OrderbookHeading;
