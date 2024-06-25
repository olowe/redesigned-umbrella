import React, { useEffect, useReducer } from "react";
import { wsProvider } from "../../lib";
import Context, { initialOrderbookState } from "./context";
import orderbookReducer from "./reducer";

function onSubscriptionUpdate(type: string, dispatch: React.Dispatch<any>) {
  return (data: any) => {
    dispatch({
      type,
      asks: data.asks || [],
      bids: data.bids || [],
      sequence: data.sequence,
    });
  };
}

function onConnectionStatusUpdate(
  status: string,
  dispatch: React.Dispatch<any>
) {
  return () => {
    dispatch({
      type: "connectionStatus",
      status,
    });
  };
}

function OrderbookProvider({ children }: React.PropsWithChildren) {
  const [orderbook, dispatch] = useReducer(
    orderbookReducer,
    initialOrderbookState
  );

  // Create websocket connection along with connection state callbacks
  const createOrderbook = () => {
    const wsClient = wsProvider.connect({
      onConnecting: onConnectionStatusUpdate("connecting", dispatch),
      onConnected: onConnectionStatusUpdate("connected", dispatch),
      onDisconnected: onConnectionStatusUpdate("disconnected", dispatch),
      onInterrupted: onConnectionStatusUpdate("interrupted", dispatch),
    });

    return wsProvider.subscribe(wsClient, {
      channel: "orderbook:BTC-USD",
      onSubscribed: onSubscriptionUpdate("subscribed", dispatch),
      onPublication: onSubscriptionUpdate("publication", dispatch),
      onInterrupted: onConnectionStatusUpdate("interrupted", dispatch),
    });
  };

  useEffect(() => {
    // Connect to server and subscribe to updates
    const wsConnection = createOrderbook();

    // Unsubscribe and disconnect as part of cleanup
    return () => {
      wsConnection.channelSub.unsubscribe();
      wsConnection.client.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={{ ...orderbook }}>{children}</Context.Provider>
  );
}

export default OrderbookProvider;
