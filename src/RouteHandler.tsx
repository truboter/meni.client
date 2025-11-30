import { useParams } from "react-router-dom";
import App from "./App";
import OrderView from "./OrderView";

// List of valid language codes
const VALID_LANGUAGES = [
  "ka", "en", "ru", "tr", "hy", "zh", "hi", "es", "fr", "ar", 
  "bn", "pt", "id", "ur", "de", "ja", "ko", "vi", "it", "pl", 
  "uk", "fa", "he", "az", "kk", "uz", "ab"
];

// Check if string looks like an order ID (contains dash and is longer than 10 chars)
const isOrderId = (str: string): boolean => {
  return str.includes("-") && str.length > 10;
};

export function RouteHandler() {
  const params = useParams<{
    param1?: string;
    param2?: string;
    param3?: string;
  }>();

  const { param1, param2, param3 } = params;

  // Three params: /:locationId/:lang/:orderId
  if (param1 && param2 && param3) {
    return <OrderView />;
  }

  // Two params: could be /:lang/:orderId or /:locationId/:lang
  if (param1 && param2) {
    // If param1 is a valid 2-letter language code and param2 looks like orderId
    if (VALID_LANGUAGES.includes(param1) && isOrderId(param2)) {
      return <OrderView />;
    }
    // Otherwise it's /:locationId/:lang
    return <App />;
  }

  // One param or no params: App
  return <App />;
}
