import { Centrifuge, Subscription } from "centrifuge";
import config from "../config";

type TConnectionFunction = () => void;
interface TConnectionOptions {
  onConnecting: TConnectionFunction;
  onConnected: TConnectionFunction;
  onDisconnected: TConnectionFunction;
  onInterrupted: TConnectionFunction;
}

type TSubscriptionFunction = (data: any) => void;
interface TSubscriptionOptions {
  channel: string;
  onSubscribed: TSubscriptionFunction;
  onPublication: TSubscriptionFunction;
  onInterrupted: TConnectionFunction;
}

/**
 * Establish a real-time connection with the server - using WebSocket.
 * @param options object containing callbacks for the different connection states
 */
function connect(options: TConnectionOptions): Centrifuge {
  const { onConnecting, onConnected, onDisconnected, onInterrupted } = options;

  const client = new Centrifuge(config.api.host, {
    token: config.api.authToken,
  });

  client.on("connecting", function () {
    onConnecting();
  });

  client.on("connected", function () {
    onConnected();
  });

  client.on("disconnected", function () {
    onDisconnected();
  });

  client.on("error", function () {
    onInterrupted();
    client.connect();
  });

  client.connect();

  return client;
}

/**
 * Create a subscription instance and subscribe to a channel
 * @param client websocket connection client
 * @param options object containing callbacks for the different subscription states
 */
function subscribe(
  client: Centrifuge,
  options: TSubscriptionOptions
): { client: Centrifuge; channelSub: Subscription } {
  const { channel, onSubscribed, onPublication, onInterrupted } = options;

  const channelSub = client.newSubscription(channel);

  channelSub.on("subscribed", function (ctx) {
    onSubscribed(ctx.data);
  });

  channelSub.on("publication", function (ctx) {
    if (Object.keys(ctx.data).length === 0) {
      client.send({}); // Respond to ping - if any
    } else {
      onPublication(ctx.data);
    }
  });

  channelSub.on("error", function () {
    onInterrupted();
    channelSub.subscribe();
  });

  channelSub.subscribe();

  return {
    client,
    channelSub,
  };
}

const wsProvider = {
  connect,
  subscribe,
};

export default wsProvider;
