import { RouterProvider } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppProvider from "./context/AppContext";
import router from "./routes";
import "./App.scss";
import config from "./config";

const stripePromise = loadStripe(String(config.stripePubKey));

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Elements>
  );
};

export default App;
