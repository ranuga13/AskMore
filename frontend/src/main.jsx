import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter,Routes,Route,createBrowserRouter ,createRoutesFromElements,RouterProvider} from "react-router-dom";


//const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const PUBLISHABLE_KEY ="pk_test_YnVzeS1iZWRidWctNjcuY2xlcmsuYWNjb3VudHMuZGV2JA";


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
// const router=createBrowserRouter(createRoutesFromElements(
//   <Routes>
//     <Route path="/:id/:board_id" element={<App />}></Route>
    
//   </Routes>
// ))
// const router = createBrowserRouter([  {    path: "/:id/:board_id",
//     element: <App />,
//   },]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  {/* <BrowserRouter> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
      {/* <RouterProvider router={router}/> */}
        
      <BrowserRouter>
      {/* <ClerkLoaded> */}
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id/:board_id" element={<App />} />
      </Routes>
      {/* </ClerkLoaded> */}
      </BrowserRouter>
      </Provider>
    </ClerkProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);