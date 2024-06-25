interface Props {
  orders: any[];
  category: string;
}

function sortItems(items: any[], category: string) {
  return items.sort((a, b) => {
    if (category === "bids") {
      return a.price > b.price ? -1 : 1;
    } else {
      return a.price < b.price ? -1 : 1;
    }
  });
}

function OrderbookItems(props: Props) {
  const { orders, category } = props;

  return (
    <>
      {orders &&
        sortItems(orders, category)
          .slice(0, 30)
          .map((item, index) => (
            <tr key={index}>
              <td className={`orderbook-${category}-price`}>
                {item.price.toLocaleString()}
              </td>
              <td className="orderbook-amount">{item.amount.toFixed(4)}</td>
            </tr>
          ))}
    </>
  );
}

export default OrderbookItems;
