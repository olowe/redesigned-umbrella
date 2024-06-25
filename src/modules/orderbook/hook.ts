import { useContext } from "react";
import Context from "./context";

/**
 * Create a custom hook to reuse reducer and context logic in the application
 */
const useOrderbook = () => useContext(Context);

export default useOrderbook;
