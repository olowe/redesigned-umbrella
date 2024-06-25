import { assert } from "@sindresorhus/is";

const { REACT_APP_WS_URL, REACT_APP_WS_AUTH_TOKEN } = process.env;

// Perform environment sanity checks
assert.string(REACT_APP_WS_URL, "Set host");
assert.string(REACT_APP_WS_AUTH_TOKEN, "Set auth token");

// Setup app config details
interface Config {
  api: {
    host: string;
    authToken: string;
  };
}

const config: Config = {
  api: {
    host: REACT_APP_WS_URL,
    authToken: REACT_APP_WS_AUTH_TOKEN,
  },
};

export default config;
