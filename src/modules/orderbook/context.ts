import { createContext } from "react";

interface OrderbookContext {
  ready: boolean;
  status: string;
  asks: any[];
  bids: any[];
  sequence: number;
}

export const initialOrderbookState: OrderbookContext = {
  ready: false,
  status: "disconnected",
  asks: [],
  bids: [],
  sequence: 0,
};

export default createContext<OrderbookContext>(initialOrderbookState);
