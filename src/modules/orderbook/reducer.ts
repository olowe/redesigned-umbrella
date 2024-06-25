/**
 * Transform raw orderbook data into more readable object notations
 * @param orderData raw orderbook data
 */
function formatOrderData(orderData: any[]) {
  return orderData.map((order) => ({
    price: Number(order[0]),
    amount: Number(order[1]),
  }));
}

/**
 * Update state when new orderbook data is published
 * @param incomingOrder incoming data
 * @param orderData current orderbook data
 */
function processPublication(incomingOrder: any, orderData: any[]) {
  const incomingOrderPrice = incomingOrder.price;
  const incomingOrderAmount = incomingOrder.amount;

  const matcher = (element: any) => element.price === incomingOrderPrice;

  const matchIndex = orderData.findIndex(matcher);

  if (matchIndex > -1) {
    const before = orderData.slice(0, matchIndex);
    const after = orderData.slice(matchIndex + 1, orderData.length);

    if (incomingOrderAmount === 0) {
      return [...before, ...after];
    } else {
      const match = orderData.find(matcher);

      return [
        ...before,
        {
          ...match,
          amount: incomingOrderAmount,
        },
        ...after,
      ];
    }
  }

  return [
    ...orderData,
    {
      price: incomingOrderPrice,
      amount: incomingOrderAmount,
    },
  ];
}

/**
 * Handle incoming price data publication
 * @param incomingOrders raw incoming data
 * @param orderData current orderbook data
 */
function processPublications(incomingOrders: any[], orderData: any[]) {
  if (incomingOrders.length === 0) {
    return orderData;
  }

  let latestOrderData = orderData;
  formatOrderData(incomingOrders).forEach((incomingOrderData) => {
    latestOrderData = processPublication(incomingOrderData, latestOrderData);
  });

  return latestOrderData;
}

function orderbookReducer(orderbook: any, action: any) {
  switch (action.type) {
    case "subscribed":
      return {
        bids: formatOrderData(action.bids),
        asks: formatOrderData(action.asks),
        sequence: action.sequence,
        ready: true,
        status: "connected",
      };
    case "publication":
      // Account for lost packages by validating sequence
      if (orderbook.sequence + 1 !== action.sequence) {
        return {
          ...orderbook,
          status: "waiting",
        };
      }

      return {
        ...orderbook,
        asks: processPublications(action.asks, orderbook.asks),
        bids: processPublications(action.bids, orderbook.bids),
        sequence: action.sequence,
        status: "connected",
      };
    case "connectionStatus":
      return {
        ...orderbook,
        status: action.status,
      };
    default: {
      return orderbook;
    }
  }
}

export default orderbookReducer;
