import { RouterProvider } from "react-router-dom";
import AppProvider from "./context/AppContext";
import router from "./routes";
import './App.scss'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
